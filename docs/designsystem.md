# Nordic Phoenix Redovisningsbyrå: designsystem

Det här dokumentet beskriver hur allt material från Nordic Phoenix Redovisningsbyrå ska se ut: nyhetsbrev, mallar, dokument, inlägg i sociala medier och presentationer. Alla värden är hämtade direkt ur koden till nordicphoenix.se, så material som följer dokumentet ser ut att höra till samma avsändare som webbplatsen.

Följ reglerna ordagrant. Hexkoderna är exakta. Där dokumentet anger ett mätvärde för kontrast är det uträknat enligt WCAG 2.1.

Ladda upp logotypfilen `phoenix-logo.png` tillsammans med dokumentet.

---

## 1. Varumärket

Nordic Phoenix är en digital redovisningsbyrå i Sollentuna norr om Stockholm, med kunder i hela Sverige. Byrån sköter bokföring, lön, moms, bokslut, årsredovisning, deklaration och myndighetskontakter på svenska, engelska och persiska. En stor del av kunderna är persisktalande företagare.

Känslan är **skandinavisk premium med värme**. Lugnt, luftigt, varmt papper och mörk bläckton, med orange som en glöd och inte som en skrikig reklamfärg. Tänk en välordnad skrivbordsyta i morgonljus, inte en bank och inte en startup.

Slogan: **Redovisning för företagare som vill växa med trygghet.**
Bärande rubrik: **Vi gör ekonomi begripligt.**

---

## 2. Logotyp

### Symbolen

En uppåtflygande fenix med utbredda vingar och en lång stjärtfjäder, i en övertoning från ljust guldorange i vingspetsarna till djupt orange i kroppen. Filen `phoenix-logo.png` är symbolen ensam, 431 × 338 pixlar, med transparent bakgrund.

Filen är liten. Den räcker för skärm och nyhetsbrev men inte för tryck större än ungefär 3 cm. Be om en vektorfil (SVG eller PDF) före tryckjobb.

### Ordmärket

Ordmärket sätts under eller bredvid symbolen:

```
NORDIC PHOENIX
R E D O V I S N I N G S B Y R Å
```

- **NORDIC PHOENIX** i en klassisk antikva med versaler, färg `#171310` på ljus botten och `#f2ece0` på mörk.
- En tunn orange linje `#f06700` mellan raderna, ungefär lika bred som ordet PHOENIX.
- **REDOVISNINGSBYRÅ** i samma antikva, mindre, versaler, med mycket brett teckenavstånd (ungefär 0,3 em), färg `#3e3830`.

Det finns ingen färdig fil med symbol och ordmärke tillsammans. Sätt ihop dem av symbolen och texten enligt ovan.

### Placering

- Sociala medier och bloggbilder: symbol med ordmärke i **övre vänstra hörnet**, på ljus botten.
- Nyhetsbrev: symbolen centrerad eller vänsterställd överst, ungefär 56 till 72 pixlar hög.
- Fritt utrymme runt logotypen: minst halva symbolens höjd åt alla håll.

### Nedladdningsbara mallar har ingen logotyp

Beslut av byråns grundare. Mallar som kunder laddar ner och fyller i (kvitto, faktura, tidrapport, anställningsavtal, aktiebok och liknande) bär **ingen logotyp**. I sidfoten står i stället exakt denna rad:

> Denna mall är designad och framtagen av Nordic Phoenix Redovisningsbyrå

### Gör inte med logotypen

- Ändra inte färgerna, lägg inte på skugga, kontur eller glöd.
- Lägg den inte på orange botten. Symbolen är själv orange och försvinner.
- Sträck eller tryck inte ihop den. Proportionerna är låsta.
- Placera den inte på en rörig bild utan en lugn yta bakom.

---

## 3. Färger

### Palett

| Namn | Hex | Roll |
|---|---|---|
| **Accent** | `#f06700` | Varumärkets orange. Knappar, linjer, prickar, markeringar |
| **Accent, text** | `#d66000` | När orange är själva texten på ljus botten |
| **Accent, ljus** | `#ff9424` | Övertoningens ljusa ände. Orange text på mörk botten |
| **Accent, glöd** | `#ffb454` | Glöd och ljusa detaljer, sparsamt |
| **Papper** | `#faf9f5` | Standardbakgrund. Varmvit, aldrig ren vit |
| **Yta** | `#fffefb` | Kort och rutor som ska lyfta från papperet |
| **Bläck** | `#0a0908` | Mörka sektioner och plattor |
| **Bläck, kort** | `#14110c` | Kort på mörk botten |
| **Bläck, djup** | `#060504` | Sidfot, det allra mörkaste |
| **Text** | `#171310` | Rubriker och brödtext på ljus botten |
| **Text, mjuk** | `#3e3830` | Underrubriker, tabellhuvuden |
| **Text, dämpad** | `#6a6155` | Ingresser, beskrivningar, sekundär text |
| **Text, meta** | `#8a7b60` | Datum, fotnoter, små etiketter |
| **På mörkt** | `#f2ece0` | Text på bläck |
| **På mörkt, dämpad** | `#9c948a` | Sekundär text på bläck |
| **På orange** | `#1c0f05` | Text på orange ytor |
| **Grädde** | `#fff8ec` | Ljus text på orange, se kontrastreglerna |

