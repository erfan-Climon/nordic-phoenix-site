# Bildprompter för bloggens tolv artiklar

Tolv färdiga prompter, en per artikel. Stilen är kundens egen: fotograferade
tryckta kort på strukturerad yta, äkta material och orange kantlist.

## Så kör du

**Klistra in exakt ett block åt gången.** Varje prompt nedan är komplett i sig
och innehåller hela stilbeskrivningen. Du ska aldrig klistra in mer än en.

Klistrar du in flera läser modellen dem som ett enda bilduppdrag med tolv
motiv, och löser det med en kontaktkarta i rutnät. Därför står förbudet mot
rutnät med i varje prompt, och därför upprepas stilen tolv gånger i stället för
att stå som ett gemensamt block överst.

Starta helst en ny konversation för varje bild, eller åtminstone ett nytt
meddelande utan de tidigare i sammanhanget. Välj liggande format, alltså
1536 × 1024. Det är exakt 3:2 och räcker gott: bilden visas som mest 900 px
bred på sajten.

## Beslut: texten sätts av bildgeneratorn

Erfan valde att låta ChatGPT skriva texten i bilden, för att det går snabbast
och för att texten då blir fysiskt integrerad i motivet: tryckt på kortet,
följer papprets perspektiv och ljus. Det ser bättre ut än text lagd på i
efterhand.

Priset är korrekturläsning. Bildmodeller stavar fel. Hittills i den här serien:
323 400 kronor i stället för 322 400, "۲ بخش" i stället för "۴ بخش", och
"genongång" i stället för "genomgång". **Varje bild måste läsas mot den exakta
strängen nedan innan den läggs in.**

Två saker minskar felen utan att kosta tid:

**Klistra in texten ordagrant i prompten.** Modellen ska kopiera en given
sträng, inte formulera själv. Felen ovan uppstod alla när den fick hitta på.

**En textyta per bild.** Provbilden hade både tryckt kort och handskriven lapp,
alltså två ställen att stava fel på, och felet kom på den handskrivna.

## Exakt text per artikel

Rubrik och underrad, på svenska och persiska. Bilderna behöver en per språk,
eftersom texten är tryckt i motivet. Koden stödjer det: saknas den persiska
bilden faller sidan tillbaka på den svenska tills den finns.

| # | Slug | Språk | Rubrik | Underrad |
|---|---|---|---|---|
| 1 | `ekonomisk-halsokontroll-foretag` | sv | Ekonomisk höststart på 60 minuter | Sju kontroller som visar hur företaget faktiskt mår. |
| 1 | | fa | شروع مالی پاییز در ۶۰ دقیقه | هفت بررسی که نشان می‌دهد شرکت واقعا در چه حالی است. |
| 2 | `enskild-firma-eller-aktiebolag` | sv | Enskild firma eller aktiebolag? | Välj efter risk och vardag, inte bara efter skatt. |
| 2 | | fa | enskild firma یا aktiebolag؟ | بر اساس ریسک و زندگی روزمره انتخاب کنید، نه فقط مالیات. |
| 3 | `nya-3-12-regler-2026` | sv | Nya 3:12-reglerna 2026 | Grundbeloppet är 322 400 kronor. Planera före årsskiftet. |
| 3 | | fa | قوانین جدید ۳:۱۲ از سال ۲۰۲۶ | مبلغ پایه ۳۲۲٬۴۰۰ کرون است. پیش از پایان سال برنامه‌ریزی کنید. |
| 4 | `skatteplanering-infor-arsskiftet` | sv | Skatteplanering före årsskiftet | I november finns fortfarande tid att påverka. |
| 4 | | fa | برنامه‌ریزی مالیاتی پیش از پایان سال | در نوامبر هنوز وقت هست که اثر بگذارید. |
| 5 | `bokslut-checklista` | sv | Bokslut utan panik | Underlagen som sparar mest tid och pengar. |
| 5 | | fa | bokslut بدون اضطراب | مستنداتی که بیشترین وقت و پول را صرفه‌جویی می‌کنند. |
| 6 | `k2-k3-nya-regler-2026` | sv | K2 eller K3? | Kontrollera vilket regelverk företaget får använda. |
| 6 | | fa | K2 یا K3؟ | بررسی کنید شرکت شما کدام چارچوب را می‌تواند به کار ببرد. |
| 7 | `anstalla-forsta-medarbetaren-vaxa-stod` | sv | Anställa första medarbetaren | Räkna på hela kostnaden, inte bara lönen. |
| 7 | | fa | استخدام اولین کارمند | کل هزینه را حساب کنید، نه فقط حقوق را. |
| 8 | `deklaration-enskild-firma-aktiebolag` | sv | Tre dokument som blandas ihop | NE-bilaga, Inkomstdeklaration 2 och K10. |
| 8 | | fa | سه سندی که اشتباه می‌شوند | ضمیمه NE، Inkomstdeklaration 2 و K10. |
| 9 | `avdrag-foretag-vanliga-fel` | sv | Avdrag som ofta blir fel | Kvittot i sig räcker inte alltid. |
| 9 | | fa | کسوراتی که اغلب اشتباه می‌شوند | خودِ رسید همیشه کافی نیست. |
| 10 | `moms-for-smaforetag` | sv | 25, 12 eller 6 procent moms? | Fem situationer där små fel blir stora. |
| 10 | | fa | moms ۲۵، ۱۲ یا ۶ درصد؟ | پنج وضعیتی که خطای کوچک در آن‌ها بزرگ می‌شود. |
| 11 | `likviditetsbudget-13-veckor` | sv | Likviditetsbudget på 13 veckor | Se betalningsproblemen i tid. |
| 11 | | fa | بودجه نقدینگی سیزده‌هفته‌ای | مشکلات پرداخت را به‌موقع ببینید. |
| 12 | `spara-bokforing-kvitton-digitalt` | sv | Digital bokföring är inte arkivering | Sju år, rätt format, säker åtkomst. |
| 12 | | fa | دفترداری دیجیتال بایگانی نیست | هفت سال، قالب درست، دسترسی امن. |

