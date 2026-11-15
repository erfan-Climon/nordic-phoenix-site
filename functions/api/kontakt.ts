import { hanteraKontakt, type KontaktMiljo } from "../../lib/kontakt/server";

/**
 * POST /api/kontakt, kontaktformulärets mottagare.
 *
 * Cloudflare Pages kör filerna i `functions/` som serverfunktioner bredvid
 * den statiska exporten. Det är den enda serverkod sajten har, och den finns
 * för att webhookadressen ska kunna hållas hemlig.
 *
 * Adressen sätts som miljövariabel på Pages-projektet, se
 * docs/kontaktformular.md. All logik ligger i lib/kontakt/server.ts.
 */
export const onRequestPost = (context: {
  request: Request;
  env: KontaktMiljo;
}): Promise<Response> => hanteraKontakt(context.request, context.env);
