import SectionHeader from "@/components/SectionHeader";

const qualify = [
  "There's a real outcome to move: vacancies, reach, enquiries or bookings",
  "A baseline exists, or you'll let us set one with you in discovery",
  "Someone can decide and come back to us inside 48 hours",
  "The operation is sound; content amplifies it, not its flaws",
];

const pass = [
  'You want an output count; "X videos a month" is the old category',
  "There's nothing to count and no intention to start counting",
  "Known product or operational problems the content would expose",
  "You expect zero obligations on your side",
];

/* Two-column qualification checklist: amber check/cross marks, mono headers. */
export default function Gate() {
  return (
    <section id="qualify" className="pb-28 md:pb-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <SectionHeader
          title="What makes a brief guaranteeable"
          note="Size is not the test. A guarantee only holds when there is something countable to guarantee, so this is what we look for before we put our fee behind your number."
        />

        <div>
          <div className="mt-14 grid gap-px bg-hairline md:grid-cols-2">
            <div className="bg-sheet-2 p-8 md:p-10">
              <div className="mono-label border-b rule-med pb-4 text-ink-3">
                You&apos;ll qualify if:
              </div>
              <ul className="mt-6 space-y-5">
                {qualify.map((item) => (
                  <li key={item} className="flex gap-4 text-[0.9375rem] leading-[1.7] text-ink-2">
                    <span className="mt-0.5 font-mono text-ink-3" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-sheet-2 p-8 md:p-10">
              <div className="mono-label border-b rule-hair pb-4 text-ink-2">
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
        </div>
      </div>
    </section>
  );
}
