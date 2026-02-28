"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Key, RefreshCcw, Copy, Check, Info, AlertCircle } from "lucide-react";

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<{ header: any; payload: any } | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const decodeToken = () => {
    if (!token.trim()) return;
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format. Must have 3 parts separated by dots.");
      }

      setDecoded({
        header: JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"))),
        payload: JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))),
      });
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to decode JWT.");
      setDecoded(null);
    }
  };

  const handleReset = () => {
    setToken("");
    setDecoded(null);
    setError("");
  };

  return (
    <ToolPageLayout
      title="JWT Decoder"
      description="Decode and inspect your JSON Web Tokens (JWT) payload and header safely."
      icon={Key}
      slug="jwt-decoder"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Encoded JWT Token
          </label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT token here..."
            className="w-full h-32 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono text-xs break-all"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={decodeToken}
            className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            Decode Token
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
          <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-sm font-bold text-red-700 dark:text-red-400">{error}</span>
          </div>
        )}

        {decoded && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <Info className="w-4 h-4 text-primary" />
                Algorithm & Header
              </div>
              <pre className="p-4 rounded-2xl bg-slate-900 text-blue-300 text-xs font-mono overflow-auto border border-slate-800">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <Info className="w-4 h-4 text-primary" />
                Decoded Payload
              </div>
              <pre className="p-4 rounded-2xl bg-slate-900 text-green-300 text-xs font-mono overflow-auto border border-slate-800">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
            
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center uppercase font-bold tracking-widest">
                Safe Processing: Decoding is done entirely in your browser.
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
