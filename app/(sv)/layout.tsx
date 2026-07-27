import type { Metadata } from "next";
import "../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { fontVariables } from "@/lib/fonts";
import { dirFor, htmlLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

/**
 * Rotlayout för svenska, som ligger på roten (`/`). Engelska och persiska har
 * en egen rotlayout i app/[locale] — de behöver andra lang/dir på <html>.
 */

export const metadata: Metadata = buildMetadata({ locale: "sv" });

export default function SwedishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={htmlLang.sv} dir={dirFor("sv")} className={fontVariables}>
      <body>
        <SiteShell locale="sv">{children}</SiteShell>
      </body>
    </html>
  );
}
