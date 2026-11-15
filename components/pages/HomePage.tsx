import { About } from "@/components/home/About";
import { ClientLogos } from "@/components/home/ClientLogos";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Hero } from "@/components/home/Hero";
import { Klipp } from "@/components/home/Klipp";
import { Languages } from "@/components/home/Languages";
import { Pricing } from "@/components/home/Pricing";
import { Process } from "@/components/home/Process";
import { Reviews } from "@/components/home/Reviews";
import { Services } from "@/components/home/Services";
import { Sweden } from "@/components/home/Sweden";
import { WhyUs } from "@/components/home/WhyUs";
import { KontaktSektion } from "@/components/kontakt/KontaktSektion";
import { getDictionary, type Locale } from "@/lib/i18n";
import { showsPricing } from "@/lib/pricing-visible";
import { accountingServiceJsonLd, siteNavigationJsonLd } from "@/lib/metadata";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      {[accountingServiceJsonLd(locale), siteNavigationJsonLd(locale)].map(
        (schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ),
      )}
      <Hero t={t} locale={locale} />
      <ClientLogos t={t} />
      <Services t={t} locale={locale} />
      <Reviews t={t} />
      <About t={t} />
      {/* Står direkt efter Om-sektionen: där har besökaren just fått veta
          vilka vi är, och klippen är Ali själv. Ljus botten mot Oms mörka. */}
      <Klipp t={t} locale={locale} />
      {showsPricing() ? <Pricing t={t} /> : null}
      <Languages t={t} />
      <Process t={t} />
      <Sweden t={t} />
      <WhyUs t={t} />
      <KontaktSektion locale={locale} />
      <CtaBanner t={t} />
    </>
  );
}
