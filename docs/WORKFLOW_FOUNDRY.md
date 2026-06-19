# Workflow Foundary — Éclat Intérieur

## Règle d'or

Une tâche = un agent principal + journal dans `docs/implementations/`.

## Ordre type

1. `/core_team` — routage
2. `/core_architect` — spec technique
3. `/core_designer` — wireframes + tokens
4. `/core_marketer` — copy
5. `/core_fullstack` — implémentation
6. `/core_qa` — tests
7. `/core_audit-ux` — revue UX
8. `/core_update-docs` — sync documentation

## Agents utilisés pour ce projet

| Phase | Agent | Livrable |
|-------|-------|----------|
| Setup | core_setup | CLAUDE.md, arborescence Astro |
| Kickoff | core_team | 01-kickoff.md |
| Architecture | core_architect | LANDING_ARCHITECTURE.md |
| Design | core_designer | WIREFRAMES.md, tokens.css |
| Copy | core_marketer | copy.fr.json |
| Build | core_fullstack | Composants Astro |
| Stubs | core_generate-stubs | Témoignages, FAQ |
| QA | core_qa | Checklist responsive/a11y |
| UX | core_audit-ux | Discipline rouge, typo |
| Docs | core_update-docs | 02-landing-livraison.md |

## Design system

- **Patterns** : Sable (`.foundary/design-systems/sable/`)
- **Tokens** : custom noir/blanc/rouge + Montserrat/Poppins
- **Interdit** : images IA
