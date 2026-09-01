import Reveal from "@/components/Reveal";
import SectorRegister from "@/components/SectorRegister";

/*
  Crawlable authority block for Google and AI answer engines.
  Composed as a document rather than an article-plus-sidebar: masthead rule,
  a claim set against its argument, then the coverage register underneath.
*/
export default function SeoOverview() {
  return (
    <section id="about" className="border-t border-hairline py-24 md:py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-hairline pb-5">
            <span className="eyebrow">Primary industries &amp; marine marketing · New Zealand</span>
            <span className="mono-label text-ink-2">Food &amp; fibre economy</span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-y-10 lg:grid-cols-12 lg:gap-x-16 md:mt-16">
          <Reveal className="lg:col-span-5">
            <h2
              id="about-heading"
              className="font-sans text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.03em] text-balance text-ink md:text-5xl"
            >
              A marketing agency for NZ&apos;s primary and marine industries, built around a guaranteed number.
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <div className="max-w-[66ch] space-y-6 text-[0.9375rem] leading-[1.75] text-ink-2">
              <p>
                Tally is a New Zealand primary industries and marine marketing agency working with
                exporters, processors, co-ops, operators and owner-run businesses across the food
                and fibre economy. We run brand and reach strategy, recruitment marketing, enquiry
                generation and booking campaigns for seafood and aquaculture, boat building and
                fishing charter, forestry and wood processing, horticulture, viticulture, food and
                beverage processing, meat processing, agribusiness and agritech.
              </p>
              <p>
                Most marketing agencies in New Zealand sell footage and monthly retainers. Agri
                specialists cluster around dairy suppliers and field days. Tally sits in the gap:
                outcome-guaranteed campaigns pointed at the primary and marine sectors that still
                lack a dedicated partner, with the miss clause printed in the contract. The
                engagement can be a single day of capture or the whole online presence run for you;
                either way it opens with an agreed number.
              </p>
              <p>
                If you are searching for marketing for primary industries in NZ, a marine or
                fishing charter marketing agency, a specialist agribusiness marketing agency, or
                the best NZ marketing agencies for hard-to-staff crews, yards and plants, start
                with the number you need moved. Size is not the test; a countable outcome is. We
                only take briefs we can guarantee.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 md:mt-24">
          <SectorRegister />
        </div>
      </div>
    </section>
  );
}
