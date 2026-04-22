# Simon L. Paige — Brand Style Guide

**Version:** 3.0 (Prairie Clarity, refined)
**Last updated:** 2026-04-22
**Primary audience:** Kansas City small business owners
**Secondary audience:** Builders and collaborators (open-source, commons-oriented projects)

---

## 1. Voice & Positioning

### Who
Simon L. Paige is a Kansas City builder. Hand-coded websites for local businesses. Open-source tools for stronger communities. One person, not an agency.

### Positioning (one sentence)
> Durable, hand-built websites for Kansas City small businesses — plus open tools for the commons.

### Three things that are always true
1. **Local.** Kansas City, built by one person who picks up the phone.
2. **Durable.** Plain HTML and CSS. Works in five years the same way it works today.
3. **Owned.** You keep the code. No platform lock-in, no subscription traps.

### Voice: Feynman "Curious Explainer"
- Plain language. If a non-technical person can't read it, rewrite it.
- Vivid, concrete analogies. ("A Wix site is software you're renting.")
- Playful, never sarcastic. Opinionated, never preachy.
- **No AI-speak** (leverage, synergy, unlock, empower, transform, journey).
- **No em dashes.** Use regular dashes or reword. Hard rule.
- **No marketing adjectives.** Cut "robust, seamless, cutting-edge, powerful, beautiful."
- First-person singular ("I build," not "we deliver").

### Do / Don't
| Do | Don't |
| --- | --- |
| "I'll write it in plain HTML." | "We leverage modern web standards." |
| "It doesn't break when a platform updates." | "Future-proof architecture." |
| "You own the code." | "Customer-owned digital assets." |
| "Call me and I'll answer." | "Reach out to our support team." |

---

## 2. Color System

### Tokens

