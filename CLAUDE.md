# Medium Ideas Website: project rules for Claude Code

The Brainstem (`~\.claude\CLAUDE.md`) applies. This file adds what's specific
to this project. Plan, decisions and handoff: `PROJECT_PLAN.md` (read
"NEXT SESSION — START HERE" first).

## What this is
- The public one-page site for Medium Ideas LLC, https://mediumideas.net.
- Plain HTML/CSS/JS in `site/`. No build step and no framework.
- Hosting: Netlify (same account as happyhomesupply.co), config in `netlify.toml`.
- Repo: github.com/froginbusiness/medium-ideas-web (private).
- Design source: `..\DesignStudio\WebSite\Medium Ideas Website.html` (a Claude
  Design bundle). When the design changes, re-extract it and update `site/`
  by hand. Never ship the bundle itself.

## Git mode (Brainstem rule 7)
- **Commit and push after every completed change** (set by Brian
  2026-10-12). Each push to `main` redeploys on Netlify once the site is
  connected. Static builds are free.

## Rules for this site
- **CSP is strict** (`netlify.toml`): no inline `style="..."`, no inline
  `<script>`, no third-party files. Put styles in `site/styles.css` and
  scripts in their own `.js` files. Fonts are self-hosted in `site/fonts/`.
  `scripts/check_links.py` enforces this.
- **Contact form** = Netlify Forms, form name `contact`. Netlify finds it at
  deploy time from the static HTML, so keep `data-netlify="true"`, the
  hidden `form-name` input and the `bot-field` honeypot. `site/form.js` posts
  it in the background and opens the thank-you popup. `site/thanks.html` is
  the fallback when JavaScript doesn't run. If you rename a field, the
  Netlify notification email changes too.
- **Never touch the MX or google-site-verification DNS records** at
  Squarespace (Google Workspace email).
- Tests use ZZ-labeled entries (e.g. "ZZ Test Person"), never real contacts.

## Checks (Brainstem rule 10)
- `.github/workflows/checks.yml` runs on GitHub: html-validate (settings in
  `.htmlvalidate.json`), a JS syntax check, and `scripts/check_links.py`.
  It's read-only and never deploys.
- Locally: `python scripts/check_links.py`. npm/node aren't available in
  the Claude Code shell, so html-validate runs only on GitHub.
- For visual checks, serve `site/` locally with a small Python server that
  sends the same CSP header, then compare screenshots with headless Chrome.
  A throwaway venv with Playwright (`channel="chrome"`) can test the form
  and the popup.
