import type { Metadata } from "next";
import Image from "next/image";
import { Reviews } from "@/components/home/Reviews";
import {
  BokaKnapp,
  FastMobilrad,
  WhatsAppKnapp,
} from "@/components/lp/Knappar";
import { LeadFormular } from "@/components/lp/LeadFormular";
import { PhoneNumber } from "@/components/ui/PhoneNumber";
import { company, email, halsokontroll, phone, SITE_URL } from "@/content/site";
import { getDictionary } from "@/lib/i18n";
import { absolutUrl, buildMetadata } from "@/lib/metadata";

/**
 * Landningssida för den ekonomiska hälsokontrollen.
 *
 * Destination för betald trafik från Meta och TikTok. Innehållet är medvetet
 * kort: allt som inte för besökaren närmare formuläret är i vägen.
 *
 * Ligger utanför sitemapen. En annonssida ska inte konkurrera med
 * tjänstesidorna om samma sökord, och den har inget organiskt syfte.
 */

const PATH = "/ekonomisk-halsokontroll";

export const metadata: Metadata = {
  ...buildMetadata({
    locale: "fa",
    path: PATH,
    title: "بررسی وضعیت مالی شرکت در ۶۰ دقیقه | ققنوس شمالی",
    description:
      "بررسی وضعیت مالی کسب‌وکار شما در حدود ۶۰ دقیقه. خدمات مشاوره‌ای ققنوس شمالی با هزینه ثابت ۱۲۰۰ کرون.",
  }),
  /* Sidan finns bara i den här versionen. Inga språkalternativ, och ingen
     hreflang som pekar på svenska eller engelska sidor som inte finns. */
  alternates: { canonical: absolutUrl(PATH) },
};

/** Det vi går igenom under timmen. Ren typografi, inga ikoner. */
const PUNKTER = [
  "نقدینگی",
  "فاکتورهای پرداخت‌نشده",
  "هزینه‌های ثابت",
  "وضعیت مالیاتی",
  "سودآوری کسب‌وکار",
  "وضعیت مالی هفته‌های آینده",
];

const STEG = [
  "درخواست خود را ارسال کنید",
  "زمان مناسب را هماهنگ می‌کنیم",
  "وضعیت مالی شرکت را با هم مرور می‌کنیم",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "بررسی وضعیت مالی شرکت",
  serviceType: "Ekonomisk hälsokontroll",
  inLanguage: "fa",
  url: absolutUrl(PATH),
  provider: {
    "@type": "AccountingService",
    name: company.legalName,
    identifier: company.orgNumber,
    telephone: phone.international,
    url: `${SITE_URL}/`,
  },
  areaServed: { "@type": "Country", name: "Sweden" },
  offers: {
    "@type": "Offer",
    price: halsokontroll.prisSiffra,
    priceCurrency: halsokontroll.valuta,
    availability: "https://schema.org/InStock",
  },
};

