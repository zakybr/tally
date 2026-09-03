/*
  A sheet band. Section rhythm lives in one place so the vertical beat cannot
  drift between neighbours.

  `tone` steps the ground rather than inverting it. The earlier version flipped
  alternate sections onto a warm cream ground; on a drawing sheet the ground
  never changes colour, it only recedes, so these are three depths of the same
  blue-black. Separation is carried by the rules, not by a light switch.
*/

type Tone = "sheet" | "well" | "raised";

const TONES: Record<Tone, string> = {
  sheet: "bg-sheet",
  well: "bg-sheet-2",
  raised: "bg-sheet-3",
};

export default function Section({
  children,
  tone = "sheet",
  id,
  className = "",
  divided = false,
  labelledBy,
}: {
  children: React.ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  /* The seam between bands. On by default: a sheet is ruled, not floated. */
  divided?: boolean;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={[
        TONES[tone],
        divided ? "border-t rule-hair" : "",
        "py-24 md:py-32 lg:py-40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">{children}</div>
    </section>
  );
}
