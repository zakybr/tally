"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { List, Member, Priority, Task, TaskStatus } from "@/lib/supabase/types";

const STATUS: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "To do" },
  { value: "doing", label: "Doing" },
  { value: "blocked", label: "Blocked" },
  { value: "done", label: "Done" },
];

const PRIORITY: { value: Priority; label: string }[] = [
  { value: "p1", label: "P1 — now" },
  { value: "p2", label: "P2 — next" },
  { value: "p3", label: "P3 — later" },
];

const statusStyle: Record<TaskStatus, string> = {
  todo: "border-hairline text-ink-2",
  doing: "border-amber text-amber",
  blocked: "border-[#C9A961] text-[#C9A961]",
  done: "border-hairline text-ink-2 line-through",
};

const priorityStyle: Record<Priority, string> = {
  p1: "border-amber text-amber",
  p2: "border-hairline text-ink-2",
  p3: "border-hairline text-[#6e665e]",
};

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
          const without = current.filter((t) => t.id !== row.id);
          return [...without, row];
        });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "lists" }, (payload) => {
        setLists((current) => {
          if (payload.eventType === "DELETE") {
            return current.filter((l) => l.id !== (payload.old as List).id);
          }
          const row = payload.new as List;
          const without = current.filter((l) => l.id !== row.id);
          return [...without, row].sort((a, b) => a.position - b.position);
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

  const openCount = tasks.filter((t) => t.status !== "done").length;

  return (
    <div className="px-5 py-6 md:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <p className="mono-label text-ink-2">
          {openCount} open · {tasks.length - openCount} done
        </p>
        <label className="mono-label flex cursor-pointer items-center gap-2 text-ink-2">
          <input
            type="checkbox"
            checked={hideDone}
            onChange={(e) => setHideDone(e.target.checked)}
            className="h-4 w-4 accent-[#d9711a]"
            style={{ width: 16 }}
          />
          Hide done
        </label>
        <span className="mono-label flex items-center gap-2 text-ink-2">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2"
            style={{ background: live ? "#d9711a" : "#6e665e" }}
          />
          {live ? "Live" : "Connecting"}
        </span>
      </div>

      <div className="space-y-10">
        {lists.map((list) => (
          <section key={list.id}>
            <div className="mb-3 border-b border-hairline pb-2">
              <h2 className="text-lg font-semibold tracking-tight">{list.title}</h2>
              {list.summary && (
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-ink-2">
                  {list.summary}
                </p>
              )}
            </div>

            <ul className="divide-y divide-[rgba(245,242,234,0.08)]">
              {(byList.get(list.id) ?? []).map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  members={members}
                  onPatch={patchTask}
                  onRemove={removeTask}
                />
              ))}
            </ul>

            <AddRow
              placeholder="Add a task"
              onSubmit={(value) => addTask(list.id, value)}
            />
          </section>
        ))}
      </div>

      <div className="mt-12 border-t border-hairline pt-6">
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
  const overdue =
    task.due_date && task.status !== "done" && task.due_date < new Date().toISOString().slice(0, 10);

  return (
    <li className="py-2.5">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onPatch(task.id, { status: task.status === "done" ? "todo" : "done" })}
          aria-label={task.status === "done" ? `Reopen ${task.title}` : `Complete ${task.title}`}
          className={[
            "mt-0.5 h-4 w-4 shrink-0 border transition-colors",
            task.status === "done"
              ? "border-amber bg-amber"
              : "border-[rgba(245,242,234,0.3)] hover:border-amber",
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
              "text-sm leading-snug",
              task.status === "done" ? "text-ink-2 line-through" : "text-ink",
            ].join(" ")}
          >
            {task.title}
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-1.5">
          {task.due_date && (
            <span
              className={[
                "mono-label border px-1.5 py-0.5 text-[10px]",
                overdue ? "border-amber text-amber" : "border-hairline text-ink-2",
              ].join(" ")}
            >
              {task.due_date.slice(5)}
            </span>
          )}
          {assignee && (
            <span className="mono-label border border-hairline px-1.5 py-0.5 text-[10px] text-ink-2">
              {(assignee.full_name ?? assignee.email).split(" ")[0].slice(0, 8)}
            </span>
          )}
          <span
            className={`mono-label border px-1.5 py-0.5 text-[10px] ${priorityStyle[task.priority]}`}
          >
            {task.priority.toUpperCase()}
          </span>
          <span
            className={`mono-label border px-1.5 py-0.5 text-[10px] ${statusStyle[task.status]}`}
          >
            {STATUS.find((s) => s.value === task.status)?.label}
          </span>
        </div>
      </div>

      {open && (
        /* Keyed on updated_at so a saved change — yours or a collaborator's —
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
        <div className="mt-3 space-y-3 border-l-2 border-amber-dim pl-4">
          <label className="block">
            <span className="mono-label mb-1.5 block text-ink-2">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => title !== task.title && onPatch(task.id, { title })}
            />
          </label>

          <label className="block">
            <span className="mono-label mb-1.5 block text-ink-2">Detail</span>
            <textarea
              rows={5}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              onBlur={() =>
                detail !== (task.detail ?? "") && onPatch(task.id, { detail: detail || null })
              }
              className="leading-relaxed"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block">
              <span className="mono-label mb-1.5 block text-ink-2">Status</span>
              <select
                value={task.status}
                onChange={(e) => onPatch(task.id, { status: e.target.value as TaskStatus })}
              >
                {STATUS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mono-label mb-1.5 block text-ink-2">Priority</span>
              <select
                value={task.priority}
                onChange={(e) => onPatch(task.id, { priority: e.target.value as Priority })}
              >
                {PRIORITY.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mono-label mb-1.5 block text-ink-2">Due</span>
              <input
                type="date"
                value={task.due_date ?? ""}
                onChange={(e) => onPatch(task.id, { due_date: e.target.value || null })}
              />
            </label>

            <label className="block">
              <span className="mono-label mb-1.5 block text-ink-2">Owner</span>
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
            </label>
          </div>

          <button
            type="button"
            onClick={() => {
              if (confirm(`Delete "${task.title}"? This cannot be undone.`)) onRemove(task.id);
            }}
            className="mono-label border border-hairline px-3 py-2 text-ink-2 hover:border-amber hover:text-amber"
          >
            Delete task
          </button>
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
      <button
        type="submit"
        disabled={!value.trim()}
        className="mono-label shrink-0 border border-hairline px-4 text-ink-2 hover:border-amber hover:text-amber disabled:opacity-40"
      >
        Add
      </button>
    </form>
  );
}
