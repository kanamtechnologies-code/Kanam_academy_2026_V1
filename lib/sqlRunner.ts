import initSqlJs, { type Database, type SqlJsStatic, type SqlValue } from "sql.js";

export type SeedColumn = {
  name: string;
  type?: string;
};

export type SeedTable = {
  name: string;
  columns: SeedColumn[];
  rows: Record<string, string | number | null>[];
};

export type QueryResult = {
  columns: string[];
  values: (string | number | null)[][];
  rowCount: number;
};

export type SqlRunResult = QueryResult & { error?: string };

let sqlJsPromise: Promise<SqlJsStatic> | null = null;

async function getSqlJs(): Promise<SqlJsStatic> {
  if (!sqlJsPromise) {
    sqlJsPromise = initSqlJs({ locateFile: () => "/sql-wasm.wasm" });
  }
  return sqlJsPromise;
}

function escapeSqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

export function buildSeedSql(tables: SeedTable[]): string {
  const statements: string[] = [];
  for (const table of tables) {
    const colDefs = table.columns
      .map((c) => `${c.name} ${c.type ?? "TEXT"}`)
      .join(", ");
    statements.push(`CREATE TABLE ${table.name} (${colDefs});`);
    for (const row of table.rows) {
      const cols = table.columns.map((c) => c.name);
      const vals = cols.map((col) => {
        const v = row[col];
        if (v === null || v === undefined) return "NULL";
        if (typeof v === "number") return String(v);
        return escapeSqlString(String(v));
      });
      statements.push(
        `INSERT INTO ${table.name} (${cols.join(", ")}) VALUES (${vals.join(", ")});`
      );
    }
  }
  return statements.join("\n");
}

export async function createLessonDatabase(tables: SeedTable[]): Promise<Database> {
  const SQL = await getSqlJs();
  const db = new SQL.Database();
  db.run(buildSeedSql(tables));
  return db;
}

function normalizeCell(value: SqlValue): string | number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value;
  if (typeof value === "string") return value;
  if (value instanceof Uint8Array) return `[binary ${value.byteLength} bytes]`;
  return String(value);
}

function normalizeRows(values: SqlValue[][]): (string | number | null)[][] {
  return values.map((row) => row.map(normalizeCell));
}

function stripComments(sql: string): string {
  return sql
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .trim();
}

export function runSelectQuery(db: Database, sql: string): SqlRunResult {
  const trimmed = sql.trim();
  if (!trimmed) {
    return { columns: [], values: [], rowCount: 0, error: "Query is empty." };
  }

  const cleaned = stripComments(trimmed);
  const upper = cleaned.toUpperCase();

  if (!upper.startsWith("SELECT")) {
    return {
      columns: [],
      values: [],
      rowCount: 0,
      error: "Only SELECT queries are allowed in this lesson.",
    };
  }

  const withoutTrailingSemi = cleaned.replace(/;+\s*$/, "");
  if (withoutTrailingSemi.includes(";")) {
    return {
      columns: [],
      values: [],
      rowCount: 0,
      error: "Run one query at a time.",
    };
  }

  try {
    const results = db.exec(withoutTrailingSemi);
    if (!results.length) {
      return { columns: [], values: [], rowCount: 0 };
    }
    const { columns, values } = results[0];
    const normalized = normalizeRows(values);
    return { columns, values: normalized, rowCount: normalized.length };
  } catch (e) {
    return {
      columns: [],
      values: [],
      rowCount: 0,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

export function hasSqlPlaceholders(sql: string): boolean {
  return sql.includes("____");
}
