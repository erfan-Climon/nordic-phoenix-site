import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/pages/ServicePage";
import { getService, services } from "@/content/services";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return services.map((s) => ({ tjanst: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tjanster/[tjanst]">): Promise<Metadata> {
  const { tjanst } = await params;
  const service = getService(tjanst);
  if (!service) return {};

  return {
    ...buildMetadata({
      locale: "sv",
      path: `/tjanster/${service.slug}`,
      title: service.metaTitle,
      description: service.metaDescription,
    }),
    // buildMetadata sätter canonical och hreflang för alla tre språk.
  };
}

export default async function Page({
  params,
}: PageProps<"/tjanster/[tjanst]">) {
  const { tjanst } = await params;
  const service = getService(tjanst);
  if (!service) notFound();
  return <ServicePage service={service} locale="sv" />;
}
