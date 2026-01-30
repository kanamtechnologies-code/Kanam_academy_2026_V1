# Supabase setup (Kanam Academy)

## 1) Environment variables

Create a local file in the repo root (recommended): `.env.local`

Copy keys from Supabase → **Project Settings → API**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; do not expose in the browser)

Template: `config/env.example`

## 2) Apply database schema

Open Supabase → **SQL Editor** and run:

- `supabase/schema.sql`

## 3) Safety note

If a service role key is ever shared publicly, rotate it in Supabase immediately.

