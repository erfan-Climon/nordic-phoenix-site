import { getDictionary, type Locale } from "@/lib/i18n";

export function PrivacyPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="mx-auto max-w-[760px] px-[var(--pad-x)] pt-[clamp(150px,18vh,220px)] pb-[clamp(96px,12vw,160px)]">
      <h1 className="np-h2 mb-4 text-[clamp(36px,5vw,64px)] leading-[1.1]">
        {t.privacy.title}
      </h1>
      <p className="np-meta m-0 mb-[clamp(40px,5vw,64px)] text-text-meta">
        {t.privacy.updated} 2026-07-27
      </p>

      {t.privacy.body.map((section) => (
        <div key={section.heading} className="mb-10">
          <h2 className="np-h2 mb-4 text-[clamp(22px,2.2vw,30px)] leading-[1.25] tracking-[-.01em]">
            {section.heading}
          </h2>
          <p className="m-0 font-sans text-[17px] leading-[1.8] text-text-article">
            {section.text}
          </p>
        </div>
      ))}
    </section>
  );
}
