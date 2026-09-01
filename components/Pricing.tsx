import Reveal from "@/components/Reveal";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

const tiers = [
  {
    k: "Step 1 · Where everyone starts",
    name: "Proof",
    terms: "Fixed-scope sprint",
    body: "Eight weeks. One number, one audience, baseline agreed up front. Scoped to the operation in front of us, whether that is a season of charter bookings or a single roster that will not fill.",
    cta: { label: "Start the Proof", href: "/contact", primary: false },
  },
  {
    k: "Step 2 · Once it is working",
    name: "Engine",
    terms: "Monthly retainer",
    body: "Six-month minimum. The number held quarter after quarter and the guarantee re-set each cycle. This is where the whole online presence gets run rather than topped up.",
    cta: { label: "Talk to us about Engine", href: "/contact", primary: true },
  },
  {
    k: "Step 3 · Later",
    name: "Playbook",
    terms: "Licensed method",
    body: "The proven method, licensed to your team to run in-house. Opens once the sprint record exists to back it.",
    cta: { label: "Register interest", href: "/contact", primary: false },
  },
];

/* Spec-sheet pricing: machined, sharp-cornered, mono figures, no shadows. */
export default function Pricing() {
  return (
    <section id="pricing" className="py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <SectionHeader
          eyebrow="Pricing"
          title="Start small. Prove it. Then scale."
          note="Three steps, scoped to the outcome rather than the size of the business, with a guarantee that is never discounted. Figures are set in discovery once the target is agreed."
        />

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-px bg-hairline md:grid-cols-3">
            {tiers.map((t) => (
              <div key={t.name} className="flex flex-col bg-panel p-8 md:p-10">
                <div className="mono-label text-amber">{t.k}</div>
                <h3 className="mt-6 font-sans text-3xl font-semibold tracking-tight text-ink">
                  {t.name}
                </h3>
                <div className="mono-label mt-3 border-b border-hairline pb-6 text-ink-2">
                  {t.terms}
                </div>
                <p className="mt-6 flex-1 text-[0.9375rem] leading-[1.7] text-ink-2">{t.body}</p>
                <Link
                  href={t.cta.href}
                  className={`mono-label mt-10 inline-block self-start border px-5 py-3 transition-colors duration-300 ${
                    t.cta.primary
                      ? "border-amber bg-amber text-bg hover:bg-transparent hover:text-amber"
                      : "border-hairline text-ink hover:border-ink"
                  }`}
                >
                  {t.cta.label}
                </Link>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
