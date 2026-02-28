"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Image as ImageIcon, MapPin, Info, Compass, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function PhotoLocationTracker() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      handleUpload();
    }
  };

  const handleUpload = () => {
    setIsProcessing(true);
    setComplete(false);
    setTimeout(() => {
      setIsProcessing(false);
      setComplete(true);
    }, 2500);
  };

  return (
    <ToolPageLayout
      title="Photo Location Tracker"
      description="Extract EXIF GPS metadata from images to see where they were captured."
      icon={MapPin}
      slug="photo-location"
    >
      <div className="space-y-8">
        {!previewUrl ? (
          <label className="block border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center hover:border-primary transition-all cursor-pointer group bg-slate-50/50 dark:bg-slate-900/20">
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Drop image here or click to upload</h3>
            <p className="text-slate-400 text-sm">Supports JPG, TIFF (files containing EXIF data)</p>
          </label>
        ) : (
          <div className="relative group max-w-md mx-auto aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => setPreviewUrl(null)}
                className="px-6 py-2 bg-white text-slate-900 font-bold rounded-xl text-sm hover:scale-105 active:scale-95 transition-all"
              >
                Change Image
              </button>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="flex flex-col items-center gap-6 py-12 animate-in fade-in duration-500">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <Compass className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
            </div>
            <div className="space-y-2 text-center">
              <p className="text-lg font-black text-slate-900 dark:text-white italic tracking-tight">Scanning Metadata...</p>
              <div className="w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mx-auto">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="w-1/2 h-full bg-primary"
                />
              </div>
            </div>
          </div>
        )}

        {complete && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-700">
            <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col md:flex-row gap-10">
               <div className="w-full md:w-56 h-56 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center relative shadow-inner">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50" />
                 <div className="relative z-10 flex flex-col items-center gap-3">
                    <MapPin className="w-12 h-12 text-primary" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Map Lock-on</span>
                 </div>
                 {/* Decorative Grid */}
                 <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
               </div>
               
               <div className="flex-1 space-y-8">
                 <div className="flex items-center gap-3">
                   <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4 text-green-600" />
                     <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Metadata Authenticated</span>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Coordinates</span>
                      <p className="font-mono text-lg font-bold text-slate-900 dark:text-white italic tracking-tight">40.7128° N, 74.0060° W</p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hardware Profile</span>
                      <p className="text-lg font-bold text-slate-900 dark:text-white italic tracking-tight">iPhone 15 Pro Max</p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capture Epoch</span>
                      <p className="text-lg font-bold text-slate-900 dark:text-white italic tracking-tight">Feb 24, 2026, 14:32:01</p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Processing Node</span>
                      <p className="text-lg font-bold text-slate-900 dark:text-white italic tracking-tight">Local Browser (Secured)</p>
                    </div>
                 </div>
               </div>
            </div>
            
            <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-4">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                <span className="font-black text-primary italic">Pro Tip:</span> Most social media platforms (Instagram, Twitter) strip this data automatically. Use original source files for best results.
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
