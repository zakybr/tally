import Section from "@/components/Section";
import Pill from "@/components/Pill";
import Scoreboard from "@/components/Scoreboard";
import WeekStack from "@/components/WeekStack";

/*
  The mechanism, drawn twice: once as a dimension string across the eight weeks,
  once as the NOTES block that carries the binding conditions.

  A GA sheet states its conditions as numbered notes, and that is exactly the
  shape of a miss clause, which is why this direction was chosen. Tally has no
  results to show yet, so the contract itself has to do the trust work, and a
  numbered, dimensioned document is how this audience reads a commitment.
*/

const weeks = [
  {
    w: "00",
    title: "Agree the number",
    body: "You name one countable outcome. We pull the baseline and both signatures go on it before anything is made.",
  },
  {
    w: "01-03",
    title: "Capture on site",
    body: "We come to the boat, the yard, the orchard or the plant and shoot the real thing. You never manage a creator or sit in a production call.",
  },
  {
    w: "04",
    title: "Live",
    body: "The campaign runs. Variants are tested, the ones that do not work get cut, and budget moves to what converts.",
  },
  {
    w: "08",
    title: "The tally",
    body: "The delivered figure against the number agreed in week zero. If it is short, the miss clause decides what happens next, not a conversation.",
  },
];

const notes = [
  "The client names one countable outcome. Both parties sign it before production begins.",
  "Tally guarantees the creative, the targeting and the system that converts them. Sales are never guaranteed.",
  "A miss of 20% or less: work continues for 30 days at Tally's cost.",
  "A miss beyond 20%: fee credit or partial refund, per the engagement contract.",
  "Late assets or an operation that cannot carry the work void the guarantee. The contract names both.",
];

export default function Guarantee() {
  return (
    <Section id="guarantee" tone="well" labelledBy="guarantee-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-16">
        <div>
          <h2
            id="guarantee-heading"
            className="max-w-[20ch] text-balance font-sans text-[2rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink md:text-[2.75rem]"
          >
            How the guarantee works.
          </h2>
          <p className="mt-6 max-w-[46ch] text-[0.9375rem] leading-[1.6] text-ink-2">
            You choose one outcome. We agree it in writing before anything is made, and our fee
            sits behind it. You get the same report every week.
          </p>
        </div>

        {/* How an engagement reports. Illustrative format, labelled as such, Tally
            is pre-first-client and nothing here is presented as an achieved result. */}
        <div>
          <Scoreboard />
        </div>
      </div>

      {/* The eight weeks, walked rather than tabulated. */}
      <WeekStack weeks={weeks} />

      {/* NOTES: a drawing carries its binding conditions here, so the miss clause does too. */}
      <div>
        <div className="mt-24 grid gap-12 border-t rule-hair pt-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-20">
          <div>
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink">
              Notes
            </h3>
            <p className="mt-3 max-w-[30ch] text-[0.8125rem] leading-[1.6] text-ink-3">
              Reproduced from the standard engagement contract.
            </p>
            <Pill href="/guarantee" variant="outline" size="sm" className="mt-5">
              Read the full terms
            </Pill>
          </div>

          <ol className="notes space-y-5">
            {notes.map((n) => (
              <li
                key={n}
                className="max-w-[70ch] text-[0.875rem] leading-[1.65] text-ink-2"
              >
                {n}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
