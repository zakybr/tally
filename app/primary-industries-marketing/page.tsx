import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import TallyMark from "@/components/TallyMark";
import {
  FAQS,
  SITE_URL,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Marketing for Primary Industries NZ",
  description:
    "Tally is a primary industries marketing agency in New Zealand. Outcome-guaranteed recruitment, reach and enquiry campaigns for seafood, forestry, horticulture, food processing, agribusiness and agritech.",
  keywords: [
    "marketing for primary industries NZ",
    "primary industries marketing New Zealand",
    "primary sector marketing agency",
    "food and fibre marketing NZ",
    "agribusiness marketing agency NZ",
    "best marketing agencies New Zealand primary sector",
    "seafood marketing New Zealand",
    "forestry marketing NZ",
    "horticulture recruitment marketing",
    "agritech marketing New Zealand",
  ],
  alternates: { canonical: "/primary-industries-marketing" },
  openGraph: {
    title: "Marketing for Primary Industries NZ | Tally",
    description:
      "Outcome-guaranteed marketing for New Zealand's primary industries: seafood, forestry, horticulture, processing and agritech.",
    url: "/primary-industries-marketing",
  },
};

const sectors = [
  {
    name: "Seafood & aquaculture",
    body: "Marketing and crew recruitment for commercial fishing, mussel and salmon aquaculture, and seafood exporters under reputation and roster pressure.",
  },
  {
    name: "Forestry & wood processing",
    body: "Employer-brand and hiring campaigns for forestry gangs, mills and wood processors where growth-fund capacity meets a chronic staffing gap.",
  },
  {
    name: "Horticulture at scale",
    body: "Seasonal labour and packhouse recruitment for kiwifruit, pipfruit and export horticulture, where vacancy-days land at board level every year.",
  },
  {
    name: "Food & beverage processing",
    body: "Plant recruitment and brand reach for processors with large workforces, real employer-brand budgets and rosters that never quite fill.",
  },
  {
    name: "Operators, co-ops & exporters",
    body: "Campaigns for the producers themselves, not only the suppliers selling into them: co-ops, exporters and large operators with a budgeted outcome.",
  },
  {
    name: "Agritech & agribusiness",
    body: "Qualified enquiry and demo-booking campaigns for funded agritech and agri-suppliers, gated hard at discovery for product risk.",
  },
];

