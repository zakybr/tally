import Image from "next/image";
import Link from "next/link";
import Scoreboard from "@/components/Scoreboard";
import heroImg from "@/public/images/hero-boat.jpg";

/*
  One claim, one sentence, two buttons. Everything the old hero also tried to
  say — the range from capture to a full presence, the sectors, the mechanism —
  is the job of the sections directly beneath it. The HUD readout is a desktop
  flourish; on a phone it pushed the CTAs off the first screen, so it waits
  until there is a column to sit in.
*/
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
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/25" />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-14 pt-32 md:px-12 md:pb-16 md:pt-40 lg:px-20">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <div className="eyebrow mb-5 md:mb-6">NZ Primary &amp; Marine</div>
            <h1 className="font-sans text-[2.625rem] font-semibold leading-[1.03] tracking-[-0.035em] text-ink sm:text-6xl md:text-7xl">
              We sell the tally,
              <br />
              not the footage.
            </h1>
            <p className="mt-6 max-w-lg text-[1.0625rem] leading-[1.55] text-ink-2 md:mt-7 md:text-lg">
              Brand, reach and recruitment for New Zealand&apos;s primary and marine operators. You
              name the number. We write it into the contract.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 md:mt-9">
              <Link
                href="/contact"
                className="mono-label inline-flex items-center justify-center border border-amber bg-amber px-6 py-4 text-bg transition-colors duration-300 hover:bg-transparent hover:text-amber sm:justify-start sm:py-3.5"
              >
                Start the Proof
              </Link>
              <a
                href="#offer"
                className="mono-label inline-flex items-center justify-center border border-hairline px-6 py-4 text-ink transition-colors duration-300 hover:border-ink sm:justify-start sm:py-3.5"
              >
                See what we run
              </a>
            </div>
            <p className="mono-label mt-6 text-ink-2">Free quote · Free call · Free sector read</p>
          </div>

          {/* HUD stat readout, desktop only: the phone needs the vertical space. */}
          <div className="hidden lg:block lg:justify-self-end">
            <Scoreboard />
          </div>
        </div>
      </div>
    </header>
  );
}
