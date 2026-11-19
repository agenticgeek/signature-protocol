import type { Locale } from "@/signature-recovery-protocol/i18n/types";

/**
 * Ambassador Pro registration form (modal opened by CTA 1 and CTA 2).
 * French copy is the client's wording, verbatim. English is a translation.
 *
 * Activity `id`s are stable keys; the value sent to GoHighLevel is always the
 * French label (see ACTIVITY_CRM_LABELS) so the CRM stays in one language.
 */
export const ACTIVITY_IDS = [
  "esthetician",
  "massage",
  "wellness",
  "spa",
  "health",
  "other",
] as const;

export type ActivityId = (typeof ACTIVITY_IDS)[number];

export const ACTIVITY_CRM_LABELS: Record<ActivityId, string> = {
  esthetician: "Esthéticienne / Institut de beauté",
  massage: "Praticienne en massages et soins corporels",
  wellness: "Professionnelle du bien-être",
  spa: "Spa / Centre esthétique",
  health: "Professionnelle de santé",
  other: "Autre",
};

const formFr = {
  eyebrow: "Formulaire d'inscription — Ambassadeur Pro METCARE®",
  title: "Rejoignez l'univers METCARE® et donnez une nouvelle dimension à votre activité.",
  intro:
    "Complétez ce formulaire pour rejoindre notre programme professionnel, accéder à vos avantages exclusifs et recevoir votre kit digital offert.",
  close: "Fermer le formulaire",
  requiredNote: "* Champs obligatoires",
  sections: {
    personal: "Informations personnelles",
    business: "Votre activité professionnelle",
    consent: "Consentement",
  },
  fields: {
    firstName: "Prénom",
    lastName: "Nom",
    email: "Adresse e-mail professionnelle",
    phone: "Numéro de téléphone",
    dialCode: "Indicatif pays",
    dialSearch: "Rechercher un pays ou un indicatif",
    dialEmpty: "Aucun pays trouvé",
    businessName: "Nom de votre institut ou établissement",
    activity: "Votre activité professionnelle",
    activityOther: "Précisez votre activité",
    city: "Ville",
    country: "Pays",
    instagram: "Compte Instagram professionnel",
    instagramPlaceholder: "@votrecompte",
    instagramHint: "Indiquez le compte Instagram de votre institut ou de votre activité.",
  },
  activities: {
    esthetician: "Esthéticienne / Institut de beauté",
    massage: "Praticienne en massages et soins corporels",
    wellness: "Professionnelle du bien-être",
    spa: "Spa / Centre esthétique",
    health: "Professionnelle de santé",
    other: "Autre (préciser)",
  },
  consent: {
    before:
      "J'accepte que mes informations soient utilisées pour traiter mon inscription au Programme Ambassadeur Pro METCARE® et être contacté(e) à ce sujet, conformément à la ",
    policy: "politique de confidentialité",
    after: ".",
  },
  submit: "Devenir Ambassadeur Pro",
  submitting: "Envoi en cours…",
  reassurance: ["Inscription gratuite", "Sans stock", "Kit digital offert"],
  errors: {
    required: "Ce champ est obligatoire.",
    email: "Saisissez une adresse e-mail valide.",
    phone: "Ce numéro n'est pas valide pour le pays sélectionné.",
    phoneShort: "Ce numéro est trop court pour le pays sélectionné.",
    phoneLong: "Ce numéro est trop long pour le pays sélectionné.",
    activity: "Sélectionnez au moins une activité.",
    instagram: "Saisissez un compte Instagram valide (ex. @votrecompte).",
    consent: "Votre accord est nécessaire pour traiter votre inscription.",
    summary: "Certains champs sont à corriger.",
    submit: "L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez.",
    notConfigured:
      "Les inscriptions ne sont pas encore ouvertes. Merci de réessayer un peu plus tard.",
  },
  success: {
    title: "Bienvenue dans l'univers METCARE® !",
    lines: [
      "Votre formulaire a bien été envoyé.",
      "Finalisez votre inscription pour activer votre compte Ambassadeur Pro et accéder à vos avantages exclusifs.",
    ],
    cta: "Créer mon compte METCARE®",
  },
} as const;

const formEn = {
  eyebrow: "Registration form — METCARE® Pro Ambassador",
  title: "Join the world of METCARE® and give your business a new dimension.",
  intro:
    "Complete this form to join our professional program, unlock your exclusive benefits and receive your free digital kit.",
  close: "Close the form",
  requiredNote: "* Required fields",
  sections: {
    personal: "Personal information",
    business: "Your professional activity",
    consent: "Consent",
  },
  fields: {
    firstName: "First name",
    lastName: "Last name",
    email: "Professional email address",
    phone: "Phone number",
    dialCode: "Country code",
    dialSearch: "Search a country or dial code",
    dialEmpty: "No country found",
    businessName: "Name of your salon or business",
    activity: "Your professional activity",
    activityOther: "Tell us your activity",
    city: "City",
    country: "Country",
    instagram: "Professional Instagram account",
    instagramPlaceholder: "@youraccount",
    instagramHint: "Enter the Instagram account of your salon or business.",
  },
  activities: {
    esthetician: "Beautician / Beauty salon",
    massage: "Massage and body care practitioner",
    wellness: "Wellness professional",
    spa: "Spa / Aesthetic centre",
    health: "Healthcare professional",
    other: "Other (please specify)",
  },
  consent: {
    before:
      "I agree to my information being used to process my registration for the METCARE® Pro Ambassador Program and to be contacted about it, in accordance with the ",
    policy: "privacy policy",
    after: ".",
  },
  submit: "Become a Pro Ambassador",
  submitting: "Sending…",
  reassurance: ["Free sign-up", "No stock", "Free digital kit"],
  errors: {
    required: "This field is required.",
    email: "Enter a valid email address.",
    phone: "This number is not valid for the selected country.",
    phoneShort: "This number is too short for the selected country.",
    phoneLong: "This number is too long for the selected country.",
    activity: "Select at least one activity.",
    instagram: "Enter a valid Instagram account (e.g. @youraccount).",
    consent: "We need your agreement to process your registration.",
    summary: "Some fields need your attention.",
    submit: "We couldn't send your form. Check your connection and try again.",
    notConfigured: "Registrations are not open yet. Please try again a little later.",
  },
  success: {
    title: "Welcome to the world of METCARE®!",
    lines: [
      "Your form has been sent.",
      "Complete your registration to activate your Pro Ambassador account and unlock your exclusive benefits.",
    ],
    cta: "Create my METCARE® account",
  },
} as const;

/** ES is parked with the French wording, like the rest of the landing page (Q-3 / Y1). */
export function getAmbassadorFormContent(locale: Locale) {
  return locale === "en" ? formEn : formFr;
}

export type AmbassadorFormContent = ReturnType<typeof getAmbassadorFormContent>;
