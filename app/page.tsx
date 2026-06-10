import type { Metadata } from "next";
import SrpPageShell from "@/signature-recovery-protocol/components/SrpPageShell";
import HeroSection from "@/signature-recovery-protocol/components/sections/HeroSection";
import NotAloneSection from "@/signature-recovery-protocol/components/sections/NotAloneSection";
import PhilosophySection from "@/signature-recovery-protocol/components/sections/PhilosophySection";
import PhasesSection from "@/signature-recovery-protocol/components/sections/PhasesSection";
import ActivesSection from "@/signature-recovery-protocol/components/sections/ActivesSection";
import DayNightSection from "@/signature-recovery-protocol/components/sections/DayNightSection";
import SensorySection from "@/signature-recovery-protocol/components/sections/SensorySection";

export const metadata: Metadata = {
  title: "SIGNATURE RECOVERY PROTOCOL™ — METCARE®",
  description:
    "La récupération esthétique nouvelle génération. SIGNATURE RECOVERY PROTOCOL™ par METCARE®.",
};

export default function HomePage() {
  return (
    <SrpPageShell>
      <HeroSection />
      <div className="srp-divider" />
      <NotAloneSection />
      <div className="srp-divider" />
      <PhilosophySection />
      <div className="srp-divider" />
      <PhasesSection />
      <div className="srp-divider" />
      <ActivesSection />
      <div className="srp-divider" />
      <DayNightSection />
      <div className="srp-divider" />
      <SensorySection />
    </SrpPageShell>
  );
}
