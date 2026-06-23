"use client";

import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
import VerbatimLines from "@/signature-recovery-protocol/components/VerbatimLines";
import { SRP_BACKGROUNDS } from "@/signature-recovery-protocol/constants/assets";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function SrpExperienceSection() {
  const { protocole } = useSrpContent();
  const { experience } = protocole;

  return (
    <section className="srp-section srp-section--experience" id="section-experience">
      <SrpParallaxBg src={SRP_BACKGROUNDS.quote} speed={-0.24} opacity={0.12} align="left" />
      <div className="srp-experience-ambient" aria-hidden="true">
        <span className="srp-experience-ambient__warm" />
        <span className="srp-experience-ambient__cool" />
      </div>

      <div className="srp-container">
        <SrpSectionHead
          sectionNum={experience.sectionNum}
          title={experience.title}
          lede={experience.subtitle}
        />

        <div className="srp-experience-stage">
          <div className="srp-experience-visual">
            <SrpSectionMedia
              className="srp-experience-media"
              aspect="portrait"
              tone="beige"
              label="// SRP™ Experience"
              title="Coffret premium · prolongement METCARE®"
            />
          </div>

          <div className="srp-experience-content">
            <div className="srp-experience-manifest">
              {experience.hook.map((line, i) => (
                <p
                  key={line}
                  className={
                    i === 0
                      ? "srp-experience-manifest__hook"
                      : "srp-experience-manifest__line"
                  }
                >
                  {line}
                </p>
              ))}
            </div>

            <VerbatimLines
              lines={experience.narrative}
              className="srp-body srp-experience-body"
            />

            <div className="srp-experience-reuse">
              <VerbatimLines
                lines={experience.reuseIntro}
                className="srp-body srp-experience-reuse-lead"
              />

              <div className="srp-experience-uses" aria-label={experience.reuseAriaLabel}>
                {experience.reuseItems.map((item, i) => (
                  <article
                    key={item}
                    className={`srp-experience-use srp-experience-use--${i + 1}`}
                  >
                    <span className="srp-experience-use-idx">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="srp-experience-use-text">{item}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        {experience.closing.length > 0 ? (
          <div className="srp-experience-signature">
            <span className="srp-experience-signature-orbit" aria-hidden="true" />
            <p className="srp-experience-signature-text">{experience.closing[0]}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
