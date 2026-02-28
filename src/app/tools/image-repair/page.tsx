"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { ShieldAlert, Upload, Download, RefreshCcw, CheckCircle2, FileWarning, Image as ImageIcon } from "lucide-react";

export default function ImageRepair() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setLogs([]);
    }
  };

  const repairImage = async () => {
    if (!file) return;
    setIsProcessing(true);
    setLogs(["Initializing repair engine...", `Analyzing ${file.name}...`]);

    try {
      const buffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(buffer);
      let repaired = uint8;
      let repairedCount = 0;

      // JPEG Repair (Common header issue)
      if (file.type === "image/jpeg" || file.name.toLowerCase().endsWith(".jpg")) {
        if (uint8[0] !== 0xFF || uint8[1] !== 0xD8) {
          setLogs(prev => [...prev, "Warning: Invalid JPEG header detected."]);
          const newHeader = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x60, 0x00, 0x60, 0x00, 0x00]);
          const combined = new Uint8Array(newHeader.length + uint8.length);
          combined.set(newHeader);
          combined.set(uint8, newHeader.length);
          repaired = combined;
          repairedCount++;
          setLogs(prev => [...prev, "Fixed: Injected standard JFIF header."]);
        }
        
        // Check for EOI
        if (uint8[uint8.length - 2] !== 0xFF || uint8[uint8.length - 1] !== 0xD9) {
          const combined = new Uint8Array(repaired.length + 2);
          combined.set(repaired);
          combined.set([0xFF, 0xD9], repaired.length);
          repaired = combined;
          repairedCount++;
          setLogs(prev => [...prev, "Fixed: Added missing End-of-Image marker."]);
        }
      }

      // PNG Repair
      if (file.type === "image/png" || file.name.toLowerCase().endsWith(".png")) {
        const pngHeader = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
        let headerValid = true;
        for (let i = 0; i < 8; i++) {
          if (uint8[i] !== pngHeader[i]) {
            headerValid = false;
            break;
          }
        }
        if (!headerValid) {
          setLogs(prev => [...prev, "Warning: Invalid PNG signature."]);
          const combined = new Uint8Array(8 + uint8.length);
          combined.set(pngHeader);
          combined.set(uint8, 8);
          repaired = combined;
          repairedCount++;
          setLogs(prev => [...prev, "Fixed: Restored standard PNG signature."]);
        }
      }

      if (repairedCount > 0) {
        setLogs(prev => [...prev, `Success: Fixed ${repairedCount} structural issues.`]);
        setResult({
          blob: new Blob([repaired], { type: file.type }),
          name: `repaired_${file.name}`
        });
      } else {
        setLogs(prev => [...prev, "No structural issues found in file headers. File might be corrupted in its data chunks."]);
      }
    } catch (err) {
      setLogs(prev => [...prev, "Error: Critical failure during repair process."]);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPageLayout
      title="Repair Corrupted Image"
      description="Attempt to fix damaged or corrupted image files by restoring missing headers and standard file signatures."
      icon={ShieldAlert}
      slug="image-repair"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
           <div className="p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center gap-6 text-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group relative">
              <input 
                type="file" 
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/webp"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 shadow-xl group-hover:scale-110 transition-transform">
                 <Upload className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-1">
                 <div className="font-bold text-slate-900 dark:text-white">
                    {file ? file.name : "Click or drag images to repair"}
                 </div>
                 <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Supports JPG, PNG, WEBP</div>
              </div>
           </div>

           {file && !result && (
              <button
                onClick={repairImage}
                disabled={isProcessing}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <ShieldAlert className="w-5 h-5" />}
                Repair Metadata
              </button>
           )}

           {result && (
              <button
                onClick={downloadFile}
                className="w-full py-4 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Fixed Image
              </button>
           )}
        </div>

        <div className="space-y-6">
           <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <RefreshCcw className="w-4 h-4 text-primary" />
              Processing Status
           </h3>
           <div className="p-8 rounded-[2.5rem] bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 min-h-[300px]">
              {logs.length === 0 && (
                <div className="text-slate-600 italic">Waiting for file upload...</div>
              )}
              {logs.map((log, i) => (
                <div key={i} className={`flex items-start gap-2 ${log.startsWith("Success") ? "text-green-400" : log.startsWith("Error") ? "text-red-400" : log.startsWith("Fixed") ? "text-blue-400" : "text-slate-300"}`}>
                   <span className="opacity-30">{">"}</span>
                   <span>{log}</span>
                </div>
              ))}
              {isProcessing && <div className="text-primary animate-pulse">Running diagnostic scripts...</div>}
           </div>

           <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-3">
              <div className="font-bold text-sm flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                 <FileWarning className="w-4 h-4" />
                 Limitations
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This tool focuses on <span className="text-primary font-bold">Binary Head Recovery</span>. It can fix files that won't open due to invalid identifiers or truncated tails, but it cannot restore pixels in severely corrupted data chunks.
              </p>
           </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
