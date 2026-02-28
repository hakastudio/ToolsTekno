"use client";

import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Code2, Copy, RefreshCcw, Check } from "lucide-react";

export default function SQLFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!input.trim()) return;
    
    // Improved formatting logic with better indentation
    let formatted = input
      .replace(/\s+/g, " ")
      .replace(/\s*SELECT\s*/gi, "\nSELECT ")
      .replace(/\s*FROM\s*/gi, "\nFROM ")
      .replace(/\s*WHERE\s*/gi, "\nWHERE ")
      .replace(/\s*AND\s*/gi, "\n  AND ")
      .replace(/\s*OR\s*/gi, "\n  OR ")
      .replace(/\s*GROUP BY\s*/gi, "\nGROUP BY ")
      .replace(/\s*ORDER BY\s*/gi, "\nORDER BY ")
      .replace(/\s*INSERT INTO\s*/gi, "\nINSERT INTO ")
      .replace(/\s*VALUES\s*/gi, "\nVALUES ")
      .replace(/\s*UPDATE\s*/gi, "\nUPDATE ")
      .replace(/\s*SET\s*/gi, "\nSET ")
      .replace(/\s*LEFT JOIN\s*/gi, "\nLEFT JOIN ")
      .replace(/\s*INNER JOIN\s*/gi, "\nINNER JOIN ")
      .replace(/\s*ON\s*/gi, "\n  ON ")
      .replace(/\s*LIMIT\s*/gi, "\nLIMIT ")
      .replace(/\s*OFFSET\s*/gi, "\nOFFSET ")
      .trim();
      
    // Handle indentation for common blocks
    const lines = formatted.split('\n');
    let indent = 0;
    const finalLines = lines.map(line => {
      let currentIndent = indent;
      if (line.match(/^\s*(SELECT|FROM|WHERE|GROUP BY|ORDER BY|INSERT|UPDATE|LIMIT|OFFSET)/i)) {
        currentIndent = 0;
      } else if (line.match(/^\s*(AND|OR|ON|LEFT JOIN|INNER JOIN|SET|VALUES)/i)) {
        currentIndent = 2;
      }
      return ' '.repeat(currentIndent) + line.trim();
    });

    setOutput(finalLines.join('\n'));
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="SQL Formatter"
      description="Format and beautify your SQL queries for better readability."
      icon={Code2}
      slug="sql-formatter"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Raw SQL Query
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="SELECT * FROM users WHERE active = 1 ORDER BY created_at DESC"
            className="w-full h-64 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono text-sm"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleFormat}
            className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            Beautify SQL
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {output && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Formatted SQL
              </label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-bold text-primary px-3 py-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Output"}
              </button>
            </div>
            <pre className="w-full h-64 p-4 rounded-xl bg-slate-900 text-blue-200 border border-slate-800 overflow-auto font-mono text-sm">
              {output}
            </pre>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
