"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

// SVG Icons مباشرة - لا تعتمد على lucide-react
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    shop: [
      { href: "/shop", label: t("common.shop") },
      { href: "/shop?category=jackets", label: "Jackets" },
      { href: "/shop?category=coats", label: "Coats" },
      { href: "/shop?category=shawls", label: "Shawls" },
    ],
    service: [
      { href: "/shipping", label: t("footer.shipping") },
      { href: "/returns", label: t("footer.returns") },
      { href: "/contact", label: t("common.contact") },
    ],
    legal: [
      { href: "/terms", label: t("footer.legal") },
      { href: "/privacy", label: t("footer.privacy") },
    ],
  };

  return (
    <footer className="bg-primary text-white mt-24">
      {/* Newsletter */}
      <div className="border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-display text-2xl mb-2">{t("footer.newsletter")}</h3>
          <p className="text-white/70 text-sm mb-6">{t("footer.newsletterDesc")}</p>
          <form className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent text-primary text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {t("footer.subscribe")}
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <span className="font-display text-2xl font-semibold">HOWK</span>
            <p className="text-white/60 text-sm mt-4 leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/60 hover:text-accent transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="text-white/60 hover:text-accent transition-colors" aria-label="X (Twitter)">
                <XIcon />
              </a>
              <a href="#" className="text-white/60 hover:text-accent transition-colors" aria-label="Facebook">
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-medium tracking-widest uppercase mb-4">
              {t("common.shop")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="text-sm font-medium tracking-widest uppercase mb-4">
              {t("footer.customerService")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.service.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-medium tracking-widest uppercase mb-4">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/40 text-xs">
          © {new Date().getFullYear()} HOWK. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}