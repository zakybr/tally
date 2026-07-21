import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

/* Two-column editorial section: dense institutional prose, no cards. */
export default function AccountabilityGap() {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <SectionHeader
          eyebrow="Why this exists"
          title="The accountability gap"
          note="Every agency in this category sells the same thing: empathy and footage, billed monthly. The content looks good. Whether it moved the needle is your problem."
        />

        <Reveal delay={0.1}>
          <p className="mt-14 max-w-4xl font-sans text-2xl font-medium leading-[1.45] tracking-tight text-ink md:text-3xl">
            We sit in the intersection. The only primary-sector partner in NZ that guarantees the
            outcome, pointed at the sectors and operators no specialist serves. A different
            category, a different conversation.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 grid gap-12 border-t border-hairline pt-12 md:grid-cols-2 md:gap-20">
            <div>
              <div className="mono-label mb-4 text-amber">Gap 1 · Accountability</div>
              <h3 className="font-sans text-xl font-semibold tracking-tight text-ink">
                Everyone bills for production
              </h3>
              <p className="mt-4 leading-[1.7] text-ink-2">
                Sector empathy is table stakes now, not a differentiator. Agencies re-invoice every
                month, report outputs, and call it done. Nobody guarantees a business outcome.
              </p>
            </div>
            <div>
              <div className="mono-label mb-4 text-amber">Gap 2 · Sector</div>
              <h3 className="font-sans text-xl font-semibold tracking-tight text-ink">
                The specialists cluster in dairy
              </h3>
              <p className="mt-4 leading-[1.7] text-ink-2">
                Dedicated agencies serve farming and agri-suppliers. Seafood, forestry,
                horticulture at scale and food processing (all budget-rich and content-starved)
                have no dedicated partner at all.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
