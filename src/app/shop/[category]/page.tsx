import { notFound } from "next/navigation";
import StoreHeader from "@/components/store/StoreHeader";
import StoreProductCard from "@/components/store/StoreProductCard";
import { getCategoryBySlug } from "@/lib/store-data";
import { getLiveStoreProductsByCategory } from "@/lib/salla-service";
import { t, getCurrentLocale } from "@/lib/translations";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();
  const products = await getLiveStoreProductsByCategory(categorySlug);
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
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "clamp(28px, 6vw, 44px)",
            fontWeight: 600,
            color: "var(--howk-ivory)",
            marginBottom: "8px",
          }}
        >
          {isAr ? category.name : category.shortName}
        </h1>
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: "14px",
            color: "var(--howk-muted)",
          }}
        >
          {category.description}
        </p>
      </section>

      <section
        style={{
          paddingBottom: "clamp(48px, 6vw, 80px)",
          paddingLeft: "clamp(12px, 2vw, 16px)",
          paddingRight: "clamp(12px, 2vw, 16px)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "1180px" }}>
          {products.length === 0 ? (
            <div className="text-center" style={{ padding: "64px 0" }}>
              <p
                style={{
                  fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                  fontSize: "15px",
                  color: "var(--howk-muted)",
                }}
              >
                {isAr ? "لا توجد منتجات في هذا التصنيف حاليًا" : "No products in this category yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
              {products.map((product) => (
                <StoreProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
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