import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

const phases = [
  { n: "01", title: "Strategic gate", body: "We turn down briefs we can't guarantee. Most don't pass." },
  { n: "02", title: "Discovery", body: "Baseline pulled and agreed in writing. Target locked, brief frozen." },
  { n: "03", title: "Production", body: "On-the-ground capture with sector-native talent. No staged content." },
  { n: "04", title: "Deployment", body: "Live by week four. Variants tested, underperformers cut, budget shifts to winners." },
  { n: "05", title: "Debrief", body: "Target versus delivered, translated into dollars, and what we'd do differently. Honest." },
];

const comms = [
  "One number a week: a figure against target and a plain-English read of what's driving it.",
  "Behind trajectory by week five? You hear it from us within 48 hours, never from a failing funnel.",
  "No process access. You hold us to the number, not the workflow. That's a feature.",
];

/* Five-step horizontal rail with amber-bordered comm annotations beneath. */
export default function Method() {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <SectionHeader
          eyebrow="The method"
          title="Eight weeks. One number."
          note="Real on-boat, on-farm, in-plant capture, run through a controlled system that never needs your time."
        />

        <Reveal delay={0.1}>
          <div className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-0">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-hairline md:block" />
            {phases.map((p) => (
              <div key={p.n} className="relative md:pr-10">
                <div className="relative inline-block bg-bg pr-3 font-mono text-4xl font-medium text-amber">
                  {p.n}
                </div>
                <h3 className="mt-5 font-sans text-lg font-semibold tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-ink-2">{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 grid gap-px bg-hairline md:grid-cols-3">
            {comms.map((c) => (
              <div key={c} className="border-t-2 border-t-amber bg-panel p-6">
                <p className="text-sm leading-[1.7] text-ink-2">
                  <span className="mono-label mr-2 text-amber">REPORTING</span>
                  {c}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
