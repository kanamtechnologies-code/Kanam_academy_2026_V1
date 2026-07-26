# Error monitoring + alerting

**Owner:** founder / ops  
**Production origin:** `https://learn.kanamacademy.com`  
**Health probe:** `GET /api/health` → `{"ok":true}` (no PII)

---

## 1. Sentry (application errors)

### Create the project

1. Sign up at [sentry.io](https://sentry.io) (or use an existing org).
2. Create a **Next.js** project named e.g. `kanam-academy`.
3. Copy the **DSN**.

### Env vars (Vercel / `.env.local`)

| Variable | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SENTRY_DSN` | Client + server | Required to enable reporting |
| `NEXT_PUBLIC_SENTRY_ENVIRONMENT` | Optional | e.g. `production` / `preview` |
| `SENTRY_ORG` | Build only | Org slug (source maps) |
| `SENTRY_PROJECT` | Build only | Project slug |
| `SENTRY_AUTH_TOKEN` | Build only | Auth token with `project:releases` + `org:read` |

Without `NEXT_PUBLIC_SENTRY_DSN`, the SDK stays disabled (local/CI safe).  
Without `SENTRY_AUTH_TOKEN`, builds skip source-map upload (still compile).

### What is wired in the repo

- Client: `instrumentation-client.ts`
- Server / edge: `sentry.server.config.ts`, `sentry.edge.config.ts`, `instrumentation.ts`
- React root errors: `app/global-error.tsx`
- Tunnel (ad-blocker bypass): `/monitoring-tunnel` (excluded from auth middleware)
- **No Session Replay** (COPPA / school privacy)
- `sendDefaultPii: false`; cookies / Authorization headers stripped in `beforeSend`

### Alerts to configure in Sentry

In **Alerts → Create Alert Rule**:

1. **New issues** — notify when a new issue is created (email or Slack).
2. **Spike** — issue frequency increases sharply (e.g. >50 events in 1 hour).
3. **Regression** — a resolved issue reappears.

Recommended channel: Slack `#kanam-alerts` or email `info@kanamacademy.com`.

### Verify

1. Deploy with `NEXT_PUBLIC_SENTRY_DSN` set.
2. Temporarily add a throw on a private test route, or use Sentry’s “Send sample event”.
3. Confirm the event appears under **Issues**, then delete the test code if you added any.

---

## 2. Uptime monitoring (availability)

Probe **every 1–5 minutes**:

```text
https://learn.kanamacademy.com/api/health
```

- Expect **HTTP 200** and JSON containing `"ok":true`
- Alert on: non-200, timeout (>10s), or body without `"ok":true`
- Notify: same Slack/email as Sentry

### Options (pick one primary)

| Tool | Notes |
| --- | --- |
| [Better Stack](https://betterstack.com/uptime) / [UptimeRobot](https://uptimerobot.com) / [Cronitor](https://cronitor.io) | Best for real-time SMS/Slack; set keyword monitor for `"ok":true` |
| Vercel | Enable project notifications for failed deployments + optional observability |
| GitHub Actions | `.github/workflows/uptime.yml` — baseline check every 15 minutes (can be delayed by GitHub) |

Treat the GitHub workflow as a **backup**, not the only pager.

### Incident first response

1. Confirm `/api/health` from your machine and from [https://www.whatsmydns.net](https://www.whatsmydns.net) / a second network.
2. Check Vercel deployment status and recent deploys.
3. Check Supabase status + project (API / DB). Health fails with `where: "supabase"` when the DB probe fails.
4. Roll back the last Vercel deploy if the outage started after a release.
5. Post a short note in `#kanam-alerts` with time detected, impact, and next action.

---

## 3. Privacy notes

- Do not enable Session Replay for learner surfaces.
- Prefer alerting on error **signatures**, not raw request bodies that may contain student data.
- Strip cookies / auth headers before events leave the app (already done in shared options).
