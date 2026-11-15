import { MINSTA_IFYLLNADSTID, tolkaKontakt } from "./falt";

/**
 * Serverdelen av kontaktformuläret. Körs som Cloudflare Pages Function, se
 * `functions/api/kontakt.ts`, och hålls fri från Cloudflare-specifika typer
 * så att den går att köra och testa med vanlig Node.
 *
 * Funktionen kontrollerar och skickar vidare, inget annat. Kontakten, mejlen
 * till kunden och notiserna till byrån sköts av arbetsflödet i Climon
 * System, se docs/kontaktformular.md.
 *
 * Varför den alls finns, när landningssidans formulär postar direkt till sin
 * webhook: arbetsflödet skickar mejl till den adress som anges. Ligger
 * webhookadressen öppet i webbläsaren kan vem som helst skripta anrop mot
 * den och få byråns avsändardomän att mejla godtyckliga adresser, vilket
 * förstör domänens rykte. Här ligger adressen hemlig, och robotfällan,
 * tidskravet och ursprungskontrollen körs på servern där de inte går att
 * hoppa över.
 */

export type KontaktMiljo = {
  /** Inbound Webhook-triggern i Nordic Phoenix underkonto. Hemlig. */
  GHL_KONTAKT_WEBHOOK?: string;
};

const TILLATNA_URSPRUNG = [
  /^https:\/\/nordicphoenix\.se$/,
  /^https:\/\/www\.nordicphoenix\.se$/,
  /^https:\/\/[a-z0-9-]+\.nordic-phoenix-site\.pages\.dev$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];

const STORSTA_KROPP = 20_000;

function svar(status: number, data: Record<string, unknown>): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function hanteraKontakt(
  request: Request,
  miljo: KontaktMiljo,
): Promise<Response> {
  /* Inget skydd i sig, en robot kan sätta vilken Origin den vill. Men det
     stänger den enklaste vägen: att en annan webbplats postar hit från
     besökarens webbläsare. */
  const ursprung = request.headers.get("origin");
  if (ursprung && !TILLATNA_URSPRUNG.some((r) => r.test(ursprung))) {
    return svar(403, { ok: false });
  }

  const langd = Number(request.headers.get("content-length") ?? 0);
  if (langd > STORSTA_KROPP) return svar(413, { ok: false });

  let radata: Record<string, unknown>;
  try {
    const kropp = await request.text();
    if (kropp.length > STORSTA_KROPP) return svar(413, { ok: false });
    radata = JSON.parse(kropp);
  } catch {
    return svar(400, { ok: false });
  }

  /* Honungsfälla eller orimligt snabb ifyllnad: en robot. Samma svar som vid
     lyckad inskickning, så att den inte lär sig något av försöket. */
  const tid = Number(radata.tid);
  if (radata.webbplats || !Number.isFinite(tid) || tid < MINSTA_IFYLLNADSTID) {
    return svar(200, { ok: true });
  }

  const k = tolkaKontakt(radata);
  if (!k) return svar(400, { ok: false, fel: "ogiltig" });

  if (!miljo.GHL_KONTAKT_WEBHOOK) {
    console.error("kontakt: GHL_KONTAKT_WEBHOOK saknas");
    return svar(502, { ok: false });
  }

  try {
    const res = await fetch(miljo.GHL_KONTAKT_WEBHOOK, {
      method: "POST",
      headers: { "content-type": "application/json" },
      /* Samma fältnamn som landningssidans formulär, så att samma
         fältmappning fungerar i båda arbetsflödena. */
      body: JSON.stringify({
        namn: k.namn,
        epost: k.epost,
        telefon: k.telefon,
        meddelande: k.meddelande,
        sprak: k.sprak,
        formular: "kontakt",
        sida: k.sida,
        ...k.utm,
      }),
    });
    if (!res.ok) {
      console.error("kontakt: webhooken svarade", res.status);
      return svar(502, { ok: false });
    }
  } catch (fel) {
    console.error("kontakt: webhooken gick inte att nå", String(fel));
    return svar(502, { ok: false });
  }

  return svar(200, { ok: true });
}
