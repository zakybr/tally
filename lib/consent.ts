/*
  One measurement choice, read by everything that needs it.

  GA4 and the Meta pixel load by default. The notice offers an opt-out: it
  writes OPTED_OUT to localStorage and dispatches CONSENT_EVENT, and every
  loader checks isOptedOut() before it requests anything, so a remembered
  opt-out is honoured on the very first script of the next visit.

  The value is "denied" so that visitors who pressed Decline on the earlier
  consent-first notice stay opted out. "granted" means OK was pressed.
*/

export const CONSENT_KEY = "tally_cookie_consent";
export const CONSENT_EVENT = "tally:consent";
export const OPTED_OUT = "denied";

export function subscribeConsent(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CONSENT_EVENT, onChange);
  };
}

export function readConsent(): string {
  try {
    return window.localStorage.getItem(CONSENT_KEY) ?? "";
  } catch {
    /* Private mode or blocked storage: treat as answered, consent stays denied. */
    return "denied";
  }
}

/* True only when the visitor has pressed Opt out. Unreadable storage counts as not opted out. */
export function isOptedOut(): boolean {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === OPTED_OUT;
  } catch {
    return false;
  }
}
