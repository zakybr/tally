import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import FooterCta from "@/components/FooterCta";
import CtaPair from "@/components/CtaPair";
import { SERVICE_LINKS } from "@/lib/services";
import { INDUSTRY_PAGES } from "@/lib/industries";

/* The 404: says so plainly, then points at every service and industry page. Next adds noindex. */

export const metadata: Metadata = {
  title: { absolute: "Page not found | Tally" },
  description: "This page does not exist. Find Tally's services and industries, or get a free audit.",
};

export default function NotFound() {
  return (
    <main>
      <Nav />
      <article className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12 md:pt-40 lg:px-20">
        <header className="max-w-3xl">
          <p className="mono-label text-ink-3">404</p>
          <h1 className="display mt-4 max-w-[16ch] text-[3rem] text-ink md:text-[4.5rem]">
            Page <span className="text-signal">not found</span>
          </h1>
          <p className="mt-7 max-w-[56ch] text-lg leading-[1.6] text-ink-2">
            The page you were after has moved or never existed. Everything Tally does is linked
            below, or start with a free audit and we will point you to the right place.
          </p>
          <CtaPair source="not_found" className="mt-9" />
        </header>

        <div className="mt-20 grid gap-12 border-t rule-hair pt-12 md:grid-cols-2">
          <nav aria-label="Services">
            <h2 className="mono-label text-ink-3">Services</h2>
            <ul className="mt-4 space-y-3">
              {SERVICE_LINKS.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-lg font-semibold text-ink hover:text-signal">
                    {s.linkText}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Industries">
            <h2 className="mono-label text-ink-3">Industries</h2>
            <ul className="mt-4 space-y-3">
              {INDUSTRY_PAGES.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}`} className="text-lg font-semibold text-ink hover:text-signal">
                    {i.linkText}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </article>
      <FooterCta />
    </main>
  );
}
