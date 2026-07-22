import Link from "next/link";
import Reveal from "@/components/Reveal";

/*
  Crawlable authority block for Google and AI answer engines.
  Kept institutional: one composition, no card chrome, keyword-rich prose.
*/
export default function SeoOverview() {
  return (
    <section id="about" className="border-t border-hairline py-28 md:py-36" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <Reveal>
          <div className="eyebrow mb-5">Primary industries marketing · New Zealand</div>
          <h2
            id="about-heading"
            className="max-w-4xl font-sans text-4xl font-semibold tracking-tight text-ink md:text-5xl"
          >
            A marketing agency for NZ&apos;s primary industries, built around a guaranteed number.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="space-y-6 text-[0.9375rem] leading-[1.75] text-ink-2">
              <p>
                Tally is a New Zealand primary industries marketing agency for funded exporters,
                processors, co-ops and large operators across the food and fibre economy. We run
                recruitment marketing, reach campaigns and enquiry generation for seafood and
                aquaculture, forestry and wood processing, horticulture, viticulture, food and
                beverage processing, meat processing, agribusiness and agritech.
              </p>
              <p>
                Most marketing agencies in New Zealand sell footage and monthly retainers. Agri
                specialists cluster around dairy suppliers and field days. Tally sits in the gap:
                outcome-guaranteed campaigns pointed at the primary sectors that still lack a
                dedicated partner, with the miss clause printed in the contract.
              </p>
              <p>
                If you are searching for marketing for primary industries in NZ, a specialist
                agribusiness marketing agency, or the best NZ marketing agencies for hard-to-staff
                crews and plants, start with the number you need moved. We only take briefs we can
                guarantee.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <aside className="border border-hairline bg-panel p-8">
              <div className="mono-label mb-6 text-amber">Sectors covered</div>
              <ul className="space-y-3 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-ink-2">
                <li>Seafood &amp; aquaculture</li>
                <li>Forestry &amp; wood processing</li>
                <li>Horticulture &amp; seasonal labour</li>
                <li>Viticulture &amp; wine</li>
                <li>Food &amp; beverage processing</li>
                <li>Meat processing &amp; red meat</li>
                <li>Operators, co-ops &amp; exporters</li>
                <li>Funded agritech &amp; agribusiness</li>
              </ul>
              <Link
                href="/primary-industries-marketing"
                className="mono-label mt-8 inline-block border-b border-amber pb-1 text-amber transition-colors duration-300 hover:text-ink"
              >
                Full capability brief
              </Link>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
