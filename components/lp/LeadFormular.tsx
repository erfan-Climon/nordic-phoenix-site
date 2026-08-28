"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ghl, halsokontroll } from "@/content/site";
import { formularStartat, leadSkickad, whatsappklick } from "@/lib/handelser";
import { fangaUtm, lasUtm } from "@/lib/utm";

/**
 * Leadformuläret.
 *
 * Skickar direkt från webbläsaren till ett inkommande webhook-steg i GHL.
 * Sajten byggs som statisk export, så det finns ingen egen server att gå via.
 *
 * Ett inbäddat GHL-formulär i iframe var alternativet och valdes bort: då går
 * det varken att styra utseendet i höger-till-vänster, att skicka med
 * kampanjparametrar, eller att avfyra konverteringshändelsen först när
 * inskickningen faktiskt lyckats. Det sista är avgörande, se lib/handelser.ts.
 */

type Lage = "redo" | "skickar" | "klart" | "fel";

const FALT =
  "w-full rounded-[10px] border border-[rgba(23,19,16,.18)] bg-surface px-4 py-3 font-sans text-[16px] text-text outline-none transition-colors duration-200 focus:border-accent focus:ring-2 focus:ring-[rgba(240,103,0,.25)]";
const ETIKETT = "mb-2 block font-sans text-[14px] text-text-muted";

