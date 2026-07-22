import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve modern formats; Vercel generates these on demand from the static imports.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Tree-shake large libraries down to only what each module imports.
  experimental: {
    optimizePackageImports: ["framer-motion", "lenis"],
  },
};

export default nextConfig;
