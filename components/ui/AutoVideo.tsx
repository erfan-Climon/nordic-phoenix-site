"use client";

import { useEffect, useRef } from "react";
import { forceMutedPlayback, retryPlayback } from "@/lib/motion";

type Props = {
  src: string;
  /** Läggs före `src` som <source>, för format som inte alla spelar. */
  webmSrc?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Startar uppspelning först när elementet syns (Om-sektionen). */
  playWhenVisible?: boolean;
  poster?: string;
  title?: string;
  /**
   * Videons verkliga pixelmått. Reserverar rutan innan filen laddats.
   *
   * Utan dem antar webbläsaren 300 × 150, alltså 2:1. Om-videon är porträtt
   * 720 × 1280, så rutan växte 445 px när metadatan kom och allt nedanför
   * hoppade. Uppmätt gav det CLS 0,25 där Googles gräns går vid 0,1.
   */
  width?: number;
  height?: number;
};

/**
 * Autoplay-video som alltid är ljudlös. Attributen sätts imperativt på
 * DOM-noden — se lib/motion.ts för varför JSX-attributen inte räcker.
 */
export function AutoVideo({
  src,
  webmSrc,
  className,
  style,
  playWhenVisible = false,
  poster,
  title,
  width,
  height,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const cancel = retryPlayback(() => ref.current);

    if (!playWhenVisible || !("IntersectionObserver" in window)) {
      return cancel;
    }

    const el = ref.current;
    if (!el) return cancel;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) forceMutedPlayback(ref.current);
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(el);

    return () => {
      cancel();
      observer.disconnect();
    };
  }, [playWhenVisible]);

  return (
    <video
      ref={ref}
      /* Med <source> får webbläsaren välja format. `src` sätts bara när det
         inte finns någon webm, annars vinner attributet över barnen. */
      src={webmSrc ? undefined : src}
      poster={poster}
      title={title}
      autoPlay
      muted
      loop
      playsInline
      width={width}
      height={height}
      preload="metadata"
      className={className}
      style={style}
    >
      {webmSrc ? (
        <>
          <source src={webmSrc} type="video/webm" />
          <source src={src} type="video/mp4" />
        </>
      ) : null}
    </video>
  );
}
