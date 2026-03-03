import React from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { BookOpen, Clock, Tag, ArrowLeft, Home, TrendingUp, Search, Zap, Globe, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panduan Lengkap SEO On-Page untuk Website Anda",
  description: "Pelajari cara mengoptimalkan setiap halaman website Anda dengan teknik SEO on-page terbaru: riset kata kunci, meta tag, struktur heading, internal linking, dan lainnya.",
  keywords: ["seo on-page", "optimasi seo", "meta tag", "keyword", "panduan seo"],
  openGraph: {
    title: "Panduan Lengkap SEO On-Page untuk Website Anda",
    description: "Pelajari teknik SEO on-page terbaru untuk meningkatkan peringkat website Anda di Google.",
    type: "article",
  },
};

export default function PostSeoOnPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Panduan Lengkap SEO On-Page untuk Website Anda",
            description: "Pelajari cara mengoptimalkan setiap halaman website Anda dengan teknik SEO on-page terbaru.",
            datePublished: "2026-02-20",
            dateModified: "2026-02-20",
            author: { "@type": "Organization", name: "TOOLS TEKNO" },
            publisher: { "@type": "Organization", name: "TOOLS TEKNO", logo: { "@type": "ImageObject", url: "https://tools.teknocuan.web.id/logo.png" } },
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
              <span className="text-foreground">SEO On-Page</span>
            </nav>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">SEO</span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Panduan Lengkap SEO On-Page untuk Website Anda
              </h1>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />8 menit baca</span>
                <span>20 Februari 2026</span>
              </div>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-lg font-medium text-foreground/90 border-l-4 border-primary pl-4">
                SEO on-page adalah fondasi dari setiap strategi pemasaran digital yang sukses. Tanpa optimasi on-page yang baik, bahkan konten terbaik pun bisa tenggelam di halaman kedua atau kesepuluh Google.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Apa Itu SEO On-Page?</h2>
              <p>
                SEO on-page (disebut juga SEO on-site) adalah praktik mengoptimalkan setiap elemen individual pada halaman web Anda untuk meningkatkan peringkat di mesin pencari dan mendatangkan lebih banyak traffic organik. Berbeda dengan SEO off-page yang berfokus pada tautan eksternal, SEO on-page mencakup semua hal yang dapat Anda kendalikan langsung di website Anda sendiri.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">1. Riset Kata Kunci yang Tepat</h2>
              <p>
                Sebelum menulis satu kata pun, tentukan kata kunci utama (primary keyword) dan kata kunci pendukung (secondary keywords) yang relevan dengan topik Anda. Gunakan tools seperti Google Keyword Planner, Ahrefs, atau tool gratis seperti yang tersedia di TOOLS TEKNO untuk menganalisis volume pencarian dan tingkat persaingan.
              </p>
              <p>
                Pertimbangkan intent pencarian (search intent): apakah pengguna ingin tahu sesuatu (informational), membeli sesuatu (transactional), atau mencari website tertentu (navigational)? Konten yang sesuai dengan intent akan jauh lebih mudah mendapatkan peringkat tinggi.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">2. Optimasi Tag Title dan Meta Description</h2>
              <p>
                Tag title adalah salah satu faktor ranking paling penting. Pastikan kata kunci utama Anda muncul di awal judul, dan buat judul yang menarik klik. Panjang ideal adalah 50-60 karakter agar tidak terpotong di hasil pencarian.
              </p>
              <p>
                Meta description tidak secara langsung memengaruhi peringkat, namun sangat memengaruhi Click-Through Rate (CTR). Tulis deskripsi yang jelas, mengandung kata kunci, dan mengundang pengguna untuk mengklik. Idealnya 150-160 karakter.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">3. Struktur Heading yang Logis (H1, H2, H3)</h2>
              <p>
                Setiap halaman harus memiliki tepat satu tag H1 yang mengandung kata kunci utama. Gunakan H2 untuk sub-topik utama dan H3 untuk poin-poin di bawahnya. Struktur hierarki yang baik tidak hanya membantu Google memahami konten Anda, tetapi juga meningkatkan keterbacaan bagi pengguna.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">4. Konten Berkualitas dan E-E-A-T</h2>
              <p>
                Google mengevaluasi konten berdasarkan prinsip E-E-A-T: Experience (Pengalaman), Expertise (Keahlian), Authoritativeness (Otoritas), dan Trustworthiness (Kepercayaan). Pastikan konten Anda ditulis oleh atau mencerminkan keahlian yang nyata, memiliki referensi yang dapat dipercaya, dan memberikan nilai nyata bagi pembaca.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">5. Optimasi Gambar</h2>
              <p>
                Setiap gambar harus memiliki atribut ALT yang deskriptif dan mengandung kata kunci bila relevan. Kompres gambar untuk mempercepat loading time — sebuah faktor yang sangat penting untuk Core Web Vitals. Gunakan format WebP untuk performa terbaik.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">6. Internal Linking yang Strategis</h2>
              <p>
                Tautan internal membantu Google menemukan dan mengindeks halaman lain di website Anda, sekaligus mendistribusikan "link juice" (otoritas tautan) ke halaman-halaman yang lebih penting. Buat tautan yang relevan dan natural — hindari menambahkan tautan hanya demi SEO tanpa nilai nyata bagi pembaca.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">7. URL yang Ramah SEO</h2>
              <p>
                URL yang pendek, deskriptif, dan mengandung kata kunci lebih disukai oleh mesin pencari maupun pengguna. Hindari URL dengan parameter acak atau angka yang tidak bermakna. Contoh URL yang baik: <code>/panduan-seo-on-page</code>. Contoh URL buruk: <code>/page?id=1234&cat=5</code>.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Kesimpulan</h2>
              <p>
                SEO on-page bukanlah ilmu yang bisa dikuasai dalam semalam, namun dengan pendekatan yang sistematis dan konsisten, Anda dapat melihat peningkatan yang signifikan dalam visibilitas organik website Anda. Mulailah dengan riset kata kunci yang solid, pastikan setiap elemen teknis teroptimasi, dan yang terpenting—fokuslah pada konten yang benar-benar bermanfaat bagi pembaca Anda.
              </p>
              <p>
                Gunakan tools gratis di TOOLS TEKNO seperti <Link href="/tools/keyword-density" className="text-primary hover:underline">Keyword Density Checker</Link> dan <Link href="/tools/meta-analyzer" className="text-primary hover:underline">Meta Analyzer</Link> untuk mengaudit halaman Anda secara langsung.
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
