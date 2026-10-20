"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import UtmCapture from "@/components/UtmCapture";
import MetaPixel from "@/components/MetaPixel";
import StickyCta from "@/components/StickyCta";
import { LeadCaptureProvider } from "@/components/LeadCapture";
import Intro from "@/components/home/Intro";

/*
  The marketing site runs Lenis smooth scroll, first-touch UTM capture and the
  Meta pixel. None of them belongs in the admin portal, Lenis hijacks scroll inside the note
  editor and sidebars, and internal traffic should not be attributed.
*/
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return <>{children}</>;

  return (
    <LeadCaptureProvider>
      {/* Keyed by path so the intro replays on every page change, not just a full load. */}
      <Intro key={pathname} />
      <UtmCapture />
      <MetaPixel />
      <SmoothScroll>{children}</SmoothScroll>
      <StickyCta />
    </LeadCaptureProvider>
  );
}
