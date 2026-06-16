"use client";

import CTAButton from "@/signature-recovery-protocol/components/CTAButton";
import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
import VerbatimLines from "@/signature-recovery-protocol/components/VerbatimLines";
import { SRP_ASSETS, SRP_BACKGROUNDS } from "@/signature-recovery-protocol/constants/assets";
import { SRP_ROUTES } from "@/signature-recovery-protocol/constants/routes";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function ExpertSection() {
  const { protocole } = useSrpContent();
  const { expert } = protocole;

  const expertBody = expert.lines.slice(0, 3);
  const expertClosing = expert.lines[3];
  return (
    <section className="srp-section srp-section--expert" id="section-expert">
      <SrpParallaxBg src={SRP_BACKGROUNDS.gel} speed={0.4} opacity={0.15} align="right" />
      <div className="srp-expert-ambient" aria-hidden="true">
        <span className="srp-expert-ambient__glow" />
      </div>

      <div className="srp-container">
        <SrpSectionHead sectionNum={expert.sectionNum} title={expert.title} />

        <div className="srp-expert-stage">
          <div className="srp-expert-visual">
            <SrpSectionMedia
              aspect="portrait"
              tone="beige"
              variant="product"
              src={SRP_ASSETS.preparationMentale}
              alt="Accompagnement expert METCARE®"
              label="// Accompagnement expert"
              title="Préparation mentale & émotionnelle"
            />
          </div>

          <div className="srp-expert-content">
            <div className="srp-expert-narrative">
              <VerbatimLines lines={expertBody} className="srp-body srp-expert-body" />
            </div>

            <div className="srp-expert-footer">
              <div className="srp-expert-emphasis">
                <span className="srp-expert-emphasis-orbit" aria-hidden="true" />
                <p className="srp-expert-emphasis-text">{expertClosing}</p>
              </div>
              <CTAButton
                className="srp-expert-cta"
                href={SRP_ROUTES.checkout}
                label={expert.ctaLabel}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
