# Facilitator guide images

Screenshot assets for session guides. Naming: `{track}-w{week}-s{session}-{region}.png`

**Examples:** `python-w1-s1-hero.png`, `data-w2-s1-console.png`

## Regions

| Suffix | UI region |
| --- | --- |
| `hero` | Title + goal |
| `tabs` | Lesson / Exercises (or Quiz) tabs |
| `help` | Help / Coach guidance |
| `editor` | Main workspace |
| `run` | Practice / check view |
| `console` | Output / evidence panel (or full viewport fallback) |

## Status

**All catalog lessons have the six region PNGs** (762 files), captured via:

```bash
# Requires local unlock + dev server on :3001
npm run dev -- -p 3001
node scripts/capture-facilitator-screenshots.mjs
# Optional: --track ai-python | data-analyst | …   --force   --limit N
```

Local unlock flags: `NEXT_PUBLIC_UNLOCK_ALL_LESSONS=true` and/or `KANAM_UNLOCK_ALL_LESSONS=true` in `.env.local`.
