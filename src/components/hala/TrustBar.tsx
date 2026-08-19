"use client";

import { HALA_TEXTS } from "@/lib/hala-data";

export default function TrustBar() {
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: "var(--howk-black)",
        borderBottom: "1px solid var(--howk-border)",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        className="text-[11px] md:text-xs tracking-wide px-4"
        style={{ color: "var(--howk-gold)", opacity: 0.8 }}
      >
        {HALA_TEXTS.trustBar}
      </p>
    </div>
  );
}