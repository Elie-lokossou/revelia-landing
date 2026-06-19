# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Sable is a static, file-based personal design system. There is no build step, no package manager, no framework. Files are opened directly in a browser.

## How to preview

- **Unified showcase** (recommended) — open [`Sable Design System.html`](Sable%20Design%20System.html) via a local HTTP server. The entry uses `fetch()` to load section partials and `.md` files, so `file://` won't work:
  ```
  python3 -m http.server 8000
  # http://localhost:8000/Sable%20Design%20System.html
  ```
  The showcase renders 25 sections: one Agent pack hero, six inline-rendered docs (EN/FR toggle + per-section `Copy .md` + a top-level `Copy full prompt for agent`), and the full token/component/pattern specimens.
- **Legacy standalone previews** — the files in `preview/` remain as self-contained specimens and can still be opened directly (they use `_card.css`).
- **Portfolio UI kit** — open `ui_kits/portfolio/index.html` via HTTP. It loads React via CDN and transpiles JSX with Babel standalone:
  ```
  cd ui_kits/portfolio && python3 -m http.server 8080
  ```
  Then visit `http://localhost:8080`.

## File map

| File/Folder | Purpose |
|---|---|
| `Sable Design System.html` | Unified showcase entry (shell + partial loader + MD renderer + Copy buttons) |
| `DESIGN-SYSTEM.md` | Central index pointing at EN + FR docs and the repo structure |
| `docs/en/`, `docs/fr/` | Six agent-facing docs (Overview, Tokens, Typography, Components, Patterns, Do & Don't). EN is the source of truth. |
| `partials/` | Section partials loaded into the showcase shell: `00-agent-pack`, `01-docs`, `02-brand`, `03-color`, `04-type`, `05-surfaces`, `06-components`, `07-composed` |
| `colors_and_type.css` | Single source of truth — all CSS custom properties (tokens) and semantic utility classes. Used in production. |
| `assets/shell.css` | **Showcase-only** shell styles (sidebar layout + rendered-markdown styles). Do NOT ship this with production pages. |
| `assets/noise.png` | 256×256 grain texture; tiled at `opacity: 0.04` via `.grain::before` |
| `assets/logo.svg` | Typographic logo mark |
| `assets/photo-0[1-6].jpg` | Sample imagery (always rendered via `.img-bw`) |
| `preview/*.html` | Legacy standalone specimens. Each file uses `_card.css` and is self-contained — kept as reference. |
| `ui_kits/portfolio/` | Reference portfolio site (React + Babel CDN, cosmetic only — no real routing or backend) |
| `ui_kits/certicraft/`, `ui_kits/hebergea/` | Additional product UI kits |

## Core design rules (enforce these in all generated code)

- **Background**: always `#EAEAEA`, never `#FFFFFF`. Add `.grain` class to `<body>` or top-level wrapper to activate grain overlay.
- **Accent**: `#7B61FF` — maximum once per viewport. If it appears more than once, it's wrong.
- **Typography**: Inter 900 for display/headings only (`t-display-*`, `t-h1`–`t-h3`); Space Mono 400 for everything else. Load via Google Fonts (see top of `colors_and_type.css`).
- **Geometry**: `border-radius: 0` everywhere. Borders are always `1px solid #CCCCCC`.
- **No shadows, no gradients, no blur, no glassmorphism.**
- **Images**: always `filter: grayscale(100%) contrast(1.1)` via `.img-bw`.
- **Motion**: `120ms ease-out` for hovers, `200ms ease-out` for state changes. Hover = `opacity: 0.6` or color → `#7B61FF`. No scale, no spring.
- **Spacing**: 4px base unit — use `--s-1` through `--s-32` tokens from `colors_and_type.css`.
- **No emoji. No icon fonts.** Use Lucide SVGs (stroke, 1.5px, `currentColor`) or typographic glyphs (`→`, `·`, `—`).
- **Voice**: UPPERCASE + tracked spacing for nav/labels. Sentence case for headings. No title case, no exclamation marks.

## CSS utility classes (from `colors_and_type.css`)

`.t-display-xl/l/m`, `.t-h1/h2/h3` — display type (Inter 900)  
`.t-body`, `.t-small`, `.t-caption`, `.t-label` — mono type  
`.t-muted`, `.t-accent` — color modifiers  
`.btn`, `.btn--solid`, `.btn--ghost` — button variants  
`.link` — underline link with accent hover  
`.card` — 1px border box, no radius, no shadow  
`.block-black` — inverted dark block  
`.img-bw` — grayscale image treatment  
`.border`, `.border-top`, `.border-bot` — 1px border utilities  
`.dot-accent` — 8×8 purple indicator dot  
`.grain` — activates noise overlay via `::before`

## Adding a new preview card

Copy any existing file in `preview/` as a template. Link `../../colors_and_type.css` and `../../assets/noise.png` relative to the file location.

## Working on the unified showcase

The showcase lives in `Sable Design System.html` + `partials/*.html` + `assets/shell.css`. The page's inline `<script>`:

1. `fetch()`es the eight partials in order and injects each into its `<div id="slot-…">` in the preview column.
2. Wires up scroll-spy on the nav via `IntersectionObserver`.
3. In `initDocs()`: fetches each `.md` file for the doc sections, renders with `marked@12` (from jsDelivr CDN), injects `Copy` buttons on every `<pre>` block, and caches the raw markdown so `Copy .md` and `Copy full prompt` are instant.
4. Builds the "full prompt" on click by concatenating the 6 docs in the active language with an English or French brief header (see `buildPromptHeader()`).
5. Clipboard copy uses `navigator.clipboard.writeText` on HTTPS/localhost, falling back to a hidden `<textarea>` + `execCommand('copy')` for LAN IPs (`http://192.168.x.x:…`).

**When editing docs:** EN (`docs/en/*.md`) is the source of truth — update it first, then mirror in FR. The `Copy full prompt` button depends on the six filenames (`00-overview` through `05-do-and-dont`). Don't rename them without updating the `docs` array in `Sable Design System.html` and the `fetchMd()` path template.

**When adding a showcase section:** add the section in the appropriate partial, update the kicker number, and add a matching `<a href="#id">` entry in `.docs-nav` in the entry HTML. Section IDs are stable — nav hrefs target them directly.

## Skill invocation

The `SKILL.md` manifest marks this as an agent skill named `sable-design`. When invoked, read `README.md` first, then explore other files. Output is either a static HTML artifact or production code depending on context.
