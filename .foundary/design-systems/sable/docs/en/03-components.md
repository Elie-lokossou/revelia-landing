# Components

Copy-paste ready HTML. All classes live in [`colors_and_type.css`](../../colors_and_type.css). No framework, no JS.

## Button (`.btn`)

Square, 1px border, uppercase mono, tracked spacing. Three variants.

```html
<!-- Primary (outline with fg border) -->
<button class="btn">Get in touch</button>

<!-- Solid (dark fill, inverts to purple on hover) -->
<button class="btn btn--solid">View work →</button>

<!-- Ghost (muted 1px border, text shifts to accent on hover) -->
<button class="btn btn--ghost">Secondary</button>
```

**Behaviour:**
- Default hover on `.btn`: background flips to `--fg`, text to `--bg`.
- `.btn--solid` hover: background flips to `--accent`, border too, text becomes `--accent-ink`.
- `.btn--ghost` hover: border and text turn accent.
- Active state: `opacity: 0.7`. No scale, no shadow.

**Rules:**
- One primary button per view. Never two adjacent `.btn--solid`.
- Keep labels short. "Get in touch" not "Feel free to reach out".
- Suffix with `→` for forward motion, not for decoration.

## Link (`a.link` / `.link`)

Mono text, 1px underline on the baseline, accent on hover.

```html
<a class="link" href="#">My writing on design</a>

<!-- Already accent-coloured before hover -->
<a class="link t-accent" href="#">Featured note</a>
```

**Rules:**
- Underline thickness is 1px, offset `3px`. Don't thicken.
- Accent variant (`.t-accent`) is allowed for one link per viewport maximum.

## Card (`.card`)

A 1px bordered box. No shadow, no radius, no hover state.

```html
<article class="card">
  <div class="t-label">WRITING / NOTE</div>
  <h2 class="t-h2">On restraint</h2>
  <p class="t-body">A short note on why removing is usually the right move.</p>
  <a class="link" href="#">Read —</a>
</article>
```

## Inverted block (`.block-black`)

Used for one quote, one callout, or one strong statement per page.

```html
<section class="block-black" style="padding: var(--s-16) var(--s-12);">
  <div class="t-label" style="color: #888;">PHILOSOPHY</div>
  <h2 class="t-h1" style="color: #fff; margin-top: var(--s-4);">
    Do less. Do it better.
  </h2>
</section>
```

## Accent dot (`.dot-accent`)

An 8×8px purple square. The canonical "live" or "active" indicator. One per viewport.

```html
<span class="dot-accent"></span> <span class="t-label">AVAILABLE FOR WORK</span>
```

## Border utilities

```html
<div class="border">1px border all around</div>
<div class="border-top">Top border only</div>
<div class="border-bot">Bottom border only</div>
<hr class="hr" />
```

## Images (`.img-bw`)

Every photograph is grayscale + contrast-bumped. No colour photography anywhere in Sable.

```html
<figure>
  <img class="img-bw" src="assets/photo-01.jpg" alt="Studio, morning light" />
  <figcaption class="t-caption">Paris / Archival silver / 2024</figcaption>
</figure>
```

The filter is `grayscale(100%) contrast(1.1)`. Where possible, pair with a film-grain overlay on the image itself.

## Icons (Lucide, no icon font)

No branded icon set. Use Lucide at 1.5px stroke, `currentColor`, sized to the line-height of surrounding text.

```html
<!-- Inline SVG from Lucide -->
<a class="link" href="#">
  Read the note
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
  </svg>
</a>
```

Typographic glyphs are preferred where they exist:

- `→` forward navigation, CTA arrows
- `←` back
- `·` bullets, separators
- `—` em-dash breaks
- `/` path separator in meta (`PARIS / 2024`)

No emoji. No Material filled icons. No Heroicons solid.

## Form inputs

Minimal. 1px borders, mono, no radius.

```html
<label class="t-label" for="email">EMAIL</label>
<input type="email" id="email"
       style="width: 100%; padding: var(--s-3); background: var(--bg); color: var(--fg);
              border: 1px solid var(--fg); font-family: var(--font-mono); font-size: var(--fs-body);" />
```

Focus state: `outline: 1px solid var(--accent); outline-offset: 2px;`.

## Navigation (header)

Fixed top, 1px bottom border, mono uppercase links, tracked letter-spacing.

```html
<nav class="border-bot" style="position: sticky; top: 0; background: var(--bg);
     display: flex; align-items: center; justify-content: space-between;
     padding: var(--s-4) var(--s-12); z-index: 10;">
  <a class="t-label" style="color: var(--fg); text-decoration: none;" href="/">SAM MOREAU</a>
  <div style="display: flex; gap: var(--s-8);">
    <a class="t-label" style="color: var(--fg); text-decoration: none;" href="#work">WORK</a>
    <a class="t-label" style="color: var(--fg); text-decoration: none;" href="#about">ABOUT</a>
    <a class="t-label" style="color: var(--fg); text-decoration: none;" href="#notes">NOTES</a>
    <a class="t-label" style="color: var(--fg); text-decoration: none;" href="#contact">CONTACT</a>
  </div>
</nav>
```

Hover state on nav links: `color: var(--accent)` with `120ms` transition.
