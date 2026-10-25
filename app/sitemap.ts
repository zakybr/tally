import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

/*
  Every indexable page, from the route registry in lib/routes.ts. `lastModified`
  is each page's own content date, so it only moves when that page's words do.
  Noindex pages (/audit/thanks, /admin) are not in the registry.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified: new Date(r.updated),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
