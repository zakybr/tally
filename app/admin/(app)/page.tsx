import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import { supabaseServer } from "@/lib/supabase/server";
import type { List, Note, Task } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await supabaseServer();

  const [tasksResult, listsResult, notesResult, noteCount, promptCount] = await Promise.all([
    supabase.from("tasks").select("*"),
    supabase.from("lists").select("*").eq("archived", false).order("position"),
    /* The six most recent, for the list below. The stat needs its own count —
       reading .length off this would cap the headline number at six. */
    supabase
      .from("notes")
      .select("id, title, updated_at")
      .eq("archived", false)
      .order("updated_at", { ascending: false })
      .limit(6),
    supabase.from("notes").select("id", { count: "exact", head: true }).eq("archived", false),
    supabase.from("prompts").select("id", { count: "exact", head: true }),
  ]);

  const tasks = (tasksResult.data ?? []) as Task[];
  const lists = (listsResult.data ?? []) as List[];
  const notes = (notesResult.data ?? []) as Pick<Note, "id" | "title" | "updated_at">[];

  const open = tasks.filter((t) => t.status !== "done");
  const blocked = tasks.filter((t) => t.status === "blocked");
  const urgent = open.filter((t) => t.priority === "p1");
  const listTitle = (id: string) => lists.find((l) => l.id === id)?.title ?? "";

  const stats = [
    { label: "Open tasks", value: open.length, href: "/admin/tasks" },
    { label: "P1 — now", value: urgent.length, href: "/admin/tasks" },
    { label: "Blocked", value: blocked.length, href: "/admin/tasks" },
    { label: "Notes", value: noteCount.count ?? 0, href: "/admin/notes" },
    { label: "Prompts", value: promptCount.count ?? 0, href: "/admin/brand" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Tally · internal"
        title="Portal"
        lede="Commercial in confidence. Everything in here is shared live with anyone else signed in."
      />

      <div className="px-5 py-6 md:px-8">
        <div className="grid gap-px border border-hairline bg-[rgba(245,242,234,0.08)] sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href} className="group bg-bg p-5 hover:bg-panel">
              <p className="font-mono text-3xl font-semibold tabular-nums text-ink group-hover:text-amber">
                {stat.value}
              </p>
              <p className="mono-label mt-1 text-[10px] text-ink-2">{stat.label}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <section>
            <p className="eyebrow mb-3">Needs a decision</p>
            {urgent.length === 0 && blocked.length === 0 ? (
              <p className="py-4 text-sm text-ink-2">Nothing urgent and nothing blocked.</p>
            ) : (
              <ul className="divide-y divide-[rgba(245,242,234,0.08)] border-y border-hairline">
                {[...blocked, ...urgent.filter((t) => t.status !== "blocked")]
                  .slice(0, 8)
                  .map((task) => (
                    <li key={task.id} className="py-3">
                      <Link href="/admin/tasks" className="group block">
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-sm leading-snug text-ink group-hover:text-amber">
                            {task.title}
                          </span>
                          <span
                            className={[
                              "mono-label shrink-0 border px-1.5 py-0.5 text-[10px]",
                              task.status === "blocked"
                                ? "border-[#C9A961] text-[#C9A961]"
                                : "border-amber text-amber",
                            ].join(" ")}
                          >
                            {task.status === "blocked" ? "Blocked" : "P1"}
                          </span>
                        </div>
                        <p className="mono-label mt-1 text-[10px] text-[#6e665e]">
                          {listTitle(task.list_id)}
                        </p>
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </section>

          <section>
            <p className="eyebrow mb-3">Recently edited</p>
            {notes.length === 0 ? (
              <p className="py-4 text-sm text-ink-2">No notes yet.</p>
            ) : (
              <ul className="divide-y divide-[rgba(245,242,234,0.08)] border-y border-hairline">
                {notes.map((note) => (
                  <li key={note.id}>
                    <Link
                      href={`/admin/notes/${note.id}`}
                      className="group flex items-baseline justify-between gap-3 py-3"
                    >
                      <span className="text-sm text-ink group-hover:text-amber">
                        {note.title}
                      </span>
                      <span className="mono-label shrink-0 text-[10px] text-ink-2">
                        {new Date(note.updated_at).toLocaleDateString("en-NZ", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
