import type { Metadata } from "next";
import PageShell, { FaqList } from "@/components/PageShell";
import { RECOVERY } from "@/lib/services";
import { SITE_URL, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

/*
  Instagram account recovery and username claims: the one service with its own
  page, because these are urgent searches. Leads with the call. Absorbs the old
  username-claims page and the recovery guides, which redirect here.
*/

export const metadata: Metadata = {
  title: RECOVERY.title,
  description: RECOVERY.description,
  alternates: { canonical: RECOVERY.path },
  openGraph: { title: `${RECOVERY.title} | Tally`, description: RECOVERY.description, url: RECOVERY.path },
};

const jsonLd = [
  faqJsonLd(RECOVERY.faqs),
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Account recovery", path: RECOVERY.path },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Instagram account recovery and username claims",
    description: RECOVERY.description,
    url: `${SITE_URL}${RECOVERY.path}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "New Zealand" },
  },
];

export default function RecoveryPage() {
  return (
    <PageShell
      title="Banned Instagram account?"
      accent="We handle it."
      intro={RECOVERY.intro}
      source="recovery_hero"
      callFirst
      jsonLd={jsonLd}
    >
      <section className="mt-20 grid gap-4 md:grid-cols-3">
        {RECOVERY.handles.map((h) => (
          <div key={h.name} className="rounded-2xl bg-sheet-2 p-8">
            <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">{h.name}</h2>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-ink-2">{h.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-24 border-t rule-hair pt-16">
        <h2 className="display text-[2.25rem] text-ink md:text-[3rem]">Banned today? Do this</h2>
        <ol className="mt-8 max-w-3xl space-y-4">
          {RECOVERY.firstSteps.map((step, i) => (
            <li key={step} className="grid grid-cols-[2.5rem_1fr] text-[1.0625rem] leading-[1.6] text-ink-2">
              <span className="mono-label pt-1 text-signal">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <FaqList faqs={RECOVERY.faqs} />
    </PageShell>
  );
}
