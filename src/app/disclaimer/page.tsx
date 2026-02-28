"use client";

import React from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { ShieldAlert, Info, AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <ToolPageLayout
      title="Disclaimer"
      description="Legal notices regarding the accuracy and reliability of the tools provided by TOOLS TEKNO."
      icon={ShieldAlert}
    >
      <div className="space-y-8 text-foreground/80 leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            General Information
          </h2>
          <p>
            The information and tools provided on TOOLS TEKNO are for general informational purposes only. While we strive to keep the tools accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, or services contained on the website for any purpose.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            No Liability
          </h2>
          <p>
            Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website and its tools.
          </p>
          <p>
            Professionals should always verify the output of these tools manually. For example, SEO analysis or Server configurations (like Apache/Nginx) should be tested in a safe environment before being deployed to production systems.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">External Links</h2>
          <p>
            Through this website, you are able to link to other websites which are not under the control of TOOLS TEKNO. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
          </p>
        </section>

        <div className="p-6 rounded-2xl bg-muted/50 border border-border">
          <p className="text-sm italic">
            Last Updated: February 2026. By using our services, you agree to this disclaimer.
          </p>
        </div>
      </div>
    </ToolPageLayout>
  );
}
