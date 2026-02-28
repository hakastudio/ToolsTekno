import React from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { Clock, ArrowLeft, Home, FileCode, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Robots.txt is Essential for Your Technical SEO",
  description: "Learn how the robots.txt file controls search engine crawlers. Understand syntax, best practices, and common mistakes to avoid.",
  keywords: ["robots.txt", "technical seo", "search engine crawlers", "googlebot", "indexing"],
  openGraph: {
    title: "Why Robots.txt is Essential for Your Technical SEO",
    description: "The complete guide to robots.txt for optimizing your website's crawl budget.",
    type: "article",
  },
};

export default function PostRobotsTxtEn() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Why Robots.txt is Essential for Your Technical SEO",
            description: "Control how search engines crawl your website with robots.txt.",
            datePublished: "2026-02-28",
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
                Why Robots.txt is Essential for Your Technical SEO
              </h1>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />5 min read</span>
                <span>February 28, 2026</span>
              </div>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-lg font-medium text-foreground/90 border-l-4 border-primary pl-4">
                The robots.txt file is your first line of defense in controlling how search engines interact with your website — even if it only contains a few lines of text.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">What is Robots.txt?</h2>
              <p>
                Robots.txt is a plain text file placed in your website's root directory. It tells search engine crawlers which pages or files they can or cannot request from your site. This is used mainly to avoid overloading your site with requests.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Basic Syntax</h2>
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-xl text-sm font-mono overflow-auto">
{`User-agent: *
Disallow: /admin/
Allow: /public/

User-agent: Googlebot
Disallow: /private/`}
              </pre>

              <h2 className="text-2xl font-bold text-foreground mt-8">Common Mistakes</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Blocking your entire site:</strong> Accidentally using <code>Disallow: /</code> will stop all crawling.</li>
                <li><strong>Blocking important assets:</strong> Google needs access to CSS and JS files to render your page correctly.</li>
                <li><strong>Thinking it hides content:</strong> Robots.txt is not a security measure. Use password protection for sensitive areas.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8">Conclusion</h2>
              <p>
                A well-configured robots.txt file is a vital part of technical SEO. Regularly check your file to ensure you aren't accidentally blocking critical content.
              </p>
            </article>

            <div className="pt-8 border-t">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
            </div>
          </div>
        </main>
    </div>
  );
}
