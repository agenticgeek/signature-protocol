"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CTAButton from "@/signature-recovery-protocol/components/CTAButton";
import SrpPageShell from "@/signature-recovery-protocol/components/SrpPageShell";
import VerbatimLines from "@/signature-recovery-protocol/components/VerbatimLines";
import { upsellContent } from "@/signature-recovery-protocol/content/upsell";
import { SRP_ROUTES } from "@/signature-recovery-protocol/constants/routes";

function UpsellContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!sessionId) {
    return (
      <SrpPageShell variant="upsell" mainClassName="srp-checkout">
        <p className="srp-lede">{upsellContent.sessionMissing}</p>
        <div style={{ marginTop: 24, maxWidth: 320 }}>
          <CTAButton href={SRP_ROUTES.landing} label="Retour à l'accueil" ghost />
        </div>
      </SrpPageShell>
    );
  }

  const current = upsellContent.items[activeIndex];
  const isLast = activeIndex >= upsellContent.items.length - 1;

  const handleAccept = async () => {
    setLoading(true);
    try {
      if (isLast) {
        router.push(SRP_ROUTES.merci(sessionId));
      } else {
        setActiveIndex((i) => i + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = () => {
    if (isLast) {
      router.push(SRP_ROUTES.merci(sessionId));
    } else {
      setActiveIndex((i) => i + 1);
    }
  };

  const handleSkipAll = () => {
    router.push(SRP_ROUTES.merci(sessionId));
  };

  return (
    <SrpPageShell variant="upsell" mainClassName="srp-checkout">
      <h1 className="srp-checkout-title">{upsellContent.headline}</h1>
      <VerbatimLines lines={upsellContent.intro} className="srp-lede" />

      <article className="srp-upsell-card">
        <h2>{current.headline}</h2>
        <p className="srp-placeholder">{current.pricePlaceholder}</p>

        <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
          <button
            className="srp-cta"
            type="button"
            disabled={loading}
            onClick={handleAccept}
            style={{ border: 0, cursor: "pointer" }}
          >
            {current.acceptCta} →
          </button>
          <button
            className="srp-cta srp-cta--ghost"
            type="button"
            onClick={handleDecline}
            style={{ cursor: "pointer" }}
          >
            {current.declineCta}
          </button>
        </div>

        <p className="srp-body" style={{ marginTop: 16, fontSize: 12, opacity: 0.6 }}>
          {activeIndex + 1} / {upsellContent.items.length}
        </p>
      </article>

      <button
        className="srp-cta srp-cta--ghost"
        type="button"
        onClick={handleSkipAll}
        style={{ marginTop: 28, maxWidth: 420, cursor: "pointer" }}
      >
        {upsellContent.skipAll}
      </button>
    </SrpPageShell>
  );
}

export default function UpsellClient() {
  return (
    <Suspense fallback={<div className="srp-checkout" />}>
      <UpsellContent />
    </Suspense>
  );
}
