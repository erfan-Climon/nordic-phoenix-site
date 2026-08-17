import type { Metadata } from "next";
import "../globals.css";
import { MotionBoot } from "@/components/layout/MotionBoot";
import { SiteShell } from "@/components/layout/SiteShell";
import { fontVariables } from "@/lib/fonts";
import { dirFor, htmlLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

/**
 * Rotlayout för svenska, som ligger på roten (`/`). Engelska och persiska har
 * en egen rotlayout i app/[locale] — de behöver andra lang/dir på <html>.
 */

export const metadata: Metadata = buildMetadata({ locale: "fa" });

export default function SwedishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <SiteShell locale="fa">{children}</SiteShell>
      </body>
    </html>
  );
}
