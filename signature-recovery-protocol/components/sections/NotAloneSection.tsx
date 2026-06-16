"use client";

import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
import { SRP_ASSETS, SRP_BACKGROUNDS } from "@/signature-recovery-protocol/constants/assets";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function NotAloneSection() {
  const { landing } = useSrpContent();
  const { notAlone } = landing;
  const closingBody = notAlone.paragraphs.slice(0, 2);
  const closingEmphasis = notAlone.paragraphs[2];

  return (
    <section className="srp-section srp-section--not-alone" id="section-not-alone">
      <SrpParallaxBg src={SRP_BACKGROUNDS.cream} speed={0.38} opacity={0.18} align="left" />
      <div className="srp-not-alone-glow" aria-hidden="true" />

      <div className="srp-container">
        <SrpSectionHead
          sectionNum={notAlone.sectionNum}
          title={notAlone.title}
          lede={notAlone.intro}
        />

        <div className="srp-not-alone-stage">
          <div className="srp-not-alone-visual">
            <SrpSectionMedia
              aspect="portrait"
              tone="beige"
              variant="product"
              src={SRP_ASSETS.preparationMentale}
              alt="Préparation mentale et émotionnelle — METCARE®"
              label="// Préparation mentale & émotionnelle"
              title="Accompagnement avant l'intervention"
            />
          </div>

          <div className="srp-not-alone-content">
            <p className="srp-not-alone-lead">{notAlone.listIntro}</p>

            <div className="srp-not-alone-moments" aria-label="Ce que représente une intervention">
              {notAlone.listItems.map((item, i) => (
                <article
                  key={item}
                  className={`srp-not-alone-moment srp-not-alone-moment--${i + 1}`}
                >
                  <span className="srp-not-alone-moment-ghost" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="srp-not-alone-moment-idx">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="srp-not-alone-moment-text">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="srp-not-alone-signature">
          <div className="srp-not-alone-signature-copy">
            {closingBody.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="srp-not-alone-signature-em-wrap">
            <span className="srp-not-alone-signature-orbit" aria-hidden="true" />
            <p className="srp-not-alone-signature-em">{closingEmphasis}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
