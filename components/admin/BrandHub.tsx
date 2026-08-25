"use client";

import { useMemo, useState } from "react";
import TallyMark from "@/components/TallyMark";
import CopyButton from "@/components/admin/CopyButton";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { BrandAsset, Prompt, PromptChannel } from "@/lib/supabase/types";

/* The block every generated asset must carry. Copy this into any Claude Design brief. */
export const BRAND_BLOCK = `BRAND — TALLY (tallynz.co). Non-negotiable.
Logo: the tally mark — four vertical strokes in WHITE (#FFFFFF) with a fifth diagonal cross-stroke in amber (#D9711A) struck rising left to right. Beside it the wordmark "tally" — always lowercase, always WHITE, grotesque semibold, tracking -0.02em. One baseline, gap roughly half the mark width. Never recolour the wordmark, never capitalise it, no tagline inside the lockup.
Ground #0B0B0A. Panels #16191D. Text #FFFFFF primary, #A8A49A secondary.
Accent: amber #D9711A. ONE accent. There is no second brand colour.
Type: grotesque for headings and body (General Sans; substitute Archivo or Inter). Technical face for eyebrows, labels and figures (Alliance No.1; substitute IBM Plex Mono) — ALWAYS uppercase, 0.1em tracking, 11px. Tabular numerals.
Geometry: ZERO border-radius anywhere. Hairline rules 1px white at 8%. No drop shadows, no floating cards, no rounded boxes.
Photography: graded to grayscale 20%, contrast 1.1, brightness 0.9.
Every figure carries a numbered source superscript. Where a number is not published, write "not published" rather than estimating it.
Tone: institutional, plain, unhyped. Short declarative sentences. No exclamation marks, no emoji, no marketing adjectives.`;

const CHANNELS: { value: PromptChannel; label: string }[] = [
  { value: "pitch-deck", label: "Pitch deck" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "one-pager", label: "One-pager" },
  { value: "research", label: "Research" },
  { value: "email", label: "Email" },
  { value: "other", label: "Other" },
];

const CATEGORY_LABEL: Record<BrandAsset["category"], string> = {
  logo: "Logo",
  colour: "Colour",
  type: "Typography",
  imagery: "Imagery",
  rule: "Rules",
};

export default function BrandHub({
  assets,
  initialPrompts,
  memberId,
}: {
  assets: BrandAsset[];
  initialPrompts: Prompt[];
  memberId: string;
}) {
  const [tab, setTab] = useState<"assets" | "prompts">("assets");

  return (
    <div className="px-5 py-6 md:px-8">
      <div
        role="tablist"
        aria-label="Brand sections"
        className="mb-8 flex border-b border-[var(--line)]"
      >
        {(["assets", "prompts"] as const).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={[
              "mono-label -mb-px border-b px-4 py-3 transition-colors",
              tab === key
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-transparent text-[var(--ink-2)] hover:text-[var(--ink)]",
            ].join(" ")}
          >
            {key === "assets" ? "Brand assets" : "Claude Design prompts"}
          </button>
        ))}
      </div>

      {tab === "assets" ? (
        <Assets assets={assets} />
      ) : (
        <Prompts initialPrompts={initialPrompts} memberId={memberId} />
      )}
    </div>
  );
}

/* -------------------------------------------------------------- assets --- */

