import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

/* Canonical site origin. Set NEXT_PUBLIC_SITE_URL to the live domain (e.g. https://tallynz.co) in Vercel. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tallyweb-plum.vercel.app";

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

const DESCRIPTION =
  "Tally is New Zealand's outcome-guaranteed marketing agency for the primary sector. Recruitment, reach and enquiry campaigns for seafood, aquaculture, forestry, wood processing, horticulture, viticulture, food and beverage processing, meat processing and agritech, with the result written into the contract.";

/* Primary-sector keyword coverage for New Zealand search. */
const KEYWORDS = [
  "marketing agency New Zealand",
  "primary sector marketing",
  "primary industries marketing NZ",
  "recruitment marketing New Zealand",
  "employer brand primary sector",
  "outcome guaranteed marketing",
  "performance marketing New Zealand",
  "seafood marketing",
  "aquaculture marketing",
  "commercial fishing recruitment",
  "forestry marketing",
  "wood processing marketing",
  "horticulture marketing",
  "kiwifruit marketing",
  "pipfruit apple marketing",
  "viticulture marketing",
  "wine marketing New Zealand",
  "dairy marketing",
  "red meat marketing",
  "sheep and beef marketing",
  "food processing marketing",
  "food and beverage marketing NZ",
  "meat processing recruitment",
  "agritech marketing",
  "agribusiness marketing",
  "seasonal labour recruitment campaigns",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tally | Outcome-Guaranteed Marketing for NZ's Primary Sector",
    template: "%s | Tally",
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: "Tally",
  authors: [{ name: "Tally" }],
  creator: "Tally",
  publisher: "Tally",
  category: "Marketing",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: "/",
    siteName: "Tally",
    title: "Tally | Outcome-Guaranteed Marketing for NZ's Primary Sector",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tally | Outcome-Guaranteed Marketing for NZ's Primary Sector",
    description: DESCRIPTION,
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
};

export const viewport = {
  themeColor: "#0b0b0a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tally",
  slogan: "We sell the tally, not the footage.",
  description: DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/tally-logo.png`,
  image: `${SITE_URL}/images/hero-boat.jpg`,
  email: "zak@tallynz.co",
  areaServed: { "@type": "Country", name: "New Zealand" },
  serviceType: [
    "Recruitment marketing",
    "Employer brand",
    "Reach and awareness campaigns",
    "Lead generation and enquiry campaigns",
  ],
  knowsAbout: [
    "Seafood and aquaculture",
    "Commercial fishing",
    "Forestry and wood processing",
    "Horticulture",
    "Kiwifruit",
    "Pipfruit",
    "Viticulture and wine",
    "Dairy",
    "Red meat, sheep and beef",
    "Food and beverage processing",
    "Meat processing",
    "Agritech",
    "Agribusiness",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ" className={`${grotesk.variable} ${alliance.variable}`}>
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
