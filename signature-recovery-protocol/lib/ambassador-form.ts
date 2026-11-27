import {
  ACTIVITY_IDS,
  type ActivityId,
} from "@/signature-recovery-protocol/content/ambassador-form";
// "max" metadata: the same data the per-country limits in phoneLimits.ts use.
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  isSupportedCountry,
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
  type CountryCode,
} from "libphonenumber-js/max";
import {
  exceedsMaxNationalDigits,
  isValidPhoneForCountry,
  maxNationalDigits,
  phoneInsertOverflows,
  type PhoneLengthOptions,
} from "@/signature-recovery-protocol/lib/phoneLimits";

/** Shape posted by the modal to /api/ambassador. Shared by client and server. */
export type AmbassadorFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  dialIso: string;
  phone: string;
  businessName: string;
  activities: ActivityId[];
  activityOther: string;
  city: string;
  country: string;
  instagram: string;
  consent: boolean;
};

/** Which button opened the form — sent to the CRM as `cta_source`. */
export const AMBASSADOR_CTA_SOURCES = ["hero", "join"] as const;
export type AmbassadorCtaSource = (typeof AMBASSADOR_CTA_SOURCES)[number];

/** Human-readable CTA names for the CRM. */
export const AMBASSADOR_CTA_LABELS: Record<AmbassadorCtaSource, string> = {
  hero: "CTA 1 — Hero",
  join: "CTA 2 — Section finale",
};

export type AmbassadorFieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "businessName"
  | "activities"
  | "activityOther"
  | "city"
  | "country"
  | "instagram"
  | "consent";

export type AmbassadorErrorKind =
  | "required"
  | "email"
  | "phone"
  | "phoneShort"
  | "phoneLong"
  | "activity"
  | "instagram"
  | "consent";

export type AmbassadorErrors = Partial<Record<AmbassadorFieldName, AmbassadorErrorKind>>;

export const EMPTY_AMBASSADOR_VALUES: AmbassadorFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  dialIso: "FR",
  phone: "",
  businessName: "",
  activities: [],
  activityOther: "",
  city: "",
  country: "",
  instagram: "",
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INSTAGRAM_RE = /^[A-Za-z0-9._]{1,30}$/;

/** Longest value accepted per text field — enforced in the inputs and on the server. */
export const AMBASSADOR_MAX_LENGTH = {
  firstName: 60,
  lastName: 60,
  email: 120,
  businessName: 120,
  activityOther: 120,
  city: 80,
  country: 80,
  instagram: 80,
} as const;

export const PHONE_COUNTRIES: CountryCode[] = getCountries();

const asCountry = (iso: string): CountryCode | null =>
  isSupportedCountry(iso) ? (iso as CountryCode) : null;

/** Keeps what a phone number can contain: digits, spaces and one leading "+". */
export function cleanPhoneInput(input: string): string {
  const plus = input.trimStart().startsWith("+") ? "+" : "";
  return plus + input.replace(/[^\d ]/g, "").replace(/ {2,}/g, " ").trimStart();
}

const isInternational = (phone: string) => phone.trimStart().startsWith("+");
const digitCount = (text: string) => text.replace(/\D/g, "").length;

/** Cuts `text` right after its `keep`-th digit, keeping the visitor's spacing. */
function keepDigits(text: string, keep: number): string {
  let seen = 0;
  for (let i = 0; i < text.length; i++) {
    if (/\d/.test(text[i]) && ++seen > keep) return text.slice(0, i).trimEnd();
  }
  return text;
}

/**
 * True when a national number has more digits than the country allows
 * (longest real mobile/landline; a leading trunk prefix such as FR "0" is
 * not counted). "+…" text is judged once its country is known.
 * `{ international: true }`: the digits came after "+<code>", where a trunk
 * prefix gets no extra room (exactly 9 digits after +33).
 */
export function isPhoneTooLong(
  dialIso: string,
  phone: string,
  opts: PhoneLengthOptions = {},
): boolean {
  if (opts.international) return exceedsMaxNationalDigits(phone, dialIso, opts);
  if (isInternational(phone) || !exceedsMaxNationalDigits(phone, dialIso)) return false;
  // Some countries dial with more than the trunk digit (AR "0 11 15 …", BY "80 …"):
  // count the national number libphonenumber keeps once those are removed.
  const country = asCountry(dialIso);
  const national = country ? parsePhoneNumberFromString(phone, country)?.nationalNumber : undefined;
  return !national || national.length > maxNationalDigits(dialIso);
}

/** Trims a national number to what `dialIso` allows. Used when the country changes. */
export function fitPhoneToCountry(
  dialIso: string,
  phone: string,
  opts: PhoneLengthOptions = {},
): string {
  let next = phone;
  while (isPhoneTooLong(dialIso, next, opts)) next = keepDigits(next, digitCount(next) - 1);
  return next;
}

/**
 * Applies one edit of the phone field and returns the new country + number,
 * or null to refuse the edit (the input then keeps its previous value).
 *
 * - "+33 6…" typed or pasted picks the country and keeps the national part.
 *   While a shared code (+1, +44, +7…) does not yet tell the country, the
 *   "+…" text is kept, capped at the longest number among those countries.
 * - Digits beyond the country's limit are refused when typed; a paste or
 *   autofill (`pasted`) is cut down to the limit instead.
 */
