# Revelia

Landing page premium pour une coach en développement personnel.

**Marque fictive** · Cible : personnes en surpoids manquant de confiance · Identité noir / blanc / rouge

## Démarrage

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/
npm run preview    # preview production
```

## Configuration

### Formulaire contact (Web3Forms)

```bash
cp .env.example .env
```

1. Créer un compte sur [Web3Forms](https://web3forms.com)
2. Générer une **Access Key** liée à votre e-mail
3. Renseigner `PUBLIC_WEB3FORMS_KEY` dans `.env`

Sans clé, le formulaire reste utilisable en **mode démo** (message explicite, pas d'envoi réel).

### Pages légales

- `/mentions-legales`
- `/politique-confidentialite`

Contenu fictif pour la marque Revelia / Camille Renard — à adapter avant mise en production.

## Stack

- Astro 5 + TypeScript
- CSS tokens custom (Montserrat + Poppins)
- Foundary Sable (patterns de référence)
- Photos Unsplash (voir `public/images/CREDITS.md`)

## Structure

| Dossier | Contenu |
|---------|---------|
| `src/components/` | Sections de la landing |
| `src/pages/` | `index.astro` + pages légales |
| `src/content/copy.fr.json` | Tous les textes |
| `src/styles/` | tokens.css + global.css |
| `docs/` | Architecture, wireframes, journals Foundary |

## Déploiement (Vercel)

Le projet est un site statique Astro. Le fichier `vercel.json` est déjà configuré.

### Option A — CLI

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

### Option B — Git (recommandé)

1. Pousser le repo sur GitHub / GitLab
2. Importer le projet sur [vercel.com/new](https://vercel.com/new)
3. Framework preset : **Astro** (détecté automatiquement)
4. Ajouter la variable d'environnement :
   - `PUBLIC_WEB3FORMS_KEY` = votre clé Web3Forms
5. Déployer

Build command : `npm run build` · Output : `dist/`

## Foundary

Agents dans `.cursor/agents/` · Design system Sable dans `.foundary/design-systems/sable/`

Workflow : [`docs/WORKFLOW_FOUNDRY.md`](docs/WORKFLOW_FOUNDRY.md)
