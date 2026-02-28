"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Activity, Globe, RefreshCcw, CheckCircle2, AlertCircle, Clock, Server } from "lucide-react";

export default function HTTPStatusChecker() {
  const [url, setUrl] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    status: number;
    statusText: string;
    responseTime: number;
    headers: Record<string, string>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        setResult(data);
      } else {
        setError(data.error || "Failed to check status");
      }
    } catch (err: any) {
      setError("Network error or invalid URL");
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-500 bg-green-500/10 border-green-500/20";
    if (status >= 300 && status < 400) return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    if (status >= 400 && status < 500) return "text-orange-500 bg-orange-500/10 border-orange-500/20";
    return "text-red-500 bg-red-500/10 border-red-500/20";
  };

  return (
    <ToolPageLayout
      title="HTTP Status Checker"
      description="Verify the HTTP response code of any URL. Check for redirects, client errors, and server issues."
      icon={Activity}
      slug="http-status"
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. google.com or https://example.com"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
            />
          </div>
          <button
            onClick={handleCheck}
            disabled={isChecking || !url.trim()}
            className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isChecking ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Activity className="w-5 h-5" />}
            Check Status
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-8 rounded-[2rem] border text-center ${getStatusColor(result.status)}`}>
                <div className="text-5xl font-black mb-1">{result.status}</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-70">{result.statusText}</div>
              </div>
              <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-black text-slate-900 dark:text-white">{result.responseTime}ms</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2">Response Time</div>
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white font-bold">
                <Server className="w-5 h-5 text-primary" />
                Response Headers
              </div>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(result.headers).slice(0, 10).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-50 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{key}</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-300 break-all sm:text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
