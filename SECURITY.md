# Medium Ideas Website: Security & Version Review

The process is set by the Brainstem (rule 8, `FrogInBiz\FrogInBusiness\Brainstem.md`).
This site follows the **Frog In Business Security Policy**
(`FrogInBiz\FrogInBusiness\Security-Policy.md`, Brainstem rule 9): roles and
access, passwords and 2FA, the PC baseline, network, encryption, credential
storage and the incident response plan. This file holds only what's specific
to mediumideas.net: its checklist, access list, incident notification list
and review log.

**Last review:** 2026-10-12 (baseline, before launch). **Next due:**
2027-01-10 (90 days), or sooner if a trigger below happens.

## When to run a review

- Every 90 days.
- A new third-party service, script, font or embed (analytics, chat widget,
  maps, a CDN file).
- A new page, form, form field, Netlify function or scheduled job.
- A change to the CSP or other headers in `netlify.toml`.
- A change to DNS or email records for mediumideas.net.
- Launch, and the first time the site connects to a CRM.

## How to run it

Ask Claude Code: *"Run the Medium Ideas website security and version review
from SECURITY.md. Report PASS / FAIL / SKIP for each item with evidence, fix
anything safe to fix (commit and push), list anything that needs Brian, and
add a dated entry to the review log with the next due date."*

## Checklist

### A. Accounts and access
- [ ] 2FA on every account that can change the site or its mail: GitHub
      (froginbusiness), Netlify (frog-in-biz team), Squarespace (registrar and
      DNS), Google Workspace (mediumideas.net admin and brian@).
- [ ] Netlify team members and GitHub collaborators are only Brian.

### B. Secrets
- [ ] No secrets in git (`git log -p` search for `key`, `token`, `password`,
      `secret`). The site has no API keys; keep it that way.
- [ ] Netlify environment variables: none needed today. Anything added is a
      review trigger.

### C. Public surface
- [ ] `curl -I https://mediumideas.net/` shows the CSP, X-Frame-Options,
      X-Content-Type-Options, Referrer-Policy and Permissions-Policy from
      `netlify.toml`.
- [ ] No inline styles or scripts and no third-party files
      (`python scripts/check_links.py`, also run by the Checks workflow).
- [ ] Nothing private in `site/`: no notes, drafts, EIN or account numbers.
      The phone number and brian@ address are public on purpose.

### D. Contact form (Netlify Forms, form `contact`)
- [ ] Netlify's spam filter is on, and the honeypot field `bot-field` is
      still in the form.
- [ ] Fields have length limits (`maxlength`), and Name/Email/Message are
      required.
- [ ] Notification emails go only to brian@mediumideas.net.
- [ ] Old submissions: delete test (ZZ) entries. Netlify keeps submissions
      until deleted, so clear out ones that are no longer needed (they hold
      people's names and email addresses).

### E. Email and domain
- [ ] SPF, DKIM and DMARC pass for mediumideas.net (check a sent message's
      headers).
- [ ] MX still points to Google (`smtp.google.com`).
- [ ] Squarespace: registrar lock on, auto-renew on, DNSSEC status noted.

### F. Version audit
- [ ] `.github/workflows/checks.yml`: `actions/checkout`,
      `actions/setup-node` and the Node version are current and supported.
- [ ] `html-validate` pin is a current release (at least 2 weeks old).
- [ ] Fonts in `site/fonts/` are still the right files (SIL OFL; no update
      needed unless the design changes).
- [ ] The site has no runtime dependencies. Anything added is a review
      trigger.

## Access list (who and what reaches this site's data)

| System / data | Who or what has access | Why |
|---|---|---|
| Form submissions (names, emails, messages) | Brian (Netlify dashboard, brian@ inbox) | Replying to inquiries |
| GitHub repo (private) | Brian | Site code and docs; no secrets |
| Netlify (hosting, forms) | Brian | Hosting and form handling |
| Squarespace (domain, DNS) | Brian | Registrar and DNS |
| Google Workspace (mediumideas.net mail) | Brian | Email |

## Incident notification list

Follow the incident response plan in the Security Policy (Section 8). For
this site, notify these as they apply:

| Who | When | How |
|---|---|---|
| People who used the contact form | Their submission (name, email, message) was exposed | Email each affected person; ask the CPA/attorney first about legal duties |
| Netlify support | Site defaced, or account or form data compromised | Dashboard support ticket; rotate the Netlify password, check team members and deploy keys |
| Squarespace support | Domain or DNS hijacked | Support ticket; change the password, check registrar lock |
| Google Workspace | brian@mediumideas.net compromised | Change the password, review sign-ins and forwarding rules, revoke app access |
| CPA / attorney | Any personal data involved | Same day |

## Review log

### 2026-10-12: Baseline (before launch; site live only on medium-ideas-web.netlify.app)
- **C. Public surface: PASS.** `curl -I` on the netlify.app address shows the
  CSP and security headers. `check_links.py` shows 0 problems. Local browser
  tests found no CSP violations. `site/` holds only public content.
- **D. Contact form: PARTLY DONE.** Honeypot, `maxlength` and required
  fields are in place. Form detection was enabled 2026-10-12. Email
  notification and a live ZZ test are in progress (Phase 2). Spam filter
  status still to confirm in Netlify.
- **F. Version audit: PASS.** checkout@v5, setup-node@v5, Node 24,
  html-validate 11.16.1 (2026-09-27). No runtime dependencies. Checks
  workflow green (run #2).
- **B. Secrets: PASS.** The repo has no keys, and Netlify has no environment
  variables.
- **E. Email and domain: FAIL (planned fix).** SPF and DMARC records are
  missing and DKIM is unchecked. Scheduled in PROJECT_PLAN Phase 3.
  Registrar lock and DNSSEC not checked yet.
- **A. Accounts: SKIP.** 2FA on GitHub, Netlify, Squarespace and Workspace
  needs Brian to confirm.
- **Next due:** 2027-01-10. A launch review is also due when the domain goes live
  (Phase 4).
