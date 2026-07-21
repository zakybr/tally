import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

const steps = [
  {
    n: "01",
    title: "Agree the number",
    body: "Before anything is made, we agree one business outcome (qualified applications, qualified reach, or qualified enquiries) and pull the baseline. In writing, both signatures.",
  },
  {
    n: "02",
    title: "We deliver, headless",
    body: "You don't manage creators, approve raw footage, or sit in production calls. You get one update a week: the current figure against target, in plain English. No decks.",
  },
  {
    n: "03",
    title: "Miss? We pay for it",
    body: "If the number isn't hit, we keep working at our cost, or the fee comes back. The miss clause is printed in the contract, not implied in the pitch.",
  },
];

/* Three-step mechanism: systems diagram, hairline connecting rail, amber numerals. */
export default function Guarantee() {
  return (
    <section id="guarantee" className="py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <SectionHeader
          eyebrow="The offer"
          title="How the guarantee works"
          note="One outcome, agreed before we start, with our fee at risk against it. No one else in primary will make that deal."
        />

        <Reveal delay={0.1}>
          <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-0">
            {/* Connecting rail */}
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-hairline md:block" />
            {steps.map((s) => (
              <div key={s.n} className="relative md:pr-14">
                <div className="relative inline-block bg-bg pr-4 font-mono text-5xl font-medium text-amber">
                  {s.n}
                </div>
                <h3 className="mt-6 font-sans text-xl font-semibold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-sm leading-[1.7] text-ink-2">{s.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
