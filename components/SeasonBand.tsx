import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import seasonImg from "@/public/images/work-boat.jpg";

/*
  The marine push. Urgency here is arithmetic, not a forecast: eight weeks from
  signature to a result, against a summer charter window that opens in December.
  The reader does the subtraction themselves, so the band never goes stale.
*/
const leadTime = [
  { k: "Week 0", body: "Signature. The number is agreed and the baseline is pulled." },
  { k: "Weeks 1–3", body: "Capture on the water and in the yard. Real boats, real crew." },
  { k: "Week 4", body: "Live. Variants running, budget moving to what converts." },
  { k: "Week 8", body: "The tally, against the number we agreed in week zero." },
];

export default function SeasonBand() {
  return (
    <section
      id="marine"
      className="relative overflow-hidden border-y border-hairline"
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
        className="img-grade object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/92 to-bg/60" />
      {/* Narrow screens put copy across the whole frame, so the ground has to hold under all of it. */}
      <div className="absolute inset-0 bg-bg/75 lg:hidden" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 bg-amber" aria-hidden="true" />
              <span className="eyebrow">Open now · Marine, boat building & charter</span>
            </div>
            <h2
              id="marine-heading"
              className="mt-6 max-w-2xl font-sans text-[2.125rem] font-semibold leading-[1.06] tracking-[-0.03em] text-balance text-ink md:text-5xl"
            >
              The season is booked before the season starts.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-[1.6] text-ink-2">
              New Zealand&apos;s charter window opens in December and shuts in autumn. The boats
              that fill it are the ones people already knew about in spring. Yards and builders run
              the same clock in reverse: the trades you need for summer builds are hired months
              before the first hull moves.
            </p>
            <p className="mt-5 max-w-xl text-[0.9375rem] leading-[1.75] text-ink-2">
              A Proof sprint runs eight weeks from signature to a result. Count back from your
              season and you have the date you needed to start. Start inside the season instead and
              you are buying attention at the exact moment everyone else is bidding for it.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="mono-label border border-amber bg-amber px-6 py-3.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
              >
                Book the season now
              </Link>
              <Link
                href="/marine-marketing"
                className="mono-label group inline-flex items-center gap-2.5 border border-hairline px-6 py-3.5 text-ink transition-colors duration-300 hover:border-ink"
              >
                Marine &amp; charter brief
                <Arrow
                  size={14}
                  className="shrink-0 text-amber transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>

          {/* Lead-time rail: the sequence is the argument, so it is numbered. */}
          <Reveal delay={0.1}>
            <div className="border border-hairline bg-bg/70 p-6 backdrop-blur-md md:p-8">
              <div className="mono-label border-b border-hairline pb-4 text-amber">
                Signature to result
              </div>
              <ol className="mt-2">
                {leadTime.map((step) => (
                  <li
                    key={step.k}
                    className="grid grid-cols-[92px_minmax(0,1fr)] gap-5 border-b border-hairline py-5 last:border-b-0 last:pb-0"
                  >
                    <span className="mono-label pt-0.5 text-ink">{step.k}</span>
                    <span className="text-[0.875rem] leading-[1.65] text-ink-2">{step.body}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
