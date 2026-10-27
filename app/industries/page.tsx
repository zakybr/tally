import type { Metadata } from "next";
import Link from "next/link";
import PageShell, { FaqList } from "@/components/PageShell";
import { INDUSTRY_FAQS, INDUSTRY_PAGES } from "@/lib/industries";
import { routeMetadata } from "@/lib/routes";
import { breadcrumbNode, faqNode, webPageNode } from "@/lib/seo";

/*
  The industries hub: consumer brands, marine and primary industries, a short
  section each under the old anchors (/industries#marine still lands), each
  linking to the industry's own page.
*/

const PATH = "/industries";

export const metadata: Metadata = routeMetadata(PATH);

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Industries", path: PATH },
];

const nodes = [
  webPageNode({ path: PATH, name: "Industries", description: metadata.description ?? "" }),
  breadcrumbNode(PATH, crumbs),
  faqNode(PATH, INDUSTRY_FAQS),
];

export default function IndustriesPage() {
  return (
    <PageShell
      title="Marketing for consumer, marine"
      accent="and primary industries"
      intro="Consumer brands and marine are where we do most of our work, and we run recruitment and reach campaigns for primary industries operators. Whatever the sector, we pick the outcome that moves the business first."
      source="industries_hero"
      crumbs={crumbs}
      nodes={nodes}
    >
      <div className="mt-20 divide-y divide-[var(--w-hair)] border-y rule-hair">
        {INDUSTRY_PAGES.map((ind) => (
          <section
            key={ind.anchor}
            id={ind.anchor}
            className="grid scroll-mt-24 gap-4 py-12 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16"
          >
            <h2 className="display text-[2rem] text-ink md:text-[2.5rem]">{ind.name}</h2>
            <div>
              <p className="max-w-[60ch] text-[1.0625rem] leading-[1.65] text-ink-2">{ind.hub}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {ind.outcomes.map((o) => (
                  <li key={o} className="mono-label rounded-full border rule-med px-3 py-1.5 text-ink-2">
                    {o}
                  </li>
                ))}
              </ul>
              <Link
                href={`/industries/${ind.slug}`}
                className="mt-6 inline-block text-[0.9375rem] font-semibold text-signal hover:text-ink"
              >
                {ind.linkText}
              </Link>
            </div>
          </section>
        ))}
      </div>

      <FaqList faqs={INDUSTRY_FAQS} heading="Industries FAQ" />
    </PageShell>
  );
}
