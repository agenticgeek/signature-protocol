"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  AMBASSADOR_LINKS,
  AMBASSADOR_REDIRECT_DELAY_MS,
} from "@/signature-recovery-protocol/constants/routes";
import {
  ACTIVITY_IDS,
  type ActivityId,
} from "@/signature-recovery-protocol/content/ambassador-form";
import { useLocale } from "@/signature-recovery-protocol/i18n/LanguageProvider";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";
import PhoneField from "./PhoneField";
import {
  AMBASSADOR_MAX_LENGTH,
  EMPTY_AMBASSADOR_VALUES,
  validateAmbassadorForm,
  type AmbassadorCtaSource,
  type AmbassadorErrors,
  type AmbassadorFieldName,
  type AmbassadorFormValues,
} from "@/signature-recovery-protocol/lib/ambassador-form";

type AmbassadorFormModalProps = {
  isOpen: boolean;
  /** The CTA that opened the form (hero or closing section). */
  source: AmbassadorCtaSource;
  onClose: () => void;
};

type Status = "idle" | "submitting" | "success";

/** Order in which fields appear, used to focus the first one in error. */
const FIELD_ORDER: AmbassadorFieldName[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "businessName",
  "activities",
  "activityOther",
  "city",
  "country",
  "instagram",
  "consent",
];

const FIELD_FOCUS_ID: Record<AmbassadorFieldName, string> = {
  firstName: "amb-firstName",
  lastName: "amb-lastName",
  email: "amb-email",
  phone: "amb-phone",
  businessName: "amb-businessName",
  activities: `amb-activity-${ACTIVITY_IDS[0]}`,
  activityOther: "amb-activityOther",
  city: "amb-city",
  country: "amb-country",
  instagram: "amb-instagram",
  consent: "amb-consent",
};

/**
 * Ambassador Pro registration form, shown in a modal over the landing page.
 * Uses the native <dialog>: focus trap, Escape and the top layer come for free.
 */
