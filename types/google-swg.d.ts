import "react";

/**
 * Googles knapp för Preferred Sources markeras med ett attribut utan värde,
 * `google-add-preferred-source-btn`, som deras publisher.js letar efter.
 *
 * React skickar vidare okända attribut som innehåller bindestreck, så det
 * fungerar i webbläsaren utan vidare. TypeScript känner däremot bara till
 * `data-*` och `aria-*` som fria attribut och avvisar alla andra.
 *
 * Deklarationssammanslagning är det dokumenterade sättet att lära TypeScript
 * ett eget attribut. Alternativen hade varit att spreada ett otypat objekt
 * eller att tysta felet, och båda hade tagit bort kontrollen i stället för
 * att beskriva verkligheten.
 */
declare module "react" {
  /* Typparametern används inte här men måste stå kvar: en sammanslagning
     måste ha exakt samma signatur som gränssnittet den utökar, och Reacts
     HTMLAttributes är generisk över elementtypen. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    /** Sätts utan värde. Googles skript byter ut elementets innehåll. */
    "google-add-preferred-source-btn"?: "";
  }
}
