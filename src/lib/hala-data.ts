// HOWK HALA Collection - بيانات رسمية من الوثيقة التنفيذية
// السعر ديناميكي من سلة (ليس ثابتاً)

export interface HalaProduct {
  internalId: string; // JKH01-JKH06 (ربط داخلي فقط)
  name: string; // الاسم المعتمد حرفياً
  patternColors: [string, string, string]; // 3 عينات من النقشة
  row: number; // صف العرض (1-3)
  position: "right" | "left"; // RTL
}

// ترتيب العرض الرسمي RTL (يمين ثم يسار)
export const HALA_PRODUCTS: HalaProduct[] = [
  // الصف 1
  { internalId: "JKH01", name: "جاكيت طويل - أخضر رملي", patternColors: ["#B79B67", "#C88764", "#E5CFA6"], row: 1, position: "right" },
  { internalId: "JKH02", name: "جاكيت طويل - أرجواني عنبري", patternColors: ["#4B2757", "#C35F36", "#D8C29C"], row: 1, position: "left" },
  // الصف 2
  { internalId: "JKH03", name: "جاكيت طويل - رمادي لؤلؤي", patternColors: ["#C8C1C3", "#A99B9A", "#DCC7A3"], row: 2, position: "right" },
  { internalId: "JKH04", name: "جاكيت طويل - وردي جوري", patternColors: ["#C44E71", "#D17493", "#E2C89D"], row: 2, position: "left" },
  // الصف 3
  { internalId: "JKH05", name: "جاكيت طويل - برتقالي كهرماني", patternColors: ["#A95020", "#D7773C", "#E1B27A"], row: 3, position: "right" },
  { internalId: "JKH06", name: "جاكيت طويل - أزرق نيلي", patternColors: ["#4A405F", "#806282", "#D5B98A"], row: 3, position: "left" },
];

// النصوص الحرفية من الوثيقة
export const HALA_TEXTS = {
  trustBar: "شحن لجميع مناطق المملكة • تغليف فاخر • ضمان ممتد",
  brandName: "دار حوك",
  introLine: "تُقدّم مجموعة",
  h1: "هَالَة",
  englishLine: "THE HALA COLLECTION",
  emotionalLine: "حضوركِ يبدأ قبل وصولكِ",
  colorsLine: "ستة ألوان… وهالة واحدة تخصكِ",
  collectionLine: "من مجموعة هَالَة",
  ctaButton: "اكتشفي القطعة",
  helpTitle: "أيُّ هالة تشبهكِ؟",
  helpText: "يساعدكِ فريق حوك في اختيار اللون الأقرب لحضوركِ.",
  whatsappButton: "تحدثي مع فريق حوك",
  whatsappMessage: "مرحبًا، أعجبتني مجموعة هَالَة وأحتاج مساعدة فريق حوك في اختيار اللون الأنسب لي.",
  footerLinks: ["الشحن والاستبدال", "الضمان", "عن حوك"],
  copyright: "جميع الحقوق محفوظة لدار حوك",
} as const;