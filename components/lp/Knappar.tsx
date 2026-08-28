"use client";

import { halsokontroll } from "@/content/site";
import { bokningsklick, whatsappklick } from "@/lib/handelser";

/**
 * Knapparna som leder till formuläret respektive WhatsApp.
 *
 * Klientkomponenter enbart för att de rapporterar klicket. Resten av sidan är
 * serverrenderad och skickar inget JavaScript alls.
 *
 * `plats` följer med i händelsen så att vi i efterhand kan se vilken av
 * sidans fyra uppmaningar som faktiskt driver bokningarna, i stället för att
 * bara veta att någon tryckte någonstans.
 */

const ANKARE = "#boka";

export function BokaKnapp({
  plats,
  etikett,
  variant = "primar",
  bred = false,
  klass,
}: {
  plats: string;
  etikett: string;
  variant?: "primar" | "kontur";
  bred?: boolean;
  /** Egen stil när sektionen har annan bakgrund. Ersätter varianten. */
  klass?: string;
}) {
  const stil =
    klass ??
    (variant === "primar"
      ? "np-btn np-btn-primary px-8 py-[17px] text-[16px]"
      : "np-btn np-btn-outline px-7 py-[16px] text-[16px]");

  return (
    <a
      href={ANKARE}
      onClick={() => bokningsklick(plats)}
      className={`${stil} ${bred ? "w-full" : ""}`}
    >
      {etikett}
    </a>
  );
}

export function WhatsAppKnapp({
  plats,
  etikett = "در واتساپ پیام دهید",
  bred = false,
  klass,
}: {
  plats: string;
  etikett?: string;
  bred?: boolean;
  /** Egen stil när sektionen har annan bakgrund. */
  klass?: string;
}) {
  return (
    <a
      href={halsokontroll.whatsappUrl}
      target="_blank"
      rel="noopener"
      onClick={() => whatsappklick(plats)}
      className={`${klass ?? "np-btn np-btn-outline px-7 py-[16px] text-[16px]"} ${bred ? "w-full" : ""}`}
    >
      {etikett}
    </a>
  );
}

/**
 * Fast rad längst ner på telefon.
 *
 * Bara på små skärmar: på dator finns knapparna redan i synfältet. Höjden
 * hålls nere till en knapprad, och sidan får matchande bottenutrymme så att
 * raden aldrig täcker innehåll.
 *
 * `pb-[env(safe-area-inset-bottom)]` gör att raden hamnar ovanför
 * hemindikatorn på iPhone i stället för under den.
 */
export function FastMobilrad() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(23,19,16,.1)] bg-page/95 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur-[10px] md:hidden">
      <div className="flex gap-3">
        <BokaKnapp plats="mobilrad" etikett={halsokontroll.cta} bred />
        <WhatsAppKnapp plats="mobilrad" etikett="واتساپ" />
      </div>
    </div>
  );
}
