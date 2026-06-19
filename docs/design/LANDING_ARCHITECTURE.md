# Landing Architecture — Éclat Intérieur

## 1. Overview

Landing page statique one-page pour la coach fictive Éclat Intérieur.
Objectif : convertir les visiteuses en demandes d'appel découverte via formulaire contact.

## 2. Stack

| Couche | Choix |
|--------|-------|
| Framework | Astro 5 + TypeScript |
| Styles | CSS tokens + global.css |
| Contenu | copy.fr.json (import statique) |
| Formulaire | Web3Forms (POST fetch, access_key env) |
| Images | public/images/ (Unsplash/Pexels) |
| Deploy | Vercel / Netlify static |

## 3. Composants

```
BaseLayout.astro
├── Header.astro          (sticky, nav ancres, CTA)
├── Hero.astro            (#accueil)
├── Empathy.astro         (#reconnaissance)
├── QuoteBlock.astro      (bloc noir citation)
├── Method.astro          (#methode)
├── Offers.astro          (#offres)
│   └── OfferCard.astro   (props: offer object)
├── Testimonials.astro    (#temoignages)
├── About.astro           (#apropos)
├── FAQ.astro             (#faq)
├── ContactForm.astro     (#contact)
└── Footer.astro
```

## 4. Props — OfferCard

```typescript
interface Offer {
  id: string;
  name: string;
  tagline: string;
  price: string;
  currency: string;
  featured: boolean;
  badge?: string;
  features: string[];
  cta: string;
}
```

## 5. Formulaire contact

- Champs : prénom (required), email (required), message (optional)
- Action : `https://api.web3forms.com/submit`
- Access key : variable d'environnement `PUBLIC_WEB3FORMS_KEY` ou placeholder demo
- États : idle, loading, success, error (client-side JS minimal)

## 6. SEO

- `<title>` et `<meta description>` depuis copy.fr.json
- `lang="fr"` sur `<html>`
- Images avec alt descriptif
- Structure sémantique : header, main, section, footer

## 7. Responsive breakpoints

| Breakpoint | Comportement |
|------------|--------------|
| < 768px | Nav hamburger, cartes offres empilées |
| 768–1024px | Grille 2 colonnes méthode, offres en colonne |
| > 1024px | Layout complet, offres en 3 colonnes |

## 8. Fichiers touchés

- `src/pages/index.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/*.astro`
- `src/styles/tokens.css`, `global.css`
- `src/content/copy.fr.json`
- `public/images/*`
