import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/*
  The whole site. Kept deliberately short: every old page redirects into one of
  these (see next.config.ts), so search consolidates on fewer, stronger URLs.
  `lastModified` is a fixed content date; bump it when copy actually changes.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-10-20");
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: updated,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/services", 0.95),
    page("/audit", 0.95),
    page("/industries", 0.9),
    page("/instagram-account-recovery", 0.9),
    page("/contact", 0.85),
    page("/about", 0.8),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
