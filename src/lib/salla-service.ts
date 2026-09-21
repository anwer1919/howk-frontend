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
  id?: number;
  sku?: string;
  name?: string;
  price?: any;
  sale_price?: any;
  quantity?: any;
  url?: string;
  images?: { url: string }[];
  categories?: { name?: string; slug?: string }[];
}

function num(v: any): number | undefined {
  if (v === null || v === undefined) return undefined;
  if (typeof v === "number") return v;
  if (typeof v === "object") {
    const n = Number(v.amount ?? v.value ?? v.price);
    return isNaN(n) ? undefined : n;
  }
  const n = Number(v);
  return isNaN(n) ? undefined : n;
}

async function fetchSallaProducts(): Promise<SallaRawProduct[] | null> {
  const token = process.env.SALLA_API_TOKEN;
  if (!token) return null;
  try {
    const all: SallaRawProduct[] = [];
    let page = 1;
    while (page <= 5) {
      const res = await fetch(
        `https://api.salla.dev/admin/v2/products?per_page=100&page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
          cache: "no-store",
        }
      );
      if (!res.ok) break;
      const json = await res.json();
      const items: SallaRawProduct[] = json?.data ?? [];
      all.push(...items);
      if (!(json?.pagination?.currentPage < json?.pagination?.totalPages)) break;
      page += 1;
    }
    return all.length ? all : null;
  } catch {
    return null;
  }
}

function toStoreProduct(it: SallaRawProduct, i: number): StoreProduct {
  const price = num(it.price) ?? 0;
  const sale = num(it.sale_price);
  const q = num(it.quantity);
  const cat = it.categories && it.categories.length ? it.categories[0] : undefined;
  return {
    slug: "salla-" + String(it.id ?? i),
    sku: it.sku || "SALLA-" + String(it.id ?? i),
    name: it.name || "Product " + (i + 1),
    category: (cat && (cat.slug || cat.name)) || "all",
    price,
    salePrice: sale !== undefined && sale < price ? sale : undefined,
    image: it.images && it.images.length ? it.images[0].url : undefined,
    inStock: q !== undefined ? q > 0 : true,
  } as StoreProduct;
}

export async function getLiveStoreProducts(): Promise<StoreProduct[]> {
  const items = await fetchSallaProducts();
  if (!items) return STORE_PRODUCTS;
  return items.map(toStoreProduct);
}

export async function getLiveStoreProductBySlug(slug: string): Promise<StoreProduct | undefined> {
  const products = await getLiveStoreProducts();
  const found = products.find((p) => p.slug === slug);
  if (found) return found;
  return STORE_PRODUCTS.find((p) => p.slug === slug);
}

export async function getLiveStoreProductsByCategory(categorySlug: string): Promise<StoreProduct[]> {
  const products = await getLiveStoreProducts();
  if (categorySlug === "sale") return products.filter((p) => p.salePrice !== undefined);
  const byCat = products.filter(
    (p) => String(p.category).toLowerCase() === categorySlug.toLowerCase()
  );
  return byCat.length ? byCat : products;
}

export async function getHalaLiveProducts(): Promise<HalaLiveProduct[]> {
  const items = await fetchSallaProducts();
  if (!items) {
    return HALA_PRODUCTS.map((p) => ({
      internalId: p.internalId,
      price: 990,
      formattedPrice: "990.00 \u0631.\u0633",
      imageUrl: undefined,
      productUrl: `/product/hala-${p.internalId.toLowerCase()}`,
      inStock: true,
    }));
  }
  const live = items.map(toStoreProduct);
  return live.slice(0, HALA_PRODUCTS.length).map((p) => ({
    internalId: p.sku,
    price: p.salePrice ?? p.price,
    formattedPrice: `${(p.salePrice ?? p.price).toFixed(2)} \u0631.\u0633`,
    imageUrl: p.image,
    productUrl: `/product/${p.slug}`,
    inStock: p.inStock,
  }));
}