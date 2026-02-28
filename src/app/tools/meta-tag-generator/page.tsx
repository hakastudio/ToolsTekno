"use client";

import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Tags, Copy, RefreshCcw, Check, Eye } from "lucide-react";

export default function MetaTagGenerator() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: "",
    author: "",
    robots: "index, follow",
  });
  const [copied, setCopied] = useState(false);

  const tags = `
<!-- Primary Meta Tags -->
<title>${formData.title || "Your Page Title"}</title>
<meta name="title" content="${formData.title || "Your Page Title"}">
<meta name="description" content="${formData.description || "Your Page Description"}">
${formData.keywords ? `<meta name="keywords" content="${formData.keywords}">` : ""}
<meta name="author" content="${formData.author || "Author Name"}">
<meta name="robots" content="${formData.robots}">
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(tags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      keywords: "",
      author: "",
      robots: "index, follow",
    });
  };

  return (
    <ToolPageLayout
      title="Meta Tag Generator"
      description="Create SEO-ready meta tags for your website to improve search engine ranking."
      icon={Tags}
      slug="meta-tag-generator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Site Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter page title"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Site Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description (max 160 characters)"
                className="w-full h-24 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="seo, developer, tools"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Eye className="w-4 h-4" />
                Live Preview
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-bold text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <pre className="text-blue-300 font-mono text-xs leading-relaxed overflow-x-auto">
              {tags}
            </pre>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Google Preview</h4>
            <div className="space-y-1">
              <div className="text-blue-600 dark:text-blue-400 text-lg hover:underline cursor-pointer truncate">
                {formData.title || "Your Page Title"}
              </div>
              <div className="text-green-700 dark:text-green-500 text-sm truncate">
                https://yourwebsite.com › tools › meta...
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                {formData.description || "Please enter a description to see how it looks on Google Search Engine Results."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
