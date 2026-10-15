"use client";

import { useEffect, useRef } from "react";
import Arrow from "@/components/Arrow";

/*
  The homepage hero: the b-roll film full bleed, one claim, two text links.

  The film is a 14 second seamless loop rendered from the HyperFrames project
  in tally-promo/videos/12-hero-broll. It carries no text of its own, so the
  headline here is real, indexable HTML. The poster paints first; the video
  only plays when the visitor has not asked for reduced motion.
*/
export default function HeroFilm() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ref.current?.play().catch(() => {});
  }, []);

  return (
    <header className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-sheet">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/video/hero-poster.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        {/* Phones get the 720p encode (2.5 MB); everything else the 1080p (5.2 MB). */}
        <source src="/video/hero-720.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-sheet via-sheet/55 to-sheet/25" />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-16 pt-32 md:px-12 md:pb-24 lg:px-20">
        <h1 className="display max-w-[12ch] text-[clamp(3.25rem,min(10vw,11.5vh),8.5rem)] text-ink">
          We make brands people <span className="text-signal">stop scrolling for.</span>
        </h1>
        <p className="mt-8 max-w-[46ch] text-[1.0625rem] leading-[1.55] text-ink md:text-lg">
          Consumer and marine marketing from New Zealand, built on Instagram. You name the number.
          We write it into the contract.
        </p>
        <div className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
          <a
            href="#services"
            className="group inline-flex min-h-[44px] items-center gap-3 text-[0.9375rem] font-semibold text-ink"
          >
            See what we do
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="/contact"
            className="group inline-flex min-h-[44px] items-center gap-3 text-[0.9375rem] font-semibold text-signal"
          >
            Let&apos;s talk
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </header>
  );
}
