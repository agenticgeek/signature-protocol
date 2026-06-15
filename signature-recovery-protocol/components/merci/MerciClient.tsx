"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SrpPageShell from "@/signature-recovery-protocol/components/SrpPageShell";
import { SRP_ROUTES } from "@/signature-recovery-protocol/constants/routes";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

const STORAGE_KEY = "srp_merci_seen";

function MerciContent() {
  const { merci, ui } = useSrpContent();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    try {
      const seenKey = `${STORAGE_KEY}:${sessionId}`;
      sessionStorage.setItem(seenKey, "1");
      history.pushState(null, "", window.location.href);
      const onPopState = () => {
        history.pushState(null, "", window.location.href);
      };
      window.addEventListener("popstate", onPopState);
      return () => window.removeEventListener("popstate", onPopState);
    } catch {
      /* no-op */
    }
  }, [sessionId]);

  if (!sessionId) {
    return (
      <SrpPageShell variant="thankyou" mainClassName="srp-checkout">
        <p className="srp-lede">{merci.sessionMissing}</p>
        <Link className="srp-cta srp-cta--ghost" href={SRP_ROUTES.landing}>
          {ui.nav.backHomeShort}
        </Link>
      </SrpPageShell>
    );
  }

  return (
    <SrpPageShell variant="thankyou" mainClassName="srp-checkout">
      <h1 className="srp-checkout-title">{merci.headline}</h1>
      <p className="srp-lede">{merci.subline}</p>
      <p className="srp-lede">{merci.emailNote}</p>
      <p className="srp-lede">{merci.intro}</p>

      <h2 className="srp-section-title" style={{ fontSize: "1.25rem", marginTop: 32 }}>
        {merci.orderSummaryLabel}
      </h2>

      <p className="srp-placeholder">{merci.orderPlaceholder}</p>

      <div className="srp-ty-grid">
        {merci.blocks.map((block) => (
          <article className="srp-ty-card" key={block.id}>
            <h3>{block.title}</h3>
            <p className="srp-placeholder">{block.placeholder}</p>
          </article>
        ))}
      </div>

      <div className="srp-quote" style={{ marginTop: 40 }}>
        {merci.closing.map((line) => (
          <p key={line} className="srp-body" style={{ margin: 0 }}>
            {line}
          </p>
        ))}
      </div>
    </SrpPageShell>
  );
}

export default function MerciClient() {
  return (
    <Suspense fallback={<div className="srp-checkout" />}>
      <MerciContent />
    </Suspense>
  );
}
