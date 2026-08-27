import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { isPreview } from "@/lib/preview";

// Krävs av `output: export` — filen genereras en gång vid build.
export const dynamic = "force-static";

/**
 * Robotar som hämtar innehåll åt språkmodeller.
 *
 * De träffas redan av `*`-regeln, så de här raderna öppnar ingenting nytt.
 * De finns för att göra ställningstagandet läsbart: den som senare vill
 * stänga ute en enskild modell ändrar en rad här i stället för att fundera
 * ut namnet. Delas upp i två grupper eftersom de gör olika saker.
 *
 * Träning och underlag: hämtar sidor till modellernas kunskap.
 * Sökning i realtid: hämtar sidan när någon ställer en fråga, och det är den
 * trafiken som kan ge en hänvisning tillbaka till sajten.
 */
const MODELLROBOTAR = [
  // Träning och underlag
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "CCBot",
  // Sökning i realtid, alltså de som kan leda besökare hit
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  // Granskningskopian spärras helt, och pekar inte ut någon sitemap.
  if (isPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...MODELLROBOTAR.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
