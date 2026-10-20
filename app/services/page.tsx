import type { Metadata } from "next";
import PageShell, { FaqList } from "@/components/PageShell";
import { SERVICES, SERVICE_FAQS } from "@/lib/services";
import { SITE_URL, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

/*
  Every service on one page, one short section each, each with its own anchor
  so the nav, homepage and old service URLs can land on the right one.
*/

const DESCRIPTION =
  "Tally's services for New Zealand businesses: marketing management, Instagram growth, Meta ads, content and video, websites, and Instagram account recovery. Free audit.";

export const metadata: Metadata = {
  title: "Marketing Services NZ: Instagram, Ads, Content & Websites",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: { title: "Services | Tally", description: DESCRIPTION, url: "/services" },
};

const jsonLd = [
  faqJsonLd(SERVICE_FAQS),
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]),
  ...SERVICES.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.body,
    url: `${SITE_URL}/services#${s.id}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "New Zealand" },
  })),
];

export default function ServicesPage() {
  return (
    <PageShell
      title="What we"
      accent="do"
      intro="Six services, one rule: every one is aimed at an outcome your business can count, enquiries, bookings, sales or staff, not at a pile of video with no clear return. Not sure which you need? Start with the free audit."
      source="services_hero"
      jsonLd={jsonLd}
    >
      <div className="mt-20 divide-y divide-[var(--w-hair)] border-y rule-hair">
        {SERVICES.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className="grid scroll-mt-24 gap-4 py-12 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16"
          >
            <div>
              <span className="mono-label text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="display mt-3 text-[2rem] text-ink md:text-[2.5rem]">{s.name}</h2>
            </div>
            <div>
              <p className="max-w-[60ch] text-[1.0625rem] leading-[1.65] text-ink-2">{s.body}</p>
              <p className="mono-label mt-5 text-ink-3">Measured in: {s.measuredIn}</p>
              {s.id === "account-recovery" ? (
                <a
                  href="/instagram-account-recovery"
                  className="mt-5 inline-block text-[0.9375rem] font-semibold text-signal hover:text-ink"
                >
                  How account recovery works
                </a>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <FaqList faqs={SERVICE_FAQS} />
    </PageShell>
  );
}
