export {};

declare global {
  interface Window {
    /* Defined by the consent-default script in Analytics.tsx. */
    gtag?: (...args: unknown[]) => void;
  }
}
