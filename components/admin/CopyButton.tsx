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
          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--s-ground)]"
          : "border-[var(--line)] text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
        className,
      ].join(" ")}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
