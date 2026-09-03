"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Pill from "@/components/Pill";
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
      className="fixed inset-x-0 bottom-0 z-40 border-t rule-hair bg-sheet/95 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden"
      aria-hidden={!shown}
    >
      <div className="flex items-center gap-4 px-5 py-3">
        {/* Two short lines. The longer version wrapped to three at 375px and
            crowded the pill off its own baseline. */}
        <p className="mono-label min-w-0 flex-1 text-ink-2">
          Free quote or sector read.
          <span className="block text-ink">No cost, no obligation.</span>
        </p>
        <Pill
          onClick={() => open("sticky_rail")}
          size="sm"
          className="min-h-[44px] shrink-0"
        >
          Get it free
        </Pill>
      </div>
    </div>
  );
}
