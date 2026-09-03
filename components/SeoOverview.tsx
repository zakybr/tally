import Section from "@/components/Section";
import Pill from "@/components/Pill";
import SectorRegister from "@/components/SectorRegister";

/*
  Coverage register. The sector cards left the homepage for their own pages
  behind the header dropdown; what stays is the register, a finite, complete
  table of what Tally covers and which number it guarantees per sector.

  A register is the right shape for a sheet and the right shape for a crawler:
  structured, scannable, and readable by an answer engine without prose.
*/
export default function SeoOverview() {
  return (
    <Section id="coverage" tone="sheet" labelledBy="coverage-heading">
      <div>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            id="coverage-heading"
            className="max-w-[18ch] text-balance font-sans text-[2rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink md:text-[2.75rem]"
          >
            What we cover, and the number we guarantee.
          </h2>
          <div className="max-w-[40ch]">
            <p className="text-[0.9375rem] leading-[1.6] text-ink-2">
              Most agencies here sell footage and retainers. The agri specialists work with dairy.
              Tally covers the primary and marine operators that neither of them do.
            </p>
            <Pill href="/about" variant="ghost" size="sm" className="mt-4 -ml-4">
              How we work
            </Pill>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <SectorRegister />
      </div>
    </Section>
  );
}
