import { ChatWidget } from "@/components/layout/ChatWidget";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionRuntime } from "@/components/layout/MotionRuntime";
import { PhoenixBird } from "@/components/layout/PhoenixBird";
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
      <PhoenixBird />
      <main>{children}</main>
      <Footer locale={locale} t={t} />
      <ScrollToTop href={`${localePath(locale, "/")}#top`} label={t.a11y.toTop} />
      <FloatingContact t={t} />
      <MotionRuntime />
      <ChatWidget />
    </>
  );
}
