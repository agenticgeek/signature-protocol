"use client";

import { Fragment } from "react";
import CTAButton from "@/signature-recovery-protocol/components/CTAButton";
import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import { SRP_BACKGROUNDS } from "@/signature-recovery-protocol/constants/assets";
import { useAmbassadorForm } from "@/signature-recovery-protocol/components/ambassador/AmbassadorFormProvider";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

/**
 * Section 8 — closing CTA (CTA 2).
 * Assembled from components already on the page: section head, lead paragraph,
 * hero title style, hero ticker style (static) and the hero button.
 */
export default function JoinSection() {
  const { landing } = useSrpContent();
  const { open: openAmbassadorForm } = useAmbassadorForm();
  const { join } = landing;

  return (
    <section className="srp-section srp-section--join" id="section-join">
      <SrpParallaxBg src={SRP_BACKGROUNDS.cream} speed={0.34} opacity={0.14} align="right" />

      <div className="srp-container">
        <SrpSectionHead sectionNum={join.sectionNum} title={join.title} />

        <div className="srp-join-copy">
          {join.paragraphs.map((line) => (
            <p className="srp-lede" key={line}>
              {line}
            </p>
          ))}
        </div>

        <p className="srp-join-title">{join.bigTitle}</p>

        <div className="srp-hero-rail srp-hero-rail--static">
          <div className="srp-hero-rail-inner">
            {join.strapline.map((item, i) => (
              <Fragment key={item}>
                <span>{item}</span>
                {i < join.strapline.length - 1 ? <span className="sep">·</span> : null}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="srp-join-actions">
          <CTAButton
            className="srp-hero-cta"
            id="cta-join-closing"
            onClick={() => openAmbassadorForm("join")}
            label={join.ctaLabel}
          />
        </div>
      </div>
    </section>
  );
}
