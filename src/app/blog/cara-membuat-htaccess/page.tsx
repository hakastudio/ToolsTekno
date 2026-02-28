import React from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { Clock, ArrowLeft, Home, Lock, ShieldCheck, FileCode, Zap, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cara Membuat File .htaccess yang Aman dan Optimal",
  description: "Dari redirect 301, HTTPS enforcement, hingga perlindungan direktori — panduan lengkap .htaccess untuk server Apache yang aman dan optimal.",
  keywords: [".htaccess", "apache", "redirect 301", "rewrite rule", "keamanan server", "web server"],
  openGraph: {
    title: "Cara Membuat File .htaccess yang Aman dan Optimal",
    description: "Panduan lengkap .htaccess untuk Apache: redirect, HTTPS, dan keamanan.",
    type: "article",
  },
};

export default function PostHtaccess() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Cara Membuat File .htaccess yang Aman dan Optimal",
            datePublished: "2026-02-12",
            author: { "@type": "Organization", name: "TOOLS TEKNO" },
            publisher: { "@type": "Organization", name: "TOOLS TEKNO" },
          }),
        }}
      />
      <Header />
        <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
          <div className="space-y-8">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-primary flex items-center gap-1"><Home className="w-3 h-3" />Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary">Blog</Link>
              <span>/</span>
              <span className="text-foreground">.htaccess</span>
            </nav>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase">Server</span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Cara Membuat File .htaccess yang Aman dan Optimal
              </h1>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />10 menit baca</span>
                <span>12 Februari 2026</span>
              </div>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-lg font-medium text-foreground/90 border-l-4 border-primary pl-4">
                File .htaccess adalah salah satu konfigurasi server yang paling sering digunakan dan paling sering disalahpahami. Ketika dikonfigurasi dengan benar, file ini bisa menjadi alat yang sangat ampuh untuk meningkatkan keamanan dan kinerja website Anda.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Apa Itu File .htaccess?</h2>
              <p>
                File .htaccess (Hypertext Access) adalah file konfigurasi tingkat direktori untuk web server Apache. File ini memungkinkan Anda mengubah konfigurasi server untuk direktori tertentu tanpa perlu mengubah file konfigurasi utama server (httpd.conf). Ini sangat berguna pada hosting shared di mana Anda tidak memiliki akses ke konfigurasi server level root.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">1. Redirect HTTP ke HTTPS</h2>
              <p>Ini adalah salah satu konfigurasi paling penting untuk keamanan dan SEO modern:</p>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-xl text-sm font-mono overflow-auto">
{`RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`}
              </pre>

              <h2 className="text-2xl font-bold text-foreground mt-8">2. Redirect www ke non-www (atau sebaliknya)</h2>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-xl text-sm font-mono overflow-auto">
{`# Redirect www ke non-www
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]`}
              </pre>

              <h2 className="text-2xl font-bold text-foreground mt-8">3. Melindungi Direktori dengan Password</h2>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-xl text-sm font-mono overflow-auto">
{`AuthType Basic
AuthName "Area Terproteksi"
AuthUserFile /path/ke/.htpasswd
Require valid-user`}
              </pre>

              <h2 className="text-2xl font-bold text-foreground mt-8">4. Mencegah Listing Direktori</h2>
              <p>Tanpa konfigurasi ini, Apache mungkin menampilkan daftar file dalam direktori jika tidak ada file index.</p>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-xl text-sm font-mono overflow-auto">
{`Options -Indexes`}
              </pre>

              <h2 className="text-2xl font-bold text-foreground mt-8">5. Header Keamanan Tambahan</h2>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-xl text-sm font-mono overflow-auto">
{`# Mencegah clickjacking
Header always append X-Frame-Options SAMEORIGIN

# Mencegah MIME type sniffing
Header set X-Content-Type-Options nosniff

# Mengaktifkan XSS Protection
Header set X-XSS-Protection "1; mode=block"

# Content Security Policy (sesuaikan dengan kebutuhan)
Header set Content-Security-Policy "default-src 'self'"`}
              </pre>

              <h2 className="text-2xl font-bold text-foreground mt-8">Generate .htaccess Otomatis</h2>
              <p>
                Tidak ingin menghafal semua sintaks ini? Gunakan <Link href="/tools/htaccess" className="text-primary hover:underline">htaccess Master PRO</Link> kami untuk membuat konfigurasi .htaccess yang lengkap dan optimal secara visual, dengan penjelasan untuk setiap aturan.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Kesimpulan</h2>
              <p>
                File .htaccess adalah aset yang sangat berharga untuk administrasi web. Dengan konfigurasi yang tepat, Anda dapat meningkatkan keamanan, mengoptimalkan SEO, dan mengontrol perilaku server dengan presisi tinggi. Selalu backup file .htaccess sebelum melakukan perubahan, dan uji setiap konfigurasi baru di lingkungan development sebelum diterapkan ke produksi.
              </p>
            </article>

            <div className="pt-8 border-t">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Kembali ke Blog
              </Link>
            </div>
          </div>
        </main>
        <footer className="py-8 border-t mt-auto">
          <div className="container mx-auto px-6 text-center">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} TOOLS TEKNO. Professional Utility Suite.</p>
          </div>
        </footer>
    </div>
  );
}
