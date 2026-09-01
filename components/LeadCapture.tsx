"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Arrow from "@/components/Arrow";
import { INDUSTRY_OPTIONS } from "@/lib/offer";
import { attributionPayload, trackEvent } from "@/lib/analytics";

/*
  The free-offer popup and its opener.

  Three things Tally gives away before any money changes hands: a scoped quote,
  a call, or a written read on the sector. The visitor picks one, gives us four
  fields, and the submission lands in the same inbox as the full brief.

  It opens itself once per visitor (scroll depth, dwell, or exit intent) and is
  reachable for good after that from a persistent opener, so the free offer is
  never more than one tap away.
*/

const STORAGE_KEY = "tally_free_offer";
const SUPPRESSED = ["/contact", "/privacy", "/terms"];

type Choice = { id: string; label: string; blurb: string };

const CHOICES: Choice[] = [
  {
    id: "quote",
    label: "A free quote",
    blurb: "A scoped price against the number you actually need moved. No deck, no discovery fee.",
  },
  {
    id: "call",
    label: "A free call",
    blurb: "Thirty minutes with a partner. We tell you straight whether we can guarantee it.",
  },
  {
    id: "research",
    label: "Free sector research",
    blurb: "A short written read on your sector: where the demand sits and what it costs to reach.",
  },
];

type Ctx = { open: (source: string) => void };
const LeadCaptureContext = createContext<Ctx>({ open: () => {} });

export function useLeadCapture() {
  return useContext(LeadCaptureContext);
}

type Status = "idle" | "submitting" | "success" | "error";

function stored(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function remember(value: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* private mode, blocked storage: the popup simply offers itself again next visit */
  }
}

