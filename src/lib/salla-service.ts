// ============================================================
// خدمة سلة - جهة الخادم فقط (Server-side)
// مصدر الحقيقة الوحيد للأسعار والمخزون والصور
// ============================================================

import { HALA_PRODUCTS } from "./hala-data";

export interface HalaLiveProduct {
  internalId: string;
  price: number;
  formattedPrice: string;
  imageUrl?: string;
  productUrl?: string;
  inStock: boolean;
}

// جلب منتجات سلة الخام (إن توفر توكن)
async function fetchSallaProducts(): Promise<any[] | null> {
  const token = process.env.SALLA_API_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch(
      "https://api.salla.dev/admin/v2/products?limit=100",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        next: { revalidate: 300 }, // كاش 5 دقائق
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

// تجهيز بيانات هَالَة النهائية للواجهة
export async function getHalaLiveProducts(): Promise<HalaLiveProduct[]> {
  const sallaItems = await fetchSallaProducts();

  return HALA_PRODUCTS.map((p) => {
    // مطابقة المنتج عبر SKU الداخلي (JKH01-JKH06)
    const match = sallaItems?.find(
      (s: any) => (s.sku || "").toUpperCase() === p.internalId
    );

    // السعر: من سلة إن وجدت، وإلا القيمة الاحتياطية
    const price = match
      ? Number(match.sale_price ?? match.price ?? 990)
      : 990;

    return {
      internalId: p.internalId,
      price,
      formattedPrice: `${price.toFixed(2)} ر.س`,
      imageUrl: match?.images?.[0]?.url ?? undefined,
      productUrl:
        match?.url ?? `/product/hala-${p.internalId.toLowerCase()}`,
      inStock: match ? Number(match.quantity ?? 1) > 0 : true,
    };
  });
}