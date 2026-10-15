import type { Metadata } from "next";
import localFont from "next/font/local";
import { Barlow_Condensed } from "next/font/google";
import Script from "next/script";
import Analytics from "@/components/Analytics";
import { INTRO_SKIP } from "@/components/home/Intro";
import CookieNotice from "@/components/CookieNotice";
import SiteChrome from "@/components/SiteChrome";
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

/* Display: condensed bold uppercase headlines. */
const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-condensed",
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
  themeColor: "#17191c",
};

const jsonLd = [organizationJsonLd(), websiteJsonLd()];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-NZ"
      className={`${grotesk.variable} ${alliance.variable} ${condensed.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Decides before first paint whether the homepage intro plays; sets data-intro on <html>. */}
        <Script id="intro-skip" strategy="beforeInteractive">
          {INTRO_SKIP}
        </Script>
        <Analytics />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <CookieNotice />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
