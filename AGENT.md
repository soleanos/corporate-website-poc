# AGENT.md — FL2S Conseil

> Constitution du projet FL2S landing page. Toute modification doit respecter ces règles.

---

## 1. Identité

| Champ | Valeur |
|---|---|
| Nom | FL2S Conseil |
| Activité | AMOA & Pilotage de projets |
| Tagline | AMOA & Projets |
| Baseline | Faire avancer vos projets, sans bruit, avec méthode. |
| Ton éditorial | Sobre, direct, professionnel. Pas de buzzwords. |
| Email contact | `contact@fl2s-conseil.fr` |

---

## 2. Charte graphique — couleurs officielles

Extraites du logo officiel FL2S. **Aucune couleur ne doit être inventée — utiliser uniquement celles ci-dessous.**

### Couleurs principales

| Rôle | Nom Tailwind | HEX | RGB | Usage |
|---|---|---|---|---|
| **Primaire** | `navy` / `navy-700` | `#1C5565` | 28, 85, 101 | Titres, navbar, texte principal |
| Primaire soft | `navy-500` | `#376A78` | 55, 106, 120 | Hover léger, sous-titres |
| Primaire dark | `navy-800` | `#244F58` | 36, 79, 88 | Hover sombre, bordures profondes |
| Secondaire (Conseil) | `navy-600` | `#1E5462` | 30, 84, 98 | Sous-titres, séparateurs, icônes |
| Bleu nuit profond | `navy-900` | `#2C4B5E` | 44, 75, 94 | Fonds sombres (footer, expertises) |

### Couleurs secondaires (AMOA & Projets — verts)

| Rôle | Nom Tailwind | HEX | RGB | Usage |
|---|---|---|---|---|
| **Secondaire** | `emerald2` / `emerald2-600` | `#5A8A58` | 90, 138, 88 | Accent vert, boutons secondaires, eyebrow |
| Variante claire | `emerald2-500` | `#608D5E` | 96, 141, 94 | Survol, badges, pictos verts |
| Vert olive | `emerald2-300` / `emerald2-400` | `#7E9B73` / `#7F9D6F` | 126,155,115 / 127,157,111 | Éléments verts légers |
| Vert pastel | `emerald2-200` | `#9FB798` | 159, 183, 152 | Fond carte vert doux |
| Vert profond | `emerald2-700` | `#3F6B4D` | 63, 107, 77 | Texte vert sur fond clair |

### Dégradé du "2" dans FL2S

| Zone | HEX | RGB |
|---|---|---|
| Vert clair olive | `#7F9D6F` | 127, 157, 111 |
| Vert/teal moyen | `#58846D` | 88, 132, 109 |
| Teal profond | `#3C7269` | 60, 114, 105 |
| Bleu-vert | `#448491` | 68, 132, 145 |
| Bleu clair grisé | `#6A979D` | 106, 151, 157 |
| Reflet très clair | `#D6EAEA` | 214, 234, 234 |

### Accent teal (logo gauche)

| Rôle | Nom Tailwind | HEX | RGB | Usage |
|---|---|---|---|---|
| **Accent teal** | `accent` | `#60949E` | 96, 148, 158 | Liens hover, focus ring, highlights |
| Aqua clair | `accent-200` | `#6A979D` | 106, 151, 157 | Étiquettes sur fond sombre |
| Teal intermédiaire | `navy-400` | `#5B8680` | 91, 134, 128 | Texte atténué |
| Reflet clair | `accent-50` | `#D6EAEA` | 214, 234, 234 | Fond highlight |

### Fonds

| Rôle | Nom Tailwind | HEX | Usage |
|---|---|---|---|
| Fond principal | `sand-50` | `#F3F8F6` | Body background |
| Fond carte | `white` | `#FFFFFF` | Cartes, formulaires |
| Fond sombre | `navy-900` / `ink-900` | `#2C4B5E` / `#1C5565` | Footer, sections inversées |

### Résumé CSS (pour référence rapide)

