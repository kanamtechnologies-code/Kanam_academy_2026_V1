# Parent & stakeholder communication kit

**Cognia STEM Provider Standard 5** — families and stakeholders can access program information and learner progress appropriately.  
Sites customize the fill-ins below; deep links point at the live Kanam Academy product.

Related: [school-partner MOU template](school-partner-mou-template.md) · [facilitator guides](facilitator-guides/) · [PD hours log](facilitator-guides/pd-hours-log.md) · [Cognia evidence map](cognia-stem-evidence.md)

---

## Site header (fill in)

| Field | Value |
| --- | --- |
| School / program name | |
| Tracks offered | |
| Facilitator / teacher contact | |
| Tech / account help contact | |
| Term dates | |
| Parent night / office hours | |

---

## Who needs what

| Audience | Goal | Primary link |
| --- | --- | --- |
| Parent / guardian (any age) | Family account, consent, progress | `/welcome/parent` → `/parent` |
| Parent of under-13 learner | Consent + kid profile before learning | `/welcome/ask-parent` → `/welcome/parent` |
| Parent checking progress | Insights report | `/parent/insights` |
| Learner | Dashboard, lessons, XP | `/dashboard` |
| Facilitator / teacher | Class progress | `/instructor` |
| Anyone stuck | Help (parents & educators) | `/help` |

Production base URL: `https://learn.kanamacademy.com` (or your deployed host). Example: `https://learn.kanamacademy.com/parent`.

---

## Suggested message cadence

| When | Channel | Message |
| --- | --- | --- |
| Before kickoff | Email / LMS | Welcome + which track + family account steps (flyer below) |
| Week 1 | Email / classroom handout | How to check progress; under-13 consent reminder |
| Mid-program | Optional | Celebration of badges/XP; office hours invite |
| Capstone / showcase | Invite | Demo day + [rubrics](facilitator-guides/rubrics/) overview for families |
| End of term | Email | Reflection + export/delete privacy options in Parent hub |

---

## One-page flyer — “How families use Kanam”

Copy into a slide, newsletter, or print handout.

### Create a family account
1. Open **Family account**: `/welcome/parent`
2. Use a parent/guardian email (not the student’s school email if blocked)
3. Add a kid profile; for under 13, complete consent when prompted
4. Set or share the kid PIN if your site uses device handoff (`/welcome/ask-parent`)

### See progress
1. Sign in → **Parent hub** `/parent`
2. Open **Insights** `/parent/insights` (pick the student if you have more than one)
3. Learners see XP, badges, and week labels on `/dashboard`

### Privacy & data
- Export or delete a kid profile from Parent hub
- Questions about records: follow School policy and Provider privacy policy
- School DSAR / ops reference: `docs/dsar-sop.md` (internal)

### Classroom learning (what students do)
- Guided lesson slides → practice (code, quiz, or scenarios)
- Facilitators use [session guides](facilitator-guides/) — parents do **not** need to teach the content

---

## Stakeholder access plan (site checklist)

- [ ] Family account link posted on School LMS / syllabus
- [ ] Under-13 consent process explained before first login
- [ ] Facilitator contact published for account issues
- [ ] Instructor accounts created for observing teachers (`/instructor`)
- [ ] Parent night or written FAQ delivered once per term
- [ ] Capstone invite sent with collaboration / showcase expectations
- [ ] Privacy contacts confirmed (School + Provider)

---

## Short email template

**Subject:** Kanam Academy — family access for *[track]*

Hello families,

This term students are using **Kanam Academy** for *[track]*.

**Parents / guardians:** create a family account at  
`https://learn.kanamacademy.com/welcome/parent`  
then open the Parent hub to see progress and manage consent.

**Students:** learn from their dashboard after joining the class.  
**Help:** `https://learn.kanamacademy.com/help` or contact *[facilitator]*.

Thank you,  
*[name]*
