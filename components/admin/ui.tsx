import type { Priority, TaskStatus } from "@/lib/supabase/types";

/*
  One vocabulary for the whole portal. Every control that was written inline
  now comes from here, so "save" looks the same on every screen.
*/

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "border border-[var(--accent)] bg-[var(--accent)] text-[var(--s-ground)] hover:bg-transparent hover:text-[var(--accent)] disabled:hover:bg-[var(--accent)] disabled:hover:text-[var(--s-ground)]",
  secondary:
    "border border-[var(--line)] text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:hover:border-[var(--line)] disabled:hover:text-[var(--ink-2)]",
  ghost:
    "border border-transparent text-[var(--ink-2)] hover:text-[var(--ink)] disabled:hover:text-[var(--ink-2)]",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1.5 text-[0.625rem]",
  md: "px-4 py-2.5 text-[0.6875rem]",
};

export function buttonClass(
  variant: ButtonVariant = "secondary",
  size: ButtonSize = "md",
  extra = "",
) {
  return [
    "mono-label inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "transition-[background-color,color,border-color,transform] duration-150 ease-out",
    "active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:active:translate-y-0",
    VARIANT[variant],
    SIZE[size],
    extra,
  ].join(" ");
}

export function Button({
  variant = "secondary",
  size = "md",
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <button {...rest} className={buttonClass(variant, size, className)} />;
}

/* --- status ------------------------------------------------------------ */

const STATUS_TOKEN: Record<TaskStatus, { label: string; color: string }> = {
  todo: { label: "To do", color: "var(--st-todo)" },
  doing: { label: "Doing", color: "var(--st-doing)" },
  blocked: { label: "Blocked", color: "var(--st-blocked)" },
  done: { label: "Done", color: "var(--st-done)" },
};

export const STATUS_LABEL = STATUS_TOKEN;

/* State reads from the dot as well as the word, so it survives a fast scan. */
export function StatusChip({ status }: { status: TaskStatus }) {
  const token = STATUS_TOKEN[status];
  return (
    <span
      className="mono-label inline-flex items-center gap-1.5 border px-1.5 py-0.5 text-[10px]"
      style={{ borderColor: `color-mix(in srgb, ${token.color} 45%, transparent)`, color: token.color }}
    >
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 shrink-0"
        style={{ background: token.color }}
      />
      {token.label}
    </span>
  );
}

export function PriorityChip({ priority }: { priority: Priority }) {
  const urgent = priority === "p1";
  return (
    <span
      className={[
        "mono-label border px-1.5 py-0.5 text-[10px] tnum",
        urgent
          ? "border-[color-mix(in_srgb,var(--accent)_45%,transparent)] text-[var(--accent)]"
          : "border-[var(--line)] text-[var(--ink-3)]",
      ].join(" ")}
    >
      {priority.toUpperCase()}
    </span>
  );
}

/* --- structure --------------------------------------------------------- */

export function Skeleton({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return <div aria-hidden="true" style={style} className={`skeleton ${className}`} />;
}

/* Empty states teach the interface rather than announcing absence. */
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="border border-dashed border-[var(--line)] px-6 py-12 text-center">
      <p className="text-[0.9375rem] font-semibold text-[var(--ink)]" style={{ textWrap: "balance" }}>
        {title}
      </p>
      <p
        className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[var(--ink-2)]"
        style={{ textWrap: "pretty" }}
      >
        {body}
      </p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mono-label mb-1.5 block text-[var(--ink-3)]">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-[var(--ink-3)]">{hint}</span>}
    </label>
  );
}
