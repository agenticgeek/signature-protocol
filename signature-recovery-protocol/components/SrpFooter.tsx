import { FOOTER_DISCLAIMER } from "@/signature-recovery-protocol/constants/footer-disclaimer";

export default function SrpFooter() {
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
          {FOOTER_DISCLAIMER}
        </p>
        <div className="footer-meta">
          <span>© 2026 METCARE® — My Esthetic Travel®</span>
          <span>SIGNATURE RECOVERY PROTOCOL™</span>
        </div>
      </div>
    </footer>
  );
}
