import type { QueryResult } from "@/lib/sqlRunner";
import type { SeedTable } from "@/lib/sqlRunner";

export const LUNCH_ORDERS_SEED: SeedTable[] = [
  {
    name: "lunch_orders",
    columns: [
      { name: "order_id", type: "INTEGER" },
      { name: "student_name", type: "TEXT" },
      { name: "item", type: "TEXT" },
      { name: "price", type: "REAL" },
    ],
    rows: [
      { order_id: 1, student_name: "Alex", item: "Pizza slice", price: 3.5 },
      { order_id: 2, student_name: "Jordan", item: "Salad", price: 4.0 },
      { order_id: 3, student_name: "Sam", item: "Chicken wrap", price: 5.25 },
      { order_id: 4, student_name: "Riley", item: "Fruit cup", price: 2.75 },
      { order_id: 5, student_name: "Casey", item: "Pizza slice", price: 3.5 },
      { order_id: 6, student_name: "Morgan", item: "Yogurt parfait", price: 3.0 },
      { order_id: 7, student_name: "Taylor", item: "Burger", price: 4.75 },
      { order_id: 8, student_name: "Jamie", item: "Salad", price: 4.0 },
    ],
  },
];

/**
 * Two related tables for JOIN + capstone lessons.
 * `orders.student_id` references `students.student_id`.
 */
export const SCHOOL_DB_SEED: SeedTable[] = [
  {
    name: "students",
    columns: [
      { name: "student_id", type: "INTEGER" },
      { name: "student_name", type: "TEXT" },
      { name: "grade", type: "INTEGER" },
    ],
    rows: [
      { student_id: 1, student_name: "Alex", grade: 6 },
      { student_id: 2, student_name: "Jordan", grade: 7 },
      { student_id: 3, student_name: "Sam", grade: 8 },
      { student_id: 4, student_name: "Riley", grade: 6 },
    ],
  },
  {
    name: "orders",
    columns: [
      { name: "order_id", type: "INTEGER" },
      { name: "student_id", type: "INTEGER" },
      { name: "item", type: "TEXT" },
      { name: "price", type: "REAL" },
    ],
    rows: [
      { order_id: 101, student_id: 1, item: "Pizza slice", price: 3.5 },
      { order_id: 102, student_id: 2, item: "Salad", price: 4.0 },
      { order_id: 103, student_id: 3, item: "Chicken wrap", price: 5.25 },
      { order_id: 104, student_id: 1, item: "Fruit cup", price: 2.75 },
      { order_id: 105, student_id: 4, item: "Burger", price: 4.75 },
    ],
  },
];

/** One week of cafeteria orders for line / time-series charts. `day_num` sorts chronologically. */
export const WEEKLY_ORDERS_SEED: SeedTable[] = [
  {
    name: "daily_orders",
    columns: [
      { name: "day_num", type: "INTEGER" },
      { name: "weekday", type: "TEXT" },
      { name: "orders", type: "INTEGER" },
    ],
    rows: [
      { day_num: 1, weekday: "Mon", orders: 42 },
      { day_num: 2, weekday: "Tue", orders: 55 },
      { day_num: 3, weekday: "Wed", orders: 48 },
      { day_num: 4, weekday: "Thu", orders: 63 },
      { day_num: 5, weekday: "Fri", orders: 80 },
      { day_num: 6, weekday: "Sat", orders: 30 },
      { day_num: 7, weekday: "Sun", orders: 25 },
    ],
  },
];

/** Quiz scores for histogram / distribution charts (16 rows, scores 58–100). */
export const QUIZ_SCORES_SEED: SeedTable[] = [
  {
    name: "quiz_scores",
    columns: [
      { name: "student_name", type: "TEXT" },
      { name: "score", type: "INTEGER" },
    ],
    rows: [
      { student_name: "Alex", score: 72 },
      { student_name: "Jordan", score: 85 },
      { student_name: "Sam", score: 90 },
      { student_name: "Riley", score: 68 },
      { student_name: "Casey", score: 95 },
      { student_name: "Morgan", score: 88 },
      { student_name: "Taylor", score: 76 },
      { student_name: "Jamie", score: 81 },
      { student_name: "Quinn", score: 100 },
      { student_name: "Devon", score: 64 },
      { student_name: "Harper", score: 79 },
      { student_name: "Rowan", score: 92 },
      { student_name: "Sage", score: 58 },
      { student_name: "Avery", score: 84 },
      { student_name: "Reese", score: 73 },
      { student_name: "Skyler", score: 89 },
    ],
  },
];

/** Study time vs. score for scatter / relationship charts (12 rows, positive association). */
export const STUDY_SCORE_SEED: SeedTable[] = [
  {
    name: "study_log",
    columns: [
      { name: "student_name", type: "TEXT" },
      { name: "study_minutes", type: "INTEGER" },
      { name: "score", type: "INTEGER" },
    ],
    rows: [
      { student_name: "Alex", study_minutes: 20, score: 65 },
      { student_name: "Jordan", study_minutes: 35, score: 72 },
      { student_name: "Sam", study_minutes: 50, score: 80 },
      { student_name: "Riley", study_minutes: 15, score: 60 },
      { student_name: "Casey", study_minutes: 60, score: 85 },
      { student_name: "Morgan", study_minutes: 45, score: 78 },
      { student_name: "Taylor", study_minutes: 70, score: 90 },
      { student_name: "Jamie", study_minutes: 30, score: 70 },
      { student_name: "Quinn", study_minutes: 80, score: 95 },
      { student_name: "Devon", study_minutes: 25, score: 68 },
      { student_name: "Harper", study_minutes: 55, score: 82 },
      { student_name: "Rowan", study_minutes: 40, score: 75 },
    ],
  },
];

export function normSql(sql: string) {
  return sql.replace(/\s+/g, " ").trim().toLowerCase();
}

export function hasColumns(result: QueryResult | null, ...cols: string[]) {
  if (!result) return false;
  return cols.every((c) =>
    result.columns.map((x) => x.toLowerCase()).includes(c.toLowerCase())
  );
}

/** Read the first cell of a result as a number (handy for COUNT/SUM/AVG checks). */
export function firstCellNumber(result: QueryResult | null): number | null {
  const cell = result?.values?.[0]?.[0];
  if (cell === null || cell === undefined) return null;
  const n = Number(cell);
  return Number.isNaN(n) ? null : n;
}

/** Float-tolerant equality for aggregate answers like SUM/AVG. */
export function approxEquals(a: number | null, b: number, eps = 0.02): boolean {
  if (a === null) return false;
  return Math.abs(a - b) <= eps;
}
