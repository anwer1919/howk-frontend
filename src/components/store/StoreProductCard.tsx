import Link from "next/link";
import { formatSAR } from "@/lib/store-data";
import type { StoreProduct } from "@/lib/store-data";

interface Props {
  product: StoreProduct;
}

export default function StoreProductCard({ product }: Props) {
  return (
    <Link href={"/product/" + product.slug} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div
        style={{
          backgroundColor: "var(--howk-surface)",
          border: "1px solid var(--howk-border)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5", backgroundColor: "var(--howk-espresso)" }}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "12px", letterSpacing: "0.15em", color: "var(--howk-muted)" }}>
                {product.sku}
              </span>
            </div>
          )}
          {product.salePrice !== undefined && product.salePrice < product.price && (
            <div
              className="absolute top-3 right-3"
              style={{
                backgroundColor: "var(--howk-gold)",
                color: "var(--howk-black)",
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: "2px",
              }}
            >
              {"\u062E\u0635\u0645"}
            </div>
          )}
        </div>
        <div style={{ padding: "16px" }}>
          <h3
            style={{
              fontFamily: "'Noto Naskh Arabic', serif",
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--howk-ivory)",
              marginBottom: "8px",
              lineHeight: 1.5,
            }}
          >
            {product.name}
          </h3>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "16px", fontWeight: 600, color: "var(--howk-gold)" }}>
              {formatSAR(product.salePrice ?? product.price)}
            </span>
            {product.salePrice !== undefined && product.salePrice < product.price && (
              <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "13px", color: "var(--howk-muted)", textDecoration: "line-through" }}>
                {formatSAR(product.price)}
              </span>
            )}
          </div>
          {!product.inStock && (
            <p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: "12px", color: "#ef4444", marginTop: "8px" }}>
              {"\u0646\u0641\u0630\u062A \u0627\u0644\u0643\u0645\u064A\u0629"}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}