### Övertoningar

| Namn | Värde | Används till |
|---|---|---|
| Accent | `linear-gradient(120deg, #ff9424, #f06700)` | Primärknappar |
| Accenttext | `linear-gradient(110deg, #ff9424 20%, #f06700)` | Ett markerat ord i en rubrik |
| Banner | `linear-gradient(115deg, #ffb055 0%, #ff7a1a 55%, #e05c00 100%)` | Stora uppmaningsrutor |
| Mörkt kort | `linear-gradient(165deg, #1e150b, #2a1a08)` | Utvalt kort på mörk botten |

### Fördelning

Ungefär så här ska en sida eller ett utskick fördela sig:

- **70 procent** papper `#faf9f5` och yta `#fffefb`
- **20 procent** bläck `#0a0908` och text `#171310`
- **10 procent** orange

Orange är en glöd, inte en bakgrundsfärg. En hel sida i orange är fel. Undantaget är en enskild uppmaningsruta i bannerövertoningen.

Rytmen på webbplatsen växlar mellan ljusa sektioner och en mörk bläcksektion. Samma växling fungerar i nyhetsbrev och presentationer: ljust, ljust, en mörk platta, ljust.

### Kontrastregler

Uppmätta värden. Gränsen för vanlig text är 4,5 och för stor text 3,0.

| Kombination | Kontrast | Regel |
|---|---|---|
| Text `#171310` på papper | 17,5 | All brödtext |
| Dämpad `#6a6155` på papper | 5,8 | Sekundär text, går bra |
| Meta `#8a7b60` på papper | 3,9 | Bara datum och fotnoter, aldrig viktig information |
| På mörkt `#f2ece0` på bläck | 16,9 | All text på mörk botten |
| Dämpad `#9c948a` på bläck | 6,7 | Sekundär text på mörkt |
| Ljus accent `#ff9424` på bläck | 9,0 | Orange text på mörkt fungerar fullt ut |
| **Mörk `#1c0f05` på orange `#f06700`** | **5,9** | **Text på orange ytor** |
| Grädde `#fff8ec` på orange `#f06700` | 3,0 | Underkänd för vanlig text |
| Accenttext `#d66000` på papper | 3,6 | Bara rubriker och etiketter, aldrig löptext |

Två regler följer av tabellen:

1. **Text på orange är mörk, `#1c0f05`.** Webbplatsens stora uppmaningsruta gör redan så. Ljus text på orange klarar inte kravet och ska inte användas i nyhetsbrev, mallar eller inlägg, där läsaren ofta sitter med telefonen i dagsljus.
2. **Orange text på ljus botten är bara för rubriker och etiketter.** Aldrig för stycken, länkar i löptext eller något läsaren måste förstå. Orange på mörk botten, i den ljusa tonen `#ff9424`, fungerar däremot för allt.

---

## 4. Typografi

### Typsnitt

| Roll | Typsnitt | Reserv | Vikter |
|---|---|---|---|
| Rubriker | **Source Sans 3** | Segoe UI, Helvetica Neue, Arial | 600 |
| Brödtext | **Open Sans** | Segoe UI, Helvetica Neue, Arial | 400, 500 för knappar, 600 för betoning |
| Etiketter | **IBM Plex Mono** | ui-monospace, Menlo, monospace | 400, 500 |
| Persiska | **Noto Naskh Arabic** | serif | 400, 500, 600 |

Alla fyra finns gratis hos Google Fonts.

Rubrikerna har vikt 600, inte 700. Teckenavståndet i rubriker är något tätare än normalt: **−0,02 em** i stora rubriker och **−0,01 em** i mindre.

### Skala för skärm

| Nivå | Storlek | Radavstånd |
|---|---|---|
| Stor rubrik | 48 till 72 px | 1,05 |
| Rubrik | 32 till 40 px | 1,15 |
| Underrubrik | 22 till 26 px | 1,3 |
| Ingress | 18 till 19 px | 1,7 |
| Brödtext | 16 px | 1,7 till 1,8 |
| Liten text | 14 px | 1,7 |
| Etikett | 11 till 13 px | 1,4 |

