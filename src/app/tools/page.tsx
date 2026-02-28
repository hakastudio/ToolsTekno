"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import {
  Search, Layout, Code2, Image as ImageIcon, Globe, Braces, Tags, FileCode,
  MapPin, Binary, Fingerprint, Key, Terminal, Cog, Laptop, ArrowRight,
  Zap, Box, Calendar, GitBranch, FileText, TrendingUp, DollarSign, Activity,
  History, Share2, HelpCircle, ShieldAlert, Eraser, Database, UnfoldVertical,
  Server, Lock, Eye, Settings2
} from "lucide-react";

const CATEGORIES = [
  {
    id: "keyword-content",
    name: "Keyword & Content",
    icon: Search,
    color: "text-blue-500 bg-blue-500/10",
    tools: [
      { name: "Keyword Density Checker", desc: "Analyze and optimize word frequencies.", icon: Search, href: "/tools/keyword-density" },
      { name: "Meta Analyzer", desc: "Audit SEO title/description tags.", icon: Tags, href: "/tools/meta-analyzer" },
    ]
  },
  {
    id: "technical-seo",
    name: "Technical SEO & Google",
    icon: Activity,
    color: "text-green-500 bg-green-500/10",
    tools: [
      { name: "Robots.txt Generator", desc: "Crawl optimization for bots.", icon: FileCode, href: "/tools/robots-generator" },
      { name: "HTTP Status Checker", desc: "Bulk URL response code status.", icon: Activity, href: "/tools/http-status" },
      { name: "Google Index Checker", desc: "Verify URL indexing status.", icon: Eye, href: "/tools/google-index" },
      { name: "Google Cache Checker", desc: "Check last crawl timestamp.", icon: History, href: "/tools/google-cache" },
      { name: "HTTP Headers Checker", desc: "Inspect server response headers.", icon: Terminal, href: "/tools/http-headers" },
      { name: "DNS Propagation", desc: "Global DNS record verification.", icon: Share2, href: "/tools/dns-propagation" },
    ]
  },
  {
    id: "schema-social",
    name: "Schema & Social Media",
    icon: Share2,
    color: "text-violet-500 bg-violet-500/10",
    tools: [
      { name: "Meta Tag Generator", desc: "Social & SEO tag generation.", icon: Tags, href: "/tools/meta-tag-generator" },
      { name: "Open Graph Checker", desc: "Preview social media appearance.", icon: Share2, href: "/tools/og-checker" },
      { name: "FAQ Schema Generator", desc: "JSON-LD for rich search results.", icon: HelpCircle, href: "/tools/faq-schema" },
      { name: "Open Graph Generator", desc: "One-click social meta generation.", icon: ImageIcon, href: "/tools/og-generator" },
    ]
  },
  {
    id: "image-metadata",
    name: "Image & Metadata",
    icon: ImageIcon,
    color: "text-amber-500 bg-amber-500/10",
    tools: [
      { name: "Photo Location Tracker", desc: "GPS metadata extraction tool.", icon: MapPin, href: "/tools/photo-location" },
      { name: "Image Pro Compressor", desc: "Lossless asset optimization with real download.", icon: Zap, href: "/tools/compressor", isPro: true },
      { name: "Repair Corrupted Image", desc: "Fix header errors in damaged files.", icon: ShieldAlert, href: "/tools/image-repair" },
      { name: "Background Remover", desc: "AI-powered asset extraction.", icon: Eraser, href: "/tools/bg-removal" },
    ]
  },
  {
    id: "developer-formatting",
    name: "Developer & Data Suite",
    icon: Terminal,
    color: "text-rose-500 bg-rose-500/10",
    tools: [
      { name: "Dockerfile Generator PRO", desc: "Multi-stage build configs.", icon: Box, href: "/tools/docker-generator", isPro: true },
      { name: "SQL Formatter", desc: "Database query beautifier.", icon: Database, href: "/tools/sql-formatter" },
      { name: "JSON Formatter", desc: "Validation & structure tool.", icon: Braces, href: "/tools/json-formatter" },
      { name: "Base64 Utility", desc: "Universal data encoding.", icon: Binary, href: "/tools/base64" },
      { name: "UUID Generator", desc: "Bulk V4 compliant identifiers.", icon: Fingerprint, href: "/tools/uuid-generator" },
      { name: "Cron Job Generator", desc: "Visual crontab schedule designer.", icon: Calendar, href: "/tools/cron-generator" },
      { name: "JWT Decoder", desc: "Inspect session tokens locally.", icon: Key, href: "/tools/jwt-decoder" },
      { name: "Regex Tester", desc: "Real-time expression validator.", icon: UnfoldVertical, href: "/tools/regex-tester" },
      { name: "Code Unminify", desc: "Beautify HTML/JS/CSS source.", icon: Zap, href: "/tools/unminify" },
      { name: "Apache2 VHost Gen", desc: "Server block configurations.", icon: Server, href: "/tools/vhost-generator", isPro: true },
      { name: "Nginx Config Gen", desc: "Expert server configurations.", icon: Cog, href: "/tools/nginx-config" },
      { name: "htaccess Master PRO", desc: "Security & redirect logic.", icon: Lock, href: "/tools/htaccess", isPro: true },
      { name: "Multi Hash Generator", desc: "SHA-1, SHA-256, SHA-512 hashing.", icon: Fingerprint, href: "/tools/hash-generator" },
      { name: "Git Command Helper", desc: "Visual guide for modern Git workflows.", icon: GitBranch, href: "/tools/git-helper" },
    ]
  }
];

