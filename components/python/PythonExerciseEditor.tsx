"use client";

import * as React from "react";
import {
  blankZoneAtCaret,
  hasBlankTokens,
  selectionForIncompleteCode,
  type TypingZone,
} from "@/lib/pythonStarter";
import { cn } from "@/lib/utils";

function replaceBlankToken(
  code: string,
  blank: TypingZone,
  replacement: string
): { code: string; caret: number } {
  return {
    code: code.slice(0, blank.start) + replacement + code.slice(blank.end),
    caret: blank.start + replacement.length,
  };
}

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
  showLineNumbers = true,
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
  showLineNumbers?: boolean;
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const preRef = React.useRef<HTMLPreElement | null>(null);
  const lineNoRef = React.useRef<HTMLPreElement | null>(null);
  const pendingSelection = React.useRef<{ start: number; end: number } | null>(null);
  const [heightPx, setHeightPx] = React.useState(minHeightPx);

  const showZones = !readOnly && typingZones.length > 0;
  const html = React.useMemo(
    () => highlightWithZones(value, showZones ? typingZones : []),
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
    if (pendingSelection.current !== null) {
      const { start, end } = pendingSelection.current;
      pendingSelection.current = null;
      ta.setSelectionRange(start, end);
    }
    syncScroll();
  }, [value, minHeightPx, maxHeightPx, showLineNumbers, lineCount]);

  const commitValue = React.useCallback(
    (next: string, caret: number) => {
      pendingSelection.current = { start: caret, end: caret };
      onChange(next);
    },
    [onChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const start = e.target.selectionStart;
    pendingSelection.current = { start, end: start };
    onChange(e.target.value);
  };

  /**
   * If the caret is inside a ____ blank (without the whole blank selected),
   * typing/pasting replaces the blank instead of inserting into the underscores.
   */
  const handleBeforeInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    const ne = e.nativeEvent as InputEvent;
    if (ne.inputType !== "insertText" && ne.inputType !== "insertCompositionText") return;
    const data = ne.data;
    if (!data) return;

    const ta = e.currentTarget;
    const selStart = ta.selectionStart;
    const selEnd = ta.selectionEnd;
    const blank = blankZoneAtCaret(ta.value, selStart);
    if (!blank) return;
    // Whole blank already selected — browser replaces it normally.
    if (selStart === blank.start && selEnd === blank.end) return;
    // Selection spans outside this blank — don't interfere.
    if (selStart !== selEnd && (selStart < blank.start || selEnd > blank.end)) return;

    e.preventDefault();
    const { code, caret } = replaceBlankToken(ta.value, blank, data);
    commitValue(code, caret);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    const ta = e.currentTarget;
    const selStart = ta.selectionStart;
    const selEnd = ta.selectionEnd;
    const blank = blankZoneAtCaret(ta.value, selStart);
    if (!blank) return;
    if (selStart === blank.start && selEnd === blank.end) return;
    if (selStart !== selEnd && (selStart < blank.start || selEnd > blank.end)) return;

    const text = e.clipboardData.getData("text");
    if (!text) return;
    e.preventDefault();
    // Fill blanks are single-token answers — keep the first line only.
    const insertion = text.replace(/\r\n/g, "\n").split("\n")[0] ?? text;
    const { code, caret } = replaceBlankToken(ta.value, blank, insertion);
    commitValue(code, caret);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    if (e.key !== "Backspace" && e.key !== "Delete") return;
    const ta = e.currentTarget;
    if (ta.selectionStart !== ta.selectionEnd) return;
    const blank = blankZoneAtCaret(ta.value, ta.selectionStart);
    if (!blank) return;
    e.preventDefault();
    const { code, caret } = replaceBlankToken(ta.value, blank, "");
    commitValue(code, caret);
  };

  // If a click lands outside a green zone, snap into the nearest blank/slot.
  // When the zone is still ____, select the whole blank so typing replaces it.
  const snapCaretIntoZone = React.useCallback(() => {
    const ta = textareaRef.current;
    if (!ta || !showZones || typingZones.length === 0) return;
    if (ta.selectionStart !== ta.selectionEnd) return;
    const pos = ta.selectionStart;
    let zone =
      typingZones.find((z) => pos >= z.start && pos <= z.end) ?? null;
    if (!zone) {
      let bestDist = Infinity;
      for (const z of typingZones) {
        const candidate = pos < z.start ? z.start : z.end;
        const dist = Math.abs(candidate - pos);
        if (dist < bestDist) {
          bestDist = dist;
          zone = z;
        }
      }
    }
    if (!zone) return;
    const token = ta.value.slice(zone.start, zone.end);
    if (token === "____") {
      ta.setSelectionRange(zone.start, zone.end);
    } else {
      ta.setSelectionRange(zone.start, zone.start);
    }
  }, [showZones, typingZones]);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    const code = el.value;
    // Keep ____ visible so it matches the exercise instructions. Select the
    // next blank so the learner's first keystrokes replace it.
    if (autoClearBlanks && !readOnly && (hasBlankTokens(code) || starterCode)) {
      pendingSelection.current = selectionForIncompleteCode(code, starterCode);
      requestAnimationFrame(() => {
        if (textareaRef.current && pendingSelection.current) {
          const { start, end } = pendingSelection.current;
          textareaRef.current.setSelectionRange(start, end);
          pendingSelection.current = null;
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
          onBeforeInput={handleBeforeInput}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
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
          {hasBlankTokens(value)
            ? "Just type in the green area — ____ is replaced for you"
            : "Type in the green highlighted area"}
        </p>
      ) : null}
    </div>
  );
}
