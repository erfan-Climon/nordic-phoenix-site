import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { buildMetadata } from "@/lib/metadata";

/**
 * Startsidan behåller den gamla sajtens persiska title och description.
 *
 * TILLFÄLLIGT, OCH AVSIKTLIGT. Rot-URL:en rankar i dag på persiska sökfraser,
 * framför allt حسابدار ایرانی در سوئد och حسابدار فارسی‌زبان در استکهلم. Den är
 * sajtens starkaste sida och bär de rankingarna ensam, eftersom den gamla
 * sajten bara hade två indexerade URL:er.
 *
 * Byter vi till svensk title flyttas inte rankingen automatiskt till /fa eller
 * till /persisk-redovisningsbyra-stockholm. Det är andra URL:er med egen,
 * svagare auktoritet, och omvärderingen tar veckor. Under tiden kan sidan
 * ranka på varken det ena eller det andra, och persisktalande företagare är
 * kundens största målgrupp.
 *
 * Strängarna nedan är kopierade ordagrant från den gamla sajten, så att
 * signalerna blir identiska med dagens och ingenting kan tappas vid lansering.
 *
 * SÅ HÄR TAR DU BORT DEN HÄR FILENS METADATA:
 * Kontrollera i Search Console, fyra till åtta veckor efter lansering, vad
 * /fa och /persisk-redovisningsbyra-stockholm drar in på de persiska
 * fraserna. Rankar de, ta bort hela metadata-exporten här. Då faller sidan
 * tillbaka på t.meta i content/locales/sv.ts, som är den svenska titeln vi
 * egentligen vill ha på roten. Gör det inte innan, och inte utan att titta.
 */
export const metadata: Metadata = buildMetadata({
  locale: "fa",
  path: "/",
  title:
    "حسابدار ایرانی در سوئد | حسابدار فارسی‌زبان در استکهلم | Nordic Phoenix Redovisningsbyrå",
  description:
    "به دنبال حسابدار ایرانی یا فارسی‌زبان در سوئد هستید؟ Nordic Phoenix Redovisningsbyrå در استکهلم خدمات حسابداری، bokföring، moms، lön، bokslut، årsredovisning و deklaration ارائه می‌دهد.",
});

export default function Page() {
  return <HomePage locale="fa" />;
}
