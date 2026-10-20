import type { Metadata } from "next";
import Nav from "@/components/Nav";
import AuditForm from "@/components/AuditForm";
import FooterCta from "@/components/FooterCta";
import { PEOPLE } from "@/lib/contact";
import { AUDIT_CHECKS } from "@/lib/audit";

/*
  The free audit: where every "free" offer on the site and the Meta ads land.
  One screen that does one job. The claim and the form share the first view on
  desktop and sit one under the other on a phone, with Zak's number for anyone
  who would rather just call.
*/

export const metadata: Metadata = {
  title: "Free marketing audit for New Zealand businesses",
  description:
    "Free audit of your Instagram, Meta ads and how customers find you, with the one outcome worth going after first. Takes under a minute to request.",
  alternates: { canonical: "/audit" },
  openGraph: {
    title: "Free marketing audit | Tally",
    description:
      "Your Instagram, ads and enquiries looked at properly, and the one outcome worth going after first. Free.",
    url: "/audit",
  },
};

export default function AuditPage() {
  const zak = PEOPLE[0];

  return (
    <main>
      <Nav />
      {/* Phone order: claim, form, details. Desktop: claim and details left, form right. */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-24 pt-32 md:px-12 md:pt-40 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-x-20 lg:gap-y-0 lg:px-20">
        <div className="lg:col-start-1 lg:row-start-1">
          <h1 className="display max-w-[12ch] text-[3rem] text-ink md:text-[4.5rem]">
            Free <span className="text-signal">marketing audit</span>
          </h1>
          <p className="mt-7 max-w-[46ch] text-lg leading-[1.55] text-ink-2">
            We look at your Instagram, your ads and how customers find you, then tell you the one
            outcome that would actually move the business and how we would get it. No cost, no
            obligation.
          </p>
        </div>

        <div
          id="request"
          className="scroll-mt-24 self-start rounded-2xl bg-sheet-2 p-6 sm:p-8 md:p-10 lg:col-start-2 lg:row-span-2 lg:row-start-1"
        >
          <h2 className="display text-[2rem] text-ink md:text-[2.5rem]">Get your free audit</h2>
          <p className="mt-3 text-[0.9375rem] leading-[1.6] text-ink-2">
            Two fields required. We get back to you within one working day.
          </p>
          <div className="mt-8">
            <AuditForm />
          </div>
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <ol className="max-w-xl lg:mt-12 divide-y divide-[var(--w-hair)] border-y rule-hair">
            {AUDIT_CHECKS.map((c, i) => (
              <li key={c.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 py-5">
                <span className="mono-label pt-1 text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-[1.0625rem] font-semibold text-ink">{c.title}</h2>
                  <p className="mt-1.5 text-[0.9375rem] leading-[1.6] text-ink-2">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-[0.9375rem] text-ink-2">
            Rather just talk?{" "}
            <a href={`tel:${zak.phone}`} className="font-semibold text-signal hover:text-ink">
              Call Zak on {zak.phoneDisplay}
            </a>
          </p>
        </div>

      </section>
      <FooterCta />
    </main>
  );
}
