-- Kanam Academy — RLS hardening (apply in Supabase SQL Editor after schema/billing/households)
-- Closes: role-blind class/school creation, COPPA consent forgery, instructor progress SELECT,
-- billing helper IDOR, and sensitive student column client updates.

-- ---------------------------------------------------------------------------
-- JWT role helpers (app_metadata only — matches lib/roles.ts)
-- ---------------------------------------------------------------------------
create or replace function public.jwt_is_instructor()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '')
    in ('instructor', 'teacher');
$$;

revoke all on function public.jwt_is_instructor() from public;
grant execute on function public.jwt_is_instructor() to authenticated, service_role;

create or replace function public.jwt_is_parent()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'parent';
$$;

revoke all on function public.jwt_is_parent() from public;
grant execute on function public.jwt_is_parent() to authenticated, service_role;

create or replace function public.is_service_role()
returns boolean
language sql
stable
as $$
  select coalesce(auth.role(), '') = 'service_role';
$$;

revoke all on function public.is_service_role() from public;
grant execute on function public.is_service_role() to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Schools: instructors only may insert
-- ---------------------------------------------------------------------------
drop policy if exists schools_insert_authenticated on public.schools;
drop policy if exists schools_insert_instructor on public.schools;
create policy schools_insert_instructor
  on public.schools for insert
  to authenticated
  with check (public.jwt_is_instructor());

-- ---------------------------------------------------------------------------
-- Classes: instructor role required for mutations
-- ---------------------------------------------------------------------------
drop policy if exists classes_insert_own on public.classes;
create policy classes_insert_own
  on public.classes for insert
  to authenticated
  with check (teacher_user_id = auth.uid() and public.jwt_is_instructor());

drop policy if exists classes_update_own on public.classes;
create policy classes_update_own
  on public.classes for update
  to authenticated
  using (teacher_user_id = auth.uid() and public.jwt_is_instructor())
  with check (teacher_user_id = auth.uid() and public.jwt_is_instructor());

drop policy if exists classes_delete_own on public.classes;
create policy classes_delete_own
  on public.classes for delete
  to authenticated
  using (teacher_user_id = auth.uid() and public.jwt_is_instructor());

-- Enrolled learners / household parents can read their class metadata
drop policy if exists classes_select_enrolled on public.classes;
create policy classes_select_enrolled
  on public.classes for select
  to authenticated
  using (
    exists (
      select 1
      from public.class_enrollments ce
      join public.students s on s.id = ce.student_id
      where ce.class_id = classes.id
        and (
          s.user_id = auth.uid()
          or public.user_owns_household(s.household_id)
        )
    )
  );

