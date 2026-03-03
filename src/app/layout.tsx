import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TOOLS TEKNO - Free Professional Online Tools",
    template: "%s | TOOLS TEKNO",
  },
  description: "Free Professional SEO & Developer Tools — Keyword Density, Regex Tester, JSON Formatter, Hash Generator, and more. 100% client-side, no data stored.",
  keywords: ["seo tools", "developer tools", "free online tools", "keyword density", "regex tester", "json formatter"],
  metadataBase: new URL("https://tools.teknocuan.web.id"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "TOOLS TEKNO",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6551248787435250"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TOOLS TEKNO",
              "url": "https://tools.teknocuan.web.id",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://tools.teknocuan.web.id/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
