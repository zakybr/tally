"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TallyMark from "@/components/TallyMark";
import Pill from "@/components/Pill";
import { PEOPLE } from "@/lib/contact";

/*
  Two doors, both on the right. The bar used to carry five flat links plus a
  sectors dropdown, which made the eye scan six things before reaching the one
  action. Everything now hangs off Sectors or About, so the bar reads as
  wordmark, two words, one button.

  Hover opens a menu for a pointer. Click and keyboard open it too, because a
  hover-only menu is unreachable on a touch screen at desktop width.
*/

type MenuId = "sectors" | "about";

const MENUS: { id: MenuId; label: string; blurb: string; links: { href: string; label: string }[] }[] = [
  {
    id: "sectors",
    label: "Sectors",
    blurb: "Every brief opens with the number it has to hit.",
    links: [
      { href: "/marine-marketing", label: "Marine, boats & charter" },
      { href: "/seafood-aquaculture-marketing", label: "Seafood & aquaculture" },
      { href: "/forestry-marketing", label: "Forestry & wood" },
      { href: "/horticulture-marketing", label: "Horticulture" },
      { href: "/primary-industries-marketing", label: "All sectors" },
    ],
  },
  {
    id: "about",
    label: "About",
    blurb: "How the work is scoped, priced and guaranteed.",
    links: [
      { href: "/about", label: "About Tally" },
      { href: "/#offer", label: "What we run" },
      { href: "/guarantee", label: "The guarantee" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/proof", label: "Proof" },
    ],
  },
];

/* Root-hash routes need a real anchor so /about to /#offer is a full navigation. */
function MenuLink({ href, label, tabbable }: { href: string; label: string; tabbable: boolean }) {
  const cls =
    "py-2.5 font-sans text-[1.5rem] leading-none tracking-[-0.025em] text-ink-2 transition-colors duration-200 hover:text-ink";
  if (href.startsWith("/#")) {
    return (
      <a href={href} className={cls} tabIndex={tabbable ? undefined : -1}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} tabIndex={tabbable ? undefined : -1}>
      {label}
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [drawer, setDrawer] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const navRef = useRef<HTMLElement>(null);

  /* Close on navigation by adjusting state during render, not in an effect:
     an effect here would cascade an extra render on every route change. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setDrawer(false);
    setMenu(null);
  }

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    const onDown = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [menu]);

  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawer(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const active = MENUS.find((m) => m.id === menu);

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setMenu(null)}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        menu ? "bg-sheet" : "bg-sheet/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-12 lg:px-20">
        <Link href="/" className="flex min-h-[44px] items-center gap-3" aria-label="Tally home">
          <TallyMark size={22} />
          <span className="font-sans text-lg font-semibold tracking-tight text-ink">tally</span>
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-8 lg:flex">
            {MENUS.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`mono-label link-wipe transition-colors ${
                  menu === m.id ? "text-ink" : "text-ink-2 hover:text-ink"
                }`}
                aria-haspopup="true"
                aria-expanded={menu === m.id}
                onMouseEnter={() => setMenu(m.id)}
                onClick={() => setMenu((v) => (v === m.id ? null : m.id))}
              >
                {m.label}
              </button>
            ))}
          </div>

          <Pill
            variant="outline"
            size="sm"
            arrow={false}
            className="lg:hidden"
            aria-expanded={drawer}
            aria-controls="mobile-nav"
            onClick={() => setDrawer((v) => !v)}
          >
            {drawer ? "Close" : "Menu"}
          </Pill>
          <Pill href="/contact" size="sm" className="hidden sm:inline-flex">
            Start the Proof
          </Pill>
        </div>
      </div>

      {/* One panel, contents switched by which door you came through. */}
      <div
        className={`absolute inset-x-0 top-full hidden overflow-hidden bg-sheet transition-[max-height,opacity] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:block ${
          menu ? "max-h-[34rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-start gap-20 px-6 pb-20 pt-14 md:px-12 lg:px-20">
          <div>
            <span className="mono-label text-ink-3">{active?.label}</span>
            <p className="mt-6 max-w-[24ch] font-sans text-lg leading-[1.45] text-ink-2">
              {active?.blurb}
            </p>
            <div className="mt-10 space-y-2">
              {PEOPLE.map((p) => (
                <a
                  key={p.email}
                  href={`tel:${p.phone}`}
                  className="mono-label block text-ink-3 transition-colors hover:text-ink"
                >
                  {p.name.split(" ")[0]}{" "}
                  <span className="font-mono tnum text-ink-2">{p.phoneDisplay}</span>
                </a>
              ))}
            </div>
          </div>

          <div aria-label={active?.label} className="flex flex-col items-end">
            {active?.links.map((l) => (
              <MenuLink key={l.href} href={l.href} label={l.label} tabbable={!!menu} />
            ))}
          </div>
        </div>
        <div className="border-b rule-hair" />
      </div>

      {/* Scrim: darkens the page so the open menu is the only live layer. */}
      <div
        onClick={() => setMenu(null)}
        aria-hidden="true"
        className={`fixed inset-0 -z-10 hidden bg-sheet/80 transition-opacity duration-300 lg:block ${
          menu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {drawer && (
        <div
          id="mobile-nav"
          className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t rule-hair bg-sheet lg:hidden"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col px-6 pb-8 pt-4">
            {MENUS.map((m) => (
              <div key={m.id} className="mb-6">
                <span className="mono-label text-ink-3">{m.label}</span>
                {m.links.map((l) =>
                  l.href.startsWith("/#") ? (
                    <a
                      key={l.href}
                      href={l.href}
                      className="mono-label block border-b rule-hair py-3.5 text-[0.8125rem] text-ink-2"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="mono-label block border-b rule-hair py-3.5 text-[0.8125rem] text-ink-2"
                    >
                      {l.label}
                    </Link>
                  ),
                )}
              </div>
            ))}

            <Pill href="/contact" className="mt-2 w-full">
              Start the Proof
            </Pill>
            <div className="mt-6 space-y-3">
              {PEOPLE.map((p) => (
                <div key={p.email}>
                  <a
                    href={`tel:${p.phone}`}
                    className="mono-label block text-ink transition-colors hover:text-signal"
                  >
                    {p.name.split(" ")[0]} <span className="font-mono tnum">{p.phoneDisplay}</span>
                  </a>
                  <a
                    href={`mailto:${p.email}`}
                    className="mono-label mt-1 block text-ink-3 hover:text-ink"
                  >
                    {p.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
