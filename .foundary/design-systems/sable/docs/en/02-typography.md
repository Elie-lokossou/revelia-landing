# Typography

Two families. Strict roles. Do not cross them.

## The two families

| Family | Role | Weight | Notes |
|---|---|---|---|
| **Inter** | Display, headings | `900` | Tight tracking (`-0.02em`), leading `0.95`. Large statements only. |
| **Space Mono** | Body, nav, labels, captions, buttons | `400` (or `700` bold) | Airy leading `1.8`. Carries the voice. |

No third family. No secondary sans. No serif.

## Display type (`.t-display-*`, `.t-h1`–`.t-h3`)

Inter 900, tight and assertive. Use only for the biggest statements: a name, a section title, a key number.

```html
<h1 class="t-display-xl">Sam Moreau</h1>

<h1 class="t-display-l">Selected work, 2020–2026</h1>

<h2 class="t-h1">About</h2>

<h2 class="t-h2">Recent notes</h2>

<h3 class="t-h3">Photography</h3>
```

**Rules:**
- Sentence case. Never title case.
- Short. If a display heading needs two lines of body explanation after it, the heading is too long.
- Colour is `--fg` (`#111111`) by default. On dark blocks it inherits white from `.block-black`.
- Accent purple (`--accent`) is permitted on one word of one heading per page, at most.

## Body type (mono, default)

Space Mono 400, 15px, line-height 1.8. Set on `html, body` in the base stylesheet, so it applies to everything unless overridden.

```html
<p>I build interfaces and tools that treat attention like it matters. Currently based in Paris, working independently.</p>
```

Weight `700` (`--weight-body-bold`) is available for in-line emphasis, not for running paragraphs.

## Labels and meta (`.t-label`, `.t-caption`)

UPPERCASE + tracked letter-spacing (`0.08em`). Colour is `--fg-muted` (`#888888`). Used for labels, section kickers, nav, metadata.

```html
<div class="t-label">UPDATED 04 / 17 / 2026</div>
<figcaption class="t-caption">Paris / Archival silver / 2024</figcaption>
```

## Small and muted utilities

```html
<p class="t-small">Side note at 13px, muted.</p>
<span class="t-muted">888888 colour applied to anything.</span>
<a class="link t-accent">Purple if used sparingly.</a>
```

## Casing rules

| Context | Casing | Example |
|---|---|---|
| Nav, labels, metadata | UPPERCASE + tracked | `WORK`, `ABOUT`, `CONTACT` |
| Headings | Sentence case | `Selected work, 2020–2026` |
| Body copy | Natural prose | "I build interfaces…" |
| Buttons | Sentence case inside; the class sets UPPERCASE visually | `Get in touch` |

Never title case. Never SCREAMING for emphasis (use weight 700 or purple instead).

## The accent mark

`--accent` (`#7B61FF`) appears at most once per viewport. It can land on:
- One link (`.t-accent`, or the hover state of `a.link`)
- One word in one heading
- One dot indicator (`.dot-accent`)
- One key number in a callout

Never on large fills. Never on a button background by default (only inside the solid variant's hover state). Never two purple marks side by side.

## What to avoid

- ❌ Display type at weight less than 900
- ❌ Inter used for body copy
- ❌ Mono used for headings
- ❌ Title case anywhere
- ❌ Exclamation marks
- ❌ Emoji
- ❌ A third typeface (serif, script, condensed — anything)