export function applyPhoneEdit(
  dialIso: string,
  previous: string,
  raw: string,
  pasted: boolean,
): { dialIso: string; phone: string } | null {
  let next = cleanPhoneInput(raw);
  // Typing a digit into a full number is refused; anything else is trimmed.
  const refuse = !pasted && digitCount(next) > digitCount(previous);

  if (isInternational(next)) {
    const typed = new AsYouType();
    typed.input(next);
    const detected = typed.getCountry();
    if (detected) {
      // Present at runtime; only the default entry point's typings declare it.
      const national = (typed as AsYouType & { getNationalNumber(): string }).getNationalNumber();
      // These digits followed "+<code>": no room for a trunk prefix.
      const international = { international: true };
      if (isPhoneTooLong(detected, national, international) && refuse) return null;
      return { dialIso: detected, phone: fitPhoneToCountry(detected, national, international) };
    }

    const callingCode = typed.getCallingCode();
    const candidates = callingCode
      ? PHONE_COUNTRIES.filter((iso) => getCountryCallingCode(iso) === callingCode)
      : [];
    if (candidates.length === 0) {
      // Still typing the dial code, or no country starts with these digits.
      return digitCount(next) > 4 ? null : { dialIso, phone: next };
    }

    const overflows = (text: string) =>
      candidates.every((iso) => phoneInsertOverflows(text, "", iso));
    if (!overflows(next)) return { dialIso, phone: next };
    if (refuse) return null;
    while (overflows(next)) next = keepDigits(next, digitCount(next) - 1);
    // The trimmed number may now be complete enough to tell its country.
    return applyPhoneEdit(dialIso, previous, next, true);
  }

  if (isPhoneTooLong(dialIso, next)) {
    if (refuse) return null;
    next = fitPhoneToCountry(dialIso, next);
  }
  return { dialIso, phone: next };
}

/** Why a phone number is rejected, or null when it is a real number for the country. */
export function phoneError(dialIso: string, phone: string): AmbassadorErrorKind | null {
  const country = asCountry(dialIso);
  if (!country) return "phone";
  if (isPhoneTooLong(country, phone)) return "phoneLong";
  if (isInternational(phone)) {
    // The digits after "+<code>" count in full: no room for a trunk prefix.
    const parsed = parsePhoneNumberFromString(phone);
    if (
      parsed?.country === country &&
      isPhoneTooLong(country, parsed.nationalNumber, { international: true })
    ) {
      return "phoneLong";
    }
  }
  const length = validatePhoneNumberLength(phone, country);
  if (length === "TOO_SHORT") return "phoneShort";
  if (length === "TOO_LONG") return "phoneLong";
  if (length) return "phone";
  if (!isValidPhoneForCountry(phone, country)) return "phone";
  // "+44…" sent with another country selected.
  if (isInternational(phone) && parsePhoneNumberFromString(phone)?.country !== country) {
    return "phone";
  }
  return null;
}

/** "06 12 34 56 78" + FR → "+33612345678". Returns null when it is not a valid number. */
export function toInternationalPhone(dialIso: string, phone: string): string | null {
  const country = asCountry(dialIso);
  if (!country) return null;
  const parsed = parsePhoneNumberFromString(phone, country);
  return parsed?.isValid() ? parsed.number : null;
}

/** "https://instagram.com/mon.institut/" or "@mon.institut" → "@mon.institut". */
export function toInstagramHandle(input: string): string | null {
  const handle = input
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/[/?#].*$/, "")
    .replace(/^@+/, "");
  return INSTAGRAM_RE.test(handle) ? `@${handle}` : null;
}

export function validateAmbassadorForm(values: AmbassadorFormValues): AmbassadorErrors {
  const errors: AmbassadorErrors = {};
  const text = (v: string) => v.trim().length > 0;

  if (!text(values.firstName)) errors.firstName = "required";
  if (!text(values.lastName)) errors.lastName = "required";

  if (!text(values.email)) errors.email = "required";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "email";

  if (!text(values.phone)) errors.phone = "required";
  else {
    const phoneIssue = phoneError(values.dialIso, values.phone);
    if (phoneIssue) errors.phone = phoneIssue;
  }

  if (!text(values.businessName)) errors.businessName = "required";

  if (values.activities.length === 0) errors.activities = "activity";
  else if (values.activities.includes("other") && !text(values.activityOther)) {
    errors.activityOther = "required";
  }

  if (!text(values.city)) errors.city = "required";
  if (!text(values.country)) errors.country = "required";

  if (!text(values.instagram)) errors.instagram = "required";
  else if (!toInstagramHandle(values.instagram)) errors.instagram = "instagram";

  if (!values.consent) errors.consent = "consent";

  return errors;
}

/** Coerces untrusted JSON into form values (server side). */
export function parseAmbassadorValues(input: unknown): AmbassadorFormValues {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (key: string, max = 200) =>
    typeof src[key] === "string" ? (src[key] as string).slice(0, max) : "";
  const activities = Array.isArray(src.activities)
    ? ACTIVITY_IDS.filter((id) => (src.activities as unknown[]).includes(id))
    : [];

  return {
    firstName: str("firstName", AMBASSADOR_MAX_LENGTH.firstName),
    lastName: str("lastName", AMBASSADOR_MAX_LENGTH.lastName),
    email: str("email", AMBASSADOR_MAX_LENGTH.email),
    dialIso: str("dialIso", 2),
    phone: str("phone", 30),
    businessName: str("businessName", AMBASSADOR_MAX_LENGTH.businessName),
    activities,
    activityOther: str("activityOther", AMBASSADOR_MAX_LENGTH.activityOther),
    city: str("city", AMBASSADOR_MAX_LENGTH.city),
    country: str("country", AMBASSADOR_MAX_LENGTH.country),
    instagram: str("instagram", AMBASSADOR_MAX_LENGTH.instagram),
    consent: src.consent === true,
  };
}
