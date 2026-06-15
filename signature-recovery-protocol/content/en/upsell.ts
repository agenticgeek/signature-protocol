export const upsellContent = {
  headline: "Your order is confirmed. Thank you for your trust.",
  intro: [
    "Before you discover your METCARE® space, here are a few additions",
    "designed to further enrich your recovery experience.",
  ],
  items: [
    {
      id: "skin-recovery-patch",
      headline: "Add a second SKIN RECOVERY PATCH™ pack",
      pricePlaceholder: "Price to be confirmed",
      acceptCta: "Add to my order",
      declineCta: "No thanks, continue",
    },
    {
      id: "mymadero-sculpt",
      headline: "Add a MYMADERO SCULPT™ session",
      pricePlaceholder: "Price to be confirmed",
      acceptCta: "Add to my order",
      declineCta: "No thanks, continue",
    },
    {
      id: "expert",
      headline: "Add METCARE® expert guidance",
      pricePlaceholder: "Price to be confirmed",
      acceptCta: "Add to my order",
      declineCta: "No thanks, continue",
    },
  ],
  skipAll: "Continue to my METCARE® space →",
  sessionMissing:
    "Payment session not found. Please return from the payment confirmation.",
} as const;
