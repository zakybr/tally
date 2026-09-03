import type { Metadata } from "next";
import localFont from "next/font/local";
import Analytics from "@/components/Analytics";
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
  themeColor: "#08090b",
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
        <Analytics />
      </head>
      <body>
        {/*
          The direction contract, emitted as a real HTML comment. A JSX comment is
          compile-time only and never reaches the markup, so this rides in a hidden,
          inert node instead, greppable in the production build by its seed key.
        */}
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html: `<!--
  THESIS: tally is a drawing sheet, not a brochure. It refuses the agency landing
  page - centred headline, soft cards, scroll reveals - because an operator trusts
  a dimensioned document, not a pitch. The guarantee is a specification with
  numbered notes, not a promise.
  OWN-WORLD: naval-architecture general arrangement sheet. Cold near-black #08090B
  ground, cool line-white #E8EAED, cool grey #7D858F. Signal #FF4A1C is rationed
  by meaning, not by count: it marks guaranteed figures and revision flags, and
  nothing else, ever. Hierarchy is line weight - hairline, medium, heavy. Title blocks,
  numbered NOTES, revision triangles, dimension strings. Two faces only: General
  Sans and Alliance No.1.
  STORY: an operator sees a document that names a number, dimensions the eight
  weeks to reach it, and prints who pays if it is missed - then books the call.
  FIRST VIEWPORT: claim top-left at display scale; title block docked bottom-right
  carrying PROJECT / SCALE / DRAWN / REV / DATE with the primary action in the
  issue-stamp position; dimension string running between them.
  FORM: General Arrangement, candidate 3 of 7, seed key 042cfc18.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, DESIGN.md, and every shipping raster carrying its
  provenance.
-->`,
          }}
        />
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
