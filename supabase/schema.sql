-- Kanam Academy — Supabase schema (MVP but extensible)
-- Apply in Supabase SQL Editor.

-- UUID helper
create extension if not exists pgcrypto;

-- Updated-at trigger helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Schools / orgs (optional for MVP; included for a comprehensive model)
create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

-- Helpful constraint for upserting by school name
create unique index if not exists idx_schools_name_unique on public.schools (name);

-- Students (MVP identity = device_id + display_name; later you can link to auth user)
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  -- Device identifier (allows multiple students on the same device).
  device_id text not null,
  display_name text not null,
  first_name text,
  last_name text,
  grade text,

  -- Optional: org linkage
  school_id uuid references public.schools(id) on delete set null,

  -- Password login (store a salted hash, never plaintext)
  -- Format: scrypt$<salt_b64>$<hash_b64>
  password_hash text,

  -- Optional: parent/guardian info (for a “comprehensive” model)
  parent_name text,
  parent_email text,
  parent_phone text,

  -- Production identity: tie student profile to a real Supabase Auth user.
  -- NOTE: kept nullable for migration; in production you should backfill and enforce NOT NULL.
  user_id uuid references auth.users(id) on delete cascade,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_students_device_id on public.students (device_id);
create unique index if not exists idx_students_user_unique on public.students (user_id) where user_id is not null;

drop trigger if exists trg_students_updated_at on public.students;
create trigger trg_students_updated_at
before update on public.students
for each row execute function public.set_updated_at();

-- Aggregated lesson progress (one row per student+lesson)
create table if not exists public.lesson_progress (
  student_id uuid not null references public.students(id) on delete cascade,
  lesson_id text not null,

  opened_at timestamptz,
  last_event_at timestamptz,

  -- Core milestones
  success boolean not null default false,
  success_at timestamptz,

  -- Useful telemetry (optional but helps instructor dashboards)
  guided_touched boolean not null default false,
  scratch_touched boolean not null default false,
  has_run boolean not null default false,

  -- CFU tracking
  cfu_total int not null default 0,
  cfu_revealed_count int not null default 0,

  -- Learner insights telemetry
  time_spent_seconds int not null default 0,
  quiz_attempts int not null default 0,
  quiz_correct int not null default 0,
  activities_completed int not null default 0,
  activities_total int not null default 0,
  exam_percent numeric null,
  exam_correct int null,
  exam_total int null,

  primary key (student_id, lesson_id)
);

