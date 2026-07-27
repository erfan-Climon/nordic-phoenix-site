"use client";

import { useEffect, useRef } from "react";
import { forceMutedPlayback, retryPlayback } from "@/lib/motion";

type Props = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** Videokontroller visas på Om-videon, inte på hero. */
  controls?: boolean;
  /** Startar uppspelning först när elementet syns (Om-sektionen). */
  playWhenVisible?: boolean;
  poster?: string;
  title?: string;
};

/**
 * Autoplay-video som alltid är ljudlös. Attributen sätts imperativt på
 * DOM-noden — se lib/motion.ts för varför JSX-attributen inte räcker.
 */
export function AutoVideo({
  src,
  className,
  style,
  controls = false,
  playWhenVisible = false,
  poster,
  title,
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
      src={src}
      poster={poster}
      title={title}
      autoPlay
      muted
      loop
      playsInline
      controls={controls}
      preload="metadata"
      className={className}
      style={style}
    />
  );
}
