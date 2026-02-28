"use client";

import React from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Coffee, Code2, Rocket, Heart, Laptop, ShieldCheck } from "lucide-react";

export default function AboutUs() {
  return (
    <ToolPageLayout
      title="About Us"
      description="The story behind TOOLS TEKNO and why we build for the developer community."
      icon={Code2}
    >
      <div className="space-y-12">
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-foreground/80 leading-relaxed text-lg">
                TOOLS TEKNO was born out of a simple frustration: most online developer tools are cluttered with ads, slow to load, or questionable about data privacy.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                We set out to build a professional-grade utility suite that is <strong>fast</strong>, <strong>minimalist</strong>, and <strong>100% private</strong>. We believe that basic developer tools should be free, accessible, and run entirely in your browser without sacrificing your security.
              </p>
            </div>
            <div className="w-full md:w-64 aspect-square bg-primary/10 rounded-3xl flex items-center justify-center text-primary shrink-0">
              <Rocket className="w-24 h-24" />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Laptop, title: "Modern Stack", desc: "Built with Next.js 15 and Tailwind CSS for peak performance." },
            { icon: ShieldCheck, title: "Privacy First", desc: "Client-side execution means your data never leaves your device." },
            { icon: Heart, title: "Community Driven", desc: "Open-source values at the core of every tool we create." }
          ].map((feature, i) => (
            <div key={i} className="minimal-card p-6 space-y-3">
              <div className="p-2 rounded-lg bg-primary/5 text-primary w-fit">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </section>

        <section className="p-10 rounded-3xl bg-slate-900 text-white space-y-6 text-center">
          <Coffee className="w-12 h-12 mx-auto text-amber-500" />
          <h2 className="text-2xl font-bold">Supported by Developers</h2>
          <p className="max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">
            This project is independently maintained and updated. We focus on tools that solve real-world engineering and SEO challenges without the bloat.
          </p>
          <div className="pt-4">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Made by the Tech Community for the Community</span>
          </div>
        </section>
      </div>
    </ToolPageLayout>
  );
}
