"use client";

import { useState } from "react";
import SrpPageShell from "@/signature-recovery-protocol/components/SrpPageShell";
import { checkoutContent } from "@/signature-recovery-protocol/content/checkout";
export default function CheckoutClient() {
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStripeError(null);

    try {
      // Stripe Elements — wire before go-live
      setStripeError("Le paiement n'est pas encore configuré. Merci de réessayer ultérieurement.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue. Veuillez réessayer.";
      setStripeError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SrpPageShell variant="checkout" mainClassName="srp-checkout">
      <h1 className="srp-checkout-title">{checkoutContent.headline}</h1>
      <p className="srp-lede">{checkoutContent.subline}</p>

      <div className="srp-trust-strip" aria-label="Garanties">
        {checkoutContent.trustBadges.map((badge) => (
          <span className="srp-trust-badge" key={badge}>
            {badge}
          </span>
        ))}
      </div>

      <div className="srp-checkout-grid">
        <div>
          <section className="srp-form-card">
            <h3>{checkoutContent.expressPaymentLabel}</h3>
            <div className="srp-trust-strip">
              <span className="srp-trust-badge">Apple Pay</span>
              <span className="srp-trust-badge">Google Pay</span>
            </div>
            <p className="srp-body" style={{ marginTop: 12, fontSize: 13 }}>
              {checkoutContent.orCardLabel}
            </p>

            <div className="srp-field" style={{ marginTop: 16 }}>
              <label htmlFor="srp-email">{checkoutContent.emailLabel}</label>
              <input id="srp-email" type="email" autoComplete="email" />
            </div>

            <div className="srp-field-row">
              <div className="srp-field">
                <label htmlFor="srp-fn">{checkoutContent.firstNameLabel}</label>
                <input id="srp-fn" type="text" autoComplete="given-name" />
              </div>
              <div className="srp-field">
                <label htmlFor="srp-ln">{checkoutContent.lastNameLabel}</label>
                <input id="srp-ln" type="text" autoComplete="family-name" />
              </div>
            </div>

            <div className="srp-field">
              <label>{checkoutContent.cardLabel}</label>
              <input type="text" inputMode="numeric" placeholder="•••• •••• •••• ••••" />
            </div>

            <div className="srp-field-row">
              <div className="srp-field">
                <label>{checkoutContent.expiryLabel}</label>
                <input type="text" placeholder="MM / AA" />
              </div>
              <div className="srp-field">
                <label>{checkoutContent.cvcLabel}</label>
                <input type="text" placeholder="•••" />
              </div>
            </div>

            {stripeError ? (
              <div className="srp-error" role="alert">
                {stripeError}
              </div>
            ) : null}
          </section>

          <section className="srp-form-card">
            <h3>{checkoutContent.deliverySectionLabel}</h3>
            <div className="srp-field">
              <label htmlFor="srp-addr">{checkoutContent.addressLabel}</label>
              <input id="srp-addr" type="text" autoComplete="street-address" />
            </div>
            <div className="srp-field-row srp-field-row--three">
              <div className="srp-field">
                <label htmlFor="srp-zip">{checkoutContent.zipLabel}</label>
                <input id="srp-zip" type="text" autoComplete="postal-code" />
              </div>
              <div className="srp-field">
                <label htmlFor="srp-city">{checkoutContent.cityLabel}</label>
                <input id="srp-city" type="text" autoComplete="address-level2" />
              </div>
              <div className="srp-field">
                <label htmlFor="srp-country">{checkoutContent.countryLabel}</label>
                <select id="srp-country" defaultValue="France">
                  <option>France</option>
                </select>
              </div>
            </div>
          </section>

          <p className="srp-body" style={{ fontSize: 13 }}>
            {checkoutContent.securityNote}
          </p>
        </div>

        <aside className="srp-summary" aria-label={checkoutContent.orderSummaryLabel}>
          <h3 style={{ marginTop: 0 }}>{checkoutContent.orderSummaryLabel}</h3>

          <div className="srp-summary-row">
            <div>
              <strong>{checkoutContent.productName}</strong>
              <div style={{ opacity: 0.7, fontSize: 13 }}>{checkoutContent.productMeta}</div>
            </div>
            <span>{checkoutContent.pricePlaceholder}</span>
          </div>

          <div className="srp-summary-row">
            <div>
              <strong>{checkoutContent.deliveryLabel}</strong>
              <div style={{ opacity: 0.7, fontSize: 13 }}>{checkoutContent.deliveryMeta}</div>
            </div>
            <span>{checkoutContent.pricePlaceholder}</span>
          </div>

          <div className="srp-summary-total">
            <span>{checkoutContent.totalLabel}</span>
            <span>{checkoutContent.pricePlaceholder}</span>
          </div>

          <button
            className="srp-cta"
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            style={{ marginTop: 20, border: 0, cursor: "pointer" }}
          >
            {checkoutContent.ctaLabel} →
          </button>

          <p className="srp-placeholder" style={{ marginTop: 16 }}>
            Prix à confirmer avant mise en ligne.
          </p>
        </aside>
      </div>

    </SrpPageShell>
  );
}
