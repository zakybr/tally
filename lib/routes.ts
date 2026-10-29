import { INDUSTRY_PAGES } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";
import { RECOVERY, SERVICE_PAGES } from "@/lib/services";

/*
  Every indexable page on the site, in one list. Page metadata, the sitemap,
  the social cards at /og and llms.txt all read from here, so a page cannot be
  added without a title, a description, a card and a content date.

  `updated` is the date the page's copy last changed. Bump it when the words
  change, not when the code around them does: it becomes the sitemap lastmod.
*/

export type RouteInfo = {
  path: string;
  title: string;
  description: string;
  ogAlt: string;
  /* Small line on the social card. */
  eyebrow: string;
  /* Large line on the social card. */
  headline: string;
  updated: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const STATIC: RouteInfo[] = [
  {
    path: "/",
    title: "Marketing Agency Auckland: Social, Ads and Video | Tally",
    description:
      "Marketing agency in Auckland for consumer and marine brands across NZ: Instagram, Meta ads, video and websites, built on 100M+ organic views. Free audit.",
    ogAlt: "Tally, marketing agency in Auckland, New Zealand",
    eyebrow: "Marketing agency · Auckland, New Zealand",
    headline: "We make brands people stop scrolling for.",
    updated: "2026-10-25",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/services",
    title: "Social Media Marketing Services, Auckland and NZ | Tally",
    description:
      "Social media management, Instagram marketing, Meta ads, video production and websites from an Auckland agency, plus Instagram account recovery. Free audit.",
    ogAlt: "Tally marketing services, Auckland and New Zealand",
    eyebrow: "Services · Auckland, New Zealand",
    headline: "Social media marketing services",
    updated: "2026-10-25",
    changeFrequency: "monthly",
    priority: 0.95,
  },
  {
    path: RECOVERY.path,
    title: RECOVERY.title,
    description: RECOVERY.description,
    ogAlt: RECOVERY.ogAlt,
    eyebrow: "Account recovery · New Zealand",
    headline: `${RECOVERY.h1} ${RECOVERY.h1Accent}`,
    updated: RECOVERY.updated,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/industries",
    title: "Consumer, Marine and Primary Industry Marketing NZ | Tally",
    description:
      "Marketing for New Zealand consumer brands, marine businesses and primary industries from an Auckland agency: sales, bookings, enquiries and recruitment.",
    ogAlt: "Tally industries: consumer brands, marine and primary industries",
    eyebrow: "Industries · New Zealand",
    headline: "Consumer, marine and primary industries",
    updated: "2026-10-25",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/audit",
    title: "Free Marketing Audit for Auckland and NZ Businesses | Tally",
    description:
      "A free audit of your Instagram, Meta ads and how customers find you, with the one outcome worth going after first. For Auckland and New Zealand businesses.",
    ogAlt: "Tally free marketing audit for Auckland and New Zealand businesses",
    eyebrow: "Free audit · Auckland, New Zealand",
    headline: "Free marketing audit",
    updated: "2026-10-25",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/about",
    title: "About Us: Marketing Agency in Auckland, NZ | Tally",
    description:
      "Tally is an Auckland marketing agency built on 8 years growing, monetising and selling Instagram accounts. Meet Zak Rachmadi, director.",
    ogAlt: "About Tally, marketing agency in Auckland",
    eyebrow: "About · Auckland, New Zealand",
    headline: "About Tally",
    updated: "2026-10-25",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/contact",
    title: "Contact Us: Book a Call with an Auckland Agency | Tally",
    description:
      "Book a free Zoom call with Tally, a digital marketing agency based in Auckland, or call Zak on +64 22 305 3853. Working with businesses across NZ.",
    ogAlt: "Contact Tally, marketing agency in Auckland",
    eyebrow: "Contact · Auckland, New Zealand",
    headline: "Book a call",
    updated: "2026-10-25",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/privacy",
    title: "Privacy Policy for tallynz.co, NZ Privacy Act 2020 | Tally",
    description:
      "How Tally Marketing Limited collects, uses and protects personal information through tallynz.co under the New Zealand Privacy Act 2020, and how to ask for it.",
    ogAlt: "Tally privacy policy",
    eyebrow: "Privacy policy",
    headline: "What we collect, and why.",
    updated: "2026-10-12",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    path: "/terms",
    title: "Terms of Service for tallynz.co, New Zealand Law | Tally",
    description:
      "The terms for using tallynz.co, how they relate to a signed Tally engagement, liability, and the New Zealand law that governs them, written in plain words.",
    ogAlt: "Tally terms of service",
    eyebrow: "Terms of service",
    headline: "The terms, in plain words.",
    updated: "2026-10-22",
    changeFrequency: "yearly",
    priority: 0.2,
  },
];

const SERVICES: RouteInfo[] = SERVICE_PAGES.map((s) => ({
  path: `/services/${s.slug}`,
  title: s.title,
  description: s.description,
  ogAlt: s.ogAlt,
  eyebrow: `${s.name} · Auckland, New Zealand`,
  headline: `${s.h1} ${s.h1Accent}`,
  updated: s.updated,
  changeFrequency: "monthly",
  priority: 0.9,
}));

const INDUSTRIES: RouteInfo[] = INDUSTRY_PAGES.map((i) => ({
  path: `/industries/${i.slug}`,
  title: i.title,
  description: i.description,
  ogAlt: i.ogAlt,
  eyebrow: `${i.name} · New Zealand`,
  headline: `${i.h1} ${i.h1Accent}`,
  updated: i.updated,
  changeFrequency: "monthly",
  priority: 0.8,
}));

export const ROUTES: RouteInfo[] = [...STATIC, ...SERVICES, ...INDUSTRIES];

export function getRoute(path: string): RouteInfo {
  const route = ROUTES.find((r) => r.path === path);
  if (!route) throw new Error(`No route registered for ${path}`);
  return route;
}

/* Metadata for a registered page: its own title, description, canonical, OG and Twitter tags. */
export function routeMetadata(path: string) {
  const r = getRoute(path);
  return pageMetadata({ path: r.path, title: r.title, description: r.description, ogAlt: r.ogAlt });
}