export default function AmbassadorFormModal({ isOpen, source, onClose }: AmbassadorFormModalProps) {
  const { ambassadorForm: t } = useSrpContent();
  const { locale } = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const successTitleRef = useRef<HTMLHeadingElement>(null);

  const [values, setValues] = useState<AmbassadorFormValues>(EMPTY_AMBASSADOR_VALUES);
  const [errors, setErrors] = useState<AmbassadorErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      // Start on the form itself rather than on the close button.
      bodyRef.current?.focus({ preventScroll: true });
    }
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (status !== "success") return;
    successTitleRef.current?.focus();
    // Form sent: show the "redirecting" screen, then go to the programme page.
    // Closing the dialog resets the status, which cancels the redirect.
    const timer = window.setTimeout(() => {
      window.location.assign(AMBASSADOR_LINKS.affiliateSignup);
    }, AMBASSADOR_REDIRECT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleClosed = () => {
    // A sent form starts clean next time; a half-filled one is kept.
    if (status === "success") {
      setValues(EMPTY_AMBASSADOR_VALUES);
      setStatus("idle");
    }
    setErrors({});
    setSubmitError(null);
    onClose();
  };

  const setField = <K extends keyof AmbassadorFormValues>(
    key: K,
    value: AmbassadorFormValues[K],
    errorKey?: AmbassadorFieldName,
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    const clear = errorKey ?? (key as AmbassadorFieldName);
    setErrors((current) => {
      if (!(clear in current)) return current;
      const next = { ...current };
      delete next[clear];
      return next;
    });
  };

  const toggleActivity = (id: ActivityId) => {
    const next = values.activities.includes(id)
      ? values.activities.filter((item) => item !== id)
      : [...values.activities, id];
    setField("activities", next);
    if (id === "other") setErrors(({ activityOther: _drop, ...rest }) => rest);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validateAmbassadorForm(values);
    setErrors(found);
    setSubmitError(null);

    const firstInvalid = FIELD_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      document.getElementById(FIELD_FOCUS_ID[firstInvalid])?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypot,
          locale,
          ctaSource: source,
          pageUrl: window.location.href,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        fields?: AmbassadorErrors;
      } | null;

      if (response.ok && result?.ok) {
        setStatus("success");
        bodyRef.current?.scrollTo({ top: 0 });
        return;
      }

      if (result?.fields) setErrors(result.fields);
      setSubmitError(
        result?.error === "not_configured"
          ? t.errors.notConfigured
          : result?.fields
            ? t.errors.summary
            : t.errors.submit,
      );
    } catch {
      setSubmitError(t.errors.submit);
    }
    setStatus("idle");
  };

  /** Checks one field when the visitor leaves it. */
  const validateField = (name: AmbassadorFieldName) => {
    const kind = validateAmbassadorForm(values)[name];
    setErrors((current) => {
      if (current[name] === kind) return current;
      const next = { ...current };
      if (kind) next[name] = kind;
      else delete next[name];
      return next;
    });
  };

  const errorText = (name: AmbassadorFieldName) => {
    const kind = errors[name];
    return kind ? t.errors[kind] : null;
  };

  const fieldProps = (name: AmbassadorFieldName, hintId?: string) => {
    const describedBy = [errors[name] ? `amb-${name}-error` : null, hintId]
      .filter(Boolean)
      .join(" ");
    return {
      id: `amb-${name}`,
      name,
      required: true,
      maxLength:
        name in AMBASSADOR_MAX_LENGTH
          ? AMBASSADOR_MAX_LENGTH[name as keyof typeof AMBASSADOR_MAX_LENGTH]
          : undefined,
      onBlur: () => validateField(name),
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": describedBy || undefined,
    };
  };

  const Field = ({
    name,
    label,
    hint,
    children,
  }: {
    name: AmbassadorFieldName;
    label: string;
    hint?: string;
    children: ReactNode;
  }) => (
    <div className={`srp-field amb-field${errors[name] ? " amb-field--error" : ""}`}>
      <label htmlFor={`amb-${name}`}>
        {label} <span aria-hidden="true">*</span>
      </label>
      {children}
      {hint ? (
        <p className="amb-hint" id={`amb-${name}-hint`}>
          {hint}
        </p>
      ) : null}
      {errors[name] ? (
        <p className="amb-error" id={`amb-${name}-error`}>
          {errorText(name)}
        </p>
      ) : null}
    </div>
  );

  const submitting = status === "submitting";
  const hasPolicyLink = AMBASSADOR_LINKS.privacyPolicy !== "#";

  return (
    <dialog
      ref={dialogRef}
      className="amb-dialog"
      aria-labelledby={status === "success" ? "amb-success-title" : "amb-title"}
      onClose={handleClosed}
      onCancel={(event) => {
        // Escape with the country list open closes the list, not the form.
        if (dialogRef.current?.querySelector(".amb-country")) event.preventDefault();
      }}
      onMouseDown={(event) => {
        // A press on the dimmed area (the dialog element itself) closes the form.
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <div className="amb-bar">
        <span className="amb-bar__brand">
          METCARE<sup>®</sup>
        </span>
        <button
          type="button"
          className="amb-close"
          aria-label={t.close}
          onClick={() => dialogRef.current?.close()}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="amb-panel" ref={bodyRef} tabIndex={-1}>
        {status === "success" ? (
          <div className="amb-success" role="status">
            <h2 className="amb-title" id="amb-success-title" ref={successTitleRef} tabIndex={-1}>
              {t.success.title}
            </h2>
            {t.success.lines.map((line) => (
              <p className="srp-lede" key={line}>
                {line}
              </p>
            ))}
            <p className="amb-redirect">
              <span className="amb-redirect__spinner" aria-hidden="true" />
              <span>{t.success.redirecting}</span>
            </p>
            <a className="srp-cta amb-submit" id="cta-create-account" href={AMBASSADOR_LINKS.affiliateSignup}>
              <span className="srp-cta__label">{t.success.cta}</span>
              <span className="srp-cta__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        ) : (
          <>
            <header className="amb-head">
              <p className="srp-section-num">{t.eyebrow}</p>
              <h2 className="amb-title" id="amb-title">
                {t.title}
              </h2>
              <p className="srp-lede">{t.intro}</p>
            </header>

            <form className="amb-form" onSubmit={handleSubmit} noValidate>
              <fieldset className="amb-group" disabled={submitting}>
                <legend className="amb-group-title">{t.sections.personal}</legend>

                <div className="srp-field-row">
                  {Field({
                    name: "firstName",
                    label: t.fields.firstName,
                    children: (
                      <input
                        {...fieldProps("firstName")}
                        type="text"
                        autoComplete="given-name"
                        value={values.firstName}
                        onChange={(e) => setField("firstName", e.target.value)}
                      />
                    ),
                  })}
                  {Field({
                    name: "lastName",
                    label: t.fields.lastName,
                    children: (
                      <input
                        {...fieldProps("lastName")}
                        type="text"
                        autoComplete="family-name"
                        value={values.lastName}
                        onChange={(e) => setField("lastName", e.target.value)}
                      />
                    ),
                  })}
                </div>

                {Field({
                  name: "email",
                  label: t.fields.email,
                  children: (
                    <input
                      {...fieldProps("email")}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => setField("email", e.target.value)}
                    />
                  ),
                })}

                {Field({
                  name: "phone",
                  label: t.fields.phone,
                  children: (
                    <PhoneField
                      locale={locale}
                      dialIso={values.dialIso}
                      phone={values.phone}
                      onDialChange={(iso) => setField("dialIso", iso, "phone")}
                      onPhoneChange={(next) => setField("phone", next)}
                      onBlur={() => validateField("phone")}
                      labels={t.fields}
                      inputProps={(({ onBlur: _onBlur, maxLength: _max, ...rest }) => rest)(
                        fieldProps("phone"),
                      )}
                    />
                  ),
                })}
              </fieldset>

              <fieldset className="amb-group" disabled={submitting}>
                <legend className="amb-group-title">{t.sections.business}</legend>

                {Field({
                  name: "businessName",
                  label: t.fields.businessName,
                  children: (
                    <input
                      {...fieldProps("businessName")}
                      type="text"
                      autoComplete="organization"
                      value={values.businessName}
                      onChange={(e) => setField("businessName", e.target.value)}
                    />
                  ),
                })}

                <fieldset
                  className={`amb-choices${errors.activities ? " amb-field--error" : ""}`}
                  aria-describedby={errors.activities ? "amb-activities-error" : undefined}
                >
                  <legend className="amb-choices__legend">
                    {t.fields.activity} <span aria-hidden="true">*</span>
                  </legend>
                  <div className="amb-choices__list">
                    {ACTIVITY_IDS.map((id) => (
                      <label className="amb-check" key={id} htmlFor={`amb-activity-${id}`}>
                        <input
                          id={`amb-activity-${id}`}
                          type="checkbox"
                          name="activities"
                          value={id}
                          checked={values.activities.includes(id)}
                          onChange={() => toggleActivity(id)}
                        />
                        <span>{t.activities[id]}</span>
                      </label>
                    ))}
                  </div>
                  {errors.activities ? (
                    <p className="amb-error" id="amb-activities-error">
                      {errorText("activities")}
                    </p>
                  ) : null}
                </fieldset>

                {values.activities.includes("other")
                  ? Field({
                      name: "activityOther",
                      label: t.fields.activityOther,
                      children: (
                        <input
                          {...fieldProps("activityOther")}
                          type="text"
                          value={values.activityOther}
                          onChange={(e) => setField("activityOther", e.target.value)}
                        />
                      ),
                    })
                  : null}

                <div className="srp-field-row">
                  {Field({
                    name: "city",
                    label: t.fields.city,
                    children: (
                      <input
                        {...fieldProps("city")}
                        type="text"
                        autoComplete="address-level2"
                        value={values.city}
                        onChange={(e) => setField("city", e.target.value)}
                      />
                    ),
                  })}
                  {Field({
                    name: "country",
                    label: t.fields.country,
                    children: (
                      <input
                        {...fieldProps("country")}
                        type="text"
                        autoComplete="country-name"
                        value={values.country}
                        onChange={(e) => setField("country", e.target.value)}
                      />
                    ),
                  })}
                </div>

                {Field({
                  name: "instagram",
                  label: t.fields.instagram,
                  hint: t.fields.instagramHint,
                  children: (
                    <input
                      {...fieldProps("instagram", "amb-instagram-hint")}
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      placeholder={t.fields.instagramPlaceholder}
                      value={values.instagram}
                      onChange={(e) => setField("instagram", e.target.value)}
                    />
                  ),
                })}
              </fieldset>

              <fieldset className="amb-group" disabled={submitting}>
                <legend className="amb-group-title">{t.sections.consent}</legend>

                <div className={errors.consent ? "amb-field--error" : undefined}>
                  <label className="amb-check amb-check--consent" htmlFor="amb-consent">
                    <input
                      id="amb-consent"
                      type="checkbox"
                      name="consent"
                      required
                      checked={values.consent}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? "amb-consent-error" : undefined}
                      onChange={(e) => setField("consent", e.target.checked)}
                    />
                    <span>
                      {t.consent.before}
                      {hasPolicyLink ? (
                        <a href={AMBASSADOR_LINKS.privacyPolicy} target="_blank" rel="noopener">
                          {t.consent.policy}
                        </a>
                      ) : (
                        t.consent.policy
                      )}
                      {t.consent.after}
                    </span>
                  </label>
                  {errors.consent ? (
                    <p className="amb-error" id="amb-consent-error">
                      {errorText("consent")}
                    </p>
                  ) : null}
                </div>
              </fieldset>

              {/* Honeypot — hidden from people, tempting for bots. */}
              <div className="amb-hp" aria-hidden="true">
                <label htmlFor="amb-website">Website</label>
                <input
                  id="amb-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {submitError ? (
                <div className="srp-error" role="alert">
                  {submitError}
                </div>
              ) : null}

              <div className="amb-actions">
                <button
                  type="submit"
                  className="srp-cta amb-submit"
                  id="cta-ambassador-submit"
                  disabled={submitting}
                >
                  <span className="srp-cta__label">{submitting ? t.submitting : t.submit}</span>
                  {!submitting ? (
                    <span className="srp-cta__arrow" aria-hidden="true">→</span>
                  ) : null}
                </button>
                <p className="amb-reassurance">{t.reassurance.join(" · ")}</p>
                <p className="amb-required-note">{t.requiredNote}</p>
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
