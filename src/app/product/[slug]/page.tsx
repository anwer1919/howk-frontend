import { notFound } from "next/navigation";
import StoreHeader from "@/components/store/StoreHeader";
import StoreProductCard from "@/components/store/StoreProductCard";
import { getCategoryBySlug, formatSAR } from "@/lib/store-data";
import { getLiveStoreProductBySlug, getLiveStoreProductsByCategory } from "@/lib/salla-service";
import { t, getCurrentLocale } from "@/lib/translations";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getLiveStoreProductBySlug(slug);
  if (!product) notFound();
  const category = getCategoryBySlug(product.category);
  const categoryProducts = await getLiveStoreProductsByCategory(product.category);
  const related = categoryProducts.filter((p) => p.slug !== product.slug).slice(0, 3);
  const locale = getCurrentLocale();
  const isAr = locale === "ar";

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--howk-black)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <StoreHeader />

      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2"
        style={{
          maxWidth: "1180px",
          gap: "clamp(24px, 4vw, 48px)",
          padding: "clamp(24px, 4vw, 48px) clamp(12px, 2vw, 16px)",
        }}
      >
        <div
          className="relative w-full"
          style={{
            aspectRatio: "4/5",
            backgroundColor: "var(--howk-ivory)",
            borderRadius: "2px",
            border: "1px solid var(--howk-border)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                fontSize: "14px",
                letterSpacing: "0.15em",
                color: "var(--howk-muted)",
              }}
            >
              {product.sku}
            </span>
          </div>
        </div>

        <div>
          {category && (
            <p
              style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                fontSize: "12px",
                letterSpacing: "0.1em",
                color: "var(--howk-gold)",
                marginBottom: "12px",
              }}
            >
              {isAr ? category.name : category.shortName}
            </p>
          )}

          <h1
            style={{
              fontFamily: "'Noto Naskh Arabic', serif",
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: 600,
              color: "var(--howk-ivory)",
              lineHeight: 1.4,
              marginBottom: "16px",
            }}
          >
            {product.name}
          </h1>

          <p
            style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: "22px",
              fontWeight: 600,
              color: "var(--howk-gold)",
              marginBottom: "24px",
            }}
          >
            {formatSAR(product.salePrice ?? product.price)}
          </p>

          <div
            style={{
              borderTop: "1px solid var(--howk-border)",
              paddingTop: "24px",
              marginBottom: "32px",
            }}
          >
            <p
              style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                fontSize: "14px",
                lineHeight: 1.8,
                color: "var(--howk-muted)",
              }}
            >
              {isAr
                ? "قطعة فاخرة من دار حوك، صُنعت بعناية فائقة لتجمع بين الأناقة والدفء."
                : "A luxurious piece from HOWK, meticulously crafted to combine elegance and warmth."}
            </p>
          </div>

          <a
            href="https://howkworld.com/ar"
            target="_blank"
            rel="noopener noreferrer"
            className="hala-btn block w-full text-center"
            style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              padding: "16px 0",
              minHeight: "48px",
              border: "1px solid var(--howk-gold)",
              borderRadius: "2px",
              color: "var(--howk-gold)",
              backgroundColor: "transparent",
              textDecoration: "none",
            }}
          >
            {isAr ? "أكملي الطلب عبر المتجر الرسمي" : "Complete your order via the official store"}
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <section
          style={{
            padding: "clamp(32px, 5vw, 64px) clamp(12px, 2vw, 16px)",
            borderTop: "1px solid var(--howk-border)",
          }}
        >
          <div className="mx-auto" style={{ maxWidth: "1180px" }}>
            <h2
              className="text-center mb-8"
              style={{
                fontFamily: "'Noto Naskh Arabic', serif",
                fontSize: "24px",
                fontWeight: 600,
                color: "var(--howk-ivory)",
              }}
            >
              {isAr ? "قد يعجبكِ أيضًا" : "You May Also Like"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
              {related.map((p) => (
                <StoreProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

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