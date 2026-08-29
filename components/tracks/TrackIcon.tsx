import type { ReactElement, ReactNode } from "react";

import type { Track } from "@/lib/tracks";
import { cn } from "@/lib/utils";

/**
 * Kanam track marks — premium pictogram system
 * ------------------------------------------------
 * Grid:        32×32 with ~2px optical padding
 * Mass:        bold filled silhouettes (not thin stroke UI icons)
 * Palette:     currentColor (brand green) + brass gold + white cutouts
 * Accent rule: exactly one gold focal detail per mark
 * Silhouette:  each track must read uniquely at ~24–80px
 *
 * Metaphors (chosen for instant recognition + curriculum fit):
 *  - AI Literacy      → illuminated eye (see / judge AI clearly)
 *  - Advanced AI      → atomic core + orbit (build systems)
 *  - AP CSP Prep      → sealed certificate (exam readiness)
 *  - Digital Literacy → compass in frame (navigate the web)
 *  - Cybersecurity    → shield with keyhole (protect accounts)
 *  - Financial Lit.   → stacked coins (money decisions)
 *  - AI + Python      → geometric helper bot (build with code)
 *  - Data Analyst     → rising area chart (insight from data)
 */

/** Logo brass gold — single accent per mark. */
const GOLD = "#d8c07a";

type GlyphProps = {
  className?: string;
  title?: string;
};

function Mark({
  className,
  title,
  children,
}: GlyphProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden={!title}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** AI Literacy — illuminated eye: see AI clearly, use it wisely. */
function AiLiteracyGlyph(props: GlyphProps) {
  return (
    <Mark {...props}>
      {/* Soft brow / lid weight */}
      <path
        d="M4 15.2C6.8 9.6 10.6 6.8 16 6.8S25.2 9.6 28 15.2C25.2 20.8 21.4 23.6 16 23.6S6.8 20.8 4 15.2Z"
        fill="currentColor"
      />
      {/* Sclera cutout */}
      <ellipse cx="16" cy="15.2" rx="7.2" ry="5.1" fill="#fff" />
      {/* Iris */}
      <circle cx="16" cy="15.2" r="3.55" fill="currentColor" />
      {/* Gold pupil / spark of judgment */}
      <circle cx="16" cy="15.2" r="1.65" fill={GOLD} />
      <circle cx="17.15" cy="14.15" r="0.55" fill="#fff" />
      {/* Insight spark above */}
      <path
        d="M16 2.2l.85 2.35L19.2 5.4l-2.35.85L16 8.6l-.85-2.35L12.8 5.4l2.35-.85L16 2.2Z"
        fill={GOLD}
      />
    </Mark>
  );
}

/** Advanced AI — atomic core with orbiting node: build & audit systems. */
function AdvancedAiGlyph(props: GlyphProps) {
  return (
    <Mark {...props}>
      {/* Soft outer disc */}
      <circle cx="16" cy="16" r="12.4" fill="currentColor" />
      {/* Inner well */}
      <circle cx="16" cy="16" r="8.6" fill="#fff" />
      {/* Orbital ellipse */}
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="4.1"
        transform="rotate(-38 16 16)"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Gold nucleus */}
      <circle cx="16" cy="16" r="3.5" fill={GOLD} />
      <circle cx="16" cy="16" r="1.35" fill="currentColor" />
      {/* Satellites */}
      <circle cx="25.2" cy="9.4" r="2.3" fill={GOLD} />
      <circle cx="6.9" cy="22.2" r="1.7" fill="currentColor" />
    </Mark>
  );
}

