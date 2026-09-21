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
  name?: string;
}

async function fetchSallaProducts(): Promise<SallaRawProduct[] | null> {
  const token = process.env.SALLA_API_TOKEN;
  
  if (!token) {
    console.log("[SALLA] ? No SALLA_API_TOKEN in env");
    return null;
  }

  console.log("[SALLA] ?? Fetching products from Salla API...");
  console.log("[SALLA] Token prefix:", token.substring(0, 20) + "...");

  try {
    const all: SallaRawProduct[] = [];
    let page = 1;
    const perPage = 100;

    while (page <= 5) {
      const url = `https://api.salla.dev/admin/v2/products?per_page=${perPage}&page=${page}`;
      console.log(`[SALLA] ?? GET ${url}`);
      
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        cache: "no-store", // ?? ??? ???? - ???? ?????
        next: { revalidate: 0 },
      });

      console.log(`[SALLA] ?? Response status: ${res.status}`);

      if (!res.ok) {
        const errorText = await res.text();
        console.log(`[SALLA] ? Error ${res.status}: ${errorText.substring(0, 200)}`);
        break;
      }

      const json = await res.json();
      console.log(`[SALLA] ?? Page ${page}:`, json?.pagination?.total || 0, "total products");
      
      const items: SallaRawProduct[] = json?.data ?? [];
      all.push(...items);

      const hasMore = json?.pagination?.currentPage < json?.pagination?.totalPages;
      if (!hasMore) break;
      page += 1;
    }

    console.log(`[SALLA] ? Total fetched: ${all.length} products`);
    
    if (all.length > 0) {
      console.log("[SALLA] ?? First 3 SKUs:", all.slice(0, 3).map(p => p.sku).join(", "));
    }

    return all.length ? all : null;
  } catch (err: any) {
    console.log("[SALLA] ? Exception:", err.message);
    return null;
  }
}

async function getSkuMap(): Promise<Map<string, SallaRawProduct> | null> {
  const items = await fetchSallaProducts();
  if (!items) {
    console.log("[SALLA] ??  Using fallback static data");
    return null;
  }

  const map = new Map<string, SallaRawProduct>();
  for (const item of items) {
    if (item.sku) map.set(item.sku.toUpperCase(), item);
  }
  
  console.log(`[SALLA] ???  SKU map built: ${map.size} entries`);
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
      formattedPrice: `${price.toFixed(2)} ?.?`,
      imageUrl: match?.images?.[0]?.url ?? undefined,
      productUrl: match?.url ?? `/product/hala-${p.internalId.toLowerCase()}`,
      inStock: match ? Number(match.quantity ?? 1) > 0 : true,
    };
  });
}

export async function getLiveStoreProducts(): Promise<StoreProduct[]> {
  const skuMap = await getSkuMap();
  if (!skuMap) {
    console.log("[SALLA] ?? Returning static STORE_PRODUCTS");
    return STORE_PRODUCTS;
  }

  const result = STORE_PRODUCTS.map((p) => {
    const match = skuMap.get(p.sku.toUpperCase());
    if (!match) return p;

    const price = Number(match.price ?? p.price);
    const salePrice =
      match.sale_price && match.sale_price < price ? Number(match.sale_price) : undefined;

    console.log(`[SALLA] ? Matched ${p.sku}: ${match.name}, price=${price}`);

    return {
      ...p,
      price,
      salePrice,
      image: match.images?.[0]?.url ?? p.image,
      inStock: match.quantity !== undefined ? Number(match.quantity) > 0 : p.inStock,
    };
  });

  return result;
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