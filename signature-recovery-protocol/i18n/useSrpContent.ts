"use client";

import { getSrpContent } from "@/signature-recovery-protocol/content";
import { useLocale } from "./LanguageProvider";

export function useSrpContent() {
  const { locale } = useLocale();
  return getSrpContent(locale);
}