/** AP CSP Prep — sealed certificate: exam readiness. */
function ApCspPrepGlyph(props: GlyphProps) {
  return (
    <Mark {...props}>
      {/* Certificate body */}
      <path
        d="M7 3.5h18a2.25 2.25 0 0 1 2.25 2.25v17.5a2.25 2.25 0 0 1-2.25 2.25H7A2.25 2.25 0 0 1 4.75 23.25V5.75A2.25 2.25 0 0 1 7 3.5Z"
        fill="currentColor"
      />
      {/* Header band */}
      <rect x="7.75" y="5.6" width="16.5" height="3.4" rx="1" fill={GOLD} />
      {/* Text lines */}
      <rect x="8.5" y="11.2" width="11.5" height="1.7" rx="0.6" fill="#fff" />
      <rect x="8.5" y="14.4" width="14" height="1.7" rx="0.6" fill="#fff" />
      <rect x="8.5" y="17.6" width="9" height="1.7" rx="0.6" fill="#fff" />
      {/* Gold seal + check */}
      <circle cx="22.4" cy="22.1" r="4.35" fill={GOLD} />
      <path
        d="M20.35 22.15l1.25 1.25 2.7-2.85"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Mark>
  );
}

/** Digital Literacy — compass in a frame: navigate info wisely. */
function DigitalLiteracyGlyph(props: GlyphProps) {
  return (
    <Mark {...props}>
      {/* Device frame */}
      <rect x="3.5" y="3.75" width="25" height="20.75" rx="3.25" fill="currentColor" />
      <rect x="6" y="6.2" width="20" height="14" rx="1.75" fill="#fff" />
      {/* Compass body */}
      <circle cx="16" cy="13.2" r="5.85" fill="currentColor" />
      <circle cx="16" cy="13.2" r="4.35" fill="#fff" />
      {/* Cardinal ticks */}
      <path
        d="M16 9.15v1.35M16 16v1.35M12.95 13.2h-1.35M20.4 13.2H19.05"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      {/* Needle */}
      <path d="M16 7.55l2.15 5.65H13.85L16 7.55Z" fill={GOLD} />
      <path d="M16 18.85l-1.95-5.15h3.9L16 18.85Z" fill="currentColor" />
      <circle cx="16" cy="13.2" r="1.25" fill={GOLD} />
      {/* Stand */}
      <rect x="12.1" y="24.75" width="7.8" height="2.45" rx="1" fill="currentColor" />
    </Mark>
  );
}

/** Cybersecurity — angular shield with keyhole: protect accounts. */
function CybersecurityGlyph(props: GlyphProps) {
  return (
    <Mark {...props}>
      <path
        d="M16 2.4L5.2 6.35v7.15c0 6.55 4.35 11.9 10.8 13.7 6.45-1.8 10.8-7.15 10.8-13.7V6.35L16 2.4Z"
        fill="currentColor"
      />
      {/* Inner panel for depth */}
      <path
        d="M16 5.35L8.4 8.05v5.2c0 4.85 3.15 8.85 7.6 10.25 4.45-1.4 7.6-5.4 7.6-10.25v-5.2L16 5.35Z"
        fill="#fff"
        fillOpacity="0.22"
      />
      {/* Keyhole */}
      <circle cx="16" cy="13.1" r="2.85" fill={GOLD} />
      <path
        d="M14.15 14.8h3.7c.55 0 1 .45 1 1v4.35c0 .7-.55 1.25-1.25 1.25h-3.2c-.7 0-1.25-.55-1.25-1.25V15.8c0-.55.45-1 1-1Z"
        fill={GOLD}
      />
    </Mark>
  );
}

/** Financial Literacy — stacked coins: money decisions. */
function FinancialLiteracyGlyph(props: GlyphProps) {
  return (
    <Mark {...props}>
      {/* Rear coin + rim thickness */}
      <ellipse cx="11.6" cy="9.6" rx="6.6" ry="6.6" fill="currentColor" />
      <path
        d="M5 9.6c0 1.5 2.95 2.7 6.6 2.7s6.6-1.2 6.6-2.7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Mid coin */}
      <ellipse cx="16" cy="15.2" rx="6.9" ry="6.9" fill="currentColor" />
      <path
        d="M9.1 15.2c0 1.55 3.1 2.8 6.9 2.8s6.9-1.25 6.9-2.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Front gold coin */}
      <ellipse cx="20.2" cy="21.2" rx="7.2" ry="7.2" fill={GOLD} />
      <path
        d="M13 21.2c0 1.6 3.2 2.9 7.2 2.9s7.2-1.3 7.2-2.9"
        stroke={GOLD}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M20.2 16.9v8.6M17.45 18.7h5.5M17.45 23.85h5.5"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
    </Mark>
  );
}