export default function Page() {
  const t = getDictionary("fa");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────
          Pris och knapp ligger före bilden i ordningen, så att de syns utan
          att besökaren behöver scrolla på telefon. Bilden hamnar under. */}
      <section className="bg-page text-text">
        <div className="mx-auto grid max-w-[var(--content-max)] items-center gap-[clamp(32px,5vw,64px)] px-[var(--pad-x)] pt-[clamp(36px,6vw,72px)] pb-[clamp(48px,7vw,88px)] md:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="np-label mb-5 text-accent-ink">
              ویژه صاحبان کسب‌وکار در سوئد
            </p>
            <h1 className="np-h2 mb-6 text-[length:var(--fs-h1)] leading-[1.15] text-balance">
              به شرکت خود یک شروع مالی خوب بدهید،{" "}
              <em className="np-gradient-text">در ۶۰ دقیقه</em>
            </h1>
            <p className="m-0 mb-8 max-w-[52ch] font-sans text-[clamp(16px,1.5vw,19px)] leading-[1.8] text-text-muted">
              در یک جلسه مشاوره‌ای، دید روشن‌تری از وضعیت مالی کسب‌وکار خود به
              دست آورید و بدانید چه مواردی نیاز به توجه بیشتری دارند.
            </p>

            <p className="m-0 mb-8 flex items-baseline gap-3">
              <span className="font-heading text-[clamp(38px,6vw,58px)] leading-none text-accent">
                فقط {halsokontroll.prisPersiska} کرون
              </span>
            </p>

            <div className="flex flex-wrap gap-[14px]">
              <BokaKnapp plats="hero" etikett="رزرو بررسی مالی" />
              <WhatsAppKnapp plats="hero" />
            </div>
          </div>

          {/* Märkesplatta i stället för foto.

              Logotypen är 431 gånger 338 och genomskinlig, alltså en bred
              märkesbild. Sträckt till porträttformat hade den blivit
              förvriden, så den ligger centrerad på en egen platta med gott om
              luft omkring. Plattan är låg på telefon: där är varje punkt
              ovanför vikningen värd mer än en stor bild.

              priority eftersom plattan står ovanför vikningen. Filen är 11 kB,
              så det kostar nästan ingenting. */}
          <div className="mx-auto flex w-full max-w-[420px] flex-col items-center justify-center gap-6 rounded-media bg-ink px-10 py-[clamp(40px,8vw,72px)] shadow-[0_24px_64px_rgba(23,19,16,.18)]">
            <Image
              src="/assets/phoenix-logo.webp"
              alt="Nordic Phoenix Redovisningsbyrå"
              width={431}
              height={338}
              priority
              sizes="(max-width: 768px) 140px, 180px"
              className="h-auto w-[clamp(120px,26vw,180px)]"
            />
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="font-heading text-[clamp(19px,2.4vw,24px)] tracking-[.04em] text-on-dark">
                NORDIC PHOENIX
              </span>
              <span className="font-mono text-[11px] tracking-[.22em] text-on-dark-dim uppercase">
                Redovisningsbyrå
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vad vi går igenom ───────────────────────────────────────────── */}
      <section className="bg-surface text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[clamp(56px,8vw,104px)]">
          <h2
            data-reveal
            className="np-h2 mb-[clamp(28px,4vw,48px)] text-[length:var(--fs-h2-sm)] leading-[1.25]"
          >
            در این {halsokontroll.minuterPersiska} دقیقه چه چیزهایی را بررسی
            می‌کنیم؟
          </h2>
          <ol className="m-0 grid list-none gap-0 p-0 sm:grid-cols-2">
            {PUNKTER.map((punkt, i) => (
              <li
                key={punkt}
                data-reveal
                className="flex items-baseline gap-5 border-t border-[rgba(23,19,16,.12)] py-[clamp(16px,2vw,22px)]"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[13px] tracking-[.1em] text-accent-ink"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-[clamp(18px,2vw,23px)] leading-[1.4]">
                  {punkt}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Varför det spelar roll ──────────────────────────────────────── */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[clamp(56px,8vw,104px)]">
          <h2
            data-reveal
            className="np-h2 mb-6 text-[length:var(--fs-h2-sm)] leading-[1.25]"
          >
            چرا این بررسی مهم است؟
          </h2>
          <p
            data-reveal
            className="np-justerad m-0 max-w-[64ch] font-sans text-[clamp(16px,1.5vw,18px)] leading-[1.85] text-text-muted"
          >
            وقتی درگیر کارهای روزمره هستید، ممکن است تغییرات مهم مالی به‌راحتی
            دیده نشوند. یک مرور منظم می‌تواند به شما کمک کند تصویر واضح‌تری از
            وضعیت شرکت داشته باشید و تصمیم‌های مالی را با اطمینان بیشتری
            بگیرید.
          </p>
        </div>
      </section>

      {/* ── Erbjudandet ─────────────────────────────────────────────────── */}
      <section className="bg-page px-[var(--pad-x)] pb-[clamp(56px,8vw,104px)]">
        <div
          data-reveal
          className="mx-auto max-w-[var(--content-max)] rounded-card p-[clamp(32px,5vw,72px)]"
          style={{ background: "var(--gradient-banner)" }}
        >
          <h2 className="np-h2 mb-5 text-[length:var(--fs-h2-sm)] leading-[1.2] text-banner-ink">
            وقت ندارید خودتان این بررسی را انجام دهید؟
          </h2>
          <p className="m-0 mb-9 max-w-[54ch] font-sans text-[clamp(16px,1.5vw,18px)] leading-[1.8] text-[rgba(28,15,5,.78)]">
            ققنوس شمالی می‌تواند این کار را به‌صورت خدمات مشاوره‌ای، تنها با
            هزینه {halsokontroll.prisPersiska} کرون برای شما انجام دهد.
          </p>

          <div className="mb-9 flex flex-wrap items-end gap-x-8 gap-y-4">
            <p className="m-0 font-heading text-[clamp(52px,9vw,92px)] leading-[.95] text-banner-ink">
              {halsokontroll.prisPersiska}
              <span className="ms-3 text-[clamp(18px,2.4vw,26px)]">کرون</span>
            </p>
            <p className="m-0 pb-2 font-mono text-[13px] tracking-[.1em] text-[rgba(28,15,5,.7)]">
              مدت جلسه: حدود {halsokontroll.minuterPersiska} دقیقه
            </p>
          </div>

          <BokaKnapp
            plats="erbjudande"
            etikett={`رزرو مشاوره · ${halsokontroll.prisPersiska} کرون`}
            klass="np-btn bg-banner-ink px-9 py-[18px] text-[16px] font-semibold text-[#F2EDE3] hover:-translate-y-[2px] hover:text-[#F2EDE3]"
          />
        </div>
      </section>

      {/* ── Så går det till ─────────────────────────────────────────────── */}
      <section className="bg-ink text-on-dark">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[clamp(56px,8vw,104px)]">
          <h2
            data-reveal
            className="np-h2 mb-[clamp(28px,4vw,48px)] text-[length:var(--fs-h2-sm)] leading-[1.25]"
          >
            چطور کار می‌کند؟
          </h2>
          <ol className="m-0 grid list-none gap-[clamp(24px,3vw,40px)] p-0 md:grid-cols-3">
            {STEG.map((steg, i) => (
              <li key={steg} data-reveal className="flex flex-col gap-4">
                <span
                  aria-hidden="true"
                  className="font-mono text-[12px] tracking-[.2em] text-accent-light"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-[clamp(19px,2vw,24px)] leading-[1.4]">
                  {steg}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── För vem ─────────────────────────────────────────────────────── */}
      <section className="bg-surface text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[clamp(56px,8vw,104px)]">
          <h2
            data-reveal
            className="np-h2 mb-6 text-[length:var(--fs-h2-sm)] leading-[1.25]"
          >
            این بررسی برای چه کسانی مناسب است؟
          </h2>
          <p
            data-reveal
            className="m-0 max-w-[60ch] font-sans text-[clamp(16px,1.5vw,18px)] leading-[1.85] text-text-muted"
          >
            برای صاحبان کسب‌وکار در سوئد که می‌خواهند دید روشن‌تری از وضعیت
            مالی شرکت خود داشته باشند، چه شرکت شما Aktiebolag باشد و چه Enskild
            firma.
          </p>
        </div>
      </section>

      {/* ── Formuläret ──────────────────────────────────────────────────── */}
      <section id="boka" className="scroll-mt-[80px] bg-page text-text">
        <div className="mx-auto grid max-w-[var(--content-max)] gap-[clamp(32px,5vw,64px)] px-[var(--pad-x)] py-[clamp(56px,8vw,104px)] md:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="np-h2 mb-5 text-[length:var(--fs-h2-sm)] leading-[1.25]">
              رزرو بررسی مالی
            </h2>
            <p className="m-0 mb-7 font-sans text-[16px] leading-[1.8] text-text-muted">
              فرم را پر کنید تا برای هماهنگی زمان با شما تماس بگیریم. مدت جلسه
              حدود {halsokontroll.minuterPersiska} دقیقه و هزینه آن{" "}
              {halsokontroll.prisPersiska} کرون است.
            </p>
            <div className="flex flex-col gap-2 font-sans text-[15px] leading-[1.8] text-text-muted">
              <a href={phone.href} className="text-text no-underline">
                <PhoneNumber />
              </a>
              <a href={email.href} className="text-text no-underline">
                {email.display}
              </a>
            </div>
          </div>
          <LeadFormular />
        </div>
      </section>

      {/* ── Förtroende ──────────────────────────────────────────────────── */}
      <section className="bg-surface text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[clamp(56px,8vw,104px)]">
          <h2 className="np-h2 mb-6 text-[length:var(--fs-h2-sm)] leading-[1.25]">
            ققنوس شمالی
          </h2>
          <p className="m-0 mb-[clamp(32px,4vw,48px)] max-w-[62ch] font-sans text-[16px] leading-[1.85] text-text-muted">
            {company.legalName}، دفتر حسابداری در استکهلم و سولنتونا که به
            صاحبان کسب‌وکار در سراسر سوئد خدمات دفترداری، حقوق، مالیات، بستن
            حساب‌ها و ارتباط با ادارات ارائه می‌دهد. به سوئدی، انگلیسی و فارسی.
          </p>
          <Reviews t={t} />
        </div>
      </section>

      {/* ── Slutlig uppmaning ───────────────────────────────────────────── */}
      <section className="bg-ink text-on-dark">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[clamp(56px,8vw,104px)] text-center">
          <h2 className="np-h2 mx-auto mb-6 max-w-[24ch] text-[length:var(--fs-h2-sm)] leading-[1.25] text-balance">
            برای یک تصویر روشن‌تر از وضعیت مالی شرکت خود آماده‌اید؟
          </h2>
          <p className="m-0 mb-9 font-heading text-[clamp(34px,5vw,52px)] leading-none text-accent-light">
            {halsokontroll.prisPersiska} کرون
          </p>
          <div className="flex flex-wrap justify-center gap-[14px]">
            <BokaKnapp plats="slut" etikett="همین حالا رزرو کنید" />
            <WhatsAppKnapp
              plats="slut"
              klass="np-btn border border-[rgba(242,236,224,.35)] px-7 py-[16px] text-[16px] text-on-dark hover:border-on-dark hover:text-on-dark"
            />
          </div>
        </div>
      </section>

      {/* Bottenutrymme så att den fasta mobilraden aldrig täcker foten. */}
      <div aria-hidden="true" className="h-[84px] md:hidden" />
      <FastMobilrad />
    </>
  );
}
