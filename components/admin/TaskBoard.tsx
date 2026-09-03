"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import {
  Button,
  EmptyState,
  Field,
  PriorityChip,
  STATUS_LABEL,
  StatusChip,
  buttonClass,
} from "@/components/admin/ui";
import type { List, Member, Priority, Task, TaskStatus } from "@/lib/supabase/types";

const STATUSES: TaskStatus[] = ["todo", "doing", "blocked", "done"];
const PRIORITIES: { value: Priority; label: string }[] = [
  { value: "p1", label: "P1, now" },
  { value: "p2", label: "P2, next" },
  { value: "p3", label: "P3, later" },
];

export default function TaskBoard({
  initialLists,
  initialTasks,
  members,
  currentMemberId,
}: {
  initialLists: List[];
  initialTasks: Task[];
  members: Member[];
  currentMemberId: string;
}) {
  const supabase = supabaseBrowser();
  const [lists, setLists] = useState(initialLists);
  const [tasks, setTasks] = useState(initialTasks);
  const [hideDone, setHideDone] = useState(false);
  const [live, setLive] = useState(false);

  /* Live updates. Anyone else's edit lands here without a refresh. */
  useEffect(() => {
    const channel = supabase
      .channel("board")
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, (payload) => {
        setTasks((current) => {
          if (payload.eventType === "DELETE") {
            return current.filter((t) => t.id !== (payload.old as Task).id);
          }
          const row = payload.new as Task;
          return [...current.filter((t) => t.id !== row.id), row];
        });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "lists" }, (payload) => {
        setLists((current) => {
          if (payload.eventType === "DELETE") {
            return current.filter((l) => l.id !== (payload.old as List).id);
          }
          const row = payload.new as List;
          return [...current.filter((l) => l.id !== row.id), row].sort(
            (a, b) => a.position - b.position,
          );
        });
      })
      .subscribe((status) => setLive(status === "SUBSCRIBED"));

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase]);

  const patchTask = useCallback(
    async (id: string, patch: Partial<Task>) => {
      setTasks((current) => current.map((t) => (t.id === id ? { ...t, ...patch } : t)));
      await supabase.from("tasks").update(patch).eq("id", id);
    },
    [supabase],
  );

  const removeTask = useCallback(
    async (id: string) => {
      setTasks((current) => current.filter((t) => t.id !== id));
      await supabase.from("tasks").delete().eq("id", id);
    },
    [supabase],
  );

  const addTask = useCallback(
    async (listId: string, title: string) => {
      const siblings = tasks.filter((t) => t.list_id === listId);
      const position = Math.max(0, ...siblings.map((t) => t.position)) + 1000;
      const { data } = await supabase
        .from("tasks")
        .insert({ list_id: listId, title, position, created_by: currentMemberId })
        .select()
        .single<Task>();
      if (data) setTasks((current) => [...current.filter((t) => t.id !== data.id), data]);
    },
    [supabase, tasks, currentMemberId],
  );

  const addList = useCallback(
    async (title: string) => {
      const position = Math.max(0, ...lists.map((l) => l.position)) + 1000;
      const { data } = await supabase
        .from("lists")
        .insert({ title, position, created_by: currentMemberId })
        .select()
        .single<List>();
      if (data) setLists((current) => [...current.filter((l) => l.id !== data.id), data]);
    },
    [supabase, lists, currentMemberId],
  );

  const byList = useMemo(() => {
    const map = new Map<string, Task[]>();
    for (const list of lists) map.set(list.id, []);
    for (const task of tasks) {
      if (hideDone && task.status === "done") continue;
      map.get(task.list_id)?.push(task);
    }
    for (const group of map.values()) group.sort((a, b) => a.position - b.position);
    return map;
  }, [lists, tasks, hideDone]);

  const open = tasks.filter((t) => t.status !== "done").length;

  return (
    <div className="px-5 py-6 md:px-8">
      <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-[var(--line)] pb-4">
        <p className="mono-label tnum text-[var(--ink-2)]">
          {open} open · {tasks.length - open} done
        </p>
        <label className="mono-label flex cursor-pointer items-center gap-2 text-[var(--ink-2)]">
          <input
            type="checkbox"
            checked={hideDone}
            onChange={(e) => setHideDone(e.target.checked)}
          />
          Hide done
        </label>
        <span className="mono-label ml-auto flex items-center gap-2 text-[10px] text-[var(--ink-3)]">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5"
            style={{ background: live ? "var(--accent)" : "var(--ink-3)" }}
          />
          {live ? "Live" : "Connecting"}
        </span>
      </div>

      <div className="space-y-12">
        {lists.map((list) => {
          const rows = byList.get(list.id) ?? [];
          return (
            <section key={list.id}>
              <div className="mb-3">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h2 className="text-[length:var(--t-section)] font-semibold tracking-tight text-[var(--ink)]">
                    {list.title}
                  </h2>
                  <span className="mono-label tnum text-[10px] text-[var(--ink-3)]">
                    {rows.filter((t) => t.status !== "done").length} open
                  </span>
                </div>
                {list.summary && (
                  <p
                    className="mt-1 max-w-3xl text-sm leading-relaxed text-[var(--ink-2)]"
                    style={{ textWrap: "pretty" }}
                  >
                    {list.summary}
                  </p>
                )}
              </div>

              {rows.length === 0 ? (
                <EmptyState
                  title={hideDone ? "Everything here is done" : "Nothing in this list yet"}
                  body={
                    hideDone
                      ? "Untick Hide done to see the completed work."
                      : "Add the first task below. Tick the box on the left to complete one, or click a task to set its owner, priority and due date."
                  }
                />
              ) : (
                <ul className="border-t border-[var(--line)]">
                  {rows.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      members={members}
                      onPatch={patchTask}
                      onRemove={removeTask}
                    />
                  ))}
                </ul>
              )}

              <AddRow placeholder="Add a task" onSubmit={(value) => addTask(list.id, value)} />
            </section>
          );
        })}
      </div>

      <div className="mt-14 border-t border-[var(--line)] pt-6">
        <AddRow placeholder="Add a new list" onSubmit={addList} />
      </div>
    </div>
  );
}

