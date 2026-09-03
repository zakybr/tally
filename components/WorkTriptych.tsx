"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import SectionHeader from "@/components/SectionHeader";
import Arrow from "@/components/Arrow";
import workBoat from "@/public/images/work-boat.jpg";
import workPlant from "@/public/images/work-plant.jpg";
import workFarm from "@/public/images/work-farm.jpg";

/*
  PLACEHOLDER IMAGERY: AI-generated stand-ins graded to spec. Swap for
  live-sprint capture. Nothing here is captioned as delivered client work, and
  nothing should be until real capture exists: Tally is pre-first-client.

  Three cards, collapsed by default. The detail is what capture actually
  involves in each setting, which a buyer wants only once they are interested,
  so it stays behind a click and the page stays short.
*/

type Frame = {
  img: StaticImageData;
  place: string;
  lede: string;
  detail: string[];
  alt: string;
};

const frames: Frame[] = [
  {
    img: workBoat,
    place: "On the boat",
    lede: "Commercial vessels, charter operations and the wharf either side of a trip.",
    detail: [
      "We work the vessel's schedule, not ours. Capture happens around a real trip, on the steam out and the steam back, rather than a staged day that costs you a working one.",
      "Crew who do not want to be filmed are not filmed. What carries a recruitment campaign is the work and the conditions, not faces.",
      "Everything shot is yours outright, licensed with no expiry and no per-use fee.",
    ],
    alt: "Deck winch and nets on a commercial fishing boat at sea",
  },
  {
    img: workPlant,
    place: "In the plant",
    lede: "Processing floors, packhouses, engineering shops and refit yards.",
    detail: [
      "Site induction, PPE and food-safety rules are treated as the constraint they are. We plan the shoot around your compliance requirements before we arrive.",
      "Line stoppages are the expensive part of plant capture, so we shoot around running production wherever the shot allows it.",
      "Shift and roster campaigns need the work shown honestly. An applicant who is surprised on day one leaves in week two.",
    ],
    alt: "Steam over a stainless processing line",
  },
  {
    img: workFarm,
    place: "On the farm",
    lede: "Orchards, blocks, forestry gangs and the machinery that works them.",
    detail: [
      "Seasonal work has a window. Capture is booked against your season, not the calendar, which is why the sprint starts eight weeks before you need the result.",
      "Machinery and gang work are filmed at a distance that keeps everyone safe and still reads on a phone screen.",
      "The same library feeds recruitment, reach and enquiry campaigns rather than being shot three separate times.",
    ],
    alt: "Forestry loader working in dawn mist",
  },
];

export default function WorkTriptych() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <SectionHeader
          title="On the boat. In the plant. On the farm."
          note="Operators spot staged content instantly, so we shoot where the work happens."
        />

        <div className="mt-14 grid grid-cols-1 gap-px bg-[var(--w-hair)] md:grid-cols-3">
          {frames.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.alt} className="flex flex-col bg-sheet">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={f.img}
                    alt={f.alt}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-[0.55] [filter:grayscale(55%)_contrast(1.1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sheet via-sheet/45 to-transparent" />
                  <h3 className="absolute bottom-6 left-6 right-6 font-sans text-2xl font-semibold tracking-[-0.02em] text-ink">
                    {f.place}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="text-[0.9375rem] leading-[1.6] text-ink-2">{f.lede}</p>

                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`frame-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="mono-label mt-5 inline-flex items-center gap-2 self-start text-ink-3 transition-colors hover:text-ink"
                  >
                    {isOpen ? "Less" : "How it works"}
                    <Arrow
                      size={13}
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? "-rotate-90" : "rotate-90"
                      }`}
                    />
                  </button>

                  {/* Grid-rows trick: animates to the content's own height without
                      measuring it, and collapses to nothing when closed. */}
                  <div
                    id={`frame-${i}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="mt-5 space-y-3.5 border-t rule-hair pt-5">
                        {f.detail.map((d) => (
                          <li key={d} className="text-[0.875rem] leading-[1.65] text-ink-2">
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
