import CTAButton from "@/signature-recovery-protocol/components/CTAButton";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import VerbatimLines from "@/signature-recovery-protocol/components/VerbatimLines";
import { protocoleContent } from "@/signature-recovery-protocol/content/protocole";
import { SRP_ROUTES } from "@/signature-recovery-protocol/constants/routes";

const { expert } = protocoleContent;

const expertBody = expert.lines.slice(0, 3);
const expertClosing = expert.lines[3];

export default function ExpertSection() {
  return (
    <section className="srp-section srp-section--expert" id="section-expert">
      <div className="srp-expert-ambient" aria-hidden="true">
        <span className="srp-expert-ambient__glow" />
      </div>

      <div className="srp-container">
        <SrpSectionHead sectionNum={expert.sectionNum} title={expert.title} />

        <div className="srp-expert-stage">
          <div className="srp-expert-narrative">
            <VerbatimLines lines={expertBody} className="srp-body srp-expert-body" />
          </div>

          <div className="srp-expert-footer">
            <div className="srp-expert-emphasis">
              <span className="srp-expert-emphasis-orbit" aria-hidden="true" />
              <p className="srp-expert-emphasis-text">{expertClosing}</p>
            </div>
            <CTAButton
              className="srp-expert-cta"
              href={SRP_ROUTES.checkout}
              label={expert.ctaLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
