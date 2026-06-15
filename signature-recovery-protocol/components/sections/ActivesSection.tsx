"use client";

import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import SrpSectionMedia from "@/signature-recovery-protocol/components/SrpSectionMedia";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function ActivesSection() {
  const { landing } = useSrpContent();
  const { actives } = landing;
  return (
    <section className="srp-section" id="section-actives">
      <div className="srp-container">
        <SrpSectionHead
          sectionNum={actives.sectionNum}
          title={actives.title || undefined}
          lede={actives.intro}
        />

        <div className="srp-section-stage srp-actives-stage section-editorial section-editorial--reverse">
          <SrpSectionMedia
            aspect="square"
            tone="dark"
            label="// Visuel — actifs"
            title="Macro patch · textures botaniques"
          />

          <div className="section-editorial__content">
            <p className="srp-body" style={{ marginBottom: 20 }}>
              {actives.listIntro}
            </p>

            <div className="srp-pill-grid" aria-label="Actifs sélectionnés">
              {actives.ingredients.map((name, i) => (
                <article className="srp-pill" key={name}>
                  <span className="srp-pill-idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="srp-pill-name">{name}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
