"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Terminal, Globe, RefreshCcw, Server, ShieldCheck, Lock, Copy, Check } from "lucide-react";

export default function HTTPHeadersChecker() {
  const [url, setUrl] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCheck = async () => {
    if (!url.trim()) return;
    setIsChecking(true);
    setResult(null);
    setError(null);

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    try {
      const response = await fetch("/api/check-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: formattedUrl }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.headers);
      } else {
        setError(data.error || "Failed to fetch headers");
      }
    } catch (err: any) {
      setError("Network error or invalid URL");
    } finally {
      setIsChecking(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="HTTP Headers Checker"
      description="Inspect the security and server response headers for any URL to identify optimization opportunities."
      icon={Terminal}
      slug="http-headers"
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. google.com"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
            />
          </div>
          <button
            onClick={handleCheck}
            disabled={isChecking || !url.trim()}
            className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isChecking ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Terminal className="w-5 h-5" />}
            Fetch Headers
          </button>
        </div>

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                  <Server className="w-5 h-5 text-primary" />
                  Full Response Headers
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy JSON"}
                </button>
             </div>

             <div className="grid grid-cols-1 gap-3">
                {Object.entries(result).map(([key, value]) => {
                  const isSecurity = ["strict-transport-security", "content-security-policy", "x-frame-options", "x-content-type-options"].includes(key.toLowerCase());
                  return (
                    <div key={key} className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <div className="flex items-center gap-3">
                          {isSecurity && <Lock className="w-4 h-4 text-orange-500" />}
                          <span className="text-sm font-black text-slate-900 dark:text-white">{key}</span>
                       </div>
                       <span className="text-xs font-medium text-slate-500 dark:text-slate-400 break-all bg-slate-50 dark:bg-slate-900 p-2 rounded-lg md:text-right flex-1 md:max-w-md">
                          {value}
                       </span>
                    </div>
                  );
                })}
             </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
