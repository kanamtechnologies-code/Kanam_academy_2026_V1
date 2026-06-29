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
      out +=
        '<span class="kanam-sql-typing-gap"><span class="kanam-sql-typing-gap-inner">&nbsp;</span></span>';
    } else {
      out += `<span class="kanam-sql-typing-gap">${escapeHtml(inner)}</span>`;
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
  "data-tour"?: string;
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const preRef = React.useRef<HTMLPreElement | null>(null);
  const pendingCursor = React.useRef<number | null>(null);
  const [heightPx, setHeightPx] = React.useState(minHeightPx);

  const showZones = !readOnly && typingZones.length > 0;
  const html = React.useMemo(
    () => sqlToHighlightedHtml(value, showZones ? typingZones : []),
    [value, showZones, typingZones]
  );

  const syncScroll = () => {
    const ta = textareaRef.current;
    const pre = preRef.current;
    if (!ta || !pre) return;
    pre.scrollTop = ta.scrollTop;
    pre.scrollLeft = ta.scrollLeft;
  };

  React.useLayoutEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "0px";
    const clamped = Math.max(minHeightPx, Math.min(maxHeightPx, ta.scrollHeight));
    ta.style.height = `${clamped}px`;
    if (preRef.current) preRef.current.style.height = `${clamped}px`;
    setHeightPx((prev) => (prev === clamped ? prev : clamped));

    if (pendingCursor.current !== null) {
      const cursor = pendingCursor.current;
      pendingCursor.current = null;
      ta.setSelectionRange(cursor, cursor);
    }
    syncScroll();
  }, [value, minHeightPx, maxHeightPx]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    pendingCursor.current = e.target.selectionStart;
    onChange(e.target.value);
  };

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
        <pre
          ref={preRef}
          aria-hidden
          className="kanam-hide-scrollbar pointer-events-none absolute inset-0 m-0 overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-sm leading-6 text-slate-900"
          style={{ height: `${heightPx}px` }}
          dangerouslySetInnerHTML={{ __html: html + "\n" }}
        />
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onScroll={syncScroll}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-label={ariaLabel}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          className={cn(
            "kanam-hide-scrollbar relative z-10 w-full resize-none bg-transparent p-3",
            "font-mono text-sm leading-6 text-transparent caret-[var(--brand)]",
            "selection:bg-[var(--brand)]/25 placeholder:text-slate-400",
            "focus-visible:outline-none",
            readOnly ? "cursor-default" : "cursor-text"
          )}
          style={{
            minHeight: minHeightPx,
            height: heightPx,
            maxHeight: maxHeightPx,
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
