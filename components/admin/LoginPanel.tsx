"use client";

import { useState } from "react";
import TallyMark from "@/components/TallyMark";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function LoginPanel({ next, error }: { next?: string; error?: string }) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState<string | null>(error ?? null);

  async function signIn() {
    setBusy(true);
    setFailed(null);

    const callback = new URL("/auth/callback", window.location.origin);
    if (next) callback.searchParams.set("next", next);

    const { error: authError } = await supabaseBrowser().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callback.toString(),
        queryParams: { prompt: "select_account" },
      },
    });

    if (authError) {
      setFailed(authError.message);
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <div className="mb-10 flex items-center gap-3">
        <TallyMark size={26} />
        <span className="font-sans text-xl font-semibold tracking-tight text-ink">tally</span>
      </div>

      <p className="eyebrow mb-3">Internal portal</p>
      <h1 className="mb-3 text-3xl font-semibold tracking-tight">Sign in</h1>
      <p className="mb-8 text-sm leading-relaxed text-ink-2">
        Access is limited to allowlisted accounts. Everything inside is commercial in
        confidence.
      </p>

      {failed && (
        <p
          role="alert"
          className="mb-6 border-l-2 border-amber bg-panel px-4 py-3 text-sm text-ink"
        >
          {failed === "missing_code"
            ? "Sign-in did not complete. Try again."
            : failed}
        </p>
      )}

      <button
        type="button"
        onClick={signIn}
        disabled={busy}
        className="flex w-full items-center justify-center gap-3 border border-amber bg-amber px-4 py-3.5 text-bg transition-colors hover:bg-transparent hover:text-amber disabled:opacity-60"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
          />
          <path
            fill="currentColor"
            d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
          />
          <path
            fill="currentColor"
            d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
          />
          <path
            fill="currentColor"
            d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
          />
        </svg>
        <span className="mono-label">
          {busy ? "Redirecting to Google" : "Continue with Google"}
        </span>
      </button>

      <p className="mt-6 text-xs leading-relaxed text-ink-2">
        Not on the list? Ask Zak to add your email under Team.
      </p>
    </main>
  );
}
