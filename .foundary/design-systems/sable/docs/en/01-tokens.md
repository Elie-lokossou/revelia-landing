# Tokens

Every design decision lives as a CSS custom property on `:root`, defined in [`colors_and_type.css`](../../colors_and_type.css). Always reach for a token. Do not introduce raw hex values, pixel sizes, or ad-hoc timings.

## Colour

| Token | Value | Use for |
|---|---|---|
| `--bg` | `#EAEAEA` | Page background. The signature. Never pure white. |
| `--bg-inverted` | `#000000` | Inverted blocks, quote bars, rare strong callouts |
| `--surface` | `#FFFFFF` | Only inside inverted blocks or as ink-on-dark |
| `--fg` | `#111111` | Body text, headings, 1px borders on dark |
| `--fg-muted` | `#888888` | Captions, meta, labels, secondary text |
| `--fg-inverted` | `#FFFFFF` | Text on dark surfaces |
| `--accent` | `#7B61FF` | One link, one hover, one key number — sparingly |
| `--accent-ink` | `#FFFFFF` | Text on accent |
| `--border` | `#CCCCCC` | All 1px borders by default |
| `--border-strong` | `#111111` | Borders on buttons, strong containers |

**Accent discipline.** If `#7B61FF` shows up more than once in the same viewport, the design is wrong. The rhythm is: a page of neutrals, one purple mark, back to neutrals.

## Typography — families

```css
--font-display: 'Inter', 'Helvetica Neue', Arial, sans-serif;
--font-mono:    'Space Mono', 'IBM Plex Mono', ui-monospace, Menlo, monospace;
```

Two families only. Inter is used **exclusively at weight 900** for headings and large display text. Space Mono is everything else (body, nav, labels, captions, buttons).

## Typography — weights, tracking, leading

```css
--weight-display:    900;
--weight-body:       400;
--weight-body-bold:  700;

--tracking-display: -0.02em;  /* tight on Inter 900 */
--tracking-mono:     0em;     /* neutral on Space Mono */
--tracking-label:    0.08em;  /* UPPERCASE labels */

--leading-display: 0.95;
--leading-body:    1.8;       /* airy mono body */
--leading-tight:   1.3;
```

## Typography — scale

| Token | Value | Use for |
|---|---|---|
| `--fs-display-xl` | `clamp(64px, 12vw, 180px)` | Hero display |
| `--fs-display-l` | `clamp(48px, 8vw, 96px)` | Section hero |
| `--fs-display-m` | `clamp(32px, 5vw, 56px)` | Feature header |
| `--fs-h1` | `40px` | Page title |
| `--fs-h2` | `28px` | Section heading |
| `--fs-h3` | `20px` | Subheading |
| `--fs-body` | `15px` | Body copy |
| `--fs-small` | `13px` | Small copy, buttons |
| `--fs-caption` | `11px` | Labels, captions, meta |

## Spacing (4px base, restrained ramp)

| Token | Value | Typical use |
|---|---|---|
| `--s-1` | `4px` | Inline icon gap |
| `--s-2` | `8px` | Tight inline spacing |
| `--s-3` | `12px` | Component internal padding |
| `--s-4` | `16px` | Default padding |
| `--s-6` | `24px` | Card padding, gutters |
| `--s-8` | `32px` | Block margins |
| `--s-12` | `48px` | Section internal spacing |
| `--s-16` | `64px` | Major section spacing |
| `--s-24` | `96px` | Page padding, breathing room |
| `--s-32` | `128px` | Hero padding |

Generous whitespace is part of the sober feel. Do not crowd.

## Geometry

```css
--radius:   0;     /* zero, always */
--border-w: 1px;   /* every border, every time */
```

The only acceptable `border-radius` is `0`. Borders are always 1px.

## Motion

```css
--ease:     cubic-bezier(.2, .6, .2, 1);
--dur-fast: 120ms;
--dur:      200ms;
```

Hover transitions: `120ms ease-out`. State changes: `200ms ease-out`. No springs, no bounces, no scale transforms. Default hover feedback is `opacity: 0.6` or a colour shift to `--accent`.

## Grain overlay

The signature texture. Tiles `assets/noise.png` at 256×256 with `opacity: 0.04`, fixed position, mix-blend-mode multiply. Activated by the `.grain` class on `<body>` or a top-level wrapper.

```html
<body class="grain">
```

The overlay is `pointer-events: none` and sits at `z-index: 9999`. You feel it more than you see it. Do not crank up the opacity.
