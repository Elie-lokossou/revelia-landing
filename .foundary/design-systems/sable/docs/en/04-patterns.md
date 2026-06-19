# Patterns

Composed sections — how the components fit together on a real page. Lift the HTML, adapt the copy.

## Page shell

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Sam Moreau</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="colors_and_type.css" />
</head>
<body class="grain">
  <!-- content -->
</body>
</html>
```

## Hero — personal portfolio

A name, a role, a line about the work. The hero does not sell — it states.

```html
<section style="padding: var(--s-24) var(--s-12) var(--s-16);">
  <div class="t-label" style="margin-bottom: var(--s-4);">
    <span class="dot-accent" style="margin-right: var(--s-2); vertical-align: middle;"></span>
    AVAILABLE FOR WORK — 2026
  </div>

  <h1 class="t-display-xl" style="margin-bottom: var(--s-6);">Sam Moreau</h1>

  <p style="max-width: 620px; font-size: var(--fs-h3); line-height: 1.5;">
    I build interfaces and tools that treat attention like it matters.
    Currently based in Paris, working independently.
  </p>

  <div style="margin-top: var(--s-12); display: flex; gap: var(--s-3);">
    <a href="#work" class="btn btn--solid">View work →</a>
    <a href="#contact" class="btn">Get in touch</a>
  </div>
</section>
```

## Selected work list

A table-like list, not a grid of cards. Each row is year + project + client + medium.

```html
<section style="padding: var(--s-16) var(--s-12);">
  <div class="t-label" style="margin-bottom: var(--s-8);">SELECTED WORK / 2020–2026</div>

  <div>
    <div class="border-bot" style="display: grid; grid-template-columns: 80px 1fr 1fr auto; gap: var(--s-6); padding: var(--s-4) 0;">
      <span class="t-small">2026</span>
      <span class="t-body" style="font-weight: 700;">Archive interface</span>
      <span class="t-small t-muted">Private client</span>
      <a class="link" href="#">Case →</a>
    </div>
    <div class="border-bot" style="display: grid; grid-template-columns: 80px 1fr 1fr auto; gap: var(--s-6); padding: var(--s-4) 0;">
      <span class="t-small">2025</span>
      <span class="t-body" style="font-weight: 700;">Editorial tooling</span>
      <span class="t-small t-muted">Le Monde</span>
      <a class="link" href="#">Case →</a>
    </div>
    <div class="border-bot" style="display: grid; grid-template-columns: 80px 1fr 1fr auto; gap: var(--s-6); padding: var(--s-4) 0;">
      <span class="t-small">2024</span>
      <span class="t-body" style="font-weight: 700;">Reading experience</span>
      <span class="t-small t-muted">Independent</span>
      <a class="link" href="#">Case →</a>
    </div>
  </div>
</section>
```

## Quote / black block

Reserved for one statement per page. The only moment of inverted contrast.

```html
<section class="block-black" style="padding: var(--s-24) var(--s-12);">
  <div style="max-width: 860px;">
    <div class="t-label" style="color: #888; margin-bottom: var(--s-4);">PHILOSOPHY</div>
    <p class="t-display-l" style="color: #fff; margin: 0;">
      Do less. Do it better.
    </p>
    <p class="t-small" style="color: #888; margin-top: var(--s-6);">
      — Dieter Rams, paraphrased.
    </p>
  </div>
</section>
```

## About block (author photo + bio)

Black-and-white portrait on the left, mono prose on the right. Asymmetric grid.

```html
<section style="padding: var(--s-16) var(--s-12); display: grid; grid-template-columns: 1fr 2fr; gap: var(--s-12); max-width: 1200px; margin: 0 auto;">
  <figure style="margin: 0;">
    <img class="img-bw" src="assets/photo-01.jpg" alt="Portrait" />
    <figcaption class="t-caption" style="margin-top: var(--s-2);">
      Paris / 2024
    </figcaption>
  </figure>

  <div>
    <div class="t-label" style="margin-bottom: var(--s-4);">ABOUT</div>
    <h2 class="t-h1" style="margin-bottom: var(--s-6);">
      I've spent twelve years making software that gets out of the way.
    </h2>
    <p style="margin-bottom: var(--s-4);">
      Before going independent, I was design lead at two editorial platforms
      and a reading app. I care about restraint, typography, and the feeling
      of a well-made tool.
    </p>
    <p>
      I take a small number of projects per year. If you'd like to talk about
      one, <a class="link t-accent" href="#contact">get in touch</a>.
    </p>
  </div>
</section>
```

## Contact section (minimal form)

```html
<section style="padding: var(--s-16) var(--s-12); max-width: 640px; margin: 0 auto;">
  <div class="t-label" style="margin-bottom: var(--s-4);">CONTACT</div>
  <h2 class="t-h1" style="margin-bottom: var(--s-8);">Start a conversation.</h2>

  <form style="display: flex; flex-direction: column; gap: var(--s-4);">
    <div>
      <label class="t-label" for="name">NAME</label>
      <input id="name" type="text"
             style="width: 100%; margin-top: var(--s-1); padding: var(--s-3); background: var(--bg); color: var(--fg); border: 1px solid var(--fg); font-family: var(--font-mono); font-size: var(--fs-body);" />
    </div>
    <div>
      <label class="t-label" for="email">EMAIL</label>
      <input id="email" type="email"
             style="width: 100%; margin-top: var(--s-1); padding: var(--s-3); background: var(--bg); color: var(--fg); border: 1px solid var(--fg); font-family: var(--font-mono); font-size: var(--fs-body);" />
    </div>
    <div>
      <label class="t-label" for="msg">MESSAGE</label>
      <textarea id="msg" rows="5"
                style="width: 100%; margin-top: var(--s-1); padding: var(--s-3); background: var(--bg); color: var(--fg); border: 1px solid var(--fg); font-family: var(--font-mono); font-size: var(--fs-body); resize: vertical;"></textarea>
    </div>
    <button class="btn btn--solid" style="align-self: flex-start; margin-top: var(--s-2);">Send →</button>
  </form>
</section>
```

## Footer

One line, muted. No newsletter signup, no link grid.

```html
<footer class="border-top" style="padding: var(--s-8) var(--s-12); display: flex; justify-content: space-between; color: var(--fg-muted);">
  <span class="t-caption">© 2026 SAM MOREAU — PARIS</span>
  <span class="t-caption">UPDATED 04 / 17 / 2026</span>
</footer>
```

## Notes on composition

- Asymmetric grids are encouraged. The sobriety of the system lets layout be playful without feeling loud.
- Max content width around 1200px. Mono body slows reading, so long measures are fine.
- Section transitions are a single 1px border, never a fill change alone.
- Whitespace does the work colour and shadow would do in another system. Leave room.
