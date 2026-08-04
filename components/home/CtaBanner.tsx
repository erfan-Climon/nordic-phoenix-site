import Image from "next/image";
import { WhatsAppGlyph } from "@/components/ui/icons";
import type { Dictionary } from "@/content/locales/sv";
import { phone, whatsappUrl } from "@/content/site";

export function CtaBanner({ t }: { t: Dictionary }) {
  return (
    <section className="bg-page px-[var(--pad-x)] py-[var(--pad-y-light)]">
      <div
        data-reveal
        className="relative mx-auto grid min-h-[440px] max-w-[var(--content-max)] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end overflow-hidden rounded-banner"
        style={{ background: "var(--gradient-banner)" }}
      >
        <div className="self-center p-[clamp(36px,5vw,72px)]">
          <h2 className="np-h2 mb-5 text-[length:var(--fs-h2)] leading-[1.12] tracking-[-.015em] text-banner-ink">
            {t.banner.h2a} <em>{t.banner.h2b}</em>
          </h2>
          <p className="m-0 mb-8 max-w-[42ch] font-sans text-[16px] leading-[1.7] text-[rgba(28,15,5,.75)]">
            {t.banner.text}
          </p>
          <div className="flex flex-wrap gap-[14px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="np-btn bg-banner-ink px-8 py-4 text-[15px] font-semibold text-[#F2EDE3] hover:-translate-y-[2px] hover:text-[#F2EDE3] hover:shadow-[0_12px_32px_rgba(28,15,5,.35)]"
            >
              <WhatsAppGlyph />
              {t.banner.cta1}
            </a>
            <a
              href={phone.href}
              className="np-btn border-[1.5px] border-[rgba(28,15,5,.5)] px-7 py-[15px] text-[15px] font-medium text-banner-ink hover:border-banner-ink hover:bg-[rgba(28,15,5,.08)] hover:text-banner-ink"
            >
              {t.banner.cta2}
            </a>
          </div>
        </div>

        <div className="flex items-end justify-center px-[clamp(24px,3vw,48px)] pt-[clamp(40px,4vw,64px)]">
          {/* Bottenjusterad så figuren "står" i banderollens underkant */}
          <Image
            src="/assets/ali-cutout-v2.webp"
            alt={t.banner.portraitAlt}
            width={840}
            height={1050}
            loading="lazy"
            className="block h-auto w-[min(420px,90%)] [filter:drop-shadow(0_18px_40px_rgba(28,15,5,.35))]"
          />
        </div>
      </div>
    </section>
  );
}
