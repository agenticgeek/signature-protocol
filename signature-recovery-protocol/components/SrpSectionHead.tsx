import VerbatimLines from "@/signature-recovery-protocol/components/VerbatimLines";

type SrpSectionHeadProps = {
  sectionNum: string;
  title?: string;
  lede?: string | readonly string[];
};

export default function SrpSectionHead({ sectionNum, title, lede }: SrpSectionHeadProps) {
  return (
    <header className="srp-section-head">
      {title ? (
        <h2 className="srp-section-title">{title}</h2>
      ) : (
        <div className="srp-section-num">{sectionNum}</div>
      )}
      {typeof lede === "string" ? (
        <p className="srp-lede">{lede}</p>
      ) : lede ? (
        <VerbatimLines lines={lede} className="srp-lede" />
      ) : null}
    </header>
  );
}