Persiskan är den farliga delen. Bokstäverna ska bindas ihop och läsas från
höger, och siffrorna är persiska tecken. Skicka varje persisk bild till mig
innan den läggs in, så jämför jag tecken för tecken mot tabellen.

## Loggan

Generatorns fenix är nära men inte er riktiga: vingarnas fjäderform och huvudet
skiljer sig. Låt den gärna sitta kvar i genereringen som platshållare, så byter
jag ut den mot `public/assets/phoenix-logo.png` efteråt. Då blir märket
identiskt på alla tolv.

## Var filerna ska ligga

`public/assets/blogg/<slug>-sv.png` och `<slug>-fa.png`.

## Motivförslag per artikel

Provbilden för artikel 1 satte tonen: ett tryckt kort med rubriken, en orange
kantlist, äkta material runt omkring och mjuka riktiga skuggor. Behåll det
greppet och variera bara rekvisitan, annars blir de tolv bilderna tolv
versioner av samma bild.

| # | Motiv runt kortet |
|---|---|
| 1 | Linnetyg, keramikkopp, penna. Tidigt morgonljus. |
| 2 | Två kort bredvid varandra, ett tunt och ett tjockt, tom yta emellan. |
| 3 | Mörk läderliggare och reservoarpenna, sent eftermiddagsljus. |
| 4 | Ullpläd, tänd bordslampa, mörkt fönster i bakgrunden. Sen höst. |
| 5 | Arkivkartonger och pärmar bakom, kortet framför, allt uppradat. |
| 6 | Två kort på högkant i olika höjd, snett ljus som ger relief. |
| 7 | Kortet på ett tomt skrivbord med en ledig stol utanför bild. |
| 8 | Tre kort i olika pappersnyanser, tydligt åtskilda. |
| 9 | Utspridda kvitton runt kortet, ett par händer som sorterar. |
| 10 | Kafédisk, kortterminal, en kopp för servering och en för avhämtning. |
| 11 | Kortet på en planeringstavla med en rad tomma veckorutor bredvid. |
| 12 | Kortet bredvid en liten svart hårddisk, en telefon som fotar. |

Håll motivet i mittenbandet. På blogglistan beskärs bilden till 600 × 220 och
då försvinner översta och nedersta tredjedelen.

Be alltid om en enda bild. Ber du om flera i samma meddelande svarar modellen
med en kontaktkarta i rutnät, vilket hände första gången.

## När bilderna är klara

Skicka de tolv filerna som JPG eller PNG i original. Då lägger jag på loggan,
konverterar till webp, komprimerar och kopplar rätt bild till rätt artikel.

Blir en bild fel går den att generera om ensam. Prompterna är oberoende av
varandra.

Vill du i stället ha text i bilderna behövs 24 bilder, en per språk och artikel,
och då kopplar jag bild per språk i `content/blog-copy.ts`. Säg till, det är en
liten ändring.
