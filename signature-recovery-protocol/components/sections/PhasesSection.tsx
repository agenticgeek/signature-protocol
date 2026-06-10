import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
import { landingContent } from "@/signature-recovery-protocol/content/landing";

const { phases } = landingContent;

const signatureBody = phases.paragraphs.slice(0, 2);
const signatureEmphasis = phases.paragraphs.slice(2);

export default function PhasesSection() {
  return (
    <section className="srp-section srp-section--phases" id="section-phases">
      <div className="srp-phases-glow" aria-hidden="true" />

      <div className="srp-container">
        <SrpSectionHead sectionNum={phases.sectionNum} title={phases.title} />

        <SrpSectionMedia
          className="srp-phases-banner"
          aspect="wide"
          tone="beige"
          label="// Visuel — parcours"
          title="Les quatre phases · rituel Recovery"
        />

        <div className="srp-phases-stage" aria-label="Phases du protocole">
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

        <div className="srp-phases-signature">
          <div className="srp-phases-signature-copy">
            {signatureBody.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="srp-phases-signature-em-wrap">
            <span className="srp-phases-signature-orbit" aria-hidden="true" />
            <div className="srp-phases-signature-em">
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
