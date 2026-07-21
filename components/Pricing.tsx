import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

const tiers = [
  {
    k: "Step 1 · Qualifier",
    name: "Proof",
    price: "$12–18k fixed",
    body: "8 weeks. One role family, one site, baseline agreed up front. The sprint that earns the roster.",
    cta: { label: "See what qualifies", href: "#qualify", primary: false },
  },
  {
    k: "Step 2 · Retained",
    name: "Engine",
    price: "$8–15k / month",
    body: "6-month minimum. The roster held quarter after quarter, guarantee re-set each cycle.",
    cta: { label: "Start the Proof", href: "#contact", primary: true },
  },
  {
    k: "Step 3 · Later",
    name: "Playbook",
    price: "Per sub-sector",
    body: "The proven method, licensed. Opens once the sprint record exists to back it.",
    cta: { label: "Register interest", href: "#contact", primary: false },
  },
];

/* Spec-sheet pricing: machined, sharp-cornered, mono figures, no shadows. */
export default function Pricing() {
  return (
    <section id="pricing" className="py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <SectionHeader
          eyebrow="Pricing"
          title="The ladder"
          note="Fixed fees, tabular figures, and a guarantee that is never discounted."
        />

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-px bg-hairline md:grid-cols-3">
            {tiers.map((t) => (
              <div key={t.name} className="flex flex-col bg-panel p-8 md:p-10">
                <div className="mono-label text-amber">{t.k}</div>
                <h3 className="mt-6 font-sans text-3xl font-semibold tracking-tight text-ink">
                  {t.name}
                </h3>
                <div className="mt-2 border-b border-hairline pb-6 font-mono text-xl tabular-nums text-ink">
                  {t.price}
                </div>
                <p className="mt-6 flex-1 text-[0.9375rem] leading-[1.7] text-ink-2">{t.body}</p>
                <a
                  href={t.cta.href}
                  className={`mono-label mt-10 inline-block self-start border px-5 py-3 transition-colors duration-300 ${
                    t.cta.primary
                      ? "border-amber bg-amber text-bg hover:bg-transparent hover:text-amber"
                      : "border-hairline text-ink hover:border-ink"
                  }`}
                >
                  {t.cta.label}
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
