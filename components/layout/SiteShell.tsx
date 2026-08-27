import { ChatWidget } from "@/components/layout/ChatWidget";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Matning } from "@/components/layout/Matning";
import { MotionRuntime } from "@/components/layout/MotionRuntime";
import { Samtycke } from "@/components/layout/Samtycke";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { getDictionary, type Locale, localePath } from "@/lib/i18n";

/** Allt som ligger runt sidinnehållet — delas av alla rotlayouter. */
export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = getDictionary(locale);

  return (
    <>
      <Header locale={locale} t={t} />
      <main>{children}</main>
      <Footer locale={locale} t={t} />
      <ScrollToTop href={`${localePath(locale, "/")}#top`} label={t.a11y.toTop} />
      <MotionRuntime />
      <ChatWidget />
      <Matning />
      <Samtycke locale={locale} t={t} />
    </>
  );
}
