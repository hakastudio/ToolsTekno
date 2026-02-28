"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Share2, Globe, RefreshCcw, Eye, Layout, Image as ImageIcon, Type, AlignLeft } from "lucide-react";

export default function OpenGraphChecker() {
  const [url, setUrl] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    title: string;
    description: string;
    image: string;
    site_name: string;
    url: string;
    type: string;
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
        const meta = data.meta || {};
        setResult({
          title: meta["og:title"] || data.title || "No title found",
          description: meta["og:description"] || meta["description"] || "No description found",
          image: meta["og:image"] || "",
          site_name: meta["og:site_name"] || "",
          url: meta["og:url"] || formattedUrl,
          type: meta["og:type"] || "website",
        });
      } else {
        setError(data.error || "Failed to fetch metadata");
      }
    } catch (err: any) {
      setError("Network error or invalid URL");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <ToolPageLayout
      title="Open Graph Checker"
      description="Preview how your content will appear when shared on Facebook, Twitter, and other social platforms."
      icon={Share2}
      slug="og-checker"
    >
      <div className="space-y-10">
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
            {isChecking ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Eye className="w-5 h-5" />}
            Preview
          </button>
        </div>

        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Card Preview */}
            <div className="space-y-6">
               <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Layout className="w-4 h-4 text-primary" />
                  Social Card Preview
               </h3>
               <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                  {result.image ? (
                    <img src={result.image} alt="OG Preview" className="w-full aspect-[1.91/1] object-cover border-b border-slate-100 dark:border-slate-800" />
                  ) : (
                    <div className="w-full aspect-[1.91/1] bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                       <ImageIcon className="w-12 h-12 opacity-20" />
                    </div>
                  )}
                  <div className="p-6 space-y-2">
                     <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{result.site_name || new URL(result.url).hostname}</div>
                     <div className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">{result.title}</div>
                     <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{result.description}</p>
                  </div>
               </div>
            </div>

            {/* Meta Data */}
            <div className="space-y-6">
               <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-primary" />
                  Extracted Metadata
               </h3>
               <div className="grid grid-cols-1 gap-3">
                  {[
                    { label: "Title", value: result.title, icon: Type },
                    { label: "Description", value: result.description, icon: AlignLeft },
                    { label: "Type", value: result.type, icon: Layout },
                    { label: "Site Name", value: result.site_name, icon: Globe },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-start gap-1">
                       <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                          <item.icon className="w-3 h-3" />
                          {item.label}
                       </div>
                       <div className="text-sm font-semibold text-slate-900 dark:text-slate-300 break-all">{item.value}</div>
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
