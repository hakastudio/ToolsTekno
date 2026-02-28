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
  metadataBase: new URL("https://www.tools.teknocuan.web.id"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "TOOLS TEKNO",
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
        {children}
      </body>
    </html>
  );
}
