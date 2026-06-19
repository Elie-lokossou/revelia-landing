# Overview

Sable is a minimalist, cold-yet-tactile design system. Something analog in a digital environment — an old photograph living in a modern one. Sober, confident, without ornament.

## What makes it recognisable

Four moves do all the work:

1. **The sandy background.** `#EAEAEA` plus a fixed noise overlay at `opacity: 0.04`. Never pure white.
2. **Purple used sparingly.** `#7B61FF` is rare on purpose — that's what makes it hit. Maximum once per viewport.
3. **Two typefaces.** Inter 900 for titles, Space Mono for everything else.
4. **Zero rounding.** Every edge is 90°. Borders are always `1px solid #CCCCCC`.

## When to use it

- Personal portfolios, editorial sites, reading-heavy interfaces
- Interfaces that should feel considered, paperlike, quietly confident
- Work that wants tactile weight without visual noise

Do not use Sable for high-energy consumer apps, anything that needs "fun," or interfaces where loud colour hierarchy matters.

## How to integrate

Load the single stylesheet and the two font families in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="colors_and_type.css" />
```

Add `class="grain"` to `<body>` to activate the noise overlay:

```html
<body class="grain">
  <!-- content -->
</body>
```

That is the entire baseline. Everything else is semantic classes (`.t-display-l`, `.btn`, `.card`, etc.) applied to standard HTML.

## Agent entry points — read first

| You need to… | Read |
|---|---|
| A colour, spacing, font-size, weight, duration | [01-tokens.md](01-tokens.md) |
| Pick a heading / body / label style | [02-typography.md](02-typography.md) |
| A button, link, card, form, nav, image treatment | [03-components.md](03-components.md) |
| Compose a hero, work list, contact, dark block | [04-patterns.md](04-patterns.md) |
| Sanity-check before shipping | [05-do-and-dont.md](05-do-and-dont.md) |

## Non-negotiable rules

1. Background is `#EAEAEA`. Never `#FFFFFF`.
2. Accent purple appears at most **once** per viewport.
3. All corners are 90°. All borders are `1px solid #CCCCCC`.
4. No drop shadows. No gradients. No blur. No glass effects.
5. Photography is black and white: `filter: grayscale(100%) contrast(1.1)`.
6. Motion is restrained: `120ms ease-out` on hover, `200ms ease-out` on state change. No spring, no scale.
7. No emoji. Ever. Use Lucide icons at 1.5px stroke or typographic glyphs (`→`, `·`, `—`).

## Voice

Sober, direct, low on adjectives. First-person singular for author's work. No exclamation marks. No title case. UPPERCASE + tracked spacing for labels and nav; sentence case for headings; prose for body.

Examples that pass:
- `NAV` → `WORK`, `ABOUT`, `NOTES`, `CONTACT`
- Section header → `Selected work, 2020–2026`
- Caption → `Paris / Archival silver / 2024`
- CTA → `Get in touch`
- Meta → `UPDATED 04 / 17 / 2026`

Examples that fail:
- `Let's chat! 🚀` — exclamation, emoji, forced energy
- `Awesome Projects` — title case, adjective
- `Welcome to my portfolio` — hype, not needed

## What Sable rejects

Rounded corners, drop shadows, colour photography, gradients, glass/blur, emoji, more than two typefaces, any purple that isn't `#7B61FF`.
