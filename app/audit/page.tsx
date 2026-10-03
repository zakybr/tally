import type { Metadata } from "next";
import Image from "next/image";
import AuditForm from "@/components/AuditForm";
import { AuditFooter, AuditHeader } from "@/components/AuditChrome";
import { PEOPLE } from "@/lib/contact";
import {
  AUDIT_CHECKS,
  AUDIT_HEADLINE,
  FOUNDER_PHOTO,
  GUARANTEE_FLOOR,
  GUARANTEE_FLOOR_UNIT,
  SAMPLE_AUDIT_IMAGE,
} from "@/lib/audit";

/*
  Free enquiry audit, the paid-traffic landing page.

  Not linked from the main navigation. Laid out for a phone first, since most
  of the traffic is Auckland mobile: one column, the form reachable from the
  first screen, two columns only from lg up. Copy constants live in lib/audit.ts.
*/

export const metadata: Metadata = {
  title: "Free enquiry audit",
  description:
    "A free audit of how your business turns searches into enquiries: your Google Business Profile against three local competitors, where enquiries leak, and the one number Tally would guarantee.",
  alternates: { canonical: "/audit" },
  openGraph: {
    title: "Free enquiry audit | Tally",
    description:
      "Where your enquiries leak, three ranked fixes, and the one number Tally would guarantee in writing.",
    url: "/audit",
  },
};

const eyebrow = "mono-label text-ink-3";
const sectionCls = "mx-auto max-w-[1100px] px-4 sm:px-6";

/* A dimensioned empty frame where a real image will go. */
function Placeholder({ label, ratio }: { label: string; ratio: string }) {
  return (
    <div
      className="relative flex w-full items-center justify-center border border-dashed rule-heavy bg-sheet-2"
      style={{ aspectRatio: ratio }}
    >
      <span className="mono-label px-4 text-center text-ink-3">{label}</span>
    </div>
  );
}

export default function AuditPage() {
  const founder = PEOPLE[0];

  return (
    <main>
      <AuditHeader />

      {/* 01 Claim */}
      <section className={`${sectionCls} pb-12 pt-10 sm:pt-16 lg:pb-20`}>
        <div className="flex items-center gap-3">
          <span className={eyebrow}>Free enquiry audit</span>
          <span className="h-px flex-1 bg-[var(--w-med)]" aria-hidden="true" />
          <span className={`${eyebrow} tnum`}>Sheet 01</span>
        </div>
        <h1 className="audit-serif mt-6 max-w-[16ch] text-[2.5rem] leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
          {AUDIT_HEADLINE}
        </h1>
        <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-ink-2">
          We look at how customers find you, whether your website can record the enquiry, and where
          the rest go missing. You get three ranked fixes and the one number we would put in
          writing.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#request" className="pill pill-solid mono-label inline-flex w-full sm:w-auto">
            Request the free audit
          </a>
          <span className="font-mono text-[0.6875rem] text-ink-3">
            No cost. No obligation. A director reads every request.
          </span>
        </div>
      </section>

      {/* 02 What the audit checks */}
      <section className="border-t rule-hair py-12 lg:py-20">
        <div className={sectionCls}>
          <span className={eyebrow}>What the audit checks</span>
          <ol className="mt-6 border-t rule-med">
            {AUDIT_CHECKS.map((c, i) => (
              <li
                key={c.title}
                className="grid grid-cols-[2.25rem_1fr] gap-x-3 border-b rule-hair py-5 sm:grid-cols-[3rem_1fr_1.4fr] sm:gap-x-6"
              >
                <span className="font-mono text-sm tnum text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="audit-serif text-xl leading-snug text-ink sm:text-2xl">{c.title}</h2>
                <p className="col-start-2 mt-2 text-[0.9375rem] leading-[1.6] text-ink-2 sm:col-start-3 sm:mt-0">
                  {c.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 Sample audit */}
      <section className="border-t rule-hair py-12 lg:py-20">
        <div className={sectionCls}>
          <div className="flex items-baseline justify-between gap-4">
            <span className={eyebrow}>A sample audit</span>
            <span className={`${eyebrow} tnum`}>Fig. 1</span>
          </div>
          <div className="mt-6">
            {SAMPLE_AUDIT_IMAGE ? (
              <Image
                src={SAMPLE_AUDIT_IMAGE}
                alt="A sample Tally enquiry audit"
                width={1600}
                height={1000}
                sizes="(min-width: 1100px) 1052px, 100vw"
                className="h-auto w-full border rule-med"
              />
            ) : (
              <Placeholder label="Sample audit image" ratio="4 / 3" />
            )}
          </div>
          <p className="mt-4 max-w-xl text-sm leading-[1.6] text-ink-3">
            Names and figures changed. Yours comes back in the same format.
          </p>
        </div>
      </section>

      {/* 04 Guarantee floor */}
      <section className="border-t rule-hair py-12 lg:py-20">
        <div className={`${sectionCls} grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end`}>
          <div>
            <span className={eyebrow}>The guarantee floor</span>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-mono text-[4.5rem] leading-none tnum text-signal sm:text-[6rem]">
                {GUARANTEE_FLOOR}
              </span>
            </div>
            <span className="mono-label mt-3 block text-ink-2">{GUARANTEE_FLOOR_UNIT}</span>
          </div>
          <p className="max-w-xl text-[1.0625rem] leading-[1.6] text-ink-2">
            The audit ends with one number: the monthly enquiry floor we would sign to. It is set
            from your market and your baseline, not from a template, and it goes into the contract.
            If we cannot find a number we would stand behind, the audit says so.
          </p>
        </div>
      </section>

      {/* 05 Who does it */}
      <section className="border-t rule-hair py-12 lg:py-20">
        <div className={`${sectionCls} grid gap-8 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-center`}>
          <div className="max-w-[14rem]">
            {FOUNDER_PHOTO ? (
              <Image
                src={FOUNDER_PHOTO}
                alt={founder.name}
                width={448}
                height={560}
                className="h-auto w-full border rule-med"
              />
            ) : (
              <Placeholder label="Founder photo" ratio="4 / 5" />
            )}
          </div>
          <div>
            <span className={eyebrow}>Who reads your audit</span>
            <p className="audit-serif mt-4 text-2xl leading-snug text-ink sm:text-3xl">
              {founder.name}
            </p>
            <span className="mono-label mt-1 block text-ink-3">{founder.role}, Tally</span>
            <p className="mt-5 max-w-xl text-[0.9375rem] leading-[1.6] text-ink-2">
              Every audit is put together and signed off by a director, and the same person walks
              you through it on a call. If a question comes up first, ring{" "}
              <a href={`tel:${founder.phone}`} className="font-mono tnum text-ink hover:text-signal">
                {founder.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 06 Form */}
      <section id="request" className="scroll-mt-4 border-t rule-med bg-sheet-2 py-12 lg:py-20">
        <div className={`${sectionCls} grid gap-10 lg:grid-cols-[1fr_1.1fr]`}>
          <div>
            <span className={eyebrow}>Request the audit</span>
            <h2 className="audit-serif mt-4 text-3xl leading-tight text-ink sm:text-4xl">
              Seven questions. About two minutes.
            </h2>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.6] text-ink-2">
              We reply within two working days to book a short call and walk you through what we
              found.
            </p>
          </div>
          <AuditForm />
        </div>
      </section>

      <AuditFooter />
    </main>
  );
}
