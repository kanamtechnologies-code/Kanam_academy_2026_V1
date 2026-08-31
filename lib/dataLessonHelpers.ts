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
      { name: "weekday", type: "TEXT" },
    ],
    rows: [
      { order_id: 1, student_name: "Alex", item: "Pizza slice", price: 3.5, weekday: "Mon" },
      { order_id: 2, student_name: "Jordan", item: "Salad", price: 4.0, weekday: "Mon" },
      { order_id: 3, student_name: "Sam", item: "Chicken wrap", price: 5.25, weekday: "Mon" },
      { order_id: 4, student_name: "Riley", item: "Fruit cup", price: 2.75, weekday: "Tue" },
      { order_id: 5, student_name: "Casey", item: "Pizza slice", price: 3.5, weekday: "Tue" },
      { order_id: 6, student_name: "Morgan", item: "Yogurt parfait", price: 3.0, weekday: "Tue" },
      { order_id: 7, student_name: "Taylor", item: "Burger", price: 4.75, weekday: "Wed" },
      { order_id: 8, student_name: "Jamie", item: "Salad", price: 4.0, weekday: "Wed" },
      { order_id: 9, student_name: "Alex", item: "Chicken wrap", price: 5.25, weekday: "Wed" },
      { order_id: 10, student_name: "Jordan", item: "Pizza slice", price: 3.5, weekday: "Thu" },
      { order_id: 11, student_name: "Sam", item: "Salad", price: 4.0, weekday: "Thu" },
      { order_id: 12, student_name: "Riley", item: "Burger", price: 4.75, weekday: "Thu" },
      { order_id: 13, student_name: "Casey", item: "Fruit cup", price: 2.75, weekday: "Fri" },
      { order_id: 14, student_name: "Morgan", item: "Pizza slice", price: 3.5, weekday: "Fri" },
      { order_id: 15, student_name: "Taylor", item: "Salad", price: 4.0, weekday: "Fri" },
      { order_id: 16, student_name: "Jamie", item: "Chicken wrap", price: 5.25, weekday: "Mon" },
      { order_id: 17, student_name: "Alex", item: "Burger", price: 4.75, weekday: "Tue" },
      { order_id: 18, student_name: "Jordan", item: "Fruit cup", price: 2.75, weekday: "Wed" },
      { order_id: 19, student_name: "Sam", item: "Yogurt parfait", price: 3.0, weekday: "Thu" },
      { order_id: 20, student_name: "Riley", item: "Pizza slice", price: 3.5, weekday: "Fri" },
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
      { student_id: 5, student_name: "Casey", grade: 7 },
      { student_id: 6, student_name: "Morgan", grade: 8 },
      { student_id: 7, student_name: "Taylor", grade: 6 },
      { student_id: 8, student_name: "Jamie", grade: 7 },
    ],
  },
  {
    name: "orders",
    columns: [
      { name: "order_id", type: "INTEGER" },
      { name: "student_id", type: "INTEGER" },
      { name: "item", type: "TEXT" },
      { name: "price", type: "REAL" },
      { name: "weekday", type: "TEXT" },
    ],
    rows: [
      { order_id: 101, student_id: 1, item: "Pizza slice", price: 3.5, weekday: "Mon" },
      { order_id: 102, student_id: 1, item: "Fruit cup", price: 2.75, weekday: "Tue" },
      { order_id: 103, student_id: 1, item: "Burger", price: 4.75, weekday: "Wed" },
      { order_id: 104, student_id: 2, item: "Salad", price: 4.0, weekday: "Thu" },
      { order_id: 105, student_id: 2, item: "Burger", price: 4.75, weekday: "Fri" },
      { order_id: 106, student_id: 2, item: "Yogurt parfait", price: 3.0, weekday: "Mon" },
      { order_id: 107, student_id: 3, item: "Chicken wrap", price: 5.25, weekday: "Tue" },
      { order_id: 108, student_id: 3, item: "Burger", price: 4.75, weekday: "Wed" },
      { order_id: 109, student_id: 3, item: "Pizza slice", price: 3.5, weekday: "Thu" },
      { order_id: 110, student_id: 4, item: "Fruit cup", price: 2.75, weekday: "Fri" },
      { order_id: 111, student_id: 4, item: "Pizza slice", price: 3.5, weekday: "Mon" },
      { order_id: 112, student_id: 4, item: "Salad", price: 4.0, weekday: "Tue" },
      { order_id: 113, student_id: 5, item: "Burger", price: 4.75, weekday: "Wed" },
      { order_id: 114, student_id: 5, item: "Salad", price: 4.0, weekday: "Thu" },
      { order_id: 115, student_id: 5, item: "Pizza slice", price: 3.5, weekday: "Fri" },
      { order_id: 116, student_id: 6, item: "Yogurt parfait", price: 3.0, weekday: "Mon" },
      { order_id: 117, student_id: 6, item: "Pizza slice", price: 3.5, weekday: "Tue" },
      { order_id: 118, student_id: 6, item: "Fruit cup", price: 2.75, weekday: "Wed" },
      { order_id: 119, student_id: 7, item: "Salad", price: 4.0, weekday: "Thu" },
      { order_id: 120, student_id: 7, item: "Burger", price: 4.75, weekday: "Fri" },
      { order_id: 121, student_id: 7, item: "Pizza slice", price: 3.5, weekday: "Mon" },
      { order_id: 122, student_id: 8, item: "Salad", price: 4.0, weekday: "Tue" },
      { order_id: 123, student_id: 8, item: "Yogurt parfait", price: 3.0, weekday: "Wed" },
      { order_id: 124, student_id: 8, item: "Burger", price: 4.75, weekday: "Thu" },
    ],
  },
];

