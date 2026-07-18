import type { ReactElement } from "react";

import type { Track } from "@/lib/tracks";
import { cn } from "@/lib/utils";

/** Logo gold accent. */
const ACCENT = "#d8c07a";

type GlyphProps = {
  className?: string;
  title?: string;
};

/**
 * Bold Kanam track marks: thick filled geometry, deep green + brass gold.
 */
function AiLiteracyGlyph({ className, title }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <rect x="2" y="2" width="6.5" height="6.5" rx="1.25" fill="currentColor" />
      <rect x="15.5" y="2" width="6.5" height="6.5" rx="1.25" fill="currentColor" />
      <rect x="8.75" y="15.5" width="6.5" height="6.5" rx="1.25" fill={ACCENT} />
      <path d="M8.5 5.25h7" stroke="currentColor" strokeWidth="2.75" strokeLinecap="square" />
      <path d="M5.25 8.5v5.25c0 1.4 1.1 2.5 2.5 2.5h1" stroke="currentColor" strokeWidth="2.75" strokeLinecap="square" />
      <path d="M18.75 8.5v4c0 1.25-.9 2.25-2.15 2.25H14" stroke="currentColor" strokeWidth="2.75" strokeLinecap="square" />
    </svg>
  );
}

function DigitalLiteracyGlyph({ className, title }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <rect x="2.5" y="3.5" width="19" height="14" rx="2" fill="currentColor" />
      <rect x="5.5" y="6.5" width="8" height="2.75" rx="0.6" fill="#fff" />
      <rect x="5.5" y="11" width="5" height="2.75" rx="0.6" fill={ACCENT} />
      <rect x="8.5" y="19" width="7" height="2.5" rx="0.6" fill="currentColor" />
    </svg>
  );
}

function CybersecurityGlyph({ className, title }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <path
        d="M12 2L3.5 5.75v5.5c0 5.1 3.45 9.7 8.5 11.25 5.05-1.55 8.5-6.15 8.5-11.25v-5.5L12 2z"
        fill="currentColor"
      />
      <rect x="10.25" y="9.25" width="3.5" height="7" rx="1.1" fill={ACCENT} />
      <circle cx="12" cy="9.75" r="2.4" fill={ACCENT} />
    </svg>
  );
}

function FinancialLiteracyGlyph({ className, title }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <rect x="2.5" y="13.5" width="5" height="7.5" rx="1.1" fill="currentColor" />
      <rect x="9.5" y="8" width="5" height="13" rx="1.1" fill="currentColor" />
      <rect x="16.5" y="3" width="5" height="18" rx="1.1" fill={ACCENT} />
    </svg>
  );
}

function PythonStarterGlyph({ className, title }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <rect x="5" y="6.5" width="14" height="12.5" rx="2.25" fill="currentColor" />
      <rect x="8.5" y="2" width="3" height="4.5" rx="0.7" fill="currentColor" />
      <rect x="12.5" y="2" width="3" height="4.5" rx="0.7" fill={ACCENT} />
      <rect x="7.75" y="10.25" width="3.25" height="3.25" rx="0.7" fill="#fff" />
      <rect x="13" y="10.25" width="3.25" height="3.25" rx="0.7" fill={ACCENT} />
      <rect x="8.5" y="15.75" width="7" height="1.75" rx="0.5" fill="#fff" />
    </svg>
  );
}

function DataAnalystGlyph({ className, title }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <rect x="2.5" y="3" width="19" height="5" rx="1.25" fill="currentColor" />
      <rect x="2.5" y="9.5" width="19" height="5" rx="1.25" fill="currentColor" />
      <rect x="2.5" y="16" width="11" height="5" rx="1.25" fill="currentColor" />
      <rect x="15" y="16" width="6.5" height="5" rx="1.25" fill={ACCENT} />
    </svg>
  );
}

