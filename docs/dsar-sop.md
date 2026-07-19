# DSAR / COPPA request SOP (`info@kanamacademy.com`)

Short operating procedure for parent/guardian requests to **access, correct, delete, or refuse further collection** of a child’s information. Privacy Policy and consent point here.

**Effective:** 2026-07-19  
**Owner inbox:** `info@kanamacademy.com`  
**Product self-serve:** Parent hub → Export data / Delete (child) / Delete family account

---

## 1. Who handles it

| Role | Responsibility |
|------|----------------|
| **Primary** | Whoever owns `info@` day-to-day (founder / ops) |
| **Backup** | Designate one other person with Supabase + Stripe admin access |
| **Escalation** | Unusual legal demand, school FERPA request, or disputed parentage → pause and get counsel |

**SLA (target):** acknowledge within **2 business days**; complete routine requests within **10 business days**.

Forward privacy mail from `support@` to `info@` so one inbox owns DSAR.

---

## 2. What counts as a request

Treat as a DSAR / COPPA request if they ask to:

- See / download a child’s data  
- Correct name, grade, or contact fields  
- Delete a child profile or the family account  
- Stop further collection / close the account  
- “Remove my child’s information under COPPA / privacy”

Log each request (simple spreadsheet or shared doc): date, requester email, child name(s), type (access / correct / delete / refuse), verification method, outcome, date closed.

---

## 3. Verify the parent (before acting)

Do **not** delete or export until verification passes.

**Minimum (self-serve path already logged in):**  
If they can sign in to the Parent hub with the email on the request, that is strong verification — point them to in-app Export / Delete first.

**Email / manual path — require all of:**

1. Request sent from (or reply confirming) the **parent account email** in Supabase Auth, **or** the `parental_consent_parent_email` / household owner email.  
2. Child **display name** (and approximate grade if known).  
3. One more check: last 4 of payment method **or** household/family name **or** recent signup date (pick what you can verify in Stripe/Supabase).  
4. If email doesn’t match the parent Auth user: ask them to send from the account email, or prove guardianship (e.g. school contact + written confirmation). **When in doubt, do not delete.**

Never send a full data export to an unverified address.

---

## 4. Hub vs manual Supabase — when to use which

### Prefer Parent hub (default)

Tell them to sign in at `/parent` and use:

| Goal | In-app action |
|------|----------------|
| Copy of child data | **Export data** on the kid card → JSON download |
| Remove one child | **Delete** on the kid card (type display name) |
| Remove everything | **Delete family account** (confirm email + type `DELETE`) |

Use this whenever they have working parent login. Fastest and leaves an audit trail in product behavior.

### Use manual Supabase / admin when

- They cannot sign in (lost password and reset fails)  
- Child profile is **linked to an Auth user** (`user_id` set) — hub delete refuses these  
- Partial/corrupt data, orphaned `progress_events`, or failed in-app delete  
- Student self-signup account (13+ path) — no household kid card; delete Auth user + `students` row via admin  
- School/district bulk request under a written school agreement  

**Manual checklist (service role / SQL Editor):**

1. Find parent: Auth → Users by email → note `user_id`.  
2. Find household: `households` where `owner_user_id = user_id`.  
3. Find kids: `students` where `household_id = …`.  
4. **Access:** export those rows + `lesson_progress` / `progress_events` / `class_enrollments` for each `student_id` (omit `pin_hash`).  
5. **Delete one child:** same order as product (`progress_events` → progress → enrollments → clear `active_student_id` if needed → delete `students` row). Or call the same logic via Parent hub if they regain login.  
6. **Delete family account:** cancel Stripe subscription for that customer → delete household → delete Auth user (billing rows cascade).  
7. Reply with what was done and date.

Stripe: Billing → Customer by email → cancel active subscription if account wipe.

---

## 5. Reply templates (short)

**Ack + prefer hub**

> Thanks for contacting Kanam about your child’s privacy.  
> If you can sign in to your family account, open **Parent hub** and use **Export data** or **Delete** on the child’s card (or **Delete family account** at the bottom).  
> If you can’t sign in, reply with: (1) parent account email, (2) child’s display name, (3) roughly when you signed up. We’ll verify and complete the request.

**Completed**

> We’ve completed your request on [date]: [exported / deleted child X / deleted family account].  
> Active subscriptions were canceled when applicable. Contact us if anything looks wrong.

**Need more verification**

> To protect student data we need to verify you’re the parent/guardian on the account. Please reply from the parent login email and include the child’s display name. We can’t process deletion until then.

---

## 6. Refuse further collection

If they only want to stop collection (not necessarily wipe history yet):

1. Prefer **Delete family account** or delete the child profile (stops further learning data for that child).  
2. If they keep the account but remove kids, confirm no active child remains.  
3. Note in the log: “refuse further collection — [action taken].”

---

## 7. What we do *not* do via email

- Sell or share child data with requesters who aren’t the verified parent/school  
- Promise instant deletion of all backups (policy: rolling backup expiry; primary store deleted on request)  
- Debate age-gate honesty without evidence — if they say a self-signup student is under 13, convert/delete per parent request after verification  

---

## 8. Quick ownership map

| System | Use for DSAR |
|--------|----------------|
| Parent hub | Export / delete child / delete family account |
| Supabase Auth | Find parent user, delete user |
| Supabase DB | `households`, `students`, `lesson_progress`, `progress_events`, `class_enrollments` |
| Stripe | Cancel subscription / find payer email |
| This SOP | Process + verification |

Product code references: `lib/coppa/childDsar.ts`, `lib/coppa/parentAccountDsar.ts`, `DELETE /api/parent/kids/[id]`, `GET .../export`, `DELETE /api/parent/account`.
