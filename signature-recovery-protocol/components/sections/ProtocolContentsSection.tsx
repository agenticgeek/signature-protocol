"use client";

import Image from "next/image";
import SrpParallaxBg from "@/signature-recovery-protocol/components/SrpParallaxBg";
import SrpSectionHead from "@/signature-recovery-protocol/components/SrpSectionHead";
import { PROTOCOL_PRODUCT_IMAGES, SRP_BACKGROUNDS } from "@/signature-recovery-protocol/constants/assets";
import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

const SIGNATURE_INDEX = 6;
const FINALE_INDEX = 9;

export default function ProtocolContentsSection() {
  const { protocole } = useSrpContent();
  const { contents } = protocole;
  return (
    <section className="srp-section srp-section--protocol-contents" id="section-contents">
      <SrpParallaxBg src={SRP_BACKGROUNDS.gel} speed={0.34} opacity={0.14} align="center" />
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
                  {PROTOCOL_PRODUCT_IMAGES[i] ? (
                    <div className="srp-protocol-product__thumb">
                      <Image
                        src={PROTOCOL_PRODUCT_IMAGES[i]!}
                        alt={product}
                        fill
                        sizes="96px"
                        className="srp-protocol-product__thumb-image"
                      />
                    </div>
                  ) : null}
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
