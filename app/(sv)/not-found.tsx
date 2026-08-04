import Link from "next/link";
import { getDictionary } from "@/lib/i18n";

export default function NotFound() {
  const t = getDictionary("sv");

  return (
    <section className="mx-auto flex min-h-[70svh] max-w-[720px] flex-col justify-center px-[var(--pad-x)] py-[clamp(150px,18vh,220px)]">
      <p className="np-meta m-0 mb-6 text-text-meta">404</p>
      <h1 className="np-h2 mb-6 text-[length:var(--fs-h2)] leading-[1.1]">
        Sidan finns inte.
      </h1>
      <p className="m-0 mb-10 max-w-[46ch] font-sans text-[17px] leading-[1.7] text-text-muted">
        Länken kan vara gammal eller felstavad. Gå tillbaka till startsidan
        eller läs vidare i bloggen.
      </p>
      <div className="flex flex-wrap gap-[14px]">
        <Link href="/" className="np-btn np-btn-primary px-8 py-4 text-[15px]">
          Till startsidan
        </Link>
        <Link
          href="/blogg"
          className="np-btn np-btn-outline px-7 py-[15px] text-[15px]"
        >
          {t.nav.blog}
        </Link>
      </div>
    </section>
  );
}
