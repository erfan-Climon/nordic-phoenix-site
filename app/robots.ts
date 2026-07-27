import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

// Krävs av `output: export` — filen genereras en gång vid build.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
