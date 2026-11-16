import type { Metadata } from "next";
import { VideoguiderPage } from "@/components/pages/VideoguiderPage";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const t = getDictionary("fa");

export const metadata: Metadata = buildMetadata({
  locale: "fa",
  path: "/videoguider",
  title: t.videoguider.metaTitle,
  description: t.videoguider.metaDescription,
});

export default function Page() {
  return <VideoguiderPage locale="fa" />;
}
