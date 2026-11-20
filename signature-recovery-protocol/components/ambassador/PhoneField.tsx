"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AsYouType, getCountryCallingCode, type CountryCode } from "libphonenumber-js";
import {
  PHONE_COUNTRIES,
  cleanPhoneInput,
  isPhoneTooLong,
} from "@/signature-recovery-protocol/lib/ambassador-form";

type PhoneFieldProps = {
  locale: string;
  dialIso: string;
  phone: string;
  onDialChange: (iso: string) => void;
  onPhoneChange: (phone: string) => void;
  onBlur: () => void;
  labels: { dialCode: string; dialSearch: string; dialEmpty: string };
  /** id, name, aria-* for the number input (wired to the visible label). */
  inputProps: Record<string, unknown>;
};

/** Shown first in the list, before the alphabetical run. */
const PINNED: CountryCode[] = ["FR", "BE", "CH", "LU", "MC", "CA"];

const fold = (text: string) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function Flag({ iso }: { iso: string }) {
  return (
    // Self-hosted SVG flags (public/flags): emoji flags do not render on Windows.
    // eslint-disable-next-line @next/next/no-img-element
    <img className="amb-flag" src={`/flags/${iso}.svg`} alt="" width={24} height={16} loading="lazy" />
  );
}

/**
 * Phone number with a searchable country picker (every country, with flag and
 * dial code). The number is limited to the length the chosen country allows,
 * and a number typed or pasted with "+…" switches the country by itself.
 */
export default function PhoneField({
  locale,
  dialIso,
  phone,
  onDialChange,
  onPhoneChange,
  onBlur,
  labels,
  inputProps,
}: PhoneFieldProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const countries = useMemo(() => {
    const names = new Intl.DisplayNames([locale === "en" || locale === "es" ? locale : "fr"], { type: "region" });
    const all = PHONE_COUNTRIES.map((iso) => {
      let name: string = iso;
      try {
        name = names.of(iso) ?? iso;
      } catch {
        /* keep the ISO code */
      }
      return { iso, name, dial: getCountryCallingCode(iso), search: fold(name) };
    }).sort((a, b) => a.name.localeCompare(b.name, locale));
    const pinned = PINNED.flatMap((iso) => all.filter((c) => c.iso === iso));
    return [...pinned, ...all.filter((c) => !PINNED.includes(c.iso))];
  }, [locale]);

  const results = useMemo(() => {
    const q = fold(query.trim());
    if (!q) return countries;
    const digits = q.replace(/\D/g, "");
    return countries.filter(
      (c) =>
        c.search.includes(q) ||
        c.iso.toLowerCase() === q ||
        (digits.length > 0 && c.dial.startsWith(digits)),
    );
  }, [countries, query]);

  const current = countries.find((c) => c.iso === dialIso) ?? countries[0];

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, listId]);

  const openPicker = () => {
    setQuery("");
    setActive(Math.max(0, countries.findIndex((c) => c.iso === dialIso)));
    setOpen(true);
  };

  const choose = (iso: string) => {
    onDialChange(iso);
    setOpen(false);
    numberRef.current?.focus();
  };

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((i) => Math.min(Math.max(i + step, 0), results.length - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (results[active]) choose(results[active].iso);
    } else if (event.key === "Escape") {
      // Close the picker only — not the whole form.
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  const handleNumber = (raw: string) => {
    let next = cleanPhoneInput(raw);
    let iso = dialIso;

    // "+92 312…" typed or pasted: pick the country and keep the national part.
    if (next.startsWith("+")) {
      const typed = new AsYouType();
      typed.input(next);
      const detected = typed.getCountry();
      if (detected) {
        iso = detected;
        next = typed.getNationalNumber();
      } else if (next.replace(/\D/g, "").length > 4) {
        return; // no country starts with these digits
      }
    }

    // Per-country limit: refuse digits beyond the longest valid number.
    if (isPhoneTooLong(iso, next) && next.length > phone.length) return;

    if (iso !== dialIso) onDialChange(iso);
    onPhoneChange(next);
  };

  const formatOnBlur = () => {
    if (phone && !phone.startsWith("+")) {
      const formatted = new AsYouType(current.iso).input(phone.replace(/\D/g, ""));
      if (formatted && formatted !== phone) onPhoneChange(formatted);
    }
    onBlur();
  };

  return (
    <div className="amb-phone" ref={rootRef}>
      <button
        type="button"
        className="amb-phone__dial"
        aria-label={`${labels.dialCode} : ${current.name} +${current.dial}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openPicker())}
      >
        <Flag iso={current.iso} />
        <span>+{current.dial}</span>
        <span className="amb-phone__caret" aria-hidden="true" />
      </button>

      <input
        {...inputProps}
        ref={numberRef}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={phone}
        onChange={(e) => handleNumber(e.target.value)}
        onBlur={formatOnBlur}
      />

      {open ? (
        <div className="amb-country">
          <input
            ref={searchRef}
            className="amb-country__search"
            type="text"
            role="combobox"
            aria-label={labels.dialSearch}
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
            aria-autocomplete="list"
            placeholder={labels.dialSearch}
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onSearchKeyDown}
          />
          <ul className="amb-country__list" id={listId} role="listbox" aria-label={labels.dialCode}>
            {results.map((country, i) => (
              <li
                key={country.iso}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={country.iso === dialIso}
                className={`amb-country__option${i === active ? " is-active" : ""}`}
                onPointerMove={() => setActive(i)}
                onClick={() => choose(country.iso)}
              >
                <Flag iso={country.iso} />
                <span className="amb-country__name">{country.name}</span>
                <span className="amb-country__dial">+{country.dial}</span>
              </li>
            ))}
            {results.length === 0 ? (
              <li className="amb-country__empty">{labels.dialEmpty}</li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
