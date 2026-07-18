# Advanced AI — High School Specialty Pathway

**Track ID:** `advanced-ai`  
**Lessons:** `aai-1` … `aai-16`  
**Routes:** `/learn/advanced-ai/1` … `/learn/advanced-ai/16`  
**Audience:** Grades 10–12 (strong 9s with AI Literacy + Python basics)  
**Length:** 8 weeks · 16 sessions  

This track sits **above AI Literacy** (consumer/citizen) and **beside AI + Python** (rule-based coding). Students learn to **frame, train, evaluate, retrieve, agentify, audit, and ship** AI systems — not only prompt them.

## Prerequisites (recommended)

- **AI Literacy** (`ai-*`) — vocabulary, generative AI, ethics basics  
- **AI + Python** (`lesson-*`) or equivalent — variables, conditionals, loops, functions  

## Standards positioning

| Framework | Role |
| --- | --- |
| **CSTA Reimagining CS Pathways — AI specialty** | Primary pathway alignment (fundamentals → specialty) |
| **AI4K12 / CSTA AI Priorities (2025)** | Creator outcomes: data, ML, evaluation, impact |
| **CSTA 2017 Level 3A/3B AP + IC** | Programs, data analysis, impacts, evaluation |
| **CSTA 2026** | Algorithms & Design, Data & Analysis, Computing & Society, Preparation for the Future |
| **ISTE 2024** | Computational Thinker, Knowledge Constructor, Digital Citizen |

## Week map

| Week | Theme | Lessons | Focus |
| --- | --- | --- | --- |
| 1 | Frame & Data | 1–2 | Task framing; features/labels; leakage; dataset bias |
| 2 | Classical ML | 3–4 | Classifiers; confusion matrix; precision/recall; neural net intuition |
| 3 | Vision & LLMs | 5–6 | CV pipelines; tokens/embeddings; hallucination eval |
| 4 | RAG & Agents | 7–8 | Retrieval-augmented generation; tools; budgets; human gates |
| 5 | Eval & Stack | 9–10 | Evaluation harnesses; prompt vs RAG vs fine-tune |
| 6 | Audit & Secure | 11–12 | Fairness audits; privacy; prompt injection |
| 7 | Ship & Integrate | 13–14 | MLOps lite; multimodal orchestration |
| 8 | Capstone | 15–16 | Build thin vertical slice; demo + audit defense |

## Capstone expectations

Students ship a **narrow vertical slice** (e.g. club FAQ with RAG + citations, or a small classifier) with:

1. Problem brief (task, metric, human review)  
2. Data / corpus notes  
3. Method (prompt / RAG / model)  
4. Held-out evaluation table  
5. Risk / privacy / fairness notes  
6. README: how to run + limitations  

## Lesson depth

Each lesson is a **~40–50 min** deck with **16–18 instructor-depth slides** (substantial teaching prose per slide — not thin cards), mid-lesson check-ins, worked examples, and realistic lab imagery under `/images/lessons/aai-*`.

## Practice challenges

Interactive bank: `lib/advancedAiLessons/interactiveExercises.ts`. Challenges are **aligned to that lesson’s content**.

- Lessons **1–2**: framing / data only (order, scenario, parsons, debug) — **no Eval Lab** yet.  
- Lessons **3+**: **Eval Lab** where confusion matrices / metrics apply (fill TP–FN → choose metric for error cost → next action), plus topic-matched order / parsons / debug / scenario.  
- Does **not** use match or predict exercises.

## Product notes

- Rendered with `AILessonCanvas` (same shell as AI/Digital literacy).  
- **Stripe:** create a dedicated Price in Dashboard and add `"advanced-ai"` to `lib/billing/stripe-catalog.ts` before enabling individual checkout. Family subscription unlocks all `TRACKS` including this one.  
