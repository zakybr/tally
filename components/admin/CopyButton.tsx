"use client";

import { useEffect, useState } from "react";

export default function CopyButton({
  value,
  label = "Copy",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          /* Clipboard blocked (insecure context or denied permission) — leave the label alone. */
        }
      }}
      className={[
        "mono-label border px-3 py-2 transition-colors",
        copied
          ? "border-amber bg-amber text-bg"
          : "border-hairline text-ink-2 hover:border-amber hover:text-amber",
        className,
      ].join(" ")}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
