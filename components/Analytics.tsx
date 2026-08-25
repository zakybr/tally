"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = "G-M7YPGSC1R8";

/* Public site only. The admin portal is internal traffic and would skew every report. */
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
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
