import Image from "next/image";
import Reveal from "@/components/Reveal";
import termsImg from "@/public/images/terms-contract.jpg";

type Clause = { k: string; body: string };

const sections: { heading: string; clauses: Clause[] }[] = [
  {
    heading: "The miss clause, verbatim",
    clauses: [
      {
        k: "Miss by ≤20%",
        body: "Free 30-day extension. We keep working and absorb the delivery cost.",
      },
      {
        k: "Miss by >20%",
        body: "50% of the fee credited to the next engagement, or a partial refund within 14 days.",
      },
      {
        k: "Client-attributable",
        body: "Operational failure, no asset access, tracking not live by the agreed date: guarantee voided, named explicitly in the contract. Fair both ways.",
      },
    ],
  },
  {
    heading: "Who carries what",
    clauses: [
      {
        k: "We absorb",
        body: "Delivery risk. If we miss, we keep working out of our own pocket. That's the deal.",
      },
      {
        k: "You absorb",
        body: "Operational risk. Content amplifies your operation; it can't fix it. A broken product or workplace voids the guarantee.",
      },
      {
        k: "Spend stays yours",
        body: "Where paid media runs, it runs through your account, separate from our fee and transparent to the dollar.",
      },
    ],
  },
  {
    heading: "What voids the guarantee",
    clauses: [
      {
        k: "Late assets",
        body: "Everything on the asset checklist lands by end of week two, or the guarantee clock doesn't start. Each day of delay is excluded from our responsibility.",
      },
      {
        k: "Broken operation",
        body: "If discovery surfaces structural product or workplace issues that content would amplify, we say so and stop before taking the fee.",
      },
      {
        k: "Scope creep",
        body: "The brief freezes at the end of week one. Change the audience, channel or role mid-sprint and the clock resets; the guarantee is built on a specific hypothesis.",
      },
    ],
  },
];

/*
  Guarantee terms rendered as a contract exhibit: document reference header,
  numbered clauses on a hairline grid. Palantir/Anduril dossier treatment,
  built to read cleanly in a procurement pack.
*/
export default function MissClause() {
  return (
    <section id="terms" className="pb-28 md:pb-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <Reveal>
          <div className="border border-hairline bg-panel">
            {/* Document reference bar */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-hairline px-6 py-4 md:px-10">
              <span className="mono-label text-amber">Tally · Guarantee terms</span>
              <span className="mono-label hidden text-ink-2 sm:inline">Doc TLY-GTE-01</span>
              <span className="mono-label hidden text-ink-2 md:inline">Rev 2026.07</span>
              <span className="mono-label ml-auto text-ink-2">
                Status · <b className="font-medium text-amber">Binding</b>
              </span>
            </div>

            {/* Graded banner. PLACEHOLDER IMAGERY: AI-generated stand-in; swap for real contract photography. */}
            <figure className="relative h-44 overflow-hidden border-b border-hairline md:h-56">
              <Image
                src={termsImg}
                alt="Contract documents and technical specification sheets on a steel table"
                fill
                placeholder="blur"
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="img-grade object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,10,0.85)] via-[rgba(11,11,10,0.25)] to-transparent" />
              <figcaption className="mono-label absolute bottom-4 left-6 text-ink md:left-10">
                Printed in the contract · Not implied in the pitch
              </figcaption>
            </figure>

            {/* Numbered clause sections */}
            {sections.map((section, si) => (
              <div
                key={section.heading}
                className="grid border-b border-hairline last:border-b-0 md:grid-cols-[300px_1fr]"
              >
                {/* Section rail */}
                <div className="border-b border-hairline p-6 md:border-b-0 md:border-r md:p-10">
                  <div className="font-mono text-3xl font-medium text-amber">
                    {String(si + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 font-sans text-xl font-semibold leading-snug tracking-tight text-ink">
                    {section.heading}
                  </h3>
                </div>

                {/* Clauses */}
                <div className="divide-y divide-hairline">
                  {section.clauses.map((clause, ci) => (
                    <div
                      key={clause.k}
                      className="grid gap-3 p-6 md:grid-cols-[180px_1fr] md:gap-8 md:p-8"
                    >
                      <div>
                        <div className="font-mono text-xs text-ink-2">
                          {String(si + 1).padStart(2, "0")}.{ci + 1}
                        </div>
                        <div className="mono-label mt-2 text-ink">{clause.k}</div>
                      </div>
                      <p className="max-w-2xl text-[0.9375rem] leading-[1.7] text-ink-2">
                        {clause.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Document footer */}
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-hairline px-6 py-4 md:px-10">
              <span className="font-mono text-[0.6875rem] leading-relaxed text-ink-2">
                Extract reproduced verbatim from the standard engagement contract.
              </span>
              <span className="mono-label text-ink-2">Page 1 of 1</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
