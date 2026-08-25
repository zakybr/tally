import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Portal", template: "%s · Tally portal" },
  robots: { index: false, follow: false, nocache: true },
};

/* Bare frame. The signed-in shell (sidebar, nav) lives in the (app) group below. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin min-h-screen bg-[var(--s-ground)] text-[var(--ink)]">{children}</div>;
}