### Etikettstilen

En återkommande signatur. Små etiketter ovanför rubriker och i metarader sätts i **IBM Plex Mono, versaler, vikt 500, teckenavstånd 0,18 till 0,24 em**. Till exempel:

```
FÅMANSBOLAG · SEPTEMBER 2026 · 4 MIN LÄSNING
```

Sektionsetiketter ovanför en rubrik får orange färg `#d66000`. Metarader får färgen `#8a7b60`.

### Det markerade ordet

En rubrik kan ha sin sista del markerad i orange övertoning, som på webbplatsen: *Nya 3:12-reglerna: det här behöver ägare i fåmansbolag förstå* **före årsskiftet**. Bara ett markerat led per rubrik, och alltid slutet.

### Brödtext

Brödtexten är **marginaljusterad**, alltså rak både i vänster- och högerkanten, med avstavning påslagen. Det är ett uttryckligt önskemål från byråns grundare. Rubriker, etiketter, knappar och korta rader är vänsterställda som vanligt.

Radlängden hålls kort: högst 68 tecken.

### Persiska

- Skrivriktning höger till vänster, all text i Noto Naskh Arabic.
- **Teckenavstånd alltid noll.** Brett teckenavstånd bryter sönder den arabiska skriften, även i etiketter.
- Siffror i marknadsföringstext skrivs med persiska siffror: ۱۲۰۰, ۶۰. I tekniska fält som telefonnummer och organisationsnummer används vanliga siffror.
- Telefonnummer, e-postadresser och webbadresser står alltid vänster till höger, även inne i persisk text.
- Byråns namn på persiska: **ققنوس شمالی**.

---

## 5. Form och detaljer

### Hörn

- **Knappar, etiketter och brickor: helt raka hörn, 0 px.** Uttryckligt kundbeslut.
- Små flytande element: 16 px.
- Kort: 20 px.
- Bilder och mörka plattor: 24 px.
- Stora uppmaningsrutor: 28 px.

Kontrasten mellan raka knappar och mjuka kort är avsiktlig.

### Linjer

- Hårlinje på ljus botten: `rgba(23, 19, 16, 0.1)`, 1 px.
- Hårlinje på mörk botten: `rgba(242, 236, 224, 0.12)`, 1 px.
- Rutnät av kort byggs med delade hårlinjer, inte med luft och skuggor.

### Den orange listen

Varumärkets tydligaste grafiska signatur. **En lodrät orange linje, 4 till 6 px bred, längs vänsterkanten** av ett papperskort eller en faktaruta. Syns i alla bloggbilder. Använd den för att lyfta fram det viktigaste på en sida, en gång per sida.

### Prickar

Punktlistor använder en **liten fylld orange cirkel**, 5 till 7 px, i stället för vanliga punkter.

### Skuggor

Mjuka och varma, aldrig grå eller hårda.

- Kort på ljus botten: `0 24px 64px rgba(23, 19, 16, 0.14)`
- Primärknapp: `0 8px 32px rgba(240, 103, 0, 0.35)`
- Kort på mörk botten: `0 32px 80px rgba(0, 0, 0, 0.5)`

---

## 6. Komponenter

### Primärknapp

- Bakgrund: accentövertoningen, eller `#f06700` där övertoning inte stöds.
- Text: **`#1c0f05`**, Open Sans vikt 600, 15 till 17 px. Se kontrastreglerna.
- Hörn: 0 px. Luft: 16 till 18 px uppifrån och nedifrån, 28 till 32 px åt sidorna.
- Skugga: `0 8px 32px rgba(240, 103, 0, 0.35)`.

### Sekundärknapp

- Genomskinlig bakgrund, 1 px ram i `rgba(23, 19, 16, 0.25)`, text `#171310` vikt 500.
- Hörn: 0 px.

### Uppmaningsruta

- Bakgrund: bannerövertoningen.
- Rubrik i `#1c0f05`, Source Sans 3 vikt 600.
- Text i `rgba(28, 15, 5, 0.75)`.
- Knapp i mörk bläckfärg `#1c0f05` med grädde text `#f2ede3`.
- Hörn: 28 px.

### Mörk platta

Används för sammanfattningar, checklistor och det man ska göra härnäst.

- Bakgrund `#0a0908`, hörn 24 px, luft 32 till 48 px.
- Etikett i IBM Plex Mono, versaler, `#8a7b60`.
- Punktlista med orange prickar och text i `#f2ece0`.

### Faktaruta

