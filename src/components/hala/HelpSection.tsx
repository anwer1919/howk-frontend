"use client";

import { HALA_TEXTS } from "@/lib/hala-data";
import { MessageCircle } from "lucide-react";

export default function HelpSection() {
  const whatsappNumber = "966500000000"; // TODO: استبدل بالرقم الرسمي
  const message = encodeURIComponent(HALA_TEXTS.whatsappMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "contact", {
        method: "whatsapp",
        context: "hala_color_help",
      });
    }
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      style={{
        paddingTop: "clamp(48px, 6vw, 64px)",
        paddingBottom: "clamp(48px, 6vw, 64px)",
        backgroundColor: "var(--howk-espresso)",
      }}
    >
      <div
        className="mx-auto text-center"
        style={{
          maxWidth: "600px",
          paddingLeft: "clamp(16px, 2vw, 24px)",
          paddingRight: "clamp(16px, 2vw, 24px)",
        }}
      >
        {/* العنوان */}
        <h2
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "clamp(24px, 3vw, 32px)",
            fontWeight: 600,
            color: "var(--howk-ivory)",
            marginBottom: "16px",
            lineHeight: 1.3,
          }}
        >
          {HALA_TEXTS.helpTitle}
        </h2>

        {/* النص */}
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "clamp(14px, 1.5vw, 16px)",
            color: "var(--howk-muted)",
            marginBottom: "32px",
            lineHeight: 1.6,
            maxWidth: "480px",
            margin: "0 auto 32px",
          }}
        >
          {HALA_TEXTS.helpText}
        </p>

        {/* زر واتساب */}
        <button
          onClick={handleWhatsAppClick}
          className="inline-flex items-center justify-center gap-3"
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.05em",
            padding: "14px 32px",
            minWidth: "240px",
            minHeight: "48px",
            border: "1px solid var(--howk-gold)",
            borderRadius: "2px",
            color: "var(--howk-gold)",
            backgroundColor: "transparent",
            cursor: "pointer",
            transition: "all 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--howk-gold)";
            e.currentTarget.style.color = "var(--howk-black)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--howk-gold)";
          }}
        >
          <MessageCircle size={18} />
          {HALA_TEXTS.whatsappButton}
        </button>
      </div>
    </section>
  );
}