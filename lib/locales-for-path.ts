import { getArticle } from "@/content/blog";
import { localesForArticle, localesWithBlogIndex } from "@/content/blog-copy";
import { getLocation } from "@/content/locations";
import {
  localesForLocation,
  localesWithLocationIndex,
} from "@/content/location-copy";
import { type Locale, locales } from "@/lib/i18n";

/**
 * Språk en viss sida faktiskt finns på.
 *
 * Språkväxlaren cyklade tidigare blint sv → en → fa och lämnade sedan över
 * till hreflang för att hitta rätt URL. På en bloggartikel betydde det att
 * knappen sa EN, engelskan saknar blogg, och besökaren hamnade på den
 * engelska startsidan. Persiskan gick inte att nå alls, trots att alla
 * artiklar är översatta.
 *
 * `path` anges utan språkprefix, alltså så som `stripLocale` lämnar den.
 *
 * Uträkningen görs synkront ur innehållet i stället för att läsas ur DOM:en,
 * så att servern och klienten kommer fram till samma svar. Läses den ur
 * hreflang efter hydrering hinner knappen visa fel språk först.
 */
export function localesForPath(path: string): Locale[] {
  const rent = path.replace(/\/+$/, "") || "/";

  if (rent === "/blogg") return localesWithBlogIndex();

  const artikel = rent.match(/^\/blogg\/([^/]+)$/);
  if (artikel) {
    return getArticle(artikel[1]) ? localesForArticle(artikel[1]) : ["sv"];
  }

  if (rent === "/redovisningsbyra") return localesWithLocationIndex();

  const ort = rent.match(/^\/redovisningsbyra\/([^/]+)$/);
  if (ort) {
    return getLocation(ort[1]) ? localesForLocation(ort[1]) : ["sv"];
  }

  /**
   * Sidan om persisk redovisning finns på svenska och persiska, men de två
   * versionerna delar inte sökväg: persiskan ligger kvar på den gamla sajtens
   * adress utan språkprefix, se sidornas egna kommentarer.
   *
   * Språkmenyn bygger sina adresser genom att byta prefix på den sökväg den
   * får in, och kan därför inte uttrycka det paret. Lämnades det åt den
   * pekade menyn på /persisk-redovisningsbyra och /en/persisk-redovisningsbyra,
   * som båda är 404. Ett språk var alltså rätt svar tills menyn kan ta emot
   * en egen adress per språk: då döljer den sig, och besökaren byter språk på
   * knappen som står i sidans egen text i stället.
   *
   * Kopplingen mellan versionerna finns kvar där den betyder något för
   * sökmotorn, alltså i hreflang och i sitemap.
   */
  if (rent === "/persisk-redovisningsbyra-stockholm") return ["fa"];
  if (rent === "/persisk-redovisningsbyra") return ["sv"];

  // Startsidan, tjänsterna och integritetspolicyn finns på alla tre.
  return [...locales];
}

/**
 * Nästa språk att erbjuda på sidan, eller undefined när den bara finns på ett.
 *
 * Cykeln följer samma ordning som `locales`, men hoppar över de språk sidan
 * saknar. En knapp som leder till en sida som inte finns är sämre än ingen
 * knapp alls.
 */
export function nextLocaleForPath(
  locale: Locale,
  path: string,
): Locale | undefined {
  const tillgängliga = localesForPath(path);
  if (tillgängliga.length < 2) return undefined;

  const ordning = locales.filter((l) => tillgängliga.includes(l));
  const i = ordning.indexOf(locale);
  return ordning[(i + 1) % ordning.length];
}