-- Immutable event log (tracks everything; helpful for analytics + “replay”)
create table if not exists public.progress_events (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete set null,
  device_id text not null,
  lesson_id text,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_progress_events_student_created
  on public.progress_events (student_id, created_at desc);
create index if not exists idx_progress_events_device_created
  on public.progress_events (device_id, created_at desc);

-- Classes + enrollments (Instructor dashboard MVP)
create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  teacher_user_id uuid not null references auth.users(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  name text not null,
  -- Human-shareable code students enter during onboarding (case-insensitive in the app; store uppercase).
  code text not null,
  -- True for the shared self-paced / async cohort (all async learners use one code).
  is_async boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists idx_classes_code_unique on public.classes (code);
create index if not exists idx_classes_teacher_user_id on public.classes (teacher_user_id);

-- Existing projects: add the async flag if the table already existed without it.
alter table public.classes add column if not exists is_async boolean not null default false;

create table if not exists public.class_enrollments (
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (class_id, student_id)
);

create index if not exists idx_class_enrollments_class on public.class_enrollments (class_id);
create index if not exists idx_class_enrollments_student on public.class_enrollments (student_id);

-- Per-class lesson assignments (instructor turns lessons on/off for enrolled students)
create table if not exists public.class_lesson_assignments (
  class_id uuid not null references public.classes(id) on delete cascade,
  lesson_id text not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (class_id, lesson_id)
);

create index if not exists idx_class_lesson_assignments_class on public.class_lesson_assignments (class_id);
create index if not exists idx_class_lesson_assignments_lesson on public.class_lesson_assignments (lesson_id);

drop trigger if exists trg_class_lesson_assignments_updated_at on public.class_lesson_assignments;
create trigger trg_class_lesson_assignments_updated_at
before update on public.class_lesson_assignments
for each row execute function public.set_updated_at();

-- RLS: enable now; for MVP we’ll write/read via server endpoints using the service role key.
alter table public.schools enable row level security;
alter table public.students enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.progress_events enable row level security;
alter table public.classes enable row level security;
alter table public.class_enrollments enable row level security;
alter table public.class_lesson_assignments enable row level security;

-- Schools: safe to list for authenticated users (used for instructor dashboards / class display)
drop policy if exists schools_select_all_authenticated on public.schools;
create policy schools_select_all_authenticated
  on public.schools for select
  to authenticated
  using (true);

drop policy if exists schools_insert_authenticated on public.schools;
create policy schools_insert_authenticated
  on public.schools for insert
  to authenticated
  with check (true);

-- RLS policies (production-style): authenticated users can access only their own student + progress.
drop policy if exists students_select_own on public.students;
create policy students_select_own
  on public.students for select
  to authenticated
  using (auth.uid() = user_id);

-- Instructors can read student rows for learners enrolled in their classes (roster view).
-- (MVP: exposes only what is stored in `public.students`.)
drop policy if exists students_select_instructor_roster on public.students;
create policy students_select_instructor_roster
  on public.students for select
  to authenticated
  using (
    exists (
      select 1
      from public.class_enrollments ce
      join public.classes c on c.id = ce.class_id
      where ce.student_id = students.id
        and c.teacher_user_id = auth.uid()
    )
  );

drop policy if exists students_insert_own on public.students;
create policy students_insert_own
  on public.students for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists students_update_own on public.students;
create policy students_update_own
  on public.students for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists lesson_progress_select_own on public.lesson_progress;
create policy lesson_progress_select_own
  on public.lesson_progress for select
  to authenticated
  using (
    exists (
      select 1
      from public.students s
      where s.id = lesson_progress.student_id
        and s.user_id = auth.uid()
    )
  );

drop policy if exists lesson_progress_write_own on public.lesson_progress;
create policy lesson_progress_write_own
  on public.lesson_progress for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.students s
      where s.id = lesson_progress.student_id
        and s.user_id = auth.uid()
    )
  );

drop policy if exists lesson_progress_update_own on public.lesson_progress;
create policy lesson_progress_update_own
  on public.lesson_progress for update
  to authenticated
  using (
    exists (
      select 1
      from public.students s
      where s.id = lesson_progress.student_id
        and s.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.students s
      where s.id = lesson_progress.student_id
        and s.user_id = auth.uid()
    )
  );

drop policy if exists lesson_progress_delete_own on public.lesson_progress;
create policy lesson_progress_delete_own
  on public.lesson_progress for delete
  to authenticated
  using (
    exists (
      select 1
      from public.students s
      where s.id = lesson_progress.student_id
        and s.user_id = auth.uid()
    )
  );

drop policy if exists progress_events_select_own on public.progress_events;
create policy progress_events_select_own
  on public.progress_events for select
  to authenticated
  using (
    exists (
      select 1
      from public.students s
      where s.id = progress_events.student_id
        and s.user_id = auth.uid()
    )
  );

drop policy if exists progress_events_insert_own on public.progress_events;
create policy progress_events_insert_own
  on public.progress_events for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.students s
      where s.id = progress_events.student_id
        and s.user_id = auth.uid()
    )
  );

drop policy if exists progress_events_delete_own on public.progress_events;
create policy progress_events_delete_own
  on public.progress_events for delete
  to authenticated
  using (
    exists (
      select 1
      from public.students s
      where s.id = progress_events.student_id
        and s.user_id = auth.uid()
    )
  );

-- Instructors: read/write only their own classes
drop policy if exists classes_select_own on public.classes;
create policy classes_select_own
  on public.classes for select
  to authenticated
  using (teacher_user_id = auth.uid());

drop policy if exists classes_insert_own on public.classes;
create policy classes_insert_own
  on public.classes for insert
  to authenticated
  with check (teacher_user_id = auth.uid());

