-- Kanam Academy — Parent households / kid profiles
-- Apply in Supabase SQL Editor AFTER schema.sql and billing.sql.
-- Safe to re-run.

-- ---------------------------------------------------------------------------
-- Households (parent-owned)
-- ---------------------------------------------------------------------------
create table if not exists public.households (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null default 'My family',
  active_student_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_households_owner
  on public.households (owner_user_id);

drop trigger if exists trg_households_updated_at on public.households;
create trigger trg_households_updated_at
before update on public.households
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Household members (parent Auth users; caregivers later)
-- ---------------------------------------------------------------------------
create table if not exists public.household_members (
  household_id uuid not null references public.households(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'parent',
  created_at timestamptz not null default now(),
  primary key (household_id, user_id),
  constraint household_members_role_check check (role in ('parent', 'caregiver'))
);

create index if not exists idx_household_members_user
  on public.household_members (user_id);

-- ---------------------------------------------------------------------------
-- Students: household + PIN for kid profiles
-- ---------------------------------------------------------------------------
alter table public.students
  add column if not exists household_id uuid references public.households(id) on delete set null;

alter table public.students
  add column if not exists pin_hash text;

create index if not exists idx_students_household
  on public.students (household_id);

-- Active child FK (added after students.household_id exists)
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'households_active_student_fkey'
  ) then
    alter table public.households
      add constraint households_active_student_fkey
      foreign key (active_student_id) references public.students(id) on delete set null;
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function public.user_owns_household(p_household_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.households h
    where h.id = p_household_id
      and h.owner_user_id = auth.uid()
  );
$$;

revoke all on function public.user_owns_household(uuid) from public;
grant execute on function public.user_owns_household(uuid) to authenticated, service_role;

create or replace function public.user_owns_household_student(p_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.students s
    join public.households h on h.id = s.household_id
    where s.id = p_student_id
      and h.owner_user_id = auth.uid()
  );
$$;

revoke all on function public.user_owns_household_student(uuid) from public;
grant execute on function public.user_owns_household_student(uuid) to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.households enable row level security;
alter table public.household_members enable row level security;

drop policy if exists households_select_own on public.households;
create policy households_select_own
  on public.households for select
  to authenticated
  using (owner_user_id = auth.uid());

drop policy if exists households_update_own on public.households;
create policy households_update_own
  on public.households for update
  to authenticated
  using (owner_user_id = auth.uid())
  with check (owner_user_id = auth.uid());

-- Inserts/deletes via service role (signup APIs)

drop policy if exists household_members_select_own on public.household_members;
create policy household_members_select_own
  on public.household_members for select
  to authenticated
  using (
    user_id = auth.uid()
    or public.user_owns_household(household_id)
  );

-- Parents can read/update kid profiles in their household
drop policy if exists students_select_household on public.students;
create policy students_select_household
  on public.students for select
  to authenticated
  using (public.user_owns_household(household_id));

drop policy if exists students_update_household on public.students;
create policy students_update_household
  on public.students for update
  to authenticated
  using (public.user_owns_household(household_id))
  with check (public.user_owns_household(household_id));

-- Progress for household kids (read/write by parent)
drop policy if exists lesson_progress_select_household on public.lesson_progress;
create policy lesson_progress_select_household
  on public.lesson_progress for select
  to authenticated
  using (public.user_owns_household_student(student_id));

drop policy if exists lesson_progress_insert_household on public.lesson_progress;
create policy lesson_progress_insert_household
  on public.lesson_progress for insert
  to authenticated
  with check (public.user_owns_household_student(student_id));

drop policy if exists lesson_progress_update_household on public.lesson_progress;
create policy lesson_progress_update_household
  on public.lesson_progress for update
  to authenticated
  using (public.user_owns_household_student(student_id))
  with check (public.user_owns_household_student(student_id));

drop policy if exists lesson_progress_delete_household on public.lesson_progress;
create policy lesson_progress_delete_household
  on public.lesson_progress for delete
  to authenticated
  using (public.user_owns_household_student(student_id));

-- Enrollments readable for household kids
drop policy if exists class_enrollments_select_household on public.class_enrollments;
create policy class_enrollments_select_household
  on public.class_enrollments for select
  to authenticated
  using (public.user_owns_household_student(student_id));

-- Progress events for household kids
drop policy if exists progress_events_select_household on public.progress_events;
create policy progress_events_select_household
  on public.progress_events for select
  to authenticated
  using (public.user_owns_household_student(student_id));

drop policy if exists progress_events_insert_household on public.progress_events;
create policy progress_events_insert_household
  on public.progress_events for insert
  to authenticated
  with check (public.user_owns_household_student(student_id));

drop policy if exists progress_events_delete_household on public.progress_events;
create policy progress_events_delete_household
  on public.progress_events for delete
  to authenticated
  using (public.user_owns_household_student(student_id));
