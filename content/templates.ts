import type { Locale } from "@/lib/i18n";

/**
 * Nedladdningsbara mallar och blanketter.
 *
 * Sidan finns för att den är den sortens innehåll som andra länkar till och
 * som AI-översikter citerar: konkret, avgränsat och direkt användbart. En
 * företagare som söker "körjournal mall" vill ha filen, inte en säljtext.
 *
 * Posterna är av två slag, och skillnaden är medveten:
 *
 * `egen` är material Nordic Phoenix själv har tagit fram. Det ligger som fil
 * hos oss och laddas ner direkt.
 *
 * `officiell` är blanketter som ges ut av en myndighet eller a-kassa. De
 * ligger INTE hos oss, utan länkas hos utgivaren. Skälet är att en officiell
 * blankett har en version, och versionen byts utan förvarning. En kopia som
 * ligger på byråns sajt blir tyst inaktuell, och den företagare som skickar
 * in en gammal version till Skatteverket eller a-kassan får den i retur.
 * Det första underlaget till den här sidan var ett arbetsgivarintyg från
 * 2010, alltså precis det problemet i praktiken.
 */

export type Filformat = "PDF" | "XLSX" | "DOCX";

type Bas = {
  slug: string;
};

export type EgenMall = Bas & {
  sort: "egen";
  /** Filnamnet i `public/mallar/`. */
  fil: string;
  format: Filformat;
  /** Storleken i kilobyte, så besökaren vet vad som laddas ner. */
  kb: number;
};

export type OfficiellBlankett = Bas & {
  sort: "officiell";
  /** Utgivarens egen sida för blanketten. Alltid aktuell version. */
  url: string;
  utgivare: string;
  utgivareUrl: string;
  /** Blankettens beteckning hos utgivaren, t.ex. "SKV 4809". */
  beteckning?: string;
};

export type Mall = EgenMall | OfficiellBlankett;

export const mallar: Mall[] = [
  /* Byråns egna mallar först. De är sidans egentliga värde: de finns inte
     någon annanstans, medan de officiella blanketterna finns hos utgivaren.
     Genereras av `scripts/mallar.mjs`, så storlekarna nedan ska uppdateras
     om en mall byggs om. */
  {
    sort: "egen",
    slug: "kvitto",
    fil: "kvitto.pdf",
    format: "PDF",
    kb: 74,
  },
  {
    sort: "egen",
    slug: "kundfaktura",
    fil: "kundfaktura.pdf",
    format: "PDF",
    kb: 71,
  },
  {
    sort: "egen",
    slug: "tidrapport",
    fil: "tidrapport.pdf",
    format: "PDF",
    kb: 69,
  },
  {
    sort: "egen",
    slug: "anstallningsavtal",
    fil: "anstallningsavtal.pdf",
    format: "PDF",
    kb: 70,
  },
  {
    sort: "egen",
    slug: "aktiebok",
    fil: "aktiebok.pdf",
    format: "PDF",
    kb: 67,
  },
  {
    sort: "officiell",
    slug: "arbetsgivarintyg",
    url: "https://www.sverigesakassor.se/sv/arbetsgivarintyg",
    utgivare: "Sveriges a-kassor",
    utgivareUrl: "https://www.sverigesakassor.se/",
  },
  {
    sort: "officiell",
    slug: "deklarationsombud",
    url: "https://www.skatteverket.se/privat/etjansterochblanketter/blanketterbroschyrer/blanketter/info/4809.4.39f16f103821c58f680006732.html",
    utgivare: "Skatteverket",
    utgivareUrl: "https://www.skatteverket.se/",
    beteckning: "SKV 4809",
  },
];

type MallText = { titel: string; beskrivning: string };

/**
 * Texterna per språk, med slug som nyckel.
 *
 * Namnen på svenska blanketter översätts inte. En persisktalande företagare
 * som ska lämna ett arbetsgivarintyg till a-kassan behöver känna igen ordet
 * när det dyker upp i myndighetens brev, så det svenska namnet står kvar och
 * förklaringen är på besökarens språk.
 */
