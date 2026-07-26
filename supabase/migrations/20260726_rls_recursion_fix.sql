-- Fix: infinite recursion detected in policy for relation "class_enrollments"
--
-- Cycle was:
--   class_enrollments policy → SELECT classes
--   classes_select_enrolled → SELECT class_enrollments
-- (also triggered when students SELECT evaluates the instructor-roster policy)
--
-- Apply in Supabase SQL Editor, then retry sign-in.

-- ---------------------------------------------------------------------------
-- SECURITY DEFINER helpers (bypass RLS when checking cross-table ownership)
-- ---------------------------------------------------------------------------
create or replace function public.user_teaches_class(p_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.classes c
    where c.id = p_class_id
      and c.teacher_user_id = auth.uid()
  );
$$;

revoke all on function public.user_teaches_class(uuid) from public;
grant execute on function public.user_teaches_class(uuid) to authenticated, service_role;

create or replace function public.user_enrolled_in_class(p_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.class_enrollments ce
    join public.students s on s.id = ce.student_id
    where ce.class_id = p_class_id
      and (
        s.user_id = auth.uid()
        or public.user_owns_household(s.household_id)
      )
  );
$$;

revoke all on function public.user_enrolled_in_class(uuid) from public;
grant execute on function public.user_enrolled_in_class(uuid) to authenticated, service_role;

create or replace function public.user_teaches_student(p_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.class_enrollments ce
    join public.classes c on c.id = ce.class_id
    where ce.student_id = p_student_id
      and c.teacher_user_id = auth.uid()
  );
$$;

revoke all on function public.user_teaches_student(uuid) from public;
grant execute on function public.user_teaches_student(uuid) to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Rewrite policies that crossed class_enrollments ↔ classes under RLS
-- ---------------------------------------------------------------------------
drop policy if exists classes_select_enrolled on public.classes;
create policy classes_select_enrolled
  on public.classes for select
  to authenticated
  using (public.user_enrolled_in_class(id));

drop policy if exists class_enrollments_select_for_own_classes on public.class_enrollments;
create policy class_enrollments_select_for_own_classes
  on public.class_enrollments for select
  to authenticated
  using (public.user_teaches_class(class_id));

drop policy if exists class_enrollments_insert_for_own_classes on public.class_enrollments;
create policy class_enrollments_insert_for_own_classes
  on public.class_enrollments for insert
  to authenticated
  with check (
    public.jwt_is_instructor()
    and public.user_teaches_class(class_id)
  );

drop policy if exists class_enrollments_delete_for_own_classes on public.class_enrollments;
create policy class_enrollments_delete_for_own_classes
  on public.class_enrollments for delete
  to authenticated
  using (
    public.jwt_is_instructor()
    and public.user_teaches_class(class_id)
  );

drop policy if exists students_select_instructor_roster on public.students;
create policy students_select_instructor_roster
  on public.students for select
  to authenticated
  using (
    public.jwt_is_instructor()
    and public.user_teaches_student(id)
  );

drop policy if exists lesson_progress_select_instructor on public.lesson_progress;
create policy lesson_progress_select_instructor
  on public.lesson_progress for select
  to authenticated
  using (
    public.jwt_is_instructor()
    and public.user_teaches_student(student_id)
  );

drop policy if exists progress_events_select_instructor on public.progress_events;
create policy progress_events_select_instructor
  on public.progress_events for select
  to authenticated
  using (
    public.jwt_is_instructor()
    and public.user_teaches_student(student_id)
  );

drop policy if exists class_lesson_assignments_select_own_classes on public.class_lesson_assignments;
create policy class_lesson_assignments_select_own_classes
  on public.class_lesson_assignments for select
  to authenticated
  using (public.user_teaches_class(class_id));

drop policy if exists class_lesson_assignments_insert_own_classes on public.class_lesson_assignments;
create policy class_lesson_assignments_insert_own_classes
  on public.class_lesson_assignments for insert
  to authenticated
  with check (
    public.jwt_is_instructor()
    and public.user_teaches_class(class_id)
  );

drop policy if exists class_lesson_assignments_update_own_classes on public.class_lesson_assignments;
create policy class_lesson_assignments_update_own_classes
  on public.class_lesson_assignments for update
  to authenticated
  using (
    public.jwt_is_instructor()
    and public.user_teaches_class(class_id)
  )
  with check (
    public.jwt_is_instructor()
    and public.user_teaches_class(class_id)
  );

drop policy if exists class_lesson_assignments_delete_own_classes on public.class_lesson_assignments;
create policy class_lesson_assignments_delete_own_classes
  on public.class_lesson_assignments for delete
  to authenticated
  using (
    public.jwt_is_instructor()
    and public.user_teaches_class(class_id)
  );

notify pgrst, 'reload schema';