function AdvancedAiGlyph({ className, title }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden={!title} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="9.25" fill="currentColor" />
      <circle cx="12" cy="12" r="3.25" fill={ACCENT} />
      <path d="M12 3.5v3.25M12 17.25V20.5M3.5 12h3.25M17.25 12H20.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="square" />
      <path d="M6.2 6.2l2.3 2.3M15.5 15.5l2.3 2.3M17.8 6.2l-2.3 2.3M8.5 15.5l-2.3 2.3" stroke={ACCENT} strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

const TRACK_GLYPHS: Record<Track["id"], (props: GlyphProps) => ReactElement> = {
  "ai-literacy": AiLiteracyGlyph,
  "advanced-ai": AdvancedAiGlyph,
  "digital-literacy": DigitalLiteracyGlyph,
  cybersecurity: CybersecurityGlyph,
  "financial-literacy": FinancialLiteracyGlyph,
  "ai-python": PythonStarterGlyph,
  "data-analyst": DataAnalystGlyph,
};

export function TrackIcon({
  trackId,
  className,
}: {
  trackId: Track["id"];
  className?: string;
}) {
  const Glyph = TRACK_GLYPHS[trackId] ?? AiLiteracyGlyph;
  return <Glyph className={cn("h-4 w-4 shrink-0", className)} />;
}

/** Inline SVG markup for static HTML (one-pager / email). Accent = #d8c07a */
export const TRACK_ICON_SVG: Record<Track["id"], string> = {
  "ai-literacy": `<svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true"><rect x="2" y="2" width="6.5" height="6.5" rx="1.25" fill="currentColor"/><rect x="15.5" y="2" width="6.5" height="6.5" rx="1.25" fill="currentColor"/><rect x="8.75" y="15.5" width="6.5" height="6.5" rx="1.25" fill="#d8c07a"/><path d="M8.5 5.25h7" stroke="currentColor" stroke-width="2.75" stroke-linecap="square"/><path d="M5.25 8.5v5.25c0 1.4 1.1 2.5 2.5 2.5h1" stroke="currentColor" stroke-width="2.75" stroke-linecap="square"/><path d="M18.75 8.5v4c0 1.25-.9 2.25-2.15 2.25H14" stroke="currentColor" stroke-width="2.75" stroke-linecap="square"/></svg>`,
  "advanced-ai": `<svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="9.25" fill="currentColor"/><circle cx="12" cy="12" r="3.25" fill="#d8c07a"/><path d="M12 3.5v3.25M12 17.25V20.5M3.5 12h3.25M17.25 12H20.5" stroke="#fff" stroke-width="2.2" stroke-linecap="square"/><path d="M6.2 6.2l2.3 2.3M15.5 15.5l2.3 2.3M17.8 6.2l-2.3 2.3M8.5 15.5l-2.3 2.3" stroke="#d8c07a" stroke-width="2" stroke-linecap="square"/></svg>`,
  "digital-literacy": `<svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true"><rect x="2.5" y="3.5" width="19" height="14" rx="2" fill="currentColor"/><rect x="5.5" y="6.5" width="8" height="2.75" rx="0.6" fill="#fff"/><rect x="5.5" y="11" width="5" height="2.75" rx="0.6" fill="#d8c07a"/><rect x="8.5" y="19" width="7" height="2.5" rx="0.6" fill="currentColor"/></svg>`,
  cybersecurity: `<svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true"><path d="M12 2L3.5 5.75v5.5c0 5.1 3.45 9.7 8.5 11.25 5.05-1.55 8.5-6.15 8.5-11.25v-5.5L12 2z" fill="currentColor"/><rect x="10.25" y="9.25" width="3.5" height="7" rx="1.1" fill="#d8c07a"/><circle cx="12" cy="9.75" r="2.4" fill="#d8c07a"/></svg>`,
  "financial-literacy": `<svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true"><rect x="2.5" y="13.5" width="5" height="7.5" rx="1.1" fill="currentColor"/><rect x="9.5" y="8" width="5" height="13" rx="1.1" fill="currentColor"/><rect x="16.5" y="3" width="5" height="18" rx="1.1" fill="#d8c07a"/></svg>`,
  "ai-python": `<svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true"><rect x="5" y="6.5" width="14" height="12.5" rx="2.25" fill="currentColor"/><rect x="8.5" y="2" width="3" height="4.5" rx="0.7" fill="currentColor"/><rect x="12.5" y="2" width="3" height="4.5" rx="0.7" fill="#d8c07a"/><rect x="7.75" y="10.25" width="3.25" height="3.25" rx="0.7" fill="#fff"/><rect x="13" y="10.25" width="3.25" height="3.25" rx="0.7" fill="#d8c07a"/><rect x="8.5" y="15.75" width="7" height="1.75" rx="0.5" fill="#fff"/></svg>`,
  "data-analyst": `<svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true"><rect x="2.5" y="3" width="19" height="5" rx="1.25" fill="currentColor"/><rect x="2.5" y="9.5" width="19" height="5" rx="1.25" fill="currentColor"/><rect x="2.5" y="16" width="11" height="5" rx="1.25" fill="currentColor"/><rect x="15" y="16" width="6.5" height="5" rx="1.25" fill="#d8c07a"/></svg>`,
};
