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
