"use client";

import * as React from "react";
import {
  cursorForIncompleteCode,
  hasBlankTokens,
  prepareExerciseCode,
  type TypingZone,
} from "@/lib/pythonStarter";
import { cn } from "@/lib/utils";

function escapeHtml(s: string) {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightWithZones(code: string, zones: TypingZone[]) {
  if (!zones.length) {
    const lines = code.split("\n");
    return lines
      .map((line) => {
        const trimmed = line.trimStart();
        if (trimmed.startsWith("#")) {
          return `<span class="text-emerald-700/80">${escapeHtml(line)}</span>`;
        }
        return escapeHtml(line);
      })
      .join("\n");
  }

  const sorted = [...zones].sort((a, b) => a.start - b.start);
  let out = "";
  let cursor = 0;

  for (const zone of sorted) {
    if (zone.start < cursor) continue;
    out += escapeHtml(code.slice(cursor, zone.start));
    const inner = code.slice(zone.start, zone.end);
    if (inner.length === 0) {
      out += '<span class="kanam-typing-zone kanam-typing-zone--empty"></span>';
    } else {
      out += `<span class="kanam-typing-zone">${escapeHtml(inner)}</span>`;
    }
    cursor = Math.max(cursor, zone.end);
  }
  out += escapeHtml(code.slice(cursor));
  return out;
}

export function PythonExerciseEditor({
  value,
  onChange,
  onFocus,
  readOnly = false,
  placeholder,
  ariaLabel,
  minHeightPx = 120,
  maxHeightPx = 320,
  className,
  autoClearBlanks = false,
  starterCode,
  typingZones = [],
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
  starterCode?: string;
  typingZones?: TypingZone[];
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const preRef = React.useRef<HTMLPreElement | null>(null);
  const pendingCursor = React.useRef<number | null>(null);
  const [heightPx, setHeightPx] = React.useState(minHeightPx);

  const showZones = !readOnly && typingZones.length > 0;
  const html = React.useMemo(
    () => highlightWithZones(value, showZones ? typingZones : []),
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
    let code = el.value;
    if (autoClearBlanks && !readOnly && hasBlankTokens(code)) {
      code = prepareExerciseCode(code);
      pendingCursor.current = cursorForIncompleteCode(code, starterCode);
      onChange(code);
    } else if (autoClearBlanks && !readOnly && starterCode) {
      pendingCursor.current = cursorForIncompleteCode(code, starterCode);
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
