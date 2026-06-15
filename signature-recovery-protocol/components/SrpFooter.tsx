"use client";

import { useSrpContent } from "@/signature-recovery-protocol/i18n/useSrpContent";

export default function SrpFooter() {
  const { footerDisclaimer } = useSrpContent();

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
          <span>© 2026 METCARE® — My Esthetic Travel®</span>
          <span>SIGNATURE RECOVERY PROTOCOL™</span>
        </div>
      </div>
    </footer>
  );
}
