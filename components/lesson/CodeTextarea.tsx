import * as React from "react";
import { blankZoneAtCaret } from "@/lib/pythonStarter";

function escapeHtml(s: string) {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightPythonToHtml(code: string) {
  const lines = (code ?? "").split("\n");
  const out: string[] = [];

  for (const line of lines) {
    const raw = escapeHtml(line);
    const trimmed = raw.trimStart();

    // Full-line comment
    if (trimmed.startsWith("#")) {
      const leadingSpaces = raw.length - trimmed.length;
      const prefix = raw.slice(0, leadingSpaces);
      const comment = raw.slice(leadingSpaces);
      out.push(`${prefix}<span class="text-emerald-700/70">${comment || " "}</span>`);
      continue;
    }

    // Inline comment (very simple heuristic): first " #" sequence
    const idx = raw.indexOf(" #");
    if (idx >= 0) {
      const before = raw.slice(0, idx);
      const comment = raw.slice(idx + 1); // keep the "#"
      out.push(`${before} <span class="text-emerald-700/70">${comment || " "}</span>`);
      continue;
    }

    out.push(raw || " ");
  }

  return out.join("\n");
}

export function CodeTextarea({
  value,
  onChange,
  onFocus,
  disabled = false,
  placeholder,
  ariaLabel,
  minHeightPx = 220,
  maxHeightPx = 640,
  showLineNumbers = true,
  className,
  "data-tour": dataTour,
}: {
  value: string;
  onChange: (next: string) => void;
  onFocus?: () => void;
  disabled?: boolean;
  placeholder?: string;
  ariaLabel: string;
  minHeightPx?: number;
  maxHeightPx?: number;
  showLineNumbers?: boolean;
  className?: string;
  "data-tour"?: string;
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const preRef = React.useRef<HTMLPreElement | null>(null);
  const lineNoRef = React.useRef<HTMLPreElement | null>(null);
  const pendingCaret = React.useRef<number | null>(null);

  const html = React.useMemo(() => highlightPythonToHtml(value), [value]);
  const [heightPx, setHeightPx] = React.useState<number>(minHeightPx);
  const [needsScroll, setNeedsScroll] = React.useState<boolean>(false);

  const commitWithCaret = React.useCallback(
    (next: string, caret: number) => {
      pendingCaret.current = caret;
      onChange(next);
    },
    [onChange]
  );

  const replaceBlankIfNeeded = (
    ta: HTMLTextAreaElement,
    insertion: string
  ): boolean => {
    if (disabled) return false;
    const selStart = ta.selectionStart;
    const selEnd = ta.selectionEnd;
    const blank = blankZoneAtCaret(ta.value, selStart);
    if (!blank) return false;
    if (selStart === blank.start && selEnd === blank.end) return false;
    if (selStart !== selEnd && (selStart < blank.start || selEnd > blank.end)) return false;
    const next =
      ta.value.slice(0, blank.start) + insertion + ta.value.slice(blank.end);
    commitWithCaret(next, blank.start + insertion.length);
    return true;
  };

  const syncScroll = () => {
    const ta = textareaRef.current;
    const pre = preRef.current;
    const ln = lineNoRef.current;
    if (!ta || !pre) return;
    pre.scrollTop = ta.scrollTop;
    pre.scrollLeft = ta.scrollLeft;
    if (ln) ln.scrollTop = ta.scrollTop;
  };

  const lineCount = React.useMemo(() => Math.max(1, (value ?? "").split("\n").length), [value]);
  const lineDigits = React.useMemo(() => String(lineCount).length, [lineCount]);
  const gutterCh = React.useMemo(() => Math.max(3, lineDigits + 2), [lineDigits]);
  const gutterWidth = showLineNumbers ? `calc(${gutterCh}ch + 12px)` : "0px";
  const contentPaddingLeft = showLineNumbers ? `calc(12px + ${gutterWidth})` : "12px";
  const lineNumbersText = React.useMemo(() => {
    if (!showLineNumbers) return "";
    return Array.from({ length: lineCount }, (_, i) => String(i + 1)).join("\n");
  }, [showLineNumbers, lineCount]);

  React.useLayoutEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    // Measure scroll height for autosize.
    // IMPORTANT: Always restore a pixel height, even if React state doesn't change,
    // otherwise the textarea can get stuck at height="auto" and collapse.
    ta.style.height = "0px";
    const raw = ta.scrollHeight;
    const clamped = Math.max(minHeightPx, Math.min(maxHeightPx, raw));
    ta.style.height = `${clamped}px`;
    if (preRef.current) preRef.current.style.height = `${clamped}px`;
    if (lineNoRef.current) lineNoRef.current.style.height = `${clamped}px`;

    setHeightPx((prev) => (prev === clamped ? prev : clamped));
    setNeedsScroll(raw > maxHeightPx + 2);

    if (pendingCaret.current !== null) {
      const caret = pendingCaret.current;
      pendingCaret.current = null;
      ta.setSelectionRange(caret, caret);
    }

    // Ensure scroll positions stay in sync after resize.
    syncScroll();
  }, [value, minHeightPx, maxHeightPx]);

  const overflowClass = needsScroll ? "overflow-auto" : "overflow-hidden";

  return (
    <div className={["relative", className ?? ""].join(" ")}>
      {showLineNumbers ? (
        <pre
          ref={lineNoRef}
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-y-0 left-0 rounded-l-md border-r border-slate-200/80 bg-slate-50/80 py-3 pr-2",
            "overflow-hidden",
            "kanam-hide-scrollbar",
            "select-none font-mono text-xs leading-5 text-slate-400",
            "text-right",
          ].join(" ")}
          style={{ height: `${heightPx}px`, width: gutterWidth, paddingLeft: "12px" }}
        >
          {lineNumbersText + "\n"}
        </pre>
      ) : null}

      {/* Highlight layer */}
      <pre
        ref={preRef}
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 rounded-md p-3",
          overflowClass,
          "kanam-hide-scrollbar",
          "font-mono text-xs leading-5 text-slate-900",
          "whitespace-pre-wrap break-words",
        ].join(" ")}
        style={{ height: `${heightPx}px`, paddingLeft: contentPaddingLeft }}
        dangerouslySetInnerHTML={{ __html: html + "\n" }}
      />

      {/* Real editor */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBeforeInput={(e) => {
          const ne = e.nativeEvent as InputEvent;
          if (ne.inputType !== "insertText" && ne.inputType !== "insertCompositionText") return;
          if (!ne.data) return;
          if (replaceBlankIfNeeded(e.currentTarget, ne.data)) e.preventDefault();
        }}
        onPaste={(e) => {
          const text = e.clipboardData.getData("text");
          if (!text) return;
          const insertion = text.replace(/\r\n/g, "\n").split("\n")[0] ?? text;
          if (replaceBlankIfNeeded(e.currentTarget, insertion)) e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (e.key !== "Backspace" && e.key !== "Delete") return;
          const ta = e.currentTarget;
          if (ta.selectionStart !== ta.selectionEnd) return;
          const blank = blankZoneAtCaret(ta.value, ta.selectionStart);
          if (!blank) return;
          e.preventDefault();
          commitWithCaret(
            ta.value.slice(0, blank.start) + ta.value.slice(blank.end),
            blank.start
          );
        }}
        onFocus={onFocus}
        onScroll={syncScroll}
        disabled={disabled}
        spellCheck={false}
        aria-label={ariaLabel}
        data-tour={dataTour}
        placeholder={placeholder}
        className={[
          "relative z-10 w-full resize-none bg-transparent p-3",
          overflowClass,
          "kanam-hide-scrollbar",
          "font-mono text-xs leading-5",
          // Make text transparent so the highlight layer shows through, but keep caret visible.
          "text-transparent caret-slate-900",
          "selection:bg-[var(--accent)]/25",
          "focus-visible:outline-none",
          disabled ? "cursor-not-allowed" : "",
        ].join(" ")}
        style={{
          height: `${heightPx}px`,
          paddingLeft: contentPaddingLeft,
          WebkitTextFillColor: "transparent",
        }}
      />
    </div>
  );
}

