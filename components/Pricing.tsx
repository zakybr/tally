import Section from "@/components/Section";
import Pill from "@/components/Pill";

const tiers = [
  {
    k: "Step 1 · Where everyone starts",
    name: "Proof",
    terms: "Fixed-scope sprint",
    body: "Eight weeks. One number, one audience, baseline agreed up front and scoped to the operation in front of us.",
    cta: { label: "Start the Proof", href: "/contact", primary: false },
  },
  {
    k: "Step 2 · Once it is working",
    name: "Engine",
    terms: "Monthly retainer",
    body: "Six-month minimum. The number held quarter after quarter, the guarantee re-set each cycle.",
    cta: { label: "Talk to us about Engine", href: "/contact", primary: true },
  },
  {
    k: "Step 3 · Later",
    name: "Playbook",
    terms: "Licensed method",
    body: "The method, licensed to your team to run in-house. Opens once the sprint record backs it.",
    cta: { label: "Register interest", href: "/contact", primary: false },
  },
];

/* Spec-sheet pricing: machined, sharp-cornered, mono figures, no shadows. */
export default function Pricing() {
  return (
    <Section id="pricing" tone="raised" labelledBy="pricing-heading">
        <div>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2
              id="pricing-heading"
              className="max-w-[16ch] text-balance font-sans text-[2rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink md:text-[2.75rem]"
            >
              Prove it first, then scale.
            </h2>
            <p className="max-w-[40ch] text-[0.9375rem] leading-[1.6] text-ink-2">
              Scoped to the outcome rather than the size of the business. Figures are set in discovery
              once the target is agreed.
            </p>
          </div>
        </div>

        <div>
          <div className="mt-16 grid gap-px bg-[var(--w-hair)] md:grid-cols-3">
            {tiers.map((t) => (
              <div key={t.name} className="flex flex-col bg-sheet p-7 md:p-8">
                <div className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3">
                  {t.k}
                </div>
                <h3 className="mt-5 font-sans text-2xl font-semibold tracking-[-0.02em] text-ink">
                  {t.name}
                </h3>
                <div className="mono-label mt-2 border-b rule-hair pb-5 text-ink-2">{t.terms}</div>
                <p className="mt-5 flex-1 text-[0.875rem] leading-[1.65] text-ink-2">{t.body}</p>
                <Pill
                  href={t.cta.href}
                  variant={t.cta.primary ? "solid" : "outline"}
                  size="sm"
                  className="mt-7 self-start"
                >
                  {t.cta.label}
                </Pill>
              </div>
            ))}
          </div>
        </div>
    </Section>
  );
}
