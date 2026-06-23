"use client";

import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
import { SECTION_FEATURED_IMAGES, SRP_BACKGROUNDS } from "@/signature-recovery-protocol/constants/assets";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function ActivesSection() {
  const { landing } = useSrpContent();
  const { actives } = landing;
  return (
    <section className="srp-section" id="section-actives">
      <SrpParallaxBg src={SRP_BACKGROUNDS.cream} speed={0.36} opacity={0.15} align="right" />
      <div className="srp-container">
        <SrpSectionHead
          sectionNum={actives.sectionNum}
          title={actives.title || undefined}
          lede={actives.intro}
        />

        <div className="srp-section-stage srp-actives-stage section-editorial section-editorial--reverse">
          <SrpSectionMedia
            aspect="square"
            tone="dark"
            variant="product"
            src={SECTION_FEATURED_IMAGES.actives}
            alt="ACTIVE DRAIN™ — Metabolic Detox"
            label="// ACTIVE DRAIN™"
            title="Éliminer · Détoxifier · Relancer"
          />

          <div className="section-editorial__content">
            <p className="srp-body" style={{ marginBottom: 20 }}>
              {actives.listIntro}
            </p>

            <div className="srp-pill-grid" aria-label="Actifs sélectionnés">
              {actives.ingredients.map((name, i) => (
                <article className="srp-pill" key={name}>
                  <span className="srp-pill-idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="srp-pill-name">{name}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
