"use client";

import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpProductShowcase from "@/signature-recovery-protocol/components/SrpProductShowcase";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import { SECTION_FEATURED_IMAGES, SRP_BACKGROUNDS } from "@/signature-recovery-protocol/constants/assets";
import { SRP_PRODUCT_DIMENSIONS } from "@/signature-recovery-protocol/constants/product-dimensions";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function PhasesSection() {
  const { landing } = useSrpContent();
  const { phases } = landing;
  const kit = SRP_PRODUCT_DIMENSIONS.activeDrain;

  return (
    <section className="srp-section srp-section--phases" id="section-phases">
      <SrpParallaxBg src={SRP_BACKGROUNDS.gel} speed={-0.32} opacity={0.16} align="center" />
      <div className="srp-phases-glow" aria-hidden="true" />

      <div className="srp-container">
        <SrpSectionHead sectionNum={phases.sectionNum} title={phases.title} />

        <div className="srp-phases-layout">
          <div className="srp-phases-kit">
            <SrpProductShowcase
              className="srp-phases-kit__showcase"
              src={SECTION_FEATURED_IMAGES.phases}
              width={kit.width}
              height={kit.height}
              alt="METCARE®"
              sizes="(max-width: 900px) 100vw, (max-width: 1240px) 44vw, 560px"
            />
          </div>

          <div className="srp-phases-stage" aria-label={phases.title}>
            {phases.items.map((item, i) => (
              <article
                key={item}
                className={`srp-phases-step srp-phases-step--${i + 1}`}
              >
                <span className="srp-phases-step-ghost" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="srp-phases-step-idx">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="srp-phases-step-text">{item}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="srp-phases-signature srp-signature--solo">
          <div className="srp-phases-signature-em-wrap">
            <span className="srp-phases-signature-orbit" aria-hidden="true" />
            <div className="srp-phases-signature-em">
              <p>{phases.closing}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
