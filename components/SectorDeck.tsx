"use client";

import { useState } from "react";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import { SECTORS } from "@/lib/offer";

/*
  Coverage as a deck you riffle through, not a nine row ledger.

  The ledger repeated the same boxed row nine times, which made the list read as
  long rather than broad. The deck says it in one gesture.

  Desktop holds the cards fanned and overlapping, each showing its name down the
  spine like cards held in a hand. The card under the cursor opens to full width
  and the rest close up. It is built as a flex accordion rather than absolute
  offsets so the deck always fits its container exactly: a first attempt used
  fixed widths and negative margins and spanned 2,015px inside a 1,440px
  viewport.

  Mobile drops the fan for a snap carousel. Overlapping rotated cards are not
  usable with a thumb.

  The gradient runs white to signal to near black across the face. Text only
  ever sits on the dark end of that ramp, so contrast holds.
*/

const GRADIENT =
  "linear-gradient(158deg, #ffffff 0%, #ffb59c 12%, #ff4a1c 34%, #7a2410 55%, #16181d 76%, #0d0f13 100%)";

export default function SectorDeck() {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {/* Mobile: snap carousel, one card per thumb-swipe. */}
      <div className="deck-scroll -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:hidden">
        {SECTORS.map((s) => (
          <Link
            key={s.name}
            href={s.href}
            className="group relative flex aspect-[3/4] w-[74vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.14)] p-5"
            style={{ background: GRADIENT }}
          >
            <CardFace sector={s} />
          </Link>
        ))}
      </div>

      {/* Desktop: the fan. */}
      <div className="hidden gap-2 md:flex" onMouseLeave={() => setOpen(0)}>
        {SECTORS.map((s, i) => {
          const isOpen = open === i;
          return (
            <Link
              key={s.name}
              href={s.href}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              aria-label={`${s.name}: ${s.number}`}
              className="group relative flex h-[24rem] shrink-0 grow-0 flex-col justify-end overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.14)] transition-[flex-basis,transform] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                flexBasis: isOpen ? "20rem" : "4.25rem",
                background: GRADIENT,
                transform: isOpen ? "translateY(-10px)" : "none",
                boxShadow: isOpen
                  ? "0 28px 60px -20px rgba(0,0,0,0.85)"
                  : "0 10px 26px -18px rgba(0,0,0,0.7)",
              }}
            >
              {/* Spine: the name reads vertically while the card is closed. */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-5 flex justify-center font-sans text-[0.9375rem] font-semibold tracking-[-0.01em] text-white transition-opacity duration-200 ${
                  isOpen ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {s.name}
              </span>

              <div
                className={`p-5 transition-opacity duration-300 ${
                  isOpen ? "opacity-100 delay-100" : "pointer-events-none opacity-0"
                }`}
              >
                <CardFace sector={s} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function CardFace({ sector }: { sector: (typeof SECTORS)[number] }) {
  return (
    <>
      {/* The guaranteed number rides the light end of the ramp, so it is set
          in near black rather than white. */}
      <span className="absolute left-5 right-5 top-4 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-[#1a0d07]">
        {sector.number}
      </span>
      <h3 className="font-sans text-[1.0625rem] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
        {sector.name}
      </h3>
      <p className="mt-2 max-w-[26ch] text-[0.75rem] leading-[1.5] text-white/75">{sector.scope}</p>
      <span className="mono-label mt-4 inline-flex items-center gap-1.5 whitespace-nowrap text-white">
        {sector.brief}
        <Arrow
          size={11}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </>
  );
}
