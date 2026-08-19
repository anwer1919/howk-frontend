export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeConfig = {
  ar: {
    name: "العربية",
    dir: "rtl" as const,
    flag: "🇸🇦",
  },
  en: {
    name: "English",
    dir: "ltr" as const,
    flag: "🇺🇸",
  },
};