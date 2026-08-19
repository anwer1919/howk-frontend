"use client";

import { t, getCurrentLocale } from "@/lib/translations";

export default function HalaHero() {
  const locale = getCurrentLocale();

  return (
    <section
      style={{
        paddingTop: "clamp(48px, 8vw, 80px)",
        paddingBottom: "clamp(48px, 8vw, 80px)",
        paddingLeft: "clamp(12px, 2vw, 16px)",
        paddingRight: "clamp(12px, 2vw, 16px)",
        textAlign: "center",
        backgroundColor: "var(--howk-black)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1180px" }}>
        {/* سطر 1: تُقدّم مجموعة */}
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "clamp(13px, 1.4vw, 15px)",
            fontWeight: 400,
            letterSpacing: "0.15em",
            color: "var(--howk-muted)",
            marginBottom: "clamp(16px, 2vw, 24px)",
          }}
        >
          {t("introLine", locale)}
        </p>

        {/* سطر 2: ─── هَالَة ─── */}
        <h1
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "clamp(48px, 13vw, 64px)",
            fontWeight: 600,
            lineHeight: 1,
            color: "var(--howk-gold)",
            letterSpacing: "-0.02em",
            marginBottom: "clamp(24px, 3vw, 32px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(12px, 2vw, 24px)",
          }}
        >
          {/* الخط الذهبي الأيمن */}
          <span
            aria-hidden="true"
            style={{
              display: "block",
              width: "clamp(32px, 6vw, 64px)",
              height: "1px",
              backgroundColor: "var(--howk-gold)",
              flexShrink: 0,
            }}
          />

          {/* كلمة هَالَة */}
          <span>{t("h1", locale)}</span>

          {/* الخط الذهبي الأيسر */}
          <span
            aria-hidden="true"
            style={{
              display: "block",
              width: "clamp(32px, 6vw, 64px)",
              height: "1px",
              backgroundColor: "var(--howk-gold)",
              flexShrink: 0,
            }}
          />
        </h1>

        {/* سطر 3: مجموعة هَالَة - ستة ألوان من الجاكيتات الطويلة الفاخرة */}
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "clamp(14px, 1.5vw, 16px)",
            fontWeight: 400,
            color: "var(--howk-ivory)",
            lineHeight: 1.6,
            maxWidth: "600px",
            margin: "0 auto",
            letterSpacing: "0.02em",
          }}
        >
          مجموعة هَالَة - ستة ألوان من الجاكيتات الطويلة الفاخرة
        </p>
      </div>
    </section>
  );
}