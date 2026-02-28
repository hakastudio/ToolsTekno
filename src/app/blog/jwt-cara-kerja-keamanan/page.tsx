import React from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { Clock, ArrowLeft, Home, Key, Lock, ShieldCheck, Zap, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Web Token (JWT): Cara Kerja dan Tips Keamanan",
  description: "JWT digunakan hampir di mana-mana untuk autentikasi modern. Pelajari struktur token, cara mendekodenya, dan praktik terbaik keamanan sesi pengguna.",
  keywords: ["jwt", "json web token", "autentikasi", "keamanan web", "token"],
  openGraph: {
    title: "JSON Web Token (JWT): Cara Kerja dan Tips Keamanan",
    description: "Panduan lengkap JWT untuk developer — struktur, dekoding, dan keamanan.",
    type: "article",
  },
};

export default function PostJwt() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "JSON Web Token (JWT): Cara Kerja dan Tips Keamanan",
            description: "JWT digunakan hampir di mana-mana for autentikasi modern.",
            datePublished: "2026-02-15",
            dateModified: "2026-02-15",
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
              <span className="text-foreground">JWT</span>
            </nav>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase">Developer</span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                JSON Web Token (JWT): Cara Kerja dan Tips Keamanan
              </h1>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />7 menit baca</span>
                <span>15 Februari 2026</span>
              </div>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-lg font-medium text-foreground/90 border-l-4 border-primary pl-4">
                JWT (JSON Web Token) telah menjadi standar de-facto untuk autentikasi berbasis token di aplikasi web modern. Namun, kemudahan penggunaannya sering membuat developer mengabaikan aspek keamanan yang kritis.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Apa Itu JWT?</h2>
              <p>
                JSON Web Token adalah standar terbuka (RFC 7519) yang mendefinisikan cara compact dan self-contained untuk mentransmisikan informasi antar pihak sebagai objek JSON. Informasi ini dapat diverifikasi dan dipercaya karena ditandatangani secara digital menggunakan secret (HMAC) atau pasangan kunci publik/privat (RSA atau ECDSA).
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Struktur JWT</h2>
              <p>JWT terdiri dari tiga bagian yang dipisahkan oleh titik (.):</p>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-xl text-sm font-mono overflow-auto break-all">
{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`}
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Header:</strong> Berisi tipe token (JWT) dan algoritma hashing yang digunakan (HMAC SHA256 atau RSA).</li>
                <li><strong>Payload:</strong> Berisi klaim (claims) — pernyataan tentang entitas (biasanya user) dan data tambahan.</li>
                <li><strong>Signature:</strong> Digunakan untuk memverifikasi bahwa pengirim JWT adalah benar dan memastikan konten tidak diubah.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8">Cara Kerja Autentikasi JWT</h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li>Pengguna login dengan username dan password.</li>
                <li>Server memverifikasi kredensial dan menghasilkan JWT yang ditandatangani.</li>
                <li>Server mengirimkan JWT kembali ke client.</li>
                <li>Client menyimpan JWT (di localStorage atau httpOnly cookie) dan menyertakannya di setiap request berikutnya sebagai Bearer token.</li>
                <li>Server memvalidasi tanda tangan JWT dan memberikan akses.</li>
              </ol>

              <h2 className="text-2xl font-bold text-foreground mt-8">Tips Keamanan JWT yang Penting</h2>
              <p>Kesalahan dalam implementasi JWT bisa berakibat fatal. Berikut praktik terbaik yang harus diikuti:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Gunakan algoritma yang kuat.</strong> Selalu gunakan RS256 atau HS256 untuk produksi. Hindari algoritma "none" yang tidak melakukan verifikasi sama sekali.</li>
                <li><strong>Set waktu kedaluwarsa (exp).</strong> Jangan membuat token yang tidak pernah kedaluwarsa. Gunakan access token berumur pendek (15 menit) dengan refresh token.</li>
                <li><strong>Simpan di httpOnly cookie.</strong> Menyimpan JWT di localStorage membuat token rentan terhadap serangan XSS. httpOnly cookie lebih aman karena tidak dapat diakses JavaScript.</li>
                <li><strong>Validasi semua klaim.</strong> Selalu validasi issuer (iss), audience (aud), dan expiration (exp) di sisi server.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8">Dekode JWT dengan Mudah</h2>
              <p>
                Perlu memeriksa isi token JWT secara cepat? Gunakan <Link href="/tools/jwt-decoder" className="text-primary hover:underline">JWT Decoder</Link> kami. Tool ini mendekode token sepenuhnya di browser Anda tanpa mengirim data ke server, sehingga token sensitif Anda tetap aman.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Kesimpulan</h2>
              <p>
                JWT adalah alat yang sangat berguna bila diimplementasikan dengan benar. Pahami strukturnya, terapkan praktik keamanan yang ketat, dan selalu validasi token di sisi server. Jangan pernah mempercayai payload JWT tanpa memverifikasi signature-nya terlebih dahulu.
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
