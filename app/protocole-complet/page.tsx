import type { Metadata } from "next";
import SrpPageShell from "@/signature-recovery-protocol/components/SrpPageShell";
import ProtocolContentsSection from "@/signature-recovery-protocol/components/sections/ProtocolContentsSection";
import SrpExperienceSection from "@/signature-recovery-protocol/components/sections/SrpExperienceSection";
import IndividualProductsSection from "@/signature-recovery-protocol/components/sections/IndividualProductsSection";
import ExpertSection from "@/signature-recovery-protocol/components/sections/ExpertSection";

export const metadata: Metadata = {
  title: "Protocole Complet — SIGNATURE RECOVERY PROTOCOL™ · METCARE®",
};

export default function ProtocoleCompletPage() {
  return (
    <SrpPageShell>
      <ProtocolContentsSection />
      <div className="srp-divider" />
      <SrpExperienceSection />
      <div className="srp-divider" />
      <IndividualProductsSection />
      <div className="srp-divider" />
      <ExpertSection />
    </SrpPageShell>
  );
}
