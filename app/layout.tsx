import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./globals.css";
import "@/signature-recovery-protocol/styles/srp.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SIGNATURE RECOVERY PROTOCOL™ — METCARE®",
  description:
    "La récupération esthétique nouvelle génération. SIGNATURE RECOVERY PROTOCOL™ par METCARE®.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${poppins.variable} ${raleway.variable}`}>
      <body>
        <div className="srp-funnel">{children}</div>
      </body>
    </html>
  );
}
