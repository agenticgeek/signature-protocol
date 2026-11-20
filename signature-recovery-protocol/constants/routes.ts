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
 * need no link.
 *  - affiliateSignup: METCARE® ambassador programme page — the visitor is sent
 *                     there automatically once the form is submitted.
 *  - privacyPolicy:   privacy policy page, linked from the consent line. While it is
 *                     "#" (not supplied yet) the words are shown as plain text.
 *  - training:        Recovery & Longevity™ training site — CTA 3
 */
export const AMBASSADOR_LINKS = {
  affiliateSignup: "https://metcare.eu/pages/programme-ambassadeurs",
  privacyPolicy: "#",
  training: "https://recovery-longevity-expert.metcare.fr/",
} as const;

/** How long the "redirecting" screen stays up after the form is sent. */
export const AMBASSADOR_REDIRECT_DELAY_MS = 3000;
