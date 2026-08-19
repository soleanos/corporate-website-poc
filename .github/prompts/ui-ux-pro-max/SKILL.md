---
description: "UI/UX design system generator — generates palettes, typography, styles and UX guidelines for any product type. Use when building or improving visual design."
---

# ui-ux-pro-max

Outil de génération de design systems basé sur une base de données locale de 67 styles, 96 palettes, 57 paires typographiques, 99 guidelines UX et 25 types de charts.

## Emplacement

Les scripts et données sont dans `.github/prompts/ui-ux-pro-max/` :

```
.github/prompts/ui-ux-pro-max/
  PROMPT.md       ← documentation complète du workflow
  scripts/
    search.py     ← point d'entrée CLI
    core.py       ← moteur de recherche
    design_system.py ← générateur de design system
  data/           ← base CSV (styles, couleurs, typo, UX, charts, stacks)
```

## Prérequis

Python 3 doit être installé. Vérifier :

```powershell
python --version
```

## Utilisation

### Étape 1 — Générer un design system complet (OBLIGATOIRE)

Toujours commencer par `--design-system` pour obtenir des recommandations argumentées :

```bash
python .github/prompts/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

Exemple pour FL2S :

```bash
python .github/prompts/ui-ux-pro-max/scripts/search.py "service B2B consulting professional trust elegant" --design-system -p "FL2S Conseil"
```

### Étape 2 — Persister le design system (optionnel)

```bash
python .github/prompts/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

Crée `design-system/MASTER.md` + `design-system/pages/` pour les overrides par page.

### Étape 3 — Recherches complémentaires par domaine

```bash
# Styles
python .github/prompts/ui-ux-pro-max/scripts/search.py "glassmorphism dark" --domain style

# UX / accessibilité
python .github/prompts/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux

# Charts
python .github/prompts/ui-ux-pro-max/scripts/search.py "real-time dashboard" --domain chart

# Typographie
python .github/prompts/ui-ux-pro-max/scripts/search.py "elegant luxury serif" --domain typography

# Landing pages
python .github/prompts/ui-ux-pro-max/scripts/search.py "hero social-proof" --domain landing
```

### Étape 4 — Guidelines par stack technique

```bash
python .github/prompts/ui-ux-pro-max/scripts/search.py "layout responsive form" --stack html-tailwind
```

Stacks disponibles : `html-tailwind`, `react`, `nextjs`, `vue`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`, `jetpack-compose`.

## Domaines de recherche

| Domaine | Usage |
|---|---|
| `product` | Recommandations par type de produit (SaaS, e-commerce, portfolio...) |
| `style` | Styles UI (glassmorphism, brutalism, minimalism...) |
| `typography` | Paires de polices Google Fonts |
| `color` | Palettes par industrie |
| `landing` | Structure de pages, stratégies CTA |
| `chart` | Types de visualisation, librairies recommandées |
| `ux` | Best practices, anti-patterns, accessibilité |

## Règles critiques (extraites du PROMPT.md)

- **Pas d'emoji** comme icône UI → utiliser SVG (Heroicons, Lucide, Simple Icons)
- **`cursor: pointer`** sur tous les éléments cliquables
- **Hover** : transitions `color`/`opacity` 150-300ms, pas de `scale` (layout shift)
- **Light mode** : texte `#0F172A` minimum (contraste 4.5:1)
- **Focus visible** pour navigation clavier
- **`prefers-reduced-motion`** : respecter
- **Responsive** : tester 375 / 768 / 1024 / 1440 px
