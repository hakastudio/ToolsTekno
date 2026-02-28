import React from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { Clock, ArrowLeft, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apa Itu Robots.txt dan Bagaimana Cara Menggunakannya?",
  description: "File robots.txt mengatur akses crawler ke website Anda. Pelajari sintaks, contoh nyata, dan kesalahan umum yang harus dihindari agar website Anda terindeks dengan benar.",
  keywords: ["robots.txt", "crawl", "mesin pencari", "seo teknis", "googlebot"],
  openGraph: {
    title: "Apa Itu Robots.txt dan Bagaimana Cara Menggunakannya?",
    description: "Panduan lengkap tentang robots.txt untuk mengoptimalkan crawling website Anda.",
    type: "article",
  },
};

export default function PostRobotsTxt() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Apa Itu Robots.txt dan Bagaimana Cara Menggunakannya?",
            description: "File robots.txt mengatur akses crawler ke website Anda.",
            datePublished: "2026-02-18",
            dateModified: "2026-02-18",
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
              <span className="text-foreground">Robots.txt</span>
            </nav>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold uppercase">Technical SEO</span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Apa Itu Robots.txt dan Bagaimana Cara Menggunakannya?
              </h1>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />5 menit baca</span>
                <span>18 Februari 2026</span>
              </div>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-lg font-medium text-foreground/90 border-l-4 border-primary pl-4">
                File robots.txt adalah garis pertahanan pertama Anda untuk mengontrol bagaimana mesin pencari menelusuri website Anda — meskipun hanya berisi beberapa baris teks.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Pengertian Robots.txt</h2>
              <p>
                Robots.txt adalah file teks biasa yang ditempatkan di root directory website Anda (contoh: <code>https://namadomain.com/robots.txt</code>). File ini menggunakan standar Robots Exclusion Protocol (REP) untuk memberikan instruksi kepada web crawler tentang halaman atau direktori mana yang boleh dan tidak boleh diakses.
              </p>
              <p>
                Perlu dipahami: robots.txt bukanlah mekanisme keamanan. Crawler yang baik seperti Googlebot akan menghormatinya, namun crawler berbahaya atau tidak resmi mungkin mengabaikannya. Jangan simpan informasi sensitif di halaman yang hanya "diblokir" oleh robots.txt.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Sintaks Dasar</h2>
              <p>File robots.txt menggunakan format yang sangat sederhana:</p>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-xl text-sm font-mono overflow-auto">
{`User-agent: *
Disallow: /admin/
Disallow: /private/
Allow: /public/

User-agent: Googlebot
Allow: /`}
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>User-agent:</strong> Menentukan crawler yang menjadi target instruksi. Tanda bintang (*) berarti berlaku untuk semua crawler.</li>
                <li><strong>Disallow:</strong> Melarang crawler mengakses path yang ditentukan.</li>
                <li><strong>Allow:</strong> Mengizinkan akses ke path tertentu, bahkan jika direktori induknya diblokir.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8">Kesalahan Umum yang Harus Dihindari</h2>
              <p>Berikut adalah beberapa kesalahan yang sering dilakukan pemilik website:</p>
              <ol className="list-decimal pl-6 space-y-3">
                <li><strong>Memblokir seluruh website secara tidak sengaja.</strong> Menulis <code>Disallow: /</code> akan mencegah semua crawler mengindeks website Anda. Ini sering terjadi pada tahap development namun lupa dihapus sebelum live.</li>
                <li><strong>Memblokir file CSS dan JavaScript penting.</strong> Google perlu dapat mengakses aset ini untuk merender dan memahami halaman Anda dengan benar.</li>
                <li><strong>Menganggap robots.txt menyembunyikan konten.</strong> URL yang di-disallow masih bisa muncul di hasil pencarian jika ada situs lain yang menautkannya.</li>
              </ol>

              <h2 className="text-2xl font-bold text-foreground mt-8">Cara Menggunakan Robots.txt Generator</h2>
              <p>
                Membuat robots.txt dari nol bisa membingungkan, terutama jika Anda perlu mengizinkan crawler tertentu dengan aturan yang berbeda. Gunakan tool gratis kami — <Link href="/tools/robots-generator" className="text-primary hover:underline">Robots.txt Generator</Link> — untuk membuat file robots.txt yang valid secara visual tanpa perlu hafal sintaksnya.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Kesimpulan</h2>
              <p>
                File robots.txt yang dikonfigurasi dengan benar adalah bagian penting dari setup technical SEO. Pastikan Anda secara rutin memeriksa file ini setelah setiap pembaruan besar pada struktur website, dan selalu verifikasi menggunakan Google Search Console agar tidak ada halaman penting yang terblokir secara tidak sengaja.
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
