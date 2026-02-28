"use client";

import React, { useState, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import {
  ImageIcon,
  Upload,
  Download,
  Settings2,
  Zap,
  CheckCircle2,
  RefreshCcw,
  Maximize2,
  FileImage,
  ShieldCheck,
  Trash2
} from "lucide-react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<"webp" | "jpeg" | "png">("webp");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const savings = compressedBlob && originalFile
    ? Math.max(0, Math.round((1 - compressedBlob.size / originalFile.size) * 100))
    : 0;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalFile(file);
    setCompressedBlob(null);
    setCompressedPreview(null);
    const reader = new FileReader();
    reader.onload = () => setOriginalPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setOriginalFile(file);
    setCompressedBlob(null);
    setCompressedPreview(null);
    const reader = new FileReader();
    reader.onload = () => setOriginalPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCompress = () => {
    if (!originalPreview) return;
    setIsCompressing(true);
    setCompressedBlob(null);
    setCompressedPreview(null);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const mimeType = format === "jpeg" ? "image/jpeg" : format === "png" ? "image/png" : "image/webp";
      const qualityRatio = format === "png" ? undefined : quality / 100;

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setCompressedBlob(blob);
          setCompressedPreview(URL.createObjectURL(blob));
          setIsCompressing(false);
        },
        mimeType,
        qualityRatio
      );
    };
    img.src = originalPreview;
  };

  const handleDownload = () => {
    if (!compressedBlob || !originalFile) return;
    const ext = format === "jpeg" ? "jpg" : format;
    const baseName = originalFile.name.replace(/\.[^.]+$/, "");
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-compressed.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setCompressedBlob(null);
    setCompressedPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <ToolPageLayout
      title="Image Pro Compressor"
      description="Real client-side image compression — reduce file size by up to 90% without uploading to any server."
      icon={ImageIcon}
      slug="compressor"
    >
      <div className="space-y-10">
        {/* Upload Zone */}
        {!originalPreview ? (
          <div
            className="relative group"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="border-2 border-dashed border-border rounded-[2.5rem] p-20 flex flex-col items-center justify-center gap-6 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold">Drop image here or click to upload</h3>
                <p className="text-sm text-muted-foreground">Supports PNG, JPG, WebP • Max 20MB</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Before / After Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Original */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Maximize2 className="w-3.5 h-3.5" /> Original
                  </h3>
                  <button onClick={handleReset} className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-border flex items-center justify-center">
                  <img src={originalPreview} alt="Original" className="max-w-full max-h-full object-contain" />
                </div>
                {originalFile && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-2"><FileImage className="w-3.5 h-3.5" />{originalFile.name}</span>
                    <span className="font-bold">{formatBytes(originalFile.size)}</span>
                  </div>
                )}
              </div>

              {/* Compressed */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-primary" /> Compressed
                  </h3>
                  {compressedBlob && (
                    <span className="text-xs font-black text-green-600 dark:text-green-400">
                      -{savings}% smaller
                    </span>
                  )}
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-border flex items-center justify-center">
                  {compressedPreview ? (
                    <img src={compressedPreview} alt="Compressed" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <span className="text-xs text-muted-foreground italic">Preview akan muncul setelah kompresi</span>
                  )}
                </div>
                {compressedBlob && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/5 border border-green-500/20 text-xs font-medium">
                    <span className="text-green-700 dark:text-green-400 font-bold">{formatBytes(compressedBlob.size)}</span>
                    <span className="text-muted-foreground">saved {formatBytes(originalFile!.size - compressedBlob.size)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="p-6 rounded-2xl border border-border bg-card/50 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Settings2 className="w-4 h-4" /> Compression Settings
              </h3>

              {/* Quality */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold">Quality</label>
                  <span className="text-sm font-black text-primary">
                    {format === "png" ? "Lossless" : `${quality}%`}
                  </span>
                </div>
                <input
                  type="range" min="10" max="100" value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  disabled={format === "png"}
                  className="w-full h-2 bg-muted rounded-full outline-none appearance-none cursor-pointer accent-primary disabled:opacity-40"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Smaller file</span><span>Higher quality</span>
                </div>
              </div>

              {/* Format */}
              <div className="space-y-3">
                <label className="text-sm font-bold">Output Format</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["webp", "jpeg", "png"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                        format === f
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                          : "bg-card border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {f === "jpeg" ? "JPG" : f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCompress}
                disabled={isCompressing}
                className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-3 group"
              >
                {isCompressing ? (
                  <><RefreshCcw className="w-5 h-5 animate-spin" />Compressing...</>
                ) : (
                  <><Zap className="w-5 h-5 group-hover:scale-125 transition-transform" />Compress Image</>
                )}
              </button>

              <button
                onClick={handleDownload}
                disabled={!compressedBlob}
                className="flex-1 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                Download {compressedBlob ? `(${formatBytes(compressedBlob.size)})` : ""}
              </button>
            </div>
          </div>
        )}

        {/* Feature Highlights */}
        <div className="pt-10 border-t grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          {[
            { icon: Zap, title: "Real Compression", desc: "Uses Canvas API — actual pixel-level compression, not a preview." },
            { icon: ShieldCheck, title: "100% Private", desc: "Files never leave your browser. No server upload." },
            { icon: CheckCircle2, title: "Multi-Format", desc: "Export as WebP, JPG, or PNG with adjustable quality." }
          ].map((feature, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <feature.icon className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-bold">{feature.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
}
