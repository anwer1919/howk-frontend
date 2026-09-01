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

// شكل الاستجابة الفعلي من سلة (Admin API v2) — الأسعار كلها objects لا أرقام
interface SallaMoney {
  amount: number;
  currency?: string;
}

interface SallaRawProduct {
  sku?: string;
  price?: SallaMoney;
  sale_price?: SallaMoney;
  regular_price?: SallaMoney;
  quantity?: number | string;
  url?: string;
  main_image?: string;
  images?: { url: string; main?: boolean }[];
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

      if (!res.ok) {
        // مهم: نطبع سبب الفشل في لوج فيرسل عشان نقدر نشخص (401 = توكن غلط/منتهي، 403 = صلاحية ناقصة)
        console.error(`[salla-service] fetch failed: ${res.status} ${res.statusText}`);
        break;
      }

      const json = await res.json();
      const items: SallaRawProduct[] = json?.data ?? [];
      all.push(...items);

      const hasMore = json?.pagination?.currentPage < json?.pagination?.totalPages;
      if (!hasMore) break;
      page += 1;
    }

    return all.length ? all : null;
  } catch (err) {
    console.error("[salla-service] fetch error:", err);
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

// استخراج الصورة: main_image أولاً (أبسط)، وإلا أول عنصر في images[]
function extractImage(match: SallaRawProduct): string | undefined {
  if (match.main_image) return match.main_image;
  const mainFromArray = match.images?.find((img) => img.main)?.url;
  return mainFromArray ?? match.images?.[0]?.url;
}

// استخراج السعر الفعلي: sale_price لو موجود وقيمته > 0 وأقل من السعر الأساسي، وإلا price
function extractPrice(match: SallaRawProduct, fallback: number): number {
  const base = match.price?.amount;
  const sale = match.sale_price?.amount;
  if (sale && sale > 0 && (base === undefined || sale < base)) return sale;
  if (base !== undefined) return base;
  return fallback;
}

export async function getHalaLiveProducts(): Promise<HalaLiveProduct[]> {
  const skuMap = await getSkuMap();

  return HALA_PRODUCTS.map((p) => {
    const match = skuMap?.get(p.internalId.toUpperCase());
    const price = match ? extractPrice(match, 990) : 990;

    return {
      internalId: p.internalId,
      price,
      formattedPrice: `${price.toFixed(2)} ر.س`,
      imageUrl: match ? extractImage(match) : undefined,
      productUrl: match?.url ?? `/product/hala-${p.internalId.toLowerCase()}`,
      inStock: match ? Number(match.quantity ?? 1) > 0 : true,
    };
  });
}

export async function getLiveStoreProducts(): Promise<StoreProduct[]> {
  const skuMap = await getSkuMap();
  if (!skuMap) return STORE_PRODUCTS; // fallback: البيانات الثابتة كما هي

  return STORE_PRODUCTS.map((p) => {
    const match = skuMap.get(p.sku.toUpperCase());
    if (!match) return p;

    const price = extractPrice(match, p.price);
    const saleAmount = match.sale_price?.amount;
    const salePrice = saleAmount && saleAmount > 0 && saleAmount < price ? saleAmount : undefined;

    return {
      ...p,
      price,
      salePrice,
      image: extractImage(match) ?? p.image,
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
