import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import CtaPair from "@/components/CtaPair";
import TallyMark from "@/components/TallyMark";
import Arrow from "@/components/Arrow";
import { VERTICALS } from "@/lib/verticals";
import { SITE_URL, breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

/*
  Primary industries hub. Short: what we move for primary operators, the four
  sector pages, a few plain answers for search and AI, then the free audit or
  a call.
*/

const DESCRIPTION =
  "Primary industries marketing in New Zealand: recruitment, reach and enquiry campaigns for seafood, forestry, horticulture and processing, aimed at outcomes. Free audit.";

export const metadata: Metadata = {
  title: "Marketing for Primary Industries NZ",
  description: DESCRIPTION,
  keywords: [
    "marketing for primary industries NZ",
    "primary industries marketing New Zealand",
    "primary sector marketing agency",
    "food and fibre marketing NZ",
    "agribusiness marketing agency NZ",
    "seafood marketing New Zealand",
    "forestry marketing NZ",
    "horticulture recruitment marketing",
  ],
  alternates: { canonical: "/primary-industries-marketing" },
  openGraph: {
    title: "Marketing for Primary Industries NZ | Tally",
    description:
      "Marketing for New Zealand's primary industries aimed at an outcome that moves the business: staff, reach or enquiries.",
    url: "/primary-industries-marketing",
  },
};

const FAQS: FaqItem[] = [
  {
    question: "What is primary industries marketing in New Zealand?",
    answer:
      "Marketing for New Zealand's food and fibre sectors: seafood and aquaculture, forestry and wood processing, horticulture, food processing and agribusiness. Most of it is recruitment for hard-to-staff roles, reach with the buyers who decide, and enquiries for suppliers.",
  },
  {
    question: "How is Tally different from other agri marketing agencies?",
    answer:
      "Most agri agencies sell creative and monthly content. We start with a free audit, pick the one outcome that would actually move the business, such as qualified applications or enquiries, and aim everything at that instead of video output with no clear return.",
  },
  {
    question: "Does Tally do recruitment marketing for primary industries?",
    answer:
      "Yes. Recruitment is the most common primary industries brief we take: crews, plants, gangs, packhouses and seasonal rosters, measured in qualified applications.",
  },
  {
    question: "Do you work with smaller operators?",
    answer:
      "Yes. What matters is that there is an outcome worth moving, not the size of the business.",
  },
];

const jsonLd = [
  faqJsonLd(FAQS),
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Primary industries marketing", path: "/primary-industries-marketing" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Marketing for Primary Industries NZ",
    description: DESCRIPTION,
    url: `${SITE_URL}/primary-industries-marketing`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-NZ",
  },
];

export default function PrimaryIndustriesMarketingPage() {
  return (
    <main>
      <Nav />
      <article className="mx-auto max-w-[1440px] px-6 pb-28 pt-32 md:px-12 md:pt-40 lg:px-20">
        <header className="max-w-3xl">
          <h1 className="display text-[3rem] text-ink md:text-[4.5rem]">
            Marketing for primary industries in New Zealand
          </h1>
          <p className="mt-7 max-w-[56ch] text-lg leading-[1.6] text-ink-2">
            Seafood, forestry, horticulture and processing operators rarely need more video. They
            need roles filled, the right buyers paying attention, or enquiries coming in. We pick
            the one outcome that moves your business, then run the campaign that gets it.
          </p>
          <CtaPair source="primary_hero" className="mt-9" />
        </header>

        <section className="mt-24 border-t rule-hair pt-16" aria-labelledby="sectors-heading">
          <h2 id="sectors-heading" className="display text-[2.25rem] text-ink md:text-[3rem]">
            Sectors
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {VERTICALS.map((v) => (
              <Link
                key={v.slug}
                href={v.path}
                className="group flex flex-col rounded-2xl bg-sheet-2 p-8 transition-colors duration-300 hover:bg-sheet-3"
              >
                <h3 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
                  {v.shortName}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.6] text-ink-2">{v.intro}</p>
                <span className="mt-6 inline-flex items-center gap-3 text-[0.9375rem] font-semibold text-signal">
                  More
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-24 border-t rule-hair pt-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="display text-[2.25rem] text-ink md:text-[3rem]">
            FAQ
          </h2>
          <div className="mt-10 divide-y divide-[var(--w-hair)]">
            {FAQS.map((f) => (
              <details key={f.question} className="group py-7">
                <summary className="cursor-pointer list-none text-lg font-semibold tracking-tight text-ink">
                  <span className="flex items-start justify-between gap-6">
                    {f.question}
                    <span className="mono-label shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-5 max-w-3xl text-[0.9375rem] leading-[1.75] text-ink-2">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-2xl bg-sheet-2 p-8 md:p-12">
          <h2 className="display max-w-[20ch] text-[2.25rem] text-ink md:text-[3rem]">
            Find out what would move the needle.
          </h2>
          <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-[1.7] text-ink-2">
            The free audit shows where your applications, enquiries or customers are coming from,
            and the one outcome worth going after first. Or just call.
          </p>
          <CtaPair source="primary_cta" className="mt-8" />
        </section>
      </article>

      <footer className="border-t rule-hair py-10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-4 px-6 md:px-12 lg:px-20">
          <TallyMark size={18} />
          <p className="font-mono text-[0.6875rem] leading-relaxed text-ink-2">
            <Link href="/" className="text-ink hover:text-ink-2">
              Tally
            </Link>
            . Primary industries marketing, New Zealand. © 2026 Tally.
          </p>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
