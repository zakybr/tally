/*
  One cookie choice, read by everything that needs it.

  The notice writes the choice to localStorage and dispatches CONSENT_EVENT, so
  anything that loads only after Accept (GA4 storage, the Meta pixel) can react
  on the live page without a reload.
*/

export const CONSENT_KEY = "tally_cookie_consent";
export const CONSENT_EVENT = "tally:consent";

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
