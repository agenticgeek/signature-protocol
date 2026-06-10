import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
import { landingContent } from "@/signature-recovery-protocol/content/landing";

const { sensory } = landingContent;

const signatureBody = sensory.closing.slice(0, 1);
const signatureEmphasis = sensory.closing.slice(1);

export default function SensorySection() {
  return (
    <section className="srp-section srp-section--sensory" id="section-sensory">
      <div className="srp-sensory-ambient" aria-hidden="true">
        <span className="srp-sensory-ambient__sheen" />
        <span className="srp-sensory-ambient__mist" />
      </div>

      <div className="srp-container">
        <SrpSectionHead sectionNum={sensory.sectionNum} title={sensory.title} />

        <div className="srp-sensory-stage">
          <div className="srp-sensory-content">
            <div className="srp-sensory-senses" aria-label="Expérience sensorielle">
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
            <SrpSectionMedia
              aspect="landscape"
              tone="beige"
              label="// Visuel — sensoriel"
              title="Textures, patchs & matière"
            />
          </div>
        </div>

        <div className="srp-sensory-signature">
          <div className="srp-sensory-signature-copy">
            {signatureBody.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="srp-sensory-signature-em-wrap">
            <span className="srp-sensory-signature-orbit" aria-hidden="true" />
            <div className="srp-sensory-signature-em">
              {signatureEmphasis.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
