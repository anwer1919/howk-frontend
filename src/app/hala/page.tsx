import type { Metadata } from "next";
import HalaTrustBar from "@/components/hala/HalaTrustBar";
import HalaHeader from "@/components/hala/HalaHeader";
import HalaHero from "@/components/hala/HalaHero";
import HalaGrid from "@/components/hala/HalaGrid";
import HalaHelp from "@/components/hala/HalaHelp";
import HalaFooter from "@/components/hala/HalaFooter";
import { getHalaLiveProducts } from "@/lib/salla-service";

export const metadata: Metadata = {
  title: "مجموعة هالة من دار حوك | جاكيتات نسائية",
  description:
    "اكتشفي مجموعة هَالَة من دار حوك - ستة ألوان من الجاكيتات الطويلة الفاخرة. حضوركِ يبدأ قبل وصولكِ.",
  openGraph: {
    title: "مجموعة هالة من دار حوك",
    description: "ستة ألوان… وهالة واحدة تخصكِ",
    type: "website",
    locale: "ar_SA",
  },
};

export default async function HalaPage() {
  // الأسعار والمخزون والصور: ديناميكياً من سلة (جهة الخادم)
  const liveProducts = await getHalaLiveProducts();

  const sallaProductsData = liveProducts.map((p) => ({
    internalId: p.internalId,
    price: p.formattedPrice,
    imageUrl: p.imageUrl,
    productUrl: p.productUrl,
    inStock: p.inStock,
  }));

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--howk-black)" }}
      dir="rtl"
    >
      {/* 1. شريط الثقة */}
      <HalaTrustBar />

      {/* 2. الهيدر */}
      <HalaHeader />

      {/* 3. مقدمة هَالَة */}
      <HalaHero />

      {/* 4. شبكة المنتجات الستة */}
      <HalaGrid productsData={sallaProductsData} />

      {/* 5. صندوق المساعدة - قبل الفوتر حسب المرجع */}
      <HalaHelp />

      {/* 6. الفوتر + حقوق النشر */}
      <HalaFooter />
    </div>
  );
}