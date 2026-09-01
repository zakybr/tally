import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import Arrow from "@/components/Arrow";
import { TRACKS } from "@/lib/offer";

/*
  What Tally actually sells, from a single day of capture through to running the
  whole online presence. Spec-sheet rows with a rail, not four equal cards: the
  guaranteed number is the readout, and it is the only thing on the right.
*/
export default function Offer() {
  return (
    <section id="offer" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <SectionHeader
          eyebrow="What we run"
          title="Four tracks. One guarantee."
          note="Start with a day of capture, or hand over the whole online presence. Either way the engagement opens the same: we agree the number it has to hit."
        />

        <Reveal delay={0.08}>
          <p className="mt-12 max-w-4xl border-l-2 border-amber pl-6 font-sans text-xl font-medium leading-[1.45] tracking-tight text-ink md:text-2xl">
            You name the outcome. We agree it in writing before anything is made. Then it stops
            being your risk and starts being ours.
          </p>
        </Reveal>

        <div className="mt-16 border-t border-hairline">
          {TRACKS.map((track, i) => (
            <Reveal key={track.slug} delay={0.05 * i}>
              <div className="grid gap-8 border-b border-hairline py-10 md:py-12 lg:grid-cols-[300px_minmax(0,1fr)_280px] lg:gap-12">
                {/* Rail: what it is called and who buys it */}
                <div>
                  <h3 className="font-sans text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    {track.name}
                  </h3>
                  <p className="mono-label mt-4 text-ink-2">{track.suits}</p>
                </div>

                <p className="max-w-[62ch] self-center text-[0.9375rem] leading-[1.75] text-ink-2">
                  {track.scope}
                </p>

                {/* Readout: the only thing that changes between tracks */}
                <div className="self-center border border-amber-dim bg-panel p-6">
                  <div className="mono-label text-amber">We guarantee</div>
                  <p className="mt-3 font-sans text-[1.0625rem] font-medium leading-snug tracking-[-0.01em] text-ink">
                    {track.guarantees}
                  </p>
                  <Link
                    href="/contact"
                    className="mono-label group mt-5 inline-flex items-center gap-2 text-ink-2 transition-colors duration-300 hover:text-amber"
                  >
                    Get this quoted
                    <Arrow
                      size={14}
                      className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-3xl text-[0.9375rem] leading-[1.75] text-ink-2">
            We never guarantee sales. We guarantee what we control: the creative, the targeting and
            the system that turns them into your number. If we cannot see a way to hit it, we say so
            before you pay us anything.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
