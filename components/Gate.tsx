import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

const qualify = [
  "There's a real, budgeted outcome to move: vacancies, reach, or enquiries",
  "A baseline exists, or you'll let us set one in discovery",
  "One decision-maker holds budget authority and a 48-hour response SLA",
  "The operation is sound; content amplifies it, not its flaws",
];

const pass = [
  'You want an output count; "X videos a month" is the old category',
  "There's no baseline and no intent to measure",
  "Known product or operational problems the content would expose",
  "You expect zero obligations on your side",
];

/* Two-column qualification checklist: amber check/cross marks, mono headers. */
export default function Gate() {
  return (
    <section id="qualify" className="pb-28 md:pb-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <SectionHeader
          eyebrow="The gate"
          title="We turn down most briefs"
          note="A guarantee only holds with the right clients. The strategic gate is the product protecting itself."
        />

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-px bg-hairline md:grid-cols-2">
            <div className="bg-panel p-8 md:p-10">
              <div className="mono-label border-b border-amber-dim pb-4 text-amber">
                You&apos;ll qualify if:
              </div>
              <ul className="mt-6 space-y-5">
                {qualify.map((item) => (
                  <li key={item} className="flex gap-4 text-[0.9375rem] leading-[1.7] text-ink-2">
                    <span className="mt-0.5 font-mono text-amber" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-panel p-8 md:p-10">
              <div className="mono-label border-b border-hairline pb-4 text-ink-2">
                We&apos;ll pass if:
              </div>
              <ul className="mt-6 space-y-5">
                {pass.map((item) => (
                  <li key={item} className="flex gap-4 text-[0.9375rem] leading-[1.7] text-ink-2">
                    <span className="mt-0.5 font-mono text-ink-2" aria-hidden="true">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
