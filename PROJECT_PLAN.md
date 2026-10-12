# Medium Ideas Website: Project Plan & Tracker

*Owner: Brian Parra (Medium Ideas LLC). Started 2026-10-12.*
*This is the one home for this project's plan, decisions and handoff.
Claude Code reads "NEXT SESSION — START HERE" first and updates it at the
end of every session (Brainstem Engineering rule 4).*

**Goal (current scope):** put the one-page Medium Ideas site live at
https://mediumideas.net, with a working contact form that delivers to
brian@mediumideas.net. Nothing else is in scope right now. The CRM and the
project-management tool are parked in Section 7 as future ideas.

---

## 1. NEXT SESSION — START HERE

*(set 2026-10-12, end of session 2)*

Phase 1 is built and tested locally, and committed (not pushed).
1. **Brian:** look over the page and approve it (Phase 1, last box). To
   view it, ask Claude to start the local preview, or wait for the
   netlify.app test address in Phase 2.
2. **Brian:** answer D2 (git mode). Then record it in Brainstem rule 7 and
   the Entities list, and in this project's `CLAUDE.md`.
3. Push to GitHub, confirm the Checks workflow is green (html-validate has
   never run on this code, so expect a fix or two), then Phase 2: create
   the Netlify site and turn on form notifications.

---

## 2. What We Know (facts as of 2026-10-12)

**The design**
- Source: `MediumIdeas\DesignStudio\WebSite\Medium Ideas Website.html`
  (726 KB, one-file export) and `Home page-html.zip` (Main.dc.html +
  support.js + vendor React). Made in Claude Design.
- The export is a **design mockup**: React draws the page in the browser.
  Its own README says to rebuild it rather than ship it as-is.
