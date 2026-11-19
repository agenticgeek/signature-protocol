"use client";

import CTAButton from "@/signature-recovery-protocol/components/CTAButton";
import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import { SRP_BACKGROUNDS } from "@/signature-recovery-protocol/constants/assets";
import { AMBASSADOR_LINKS } from "@/signature-recovery-protocol/constants/routes";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

/**
 * Section 9 — training CTA (CTA 3).
 * Assembled from components already on the page: section head, the bold closing
 * line with the grey left border (as under the Section 6 cards), lead paragraph
 * and the hero button.
 */
export default function FurtherSection() {
  const { landing } = useSrpContent();
  const { further } = landing;

  return (
    <section className="srp-section srp-section--further" id="section-further">
      <SrpParallaxBg src={SRP_BACKGROUNDS.gel} speed={-0.3} opacity={0.12} align="left" />

      <div className="srp-container">
        <SrpSectionHead sectionNum={further.sectionNum} title={further.title} />

        <p className="srp-daynight-closing srp-further-highlight">{further.highlight}</p>

        <p className="srp-lede srp-further-lede">{further.paragraph}</p>

        <div className="srp-join-actions">
          <CTAButton
            className="srp-hero-cta"
            id="cta-training"
            href={AMBASSADOR_LINKS.training}
            label={further.ctaLabel}
          />
        </div>
      </div>
    </section>
  );
}
