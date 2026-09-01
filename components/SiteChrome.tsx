"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import UtmCapture from "@/components/UtmCapture";
import StickyCta from "@/components/StickyCta";
import { LeadCaptureProvider } from "@/components/LeadCapture";

/*
  The marketing site runs Lenis smooth scroll and first-touch UTM capture.
  Neither belongs in the admin portal — Lenis hijacks scroll inside the note
  editor and sidebars, and internal traffic should not be attributed.
*/
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return <>{children}</>;

  return (
    <LeadCaptureProvider>
      <UtmCapture />
      <SmoothScroll>{children}</SmoothScroll>
      <StickyCta />
    </LeadCaptureProvider>
  );
}
