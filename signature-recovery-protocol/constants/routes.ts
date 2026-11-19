export const SRP_ROUTES = {
  landing: "/",
  protocole: "/protocole-complet",
  checkout: "/checkout",
  upsell: (sessionId?: string) =>
    sessionId ? `/upsell?session_id=${encodeURIComponent(sessionId)}` : "/upsell",
  merci: (sessionId?: string) =>
    sessionId ? `/merci?session_id=${encodeURIComponent(sessionId)}` : "/merci",
} as const;

/**
 * Pro Ambassador destinations.
 *
 * Both are placeholders ("#") until the client supplies them:
 *  - registration: Ambassador Pro registration form (R2) — CTA 1 + CTA 2
 *  - training:     Recovery & Longevity™ training funnel (R3) — CTA 3
 *
 * NEVER deploy to production while these are still "#".
 */
export const AMBASSADOR_LINKS = {
  registration: "#",
  training: "#",
} as const;
