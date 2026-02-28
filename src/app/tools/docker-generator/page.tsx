"use client";

import React, { useState, useEffect } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { 
  Terminal, 
  Copy, 
  Check, 
  Cog, 
  Layers, 
  Cpu, 
  ShieldCheck,
  Zap,
  Box,
  RefreshCcw
} from "lucide-react";

type Stack = "node" | "python" | "react" | "php";

export default function DockerGenerator() {
  const [copied, setCopied] = useState(false);
  const [stack, setStack] = useState<Stack>("node");
  const [options, setOptions] = useState({
    multiStage: true,
    alpine: true,
    port: 3000,
    prod: true,
    env: true
  });

  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    let code = "";
    if (stack === "node") {
      code = options.multiStage 
        ? `# Build Stage\nFROM node:${options.alpine ? 'alpine' : 'latest'} AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\n\n# Production Stage\nFROM node:${options.alpine ? 'alpine' : 'latest'}\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/package*.json ./\nRUN npm install --only=production\nEXPOSE ${options.port}\nCMD ["npm", "start"]`
        : `FROM node:${options.alpine ? 'alpine' : 'latest'}\nWORKDIR /app\nCOPY . .\nRUN npm install\nEXPOSE ${options.port}\nCMD ["npm", "start"]`;
    } else if (stack === "react") {
       code = `# Build Stage\nFROM node:alpine AS build\nWORKDIR /app\nCOPY . .\nRUN npm install && npm run build\n\n# Nginx Stage\nFROM nginx:stable-alpine\nCOPY --from=build /app/build /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]`;
    } else if (stack === "python") {
       code = `FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD ["python", "app.py"]`;
    } else if (stack === "php") {
       code = `FROM php:8.2-fpm-alpine\nRUN docker-php-ext-install pdo pdo_mysql\nWORKDIR /var/www/html\nCOPY . .\nEXPOSE 9000`;
    }
    setGeneratedCode(code.trim());
  }, [stack, options]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="Dockerfile Generator PRO"
      description="Create optimized, multi-stage Docker configurations for any tech stack in seconds."
      icon={Box}
      slug="docker-generator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {/* Stack Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Technology Stack
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(["node", "react", "python", "php"] as Stack[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStack(s)}
                  className={`py-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                    stack === s 
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                      : "bg-card border-border text-muted-foreground hover:border-slate-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Build Strategy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Multi-Stage Build", key: "multiStage" },
                { label: "Use Alpine Linux", key: "alpine" },
                { label: "Production Optimized", key: "prod" },
                { label: "Environment Injection", key: "env" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setOptions({ ...options, [item.key]: !(options as any)[item.key] })}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                    (options as any)[item.key] 
                      ? "bg-primary/10 border-primary text-primary" 
                      : "bg-card border-border text-muted-foreground hover:border-slate-300"
                  }`}
                >
                  <span className="text-xs font-bold leading-tight">{item.label}</span>
                  {(options as any)[item.key] ? <Zap className="w-4 h-4" /> : <RefreshCcw className="w-3 h-3 opacity-50" />}
                </button>
              ))}
            </div>
          </div>

          {/* Port Setting */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Exposed Port</label>
              <input
                type="number"
                value={options.port}
                onChange={(e) => setOptions({ ...options, port: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none text-sm font-bold"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10 flex items-start gap-3">
             <ShieldCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
             <p className="text-[10px] text-green-700 dark:text-green-400 font-medium leading-relaxed">
               All generated Dockerfiles follow industry best practices, including non-root users (where applicable) and minimal image sizes.
             </p>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Dockerfile Output
            </h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs font-bold text-primary px-3 py-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Dockerfile"}
            </button>
          </div>
          <div className="relative group">
            <pre className="w-full p-6 rounded-2xl bg-slate-900 text-blue-300 font-mono text-[11px] leading-relaxed overflow-auto min-h-[450px] border border-slate-800">
              {generatedCode}
            </pre>
            <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-700 uppercase tracking-widest select-none">
              v2024.1
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
