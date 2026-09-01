import Link from "next/link";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import SectionHeader from "@/components/SectionHeader";

const steps = [
  {
    n: "01",
    title: "Agree the number",
    body: "Before anything is made we agree one business outcome and pull the baseline. Applications, reach, enquiries, bookings, or an asset set delivered to spec. Which number is yours to choose; both signatures go on it.",
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
          note="One outcome, chosen by you, agreed before we start, with our fee at risk against it. No one else in primary or marine will make that deal."
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

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-col gap-6 border-t border-hairline pt-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-[0.9375rem] leading-[1.7] text-ink-2">
              The miss clause is reproduced verbatim from the standard engagement contract, along
              with what voids it and who carries which risk.
            </p>
            <Link
              href="/guarantee"
              className="mono-label group inline-flex shrink-0 items-center gap-2.5 self-start border border-hairline px-6 py-3.5 text-ink transition-colors duration-300 hover:border-ink md:self-auto"
            >
              Read the full terms
              <Arrow
                size={14}
                className="shrink-0 text-amber transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
