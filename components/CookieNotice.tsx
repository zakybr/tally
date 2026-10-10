"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { GA_MEASUREMENT_ID } from "@/components/Analytics";
import {
  CONSENT_EVENT,
  CONSENT_KEY,
  OPTED_OUT,
  readConsent,
  subscribeConsent,
} from "@/lib/consent";

/*
  Measurement notice for GA4 and the Meta pixel.

  Both load by default (see Analytics.tsx and MetaPixel.tsx). This tells the
  visitor so and offers an opt-out. OK records the choice so the notice stops
  appearing. Opt out records it too, and every loader checks it before
  requesting anything, so nothing loads on later visits.

  Opting out mid-visit also stops what is already running on this page: GA's
  per-property disable flag, and the pixel's consent revoke, which holds back
  every further event. Existing cookies are left in place; the privacy policy
  explains how to clear them.

  localStorage is an external store, so it is read through useSyncExternalStore
  rather than an effect. That keeps the server and first client render in
  agreement without writing state from inside an effect.

  Deliberately not a modal. It does not trap focus or block the page.
*/

/* The server cannot know the choice, so it renders the notice closed. */
const getServerSnapshot = () => "denied";

export default function CookieNotice() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, getServerSnapshot);

  const decide = useCallback((value: "granted" | typeof OPTED_OUT) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* Nothing to persist to. The choice holds for this page only. */
    }
    if (value === OPTED_OUT) {
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      window.fbq?.("consent", "revoke");
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }, []);

  if (consent) return null;

  return (
    <div
      role="region"
      aria-label="Analytics notice"
      className="fixed bottom-0 left-0 z-[70] w-full border-t rule-med bg-sheet-2 p-5 shadow-[0_-12px_32px_rgba(0,0,0,0.5)] sm:bottom-5 sm:left-5 sm:w-[26rem] sm:border sm:p-6"
    >
      <p className="text-[0.875rem] leading-[1.6] text-ink-2">
        We use Google Analytics and the Meta pixel to measure visits and our ads. See our{" "}
        <Link href="/privacy" className="text-ink underline underline-offset-4 hover:text-ink-2">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="pill pill-solid pill-sm mono-label inline-flex"
        >
          OK
        </button>
        <button
          type="button"
          onClick={() => decide(OPTED_OUT)}
          className="pill pill-outline pill-sm mono-label inline-flex"
        >
          Opt out
        </button>
      </div>
    </div>
  );
}
