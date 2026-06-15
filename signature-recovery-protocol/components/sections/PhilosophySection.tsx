"use client";

import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function PhilosophySection() {
  const { landing } = useSrpContent();
  const { philosophy } = landing;
  return (
    <section className="srp-section srp-section--philosophy" id="section-philosophy">
      <div className="srp-philosophy-glow" aria-hidden="true" />

      <div className="srp-container">
        <SrpSectionHead
          sectionNum={philosophy.sectionNum}
          title={philosophy.title}
          lede={philosophy.intro}
        />

        <div className="srp-philosophy-stage">
          <div className="srp-philosophy-content">
            <p className="srp-philosophy-lead">{philosophy.listIntro}</p>

            <div
              className="srp-philosophy-factors"
              aria-label="Piliers de la philosophie"
            >
              {philosophy.listItems.map((item, i) => (
                <article
                  key={item}
                  className={`srp-philosophy-factor srp-philosophy-factor--${i + 1}`}
                >
                  <span className="srp-philosophy-factor-ghost" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="srp-philosophy-factor-idx">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="srp-philosophy-factor-text">{item}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="srp-philosophy-visual">
            <SrpSectionMedia
              aspect="portrait"
              tone="light"
              label="// Visuel — philosophie"
              title="Clinique sensorielle · patch & soin"
            />
          </div>
        </div>

        <div className="srp-philosophy-signature">
          <div className="srp-philosophy-signature-copy">
            {philosophy.paragraphs.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="srp-philosophy-signature-em-wrap">
            <span className="srp-philosophy-signature-orbit" aria-hidden="true" />
            <div className="srp-philosophy-signature-em">
              {philosophy.closing.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
