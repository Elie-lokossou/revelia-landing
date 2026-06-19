# Revelia — Landing Page Coach

## Projet

Site vitrine one-page pour une coach en développement personnel.
Marque fictive : **Revelia**.
Cible : personnes en surpoids qui manquent de confiance en elles.

## Stack

- **Framework** : Astro 5 + TypeScript strict
- **Styles** : CSS custom properties (`src/styles/tokens.css`, `global.css`)
- **Contenu** : `src/content/copy.fr.json`
- **Formulaire** : Web3Forms (sans backend)
- **Design reference** : patterns Sable (`.foundary/design-systems/sable/`) — tokens surchargés

## Identité visuelle

| Élément | Valeur |
|---------|--------|
| Titres | Montserrat (600–800) |
| Corps | Poppins (400–500) |
| Noir | `#0A0A0A` |
| Blanc | `#FFFFFF` |
| Rouge accent | `#E63946` |
| Règle rouge | Max 1–2 éléments rouges par viewport |

## Structure

```
src/
├── components/     # Sections Astro
├── layouts/        # BaseLayout.astro
├── pages/          # index.astro
├── styles/         # tokens.css, global.css
└── content/        # copy.fr.json
public/images/      # Photos Unsplash/Pexels uniquement
docs/               # Architecture, wireframes, journals Foundary
```

## Conventions

- Composants : PascalCase (`Hero.astro`)
- Classes CSS : BEM léger (`offer-card`, `offer-card--featured`)
- Ancres de navigation : `#accueil`, `#reconnaissance`, `#methode`, `#offres`, `#temoignages`, `#apropos`, `#faq`, `#contact`
- Pas d'images générées par IA
- Copy en français, ton empathique et direct

## Commandes

```bash
npm run dev      # http://localhost:4321
npm run build    # dist/
npm run preview  # preview production
```

## Foundary

Agents dans `.cursor/agents/`. Design system Sable dans `.foundary/design-systems/sable/`.
Workflow documenté dans `docs/WORKFLOW_FOUNDRY.md`.
