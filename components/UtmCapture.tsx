"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/analytics";

/* Persist first-touch UTMs / click IDs for the session so forms can attach them. */
export default function UtmCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
