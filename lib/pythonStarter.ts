export type TypingZone = { start: number; end: number };

/** @deprecated Prefer keeping ____ visible. Kept for any callers that still strip blanks. */
export function prepareExerciseCode(starter: string): string {
  return starter.replaceAll("____", "");
}

export function hasBlankTokens(code: string): boolean {
  return code.includes("____");
}

/** Highlight zones for every remaining ____ blank in the current editor text. */
export function findBlankTokenZones(code: string): TypingZone[] {
  const zones: TypingZone[] = [];
  let from = 0;
  while (from < code.length) {
    const idx = code.indexOf("____", from);
    if (idx === -1) break;
    zones.push({ start: idx, end: idx + 4 });
    from = idx + 4;
  }
  return zones;
}

/** Blank zone containing the caret (inclusive of both edges). */
export function blankZoneAtCaret(code: string, caret: number): TypingZone | null {
  return (
    findBlankTokenZones(code).find((z) => caret >= z.start && caret <= z.end) ?? null
  );
}

/**
 * Map each ____ in the starter to a highlight zone after blanks were removed.
 * Used as a fallback once the learner has started replacing blanks.
 */
function findPreparedGapZones(code: string, starterCode: string): TypingZone[] {
  const blankOffsets: number[] = [];
  let preparedIdx = 0;
  for (let i = 0; i < starterCode.length; ) {
    if (starterCode.startsWith("____", i)) {
      blankOffsets.push(preparedIdx);
      i += 4;
    } else {
      preparedIdx++;
      i++;
    }
  }

  const zones: TypingZone[] = [];
  for (const start of blankOffsets) {
    if (start > code.length) continue;
    const lineEndRaw = code.indexOf("\n", start);
    const lineEnd = lineEndRaw === -1 ? code.length : lineEndRaw;
    let end = lineEnd;

    const afterStart = code.slice(start, lineEnd);
    const closeParen = afterStart.indexOf(")");
    const closeQuote = afterStart.indexOf('"');
    if (closeParen >= 0 && (closeQuote < 0 || closeParen < closeQuote)) {
      end = start + closeParen;
    } else if (closeQuote >= 0) {
      end = start + closeQuote;
    }

    zones.push({ start, end: Math.max(start, end) });
  }
  return zones;
}

/**
 * Highlight fill-in blanks. Prefer visible ____ tokens; if those are gone,
 * fall back to the prepared gap zones so learners can keep editing the slot.
 */
export function findTypingZonesForExercise(code: string, starterCode: string): TypingZone[] {
  const blankZones = findBlankTokenZones(code);
  if (blankZones.length > 0) return blankZones;
  if (!starterCode.includes("____")) return [];
  return findPreparedGapZones(code, starterCode);
}

export function cursorForIncompleteCode(code: string, starterCode?: string): number {
  const zones = starterCode
    ? findTypingZonesForExercise(code, starterCode)
    : findBlankTokenZones(code);
  if (zones.length) return zones[0].start;
  return code.length;
}

/** Selection range that covers the next blank (so typing replaces ____). */
export function selectionForIncompleteCode(
  code: string,
  starterCode?: string
): { start: number; end: number } {
  const zones = starterCode
    ? findTypingZonesForExercise(code, starterCode)
    : findBlankTokenZones(code);
  if (!zones.length) {
    const end = code.length;
    return { start: end, end };
  }
  const zone = zones[0];
  const token = code.slice(zone.start, zone.end);
  if (token === "____") {
    return { start: zone.start, end: zone.end };
  }
  return { start: zone.start, end: zone.start };
}
