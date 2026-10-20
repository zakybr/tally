import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { VERTICALS } from "@/lib/verticals";
import { SERVICES } from "@/lib/services";
import { GUIDES } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  /*
    A fixed content date, not new Date(). A lastmod that changes on every
    request tells Google nothing, so it learns to ignore the field. Bump this
    when page copy actually changes.
  */
  const now = new Date("2026-10-15");
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/primary-industries-marketing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...VERTICALS.map((v) => ({
      url: `${SITE_URL}${v.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}${s.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/guides`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...GUIDES.map((g) => ({
      url: `${SITE_URL}${g.path}`,
      lastModified: new Date(g.updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/audit`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];
}
