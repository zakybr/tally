"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TallyMark from "@/components/TallyMark";
import type { Member } from "@/lib/supabase/types";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/tasks", label: "Tasks" },
  { href: "/admin/notes", label: "Notes" },
  { href: "/admin/brand", label: "Brand" },
  { href: "/admin/team", label: "Team" },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export default function AdminShell({
  member,
  children,
}: {
  member: Member;
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "/admin";
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  /* Close the mobile drawer whenever the route changes, including on back/forward. */
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const nav = (onNavigate?: () => void) =>
    NAV.map((item) => {
      const active = isActive(pathname, item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className={[
            "mono-label border-l-2 px-4 py-3 transition-colors",
            active
              ? "border-amber bg-panel text-amber"
              : "border-transparent text-ink-2 hover:border-hairline hover:text-ink",
          ].join(" ")}
        >
          {item.label}
        </Link>
      );
    });

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Mobile bar */}
      <header className="flex items-center justify-between border-b border-hairline px-4 py-3 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2.5" aria-label="Tally portal">
          <TallyMark size={20} />
          <span className="font-sans text-base font-semibold tracking-tight text-ink">
            tally
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="admin-nav"
          className="mono-label border border-hairline px-3 py-2 text-ink"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      {open && (
        <nav id="admin-nav" className="flex flex-col border-b border-hairline py-2 lg:hidden">
          {nav(() => setOpen(false))}
          <SignOut className="mx-4 mt-3" />
        </nav>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-hairline lg:flex">
        <Link
          href="/admin"
          className="flex items-center gap-3 border-b border-hairline px-4 py-5"
          aria-label="Tally portal"
        >
          <TallyMark size={22} />
          <span className="font-sans text-lg font-semibold tracking-tight text-ink">tally</span>
        </Link>

        <nav className="flex flex-1 flex-col py-3">{nav()}</nav>

        <div className="border-t border-hairline p-4">
          <p className="truncate text-xs text-ink-2" title={member.email}>
            {member.full_name ?? member.email}
          </p>
          <p className="mono-label mt-1 text-[10px] text-amber">{member.role}</p>
          <SignOut className="mt-3 w-full" />
        </div>
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}

function SignOut({ className = "" }: { className?: string }) {
  return (
    <form action="/auth/signout" method="post" className={className}>
      <button
        type="submit"
        className="mono-label w-full border border-hairline px-3 py-2 text-ink-2 hover:border-amber hover:text-amber"
      >
        Sign out
      </button>
    </form>
  );
}
