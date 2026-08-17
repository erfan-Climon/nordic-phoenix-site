import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/pages/ServicePage";
import { getService, services } from "@/content/services";
import { getServiceCopy } from "@/content/service-copy";
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
  /* Persisk titel på den persiska roten. Föll den tillbaka på service.*
     hade rotens tjänstesidor fått svenska titlar. */
  const copy = getServiceCopy(service, "fa");

  return {
    ...buildMetadata({
      locale: "fa",
      path: `/tjanster/${service.slug}`,
      title: copy.metaTitle,
      description: copy.metaDescription,
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
  return <ServicePage service={service} locale="fa" />;
}
