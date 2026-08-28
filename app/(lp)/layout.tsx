import type { Metadata } from "next";
import "../globals.css";
import { LandningsFot } from "@/components/lp/LandningsFot";
import { LandningsHuvud } from "@/components/lp/LandningsHuvud";
import { Matning } from "@/components/layout/Matning";
import { MotionBoot } from "@/components/layout/MotionBoot";
import { MotionRuntime } from "@/components/layout/MotionRuntime";
import { Samtycke } from "@/components/layout/Samtycke";
import { fontVariables } from "@/lib/fonts";
import { getDictionary, dirFor, htmlLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

/**
 * Rotlayout för annonslandningssidor.
 *
 * Egen layout och inte sajtens vanliga skal, av två skäl.
 *
 * Konvertering: en betald besökare ska ha en väg framåt, inte en meny med
 * tolv utvägar. Huvudet är därför bara logotyp och telefonnummer, och foten
 * bara det som måste stå där juridiskt.
 *
 * Hastighet: chattwidgeten är 432 kB tredjeparts-JS. Den är värd sitt pris på
 * sajten i övrigt, men på en sida som ska ta emot klick från TikTok och Meta
 * konkurrerar den med det enda som räknas, att formuläret syns snabbt.
 * WhatsApp-knappen täcker samma behov till noll kilobyte.
 *
 * Mätning och samtyckesruta följer med oförändrade. Utan dem skulle sidan
 * varken kunna rapportera konverteringar eller vara laglig.
 */

export const metadata: Metadata = buildMetadata({ locale: "fa" });

export default function LandningsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = getDictionary("fa");

  return (
    <html
      lang={htmlLang.fa}
      dir={dirFor("fa")}
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <MotionBoot />
      </head>
      <body>
        <LandningsHuvud />
        <main>{children}</main>
        <LandningsFot />
        <MotionRuntime />
        <Matning />
        <Samtycke locale="fa" t={t} />
      </body>
    </html>
  );
}
