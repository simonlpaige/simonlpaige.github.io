# Speeding Ticket KC — Demo Site

**Client demo** for speedingticketkc.com, hosted at simonlpaige.com/STKC.

Built by [Simon L. Paige Web Design](https://simonlpaige.com). May 2026.

---

## What this is

A full-page design demo for a Kansas City traffic law firm. Shows the complete
homepage: hero + contact form, services, pricing, process, attorney bios, reviews,
locations, and CTA strip.

The **tweaks panel** (bottom-right) lets the client live-switch color palettes
during a presentation without reloading.

## Tech

- React 18 (CDN, UMD) + Babel standalone (in-browser JSX transpile)
- No build step. Pure HTML + CSS + JSX files.
- Google Fonts: Source Serif 4, IBM Plex Sans, IBM Plex Mono

## Files

| File | Purpose |
|---|---|
| `index.html` | Entry point, JSON-LD schema, noscript fallback |
| `styles.css` | All design tokens + styles |
| `Icons.jsx` | SVG icon components |
| `Nav.jsx` | Top navigation bar |
| `Hero.jsx` | Hero section + contact form (demo-only) |
| `Sections.jsx` | Services, Pricing, Process, Why, Attorneys |
| `Sections2.jsx` | Reviews, Partnership, Locations, CTA, Footer |
| `tweaks-panel.jsx` | Live palette switcher for client demos |
| `DESIGN.md` | Full design system documentation |
| `llms.txt` | AI/LLM crawler summary |

## Deploy

Files are committed to `simonlpaige/simonlpaige.github.io` under `/STKC/`
and served via GitHub Pages at `simonlpaige.com/STKC`.

## Production steps (when client is ready)

1. Wire form to Cloudflare Worker (see `DESIGN.md`)
2. Add attorney headshots
3. Set up `speedingticketkc.com` DNS to new repo or Cloudflare Pages
4. Remove `noindex` meta tag + demo banner
5. Update `robots.txt` to allow crawlers