/**
 * Capstone cafeteria workbook (L14) — larger two-sheet week.
 * Known answers (keep in sync with lesson14 validators):
 * - 10 students, 41 orders
 * - Top spender: Casey at $28.75
 * - Most orders: Alex (7)
 * - Most popular item: Pizza slice (10)
 * - Students with SUM(price) > 20: Alex ($25.00) and Casey ($28.75)
 * - Orders with price >= 4: 21
 */
export const CAPSTONE_CAFETERIA_SEED: SeedTable[] = [
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
      { student_id: 5, student_name: "Casey", grade: 7 },
      { student_id: 6, student_name: "Morgan", grade: 8 },
      { student_id: 7, student_name: "Taylor", grade: 6 },
      { student_id: 8, student_name: "Jamie", grade: 7 },
      { student_id: 9, student_name: "Quinn", grade: 8 },
      { student_id: 10, student_name: "Devon", grade: 7 },
    ],
  },
  {
    name: "orders",
    columns: [
      { name: "order_id", type: "INTEGER" },
      { name: "student_id", type: "INTEGER" },
      { name: "item", type: "TEXT" },
      { name: "price", type: "REAL" },
      { name: "weekday", type: "TEXT" },
    ],
    rows: [
      { order_id: 201, student_id: 1, item: "Pizza slice", price: 3.5, weekday: "Mon" },
      { order_id: 202, student_id: 1, item: "Pizza slice", price: 3.5, weekday: "Tue" },
      { order_id: 203, student_id: 1, item: "Pizza slice", price: 3.5, weekday: "Wed" },
      { order_id: 204, student_id: 1, item: "Pizza slice", price: 3.5, weekday: "Thu" },
      { order_id: 205, student_id: 1, item: "Pizza slice", price: 3.5, weekday: "Fri" },
      { order_id: 206, student_id: 1, item: "Burger", price: 4.75, weekday: "Mon" },
      { order_id: 207, student_id: 1, item: "Fruit cup", price: 2.75, weekday: "Tue" },
      { order_id: 208, student_id: 2, item: "Salad", price: 4, weekday: "Wed" },
      { order_id: 209, student_id: 2, item: "Salad", price: 4, weekday: "Thu" },
      { order_id: 210, student_id: 2, item: "Chicken wrap", price: 5.25, weekday: "Fri" },
      { order_id: 211, student_id: 2, item: "Yogurt parfait", price: 3, weekday: "Mon" },
      { order_id: 212, student_id: 3, item: "Chicken wrap", price: 5.25, weekday: "Tue" },
      { order_id: 213, student_id: 3, item: "Burger", price: 4.75, weekday: "Wed" },
      { order_id: 214, student_id: 3, item: "Yogurt parfait", price: 3, weekday: "Thu" },
      { order_id: 215, student_id: 3, item: "Salad", price: 4, weekday: "Fri" },
      { order_id: 216, student_id: 4, item: "Pizza slice", price: 3.5, weekday: "Mon" },
      { order_id: 217, student_id: 4, item: "Pizza slice", price: 3.5, weekday: "Tue" },
      { order_id: 218, student_id: 4, item: "Fruit cup", price: 2.75, weekday: "Wed" },
      { order_id: 219, student_id: 5, item: "Chicken wrap", price: 5.25, weekday: "Thu" },
      { order_id: 220, student_id: 5, item: "Chicken wrap", price: 5.25, weekday: "Fri" },
      { order_id: 221, student_id: 5, item: "Burger", price: 4.75, weekday: "Mon" },
      { order_id: 222, student_id: 5, item: "Burger", price: 4.75, weekday: "Tue" },
      { order_id: 223, student_id: 5, item: "Salad", price: 4, weekday: "Wed" },
      { order_id: 224, student_id: 5, item: "Burger", price: 4.75, weekday: "Thu" },
      { order_id: 225, student_id: 6, item: "Yogurt parfait", price: 3, weekday: "Fri" },
      { order_id: 226, student_id: 6, item: "Salad", price: 4, weekday: "Mon" },
      { order_id: 227, student_id: 6, item: "Fruit cup", price: 2.75, weekday: "Tue" },
      { order_id: 228, student_id: 7, item: "Pizza slice", price: 3.5, weekday: "Wed" },
      { order_id: 229, student_id: 7, item: "Salad", price: 4, weekday: "Thu" },
      { order_id: 230, student_id: 7, item: "Burger", price: 4.75, weekday: "Fri" },
      { order_id: 231, student_id: 7, item: "Fruit cup", price: 2.75, weekday: "Mon" },
      { order_id: 232, student_id: 8, item: "Chicken wrap", price: 5.25, weekday: "Tue" },
      { order_id: 233, student_id: 8, item: "Yogurt parfait", price: 3, weekday: "Wed" },
      { order_id: 234, student_id: 8, item: "Salad", price: 4, weekday: "Thu" },
      { order_id: 235, student_id: 9, item: "Pizza slice", price: 3.5, weekday: "Fri" },
      { order_id: 236, student_id: 9, item: "Burger", price: 4.75, weekday: "Mon" },
      { order_id: 237, student_id: 9, item: "Salad", price: 4, weekday: "Tue" },
      { order_id: 238, student_id: 9, item: "Chicken wrap", price: 5.25, weekday: "Wed" },
      { order_id: 239, student_id: 10, item: "Fruit cup", price: 2.75, weekday: "Thu" },
      { order_id: 240, student_id: 10, item: "Yogurt parfait", price: 3, weekday: "Fri" },
      { order_id: 241, student_id: 10, item: "Pizza slice", price: 3.5, weekday: "Mon" },
    ],
  },
];

