"use client";

import React from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { FileText, Scale, Gavel, ShieldCheck } from "lucide-react";

export default function TermsOfService() {
  return (
    <ToolPageLayout
      title="Terms of Service"
      description="The rules and guidelines for using TOOLS TEKNO."
      icon={FileText}
    >
      <div className="space-y-10 text-foreground/80 leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Gavel className="w-6 h-6 text-primary" />
            Terms of Use
          </h2>
          <p>
            By accessing and using TOOLS TEKNO, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              Usage License
            </h3>
            <p className="text-sm">
              Our tools are provided for free for both personal and commercial use. You are permitted to use the generated output (code, images, configurations) in your own projects without attribution, though it is appreciated.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              No Warranty
            </h3>
            <p className="text-sm">
              The tools are provided "as-is" without any warranties. While we strive for accuracy, TOOLS TEKNO is not responsible for any errors in generated output or any damages resulting from the use of our tools.
            </p>
          </div>
        </section>

        <section className="space-y-4 border-l-4 border-primary/20 pl-6 italic">
          <p>
            <strong>Prohibited Use:</strong> You may not use our tools to generate malicious content, perform automated bulk requests that strain our infrastructure, or attempt to reverse engineer the website's protected logic.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Limitation of Liability</h2>
          <p>
            In no event shall TOOLS TEKNO or its contributors be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on our website.
          </p>
        </section>

        <div className="p-6 rounded-2xl bg-muted/50 border border-border text-center">
          <p className="text-xs text-muted-foreground">
            Last Updated: February 2026
          </p>
        </div>
      </div>
    </ToolPageLayout>
  );
}
