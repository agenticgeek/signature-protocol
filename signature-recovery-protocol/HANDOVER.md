# Signature Recovery Protocol™ — Handover

## Open Items

- [ ] Product photography — all 10 products — **BLOCKER**
- [ ] SRP™ full protocol price — **BLOCKER**
- [ ] Upsell prices (3 items) — **BLOCKER**
- [ ] E-book SRP™ file — **BLOCKER**
- [ ] Conseils d'utilisation copy — client to supply
- [ ] Routine SRP™ copy — client to supply
- [ ] Expert accompaniment detail copy — client to supply
- [ ] Expert access link/method — client to confirm
- [ ] Individual product page scope — client to confirm
- [ ] VAT configuration in Stripe — confirm before go-live
- [ ] GHL integration — confirm if required
- [ ] Email confirmation method — confirm before go-live
- [ ] Currency confirmation (EUR assumed)
- [ ] METCARE® logo files (SVG + all variants)

## Routes

| Page | URL |
|------|-----|
| Landing | `/` |
| Protocole Complet | `/protocole-complet` |
| Checkout | `/checkout` |
| Upsell | `/upsell?session_id=…` |
| Thank You | `/merci?session_id=…` |

## QA Checklist

- [ ] All French copy matches source verbatim — no edits, no collapsed line breaks
- [ ] Footer disclaimer present on all 5 pages, unmodified
- [ ] All CTAs route correctly through the full funnel
- [ ] Hero CTA visible above fold at 375px
- [ ] All pages QA'd at 375px mobile and 1440px desktop
- [ ] Page load < 3s on 4G mobile (Lighthouse)
- [ ] Stripe test payment completes → redirects to upsell with session ID
- [ ] Stripe failure shows inline error, no redirect
- [ ] Apple Pay + Google Pay render on supported test devices
- [ ] Upsell accept → separate Stripe PaymentIntent fires correctly
- [ ] Upsell decline → routes to Thank You without charge
- [ ] Thank You page does not re-render on back-navigation
- [ ] All placeholder blocks clearly marked in UI and in this document
- [ ] `/content` files contain all copy as exported constants — no strings hardcoded in JSX

## Stripe Integration Notes

- Checkout uses Stripe Elements placeholder UI (not Checkout redirect)
- Apple Pay + Google Pay via `stripe.paymentRequest()` — not yet wired
- On success → `/upsell?session_id={CHECKOUT_SESSION_ID}`
- On failure → inline error, no redirect
- Each upsell accept → separate PaymentIntent (not yet wired)

## Structure

```
signature-recovery-protocol/
  constants/     footer-disclaimer.ts, routes.ts
  content/       landing.ts, protocole.ts, checkout.ts, upsell.ts, merci.ts
  components/    sections, checkout, upsell, merci, shared UI
  HANDOVER.md

app/
  page.tsx
  protocole-complet/page.tsx
  checkout/page.tsx
  upsell/page.tsx
  merci/page.tsx
```
