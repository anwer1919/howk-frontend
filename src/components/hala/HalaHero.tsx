import { HALA_TEXTS } from "@/lib/hala-data";

export default function HalaHero() {
  return (
    <section
      style={{
        paddingTop: "clamp(48px, 8vw, 80px)",
        paddingBottom: "clamp(48px, 8vw, 80px)",
        paddingLeft: "clamp(12px, 2vw, 16px)",
        paddingRight: "clamp(12px, 2vw, 16px)",
        textAlign: "center",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1180px" }}>
        {/* العلامة الأم */}
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            color: "var(--howk-muted)",
            marginBottom: "12px",
          }}
        >
          {HALA_TEXTS.brandName}
        </p>

        {/* سطر التقديم */}
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "13px",
            letterSpacing: "0.15em",
            color: "var(--howk-gold)",
            marginBottom: "16px",
          }}
        >
          {HALA_TEXTS.introLine}
        </p>

        {/* H1 الوحيد */}
        <h1
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "clamp(48px, 13vw, 64px)",
            fontWeight: 600,
            lineHeight: 1,
            color: "var(--howk-ivory)",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          {HALA_TEXTS.h1}
        </h1>

        {/* السطر الإنجليزي */}
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "13px",
            letterSpacing: "0.18em",
            color: "var(--howk-muted)",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          {HALA_TEXTS.englishLine}
        </p>

        {/* العبارة العاطفية */}
        <p
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "clamp(20px, 2.5vw, 22px)",
            fontWeight: 500,
            lineHeight: 1.45,
            color: "var(--howk-ivory)",
            maxWidth: "600px",
            margin: "0 auto 24px",
          }}
        >
          {HALA_TEXTS.emotionalLine}
        </p>

        {/* سطر الألوان */}
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "14px",
            color: "var(--howk-gold)",
            opacity: 0.9,
          }}
        >
          {HALA_TEXTS.colorsLine}
        </p>
      </div>
    </section>
  );
}