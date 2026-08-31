import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // صور المنتجات القادمة من سلة (CDN) عبر next/image
    remotePatterns: [
      { protocol: "https", hostname: "**.salla.sa" },
      { protocol: "https", hostname: "**.cdn.salla.network" },
    ],
  },
};

export default nextConfig;