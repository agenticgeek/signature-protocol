import type { Locale } from "@/signature-recovery-protocol/i18n/types";

const uiFr = {
  nav: {
    mainAriaLabel: "Navigation principale",
    quickAriaLabel: "Navigation rapide",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    philosophy: "Philosophie",
    protocol: "Le protocole",
    order: "Commander",
    backHome: "← Retour à l'accueil",
    back: "← Retour",
    home: "Accueil",
    confirmation: "Confirmation",
    backHomeShort: "Retour à l'accueil",
  },
  language: {
    switchAriaLabel: "Changer de langue",
    french: "FR",
    english: "EN",
    spanish: "ES",
  },
  video: {
    opener: "Vidéo d'ouverture METCARE®",
    interlude: "Vidéo METCARE®",
    closer: "Vidéo de clôture METCARE®",
  },
  footer: {
    copyright: "© 2026 METCARE®",
    signature: "Recovery & Longevity™",
  },
  meta: {
    title: "Programme Ambassadeur Pro | METCARE®",
    description: "Prolongez l'expérience de vos clientes. Développez votre activité.",
  },
} as const;

const uiEn = {
  nav: {
    mainAriaLabel: "Main navigation",
    quickAriaLabel: "Quick navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    philosophy: "Philosophy",
    protocol: "The protocol",
    order: "Order",
    backHome: "← Back to home",
    back: "← Back",
    home: "Home",
    confirmation: "Confirmation",
    backHomeShort: "Back to home",
  },
  language: {
    switchAriaLabel: "Switch language",
    french: "FR",
    english: "EN",
    spanish: "ES",
  },
  video: {
    opener: "METCARE® opening film",
    interlude: "METCARE® film",
    closer: "METCARE® closing film",
  },
  footer: {
    copyright: "© 2026 METCARE®",
    signature: "Recovery & Longevity™",
  },
  meta: {
    title: "Pro Ambassador Program | METCARE®",
    description: "Extend your clients' experience. Grow your business.",
  },
} as const;

const uiEs = {
  nav: {
    mainAriaLabel: "Navegación principal",
    quickAriaLabel: "Navegación rápida",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    philosophy: "Filosofía",
    protocol: "El protocolo",
    order: "Pedir",
    backHome: "← Volver al inicio",
    back: "← Volver",
    home: "Inicio",
    confirmation: "Confirmación",
    backHomeShort: "Volver al inicio",
  },
  language: {
    switchAriaLabel: "Cambiar idioma",
    french: "FR",
    english: "EN",
    spanish: "ES",
  },
  video: {
    opener: "Vídeo de apertura METCARE®",
    interlude: "Vídeo METCARE®",
    closer: "Vídeo de cierre METCARE®",
  },
  footer: {
    copyright: "© 2026 METCARE®",
    signature: "Recovery & Longevity™",
  },
  meta: {
    title: "Programa Embajador Pro | METCARE®",
    description: "Prolonga la experiencia de tus clientas. Haz crecer tu negocio.",
  },
} as const;

export function getUiContent(locale: Locale) {
  if (locale === "en") return uiEn;
  if (locale === "es") return uiEs;
  return uiFr;
}
