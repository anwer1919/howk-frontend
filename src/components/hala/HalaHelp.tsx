"use client";

import { MessageCircle } from "lucide-react";
import { t, getCurrentLocale } from "@/lib/translations";

export default function HalaHelp() {
  const locale = getCurrentLocale();
  const whatsappNumber = "966500000000"; // TODO: رقم حوك الرسمي
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    t("whatsappMessage", locale)
  )}`;

  const handleClick = () => {
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
        paddingLeft: "clamp(16px, 2vw, 24px)",
        paddingRight: "clamp(16px, 2vw, 24px)",
      }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: "600px" }}>
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
          {t("helpTitle", locale)}
        </h2>
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "clamp(14px, 1.5vw, 16px)",
            color: "var(--howk-muted)",
            marginBottom: "32px",
            lineHeight: 1.6,
          }}
        >
          {t("helpText", locale)}
        </p>
        <button
          onClick={handleClick}
          className="hala-btn inline-flex items-center justify-center gap-3"
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            padding: "14px 32px",
            minWidth: "240px",
            minHeight: "48px",
            border: "1px solid var(--howk-gold)",
            borderRadius: "2px",
            color: "var(--howk-gold)",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
          <MessageCircle size={18} />
          {t("whatsappButton", locale)}
        </button>
      </div>
    </section>
  );
}