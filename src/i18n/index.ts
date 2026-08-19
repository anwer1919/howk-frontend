import ar from "./ar";
import en from "./en";
import { Locale, defaultLocale } from "./config";

const translations = { ar, en } as const;

export function useTranslation(locale: Locale = defaultLocale) {
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t, locale, isRTL: locale === "ar" };
}

export type TranslationKeys = typeof ar;