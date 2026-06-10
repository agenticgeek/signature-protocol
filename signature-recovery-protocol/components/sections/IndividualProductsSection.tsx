import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import { protocoleContent } from "@/signature-recovery-protocol/content/protocole";

const { individual } = protocoleContent;

export default function IndividualProductsSection() {
  return (
    <section className="srp-section srp-section--individual" id="section-individual">
      <div className="srp-individual-ambient" aria-hidden="true" />

      <div className="srp-container">
        <SrpSectionHead sectionNum={individual.sectionNum} title={individual.title} />

        <div className="srp-individual-stage" aria-label="Produits à l'unité">
          {individual.lines.map((line, i) => (
            <article
              key={line}
              className={`srp-individual-pillar srp-individual-pillar--${i + 1}`}
            >
              <span className="srp-individual-pillar-idx">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="srp-individual-pillar-text">{line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
