/** Remove fill-in-the-blank tokens from exercise starter code. */
export function prepareExerciseCode(starter: string): string {
  return starter.replaceAll("____", "");
}

export type TypingZone = { start: number; end: number };

export function hasBlankTokens(code: string): boolean {
  return code.includes("____");
}

/** Map each ____ in the starter to a highlight zone in the prepared editor. */
export function findTypingZonesForExercise(code: string, starterCode: string): TypingZone[] {
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

export function cursorForIncompleteCode(code: string, starterCode?: string): number {
  if (starterCode) {
    const zones = findTypingZonesForExercise(code, starterCode);
    if (zones.length) return zones[0].start;
  }
  return code.length;
}
