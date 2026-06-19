# Sable Design System

> Central entry point for agents, designers, and developers. English is the source of truth; French is a mirror translation.

A minimalist, cold-yet-tactile design system. Sandy background (`#EAEAEA`) with a subtle noise overlay, a single sparingly-used purple accent (`#7B61FF`), two typefaces (Inter 900 + Space Mono), zero rounding, 1px borders. Sober, confident, without ornament.

## Live showcase

Open [`Sable Design System.html`](Sable%20Design%20System.html) via a local HTTP server:

```sh
python3 -m http.server 8000
# http://localhost:8000/Sable%20Design%20System.html
```

The showcase contains one agent pack section, six rendered documentation sections, and the component/token specimens.

## Documentation

Written for agents — dense, snippet-heavy, copy-paste ready.

### English (source)

1. [docs/en/00-overview.md](docs/en/00-overview.md) — what it is, how to integrate, entry points
2. [docs/en/01-tokens.md](docs/en/01-tokens.md) — colour, type, spacing, geometry, motion
3. [docs/en/02-typography.md](docs/en/02-typography.md) — the two families, rules, accent discipline
4. [docs/en/03-components.md](docs/en/03-components.md) — every component with HTML snippet
5. [docs/en/04-patterns.md](docs/en/04-patterns.md) — composed sections (hero, work list, contact, black block)
6. [docs/en/05-do-and-dont.md](docs/en/05-do-and-dont.md) — final checklist, red flags

### Français (miroir)

1. [docs/fr/00-overview.md](docs/fr/00-overview.md)
2. [docs/fr/01-tokens.md](docs/fr/01-tokens.md)
3. [docs/fr/02-typography.md](docs/fr/02-typography.md)
4. [docs/fr/03-components.md](docs/fr/03-components.md)
5. [docs/fr/04-patterns.md](docs/fr/04-patterns.md)
6. [docs/fr/05-do-and-dont.md](docs/fr/05-do-and-dont.md)

The same docs are rendered inline in the showcase under the **Documentation** section, with EN/FR toggle and a `Copy .md` button per section. A `Copy full prompt for agent` button at the top concatenates the 6 docs into a single system prompt ready to paste into Claude, ChatGPT, Cursor, or any agent.

## Repo structure

```
.
├── DESIGN-SYSTEM.md              ← you are here
├── README.md                     authored brief (detailed, pre-existing)
├── CLAUDE.md                     agent instructions for this repo
├── SKILL.md                      agent-skill manifest (user-invocable)
├── Sable Design System.html      unified showcase entry
├── colors_and_type.css           single source of truth: tokens + semantic classes
├── assets/
│   ├── shell.css                 showcase-only shell styles (sidebar + preview layout)
│   ├── noise.png                 256×256 grain texture (opacity 0.04)
│   ├── logo.svg                  typographic logo mark
│   └── photo-0[1-6].jpg          sample imagery (always grayscaled via .img-bw)
├── preview/                      legacy standalone specimens (kept as reference)
├── partials/                     showcase section partials (loaded into the shell)
├── ui_kits/                      reference product kits (React + Babel CDN)
│   ├── portfolio/                personal portfolio site (full composition)
│   ├── certicraft/
│   └── hebergea/
└── docs/
    ├── en/                       source-of-truth docs
    └── fr/                       mirror translations
```

## For agents building with this system

Read [docs/en/00-overview.md](docs/en/00-overview.md) first. It tells you which file to open next based on what you're building.

Minimum viable integration:

```html
<link rel="stylesheet" href="colors_and_type.css" />
<body class="grain">
  <!-- content -->
</body>
```

Load Inter 900 + Space Mono (400, 700) from Google Fonts — see the overview doc for the exact `<link>` block.

## Also available

- [SKILL.md](SKILL.md) — agent-skill manifest. Invoke as `sable-design` to scaffold Sable-branded artifacts from a prompt.
- [ui_kits/portfolio/](ui_kits/portfolio/) — reference portfolio site that demonstrates Sable in full composition. Open `ui_kits/portfolio/index.html` via a local server (it loads React + Babel from CDN).
