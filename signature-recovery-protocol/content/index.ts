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
import { getUiContent } from "./ui";
import { getFooterDisclaimer } from "./footer";

export function getSrpContent(locale: Locale) {
  const isEn = locale === "en";

  return {
    landing: isEn ? landingEn : landingFr,
    protocole: isEn ? protocoleEn : protocoleFr,
    checkout: isEn ? checkoutEn : checkoutFr,
    upsell: isEn ? upsellEn : upsellFr,
    merci: isEn ? merciEn : merciFr,
    ui: getUiContent(locale),
    footerDisclaimer: getFooterDisclaimer(locale),
  };
}

export type SrpContent = ReturnType<typeof getSrpContent>;
