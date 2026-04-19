# BUILD-NOTES.md - Prairie Clarity Rebuild v3

**Date:** 2026-04-19
**Branch:** prairie-clarity-rebuild-2026-04-19
**Builder:** Claude Code (subagent)

---

## Spec ambiguities resolved

1. **Third tier naming.** BRIEF calls it "Custom". Stripe products call it "Storefront". Used "Custom" per the BRIEF since that's the customer-facing name.

2. **Wes Benson omitted.** BRIEF suggested featuring Wes Benson as a client. Verified from `web-clients/wes-benson/PROJECT.md`: partnership agreement not yet signed, no site built, status is "Prospecting". Omitted per the BRIEF rule: "If any client isn't actually deployed or doesn't exist, omit that card."

3. **Work grid shows 2 clients, not 3.** Only Everyday Produce (live at everyday-produce.com) and Andersen's HVACR (draft at simonlpaige.github.io/andersen-hvacr/) have real work. Grid is still CSS Grid `repeat(3, 1fr)` for Wright triplet proportions - the two cards sit in the first two columns.

4. **plans/privacy.html and plans/terms.html.** Previously redirected to groundlayer.co. Now redirect to root `/privacy.html` and `/terms.html` respectively. Root-level versions are the canonical legal pages scoped to SLP/Groundlayer LLC. This consolidates legal pages under one domain instead of pointing off-site.

5. **No contact form.** Per BRIEF and PIPELINE.md, the Cloudflare Worker endpoint at api.groundlayer.co/contact is undeployed. Using mailto:simon@simonlpaige.com with subject line pre-fill instead.

6. **No phone number on portfolio.** BRIEF says to include phone if found in brand docs or portfolio CONTEXT. Neither contains a public-facing phone for Simon. Omitted.

7. **About section kept short.** BRIEF says 2 sentences if not enough verified facts. Used exactly that - no speculation about prior career history.

8. **Andersen's HVACR URL.** No custom domain yet per PROJECT.md. Linked to the GitHub Pages preview URL.

---

## Client screenshot sources

No actual website screenshots found for any client:
- **Everyday Produce:** Has store photos in `web-clients/everyday-produce/site/photos/` but no site screenshots. Used typographic card.
- **Andersen's HVACR:** Has a live site at GitHub Pages but no screenshots in `web-clients/andersen-hvacr/`. Used typographic card.
- **Wes Benson:** Omitted entirely (no site built).

No images copied to `assets/work/` - all work cards use typographic previews.

---

## Voice-check scan results

- **Banned words:** 0 hits in new files (index.html, plans/index.html, privacy.html, terms.html, css/site.css)
- **"agentic" / "dark factory" / "lights-out":** 0 hits
- **Em dashes / en dashes:** 0 hits in new files
- **Gradients in CSS:** 0 hits
- **Border-radius > 8px:** 0 hits
- **JavaScript in new pages:** 0 (no `<script>` tags)
- **Uppercase button labels:** 0 (all lowercase in CSS, no text-transform: uppercase on buttons)
- **Font stack compliance:** Source Serif 4 (display), Inter (body), JetBrains Mono (data) only

---

## Subdirectories LEFT UNTOUCHED

| Directory | Contents | Status |
|-----------|----------|--------|
| `ecolibrium/` | Ecolibrium project - global civil society mapping tool. Multi-page app with D3.js map, directory, documentation. | Not touched |
| `EDP/` | Everyday Produce landing page - single-page site with photos, seasonal info, visit section. | Not touched |
| `waldo/` | Waldo-area landing page - appears to be an earlier iteration of SLP web design marketing. | Not touched |
| `WaldoNet/` | WaldoNet AI - community-owned AI cooperative page for Waldo neighborhood. | Not touched |

---

## Files created or modified

| File | Action |
|------|--------|
| `index.html` | Replaced (was Bebas Neue/neon green "Agentic & Dark Factory") |
| `css/site.css` | Created (Prairie Clarity single stylesheet) |
| `assets/logo.svg` | Copied from modules/groundlayer/design-systems/logos/slp.svg |
| `assets/favicon.svg` | Created ("S" monogram, Source Serif 4, prairie rust accent) |
| `plans/index.html` | Replaced (was redirect to groundlayer.co/plans) |
| `privacy.html` | Created (was nonexistent) |
| `terms.html` | Created (was nonexistent) |
| `plans/privacy.html` | Replaced (was redirect to groundlayer.co, now redirects to /privacy.html) |
| `plans/terms.html` | Replaced (was redirect to groundlayer.co, now redirects to /terms.html) |
| `BUILD-NOTES.md` | Created |

---

## Flagged concerns

1. **Everyday Produce neighborhood.** BRIEF says "Brookside" but PROJECT.md says "Waldo" (7300 Wornall Rd). Used "Waldo" since that's the verified address.
2. **Andersen's HVACR has no custom domain.** Linked to GitHub Pages URL. Should be updated when Max chooses a domain.
3. **Google Fonts dependency.** Fonts load from fonts.googleapis.com per the BRIEF's specified link. This is a third-party request but not a tracking script. Noted for the < 500KB page weight target.
4. **No Chalk override.** BRIEF says Chalk is `#FBF8F1`. BRAND.md v2 says Chalk is `#FFFFFF`. Used `#FBF8F1` per the BRIEF tokens (which take precedence).
