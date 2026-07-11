"use client";

import * as React from "react";

import {
  cursorForIncompleteSql,
  hasBlankTokens,
  prepareExerciseSql,
  type TypingZone,
} from "@/lib/sqlStarter";
import { cn } from "@/lib/utils";

function escapeHtml(s: string) {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function sqlToHighlightedHtml(sql: string, zones: TypingZone[]) {
  if (!zones.length) return escapeHtml(sql);

  const sorted = [...zones].sort((a, b) => a.start - b.start);
  let out = "";
  let cursor = 0;

  for (const zone of sorted) {
    if (zone.start < cursor) continue;
    out += escapeHtml(sql.slice(cursor, zone.start));
    const inner = sql.slice(zone.start, zone.end);
    if (inner.length === 0) {
      out += '<span class="kanam-typing-zone kanam-typing-zone--empty"></span>';
    } else {
      out += `<span class="kanam-typing-zone">${escapeHtml(inner)}</span>`;
    }
    cursor = Math.max(cursor, zone.end);
  }

  out += escapeHtml(sql.slice(cursor));
  return out;
}

export function SqlTextarea({
  value,
  onChange,
  onFocus,
  readOnly = false,
  placeholder,
  ariaLabel,
  minHeightPx = 120,
  maxHeightPx = 280,
  className,
  autoClearBlanks = false,
  typingZones = [],
  showLineNumbers = true,
  "data-tour": dataTour,
}: {
  value: string;
  onChange: (next: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  placeholder?: string;
  ariaLabel: string;
  minHeightPx?: number;
  maxHeightPx?: number;
  className?: string;
  autoClearBlanks?: boolean;
  /** Green highlight zones — stay visible while the exercise is in progress. */
  typingZones?: TypingZone[];
  showLineNumbers?: boolean;
  "data-tour"?: string;
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const preRef = React.useRef<HTMLPreElement | null>(null);
  const lineNoRef = React.useRef<HTMLPreElement | null>(null);
  const pendingCursor = React.useRef<number | null>(null);
  const [heightPx, setHeightPx] = React.useState(minHeightPx);

  const showZones = !readOnly && typingZones.length > 0;
  const html = React.useMemo(
    () => sqlToHighlightedHtml(value, showZones ? typingZones : []),
    [value, showZones, typingZones]
  );

  const lineCount = React.useMemo(() => Math.max(1, (value ?? "").split("\n").length), [value]);
  const lineDigits = React.useMemo(() => String(lineCount).length, [lineCount]);
  const gutterCh = React.useMemo(() => Math.max(2, lineDigits), [lineDigits]);
  const gutterWidth = showLineNumbers ? `calc(${gutterCh}ch + 1.25rem)` : "0px";
  const contentPaddingLeft = showLineNumbers ? `calc(0.75rem + ${gutterWidth})` : "0.75rem";
  const lineNumbersText = React.useMemo(() => {
    if (!showLineNumbers) return "";
    return Array.from({ length: lineCount }, (_, i) => String(i + 1)).join("\n");
  }, [showLineNumbers, lineCount]);

  const syncScroll = () => {
    const ta = textareaRef.current;
    const pre = preRef.current;
    const ln = lineNoRef.current;
    if (!ta || !pre) return;
    pre.scrollTop = ta.scrollTop;
    pre.scrollLeft = ta.scrollLeft;
    if (ln) ln.scrollTop = ta.scrollTop;
  };

  React.useLayoutEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "0px";
    const clamped = Math.max(minHeightPx, Math.min(maxHeightPx, ta.scrollHeight));
    ta.style.height = `${clamped}px`;
    if (preRef.current) preRef.current.style.height = `${clamped}px`;
    if (lineNoRef.current) lineNoRef.current.style.height = `${clamped}px`;
    setHeightPx((prev) => (prev === clamped ? prev : clamped));

    if (pendingCursor.current !== null) {
      const cursor = pendingCursor.current;
      pendingCursor.current = null;
      ta.setSelectionRange(cursor, cursor);
    }
    syncScroll();
  }, [value, minHeightPx, maxHeightPx, showLineNumbers, lineCount]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    pendingCursor.current = e.target.selectionStart;
    onChange(e.target.value);
  };

  // If a click lands the caret outside every green zone, snap it to the
  // nearest zone so typing always happens inside the highlighted area.
  const snapCaretIntoZone = React.useCallback(() => {
    const ta = textareaRef.current;
    if (!ta || !showZones || typingZones.length === 0) return;
    if (ta.selectionStart !== ta.selectionEnd) return;
    const pos = ta.selectionStart;
    const inside = typingZones.some((z) => pos >= z.start && pos <= z.end);
    if (inside) return;
    let target = typingZones[0].start;
    let bestDist = Infinity;
    for (const z of typingZones) {
      const candidate = pos < z.start ? z.start : z.end;
      const dist = Math.abs(candidate - pos);
      if (dist < bestDist) {
        bestDist = dist;
        target = candidate;
      }
    }
    ta.setSelectionRange(target, target);
  }, [showZones, typingZones]);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    let sql = el.value;

    if (autoClearBlanks && !readOnly && hasBlankTokens(sql)) {
      sql = prepareExerciseSql(sql);
      pendingCursor.current = cursorForIncompleteSql(sql);
      onChange(sql);
    } else if (autoClearBlanks && !readOnly) {
      pendingCursor.current = cursorForIncompleteSql(sql);
      requestAnimationFrame(() => {
        if (textareaRef.current && pendingCursor.current !== null) {
          const c = pendingCursor.current;
          textareaRef.current.setSelectionRange(c, c);
          pendingCursor.current = null;
        }
      });
    }

    onFocus?.(e);
  };

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "kanam-sql-editor-wrap relative overflow-hidden rounded-xl border-2 border-slate-300 bg-white shadow-inner",
          "focus-within:border-[var(--brand)] focus-within:ring-2 focus-within:ring-[var(--brand)]/30",
          readOnly ? "opacity-80" : "",
          className
        )}
        data-tour={dataTour}
        onClick={() => {
          if (!readOnly) textareaRef.current?.focus();
        }}
      >
        {showLineNumbers ? (
          <pre
            ref={lineNoRef}
            aria-hidden
            className={cn(
              "kanam-hide-scrollbar pointer-events-none absolute inset-y-0 left-0 m-0 overflow-hidden",
              "select-none border-r border-slate-200/80 bg-slate-50/80 py-3 pr-2 text-right",
              "font-mono text-base leading-6 text-slate-400 sm:text-sm"
            )}
            style={{ height: `${heightPx}px`, width: gutterWidth, paddingLeft: "0.5rem" }}
          >
            {lineNumbersText + "\n"}
          </pre>
        ) : null}
        <pre
          ref={preRef}
          aria-hidden
          className="kanam-hide-scrollbar pointer-events-none absolute inset-0 m-0 overflow-auto whitespace-pre-wrap break-words py-3 font-mono text-base leading-6 text-slate-900 sm:text-sm"
          style={{ height: `${heightPx}px`, paddingLeft: contentPaddingLeft, paddingRight: "0.75rem" }}
          dangerouslySetInnerHTML={{ __html: html + "\n" }}
        />
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onClick={snapCaretIntoZone}
          onScroll={syncScroll}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-label={ariaLabel}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          className={cn(
            "kanam-hide-scrollbar relative z-10 w-full resize-none bg-transparent py-3",
            "font-mono text-base leading-6 text-transparent caret-[var(--brand)] sm:text-sm",
            "selection:bg-[var(--brand)]/25 placeholder:text-slate-400",
            "focus-visible:outline-none",
            readOnly ? "cursor-default" : "cursor-text"
          )}
          style={{
            minHeight: minHeightPx,
            height: heightPx,
            maxHeight: maxHeightPx,
            paddingLeft: contentPaddingLeft,
            paddingRight: "0.75rem",
            WebkitTextFillColor: "transparent",
          }}
        />
      </div>
      {showZones ? (
        <p className="flex items-center gap-2 text-xs font-semibold text-[var(--brand)]">
          <span className="kanam-sql-typing-gap inline-flex min-w-[1.35em] px-1 py-0">
            <span className="kanam-sql-typing-gap-inner">&nbsp;</span>
          </span>
          Type in the green highlighted area
        </p>
      ) : null}
    </div>
  );
}
