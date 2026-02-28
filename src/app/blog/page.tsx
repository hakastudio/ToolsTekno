"use client";

import React, { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { BookOpen, Clock, ArrowRight, Search } from "lucide-react";
import Link from "next/link";

const POSTS = [
  {
    title: "Mastering SEO On-Page: The 2026 Checklist",
    slug: "mastering-seo-on-page-checklist",
    excerpt: "Learn how to optimize every page of your website with the latest on-page SEO techniques: from keyword research and meta tags to heading structure and internal linking.",
    category: "SEO",
    readTime: "8 min",
    date: "Feb 28, 2026",
  },
  {
    title: "Why Robots.txt is Essential for Your Technical SEO",
    slug: "why-robots-txt-is-essential",
    excerpt: "Robots.txt is a simple yet powerful tool for controlling search engine crawlers. This guide explains the syntax, real-world examples, and common mistakes to avoid.",
    category: "Technical SEO",
    readTime: "5 min",
    date: "Feb 28, 2026",
  },
  {
    title: "A Developer's Guide to JSON Web Tokens (JWT)",
    slug: "understanding-jwt-security",
    excerpt: "JWT is used almost everywhere for modern authentication. This article covers the token structure, how to decode it, and best practices for securing user sessions.",
    category: "Developer",
    readTime: "7 min",
    date: "Feb 28, 2026",
  },
  {
    title: "Panduan Lengkap SEO On-Page untuk Website Anda",
    slug: "panduan-seo-on-page",
    excerpt: "Pelajari cara mengoptimalkan setiap halaman website Anda dengan teknik SEO on-page terbaru: mulai dari riset kata kunci, meta tag, struktur heading, hingga internal linking.",
    category: "SEO",
    readTime: "8 menit",
    date: "20 Feb 2026",
  },
  {
    title: "Apa Itu Robots.txt dan Bagaimana Cara Menggunakannya?",
    slug: "apa-itu-robots-txt",
    excerpt: "File robots.txt adalah instruksi sederhana untuk crawler mesin pencari. Panduan ini menjelaskan sintaks, contoh nyata, dan kesalahan umum yang harus dihindari.",
    category: "Technical SEO",
    readTime: "5 menit",
    date: "18 Feb 2026",
  },
  {
    title: "JSON Web Token (JWT): Cara Kerja dan Tips Keamanan",
    slug: "jwt-cara-kerja-keamanan",
    excerpt: "JWT digunakan hampir di mana-mana untuk autentikasi modern. Artikel ini membahas struktur token, cara mendekodenya, dan praktik terbaik untuk menjaga keamanan sesi pengguna.",
    category: "Developer",
    readTime: "7 menit",
    date: "15 Feb 2026",
  },
  {
    title: "Cara Membuat File .htaccess yang Aman dan Optimal",
    slug: "cara-membuat-htaccess",
    excerpt: "Dari redirect 301, HTTPS enforcement, hingga perlindungan direktori — panduan ini membahas semua hal penting yang perlu Anda tahu tentang .htaccess di Apache.",
    category: "Server",
    readTime: "10 menit",
    date: "12 Feb 2026",
  },
  {
    title: "Cara Menggunakan Regular Expression (Regex) untuk Developer",
    slug: "panduan-regex-untuk-developer",
    excerpt: "Regex bisa terasa seperti sihir hitam, namun sebenarnya logis dan kuat. Panduan ini mengajari Anda pola-pola paling berguna dengan contoh langsung yang bisa dipraktikkan.",
    category: "Developer",
    readTime: "9 menit",
    date: "10 Feb 2026",
  },
  {
    title: "Open Graph Meta Tags: Cara Share Konten yang Menarik di Sosial Media",
    slug: "open-graph-meta-tag",
    excerpt: "Saat Anda berbagi link di Facebook, Twitter, atau LinkedIn, yang menentukan tampilan preview adalah tag Open Graph. Pelajari cara mengaturnya dengan benar.",
    category: "SEO",
    readTime: "6 menit",
    date: "7 Feb 2026",
  },
];

const CATEGORIES = ["All", "SEO", "Technical SEO", "Developer", "Server"];

const CATEGORY_COLORS: Record<string, string> = {
  "SEO": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Technical SEO": "bg-green-500/10 text-green-600 dark:text-green-400",
  "Developer": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Server": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = POSTS.filter(post => {
    const matchCat = activeCategory === "All" || post.category === activeCategory;
    const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <ToolPageLayout
      title="Blog Guide"
      description="Articles, tutorials, and technical guides to help developers and SEO practitioners work more effectively."
      icon={BookOpen}
    >
      <div className="space-y-10">
        {/* Search & Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Post Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} className="block">
                <div className="minimal-card p-6 flex flex-col gap-4 group hover:border-primary/30 transition-all h-full">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider ${CATEGORY_COLORS[post.category] || "bg-muted text-muted-foreground"}`}>
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-[10px] text-muted-foreground font-medium">{post.date}</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-sm">No articles found.</p>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
