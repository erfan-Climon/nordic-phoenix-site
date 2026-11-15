"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { Dictionary } from "@/content/locales/sv";
import { whatsappUrl } from "@/content/site";
import { formularStartat, kontaktSkickad, whatsappklick } from "@/lib/handelser";
import { type Locale, localePath } from "@/lib/i18n";
import { GRANSER, type KontaktSprak } from "@/lib/kontakt/falt";
import { fangaUtm, lasUtm } from "@/lib/utm";

/**
 * Det allmänna kontaktformuläret.
 *
 * Skickar till /api/kontakt, sajtens enda serverfunktion, och inte direkt
 * till Climon System som landningssidans formulär gör. Arbetsflödet bakom
 * mejlar den adress som anges, så webhookadressen får inte ligga öppet i
 * webbläsaren. Se lib/kontakt/server.ts och docs/kontaktformular.md.
 */

type Lage = "redo" | "skickar" | "klart" | "fel";

const FALT =
  "w-full rounded-[10px] border border-[rgba(23,19,16,.18)] bg-surface px-4 py-3 font-sans text-[16px] text-text outline-none transition-colors duration-200 focus:border-accent focus:ring-2 focus:ring-[rgba(240,103,0,.25)]";
const ETIKETT = "mb-2 block font-sans text-[14px] text-text-muted";

export function KontaktFormular({ locale, t }: { locale: Locale; t: Dictionary }) {
  const k = t.kontakt;
  const [lage, setLage] = useState<Lage>("redo");
  const id = useId();
  const harBorjat = useRef(false);
  /* När formuläret visades. Servern avvisar inskickningar som gått orimligt
     fort, vilket är det vanligaste kännetecknet på en robot. */
  const visades = useRef(0);

  useEffect(() => {
    visades.current = Date.now();
    fangaUtm();
  }, []);

  function borjat() {
    if (harBorjat.current) return;
    harBorjat.current = true;
    formularStartat("kontakt");
  }

  if (lage === "klart") {
    return (
      <div
        role="status"
        className="rounded-card border border-[rgba(240,103,0,.3)] bg-[rgba(240,103,0,.06)] p-[clamp(28px,4vw,44px)]"
      >
        <h3 className="np-h3 m-0 mb-4 text-[length:var(--fs-h3-sm)] leading-[1.3]">
          {k.tackRubrik}
        </h3>
        <p className="m-0 font-sans text-[16px] leading-[1.8] text-text-muted">
          {k.tackText}
        </p>
      </div>
    );
  }

  async function skicka(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lage === "skickar") return;
    const data = new FormData(e.currentTarget);
    setLage("skickar");

    try {
      const svar = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          namn: data.get("namn"),
          epost: data.get("epost"),
          telefon: data.get("telefon"),
          meddelande: data.get("meddelande"),
          sprak: data.get("sprak"),
          webbplats: data.get("webbplats"),
          tid: Date.now() - visades.current,
          sida: window.location.href,
          utm: lasUtm(),
        }),
      });
      if (!svar.ok) throw new Error(`Servern svarade ${svar.status}`);

      /* Först här. Ett klick på knappen är inte en lead. */
      kontaktSkickad();
      setLage("klart");
    } catch {
      setLage("fel");
    }
  }

  const sprakval: { varde: KontaktSprak; namn: string }[] = [
    { varde: "sv", namn: k.sprakSv },
    { varde: "fa", namn: k.sprakFa },
    { varde: "en", namn: k.sprakEn },
  ];

  return (
    <form onSubmit={skicka} onFocusCapture={borjat} className="relative flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-namn`} className={ETIKETT}>
            {k.namn}
          </label>
          <input
            id={`${id}-namn`}
            name="namn"
            required
            maxLength={GRANSER.namn}
            autoComplete="name"
            className={FALT}
          />
        </div>
        <div>
          <label htmlFor={`${id}-epost`} className={ETIKETT}>
            {k.epost}
          </label>
          {/* dir ltr: en e-postadress ska stå i skrivordning även på persiska. */}
          <input
            id={`${id}-epost`}
            name="epost"
            type="email"
            required
            dir="ltr"
            maxLength={GRANSER.epost}
            autoComplete="email"
            inputMode="email"
            className={`${FALT} text-start`}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-tel`} className={ETIKETT}>
            {k.telefon} <span className="text-text-meta">{k.valfritt}</span>
          </label>
          <input
            id={`${id}-tel`}
            name="telefon"
            type="tel"
            dir="ltr"
            maxLength={GRANSER.telefon}
            autoComplete="tel"
            inputMode="tel"
            className={`${FALT} text-start`}
          />
        </div>
        <div>
          <label htmlFor={`${id}-sprak`} className={ETIKETT}>
            {k.sprak}
          </label>
          {/* Förvalt sidans språk. Den som läser persiska sidan vill oftast
              bli kontaktad på persiska, men inte alltid. */}
          <select id={`${id}-sprak`} name="sprak" defaultValue={locale} className={FALT}>
            {sprakval.map((s) => (
              <option key={s.varde} value={s.varde}>
                {s.namn}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-medd`} className={ETIKETT}>
          {k.meddelande} <span className="text-text-meta">{k.valfritt}</span>
        </label>
        <textarea
          id={`${id}-medd`}
          name="meddelande"
          rows={4}
          maxLength={GRANSER.meddelande}
          className={`${FALT} resize-y`}
        />
      </div>

      {/* Honungsfälla, samma teknik som i landningssidans formulär: dolt för
          människor men synligt i HTML:en. Ett ifyllt värde ger ett låtsat
          kvitto och ingen förfrågan. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-webb`}>Webbplats</label>
        <input id={`${id}-webb`} name="webbplats" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={lage === "skickar"}
        className="np-btn np-btn-primary w-full cursor-pointer px-8 py-[18px] text-[16px] disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:self-start"
      >
        {lage === "skickar" ? k.skickar : k.skicka}
      </button>

      {lage === "fel" ? (
        <p
          role="alert"
          className="m-0 rounded-[10px] bg-[rgba(240,103,0,.08)] p-4 font-sans text-[15px] leading-[1.7] text-text"
        >
          {k.fel}{" "}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener"
            onClick={() => whatsappklick("kontaktformular-fel")}
            className="underline"
          >
            {k.felWhatsapp}
          </a>
        </p>
      ) : null}

      <p className="m-0 font-sans text-[13px] leading-[1.7] text-text-meta">
        {k.integritet}{" "}
        <Link href={localePath(locale, "/integritetspolicy")} className="underline">
          {k.integritetLank}
        </Link>
      </p>
    </form>
  );
}
