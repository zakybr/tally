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
    Retired pages. Permanent redirects pass their links and rankings to the
    page or section that replaced them instead of leaving 404s.
  */
  async redirects() {
    return [
      { source: "/guarantee", destination: "/audit", permanent: true },
      { source: "/proof", destination: "/audit", permanent: true },
      { source: "/docs/tally-guarantee-one-pager.pdf", destination: "/audit", permanent: true },
      /* Site condensed to fewer pages: old URLs land on the section that replaced them. */
      { source: "/instagram-growth", destination: "/services#organic-growth", permanent: true },
      { source: "/instagram-username-claims", destination: "/instagram-account-recovery", permanent: true },
      { source: "/marine-marketing", destination: "/industries#marine", permanent: true },
      { source: "/primary-industries-marketing", destination: "/industries#primary-industries", permanent: true },
      { source: "/seafood-aquaculture-marketing", destination: "/industries#primary-industries", permanent: true },
      { source: "/forestry-marketing", destination: "/industries#primary-industries", permanent: true },
      { source: "/horticulture-marketing", destination: "/industries#primary-industries", permanent: true },
      { source: "/guides/grow-business-instagram-new-zealand", destination: "/services#organic-growth", permanent: true },
      { source: "/guides/:slug", destination: "/instagram-account-recovery", permanent: true },
      { source: "/guides", destination: "/instagram-account-recovery", permanent: true },
    ];
  },
};

export default nextConfig;