const texter: Record<Locale, Record<string, MallText>> = {
  sv: {
    kvitto: {
      titel: "Kvitto att fylla i för hand",
      beskrivning:
        "För dig som säljer utan kassaregister. Kvittot har plats för säljarens uppgifter, specifikation, momssats och kvittering. Tänk på att ett certifierat kassaregister som huvudregel krävs vid kontant- och kortförsäljning, och att mallen är till för dig som omfattas av ett undantag.",
    },
    kundfaktura: {
      titel: "Kundfaktura",
      beskrivning:
        "En faktura med alla uppgifter mervärdesskattelagen kräver: löpnummer, momsregistreringsnummer, säljarens och köparens uppgifter, leveransdatum, beskattningsunderlag per skattesats och momsbelopp.",
    },
    tidrapport: {
      titel: "Tidrapport",
      beskrivning:
        "En rad per dag i månaden med tid in, tid ut, rast, arbetade timmar och övertid. Underlag för löneberäkningen. Observera att detta inte är en personalliggare, som krävs i vissa branscher och har egna regler hos Skatteverket.",
    },
    anstallningsavtal: {
      titel: "Anställningsavtal",
      beskrivning:
        "Ett skriftligt avtal med de uppgifter arbetsgivaren enligt lagen om anställningsskydd är skyldig att lämna: anställningsform, tillträdesdag, arbetstid, lön, uppsägningstid, semester och kollektivavtal. Upprättas i två exemplar.",
    },
    aktiebok: {
      titel: "Aktiebok",
      beskrivning:
        "Varje aktiebolag måste ha en aktiebok. Mallen följer aktiebolagslagens krav med aktiernas löpnummer och aktieslag samt ägarnas namn, person- eller organisationsnummer, adress och datum för införing.",
    },
    arbetsgivarintyg: {
      titel: "Arbetsgivarintyg",
      beskrivning:
        "Intyget din anställda behöver från dig för att kunna söka ersättning från a-kassan. Blanketten fastställs av IAF tillsammans med a-kassorna. Enklast fyller du i den digitalt på arbetsgivarintyg.nu, men pappersblanketten finns också.",
    },
    deklarationsombud: {
      titel: "Ansökan om deklarationsombud",
      beskrivning:
        "Blanketten du använder för att ge oss behörighet att deklarera moms och arbetsgivardeklarationer åt ditt företag. Ombudet måste vara en fysisk person med svenskt personnummer och e-legitimation.",
    },
  },
  en: {
    kvitto: {
      titel: "Handwritten receipt",
      beskrivning:
        "For selling without a cash register. Room for the seller's details, the items, the VAT rate and a signature. Note that a certified cash register is the general rule for cash and card sales in Sweden, and that this template is for those covered by an exemption.",
    },
    kundfaktura: {
      titel: "Sales invoice",
      beskrivning:
        "An invoice carrying every detail Swedish VAT law requires: a sequential number, the VAT registration number, seller and buyer details, delivery date, the taxable amount per rate and the VAT amount.",
    },
    tidrapport: {
      titel: "Timesheet",
      beskrivning:
        "One row per day of the month with clock-in, clock-out, break, hours worked and overtime. The basis for the payroll run. Note that this is not a personalliggare, the staff ledger required in certain Swedish industries under separate rules.",
    },
    anstallningsavtal: {
      titel: "Employment contract",
      beskrivning:
        "A written contract covering the information a Swedish employer is obliged to provide under the Employment Protection Act: type of employment, start date, working hours, pay, notice periods, holiday and any collective agreement. Signed in two copies.",
    },
    aktiebok: {
      titel: "Share register (aktiebok)",
      beskrivning:
        "Every Swedish limited company must keep a share register. The template follows the Companies Act, with the sequential numbers and class of the shares and each owner's name, identity number, address and date of entry.",
    },
    arbetsgivarintyg: {
      titel: "Arbetsgivarintyg (certificate of employment)",
      beskrivning:
        "The certificate your employee needs from you in order to claim unemployment benefit from a Swedish a-kassa. The form is set by IAF together with the unemployment funds. The easiest route is filling it in digitally at arbetsgivarintyg.nu, but the paper form is available too.",
    },
    deklarationsombud: {
      titel: "Application for a tax filing representative",
      beskrivning:
        "The form that authorises us to file VAT and employer declarations on behalf of your company. The representative must be a natural person with a Swedish personal identity number and e-ID.",
    },
  },
  fa: {
    kvitto: {
      titel: "رسید دستی",
      beskrivning:
        "برای فروش بدون صندوق فروش دیجیتال. جا برای مشخصات فروشنده، شرح کالا یا خدمات، نرخ مالیات و امضا دارد. توجه کنید که در فروش نقدی و کارتی، داشتن صندوق فروش تأییدشده قاعده اصلی است و این قالب برای کسانی است که مشمول استثنا هستند.",
    },
    kundfaktura: {
      titel: "فاکتور فروش",
      beskrivning:
        "فاکتوری با تمام اطلاعاتی که قانون مالیات بر ارزش افزوده لازم می‌داند: شماره سریال، شماره ثبت مالیات بر ارزش افزوده، مشخصات فروشنده و خریدار، تاریخ تحویل، مبنای مالیات به تفکیک نرخ و مبلغ مالیات.",
    },
    tidrapport: {
      titel: "گزارش ساعات کاری",
      beskrivning:
        "یک ردیف برای هر روز ماه با ساعت ورود، ساعت خروج، استراحت، ساعات کارکرد و اضافه‌کاری. مبنای محاسبه حقوق است. توجه کنید که این قالب personalliggare نیست؛ آن دفتر حضور کارکنان است که در برخی صنایع الزامی است و قوانین جداگانه‌ای دارد.",
    },
    anstallningsavtal: {
      titel: "قرارداد کار",
      beskrivning:
        "قرارداد کتبی با اطلاعاتی که کارفرما بر اساس قانون حمایت از اشتغال موظف به ارائه آن است: نوع استخدام، تاریخ شروع، ساعات کار، حقوق، مهلت اخطار پایان کار، مرخصی و قرارداد جمعی در صورت وجود. در دو نسخه تنظیم می‌شود.",
    },
    aktiebok: {
      titel: "Aktiebok (دفتر سهام)",
      beskrivning:
        "هر شرکت سهامی در سوئد باید دفتر سهام داشته باشد. این قالب مطابق قانون شرکت‌های سهامی است و شماره سریال و نوع سهام و همچنین نام مالک، شماره ملی یا شماره ثبت، نشانی و تاریخ ثبت را در بر می‌گیرد.",
    },
    arbetsgivarintyg: {
      titel: "Arbetsgivarintyg (گواهی کارفرما)",
      beskrivning:
        "گواهی‌ای که کارمند شما برای دریافت مقرری بیمه بیکاری از صندوق a-kassa به آن نیاز دارد. این فرم توسط IAF همراه با صندوق‌های بیمه بیکاری تعیین می‌شود. ساده‌ترین راه، تکمیل دیجیتال آن در arbetsgivarintyg.nu است، اما نسخه کاغذی هم موجود است.",
    },
    deklarationsombud: {
      titel: "درخواست نماینده اظهارنامه مالیاتی",
      beskrivning:
        "فرمی که با آن به ما اجازه می‌دهید اظهارنامه مالیات بر ارزش افزوده و اظهارنامه کارفرما را از طرف شرکت شما ارسال کنیم. نماینده باید شخص حقیقی با شماره ملی سوئدی و شناسه الکترونیکی باشد.",
    },
  },
};

export function getMallText(locale: Locale, slug: string): MallText {
  /* Faller tillbaka på svenskan om en mall lagts till utan översättning.
     Alternativet vore en tom rubrik, vilket ser ut som ett trasigt kort. */
  return texter[locale][slug] ?? texter.sv[slug];
}

/** Adressen knappen pekar på, oavsett vilket slag posten är av. */
export function mallUrl(mall: Mall): string {
  return mall.sort === "egen" ? `/mallar/${mall.fil}` : mall.url;
}
