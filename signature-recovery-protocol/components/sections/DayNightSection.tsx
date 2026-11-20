"use client";

import DayNightPanel from "@/signature-recovery-protocol/components/DayNightPanel";
import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
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
        <SrpSectionHead sectionNum={dayNight.sectionNum} title={dayNight.title} />

        <div className="srp-daynight-stage srp-daynight-stage--no-axis">
          <DayNightPanel variant="day">
            <div className="srp-daynight-panel__visual">
              <SrpSectionMedia
                aspect="square"
                tone="light"
                variant="product"
                photo
                position="50% 36%"
                src={SECTION_FEATURED_IMAGES.dayNight.day}
                alt="METCARE®"
              />
            </div>
            <div className="srp-daynight-panel__body">
              <span className="srp-daynight-panel__tag">{dayNight.day.tag}</span>
              <h3>{dayNight.day.name}</h3>
              <p className="srp-body">{dayNight.day.text}</p>
            </div>
          </DayNightPanel>

          <DayNightPanel variant="night">
            <div className="srp-daynight-panel__visual">
              <SrpSectionMedia
                aspect="square"
                tone="dark"
                variant="product"
                photo
                position="50% 48%"
                src={SECTION_FEATURED_IMAGES.dayNight.night}
                alt="METCARE®"
              />
            </div>
            <div className="srp-daynight-panel__body">
              <span className="srp-daynight-panel__tag">{dayNight.night.tag}</span>
              <h3>{dayNight.night.name}</h3>
              <p className="srp-body">{dayNight.night.text}</p>
            </div>
          </DayNightPanel>
        </div>

        <p className="srp-daynight-closing">{dayNight.closing}</p>
      </div>
    </section>
  );
}
