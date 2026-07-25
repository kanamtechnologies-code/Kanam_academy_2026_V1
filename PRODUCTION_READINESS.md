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
- [ ] Security review of API routes + role checks (student/instructor/admin)
- [ ] Add rate limiting for auth/admin endpoints
- [ ] Complete Supabase RLS validation for all student/instructor tables
- [ ] End-to-end QA for auth flows (new learner, returning learner, forgot/reset password)
- [ ] Error monitoring + alerting (e.g., Sentry + uptime checks)
- [ ] Production backup/restore runbook

## P1 - Strongly Recommended For Sales/Pilots

- [ ] Accessibility audit (contrast, keyboard, screen reader)
- [ ] Mobile/tablet QA pass
- [ ] Analytics instrumentation for onboarding and lesson conversion
- [ ] Security/privacy one-pager for schools/parents
- [ ] Pilot onboarding docs for instructors

## Notes

- Dashboard and data lesson hero UI have already been upgraded for readability and polish.
- Lint and `next build` both pass with zero errors/warnings, so CI is green end-to-end.
