import Image, { type StaticImageData } from "next/image";
import SectionHeader from "@/components/SectionHeader";
import workBoat from "@/public/images/work-boat.jpg";
import workPlant from "@/public/images/work-plant.jpg";
import workFarm from "@/public/images/work-farm.jpg";

/*
  PLACEHOLDER IMAGERY: AI-generated stand-ins graded to spec. Swap for live-sprint capture.

  The captions used to read "IMG 01 · ON-BOAT CAPTURE", which presented three
  stock frames as Tally's own delivered work. Tally is pre-first-client, so that
  was a fabricated portfolio. Each frame now says what it is on the face of the
  page, not only in this comment.
*/
const frames: { img: StaticImageData; caption: string; alt: string }[] = [
  { img: workBoat, caption: "Reference view · not client work", alt: "Deck winch and nets on a commercial fishing boat at sea" },
  { img: workPlant, caption: "Reference view · not client work", alt: "Steam over a stainless processing line" },
  { img: workFarm, caption: "Reference view · not client work", alt: "Forestry loader working in dawn mist" },
];

export default function WorkTriptych() {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <SectionHeader
          title="On the boat. In the plant. On the farm."
          note="Operators spot staged content instantly. These are reference views. Real capture from live sprints replaces them."
        />
      </div>
      {/* Full-bleed hardware-photography spread, hairline dividers, no card chrome. */}
      <div className="mt-14">
        <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-3">
          {frames.map((f) => (
            <figure key={f.alt} className="relative aspect-[4/3] overflow-hidden bg-sheet">
              <Image
                src={f.img}
                alt={f.alt}
                fill
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="img-grade object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(11,11,10,0.75)] to-transparent" />
              <figcaption className="mono-label absolute bottom-5 left-6 text-ink">
                {f.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
