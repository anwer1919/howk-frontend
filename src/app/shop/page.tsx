import type { Metadata } from "next";
import StoreHeader from "@/components/store/StoreHeader";
import StoreProductCard from "@/components/store/StoreProductCard";
import { STORE_PRODUCTS, t, getCurrentLocale } from "@/lib/translations";

export const metadata: Metadata = {
  title: "دار حوك | متجر الكشمير الفاخر",
  description: "دار حوك - جاكيتات ومعاطف وشالات كشمير فاخرة بحياكة يدوية",
};

export default function HomePage() {
  const locale = getCurrentLocale();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--howk-black)" }} dir="rtl">
      <StoreHeader />

      {/* صورة العلامة التجارية - فوق المقدمة */}
      <section
        className="flex items-center justify-center"
        style={{ backgroundColor: "var(--howk-black)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/howk-hero.jpg"
          alt="دار حوك - نخوكِ قصتنا بخيوط التفرد والفخامة"
          className="block w-full h-auto"
          style={{
            maxWidth: "1180px",
            maxHeight: "92vh",
            objectFit: "contain",
          }}
        />
      </section>

      {/* المقدمة */}
      <section
        className="text-center"
        style={{
          paddingTop: "clamp(32px, 6vw, 56px)",
          paddingBottom: "clamp(24px, 4vw, 40px)",
          paddingLeft: "16px",
          paddingRight: "16px",
          borderBottom: "1px solid var(--howk-border)",
        }}
      >
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "13px",
            letterSpacing: "0.15em",
            color: "var(--howk-gold)",
            marginBottom: "12px",
          }}
        >
          {t("introLine", locale)}
        </p>
        <h1
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "clamp(40px, 10vw, 56px)",
            fontWeight: 600,
            color: "var(--howk-ivory)",
            lineHeight: 1,
            marginBottom: "12px",
          }}
        >
          {t("brandName", locale)}
        </h1>
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "15px",
            color: "var(--howk-muted)",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          فخامة الكشمير الأصيل • حياكة يدوية • حضوركِ يبدأ قبل وصولكِ
        </p>
      </section>

      {/* جميع المنتجات */}
      <section
        style={{
          paddingTop: "clamp(24px, 4vw, 40px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
          paddingLeft: "clamp(12px, 2vw, 16px)",
          paddingRight: "clamp(12px, 2vw, 16px)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "1180px" }}>
          <div className="flex items-baseline justify-between mb-8">
            <h2
              style={{
                fontFamily: "'Noto Naskh Arabic', serif",
                fontSize: "clamp(22px, 3vw, 28px)",
                fontWeight: 600,
                color: "var(--howk-ivory)",
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
              {STORE_PRODUCTS.length} {t("products", locale)}
            </span>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-3"
            style={{ gap: "clamp(16px, 2vw, 24px)" }}
          >
            {STORE_PRODUCTS.map((product) => (
              <StoreProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

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