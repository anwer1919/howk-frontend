"use client";

import type { HalaProduct } from "@/lib/hala-data";
import { HALA_TEXTS } from "@/lib/hala-data";

interface HalaCardProps {
  product: HalaProduct;
  index: number;
  price?: string; // ديناميكي من سلة
  imageUrl?: string;
  productUrl?: string;
  inStock?: boolean;
}

export default function HalaCard({
  product,
  index,
  price = "—", // السعر الديناميكي من سلة
  imageUrl,
  productUrl,
  inStock = true,
}: HalaCardProps) {
  const handleClick = () => {
    if (!productUrl || !inStock) return;

    // GA4: select_item
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "select_item", {
        item_list_id: "hala_collection",
        item_list_name: "HALA",
        items: [
          {
            item_id: product.internalId,
            item_name: product.name,
            price: parseFloat(price.replace(/[^\d.]/g, "")) || 0,
            index: index + 1,
            click_area: "card",
            source: "hala_landing",
          },
        ],
      });
    }

    window.location.href = productUrl;
  };

  return (
    <article
      onClick={handleClick}
      className="block cursor-pointer"
      style={{ transition: "opacity 200ms ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.85";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
      }}
    >
      {/* الصورة - نسبة 4:5 */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "4/5",
          backgroundColor: "var(--howk-ivory)",
          borderRadius: "2px",
          border: "1px solid var(--howk-border)",
          marginBottom: "12px",
        }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={`جاكيت طويل ${product.name.replace("جاكيت طويل - ", "")} من مجموعة هالة - دار حوك`}
            className="w-full h-full object-cover object-top"
            loading={index < 2 ? "eager" : "lazy"}
            fetchPriority={index < 2 ? "high" : "auto"}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                fontSize: "13px",
                letterSpacing: "0.15em",
                color: "var(--howk-muted)",
              }}
            >
              {product.internalId}
            </span>
          </div>
        )}

        {!inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(5,5,5,0.75)" }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                fontSize: "13px",
                color: "var(--howk-ivory)",
                padding: "8px 16px",
                border: "1px solid var(--howk-border)",
                borderRadius: "2px",
              }}
            >
              نفد مؤقتًا
            </span>
          </div>
        )}
      </div>

      {/* اسم المنتج */}
      <h3
        style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: "clamp(14px, 1.5vw, 16px)",
          fontWeight: 500,
          color: "var(--howk-ivory)",
          lineHeight: 1.5,
          marginBottom: "6px",
        }}
      >
        {product.name}
      </h3>

      {/* من مجموعة هَالَة */}
      <p
        style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: "clamp(12px, 1.3vw, 13px)",
          color: "var(--howk-muted)",
          marginBottom: "8px",
        }}
      >
        {HALA_TEXTS.collectionLine}
      </p>

      {/* السعر الديناميكي */}
      <p
        style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: "clamp(16px, 1.8vw, 18px)",
          fontWeight: 600,
          color: "var(--howk-gold)",
          marginBottom: "12px",
        }}
      >
        {price}
      </p>

      {/* عينات النقشة الثلاث - غير تفاعلية */}
      <div
        className="flex gap-2"
        aria-hidden="true"
        style={{ pointerEvents: "none", marginBottom: "16px" }}
      >
        {product.patternColors.map((color, i) => (
          <span
            key={i}
            style={{
              width: "clamp(18px, 2vw, 20px)",
              height: "clamp(18px, 2vw, 20px)",
              borderRadius: "50%",
              backgroundColor: color,
              border: "1px solid var(--howk-border)",
            }}
          />
        ))}
      </div>

      {/* زر اكتشفي القطعة */}
      <button
        className="hala-btn w-full"
        disabled={!inStock}
        style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          letterSpacing: "0.05em",
          padding: "clamp(12px, 1.5vw, 14px) 0",
          minHeight: "44px",
          border: "1px solid var(--howk-gold)",
          borderRadius: "2px",
          color: inStock ? "var(--howk-gold)" : "var(--howk-muted)",
          backgroundColor: "transparent",
          cursor: inStock ? "pointer" : "not-allowed",
          width: "100%",
        }}
      >
        {inStock ? HALA_TEXTS.ctaButton : "نفد مؤقتًا"}
      </button>
    </article>
  );
}