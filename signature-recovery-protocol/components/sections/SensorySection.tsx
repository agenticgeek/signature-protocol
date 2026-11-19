"use client";

import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpProductShowcase from "@/signature-recovery-protocol/components/SrpProductShowcase";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import { SECTION_FEATURED_IMAGES, SRP_BACKGROUNDS } from "@/signature-recovery-protocol/constants/assets";
import { SRP_PRODUCT_DIMENSIONS } from "@/signature-recovery-protocol/constants/product-dimensions";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function SensorySection() {
  const { landing } = useSrpContent();
  const { sensory } = landing;
  const patch = SRP_PRODUCT_DIMENSIONS.fillerPatch;

  return (
    <section className="srp-section srp-section--sensory" id="section-sensory">
      <SrpParallaxBg src={SRP_BACKGROUNDS.cream} speed={0.48} opacity={0.2} align="right" />
      <div className="srp-sensory-ambient" aria-hidden="true">
        <span className="srp-sensory-ambient__sheen" />
        <span className="srp-sensory-ambient__mist" />
      </div>

      <div className="srp-container">
        <SrpSectionHead
          sectionNum={sensory.sectionNum}
          title={sensory.title}
          lede={sensory.intro}
        />

        <div className="srp-sensory-stage">
          <div className="srp-sensory-content">
            <div className="srp-sensory-senses" aria-label={sensory.title}>
              {sensory.features.map((txt, i) => (
                <article
                  key={txt}
                  className={`srp-sensory-sense srp-sensory-sense--${i + 1}`}
                >
                  <span className="srp-sensory-sense-ghost" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="srp-sensory-sense-idx">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="srp-sensory-sense-text">{txt}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="srp-sensory-visual">
            <SrpProductShowcase
              className="srp-sensory-patch"
              src={SECTION_FEATURED_IMAGES.sensory}
              width={patch.width}
              height={patch.height}
              alt="METCARE®"
              sizes="(max-width: 900px) 100vw, (max-width: 1240px) 46vw, 560px"
            />
          </div>
        </div>

        <div className="srp-sensory-signature srp-signature--solo">
          <div className="srp-sensory-signature-em-wrap">
            <span className="srp-sensory-signature-orbit" aria-hidden="true" />
            <div className="srp-sensory-signature-em">
              <p>{sensory.closing}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
