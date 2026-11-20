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
        <SrpSectionHead sectionNum={actives.sectionNum} title={actives.title || undefined} />

        <div className="srp-actives-products">
          {actives.products.map((product) => (
            <article className="srp-actives-product" key={product.name}>
              <h3 className="srp-actives-product__name">{product.name}</h3>
              <p className="srp-actives-product__tagline">{product.tagline}</p>
              <p className="srp-actives-product__text">{product.description}</p>
            </article>
          ))}
        </div>

        <div className="srp-section-stage srp-actives-stage section-editorial section-editorial--reverse">
          <SrpSectionMedia
            aspect="portrait"
            tone="dark"
            variant="product"
            photo
            position="50% 16%"
            src={SECTION_FEATURED_IMAGES.actives}
            alt="METCARE®"
          />

          <div className="section-editorial__content">
            <p className="srp-body" style={{ marginBottom: 20 }}>
              {actives.listIntro}
            </p>

            <div className="srp-pill-grid" aria-label={actives.benefitsAriaLabel}>
              {actives.benefits.map((benefit, i) => (
                <article className="srp-pill" key={benefit}>
                  <span className="srp-pill-idx">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="srp-pill-name">{benefit}</h4>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
