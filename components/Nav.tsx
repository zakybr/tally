"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TallyMark from "@/components/TallyMark";

const links = [
  { href: "/#guarantee", label: "The guarantee", hash: true },
  { href: "/#sectors", label: "Sectors", hash: true },
  { href: "/about", label: "About", hash: false },
  { href: "/#pricing", label: "Pricing", hash: true },
];

function NavLink({
  href,
  label,
  hash,
  className,
}: {
  href: string;
  label: string;
  hash: boolean;
  className: string;
}) {
  /* Plain anchors for root-hash routes so /about → /#guarantee is a full navigation.
     Do not close the mobile drawer in onClick — unmounting the <a> cancels the navigate. */
  if (hash) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = (href: string) => {
    const active = href === "/about" && pathname === "/about";
    return [
      "mono-label transition-colors duration-300",
      active
        ? "text-amber underline decoration-amber underline-offset-4"
        : "text-ink-2 hover:text-ink",
    ].join(" ");
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-12 lg:px-20">
        <Link href="/" className="flex items-center gap-3" aria-label="Tally home">
          <TallyMark size={22} />
          <span className="font-sans text-lg font-semibold tracking-tight text-ink">tally</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              label={l.label}
              hash={l.hash}
              className={linkClass(l.href)}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="mono-label border border-hairline px-3 py-2 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
          <Link
            href="/contact"
            className="mono-label border border-amber bg-amber px-4 py-2.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
          >
            Start the Proof
          </Link>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-hairline bg-bg lg:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                label={l.label}
                hash={l.hash}
                className={`${linkClass(l.href)} py-3`}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
