"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { CONSENT_KEY, OPTED_OUT } from "@/lib/consent";

export const GA_MEASUREMENT_ID = "G-M7YPGSC1R8";

/*
  GA4, on by default, with a remembered opt-out.

  The opt-out is checked first, before gtag.js is requested: a visitor who
  pressed Opt out on an earlier visit gets no GA request at all. Everyone else
  gets GA with analytics storage granted. Advertising signals stay denied in
  Consent Mode, since GA is only used here to count visits.

  The library is injected from the same inline script rather than a separate
  <Script src>, so the opt-out check and the load cannot run out of order.

  The admin portal is excluded outright. It is internal traffic and would skew
  every report.
*/
export default function Analytics() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        (function () {
          try {
            if (localStorage.getItem('${CONSENT_KEY}') === '${OPTED_OUT}') return;
          } catch (e) {}
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted',
            functionality_storage: 'granted',
            security_storage: 'granted'
          });
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
          var s = document.createElement('script');
          s.async = true;
          s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
          document.head.appendChild(s);
        })();
      `}
    </Script>
  );
}
