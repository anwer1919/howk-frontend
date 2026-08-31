// ============================================================
// خدمة سلة - جهة الخادم فقط (Server-side)
// مصدر الحقيقة الوحيد للأسعار والمخزون والصور
// تُستخدم لكل الكتالوج (هَالَة + بقية المنتجات) عبر مطابقة SKU
// ============================================================

import { HALA_PRODUCTS } from "./hala-data";
import { STORE_PRODUCTS, type StoreProduct } from "./store-data";

export interface HalaLiveProduct {
  internalId: string;
  price: number;
  formattedPrice: string;
  imageUrl?: string;
  productUrl?: string;
  inStock: boolean;
}

interface SallaRawProduct {
  sku?: string;
  price?: number;
  sale_price?: number;
  quantity?: number;
  url?: string;
  images?: { url: string }[];
}

// جلب كل منتجات سلة الخام مرة واحدة (إن توفر توكن)، بكاش 5 دقائق
async function fetchSallaProducts(): Promise<SallaRawProduct[] | null> {
  const token = process.env.SALLA_API_TOKEN;
  if (!token) return null;

  try {
    const all: SallaRawProduct[] = [];
    let page = 1;
    const perPage = 100;

    while (page <= 5) {
      const res = await fetch(
        `https://api.salla.dev/admin/v2/products?per_page=${perPage}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          next: { revalidate: 300 },
        }
      );
      if (!res.ok) break;
      const json = await res.json();
      const items: SallaRawProduct[] = json?.data ?? [];
      all.push(...items);

      const hasMore = json?.pagination?.currentPage < json?.pagination?.totalPages;
      if (!hasMore) break;
      page += 1;
    }

    return all.length ? all : null;
  } catch {
    return null;
  }
}

async function getSkuMap(): Promise<Map<string, SallaRawProduct> | null> {
  const items = await fetchSallaProducts();
  if (!items) return null;

  const map = new Map<string, SallaRawProduct>();
  for (const item of items) {
    if (item.sku) map.set(item.sku.toUpperCase(), item);
  }
  return map;
}

export async function getHalaLiveProducts(): Promise<HalaLiveProduct[]> {
  const skuMap = await getSkuMap();

  return HALA_PRODUCTS.map((p) => {
    const match = skuMap?.get(p.internalId.toUpperCase());
    const price = match ? Number(match.sale_price ?? match.price ?? 990) : 990;

    return {
      internalId: p.internalId,
      price,
      formattedPrice: `${price.toFixed(2)} ر.س`,
      imageUrl: match?.images?.[0]?.url ?? undefined,
      productUrl: match?.url ?? `/product/hala-${p.internalId.toLowerCase()}`,
      inStock: match ? Number(match.quantity ?? 1) > 0 : true,
    };
  });
}

export async function getLiveStoreProducts(): Promise<StoreProduct[]> {
  const skuMap = await getSkuMap();
  if (!skuMap) return STORE_PRODUCTS;

  return STORE_PRODUCTS.map((p) => {
    const match = skuMap.get(p.sku.toUpperCase());
    if (!match) return p;

    const price = Number(match.price ?? p.price);
    const salePrice =
      match.sale_price && match.sale_price < price ? Number(match.sale_price) : undefined;

    return {
      ...p,
      price,
      salePrice,
      image: match.images?.[0]?.url ?? p.image,
      inStock: match.quantity !== undefined ? Number(match.quantity) > 0 : p.inStock,
    };
  });
}

export async function getLiveStoreProductBySlug(slug: string): Promise<StoreProduct | undefined> {
  const products = await getLiveStoreProducts();
  return products.find((p) => p.slug === slug);
}

export async function getLiveStoreProductsByCategory(categorySlug: string): Promise<StoreProduct[]> {
  const products = await getLiveStoreProducts();
  if (categorySlug === "sale") {
    return products.filter((p) => p.salePrice !== undefined);
  }
  return products.filter((p) => p.category === categorySlug);
}