function Assets({ assets }: { assets: BrandAsset[] }) {
  const grouped = useMemo(() => {
    const map = new Map<BrandAsset["category"], BrandAsset[]>();
    for (const asset of assets) {
      const list = map.get(asset.category) ?? [];
      list.push(asset);
      map.set(asset.category, list);
    }
    return map;
  }, [assets]);

  return (
    <div className="space-y-12">
      <section>
        <p className="eyebrow mb-3">The lockup</p>
        <div className="flex flex-wrap items-center gap-8 border border-[var(--line)] bg-[var(--s-panel)] p-8">
          <div className="flex items-center gap-3">
            <TallyMark size={34} />
            <span className="font-sans text-3xl font-semibold tracking-tight text-[var(--ink)]">
              tally
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/tally-logo.svg"
              download
              role="button"
              className="mono-label inline-flex items-center border border-[var(--line)] px-3 py-2 text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Download SVG
            </a>
            <a
              href="/tally-logo.png"
              download
              role="button"
              className="mono-label inline-flex items-center border border-[var(--line)] px-3 py-2 text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              PNG
            </a>
            <a
              href="/tally-logo-dark.png"
              download
              role="button"
              className="mono-label inline-flex items-center border border-[var(--line)] px-3 py-2 text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              PNG for light grounds
            </a>
            <a
              href="/linkedin-banner.png"
              download
              role="button"
              className="mono-label inline-flex items-center border border-[var(--line)] px-3 py-2 text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              LinkedIn banner
            </a>
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-2)]">
          The wordmark is always lowercase and always white. The amber cross-stroke is the only
          coloured element in the identity.
        </p>
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow mb-1">Paste this into every brief</p>
            <h2 className="text-lg font-semibold tracking-tight">The brand block</h2>
          </div>
          <CopyButton value={BRAND_BLOCK} label="Copy brand block" />
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap border-l border-[var(--accent)] bg-[var(--s-panel)] p-5 text-xs leading-relaxed text-[var(--ink-2)]">
          {BRAND_BLOCK}
        </pre>
      </section>

      {(["colour", "type", "rule", "logo", "imagery"] as const).map((category) => {
        const items = grouped.get(category);
        if (!items?.length) return null;

        return (
          <section key={category}>
            <p className="eyebrow mb-3">{CATEGORY_LABEL[category]}</p>

            {category === "colour" ? (
              <div className="grid gap-px border border-[var(--line)] bg-[rgba(245,242,234,0.08)] sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <div key={item.id} className="bg-[var(--s-ground)] p-4">
                    <div
                      className="mb-3 h-14 w-full border border-[var(--line)]"
                      style={{ background: item.value ?? "transparent" }}
                      aria-hidden="true"
                    />
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--ink)]">{item.name}</p>
                        <p className="mono-label mt-0.5 text-[10px] text-[var(--accent)]">{item.value}</p>
                      </div>
                      {item.value && <CopyButton value={item.value} label="Copy" />}
                    </div>
                    {item.description && (
                      <p className="mt-2 text-xs leading-relaxed text-[var(--ink-2)]">
                        {item.description}
                      </p>
                    )}
                    {item.usage && (
                      <p className="mt-2 text-xs leading-relaxed text-[var(--ink-3)]">{item.usage}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {items.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-sm font-semibold text-[var(--ink)]">{item.name}</h3>
                      {item.value && (
                        <span className="mono-label text-[10px] text-[var(--accent)]">{item.value}</span>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-1 max-w-3xl text-sm leading-relaxed text-[var(--ink-2)]">
                        {item.description}
                      </p>
                    )}
                    {item.usage && (
                      <p className="mt-2 max-w-3xl border-l border-[var(--line-strong)] pl-3 text-xs leading-relaxed text-[var(--ink-2)]">
                        {item.usage}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------- prompts --- */

function Prompts({
  initialPrompts,
  memberId,
}: {
  initialPrompts: Prompt[];
  memberId: string;
}) {
  const supabase = supabaseBrowser();
  const [prompts, setPrompts] = useState(initialPrompts);
  const [filter, setFilter] = useState<PromptChannel | "all">("all");
  const [drafting, setDrafting] = useState(false);

  const visible = prompts.filter((p) => filter === "all" || p.channel === filter);

  async function create(draft: { channel: PromptChannel; title: string; purpose: string; body: string }) {
    const position = Math.max(0, ...prompts.map((p) => p.position)) + 100;
    const { data } = await supabase
      .from("prompts")
      .insert({ ...draft, position, created_by: memberId })
      .select()
      .single<Prompt>();
    if (data) setPrompts((current) => [...current, data]);
    setDrafting(false);
  }

  async function update(id: string, patch: Partial<Prompt>) {
    setPrompts((current) => current.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    await supabase.from("prompts").update(patch).eq("id", id);
  }

  async function remove(id: string) {
    setPrompts((current) => current.filter((p) => p.id !== id));
    await supabase.from("prompts").delete().eq("id", id);
  }

  return (
    <div>
      <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[var(--ink-2)]">
        Every prompt already carries the brand block. Copy one, replace the bracketed
        placeholders, paste it into Claude. Nothing else needs explaining to get an asset that
        looks like Tally.
      </p>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={[
            "mono-label border px-3 py-2 transition-colors",
            filter === "all"
              ? "border-[var(--accent)] text-[var(--accent)]"
              : "border-[var(--line)] text-[var(--ink-2)] hover:text-[var(--ink)]",
          ].join(" ")}
        >
          All
        </button>
        {CHANNELS.map((c) => {
          const count = prompts.filter((p) => p.channel === c.value).length;
          if (!count) return null;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => setFilter(c.value)}
              className={[
                "mono-label border px-3 py-2 transition-colors",
                filter === c.value
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-[var(--line)] text-[var(--ink-2)] hover:text-[var(--ink)]",
              ].join(" ")}
            >
              {c.label} · {count}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setDrafting((v) => !v)}
          className="mono-label ml-auto border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-[var(--s-ground)] transition-colors hover:bg-transparent hover:text-[var(--accent)]"
        >
          {drafting ? "Cancel" : "New prompt"}
        </button>
      </div>

      {drafting && <PromptDraft onSave={create} />}

      <ul className="space-y-px bg-[rgba(245,242,234,0.08)]">
        {visible.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onUpdate={update}
            onRemove={remove}
          />
        ))}
      </ul>
    </div>
  );
}

function PromptCard({
  prompt,
  onUpdate,
  onRemove,
}: {
  prompt: Prompt;
  onUpdate: (id: string, patch: Partial<Prompt>) => void;
  onRemove: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(prompt.body);

  return (
    <li className="bg-[var(--s-ground)] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow mb-1">
            {CHANNELS.find((c) => c.value === prompt.channel)?.label ?? prompt.channel}
          </p>
          <h3 className="text-base font-semibold tracking-tight text-[var(--ink)]">{prompt.title}</h3>
          {prompt.purpose && (
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--ink-2)]">{prompt.purpose}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <CopyButton value={prompt.body} label="Copy prompt" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mono-label border border-[var(--line)] px-3 py-2 text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {open ? "Hide" : "Read"}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-4">
          {editing ? (
            <div className="space-y-3">
              <textarea
                rows={18}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="font-mono text-xs leading-relaxed"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onUpdate(prompt.id, { body });
                    setEditing(false);
                  }}
                  className="mono-label border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-[var(--s-ground)] hover:bg-transparent hover:text-[var(--accent)]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBody(prompt.body);
                    setEditing(false);
                  }}
                  className="mono-label border border-[var(--line)] px-4 py-2 text-[var(--ink-2)] hover:text-[var(--ink)]"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <pre className="overflow-x-auto whitespace-pre-wrap border-l border-[var(--line-strong)] bg-[var(--s-panel)] p-4 text-xs leading-relaxed text-[var(--ink-2)]">
                {prompt.body}
              </pre>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="mono-label border border-[var(--line)] px-3 py-2 text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete the "${prompt.title}" prompt?`)) onRemove(prompt.id);
                  }}
                  className="mono-label border border-[var(--line)] px-3 py-2 text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </li>
  );
}

function PromptDraft({
  onSave,
}: {
  onSave: (draft: {
    channel: PromptChannel;
    title: string;
    purpose: string;
    body: string;
  }) => void;
}) {
  const [channel, setChannel] = useState<PromptChannel>("linkedin");
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [body, setBody] = useState(`${BRAND_BLOCK}\n\n`);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;
        onSave({ channel, title: title.trim(), purpose: purpose.trim(), body });
      }}
      className="mb-6 space-y-3 border border-[var(--line)] bg-[var(--s-panel)] p-5"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mono-label mb-1.5 block text-[var(--ink-2)]">Channel</span>
          <select value={channel} onChange={(e) => setChannel(e.target.value as PromptChannel)}>
            {CHANNELS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mono-label mb-1.5 block text-[var(--ink-2)]">Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
      </div>

      <label className="block">
        <span className="mono-label mb-1.5 block text-[var(--ink-2)]">What it is for</span>
        <input value={purpose} onChange={(e) => setPurpose(e.target.value)} />
      </label>

      <label className="block">
        <span className="mono-label mb-1.5 block text-[var(--ink-2)]">
          Prompt — the brand block is pre-filled, write the brief underneath it
        </span>
        <textarea
          rows={14}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="font-mono text-xs leading-relaxed"
          required
        />
      </label>

      <button
        type="submit"
        className="mono-label border border-[var(--accent)] bg-[var(--accent)] px-4 py-2.5 text-[var(--s-ground)] hover:bg-transparent hover:text-[var(--accent)]"
      >
        Save prompt
      </button>
    </form>
  );
}
