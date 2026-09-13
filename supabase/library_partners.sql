-- Kanam Academy — Library partnership classes
-- Apply in Supabase SQL Editor AFTER schema.sql.
-- Safe to re-run.

alter table public.classes add column if not exists kind text not null default 'standard';
alter table public.classes add column if not exists partner_slug text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'classes_kind_check'
  ) then
    alter table public.classes
      add constraint classes_kind_check
      check (kind in ('standard', 'library'));
  end if;
end
$$;

create unique index if not exists idx_classes_partner_slug_unique
  on public.classes (partner_slug)
  where partner_slug is not null;
