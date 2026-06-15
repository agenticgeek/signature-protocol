"use client";

import { useLocale } from "@/signature-recovery-protocol/i18n/LanguageProvider";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";
import type { Locale } from "@/signature-recovery-protocol/i18n/types";

export default function LanguageSwitch() {
  const { locale, setLocale } = useLocale();
  const { ui } = useSrpContent();

  const options: { value: Locale; label: string }[] = [
    { value: "fr", label: ui.language.french },
    { value: "en", label: ui.language.english },
  ];

  return (
    <div
      className="lang-switch"
      role="group"
      aria-label={ui.language.switchAriaLabel}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`lang-switch__btn${locale === option.value ? " lang-switch__btn--active" : ""}`}
          aria-pressed={locale === option.value}
          onClick={() => setLocale(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
