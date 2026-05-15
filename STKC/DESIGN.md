# DESIGN.md — Speeding Ticket KC

**Client demo site** | Built by Simon L. Paige Web Design | May 2026

---

## Brand Identity

- **Name**: Speeding Ticket KC
- **Tagline**: Kansas City traffic attorneys. One flat fee.
- **Voice**: Direct, reassuring, no-nonsense. Like a good friend who happens to be a lawyer.
- **Domain (production)**: speedingticketkc.com

---

## Color Tokens

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#F7F4EE` | Page background (paper) |
| `--bg-raised` | `#FFFFFF` | Cards, elevated surfaces |
| `--bg-deep` | `#ECE7DA` | Subtle inset areas |
| `--bg-ink` | `#14213D` | Dark reverse panels |
| `--ink` | `#1A2238` | Body text |
| `--ink-soft` | `#2E3650` | Subheadings |
| `--ink-muted` | `#6B7080` | Caption / secondary text |
| `--ink-faint` | `#9CA0AE` | Placeholder, disabled |
| `--navy` | `#14213D` | Primary brand (dark) |
| `--brass` | `#A8843C` | Accent / CTA highlights |
| `--ember` | `#B23A28` | Alerts / urgency |
| `--moss` | `#3D6650` | Positive / success |
| `--rule` | `#D4CCB6` | Borders and dividers |

### Alternate palette options (via tweaks panel)
- Accent: brass (default), gold, oxblood, forest
- Ink: navy (default), charcoal, forest, oxblood
- Background: paper (default), cream, ivory, stone

---

## Typography

| Role | Font | Stack |
|---|---|---|
| Headings | Source Serif 4 | `'Source Serif 4', 'Iowan Old Style', Georgia, serif` |
| Body | IBM Plex Sans | `'IBM Plex Sans', system-ui, sans-serif` |
| Numbers / code | IBM Plex Mono | `'IBM Plex Mono', ui-monospace, Menlo, monospace` |

- All fonts loaded from Google Fonts CDN
- Body size: 16px / 1.6 line-height
- Heading weight: 700

---

## Layout

- Max content width: ~1200px with `container` class
- Sections use generous vertical padding (96px typical)
- Responsive: stacked single column on mobile
- Services: horizontal card row (wraps on mobile)
- Hero: 2-column grid (headline + contact form)

---

## ADA Notes

- Color contrast: all text meets WCAG 2.1 AA (4.5:1 minimum on body, 3:1 on large text)
- Focus states: visible keyboard ring on all interactive elements
- Form labels: explicit `<label>` elements on all inputs
- ARIA: semantic landmarks (`<main>`, `<nav>`, `<footer>`, `<section>`)
- Alt text: attorney placeholder portraits labeled with initials (no photos yet)

---

## Demo Features

- **Tweaks panel** (bottom-right panel icon): live palette switcher for client presentation
- **noscript fallback**: full text content for crawlers and no-JS environments
- **JSON-LD**: LegalService + LocalBusiness + WebSite schemas in `<head>`
- **llms.txt**: AI-friendly plain-text site summary
- Form: demo-only (success state shown immediately; no data is sent)

---

## Production Checklist

- [ ] Wire contact form to Cloudflare Worker (`form-handler.simonlpaige.workers.dev`)
- [ ] Add client email to Worker allowlist
- [ ] Add attorney headshots to `/assets/photos/`
- [ ] Update placeholder AVVO/Google review links
- [ ] Set up speedingticketkc.com DNS
- [ ] Remove demo banner + `<meta name="robots" content="noindex">`
- [ ] Set `robots.txt` to allow crawlers
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Remove tweaks panel from production build (or keep as admin-only)