-- ---------------------------------------------------------------------------
-- Enrollment / assignment writes: instructors only
-- ---------------------------------------------------------------------------
drop policy if exists class_enrollments_insert_for_own_classes on public.class_enrollments;
create policy class_enrollments_insert_for_own_classes
  on public.class_enrollments for insert
  to authenticated
  with check (
    public.jwt_is_instructor()
    and exists (
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
    public.jwt_is_instructor()
    and exists (
      select 1
      from public.classes c
      where c.id = class_enrollments.class_id
        and c.teacher_user_id = auth.uid()
    )
  );

drop policy if exists class_lesson_assignments_insert_own_classes on public.class_lesson_assignments;
create policy class_lesson_assignments_insert_own_classes
  on public.class_lesson_assignments for insert
  to authenticated
  with check (
    public.jwt_is_instructor()
    and exists (
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
    public.jwt_is_instructor()
    and exists (
      select 1
      from public.classes c
      where c.id = class_lesson_assignments.class_id
        and c.teacher_user_id = auth.uid()
    )
  )
  with check (
    public.jwt_is_instructor()
    and exists (
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
    public.jwt_is_instructor()
    and exists (
      select 1
      from public.classes c
      where c.id = class_lesson_assignments.class_id
        and c.teacher_user_id = auth.uid()
    )
  );

-- Instructor roster SELECT also requires instructor role
drop policy if exists students_select_instructor_roster on public.students;
create policy students_select_instructor_roster
  on public.students for select
  to authenticated
  using (
    public.jwt_is_instructor()
    and exists (
      select 1
      from public.class_enrollments ce
      join public.classes c on c.id = ce.class_id
      where ce.student_id = students.id
        and c.teacher_user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- Instructor can SELECT progress for enrolled learners (avoids service-role reads)
-- ---------------------------------------------------------------------------
drop policy if exists lesson_progress_select_instructor on public.lesson_progress;
create policy lesson_progress_select_instructor
  on public.lesson_progress for select
  to authenticated
  using (
    public.jwt_is_instructor()
    and exists (
      select 1
      from public.class_enrollments ce
      join public.classes c on c.id = ce.class_id
      where ce.student_id = lesson_progress.student_id
        and c.teacher_user_id = auth.uid()
    )
  );

drop policy if exists progress_events_select_instructor on public.progress_events;
create policy progress_events_select_instructor
  on public.progress_events for select
  to authenticated
  using (
    public.jwt_is_instructor()
    and exists (
      select 1
      from public.class_enrollments ce
      join public.classes c on c.id = ce.class_id
      where ce.student_id = progress_events.student_id
        and c.teacher_user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- COPPA: parental consent columns are service-role only
-- ---------------------------------------------------------------------------
create or replace function public.prevent_client_consent_forgery()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  n jsonb := to_jsonb(new);
  o jsonb := to_jsonb(old);
  k text;
begin
  if tg_op = 'UPDATE' and not public.is_service_role() and (n ? 'parental_consent_status') then
    foreach k in array array[
      'parental_consent_status',
      'parental_consent_method',
      'parental_consent_at',
      'parental_consent_signer_name',
      'parental_consent_notice_version',
      'parental_consent_parent_email',
      'parental_consent_stripe_customer_id',
      'parental_consent_checkout_session_id'
    ]
    loop
      if (n ->> k) is distinct from (o ->> k) then
        raise exception 'parental consent fields are service-role only';
      end if;
    end loop;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_households_consent_guard on public.households;
create trigger trg_households_consent_guard
  before update on public.households
  for each row execute function public.prevent_client_consent_forgery();

-- ---------------------------------------------------------------------------
-- Students: block client changes to identity / credential columns
-- ---------------------------------------------------------------------------
create or replace function public.prevent_client_student_sensitive_updates()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  n jsonb := to_jsonb(new);
  o jsonb := to_jsonb(old);
  k text;
begin
  if tg_op = 'UPDATE' and not public.is_service_role() then
    foreach k in array array['user_id', 'household_id', 'password_hash', 'pin_hash', 'device_id']
    loop
      if (n ? k) and ((n ->> k) is distinct from (o ->> k)) then
        raise exception 'student identity and credential fields are service-role only';
      end if;
    end loop;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_students_sensitive_guard on public.students;
create trigger trg_students_sensitive_guard
  before update on public.students
  for each row execute function public.prevent_client_student_sensitive_updates();

-- ---------------------------------------------------------------------------
-- Billing helpers: callers may only query their own user_id
-- ---------------------------------------------------------------------------
create or replace function public.user_has_track_access(p_user_id uuid, p_track_slug text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    (auth.uid() = p_user_id or public.is_service_role())
    and (
      exists (
        select 1
        from public.billing_subscriptions s
        where s.user_id = p_user_id
          and s.status in ('active', 'trialing')
          and (s.current_period_end is null or s.current_period_end > now())
      )
      or exists (
        select 1
        from public.track_entitlements e
        where e.user_id = p_user_id
          and e.track_slug = p_track_slug
          and e.active = true
      )
    );
$$;

create or replace function public.user_tutoring_sessions_remaining(p_user_id uuid)
returns int
language sql
stable
security definer
set search_path = public
as $$
  select case
    when auth.uid() = p_user_id or public.is_service_role() then
      coalesce((
        select sum(sessions_remaining)::int
        from public.tutoring_credits
        where user_id = p_user_id
          and sessions_remaining > 0
      ), 0)
    else 0
  end;
$$;

notify pgrst, 'reload schema';
