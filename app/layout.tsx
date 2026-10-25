import type { Metadata } from "next";
import localFont from "next/font/local";
import { Barlow_Condensed } from "next/font/google";
import Analytics from "@/components/Analytics";
import { INTRO_SKIP } from "@/components/home/Intro";
import CookieNotice from "@/components/CookieNotice";
import SiteChrome from "@/components/SiteChrome";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
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

/*
  Site-wide defaults only. Every page sets its own title, description,
  canonical, Open Graph and Twitter tags through routeMetadata(), so nothing
  here leaks onto a page that forgot to set its own.
*/
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: "%s | Tally" },
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
    "geo.region": "NZ-AUK",
    "geo.placename": "Auckland",
  },
};

export const viewport = {
  themeColor: "#17191c",
};

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
        {/* Plain inline script so it runs while <head> parses, before first paint: next/script's beforeInteractive only runs once the Next runtime boots. Sets data-intro="calm" on <html> for reduced motion. */}
        <script id="intro-skip" dangerouslySetInnerHTML={{ __html: INTRO_SKIP }} />
        <Analytics />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <CookieNotice />
      </body>
    </html>
  );
}
