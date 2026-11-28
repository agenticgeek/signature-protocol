import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./globals.css";
import "@/signature-recovery-protocol/styles/srp.css";
import "@/signature-recovery-protocol/styles/parallax.css";
import "@/signature-recovery-protocol/styles/srp-premium.css";
import "@/signature-recovery-protocol/styles/ambassador-form.css";
import { AmbassadorFormProvider } from "@/signature-recovery-protocol/components/ambassador/AmbassadorFormProvider";
import { LanguageProvider } from "@/signature-recovery-protocol/i18n/LanguageProvider";
import MetaPixel from "@/signature-recovery-protocol/components/MetaPixel";
import GoogleAnalytics from "@/signature-recovery-protocol/components/GoogleAnalytics";

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
  title: "Programme Ambassadeur Pro | METCARE®",
  description:
    "Prolongez l'expérience de vos clientes. Développez votre activité.",
  openGraph: {
    title: "Programme Ambassadeur Pro | METCARE®",
    description:
      "Prolongez l'expérience de vos clientes. Développez votre activité.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${poppins.variable} ${raleway.variable}`}>
      <body>
        <MetaPixel />
        <GoogleAnalytics />
        <LanguageProvider>
          <div className="srp-funnel">
            <AmbassadorFormProvider>{children}</AmbassadorFormProvider>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