const ALL_TOOLS = CATEGORIES.flatMap(cat =>
  cat.tools.map(t => ({ ...t, category: cat.name, categoryColor: cat.color }))
);

export default function ToolsLibrary() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = ALL_TOOLS.filter(tool => {
    const matchSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "all" || tool.category === CATEGORIES.find(c => c.id === activeCategory)?.name;
    return matchSearch && matchCat;
  });

  const totalTools = ALL_TOOLS.length;

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-12 max-w-6xl">
        <div className="space-y-10">
          {/* Page Header */}
          <div className="text-center space-y-4 py-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Tools Library
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {totalTools} professional tools — all free, all run in your browser. No signup required.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-14 pr-5 py-4 text-base rounded-2xl bg-card border border-border outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium shadow-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === "all" ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              Semua ({totalTools})
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeCategory === cat.id ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
              >
                <cat.icon className="w-3.5 h-3.5" />{cat.name}
              </button>
            ))}
          </div>

          {/* Results count if searching */}
          {search && (
            <p className="text-sm text-muted-foreground text-center">
              {filtered.length} hasil untuk &quot;{search}&quot;
            </p>
          )}

          {/* Tools Grid */}
          {search || activeCategory !== "all" ? (
            /* Flat grid when filtering/searching */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.length > 0 ? filtered.map((tool, i) => (
                <Link key={i} href={tool.href} className="group minimal-card p-5 flex flex-col gap-3 hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between gap-2">
                    <div className={`p-2.5 rounded-xl ${tool.categoryColor}`}>
                      <tool.icon className="w-5 h-5" />
                    </div>
                    {(tool as any).isPro && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-black uppercase tracking-wider">PRO</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{tool.desc}</p>
                  </div>
                  <div className="mt-auto pt-2 border-t border-border">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{tool.category}</span>
                  </div>
                </Link>
              )) : (
                <div className="col-span-3 text-center py-16 text-muted-foreground">
                  <Search className="w-10 h-10 mx-auto mb-3 opacity-20" />
                  <p className="text-sm">Tidak ada tool yang ditemukan.</p>
                </div>
              )}
            </div>
          ) : (
            /* Grouped by category */
            <div className="space-y-12">
              {CATEGORIES.map(cat => (
                <section key={cat.id} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${cat.color}`}>
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground">{cat.name}</h2>
                    <span className="text-xs text-muted-foreground font-medium">{cat.tools.length} tools</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {cat.tools.map((tool, i) => (
                      <Link key={i} href={tool.href} className="group minimal-card p-4 flex items-start gap-3 hover:border-primary/30 transition-all">
                        <div className={`p-2 rounded-lg shrink-0 ${cat.color}`}>
                          <tool.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{tool.name}</h3>
                            {(tool as any).isPro && (
                              <span className="text-[8px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-black uppercase shrink-0">PRO</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{tool.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="py-10 border-t mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} TOOLS TEKNO. Professional Utility Suite.</p>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
            <Link href="/disclaimer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Disclaimer</Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