drop policy if exists classes_update_own on public.classes;
create policy classes_update_own
  on public.classes for update
  to authenticated
  using (teacher_user_id = auth.uid())
  with check (teacher_user_id = auth.uid());

drop policy if exists classes_delete_own on public.classes;
create policy classes_delete_own
  on public.classes for delete
  to authenticated
  using (teacher_user_id = auth.uid());

-- Enrollments: instructors can view and manage enrollments for their classes.
-- Students can read their own enrollment rows (needed for lesson-access checks).
drop policy if exists class_enrollments_select_own_student on public.class_enrollments;
create policy class_enrollments_select_own_student
  on public.class_enrollments for select
  to authenticated
  using (
    exists (
      select 1
      from public.students s
      where s.id = class_enrollments.student_id
        and s.user_id = auth.uid()
    )
  );

drop policy if exists class_enrollments_select_for_own_classes on public.class_enrollments;
create policy class_enrollments_select_for_own_classes
  on public.class_enrollments for select
  to authenticated
  using (
    exists (
      select 1
      from public.classes c
      where c.id = class_enrollments.class_id
        and c.teacher_user_id = auth.uid()
    )
  );

drop policy if exists class_enrollments_insert_for_own_classes on public.class_enrollments;
create policy class_enrollments_insert_for_own_classes
  on public.class_enrollments for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.classes c
      where c.id = class_enrollments.class_id
        and c.teacher_user_id = auth.uid()
    )
  );

drop policy if exists class_enrollments_delete_for_own_classes on public.class_enrollments;
create policy class_enrollments_delete_for_own_classes
  on public.class_enrollments for delete
  to authenticated
  using (
    exists (
      select 1
      from public.classes c
      where c.id = class_enrollments.class_id
        and c.teacher_user_id = auth.uid()
    )
  );

-- Assignments: instructors manage lessons for their own classes.
drop policy if exists class_lesson_assignments_select_own_classes on public.class_lesson_assignments;
create policy class_lesson_assignments_select_own_classes
  on public.class_lesson_assignments for select
  to authenticated
  using (
    exists (
      select 1
      from public.classes c
      where c.id = class_lesson_assignments.class_id
        and c.teacher_user_id = auth.uid()
    )
  );

drop policy if exists class_lesson_assignments_insert_own_classes on public.class_lesson_assignments;
create policy class_lesson_assignments_insert_own_classes
  on public.class_lesson_assignments for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.classes c
      where c.id = class_lesson_assignments.class_id
        and c.teacher_user_id = auth.uid()
    )
  );

drop policy if exists class_lesson_assignments_update_own_classes on public.class_lesson_assignments;
create policy class_lesson_assignments_update_own_classes
  on public.class_lesson_assignments for update
  to authenticated
  using (
    exists (
      select 1
      from public.classes c
      where c.id = class_lesson_assignments.class_id
        and c.teacher_user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.classes c
      where c.id = class_lesson_assignments.class_id
        and c.teacher_user_id = auth.uid()
    )
  );

drop policy if exists class_lesson_assignments_delete_own_classes on public.class_lesson_assignments;
create policy class_lesson_assignments_delete_own_classes
  on public.class_lesson_assignments for delete
  to authenticated
  using (
    exists (
      select 1
      from public.classes c
      where c.id = class_lesson_assignments.class_id
        and c.teacher_user_id = auth.uid()
    )
  );

-- Students can read assignments for classes they are enrolled in.
drop policy if exists class_lesson_assignments_select_enrolled on public.class_lesson_assignments;
create policy class_lesson_assignments_select_enrolled
  on public.class_lesson_assignments for select
  to authenticated
  using (
    exists (
      select 1
      from public.class_enrollments ce
      join public.students s on s.id = ce.student_id
      where ce.class_id = class_lesson_assignments.class_id
        and s.user_id = auth.uid()
    )
  );

-- Refresh PostgREST schema cache (so API routes see new tables immediately).
notify pgrst, 'reload schema';

-- Quick verification (optional — run separately after apply):
-- select tablename from pg_tables where schemaname = 'public' order by tablename;
-- Expected: class_enrollments, class_lesson_assignments, classes, lesson_progress, progress_events, schools, students
