import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  KEYWORDS,
  SITE_NAME,
  SITE_URL,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-M7YPGSC1R8";

/* Headline and body grotesk: General Sans, self-hosted (Fontshare FFL). */
const grotesk = localFont({
  src: [
    { path: "./fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-grotesk",
  display: "swap",
});

/* Eyebrow, label and technical readout face: Alliance No.1 (Degarism Studio). */
const alliance = localFont({
  src: [
    { path: "./fonts/AllianceNo1-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/AllianceNo1-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/AllianceNo1-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/AllianceNo1-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-alliance",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Tally",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Marketing",
  alternates: {
    canonical: "/",
    languages: { "en-NZ": "/", en: "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: "/",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "NZ",
    "geo.placename": "New Zealand",
  },
};

export const viewport = {
  themeColor: "#0b0b0a",
};

const jsonLd = [organizationJsonLd(), websiteJsonLd()];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ" className={`${grotesk.variable} ${alliance.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
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
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
