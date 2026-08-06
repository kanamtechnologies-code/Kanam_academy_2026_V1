# Facilitator guides

Session-ready materials for every Kanam Academy track. Markdown is the source of truth.

## Tracks (full guides)

| Track | Folder | Status |
| --- | --- | --- |
| Python & AI | [python/](python/) · [python-week-1/](python-week-1/) (illustrated W1) | Full |
| Data Analyst | [data/](data/) | Full |
| AI Literacy | [ai-literacy/](ai-literacy/) | Full |
| Advanced AI | [advanced-ai/](advanced-ai/) | Full |
| AP CSP Prep | [ap-csp/](ap-csp/) | Full |
| Digital Literacy | [digital/](digital/) | Full |
| Cybersecurity | [cyber/](cyber/) | Full |
| Financial Literacy | [finance/](finance/) | Full |

## Shared

| Path | Role |
| --- | --- |
| [`_template.md`](_template.md) | Session guide template |
| [`images/`](images/) | Screenshot assets + capture checklist |
| [`rubrics/`](rubrics/) | Capstone & collaboration performance rubrics |
| [`pd-hours-log.md`](pd-hours-log.md) | Cognia Std 3 PD participation / hours template |
| [`instructor-checklist.md`](instructor-checklist.md) | Pre/during/after session checklist |
| [`outlines/`](outlines/) | Legacy one-pagers (superseded; kept for quick scan) |

## How to run a session

1. Open the track → week → session guide.
2. Complete **Pre-class setup**.
3. Follow the minute-by-minute run of show.
4. Use **What “good” looks like** while circulating.
5. Close with the exit ticket; check instructor progress.

## Regeneration

```bash
node scripts/generate-facilitator-guides.mjs
```

Python Week 1 hand-authored guides in `python-week-1/` are preserved (pointers from `python/week-1/`). Pass `--force-python-w1` to overwrite generated copies only.

## Cognia / PD

Supports Cognia STEM Standard 3 (STEM-specific professional learning). Use the [PD hours log](pd-hours-log.md) and [instructor checklist](instructor-checklist.md); performance assessment artifacts live under [rubrics/](rubrics/). Full map: [cognia-stem-evidence.md](../cognia-stem-evidence.md).
