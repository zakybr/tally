/*
  Browser side of the Meta pixel.

  The pixel ID comes from NEXT_PUBLIC_META_PIXEL_ID. When it is unset, or the
  visitor has not accepted cookies, fbq is never defined and every call here is
  a silent no-op, so callers never need to check first.
*/

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/* Meta's standard base code, unchanged apart from types, minus the auto PageView. */
export function loadMetaPixel(pixelId: string) {
  if (typeof window === "undefined" || window.fbq) return;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue!.push(args);
  } as Fbq;
  window.fbq = n;
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  const t = document.createElement("script");
  t.async = true;
  t.src = "https://connect.facebook.net/en_US/fbevents.js";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode?.insertBefore(t, s);
  n("init", pixelId);
}

/*
  eventId is what lets Meta deduplicate this browser event against the same
  event sent from the server through the Conversions API.
*/
export function trackMeta(event: string, params?: Record<string, unknown>, eventId?: string) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (eventId) window.fbq("track", event, params ?? {}, { eventID: eventId });
  else window.fbq("track", event, params ?? {});
}

/* A fresh id per conversion, shared by the browser pixel and the CAPI call. */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}
