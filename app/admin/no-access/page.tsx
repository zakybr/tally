import type { Metadata } from "next";
import TallyMark from "@/components/TallyMark";

export const metadata: Metadata = { title: "No access" };

export default function NoAccessPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <div className="mb-8 flex items-center gap-3">
        <TallyMark size={22} />
        <span className="font-sans text-lg font-semibold tracking-tight text-[var(--ink)]">tally</span>
      </div>
      <p className="eyebrow mb-3">Access denied</p>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">
        That account is not on the list
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-[var(--ink-2)]">
        You signed in successfully, but this email has not been given access to the Tally
        portal. Ask the account owner to add it under Team, then sign in again.
      </p>
      <form action="/auth/signout" method="post">
        <button
          type="submit"
          className="mono-label border border-[var(--line)] px-4 py-2.5 text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Sign out and try another account
        </button>
      </form>
    </main>
  );
}
