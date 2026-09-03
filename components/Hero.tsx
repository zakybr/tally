import Image from "next/image";
import Pill from "@/components/Pill";
import heroImg from "@/public/images/hero-boat.jpg";

/*
  One claim, one sentence, two actions, and a lot of air.

  Earlier passes hung a construction-grid overlay and a six-field title block
  here. Both were costume: the grid was decoration pretending to be structure,
  and the title block put a second competing block of small type next to the
  headline. What earns a first viewport is the claim, the photograph, and the
  space between them.
*/
export default function Hero() {
  return (
    <header className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-sheet">
      {/* PLACEHOLDER IMAGERY: AI-generated stand-in graded to spec. Swap for real on-boat capture. */}
      <Image
        src={heroImg}
        alt="Fishing crew silhouetted against dawn light on a commercial vessel"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover opacity-[0.28] [filter:grayscale(65%)_contrast(1.15)_brightness(0.75)]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-sheet via-sheet/85 to-sheet/55" />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-16 pt-28 md:px-12 md:pb-20 md:pt-36 lg:px-20">
        <div className="max-w-3xl">
          <h1 className="max-w-[13ch] font-sans text-[3rem] font-semibold leading-[0.95] tracking-[-0.045em] text-ink sm:text-[4.5rem] md:text-[5.25rem]">
            We sell the tally, not the footage.
          </h1>
          <p className="mt-8 max-w-[42ch] text-[1.0625rem] leading-[1.55] text-ink-2">
            Marketing for New Zealand&apos;s marine and primary operators. You name the number. We
            write it into the contract.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Pill href="/contact">Start the Proof</Pill>
            <Pill href="#offer" variant="outline" onPhoto>
              See what we run
            </Pill>
          </div>
        </div>

        <p className="mono-label mt-12 text-ink-3">
          The quote and the sector read cost you nothing.
        </p>
      </div>
    </header>
  );
}
