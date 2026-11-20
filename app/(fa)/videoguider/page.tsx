import type { Metadata } from "next";
import { VideoguiderPage } from "@/components/pages/VideoguiderPage";
import { harVideoguider } from "@/content/blog-copy";
import { getDictionary, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const t = getDictionary("fa");

export const metadata: Metadata = buildMetadata({
  locale: "fa",
  path: "/videoguider",
  title: t.videoguider.metaTitle,
  description: t.videoguider.metaDescription,
  /* Bara språken som har skrivna klipptexter. Annars pekade hreflang på
     /sv/videoguider/ och /en/videoguider/, som omdirigeras. */
  availableLocales: locales.filter(harVideoguider),
});

export default function Page() {
  return <VideoguiderPage locale="fa" />;
}
