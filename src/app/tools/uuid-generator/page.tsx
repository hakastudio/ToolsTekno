"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Fingerprint, RefreshCcw, Copy, Check, Plus } from "lucide-react";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(1);

  const generateUuid = () => {
    const newUuids = Array.from({ length: count }, () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    });
    setUuids(newUuids);
  };

  const handleCopyAll = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="UUID / GUID Generator"
      description="Generate secure, unique, and version 4 compliant UUIDs for your applications."
      icon={Fingerprint}
      slug="uuid-generator"
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-end gap-6">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Number of UUIDs</label>
            <input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            onClick={generateUuid}
            className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Generate UUIDs
          </button>
        </div>

        {uuids.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">Generated UUIDs</h3>
              <button
                onClick={handleCopyAll}
                className="flex items-center gap-2 text-xs font-bold text-primary px-3 py-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied All" : "Copy All"}
              </button>
            </div>
            <div className="space-y-2">
              {uuids.map((uuid, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 font-mono text-sm text-slate-600 dark:text-slate-400 flex justify-between items-center group">
                  {uuid}
                  <button 
                    onClick={() => navigator.clipboard.writeText(uuid)}
                    className="opacity-0 group-hover:opacity-100 text-primary transition-opacity"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
