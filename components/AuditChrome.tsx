import Link from "next/link";
import TallyMark from "@/components/TallyMark";
import { PEOPLE } from "@/lib/contact";

/*
  Slim header and footer for the /audit landing page. The full Nav is left off
  on purpose: paid traffic lands here to fill in one form, and the main menu
  and its /contact button would only offer a way out. /audit is also not linked
  from the main navigation anywhere.
*/

export function AuditHeader() {
  const lead = PEOPLE[0];
  return (
    <header className="border-b rule-hair">
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex min-h-[44px] items-center gap-2.5" aria-label="Tally home">
          <TallyMark size={20} />
          <span className="font-sans text-base font-semibold tracking-tight text-ink">tally</span>
        </Link>
        <a
          href={`tel:${lead.phone}`}
          className="mono-label flex min-h-[44px] items-center text-ink-2 transition-colors hover:text-ink"
        >
          Call <span className="ml-2 font-mono tnum text-ink">{lead.phoneDisplay}</span>
        </a>
      </div>
    </header>
  );
}

export function AuditFooter() {
  return (
    <footer className="border-t rule-hair py-8">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center gap-x-6 gap-y-3 px-4 sm:px-6">
        <p className="font-mono text-[0.6875rem] leading-relaxed text-ink-3">
          Tally. New Zealand. © 2026 Tally.
        </p>
        <nav aria-label="Legal" className="flex gap-6 sm:ml-auto">
          <Link href="/privacy" className="mono-label text-ink-2 hover:text-ink">
            Privacy
          </Link>
          <Link href="/terms" className="mono-label text-ink-2 hover:text-ink">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
