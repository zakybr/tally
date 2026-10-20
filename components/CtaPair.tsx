"use client";

import Pill from "@/components/Pill";
import { trackEvent } from "@/lib/analytics";
import { PEOPLE } from "@/lib/contact";

/*
  The site's two actions, everywhere they appear: the free audit form, and a
  phone call with Zak. Both get the visitor to a conversation, which is where
  the detail and the closing happen, instead of reading more page.

  `callFirst` leads with the call where someone wants a person now (account
  recovery and username claims).
*/
export default function CtaPair({
  source,
  callFirst = false,
  className = "",
}: {
  source: string;
  callFirst?: boolean;
  className?: string;
}) {
  const zak = PEOPLE[0];
  const audit = (
    <Pill key="audit" href="/audit" variant={callFirst ? "outline" : "solid"}>
      Get a free audit
    </Pill>
  );
  const call = (
    <a
      key="call"
      href={`tel:${zak.phone}`}
      onClick={() => trackEvent("call_click", { source })}
      className={`pill ${callFirst ? "pill-solid" : "pill-outline"} mono-label inline-flex`}
    >
      Call {zak.phoneDisplay}
    </a>
  );
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {callFirst ? [call, audit] : [audit, call]}
    </div>
  );
}
