"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreProduct } from "@/lib/store-data";
import { formatSAR } from "@/lib/store-data";

export default function StoreProductCard({ product }: { product: StoreProduct }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      aria-label={product.name}
    >
      {/* الصورة */}
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
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 50vw, 33vw"
            loading="lazy"
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
              {product.sku}
            </span>
          </div>
        )}

        {/* شارة تخفيض */}
        {product.salePrice && (
          <span
            className="absolute"
            style={{
              top: "10px",
              right: "10px",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--howk-black)",
              backgroundColor: "var(--howk-gold)",
              padding: "4px 10px",
              borderRadius: "2px",
            }}
          >
            تخفيض
          </span>
        )}

        {!product.inStock && (
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

      {/* الاسم */}
      <h3
        style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--howk-ivory)",
          lineHeight: 1.5,
          minHeight: "42px",
          marginBottom: "6px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {product.name}
      </h3>

      {/* عينات النقشة */}
      {product.patternColors && (
        <div className="flex gap-2 mb-3" aria-hidden="true" style={{ pointerEvents: "none" }}>
          {product.patternColors.map((color, i) => (
            <span
              key={i}
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: color,
                border: "1px solid var(--howk-border)",
              }}
            />
          ))}
        </div>
      )}

      {/* السعر */}
      <div className="flex items-baseline gap-2">
        {product.salePrice ? (
          <>
            <span
              style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--howk-gold)",
              }}
            >
              {formatSAR(product.salePrice)}
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                fontSize: "13px",
                color: "var(--howk-muted)",
                textDecoration: "line-through",
              }}
            >
              {formatSAR(product.price)}
            </span>
          </>
        ) : (
          <span
            style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--howk-gold)",
            }}
          >
            {formatSAR(product.price)}
          </span>
        )}
      </div>
    </Link>
  );
}