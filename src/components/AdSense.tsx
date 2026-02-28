"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  fullWidthResponsive?: boolean;
  className?: string;
}

export default function AdSense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // This useEffect is now empty as the ad push logic moves to the scriptLoaded useEffect
    // The original try/catch block is removed.
  }, []);

  // Push ad request after script is loaded
  useEffect(() => {
    if (scriptLoaded && typeof window !== "undefined" && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, [scriptLoaded]);

  return (
    <>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        async
        onLoad={() => setScriptLoaded(true)}
        strategy="lazyOnload"
      />
      <div className={`adsense-container overflow-hidden ${className}`}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6551248787435250"
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        />
      </div>
    </>
  );
}
