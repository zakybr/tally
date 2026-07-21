import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export type CapabilityCardProps = {
  image?: StaticImageData;
  imageAlt?: string;
  label?: string;
  name: string;
  subhead?: string;
  href?: string;
  /* Locked case-slot state: diagonal hatch, RESERVED tag, metric readout. */
  reserved?: boolean;
  metric?: string;
  body?: string;
  sizes?: string;
};

/*
  Capability Card: the Ghost/Barracuda/Lattice grid treatment.
  Full-bleed image, mono tag, large name bottom-left, subhead on hover.
  Cards butt against each other; the parent grid supplies hairline dividers
  via `gap-px bg-hairline` with `bg-bg` cells.
*/
export default function CapabilityCard({
  image,
  imageAlt = "",
  label,
  name,
  subhead,
  href,
  reserved = false,
  metric,
  body,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: CapabilityCardProps) {
  const face = (
    <div className="group/cap relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-bg md:aspect-[3/4]">
      {image && !reserved && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            placeholder="blur"
            sizes={sizes}
            className="cap-img img-grade object-cover"
          />
          {/* Legibility gradient: bottom only, never across the whole image. */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[rgba(11,11,10,0.82)] to-transparent" />
        </>
      )}

      {reserved && <div className="hatch absolute inset-0 bg-panel" />}

      {label && (
        <span className="mono-label absolute left-6 top-6 text-ink">
          {label}
        </span>
      )}
      {reserved && (
        <span className="mono-label absolute right-6 top-6 border border-amber-dim px-2 py-1 text-amber">
          Reserved
        </span>
      )}

      <div className="relative p-6 pb-7 md:p-8">
        {reserved && metric && (
          <div className="mb-3 font-mono text-4xl font-medium text-ink-2">{metric}</div>
        )}
        <h3 className="font-sans text-[2rem] font-semibold leading-tight tracking-tight text-ink md:text-4xl">
          {name}
        </h3>
        {subhead && !reserved && (
          <p className="mt-0 max-h-0 max-w-md overflow-hidden text-sm leading-[1.6] text-ink-2 opacity-0 transition-all duration-[600ms] ease-out group-hover/cap:mt-3 group-hover/cap:max-h-24 group-hover/cap:opacity-100">
            {subhead}
          </p>
        )}
        {reserved && body && (
          <p className="mt-3 max-w-md text-sm leading-[1.6] text-ink-2">{body}</p>
        )}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="block">
      {face}
    </Link>
  ) : (
    face
  );
}