export function LeadFormular() {
  const [lage, setLage] = useState<Lage>("redo");
  const id = useId();
  /* Rapporteras en gång, vid första fokus. En ref och inte state: värdet ska
     inte orsaka en omrendering mitt i att någon skriver. */
  const harBorjat = useRef(false);

  function borjat() {
    if (harBorjat.current) return;
    harBorjat.current = true;
    formularStartat();
  }

  /* Kampanjparametrarna sparas vid första sidvisningen, inte vid inskickning:
     besökaren hinner ofta ladda om eller scrolla länge innan hen fyller i. */
  useEffect(() => {
    fangaUtm();
  }, []);

  if (lage === "klart") return <Tack />;

  async function skicka(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lage === "skickar") return;

    const data = new FormData(e.currentTarget);

    /* Honungsfällan är ifylld, alltså en robot. Vi visar samma kvitto som vid
       en riktig inskickning: en bot som får ett felmeddelande försöker igen
       med en annan taktik, en som tror sig ha lyckats gör det inte. Ingen
       lead skickas och ingen konvertering rapporteras. */
    if (data.get("webbplats")) {
      setLage("klart");
      return;
    }

    setLage("skickar");

    try {
      if (!ghl.leadWebhook) throw new Error("Ingen webhook konfigurerad.");

      const svar = await fetch(ghl.leadWebhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          namn: data.get("namn"),
          telefon: data.get("telefon"),
          epost: data.get("epost"),
          foretag: data.get("foretag"),
          bolagsform: data.get("bolagsform") || undefined,
          erbjudande: "ekonomisk-halsokontroll",
          pris: halsokontroll.prisSiffra,
          valuta: halsokontroll.valuta,
          sida: window.location.href,
          ...lasUtm(),
        }),
      });
      if (!svar.ok) throw new Error(`GHL svarade ${svar.status}`);

      /* Först här. Ett klick på knappen är inte en lead. */
      leadSkickad(halsokontroll.prisSiffra, halsokontroll.valuta);
      setLage("klart");
    } catch {
      setLage("fel");
    }
  }

  return (
    <form
      onSubmit={skicka}
      onFocusCapture={borjat}
      noValidate={false}
      className="relative flex flex-col gap-5"
    >
      <div>
        <label htmlFor={`${id}-namn`} className={ETIKETT}>
          نام و نام خانوادگی
        </label>
        <input
          id={`${id}-namn`}
          name="namn"
          required
          autoComplete="name"
          className={FALT}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-tel`} className={ETIKETT}>
            شماره تلفن
          </label>
          {/* dir ltr på telefonnumret: siffror och plustecken ska stå i
              inmatningsordning även på en höger-till-vänster-sida. */}
          <input
            id={`${id}-tel`}
            name="telefon"
            type="tel"
            required
            dir="ltr"
            autoComplete="tel"
            inputMode="tel"
            className={`${FALT} text-start`}
          />
        </div>
        <div>
          <label htmlFor={`${id}-epost`} className={ETIKETT}>
            ایمیل
          </label>
          <input
            id={`${id}-epost`}
            name="epost"
            type="email"
            required
            dir="ltr"
            autoComplete="email"
            inputMode="email"
            className={`${FALT} text-start`}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-foretag`} className={ETIKETT}>
            نام شرکت <span className="text-text-meta">(اختیاری)</span>
          </label>
          <input
            id={`${id}-foretag`}
            name="foretag"
            autoComplete="organization"
            className={FALT}
          />
        </div>
        <div>
          <label htmlFor={`${id}-form`} className={ETIKETT}>
            نوع شرکت <span className="text-text-meta">(اختیاری)</span>
          </label>
          <select id={`${id}-form`} name="bolagsform" className={FALT} defaultValue="">
            <option value="">انتخاب کنید</option>
            <option value="Aktiebolag">Aktiebolag</option>
            <option value="Enskild firma">Enskild firma</option>
            <option value="Annat">سایر</option>
          </select>
        </div>
      </div>

      {/* Honungsfälla mot skräprobotar.

          Webhookadressen ligger i klientkoden och kan inte döljas, så vem som
          helst kan posta till den. En robot som fyller i alla fält den hittar
          fastnar här: fältet är dolt för människor men syns i HTML:en, och ett
          ifyllt värde gör att vi låtsas lyckas utan att skicka något vidare.

          Dolt med position och inte med display:none eller hidden, eftersom
          en del robotar hoppar över fält som är helt bortkopplade. tabIndex
          -1 och aria-hidden håller det borta från tangentbord och
          skärmläsare. autoComplete off så att webbläsaren inte fyller i det. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-webb`}>Webbplats</label>
        <input
          id={`${id}-webb`}
          name="webbplats"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={lage === "skickar"}
        className="np-btn np-btn-primary mt-1 w-full cursor-pointer px-8 py-[18px] text-[17px] disabled:cursor-wait disabled:opacity-70"
      >
        {lage === "skickar" ? "در حال ارسال…" : halsokontroll.cta}
      </button>

      {/* Vad som händer härnäst, direkt under knappen. Den vanligaste tysta
          invändningen på ett leadformulär är "vad händer nu", och svaret ska
          stå där tummen redan är. */}
      <p className="m-0 -mt-2 text-center font-sans text-[14px] leading-[1.7] text-text-muted">
        پس از ارسال درخواست، برای هماهنگی زمان با شما تماس می‌گیریم.
      </p>

      {lage === "fel" ? (
        <p
          role="alert"
          className="m-0 rounded-[10px] bg-[rgba(240,103,0,.08)] p-4 font-sans text-[15px] leading-[1.7] text-text"
        >
          ارسال درخواست ممکن نشد. لطفاً دوباره تلاش کنید یا مستقیم در واتساپ
          پیام دهید.{" "}
          <a
            href={halsokontroll.whatsappUrl}
            target="_blank"
            rel="noopener"
            onClick={() => whatsappklick("formularfel")}
            className="underline"
          >
            در واتساپ پیام دهید
          </a>
        </p>
      ) : null}

      <p className="m-0 font-sans text-[13px] leading-[1.7] text-text-meta">
        اطلاعات شما فقط برای پاسخ به همین درخواست استفاده می‌شود و برای
        بازاریابی با کسی به اشتراک گذاشته نمی‌شود.{" "}
        <Link href="/integritetspolicy" className="underline">
          سیاست حفظ حریم خصوصی
        </Link>
      </p>
    </form>
  );
}

/**
 * Kvittot efter lyckad inskickning.
 *
 * Ersätter formuläret på plats i stället för att skicka besökaren till en
 * egen tacksida. Sajten har ingen sådan arkitektur, och en extra sidladdning
 * hade riskerat att tappa besökare precis efter konverteringen.
 */
function Tack() {
  return (
    <div
      role="status"
      className="rounded-card border border-[rgba(240,103,0,.3)] bg-[rgba(240,103,0,.06)] p-[clamp(28px,4vw,44px)]"
    >
      <h3 className="np-h3 m-0 mb-4 text-[length:var(--fs-h3-sm)] leading-[1.3]">
        درخواست شما دریافت شد
      </h3>
      <p className="m-0 mb-7 font-sans text-[16px] leading-[1.8] text-text-muted">
        از تماس شما متشکریم. ققنوس شمالی برای هماهنگی مرحله بعد با شما تماس
        خواهد گرفت.
      </p>
      <a
        href={halsokontroll.whatsappUrl}
        target="_blank"
        rel="noopener"
        onClick={() => whatsappklick("tack")}
        className="np-btn np-btn-outline px-7 py-[15px] text-[15px]"
      >
        در واتساپ پیام دهید
      </a>
    </div>
  );
}
