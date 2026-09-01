"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Arrow from "@/components/Arrow";
import { useLeadCapture } from "@/components/LeadCapture";

/*
  Mobile-only contact rail. Appears once the hero is behind you and opens the
  free-offer popup, so the shortest path to a conversation is one thumb away.
  Suppressed on the form itself and on the legal pages, where it would be noise.
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
         `translate-y-full` sit in the same cascade layer, so the class order in
         the attribute does not decide the winner. */
      style={{ transform: shown ? "translateY(0)" : "translateY(100%)" }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-bg/95 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden"
      aria-hidden={!shown}
    >
      <div className="flex items-center gap-4 px-5 py-3">
        <p className="mono-label min-w-0 flex-1 text-ink-2">
          Free quote, call or sector read.
          <span className="block text-ink">No cost, no obligation.</span>
        </p>
        <button
          type="button"
          onClick={() => open("sticky_rail")}
          tabIndex={shown ? undefined : -1}
          className="mono-label flex min-h-[44px] shrink-0 items-center gap-2 border border-amber bg-amber px-4 py-3 text-bg"
        >
          Get it free
          <Arrow size={14} className="shrink-0" />
        </button>
      </div>
    </div>
  );
}
