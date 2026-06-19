# Do & Don't

A short checklist before shipping any Sable surface. If you break one of these, you're off-system.

## Do

- **Set the page background to `#EAEAEA`.** Activate the grain by adding `.grain` to `<body>`.
- **Use purple once per viewport.** One link, one dot, one word in one heading. That's the quota.
- **Keep every corner 90°.** `border-radius: 0` everywhere. No exceptions.
- **Use Inter 900 only for display.** Inter at any other weight is not Sable.
- **Use Space Mono for everything else.** Body, nav, labels, buttons, captions. No substitute.
- **Set 1px borders in `#CCCCCC`** by default. `#111111` borders are for buttons and strong containers only.
- **Grayscale every image.** `filter: grayscale(100%) contrast(1.1)`. Consider a film-grain overlay on the image itself.
- **Leave whitespace.** Use `--s-12` / `--s-16` / `--s-24` generously. Sable breathes.
- **Write labels in UPPERCASE with tracked spacing.** Headings in sentence case. Body in natural prose.
- **Prefer typographic glyphs over icons.** `→`, `·`, `—`, `/` before reaching for SVG.
- **When you need an icon, use Lucide at 1.5px stroke.** `currentColor`, sized to surrounding line-height.

## Don't

### Colour
- ❌ Pure white backgrounds (`#FFFFFF`). Sable's canvas is `#EAEAEA`, always.
- ❌ Purple on a large surface. Purple is a point, not a plane.
- ❌ Two purple marks on the same screen.
- ❌ Any purple that isn't `#7B61FF`. No shades, no alphas.
- ❌ Semantic colours (success green, warning red) — Sable does not ship them. Use weight or typography instead.

### Type
- ❌ Inter at any weight other than 900.
- ❌ Space Mono for headings.
- ❌ A third typeface. Serif, script, condensed — none belong.
- ❌ Title Case In Any Heading.
- ❌ Exclamation marks. The voice is sober.
- ❌ Emoji. Anywhere. Ever.

### Shape
- ❌ Rounded corners. Even slightly. Even on avatars.
- ❌ Drop shadows. No `box-shadow` values with blur.
- ❌ Gradients. No `linear-gradient`, no `radial-gradient`.
- ❌ Glass / blur / backdrop filter.

### Imagery
- ❌ Colour photography.
- ❌ Stock illustrations.
- ❌ Filled / Material-style icons.

### Motion
- ❌ Scale transforms on hover. No `transform: scale(1.05)`.
- ❌ Spring or bounce easings.
- ❌ Page-load fade-ins.
- ❌ Transitions longer than `200ms`.

### Copy
- ❌ "Click here". Name the destination.
- ❌ Exclamations. Forced enthusiasm.
- ❌ Adjectives piled up ("beautiful, fast, awesome").
- ❌ "We" in a personal portfolio. Sable is first-person singular.

## Red flags in code review

If these show up in a PR, flag them:

```css
/* ❌ */ border-radius: 8px;
/* ❌ */ box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
/* ❌ */ background: linear-gradient(to bottom, #fff, #eee);
/* ❌ */ color: #7B61FF;   /* when it's the third purple on the page */
/* ❌ */ font-family: 'Poppins', sans-serif;
/* ❌ */ transition: transform 350ms spring(1, 80, 10, 0);
```

```html
<!-- ❌ white bg -->
<body style="background: #FFFFFF;">

<!-- ❌ two purple marks -->
<a class="link t-accent">note</a>
<span class="dot-accent"></span>

<!-- ❌ title case heading -->
<h1 class="t-h1">Selected Work, 2020–2026</h1>

<!-- ❌ emoji -->
<p>Thanks for stopping by! 👋</p>
```
