/**
 * Canonical Kanam AI helper bot — high school / premium geometric style.
 * Use these assets (and this look) for lesson art going forward.
 *
 * Look: low-poly teal/seafoam plates, charcoal joints, dark visor,
 * single cyan eye accent. Not a cute mascot; not a busy marketing collage.
 */
export const KANAM_BOT = {
  /** Full-body bot presenting a console (hero pose — use sparingly) */
  console: "/images/lessons/kanam-bot-console.jpg",
  /** Compact print() scene — bot + console output */
  print: "/images/lessons/kanam-bot-print.jpg",
  /** Contemplative bust — general think pose */
  think: "/images/lessons/kanam-bot-think.jpg",
  /** Predict-before-you-run — fills the frame */
  predict: "/images/lessons/kanam-bot-predict.jpg",
  /** Ready / start practice */
  ready: "/images/lessons/kanam-bot-ready.jpg",
  /** Intro: bot + first code card */
  intro: "/images/lessons/kanam-bot-intro.jpg",
  /** Variables / named storage */
  variable: "/images/lessons/kanam-bot-variable.jpg",
  /** String concatenation visual */
  concat: "/images/lessons/kanam-bot-concat.jpg",
  /** Ordered steps: store → join → print */
  steps: "/images/lessons/kanam-bot-steps.jpg",
} as const;

export type KanamBotKey = keyof typeof KANAM_BOT;
