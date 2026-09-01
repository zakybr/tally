"use client";

import Link from "next/link";
import { m } from "framer-motion";
import Arrow from "@/components/Arrow";
import { SECTORS } from "@/lib/offer";

/*
  Coverage register: the sectors Tally takes briefs in, published as a document
  ledger rather than a sidebar list. Rows carry scope and the number typically
  agreed, and every row is a route into the brief that covers it.
*/

const ROW_GRID =
  "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-2 lg:grid-cols-[minmax(0,3.4fr)_minmax(0,5.1fr)_minmax(0,1.9fr)_16px] lg:gap-x-10 lg:gap-y-0";

const rowVariants = {
  rest: { opacity: 0, y: 14 },
  live: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
} as const;

export default function SectorRegister() {
  return (
    <m.div
      initial="rest"
      whileInView="live"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ rest: {}, live: { transition: { staggerChildren: 0.045 } } }}
    >
      {/* Ledger head: the column contract, stated once. Columns only exist at lg. */}
      <div className="hidden lg:block" aria-hidden="true">
        <div className={`${ROW_GRID} border-b border-hairline pb-3 text-ink-2`}>
          <span className="mono-label">Sector</span>
          <span className="mono-label">Coverage</span>
          <span className="mono-label">Number we guarantee</span>
          <span />
        </div>
      </div>

      <ul className="border-y border-hairline lg:border-t-0">
        {SECTORS.map((row) => (
          <m.li
            key={row.name}
            variants={rowVariants}
            className="border-t border-hairline first:border-t-0"
          >
            <Link
              href={row.href}
              aria-label={`${row.name} — ${row.brief}`}
              className={`group relative ${ROW_GRID} py-6 transition-colors duration-300 hover:bg-panel md:py-7`}
            >
              {/* The authored moment: an amber rule prints across the row. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-amber transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
              <span className="font-sans text-[1.0625rem] font-medium leading-snug tracking-[-0.012em] text-ink md:text-[1.125rem]">
                {row.name}
              </span>
              <span className="col-span-2 row-start-2 max-w-[62ch] text-[0.875rem] leading-[1.65] text-ink-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
                {row.scope}
              </span>
              <span className="mono-label col-span-2 row-start-3 text-ink-2 transition-colors duration-300 group-hover:text-amber lg:col-span-1 lg:col-start-3 lg:row-start-1">
                {row.number}
              </span>
              <Arrow className="col-start-2 row-start-1 shrink-0 translate-y-[0.15rem] text-amber transition-transform duration-300 ease-out group-hover:translate-x-1 lg:col-start-4" />
            </Link>
          </m.li>
        ))}
      </ul>

      {/* Terminal band: the one document that covers every row above. */}
      <m.div
        variants={rowVariants}
        className="flex flex-col gap-6 pt-8 md:flex-row md:items-end md:justify-between"
      >
        <Link href="/primary-industries-marketing" className="group max-w-xl">
          <span className="flex items-center gap-3 font-sans text-xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-amber md:text-2xl">
            Full capability brief
            <Arrow className="shrink-0 text-amber transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
          </span>
          <span className="mt-2 block text-[0.875rem] leading-[1.6] text-ink-2">
            Every sector above, all four tracks, and the miss clause, in one document.
          </span>
        </Link>
        <Link
          href="/contact"
          className="mono-label inline-flex items-center self-start border-b border-amber pb-1.5 text-amber transition-colors duration-300 hover:text-ink md:shrink-0 md:self-end"
        >
          Not listed? Ask anyway
        </Link>
      </m.div>
    </m.div>
  );
}
