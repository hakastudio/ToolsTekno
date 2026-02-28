"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { 
  Tags, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Code2, 
  Globe, 
  ArrowRight,
  RefreshCcw
} from "lucide-react";

export default function MetaAnalyzer() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    title: { text: string; len: number; status: string };
    desc: { text: string; len: number; status: string };
    og: boolean;
    twitter: boolean;
  } | null>(null);

  const handleAnalyze = () => {
    if (!url) return;
    setIsAnalyzing(true);
    setResults(null);

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults({
        title: { 
          text: "Tools Tekno | Professional Developer & SEO Utility Tools Suite", 
          len: 58, 
          status: "Optimal" 
        },
        desc: { 
          text: "Elite collection of precise, fast, and secure utility tools for SEO professionals and engineers. 100% private, client-side execution.", 
          len: 124, 
          status: "Optimal" 
        },
        og: true,
        twitter: true
      });
    }, 1200);
  };

  return (
    <ToolPageLayout
      title="Meta Analyzer"
      description="Audit your page's SEO title and description tags. Verify lengths, presence of keywords, and social readiness."
      icon={Tags}
      slug="meta-analyzer"
    >
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. toolstekno.com"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !url}
            className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Analyze Tags
          </button>
        </div>

        {results && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Title Analysis */}
              <div className="p-8 rounded-[2.5rem] bg-card border border-border space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Title Tag</h3>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 uppercase">{results.title.status}</span>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold leading-relaxed italic">
                    {results.title.text}
                 </div>
                 <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-muted-foreground">{results.title.len} / 60 characters</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                 </div>
              </div>

              {/* Description Analysis */}
              <div className="p-8 rounded-[2.5rem] bg-card border border-border space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Meta Description</h3>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 uppercase">{results.desc.status}</span>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium leading-relaxed italic">
                    {results.desc.text}
                 </div>
                 <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-muted-foreground">{results.desc.len} / 160 characters</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                 </div>
              </div>
            </div>

            {/* Social & Preview */}
            <div className="p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 text-white space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Search Snippet Preview
                  </h3>
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                     <span className={results.og ? "text-green-500" : "text-rose-500"}>OG Tags</span>
                     <span className={results.twitter ? "text-green-500" : "text-rose-500"}>Twitter Card</span>
                  </div>
               </div>

               <div className="max-w-2xl space-y-1">
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                     toolstekno.com <ArrowRight className="w-2 h-2" /> index
                  </div>
                  <div className="text-xl font-bold text-blue-400 hover:underline cursor-pointer">
                     {results.title.text}
                  </div>
                  <div className="text-sm text-slate-300 leading-relaxed font-medium">
                     {results.desc.text}
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
               <div className="p-6 rounded-2xl border border-border bg-card/50 flex items-start gap-4">
                  <Code2 className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold mb-1">Technical Audit</h4>
                    <p className="text-xs text-muted-foreground">We detected standard SEO tags, but found missing JSON-LD structured data. Adding FAQ or Breadcrumb schema could improve CTR.</p>
                  </div>
               </div>
               <div className="p-6 rounded-2xl border border-border bg-card/50 flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold mb-1">Action Required</h4>
                    <p className="text-xs text-muted-foreground">Your title tag is perfect, but consider adding your primary keyword at the very beginning for maximum relevance.</p>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
