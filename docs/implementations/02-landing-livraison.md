# 02 — Landing livraison

## Objectif

Livrer la landing page complète Éclat Intérieur : 10 sections, 3 offres, formulaire contact, responsive, build production OK.

## Agents Foundary invoqués

- `/core_fullstack` — composants Astro
- `/core_generate-stubs` — témoignages, FAQ, bio
- `/core_qa` — checklist qualité
- `/core_audit-ux` — discipline rouge, typo Montserrat/Poppins
- `/core_devops` — config Vercel
- `/core_update-docs` — README, ce journal

## Décisions

| Décision | Choix |
|----------|-------|
| Astro version | 6.x (installé via create-astro ; compatible plan Astro 5) |
| Formulaire demo | Sans clé Web3Forms → message succès local |
| Images | Unsplash uniquement (CREDITS.md) |
| Deploy | vercel.json static, build local validé |

## Fichiers touchés

- `src/components/*.astro` (11 composants)
- `src/layouts/BaseLayout.astro`
- `src/pages/index.astro`
- `src/styles/tokens.css`, `global.css`
- `src/content/copy.fr.json`
- `public/images/hero.jpg`, `coach.jpg`
- `vercel.json`, `.env.example`, `README.md`

## Vérification

- [x] Navigation ancres + scroll smooth
- [x] Responsive mobile (375px) / tablette / desktop via CSS grid/flex
- [x] Contraste : texte noir sur blanc, blanc sur noir, rouge CTA avec texte blanc
- [x] Formulaire : validation HTML5 + états success/error
- [x] `npm run build` → dist/index.html OK
- [x] Aucune image IA (Unsplash + CREDITS.md)
- [x] Typo Montserrat titres / Poppins corps (Google Fonts)
- [x] Discipline rouge : CTA, badge Premium, numéros méthode, guillemets

## Commandes de vérification

```bash
npm run build    # ✓ 1 page built
npm run preview  # http://localhost:4321
```

## Deploy

Connecter le repo à [Vercel](https://vercel.com) ou exécuter `npx vercel` avec le dossier du projet.
Build command : `npm run build` · Output : `dist`

## Statut

**fait**
