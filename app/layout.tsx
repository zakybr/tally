import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
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

/* Label and eyebrow mono: the "ARSENAL-1" treatment. */
const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tally | We sell the tally, not the footage.",
  description:
    "Outcome-guaranteed marketing for NZ's primary sector. Recruitment, reach and enquiry campaigns for seafood, forestry, horticulture and processing, with the result written into the contract.",
  openGraph: {
    title: "Tally | We sell the tally, not the footage.",
    description:
      "The only primary-sector partner in NZ that guarantees the outcome. Content is the mechanism. The number is the product.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0b0b0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ" className={`${grotesk.variable} ${jbMono.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
