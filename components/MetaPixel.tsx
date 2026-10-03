"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { readConsent, subscribeConsent } from "@/lib/consent";
import { META_PIXEL_ID, loadMetaPixel, trackMeta } from "@/lib/meta-pixel";

/*
  Meta pixel, site-wide, behind the same cookie choice as GA4.

  Nothing is requested from Meta until the visitor accepts. After that the
  base code loads once and a PageView fires for the current route and again
  on every client-side route change. Accepting mid-visit loads it on the spot,
  so that pageview still counts.

  Skipped entirely when NEXT_PUBLIC_META_PIXEL_ID is unset. The admin portal
  never renders this: SiteChrome leaves it out.

  There is no <noscript> image fallback. It would fire a PageView before any
  consent choice could be read.
*/

const getServerSnapshot = () => "";

export default function MetaPixel() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeConsent, readConsent, getServerSnapshot);
  const enabled = Boolean(META_PIXEL_ID) && consent === "granted";

  useEffect(() => {
    if (!enabled) return;
    loadMetaPixel(META_PIXEL_ID);
    trackMeta("PageView");
  }, [enabled, pathname]);

  return null;
}