- Bakgrund `#fffefb`, orange lodrät list i vänsterkanten.
- Kort rubrik och två till fyra rader text.

### Frågor och svar

Frågan i Source Sans 3 vikt 600, 19 px. Svaret i Open Sans, `#6a6155`. Hårlinje mellan varje par.

---

## 7. Bildspråk

Alla bloggbilder följer samma scen, och nytt bildmaterial ska passa in i den:

- **Ovanifrån**, platt komposition, som ett skrivbord fotograferat rakt uppifrån.
- **Varm beige yta** av sten, puts eller linne.
- **Ett gräddvitt papperskort** i mitten med rubriken tryckt i en klassisk antikva och en **orange lodrät list** i vänsterkanten.
- **En mindre lapp** fäst med en beige häftstift, med en kort mening och egen orange list.
- **Rekvisita**: en kaffekopp i stengods med svart kaffe, torkade blommor eller gräs i ena hörnet, en penna i mässing eller svart med guld.
- **Mjukt naturligt ljus** från sidan, långa mjuka skuggor.
- **Logotypen** med ordmärke i övre vänstra hörnet.
- Format 3:2 liggande, 1536 × 1024, för webbplatsen.

Undvik stockfoton med människor i kostym, handslag, glada team framför whiteboards, grafer med pilar uppåt, sedelbuntar och miniräknare i närbild.

---

## 8. Text och ton

### Språk

Svenska är standard. Persiska och engelska när målgruppen kräver det. Tilltal i **du-form**.

### Tonen

- Lugn, saklig och varm. Byrån förklarar, den säljer inte.
- Konkret: vad läsaren ska göra, när, och vad det betyder för dem.
- Korta meningar. En tanke per mening.
- Aldrig överdrifter som "revolutionerande", "bäst i Sverige" eller "spara tusentals kronor".

### Skrivregler som alltid gäller

- **Aldrig tankstreck**, alltså varken — eller – mellan satsdelar. Skriv om till två meningar eller använd kommatecken. Intervall skrivs "08 till 19" i löptext.
- Aldrig dubbla mellanslag.
- Inga utropstecken i rubriker.
- Punktlistor med orange prick, inte med bindestreck.
- Belopp med mellanslag som tusentalsavgränsare: 322 400 kronor.
- Procent skrivs ut i löptext: 20,6 procent.

### Sakuppgifter

- **Hitta aldrig på siffror**: inga påhittade kundantal, recensioner, besparingar, garantier, utmärkelser eller certifieringar.
- Använd bara påståenden som redan står på webbplatsen.
- Belopp, procentsatser och regeländringar ska ha en källa hos Skatteverket, Bolagsverket eller Bokföringsnämnden, och källan ska stå med.
- **Ange aldrig ett pris utan att det framgår om det är med eller utan moms.**

### Uppmaningar

Använd formuleringar som finns på webbplatsen: **Kontakta oss**, **Kom igång**, **Ta första steget**, **Hör av dig**. Undvik "Köp nu" och "Klicka här".

---

## 9. Format

### Nyhetsbrev

- **Bredd 600 px**, centrerad, på papper `#faf9f5`. Innehållet i ett kort `#fffefb` med 24 px hörn.
- Webbtypsnitt laddas inte i alla e-postprogram. Ange alltid reservkedjan: `"Open Sans", "Segoe UI", Helvetica, Arial, sans-serif`. Utseendet ska hålla även med Arial.
- **Övertoningar stöds inte i alla e-postprogram.** Ge varje knapp och ruta en enfärgad bakgrund `#f06700` först, övertoningen ovanpå.
- Knappar som riktiga länkade celler, inte som bilder. Minst 44 px höga för tummen.
- Struktur: logotyp, en rubrik med markerat slutord, två till tre korta avsnitt med sektionsetikett, en mörk platta med "det här bör du göra", en uppmaning, sidfot.
- Mörkt läge: sätt inte ren vit eller ren svart någonstans, använd paletten. Kontrollera att logotypen syns på mörk botten.
- Sidfot i `#0a0908` med kontaktuppgifterna nedan, avregistreringslänk och byråns juridiska namn.

### Nedladdningsbara mallar och dokument

- **A4**, marginaler 13 till 14 mm.
- Typsnitt: `"Helvetica Neue", Helvetica, Arial, sans-serif`. Brödtext 8,5 till 9 pt.
- Huvudrubrik 16 pt, med en liten etikett i versaler ovanför i `#d66000`.
- Tunn svart linje under huvudet, 1,6 pt i `#0a0908`.
- Avsnittsrubriker 9 pt, versaler, `#d66000`, med en hårlinje under i `#d8d2c6`.
- Tabeller med 0,5 pt ram i `#b9b1a4` och tabellhuvud på `#f4f0e8`.
- Ifyllnadslinjer i `#8a7b60`.
- **Ingen logotyp.** Sidfoten bär krediteringsraden i avsnitt 2, 6,6 pt i `#8a7b60`.
- Hänvisa till lagrum där det finns, i kursiv `#8a7b60`.

