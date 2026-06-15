import type { Locale } from "@/signature-recovery-protocol/i18n/types";
import { FOOTER_DISCLAIMER } from "@/signature-recovery-protocol/constants/footer-disclaimer";

const FOOTER_DISCLAIMER_EN = `METCARE® products are designed to support comfort and guidance
through the aesthetic peri-operative journey. They are neither medicines
nor medical care and do not replace the recommendations
or follow-up of healthcare professionals.`;

export function getFooterDisclaimer(locale: Locale) {
  return locale === "en" ? FOOTER_DISCLAIMER_EN : FOOTER_DISCLAIMER;
}