/** Two weeks of cafeteria traffic for line / time-series charts. Peak = Fri Week 2 (95). */
export const WEEKLY_ORDERS_SEED: SeedTable[] = [
  {
    name: "daily_orders",
    columns: [
      { name: "day_num", type: "INTEGER" },
      { name: "weekday", type: "TEXT" },
      { name: "orders", type: "INTEGER" },
      { name: "week_label", type: "TEXT" },
    ],
    rows: [
      { day_num: 1, weekday: "Mon", orders: 42, week_label: "Week 1" },
      { day_num: 2, weekday: "Tue", orders: 55, week_label: "Week 1" },
      { day_num: 3, weekday: "Wed", orders: 48, week_label: "Week 1" },
      { day_num: 4, weekday: "Thu", orders: 63, week_label: "Week 1" },
      { day_num: 5, weekday: "Fri", orders: 80, week_label: "Week 1" },
      { day_num: 6, weekday: "Sat", orders: 30, week_label: "Week 1" },
      { day_num: 7, weekday: "Sun", orders: 25, week_label: "Week 1" },
      { day_num: 8, weekday: "Mon", orders: 51, week_label: "Week 2" },
      { day_num: 9, weekday: "Tue", orders: 58, week_label: "Week 2" },
      { day_num: 10, weekday: "Wed", orders: 54, week_label: "Week 2" },
      { day_num: 11, weekday: "Thu", orders: 71, week_label: "Week 2" },
      { day_num: 12, weekday: "Fri", orders: 95, week_label: "Week 2" },
      { day_num: 13, weekday: "Sat", orders: 33, week_label: "Week 2" },
      { day_num: 14, weekday: "Sun", orders: 28, week_label: "Week 2" },
    ],
  },
];