```css
:root {
  --color-primary: #1C5565;
  --color-primary-dark: #244F58;
  --color-primary-soft: #376A78;
  --color-secondary: #5A8A58;
  --color-secondary-light: #7F9D6F;
  --color-secondary-soft: #9FB798;
  --color-accent-teal: #60949E;
  --color-accent-aqua: #76A6AA;
  --color-accent-light: #D0E2DD;
  --color-background: #FFFFFF;
  --color-background-soft: #F3F8F6;
  --color-text-main: #1C5565;
  --color-text-muted: #5B8680;
}
```

---

## 3. Typographie

| Usage | Police | Fallback |
|---|---|---|
| Titres + UI | **Lexend** | system-ui, sans-serif |
| Texte courant / prose | **Source Sans 3** | Source Sans Pro, system-ui, sans-serif |
| Chargement | Bunny Fonts (RGPD-friendly, pas Google) |

---

## 4. Stack technique

| Couche | Choix | Contrainte |
|---|---|---|
| Build | Vite 5 + TypeScript strict | Aucun framework (pas React/Vue) |
| CSS | Tailwind 3 + PostCSS | Palette custom uniquement (pas de couleurs Tailwind par défaut inventées) |
| Formulaire | Web3Forms (optionnel) | Fallback `mailto:` automatique si clé absente |
| Hébergement | FTP statique 1 Go | **Pas de PHP, pas de SQL, pas de Node serveur** |
| Déploiement | GitHub Actions → FTP via FTPS |
| Contenu | JSON éditables dans `content/` | Non-dev friendly |

---

## 5. Règles UI/UX (source : `ui-ux-pro-max`)

Le design system est généré via le prompt local `.github/prompts/ui-ux-pro-max/` :

```powershell
python .github/prompts/ui-ux-pro-max/scripts/search.py "<query>" --design-system -p "FL2S Conseil"
```

### Règles obligatoires

- **Pas d'emoji** comme icône → SVG inline uniquement (Heroicons/Lucide style)
- **`cursor: pointer`** sur tout élément cliquable
- **Transitions hover** : 150–300 ms, pas de `scale` (cause des layout shifts) → utiliser `translateY`, `color`, `opacity`
- **Contraste** : texte sur fond clair ≥ 4.5:1 WCAG AA
- **Focus visible** : `:focus-visible` avec outline `accent` (`#60949E`)
- **`prefers-reduced-motion`** : respecté (animations désactivées)
- **Responsive** : testé 375px / 768px / 1024px / 1440px
- **Pas de gradient AI** (purple/pink) — identité FL2S = bleu-vert / nature / tech douce

### Avant livraison

- [ ] Aucune couleur hors charte utilisée
- [ ] Pas d'emoji UI
- [ ] Focus clavier visible
- [ ] Formulaire fonctionne en mode mailto (sans Web3Forms)
- [ ] Build Vite propre (`npm run build`)
- [ ] Lighthouse > 90 en Performance + Accessibility

---

## 6. Structure du projet

```
fl2s/
  content/          ← JSON éditables (site, services, team, faq)
  src/
    main.ts         ← orchestrateur
    style.css       ← design system Tailwind
    lib/            ← utilitaires (form.ts, reveal.ts)
    components/     ← fonctions render retournant du HTML string
  public/           ← logo, robots, sitemap, pages légales
  .github/
    workflows/      ← CI + deploy FTP
    prompts/
      ui-ux-pro-max/ ← outil de génération design system
  docs/             ← guides non-tech
```

---

## 7. Contenu éditorial

### Ton

- Sobre, professionnel, sans jargon marketing creux
- Pas de superlatifs ("leaders", "experts n°1", "révolutionnaire")
- Ne **jamais** mentionner un départ d'un grand groupe ou une reconversion
- Valoriser : indépendance, continuité des équipes, pragmatisme, résultats concrets

### Formulations interdites

- "Nous avons quitté un grand groupe"
- "Startup / scale-up mindset"
- "Disruption / innovation de rupture"
- Tout anglicisme inutile quand un mot français existe

---

## 8. Sécurité

- Aucun secret dans le code source — tout passe par `.env` ou GitHub Secrets
- CSP recommandée : `connect-src 'self' https://api.web3forms.com`
- Pas de cookie tiers, pas de tracker, pas d'analytics invasif
- HTTPS obligatoire
