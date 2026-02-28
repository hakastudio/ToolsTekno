import React from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { Clock, ArrowLeft, Home, Key, Lock, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Developer's Guide to JSON Web Tokens (JWT)",
  description: "Understand how JWT works, its structure, and security best practices for session management in web applications.",
  keywords: ["jwt", "json web token", "authentication", "web security", "developer guide"],
  openGraph: {
    title: "A Developer's Guide to JSON Web Tokens (JWT)",
    description: "Master JWT authentication and security for your web apps.",
    type: "article",
  },
};

export default function PostJwtEn() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "A Developer's Guide to JSON Web Tokens (JWT)",
            description: "A comprehensive guide to JWT authentication and security.",
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
              <span className="text-foreground">JWT Guide</span>
            </nav>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase">Developer</span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                A Developer's Guide to JSON Web Tokens (JWT)
              </h1>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />7 min read</span>
                <span>February 28, 2026</span>
              </div>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-lg font-medium text-foreground/90 border-l-4 border-primary pl-4">
                JWT (JSON Web Token) has become the de-facto standard for token-based authentication in modern web applications.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">What is JWT?</h2>
              <p>
                JWT is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">Structure of a JWT</h2>
              <p>A JWT consists of three parts separated by dots (.):</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Header:</strong> Specifies the token type and the hashing algorithm.</li>
                <li><strong>Payload:</strong> Contains the claims, which are statements about an entity (typically, the user) and additional data.</li>
                <li><strong>Signature:</strong> Used to verify the message wasn't changed along the way.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8">Security Best Practices</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Use strong algorithms:</strong> Always prefer RS256 or HS256. Avoid the "none" algorithm.</li>
                <li><strong>Set expiration times:</strong> Tokens should always expire to minimize risk if a token is stolen.</li>
                <li><strong>Store securely:</strong> Use httpOnly cookies to prevent XSS attacks from stealing tokens.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8">Conclusion</h2>
              <p>
                JWT is a powerful tool when used correctly. Understand the security implications and always validate your tokens on the server side.
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
