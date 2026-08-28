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
 * Destination för betald trafik från Meta och TikTok. Ordningen följer den
 * fråga en kall besökare ställer sig i tur och ordning: vad är det, kan jag
 * lita på er, vad får jag, vad kostar det, hur går det till, och vad händer
 * när jag skickat.
 *
 * Innehållet är medvetet kort. Allt som inte för besökaren närmare formuläret
 * är i vägen, och en annonsbesökare läser inte en artikel.
 *
 * Ligger utanför sitemapen. En annonssida ska inte konkurrera med
 * tjänstesidorna om samma sökord, och den har inget organiskt syfte.
 */

const PATH = "/ekonomisk-halsokontroll";
const rubrik = halsokontroll.rubriker[halsokontroll.rubrikVariant];

export const metadata: Metadata = {
  ...buildMetadata({
    locale: "fa",
    path: PATH,
    title: "بررسی وضعیت مالی شرکت در ۶۰ دقیقه | ققنوس شمالی",
    description:
      "بررسی وضعیت مالی کسب‌وکار شما در حدود ۶۰ دقیقه. خدمات مشاوره‌ای ققنوس شمالی با هزینه ثابت ۱۲۰۰ کرون.",
  }),
  alternates: { canonical: absolutUrl(PATH) },
};

/** Det som ingår. Samma lista i erbjudandet som i schemat, en källa. */
const INGAR = [
  "بررسی نقدینگی",
  "بررسی فاکتورهای پرداخت‌نشده",
  "مرور هزینه‌های ثابت",
  "مرور وضعیت مالیاتی",
  "بررسی سودآوری کسب‌وکار",
  "نگاه به وضعیت مالی هفته‌های آینده",
];

/** Vad besökaren går därifrån med. Resultat, inte moment. */
const UTFALL = [
  {
    titel: "وضعیت واقعی نقدینگی شرکت",
    text: "دید بهتری از پول ورودی، هزینه‌ها و وضعیت فعلی شرکت داشته باشید.",
  },
  {
    titel: "مواردی که نیاز به توجه دارند",
    text: "مشخص کنید کدام بخش‌های مالی بهتر است زودتر بررسی یا اصلاح شوند.",
  },
  {
    titel: "تصمیم‌های مالی مطمئن‌تر",
    text: "با تصویر روشن‌تری از اعداد شرکت، برای ماه‌های آینده تصمیم بگیرید.",
  },
  {
    titel: "قدم بعدی روشن‌تر",
    text: "بدانید بعد از بررسی، بهتر است روی چه مواردی تمرکز کنید.",
  },
];

const STEG = [
  "درخواست خود را ارسال کنید",
  "زمان مناسب را هماهنگ کنید",
  "در حدود ۶۰ دقیقه، وضعیت مالی شرکت را با هم مرور کنید",
];

/**
 * Invändningar, som frågor.
 *
 * Ingenting om moms: den är inte fastställd för den här tjänsten, se
 * `momsBesked` i content/site.ts. Att gissa på en sida som säljer
 * ekonomitjänster vore särskilt illa.
 */
