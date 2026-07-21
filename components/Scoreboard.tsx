"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const TARGET = 47;
const GUARANTEED = 30;

/*
  Proof Sprint HUD readout: instrument-panel stat block, bottom-right of hero.
  Counts to the illustrative figure once in view; marks past the guarantee run amber.
*/
export default function Scoreboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 2200;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * TARGET));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="w-full max-w-sm border border-hairline bg-bg/70 p-5 backdrop-blur-md"
      role="img"
      aria-label={`Illustrative Proof Sprint readout: ${TARGET} qualified applications delivered against ${GUARANTEED} guaranteed`}
    >
      <div className="flex items-baseline justify-between">
        <span className="mono-label text-amber">Proof Sprint · Week 6 of 8</span>
        <span className="mono-label text-ink-2">Illustrative</span>
      </div>
      <div className="mono-label mt-4 text-ink-2">Qualified applications</div>
      <div className="mt-1 flex items-baseline gap-3">
        <span className="font-mono text-5xl font-medium tabular-nums text-ink">{count}</span>
        <span className="mono-label text-ink-2">applications</span>
      </div>
      <div className="mono-label mt-4 flex gap-6 text-ink-2">
        <span>
          Guaranteed <b className="text-ink">{GUARANTEED}</b>
        </span>
        <span>
          Delivered <b className="text-ink">{count}</b>
        </span>
        {count > GUARANTEED && <span className="text-amber">+{count - GUARANTEED} over</span>}
      </div>
      <div
        className="mt-4 flex flex-wrap gap-[3px]"
        aria-hidden="true"
      >
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className={`tally-mark ${i >= GUARANTEED ? "over" : ""}`} />
        ))}
      </div>
      <p className="mt-4 font-mono text-[0.625rem] leading-relaxed text-ink-2">
        Format illustration: this is how every engagement is reported. White marks count to the
        guarantee; amber marks are over-delivery.
      </p>
    </div>
  );
}
