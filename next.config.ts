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
  /*
    The guarantee pages are retired: the offer is now a free audit and an
    outcome picked together. Permanent redirects pass their links and rankings
    to /audit instead of leaving 404s.
  */
  async redirects() {
    return [
      { source: "/guarantee", destination: "/audit", permanent: true },
      { source: "/proof", destination: "/audit", permanent: true },
      { source: "/docs/tally-guarantee-one-pager.pdf", destination: "/audit", permanent: true },
    ];
  },
};

export default nextConfig;
