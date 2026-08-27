import type { Dictionary } from "@/content/locales/sv";
import { preferredSourceAktiv } from "@/content/site";

/**
 * Uppmaning att lägga till sajten som föredragen källa hos Google.
 *
 * Själva knappen ritas av Googles publisher.js, som laddas i rotlayouten.
 * Allt vi bidrar med är den tomma behållaren och attributet deras skript
 * letar efter. Laddas skriptet inte, till exempel för att besökaren blockerar
 * tredjepartsskript, står rutan kvar med rubrik och text men utan knapp. Det
 * är avsiktligt: texten säger något vettigt även då, och inget hoppar.
 *
 * `kompakt` används på blogglistningen, där sektionen ska vara mindre än den
 * som ligger under en artikel.
 */
export function GooglePreferredSource({
  t,
  kompakt = false,
}: {
  t: Dictionary;
  kompakt?: boolean;
}) {
  /* Hela rutan utgår när knappen är avstängd. Att låta rubrik och text stå
     kvar utan knapp vore en uppmaning utan åtgärd. */
  if (!preferredSourceAktiv) return null;

  const p = t.preferredSource;

  return (
    <section
      className={
        kompakt
          ? "flex flex-wrap items-center justify-between gap-x-8 gap-y-5 rounded-media border border-[rgba(23,19,16,.12)] bg-page px-[clamp(24px,3vw,36px)] py-[clamp(20px,2.4vw,28px)]"
          : "mt-[clamp(48px,6vw,72px)] rounded-media border border-[rgba(23,19,16,.12)] bg-page p-[clamp(28px,3.5vw,44px)]"
      }
    >
      <div className={kompakt ? "max-w-[54ch]" : "max-w-[58ch]"}>
        <h2
          className={`np-h3 m-0 font-heading leading-[1.25] ${
            kompakt ? "text-[18px]" : "text-[22px]"
          }`}
        >
          {kompakt ? p.archiveHeading : p.heading}
        </h2>
        <p
          className={`m-0 font-sans leading-[1.7] text-text-muted ${
            kompakt ? "mt-2 text-[14px]" : "mt-4 text-[16px]"
          }`}
        >
          {kompakt ? p.archiveText : p.text}
        </p>
      </div>

      {/* Höjden reserveras innan Googles skript hunnit rita knappen. Utan den
          växer rutan när knappen dyker upp, och det är precis en sådan
          förskjutning som mäts som CLS.

          60 px är uppmätt på den live sajten: Google lägger in en iframe från
          news.google.com i behållaren, och den blir 60 hög. Här stod först 40,
          vilket var en gissning och lämnade kvar ett hopp på tjugo punkter. */}
      <div
        className={
          kompakt ? "min-h-[60px] shrink-0" : "mt-6 min-h-[60px]"
        }
      >
        <div google-add-preferred-source-btn="" />
      </div>
    </section>
  );
}
