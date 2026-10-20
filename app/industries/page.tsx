import type { Metadata } from "next";
import PageShell, { FaqList } from "@/components/PageShell";
import { INDUSTRIES, INDUSTRY_FAQS } from "@/lib/industries";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

/*
  Who we work with, on one page: consumer brands, marine and primary
  industries, each a short section with its own anchor. Replaces the five
  sector pages, which redirect here.
*/

const DESCRIPTION =
  "Marketing for New Zealand consumer brands, marine businesses and primary industries: bookings, sales, enquiries and recruitment, aimed at outcomes. Free audit.";

export const metadata: Metadata = {
  title: "Industries: Consumer, Marine & Primary Industries Marketing NZ",
  description: DESCRIPTION,
  alternates: { canonical: "/industries" },
  openGraph: { title: "Industries | Tally", description: DESCRIPTION, url: "/industries" },
};

const jsonLd = [
  faqJsonLd(INDUSTRY_FAQS),
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
  ]),
];

export default function IndustriesPage() {
  return (
    <PageShell
      title="Who we"
      accent="work with"
      intro="Consumer brands and marine are where we do most of our work, and we run recruitment and reach for primary industries operators. Whatever the sector, we pick the outcome that moves the business first."
      source="industries_hero"
      jsonLd={jsonLd}
    >
      <div className="mt-20 divide-y divide-[var(--w-hair)] border-y rule-hair">
        {INDUSTRIES.map((ind) => (
          <section
            key={ind.id}
            id={ind.id}
            className="grid scroll-mt-24 gap-4 py-12 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16"
          >
            <h2 className="display text-[2rem] text-ink md:text-[2.5rem]">{ind.name}</h2>
            <div>
              <p className="max-w-[60ch] text-[1.0625rem] leading-[1.65] text-ink-2">{ind.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {ind.outcomes.map((o) => (
                  <li key={o} className="mono-label rounded-full border rule-med px-3 py-1.5 text-ink-2">
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <FaqList faqs={INDUSTRY_FAQS} />
    </PageShell>
  );
}
