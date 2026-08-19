"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, defaultLocale, localeConfig } from "@/i18n/config";
import { useTranslation } from "@/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("howk-locale", newLocale);
  };

  useEffect(() => {
    const saved = localStorage.getItem("howk-locale") as Locale;
    if (saved && ["ar", "en"].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = localeConfig[locale].dir;
    document.documentElement.lang = locale;
  }, [locale]);

  const { t } = useTranslation(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, isRTL: locale === "ar", t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}