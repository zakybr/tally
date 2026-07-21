import Reveal from "@/components/Reveal";

type Row = { k: string; body: string };

const tables: { heading: string; rows: Row[] }[] = [
  {
    heading: "The miss clause, verbatim",
    rows: [
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
    rows: [
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
    rows: [
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

/* Spec-sheet risk tables: mono headers, thin amber rules, no marketing chrome. */
export default function MissClause() {
  return (
    <section className="pb-28 md:pb-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        {tables.map((table, ti) => (
          <Reveal key={table.heading} delay={ti * 0.05}>
            <div className={ti === 0 ? "" : "mt-20"}>
              <div className="mono-label border-t border-amber-dim pt-4 text-amber">
                {table.heading}
              </div>
              <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-14">
                {table.rows.map((row) => (
                  <div key={row.k}>
                    <div className="mono-label border-t border-hairline pt-4 text-ink">
                      {row.k}
                    </div>
                    <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ink-2">{row.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
