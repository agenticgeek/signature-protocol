"use client";

import DayNightPanel from "@/signature-recovery-protocol/components/DayNightPanel";
import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
import VerbatimLines from "@/signature-recovery-protocol/components/VerbatimLines";
import { SECTION_FEATURED_IMAGES, SRP_BACKGROUNDS } from "@/signature-recovery-protocol/constants/assets";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function DayNightSection() {
  const { landing } = useSrpContent();
  const { dayNight } = landing;
  return (
    <section className="srp-section srp-section--day-night" id="section-day-night">
      <SrpParallaxBg src={SRP_BACKGROUNDS.gel} speed={0.3} opacity={0.12} align="left" />
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
                variant="product"
                src={SECTION_FEATURED_IMAGES.dayNight.day}
                alt="DAY COLLAGEN™ — Metabolic Booster"
                label="// DAY COLLAGEN™"
                title="Réparer · Drainer · Soutenir"
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
                variant="product"
                src={SECTION_FEATURED_IMAGES.dayNight.night}
                alt="NIGHT COLLAGEN™ — Deep Restore"
                label="// NIGHT COLLAGEN™"
                title="Calmer · Régénérer · Reconstruire"
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
