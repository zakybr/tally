"use client";

import { useEffect, useRef, useState } from "react";

/*
  The eight weeks as a stacking scroll sequence.

  A four-column grid of short paragraphs made every week look simultaneous,
  which is the opposite of what a schedule means. Here each week sticks under
  the header while the next slides up over it, so the reader physically moves
  through the sequence and only ever has one week in front of them.

  The stack is pure CSS sticky. The observer only drives the progress rail, so
  if the JavaScript never runs the cards still stack and still read in order.
*/

export type Week = { w: string; title: string; body: string };

export default function WeekStack({ weeks }: { weeks: Week[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = els.indexOf(e.target as HTMLDivElement);
            if (i >= 0) setActive(i);
          }
        });
      },
      /* Fire when a card reaches the band just under the sticky header. */
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mt-16 grid gap-12 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-16">
      {/* Progress rail. Desktop only: on a phone the cards are the progress. */}
      <div className="hidden lg:block">
        <div className="sticky top-32">
          <div className="mono-label mb-5 text-ink-3">Progress</div>
          <ol className="space-y-3">
            {weeks.map((wk, i) => (
              <li key={wk.w} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-300 ${
                    i === active ? "w-6 bg-signal" : "w-3 bg-[var(--w-med)]"
                  }`}
                />
                <span
                  className={`font-mono text-[0.6875rem] tnum tracking-[0.08em] transition-colors duration-300 ${
                    i === active ? "text-ink" : "text-ink-3"
                  }`}
                >
                  WK {wk.w}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <ol>
        {weeks.map((wk, i) => (
          <li
            key={wk.w}
            /* Each card sits 1.25rem lower than the last so the stack shows its
               own depth instead of hiding the cards already read. */
            className="sticky"
            style={{ top: `calc(6rem + ${i * 1.25}rem)` }}
          >
            <div
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="mb-5 border rule-med bg-sheet-2 p-8 md:p-12"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-[3.25rem] font-medium leading-none tnum tracking-[-0.04em] text-signal md:text-[4rem]">
                  {wk.w}
                </span>
                <span className="mono-label text-ink-3">Week</span>
              </div>
              <h3 className="mt-8 font-sans text-2xl font-semibold tracking-[-0.02em] text-ink md:text-[1.75rem]">
                {wk.title}
              </h3>
              <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-[1.65] text-ink-2">
                {wk.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
