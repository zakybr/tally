"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as Y from "yjs";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import { supabaseBrowser } from "@/lib/supabase/client";
import { SupabaseYjsProvider, fromB64, toB64, type PeerState } from "@/lib/yjs-supabase-provider";
import type { Member, Note } from "@/lib/supabase/types";

/* Stable per-person colour so the same collaborator keeps the same caret. */
const CARET_COLOURS = ["#ff4a1c", "#7c8b93", "#c9a961", "#8a9a5b", "#b0736f"];

function colourFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return CARET_COLOURS[hash % CARET_COLOURS.length];
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* Seed content arrives as plain text. Uppercase lines read as section labels. */
function plainTextToHtml(text: string) {
  return text
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      const isLabel =
        trimmed.length <= 80 &&
        !trimmed.includes("\n") &&
        trimmed === trimmed.toUpperCase() &&
        /[A-Z]/.test(trimmed);
      if (isLabel) return `<h3>${escapeHtml(trimmed)}</h3>`;
      return `<p>${escapeHtml(trimmed).replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

type SaveState = "idle" | "saving" | "saved" | "error";

export default function NoteEditor({
  note,
  member,
}: {
  note: Note;
  member: Member;
}) {
  const supabase = supabaseBrowser();
  const router = useRouter();

  const ydoc = useMemo(() => new Y.Doc(), []);
  const [provider, setProvider] = useState<SupabaseYjsProvider | null>(null);
  const [peers, setPeers] = useState<PeerState[]>([]);
  const [connected, setConnected] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [title, setTitle] = useState(note.title);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seedAttempted = useRef(false);

  const displayName = member.full_name ?? member.email.split("@")[0];

  /* Load whatever is already persisted before anyone connects. */
  useEffect(() => {
    if (note.ydoc) {
      try {
        Y.applyUpdate(ydoc, fromB64(note.ydoc));
      } catch {
        /* Corrupt or truncated state, fall through and let peers or the seed repopulate. */
      }
    }
  }, [ydoc, note.ydoc]);

  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: [
        /* Collaboration brings its own undo stack, so StarterKit's must be off. */
        StarterKit.configure({ undoRedo: false }),
        Placeholder.configure({ placeholder: "Start writing…" }),
        Collaboration.configure({ document: ydoc }),
        ...(provider
          ? [
              CollaborationCaret.configure({
                provider,
                user: { name: displayName, color: colourFor(member.id) },
              }),
            ]
          : []),
      ],
      editorProps: {
        attributes: { class: "tiptap", spellcheck: "true" },
      },
    },
    [provider, ydoc],
  );

  /*
    Connect to the room. The provider owns a realtime socket, so it can only be
    built in an effect, never during render, where StrictMode's double invoke
    would leak a second subscription. The editor then rebuilds once it exists,
    because CollaborationCaret needs the provider up front.
  */
  useEffect(() => {
    const p = new SupabaseYjsProvider(supabase, note.id, ydoc, {
      user: { name: displayName, color: colourFor(member.id) },
      onPeers: setPeers,
      onStatus: setConnected,
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- publishing an external subscription
    setProvider(p);
    return () => {
      p.destroy();
      setProvider(null);
    };
  }, [supabase, note.id, ydoc, displayName, member.id]);

  const persist = useCallback(async () => {
    setSaveState("saving");
    const state = toB64(Y.encodeStateAsUpdate(ydoc));
    const plain = editor?.getText() ?? null;
    const { error } = await supabase
      .from("notes")
      .update({ ydoc: state, plain_text: plain, updated_by: member.id })
      .eq("id", note.id);
    setSaveState(error ? "error" : "saved");
  }, [supabase, ydoc, editor, note.id, member.id]);

  /* Debounced persistence. The CRDT is the source of truth; this is durability. */
  useEffect(() => {
    const onUpdate = () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => void persist(), 1200);
    };
    ydoc.on("update", onUpdate);
    return () => {
      ydoc.off("update", onUpdate);
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [ydoc, persist]);

  /*
    First open of a seeded note: the text lives in plain_text and has never been
    turned into a Yjs document. Claim the right to seed with a conditional update
    so two people opening at once cannot both write the same content in.

    The claim writes an empty-string marker, so a note left mid-seed (browser
    closed before the content was written) is picked up and finished on the next
    open rather than staying blank. Seeded content is persisted immediately
    instead of waiting on the debounce, which keeps that window to one round trip.
  */
  useEffect(() => {
    if (!editor || !connected || seedAttempted.current) return;
    const unseeded = note.ydoc === null || note.ydoc === "";
    if (!unseeded || !note.plain_text) return;

    seedAttempted.current = true;
    const timer = setTimeout(async () => {
      /* A peer already sent us the document, nothing to seed. */
      if (ydoc.getXmlFragment("default").length > 0) return;

      const claim = supabase.from("notes").update({ ydoc: "" }).eq("id", note.id);
      const { data } = await (note.ydoc === null
        ? claim.is("ydoc", null)
        : claim.eq("ydoc", "")
      ).select("id");

      /* Empty result means another client won the claim, their update is on its way. */
      if (data && data.length === 1) {
        editor.commands.setContent(plainTextToHtml(note.plain_text!), { emitUpdate: true });
        await persist();
      }
    }, 900);

    return () => clearTimeout(timer);
  }, [editor, connected, ydoc, supabase, note.id, note.ydoc, note.plain_text, persist]);

  const saveTitle = async () => {
    const trimmed = title.trim() || "Untitled note";
    if (trimmed === note.title) return;
    setTitle(trimmed);
    await supabase.from("notes").update({ title: trimmed }).eq("id", note.id);
    router.refresh();
  };

  const others = peers.filter((p) => p.clientId !== ydoc.clientID);

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-[var(--s-ground)]/95 px-5 py-4 backdrop-blur md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            aria-label="Note title"
            className="min-w-0 flex-1 border-none bg-transparent px-0 text-xl font-semibold tracking-tight md:text-2xl"
            style={{ borderColor: "transparent" }}
          />

          <div className="flex shrink-0 items-center gap-3">
            {others.length > 0 && (
              <div className="flex items-center gap-1.5" aria-live="polite">
                {others.slice(0, 4).map((p) => (
                  <span
                    key={p.clientId}
                    title={`${p.name} is here`}
                    className="mono-label px-1.5 py-0.5 text-[10px] text-[var(--s-ground)]"
                    style={{ background: p.color }}
                  >
                    {p.name.slice(0, 10)}
                  </span>
                ))}
              </div>
            )}
            <span className="mono-label flex items-center gap-2 text-[10px] text-[var(--ink-2)]">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2"
                style={{ background: connected ? "#ff4a1c" : "#6e665e" }}
              />
              {!connected
                ? "Connecting"
                : saveState === "saving"
                  ? "Saving"
                  : saveState === "error"
                    ? "Save failed"
                    : saveState === "saved"
                      ? "Saved"
                      : "Live"}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-8 md:px-8">
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
