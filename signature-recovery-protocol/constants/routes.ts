export const SRP_ROUTES = {
  landing: "/",
  protocole: "/protocole-complet",
  checkout: "/checkout",
  upsell: (sessionId?: string) =>
    sessionId ? `/upsell?session_id=${encodeURIComponent(sessionId)}` : "/upsell",
  merci: (sessionId?: string) =>
    sessionId ? `/merci?session_id=${encodeURIComponent(sessionId)}` : "/merci",
} as const;