/** Quiz scores for histogram / distribution charts (32 rows, max 100). */
export const QUIZ_SCORES_SEED: SeedTable[] = [
  {
    name: "quiz_scores",
    columns: [
      { name: "student_name", type: "TEXT" },
      { name: "score", type: "INTEGER" },
      { name: "class_period", type: "TEXT" },
    ],
    rows: [
      { student_name: "Alex", score: 72, class_period: "Period 1" },
      { student_name: "Jordan", score: 85, class_period: "Period 2" },
      { student_name: "Sam", score: 90, class_period: "Period 1" },
      { student_name: "Riley", score: 68, class_period: "Period 2" },
      { student_name: "Casey", score: 95, class_period: "Period 1" },
      { student_name: "Morgan", score: 88, class_period: "Period 2" },
      { student_name: "Taylor", score: 76, class_period: "Period 1" },
      { student_name: "Jamie", score: 81, class_period: "Period 2" },
      { student_name: "Quinn", score: 100, class_period: "Period 1" },
      { student_name: "Devon", score: 64, class_period: "Period 2" },
      { student_name: "Harper", score: 79, class_period: "Period 1" },
      { student_name: "Rowan", score: 92, class_period: "Period 2" },
      { student_name: "Sage", score: 58, class_period: "Period 1" },
      { student_name: "Avery", score: 84, class_period: "Period 2" },
      { student_name: "Reese", score: 73, class_period: "Period 1" },
      { student_name: "Skyler", score: 89, class_period: "Period 2" },
      { student_name: "Blake", score: 71, class_period: "Period 1" },
      { student_name: "Cameron", score: 77, class_period: "Period 2" },
      { student_name: "Drew", score: 83, class_period: "Period 1" },
      { student_name: "Emery", score: 66, class_period: "Period 2" },
      { student_name: "Finley", score: 91, class_period: "Period 1" },
      { student_name: "Gray", score: 74, class_period: "Period 2" },
      { student_name: "Hayden", score: 69, class_period: "Period 1" },
      { student_name: "Indie", score: 87, class_period: "Period 2" },
      { student_name: "Jules", score: 62, class_period: "Period 1" },
      { student_name: "Kai", score: 96, class_period: "Period 2" },
      { student_name: "Lane", score: 80, class_period: "Period 1" },
      { student_name: "Marley", score: 75, class_period: "Period 2" },
      { student_name: "Noel", score: 70, class_period: "Period 1" },
      { student_name: "Oakley", score: 93, class_period: "Period 2" },
      { student_name: "Parker", score: 78, class_period: "Period 1" },
      { student_name: "Remy", score: 67, class_period: "Period 2" },
    ],
  },
];

/** Study time vs. score for scatter / relationship charts (24 rows; Quinn studied most at 90). */
export const STUDY_SCORE_SEED: SeedTable[] = [
  {
    name: "study_log",
    columns: [
      { name: "student_name", type: "TEXT" },
      { name: "study_minutes", type: "INTEGER" },
      { name: "score", type: "INTEGER" },
      { name: "subject", type: "TEXT" },
    ],
    rows: [
      { student_name: "Alex", study_minutes: 20, score: 65, subject: "Math" },
      { student_name: "Jordan", study_minutes: 35, score: 72, subject: "Science" },
      { student_name: "Sam", study_minutes: 50, score: 80, subject: "English" },
      { student_name: "Riley", study_minutes: 15, score: 60, subject: "History" },
      { student_name: "Casey", study_minutes: 60, score: 85, subject: "Math" },
      { student_name: "Morgan", study_minutes: 45, score: 78, subject: "Science" },
      { student_name: "Taylor", study_minutes: 70, score: 90, subject: "English" },
      { student_name: "Jamie", study_minutes: 30, score: 70, subject: "History" },
      { student_name: "Quinn", study_minutes: 90, score: 97, subject: "Math" },
      { student_name: "Devon", study_minutes: 25, score: 68, subject: "Science" },
      { student_name: "Harper", study_minutes: 55, score: 82, subject: "English" },
      { student_name: "Rowan", study_minutes: 40, score: 75, subject: "History" },
      { student_name: "Sage", study_minutes: 18, score: 62, subject: "Math" },
      { student_name: "Avery", study_minutes: 65, score: 88, subject: "Science" },
      { student_name: "Reese", study_minutes: 33, score: 71, subject: "English" },
      { student_name: "Skyler", study_minutes: 48, score: 79, subject: "History" },
      { student_name: "Blake", study_minutes: 75, score: 93, subject: "Math" },
      { student_name: "Cameron", study_minutes: 22, score: 66, subject: "Science" },
      { student_name: "Drew", study_minutes: 58, score: 84, subject: "English" },
      { student_name: "Emery", study_minutes: 42, score: 76, subject: "History" },
      { student_name: "Finley", study_minutes: 80, score: 94, subject: "Math" },
      { student_name: "Gray", study_minutes: 28, score: 69, subject: "Science" },
      { student_name: "Hayden", study_minutes: 52, score: 81, subject: "English" },
      { student_name: "Indie", study_minutes: 38, score: 74, subject: "History" },
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
