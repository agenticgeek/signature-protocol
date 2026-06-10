export const merciContent = {
  headline: "Bienvenue dans l'expérience METCARE®.",
  subline: "Votre récupération commence maintenant.",
  emailNote: "Un email de confirmation vient d'être envoyé à votre adresse.",
  intro: "Retrouvez ci-dessous tout ce dont vous avez besoin pour commencer votre protocole.",
  orderSummaryLabel: "Récapitulatif de votre commande",
  blocks: [
    {
      id: "ebook",
      title: "Téléchargement du e-book SRP™",
      placeholder: "Contenu à fournir par le client.",
    },
    {
      id: "conseils",
      title: "Conseils d'utilisation",
      placeholder: "Contenu à fournir par le client.",
    },
    {
      id: "routine",
      title: "Routine SRP™",
      placeholder: "Contenu à fournir par le client.",
    },
    {
      id: "expert",
      title: "Accès accompagnement expert METCARE®",
      placeholder: "Accès à confirmer par le client.",
    },
  ],
  closing: ["Merci de faire confiance à METCARE®.", "Prenez soin de vous."],
  sessionMissing: "Session de commande introuvable.",
  orderPlaceholder: "Récapitulatif de commande — à récupérer depuis Stripe.",
} as const;
