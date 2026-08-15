# Nordic Phoenix Redovisningsbyrå — publik webbplats

Marketingsajt för Nordic Phoenix Redovisningsbyrå AB. Trespråkig (svenska,
engelska, persiska) leadgenereringssajt utan backend: all leadfångst sker i
GoHighLevel-widgeten, WhatsApp och telefon.

Byggd från designunderlaget i `Nordic Phoenix Redovisningsbyrå.zip`
(design_handoff_nordic_phoenix_site). Underlaget var HTML-prototyper med
inline-styles; de är återskapade här, inte kopierade.

## Stack

- Next.js 16 (App Router) med `output: "export"` — sajten byggs till statiska
  filer i `out/` och behöver ingen server.
- React 19, TypeScript, Tailwind CSS v4.
- `next/font` självhostar Google-fonterna (prestanda + GDPR).

## Kom igång

```bash
npm install
npm run dev
```

```bash
npm run build
```

Bygget lägger den färdiga sajten i `out/`.

## Struktur

| Katalog | Innehåll |
|---|---|
| `app/(sv)/` | Rotlayout och rutter för svenska, som ligger på `/` |
| `app/[locale]/` | Rotlayout och rutter för `/en` och `/fa` |
| `components/home/` | Startsidans sektioner, en fil per sektion |
| `components/layout/` | Header, footer, fenix, flytande widget, rörelselager |
| `components/pages/` | Sidkompositioner som delas mellan språkrutterna |
| `content/locales/` | Kompletta ordlistor sv/en/fa |
| `content/site.ts` | Företagsuppgifter, kontaktvägar, integrationer |
| `content/blog.ts` | Bloggartiklar och planerade artiklar |
| `lib/` | i18n, metadata/JSON-LD, rörelsehjälpare, typsnitt |

Två rotlayouter används medvetet: svenska och de prefixade språken behöver
olika `lang`/`dir` på `<html>`, och `/` ska inte vara `/sv`.

## Språk

- `/` svenska · `/en` engelska · `/fa` persiska (RTL)
- Språkknappen i navigeringen cyklar sv → en → fa → sv och behåller sidan.
- Persiska tvingar Noto Naskh Arabic och nollställer `letter-spacing` — annars
  bryts den arabiska skriften.
- Bloggen finns bara på svenska. Artiklarna är svenskspråkigt SEO-innehåll och
  det finns inga översättningar att peka på, så nav-länken går alltid till
  `/blogg`.

## Tjänstesidor

`/tjanster/[tjanst]` med en sida per tjänstegrupp, plus en översikt på
`/tjanster`. Innehållet ligger i `content/services.ts`.

Tre regler gäller när en tjänst läggs till eller skrivs om:

- **`name` ska vara exakt gruppens `title`** i den svenska ordlistan.
  Startsidans tjänstekort kopplas till rätt sida via ordningen i listan, precis
  som stadsnamnen i Sverige-sektionen, och en avvikelse ger tyst fel länk.
- **`details` ska täcka gruppens punkter, i samma ordning.** Punkten på kortet
  är löftet, sidan är utförandet. `npx tsx` mot `content/services.ts` och
  ordlistan visar avvikelser direkt.
- **Sakuppgifter ska hålla över tid.** Belopp och datum som ändras varje år
  skrivs som beroende av bolagets förutsättningar i stället för som ett fast
  tal, annars blir sidan felaktig utan att någon märker det.

Varje sida har Service med `hasOfferCatalog`, FAQPage och BreadcrumbList, samt
ankarlänkar till varje punkt. Nuvarande uppsättning ligger på 8 200 tecken som
lägst och 38% ordöverlapp som mest.

### Översättning

Tjänstesidorna finns på alla tre språk. Svenskan står i `content/services.ts`,
översättningarna i `content/services.en.ts` och `content/services.fa.ts` som
uppslag på slug. `content/service-copy.ts` väljer rätt och **faller tillbaka
på svenskan** om en nyckel saknas. Det gör att en tjänst kan läggas till på
svenska och översättas senare utan att bygget går sönder, men innebär också
att en glömd översättning inte syns som ett fel. `saknadeOversattningar()`
finns för att fånga just det.

URL:en är samma slug på alla språk: `/tjanster/bokslut-och-arsredovisning`,
`/en/tjanster/...`, `/fa/tjanster/...`. Slugarna är svenska även i de
översatta versionerna, eftersom en översatt slug hade brutit alla befintliga
länkar och gjort hreflang svårare att hålla ihop.

