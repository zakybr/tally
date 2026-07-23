/* Client-side analytics helpers that plug into the existing GA4 gtag install. */

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  msclkid?: string;
  referrer?: string;
  landing_page?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "msclkid",
] as const;

const STORAGE_KEY = "tally_attribution";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;
  const cleaned = Object.fromEntries(
    Object.entries(params ?? {}).filter(([, v]) => v !== undefined && v !== ""),
  );
  if (typeof window.gtag === "function") {
    window.gtag("event", name, cleaned);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...cleaned });
  }
}

export function readUtmsFromUrl(search = ""): UtmParams {
  const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const out: UtmParams = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) out[key] = v.slice(0, 200);
  }
  return out;
}

export function captureAttribution(): UtmParams {
  if (typeof window === "undefined") return {};
  const fromUrl = readUtmsFromUrl(window.location.search);
  const existing = loadAttribution();
  const hasNew = Object.keys(fromUrl).length > 0;
  const next: UtmParams = {
    ...existing,
    ...(hasNew ? fromUrl : {}),
    referrer: existing.referrer || document.referrer?.slice(0, 500) || undefined,
    landing_page: existing.landing_page || `${window.location.pathname}${window.location.search}`,
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota / private mode */
  }
  return next;
}

export function loadAttribution(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
}

export function attributionPayload(): UtmParams {
  return captureAttribution();
}
