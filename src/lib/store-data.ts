// بيانات المتجر - المرحلة الحالية: بيانات ثابتة
// المرحلة التالية: ربط بـ Salla API لجلب البيانات ديناميكياً

export interface StoreCategory {
  slug: string;
  name: string;
  shortName: string;
  description: string;
}

export interface StoreProduct {
  slug: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  image?: string;
  inStock: boolean;
  isNew?: boolean;
  patternColors?: string[];
}

// ============================================================
// القائمة العلوية - التصنيفات الرسمية من سلة
// ============================================================
export const STORE_CATEGORIES: StoreCategory[] = [
  {
    slug: "hala",
    name: "مجموعة هَالَة",
    shortName: "هَالَة",
    description: "مجموعة هَالَة - ستة ألوان من الجاكيتات الطويلة الفاخرة",
  },
  {
    slug: "cashmere-jackets",
    name: "جاكيتات صوف كشميرية",
    shortName: "جاكيتات",
    description: "جاكيتات صوف كشميري بنقشات فاخرة",
  },
  {
    slug: "sale",
    name: "تخفيضات",
    shortName: "تخفيضات",
    description: "عروض حصرية لفترة محدودة",
  },
  {
    slug: "cashmere-coats",
    name: "معاطف كشميرية فاخرة ذات حياكة يدوية",
    shortName: "معاطف",
    description: "معاطف كشمير بحياكة يدوية متقنة",
  },
  {
    slug: "cashmere-shawls",
    name: "شالات صوف كشميرية فاخرة",
    shortName: "شالات كشمير",
    description: "شالات صوف كشميري فاخرة",
  },
  {
    slug: "pashmina-shawls",
    name: "شالات بشمينا فاخرة",
    shortName: "بشمينا",
    description: "شالات بشمينا ناعمة وفاخرة",
  },
  {
    slug: "shahtoosh-shawl",
    name: "شال شاتوش نقي 100%",
    shortName: "شاتوش",
    description: "شال شاتوش نقي بنسبة 100%",
  },
  {
    slug: "poncho",
    name: "بونشو",
    shortName: "بونشو",
    description: "بونشو أنيق لإطلالة دافئة",
  },
];

// ============================================================
// المنتجات
// ============================================================
export const STORE_PRODUCTS: StoreProduct[] = [
  // ===== مجموعة هَالَة (6 منتجات) - السعر 990 ر.س =====
  // NOTE: السعر ديناميكي من سلة في مرحلة الربط
  {
    slug: "hala-jkh01",
    sku: "JKH01",
    name: "جاكيت طويل - أخضر رملي",
    category: "hala",
    price: 990,
    inStock: true,
    patternColors: ["#B79B67", "#C88764", "#E5CFA6"],
  },
  {
    slug: "hala-jkh02",
    sku: "JKH02",
    name: "جاكيت طويل - أرجواني عنبري",
    category: "hala",
    price: 990,
    inStock: true,
    patternColors: ["#4B2757", "#C35F36", "#D8C29C"],
  },
  {
    slug: "hala-jkh03",
    sku: "JKH03",
    name: "جاكيت طويل - رمادي لؤلؤي",
    category: "hala",
    price: 990,
    inStock: true,
    patternColors: ["#C8C1C3", "#A99B9A", "#DCC7A3"],
  },
  {
    slug: "hala-jkh04",
    sku: "JKH04",
    name: "جاكيت طويل - وردي جوري",
    category: "hala",
    price: 990,
    inStock: true,
    patternColors: ["#C44E71", "#D17493", "#E2C89D"],
  },
  {
    slug: "hala-jkh05",
    sku: "JKH05",
    name: "جاكيت طويل - برتقالي كهرماني",
    category: "hala",
    price: 990,
    inStock: true,
    patternColors: ["#A95020", "#D7773C", "#E1B27A"],
  },
  {
    slug: "hala-jkh06",
    sku: "JKH06",
    name: "جاكيت طويل - أزرق نيلي",
    category: "hala",
    price: 990,
    inStock: true,
    patternColors: ["#4A405F", "#806282", "#D5B98A"],
  },

  // ===== جاكيتات صوف كشميرية =====
  {
    slug: "cashmere-jacket-blue-jkh06",
    sku: "JKH06-B",
    name: "جاكيت صوف كشميري أزرق بنقشة فاخرة",
    category: "cashmere-jackets",
    price: 1850.01,
    inStock: true,
  },
  {
    slug: "cashmere-jacket-orange-jkh05",
    sku: "JKH05-B",
    name: "جاكيت صوف كشميري برتقالي بنقشة فاخرة",
    category: "cashmere-jackets",
    price: 1850.01,
    inStock: true,
  },
  {
    slug: "cashmere-jacket-premium-jkh03",
    sku: "JKH03-B",
    name: "جاكيت صوف كشميري بنقشة فاخرة",
    category: "cashmere-jackets",
    price: 1850.01,
    inStock: true,
  },
  {
    slug: "cashmere-jacket-green-jkh01",
    sku: "JKH01-B",
    name: "جاكيت صوف كشميري أخضر فاتح بنقشة فاخرة",
    category: "cashmere-jackets",
    price: 1850.01,
    inStock: true,
  },

  // ===== معاطف كشميرية فاخرة =====
  {
    slug: "cashmere-coat-white-coho",
    sku: "COHO",
    name: "معطف كشميري فاخر أبيض ذو حياكة يدوية نقش لون برتقالي",
    category: "cashmere-coats",
    price: 4800.1,
    inStock: true,
  },
  {
    slug: "cashmere-coat-black-cohk",
    sku: "COHK",
    name: "معطف كشميري فاخر أسود ذو حياكة يدوية",
    category: "cashmere-coats",
    price: 4800.1,
    inStock: true,
  },
  {
    slug: "cashmere-coat-blue-cohc",
    sku: "COHC",
    name: "معطف كشميري فاخر أزرق ذو حياكة يدوية",
    category: "cashmere-coats",
    price: 4800.1,
    inStock: true,
  },

  // ===== شالات صوف كشميرية =====
  {
    slug: "cashmere-shawl-black",
    sku: "SHB01",
    name: "شال صوف كشميري فاخر لون أسود",
    category: "cashmere-shawls",
    price: 516.35,
    inStock: true,
  },
];

// ============================================================
// Helper Functions
// ============================================================

export function getProductsByCategory(slug: string): StoreProduct[] {
  if (slug === "sale") {
    return STORE_PRODUCTS.filter((p) => p.salePrice !== undefined);
  }
  return STORE_PRODUCTS.filter((p) => p.category === slug);
}

export function getProductBySlug(slug: string): StoreProduct | undefined {
  return STORE_PRODUCTS.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): StoreCategory | undefined {
  return STORE_CATEGORIES.find((c) => c.slug === slug);
}

export function formatSAR(price: number): string {
  return `${price.toFixed(2)} ر.س`;
}