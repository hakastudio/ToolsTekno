"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Link2, Copy, Trash2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleProcess = () => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (err) {
      setOutput("Error: Invalid input for decoding.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolPageLayout
      title="URL Encoder & Decoder"
      description="Quickly encode or decode URI components for safe passage through URLs."
      icon={Link2}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-foreground">Input Text</label>
              <div className="flex bg-muted rounded-lg p-1">
                {(["encode", "decode"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-md transition-all ${
                      mode === m ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter plain text here..." : "Enter encoded URL component here..."}
              className="w-full h-48 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleProcess}
                className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                {mode === "encode" ? "Encode URI Component" : "Decode URI Component"}
              </button>
              <button
                onClick={clearAll}
                className="p-3 bg-muted text-muted-foreground hover:text-foreground rounded-xl transition-all"
                title="Clear All"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-foreground">Result</label>
              <button
                onClick={copyToClipboard}
                disabled={!output}
                className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md transition-all ${
                  copied ? "bg-green-500 text-white" : "bg-muted text-muted-foreground hover:text-foreground disabled:opacity-50"
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy Result
                  </>
                )}
              </button>
            </div>
            <div className="w-full h-48 p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm break-all overflow-auto">
              {output || <span className="opacity-30 italic">Result will appear here...</span>}
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
