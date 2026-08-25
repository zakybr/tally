import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import { EmptyState, PriorityChip, StatusChip, buttonClass } from "@/components/admin/ui";
import { supabaseServer } from "@/lib/supabase/server";
import type { List, Note, Task } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await supabaseServer();

  const [tasksResult, listsResult, notesResult] = await Promise.all([
    supabase.from("tasks").select("*"),
    supabase.from("lists").select("*").eq("archived", false).order("position"),
    supabase
      .from("notes")
      .select("id, title, updated_at")
      .eq("archived", false)
      .order("updated_at", { ascending: false })
      .limit(6),
  ]);

  const tasks = (tasksResult.data ?? []) as Task[];
  const lists = (listsResult.data ?? []) as List[];
  const notes = (notesResult.data ?? []) as Pick<Note, "id" | "title" | "updated_at">[];

  const open = tasks.filter((t) => t.status !== "done");
  const blocked = tasks.filter((t) => t.status === "blocked");
  const urgent = open.filter((t) => t.priority === "p1" && t.status !== "blocked");
  const listTitle = (id: string) => lists.find((l) => l.id === id)?.title ?? "";

  /* Blocked first, then P1 — the order you would actually work them. */
  const attention = [...blocked, ...urgent].slice(0, 8);

  const progress = lists.map((list) => {
    const inList = tasks.filter((t) => t.list_id === list.id);
    const done = inList.filter((t) => t.status === "done").length;
    return { list, total: inList.length, done };
  });

  return (
    <>
      <PageHeader
        title="Portal"
        lede="Commercial in confidence. Everything here is shared live with anyone else signed in."
      />

      <div className="px-5 py-6 md:px-8">
        {/* One line of context, not a wall of tiles. */}
        <p className="mb-8 text-sm text-[var(--ink-2)]">
          <span className="tnum text-2xl font-semibold text-[var(--ink)]">{open.length}</span>
          <span className="ml-2">open</span>
          <span className="mx-3 text-[var(--ink-3)]">/</span>
          <span className="tnum text-[var(--ink)]">{tasks.length - open.length}</span>
          <span className="ml-2">done</span>
          {blocked.length > 0 && (
            <>
              <span className="mx-3 text-[var(--ink-3)]">/</span>
              <span className="tnum text-[var(--st-blocked)]">{blocked.length}</span>
              <span className="ml-2 text-[var(--st-blocked)]">blocked</span>
            </>
          )}
        </p>

        <section className="mb-12">
          <h2 className="mb-3 text-[length:var(--t-section)] font-semibold tracking-tight text-[var(--ink)]">
            Needs a decision
          </h2>

          {attention.length === 0 ? (
            <EmptyState
              title="Nothing is waiting on you"
              body="Blocked work and anything marked P1 shows up here first. When this is empty, the board is moving on its own."
              action={
                <Link href="/admin/tasks" className={buttonClass("secondary", "md")}>
                  Open the board
                </Link>
              }
            />
          ) : (
            <ul className="border-y border-[var(--line)]">
              {attention.map((task) => (
                <li key={task.id} className="border-b border-[var(--line)] last:border-b-0">
                  <Link
                    href="/admin/tasks"
                    className="group flex flex-wrap items-start justify-between gap-x-4 gap-y-2 px-1 py-3.5 transition-colors hover:bg-[var(--s-panel)]"
                  >
                    <span className="min-w-0 flex-1">
                      <span
                        className="block text-sm leading-snug text-[var(--ink)] group-hover:text-[var(--accent)]"
                        style={{ textWrap: "pretty" }}
                      >
                        {task.title}
                      </span>
                      <span className="mono-label mt-1 block text-[10px] text-[var(--ink-3)]">
                        {listTitle(task.list_id)}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5">
                      <PriorityChip priority={task.priority} />
                      <StatusChip status={task.status} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="grid gap-12 lg:grid-cols-2">
          <section>
            <h2 className="mb-3 text-[length:var(--t-section)] font-semibold tracking-tight text-[var(--ink)]">
              Phases
            </h2>
            {progress.length === 0 ? (
              <p className="py-4 text-sm text-[var(--ink-2)]">No lists yet.</p>
            ) : (
              <ul className="space-y-5">
                {progress.map(({ list, total, done }) => (
                  <li key={list.id}>
                    <Link href="/admin/tasks" className="group block pb-1">
                      <div className="mb-1.5 flex items-baseline justify-between gap-3">
                        <span className="text-sm text-[var(--ink)] group-hover:text-[var(--accent)]">
                          {list.title}
                        </span>
                        <span className="mono-label tnum shrink-0 text-[10px] text-[var(--ink-3)]">
                          {done}/{total}
                        </span>
                      </div>
                      {/* Progress reads as a rule, not a rounded bar. */}
                      <div className="h-px w-full bg-[var(--line)]">
                        <div
                          className="h-px bg-[var(--accent)] transition-[width] duration-300 ease-out"
                          style={{ width: total ? `${(done / total) * 100}%` : "0%" }}
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="mb-3 text-[length:var(--t-section)] font-semibold tracking-tight text-[var(--ink)]">
              Recently edited
            </h2>
            {notes.length === 0 ? (
              <EmptyState
                title="No notes yet"
                body="Notes are shared documents. Open one and anyone else in it edits alongside you, cursor and all."
                action={
                  <Link href="/admin/notes" className={buttonClass("primary", "md")}>
                    New note
                  </Link>
                }
              />
            ) : (
              <ul className="border-y border-[var(--line)]">
                {notes.map((note) => (
                  <li key={note.id} className="border-b border-[var(--line)] last:border-b-0">
                    <Link
                      href={`/admin/notes/${note.id}`}
                      className="group flex items-baseline justify-between gap-3 px-1 py-3 transition-colors hover:bg-[var(--s-panel)]"
                    >
                      <span className="truncate text-sm text-[var(--ink)] group-hover:text-[var(--accent)]">
                        {note.title}
                      </span>
                      <span className="mono-label tnum shrink-0 text-[10px] text-[var(--ink-3)]">
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
