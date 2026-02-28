"use client";

import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Binary, Copy, RefreshCcw, Check, ArrowDownUp } from "lucide-react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setOutput(btoa(input));
      setError("");
    } catch (err) {
      setError("Invalid input for Base64 encoding.");
    }
  };

  const handleDecode = () => {
    try {
      setOutput(atob(input));
      setError("");
    } catch (err) {
      setError("Invalid Base64 string for decoding.");
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
      title="Base64 Encode & Decode"
      description="Easily convert text or binary data to Base64 format and back."
      icon={Binary}
      slug="base64"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Input Text / Base64
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your text or paste Base64 code here..."
            className="w-full h-48 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleEncode}
            className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
          >
            Encode
          </button>
          <button
            onClick={handleDecode}
            className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2"
          >
            Decode
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
          <p className="text-red-500 text-sm font-medium">{error}</p>
        )}

        {output && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Result
              </label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-bold text-primary px-3 py-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Result"}
              </button>
            </div>
            <div className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm break-all">
              {output}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
