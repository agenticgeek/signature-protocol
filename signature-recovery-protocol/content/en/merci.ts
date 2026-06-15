export const merciContent = {
  headline: "Welcome to the METCARE® experience.",
  subline: "Your recovery starts now.",
  emailNote: "A confirmation email has just been sent to your address.",
  intro: "Find everything you need below to begin your protocol.",
  orderSummaryLabel: "Order summary",
  blocks: [
    {
      id: "ebook",
      title: "SRP™ e-book download",
      placeholder: "Content to be provided by the client.",
    },
    {
      id: "conseils",
      title: "Usage tips",
      placeholder: "Content to be provided by the client.",
    },
    {
      id: "routine",
      title: "SRP™ routine",
      placeholder: "Content to be provided by the client.",
    },
    {
      id: "expert",
      title: "METCARE® expert guidance access",
      placeholder: "Access to be confirmed by the client.",
    },
  ],
  closing: ["Thank you for trusting METCARE®.", "Take care of yourself."],
  sessionMissing: "Order session not found.",
  orderPlaceholder: "Order summary — to be retrieved from Stripe.",
} as const;
