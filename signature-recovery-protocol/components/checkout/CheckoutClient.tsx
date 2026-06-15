"use client";

import { useState } from "react";
import SrpPageShell from "@/signature-recovery-protocol/components/SrpPageShell";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function CheckoutClient() {
  const { checkout } = useSrpContent();
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStripeError(null);

    try {
      // Stripe Elements — wire before go-live
      setStripeError(checkout.paymentNotConfigured);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : checkout.genericError;
      setStripeError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SrpPageShell variant="checkout" mainClassName="srp-checkout">
      <h1 className="srp-checkout-title">{checkout.headline}</h1>
      <p className="srp-lede">{checkout.subline}</p>

      <div className="srp-trust-strip" aria-label={checkout.guaranteesAriaLabel}>
        {checkout.trustBadges.map((badge) => (
          <span className="srp-trust-badge" key={badge}>
            {badge}
          </span>
        ))}
      </div>

      <div className="srp-checkout-grid">
        <div>
          <section className="srp-form-card">
            <h3>{checkout.expressPaymentLabel}</h3>
            <div className="srp-trust-strip">
              <span className="srp-trust-badge">Apple Pay</span>
              <span className="srp-trust-badge">Google Pay</span>
            </div>
            <p className="srp-body" style={{ marginTop: 12, fontSize: 13 }}>
              {checkout.orCardLabel}
            </p>

            <div className="srp-field" style={{ marginTop: 16 }}>
              <label htmlFor="srp-email">{checkout.emailLabel}</label>
              <input id="srp-email" type="email" autoComplete="email" />
            </div>

            <div className="srp-field-row">
              <div className="srp-field">
                <label htmlFor="srp-fn">{checkout.firstNameLabel}</label>
                <input id="srp-fn" type="text" autoComplete="given-name" />
              </div>
              <div className="srp-field">
                <label htmlFor="srp-ln">{checkout.lastNameLabel}</label>
                <input id="srp-ln" type="text" autoComplete="family-name" />
              </div>
            </div>

            <div className="srp-field">
              <label>{checkout.cardLabel}</label>
              <input type="text" inputMode="numeric" placeholder="•••• •••• •••• ••••" />
            </div>

            <div className="srp-field-row">
              <div className="srp-field">
                <label>{checkout.expiryLabel}</label>
                <input type="text" placeholder="MM / AA" />
              </div>
              <div className="srp-field">
                <label>{checkout.cvcLabel}</label>
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
            <h3>{checkout.deliverySectionLabel}</h3>
            <div className="srp-field">
              <label htmlFor="srp-addr">{checkout.addressLabel}</label>
              <input id="srp-addr" type="text" autoComplete="street-address" />
            </div>
            <div className="srp-field-row srp-field-row--three">
              <div className="srp-field">
                <label htmlFor="srp-zip">{checkout.zipLabel}</label>
                <input id="srp-zip" type="text" autoComplete="postal-code" />
              </div>
              <div className="srp-field">
                <label htmlFor="srp-city">{checkout.cityLabel}</label>
                <input id="srp-city" type="text" autoComplete="address-level2" />
              </div>
              <div className="srp-field">
                <label htmlFor="srp-country">{checkout.countryLabel}</label>
                <select id="srp-country" defaultValue="France">
                  <option>France</option>
                </select>
              </div>
            </div>
          </section>

          <p className="srp-body" style={{ fontSize: 13 }}>
            {checkout.securityNote}
          </p>
        </div>

        <aside className="srp-summary" aria-label={checkout.orderSummaryLabel}>
          <h3 style={{ marginTop: 0 }}>{checkout.orderSummaryLabel}</h3>

          <div className="srp-summary-row">
            <div>
              <strong>{checkout.productName}</strong>
              <div style={{ opacity: 0.7, fontSize: 13 }}>{checkout.productMeta}</div>
            </div>
            <span>{checkout.pricePlaceholder}</span>
          </div>

          <div className="srp-summary-row">
            <div>
              <strong>{checkout.deliveryLabel}</strong>
              <div style={{ opacity: 0.7, fontSize: 13 }}>{checkout.deliveryMeta}</div>
            </div>
            <span>{checkout.pricePlaceholder}</span>
          </div>

          <div className="srp-summary-total">
            <span>{checkout.totalLabel}</span>
            <span>{checkout.pricePlaceholder}</span>
          </div>

          <button
            className="srp-cta"
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            style={{ marginTop: 20, border: 0, cursor: "pointer" }}
          >
            {checkout.ctaLabel} →
          </button>

          <p className="srp-placeholder" style={{ marginTop: 16 }}>
            {checkout.priceConfirmPlaceholder}
          </p>
        </aside>
      </div>

    </SrpPageShell>
  );
}