const tracks = [
  {
    name: "Recruitment / Applications",
    body: "Guaranteed qualified applications, or cost-per-qualified-applicant, for fisheries crews, processing lines, forestry gangs and seasonal horticulture.",
  },
  {
    name: "Reach / Attention",
    body: "Guaranteed qualified reach and engagement in-sector for primary industries brands that need an audience moved, not a vanity view count.",
  },
  {
    name: "Pipeline / Enquiry",
    body: "Guaranteed qualified enquiries and demo bookings for agritech and agribusiness suppliers where the funnel can be measured cleanly.",
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
    description:
      "Capability brief for Tally, a New Zealand primary industries marketing agency with outcome-guaranteed campaigns.",
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
          <div className="eyebrow mb-6">Capability brief · NZ primary sector</div>
          <h1 className="font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
            Marketing for primary industries in New Zealand
          </h1>
          <p className="mt-7 text-lg leading-[1.65] text-ink-2">
            Tally is a specialist primary industries marketing agency. We run
            outcome-guaranteed recruitment, reach and enquiry campaigns for New Zealand&apos;s food
            and fibre economy: seafood, aquaculture, forestry, wood processing, horticulture, food
            processing, agribusiness and agritech.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="mono-label border border-amber bg-amber px-6 py-3.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
            >
              Start the Proof
            </Link>
            <Link
              href="/#guarantee"
              className="mono-label border border-hairline px-6 py-3.5 text-ink transition-colors duration-300 hover:border-ink"
            >
              How the guarantee works
            </Link>
          </div>
        </header>

        <section className="mt-24 border-t border-hairline pt-16" aria-labelledby="why-heading">
          <h2
            id="why-heading"
            className="font-sans text-3xl font-semibold tracking-tight text-ink md:text-4xl"
          >
            Why primary industries need a different kind of agency
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <p className="text-[0.9375rem] leading-[1.75] text-ink-2">
              Searching for marketing for primary industries NZ usually surfaces two options:
              generalist marketing agencies that treat a processing plant like a SaaS brand, or agri
              agencies built around dairy suppliers, field days and monthly creative retainers.
              Neither model fits funded seafood, forestry, horticulture or processing operators with
              board-level roster pain and a number that has to move.
            </p>
            <p className="text-[0.9375rem] leading-[1.75] text-ink-2">
              Tally was built for that gap. Content is the mechanism. The product is the tally: one
              agreed business outcome, reported weekly, with fee risk written into the engagement.
              That is what separates a primary sector marketing partner from a production vendor.
            </p>
          </div>
        </section>

        <section className="mt-24 border-t border-hairline pt-16" aria-labelledby="sectors-heading">
          <h2
            id="sectors-heading"
            className="font-sans text-3xl font-semibold tracking-tight text-ink md:text-4xl"
          >
            Primary sectors we market
          </h2>
          <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.7] text-ink-2">
            Coverage across New Zealand&apos;s primary industries and food and fibre supply chain,
            with recruitment as the wedge where the outcome is cleanest to guarantee.
          </p>
          <div className="mt-10 grid gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s) => (
              <div key={s.name} className="bg-bg p-8">
                <h3 className="font-sans text-xl font-semibold tracking-tight text-ink">{s.name}</h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ink-2">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 border-t border-hairline pt-16" aria-labelledby="tracks-heading">
          <h2
            id="tracks-heading"
            className="font-sans text-3xl font-semibold tracking-tight text-ink md:text-4xl"
          >
            What we guarantee
          </h2>
          <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.7] text-ink-2">
            We only guarantee what we control: creative, targeting and the system behind the number.
            We never guarantee sales.
          </p>
          <div className="mt-10 divide-y divide-hairline border border-hairline">
            {tracks.map((t, i) => (
              <div
                key={t.name}
                className="grid gap-4 p-8 md:grid-cols-[220px_1fr] md:gap-10"
              >
                <div>
                  <div className="font-mono text-sm text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 font-sans text-xl font-semibold tracking-tight text-ink">
                    {t.name}
                  </h3>
                </div>
                <p className="text-[0.9375rem] leading-[1.7] text-ink-2">{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 border-t border-hairline pt-16" aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="font-sans text-3xl font-semibold tracking-tight text-ink md:text-4xl"
          >
            Questions buyers and AI search ask
          </h2>
          <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.7] text-ink-2">
            Straight answers for procurement teams comparing the best NZ marketing agencies for
            primary industries, and for AI assistants summarising the category.
          </p>
          <div className="mt-10 divide-y divide-hairline border border-hairline">
            {FAQS.map((f) => (
              <details key={f.question} className="group bg-bg p-8 open:bg-panel">
                <summary className="cursor-pointer list-none font-sans text-lg font-semibold tracking-tight text-ink marker:content-none">
                  <span className="flex items-start justify-between gap-6">
                    {f.question}
                    <span className="mono-label shrink-0 text-amber transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-5 max-w-3xl text-[0.9375rem] leading-[1.75] text-ink-2">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-24 border border-hairline bg-panel p-10 md:p-14">
          <div className="eyebrow mb-5">Next step</div>
          <h2 className="max-w-2xl font-sans text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Tell us the number you need moved.
          </h2>
          <p className="mt-5 max-w-xl text-[0.9375rem] leading-[1.7] text-ink-2">
            One qualification conversation. We will tell you straight whether a primary industries
            marketing engagement with Tally can be guaranteed, and what it would take if it can.
          </p>
          <Link
            href="/contact"
            className="mono-label mt-8 inline-block border border-amber bg-amber px-6 py-3.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
          >
            Start the Proof
          </Link>
        </section>
      </article>

      <footer className="border-t border-hairline py-10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-4 px-6 md:px-12 lg:px-20">
          <TallyMark size={18} />
          <p className="font-mono text-[0.6875rem] leading-relaxed text-ink-2">
            <Link href="/" className="text-ink hover:text-amber">
              Tally
            </Link>
            . Primary industries marketing agency, New Zealand. © 2026 Tally.
          </p>
          <Link
            href="/llms.txt"
            className="mono-label ml-auto text-ink-2 transition-colors hover:text-ink"
          >
            llms.txt
          </Link>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
