/**
 * Förhandsläge för granskningskopian.
 *
 * Sätts med NEXT_PUBLIC_PREVIEW=1 i byggmiljön. En kopia av sajten som Google
 * hittar blir en dubblett av den riktiga, med samma texter och samma canonical
 * mot nordicphoenix.se. Det kan skada originalet, och det är svårt att städa
 * upp i efterhand. Därför spärras hela kopian i både robots.txt och per sida.
 *
 * Produktionsbygget sätter inte variabeln och påverkas inte.
 */
export const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "1";
