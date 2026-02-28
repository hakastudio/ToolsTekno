"use client";

import React from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { 
  BookOpen, 
  Zap, 
  ShieldCheck, 
  MousePointer2, 
  Search, 
  Code2, 
  HelpCircle,
  Lightbulb
} from "lucide-react";

export default function EducationalPage() {
  return (
    <ToolPageLayout
      title="Guide: What is TOOLS TEKNO?"
      description="Learn how to leverage our professional utility suite to speed up your development and SEO workflow."
      icon={BookOpen}
    >
      <div className="space-y-16">
        {/* Section 1: What are Tekno Tools */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">What are Tekno Tools?</h2>
            <p className="text-muted-foreground leading-relaxed">
              TOOLS TEKNO is a comprehensive, professional-grade library of web-based utilities. We provide over 35 tools spanning SEO analysis, developer formatting, cryptographic hashing, and image optimization.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-card/50 space-y-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 w-fit">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground">SEO Suite</h3>
              <p className="text-sm text-muted-foreground">
                Advanced audit tools like Keyword Density Checkers, Meta Analyzers, and Google Index Checkers to help you dominate search rankings.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card/50 space-y-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 w-fit">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground">Developer Utils</h3>
              <p className="text-sm text-muted-foreground">
                Formatters, encoders, and validators for JSON, JWT, Base64, and Regular Expressions—built for engineers, by engineers.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: How to Use Them */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">How to Use Tools Tekno</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our platform is designed for zero-friction usage. You don't need an account, a credit card, or even to wait for a server to process your data.
            </p>
          </div>
          <div className="relative border-l-2 border-primary/20 ml-4 pl-8 space-y-10">
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-primary border-4 border-background" />
              <h3 className="font-bold text-foreground">1. Find Your Tool</h3>
              <p className="text-muted-foreground text-sm mt-1">Browse our category-based library or use the lightning-fast search bar to find exactly what you need.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-primary border-4 border-background" />
              <h3 className="font-bold text-foreground">2. Input Your Data</h3>
              <p className="text-muted-foreground text-sm mt-1">Paste your code, upload your image, or type your query into the input field. Execution starts automatically for most tools.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-primary border-4 border-background" />
              <h3 className="font-bold text-foreground">3. Copy and Iterate</h3>
              <p className="text-muted-foreground text-sm mt-1">Once generated, use our one-click copy buttons or download options to integrate the result into your workflow.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Benefits */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-foreground text-center">Why Developers Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto p-4 rounded-2xl bg-green-500/10 text-green-500 w-fit">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg">Serverless Privacy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                99% of our tools run entirely in your browser using JavaScript. Your sensitive code, passwords, and data never leave your computer.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto p-4 rounded-2xl bg-amber-500/10 text-amber-500 w-fit">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg">Blazing Fast</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Without server round-trips, our tools provide instant feedback. No loading screens, just results.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto p-4 rounded-2xl bg-rose-500/10 text-rose-500 w-fit">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg">Always Free</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We provide professional-grade utilities without paywalls. Our mission is to support the global developer community.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tip Callout */}
        <div className="p-8 rounded-3xl bg-slate-900 dark:bg-slate-800 text-white flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 rounded-2xl bg-primary/20 text-primary shrink-0">
            <Zap className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold">Pro Tip: Dark Mode</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Working late? Click the sun/moon icon in the header to toggle between light and dark modes. Dark mode is optimized for reduced eye strain during long coding sessions.
            </p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
