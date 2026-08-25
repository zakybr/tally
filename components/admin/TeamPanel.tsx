"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { AllowedEmail, Member } from "@/lib/supabase/types";

export default function TeamPanel({
  members,
  initialAllowed,
  isOwner,
  currentId,
}: {
  members: Member[];
  initialAllowed: AllowedEmail[];
  isOwner: boolean;
  currentId: string;
}) {
  const supabase = supabaseBrowser();
  const [allowed, setAllowed] = useState(initialAllowed);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const signedUp = new Set(members.map((m) => m.email.toLowerCase()));

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!clean) return;

    setBusy(true);
    setError(null);

    const { data, error: insertError } = await supabase
      .from("allowed_emails")
      .insert({ email: clean, note: note.trim() || null })
      .select()
      .single<AllowedEmail>();

    setBusy(false);

    if (insertError) {
      setError(
        insertError.code === "23505"
          ? "That email is already on the list."
          : insertError.message,
      );
      return;
    }

    if (data) {
      setAllowed((current) => [...current, data]);
      setEmail("");
      setNote("");
    }
  }

  async function revoke(target: string) {
    if (!confirm(`Remove ${target}? They lose access the next time they sign in.`)) return;
    setAllowed((current) => current.filter((a) => a.email !== target));
    await supabase.from("allowed_emails").delete().eq("email", target);
  }

  return (
    <div className="space-y-12 px-5 py-6 md:px-8">
      <section>
        <p className="eyebrow mb-3">Signed in at least once</p>
        <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {members.map((m) => (
            <li key={m.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--ink)]">
                  {m.full_name ?? m.email}
                  {m.id === currentId && (
                    <span className="mono-label ml-2 text-[10px] text-[var(--ink-2)]">you</span>
                  )}
                </p>
                <p className="mt-0.5 truncate text-xs text-[var(--ink-2)]">{m.email}</p>
              </div>
              <span className="mono-label border border-[var(--line)] px-2 py-1 text-[10px] text-[var(--accent)]">
                {m.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="eyebrow mb-1">Allowlist</p>
        <h2 className="mb-2 text-lg font-semibold tracking-tight">Who can get in</h2>
        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-[var(--ink-2)]">
          Only these addresses become members when they sign in with Google. Anyone else who
          tries lands on a locked screen and can read nothing.
        </p>

        {isOwner && (
          <form onSubmit={invite} className="mb-6 grid gap-3 sm:grid-cols-[2fr_2fr_auto]">
            <label className="block">
              <span className="mono-label mb-1.5 block text-[var(--ink-2)]">Google email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </label>
            <label className="block">
              <span className="mono-label mb-1.5 block text-[var(--ink-2)]">Note (optional)</span>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Who they are"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="mono-label self-end border border-[var(--accent)] bg-[var(--accent)] px-4 py-2.5 text-[var(--s-ground)] hover:bg-transparent hover:text-[var(--accent)] disabled:opacity-60"
            >
              {busy ? "Adding" : "Add"}
            </button>
          </form>
        )}

        {error && (
          <p role="alert" className="mb-4 border-l border-[var(--accent)] bg-[var(--s-panel)] px-4 py-3 text-sm">
            {error}
          </p>
        )}

        <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {allowed.map((a) => (
            <li key={a.email} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div className="min-w-0">
                <p className="truncate text-sm text-[var(--ink)]">{a.email}</p>
                {a.note && <p className="mt-0.5 text-xs text-[var(--ink-2)]">{a.note}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={[
                    "mono-label border px-2 py-1 text-[10px]",
                    signedUp.has(a.email.toLowerCase())
                      ? "border-[var(--line)] text-[var(--ink-2)]"
                      : "border-[var(--line-strong)] text-[#c9a961]",
                  ].join(" ")}
                >
                  {signedUp.has(a.email.toLowerCase()) ? "active" : "not signed in yet"}
                </span>
                {isOwner && a.email !== "thezakyrachmadi@gmail.com" && (
                  <button
                    type="button"
                    onClick={() => revoke(a.email)}
                    className="mono-label border border-[var(--line)] px-3 py-1.5 text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    Remove
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        {!isOwner && (
          <p className="mt-4 text-xs text-[var(--ink-2)]">
            Only the account owner can change the allowlist.
          </p>
        )}
      </section>
    </div>
  );
}
