import { TOOLS_META } from "./tools-meta";

export interface SearchResult {
  title: string;
  description: string;
  slug: string;
  type: "tool" | "blog";
  category: string;
}

export const BLOG_POSTS = [
  {
    title: "Mastering SEO On-Page: The 2026 Checklist",
    slug: "mastering-seo-on-page-checklist",
    excerpt: "Learn how to optimize every page of your website with the latest on-page SEO techniques: from keyword research and meta tags to heading structure and internal linking.",
    category: "SEO",
  },
  {
    title: "Why Robots.txt is Essential for Your Technical SEO",
    slug: "why-robots-txt-is-essential",
    excerpt: "Robots.txt is a simple yet powerful tool for controlling search engine crawlers. This guide explains the syntax, real-world examples, and common mistakes to avoid.",
    category: "Technical SEO",
  },
  {
    title: "A Developer's Guide to JSON Web Tokens (JWT)",
    slug: "understanding-jwt-security",
    excerpt: "JWT is used almost everywhere for modern authentication. This article covers the token structure, how to decode it, and best practices for securing user sessions.",
    category: "Developer",
  },
  {
    title: "Panduan Lengkap SEO On-Page untuk Website Anda",
    slug: "panduan-seo-on-page",
    excerpt: "Pelajari cara mengoptimalkan setiap halaman website Anda dengan teknik SEO on-page terbaru: mulai dari riset kata kunci, meta tag, struktur heading, hingga internal linking.",
    category: "SEO",
  },
  {
    title: "Apa Itu Robots.txt dan Bagaimana Cara Menggunakannya?",
    slug: "apa-itu-robots-txt",
    excerpt: "File robots.txt adalah instruksi sederhana untuk crawler mesin pencari. Panduan ini menjelaskan sintaks, contoh nyata, dan kesalahan umum yang harus dihindari.",
    category: "Technical SEO",
  },
  {
    title: "JSON Web Token (JWT): Cara Kerja dan Tips Keamanan",
    slug: "jwt-cara-kerja-keamanan",
    excerpt: "JWT digunakan hampir di mana-mana untuk autentikasi modern. Artikel ini membahas struktur token, cara mendekodenya, dan praktik terbaik untuk menjaga keamanan sesi pengguna.",
    category: "Developer",
  },
  {
    title: "Cara Membuat File .htaccess yang Aman dan Optimal",
    slug: "cara-membuat-htaccess",
    excerpt: "Dari redirect 301, HTTPS enforcement, hingga perlindungan direktori — panduan ini membahas semua hal penting yang perlu Anda tahu tentang .htaccess di Apache.",
    category: "Server",
  },
  {
    title: "Cara Menggunakan Regular Expression (Regex) untuk Developer",
    slug: "panduan-regex-untuk-developer",
    excerpt: "Regex bisa terasa seperti sihir hitam, namun sebenarnya logis dan kuat. Panduan ini mengajari Anda pola-pola paling berguna dengan contoh langsung yang bisa dipraktikkan.",
    category: "Developer",
  },
  {
    title: "Open Graph Meta Tags: Cara Share Konten yang Menarik di Sosial Media",
    slug: "open-graph-meta-tag",
    excerpt: "Saat Anda berbagi link di Facebook, Twitter, atau LinkedIn, yang menentukan tampilan preview adalah tag Open Graph. Pelajari cara mengaturnya dengan benar.",
    category: "SEO",
  },
];

export const SEARCH_INDEX: SearchResult[] = [
  ...Object.values(TOOLS_META).map((tool) => ({
    title: tool.shortTitle,
    description: tool.description,
    slug: `/tools/${tool.slug}`,
    type: "tool" as const,
    category: tool.category,
  })),
  ...BLOG_POSTS.map((post) => ({
    title: post.title,
    description: post.excerpt,
    slug: `/blog/${post.slug}`,
    type: "blog" as const,
    category: post.category,
  })),
];
