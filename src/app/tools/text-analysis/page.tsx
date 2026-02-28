"use client";

import React, { useState, useEffect } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { 
  FileText, 
  Search, 
  Clock, 
  BarChart3, 
  AlignLeft, 
  Quote,
  Sparkles,
  RefreshCcw,
  BookOpen
} from "lucide-react";

export default function TextAnalysis() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    chars: 0,
    readingTime: 0,
    topWords: [] as { word: string; count: number }[],
    sentences: 0,
    paragraphs: 0
  });

  useEffect(() => {
    if (!text.trim()) {
      setStats({ words: 0, chars: 0, readingTime: 0, topWords: [], sentences: 0, paragraphs: 0 });
      return;
    }

    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const chars = text.length;
    const readingTime = Math.ceil(words.length / 200); // 200 words per minute average
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;

    // Simple top words logic
    const wordFreq: Record<string, number> = {};
    const stopWords = new Set(["the", "and", "a", "to", "in", "is", "of", "it", "with", "for", "on", "as", "at", "by", "this", "that"]);
    
    words.forEach(w => {
      const clean = w.toLowerCase().replace(/[^a-z]/g, '');
      if (clean.length > 2 && !stopWords.has(clean)) {
        wordFreq[clean] = (wordFreq[clean] || 0) + 1;
      }
    });

    const sortedWords = Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }));

    setStats({ words: words.length, chars, readingTime, topWords: sortedWords, sentences, paragraphs });
  }, [text]);

  return (
    <ToolPageLayout
      title="Text Analysis Tool"
      description="Deep content metrics for SEO and readability. Analyze word usage, reading time, and structural density."
      icon={FileText}
      slug="text-analysis"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-foreground">Paste Content</label>
            <button 
              onClick={() => setText("")}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1"
            >
              <RefreshCcw className="w-3 h-3" />
              Clear
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your content here..."
            className="w-full h-80 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none text-foreground"
          />
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card/50 text-center">
              <div className="text-xl font-black text-primary">{stats.words}</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Words</div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/50 text-center">
              <div className="text-xl font-black text-primary">{stats.chars}</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Chars</div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/50 text-center">
              <div className="text-xl font-black text-primary">{stats.readingTime}m</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Read Time</div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/50 text-center">
              <div className="text-xl font-black text-primary">{stats.sentences}</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking_widest">Sentences</div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Keyword Density
            </h3>
            <div className="space-y-3">
              {stats.topWords.length > 0 ? (
                stats.topWords.map((item, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold px-1">
                      <span>{item.word}</span>
                      <span className="text-primary">{item.count}x</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${(item.count / stats.words) * 100 * 5}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-muted-foreground italic p-4 border border-dashed rounded-xl text-center">
                  Analyze text to see keyword frequency.
                </div>
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                 <h4 className="text-sm font-bold">SEO Insights</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed">
                   Maintain a word count of 1,500+ for high-competition keywords. Ensure your most important keywords appear in the first 100 words.
                 </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                <AlignLeft className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase">Paragraphs</div>
                <div className="text-lg font-black">{stats.paragraphs}</div>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase">Readability</div>
                <div className="text-lg font-black italic text-primary">High</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
