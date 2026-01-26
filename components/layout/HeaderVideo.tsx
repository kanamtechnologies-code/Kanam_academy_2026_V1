"use client";

import * as React from "react";

export function HeaderVideo({
  src,
  playbackRate = 0.6,
  className,
}: {
  src: string;
  playbackRate?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.playbackRate = playbackRate;
  }, [playbackRate]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

