import Image from "next/image";
import Link from "next/link";
import Scoreboard from "@/components/Scoreboard";
import heroImg from "@/public/images/hero-boat.jpg";

export default function Hero() {
  return (
    <header className="relative flex min-h-svh flex-col justify-end overflow-hidden">
      {/* PLACEHOLDER IMAGERY: AI-generated stand-in graded to spec. Swap for real on-boat capture. */}
      <Image
        src={heroImg}
        alt="Fishing crew silhouetted against dawn light on a commercial vessel"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="img-grade object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/20" />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-16 pt-40 md:px-12 lg:px-20">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <div className="eyebrow mb-6">NZ Primary Sector · Outcome-Guaranteed</div>
            <h1 className="font-sans text-5xl font-semibold leading-[1.02] tracking-tight text-ink md:text-7xl">
              We sell the tally,
              <br />
              not the footage.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-[1.6] text-ink-2">
              Recruitment campaigns for hard-to-staff operators (crews, plants, boats, forests),
              with the result written into the contract. Content is the mechanism. The number is
              the product.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="mono-label border border-amber bg-amber px-6 py-3.5 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber"
              >
                Start the Proof
              </Link>
              <a
                href="#guarantee"
                className="mono-label border border-hairline px-6 py-3.5 text-ink transition-colors duration-300 hover:border-ink"
              >
                How the guarantee works
              </a>
            </div>
          </div>

          {/* HUD stat readout, bottom-right */}
          <div className="lg:justify-self-end">
            <Scoreboard />
          </div>
        </div>
      </div>
    </header>
  );
}
