"use client";

import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function SrpFooter() {
  const { footerDisclaimer, ui } = useSrpContent();

  return (
    <footer className="metcare-footer" data-screen-label="Footer">
      <div className="container">
        <div className="footer-brand">
          METCARE
          <span style={{ fontSize: "0.5em", verticalAlign: "super", opacity: 0.7 }}>
            ®
          </span>
        </div>
        <p className="footer-disclaimer" style={{ whiteSpace: "pre-line" }}>
          {footerDisclaimer}
        </p>
        <div className="footer-meta">
          <span>{ui.footer.copyright}</span>
          <span className="footer-signature">
            <span className="footer-signature__line">{ui.footer.signature}</span>
            <span className="footer-signature__tagline">{ui.footer.tagline}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
