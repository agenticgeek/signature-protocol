import type { ReactNode } from "react";
import SrpFooter from "@/signature-recovery-protocol/components/SrpFooter";
import SrpNavbar from "@/signature-recovery-protocol/components/SrpNavbar";
import SrpScrollParallax from "@/signature-recovery-protocol/components/SrpScrollParallax";
import SrpScrollReveal from "@/signature-recovery-protocol/components/SrpScrollReveal";

type SrpPageShellProps = {
  children: ReactNode;
  variant?: "home" | "checkout" | "thankyou" | "upsell";
  mainClassName?: string;
};

export default function SrpPageShell({
  children,
  variant = "home",
  mainClassName = "srp-main",
}: SrpPageShellProps) {
  return (
    <>
      <SrpScrollReveal />
      <SrpScrollParallax />
      <SrpNavbar variant={variant} />
      <main className={mainClassName}>{children}</main>
      <SrpFooter />
    </>
  );
}
