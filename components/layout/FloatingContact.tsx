"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Dictionary } from "@/content/locales/sv";
import { social, whatsappUrl } from "@/content/site";
import { InstagramGlyph, WhatsAppGlyph } from "@/components/ui/icons";

/**
 * Datumkortet visar dagens datum. Det får inte renderas på servern — då
 * fryses build-tidens datum in i HTML:en. useSyncExternalStore ger tom
 * server-snapshot och riktigt datum först på klienten.
 */
let cachedToday: { day: string; monthIndex: number } | null = null;

function readToday() {
  if (!cachedToday) {
    const now = new Date();
    cachedToday = { day: String(now.getDate()), monthIndex: now.getMonth() };
  }
  return cachedToday;
}

/** Datumet ändras inte under en sessions livstid — inget att prenumerera på. */
const subscribeToNothing = () => () => {};

/**
 * Flytande kontaktwidget nere till höger. Fyra element flyger ut ur FAB:en.
 *
 * bottom:96px är medvetet — GoHighLevel-chatbubblan lägger sig själv i nedre
 * högra hörnet och den här widgeten måste ligga ovanför den.
 *
 * Öppnas på hover (desktop), klick (touch) och fokus (tangentbord). Escape
 * stänger. Prototypen var enbart hover-driven.
 */
export function FloatingContact({ t }: { t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const today = useSyncExternalStore(
    subscribeToNothing,
    readToday,
    () => null,
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      containerRef.current
        ?.querySelector<HTMLButtonElement>("[data-fab]")
        ?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Gemensam ut-/inflygning för de fyra barnen.
  const fly = (delay: string): React.CSSProperties => ({
    opacity: open ? 1 : 0,
    transform: open ? "none" : "translate(50px,70px) scale(.4)",
    pointerEvents: open ? "auto" : "none",
    transition: `opacity .45s ease ${delay}, transform .45s var(--ease) ${delay}`,
  });

  return (
    <div
      ref={containerRef}
      className="fixed right-[22px] bottom-[96px] z-[95] h-[270px] w-[250px]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <div id={panelId} aria-hidden={!open}>
        {/* Datumkort */}
        <div
          className="absolute top-[6px] left-[56px] flex flex-col items-center gap-px rounded-float border border-[rgba(23,19,16,.08)] bg-surface px-[14px] py-[10px] shadow-[var(--shadow-float)]"
          style={fly(".12s")}
        >
          <span className="font-heading text-[20px] leading-none text-text">
            {today?.day ?? ""}
          </span>
          <span className="font-mono text-[9px] font-semibold tracking-[.14em] text-accent-ink">
            {today ? t.widget.months[today.monthIndex] : ""}
          </span>
        </div>

        {/* Bloggkort */}
        <Link
          href="/blogg"
          tabIndex={open ? undefined : -1}
          className="absolute top-[64px] left-0 block w-[190px] overflow-hidden rounded-float border border-[rgba(23,19,16,.08)] bg-surface no-underline shadow-[0_14px_40px_rgba(23,19,16,.18)]"
          style={fly(".05s")}
        >
          <Image
            src="/assets/blogg-thumb.webp"
            alt=""
            width={190}
            height={96}
            className="block h-[96px] w-full object-cover"
          />
          <span className="flex items-center justify-between px-[14px] py-[10px] font-mono text-[11px] font-medium tracking-[.2em] text-text uppercase">
            {t.widget.blog} <span className="text-accent-ink">↗</span>
          </span>
        </Link>

        {/* Instagram */}
        <a
          href={social.instagram}
          target="_blank"
          rel="noopener"
          aria-label="Instagram"
          tabIndex={open ? undefined : -1}
          className="absolute bottom-[14px] left-[34px] flex h-[46px] w-[46px] items-center justify-center rounded-float border border-[rgba(23,19,16,.08)] bg-surface no-underline shadow-[var(--shadow-float)]"
          style={fly(".18s")}
        >
          <InstagramGlyph />
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener"
          aria-label="WhatsApp"
          tabIndex={open ? undefined : -1}
          className="absolute top-[120px] right-0 flex h-[46px] w-[46px] items-center justify-center rounded-full bg-whatsapp no-underline shadow-[0_12px_32px_rgba(37,211,102,.4)]"
          style={fly(".22s")}
        >
          <WhatsAppGlyph size={24} fill="#FFFFFF" />
        </a>
      </div>

      <button
        type="button"
        data-fab
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t.a11y.closeContact : t.a11y.openContact}
        className="absolute right-0 bottom-0 flex h-[62px] w-[62px] cursor-pointer items-center justify-center rounded-full border-none bg-[image:var(--gradient-fab)] shadow-[var(--shadow-fab)] transition-transform duration-[.45s] ease-[var(--ease)] hover:scale-[1.06]"
      >
        <span
          aria-hidden="true"
          className="block text-[26px] leading-none font-light text-on-dark transition-transform duration-[.45s] ease-[var(--ease)]"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
    </div>
  );
}
