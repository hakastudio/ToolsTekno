"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Eye, Search, ExternalLink, ShieldCheck, Globe } from "lucide-react";

export default function GoogleIndexChecker() {
  const [url, setUrl] = useState("");

  const getIndexUrl = () => {
    let cleanUrl = url.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://www.google.com/search?q=site%3A${cleanUrl}`;
  };

  const handleOpen = () => {
    if (!url.trim()) return;
    window.open(getIndexUrl(), "_blank");
  };

  return (
    <ToolPageLayout
      title="Google Index Checker"
      description="Quickly check if a website or specific page is indexed by Google using search operators."
      icon={Eye}
      slug="google-index"
    >
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. example.com"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
            />
          </div>
          <button
            onClick={handleOpen}
            disabled={!url.trim()}
            className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Check Index
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground">How it works</h3>
            <p className="text-muted-foreground leading-relaxed">
              Google doesn't provide a public real-time API for indexing status without Search Console access. This tool uses the <code className="px-2 py-1 bg-primary/10 text-primary rounded font-bold">site:</code> operator to show you exactly what Google has indexed for your domain.
            </p>
            <div className="space-y-4">
               <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border">
                  <ShieldCheck className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <div className="font-bold text-sm">Verified Results</div>
                    <div className="text-xs text-muted-foreground">Direct from Google's live search results.</div>
                  </div>
               </div>
               <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border">
                  <ExternalLink className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <div className="font-bold text-sm">Automated Query</div>
                    <div className="text-xs text-muted-foreground">Generates the correct syntax for you instantly.</div>
                  </div>
               </div>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Search className="w-32 h-32 text-indigo-500" />
             </div>
             <div className="relative z-10 space-y-4">
                <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest text-center">Preview Search Operator</div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-indigo-500/20 font-mono text-sm text-center shadow-inner">
                  site:{url.trim() || "example.com"}
                </div>
                <p className="text-xs text-muted-foreground text-center italic">
                  "If no results appear in the search, the page or domain is likely not indexed by Google."
                </p>
             </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
