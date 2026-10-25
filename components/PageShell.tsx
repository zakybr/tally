import Nav from "@/components/Nav";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaPair from "@/components/CtaPair";
import FooterCta from "@/components/FooterCta";
import JsonLd from "@/components/JsonLd";
import type { Crumb, FaqItem } from "@/lib/seo";

/*
  The one layout every inner page uses: nav, the breadcrumb trail, a header
  with the claim and the two actions, the page's own sections, then the footer
  (which carries the closing call to action) and the page's single @graph of
  structured data. Keeping every page on this shape keeps the site consistent.
*/
export default function PageShell({
  title,
  accent,
  intro,
  source,
  callFirst = false,
  crumbs,
  nodes,
  children,
}: {
  title: string;
  /* The words of the H1 drawn in orange, appended after `title`. */
  accent?: string;
  intro: string;
  source: string;
  callFirst?: boolean;
  crumbs: Crumb[];
  /* Structured-data nodes for this page. Organization and WebSite are added for every page. */
  nodes?: object[];
  children: React.ReactNode;
}) {
  return (
    <main>
      <Nav />
      <article className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12 md:pt-40 lg:px-20">
        <header className="max-w-3xl">
          <Breadcrumbs crumbs={crumbs} className="mb-8" />
          <h1 className="display max-w-[16ch] text-[3rem] text-ink md:text-[4.5rem]">
            {title}
            {accent ? <span className="text-signal"> {accent}</span> : null}
          </h1>
          <p className="mt-7 max-w-[56ch] text-lg leading-[1.6] text-ink-2">{intro}</p>
          <CtaPair source={source} callFirst={callFirst} className="mt-9" />
        </header>
        {children}
      </article>
      <FooterCta />
      <JsonLd nodes={nodes} />
    </main>
  );
}

/* Plain question-and-answer list, open by click, mirrored in FAQPage schema by the caller. */
export function FaqList({ faqs, heading = "FAQ" }: { faqs: FaqItem[]; heading?: string }) {
  return (
    <section className="mt-24 border-t rule-hair pt-16" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="display text-[2.25rem] text-ink md:text-[3rem]">
        {heading}
      </h2>
      <div className="mt-10 divide-y divide-[var(--w-hair)]">
        {faqs.map((f) => (
          <details key={f.question} className="group py-6">
            <summary className="cursor-pointer list-none text-ink">
              <div className="flex items-start justify-between gap-6">
                <h3 className="text-lg font-semibold tracking-tight">{f.question}</h3>
                <span
                  aria-hidden="true"
                  className="mono-label shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </div>
            </summary>
            <p className="mt-4 max-w-3xl text-[0.9375rem] leading-[1.7] text-ink-2">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
