import type { Article } from "@/content/blog";

/**
 * Guider skrivna direkt på persiska, utan klipp.
 *
 * Skälet till att de finns: Search Console visade i november 2026 att
 * "ثبت شرکت در سوئد" var den enda persiska frasen med synlig volym, och
 * sajten låg sexa på den med en tjänstesida. De fem före var fullständiga
 * guider. En tjänstesida svarar på "vad kan ni göra åt mig", en guide på
 * "hur går det till", och det är den andra frågan sökningen ställer.
 *
 * De finns bara på persiska, av samma skäl som klippartiklarna: frågan
 * ställs på persiska. En svensk läsare har redan Bolagsverkets egna sidor.
 * Se `endastSprak` i blog.ts.
 *
 * Sakuppgifterna är hämtade från Bolagsverket och Migrationsverket den
 * 16 november 2026, och varje sida i källistan är läst, inte bara
 * statuskontrollerad. Avgifterna ändras: kontrollera dem mot Bolagsverkets
 * avgiftssidor innan texten uppdateras.
 *
 * Texten är skriven av byrån men inte granskad av en modersmålstalare vid
 * publiceringen. [FRÅGA ERFAN: Ali bör läsa igenom persiskan.]
 */
export const persiskaGuider: Article[] = [
  {
    slug: "sabt-sherkat-dar-sweden",
    endastSprak: "fa",
    tag: "ثبت شرکت",
    date: "نوامبر ۲۰۲۶",
    published: "2026-11-16",
    readingMinutes: 7,
    title: "ثبت شرکت در سوئد: شرایط، مراحل و هزینه‌ها",
    titleLead: "ثبت شرکت در سوئد:",
    titleAccent: "شرایط، مراحل و هزینه‌ها",
    excerpt:
      "راهنمای گام‌به‌گام ثبت شرکت در سوئد به زبان فارسی: انتخاب بین enskild firma و aktiebolag، مراحل ثبت نزد Bolagsverket، هزینه‌ها و شرایط کسانی که خارج از سوئد زندگی می‌کنند.",
    intro:
      "برای ثبت شرکت در سوئد لازم نیست حقوق‌دان باشید، اما باید بدانید کدام نوع شرکت را انتخاب می‌کنید، چه مدارکی لازم است و هزینه‌ها چقدر است. این راهنما مراحل را به همان ترتیبی توضیح می‌دهد که در عمل انجام می‌شوند. همه ارقام از سایت Bolagsverket در نوامبر ۲۰۲۶ گرفته شده‌اند.",
    imageAlt: "ثبت شرکت در سوئد، مراحل و هزینه‌ها",
    metaTitle: "ثبت شرکت در سوئد: شرایط، مراحل و هزینه‌ها | Nordic Phoenix",
    metaDescription:
      "راهنمای گام‌به‌گام ثبت شرکت در سوئد به فارسی: enskild firma یا aktiebolag، مراحل ثبت در Bolagsverket، هزینه‌ها، حداقل سرمایه و شرایط افراد مقیم خارج از سوئد.",
    blocks: [
      { type: "heading", text: "اول از همه: ثبت شرکت با اقامت یکی نیست" },
      {
        type: "paragraph",
        text: "خیلی‌ها این دو موضوع را با هم اشتباه می‌گیرند. ثبت شرکت کار Bolagsverket و Skatteverket است و به خودیِ خود اجازه اقامت یا کار در سوئد نمی‌دهد. اجازه اقامت برای کسی که می‌خواهد شرکت خودش را اداره کند موضوع جداگانه‌ای است که Migrationsverket درباره آن تصمیم می‌گیرد و شرایط خودش را دارد.",
      },
      {
        type: "paragraph",
        text: "ما دفتر حسابداری هستیم و مشاور مهاجرت نیستیم. این راهنما درباره خودِ ثبت شرکت است. اگر سؤال شما درباره اقامت است، منبع درست سایت Migrationsverket است که لینک آن در پایان همین صفحه آمده.",
      },

      { type: "heading", text: "کدام نوع شرکت: enskild firma یا aktiebolag؟" },
      {
        type: "paragraph",
        text: "بیشتر کسب‌وکارهای کوچک در سوئد یکی از این دو شکل را دارند. انتخاب بین آن‌ها روی مالیات، مسئولیت شخصی شما و حجم کارهای اداری اثر می‌گذارد، پس بهتر است قبل از ثبت درباره‌اش فکر کنید و نه بعد از آن.",
      },
      {
        type: "callout",
        label: "مقایسه کوتاه",
        columns: [
          {
            title: "Enskild firma",
            text: "شما و شرکت از نظر قانونی یک شخص هستید. به سرمایه اولیه نیاز ندارد و شروع آن ساده است. در مقابل، با دارایی شخصی خودتان مسئول بدهی‌های شرکت هستید.",
          },
          {
            title: "Aktiebolag (AB)",
            accent: true,
            text: "شرکت یک شخص حقوقی جداست. حداقل ۲۵٬۰۰۰ کرون سرمایه (aktiekapital) لازم دارد و مسئولیت شخصی شما محدود است. در مقابل، حسابداری و گزارش‌دهی بیشتری می‌خواهد و هر سال باید årsredovisning بدهد.",
          },
        ],
      },

      { type: "heading", text: "مراحل ثبت aktiebolag" },
      {
        type: "paragraph",
        text: "طبق Bolagsverket ثبت یک aktiebolag هشت مرحله دارد. کسی که شرکت را تأسیس می‌کند stiftare نامیده می‌شود. او باید حداقل ۱۸ سال داشته باشد و نباید ورشکسته باشد، قیم (förvaltare) داشته باشد یا ممنوعیت فعالیت تجاری (näringsförbud) داشته باشد.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "تصمیم به تأسیس و تهیه دو سند: stiftelseurkund (سند تأسیس) و bolagsordning (اساسنامه). نام شرکت و موضوع فعالیت در اساسنامه نوشته می‌شود.",
          "تعهد و پرداخت سهام. سرمایه را به یک حساب مخصوص در بانک واریز می‌کنید. برای aktiebolag خصوصی حداقل ۲۵٬۰۰۰ کرون لازم است.",
          "گرفتن bankintyg از بانک. این گواهی باید به زبان سوئدی باشد و نشان دهد سرمایه واریز شده است.",
          "امضای stiftelseurkund.",
          "تهیه aktiebok، یعنی دفتر ثبت سهام‌داران.",
          "ارسال درخواست ثبت و پرداخت هزینه به Bolagsverket. این کار در سرویس اینترنتی verksamt.se انجام می‌شود.",
          "Bolagsverket شرکت را ثبت می‌کند و شماره ثبت (organisationsnummer) می‌دهد.",
          "اعلام verklig huvudman، یعنی شخص یا اشخاصی که در نهایت مالک یا کنترل‌کننده شرکت هستند.",
        ],
      },
      {
        type: "paragraph",
        text: "یک نکته درباره هیئت‌مدیره: اگر هیئت‌مدیره (styrelse) کمتر از سه عضو داشته باشد، باید حداقل یک عضو علی‌البدل (suppleant) هم معرفی شود. به همین دلیل شرکت‌های تک‌نفره معمولاً یک عضو اصلی و یک suppleant دارند.",
      },

      { type: "heading", text: "مراحل ثبت enskild firma" },
      {
        type: "paragraph",
        text: "ثبت enskild firma ساده‌تر است و به سرمایه اولیه نیاز ندارد. درخواست را در verksamt.se ثبت می‌کنید و در همان‌جا می‌توانید هم‌زمان برای F-skatt، ثبت moms و ثبت به عنوان کارفرما نزد Skatteverket اقدام کنید.",
      },
      {
        type: "list",
        items: [
          "تأیید F-skatt از Skatteverket لازم است. بدون آن مشتری شما باید از صورت‌حسابتان مالیات کسر کند.",
          "ثبت نام شرکت نزد Bolagsverket اختیاری است. اگر بخواهید نامی غیر از نام و نام خانوادگی خودتان داشته باشید، باید آن را ثبت کنید. در این صورت نام در همان استانی که ثبت کرده‌اید محافظت می‌شود.",
          "به گفته Bolagsverket زمان رسیدگی متغیر است، اما بیشتر وقت‌ها یک تا دو هفته طول می‌کشد.",
        ],
      },

      { type: "heading", text: "هزینه‌های ثبت" },
      {
        type: "paragraph",
        text: "این‌ها هزینه‌های Bolagsverket در نوامبر ۲۰۲۶ هستند. همه مبالغ به کرون سوئد است و مالیات بر ارزش افزوده ندارد. ثبت اینترنتی ارزان‌تر از فرم کاغذی است.",
      },
      {
        type: "list",
        items: [
          "ثبت aktiebolag: ۲٬۴۰۰ کرون از طریق سرویس اینترنتی، ۲٬۷۰۰ کرون با فرم کاغذی.",
          "ثبت enskild firma نزد Bolagsverket: ۱٬۸۰۰ کرون از طریق سرویس اینترنتی، ۲٬۱۰۰ کرون با فرم کاغذی.",
          "سرمایه aktiebolag: حداقل ۲۵٬۰۰۰ کرون.",
        ],
      },
      {
        type: "paragraph",
        text: "سرمایه ۲۵٬۰۰۰ کرونی هزینه نیست. این پول از بین نمی‌رود و بعد از ثبت، متعلق به شرکت است و می‌تواند برای فعالیت شرکت استفاده شود. آنچه واقعاً خرج می‌شود هزینه ثبت است.",
      },

      { type: "heading", text: "اگر خارج از سوئد زندگی می‌کنید" },
      {
        type: "paragraph",
        text: "برای ثبت شرکت در سوئد لازم نیست ساکن سوئد باشید، اما برای aktiebolag قانون شرایطی درباره محل زندگی مدیران دارد. طبق قاعده اصلی، حداقل نیمی از اعضای هیئت‌مدیره، حداقل نیمی از اعضای علی‌البدل و مدیرعامل (verkställande direktör) باید در منطقه اقتصادی اروپا (EES) ساکن باشند. اگر شرکت این شرط را نداشته باشد، می‌توان از Bolagsverket درخواست معافیت (dispens) کرد.",
      },
      {
        type: "paragraph",
        text: "علاوه بر این، اگر شرکت هیچ نماینده مجازی نداشته باشد که در سوئد ساکن باشد، باید یک delgivningsmottagare معرفی کند. این شخص کسی است که نامه‌ها و ابلاغ‌های رسمی را از طرف شرکت دریافت می‌کند. او باید حداقل ۱۸ سال داشته باشد و در سوئد ثبت اقامت (folkbokförd) باشد. توجه کنید که در این قانون فقط کسی ساکن سوئد حساب می‌شود که در سوئد folkbokförd باشد.",
      },
      {
        type: "paragraph",
        text: "سرویس اینترنتی verksamt.se به هویت الکترونیکی سوئدی مثل BankID نیاز دارد. کسی که آن را ندارد می‌تواند با فرم کاغذی اقدام کند که کمی گران‌تر است.",
      },

      { type: "heading", text: "بعد از ثبت چه باید کرد؟" },
      {
        type: "list",
        items: [
          "ثبت نزد Skatteverket برای F-skatt و moms، و اگر کارمند دارید ثبت به عنوان کارفرما.",
          "باز کردن حساب بانکی شرکت. بانک‌ها بررسی‌های خودشان را دارند و این مرحله ممکن است زمان ببرد، پس آن را زود شروع کنید.",
          "شروع حسابداری از روز اول. وظیفه ثبت حساب‌ها از روز شروع فعالیت آغاز می‌شود، حتی اگر هنوز درآمدی نداشته باشید.",
          "بررسی اینکه رشته کاری شما مجوز یا شرایط ویژه‌ای دارد یا نه. برای مثال رستوران‌ها به kassaregister تأییدشده و personalliggare نیاز دارند.",
        ],
      },

      { type: "heading", text: "اشتباه‌های رایج" },
      {
        type: "list",
        items: [
          "انتخاب نوع شرکت بدون محاسبه. تغییر از enskild firma به aktiebolag ممکن است، اما کار و هزینه دارد.",
          "شروع کار قبل از گرفتن F-skatt.",
          "قاطی کردن پول شخصی و پول شرکت. در aktiebolag برداشت شخصی از حساب شرکت می‌تواند وام ممنوع (förbjudet lån) حساب شود.",
          "نگه نداشتن رسیدها و صورت‌حساب‌ها از همان روز اول.",
          "تصور اینکه ثبت شرکت به معنی گرفتن اقامت است.",
        ],
      },
    ],
    checklist: [
      "نوع شرکت را بر اساس درآمد، ریسک و برنامه‌تان انتخاب کنید.",
      "برای aktiebolag سند تأسیس و اساسنامه را آماده کنید.",
      "سرمایه را واریز کنید و bankintyg بگیرید.",
      "درخواست را در verksamt.se ثبت و هزینه را پرداخت کنید.",
      "برای F-skatt و moms نزد Skatteverket اقدام کنید.",
      "حساب بانکی شرکت را باز کنید و حسابداری را از روز اول شروع کنید.",
    ],
    faq: [
      {
        q: "آیا با ثبت شرکت در سوئد اقامت می‌گیرم؟",
        a: "خیر. ثبت شرکت به خودیِ خود اجازه اقامت یا کار نمی‌دهد. اجازه اقامت برای اداره شرکت شخصی را Migrationsverket بررسی می‌کند و شرایط جداگانه‌ای دارد.",
      },
      {
        q: "حداقل سرمایه برای ثبت شرکت در سوئد چقدر است؟",
        a: "برای aktiebolag خصوصی حداقل ۲۵٬۰۰۰ کرون سرمایه لازم است. enskild firma به سرمایه اولیه نیاز ندارد.",
      },
      {
        q: "هزینه ثبت شرکت در سوئد چقدر است؟",
        a: "طبق Bolagsverket در نوامبر ۲۰۲۶، ثبت aktiebolag از طریق سرویس اینترنتی ۲٬۴۰۰ کرون و با فرم کاغذی ۲٬۷۰۰ کرون است. ثبت enskild firma نزد Bolagsverket ۱٬۸۰۰ کرون اینترنتی و ۲٬۱۰۰ کرون با فرم کاغذی است.",
      },
      {
        q: "آیا می‌توانم از خارج از سوئد شرکت ثبت کنم؟",
        a: "بله، اما برای aktiebolag باید شرایط محل زندگی مدیران رعایت شود: طبق قاعده اصلی حداقل نیمی از اعضای هیئت‌مدیره و مدیرعامل باید در منطقه اقتصادی اروپا ساکن باشند، وگرنه باید درخواست معافیت کرد. اگر هیچ نماینده مجازی در سوئد ساکن نباشد، معرفی یک delgivningsmottagare ساکن سوئد هم لازم است.",
      },
      {
        q: "ثبت شرکت چقدر طول می‌کشد؟",
        a: "زمان رسیدگی Bolagsverket متغیر است. برای enskild firma به گفته خودشان بیشتر وقت‌ها یک تا دو هفته طول می‌کشد. اگر مدارک کامل نباشد، Bolagsverket درخواست تکمیل می‌کند و زمان بیشتر می‌شود.",
      },
      {
        q: "آیا شرکت من به revisor نیاز دارد؟",
        a: "شرکت‌های کوچک معمولاً می‌توانند بدون revisor باشند. آنچه در عمل لازم دارید حسابداری جاری، moms، حقوق و دستمزد، bokslut و اظهارنامه است که کار دفتر حسابداری است.",
      },
    ],
    cta: "می‌خواهید قبل از ثبت، هر دو نوع شرکت را با اعداد خودتان مقایسه کنید؟ به فارسی با ما صحبت کنید. گفت‌وگوی اول رایگان است.",
    kallor: [
      {
        titel: "Bolagsverket, Starta aktiebolag",
        url: "https://bolagsverket.se/foretag/aktiebolag/startaaktiebolag.479.html",
      },
      {
        titel: "Bolagsverket, Avgifter för aktiebolag",
        url: "https://bolagsverket.se/sjalvservice/avgifter/avgifterforaktiebolag.4358.html",
      },
      {
        titel: "Bolagsverket, Starta enskild näringsverksamhet",
        url: "https://bolagsverket.se/foretag/enskildnaringsverksamhet/startaenskildnaringsverksamhet",
      },
      {
        titel: "Bolagsverket, Avgifter för enskild näringsverksamhet",
        url: "https://bolagsverket.se/sjalvservice/avgifter/avgifterforenskildnaringsverksamhet.4360.html",
      },
      {
        titel:
          "Bolagsverket, Krav på bosättning för styrelsen i ett aktiebolag",
        url: "https://bolagsverket.se/foretag/aktiebolag/startaaktiebolag/styrelseochverkstallandedirektoriaktiebolag/kravpabosattningforstyrelseniettaktiebolag.509.html",
      },
      {
        titel: "Bolagsverket, Delgivningsmottagare",
        url: "https://bolagsverket.se/foretag/aktiebolag/startaaktiebolag/styrelseochverkstallandedirektoriaktiebolag/delgivningsmottagare.517.html",
      },
      {
        titel: "Migrationsverket, Uppehållstillstånd för egen företagare",
        url: "https://www.migrationsverket.se/du-vill-ansoka/arbeta/anstalld-eller-egen-foretagare/egen-foretagare.html",
      },
    ],
  },
];