| Name | Hex | Role | WCAG on Limestone (#F4EEE2) |
| --- | --- | --- | --- |
| Cast Iron | `#1C1A17` | Primary text, headings | **15.9:1** (AAA) |
| Chalk | `#FBF8F1` | Card backgrounds, inverse surfaces | — |
| Limestone | `#F4EEE2` | Page background | — |
| Prairie Rust | `#B45B2E` | Primary accent, CTAs, links-hover | **4.6:1** (AA body) |
| Rust Dark | `#8F4523` | CTA hover, active states | **6.7:1** (AA+) |
| Horizon | `#3E6A83` | Links, secondary accent | **5.2:1** (AA body) |
| Wheat | `#D9C48B` | Alternating rows, subtle fills | — |
| Moss | `#5A6B3B` | Tertiary accent (use sparingly) | **5.7:1** (AA body) |
| Stone | `#6B665D` | Secondary text, captions | **4.8:1** (AA body) ✓ |
| Rule | `#C9BEAB` | Borders, dividers | — |

### Contrast rules
- **Body text**: Cast Iron on Limestone or Chalk. Never Stone on Limestone for body copy — Stone is captions-only.
- **Buttons**: Prairie Rust bg + Chalk text (contrast 4.9:1). Hover → Rust Dark.
- **Links (body)**: Horizon (#3E6A83). Hover: Prairie Rust.
- **Focus ring**: 2px Horizon, 2px offset. Always visible, never removed.

### Accessibility floor
All text/background pairs in this guide meet **WCAG 2.2 AA** at minimum. Body copy meets AAA wherever feasible.

---

## 3. Typography

### Families
- **Display (headings):** Source Serif 4 — weights 400, 600, 700
- **Body (UI + paragraphs):** Inter — weights 400, 500, 600, 700
- **Mono (code, labels, metadata):** JetBrains Mono — weights 400, 500

All self-hosted via Google Fonts with `display=swap`. No custom loading logic.

### Scale (modular, 1.25 ratio, 16px base)

| Token | Size (rem) | Size (px) | Use |
| --- | --- | --- | --- |
| `--step-6` | 3.815 | 61px | Hero H1 (desktop) |
| `--step-5` | 3.052 | 49px | Section H1 |
| `--step-4` | 2.441 | 39px | H2 |
| `--step-3` | 1.953 | 31px | H3 |
| `--step-2` | 1.563 | 25px | H4, large pull-quote |
| `--step-1` | 1.25 | 20px | Lead paragraph, subhead |
| `--step-0` | 1.125 | 18px | Body (default) |
| `--step--1` | 1.0 | 16px | UI labels, small body |
| `--step--2` | 0.875 | 14px | Captions, meta |
| `--step--3` | 0.75 | 12px | Fine print, eyebrows |

### Line heights
- Display: 1.15
- Body: 1.65
- UI / compact: 1.4

### Max measure
Body text caps at **62ch**. No exceptions — readability over layout symmetry.

### Mobile scale
H1 drops two steps on `<900px`, three steps on `<640px`. Defined in responsive section of CSS.

---

## 4. Spacing

**8px baseline grid.** All margins, padding, gaps are multiples of 8.

| Token | px | Use |
| --- | --- | --- |
| `--s-1` | 8 | Tight (icon-to-text) |
| `--s-2` | 16 | Default small gap |
| `--s-3` | 24 | Card padding, small sections |
| `--s-4` | 32 | Section padding small |
| `--s-5` | 48 | Section padding medium |
| `--s-6` | 64 | Section padding large (desktop) |
| `--s-7` | 96 | Hero padding (desktop) |

### Container
`--max-wrap: 1200px` with `--gutter: 32px` (20px at `<640px`).

---

## 5. Components

### Buttons
- **Primary**: Prairie Rust bg, Chalk text, `12px 28px`, `radius: 4px`, weight 600.
- **Secondary**: Transparent bg, Prairie Rust text, 1px Rule border.
- **Min touch target: 44×44px** (accessibility + mobile). Padding enforced.
- Focus: 2px Horizon outline, 2px offset.
- Disabled: 50% opacity, `cursor: not-allowed`, no hover change.

### Cards
- Chalk bg, 1px Rule border, 4px radius.
- Rest shadow: `0 1px 2px rgba(0,0,0,0.06)`.
- Hover shadow: `0 4px 12px rgba(0,0,0,0.10)`.
- Padding: 24-32px depending on density.

### Contact lines
Grid: 80px label + 1fr value. Label in mono, 0.75rem, Stone, letter-spaced 0.16em.

### Horizontal rule
1px Rule color, full bleed, no margin. Used as structural divider between sections (Wright nod).

---

## 6. Logo & Mark

### Wordmark (primary brand mark)
Set in **Source Serif 4, weight 600**, letter-spacing `-0.01em`, color Cast Iron. Minimum size: 120px wide. Clear space: height of the "S" on all sides.

### Monogram (favicon, social avatar, stamp)
Custom **SLP** monogram (see `/assets/logo-monogram.svg`). Interlocked letterforms with prairie-rust horizon bar. Square-safe for avatars. Minimum size: 16px (favicon).

### Rules
- Never stretch, rotate, or recolor outside the palette.
- On dark backgrounds, invert to Chalk.
- Never place on busy photography without a 40% Limestone overlay.
- Never add effects (drop-shadow, glow, bevel).

### Favicon specs
- `favicon.svg` (SVG, vector, primary)
- `favicon-32.png` (32×32, Safari pinned tab fallback)
- `favicon-192.png` (192×192, PWA / iOS home screen)

---

## 7. Imagery

### Photography
- Real places, real KC. Neighborhood businesses, hand-work, local.
- Natural light, no stock filters, no heavy grading.
- No stock photos of handshakes, abstract tech, or "team meetings."

### Portraits
- One clear shot of Simon in About. Eye contact optional, honest expression preferred. Round crop, 240px on desktop.
- No corporate headshot poses.

### Screenshots (portfolio)
- 16:9 aspect ratio, full-width hero crops of client sites.
- WebP with PNG fallback via `<picture>`.
- Real sites only. Never mockups.

---

## 8. Motion

- Subtle. Functional, not decorative.
- Durations: 150ms (micro), 350ms (medium). Never longer on UI.
- Easing: `ease` or `ease-out`. No bounce, no spring.
- Always respect `prefers-reduced-motion: reduce` — disable all non-essential motion.

---

## 9. Accessibility (WCAG 2.2 AA floor)

Non-negotiable:
- Contrast AA for all text, AAA where feasible.
- Focus-visible styles on every interactive element.
- Skip-link on every page.
- Semantic HTML. No `<div>` where a real element exists.
- Real `alt` text on every meaningful image. `alt=""` only on decorative.
- Keyboard navigation: tab order matches visual order, no traps.
- Forms: every input has a visible `<label>`.
- Headings: no skipped levels (H1 → H2 → H3).
- Touch targets: 44×44px minimum.
- Motion: respects `prefers-reduced-motion`.

Tested in: keyboard-only navigation, VoiceOver (macOS), NVDA (Windows), 200% zoom, Chrome Lighthouse (target: 100 accessibility score).

---

## 10. AI-Friendly

The site is built to be legible to humans **and** AI agents (LLM crawlers, research agents, assistants).

- **`/llms.txt`** at root — Anthropic/OpenAI-compatible structured summary. Who Simon is, what he does, contact, pricing, projects. Plain markdown.
- **`/llms-full.txt`** — expanded version with project descriptions, FAQ, and canonical links.
- **JSON-LD schema** — `Person`, `ProfessionalService`, `CreativeWork` (per project). Rich and accurate.
- **OpenGraph + Twitter cards** — every page has a proper preview image and description.
- **RSS feed** — for project updates / writing (agents subscribe to RSS).
- **robots.txt** — explicit about what's crawlable. LLM crawlers welcomed.
- **Semantic HTML** — proper `<article>`, `<section>`, `<nav>`, `<main>`. No div soup.
- **Stable URLs** — no session IDs, no query params for canonical content.

---

## 11. File Structure

```
simonlpaige.github.io/
├── index.html              # Personal/founder site (root)
├── web-design/index.html   # KC small business sales page
├── plans/                  # Pricing tiers
├── commonweave/            # Commonweave project site
├── neighborhood-os/        # Neighborhood OS project site
├── ecolibrium/             # Ecolibrium map
├── css/site.css            # Single stylesheet, hand-written
├── assets/
│   ├── logo-wordmark.svg
│   ├── logo-monogram.svg
│   ├── favicon.svg
│   ├── favicon-32.png
│   ├── favicon-192.png
│   ├── simon.jpg           # Portrait (to be added)
│   └── portfolio/          # Client site screenshots
├── llms.txt
├── llms-full.txt
├── robots.txt
├── sitemap.xml
├── privacy.html
├── terms.html
└── BRAND.md                # This file
```

---

## 12. Changelog

- **v3.0 (2026-04-22):** Full overhaul. Split site into personal root + `/web-design/` sales page. New wordmark + monogram (from scratch). Formal type scale. WCAG 2.2 AA floor documented. AI-friendly standards (`llms.txt`, expanded JSON-LD) added. Stone-on-Limestone removed from body copy.
- **v2.0 (2026-04-19):** Prairie Clarity established. Prairie-window mark introduced.
- **v1.0 (2026):** Initial brand — deprecated.
