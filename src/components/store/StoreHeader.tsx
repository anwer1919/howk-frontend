"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Search, Heart, ShoppingBag } from "lucide-react";
import { STORE_CATEGORIES } from "@/lib/store-data";
import { t, getCurrentLocale, type Locale } from "@/lib/translations";

const CATEGORY_NAMES: Record<string, { ar: string; en: string }> = {
  hala: { ar: "مجموعة هَالَة", en: "HALA Collection" },
  "cashmere-jackets": { ar: "جاكيتات صوف كشميرية", en: "Cashmere Jackets" },
  sale: { ar: "تخفيضات", en: "Sale" },
  "cashmere-coats": {
    ar: "معاطف كشميرية فاخرة ذات حياكة يدوية",
    en: "Hand-Knitted Luxury Cashmere Coats",
  },
  "cashmere-shawls": { ar: "شالات كشميرية فاخرة", en: "Luxury Cashmere Shawls" },
  "pashmina-shawls": { ar: "شالات بشمينا فاخرة", en: "Luxury Pashmina Shawls" },
  "shahtoosh-shawl": { ar: "شال شاتوش نقي 100%", en: "100% Pure Shahtoosh Shawl" },
  poncho: { ar: "بونشو", en: "Poncho" },
};

export default function StoreHeader() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ دائماً "ar" في البداية (مطابق للسيرفر)
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // بعد التحميل فقط: اقرأ من localStorage
    const saved = getCurrentLocale();
    setLocaleState(saved);
    document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = saved;
    setMounted(true);
  }, []);

  const isRTL = locale === "ar";

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{
          backgroundColor: "var(--howk-black)",
          borderBottom: "1px solid var(--howk-border)",
        }}
      >
        {/* شريط الثقة */}
        <div
          className="w-full flex items-center justify-center"
          style={{
            height: "32px",
            borderBottom: "1px solid var(--howk-border)",
          }}
        >
          <p
            className="text-[11px] tracking-wide px-4 text-center"
            style={{ color: "var(--howk-gold)", opacity: 0.85 }}
          >
            {t("trustBar", locale)}
          </p>
        </div>

        {/* الهيدر الرئيسي */}
        <div
          className="relative flex items-center justify-between"
          style={{
            height: "clamp(120px, 16vw, 150px)",
            paddingLeft: "clamp(12px, 2vw, 24px)",
            paddingRight: "clamp(12px, 2vw, 24px)",
          }}
        >
          {/* يمين: القائمة + البحث */}
          <div className="flex items-center gap-2">
            <button
              className="p-2"
              onClick={() => setSidebarOpen(true)}
              aria-label={t("menu", locale)}
              style={{ color: "var(--howk-ivory)" }}
            >
              <Menu size={22} />
            </button>
            <button
              className="p-2"
              aria-label={t("search", locale)}
              style={{ color: "var(--howk-ivory)" }}
            >
              <Search size={20} />
            </button>
          </div>

          {/* المنتصف: اللوجو + دار حوك */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
            aria-label={isRTL ? "دار حوك" : "HOWK"}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/howk-logo.png"
              alt={isRTL ? "دار حوك" : "HOWK"}
              style={{
                height: "clamp(80px, 11vw, 100px)",
                width: "auto",
                display: "block",
                objectFit: "contain",
              }}
            />
            <span
              style={{
                fontFamily: "'Noto Naskh Arabic', serif",
                fontSize: "clamp(16px, 2.2vw, 22px)",
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "var(--howk-ivory)",
                lineHeight: 1,
              }}
            >
              {isRTL ? "دار حوك" : "HOWK"}
            </span>
          </Link>

          {/* يسار: المفضلة + السلة */}
          <div className="flex items-center gap-1">
            <Link
              href="/wishlist"
              className="p-2"
              aria-label={t("wishlist", locale)}
              style={{ color: "var(--howk-ivory)" }}
            >
              <Heart size={20} />
            </Link>
            <Link
              href="/cart"
              className="p-2"
              aria-label={t("cart", locale)}
              style={{ color: "var(--howk-ivory)" }}
            >
              <ShoppingBag size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* الخلفية المعتمة */}
      {sidebarOpen && (
        <div
          className="fixed inset-0"
          style={{
            backgroundColor: "rgba(5, 5, 5, 0.7)",
            zIndex: 60,
            backdropFilter: "blur(2px)",
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* القائمة الجانبية */}
      <aside
        className="fixed top-0 h-full overflow-y-auto"
        style={{
          width: "300px",
          maxWidth: "85vw",
          backgroundColor: "var(--howk-surface)",
          zIndex: 70,
          right: isRTL ? 0 : "auto",
          left: isRTL ? "auto" : 0,
          borderLeft: isRTL ? "1px solid var(--howk-border)" : "none",
          borderRight: isRTL ? "none" : "1px solid var(--howk-border)",
          transform: sidebarOpen
            ? "translateX(0)"
            : isRTL
            ? "translateX(100%)"
            : "translateX(-100%)",
          transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* رأس القائمة */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: "12px 20px",
            borderBottom: "1px solid var(--howk-border)",
            backgroundColor: "var(--howk-black)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/howk-logo.png"
            alt={isRTL ? "دار حوك" : "HOWK"}
            style={{ height: "44px", width: "auto", display: "block" }}
          />
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label={isRTL ? "إغلاق" : "Close"}
            style={{ color: "var(--howk-ivory)", cursor: "pointer" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* التصنيفات */}
        <nav>
          {STORE_CATEGORIES.map((cat) => {
            const isActive = pathname === `/shop/${cat.slug}`;
            const names = CATEGORY_NAMES[cat.slug] || { ar: cat.name, en: cat.name };
            const displayName = isRTL ? names.ar : names.en;

            return (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}`}
                onClick={() => setSidebarOpen(false)}
                className="block"
                style={{
                  fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 400,
                  color:
                    cat.slug === "sale"
                      ? "var(--howk-gold-hi)"
                      : isActive
                      ? "var(--howk-gold)"
                      : "var(--howk-ivory)",
                  padding: "14px 20px",
                  borderBottom: "1px solid var(--howk-border)",
                  textDecoration: "none",
                  backgroundColor: isActive
                    ? "rgba(201, 160, 82, 0.08)"
                    : "transparent",
                  transition: "background-color 200ms ease",
                }}
              >
                {displayName}
              </Link>
            );
          })}
        </nav>

        {/* شريط الثقة */}
        <div style={{ padding: "20px" }}>
          <p
            style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: "11px",
              color: "var(--howk-muted)",
              textAlign: "center",
            }}
          >
            {t("trustBar", locale)}
          </p>
        </div>
      </aside>
    </>
  );
}