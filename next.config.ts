import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.salla.sa" },
      { protocol: "https", hostname: "*.cdn.salla.network" },
      { protocol: "https", hostname: "*.salla.network" },
    ],
  },
};

export default nextConfig;