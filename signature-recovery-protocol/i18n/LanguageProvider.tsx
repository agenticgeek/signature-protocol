"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getUiContent } from "@/signature-recovery-protocol/content/ui";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type Locale } from "./types";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// ES is hidden until the client sends Spanish copy (Q-3 / Y1).
const LOCALE_CYCLE: Locale[] = ["fr", "en"];

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    // A stored "es" from the SRP version falls back to French.
    return stored === "en" ? stored : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocaleState(readStoredLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;

    // Locale lives in the client, so the tab title and description follow it here.
    // The static <head> (and therefore link previews) stays on the French default.
    const { meta } = getUiContent(locale);
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);

    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      /* no-op */
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState(
      (current) => LOCALE_CYCLE[(LOCALE_CYCLE.indexOf(current) + 1) % LOCALE_CYCLE.length],
    );
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLocale must be used within LanguageProvider");
  }
  return context;
}
