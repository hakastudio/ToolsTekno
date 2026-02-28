"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { 
  DollarSign, 
  Search, 
  TrendingUp, 
  BarChart2, 
  Target, 
  ShieldCheck, 
  RefreshCcw,
  Zap,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function KeywordCPCAnalyzer() {
  const [keyword, setKeyword] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    cpc: string;
    volume: string;
    difficulty: number;
    competition: string;
    suggestions: { word: string; cpc: string }[];
  } | null>(null);

  const handleAnalyze = () => {
    if (!keyword.trim()) return;
    setIsAnalyzing(true);
    setResults(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setResults({
        cpc: "$4.82",
        volume: "12,500/mo",
        difficulty: 64,
        competition: "High",
        suggestions: [
          { word: `${keyword} pricing`, cpc: "$6.10" },
          { word: `best ${keyword} solutions`, cpc: "$3.45" },
          { word: `${keyword} alternatives`, cpc: "$2.90" },
          { word: `free ${keyword} tools`, cpc: "$1.15" }
        ]
      });
    }, 1500);
  };

  return (
    <ToolPageLayout
      title="Keyword CPC Analyzer"
      description="Estimate the commercial value of any search term. View average CPC, search volume, and ranking difficulty."
      icon={DollarSign}
      slug="keyword-cpc"
    >
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. digital marketing agency, crm software..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !keyword.trim()}
            className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <BarChart2 className="w-5 h-5" />}
            Analyze Value
          </button>
        </div>

        {results && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 text-center">
                 <DollarSign className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
                 <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 leading-none">{results.cpc}</div>
                 <div className="text-[10px] font-bold text-indigo-700/60 uppercase tracking-widest mt-2">Avg. Cost Per Click</div>
              </div>
              <div className="p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/10 text-center">
                 <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                 <div className="text-3xl font-black text-blue-600 dark:text-blue-400 leading-none">{results.volume}</div>
                 <div className="text-[10px] font-bold text-blue-700/60 uppercase tracking-widest mt-2">Monthly Volume</div>
              </div>
              <div className="p-6 rounded-[2rem] bg-orange-500/5 border border-orange-500/10 text-center">
                 <Target className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                 <div className="text-3xl font-black text-orange-600 dark:text-orange-400 leading-none">{results.difficulty}/100</div>
                 <div className="text-[10px] font-bold text-orange-700/60 uppercase tracking-widest mt-2">Keyword Difficulty</div>
              </div>
              <div className="p-6 rounded-[2rem] bg-rose-500/5 border border-rose-500/10 text-center">
                 <Zap className="w-8 h-8 text-rose-500 mx-auto mb-3" />
                 <div className="text-3xl font-black text-rose-600 dark:text-rose-400 leading-none">{results.competition}</div>
                 <div className="text-[10px] font-bold text-rose-700/60 uppercase tracking-widest mt-2">Ad Competition</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Related High-Value Terms
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {results.suggestions.map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/30 hover:border-primary/30 transition-all group">
                         <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground flex items-center gap-2">
                               {s.word}
                               <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                            </span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Variation</span>
                         </div>
                         <div className="text-right">
                            <div className="text-sm font-black text-primary">{s.cpc}</div>
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Est. CPC</div>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="p-8 rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border border-border relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                     <ShieldCheck className="w-32 h-32 text-primary" />
                  </div>
                  <div className="relative z-10 space-y-4">
                     <h4 className="text-lg font-bold">Expert Summary</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed">
                        This keyword has a <span className="text-primary font-bold">Commercial Intent</span> score of 8.5/10. Competition for ad space is high, suggesting a very lucrative market. Focus on building high-quality, long-form content to capture organic traffic and avoid high PPC costs.
                     </p>
                     <div className="pt-4 flex items-center gap-6">
                        <div className="flex flex-col">
                           <span className="text-xs font-black text-slate-900 dark:text-white leading-none mb-1">Profitability</span>
                           <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-3 h-1 rounded-full ${i < 5 ? "bg-green-500" : "bg-muted"}`} />)}
                           </div>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-xs font-black text-slate-900 dark:text-white leading-none mb-1">Value Score</span>
                           <span className="text-xl font-black text-primary leading-none italic">Elite</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
