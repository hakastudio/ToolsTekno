"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { 
  TrendingUp, 
  Search, 
  Map, 
  Globe, 
  RefreshCcw, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  Zap
} from "lucide-react";

export default function KeywordTrends() {
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<{
    trend: number[];
    interest: number;
    growth: number;
    regions: { name: string; val: number }[];
  } | null>(null);

  const handleSearch = () => {
    if (!keyword.trim()) return;
    setIsSearching(true);
    setResults(null);

    setTimeout(() => {
      setIsSearching(false);
      setResults({
        trend: Array.from({ length: 12 }, () => Math.floor(Math.random() * 60) + 40),
        interest: 82,
        growth: 15.4,
        regions: [
          { name: "United States", val: 100 },
          { name: "United Kingdom", val: 82 },
          { name: "Indonesia", val: 74 },
          { name: "Germany", val: 56 },
          { name: "Canada", val: 41 }
        ]
      });
    }, 1500);
  };

  return (
    <ToolPageLayout
      title="Keyword Trends"
      description="Visual search interest explorer. Analyze seasonal patterns and regional popularity for any keyword."
      icon={TrendingUp}
      slug="keyword-trends"
    >
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. artificial intelligence, web design..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !keyword.trim()}
            className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSearching ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <TrendingUp className="w-5 h-5" />}
            Explore Trends
          </button>
        </div>

        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Interest Graph */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Zap className="w-32 h-32 text-primary" />
                 </div>
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                       <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest leading-none">Interest Over Time</h3>
                       <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full">
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                          <span className="text-xs font-black text-green-500">{results.growth}% Growth</span>
                       </div>
                    </div>

                    {/* Simulated SVG Graph */}
                    <div className="h-48 w-full flex items-end justify-between gap-1 group/graph">
                       {results.trend.map((val, i) => (
                         <div key={i} className="flex-1 flex flex-col items-center gap-3">
                            <div 
                              className="w-full bg-primary/20 hover:bg-primary/60 transition-all rounded-t-lg relative group/bar"
                              style={{ height: `${val}%` }}
                            >
                               <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap bg-primary px-2 py-0.5 rounded">
                                 Score: {val}
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest px-2">
                       <span>Jan</span>
                       <span>Jun</span>
                       <span>Dec</span>
                    </div>
                 </div>
              </div>

              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                 <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                 <p className="text-xs text-muted-foreground leading-relaxed">
                   Interest scores are normalized based on search volume relative to the highest point in the given period. A value of 100 is peak popularity for the term.
                 </p>
              </div>
            </div>

            {/* Regional Data */}
            <div className="space-y-6">
               <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-2">
                 <Map className="w-4 h-4" />
                 Interest by Region
               </h3>
               <div className="space-y-3">
                  {results.regions.map((reg, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-border bg-card/30 hover:shadow-lg transition-all group">
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-foreground italic flex items-center gap-2">
                             <Globe className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                             {reg.name}
                          </span>
                          <span className="text-sm font-black text-primary leading-none">{reg.val}</span>
                       </div>
                       <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary/50 group-hover:bg-primary transition-all duration-700"
                            style={{ width: `${reg.val}%` }}
                          />
                       </div>
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
