"use client";

import { useEffect, useRef, useState } from "react";
import CtaPair from "@/components/CtaPair";

/*
  The homepage hero: the b-roll film full bleed, one claim, two text links.

  The film is a 14 second seamless loop rendered from the HyperFrames project
  in tally-promo/videos/12-hero-broll. It carries no text of its own, so the
  headline here is real, indexable HTML. The poster paints first.

  It plays for everyone, muted, with a pause control: slow ambient footage
  with a visible stop is the accessible pattern (WCAG 2.2.2), and holding it
  on the poster for reduced-motion visitors left them with a dead hero.
  `muted` is also set as a property before play(), because browsers decide
  autoplay on the property and React does not always set it on hydration.
*/
export default function HeroFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.play().catch(() => {});
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <header className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-sheet">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/video/hero-poster.jpg"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        {/* Phones get the 720p encode (2.5 MB); everything else the 1080p (5.2 MB). */}
        <source src="/video/hero-720.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-sheet via-sheet/55 to-sheet/25" />

      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? "Play background video" : "Pause background video"}
        className="absolute bottom-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border rule-med bg-sheet/50 text-ink backdrop-blur-sm transition-colors hover:border-[var(--ink)] md:bottom-8 md:right-8"
      >
        {paused ? (
          <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
            <path d="M1 1l10 6-10 6z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
            <rect x="1" y="1" width="3.5" height="12" fill="currentColor" />
            <rect x="7.5" y="1" width="3.5" height="12" fill="currentColor" />
          </svg>
        )}
      </button>

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-16 pt-32 md:px-12 md:pb-24 lg:px-20">
        {/* One H1 carrying both the plain description (the search phrase) and the brand line. */}
        <h1>
          <span className="mono-label block text-ink">Marketing agency in Auckland</span>
          <span className="display mt-5 block max-w-[12ch] text-[clamp(3.25rem,min(10vw,11.5vh),8.5rem)] text-ink">
            We make brands people <span className="text-signal">stop scrolling for.</span>
          </span>
        </h1>
        <p className="mt-8 max-w-[46ch] text-[1.0625rem] leading-[1.55] text-ink md:text-lg">
          A digital marketing agency for consumer and marine brands: Instagram marketing, Meta ads,
          social media video and websites, from our base in Auckland and across New Zealand. Built
          on 8 years of growing, monetising and selling Instagram accounts. Start with a free audit.
        </p>
        <CtaPair source="home_hero" className="mt-9" />
      </div>
    </header>
  );
}