function TaskRow({
  task,
  members,
  onPatch,
  onRemove,
}: {
  task: Task;
  members: Member[];
  onPatch: (id: string, patch: Partial<Task>) => void;
  onRemove: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const assignee = members.find((m) => m.id === task.assignee_id);
  const done = task.status === "done";
  const overdue =
    task.due_date && !done && task.due_date < new Date().toISOString().slice(0, 10);

  return (
    <li className="group border-b border-[var(--line)] transition-colors duration-150 hover:bg-[var(--s-panel)]">
      <div className="flex items-center gap-3 py-2.5 pl-1 pr-1">
        <button
          type="button"
          onClick={() => onPatch(task.id, { status: done ? "todo" : "done" })}
          aria-label={done ? `Reopen ${task.title}` : `Complete ${task.title}`}
          className={[
            "mt-0.5 h-4 w-4 shrink-0 border transition-colors duration-150",
            done
              ? "border-[var(--accent)] bg-[var(--accent)]"
              : "border-[var(--line-strong)] hover:border-[var(--accent)]",
          ].join(" ")}
        />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="min-w-0 flex-1 text-left"
        >
          <span
            className={[
              "text-sm leading-snug transition-colors",
              done ? "text-[var(--ink-3)] line-through" : "text-[var(--ink)]",
            ].join(" ")}
            style={{ textWrap: "pretty" }}
          >
            {task.title}
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-1.5 opacity-90 transition-opacity group-hover:opacity-100">
          {task.due_date && (
            <span
              className={[
                "mono-label tnum border px-1.5 py-0.5 text-[10px]",
                overdue
                  ? "border-[color-mix(in_srgb,var(--st-blocked)_45%,transparent)] text-[var(--st-blocked)]"
                  : "border-[var(--line)] text-[var(--ink-3)]",
              ].join(" ")}
            >
              {task.due_date.slice(5)}
            </span>
          )}
          {assignee && (
            <span className="mono-label border border-[var(--line)] px-1.5 py-0.5 text-[10px] text-[var(--ink-3)]">
              {(assignee.full_name ?? assignee.email).split(" ")[0].slice(0, 8)}
            </span>
          )}
          <PriorityChip priority={task.priority} />
          <StatusChip status={task.status} />
        </div>
      </div>

      {open && (
        /* Keyed on updated_at so a saved change, yours or a collaborator's,
           remounts the fields with the new values instead of syncing in an effect. */
        <TaskDetail
          key={task.updated_at}
          task={task}
          members={members}
          onPatch={onPatch}
          onRemove={onRemove}
        />
      )}
    </li>
  );
}

function TaskDetail({
  task,
  members,
  onPatch,
  onRemove,
}: {
  task: Task;
  members: Member[];
  onPatch: (id: string, patch: Partial<Task>) => void;
  onRemove: (id: string) => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [detail, setDetail] = useState(task.detail ?? "");

  return (
    <div className="mb-4 space-y-3 border-l border-[var(--line-strong)] pl-4">
      <Field label="Title">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => title !== task.title && onPatch(task.id, { title })}
        />
      </Field>

      <Field label="Detail">
        <textarea
          rows={5}
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          onBlur={() =>
            detail !== (task.detail ?? "") && onPatch(task.id, { detail: detail || null })
          }
          className="leading-relaxed"
        />
      </Field>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Status">
          <select
            value={task.status}
            onChange={(e) => onPatch(task.id, { status: e.target.value as TaskStatus })}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s].label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Priority">
          <select
            value={task.priority}
            onChange={(e) => onPatch(task.id, { priority: e.target.value as Priority })}
          >
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Due">
          <input
            type="date"
            value={task.due_date ?? ""}
            onChange={(e) => onPatch(task.id, { due_date: e.target.value || null })}
          />
        </Field>

        <Field label="Owner">
          <select
            value={task.assignee_id ?? ""}
            onChange={(e) => onPatch(task.id, { assignee_id: e.target.value || null })}
          >
            <option value="">Unassigned</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.full_name ?? m.email}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          if (confirm(`Delete "${task.title}"? This cannot be undone.`)) onRemove(task.id);
        }}
      >
        Delete task
      </Button>
    </div>
  );
}

function AddRow({
  placeholder,
  onSubmit,
}: {
  placeholder: string;
  onSubmit: (value: string) => void | Promise<void>;
}) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (!trimmed) return;
        setValue("");
        void onSubmit(trimmed);
      }}
      className="mt-3 flex gap-2"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <button type="submit" disabled={!value.trim()} className={buttonClass("secondary", "md")}>
        Add
      </button>
    </form>
  );
}
