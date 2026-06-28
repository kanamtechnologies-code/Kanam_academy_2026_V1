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
