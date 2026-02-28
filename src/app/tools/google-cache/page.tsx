"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { History, Search, ExternalLink, Clock, Globe } from "lucide-react";

export default function GoogleCacheChecker() {
  const [url, setUrl] = useState("");

  const getCacheUrl = () => {
    let cleanUrl = url.trim().replace(/^https?:\/\//, "");
    return `https://webcache.googleusercontent.com/search?q=cache:${cleanUrl}`;
  };

  const handleOpen = () => {
    if (!url.trim()) return;
    window.open(getCacheUrl(), "_blank");
  };

  return (
    <ToolPageLayout
      title="Google Cache Checker"
      description="View the cached version of any webpage to see exactly what Google's bot saw during its last crawl."
      icon={History}
      slug="google-cache"
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
            <Clock className="w-5 h-5" />
            Check Cache
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="p-8 rounded-[2.5rem] bg-rose-500/5 border border-rose-500/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <History className="w-32 h-32 text-rose-500" />
             </div>
             <div className="relative z-10 space-y-4">
                <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest text-center">Cache URL Syntax</div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-rose-500/20 font-mono text-sm text-center shadow-inner break-all">
                  cache:{url.trim() || "example.com"}
                </div>
                <p className="text-xs text-muted-foreground text-center italic">
                  "Useful for debugging SEO issues or viewing content that has been updated or removed."
                </p>
             </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground">Why check Google Cache?</h3>
            <div className="space-y-4">
               <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">See Last Crawl</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Check the timestamp of when Google last indexed the page content.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Visual Verification</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Verify if the visual elements and text are being rendered correctly for crawlers.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
