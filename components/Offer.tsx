import Section from "@/components/Section";
import Pill from "@/components/Pill";
import Arrow from "@/components/Arrow";
import { TRACKS } from "@/lib/offer";

/*
  The four tracks, drawn as sheet modules rather than sold as cards.

  Each row is a ruled module: an index, the track, who it suits, what it covers,
  and the guaranteed figure set apart in its own well. The figure is the only
  thing on the row that carries signal colour, because on a drawing the number
  is the point and everything else is construction.
*/
export default function Offer() {
  return (
    <Section id="offer" tone="sheet">
      <div>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[16ch] text-balance font-sans text-[2rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink md:text-[2.75rem]">
            Four tracks. One guarantee.
          </h2>
          <p className="max-w-[42ch] text-[0.9375rem] leading-[1.6] text-ink-2">
            Start with a day of capture, or hand over the whole presence. Either way the number is
            agreed before anything is made.
          </p>
        </div>
      </div>

      <div className="mt-16 divide-y divide-[var(--w-hair)]">
        {TRACKS.map((track) => (
          <div key={track.slug}>
            <div className="grid grid-cols-1 items-baseline gap-x-10 gap-y-5 py-10 lg:grid-cols-[16rem_minmax(0,1fr)_20rem]">
              <div>
                <h3 className="row-title font-sans text-xl font-semibold tracking-[-0.02em] text-ink">
                  {track.name}
                </h3>
                <p className="mono-label mt-2 text-ink-3">{track.suits}</p>
              </div>

              <p className="max-w-[52ch] text-[0.9375rem] leading-[1.6] text-ink-2">{track.scope}</p>

              {/* The guaranteed figure, recessed into its own well. */}
              <div className="bg-sheet-2 px-5 py-4">
                <div className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3">
                  Guaranteed
                </div>
                {/* The guaranteed figure. This is what the signal colour is for. */}
                <p className="mt-1.5 font-sans text-[0.9375rem] font-medium leading-snug text-signal">
                  {track.guarantees}
                </p>
                <a
                  href="/contact"
                  className="mono-label link-wipe mt-3 inline-flex items-center gap-2 text-ink-3 hover:text-ink"
                >
                  Quote this
                  <Arrow size={12} className="row-arrow shrink-0" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="mt-14 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[56ch] text-[0.875rem] leading-[1.6] text-ink-3">
            We guarantee what we control. Sales are never part of it. If we cannot see a way to
            hit your number, we say so before you pay anything.
          </p>
          <Pill href="/contact" variant="outline" size="sm">
            Get a number quoted
          </Pill>
        </div>
      </div>
    </Section>
  );
}
