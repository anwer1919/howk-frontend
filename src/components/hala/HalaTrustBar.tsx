"use client";

import { HALA_TEXTS } from "@/lib/hala-data";

export default function HalaTrustBar() {
  return (
    <div
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
        style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: "11px",
          color: "var(--howk-gold)",
          opacity: 0.85,
          letterSpacing: "0.02em",
          padding: "0 16px",
          textAlign: "center",
        }}
      >
        {HALA_TEXTS.trustBar}
      </p>
    </div>
  );
}