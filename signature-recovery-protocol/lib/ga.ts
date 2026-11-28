// Google Analytics 4 (gtag.js). Same setup as masterclass.metcare.fr:
// config with send_page_view: false, page_view sent manually per route.
// Never send personal data (email, phone, names) to GA.

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-RJ16CFPCHR";

type GtagParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function loadGa() {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the Arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/** Send a GA4 event. Safe anywhere; a no-op on the server or without an ID. */
export function gaEvent(name: string, params: GtagParams = {}) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  try {
    loadGa();
    window.gtag?.("event", name, params);
  } catch {
    // Tracking must never break the page.
  }
}

export function gaPageView() {
  if (typeof window === "undefined") return;
  gaEvent("page_view", {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

/** Fire an event at most once per browser session (sessionStorage guard). */
export function gaEventOnce(key: string, name: string, params: GtagParams = {}) {
  if (typeof window === "undefined") return;
  try {
    const storageKey = `ga_once_${key}`;
    if (sessionStorage.getItem(storageKey)) return;
    sessionStorage.setItem(storageKey, "1");
  } catch {
    // Storage unavailable: fall through and send anyway.
  }
  gaEvent(name, params);
}
