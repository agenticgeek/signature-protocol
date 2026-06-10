import DayNightPanel from "@/signature-recovery-protocol/components/DayNightPanel";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
import VerbatimLines from "@/signature-recovery-protocol/components/VerbatimLines";
import { landingContent } from "@/signature-recovery-protocol/content/landing";

const { dayNight } = landingContent;

export default function DayNightSection() {
  return (
    <section className="srp-section srp-section--day-night" id="section-day-night">
      <div className="srp-daynight-ambient" aria-hidden="true">
        <span className="srp-daynight-ambient__sun" />
        <span className="srp-daynight-ambient__moon" />
      </div>

      <div className="srp-container">
        <SrpSectionHead
          sectionNum={dayNight.sectionNum}
          title={dayNight.title}
          lede={dayNight.subtitle}
        />

        <div className="srp-daynight-stage">
          <DayNightPanel variant="day">
            <div className="srp-daynight-panel__visual">
              <SrpSectionMedia
                aspect="square"
                tone="light"
                label="// Visuel — Day"
                title="DAY RECOVERY PATCH™ · packshot"
              />
            </div>
            <div className="srp-daynight-panel__body">
              <span className="srp-daynight-panel__tag">Day</span>
              <h3>{dayNight.day.name}</h3>
              <VerbatimLines lines={dayNight.day.lines} className="srp-body" />
            </div>
          </DayNightPanel>

          <div className="srp-daynight-axis" aria-hidden="true">
            <span className="srp-daynight-axis__line" />
            <span className="srp-daynight-axis__dial">
              <span className="srp-daynight-axis__dial-ring" />
              <span className="srp-daynight-axis__dial-core" />
            </span>
            <span className="srp-daynight-axis__label">24h</span>
          </div>

          <DayNightPanel variant="night">
            <div className="srp-daynight-panel__visual">
              <SrpSectionMedia
                aspect="square"
                tone="dark"
                label="// Visuel — Night"
                title="NIGHT RECOVERY PATCH™ · packshot"
              />
            </div>
            <div className="srp-daynight-panel__body">
              <span className="srp-daynight-panel__tag">Night</span>
              <h3>{dayNight.night.name}</h3>
              <VerbatimLines lines={dayNight.night.lines} className="srp-body" />
            </div>
          </DayNightPanel>
        </div>

        <p className="srp-daynight-closing">{dayNight.closing}</p>
      </div>
    </section>
  );
}
