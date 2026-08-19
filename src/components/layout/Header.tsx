"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Search, Heart, ShoppingBag, User, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const { t, locale, setLocale, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: t("common.home") },
    { href: "/shop", label: t("common.shop") },
    { href: "/about", label: t("common.about") },
    { href: "/contact", label: t("common.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 text-center text-xs tracking-widest">
        {t("hero.subtitle")}
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
              HOWK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text-muted hover:text-text transition-colors duration-300 tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              className="flex items-center gap-1 p-2 text-sm hover:text-secondary transition-colors"
              aria-label="Switch language"
            >
              <Globe size={18} />
              <span className="hidden sm:inline">{locale === "ar" ? "EN" : "عربي"}</span>
            </button>

            <Link href="/search" className="p-2 hover:text-secondary transition-colors" aria-label={t("common.search")}>
              <Search size={20} />
            </Link>

            <Link href="/wishlist" className="p-2 hover:text-secondary transition-colors hidden sm:block" aria-label={t("common.wishlist")}>
              <Heart size={20} />
            </Link>

            <Link href="/account" className="p-2 hover:text-secondary transition-colors hidden sm:block" aria-label={t("common.account")}>
              <User size={20} />
            </Link>

            <Link href="/cart" className="p-2 hover:text-secondary transition-colors relative" aria-label={t("common.cart")}>
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden border-t border-border transition-all duration-300",
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <nav className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-sm font-medium text-text-muted hover:text-text transition-colors border-b border-border-subtle last:border-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}