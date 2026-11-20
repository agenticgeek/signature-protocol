"use client";

import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
import { SECTION_FEATURED_IMAGES, SRP_BACKGROUNDS } from "@/signature-recovery-protocol/constants/assets";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function NotAloneSection() {
  const { landing } = useSrpContent();
  const { notAlone } = landing;

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
              photo
              src={SECTION_FEATURED_IMAGES.notAlone}
              alt="METCARE®"
            />
          </div>

          <div className="srp-not-alone-content">
            <p className="srp-not-alone-lead">{notAlone.listIntro}</p>

            <div className="srp-not-alone-moments" aria-label={notAlone.listIntro}>
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

        <div className="srp-not-alone-signature srp-signature--solo srp-signature--solo-full">
          <div className="srp-not-alone-signature-em-wrap">
            <span className="srp-not-alone-signature-orbit" aria-hidden="true" />
            <p className="srp-not-alone-signature-em">{notAlone.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
