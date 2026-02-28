"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Zap, Copy, Check, Trash2, AlignLeft, Code2 } from "lucide-react";

export default function CodeUnminify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState<"js" | "css" | "html">("js");
  const [copied, setCopied] = useState(false);

  const beautify = () => {
    if (!input.trim()) return;

    let formatted = "";
    try {
      if (language === "js") {
        // Simple JS Beautifier Logic (Rough Approximation)
        formatted = input
          .replace(/\{/g, " {\n  ")
          .replace(/\}/g, "\n}\n")
          .replace(/;/g, ";\n  ")
          .replace(/,\s*/g, ", ")
          .replace(/\n\s*\n/g, "\n")
          .replace(/\n\s*\}/g, "\n}");
      } else if (language === "css") {
        // Simple CSS Beautifier Logic
        formatted = input
          .replace(/\{/g, " {\n  ")
          .replace(/\}/g, "\n}\n")
          .replace(/;/g, ";\n  ")
          .replace(/,\s*/g, ", ")
          .replace(/\n\s*\}/g, "\n}");
      } else if (language === "html") {
        // Simple HTML Beautifier Logic
        formatted = input
          .replace(/></g, ">\n<")
          .split("\n")
          .map((line, i, arr) => {
            let indent = "";
            // This is a very basic indentation logic
            return line; 
          })
          .join("\n");
        
        // Slightly better HTML approach
        let indent = 0;
        formatted = input.replace(/(>)(<)(\/*)/g, "$1\n$2$3")
          .split("\n")
          .map(line => {
            if (line.match(/<\/\w/)) indent--;
            const spaced = "  ".repeat(Math.max(0, indent)) + line;
            if (line.match(/<\w/) && !line.match(/<\/\w/) && !line.match(/\/>/)) indent++;
            return spaced;
          })
          .join("\n");
      }
      setOutput(formatted.trim());
    } catch (err) {
      setOutput("Error formatting code. Please check your syntax.");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolPageLayout
      title="Code Unminify"
      description="Beautify and reformat minified JavaScript, CSS, or HTML code to make it readable again."
      icon={Zap}
      slug="unminify"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          {(["js", "css", "html"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                language === lang 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {lang === "js" ? "JavaScript" : lang.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                Minified Input
              </label>
              <button 
                onClick={handleClear}
                className="text-[10px] font-bold text-muted-foreground hover:text-red-500 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste your minified ${language.toUpperCase()} here...`}
              className="w-full h-[500px] p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-xs resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-primary" />
                Beautified Output
              </label>
              {output && (
                <button 
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-[10px] font-bold hover:bg-primary/10 transition-all flex items-center gap-2"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied" : "Copy Code"}
                </button>
              )}
            </div>
            <div className="w-full h-[500px] p-6 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-blue-300 overflow-auto whitespace-pre">
              {output || <span className="text-slate-600 italic">Formatted code will appear here...</span>}
            </div>
          </div>
        </div>

        <button
          onClick={beautify}
          disabled={!input.trim()}
          className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-3 group"
        >
          <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Unminify Code
        </button>
      </div>
    </ToolPageLayout>
  );
}
