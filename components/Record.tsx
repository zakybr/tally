import CapabilityCard from "@/components/CapabilityCard";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

const slots = [
  {
    label: "Seafood · Recruitment",
    body: "Qualified applications, guaranteed vs delivered. Reserved for Proof #1.",
  },
  {
    label: "Forestry · Recruitment",
    body: "Cost-per-qualified-applicant against the recruiter-fee baseline. Reserved for Proof #2.",
  },
  {
    label: "Horticulture · Reach",
    body: "Qualified in-sector reach against the season baseline. Reserved for Proof #3.",
  },
];

/* Reserved case-film slots: locked CapabilityCards until real tallies exist. */
export default function Record() {
  return (
    <section id="record" className="py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <SectionHeader
          eyebrow="The record"
          title="Published tallies"
          note="Every Proof ends in a debrief report: target versus delivered, translated into dollars, and what we'd do differently. The first ones land here with real numbers. No competitor will ever publish theirs."
        />
      </div>

      <Reveal className="mt-14">
        <div className="grid grid-cols-1 gap-px border-y border-hairline bg-hairline md:grid-cols-3">
          {slots.map((s, i) => (
            <CapabilityCard
              key={s.label}
              reserved
              label={s.label}
              name={`Case film slot ${String(i + 1).padStart(2, "0")}`}
              metric="TBC"
              body={s.body}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
