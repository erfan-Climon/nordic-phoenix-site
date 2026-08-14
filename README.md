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

Sidorna finns bara på svenska. De riktar sig mot svensk lokal sökning, och
översättningar hade inneburit tunt innehåll utan sökefterfrågan. Språkväxlaren
byter därför till startsidan från `/blogg` och `/redovisningsbyra`, i stället
för att peka på en `/en`-sökväg som inte finns.

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
