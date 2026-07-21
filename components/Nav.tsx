import Link from "next/link";
import TallyMark from "@/components/TallyMark";

const links = [
  { href: "#guarantee", label: "The guarantee" },
  { href: "#sectors", label: "Sectors" },
  { href: "#record", label: "The record" },
  { href: "#pricing", label: "Pricing" },
];

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-12 lg:px-20">
        <Link href="#" className="flex items-center gap-3" aria-label="Tally home">
          <TallyMark size={22} />
          <span className="font-sans text-lg font-semibold tracking-tight text-ink">tally</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mono-label text-ink-2 transition-colors duration-300 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="mono-label border border-amber bg-amber px-4 py-2.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
        >
          Start the Proof
        </a>
      </div>
    </nav>
  );
}
