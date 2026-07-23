import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { VERTICALS } from "@/lib/verticals";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
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
    {
      url: `${SITE_URL}/proof`,
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
      url: `${SITE_URL}/llms.txt`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];
}
