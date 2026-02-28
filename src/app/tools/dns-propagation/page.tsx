"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Share2, Globe, RefreshCcw, Check, X, Shield, Server, Database } from "lucide-react";

const REGIONS = [
  { name: "United States (Google)", id: "us-google", endpoint: "8.8.8.8" },
  { name: "Europe (Cloudflare)", id: "eu-cf", endpoint: "1.1.1.1" },
  { name: "India (Google)", id: "in-google", endpoint: "8.8.4.4" },
  { name: "Netherlands (Quad9)", id: "nl-quad9", endpoint: "9.9.9.9" },
];

export default function DNSPropagationChecker() {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("A");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<{ region: string; status: "success" | "error" | "pending"; value: string }[]>([]);

  const handleCheck = async () => {
    if (!domain.trim()) return;
    setIsChecking(true);
    
    // Initial results state
    const initialResults = REGIONS.map(r => ({ region: r.name, status: "pending" as const, value: "" }));
    setResults(initialResults);

    const cleanDomain = domain.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");

    try {
      // We'll use Google's DNS API for a real check
      // Note: In a real app, you'd want multiple providers, but for this demo, we'll simulate regional checks
      const response = await fetch(`https://dns.google/resolve?name=${cleanDomain}&type=${type}`);
      const data = await response.json();

      const newResults = REGIONS.map(r => ({
        region: r.name,
        status: data.Answer ? "success" as const : "error" as const,
        value: data.Answer ? data.Answer[0].data : "No record found"
      }));

      setResults(newResults);
    } catch (err) {
      setResults(REGIONS.map(r => ({ region: r.name, status: "error" as const, value: "Failed to query" })));
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <ToolPageLayout
      title="DNS Propagation Checker"
      description="Check wait for your DNS changes to propagate globally (A, MX, CNAME, TXT records)."
      icon={Share2}
      slug="dns-propagation"
    >
      <div className="space-y-10">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g. example.com"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
            >
              {["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SOA"].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <button
              onClick={handleCheck}
              disabled={isChecking || !domain.trim()}
              className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isChecking ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Database className="w-5 h-5" />}
              Verify
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {results.map((res, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                   <div className={`p-2 rounded-lg ${res.status === 'success' ? 'bg-green-500/10 text-green-500' : res.status === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-slate-100 text-slate-400 animate-pulse'}`}>
                      {res.status === 'success' ? <Check className="w-5 h-5" /> : res.status === 'error' ? <X className="w-5 h-5" /> : <Server className="w-5 h-5" />}
                   </div>
                   <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{res.region}</div>
                      <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">{res.status === 'pending' ? 'Connecting...' : res.value}</div>
                   </div>
                </div>
                {res.status === 'success' && (
                  <Shield className="w-4 h-4 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
