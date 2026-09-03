import Link from "next/link";
import Arrow from "@/components/Arrow";

/*
  The site's only button. Three variants, one shape, one motion: the fill
  sweeps in from the left and the arrow travels with it (see .pill in
  globals.css). Colour comes from the ground tokens, so a pill inside an
  .on-bone section re-points itself to the deep amber without being told.

  `href` decides the element. Internal routes get next/link, anything with a
  scheme or a hash gets a plain anchor so root-hash navigation still works
  from a subpage, and no href at all gets a button.
*/

type Variant = "solid" | "outline" | "ghost";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: "sm" | "md";
  /* Hero and other photographic grounds need a brighter edge than the hairline. */
  onPhoto?: boolean;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
};

export default function Pill({
  children,
  href,
  variant = "solid",
  size = "md",
  onPhoto = false,
  arrow = true,
  className = "",
  type = "button",
  onClick,
  disabled,
  ...rest
}: Props) {
  /*
    `.pill` deliberately does not set `display` (see globals.css), so it is
    supplied here as a utility that stays inside Tailwind's cascade layer.

    Only an UNPREFIXED display class from the caller suppresses it, that one
    owns the base state, as in `hidden sm:inline-flex`. A variant-prefixed class
    like `lg:hidden` only speaks for its breakpoint and still needs a base to
    fall back to, and Tailwind emits variants after base utilities, so the
    variant still wins where it applies.
  */
  const callerSetsDisplay =
    /(^|\s)(hidden|flex|inline-flex|block|inline-block|grid|inline)(\s|$)/.test(className);

  const cls = [
    "pill mono-label",
    callerSetsDisplay ? "" : "inline-flex",
    `pill-${variant}`,
    size === "sm" ? "pill-sm" : "",
    onPhoto && variant === "outline" ? "pill-on-photo" : "",
    disabled ? "pointer-events-none opacity-50" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {children}
      {arrow && <Arrow size={14} />}
    </>
  );

  if (href) {
    /* Hash routes and mailto/tel must be real anchors: next/link would try to
       client-navigate `/#offer` from a subpage and swallow the scroll. */
    if (href.startsWith("#") || href.startsWith("/#") || href.includes(":")) {
      return (
        <a href={href} className={cls} {...rest}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>
      {inner}
    </button>
  );
}
