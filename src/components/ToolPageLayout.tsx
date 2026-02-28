"use client";

import React from "react";
import Header from "./Header";
import { LucideIcon, ArrowLeft, ShieldCheck, Heart, ChevronDown, Layout } from "lucide-react";
import Link from "next/link";
import { getToolMeta, ToolHowToStep, ToolFAQ } from "@/lib/tools-meta";
import ArticleSection from "./ArticleSection";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
  slug?: string; // Used to auto-lookup SEO metadata, how-to-use, and FAQs
  howToUse?: ToolHowToStep[]; // Override auto-lookup
  faqs?: ToolFAQ[]; // Override auto-lookup
}

export default function ToolPageLayout({
  title,
  description,
  icon: Icon,
  children,
  slug,
  howToUse: howToUseProp,
  faqs: faqsProp,
}: ToolPageLayoutProps) {
  // Lookup metadata from central registry if slug provided
  const meta = slug ? getToolMeta(slug) : null;
  const effectiveTitle = meta?.title ?? `${title} - Free Online Developer Tools | TOOLS TEKNO`;
  const effectiveDesc = meta?.description ?? description;
  const howToUse = howToUseProp ?? meta?.howToUse ?? [];
  const faqs = faqsProp ?? meta?.faqs ?? [];

  // JSON-LD SoftwareApplication schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title,
    "description": effectiveDesc,
    "applicationCategory": "WebApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "url": `https://www.tools.teknocuan.web.id/tools/${slug ?? ""}`,
    "creator": {
      "@type": "Organization",
      "name": "TOOLS TEKNO",
      "url": "https://www.tools.teknocuan.web.id"
    }
  };

  // FAQ JSON-LD (only if FAQs exist)
  const faqJsonLd = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  } : null;

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20 selection:bg-primary/10">
      {/* Dynamic title & meta via React 19 hoisting */}
      <title>{effectiveTitle}</title>
      <meta name="description" content={effectiveDesc} />
      <meta property="og:title" content={effectiveTitle} />
      <meta property="og:description" content={effectiveDesc} />
      <meta property="og:type" content="website" />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Header />

      <main className="flex-1 container mx-auto px-6 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Area */}
          <div className="flex-1 space-y-12 min-w-0">
            {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Tools
            </Link>
          </nav>

          {/* Tool Header */}
          <header className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary" aria-hidden="true">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  {title}
                </h1>
                <p className="text-muted-foreground max-w-2xl mt-1">
                  {description}
                </p>
              </div>
            </div>
          </header>

          {/* Core Tool Area */}
          <section aria-label="Tool Interface" className="minimal-card p-6 md:p-10">
            {children}
          </section>

          {/* Trust Banners */}
          <aside className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Features">
            <div className="p-6 rounded-xl border border-border bg-card/50 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-1">Privacy Focused</h2>
                <p className="text-xs text-muted-foreground">Processed entirely in your browser. No data leaves your device.</p>
              </div>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card/50 flex items-start gap-4">
              <Heart className="w-6 h-6 text-rose-500 shrink-0" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-1">Open &amp; Free</h2>
                <p className="text-xs text-muted-foreground">Professional tools provided for the developer community.</p>
              </div>
            </div>
          </aside>

          {/* How to Use Section */}
          {howToUse.length > 0 && (
            <section aria-labelledby="how-to-use-heading" className="space-y-6">
              <h2 id="how-to-use-heading" className="text-xl font-bold text-foreground">
                How to Use {title}
              </h2>
              <ol className="space-y-4" role="list">
                {howToUse.map((step, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <section aria-labelledby="faq-heading" className="space-y-6">
              <h2 id="faq-heading" className="text-xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <dl className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-5 rounded-xl border border-border bg-card/50 space-y-2">
                    <dt className="text-sm font-bold text-foreground">{faq.q}</dt>
                    <dd className="text-sm text-muted-foreground leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Article Section (Dynamic Content) */}
          {slug && meta?.articleContent && (
            <ArticleSection 
              title={meta.articleTitle || `About ${title}`}
              content={meta.articleContent}
            />
          )}

          {/* Related Tools (Mobile only) */}
          <nav aria-labelledby="related-tools-heading" className="pt-12 border-t lg:hidden">
            <h2 id="related-tools-heading" className="text-lg font-bold mb-6">Explore More Tools</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
              {[
                { name: "JSON Formatter", href: "/tools/json-formatter" },
                { name: "JWT Decoder", href: "/tools/jwt-decoder" },
                { name: "Base64 Utility", href: "/tools/base64" }
              ].map((tool) => (
                <li key={tool.name}>
                  <Link
                    href={tool.href}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all group"
                  >
                    <span className="text-sm font-semibold">{tool.name}</span>
                    <ArrowLeft className="w-3 h-3 text-muted-foreground rotate-180 group-hover:text-primary transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Sidebar Area (Desktop only) */}
        <aside className="hidden lg:block w-80 shrink-0 space-y-10">
          
          <div className="sticky top-32 space-y-10">
            <nav aria-labelledby="sidebar-related-heading">
              <h2 id="sidebar-related-heading" className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Recommended Tools
              </h2>
              <ul className="space-y-3" role="list">
                {[
                  { name: "JSON Formatter", href: "/tools/json-formatter" },
                  { name: "JWT Decoder", href: "/tools/jwt-decoder" },
                  { name: "Base64 Utility", href: "/tools/base64" },
                  { name: "URL Encoder", href: "/tools/url-encoder" }
                ].map((tool) => (
                  <li key={tool.name}>
                    <Link
                      href={tool.href}
                      className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all group"
                    >
                      <span className="text-sm font-medium">{tool.name}</span>
                      <ArrowLeft className="w-3 h-3 text-muted-foreground rotate-180 group-hover:text-primary transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit">
                <Layout className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm">Professional Tools</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All our tools are built for speed and privacy. No registration required.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>

      <footer className="py-12 border-t mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground font-medium">
            © {new Date().getFullYear()} Tools Tekno. Professional Utility Suite.
          </p>
          <nav className="flex flex-wrap items-center gap-4 md:gap-6" aria-label="Footer navigation">
            <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground">About</Link>
            <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground">Blog</Link>
            <Link href="/guide" className="text-xs text-muted-foreground hover:text-foreground">Guide</Link>
            <Link href="/disclaimer" className="text-xs text-muted-foreground hover:text-foreground">Disclaimer</Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
