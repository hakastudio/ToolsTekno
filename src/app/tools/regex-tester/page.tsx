"use client";

import React, { useState, useEffect } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Search, Info, Check, Copy, AlertCircle, UnfoldVertical } from "lucide-react";

export default function RegexTester() {
  const [regex, setRegex] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!regex) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const re = new RegExp(regex, flags);
      const results = Array.from(testString.matchAll(re));
      setMatches(results);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setMatches([]);
    }
  }, [regex, flags, testString]);

  const handleCopy = () => {
    if (!regex) return;
    navigator.clipboard.writeText(`/${regex}/${flags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="Regex Tester"
      description="Real-time regular expression validator and match highlighter. Test your patterns against sample data instantly."
      icon={UnfoldVertical}
      slug="regex-tester"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                Regular Expression
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-lg pointer-events-none">/</div>
                <input
                  type="text"
                  value={regex}
                  onChange={(e) => setRegex(e.target.value)}
                  placeholder="[a-zA-Z0-9]+"
                  className="w-full pl-8 pr-20 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-mono text-lg transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="text-muted-foreground font-mono text-lg">/</div>
                  <input 
                    type="text"
                    value={flags}
                    onChange={(e) => setFlags(e.target.value)}
                    placeholder="gim"
                    className="w-12 bg-transparent outline-none font-mono text-primary font-bold"
                  />
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-xs mt-2 ml-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="font-medium">{error}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Test String</label>
              <textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Insert test text here..."
                className="w-full h-64 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm resize-none text-foreground"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm">Match Results</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase">
                  {matches.length} Found
                </span>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {matches.length > 0 ? (
                  matches.map((match, i) => (
                    <div key={i} className="p-3 rounded-lg bg-card border border-border text-xs font-mono break-all last:mb-0">
                      <div className="text-muted-foreground mb-1 text-[10px] uppercase font-bold tracking-tighter">Match {i + 1}</div>
                      <span className="text-primary font-bold">{match[0]}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground italic text-xs">
                    No matches found yet.
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleCopy}
              disabled={!regex}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Pattern Copied" : "Copy Full Regex"}
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
          <Info className="w-6 h-6 text-amber-500 shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400">Regular Expression Tips</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use flags like <code>g</code> (global), <code>i</code> (case-insensitive), or <code>m</code> (multiline) to control matching behavior. Remember that all processing happens locally in your browser.
            </p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
