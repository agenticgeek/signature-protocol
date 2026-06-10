import type { Metadata } from "next";
import CheckoutClient from "@/signature-recovery-protocol/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — SIGNATURE RECOVERY PROTOCOL™ · METCARE®",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
