"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import ToolCard from "@/components/ToolCard";
import { 
  Search, 
  Layout, 
  Code2, 
  Image as ImageIcon, 
  Globe, 
  Braces, 
  Tags, 
  FileCode, 
  MapPin, 
  Binary, 
  Fingerprint, 
  Key, 
  Terminal, 
  Cog, 
  Laptop,
  Sparkles,
  ArrowRight,
  MousePointer2,
  CheckCircle2,
  Trophy,
  Zap,
  Box,
  Calendar,
  GitBranch,
  FileText,
  TrendingUp,
  DollarSign,
  Activity,
  History,
  Share2,
  HelpCircle,
  HelpCircle as FaqIcon,
  ShieldAlert,
  Eraser,
  Database,
  UnfoldVertical,
  Server,
  Lock,
  Eye,
  Settings2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const CATEGORIES = [
  {
    id: "keyword-content",
    name: "Keyword & Content",
    icon: Search,
    tools: [
      { name: "Keyword Density Checker", desc: "Analyze and optimize word frequencies.", icon: Search, href: "/tools/keyword-density" },
      { name: "Meta Analyzer", desc: "Audit SEO title/description tags.", icon: Tags, href: "/tools/meta-analyzer" },
    ]
  },
  {
    id: "technical-seo",
    name: "Technical SEO & Google",
    icon: Activity,
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
    tools: [
      { name: "Photo Location Tracker", desc: "GPS metadata extraction tool.", icon: MapPin, href: "/tools/photo-location" },
      { name: "Image Pro Compressor", desc: "Lossless asset optimization.", icon: Zap, href: "/tools/compressor", isPro: true },
      { name: "Repair Corrupted Image", desc: "Fix header errors in damaged files.", icon: ShieldAlert, href: "/tools/image-repair" },
      { name: "Background Remover", desc: "AI-powered asset extraction.", icon: Eraser, href: "/tools/bg-removal" },
    ]
  },
  {
    id: "developer-formatting",
    name: "Developer & Data Suite",
    icon: Terminal,
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
      { name: "Multi Hash Generator", desc: "Bcrypt, SHA256, & Argon2.", icon: Fingerprint, href: "/tools/hash-generator" },
      { name: "Git Command Helper", desc: "Visual guide for modern Git workflows.", icon: GitBranch, href: "/tools/git-helper" },
    ]
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCategories = activeCategory === "all" 
    ? CATEGORIES 
    : CATEGORIES.filter(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/10">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 border-b">
        <div className="container mx-auto px-6 text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Professional tools for <br />
              <span className="text-primary">Modern Developers.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A curated collection of precise, fast, and secure utility tools for SEO professionals and engineers. 100% private, client-side execution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => {
                const el = document.getElementById('tools-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              Browse Library
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link href="/tools/docker-generator" className="w-full sm:w-auto px-8 py-3 bg-muted text-foreground font-semibold rounded-lg hover:bg-muted/80 transition-all text-center">
              Try PRO Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Filter System */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b py-4">
        <div className="container mx-auto px-6 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            <button 
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeCategory === "all" 
                ? "bg-primary text-white" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              All Library
            </button>
            {CATEGORIES.map(c => (
              <button 
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeCategory === c.id 
                  ? "bg-secondary text-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <c.icon className="w-4 h-4" />
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main id="tools-grid" className="container mx-auto px-6 py-20 flex-1">
        <div className="space-y-24">
          {filteredCategories.map((category) => (
            <section key={category.id} className="space-y-8">
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="p-2 rounded-lg bg-primary/5 text-primary">
                  <category.icon className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {category.name}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.tools.map((tool) => (
                  <ToolCard
                    key={tool.name}
                    title={tool.name}
                    description={tool.desc}
                    icon={tool.icon}
                    href={tool.href}
                    isPro={tool.isPro}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="py-12 border-t mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
             <span className="text-sm font-bold text-foreground">TOOLS<span className="text-primary">TEKNO</span></span>
             <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Professional Utility Suite.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">About</Link>
            <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">Blog</Link>
            <Link href="/guide" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">Guide</Link>
            <Link href="/disclaimer" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">Disclaimer</Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
