"use client";

import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpProductShowcase from "@/signature-recovery-protocol/components/SrpProductShowcase";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
import { SECTION_FEATURED_IMAGES, SRP_BACKGROUNDS } from "@/signature-recovery-protocol/constants/assets";
import { SRP_PRODUCT_DIMENSIONS } from "@/signature-recovery-protocol/constants/product-dimensions";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function IndividualProductsSection() {
  const { protocole } = useSrpContent();
  const { individual } = protocole;
  const patch = SRP_PRODUCT_DIMENSIONS.activeDrain;

  return (
    <section className="srp-section srp-section--individual" id="section-individual">
      <SrpParallaxBg src={SRP_BACKGROUNDS.cream} speed={-0.3} opacity={0.16} align="right" />
      <div className="srp-individual-ambient" aria-hidden="true" />

      <div className="srp-container">
        <SrpSectionHead sectionNum={individual.sectionNum} title={individual.title} />

        <div className="srp-individual-gallery">
          <SrpProductShowcase
            className="srp-individual-gallery__hero"
            fluid
            src={SECTION_FEATURED_IMAGES.individual.primary}
            width={patch.width}
            height={patch.height}
            alt="ACTIVE DRAIN™ — disponible à l'unité"
            label="// À l'unité"
            title="Patch recovery · usage quotidien"
            sizes="(max-width: 768px) 100vw, (max-width: 1240px) 52vw, 580px"
          />
          <div className="srp-individual-gallery__duo">
            <SrpSectionMedia
              aspect="square"
              tone="beige"
              variant="product"
              src={SECTION_FEATURED_IMAGES.individual.day}
              alt="DRAINAGE ACTIVATION GEL™ — Day"
              label="// Day"
              title="Gel activation · rituel jour"
            />
            <SrpSectionMedia
              aspect="square"
              tone="dark"
              variant="product"
              src={SECTION_FEATURED_IMAGES.individual.night}
              alt="TISSUE REPAIR CREAM™ — Night"
              label="// Night"
              title="Crème réparation · rituel nuit"
            />
          </div>
        </div>

        <div className="srp-individual-stage" aria-label="Produits à l'unité">
          {individual.lines.map((line, i) => (
            <article
              key={line}
              className={`srp-individual-pillar srp-individual-pillar--${i + 1}`}
            >
              <span className="srp-individual-pillar-idx">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="srp-individual-pillar-text">{line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
