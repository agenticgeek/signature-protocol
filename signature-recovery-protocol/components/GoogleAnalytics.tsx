"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID, gaPageView, loadGa } from "@/signature-recovery-protocol/lib/ga";

// Module-level so React StrictMode's double effect (dev) doesn't double-fire.
let lastTrackedPath: string | null = null;

// Loads gtag.js and sends one page_view on the first load and on every
// client-side route change. Renders nothing.
export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || lastTrackedPath === pathname) return;
    lastTrackedPath = pathname;
    loadGa();
    gaPageView();
  }, [pathname]);

  return null;
}