Myndighetsnamn och regelverk översätts inte: Skatteverket, Bolagsverket,
F-skatt, K2, K3, K10, BAS och Peppol står kvar med latinska bokstäver även i
persiskan. Läsaren ska kunna känna igen namnet på blanketten.

Telefonnumret renderas genom `components/ui/PhoneNumber.tsx`, som sätter
`dir="ltr"`. Utan det vänder bidi-algoritmen sifferblocken i persiskan, så
072-008 40 00 visas som 00 40 008-072.

## Ortssidor

`/redovisningsbyra/[stad]` med en sida per ort i Sverige-sektionen, plus en
översikt på `/redovisningsbyra`. Innehållet ligger i `content/locations.ts`.

Två regler gäller när nya orter läggs till:

- **Ingen påhittad lokal närvaro.** Byrån sitter i Sollentuna och arbetar
  digitalt. Ingen text får antyda kontor eller besöksadress på orten. Schemat
  använder `Service` med `areaServed` och `provider` med den riktiga adressen,
  aldrig `LocalBusiness` med lokal adress.
- **Varje sida ska stå på egna ben.** Vinkeln utgår från ortens faktiska
  näringsliv och FAQ:n ska innehålla frågor som bara är relevanta där. Sidor
  som bara byter ortsnamn är doorway pages och skadar sajten.

Riktvärde vid granskning: minst ~1 500 tecken ortsspecifik text per sida och
högst ~40% ordöverlapp mot någon annan ortssida. Mät överlappet på den
renderade prosan med de ord som finns på alla sidor borträknade, annars mäter
du sidmallen och inte innehållet. Nuvarande uppsättning ligger på 2 484 tecken
som lägst och 39% som mest (Uppsala mot Lund), median 17%.

`partOf` gör en post till en områdessida under en ort. 13 områden ligger under
Stockholm, från Kista till Skärholmen. URL:erna är platta oavsett, alltså
`/redovisningsbyra/solna` och inte `/redovisningsbyra/stockholm/solna`: Solna
och Södertälje är egna kommuner och en påhittad hierarki hade gett längre
URL:er utan vinst.

Områdessidorna har medvetet ingen knapp på startsidan, men de är länkade från
Stockholmssidan och från `/redovisningsbyra`. Utan interna länkar blir de
föräldralösa, och en sida som bara finns i sitemapen rankar dåligt.

### Översättning och indexering

Kundens största målgrupp är persisktalande företagare i Sverige, så samtliga
26 ortssidor finns på persiska. Översättningarna ligger i
`content/locations.fa.ts`. Engelska finns inte, och ska inte läggas till utan
att någon först visar att sökefterfrågan finns.

**Här finns ingen reserv till svenskan, till skillnad från tjänsterna.** En
ortssida under `/fa` som visar svensk text är en dubblett av den svenska sidan,
och Google har inget sätt att se att det är ett misstag. Därför gäller:

- `generateStaticParams` genererar bara orter som faktiskt är översatta. Saknas
  översättningen finns ingen URL att indexera fel.
- hreflang listar bara de språk orten finns på. En ort utan persisk version får
  `sv-SE` och `x-default`, inget mer.
- Sitemapen har en post per språk orten finns på, med samma uppsättning i
  `alternates`. Kontrollen `URL:er i sitemap utan fil` ska ge noll.
- Grannortslänkar och områdeslistor filtreras på samma villkor, så ingen länk
  går till en sida som inte genererats.
- Ortsöversikten `/fa/redovisningsbyra` genereras bara för språk som har minst
  en översatt ort, annars vore sidan tom.

Språkväxlaren gissar inte längre vad som är översatt. Den läser sidans egna
`<link rel="alternate" hreflang>` och kan därför aldrig hamna i otakt. Saknas
taggen för målspråket går den till språkets startsida.

## Bevarad URL från den gamla sajten

`/persisk-redovisningsbyra-stockholm` är den enda undersida som fanns på den
tidigare sajten, och den rankar på persiska sökord: حسابدار ایرانی,
حسابدار فارسی‌زبان, persisk redovisningsbyrå i Stockholm. URL:en är därför
oförändrad och sidan ligger på roten utan `/fa`-prefix, precis som förut.

En omdirigering till `/fa` hade spätt ut länkvärdet och tappat sökordet som
ligger i själva sökvägen. Flytta den inte utan att först kontrollera i Search
Console vad den drar in.

Sidan bär också en tjänst som inte nämns någon annanstans på sajten:
affärsplan och طرح توجیهی för Migrationsverket, banker och Arbetsförmedlingen.

