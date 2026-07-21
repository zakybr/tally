"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";

/* Heavy, damped scroll: low lerp, no bounce. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.07, wheelMultiplier: 0.9, touchMultiplier: 1.2 }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