/**
 * AI + Python — geometric helper bot (Kanam bot language:
 * low-poly plates, dark visor, asymmetric gold eye).
 */
function PythonStarterGlyph(props: GlyphProps) {
  return (
    <Mark {...props}>
      {/* Antenna */}
      <rect x="14.85" y="2.2" width="2.3" height="3.6" rx="1" fill="currentColor" />
      <circle cx="16" cy="2.35" r="1.85" fill={GOLD} />
      {/* Head / chassis */}
      <path
        d="M7.25 8.1h17.5A2.75 2.75 0 0 1 27.5 10.85v12.4A2.75 2.75 0 0 1 24.75 26H7.25A2.75 2.75 0 0 1 4.5 23.25v-12.4A2.75 2.75 0 0 1 7.25 8.1Z"
        fill="currentColor"
      />
      {/* Visor */}
      <rect x="7.4" y="11.1" width="17.2" height="6.4" rx="1.6" fill="#0f2f28" />
      {/* Eyes — white + gold (Kanam asymmetric accent) */}
      <circle cx="12.1" cy="14.3" r="1.85" fill="#fff" />
      <circle cx="19.9" cy="14.3" r="1.85" fill={GOLD} />
      {/* Mouth plate */}
      <rect x="11.2" y="20.2" width="9.6" height="2.35" rx="1" fill="#fff" />
      {/* Side ports */}
      <rect x="2.6" y="13.4" width="2.3" height="5.2" rx="1" fill="currentColor" />
      <rect x="27.1" y="13.4" width="2.3" height="5.2" rx="1" fill={GOLD} />
    </Mark>
  );
}

/** Data Analyst — rising area chart with gold peak: insight from data. */
function DataAnalystGlyph(props: GlyphProps) {
  return (
    <Mark {...props}>
      {/* Axes */}
      <path
        d="M5 5v19.5H28"
        stroke="currentColor"
        strokeWidth="2.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Smooth filled area */}
      <path
        d="M7.4 22.2C9.8 18.4 11.2 19.8 13.4 16.6c2.1-3 3.4-2.2 5.6-5.4 2-2.9 3.6-4.6 6.8-6.2v17.2H7.4Z"
        fill="currentColor"
      />
      {/* Gold trend line */}
      <path
        d="M7.4 22.2C9.8 18.4 11.2 19.8 13.4 16.6c2.1-3 3.4-2.2 5.6-5.4 2-2.9 3.6-4.6 6.8-6.2"
        stroke={GOLD}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Peak node */}
      <circle cx="25.8" cy="10.9" r="2.45" fill={GOLD} />
      <circle cx="25.8" cy="10.9" r="1.05" fill="currentColor" />
    </Mark>
  );
}