- Brand assets: `MediumIdeas\DesignStudio\Art\Medium-Ideas-Brand-Kit\`,
  plus `MediumIdeas\MILogo.jpg` and `MILogoBW.jpg`.

**The contact form (as designed)**
- Fields: Name, Company, Email, Message, plus a Submit button. There's also
  a `mailto:brian@mediumideas.net` link on the page.
- **It has no destination yet.** Submit does nothing until we wire it up.
- The "added to the CRM automatically" line describes the Happy Home
  Supply case study, not this site's form, so no change is needed.
- The newer one-file export (Oct 12) adds decorative dot clusters that the
  Oct 11 zip doesn't have. The build follows the one-file export.

**The domain and email (DNS checked 2026-10-12)**
- Registrar and DNS: **Squarespace** (nsc1-4.squarespacedns.com).
- Web: mediumideas.net and www point to Squarespace (a parking page or
  default site).
- Email: Google Workspace, MX = `smtp.google.com`. Working. **Never delete
  or change the MX record.**
- **Missing:** SPF and DMARC records (and DKIM not yet checked). Without
  them, mail from @mediumideas.net is easier to spoof and more likely to
  land in spam.
- There's an existing `google-site-verification` TXT record. Keep it.

---

## 3. Open Decisions

| # | Question | Suggestion | Answer |
|---|---|---|---|
| D1 | Where does the project live? | This folder, `MediumIdeas\MediumIdeasWeb\`, with a private GitHub repo `froginbusiness/Medium-Ideas-Web` | **Yes** (2026-10-12). Brian created the repo |
| D2 | Git mode (Brainstem rule 7) | Commit and push after every change. Netlify builds static sites free, so a push costs nothing | **Push after every change** (2026-10-12). Recorded in Brainstem rule 7 |
| D3 | Hosting account | The same Netlify account as happyhomesupply.co | **Yes**, same Netlify account (2026-10-12) |
| D4 | Anything on Squarespace to keep? (old site, paid plan) Or is it just the domain? | Keep the domain and DNS at Squarespace, and only change the web records | **Domain only**, no Squarespace features used (2026-10-12) |
| D5 | Auto-reply to people who submit the form? | Not at launch. Netlify's built-in email notice goes to Brian only. An auto-reply needs a small function, so add it later if wanted | **No auto-reply.** Instead, show an on-page "thanks for your message" popup so it's clear the send worked (2026-10-12) |

---

## 4. Phases

### Phase 1: Build the static page (local, nothing goes live)
- [x] Rebuild the design as one clean HTML file plus CSS and images, with
      no React or runtime scripts. `site/index.html` + `styles.css`, with
      fonts self-hosted. A screenshot diff against the design at 1440px
      matches except for the intended changes listed below.
- [x] Mobile check: no sideways scrolling at 320, 360, 390, 600 and 768px.
- [x] Basics: page title, meta description, Open Graph image (the brand
      kit's Facebook cover), favicons from the brand kit, robots.txt,
      sitemap.xml, a branded 404 page, and a skip link.
- [x] Form markup ready for Netlify Forms (form `contact`, honeypot,
      Name/Email/Message required, Company optional). `form.js` sends the
      form in the background and opens a "Thanks for your message!" popup.
      If the send fails, it shows an error with the email address instead.
      Without JavaScript, the form posts and lands on `thanks.html`.
      26/26 automated browser tests passed against a local stand-in server
      with the real CSP header.
- **Intended changes from the design:** (1) the "Easy for your team to
  use" pill moved down 28px, because in the design it covered the last
  line of the "What we build" card; (2) "(optional)" added after "Company
  or nonprofit name"; (3) on phones only: the HHS dashboard picture
  shrinks to fit instead of being cut off, the dot clusters move so they
  don't overlap headings, and the hero cards narrow slightly.
- [x] Brian reviewed the page and approved it (2026-10-12).

### Phase 2: Repo, checks and hosting setup
- [x] `git init`, `.gitignore`, `CLAUDE.md` (project rules), `netlify.toml`
      (publish `site/`, strict CSP and security headers, www -> bare domain).
- [ ] `SECURITY.md` (points to `FrogInBusiness\Security-Policy.md`, plus
      this project's services and review log).
- [x] GitHub Actions check (Brainstem rule 10) written:
      `.github/workflows/checks.yml` runs html-validate 11.16.1, a JS syntax
      check and `scripts/check_links.py` (missing files and anchors, inline
      styles and scripts; tested against planted errors).
- [ ] Checks workflow green on GitHub. The first run (2026-10-12) flagged one
      issue: the honeypot input had no `type`. Fixed in the next push.
- [ ] Create the Netlify site from the repo. Confirm it works at the
      temporary `*.netlify.app` address.
- [ ] Netlify Forms: turn on email notifications to brian@mediumideas.net.
- [ ] **Test the form on the netlify.app address:** submit a ZZ test entry,
      confirm the email arrives (check spam too), and confirm spam
      filtering is on.

### Phase 3: Go live on mediumideas.net (confirm with Brian before each DNS change)
- [ ] Screenshot or export the current Squarespace DNS records first (as a
      backup).
- [ ] Add the domain in Netlify (mediumideas.net as main, www redirects to
      it).
- [ ] At Squarespace: change the apex A record(s) and the www CNAME to
      Netlify. **Leave the MX and google-site-verification records alone.**
- [ ] Wait for DNS to update, then confirm Netlify's free HTTPS certificate
      covers both addresses.
- [ ] Email security records at Squarespace:
  - [ ] SPF: `v=spf1 include:_spf.google.com ~all`
  - [ ] DKIM: generate in the Google Admin console (Apps > Gmail >
        Authenticate email), add the TXT record, then click "Start
        authentication."
  - [ ] DMARC: start with `v=DMARC1; p=none; rua=mailto:brian@mediumideas.net`
        and tighten it to `quarantine` after a few clean weeks.
- [ ] Squarespace is domain-only (D4), so there's no site or plan to turn
      off. Just confirm its parking page is gone once DNS points to Netlify.

### Phase 4: Launch checks
- [ ] Live form test on mediumideas.net (ZZ test entry), and the email
      arrives.
- [ ] Send a test email from brian@ to an outside address. Confirm SPF,
      DKIM and DMARC all show PASS (in Gmail: "Show original").
- [ ] Mobile and desktop look right. No console errors, no broken links.
- [ ] First security and version review logged in `SECURITY.md` (a new
      public page plus a form triggers Brainstem rule 8). Put the next
      review date on the frog@ calendar (with Brian's OK).
- [ ] Optional: Google Search Console (verification is already in DNS), and
      submit the site.

### Phase 5: After launch (small, as needed)
- [ ] Privacy note near the form (what we collect and why). Short, and good
      practice for any form.
- [ ] Optional auto-reply to people who submit the form (D5).
- [ ] Optional: simple, privacy-friendly analytics (Netlify Analytics is
      paid; consider a free alternative).

---

## 5. How We Work

- Claude Code ("Cody") edits locally in this folder. Brian approves the
  look and anything that goes outside the project: DNS changes, Netlify
  settings that affect the live site, calendar events.
- Tests use ZZ-labeled test entries, never real contacts.
- Each session ends by updating Section 1 (handoff) and Section 6 (log).

---

## 6. Session Log

- **2026-10-12:** Project started. Found the design export and confirmed
  the form has no destination yet. Checked DNS: Squarespace, Workspace MX
  OK, SPF/DMARC missing. Chose Netlify + Netlify Forms (same setup as
  happyhomesupply.co). Wrote this plan. Waiting on D1 to D5.
- **2026-10-12 (session 2):** Brian answered D1, D3, D4 and D5 (popup
  instead of an auto-reply). Found that the one-file export is a 3-board
  design file (home page, logo concepts, combined logo). Pulled out the
  home page source and its fonts, then built `site/` as plain HTML/CSS/JS
  with strict CSP. Verified it with a screenshot diff against the design,
  phone-width overflow checks, and 26 Playwright form tests (ZZ entries,
  local stand-in server). Added CLAUDE.md, netlify.toml, the Checks
  workflow and check_links.py. Committed locally; not pushed (D2 pending).

---

## 7. Future Ideas (parked, not in scope)

- **Medium Ideas CRM:** likely a standalone copy of the HHS CRM
  (hhs-crm.netlify.app) with its own Supabase project and login list. The
  two LLCs keep their data separate. Note: Supabase's free plan allows
  2 projects, so check how many are in use first.
- **Project and build manager:** client builds with phases, tasks and due
  dates; recurring maintenance and follow-up reminders feeding Google
  Calendar.
- When the CRM exists, the contact form also sends to it, the same way
  the happyhomesupply.co form feeds the HHS CRM.
