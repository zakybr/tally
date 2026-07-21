import CapabilityCard from "@/components/CapabilityCard";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import sectorSeafood from "@/public/images/sector-seafood.jpg";
import sectorForestry from "@/public/images/sector-forestry.jpg";
import sectorHorticulture from "@/public/images/sector-horticulture.jpg";
import sectorProcessing from "@/public/images/sector-processing.jpg";
import sectorOperators from "@/public/images/sector-operators.jpg";
import sectorAgritech from "@/public/images/sector-agritech.jpg";

/* PLACEHOLDER IMAGERY: AI-generated stand-ins graded to spec. Swap per sector as capture lands. */
const sectors = [
  {
    image: sectorSeafood,
    alt: "Mussel farm lines stretching across still water at dawn",
    name: "Seafood & aquaculture",
    subhead:
      "~$650M in exports to 81 countries. Zero dedicated marketing specialist. Under pressure on reputation and recruitment.",
  },
  {
    image: sectorForestry,
    alt: "Loaded logging truck on a gravel forestry road at dusk",
    name: "Forestry & wood processing",
    subhead:
      "Funded, corporate, under-serviced. Growth-fund money meets a hiring problem nobody's telling well.",
  },
  {
    image: sectorHorticulture,
    alt: "Kiwifruit orchard canopy rows in dawn fog",
    name: "Horticulture at scale",
    subhead:
      "Export-premium driven, with seasonal labour pain that lands at board level every single year.",
  },
  {
    image: sectorProcessing,
    alt: "Stainless silos and pipework of a processing facility at night",
    name: "Waste & Manufacturing",
    subhead: "Large workforces, real employer-brand budgets, rosters that never quite fill.",
  },
  {
    image: sectorOperators,
    alt: "Fishing fleet tied up at an industrial wharf before dawn",
    name: "Operators & co-ops",
    subhead: "The producers themselves, not just the suppliers selling into them.",
  },
  {
    image: sectorAgritech,
    alt: "Autonomous agricultural rover rim-lit in a dark field",
    name: "Funded agritech",
    subhead:
      "The classic agency roster, sold with the accountability the classic agencies don't offer.",
  },
];

export default function SectorsGrid() {
  return (
    <section id="sectors" className="py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <SectionHeader
          eyebrow="Who it's for"
          title="The primary sector no one serves"
          note="Funded exporters, co-ops, processors and large operators: not the $5k family operation, and not another dairy-supplier roster."
        />
      </div>

      <Reveal className="mt-14">
        <div className="grid grid-cols-1 gap-px border-y border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <CapabilityCard
              key={s.name}
              image={s.image}
              imageAlt={s.alt}
              label={`SECTOR ${String(i + 1).padStart(2, "0")}`}
              name={s.name}
              subhead={s.subhead}
            />
          ))}
        </div>
      </Reveal>

      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <Reveal delay={0.1}>
          <p className="mt-12 max-w-3xl border-l-2 border-amber pl-6 font-sans text-lg font-medium leading-[1.6] text-ink">
            The wedge is recruitment. Hard-to-staff rosters are board-level pain: measurable in
            applications, cost-per-hire and vacancy-days, and guarantee-able because we own the
            creative and the targeting. Win the roster, earn the brand.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
