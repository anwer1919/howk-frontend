"use client";

import { t, getCurrentLocale } from "@/lib/translations";

export default function HalaFooter() {
  const locale = getCurrentLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "clamp(32px, 4vw, 48px) 16px",
        backgroundColor: "var(--howk-black)",
        borderTop: "1px solid var(--howk-border)",
      }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: "1180px" }}>
        <nav className="flex flex-wrap justify-center gap-6 mb-6">
          <a
            href="#"
            className="hala-link"
            style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: "13px",
              color: "var(--howk-muted)",
              textDecoration: "none",
            }}
          >
            {t("shipping", locale)}
          </a>
          <a
            href="#"
            className="hala-link"
            style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: "13px",
              color: "var(--howk-muted)",
              textDecoration: "none",
            }}
          >
            {t("warranty", locale)}
          </a>
          <a
            href="#"
            className="hala-link"
            style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: "13px",
              color: "var(--howk-muted)",
              textDecoration: "none",
            }}
          >
            {t("about", locale)}
          </a>
        </nav>
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "12px",
            color: "var(--howk-muted)",
            opacity: 0.7,
          }}
        >
          {t("copyright", locale)} © {currentYear}
        </p>
      </div>
    </footer>
  );
}