`public/_redirects` skickar www till apex, annars blir www en egen kopia av
hela sajten i Googles ögon.

## Textregler

Gäller all kundvänd text, i alla tre språk:

- **Inga tankstreck (—).** Kunden upplever dem som ett AI-tecken. Skriv om
  meningen i stället: punkt, kommatecken, kolon eller ett bindeord. Ta aldrig
  bara bort strecket och lämna mellanrummet.
- **Inga dubbla mellanslag.**
- Sektionsetiketter och liknande avdelare använder mittpunkt (`·`), som redan
  finns i designen (`STHLM · 59.4°N`, `Svenska · English · فارسی`).
- Sidtitlar avdelas med `|`.
- Tankstreck i sifferintervall (`2015–2026`, `450 000–500 000`) är en annan
  glyf (–, en dash), korrekt svensk typografi och inget AI-tecken. De behålls.

Innan leverans: `grep -rn '—' content/` ska ge noll träffar.

## Typografi

Tre typsnitt, alla självhostade via `next/font` (`lib/fonts.ts`):

| Roll | Typsnitt |
|---|---|
| Rubriker, hero, stadsnamn, display-tal | Source Sans 3 (vikt 600) |
| Brödtext, knappar, priser, listor | Open Sans |
| Etiketter, sektionsnummer, nav | IBM Plex Mono |
| Hela dokumentet på persiska | Noto Naskh Arabic |

Kundens visitkort ser ut att vara satt i Segoe UI, som inte får licensieras för
webben. Open Sans är närmaste fria motsvarighet och används i brödtexten, med
Segoe UI som första fallback så att den som har snittet installerat ser kortets
typsnitt exakt. Rubrikerna ska enligt kunden inte vara exakt samma snitt som
brödtexten: Source Sans 3 är humanistisk och tydligt släkt, men smalare och
stramare, så hierarkin håller.

Designunderlaget angav Instrument Serif för rubriker och Instrument Sans för
brödtext. Båda bytena är kundbeslut fattade efter leverans av underlaget, inte
avvikelser av misstag.

Rubrikstorlekarna ligger som en skala i `:root` (`--fs-hero`, `--fs-h1`,
`--fs-h2-xl`, `--fs-h2`, `--fs-h2-sm`, `--fs-h3`, `--fs-h3-sm`, `--fs-city`) i
stället för handsatta `clamp()` per sektion. Justera skalan där, så följer alla
sektioner med. Den ligger ca 30% under underlagets värden i toppen, på kundens
begäran — en humanistisk sans har dessutom större x-höjd än serifen och läser
större vid samma punktstorlek.

## Accentfärgen

Kalibrerad mot fenixlogotypen, som ligger på hue 23–36, mättnad 100% och
ljushet 53–58%. Designunderlagets orange låg på hue 24 och ljushet 44%, alltså
både mörkare och rödare än märket.

| Token | Värde | Används till |
|---|---|---|
| `--color-accent` | `#F06700` | Ytor: knappar, gradienter, prickar, ikoner |
| `--color-accent-ink` | `#D66000` | Accenten när den själv är text på ljus botten |
| `--color-accent-light` | `#FF9424` | Gradientens ljusa ände, accent på mörk botten |
| `--color-accent-glow` | `#FFB454` | Glöd och dekorlager |

Två spår är medvetet. Ljusnar man accenten som används till små etiketter och
länkar på ljus botten faller kontrasten under 3:1 och sektionsetiketterna blir
svårlästa. `accent-ink` är hue-skiftad mot märket men behåller kontrasten
(3,6:1, marginellt bättre än underlagets 3,54:1). Stora display-ord i `<em>`
använder den ljusa accenten, de klarar sig på sin storlek.

## Designsystem

Alla tokens ligger i `app/globals.css` (`@theme` + `:root`). Ändra värden där,
inte i komponenterna. Basstilarna ligger i `@layer base` — det är nödvändigt,
eftersom olagrad CSS annars vinner över knappstilarna i `@layer components`.

Designen är helt fluid (`clamp()`, `flex-wrap`, `grid auto-fit`). Den enda
brytpunkten är `--breakpoint-nav: 840px`, som byter navraden mot en
hamburgermeny. Behåll den strategin.

## Navigeringen

Headern är genomskinlig så länge hero täcker den, och blir ljus när man
scrollat förbi. Det gäller bara startsidan: orts-, tjänste- och bloggsidorna
börjar med ljus botten och ljus navigeringstext hade blivit osynlig där.

