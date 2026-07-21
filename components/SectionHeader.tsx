import Reveal from "@/components/Reveal";

export default function SectionHeader({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note?: string;
}) {
  return (
    <Reveal>
      <div className="max-w-3xl">
        <div className="eyebrow mb-5">{eyebrow}</div>
        <h2 className="font-sans text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
        {note && <p className="mt-5 text-lg leading-[1.6] text-ink-2">{note}</p>}
      </div>
    </Reveal>
  );
}
