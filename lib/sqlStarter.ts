/** Remove fill-in-the-blank tokens from exercise starter SQL. */
export function prepareExerciseSql(starterSql: string): string {
  return starterSql.replaceAll("____", "");
}

export type ClauseTarget = "select" | "from" | "limit";

export type TypingZone = { start: number; end: number };

/**
 * Place the cursor where the learner should type next.
 */
export function cursorForIncompleteSql(sql: string): number {
  const lines = sql.split("\n");
  let pos = 0;

  for (const line of lines) {
    const trimmed = line.trimEnd();

    if (/\bSELECT\s*$/i.test(trimmed)) {
      return pos + line.length;
    }

    if (/\bFROM\s*$/i.test(trimmed)) {
      return pos + line.length;
    }

    if (/\bLIMIT\s*;?\s*$/i.test(trimmed) && !/\blimit\s+\d+/i.test(line)) {
      const semi = line.indexOf(";");
      if (semi >= 0) return pos + semi;
      return pos + line.length;
    }

    pos += line.length + 1;
  }

  return sql.length;
}

export function hasBlankTokens(sql: string): boolean {
  return sql.includes("____");
}

/** Which SQL clauses this exercise expects the learner to fill in. */
export function getTargetClausesFromStarter(starterSql: string): ClauseTarget[] {
  const targets: ClauseTarget[] = [];
  const sql = prepareExerciseSql(starterSql);

  for (const line of sql.split("\n")) {
    const t = line.trimEnd();
    if (/^SELECT\s*$/i.test(t)) targets.push("select");
    else if (/^FROM\s*$/i.test(t)) targets.push("from");
    else if (/^LIMIT\s*;?\s*$/i.test(t)) targets.push("limit");
  }

  return targets;
}

/**
 * Highlight zones stay active for the whole exercise (even after typing starts).
 * Returns one zone per target clause — from after the keyword to end of that line.
 */
export function findTypingZonesForExercise(
  sql: string,
  starterSql: string
): TypingZone[] {
  const targets = getTargetClausesFromStarter(starterSql);
  if (!targets.length) return [];

  const zones: TypingZone[] = [];
  const lines = sql.split("\n");
  let pos = 0;

  for (const line of lines) {
    const t = line.trimEnd();
    let clause: ClauseTarget | null = null;

    if (/^SELECT\b/i.test(t)) clause = "select";
    else if (/^FROM\b/i.test(t)) clause = "from";
    else if (/^LIMIT\b/i.test(t)) clause = "limit";

    if (clause && targets.includes(clause)) {
      const m = line.match(new RegExp(`\\b${clause}\\b`, "i"));
      if (m && m.index !== undefined) {
        const start = pos + m.index + m[0].length;
        let end = pos + line.length;
        if (clause === "limit") {
          const semi = line.indexOf(";");
          if (semi >= 0) end = pos + semi;
        }
        zones.push({ start, end: Math.max(start, end) });
      }
    }

    pos += line.length + 1;
  }

  return zones;
}
