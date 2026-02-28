"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { ImageIcon, Type, Link as LinkIcon, Share2, Copy, Check, Eye, Code2 } from "lucide-react";

export default function OpenGraphGenerator() {
  const [data, setData] = useState({
    title: "",
    description: "",
    url: "",
    image: "",
    site_name: "",
    type: "website",
    twitter_card: "summary_large_image"
  });
  const [copied, setCopied] = useState(false);

  const updateData = (field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const generateTags = () => {
    const tags = [
      `<!-- Primary Meta Tags -->`,
      `<title>${data.title}</title>`,
      `<meta name="title" content="${data.title}">`,
      `<meta name="description" content="${data.description}">`,
      ``,
      `<!-- Open Graph / Facebook -->`,
      `<meta property="og:type" content="${data.type}">`,
      `<meta property="og:url" content="${data.url}">`,
      `<meta property="og:title" content="${data.title}">`,
      `<meta property="og:description" content="${data.description}">`,
      `<meta property="og:image" content="${data.image}">`,
      data.site_name ? `<meta property="og:site_name" content="${data.site_name}">` : "",
      ``,
      `<!-- Twitter -->`,
      `<meta property="twitter:card" content="${data.twitter_card}">`,
      `<meta property="twitter:url" content="${data.url}">`,
      `<meta property="twitter:title" content="${data.title}">`,
      `<meta property="twitter:description" content="${data.description}">`,
      `<meta property="twitter:image" content="${data.image}">`,
    ].filter(Boolean).join("\n");
    return tags;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="Open Graph Generator"
      description="Create social meta tags for Facebook and Twitter to optimize how your website looks when shared."
      icon={ImageIcon}
      slug="og-generator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div className="space-y-6">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Type className="w-4 h-4 text-primary" />
                 Basic Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page Title</label>
                    <input 
                       type="text" 
                       value={data.title}
                       onChange={(e) => updateData("title", e.target.value)}
                       placeholder="e.g. Best SEO Tools 2024"
                       className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page Description</label>
                    <textarea 
                       value={data.description}
                       onChange={(e) => updateData("description", e.target.value)}
                       placeholder="e.g. Discover the ultimate collection of technical SEO and developer tools..."
                       className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 h-24 resize-none"
                    />
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <LinkIcon className="w-4 h-4 text-primary" />
                 Assets & URLs
              </h3>
              <div className="grid grid-cols-1 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Site URL</label>
                    <input 
                       type="text" 
                       value={data.url}
                       onChange={(e) => updateData("url", e.target.value)}
                       placeholder="https://example.com"
                       className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">OG Image URL</label>
                    <input 
                       type="text" 
                       value={data.image}
                       onChange={(e) => updateData("image", e.target.value)}
                       placeholder="https://example.com/og-image.jpg"
                       className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                    />
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="space-y-6">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Eye className="w-4 h-4 text-primary" />
                 Live Preview
              </h3>
              <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl">
                 {data.image ? (
                   <img src={data.image} alt="OG Image" className="w-full aspect-[1.91/1] object-cover border-b border-slate-100 dark:border-slate-800" />
                 ) : (
                   <div className="w-full aspect-[1.91/1] bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-12 h-12 opacity-10" />
                   </div>
                 )}
                 <div className="p-6 space-y-2">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{data.url ? new URL(data.url).hostname : "domain.com"}</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">{data.title || "Page Title Sample"}</div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{data.description || "Page description will appear here when you share the link."}</p>
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Code2 className="w-4 h-4 text-primary" />
                   Generated Tags
                </h3>
                <button 
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2 text-xs"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy Tags"}
                </button>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 dark:bg-black border border-slate-800 overflow-hidden">
                 <pre className="text-[10px] text-blue-400 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                   {generateTags()}
                 </pre>
              </div>
           </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
