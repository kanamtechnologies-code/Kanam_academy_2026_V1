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

-- RLS: enable now; for MVP we’ll write/read via server endpoints using the service role key.
alter table public.schools enable row level security;
alter table public.students enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.progress_events enable row level security;

-- RLS policies (production-style): authenticated users can access only their own student + progress.
drop policy if exists students_select_own on public.students;
create policy students_select_own
  on public.students for select
  to authenticated
  using (auth.uid() = user_id);

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

