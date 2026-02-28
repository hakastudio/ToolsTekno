import React from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { Clock, ArrowLeft, Home, Share2, Image as ImageIcon, Zap, Globe, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Graph Meta Tags: Cara Share Konten yang Menarik di Sosial Media",
  description: "Saat Anda berbagi link di Facebook atau LinkedIn, tag Open Graph menentukan tampilan preview. Pelajari cara mengaturnya dengan benar untuk meningkatkan CTR konten Anda.",
  keywords: ["open graph", "og tags", "meta tags", "facebook share", "social media preview", "seo"],
  openGraph: {
    title: "Open Graph Meta Tags: Cara Share Konten yang Menarik di Sosial Media",
    description: "Pelajari cara mengoptimalkan Open Graph tags for tampilan share yang menarik.",
    type: "article",
  },
};

export default function PostOpenGraph() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Open Graph Meta Tags: Cara Share Konten yang Menarik di Sosial Media",
            datePublished: "2026-02-07",
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
              <span className="text-foreground">Open Graph</span>
            </nav>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">SEO</span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Open Graph Meta Tags: Cara Share Konten yang Menarik di Sosial Media
              </h1>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />6 menit baca</span>
                <span>7 Februari 2026</span>
              </div>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-lg font-medium text-foreground/90 border-l-4 border-primary pl-4">
                Pernahkah Anda berbagi link di media sosial dan hasilnya hanya tampil sebagai URL teks biasa? Atau sebaliknya, preview-nya salah — gambar yang muncul bukan gambar yang Anda inginkan? Itulah masalah yang Open Graph dirancang untuk menyelesaikannya.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Apa Itu Open Graph Protocol?</h2>
              <p>
                Open Graph Protocol (OGP) adalah standar yang dikembangkan oleh Facebook pada tahun 2010 yang memungkinkan halaman web menjadi "objek yang kaya" dalam grafik sosial. Dengan kata lain, Open Graph tags memberitahu platform media sosial (Facebook, Twitter, LinkedIn, WhatsApp, dll.) bagaimana menampilkan link dari halaman Anda.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Tag Open Graph yang Wajib Ada</h2>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-xl text-sm font-mono overflow-auto">
{`<head>
  <!-- Judul yang akan muncul saat dibagikan -->
  <meta property="og:title" content="Judul Halaman Anda" />
  
  <!-- Deskripsi singkat konten -->
  <meta property="og:description" content="Deskripsi menarik halaman Anda, idenya 1-2 kalimat." />
  
  <!-- URL gambar preview (ukuran ideal: 1200x630 px) -->
  <meta property="og:image" content="https://domain.com/gambar-preview.png" />
  
  <!-- URL halaman ini -->
  <meta property="og:url" content="https://domain.com/halaman-ini" />
  
  <!-- Tipe konten -->
  <meta property="og:type" content="website" />
</head>`}
              </pre>

              <h2 className="text-2xl font-bold text-foreground mt-8">Tag Tambahan yang Direkomendasikan</h2>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-xl text-sm font-mono overflow-auto">
{`<!-- Nama website/brand Anda -->
<meta property="og:site_name" content="TOOLS TEKNO" />

<!-- Localize konten -->
<meta property="og:locale" content="id_ID" />

<!-- Untuk artikel: tambahkan metadata tambahan -->
<meta property="article:published_time" content="2026-02-07T00:00:00Z" />
<meta property="article:author" content="TOOLS TEKNO" />

<!-- Twitter Cards (platform Twitter menggunakan ini) -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Judul Halaman Anda" />
<meta name="twitter:description" content="Deskripsi untuk Twitter" />
<meta name="twitter:image" content="https://domain.com/gambar-preview.png" />`}
              </pre>

              <h2 className="text-2xl font-bold text-foreground mt-8">Tips Gambar Open Graph</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Ukuran ideal:</strong> 1200 x 630 piksel untuk rasio 1.91:1 yang direkomendasikan Facebook.</li>
                <li><strong>Format:</strong> JPG atau PNG. Hindari GIF atau WebP untuk kompatibilitas maksimal.</li>
                <li><strong>Ukuran file:</strong> Usahakan di bawah 1 MB agar tidak lambat di koneksi mobile.</li>
                <li><strong>Konten gambar:</strong> Gunakan gambar yang relevan dengan konten dan tambahkan teks judul pada gambar jika perlu.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8">Cara Memeriksa Open Graph Anda</h2>
              <p>
                Setelah menambahkan tag Open Graph, selalu verifikasi hasilnya. Gunakan <Link href="/tools/og-checker" className="text-primary hover:underline">Open Graph Checker</Link> kami untuk melihat preview tampilan share halaman Anda secara instan, tanpa perlu menunggu platform media sosial men-cache ulang halaman Anda.
              </p>
              <p>
                Atau jika Anda perlu membuat tag secara otomatis, gunakan <Link href="/tools/og-generator" className="text-primary hover:underline">Open Graph Generator</Link> — masukkan URL atau isi detail manual, dan tag siap disalin ke dalam kode HTML Anda.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Kesimpulan</h2>
              <p>
                Open Graph tags adalah investasi kecil dengan dampak besar pada pengalaman berbagi konten Anda. Beberapa baris kode ekstra bisa secara signifikan meningkatkan Click-Through Rate dari media sosial, karena tampilan yang menarik jauh lebih mungkin diklik daripada link teks biasa.
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
