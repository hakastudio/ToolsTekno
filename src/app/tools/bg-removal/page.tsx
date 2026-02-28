"use client";

import React, { useState, useRef, useEffect } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Eraser, Upload, Download, RefreshCcw, MousePointer2, Settings2, Sliders } from "lucide-react";

export default function BackgroundRemover() {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tolerance, setTolerance] = useState(30);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeBackground = () => {
    if (!image || !canvasRef.current) return;
    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Pick top-left pixel as target background color
      const targetR = data[0];
      const targetG = data[1];
      const targetB = data[2];

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calculating color distance
        const distance = Math.sqrt(
          Math.pow(r - targetR, 2) +
          Math.pow(g - targetG, 2) +
          Math.pow(b - targetB, 2)
        );

        if (distance < tolerance) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedImage(canvas.toDataURL("image/png"));
      setIsProcessing(false);
    };
    img.src = image;
  };

  return (
    <ToolPageLayout
      title="Background Remover"
      description="Remove solid backgrounds from images instantly using the Color-Range algorithm. Best for icons and product photos."
      icon={Eraser}
      slug="bg-removal"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
           <div className={`p-10 rounded-[2.5rem] border-2 border-dashed ${image ? 'border-primary/20 bg-primary/5' : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50'} flex flex-col items-center justify-center gap-6 text-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group relative overflow-hidden h-[400px]`}>
              {!image ? (
                <>
                  <input 
                    type="file" 
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 shadow-xl group-hover:scale-110 transition-transform">
                     <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-1">
                     <div className="font-bold text-slate-900 dark:text-white">Upload Image</div>
                     <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Clear or Solid Backgrounds work best</div>
                  </div>
                </>
              ) : (
                <img src={processedImage || image} alt="Preview" className="max-h-full max-w-full object-contain z-0 shadow-2xl rounded-xl" />
              )}
           </div>

           {image && (
             <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="flex items-center justify-between">
                   <div className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-primary" />
                      Adjustment Settings
                   </div>
                   <div className="text-xs font-bold text-primary">{tolerance}%</div>
                </div>
                <div className="space-y-4">
                   <input 
                      type="range" 
                      min="1" 
                      max="150" 
                      value={tolerance}
                      onChange={(e) => setTolerance(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-lg appearance-none cursor-pointer accent-primary"
                   />
                   <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      <span>Strict</span>
                      <span>Tolerance</span>
                      <span>Aggressive</span>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <button
                    onClick={removeBackground}
                    disabled={isProcessing}
                    className="py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                   >
                     {isProcessing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Eraser className="w-4 h-4" />}
                     Process
                   </button>
                   <button
                    onClick={() => { setImage(null); setProcessedImage(null); }}
                    className="py-4 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                   >
                     Reset
                   </button>
                </div>
             </div>
           )}
        </div>

        <div className="space-y-6">
           <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 space-y-6">
              <h3 className="text-lg font-bold text-foreground">Pro Capability</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our <span className="text-primary font-bold">Color-Range Engine</span> analyzes the target color pixels (sampled from the edge) and calculates the Euclidean distance to determine transparency. Perfect for logos, graphics, and studio shots.
              </p>
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                       <MousePointer2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Automatic Edge Sampling</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                       <Sliders className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Precision Threshold Control</span>
                 </div>
              </div>
           </div>

           {processedImage && (
             <div className="p-8 rounded-[2.5rem] bg-green-500 text-white space-y-4 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                   <Download className="w-5 h-5" />
                   Download Ready
                </div>
                <p className="text-sm opacity-90">Your image has been processed. Download as transparent PNG.</p>
                <a 
                  href={processedImage} 
                  download="background_removed.png"
                  className="block w-full text-center py-4 bg-white text-green-600 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-xl"
                >
                  Download PNG
                </a>
             </div>
           )}

           <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </ToolPageLayout>
  );
}