### Sociala medier

- Instagram och Facebook: **1080 × 1350** stående, eller 1080 × 1080.
- Stories och TikTok: **1080 × 1920**, med all text inom de mittersta 1080 × 1420 så att ingenting hamnar under appens knappar.
- Samma scen som bloggbilderna i avsnitt 7, eller en ren typografisk bild på papper `#faf9f5` med en orange list.
- Högst åtta ord i rubriken. Logotypen i övre vänstra hörnet.

### Presentationer

- **16:9**, 1920 × 1080.
- Ljusa bilder på papper, avsnittsbilder på bläck `#0a0908`.
- En rubrik per bild, högst tre punkter med orange prickar.
- Etikett i IBM Plex Mono högst upp på varje bild, till exempel `03 · BOKSLUT`.

---

## 10. Fasta uppgifter

| | |
|---|---|
| Juridiskt namn | Nordic Phoenix Redovisningsbyrå AB |
| Kortnamn | Nordic Phoenix |
| Organisationsnummer | 559577-4232 |
| Adress | Bollstanäsvägen 3, 192 78 Sollentuna |
| Telefon | 072-008 40 00 |
| E-post | info@nordicphoenix.se |
| Webbplats | nordicphoenix.se |
| Öppettider | 08 till 19 alla dagar |
| Instagram | @nordic.phoenix.redovisning |
| TikTok | @nordicphoenix.redo |
| Språk | Svenska, engelska och persiska |

Skriv telefonnumret exakt så: **072-008 40 00**.

---

## 11. Gör inte

- Ren vit `#ffffff` eller ren svart `#000000` som bakgrund.
- Ljus text på orange.
- Orange löptext på ljus botten.
- Rundade knappar.
- Mer än ett markerat ord eller led per rubrik.
- Tankstreck i text.
- Blå, grön eller lila som dekorfärg. Den enda andra färgen som förekommer är WhatsApps gröna `#25d366`, och bara i en WhatsApp-knapp.
- Logotyp på nedladdningsbara mallar.
- Påhittade siffror, citat eller recensioner.
- Pris utan besked om moms.

---

## 12. Tokens

Samma värden i maskinläsbar form.

```css
:root {
  /* Accent */
  --np-accent: #f06700;
  --np-accent-ink: #d66000;
  --np-accent-light: #ff9424;
  --np-accent-glow: #ffb454;

  /* Ytor */
  --np-page: #faf9f5;
  --np-surface: #fffefb;
  --np-ink: #0a0908;
  --np-ink-card: #14110c;
  --np-ink-deep: #060504;

  /* Text */
  --np-text: #171310;
  --np-text-soft: #3e3830;
  --np-text-muted: #6a6155;
  --np-text-meta: #8a7b60;
  --np-on-dark: #f2ece0;
  --np-on-dark-muted: #9c948a;
  --np-on-accent: #1c0f05;

  /* Övertoningar */
  --np-gradient-accent: linear-gradient(120deg, #ff9424, #f06700);
  --np-gradient-accent-text: linear-gradient(110deg, #ff9424 20%, #f06700);
  --np-gradient-banner: linear-gradient(115deg, #ffb055 0%, #ff7a1a 55%, #e05c00 100%);

  /* Linjer */
  --np-hairline-light: rgba(23, 19, 16, 0.1);
  --np-hairline-dark: rgba(242, 236, 224, 0.12);

  /* Hörn */
  --np-radius-button: 0px;
  --np-radius-float: 16px;
  --np-radius-card: 20px;
  --np-radius-media: 24px;
  --np-radius-banner: 28px;

  /* Skuggor */
  --np-shadow-card: 0 24px 64px rgba(23, 19, 16, 0.14);
  --np-shadow-button: 0 8px 32px rgba(240, 103, 0, 0.35);
  --np-shadow-card-dark: 0 32px 80px rgba(0, 0, 0, 0.5);

  /* Typsnitt */
  --np-font-heading: "Source Sans 3", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  --np-font-body: "Open Sans", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  --np-font-mono: "IBM Plex Mono", ui-monospace, Menlo, monospace;
  --np-font-persian: "Noto Naskh Arabic", serif;
  --np-font-print: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
```
