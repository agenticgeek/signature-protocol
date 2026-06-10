import type { Metadata } from "next";
import UpsellClient from "@/signature-recovery-protocol/components/upsell/UpsellClient";

export const metadata: Metadata = {
  title: "Upsell — SIGNATURE RECOVERY PROTOCOL™ · METCARE®",
};

export default function UpsellPage() {
  return <UpsellClient />;
}
