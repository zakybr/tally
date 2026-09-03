"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export const GA_MEASUREMENT_ID = "G-M7YPGSC1R8";
export const CONSENT_KEY = "tally_cookie_consent";

/*
  GA4 behind Google Consent Mode v2.

  Analytics storage defaults to denied and stays denied until the visitor
  accepts, so no analytics cookie is written on a first visit and nothing is
  read from the device without a choice being made. Accepting fires a consent
  update rather than a page reload, so the current pageview is still counted.

  dataLayer is an ordered queue, so the denied default only has to be pushed
  before the config command, not before the library loads. Keeping both in one
  script guarantees that ordering without depending on script-strategy timing.

  Declining is a real decline: the default is never lifted, and GA receives only
  cookieless pings.

  The admin portal is excluded outright. It is internal traffic and would skew
  every report.
*/
export default function Analytics() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted'
          });
          try {
            if (localStorage.getItem('${CONSENT_KEY}') === 'granted') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