Brytpunkten mäts mot hero-sektionens verkliga höjd, inte mot `100vh`. Hero
använder `svh`, och på mobil gör adressfältet de två olika. Öppen mobilmeny
tvingar alltid fram det ljusa läget, annars går menyn inte att läsa.

Uppmätt kontrast mot videon i genomskinligt läge: 5,2:1 som lägst för
navigeringstexten och 5,2:1 för telefonikonen, som byter till den ljusare
accenten över hero.

## Hero-videon

Bakgrundsvideon ligger i `public/video/` som `hero.webm`, `hero.mp4` och
`hero-poster.jpg`. Filerna är committade, sajten är inte beroende av någon
extern CDN för dem.

`components/home/HeroBackgroundVideo.tsx` renderar `<video>` först när
`prefers-reduced-motion` inte är `reduce` och sidans load-event har gått.
Elementet renderas alltså inte och döljs med CSS, för en dold video hämtas
ändå. Uppskjutningen till efter load gör att videon inte konkurrerar med
hero-texten, som är sidans LCP-element.

Under 768 px används `hero-mobil.mp4`, som är förbeskuren till det utsnitt
mobilen ändå visar: 278 kB mot 4,3 MB. Bara MP4 där, H.264 spelas överallt och
en VP9 av samma klipp blev fem gånger så stor. Beskärningen är räknad ur
`background-position: 48%` på posterbilden, så bilden inte hoppar när videon
tar över. Ändras utsnittet måste filen kodas om.

Två slöjor ligger mellan bilden och texten. Värdena är uppmätta mot videons
ljusaste rutor, inte valda på känsla: bakgrundsfönstret når 0,71 i luminans och
ljus text hamnar runt 1,5:1 mot det utan slöja. Med nuvarande uppsättning ligger
sämsta uppmätta kontrast på 3,15:1 för displayraderna och 5,6:1 för brödtexten.
Byts videon ut måste värdena mätas om.

Omkodning kräver ffmpeg, som inte finns installerat här. Hämtas tillfälligt med
`npm install --no-save ffmpeg-static`, som lägger binären i `node_modules` utan
att röra `package.json`.

## Rörelse

`components/layout/MotionRuntime.tsx` är hela rörelselagret: reveal-in,
processtegens färgning och en rAF-throttlad scroll-handler för tjänstekortens
mini-headers och hero-parallaxen. Allt hoppas över vid
`prefers-reduced-motion: reduce`.

Videorna spelas alltid ljudlöst. Attributen sätts imperativt på DOM-noden i
`components/ui/AutoVideo.tsx` — att bara sätta dem i JSX räcker inte
pålitligt. `volume = 0` är medvetet redundant: kunden har krävt att ljud
aldrig hörs.

## Deploy

Statisk export, fungerar på vilken statisk host som helst.

**Cloudflare Pages**

| Inställning | Värde |
|---|---|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | 20 eller senare |

## Kvar att göra

- Hero-videon är 4K (5 MB) och är sidans största tyngd. Byt mot 1080p H.264 +
  WebM/AV1 och lägg en `poster`-bild.
- Om-videon ligger kvar på leverantörens CloudFront (`content/site.ts`). Flytta
  till egen asset-pipeline.
- Domänen i `SITE_URL` (`content/site.ts`) är satt till `nordicphoenix.se` —
  uppdatera om den skarpa domänen blir en annan, den styr canonical, hreflang
  och sitemap.
- De sex planerade bloggartiklarna saknar brödtext och renderas som
  "Kommer snart". Lägg in dem i `content/blog.ts` när texterna finns.

## Granskningskopia

Bygg med `NEXT_PUBLIC_PREVIEW=1` när sajten ska läggas upp någon annanstans än
på den skarpa domänen, till exempel för kundgranskning.

```bash
NEXT_PUBLIC_PREVIEW=1 npm run build
```

Då spärras hela kopian i `robots.txt` **och** med `noindex` på varje sida.
Bara robots.txt räcker inte: en spärrad sida kan ändå hamna i index om någon
länkar till den, och en kopia med samma texter och samma canonical mot
nordicphoenix.se är en dubblett som kan skada originalet.

Verifiera före publicering att `out/robots.txt` innehåller `Disallow: /` och
att antalet sidor utan `noindex` är noll. Produktionsbygget sätter inte
variabeln och är opåverkat: där ska bara 404-sidorna vara noindex, vilket är
Next standard.
