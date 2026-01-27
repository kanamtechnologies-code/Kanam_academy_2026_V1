"use client";

import * as React from "react";

export function WelcomeVideoFader({
  sources,
  intervalMs = 9000,
  fadeMs = 900,
  className,
}: {
  sources: string[];
  intervalMs?: number;
  fadeMs?: number;
  className?: string;
}) {
  const safeSources = sources.filter(Boolean);
  const [idx, setIdx] = React.useState(0);
  const videoRefs = React.useRef<Array<HTMLVideoElement | null>>([]);

  React.useEffect(() => {
    if (safeSources.length <= 1) return;
    const t = window.setInterval(() => {
      setIdx((prev) => (prev + 1) % safeSources.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs, safeSources.length]);

  React.useEffect(() => {
    // Best-effort: keep all videos playing so crossfades are smooth.
    videoRefs.current.forEach((v) => {
      v?.play?.().catch(() => {
        // autoplay can fail in rare cases; muted+playsInline usually works.
      });
    });
  }, [idx]);

  if (safeSources.length === 0) return null;

  return (
    <div className={["relative h-full w-full overflow-hidden", className ?? ""].join(" ")}>
      {safeSources.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            opacity: i === idx ? 1 : 0,
            transition: `opacity ${fadeMs}ms ease-in-out`,
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}

