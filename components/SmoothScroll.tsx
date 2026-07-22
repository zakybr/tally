"use client";

import { ReactLenis } from "lenis/react";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

/*
  Heavy, damped scroll: low lerp, no bounce.
  LazyMotion + the `m` component (see Reveal) load only the DOM animation
  features, keeping the client bundle small.
*/
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.07, wheelMultiplier: 0.9, touchMultiplier: 1.2 }}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ReactLenis>
  );
}
