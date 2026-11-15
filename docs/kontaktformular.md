# Kontaktformuläret

Formuläret står på startsidan och på alla ortssidor (`components/kontakt/`).
Det postar till `/api/kontakt`, en Cloudflare Pages Function
(`functions/api/kontakt.ts`, logiken i `lib/kontakt/server.ts`), som
kontrollerar inskickningen och skickar den vidare till en Inbound Webhook i
Nordic Phoenix underkonto i Climon System. Allt annat, kontakten, mejlen och
notiserna, sköts av arbetsflödet där.

## Miljövariabel

Sätts som krypterad hemlighet på Pages-projektet `nordic-phoenix-site`,
miljön Production. Skriv den aldrig i koden, i chatt eller i commits.

| Namn | Värde |
|---|---|
| `GHL_KONTAKT_WEBHOOK` | Webbadressen från arbetsflödets Inbound Webhook-trigger |

Saknas den svarar formuläret med fel och hänvisar till WhatsApp.

## Fälten som skickas

| Fält | Innehåll |
|---|---|
| `namn` | Fullständigt namn |
| `epost` | E-post, alltid ifylld |
| `telefon` | Telefon, kan saknas |
| `meddelande` | Vad kunden behöver hjälp med, kan saknas |
| `sprak` | `sv`, `fa` eller `en`: språket kunden vill bli kontaktad på |
| `formular` | Alltid `kontakt` |
| `sida` | Sidan formuläret skickades från |
| `utm_source` m.fl. | Kampanjparametrar när de finns |

## Arbetsflödet i Climon System

Namn: **Webbformulär: kontakt**

1. **Trigger:** Inbound Webhook. Skicka ett test från sajten för att få ett
   exempelanrop att mappa mot.
2. **Create/Update Contact:** namn till fullständigt namn, epost till e-post,
   telefon till telefon.
3. **Add Tag:** `webbformular-kontakt`.
4. **Add Note:** meddelandet, språket och sidan.
5. **If/Else på `sprak`:** tre grenar, `fa`, `en` och övrigt (svenska). I
   varje gren **Send Email** till kontakten med texten nedan.
6. **Send Internal Notification (e-post)** till `info@nordicphoenix.se`.
7. **Send Internal Notification (e-post)** till `erfan@climon.se`, som ett
   eget steg. Det blir ett separat mejl som Ali inte ser, alltså samma sak som
   en dold kopia.

Variablerna från webhooken heter i regel `{{inboundWebhookRequest.namn}}`
och så vidare. Välj dem hellre i variabelväljaren än att skriva för hand.

**Avsändaren:** bekräftelsen ska gå från `info@nordicphoenix.se`, och
domänen har DMARC `p=reject`. Underkontot måste därför ha nordicphoenix.se
upplagd och verifierad som egen avsändardomän under e-posttjänsterna, annars
studsar eller skräpsorteras mejlen.

## Mejltexterna

Inga tankstreck och ingen markdown. Kopiera rakt in.

### Bekräftelse, svenska

Ämne: Vi har fått din förfrågan

```
Hej {{contact.first_name}},

Tack för att du hörde av dig till Nordic Phoenix. Vi har tagit emot din förfrågan och hör av oss så snart vi kan.

Vill du lägga till något kan du svara direkt på det här mejlet eller ringa oss på 072-008 40 00.

Vänliga hälsningar
Nordic Phoenix Redovisningsbyrå AB
Bollstanäsvägen 3, 192 78 Sollentuna
072-008 40 00
nordicphoenix.se
```

### Bekräftelse, persiska

Ämne: درخواست شما دریافت شد

```
سلام {{contact.first_name}}،

از اینکه با ققنوس شمالی تماس گرفتید متشکریم. درخواست شما را دریافت کردیم و در اولین فرصت با شما تماس می‌گیریم.

اگر می‌خواهید چیزی اضافه کنید، کافی است به همین ایمیل پاسخ دهید یا با شماره 072-008 40 00 تماس بگیرید.

با احترام
Nordic Phoenix Redovisningsbyrå AB
Bollstanäsvägen 3, 192 78 Sollentuna
072-008 40 00
nordicphoenix.se
```

Sätt textriktningen till höger till vänster i mejlredigeraren.

### Bekräftelse, engelska

Ämne: We have received your enquiry

```
Hi {{contact.first_name}},

Thank you for contacting Nordic Phoenix. We have received your enquiry and will get back to you as soon as we can.

If you want to add anything, just reply to this email or call us on 072-008 40 00.

Kind regards
Nordic Phoenix Redovisningsbyrå AB
Bollstanäsvägen 3, 192 78 Sollentuna
072-008 40 00
nordicphoenix.se
```

### Notis till byrån

Ämne: Ny förfrågan via webbplatsen: {{inboundWebhookRequest.namn}}

```
Ny förfrågan via kontaktformuläret på nordicphoenix.se.

Namn: {{inboundWebhookRequest.namn}}
E-post: {{inboundWebhookRequest.epost}}
Telefon: {{inboundWebhookRequest.telefon}}
Vill bli kontaktad på: {{inboundWebhookRequest.sprak}} (sv svenska, fa persiska, en engelska)
Skickat från: {{inboundWebhookRequest.sida}}

Meddelande:
{{inboundWebhookRequest.meddelande}}
```