const TRACK_GLYPHS: Record<Track["id"], (props: GlyphProps) => ReactElement> = {
  "ai-literacy": AiLiteracyGlyph,
  "advanced-ai": AdvancedAiGlyph,
  "ap-csp-prep": ApCspPrepGlyph,
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

/** Public path for the premium raster track mark (mint tile included). */
export function trackIconArtSrc(trackId: Track["id"]): string {
  return `/images/tracks/${trackId}.webp?v=2`;
}

/**
 * Premium illustrated track mark for hero / Explore focal spots.
 * Includes its own mint tile — wrap lightly (shadow only), don't re-tile.
 */
export function TrackIconArt({
  trackId,
  className,
  alt,
}: {
  trackId: Track["id"];
  className?: string;
  /** Accessible name; defaults to empty (decorative beside a title). */
  alt?: string;
}) {
  return (
    <img
      src={trackIconArtSrc(trackId)}
      alt={alt ?? ""}
      width={512}
      height={512}
      draggable={false}
      className={cn("h-20 w-20 shrink-0 object-contain", className)}
    />
  );
}

/** Inline SVG markup for static HTML (one-pager / email). Accent = #d8c07a */
export const TRACK_ICON_SVG: Record<Track["id"], string> = {
  "ai-literacy":
    `<svg viewBox="0 0 32 32" fill="none" width="24" height="24" aria-hidden="true"><path d="M4 15.2C6.8 9.6 10.6 6.8 16 6.8S25.2 9.6 28 15.2C25.2 20.8 21.4 23.6 16 23.6S6.8 20.8 4 15.2Z" fill="currentColor"/><ellipse cx="16" cy="15.2" rx="7.2" ry="5.1" fill="#fff"/><circle cx="16" cy="15.2" r="3.55" fill="currentColor"/><circle cx="16" cy="15.2" r="1.65" fill="#d8c07a"/><circle cx="17.15" cy="14.15" r="0.55" fill="#fff"/><path d="M16 2.2l.85 2.35L19.2 5.4l-2.35.85L16 8.6l-.85-2.35L12.8 5.4l2.35-.85L16 2.2Z" fill="#d8c07a"/></svg>`,
  "advanced-ai":
    `<svg viewBox="0 0 32 32" fill="none" width="24" height="24" aria-hidden="true"><circle cx="16" cy="16" r="12.4" fill="currentColor"/><circle cx="16" cy="16" r="8.6" fill="#fff"/><ellipse cx="16" cy="16" rx="11" ry="4.1" transform="rotate(-38 16 16)" stroke="currentColor" stroke-width="2.5" fill="none"/><circle cx="16" cy="16" r="3.5" fill="#d8c07a"/><circle cx="16" cy="16" r="1.35" fill="currentColor"/><circle cx="25.2" cy="9.4" r="2.3" fill="#d8c07a"/><circle cx="6.9" cy="22.2" r="1.7" fill="currentColor"/></svg>`,
  "ap-csp-prep":
    `<svg viewBox="0 0 32 32" fill="none" width="24" height="24" aria-hidden="true"><path d="M7 3.5h18a2.25 2.25 0 0 1 2.25 2.25v17.5a2.25 2.25 0 0 1-2.25 2.25H7A2.25 2.25 0 0 1 4.75 23.25V5.75A2.25 2.25 0 0 1 7 3.5Z" fill="currentColor"/><rect x="7.75" y="5.6" width="16.5" height="3.4" rx="1" fill="#d8c07a"/><rect x="8.5" y="11.2" width="11.5" height="1.7" rx="0.6" fill="#fff"/><rect x="8.5" y="14.4" width="14" height="1.7" rx="0.6" fill="#fff"/><rect x="8.5" y="17.6" width="9" height="1.7" rx="0.6" fill="#fff"/><circle cx="22.4" cy="22.1" r="4.35" fill="#d8c07a"/><path d="M20.35 22.15l1.25 1.25 2.7-2.85" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  "digital-literacy":
    `<svg viewBox="0 0 32 32" fill="none" width="24" height="24" aria-hidden="true"><rect x="3.5" y="3.75" width="25" height="20.75" rx="3.25" fill="currentColor"/><rect x="6" y="6.2" width="20" height="14" rx="1.75" fill="#fff"/><circle cx="16" cy="13.2" r="5.85" fill="currentColor"/><circle cx="16" cy="13.2" r="4.35" fill="#fff"/><path d="M16 9.15v1.35M16 16v1.35M12.95 13.2h-1.35M20.4 13.2H19.05" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/><path d="M16 7.55l2.15 5.65H13.85L16 7.55Z" fill="#d8c07a"/><path d="M16 18.85l-1.95-5.15h3.9L16 18.85Z" fill="currentColor"/><circle cx="16" cy="13.2" r="1.25" fill="#d8c07a"/><rect x="12.1" y="24.75" width="7.8" height="2.45" rx="1" fill="currentColor"/></svg>`,
  cybersecurity:
    `<svg viewBox="0 0 32 32" fill="none" width="24" height="24" aria-hidden="true"><path d="M16 2.4L5.2 6.35v7.15c0 6.55 4.35 11.9 10.8 13.7 6.45-1.8 10.8-7.15 10.8-13.7V6.35L16 2.4Z" fill="currentColor"/><circle cx="16" cy="13.1" r="2.85" fill="#d8c07a"/><path d="M14.15 14.8h3.7c.55 0 1 .45 1 1v4.35c0 .7-.55 1.25-1.25 1.25h-3.2c-.7 0-1.25-.55-1.25-1.25V15.8c0-.55.45-1 1-1Z" fill="#d8c07a"/></svg>`,
  "financial-literacy":
    `<svg viewBox="0 0 32 32" fill="none" width="24" height="24" aria-hidden="true"><ellipse cx="11.6" cy="9.6" rx="6.6" ry="6.6" fill="currentColor"/><path d="M5 9.6c0 1.5 2.95 2.7 6.6 2.7s6.6-1.2 6.6-2.7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><ellipse cx="16" cy="15.2" rx="6.9" ry="6.9" fill="currentColor"/><path d="M9.1 15.2c0 1.55 3.1 2.8 6.9 2.8s6.9-1.25 6.9-2.8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><ellipse cx="20.2" cy="21.2" rx="7.2" ry="7.2" fill="#d8c07a"/><path d="M20.2 16.9v8.6M17.45 18.7h5.5M17.45 23.85h5.5" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"/></svg>`,
  "ai-python":
    `<svg viewBox="0 0 32 32" fill="none" width="24" height="24" aria-hidden="true"><rect x="14.85" y="2.2" width="2.3" height="3.6" rx="1" fill="currentColor"/><circle cx="16" cy="2.35" r="1.85" fill="#d8c07a"/><path d="M7.25 8.1h17.5A2.75 2.75 0 0 1 27.5 10.85v12.4A2.75 2.75 0 0 1 24.75 26H7.25A2.75 2.75 0 0 1 4.5 23.25v-12.4A2.75 2.75 0 0 1 7.25 8.1Z" fill="currentColor"/><rect x="7.4" y="11.1" width="17.2" height="6.4" rx="1.6" fill="#0f2f28"/><circle cx="12.1" cy="14.3" r="1.85" fill="#fff"/><circle cx="19.9" cy="14.3" r="1.85" fill="#d8c07a"/><rect x="11.2" y="20.2" width="9.6" height="2.35" rx="1" fill="#fff"/><rect x="2.6" y="13.4" width="2.3" height="5.2" rx="1" fill="currentColor"/><rect x="27.1" y="13.4" width="2.3" height="5.2" rx="1" fill="#d8c07a"/></svg>`,
  "data-analyst":
    `<svg viewBox="0 0 32 32" fill="none" width="24" height="24" aria-hidden="true"><path d="M5 5v19.5H28" stroke="currentColor" stroke-width="2.55" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.4 22.2C9.8 18.4 11.2 19.8 13.4 16.6c2.1-3 3.4-2.2 5.6-5.4 2-2.9 3.6-4.6 6.8-6.2v17.2H7.4Z" fill="currentColor"/><path d="M7.4 22.2C9.8 18.4 11.2 19.8 13.4 16.6c2.1-3 3.4-2.2 5.6-5.4 2-2.9 3.6-4.6 6.8-6.2" stroke="#d8c07a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="25.8" cy="10.9" r="2.45" fill="#d8c07a"/><circle cx="25.8" cy="10.9" r="1.05" fill="currentColor"/></svg>`,
};

