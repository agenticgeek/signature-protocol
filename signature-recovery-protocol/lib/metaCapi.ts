import { gaEventOnce } from "./ga";
// Browser-side helpers for Meta tracking: the Pixel (fbq) and the
// Conversions API relay (/api/meta/capi). Every standard event is sent from
// both sides with the same `eventId` so Meta dedupes the two copies.
//
// Without NEXT_PUBLIC_META_PIXEL_ID every helper here is a silent no-op.

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

export const LEAD_EVENT_KEY = "fb_lead_event_id_v1";
const LEAD_FIRED_KEY = "fb_lead_fired_v1";
const INITIATE_CHECKOUT_KEY = "fb_ic_fired_v1";

export type MetaStandardEvent =
  | "PageView"
  | "ViewContent"
  | "InitiateCheckout"
  | "Lead"
  | "CompleteRegistration"
  | "Schedule"
  | "Contact";

export type MetaUser = {
  email?: string;
  /** E.164 ("+33612345678"). */
  phone?: string;
  firstName?: string;
  lastName?: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function newEventId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function cookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** True the first time `key` is seen in this tab session. Fails open without storage. */
function oncePerSession(key: string) {
  try {
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, "1");
  } catch {
    // Private mode / disabled storage: still track.
  }
  return true;
}

/** Browser Pixel call. Never send PII here (no email/phone in params). */
export function trackPixel(
  eventName: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string; custom?: boolean },
) {
  if (typeof window === "undefined" || !META_PIXEL_ID || !window.fbq) return;
  try {
    const method = options?.custom ? "trackCustom" : "track";
    if (options?.eventID) {
      window.fbq(method, eventName, params || {}, { eventID: options.eventID });
    } else {
      window.fbq(method, eventName, params || {});
    }
  } catch {
    // Tracking must never break the page.
  }
}

/** Server-side copy of an event via /api/meta/capi. Fire-and-forget, never throws. */
export function sendCapi(
  eventName: MetaStandardEvent,
  eventId: string,
  options?: { customData?: Record<string, unknown>; user?: MetaUser },
) {
  if (typeof window === "undefined" || !META_PIXEL_ID) return;
  try {
    let fbc = cookie("_fbc");
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
    void fetch("/api/meta/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl: window.location.href,
        fbp: cookie("_fbp"),
        fbc,
        customData: options?.customData,
        user: options?.user,
      }),
    }).catch(() => {});
  } catch {
    // Tracking must never break the page.
  }
}

/** Pixel + CAPI with one shared event id. */
export function trackMetaEvent(
  eventName: MetaStandardEvent,
  params?: Record<string, unknown>,
  user?: MetaUser,
  eventId: string = newEventId(),
) {
  trackPixel(eventName, params, { eventID: eventId });
  sendCapi(eventName, eventId, { customData: params, user });
  return eventId;
}

const FORM_PARAMS = {
  content_category: "ambassador_registration",
  content_name: "Programme Ambassadeur Pro — Inscription",
};

/** The registration modal was opened. Once per session. */
export function trackInitiateCheckout(ctaSource: string) {
  gaEventOnce("form_start", "form_start", { form_name: "ambassador", cta_source: ctaSource });
  if (!META_PIXEL_ID || !oncePerSession(INITIATE_CHECKOUT_KEY)) return;
  trackMetaEvent("InitiateCheckout", { ...FORM_PARAMS, cta_source: ctaSource });
}

/**
 * The registration API answered OK. The Pixel gets no PII; the CAPI copy
 * carries the visitor's details, hashed on the server. One Lead per session
 * so a re-submit or a revisit does not count twice.
 */
export function trackLead(user: MetaUser, ctaSource: string) {
  // GA4 gets no personal data, only that a lead happened.
  gaEventOnce("generate_lead", "generate_lead", { form_name: "ambassador", cta_source: ctaSource });
  if (!META_PIXEL_ID || !oncePerSession(LEAD_FIRED_KEY)) return;
  const eventId = newEventId();
  try {
    sessionStorage.setItem(LEAD_EVENT_KEY, eventId);
  } catch {}
  trackMetaEvent("Lead", { ...FORM_PARAMS, cta_source: ctaSource }, user, eventId);
}
