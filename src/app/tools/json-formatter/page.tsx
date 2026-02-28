"use client";

import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Braces, Copy, RefreshCcw, Check, AlertCircle } from "lucide-react";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError("");
    } catch (err: any) {
      setError(err.message);
      setOutput("");
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="JSON Formatter & Validator"
      description="Clean up, format, and validate your JSON data in seconds."
      icon={Braces}
      slug="json-formatter"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here (e.g. {"key": "value"})'
            className="w-full h-64 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleFormat}
            className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            Format & Validate
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              Invalid JSON: {error}
            </p>
          </div>
        )}

        {output && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Formatted Output
              </label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-bold text-primary px-3 py-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Output"}
              </button>
            </div>
            <pre className="w-full h-64 p-4 rounded-xl bg-slate-900 text-blue-300 border border-slate-800 overflow-auto font-mono text-sm">
              {output}
            </pre>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
