import type { Metadata } from "next";
import Link from "next/link";
import { PhoneNumber } from "@/components/ui/PhoneNumber";
import { cities } from "@/content/locations";
import { services } from "@/content/services";
import { getServiceCopy } from "@/content/service-copy";
import { company, phone, SITE_URL, whatsappUrl } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

/**
 * Den enda undersida som fanns på den gamla sajten och som rankar i dag.
 *
 * URL:en behålls oförändrad. En omdirigering till /fa hade spätt ut länkvärdet
 * och tappat själva sökordet, som ligger i sökvägen: persisk redovisningsbyra
 * stockholm. Innehållet är därför flyttat hit, inte ersatt.
 *
 * Sidan är persiskspråkig men ligger på roten utan /fa-prefix, precis som
 * tidigare. Den ska inte flyttas utan att någon först kontrollerar i Search
 * Console vad den drar in.
 */
const PATH = "/persisk-redovisningsbyra-stockholm";

export const metadata: Metadata = {
  ...buildMetadata({
    locale: "fa",
    path: PATH,
    title:
      "حسابدار ایرانی و فارسی‌زبان در سوئد — Nordic Phoenix Redovisningsbyrå Stockholm",
    description:
      "حسابدار ایرانی و فارسی‌زبان در سوئد. Nordic Phoenix Redovisningsbyrå در استکهلم خدمات bokföring، moms، lön، bokslut، årsredovisning و deklaration برای شرکت‌های ایرانی و فارسی‌زبان ارائه می‌دهد.",
  }),
  /* Sidan finns bara i den här versionen, så inga språkalternativ. Den ligger
     dessutom på roten och inte under /fa, vilket är avsiktligt. */
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: company.legalName,
  identifier: company.orgNumber,
  url: `${SITE_URL}${PATH}`,
  telephone: phone.international,
  inLanguage: "fa",
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: company.postalCode,
    addressLocality: company.city,
    addressRegion: company.region,
    addressCountry: company.country,
  },
  availableLanguage: ["fa", "sv", "en"],
  areaServed: { "@type": "Country", name: "Sverige" },
};

