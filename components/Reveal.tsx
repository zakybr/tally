"use client";

import { m } from "framer-motion";

/*
  Scroll reveal: slow rise, long ease-out, no bounce.
  Uses the lightweight `m` component; features are provided by LazyMotion in
  SmoothScroll. Reduced-motion handling lives in <MotionConfig reducedMotion="user">
  so server and client render identically.
*/
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