export function LeadCaptureProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("auto");
  const [choice, setChoice] = useState(CHOICES[0].id);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const suppressed = SUPPRESSED.includes(pathname) || pathname.startsWith("/admin");

  const open = useCallback((from: string) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setSource(from);
    setStatus("idle");
    setError("");
    setIsOpen(true);
    trackEvent("free_offer_open", { source: from });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    remember("dismissed");
    openerRef.current?.focus?.();
  }, []);

  /* Auto-open once per visitor: dwell, scroll depth, or a run for the tab bar. */
  useEffect(() => {
    if (suppressed || stored()) return;

    let done = false;
    const fire = (from: string) => {
      if (done) return;
      done = true;
      cleanup();
      open(from);
    };

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.3) fire("scroll");
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire("exit_intent");
    };
    const timer = window.setTimeout(() => fire("dwell"), 25000);

    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return cleanup;
  }, [open, suppressed]);

  /* Escape to close, scroll locked while open, focus into the panel. */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const focus = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(focus);
    };
  }, [isOpen, close]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const picked = CHOICES.find((c) => c.id === choice)?.label ?? choice;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          message: `FREE OFFER REQUEST — ${picked}. Submitted from the site popup (${source}).${
            data.message ? `\n\nWhat they said: ${String(data.message)}` : ""
          }`,
          ...attributionPayload(),
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      trackEvent("generate_lead", {
        method: "free_offer_popup",
        offer: choice,
        source,
        industry: String(data.industry ?? ""),
        currency: "NZD",
        ...attributionPayload(),
      });
      remember("submitted");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const value = useMemo(() => ({ open }), [open]);
  const label = "mono-label mb-2 block text-ink-2";
  const field =
    "w-full border border-hairline bg-bg px-4 py-3 text-[1rem] text-ink outline-none transition-colors duration-300 placeholder:text-ink-2/60 focus:border-amber";

  return (
    <LeadCaptureContext.Provider value={value}>
      {children}

      {/* Persistent opener. Sits above the mobile rail so both stay reachable. */}
      {!suppressed && (
        <button
          type="button"
          onClick={() => open("pill")}
          className="mono-label fixed bottom-[96px] right-4 z-40 hidden items-center gap-2.5 border border-amber bg-amber px-5 py-3.5 text-bg shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:bg-bg hover:text-amber lg:bottom-6 lg:right-6 lg:flex"
        >
          Get a free quote
          <Arrow size={14} className="shrink-0" />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-bg/85 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="free-offer-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="max-h-[92svh] w-full max-w-lg overflow-y-auto border border-hairline bg-panel">
            <div className="flex items-start justify-between gap-4 border-b border-hairline p-6 md:p-8">
              <div>
                <div className="eyebrow mb-3">Free · No obligation</div>
                <h2
                  id="free-offer-title"
                  className="font-sans text-2xl font-semibold leading-tight tracking-tight text-ink md:text-3xl"
                >
                  {status === "success" ? "That's on its way." : "Three ways in. All free."}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="mono-label shrink-0 border border-hairline px-3 py-2 text-ink-2 transition-colors duration-300 hover:border-ink hover:text-ink"
              >
                Close
              </button>
            </div>

            {status === "success" ? (
              <div className="p-6 md:p-8">
                <p className="text-[0.9375rem] leading-[1.75] text-ink-2">
                  A partner reads every one of these personally and comes back within two working
                  days. If we cannot guarantee your number we will say so, and tell you what would
                  need to change.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={close}
                    className="mono-label border border-amber bg-amber px-5 py-3 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
                  >
                    Back to the site
                  </button>
                  <Link
                    href="/guarantee"
                    onClick={close}
                    className="mono-label border border-hairline px-5 py-3 text-ink transition-colors duration-300 hover:border-ink"
                  >
                    Read the guarantee
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="p-6 md:p-8">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <fieldset>
                  <legend className={label}>Pick one</legend>
                  <div className="grid gap-px bg-hairline">
                    {CHOICES.map((c) => {
                      const active = c.id === choice;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setChoice(c.id)}
                          aria-pressed={active}
                          className={`px-4 py-4 text-left transition-colors duration-200 ${
                            active ? "bg-bg" : "bg-panel hover:bg-bg/60"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              aria-hidden="true"
                              className={`h-2.5 w-2.5 shrink-0 border ${
                                active ? "border-amber bg-amber" : "border-ink-2"
                              }`}
                            />
                            <span
                              className={`mono-label ${active ? "text-amber" : "text-ink"}`}
                            >
                              {c.label}
                            </span>
                          </span>
                          <span className="mt-2 block pl-[22px] text-[0.8125rem] leading-[1.6] text-ink-2">
                            {c.blurb}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={label} htmlFor="fo-name">
                      Name <span className="text-amber">*</span>
                    </label>
                    <input
                      ref={firstFieldRef}
                      id="fo-name"
                      name="name"
                      required
                      autoComplete="name"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="fo-email">
                      Work email <span className="text-amber">*</span>
                    </label>
                    <input
                      id="fo-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      required
                      autoComplete="email"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="fo-company">
                      Company <span className="text-amber">*</span>
                    </label>
                    <input
                      id="fo-company"
                      name="company"
                      required
                      autoComplete="organization"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="fo-industry">
                      Sector <span className="text-amber">*</span>
                    </label>
                    <select
                      id="fo-industry"
                      name="industry"
                      required
                      defaultValue=""
                      className={`${field} appearance-none`}
                    >
                      <option value="" disabled>
                        Select a sector
                      </option>
                      {INDUSTRY_OPTIONS.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className={label} htmlFor="fo-message">
                    The number you need moved (optional)
                  </label>
                  <input
                    id="fo-message"
                    name="message"
                    placeholder="e.g. 20 crew for the season, or 40 charter bookings"
                    className={field}
                  />
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-5 border border-amber-dim bg-bg p-4 text-[0.875rem] leading-[1.6] text-ink"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mono-label mt-6 flex w-full items-center justify-center gap-3 border border-amber bg-amber px-6 py-4 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send it over"}
                  {status !== "submitting" && <Arrow size={16} className="shrink-0" />}
                </button>

                <p className="mt-4 text-[0.75rem] leading-[1.6] text-ink-2">
                  No cost and no obligation. We use this only to reply.{" "}
                  <Link href="/privacy" onClick={close} className="underline underline-offset-2">
                    Privacy policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </LeadCaptureContext.Provider>
  );
}
