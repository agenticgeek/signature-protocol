import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
import VerbatimLines from "@/signature-recovery-protocol/components/VerbatimLines";
import { protocoleContent } from "@/signature-recovery-protocol/content/protocole";

const { experience } = protocoleContent;

function splitBlocks(lines: readonly string[]) {
  const blocks: string[][] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (line === "") {
      if (current.length) {
        blocks.push(current);
        current = [];
      }
      continue;
    }
    current.push(line);
  }

  if (current.length) blocks.push(current);
  return blocks;
}

const blocks = splitBlocks(experience.lines);
const [hookLines = [], narrativeLines = [], reuseBlock = [], closingLines = []] =
  blocks;

const reuseColonIdx = reuseBlock.findIndex((line) => line.includes("réutilisée :"));
const reuseIntro =
  reuseColonIdx >= 0 ? reuseBlock.slice(0, reuseColonIdx + 1) : reuseBlock;
const reuseItems =
  reuseColonIdx >= 0 ? reuseBlock.slice(reuseColonIdx + 1) : [];

export default function SrpExperienceSection() {
  return (
    <section className="srp-section srp-section--experience" id="section-experience">
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
              label="// Visuel — experience box"
              title="SRP™ Experience · coffret premium réutilisable"
            />
          </div>

          <div className="srp-experience-content">
            <div className="srp-experience-manifest">
              {hookLines.map((line, i) => (
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
              lines={narrativeLines}
              className="srp-body srp-experience-body"
            />

            {reuseItems.length > 0 ? (
              <div className="srp-experience-reuse">
                <VerbatimLines
                  lines={reuseIntro}
                  className="srp-body srp-experience-reuse-lead"
                />

                <div className="srp-experience-uses" aria-label="Réutilisations de la box">
                  {reuseItems.map((item, i) => (
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
            ) : null}
          </div>
        </div>

        {closingLines.length > 0 ? (
          <div className="srp-experience-signature">
            <span className="srp-experience-signature-orbit" aria-hidden="true" />
            <p className="srp-experience-signature-text">{closingLines[0]}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
