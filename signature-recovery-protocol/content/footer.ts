import type { Locale } from "@/signature-recovery-protocol/i18n/types";
import { FOOTER_DISCLAIMER } from "@/signature-recovery-protocol/constants/footer-disclaimer";

const FOOTER_DISCLAIMER_EN = `METCARE® products are designed to support comfort and guidance
through the aesthetic peri-operative journey. They are neither medicines
nor medical care and do not replace the recommendations
or follow-up of healthcare professionals.`;

const FOOTER_DISCLAIMER_ES = `Los productos METCARE® se inscriben en un enfoque de confort y acompañamiento
del recorrido perioperatorio estético. No constituyen ni medicamentos
ni una atención médica, y no sustituyen las recomendaciones
ni el seguimiento de los profesionales de la salud.`;

export function getFooterDisclaimer(locale: Locale) {
  if (locale === "en") return FOOTER_DISCLAIMER_EN;
  if (locale === "es") return FOOTER_DISCLAIMER_ES;
  return FOOTER_DISCLAIMER;
}
