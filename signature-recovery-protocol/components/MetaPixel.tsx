"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  META_PIXEL_ID,
  newEventId,
  sendCapi,
  trackMetaEvent,
} from "@/signature-recovery-protocol/lib/metaCapi";

/**
 * Meta Pixel loader. Renders nothing without NEXT_PUBLIC_META_PIXEL_ID.
 *
 * The standard base snippet runs in the first effect so that its PageView can
 * carry an event id generated here, and the same id goes to the Conversions
 * API. Client-side route changes (App Router does not reload) fire their own
 * PageView the same way.
 */
type FbqStub = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: FbqStub;
  loaded: boolean;
  version: string;
};

/** Meta's base code (fbq stub + async fbevents.js), then `init`. */
function loadPixel(pixelId: string) {
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
      else fbq.queue.push(args);
    } as FbqStub;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    fbq("init", pixelId);
  }
}

function trackPageView() {
  const eventID = newEventId();
  window.fbq?.("track", "PageView", {}, { eventID });
  sendCapi("PageView", eventID);
}

function trackRouteEvent(pathname: string) {
  if (pathname === "/") {
    trackMetaEvent("ViewContent", {
      content_category: "landing_page",
      content_name: "Programme Ambassadeur Pro — METCARE®",
    });
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  // Last path tracked: one PageView per real navigation, none on a re-run of
  // the same effect (React Strict Mode mounts effects twice in development).
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!META_PIXEL_ID || lastPath.current === pathname) return;
    lastPath.current = pathname;
    try {
      loadPixel(META_PIXEL_ID);
      trackPageView();
      trackRouteEvent(pathname);
    } catch {
      // Tracking must never break the page.
    }
  }, [pathname]);

  if (!META_PIXEL_ID) return null;

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
