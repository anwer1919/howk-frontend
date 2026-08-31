import type { Metadata } from "next";
import StoreHeader from "@/components/store/StoreHeader";
import StoreProductCard from "@/components/store/StoreProductCard";
import { getLiveStoreProducts } from "@/lib/salla-service";
import { t, getCurrentLocale } from "@/lib/translations";

export const metadata: Metadata = {
  title: "المتجر | دار حوك",
  description: "جميع منتجات دار حوك الفاخرة",
};

export default async function ShopPage() {
  const products = await getLiveStoreProducts();
  const locale = getCurrentLocale();
  const isAr = locale === "ar";

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--howk-black)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <StoreHeader />

      <section
        className="text-center"
        style={{
          paddingTop: "clamp(40px, 6vw, 64px)",
          paddingBottom: "clamp(24px, 4vw, 40px)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "clamp(28px, 6vw, 44px)",
            fontWeight: 600,
            color: "var(--howk-ivory)",
          }}
        >
          {isAr ? "المتجر" : "Store"}
        </h1>
      </section>

      <section
        style={{
          paddingBottom: "clamp(48px, 6vw, 80px)",
          paddingLeft: "clamp(12px, 2vw, 16px)",
          paddingRight: "clamp(12px, 2vw, 16px)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "1180px" }}>
          <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
            {products.map((product) => (
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
