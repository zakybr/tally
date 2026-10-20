"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TallyMark from "@/components/TallyMark";
import Pill from "@/components/Pill";
import { PEOPLE } from "@/lib/contact";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";

/*
  A bar with three things on it: the wordmark, the primary action and a Menu
  button. Services, Industries and About live in the menu. It sits clear
  over the homepage film and picks up a charcoal ground once the page scrolls.
  Menu opens a full-screen sheet: the main pages as large words down the left,
  staggered in, and the smaller routes, the directors' numbers and the action on
  the right. Same sheet on a phone and a desktop, so there is one menu to learn.
*/

/* The pages, listed in the menu. The bar itself stays clean: wordmark, Free audit, Menu. */
const PRIMARY: { href: string; label: string }[] = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/instagram-account-recovery", label: "Account recovery" },
  { href: "/about", label: "About" },
  { href: "/audit", label: "Free audit" },
];

const SECONDARY: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Services",
    links: SERVICES.map((sv) => ({ href: `/services#${sv.id}`, label: sv.name })),
  },
  {
    title: "Industries",
    links: INDUSTRIES.map((i) => ({ href: `/industries#${i.id}`, label: i.name })),
  },
];

/* Hash routes need a real anchor so cross-page section links are a full navigation. */
function NavLink({
  href,
  className,
  style,
  tabIndex,
  children,
}: {
  href: string;
  className: string;
  style?: React.CSSProperties;
  tabIndex?: number;
  children: React.ReactNode;
}) {
  if (href.startsWith("/#")) {
    return (
      <a href={href} className={className} style={style} tabIndex={tabIndex}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style} tabIndex={tabIndex}>
      {children}
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Close on navigation by adjusting state during render, not in an effect:
     an effect here would cascade an extra render on every route change. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const tab = open ? undefined : -1;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-sheet/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-12 lg:px-20">
          <Link href="/" className="flex min-h-[44px] items-center gap-3" aria-label="Tally home">
            <TallyMark size={22} />
            <span className="font-sans text-lg font-semibold tracking-tight text-ink">tally</span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <Pill href="/audit" size="sm" className="hidden sm:inline-flex">
              Free audit
            </Pill>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="flex min-h-[44px] items-center gap-3 px-2 text-ink"
            >
              <span className="text-[0.9375rem] font-medium">Menu</span>
              <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
                <span className="block h-[2px] w-full bg-current" />
                <span className="block h-[2px] w-full bg-current" />
                <span className="block h-[2px] w-4 self-end bg-signal" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* The menu sheet. */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] overflow-y-auto bg-sheet transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto flex min-h-full max-w-[1440px] flex-col px-6 md:px-12 lg:px-20">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link href="/" className="flex min-h-[44px] items-center gap-3" aria-label="Tally home" tabIndex={tab}>
              <TallyMark size={22} />
              <span className="font-sans text-lg font-semibold tracking-tight text-ink">tally</span>
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              tabIndex={tab}
              className="flex min-h-[44px] items-center gap-3 px-2 text-ink"
            >
              <span className="text-[0.9375rem] font-medium">Close</span>
              <span aria-hidden="true" className="relative block h-5 w-5">
                <span className="absolute left-0 top-1/2 block h-[2px] w-5 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 block h-[2px] w-5 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div className="grid flex-1 gap-14 pb-14 pt-8 md:pt-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-24">
            <ul className="flex flex-col">
              {PRIMARY.map((l, i) => (
                <li key={l.href}>
                  <NavLink
                    href={l.href}
                    tabIndex={tab}
                    style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                    className={`group inline-flex items-baseline gap-4 py-1.5 font-sans text-[2.25rem] font-medium leading-[1.15] tracking-[-0.03em] transition-[opacity,transform,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-signal sm:text-[3rem] lg:text-[3.5rem] ${
                      open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    } ${pathname === l.href ? "text-signal" : "text-ink"}`}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div
              className={`flex flex-col gap-10 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "translate-y-0 opacity-100 delay-300" : "translate-y-6 opacity-0"
              }`}
            >
              <div>
                <TallyMark size={28} />
                <p className="mt-6 max-w-[34ch] text-lg leading-[1.5] text-ink-2">
                  Consumer and marine marketing from New Zealand, built on 8 years of growing,
                  monetising and selling Instagram accounts. Start with a free audit, or just call.
                </p>
                <Pill href="/audit" className="mt-7">
                  Get a free audit
                </Pill>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                {SECONDARY.map((g) => (
                  <div key={g.title}>
                    <div className="mono-label text-ink-3">{g.title}</div>
                    <ul className="mt-3 space-y-2">
                      {g.links.map((l) => (
                        <li key={l.href}>
                          <NavLink
                            href={l.href}
                            tabIndex={tab}
                            className="text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
                          >
                            {l.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t rule-hair pt-6">
                {PEOPLE.map((p) => (
                  <a
                    key={p.email}
                    href={`tel:${p.phone}`}
                    tabIndex={tab}
                    className="block text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
                  >
                    {p.name.split(" ")[0]} <span className="tnum text-ink">{p.phoneDisplay}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
