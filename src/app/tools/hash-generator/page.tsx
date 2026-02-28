"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Fingerprint, Copy, Check, Hash, RefreshCcw, ShieldCheck } from "lucide-react";

export default function MultiHashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<{ [key: string]: string }>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const generateHashes = async () => {
    if (!input) return;

    const results: { [key: string]: string } = {};

    // Web Crypto API for SHA algorithms
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    try {
      // SHA-1
      const sha1Buffer = await crypto.subtle.digest("SHA-1", data);
      results["SHA-1"] = Array.from(new Uint8Array(sha1Buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

      // SHA-256
      const sha256Buffer = await crypto.subtle.digest("SHA-256", data);
      results["SHA-256"] = Array.from(new Uint8Array(sha256Buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

      // SHA-512
      const sha512Buffer = await crypto.subtle.digest("SHA-512", data);
      results["SHA-512"] = Array.from(new Uint8Array(sha512Buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
      
      // Note: MD5 is not natively supported by SubtleCrypto for security reasons,
      // but provided in results as placeholder or via library if available.
      // For this professional tool, we'll focus on secure web-native hashes.
      
      setHashes(results);
    } catch (err) {
      console.error("Hashing error:", err);
    }
  };

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleReset = () => {
    setInput("");
    setHashes({});
  };

  return (
    <ToolPageLayout
      title="Multi Hash Generator"
      description="Cryptographically secure hashing suite. Generate SHA-1, SHA-256, and SHA-512 hashes instantly in your browser."
      icon={Fingerprint}
      slug="hash-generator"
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-foreground flex items-center gap-2">
              <Hash className="w-4 h-4 text-primary" />
              Input Text
            </label>
            <button 
              onClick={handleReset}
              className="text-[10px] font-bold text-muted-foreground hover:text-red-500 flex items-center gap-1 transition-colors"
            >
              <RefreshCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste the text you want to hash..."
            className="w-full h-32 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-foreground"
          />
          <button
            onClick={generateHashes}
            disabled={!input.trim()}
            className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-3 group"
          >
            <Fingerprint className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Generate Signatures
          </button>
        </div>

        {Object.keys(hashes).length > 0 && (
          <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {Object.entries(hashes).map(([algo, hash]) => (
              <div key={algo} className="minimal-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-white font-black tracking-widest uppercase">
                      {algo}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-primary font-bold break-all">
                    {hash}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(algo, hash)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                    copiedKey === algo 
                    ? "bg-green-500/10 text-green-600" 
                    : "bg-primary/5 text-primary hover:bg-primary/10"
                  }`}
                >
                  {copiedKey === algo ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === algo ? "Copied" : `Copy ${algo}`}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-green-500 shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-green-700 dark:text-green-400">Security Guaranteed</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All hashing is performed client-side using the <strong>Web Crypto API</strong>. Your sensitive input data never leaves your device and is never sent to any server.
            </p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
