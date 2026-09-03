import type { Metadata } from "next";
import Link from "next/link";
import LegalDoc, { type Clause } from "@/components/LegalDoc";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply to using tallynz.co, how they relate to a signed Tally engagement, and the governing law.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | Tally",
    description: "The terms that apply to using tallynz.co and the materials on it.",
    url: "/terms",
  },
};

const UPDATED = "24 August 2026";

const clauses: Clause[] = [
  {
    heading: "What these terms cover",
    body: (
      <>
        <p>
          These terms apply to your use of <strong>tallynz.co</strong> and the material published
          on it. By using the site you accept them. If you do not, please do not use the site.
        </p>
        <p>
          They are <strong>not</strong> the terms of a Tally engagement. Paid work is governed by a
          separate written agreement covering scope, price, the guaranteed outcome and the miss
          clause. Where that agreement and these terms differ, the signed agreement applies.
        </p>
      </>
    ),
  },
  {
    heading: "Who we are",
    body: (
      <p>
        Tally is a marketing agency operating in New Zealand, working with primary industries and
        marine operators. You can reach us at{" "}
        <a href="mailto:zak@tallynz.co">zak@tallynz.co</a>.
      </p>
    ),
  },
  {
    heading: "Using the site",
    body: (
      <>
        <p>You may read, share and quote this site with attribution. You may not:</p>
        <ul>
          <li>Attempt to gain access to any part of the site you have not been granted</li>
          <li>Interfere with the site, its security, or anyone else&apos;s use of it</li>
          <li>Scrape it at a volume that degrades service for others</li>
          <li>Represent our material as your own, or resell it</li>
        </ul>
      </>
    ),
  },
  {
    heading: "The internal portal",
    body: (
      <p>
        Pages under <strong>/admin</strong> are a private staff system. Access is by invitation and
        limited to named accounts. Attempting to access it without authorisation is not permitted
        and may be an offence under the Crimes Act 1961.
      </p>
    ),
  },
  {
    heading: "Our material",
    body: (
      <p>
        The text, design, brand marks and documents on this site belong to Tally unless stated
        otherwise. Documents we make available, such as the guarantee one-pager, are provided so
        you can evaluate working with us. You may share them inside your own organisation. Please
        do not republish or redistribute them publicly without asking.
      </p>
    ),
  },
  {
    heading: "Figures, results and the guarantee",
    body: (
      <>
        <p>
          Where this site describes an outcome guarantee, it is describing the shape of a
          commercial offer. What is actually binding is the number, the measurement method and the
          miss clause written into a signed engagement, not a page on a website.
        </p>
        <p>
          Figures shown are sourced or marked as illustrative. Results from previous work do not
          guarantee the same result for a different business in a different market.
        </p>
      </>
    ),
  },
  {
    heading: "Third-party links",
    body: (
      <p>
        We link to other sites where it is useful. We do not control them and are not responsible
        for their content, their availability, or how they handle your information.
      </p>
    ),
  },
  {
    heading: "Availability",
    body: (
      <p>
        We aim to keep the site available and accurate, but we do not promise it will be
        uninterrupted or error-free. We may change, suspend or remove any part of it without
        notice.
      </p>
    ),
  },
  {
    heading: "Liability",
    body: (
      <>
        <p>
          To the extent the law allows, Tally is not liable for indirect or consequential loss
          arising from your use of this site, or from relying on information published on it.
        </p>
        <p>
          Nothing here limits rights you have under the Consumer Guarantees Act 1993 or the Fair
          Trading Act 1986 that cannot lawfully be excluded. Where you acquire our services for
          business purposes, the Consumer Guarantees Act does not apply.
        </p>
      </>
    ),
  },
  {
    heading: "Privacy",
    body: (
      <p>
        How we handle personal information is set out in our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
    ),
  },
  {
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by New Zealand law, and the New Zealand courts have exclusive
        jurisdiction over any dispute arising from them.
      </p>
    ),
  },
  {
    heading: "Changes and contact",
    body: (
      <p>
        We may update these terms. The date at the top of this page shows when they last changed.
        Questions: <a href="mailto:zak@tallynz.co">zak@tallynz.co</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalDoc
        eyebrow="Terms of service"
        title="The terms, in plain words."
        lede="These cover the website. The work itself is governed by a signed agreement with the number and the miss clause written into it."
        updated={UPDATED}
        clauses={clauses}
      />
    </>
  );
}
