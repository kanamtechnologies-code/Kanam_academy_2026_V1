# Production Readiness Tracker

This checklist tracks launch-critical work for Kanam Academy.

## P0 - Must Complete Before External Launch

- [x] Add baseline CI pipeline for lint + build (`.github/workflows/ci.yml`)
- [x] Data Analyst track available without Python prerequisite gate (`lib/tracks.ts`)
- [x] Document env vars (`config/env.example`)
- [x] Resolve remaining repo lint/type errors so CI passes end-to-end
- [x] Auth middleware for session refresh + gated private pages/APIs (`middleware.ts`)
- [x] Server-side lesson paywall — unpaid content not loaded for denied users (`renderGatedLesson`)
- [x] Server-side Python/Data exercise grading — validators/solutions not shipped to the browser
- [x] Lesson access uses real completedIds so revisit stays open after assignment changes
- [x] Student/parent password min length 8; signup requires email confirmation (no auto-confirm)
- [x] Security review of API routes + role checks (student/instructor/admin)
  - Privileged roles read from `app_metadata` only (not client-writable `user_metadata`)
  - Legacy roles auto-migrate on ensure-profile / instructor / parent API access
  - `/api/*` default-deny except explicit public allowlist
  - `/api/health` no longer returns student row samples
  - Instructor invite uses constant-time secret compare + `app_metadata.role`
  - Lesson TTS rate-limits by user id when signed in (tighter anon limit for demo)
- [x] Add rate limiting for auth/admin endpoints
  - Shared in-memory limiter (`lib/auth/rateLimit.ts`) with `Retry-After`
  - Student/parent signup: per-IP + per-email windows
  - Instructor invite + class-code validate/request: per-IP windows
  - Lesson TTS uses the same helper (signed-in vs anon limits)
- [x] Complete Supabase RLS validation for all student/instructor tables
  - Audit: RLS on all 14 public tables; students cannot read peer progress via RLS
  - Hardening migration: `supabase/migrations/20260725_rls_hardening.sql`
  - Class/school mutations require `app_metadata` instructor role
  - Instructor SELECT on enrolled learners’ progress/events
  - COPPA consent + student credential columns guarded (service-role only)
  - Billing helpers only answer for `auth.uid()` (or service role)
  - Applied in Supabase SQL Editor (`20260725_rls_hardening.sql`)
- [x] End-to-end QA for auth flows (new learner, returning learner, forgot/reset password)
  - Localhost (`:3001`) UI + API pass for gates below (2026-07-25)
  - **New learner:** invalid class code blocked; self-paced → age → profile; under-13 UI → ask-parent; API rejects under-13 self-signup (`UNDER_13_PARENT_REQUIRED`), short passwords, missing names/grade; parent page loads with COPPA consent; parent API requires guardian confirmation
  - **Returning:** bad credentials show clear alert; unauthenticated `/dashboard`, `/instructor`, `/parent` redirect to `/welcome?next=…`; `ensure-profile` → 401 without session
  - **Forgot/reset:** Forgot password dialog opens (email prefilled), send shows “Check your email”; `/welcome/reset-password` without token / with `otp_expired` shows actionable error + Back to Welcome; bare `/auth/confirm` redirects with `reset_error`; signup IP rate limit engaged under rapid QA
  - **Manual follow-up (inbox required):** create real student/parent account + email confirm; successful sign-in; open a live reset link and set a new password (same browser as Forgot password for PKCE)
- [x] Error monitoring + alerting (e.g., Sentry + uptime checks)
  - `@sentry/nextjs` wired (client/server/edge + `app/global-error.tsx`); disabled until `NEXT_PUBLIC_SENTRY_DSN` is set
  - No Session Replay; PII defaults off; tunnel at `/monitoring-tunnel`
  - Ops guide: `docs/ops/error-monitoring.md` (Sentry alert rules + external uptime)
  - Backup GitHub probe: `.github/workflows/uptime.yml` → `https://learn.kanamacademy.com/api/health`
  - **Deferred for now:** Sentry project/DSN/alerts (code ready; turn on later via Vercel env)
  - **Still recommended before a big blast:** external uptime on `/api/health` (Better Stack / UptimeRobot)
- [x] Production backup/restore runbook
  - `docs/ops/backup-restore.md` — Supabase daily/PITR, weekly `pg_dump`, restore paths, Stripe/Auth notes, RTO/RPO, drill schedule
  - **Manual:** confirm Supabase backup/PITR on the live project; run first quarterly restore drill into a throwaway project

## P1 - Strongly Recommended For Sales/Pilots

- [ ] Accessibility audit (contrast, keyboard, screen reader)
- [ ] Mobile/tablet QA pass
- [ ] Analytics instrumentation for onboarding and lesson conversion
- [ ] Security/privacy one-pager for schools/parents
- [ ] Pilot onboarding docs for instructors

## Notes

- Dashboard and data lesson hero UI have already been upgraded for readability and polish.
- Lint and `next build` both pass with zero errors/warnings, so CI is green end-to-end.
- Auth E2E was against local app + live Supabase; after deploying security/RLS/rate-limit + Sentry wiring, re-smoke happy-path signup/sign-in/reset on production and confirm `/api/health` returns `{"ok":true}` with no student samples.
