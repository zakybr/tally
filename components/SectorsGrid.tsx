import Link from "next/link";
import CapabilityCard from "@/components/CapabilityCard";
import Arrow from "@/components/Arrow";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import sectorSeafood from "@/public/images/sector-seafood.jpg";
import sectorForestry from "@/public/images/sector-forestry.jpg";
import sectorHorticulture from "@/public/images/sector-horticulture.jpg";
import sectorProcessing from "@/public/images/sector-processing.jpg";
import sectorMarine from "@/public/images/sector-operators.jpg";
import sectorOperators from "@/public/images/work-plant.jpg";
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
    image: sectorMarine,
    alt: "Fishing fleet tied up at an industrial wharf before dawn",
    name: "Marine, boats & charter",
    subhead:
      "Boat builders and refit yards hiring against construction wages, and charter operators whose whole year turns on one booking window.",
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
    alt: "Steam rising over a stainless steel processing line",
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
          title="The sectors no one else serves"
          note="From a two-boat charter operation up to a funded exporter. What we need is a number worth moving and an operation that can carry the attention, not a particular size of business."
        />
      </div>

      <Reveal className="mt-14">
        <div className="grid grid-cols-1 gap-px border-y border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s) => (
            <CapabilityCard
              key={s.name}
              image={s.image}
              imageAlt={s.alt}
              label="SECTOR"
              name={s.name}
              subhead={s.subhead}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ))}

          {/* Eighth cell squares the grid and points the ones we have not named at the form. */}
          <Link
            href="/contact"
            className="group/cap relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-bg md:aspect-[3/4]"
          >
            <div className="hatch absolute inset-0 bg-panel" />
            <span className="mono-label absolute left-6 top-6 text-amber">Not listed</span>
            <div className="relative p-6 pb-7 md:p-8">
              <h3 className="font-sans text-[2rem] font-semibold leading-tight tracking-tight text-ink md:text-[1.75rem]">
                Your sector
              </h3>
              <p className="mt-3 max-w-md text-sm leading-[1.6] text-ink-2">
                If the number can be counted, the brief is worth a conversation. Tell us what you
                need moved and we will tell you straight whether we can guarantee it.
              </p>
              <span className="mono-label mt-6 inline-flex items-center gap-2 text-amber">
                Start the Proof
                <Arrow
                  size={14}
                  className="shrink-0 transition-transform duration-300 ease-out group-hover/cap:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </div>
      </Reveal>

      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <Reveal delay={0.1}>
          <p className="mt-12 max-w-3xl border-l-2 border-amber pl-6 font-sans text-lg font-medium leading-[1.6] text-ink">
            Recruitment is the sharpest wedge, because vacancy-days and cost-per-hire are already
            counted. But the same machinery fills a charter season or builds a name from nothing. If
            the number can be counted, it can be agreed. If it can be agreed, we will carry it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
