"use client";

import React from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { Lock, EyeOff, ShieldCheck, Database } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <ToolPageLayout
      title="Privacy Policy"
      description="Learn how we protect your data. Spoiler: We don't store it."
      icon={Lock}
    >
      <div className="space-y-10 text-foreground/80 leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-primary" />
            Our Privacy Commitment
          </h2>
          <p>
            At TOOLS TEKNO, your privacy is our top priority. Unlike many online utility suites, we believe that your data belongs to you. Our architecture is designed with a "Privacy First" approach, ensuring that your sensitive information never touches our servers.
          </p>
        </section>

        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-primary/5 space-y-3">
              <div className="p-2 w-fit rounded-lg bg-primary text-white">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground">Zero Logging</h3>
              <p className="text-sm">
                We do not log the text you input, the images you upload, or the configurations you generate. Once you close your browser tab, your session data is gone forever.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-primary/5 space-y-3">
              <div className="p-2 w-fit rounded-lg bg-primary text-white">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground">Client-Side Processing</h3>
              <p className="text-sm">
                99% of our tools execute directly in your browser using JavaScript. This means the actual "work" happens on your device, not on our server.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Data Collection</h2>
          <p>
            We may collect minimal, non-personally identifiable information such as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Browser type and version.</li>
            <li>Basic usage patterns (which tools are used most) to improve our library.</li>
            <li>General geographic location (Country level).</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Essential Cookies</h2>
          <p>
            We use essential cookies to remember your theme preference (Dark/Light mode). We do not use tracking cookies for our own purposes.
          </p>
        </section>

        <div className="p-6 rounded-2xl bg-muted/50 border border-border text-center">
          <p className="text-sm font-semibold text-primary">
            Safe. Private. Professional.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Last Updated: February 28, 2026
          </p>
        </div>
      </div>
    </ToolPageLayout>
  );
}
