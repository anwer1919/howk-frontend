"use client";

import { useEffect } from "react";
import { HALA_PRODUCTS, type HalaProduct } from "@/lib/hala-data";
import HalaCard from "./HalaCard";

interface HalaGridProps {
  productsData?: Array<{
    internalId: string;
    price?: string;
    imageUrl?: string;
    productUrl?: string;
    inStock?: boolean;
  }>;
}

export default function HalaGrid({ productsData }: HalaGridProps) {
  const productsWithSalla = HALA_PRODUCTS.map((p) => {
    const salla = productsData?.find((s) => s.internalId === p.internalId);
    return { ...p, ...salla };
  });

  // GA4: view_item_list
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "view_item_list", {
        item_list_id: "hala_collection",
        item_list_name: "HALA",
        items: productsWithSalla.map((p, i) => ({
          item_id: p.internalId,
          item_name: p.name,
          price: parseFloat((p.price || "0").replace(/[^\d.]/g, "")) || 0,
          index: i + 1,
        })),
      });
    }
  }, []);

  return (
    <section
      itemScope
      itemType="https://schema.org/ItemList"
      style={{
        paddingTop: "clamp(32px, 4vw, 48px)",
        paddingBottom: "clamp(32px, 4vw, 48px)",
        paddingLeft: "clamp(12px, 2vw, 16px)",
        paddingRight: "clamp(12px, 2vw, 16px)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1180px" }}>
        {/* 2 عمود موبايل / 3 عمود Desktop */}
        <div
          className="grid grid-cols-2 md:grid-cols-3"
          style={{ gap: "clamp(16px, 2vw, 24px)" }}
        >
          {productsWithSalla.map((product, index) => (
            <div
              key={product.internalId}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={`${index + 1}`} />
              <HalaCard
                product={product}
                index={index}
                price={product.price}
                imageUrl={product.imageUrl}
                productUrl={product.productUrl}
                inStock={product.inStock}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}