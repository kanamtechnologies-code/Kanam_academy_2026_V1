# Kanam Academy — Lesson Canvas (MVP)

![Kanam Academy logo](public/images/Logo.png)

Kanam Academy is a **middle-school friendly coding canvas** for live, instructor-led lessons (Zoom-style delivery) where learners practice Python concepts through:
- **Fill-in-the-blanks (guided)**
- **Try it from scratch (scratch editor)**
- **Run + output console**
- **Check-for-understanding (CFU) prompts**
- **Demo mode** for first-time visitors

The UX is designed for grades **6–8**: clear steps, big buttons, minimal “form” overload, and game-style language where appropriate.

---

## Quick start (local dev)

### 1) Install + run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### 2) Supabase setup (recommended for real progress tracking)

This app uses Supabase for **Auth** + **Postgres** progress tracking.

1) Create `.env.local` in the repo root and copy values from `config/env.example`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- (optional, server-only) `SUPABASE_SERVICE_ROLE_KEY`
- (optional) `NEXT_PUBLIC_KANAM_SLOGAN`
- (optional, server-only) `INSTRUCTOR_INVITE_CODE` (required only if you want to create instructors from `/welcome`)

2) Apply the database schema in Supabase:
- Open Supabase → **SQL Editor**
- Run `supabase/schema.sql`

Supabase helpers live here:
- `lib/supabase/browser.ts`
- `lib/supabase/server.ts`
- `lib/supabase/admin.ts` (server-only)

---

## Where to click (key routes)

- **Welcome / entry**: `GET /welcome`
- **Demo dashboard (tutorial-only)**: `GET /demo`
- **Interactive demo lesson**: `GET /learn/demo`
- **Demo completion page**: `GET /demo/complete`
- **Lessons**: `GET /learn/1` → `GET /learn/13`
- **Dashboard (currently reuses the home dashboard page)**: `GET /dashboard`

---

## Instructor / teacher notes (MVP)

- **Instructor view toggle**: add `?instructor=1` to a lesson URL to show extra instructor-only blocks (MVP).
- **Zoom preview (testing)**: some lessons can render an instructor live block / preview in the canvas (see `LessonCanvas`).
- **Instructor dashboard**: `GET /instructor`
- **Create an instructor account (staff-only)**:
  - Set `SUPABASE_SERVICE_ROLE_KEY` and `INSTRUCTOR_INVITE_CODE` in `.env.local`
  - Go to `GET /welcome` → “Create instructor account”

---

## Screenshots / images

Want the README to show the real UI? Add screenshots into `public/images/` and link them like this:

```md
![Lesson Canvas screenshot](public/images/lesson-canvas.png)
```

---

## Build / production

```bash
npm run build
npm run start
```

---

## What this repo is (high level)

- **Next.js App Router** UI with a custom **Lesson Canvas** experience
- **Mini Python runner** for beginner-friendly execution (safe subset)
- **Supabase** for authentication + tracking progress events and rollups

If you’re new here: start by opening `components/lesson/LessonCanvas.tsx` and any lesson page under `app/learn/*/page.tsx`.
