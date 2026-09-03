import Image from "next/image";
import Pill from "@/components/Pill";
import seasonImg from "@/public/images/work-boat.jpg";

/*
  The marine push. Urgency here is arithmetic, not a forecast: eight weeks from
  signature to a result, against a summer charter window that opens in December.
  The reader does the subtraction themselves, so the band never goes stale.
*/
const leadTime = [
  { k: "Week 0", body: "Signature. The number is agreed and the baseline is pulled." },
  { k: "Weeks 1-3", body: "Capture on the water and in the yard. Real boats, real crew." },
  { k: "Week 4", body: "Live. Variants running, budget moving to what converts." },
  { k: "Week 8", body: "The tally, against the number we agreed in week zero." },
];

export default function SeasonBand() {
  return (
    <section
      id="marine"
      className="relative overflow-hidden border-y rule-med bg-sheet"
      aria-labelledby="marine-heading"
    >
      {/* PLACEHOLDER IMAGERY: AI-generated stand-in graded to spec. Swap for real marine capture. */}
      <Image
        src={seasonImg}
        alt=""
        aria-hidden="true"
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover opacity-30 [filter:grayscale(60%)_contrast(1.1)]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sheet via-sheet/90 to-sheet/60" />
      {/* Narrow screens put copy across the whole frame, so the ground has to hold under all of it. */}
      <div className="absolute inset-0 bg-sheet/80 lg:hidden" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <h2
              id="marine-heading"
              className="max-w-2xl font-sans text-[2.125rem] font-semibold leading-[1.06] tracking-[-0.03em] text-balance text-ink md:text-5xl"
            >
              The season is booked before the season starts.
            </h2>
            <p className="mt-6 max-w-[46ch] text-lg leading-[1.6] text-ink-2">
              The charter window opens in December. The boats that fill it are the ones people
              knew about in spring. A Proof sprint takes eight weeks. Count back from your season and
              you have your start date.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Pill href="/contact">Book the season now</Pill>
              <Pill href="/marine-marketing" variant="outline" onPhoto>
                Marine &amp; charter brief
              </Pill>
            </div>
          </div>

          {/* Lead-time rail: the sequence is the argument, so it is numbered. */}
          <div>
            <div className="border rule-med bg-sheet-2/80 p-6 backdrop-blur-md md:p-8">
              <div className="font-mono text-[0.625rem] uppercase tracking-[0.14em] border-b rule-hair pb-4 text-ink-3">
                Signature to result
              </div>
              <ol className="mt-2">
                {leadTime.map((step) => (
                  <li
                    key={step.k}
                    className="grid grid-cols-[92px_minmax(0,1fr)] gap-5 border-b rule-hair py-4 last:border-b-0 last:pb-0"
                  >
                    <span className="font-mono text-[0.6875rem] tnum tracking-[0.08em] pt-0.5 text-ink">{step.k}</span>
                    <span className="text-[0.875rem] leading-[1.65] text-ink-2">{step.body}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
