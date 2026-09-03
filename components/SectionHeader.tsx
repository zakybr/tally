
/*
  Heading block. No kicker: the eyebrow above every heading was restating the
  heading in smaller amber caps, which cost a line of vertical space and a beat
  of reading per section for no information. The heading carries it.

  `note` is capped at one short paragraph. The pull-quote and closing-footnote
  layers that used to bracket each section's grid are gone, that detail lives
  on /guarantee, where someone looking for it will actually be.
*/
export default function SectionHeader({
  title,
  note,
  align = "left",
}: {
  title: string;
  note?: string;
  align?: "left" | "center";
}) {
  return (
    <div>
      <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
        <h2 className="text-balance font-sans text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {note && (
          <p
            className={`mt-5 max-w-[58ch] text-[1.0625rem] leading-[1.55] text-ink-2 md:text-lg ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
