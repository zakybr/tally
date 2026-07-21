import CapabilityCard from "@/components/CapabilityCard";
import Reveal from "@/components/Reveal";
import trackReach from "@/public/images/track-reach.jpg";
import trackRecruitment from "@/public/images/track-recruitment.jpg";
import trackPipeline from "@/public/images/track-pipeline.jpg";

/* PLACEHOLDER IMAGERY: AI-generated stand-ins graded to spec. Swap for commissioned capture. */
export default function TracksGrid() {
  return (
    <section className="pb-28 md:pb-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <Reveal>
          <h3 className="max-w-2xl font-sans text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Three tracks. We only guarantee what we control.
          </h3>
        </Reveal>
      </div>

      {/* Full-bleed edge-to-edge, hairline dividers, cards butt together. */}
      <Reveal className="mt-12">
        <div className="grid grid-cols-1 gap-px border-y border-hairline bg-hairline md:grid-cols-3">
          <CapabilityCard
            image={trackReach}
            imageAlt="Crew member silhouetted against low sun at sea"
            label="TRACK"
            name="Reach / Attention"
            subhead="Guaranteed qualified reach and engagement in-sector. For anyone with an audience to move. We choose the creators, hooks and formats; every creative variable is ours."
          />
          <CapabilityCard
            image={trackRecruitment}
            imageAlt="Forestry crew in hi-vis walking through dawn mist"
            label="TRACK · FLAGSHIP"
            name="Recruitment / Applications"
            subhead="Guaranteed qualified applications, or cost-per-qualified-applicant. Fisheries crews, processing lines, forestry gangs, seasonal horticulture. Clean numbers, budgeted pain."
          />
          <CapabilityCard
            image={trackPipeline}
            imageAlt="Industrial agricultural drone rim-lit in a dark field"
            label="TRACK"
            name="Pipeline / Enquiry"
            subhead="Guaranteed qualified enquiries and demo bookings for agritech and agri-suppliers. Measurable, and gated hard at discovery for product risk."
          />
        </div>
      </Reveal>

      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <Reveal delay={0.1}>
          <p className="mt-12 max-w-3xl border-l-2 border-amber pl-6 font-sans text-lg font-medium leading-[1.6] text-ink">
            We never guarantee sales. We guarantee what we control: creative, targeting, and the
            system that turns them into your number.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
