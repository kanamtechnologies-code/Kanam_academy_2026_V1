-- Richer learner telemetry for parent/instructor insights.
-- Safe to apply multiple times (IF NOT EXISTS / additive columns).

alter table public.lesson_progress
  add column if not exists time_spent_seconds int not null default 0;

alter table public.lesson_progress
  add column if not exists quiz_attempts int not null default 0;

alter table public.lesson_progress
  add column if not exists quiz_correct int not null default 0;

alter table public.lesson_progress
  add column if not exists activities_completed int not null default 0;

alter table public.lesson_progress
  add column if not exists activities_total int not null default 0;

alter table public.lesson_progress
  add column if not exists exam_percent numeric null;

alter table public.lesson_progress
  add column if not exists exam_correct int null;

alter table public.lesson_progress
  add column if not exists exam_total int null;

comment on column public.lesson_progress.time_spent_seconds is
  'Active seconds accumulated via session_heartbeat events while the lesson is visible.';
comment on column public.lesson_progress.quiz_attempts is
  'Count of quiz/choice attempts with a recorded correct flag.';
comment on column public.lesson_progress.quiz_correct is
  'Count of correct quiz/choice attempts.';
comment on column public.lesson_progress.exam_percent is
  'Latest assessment percent when this lesson_id is an exam.';
