import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { isPreview } from "@/lib/preview";

// Krävs av `output: export` — filen genereras en gång vid build.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Granskningskopian spärras helt, och pekar inte ut någon sitemap.
  if (isPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
