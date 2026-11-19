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
 * CTA 1 (hero) and CTA 2 (section 8) open the registration form modal, so they
 * need no link. The links below are placeholders ("#") until the client supplies them:
 *  - affiliateSignup: official account creation page on the METCARE® affiliation
 *                     platform — "Créer mon compte METCARE®" button shown after the
 *                     form is sent. Same link as in the GHL welcome e-mail.
 *  - privacyPolicy:   privacy policy page, linked from the consent line. While it is
 *                     "#" the words are shown as plain text.
 *  - training:        Recovery & Longevity™ training funnel (R3) — CTA 3
 *
 * NEVER deploy to production while affiliateSignup or training are still "#".
 */
export const AMBASSADOR_LINKS = {
  affiliateSignup: "#",
  privacyPolicy: "#",
  training: "#",
} as const;
