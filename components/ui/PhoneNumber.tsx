import { phone } from "@/content/site";

/**
 * Telefonnumret med tvingad vänster-till-höger-ordning.
 *
 * I persiskan är dokumentet RTL, och bidi-algoritmen vänder då ordningen på
 * sifferblocken: 072-008 40 00 renderas som 00 40 008-072. Siffror är svaga
 * tecken och tar riktning från omgivningen, så det räcker inte med <bdi> som
 * bara isolerar. dir="ltr" sätter riktningen explicit.
 */
export function PhoneNumber() {
  return <span dir="ltr">{phone.display}</span>;
}
