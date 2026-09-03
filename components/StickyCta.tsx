"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Pill from "@/components/Pill";
import { PEOPLE } from "@/lib/contact";
import { useLeadCapture } from "@/components/LeadCapture";

/*
  Persistent contact rail. Appears once the hero is behind you and stays for the
  rest of the scroll, on every screen size rather than phones only.

  It carries the phone numbers as well as the action. The site sells a contract,
  and a buyer deciding whether to trust it wants a person on the end of a line,
  not a form. Keeping both directors reachable from any scroll position is worth
  more here than another button would be.

  Suppressed on the contact page and the legal pages, where it would be noise.
*/
const SUPPRESSED = ["/contact", "/privacy", "/terms"];

export default function StickyCta() {
  const pathname = usePathname();
  const { open } = useLeadCapture();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (SUPPRESSED.includes(pathname)) return null;

  return (
    <div
      /* Inline transform, not a toggled utility: `translate-y-0` and
         `translate-y-full` sit in the same cascade layer, so class order in the
         attribute does not decide the winner. */
      style={{ transform: shown ? "translateY(0)" : "translateY(100%)" }}
      className="fixed inset-x-0 bottom-0 z-40 border-t rule-med bg-sheet/95 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      aria-hidden={!shown}
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-5 py-3 md:px-12 md:py-3.5 lg:px-20">
        {/* Phones first on desktop. On a phone they collapse to one tap target
            each, below, so the bar never wraps to three lines. */}
        <div className="hidden min-w-0 flex-1 items-center gap-7 lg:flex">
          {PEOPLE.map((p) => (
            <a
              key={p.email}
              href={`tel:${p.phone}`}
              className="group flex min-w-0 items-baseline gap-2.5"
            >
              <span className="mono-label shrink-0 text-ink-3">{p.name.split(" ")[0]}</span>
              <span className="font-mono text-[0.8125rem] tnum text-ink transition-colors group-hover:text-signal">
                {p.phoneDisplay}
              </span>
            </a>
          ))}
        </div>

        <p className="mono-label min-w-0 flex-1 text-ink-2 lg:hidden">
          Free quote or sector read.
          <span className="block text-ink">No cost, no obligation.</span>
        </p>

        <div className="flex shrink-0 items-center gap-2.5">
          <a
            href={`tel:${PEOPLE[0].phone}`}
            aria-label={`Call ${PEOPLE[0].name}`}
            className="pill pill-outline pill-sm mono-label inline-flex lg:hidden"
          >
            Call
          </a>
          <Pill onClick={() => open("sticky_rail")} size="sm" className="min-h-[44px] shrink-0">
            Get it free
          </Pill>
        </div>
      </div>
    </div>
  );
}
