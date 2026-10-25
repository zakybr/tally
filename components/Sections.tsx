import Link from "next/link";
import Arrow from "@/components/Arrow";
import { PEOPLE } from "@/lib/contact";
import type { Card } from "@/lib/services";

/*
  The building blocks of the long service and industry pages, drawn from the
  styles the recovery and about pages already use: a hairline rule, a display
  heading, then cards, numbered steps, prose or links.
*/

const sectionCls = "mt-24 border-t rule-hair pt-16";
const h2Cls = "display text-[2.25rem] text-ink md:text-[3rem]";
const proseCls = "max-w-3xl space-y-5 text-[1.0625rem] leading-[1.7] text-ink-2";

export function Prose({ heading, body, children }: { heading: string; body: string[]; children?: React.ReactNode }) {
  return (
    <section className={sectionCls}>
      <h2 className={h2Cls}>{heading}</h2>
      <div className={`mt-8 ${proseCls}`}>
        {body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {children}
      </div>
    </section>
  );
}

export function CaseGrid({ heading, intro, cases }: { heading: string; intro?: string; cases: Card[] }) {
  return (
    <section className={sectionCls}>
      <h2 className={h2Cls}>{heading}</h2>
      {intro ? <p className={`mt-6 ${proseCls}`}>{intro}</p> : null}
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {cases.map((c) => (
          <div key={c.title} className="rounded-2xl bg-sheet-2 p-8">
            <h3 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">{c.title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-ink-2">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function StepList({ heading, items }: { heading: string; items: Card[] }) {
  return (
    <section className={sectionCls}>
      <h2 className={h2Cls}>{heading}</h2>
      <ol className="mt-10 max-w-3xl divide-y divide-[var(--w-hair)] border-y rule-hair">
        {items.map((s, i) => (
          <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 py-6">
            <span className="mono-label pt-1.5 text-signal">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-[1.1875rem] font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-[1.65] text-ink-2">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export type LinkCard = { href: string; label: string; body: string };

export function LinkGrid({ heading, links }: { heading: string; links: LinkCard[] }) {
  return (
    <section className={sectionCls}>
      <h2 className={h2Cls}>{heading}</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group flex flex-col rounded-2xl bg-sheet-2 p-8 transition-colors duration-300 hover:bg-sheet-3"
          >
            <span className="inline-flex items-center gap-3 text-[1.1875rem] font-semibold tracking-[-0.01em] text-ink">
              {l.label}
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="mt-3 text-[0.9375rem] leading-[1.6] text-ink-2">{l.body}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* One line with Zak's number as a tel: link, for the end of pricing sections. */
export function CallZak({ lead = "The quickest way to a number is a call." }: { lead?: string }) {
  const zak = PEOPLE[0];
  return (
    <p>
      {lead}{" "}
      <a href={`tel:${zak.phone}`} className="font-semibold text-signal hover:text-ink">
        Call Zak on {zak.phoneDisplay}
      </a>
      , or{" "}
      <Link href="/audit" className="font-semibold text-ink underline underline-offset-4 hover:text-signal">
        request a free audit
      </Link>
      .
    </p>
  );
}
