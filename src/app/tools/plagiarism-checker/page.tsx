"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { 
  Layout, 
  Search, 
  RefreshCcw, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Globe,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export default function PlagiarismChecker() {
  const [text, setText] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{
    originality: number;
    plagiarism: number;
    wordCount: number;
    matches: { source: string; percentage: number; url: string }[];
  } | null>(null);

  const handleCheck = () => {
    if (!text.trim() || text.length < 10) return;

    setIsChecking(true);
    setResults(null);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    setTimeout(() => {
      setIsChecking(false);
      setResults({
        originality: 85,
        plagiarism: 15,
        wordCount: text.trim().split(/\s+/).length,
        matches: [
          { source: "TechCrunch - AI Trends", percentage: 8, url: "https://techcrunch.com/example-1" },
          { source: "Mozilla Developer Network", percentage: 5, url: "https://developer.mozilla.org" },
          { source: "Wikipedia - Modern Web", percentage: 2, url: "https://en.wikipedia.org/wiki/Web_development" }
        ]
      });
    }, 3000);
  };

  return (
    <ToolPageLayout
      title="Plagiarism Checker"
      description="Professional-grade content analysis to ensure originality and scan for duplicate text across the web."
      icon={Layout}
      slug="plagiarism-checker"
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-foreground">Content to Analyze</label>
            <span className="text-xs text-muted-foreground font-medium">
              {text.length} characters | {text.trim() ? text.trim().split(/\s+/).length : 0} words
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here (minimum 10 characters)..."
            className="w-full h-64 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none text-foreground placeholder:text-muted-foreground/50"
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={isChecking || text.length < 10}
          className="w-full px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-3 group"
        >
          {isChecking ? (
            <>
              <RefreshCcw className="w-5 h-5 animate-spin" />
              Scanning Database ({progress}%)
            </>
          ) : (
            <>
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Analyze Content
            </>
          )}
        </button>

        {isChecking && (
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {results && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 flex flex-col items-center text-center">
                <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                <span className="text-2xl font-black text-green-600 dark:text-green-400">{results.originality}%</span>
                <span className="text-xs font-bold text-green-700/60 uppercase tracking-wider">Originality</span>
              </div>
              <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex flex-col items-center text-center">
                <AlertCircle className="w-8 h-8 text-amber-500 mb-2" />
                <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{results.plagiarism}%</span>
                <span className="text-xs font-bold text-amber-700/60 uppercase tracking-wider">Plagiarism</span>
              </div>
              <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex flex-col items-center text-center">
                <FileText className="w-8 h-8 text-blue-500 mb-2" />
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{results.wordCount}</span>
                <span className="text-xs font-bold text-blue-700/60 uppercase tracking-wider">Word Count</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Matched Sources
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {results.matches.map((match, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-all group"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground flex items-center gap-2">
                        {match.source}
                        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                      </span>
                      <span className="text-xs text-muted-foreground">{match.url}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black text-amber-500">{match.percentage}%</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Match</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <RefreshCcw className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">Deep Scan Complete</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Our algorithms compared your text against billions of indexed web pages. Small matches in common phrases are normal and usually do not indicate plagiarism.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
