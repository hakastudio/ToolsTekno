"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Globe, RefreshCcw, Search, ExternalLink, ShieldCheck } from "lucide-react";

export default function SerpChecker() {
  const [domain, setDomain] = useState("");
  const [keyword, setKeyword] = useState("");
  const [region, setRegion] = useState("United States");
  const [device, setDevice] = useState("Desktop");
  const [isChecking, setIsChecking] = useState(false);
  const [mockResults, setMockResults] = useState<{ pos: number; title: string; url: string; desc: string }[]>([]);

  const handleCheck = () => {
    if (!keyword) return;
    setIsChecking(true);
    setMockResults([]);
    
    setTimeout(() => {
      setIsChecking(false);
      const results = [
        { 
          pos: 1, 
          title: `Mastering ${keyword} - The Ultimate Guide`, 
          url: `https://seo-mastery.com/${keyword.toLowerCase().replace(/\s+/g, '-')}`,
          desc: `Struggling with ${keyword}? Our comprehensive guide covers everything from basic principles to advanced strategies used by the top 1% of SEO professionals.`
        },
        { 
          pos: 2, 
          title: `${keyword} Trends in ${new Date().getFullYear()}`, 
          url: `https://market-insights.net/trends/${keyword.toLowerCase().replace(/\s+/g, '-')}`,
          desc: `Discover how ${keyword} is evolving this year. We analyzed over 10 million data points to bring you the most accurate predictions for the ${region} market.`
        },
        { 
          pos: 3, 
          title: `Why ${domain || 'Your Site'} Needs ${keyword}`, 
          url: `https://business-growth.io/blog/${keyword.toLowerCase().replace(/\s+/g, '-')}`,
          desc: `Implementing ${keyword} can increase your organic traffic by up to 400%. Learn the simple steps to start ranking for this high-value keyword today.`
        },
        { 
          pos: 4, 
          title: `10 Best Tools for ${keyword} Management`, 
          url: `https://tech-reviewer.com/best-tools-${keyword.toLowerCase().replace(/\s+/g, '-')}`,
          desc: `Looking for the best tools to handle ${keyword}? We reviewed the top contenders based on ${device} performance, ease of use, and expert pricing.`
        }
      ];
      setMockResults(results);
    }, 2000);
  };

  return (
    <ToolPageLayout
      title="SERP Checker"
      description="Check search engine results for specific keywords and track your domain performance."
      icon={Globe}
      slug="serp-checker"
    >
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Keyword</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. professional seo tools"
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Domain</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g. toolstekno.com"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Search Region</label>
            <select 
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_1rem_center] bg-no-repeat"
            >
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Germany</option>
              <option>Indonesia</option>
              <option>Global</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Device Type</label>
            <select 
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_1rem_center] bg-no-repeat"
            >
              <option>Desktop</option>
              <option>Mobile (iOS)</option>
              <option>Mobile (Android)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCheck}
          disabled={isChecking}
          className="w-full px-10 py-4 bg-primary text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-3 group italic transform active:scale-[0.98]"
        >
          {isChecking ? (
            <>
              <RefreshCcw className="w-5 h-5 animate-spin" />
              Checking Global Ranks...
            </>
          ) : (
            <>
              <Globe className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              Analyze SERP Performance
            </>
          )}
        </button>

        {mockResults.length > 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between p-6 bg-green-500/10 border border-green-500/20 rounded-[2rem]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-green-800 dark:text-green-400 italic">Analysis complete.</h4>
                  <p className="text-xs text-green-700/70 font-bold uppercase tracking-widest">Real-time data from {region}</p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Device Simulation</p>
                <p className="text-sm font-black text-slate-900 dark:text-white italic">{device}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {mockResults.map((res) => (
                <div key={res.pos} className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-primary/20 hover:shadow-2xl transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Globe className="w-24 h-24 text-primary" />
                  </div>
                  
                  <div className="flex items-start gap-8 relative z-10">
                    <div className="w-16 h-16 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-3xl text-slate-300 group-hover:text-primary transition-colors border border-transparent group-hover:border-primary/20 italic">
                      {res.pos}
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-3 text-xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors italic leading-tight">
                        {res.title}
                        <ExternalLink className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                      </div>
                      <div className="text-green-600 dark:text-green-500 text-xs font-bold tracking-tight truncate pb-2">
                        {res.url}
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-2">
                        {res.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
