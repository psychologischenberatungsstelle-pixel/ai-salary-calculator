"use client";

import { useEffect } from "react";

type AdBannerProps = {
  slot?: string;
  format?: "auto" | "rectangle" | "responsive";
  className?: string;
};

export default function AdBanner({ slot = "1234567890", format = "auto", className = "" }: AdBannerProps) {
  // Push ad to AdSense on client side
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle.push({});
      } catch (err) {
        console.error("AdSense push error:", err);
      }
    }
  }, []);

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-4 border-2 border-gray-200 ${className}`}>
      <div className="text-center mb-3">
        <p className="text-xs text-gray-500">Advertisement</p>
      </div>

      {/* AdSense Ad Unit */}
      <ins
        className="adsbygoogle w-full"
        style={{ display: "block", minHeight: format === "rectangle" ? "250px" : "200px" }}
        data-ad-client="ca-pub-9530397831230003"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
