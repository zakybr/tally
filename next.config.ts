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
      { source: "/instagram-growth", destination: "/services/instagram-marketing", permanent: true },
      { source: "/instagram-username-claims", destination: "/instagram-account-recovery", permanent: true },
      { source: "/marine-marketing", destination: "/industries/marine", permanent: true },
      { source: "/primary-industries-marketing", destination: "/industries/primary-industries", permanent: true },
      { source: "/seafood-aquaculture-marketing", destination: "/industries/primary-industries", permanent: true },
      { source: "/forestry-marketing", destination: "/industries/primary-industries", permanent: true },
      { source: "/horticulture-marketing", destination: "/industries/primary-industries", permanent: true },
      { source: "/guides/grow-business-instagram-new-zealand", destination: "/services/instagram-marketing", permanent: true },
      { source: "/guides/:slug", destination: "/instagram-account-recovery", permanent: true },
      { source: "/guides", destination: "/instagram-account-recovery", permanent: true },
      /* Hero film files renamed to descriptive names. */
      { source: "/video/hero-poster.jpg", destination: "/video/tally-brand-film-poster.jpg", permanent: true },
      { source: "/video/hero.mp4", destination: "/video/tally-brand-film-1080p.mp4", permanent: true },
      { source: "/video/hero-720.mp4", destination: "/video/tally-brand-film-720p.mp4", permanent: true },
      /* Short service and industry URLs people guess at. */
      { source: "/services/instagram", destination: "/services/instagram-marketing", permanent: true },
      { source: "/services/paid-ads", destination: "/services/meta-ads", permanent: true },
      { source: "/services/facebook-ads", destination: "/services/meta-ads", permanent: true },
      { source: "/services/account-recovery", destination: "/instagram-account-recovery", permanent: true },
      { source: "/industries/consumer", destination: "/industries/consumer-brands", permanent: true },
    ];
  },
};

export default nextConfig;
