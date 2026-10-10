"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isOptedOut } from "@/lib/consent";
import { META_PIXEL_ID, loadMetaPixel, trackMeta } from "@/lib/meta-pixel";

/*
  Meta pixel, site-wide, on by default with a remembered opt-out.

  The base code loads on the first page view and a PageView fires for it, then
  again on every client-side route change, since Next.js navigations do not
  reload the page. A visitor who pressed Opt out never loads it: the check
  reads localStorage directly inside the effect, not a React snapshot, so the
  server-rendered default cannot slip a load through during hydration.

  Skipped entirely when NEXT_PUBLIC_META_PIXEL_ID is unset. The admin portal
  never renders this: SiteChrome leaves it out.
*/
export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!META_PIXEL_ID || isOptedOut()) return;
    loadMetaPixel(META_PIXEL_ID);
    trackMeta("PageView");
  }, [pathname]);

  return null;
}
