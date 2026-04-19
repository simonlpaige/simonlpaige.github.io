# simonlpaige.com Frontend - Full Rebuild Brief (for Claude Code subagent)

You are Claude Code. Rebuild the simonlpaige.com site in `~/.openclaw/workspace/simonlpaige.github.io`. The existing `index.html` is off-brand (Bebas Neue, neon green, animated ticker, "Agentic & Dark Factory" positioning) and needs complete replacement. The `plans/` subdirectory contains the current plans page and must be audited for brand consistency; rebuild if needed.

Deploy target: GitHub Pages (CNAME already set to simonlpaige.com).

Work on a NEW branch `prairie-clarity-rebuild-2026-04-19`. Keep `main` untouched.

## What simonlpaige.com is

The "gravity well" and "front door" in the Groundlayer pipeline. It's the most personal thing in the family - a human's name is on it. Serves two jobs:
1. **Portfolio** - proof of real KC client work (Everyday Produce, Andersen HVACR, Wes Benson).
2. **Front door** - `/plans/` page is the acquisition entry point for the $399-1,299 web design business.

It also needs to quietly tell the "four-property machine" story (Pipeline gap #8) - Simon builds websites, but he also runs RivalDrop, Anvilshare, and Groundlayer. This should feel like context, not a sales pitch.

## Brand authority (READ IN ORDER)

1. `~/.openclaw/workspace/modules/groundlayer/BRAND-FAMILY.md` - family skeleton (global tokens, voice rules, anti-patterns).
2. `~/.openclaw/workspace/web-clients/_docs/BRAND-v3.md` - **the primary source of truth** for SLP. Prairie Clarity flavor, sample copy, component personality. LIFT SAMPLE COPY FROM HERE VERBATIM where it fits.
3. `~/.openclaw/workspace/web-clients/_docs/BRAND.md` (v2) - Prairie Clarity palette owner. Cross-reference for palette only.
4. `~/.openclaw/workspace/modules/groundlayer/PIPELINE.md` - for the four-property narrative context.
5. `~/.openclaw/workspace/modules/portfolio/CONTEXT.md` - whatever portfolio-specific content exists (small file).
6. `~/.openclaw/workspace/modules/groundlayer/design-systems/logos/slp.svg` - use the existing wordmark as-is.

## Hard constraints (FAMILY LAW)

Same family law applies:
- Type stack: Source Serif 4 (display) + Inter (body) + JetBrains Mono (data). Google Fonts link: `https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap`
- Scale: 1.250 Major Third. 8px baseline. 4px spacing unit. 4px default radius, 0px structural, max 8px.
- Shadows: whisper only. `0 1px 2px rgba(0,0,0,0.06)` rest, `0 4px 12px rgba(0,0,0,0.10)` hover (light ground values - SLP uses a warm light background, not dark).
- NO gradients. NO em dashes. NO banned words. NO uppercase button labels. NO hero video. NO entrance animations on body text. NO ticker. NO marquee. NO auto-playing anything.
- NO stock photography of humans in business casual. NO AI-generated human faces. NO generic "tech" abstractions.
- NO emoji in UI chrome (buttons, nav, labels, badges).
- Icons: Lucide 1.5px stroke, hand-inlined SVG, 3-5 icons max.
- Layout: horizontal rhythm. Left-aligned headings. 62ch max body. Wright 1px horizontal rules as section dividers.
- WCAG AA min / AAA body. 2px focus ring in Prairie Rust. Real alt text.
- <500KB initial page weight.

## Banned words (zero tolerance)

unlock, leverage, seamless, delight, journey, robust, empower, transformative, innovative, best-in-class, synergy, ecosystem (unless literal), streamline, holistic, elevate, cutting-edge, unlock the potential, limited spots, now more than ever, digital transformation, book now, act fast, absolutely, wonderful, great question, of course, revolutionize, game-changer, paradigm shift, next-generation, dive in, deep dive, take things to the next level, world-class, passionate, proven.

Also banned: "agentic", "dark factory", "lights-out" in the portfolio homepage positioning. The previous site pitched Simon as an AI systems builder. The new site pitches him as a **KC web designer who also happens to run three other things**. The positioning flips.

## SLP flavor tokens (DO NOT DEVIATE)

```css
--cast-iron: #1C1A17;        /* primary text */
--limestone: #F4EEE2;         /* background */
--chalk: #FBF8F1;             /* card / surface */
--prairie-rust: #B45B2E;      /* PRIMARY ACTION */
--horizon: #3E6A83;           /* secondary accent, focus ring, link underlines */
--wheat: #D9C48B;             /* warm alt surface, zebra rows */
--moss: #5A6B3B;              /* success, alive state */
--stone: #6B665D;             /* captions, secondary text */
--rule: #C9BEAB;              /* borders, horizon lines */
--rust-dark: #8F4523;         /* hover state on primary */
```

Base rem: `16px` (family default). Body line-height 1.65. Max line 62ch. Generous whitespace.

## Voice rules

- **Warm, neighborly, first person.** Simon is speaking. "I build" / "I'll text you" / "I've built twelve KC sites this year." The human's name is on the door.
- **Feynman at a fence, not at a chalkboard.** Plain-language explanations of real mechanisms.
- **Local and specific.** Name KC, name neighborhoods, name real client sites by name where appropriate.
- **No agency-speak.** No "elevate your brand," no "digital presence," no "online visibility."
- **No pressure language.** No "limited spots." No "book now before it's too late."
- **Lift sample copy from BRAND-v3.md verbatim where it fits.** Hero headline, subhead, service description, the Feynman "why this works" paragraph, CTA, footer credit - all exist in the spec already.

## Site structure (filesystem layout)

Current files in `~/.openclaw/workspace/simonlpaige.github.io/`:
```
CNAME                 (keep - simonlpaige.com)
.nojekyll             (keep)
index.html            (REPLACE)
privacy.html          (REPLACE)
terms.html            (REPLACE)
plans/index.html      (AUDIT and rebuild if off-brand)
plans/privacy.html    (REPLACE or consolidate with root privacy)
plans/terms.html      (REPLACE or consolidate with root terms)
ecolibrium/           (investigate, do NOT touch - likely separate project)
EDP/                  (investigate, do NOT touch - Everyday Produce landing likely)
waldo/                (investigate, do NOT touch - Waldo project)
WaldoNet/             (investigate, do NOT touch)
```

**IMPORTANT**: ecolibrium/, EDP/, waldo/, WaldoNet/ are separate projects hosted under this domain as subdirectories. LEAVE THEM ALONE. Do not modify, touch, or git-add anything under those directories. Report what they are in BUILD-NOTES.md if you peek, but do not change anything.

Target structure after your work:
```
simonlpaige.github.io/
  CNAME, .nojekyll    (untouched)
  index.html          (rebuilt)
  privacy.html        (rebuilt)
  terms.html          (rebuilt)
  css/
    site.css          (new; single stylesheet)
  assets/
    logo.svg          (copy from modules/groundlayer/design-systems/logos/slp.svg)
    favicon.svg       (generate: "S" monogram in Source Serif 4 700 on limestone, prairie-rust accent square)
  plans/
    index.html        (rebuilt if off-brand, kept if already consistent)
    privacy.html      (rebuilt)
    terms.html        (rebuilt)
  BUILD-NOTES.md      (you write last)
  ecolibrium/, EDP/, waldo/, WaldoNet/  (untouched)
```

## Page content requirements

### index.html - portfolio + front door

Structure:

1. **Header** (left-aligned, plain)
   - Logo wordmark (use slp.svg). 
   - Horizontal nav: Home / Work / Plans / About / Contact. Left-aligned after the logo.

2. **Hero**
   - Headline (Source Serif 4 700, ~3rem, left-aligned, NOT centered): "Hi, I'm Simon. I build websites by hand in Kansas City."
   - Subhead (Inter 400, 1.25rem): "Custom sites for KC small businesses. $399 to build, $29 a month to keep running. You own the code. No contracts you can't leave."
   - Primary CTA: "See the plans" -> /plans/
   - Secondary CTA: "See my work" -> #work anchor
   - Hero does NOT fill the viewport. It takes what it needs. No auto-scroll, no parallax.

3. **Work section** (anchor: #work)
   - Heading: "Recent KC work" (Source Serif 4 600)
   - 3-column Wright triplet on desktop, 1-column mobile.
   - Each card: one line title (business name), one-line tagline, neighborhood or vertical tag, link. Optional: one small screenshot (if you can find a real one in `~/.openclaw/workspace/web-clients/<client>/` or similar). If no real screenshot exists, use a typographic "site unavailable in preview" card with the URL.
   - Real clients to feature (CHECK these exist in filesystem first):
     - **Everyday Produce** (everyday-produce.com) - Brookside. Small grocery.
     - **Andersen HVACR** (probably andersen-hvacr.com; verify from web-clients/andersen-hvacr/). HVAC service.
     - **Wes Benson** (or similar - verify from web-clients/wes-benson/). Musician or creative portfolio.
   - If any client isn't actually deployed or doesn't exist, omit that card. Do NOT fabricate clients.
   - Screenshot sourcing: look in `~/.openclaw/workspace/web-clients/<client-dir>/` for any `*.png`, `*.jpg`, or `screenshots/` subdirs. If you copy a screenshot into `assets/work/`, compress if >80KB. If none exists, typography-only card is fine.

4. **Feynman paragraph** (the SLP signature move)
   - Pull this directly from BRAND-v3.md "Why this works" section, or write something equivalent in that voice.
   - Full-width callout with a 1px horizontal rule above and below. Inter body text, 1.25rem, 62ch max width, Cast Iron text on Chalk surface.

5. **The four-property machine** (Pipeline gap #8)
   - Small heading: "A few other things I run"
   - Three short paragraphs. First-person. No sales pitch tone:
     - **RivalDrop** - "I built RivalDrop to watch what my clients' competitors are doing online. Weekly report, plain English. [Link: rivaldrop.com]"
     - **Anvilshare** - "Anvilshare replaces the expensive software KC small businesses hate. Audit first, then a real replacement running on your own server. [Link: anvilshare.ai]"
     - **Groundlayer** - "Groundlayer is the holding company that owns all of it. Contracts, billing, legal. It's the trunk of the tree. [Link: groundlayer.co]"
   - Keep it short. This is context, not marketing.

6. **About / bio** (optional short section)
   - One paragraph: "I'm in Kansas City. I've been building websites for twelve years. Before that, <whatever fits - omit if speculative>. I answer my own email and I don't sell your data."
   - If you don't have enough verified facts, keep it to 2 sentences.

7. **Contact**
   - Primary CTA: "Text me" or "Email me" - use simon@simonlpaige.com as the mailto.
   - Phone: if BRAND docs or portfolio CONTEXT have a phone, use it; otherwise skip.
   - Mailto subject line: "Website for <your business>"
   - NO contact form. Per previous briefs, the Cloudflare Worker endpoint is undeployed.

8. **Footer**
   - Left: "Simon L. Paige Web Design"
   - Right: "A brand of Groundlayer LLC." + privacy + terms links.
   - Credit line: "Built in Kansas City by Simon L. Paige Web Design. Plain HTML, built by hand."

### plans/index.html - the pricing page

**Audit step first**: read the existing `plans/index.html`. If it already uses Prairie Clarity tokens and reads in the SLP voice, keep it structurally but audit for banned words and em dashes. If it's on the old Bebas Neue / neon theme or pitches anything other than the three plan tiers, rebuild from scratch.

Plans to feature (confirm in `~/.openclaw/workspace/web-clients/_docs/stripe-products.md` if it exists):
- **Starter** - $399 build + $29/mo hosting. 1-3 pages, contact info, hours, location, one CTA. "For when you need to exist online so people can find your phone number."
- **Business** - $799 build + $49/mo hosting. 5 pages including a services page and a testimonial section. "For most KC small businesses."
- **Custom** - $1,299 build + $79/mo hosting. 8+ pages, custom features (booking, menu, gallery, simple e-commerce). "For when you need a specific thing built a specific way."

One zebra table or three cards (your call - zebra table is more Prairie Clarity). Mono numerics for prices in Prairie Rust. Each plan row includes:
- What you get (bullet list, plain language)
- What's included in hosting ($29-79/mo)
- What's NOT included (stock photos, third-party integrations beyond the basics) - be honest
- CTA: "Text me about the Business plan" (or similar, with the plan name in the subject line).

FAQ block below: 5-7 honest Q&As. Lift from BRAND-v3.md where applicable.

Footer: same as homepage.

### privacy.html and terms.html (root-level)

- Scoped to simonlpaige.com and the SLP Web Design business.
- Reference Groundlayer LLC as the legal party.
- Voice: SLP's warmer register, but still legal-doc clear. Plain English legal - no jargon.
- Last updated 2026-04-19.

### plans/privacy.html and plans/terms.html

- If they already exist and are consistent, keep them (audit only).
- If they duplicate the root privacy/terms, redirect conceptually: you can either (a) make them identical copies with a note "also at /privacy.html" or (b) delete them and update links. Your call - document the choice in BUILD-NOTES.md.

## CSS requirements (`css/site.css`)

- Single stylesheet. All tokens as `:root` CSS custom properties.
- Breakpoints: 640px, 900px, 1200px.
- Use CSS Grid for the work triplet and plan table; Flexbox for header and nav.
- Focus ring: `outline: 2px solid var(--horizon); outline-offset: 2px;` (Horizon Blue on Limestone = accessible).
- `prefers-reduced-motion` respected.
- Print styles preserved.
- No JS required for core visibility.
- NO framework. Hand-written.

## Pre-commit checklist

1. Grep for banned words in all .html files you created. Zero hits.
2. Grep for em dashes (—) and en dashes (–) used as punctuation. Zero hits.
3. Grep for "gradient" in CSS. Zero hits.
4. Grep for border-radius values above 8px. Zero hits.
5. Font stack: only Source Serif 4, Inter, JetBrains Mono.
6. No JS except what's absolutely required (none should be required).
7. Every `<img>` has a real sentence as alt text.
8. All three four-property machine links resolve: rivaldrop.com, anvilshare.ai, groundlayer.co.
9. Hero is left-aligned, not centered.
10. Plan prices are mono in Prairie Rust.
11. The word "agentic" does not appear. The phrase "dark factory" does not appear. "Lights-out" does not appear.
12. Client screenshots, if any copied to assets/work/, are <80KB each.

## Deliverables

1. index.html, privacy.html, terms.html at root (rebuilt).
2. plans/index.html, plans/privacy.html, plans/terms.html (rebuilt or audited).
3. css/site.css complete.
4. assets/logo.svg (copied) and favicon.svg (generated).
5. Real client screenshots copied to assets/work/ if available; otherwise typographic cards.
6. BUILD-NOTES.md with: spec ambiguities resolved, client screenshot sources, any flagged concerns, voice-check scan results, list of subdirectories LEFT UNTOUCHED.
7. Git commits on branch `prairie-clarity-rebuild-2026-04-19`:
   - Commit 1: `slp: Prairie Clarity homepage rebuild - four-property narrative`
   - Commit 2: `slp: plans page audit and rebuild`
   - Commit 3: `slp: privacy + terms refresh` (if meaningful changes)

## Do not

- Push or deploy. Do not run git push.
- Touch ecolibrium/, EDP/, waldo/, WaldoNet/ subdirectories. Not one file.
- Touch anything under `~/.openclaw/workspace/web-clients/` - those are deployed client sites. READ ONLY.
- Modify files outside `~/.openclaw/workspace/simonlpaige.github.io/` except to READ the brand docs, pipeline doc, and web-clients contents for screenshots.
- Invent testimonials or clients that don't exist.
- Use stock photography or AI-generated imagery.
- Call Simon an "AI engineer," "agentic systems builder," "dark factory operator," or any variation. He's a KC web designer who happens to run a few other things.
- Add analytics, tracking, or third-party scripts.

## When you finish

Run this command to wake Larry:

```
openclaw system event --text "Done: simonlpaige.com v3 Prairie Clarity rebuild complete on branch prairie-clarity-rebuild-2026-04-19. Ready for review." --mode now
```

Go.
