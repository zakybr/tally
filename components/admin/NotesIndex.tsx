"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { EmptyState, buttonClass } from "@/components/admin/ui";
import type { Note } from "@/lib/supabase/types";

type Row = Pick<
  Note,
  "id" | "title" | "plain_text" | "tags" | "updated_at" | "collection" | "pinned"
>;

export default function NotesIndex({
  initialNotes,
  memberId,
}: {
  initialNotes: Row[];
  memberId: string;
}) {
  const supabase = supabaseBrowser();
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes);
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  /* Someone else adding or renaming a note shows up here without a refresh. */
  useEffect(() => {
    const channel = supabase
      .channel("notes-index")
      .on("postgres_changes", { event: "*", schema: "public", table: "notes" }, (payload) => {
        setNotes((current) => {
          if (payload.eventType === "DELETE") {
            return current.filter((n) => n.id !== (payload.old as Note).id);
          }
          const row = payload.new as Note;
          if (row.archived) return current.filter((n) => n.id !== row.id);
          const next: Row = {
            id: row.id,
            title: row.title,
            plain_text: row.plain_text,
            tags: row.tags,
            updated_at: row.updated_at,
            collection: row.collection,
            pinned: row.pinned,
          };
          return [next, ...current.filter((n) => n.id !== row.id)];
        });
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase]);

  const collections = useMemo(
    () => [...new Set(notes.map((n) => n.collection))].sort(),
    [notes],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notes.filter((n) => {
      if (collection && n.collection !== collection) return false;
      if (!q) return true;
      return (
        n.title.toLowerCase().includes(q) ||
        (n.plain_text ?? "").toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [notes, query, collection]);

  /* Group so a second workstream does not turn the index into a pile. */
  const grouped = useMemo(() => {
    const map = new Map<string, Row[]>();
    for (const note of filtered) {
      const list = map.get(note.collection) ?? [];
      list.push(note);
      map.set(note.collection, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return a.updated_at < b.updated_at ? 1 : -1;
      });
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  async function createNote() {
    setCreating(true);
    const { data } = await supabase
      .from("notes")
      .insert({
        title: "Untitled note",
        collection: collection ?? "Unfiled",
        created_by: memberId,
        updated_by: memberId,
      })
      .select("id")
      .single<{ id: string }>();
    setCreating(false);
    if (data) router.push(`/admin/notes/${data.id}`);
  }

  return (
    <div className="px-5 py-6 md:px-8">
      <div className="mb-5 flex flex-wrap gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search titles, body and tags"
          aria-label="Search notes"
          className="max-w-md flex-1"
        />
        <button
          type="button"
          onClick={createNote}
          disabled={creating}
          className={buttonClass("primary", "md", "shrink-0")}
        >
          {creating ? "Creating" : "New note"}
        </button>
      </div>

      {collections.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCollection(null)}
            className={buttonClass(collection === null ? "primary" : "secondary", "sm")}
          >
            All
          </button>
          {collections.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setCollection(name)}
              className={buttonClass(collection === name ? "primary" : "secondary", "sm")}
            >
              {name} · {notes.filter((n) => n.collection === name).length}
            </button>
          ))}
        </div>
      )}

      {grouped.length === 0 ? (
        <EmptyState
          title={query ? `Nothing matches "${query}"` : "No notes yet"}
          body={
            query
              ? "Search looks at titles, body text and tags. Try a shorter word, or clear the box to see everything."
              : "Notes are shared documents. Open one and anyone else in it edits alongside you, cursor and all, nothing needs saving."
          }
          action={
            query ? undefined : (
              <button type="button" onClick={createNote} className={buttonClass("primary", "md")}>
                New note
              </button>
            )
          }
        />
      ) : (
        <div className="space-y-10">
          {grouped.map(([name, rows]) => (
            <section key={name}>
              <div className="mb-2 flex flex-wrap items-baseline gap-x-3 border-b border-[var(--line)] pb-2">
                <h2 className="text-[length:var(--t-section)] font-semibold tracking-tight text-[var(--ink)]">
                  {name}
                </h2>
                <span className="mono-label tnum text-[10px] text-[var(--ink-3)]">
                  {rows.length} {rows.length === 1 ? "note" : "notes"}
                </span>
              </div>

              <ul>
                {rows.map((note) => (
                  <li key={note.id} className="border-b border-[var(--line)]">
                    <Link
                      href={`/admin/notes/${note.id}`}
                      className="group block py-3.5 transition-colors hover:bg-[var(--s-panel)]"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="flex items-baseline gap-2 text-sm font-semibold tracking-tight text-[var(--ink)] group-hover:text-[var(--accent)]">
                          {note.pinned && (
                            <span
                              aria-label="Pinned"
                              title="Pinned"
                              className="inline-block h-1.5 w-1.5 shrink-0 translate-y-[-1px] bg-[var(--accent)]"
                            />
                          )}
                          {note.title}
                        </h3>
                        <span className="mono-label tnum shrink-0 text-[10px] text-[var(--ink-3)]">
                          {new Date(note.updated_at).toLocaleDateString("en-NZ", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </span>
                      </div>
                      {note.plain_text && (
                        <p
                          className="mt-1 line-clamp-2 max-w-3xl text-sm leading-relaxed text-[var(--ink-2)]"
                          style={{ textWrap: "pretty" }}
                        >
                          {note.plain_text.slice(0, 200)}
                        </p>
                      )}
                      {note.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {note.tags.map((tag) => (
                            <span
                              key={tag}
                              className="mono-label border border-[var(--line)] px-1.5 py-0.5 text-[10px] text-[var(--ink-3)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
