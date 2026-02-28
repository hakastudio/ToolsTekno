"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Search, RefreshCcw, Copy, Check, Table as TableIcon } from "lucide-react";

export default function KeywordDensity() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<{ word: string; count: number; density: string }[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDensity = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    
    // Simple density logic
    const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
    const totalWords = words.length;
    
    const freq: Record<string, number> = {};
    words.forEach(w => {
      if (w.length > 2) { // filter out short words
        freq[w] = (freq[w] || 0) + 1;
      }
    });

    const sorted = Object.entries(freq)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / totalWords) * 100).toFixed(2) + "%"
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    setResults(sorted);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setText("");
    setResults([]);
  };

  return (
    <ToolPageLayout
      title="Keyword Density Checker"
      description="Calculate the frequency and density of keywords in your content to optimize for SEO."
      icon={Search}
      slug="keyword-density"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Your Content
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your article or content here to analyze..."
            className="w-full h-64 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm leading-relaxed"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={analyzeDensity}
            disabled={isAnalyzing}
            className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Density"}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {results.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
              <TableIcon className="w-5 h-5 text-primary" />
              Top Keywords Analysis
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Keyword</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Count</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Density</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {results.map((res, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{res.word}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{res.count}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                          {res.density}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