const FRAGOR = [
  {
    q: "این جلسه برای چه نوع شرکت‌هایی مناسب است؟",
    a: "برای صاحبان کسب‌وکار در سوئد، چه شرکت شما Aktiebolag باشد و چه Enskild firma.",
  },
  {
    q: "جلسه چقدر طول می‌کشد؟",
    a: "حدود ۶۰ دقیقه.",
  },
  {
    q: "هزینه چقدر است؟",
    a: "۱۲۰۰ کرون.",
  },
  {
    q: "آیا جلسه به زبان فارسی انجام می‌شود؟",
    a: "بله. ما به فارسی، سوئدی و انگلیسی کار می‌کنیم و شما زبان جلسه را انتخاب می‌کنید.",
  },
  {
    q: "بعد از ارسال درخواست چه اتفاقی می‌افتد؟",
    a: "درخواست شما مستقیم به ما می‌رسد و برای هماهنگی زمان جلسه با شما تماس می‌گیریم.",
  },
  {
    q: "آیا لازم است از قبل مدارکی آماده کنم؟",
    a: "لازم نیست از قبل چیزی آماده کنید. پس از ارسال درخواست، به شما اطلاع می‌دهیم چه اطلاعاتی برای جلسه مفید است.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
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
    },
    {
      "@type": "FAQPage",
      inLanguage: "fa",
      mainEntity: FRAGOR.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/** Pris och tid, samma block på tre ställen. */
function PrisOchTid({ mork = false }: { mork?: boolean }) {
  return (
    <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
      <p
        className={`m-0 font-heading text-[clamp(40px,7vw,64px)] leading-none ${
          mork ? "text-accent-light" : "text-accent"
        }`}
      >
        {halsokontroll.prisPersiska}
        <span className="ms-3 text-[clamp(17px,2.2vw,22px)]">کرون</span>
      </p>
      <p
        className={`m-0 pb-2 font-mono text-[13px] tracking-[.08em] ${
          mork ? "text-on-dark-muted" : "text-text-meta"
        }`}
      >
        جلسه مشاوره مالی · حدود {halsokontroll.minuterPersiska} دقیقه
      </p>
    </div>
  );
}

export default function Page() {
  const t = getDictionary("fa");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. Hjälte ───────────────────────────────────────────────────
          Resultat, tid och pris innan bilden. En besökare som kommit från en
          annons ska känna igen erbjudandet inom några sekunder, och på telefon
          är varje punkt ovanför vikningen värd mer än en bild. */}
      <section className="bg-page text-text">
        <div className="mx-auto grid max-w-[var(--content-max)] items-center gap-[clamp(28px,5vw,64px)] px-[var(--pad-x)] pt-[clamp(28px,5vw,64px)] pb-[clamp(40px,6vw,80px)] md:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="np-label mb-4 text-accent-ink">
              بررسی مالی برای صاحبان کسب‌وکار در سوئد
            </p>
            <h1 className="np-h2 mb-5 text-[length:var(--fs-h1)] leading-[1.15] text-balance">
              {rubrik.lead}{" "}
              <em className="np-gradient-text">{rubrik.accent}</em>
            </h1>
            <p className="m-0 mb-7 max-w-[54ch] font-sans text-[clamp(16px,1.5vw,19px)] leading-[1.8] text-text-muted">
              نقدینگی، فاکتورهای پرداخت‌نشده، هزینه‌ها، وضعیت مالیاتی و
              سودآوری شرکت را با یک مشاور مرور کنید و بدانید کدام موارد نیاز به
              توجه بیشتری دارند.
            </p>

            <div className="mb-7 border-t border-[rgba(23,19,16,.14)] pt-6">
              <PrisOchTid />
            </div>

            <div className="flex flex-wrap gap-[14px]">
              <BokaKnapp plats="hero" etikett={halsokontroll.cta} />
              <WhatsAppKnapp
                plats="hero"
                etikett="سؤال دارید؟ در واتساپ پیام دهید"
              />
            </div>
            {/* Formuläret har två obligatoriska fält. Påståendet är alltså
                sant, vilket är förutsättningen för att det ska få stå här. */}
            <p className="m-0 mt-4 font-sans text-[14px] text-text-meta">
              ارسال درخواست کمتر از یک دقیقه زمان می‌برد
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-[420px] flex-col items-center justify-center gap-6 rounded-media bg-ink px-10 py-[clamp(36px,7vw,64px)] shadow-[0_24px_64px_rgba(23,19,16,.18)]">
            <Image
              src="/assets/phoenix-logo.webp"
              alt="Nordic Phoenix Redovisningsbyrå"
              width={431}
              height={338}
              priority
              sizes="(max-width: 768px) 130px, 170px"
              className="h-auto w-[clamp(110px,24vw,170px)]"
            />
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="font-heading text-[clamp(18px,2.2vw,23px)] tracking-[.04em] text-on-dark">
                NORDIC PHOENIX
              </span>
              <span className="font-mono text-[11px] tracking-[.22em] text-on-dark-dim uppercase">
                Redovisningsbyrå
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Förtroenderad ────────────────────────────────────────────
          Fyra påståenden som alla går att belägga ur projektet. Ingen siffra
          på antal kunder, år i branschen eller betyg: sådant finns inte
          verifierat och får därför inte stå här. */}
      <section className="border-y border-[rgba(23,19,16,.1)] bg-surface text-text">
        <div className="mx-auto flex max-w-[var(--content-max)] flex-wrap justify-between gap-x-8 gap-y-4 px-[var(--pad-x)] py-6 font-sans text-[14px] text-text-muted">
          <span>{company.legalName}</span>
          {/* Ingen ort här. Raden ska säga att byrån täcker hela landet, och
              ett ortnamn bredvid det får en besökare från en annan del av
              Sverige att undra om tjänsten gäller hen. Postadressen står kvar
              i sidfoten, där den hör hemma. */}
          <span>سراسر سوئد</span>
          <span>فارسی، سوئدی و انگلیسی</span>
          <span dir="ltr">Org.nr {company.orgNumber}</span>
        </div>
      </section>

      {/* ── 3. Vad vi går igenom ────────────────────────────────────────── */}
      <section className="bg-page text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[clamp(48px,7vw,88px)]">
          <h2
            data-reveal
            className="np-h2 mb-[clamp(24px,3.5vw,40px)] text-[length:var(--fs-h2-sm)] leading-[1.25]"
          >
            در این {halsokontroll.minuterPersiska} دقیقه چه چیزهایی را بررسی
            می‌کنیم؟
          </h2>
          <ol className="m-0 grid list-none gap-0 p-0 sm:grid-cols-2">
            {INGAR.map((punkt, i) => (
              <li
                key={punkt}
                data-reveal
                className="flex items-baseline gap-5 border-t border-[rgba(23,19,16,.12)] py-[clamp(14px,1.8vw,20px)]"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[13px] tracking-[.1em] text-accent-ink"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-[clamp(17px,1.9vw,22px)] leading-[1.4]">
                  {punkt}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 4. Vad blir tydligare ───────────────────────────────────────
          Resultatet och inte momenten. Formuleringarna lovar klarhet, aldrig
          högre vinst eller lägre skatt: sådant kan byrån inte garantera, och
          ett löfte som spricker kostar mer än det drar in. */}
      <section className="bg-surface text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[clamp(48px,7vw,88px)]">
          <h2
            data-reveal
            className="np-h2 mb-[clamp(24px,3.5vw,44px)] text-[length:var(--fs-h2-sm)] leading-[1.25]"
          >
            بعد از این جلسه، چه چیزی برای شما روشن‌تر می‌شود؟
          </h2>
          <div className="grid gap-[clamp(16px,2vw,24px)] sm:grid-cols-2">
            {UTFALL.map((rad) => (
              <div
                key={rad.titel}
                data-reveal
                className="rounded-card border border-[rgba(23,19,16,.12)] bg-page p-[clamp(22px,2.6vw,32px)]"
              >
                <h3 className="np-h3 m-0 mb-3 text-[length:var(--fs-h3-sm)] leading-[1.3]">
                  {rad.titel}
                </h3>
                <p className="m-0 font-sans text-[15px] leading-[1.75] text-text-muted">
                  {rad.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Erbjudandet ───────────────────────────────────────────────
          Inga påhittade värdesiffror bredvid punkterna. Sådan ankring kräver
          att byrån faktiskt tar de priserna styckvis, och det gör den inte. */}
      <section className="bg-page px-[var(--pad-x)] py-[clamp(48px,7vw,88px)]">
        <div
          data-reveal
          className="mx-auto max-w-[var(--content-max)] rounded-card p-[clamp(28px,5vw,64px)]"
          style={{ background: "var(--gradient-banner)" }}
        >
          <h2 className="np-h2 mb-7 text-[length:var(--fs-h2-sm)] leading-[1.2] text-banner-ink">
            در بررسی مالی {halsokontroll.minuterPersiska} دقیقه‌ای چه چیزی
            دریافت می‌کنید؟
          </h2>

          <ul className="m-0 mb-8 grid list-none gap-x-10 gap-y-3 p-0 sm:grid-cols-2">
            {INGAR.map((punkt) => (
              <li
                key={punkt}
                className="flex items-baseline gap-3 font-sans text-[clamp(15px,1.6vw,17px)] leading-[1.6] text-banner-ink"
              >
                <span aria-hidden="true" className="font-mono text-[15px]">
                  ✓
                </span>
                {punkt}
              </li>
            ))}
          </ul>

          <div className="mb-8 flex flex-wrap items-end gap-x-8 gap-y-3 border-t border-[rgba(28,15,5,.25)] pt-7">
            <p className="m-0 font-heading text-[clamp(48px,8vw,84px)] leading-[.95] text-banner-ink">
              {halsokontroll.prisPersiska}
              <span className="ms-3 text-[clamp(17px,2.2vw,24px)]">کرون</span>
            </p>
            <p className="m-0 pb-2 font-mono text-[13px] tracking-[.08em] text-[rgba(28,15,5,.72)]">
              زمان: حدود {halsokontroll.minuterPersiska} دقیقه
            </p>
          </div>

          <BokaKnapp
            plats="erbjudande"
            etikett={halsokontroll.cta}
            klass="np-btn bg-banner-ink px-9 py-[18px] text-[16px] font-semibold text-[#F2EDE3] hover:-translate-y-[2px] hover:text-[#F2EDE3]"
          />
        </div>
      </section>

      {/* ── 6. Varför det spelar roll, och 7. tre steg ──────────────────
          Två korta avsnitt i samma sektion. Var för sig hade de blivit två
          skärmar text som säger nästan samma sak. */}
      <section className="bg-ink text-on-dark">
        <div className="mx-auto grid max-w-[var(--content-max)] gap-[clamp(32px,5vw,72px)] px-[var(--pad-x)] py-[clamp(48px,7vw,88px)] md:grid-cols-2">
          <div data-reveal>
            <h2 className="np-h2 mb-5 text-[length:var(--fs-h2-sm)] leading-[1.25]">
              چرا این بررسی مهم است؟
            </h2>
            <p className="m-0 font-sans text-[16px] leading-[1.85] text-on-dark-muted">
              وقتی درگیر کارهای روزمره هستید، ممکن است تغییرات مهم مالی
              به‌راحتی دیده نشوند. یک مرور منظم کمک می‌کند تصویر واضح‌تری از
              وضعیت شرکت داشته باشید و تصمیم‌های مالی را با اطمینان بیشتری
              بگیرید.
            </p>
          </div>
          <div data-reveal>
            <h2 className="np-h2 mb-6 text-[length:var(--fs-h2-sm)] leading-[1.25]">
              فقط سه قدم
            </h2>
            <ol className="m-0 flex list-none flex-col gap-4 p-0">
              {STEG.map((steg, i) => (
                <li key={steg} className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[12px] tracking-[.2em] text-accent-light"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[16px] leading-[1.6]">
                    {steg}
                  </span>
                </li>
              ))}
            </ol>
            <p className="m-0 mt-7 border-t border-[rgba(242,236,224,.14)] pt-5 font-sans text-[15px] leading-[1.75] text-on-dark-muted">
              <span className="text-on-dark">شروع کار ساده است.</span> لازم
              نیست از قبل چیزی آماده کنید. پس از ارسال درخواست، به شما اطلاع
              می‌دهیم چه اطلاعاتی برای جلسه مفید است.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. För vem, och 9. förtroende ──────────────────────────────── */}
      <section className="bg-surface text-text">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[clamp(48px,7vw,88px)]">
          <h2
            data-reveal
            className="np-h2 mb-5 text-[length:var(--fs-h2-sm)] leading-[1.25]"
          >
            این بررسی برای چه کسانی مناسب است؟
          </h2>
          <p
            data-reveal
            className="m-0 mb-[clamp(36px,5vw,64px)] max-w-[58ch] font-sans text-[clamp(16px,1.5vw,18px)] leading-[1.85] text-text-muted"
          >
            برای صاحبان کسب‌وکار در سوئد که می‌خواهند دید روشن‌تری از وضعیت
            مالی شرکت خود داشته باشند، چه شرکت شما Aktiebolag باشد و چه Enskild
            firma.
          </p>

          <h2 className="np-h2 mb-4 text-[length:var(--fs-h2-sm)] leading-[1.25]">
            جلسه شما با چه کسی انجام می‌شود؟
          </h2>
          <p className="m-0 mb-[clamp(28px,4vw,44px)] max-w-[58ch] font-sans text-[16px] leading-[1.85] text-text-muted">
            <span className="text-text">Ali Nahroudi</span>، بنیان‌گذار ققنوس
            شمالی و Redovisningskonsult. هر روز با دفترداری، بستن حساب‌ها،
            اظهارنامه‌های مالیاتی و تماس با ادارات برای کارآفرینان در سراسر
            سوئد کار می‌کند.
          </p>

          <Reviews t={t} />
        </div>
      </section>

      {/* ── 10. Frågor, och 11. formuläret ─────────────────────────────── */}
      <section id="boka" className="scroll-mt-[80px] bg-page text-text">
        <div className="mx-auto grid max-w-[var(--content-max)] gap-[clamp(36px,5vw,72px)] px-[var(--pad-x)] py-[clamp(48px,7vw,88px)] md:grid-cols-[.95fr_1.05fr]">
          <div>
            <h2 className="np-h2 mb-6 text-[length:var(--fs-h2-sm)] leading-[1.25]">
              سؤالات متداول
            </h2>
            <dl className="m-0">
              {FRAGOR.map((f) => (
                <div
                  key={f.q}
                  className="border-t border-[rgba(23,19,16,.12)] py-[clamp(14px,1.8vw,20px)] last:border-b"
                >
                  <dt className="mb-2 font-heading text-[17px] leading-[1.4]">
                    {f.q}
                  </dt>
                  <dd className="m-0 font-sans text-[15px] leading-[1.75] text-text-muted">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="np-h2 mb-3 text-[length:var(--fs-h2-sm)] leading-[1.25]">
              برای شروع، اطلاعات خود را وارد کنید
            </h2>
            <div className="mb-7">
              <PrisOchTid />
            </div>
            <LeadFormular />
            <div className="mt-8 flex flex-col gap-2 border-t border-[rgba(23,19,16,.12)] pt-6 font-sans text-[15px] leading-[1.8] text-text-muted">
              <a href={phone.href} className="text-text no-underline">
                <PhoneNumber />
              </a>
              <a href={email.href} className="text-text no-underline">
                {email.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. Slutlig uppmaning ──────────────────────────────────────── */}
      <section className="bg-ink text-on-dark">
        <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[clamp(48px,7vw,88px)] text-center">
          <h2 className="np-h2 mx-auto mb-8 max-w-[26ch] text-[length:var(--fs-h2-sm)] leading-[1.25] text-balance">
            {rubrik.lead} {rubrik.accent}
          </h2>
          <div className="mb-9 flex justify-center">
            <PrisOchTid mork />
          </div>
          <div className="flex flex-wrap justify-center gap-[14px]">
            <BokaKnapp plats="slut" etikett={halsokontroll.cta} />
            <WhatsAppKnapp
              plats="slut"
              klass="np-btn border border-[rgba(242,236,224,.35)] px-7 py-[16px] text-[16px] text-on-dark hover:border-on-dark hover:text-on-dark"
            />
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="h-[84px] md:hidden" />
      <FastMobilrad />
    </>
  );
}
