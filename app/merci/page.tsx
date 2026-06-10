import type { Metadata } from "next";
import MerciClient from "@/signature-recovery-protocol/components/merci/MerciClient";

export const metadata: Metadata = {
  title: "Merci — SIGNATURE RECOVERY PROTOCOL™ · METCARE®",
};

export default function MerciPage() {
  return <MerciClient />;
}
