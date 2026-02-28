import React from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { Clock, ArrowLeft, Home, UnfoldVertical, Code2, Zap, ShieldCheck, Terminal } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cara Menggunakan Regular Expression (Regex) untuk Developer",
  description: "Regex bisa terasa seperti sihir hitam, namun sebenarnya logis dan kuat. Panduan ini mengajari pola-pola paling berguna dengan contoh langsung yang bisa dipraktikkan.",
  keywords: ["regex", "regular expression", "pattern matching", "javascript regex", "panduan regex"],
  openGraph: {
    title: "Cara Menggunakan Regex untuk Developer",
    description: "Panduan lengkap Regex dengan contoh praktis untuk developer.",
    type: "article",
  },
};

export default function PostRegex() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Cara Menggunakan Regular Expression (Regex) untuk Developer",
            datePublished: "2026-02-10",
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
              <span className="text-foreground">Regex</span>
            </nav>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase">Developer</span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Cara Menggunakan Regular Expression (Regex) untuk Developer
              </h1>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />9 menit baca</span>
                <span>10 Februari 2026</span>
              </div>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-lg font-medium text-foreground/90 border-l-4 border-primary pl-4">
                Regular Expression, atau sering disebut Regex, adalah urutan karakter yang mendefinisikan pola pencarian. Bagi banyak developer pemula, regex terlihat seperti deretan karakter acak yang membingungkan. Namun setelah memahami logika dasarnya, regex menjadi salah satu alat paling ampuh dalam arsenal seorang developer.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Mengapa Belajar Regex?</h2>
              <p>
                Regex sangat berguna untuk: validasi input formulir (email, nomor telepon, password), pencarian dan penggantian teks yang kompleks, parsing log file, ekstraksi data dari string, dan membersihkan data sebelum diproses.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Karakter Dasar Regex</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-bold text-foreground">Pola</th>
                      <th className="text-left p-3 font-bold text-foreground">Artinya</th>
                      <th className="text-left p-3 font-bold text-foreground">Contoh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [".","Karakter apa saja (kecuali newline)","a.c → abc, axc"],
                      ["^","Awal string","^Hello → cocok di awal"],
                      ["$","Akhir string","world$ → cocok di akhir"],
                      ["*","0 atau lebih pengulangan","ab* → a, ab, abb"],
                      ["+","1 atau lebih pengulangan","ab+ → ab, abb (bukan a)"],
                      ["?","0 atau 1 pengulangan","colou?r → color, colour"],
                      ["\\d","Digit 0-9","\\d{3} → 123"],
                      ["\\w","Karakter kata (huruf/angka/_)","\\w+ → hello"],
                    ].map(([p, m, e], i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="p-3 font-mono text-primary font-bold">{p}</td>
                        <td className="p-3">{m}</td>
                        <td className="p-3 font-mono text-xs text-muted-foreground">{e}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-8">Contoh Praktis</h2>
              <p><strong>Validasi Email:</strong></p>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-xl text-sm font-mono overflow-auto">
{`/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/`}
              </pre>

              <p><strong>Validasi Nomor Telepon Indonesia:</strong></p>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-xl text-sm font-mono overflow-auto">
{`/^(\\+62|62|0)8[1-9][0-9]{6,10}$/`}
              </pre>

              <p><strong>Ekstrak URL dari teks:</strong></p>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-xl text-sm font-mono overflow-auto">
{`/https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/gi`}
              </pre>

              <h2 className="text-2xl font-bold text-foreground mt-8">Flags di Regex</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><code>g</code> — Global: temukan semua kecocokan, bukan hanya yang pertama.</li>
                <li><code>i</code> — Case-insensitive: abaikan perbedaan huruf besar/kecil.</li>
                <li><code>m</code> — Multiline: ^ dan $ sesuai dengan awal/akhir setiap baris.</li>
                <li><code>s</code> — Dotall: titik (.) juga cocok dengan newline.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8">Praktikkan Langsung</h2>
              <p>
                Cara terbaik untuk belajar regex adalah dengan mencoba langsung. Gunakan <Link href="/tools/regex-tester" className="text-primary hover:underline">Regex Tester</Link> kami untuk menguji pola Anda secara real-time, melihat semua kecocokan yang ditemukan, dan bereksperimen dengan flag yang berbeda.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Kesimpulan</h2>
              <p>
                Regex adalah investasi waktu yang sangat sepadan. Meskipun kurva belajarnya cukup curam di awal, kemampuan untuk memanipulasi teks dengan presisi tinggi akan menghemat jam-jam kerja Anda di masa depan. Mulailah dengan pola sederhana, dan secara bertahap tingkatkan kompleksitasnya.
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
