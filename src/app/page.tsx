import type { Metadata } from "next";
import StoreHeader from "@/components/store/StoreHeader";
import HalaGrid from "@/components/hala/HalaGrid";
import HalaHelp from "@/components/hala/HalaHelp";
import { HALA_PRODUCTS } from "@/lib/hala-data";
import { getHalaLiveProducts } from "@/lib/salla-service";
import { t, getCurrentLocale } from "@/lib/translations";

export const metadata: Metadata = {
  title: "مجموعة هالة من دار حوك | جاكيتات نسائية",
  description:
    "مجموعة هَالَة - ستة ألوان من الجاكيتات الطويلة الفاخرة. حضوركِ يبدأ قبل وصولكِ.",
};

export default async function HomePage() {
  const locale = getCurrentLocale();
  const isAr = locale === "ar";

  // الأسعار ديناميكياً من سلة (جهة الخادم)
  const liveProducts = await getHalaLiveProducts();
  const productsData = liveProducts.map((p) => ({
    internalId: p.internalId,
    price: p.formattedPrice,
    imageUrl: p.imageUrl,
    productUrl: p.productUrl,
    inStock: p.inStock,
  }));

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--howk-black)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <StoreHeader />

      {/* ===== الصورة في الأعلى - عرض كامل ===== */}
      <section
        style={{
          backgroundColor: "var(--howk-black)",
          width: "100%",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/howk-hero.jpg"
          alt={
            isAr
              ? "دار حوك - نخوكِ قصتنا بخيوط التفرد والفخامة"
              : "HOWK - Our story, woven with threads of uniqueness and luxury"
          }
          className="block"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </section>

      {/* ===== المقدمة النصية ===== */}
      <section
        className="text-center"
        style={{
          paddingTop: "clamp(32px, 5vw, 48px)",
          paddingBottom: "clamp(12px, 2vw, 16px)",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {/* سطر 1: تُقدّم مجموعة */}
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "clamp(13px, 1.4vw, 15px)",
            letterSpacing: "0.15em",
            color: "var(--howk-muted)",
            marginBottom: "clamp(16px, 2vw, 24px)",
          }}
        >
          {t("introLine", locale)}
        </p>

        {/* سطر 2: ─── هَالَة ─── (ذهبي مع خطين جانبيين) */}
        <h1
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "clamp(48px, 13vw, 64px)",
            fontWeight: 600,
            lineHeight: 1,
            color: "var(--howk-gold)",
            letterSpacing: "-0.02em",
            marginBottom: "clamp(16px, 2vw, 20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(12px, 2vw, 24px)",
          }}
        >
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
          <span>{t("h1", locale)}</span>
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

        {/* سطر 3: THE HALA COLLECTION - ذهبي حسب المرجع */}
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(12px, 1.4vw, 14px)",
            letterSpacing: "0.18em",
            color: "var(--howk-gold)",
            textTransform: "uppercase",
            marginBottom: "clamp(16px, 2vw, 24px)",
          }}
        >
          {t("englishLine", locale)}
        </p>

        {/* سطر 4: مجموعة هَالَة - ستة ألوان... */}
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "clamp(14px, 1.5vw, 16px)",
            color: "var(--howk-ivory)",
            lineHeight: 1.6,
            maxWidth: "600px",
            margin: "0 auto",
            marginBottom: "clamp(12px, 1.5vw, 16px)",
          }}
        >
          {isAr
            ? "مجموعة هَالَة - ستة ألوان من الجاكيتات الطويلة الفاخرة"
            : "The HALA Collection - Six colors of luxurious long jackets"}
        </p>

        {/* سطر 5: فخامة الكشمير الأصيل... */}
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "clamp(13px, 1.4vw, 15px)",
            color: "var(--howk-muted)",
            lineHeight: 1.6,
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          {isAr
            ? "فخامة الكشمير الأصيل • حياكة يدوية • حضوركِ يبدأ قبل وصولكِ"
            : "Authentic Cashmere Luxury • Hand-Knitted • Your Presence Begins Before You Arrive"}
        </p>
      </section>

      {/* ===== عنوان الشبكة ===== */}
      <section
        className="text-center"
        style={{
          paddingBottom: "clamp(8px, 1vw, 12px)",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "clamp(22px, 3vw, 28px)",
            fontWeight: 600,
            color: "var(--howk-ivory)",
            marginBottom: "8px",
          }}
        >
          {t("allProducts", locale)}
        </h2>
        <span
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "13px",
            color: "var(--howk-muted)",
          }}
        >
          {HALA_PRODUCTS.length} {t("products", locale)}
        </span>
      </section>

      {/* ===== 6 بطاقات هَالَة فقط - مع زر "اكتشفي القطعة" ===== */}
      <HalaGrid productsData={productsData} />

      {/* ===== صندوق المساعدة ===== */}
      <HalaHelp />

      {/* ===== الفوتر ===== */}
      <footer
        className="text-center"
        style={{
          padding: "32px 16px",
          borderTop: "1px solid var(--howk-border)",
        }}
      >
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "12px",
            color: "var(--howk-muted)",
          }}
        >
          {t("copyright", locale)} © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}