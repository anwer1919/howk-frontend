import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // صور المنتجات القادمة من سلة (تخزين S3 + CDN) عبر next/image
    remotePatterns: [
      { protocol: "https", hostname: "**.salla.sa" },
      { protocol: "https", hostname: "**.salla.network" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "**.cdn.salla.sa" },
    ],
  },
};

export default nextConfig;
