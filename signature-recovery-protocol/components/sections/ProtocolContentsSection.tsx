"use client";

import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

const SIGNATURE_INDEX = 6;
const FINALE_INDEX = 9;

export default function ProtocolContentsSection() {
  const { protocole } = useSrpContent();
  const { contents } = protocole;
  return (
    <section className="srp-section srp-section--protocol-contents" id="section-contents">
      <div className="srp-container">
        <SrpSectionHead sectionNum={contents.sectionNum} title={contents.title} />

        <div className="srp-protocol-catalog" aria-label="Produits du protocole">
          <div className="srp-protocol-grid">
            {contents.products.map((product, i) => (
              <article
                key={product}
                className={[
                  "srp-protocol-product",
                  i === SIGNATURE_INDEX ? "srp-protocol-product--signature" : "",
                  i === FINALE_INDEX ? "srp-protocol-product--finale" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="srp-protocol-product__frame">
                  <span className="srp-protocol-product__spine" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="srp-protocol-product__body">
                    <span className="srp-protocol-product__idx">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="srp-protocol-product__name">{product}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
