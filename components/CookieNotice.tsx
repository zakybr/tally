"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { CONSENT_EVENT, CONSENT_KEY, readConsent, subscribeConsent } from "@/lib/consent";

/*
  Cookie notice for GA4 and the Meta pixel.

  Analytics storage is already denied by default from the layout head, and the
  pixel script is not requested at all until Accept, so nothing is written
  before this is answered. Accepting fires a Consent Mode
  update on the live page rather than reloading, so the visit is counted from
  that point. Declining records the choice so the notice does not reappear on
  every route.

  localStorage is an external store, so it is read through useSyncExternalStore
  rather than an effect. That keeps the server and first client render in
  agreement without writing state from inside an effect.

  Deliberately not a modal. It does not trap focus or block the page: this is a
  measurement cookie on a marketing site, not a gate.
*/

/* The server cannot know the choice, so it renders the notice closed. */
const getServerSnapshot = () => "denied";

export default function CookieNotice() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, getServerSnapshot);

  const decide = useCallback((value: "granted" | "denied") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* Nothing to persist to. The denied default stands for this session. */
    }
    if (value === "granted") {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }, []);

  if (consent) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed bottom-0 left-0 z-[70] w-full border-t rule-med bg-sheet-2 p-5 shadow-[0_-12px_32px_rgba(0,0,0,0.5)] sm:bottom-5 sm:left-5 sm:w-[26rem] sm:border sm:p-6"
    >
      <p className="text-[0.875rem] leading-[1.6] text-ink-2">
        We use Google Analytics to count visits, and the Meta pixel to measure our Facebook and
        Instagram ads. Neither sets a cookie until you accept. See our{" "}
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
          Accept
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="pill pill-outline pill-sm mono-label inline-flex"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
