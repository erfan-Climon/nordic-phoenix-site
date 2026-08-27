"use client";

import { matning } from "@/content/site";
import { aterstallSamtycke } from "@/lib/samtycke";

/**
 * Länken i footern som tar tillbaka frågan om mätning.
 *
 * Finns bara när något faktiskt mäts. Utan id:n laddas ingenting, och då är
 * en länk till inställningar för något som inte sker bara förvirrande.
 *
 * Renderas som knapp och inte som länk. Den leder ingenstans utan utför en
 * åtgärd, och skärmläsare läser de två olika.
 */
export function SamtyckeLank({ etikett }: { etikett: string }) {
  if (!matning.ga4 && !matning.metaPixel) return null;

  return (
    <button
      type="button"
      onClick={aterstallSamtycke}
      className="cursor-pointer border-none bg-transparent p-0 text-start font-sans text-[14px] leading-[1.7] text-on-dark-muted transition-colors duration-300 hover:text-accent-light"
    >
      {etikett}
    </button>
  );
}