export default function Page() {
  return (
    <div dir="rtl" lang="fa">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] pt-[clamp(150px,18vh,220px)] pb-[clamp(48px,6vw,80px)]">
          <p className="np-label mb-7 text-accent-ink">
            حسابداری به زبان فارسی در سوئد
          </p>
          <h1 className="np-h2 mb-7 text-[length:var(--fs-h1)] leading-[1.15]">
            حسابدار ایرانی و فارسی‌زبان{" "}
            <em className="np-gradient-text">در سوئد.</em>
          </h1>
          <div className="max-w-[62ch] font-sans text-[clamp(16px,1.4vw,19px)] leading-[1.8] text-text-muted">
            <p className="m-0 mb-5">
              اگر در سوئد زندگی می‌کنید و به دنبال یک حسابدار ایرانی یا حسابدار
              فارسی‌زبان در سوئد هستید، Nordic Phoenix Redovisningsbyrå می‌تواند
              کمک کند تا امور حسابداری، مالیات، حقوق، moms، bokföring، bokslut و
              deklaration شرکت خود را با اطمینان انجام دهید.
            </p>
            <p className="m-0 mb-5">
              ما در استکهلم فعالیت می‌کنیم و به صاحبان شرکت‌ها، فریلنسرها،
              enskild firma، aktiebolag و کسب‌وکارهای کوچک کمک می‌کنیم تا امور
              مالی و مالیاتی خود را مطابق قوانین سوئد انجام دهند.
            </p>
            <p className="m-0">
              همچنین با تهیه طرح توجیهی، طرح تجاری یا affärsplan به مهاجرت شما
              به سوئد کمک می‌کنیم، برای ارائه به اداره مهاجرت Migrationsverket،
              بانک‌ها و آژانس کاریابی Arbetsförmedlingen.
            </p>
          </div>
          <div className="mt-[clamp(32px,4vw,48px)] flex flex-wrap gap-[14px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="np-btn np-btn-primary px-9 py-[18px] text-[15px]"
            >
              رزرو مشاوره رایگان
            </a>
            <Link
              href="/fa/tjanster"
              className="np-btn np-btn-outline px-[30px] py-[17px] text-[15px]"
            >
              مشاهده تمام خدمات
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ink text-on-dark">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
          <h2 className="np-h2 mb-[clamp(32px,4vw,52px)] text-[length:var(--fs-h2-sm)] leading-[1.25]">
            خدمات حسابداری فارسی در سوئد
          </h2>
          <p className="m-0 mb-[clamp(32px,4vw,48px)] max-w-[62ch] font-sans text-[16px] leading-[1.8] text-on-dark-muted">
            در Nordic Phoenix Redovisningsbyrå می‌توانید مسائل مالی و حسابداری
            خود را به زبان فارسی توضیح دهید و هم‌زمان خدمات حرفه‌ای مطابق سیستم
            حسابداری و مالیاتی سوئد دریافت کنید.
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-0 border-t border-r border-[var(--hairline-dark)]">
            {services.map((s) => {
              const c = getServiceCopy(s, "fa");
              return (
                <Link
                  key={s.slug}
                  href={`/fa/tjanster/${s.slug}`}
                  className="border-b border-l border-[var(--hairline-dark)] p-[clamp(24px,3vw,36px)] text-inherit no-underline transition-colors duration-300 hover:bg-[rgba(255,148,36,.06)]"
                >
                  <h3 className="np-h3 mb-2 text-[length:var(--fs-h3-sm)] leading-[1.3]">
                    {c.name}
                  </h3>
                  <p className="m-0 font-sans text-[14px] leading-[1.7] text-on-dark-muted">
                    {c.shortName}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
          <h2 className="np-h2 mb-6 text-[length:var(--fs-h2-sm)] leading-[1.25]">
            حسابدار فارسی‌زبان در استکهلم و سراسر سوئد
          </h2>
          <p className="m-0 mb-[clamp(28px,3vw,40px)] max-w-[62ch] font-sans text-[16px] leading-[1.8] text-text-muted">
            اگر به دنبال حسابدار ایرانی در استکهلم یا حسابدار فارسی‌زبان در سوئد
            هستید، ما می‌توانیم به‌صورت حضوری یا دیجیتال کمک کنیم. خدمات ما برای
            شرکت‌های فعال در سراسر کشور قابل ارائه است.
          </p>
          <div className="flex flex-wrap gap-3">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/fa/redovisningsbyra/${c.slug}`}
                className="border border-[var(--hairline-light)] px-5 py-3 font-mono text-[12px] tracking-[.12em] text-text no-underline uppercase transition-colors duration-300 hover:border-accent hover:text-accent-ink"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Svensk sektion, bevarad från den gamla sidan. Den fanns där för att
          sidan skulle kunna hittas även på svenska sökord. */}
      <section className="bg-surface text-text" dir="ltr" lang="sv">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--pad-y-light)]">
          <h2 className="np-h2 mb-6 text-[length:var(--fs-h2-sm)] leading-[1.25]">
            Persisk redovisningsbyrå i Stockholm
          </h2>
          <p className="m-0 mb-5 max-w-[62ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            Nordic Phoenix Redovisningsbyrå erbjuder professionella
            redovisningstjänster för företagare i Sverige som vill kunna
            kommunicera på persiska och samtidigt få trygg hjälp enligt svenska
            regler.
          </p>
          <p className="m-0 max-w-[62ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            Vi hjälper företag med bokföring, redovisning, moms, lön, bokslut,
            årsredovisning och deklaration. Söker du en persisktalande
            redovisningskonsult eller en persisk redovisningsbyrå i Stockholm är
            du välkommen att höra av dig.
          </p>
        </div>
      </section>

      <section className="bg-page px-[var(--pad-x)] pb-[var(--pad-y-light)]">
        <div
          className="mx-auto max-w-[var(--content-max)] p-[clamp(32px,5vw,64px)]"
          style={{ background: "var(--gradient-banner)" }}
        >
          <h2 className="np-h2 mb-4 text-[length:var(--fs-h2-sm)] leading-[1.2] text-banner-ink">
            تماس با Nordic Phoenix Redovisningsbyrå
          </h2>
          <p className="m-0 mb-8 max-w-[56ch] font-sans text-[16px] leading-[1.8] text-[rgba(28,15,5,.75)]">
            به دنبال یک persisktalande redovisningskonsult یا یک persisk
            redovisningsbyrå i Stockholm هستید؟ با ما در تماس باشید.
          </p>
          <div className="flex flex-wrap gap-[14px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="np-btn bg-banner-ink px-8 py-4 text-[15px] font-semibold text-[#F2EDE3] hover:-translate-y-[2px] hover:text-[#F2EDE3]"
            >
              واتس‌اپ
            </a>
            <a
              href={phone.href}
              className="np-btn border-[1.5px] border-[rgba(28,15,5,.5)] px-7 py-[15px] text-[15px] font-medium text-banner-ink hover:border-banner-ink hover:bg-[rgba(28,15,5,.08)] hover:text-banner-ink"
            >
              <PhoneNumber />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
