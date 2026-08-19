// نظام الترجمة الكامل - عربي/إنجليزي

export type Locale = "ar" | "en";

export const translations = {
  ar: {
    // Trust Bar
    trustBar: "شحن لجميع مناطق المملكة • تغليف فاخر • ضمان ممتد",
    
    // Brand
    brandName: "دار حوك",
    howk: "HOWK",
    
    // Hero
    introLine: "تُقدّم مجموعة",
    h1: "هَالَة",
    englishLine: "THE HALA COLLECTION",
    emotionalLine: "حضوركِ يبدأ قبل وصولكِ",
    colorsLine: "ستة ألوان… وهالة واحدة تخصكِ",
    
    // Cards
    collectionLine: "من مجموعة هَالَة",
    ctaButton: "اكتشفي القطعة",
    outOfStock: "نفد مؤقتًا",
    
    // Help Section
    helpTitle: "أيُّ هالة تشبهكِ؟",
    helpText: "يساعدكِ فريق حوك في اختيار اللون الأقرب لحضوركِ.",
    whatsappButton: "تحدثي مع فريق حوك",
    whatsappMessage: "مرحبًا، أعجبتني مجموعة هَالَة وأحتاج مساعدة فريق حوك في اختيار اللون الأنسب لي.",
    
    // Footer
    shipping: "الشحن والاستبدال",
    warranty: "الضمان",
    about: "عن حوك",
    copyright: "جميع الحقوق محفوظة لدار حوك",
    
    // Header
    search: "بحث",
    wishlist: "المفضلة",
    cart: "السلة",
    menu: "القائمة",
    allProducts: "جميع المنتجات",
    products: "قطعة",
    
    // Categories
    hala: "مجموعة هَالَة",
    cashmereJackets: "جاكيتات صوف كشميرية",
    sale: "تخفيضات",
    cashmereCoats: "معاطف كشميرية فاخرة ذات حياكة يدوية",
    cashmereShawls: "شالات صوف كشميرية فاخرة",
    pashminaShawls: "شالات بشمينا فاخرة",
    shahtoosh: "شال شاتوش نقي 100%",
    poncho: "بونشو",
    
    // Products
    greenSandy: "جاكيت طويل - أخضر رملي",
    purpleAmber: "جاكيت طويل - أرجواني عنبري",
    grayPearl: "جاكيت طويل - رمادي لؤلؤي",
    pinkRose: "جاكيت طويل - وردي جوري",
    orangeAmber: "جاكيت طويل - برتقالي كهرماني",
    blueNile: "جاكيت طويل - أزرق نيلي",
    
    // General
    relatedProducts: "قد يعجبكِ أيضًا",
    continueShopping: "أكملي الطلب عبر المتجر الرسمي",
    luxuryDescription: "قطعة فاخرة من دار حوك، صُنعت بعناية فائقة لتجمع بين الأناقة والدفء.",
  },
  
  en: {
    // Trust Bar
    trustBar: "Nationwide Shipping • Luxury Packaging • Extended Warranty",
    
    // Brand
    brandName: "HOWK",
    howk: "دار حوك",
    
    // Hero
    introLine: "Introducing",
    h1: "HALA",
    englishLine: "THE HALA COLLECTION",
    emotionalLine: "Your presence begins before you arrive",
    colorsLine: "Six colors… one aura that's uniquely yours",
    
    // Cards
    collectionLine: "From the HALA Collection",
    ctaButton: "Discover the Piece",
    outOfStock: "Temporarily Out of Stock",
    
    // Help Section
    helpTitle: "Which aura reflects you?",
    helpText: "The HOWK team will help you choose the color closest to your presence.",
    whatsappButton: "Chat with HOWK Team",
    whatsappMessage: "Hello, I love the HALA collection and need help from the HOWK team choosing the most suitable color for me.",
    
    // Footer
    shipping: "Shipping & Returns",
    warranty: "Warranty",
    about: "About HOWK",
    copyright: "All rights reserved to HOWK",
    
    // Header
    search: "Search",
    wishlist: "Wishlist",
    cart: "Cart",
    menu: "Menu",
    allProducts: "All Products",
    products: "items",
    
    // Categories
    hala: "HALA Collection",
    cashmereJackets: "Cashmere Jackets",
    sale: "Sale",
    cashmereCoats: "Hand-Knitted Luxury Cashmere Coats",
    cashmereShawls: "Luxury Cashmere Shawls",
    pashminaShawls: "Luxury Pashmina Shawls",
    shahtoosh: "100% Pure Shahtoosh Shawl",
    poncho: "Poncho",
    
    // Products
    greenSandy: "Long Jacket - Sandy Green",
    purpleAmber: "Long Jacket - Amber Purple",
    grayPearl: "Long Jacket - Pearl Gray",
    pinkRose: "Long Jacket - Rose Pink",
    orangeAmber: "Long Jacket - Amber Orange",
    blueNile: "Long Jacket - Nile Blue",
    
    // General
    relatedProducts: "You May Also Like",
    continueShopping: "Complete your order via the official store",
    luxuryDescription: "A luxurious piece from HOWK, meticulously crafted to combine elegance and warmth.",
  },
} as const;

// دالة للحصول على الترجمة
export function t(key: keyof typeof translations.ar, locale: Locale = "ar"): string {
  return translations[locale][key] || key;
}

// دالة للحصول على اللغة الحالية
export function getCurrentLocale(): Locale {
  if (typeof window === "undefined") return "ar";
  return (localStorage.getItem("locale") as Locale) || "ar";
}

// دالة لتغيير اللغة
export function setLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("locale", locale);
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = locale;
  // إعادة تحميل الصفحة لتطبيق الترجمات على كل المكونات
  window.location.reload();
}