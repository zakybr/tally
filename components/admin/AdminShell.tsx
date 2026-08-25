"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TallyMark from "@/components/TallyMark";
import { buttonClass } from "@/components/admin/ui";
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
            "mono-label px-4 py-3 transition-colors duration-150",
            active
              ? "bg-[var(--s-raised)] text-[var(--accent)]"
              : "text-[var(--ink-2)] hover:bg-[var(--s-panel)] hover:text-[var(--ink)]",
          ].join(" ")}
        >
          {item.label}
        </Link>
      );
    });

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Mobile bar */}
      <header className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--s-chrome)] px-4 py-3 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2.5" aria-label="Tally portal">
          <TallyMark size={20} />
          <span className="font-sans text-base font-semibold tracking-tight text-[var(--ink)]">
            tally
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="admin-nav"
          className={buttonClass("secondary", "md")}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      {open && (
        <nav
          id="admin-nav"
          className="flex flex-col border-b border-[var(--line)] bg-[var(--s-chrome)] py-2 lg:hidden"
        >
          {nav(() => setOpen(false))}
          <div className="mt-2 border-t border-[var(--line)] px-4 pt-3">
            <MemberBlock member={member} />
          </div>
        </nav>
      )}

      {/* Desktop sidebar — its own neutral layer, so chrome reads apart from content. */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-[var(--line)] bg-[var(--s-chrome)] lg:flex">
        <Link
          href="/admin"
          className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-5"
          aria-label="Tally portal"
        >
          <TallyMark size={22} />
          <span className="font-sans text-lg font-semibold tracking-tight text-[var(--ink)]">
            tally
          </span>
        </Link>

        <nav className="flex flex-1 flex-col py-3">{nav()}</nav>

        <div className="border-t border-[var(--line)] p-4">
          <MemberBlock member={member} />
        </div>
      </aside>

      {/* Cap the measure so rows do not stretch across a wide monitor. */}
      <main className="min-w-0 flex-1 bg-[var(--s-ground)]">
        <div className="mx-auto w-full max-w-[1180px]">{children}</div>
      </main>
    </div>
  );
}

function MemberBlock({ member }: { member: Member }) {
  return (
    <>
      <p className="truncate text-xs text-[var(--ink-2)]" title={member.email}>
        {member.full_name ?? member.email}
      </p>
      <p className="mono-label mt-1 text-[10px] text-[var(--ink-3)]">{member.role}</p>
      <form action="/auth/signout" method="post" className="mt-3">
        <button type="submit" className={buttonClass("secondary", "sm", "w-full")}>
          Sign out
        </button>
      </form>
    </>
  );
}
