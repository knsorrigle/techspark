# TechSpark Auditions 2026

Registration site and poster kit for the TechSpark audition drive.

**Auditions:** 07 Oct 2026 (Wed) · Reporting 10:00 AM · NCEH Auditorium

## What's here

| Path | What it is |
|---|---|
| `index.html` | The registration site (single file, no build step) |
| `og.png` | Link preview image for WhatsApp / Instagram shares |
| `google-apps-script.gs` | Optional Google Sheet backend |
| `netlify.toml` | Netlify config (publishes the repo root) |
| `poster/` | JACK IN poster: PDF (Canva), editable SVG (Figma/Illustrator), outlined SVG, PNG |
| `poster/source/` | HTML sources for both poster designs |

## Deploy

Netlify: connect this repo (or drag the folder into Deploys). No build command.

Submissions go straight to the **Google Sheet** (Registrations tab) via `google-apps-script.gs`. Clear `SHEET_URL` in `index.html` to fall back to Netlify Forms.
Netlify's free plan caps form submissions, so for a big drive switch to the Google Sheet.

## Google Sheet backend (recommended)

1. Create a Google Sheet → Extensions → Apps Script → paste `google-apps-script.gs` → Save.
2. Deploy → New deployment → Web app · Execute as **Me** · Access **Anyone** → copy the `/exec` URL.
3. In `index.html`, set `SHEET_URL: '<your /exec URL>'` inside `CONFIG`.
4. Push. Rows land in the **Registrations** tab with sequential pass IDs (TS-2026-0001…) and duplicate-USN protection.

## Editing details

Event date/time/venue appear in the hero, the pass, and the countdown (`EVENT` in the script).
If the site URL changes, update `og:image` in the `<head>`.

© 2026 Techspark Club • Inspire • Innovate • Integrate
