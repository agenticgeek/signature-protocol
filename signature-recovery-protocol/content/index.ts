import type { Locale } from "@/signature-recovery-protocol/i18n/types";
import { landingContent as landingFr } from "./landing";
import { protocoleContent as protocoleFr } from "./protocole";
import { checkoutContent as checkoutFr } from "./checkout";
import { upsellContent as upsellFr } from "./upsell";
import { merciContent as merciFr } from "./merci";
import { landingContent as landingEn } from "./en/landing";
import { protocoleContent as protocoleEn } from "./en/protocole";
import { checkoutContent as checkoutEn } from "./en/checkout";
import { upsellContent as upsellEn } from "./en/upsell";
import { merciContent as merciEn } from "./en/merci";
import { protocoleContent as protocoleEs } from "./es/protocole";
import { checkoutContent as checkoutEs } from "./es/checkout";
import { upsellContent as upsellEs } from "./es/upsell";
import { merciContent as merciEs } from "./es/merci";
import { getUiContent } from "./ui";
import { getFooterDisclaimer } from "./footer";
import { getAmbassadorFormContent } from "./ambassador-form";

const byLocale = {
  fr: {
    landing: landingFr,
    protocole: protocoleFr,
    checkout: checkoutFr,
    upsell: upsellFr,
    merci: merciFr,
  },
  en: {
    landing: landingEn,
    protocole: protocoleEn,
    checkout: checkoutEn,
    upsell: upsellEn,
    merci: merciEn,
  },
  // ES is parked until the client sends Spanish copy (Q-3 / Y1): the landing page
  // falls back to French so the old SRP copy can never surface in Spanish.
  // To restore, update content/es/landing.ts to the new shape and import it here.
  es: {
    landing: landingFr,
    protocole: protocoleEs,
    checkout: checkoutEs,
    upsell: upsellEs,
    merci: merciEs,
  },
} as const satisfies Record<Locale, Record<string, unknown>>;

export function getSrpContent(locale: Locale) {
  return {
    ...byLocale[locale],
    ui: getUiContent(locale),
    footerDisclaimer: getFooterDisclaimer(locale),
    ambassadorForm: getAmbassadorFormContent(locale),
  };
}

export type SrpContent = ReturnType<typeof getSrpContent>;
