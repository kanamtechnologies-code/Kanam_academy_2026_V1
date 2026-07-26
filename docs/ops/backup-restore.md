# Production backup & restore runbook

**Owner:** founder / ops (backup person with Supabase + Stripe admin)  
**Primary DB:** Supabase Postgres (Kanam Academy project)  
**App host:** Vercel (`learn.kanamacademy.com`)  
**Last drill:** _fill in after first restore practice_

---

## 1. What must be recoverable

| System | Contains | Backup source of truth |
| --- | --- | --- |
| Supabase Postgres | Students, classes, progress, households, billing rows, consent | Supabase automatic backups + optional `pg_dump` |
| Supabase Auth | User accounts, emails, app_metadata roles | Included in Supabase project backups / Auth admin export if needed |
| Stripe | Customers, subscriptions, invoices | Stripe is system of record; DB mirrors via webhooks |
| Vercel | App deploy + env vars | GitHub `main` + Vercel env settings (document separately) |
| Secrets | Service role, Stripe, invite code, Sentry | Password manager / Vercel — **never** in git |

Schema reference in repo: `supabase/schema.sql`, `billing.sql`, `households.sql`, `parental_consent.sql`, `migrations/20260725_rls_hardening.sql`.

---

## 2. Daily / continuous backups (Supabase)

### Confirm plan features

In Supabase Dashboard → **Project Settings → Add-ons / Database**:

1. Confirm **daily backups** are enabled (Pro and above).
2. Prefer enabling **Point-in-Time Recovery (PITR)** if the plan allows — restores to a timestamp, not only daily snapshots.
3. Note retention window (e.g. 7 days daily / PITR window) in the team password manager.

### Weekly logical dump (recommended)

From a trusted machine with the **database connection string** (Settings → Database → URI; use the **session** pooler or direct host as Supabase documents for dumps):

```bash
# Example — store DUMP_URL in your password manager, not in the repo
export DUMP_URL='postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres'

pg_dump "$DUMP_URL" \
  --format=custom \
  --no-owner \
  --no-acl \
  --file "kanam-$(date -u +%Y%m%dT%H%M%SZ).dump"
```

Store the file in encrypted cloud storage (e.g. encrypted Drive / S3 with restricted IAM). Keep at least **4 weekly** dumps.

Optional schema-only dump for faster disaster rebuild:

```bash
pg_dump "$DUMP_URL" --schema-only --no-owner --file "kanam-schema-$(date -u +%Y%m%d).sql"
```

---

## 3. Restore procedures

### A. Soft restore (recent accidental delete / bad migration)

**Preferred:** Supabase **PITR** or **daily backup restore** into a **new** project / branch, then validate, then cut over.

1. Dashboard → **Database → Backups** (or PITR).
2. Choose timestamp **before** the bad change.
3. Restore to a **temporary** project when possible (avoid overwriting prod until verified).
4. Validate with the checklist in §4.
5. If restore landed on a new project: update Vercel `NEXT_PUBLIC_SUPABASE_*` + `SUPABASE_SERVICE_ROLE_KEY`, redeploy, update Auth redirect URLs.
6. If in-place restore is the only option: schedule maintenance, notify instructors/parents, restore, re-run post-checks.

### B. Logical restore from `pg_dump`

```bash
# WARNING: destructive to the target database. Prefer a fresh project.
pg_restore --clean --if-exists --no-owner --no-acl \
  --dbname "$DUMP_URL" \
  kanam-YYYYMMDDTHHMMSSZ.dump
```

If `pg_restore` conflicts with managed Supabase roles, restore into a new project and migrate DNS/env instead of force-cleaning the live DB.

### C. Schema-only rebuild + empty data

Use when data is gone but you need the app online for new signups:

1. Create a new Supabase project.
2. Run SQL files in order (see `supabase/README.md`).
3. Point Vercel env at the new project.
4. Re-create instructor invite usage, async class owner (`KANAM_ASYNC_OWNER_USER_ID`), Stripe webhook endpoint.
5. Accept that historical progress is lost unless a dump exists.

### D. Stripe / billing after DB restore

- Stripe remains authoritative for paid state.
- After DB restore, confirm `billing_customers` / `billing_subscriptions` match Stripe (or re-sync via webhook replay / support tooling).
- Do **not** invent subscription rows by hand without matching Stripe IDs.

### E. Auth / roles

Privileged roles live in **`app_metadata.role`** (`instructor` / `parent`). After restore, spot-check:

- One instructor can open `/instructor`
- One parent can open `/parent`
- A student cannot call instructor APIs

---

## 4. Post-restore validation checklist

```bash
curl -fsS https://learn.kanamacademy.com/api/health
# expect: {"ok":true}
```

In Supabase SQL Editor:

```sql
select tablename from pg_tables where schemaname = 'public' order by tablename;
select count(*) from public.students;
select count(*) from public.classes;
```

Manual product checks:

- [ ] Welcome loads; sign-in works for a known test account
- [ ] Student dashboard + one lesson open
- [ ] Instructor roster for a known class
- [ ] Parent hub lists expected children (if household data restored)
- [ ] Stripe customer portal / webhook still receives events (test mode first if unsure)
- [ ] Sentry still receiving events (optional test issue)

---

## 5. Drill schedule

| Cadence | Action |
| --- | --- |
| Monthly | Confirm latest automatic backup / PITR is listed in Dashboard |
| Quarterly | Restore latest weekly `.dump` into a **throwaway** Supabase project; run §4 against that project URL |
| After major schema change | Take an extra `pg_dump` before and after; note migration file name in the dump folder |

Record each drill: date, who ran it, backup used, time to healthy `/api/health`, issues found.

---

## 6. RTO / RPO targets (pilot scale)

| Metric | Target | Notes |
| --- | --- | --- |
| **RPO** (max data loss) | ≤ 24h without PITR; ≤ 5–15 min with PITR | Tighten when pilots expand |
| **RTO** (time to restore service) | ≤ 4 hours | Env cutover + validation |

Escalate to backup owner if restore exceeds RTO or student data integrity is unclear — pause lesson traffic if needed.
