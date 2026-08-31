export async function getLiveStoreProductsByCategory(categorySlug: string): Promise<StoreProduct[]> {
  const products = await getLiveStoreProducts();
  if (categorySlug === "sale") {
    return products.filter((p) => p.salePrice !== undefined);
  }
  return products.filter((p) => p.category === categorySlug);
}