# FL2S Conseil — Site vitrine

Site vitrine officiel de **FL2S Conseil — AMOA & Projets**.

> Pile minimaliste, 100 % statique, hébergeable sur n'importe quel FTP (1 Go suffisent largement). Aucun backend, aucune base de données.

---

## Sommaire

- [Aperçu rapide](#aperçu-rapide)
- [Stack technique](#stack-technique)
- [Démarrage local (5 minutes)](#démarrage-local-5-minutes)
- [Modifier le contenu (non-tech friendly)](#modifier-le-contenu-non-tech-friendly)
- [Déploiement automatique (FTP)](#déploiement-automatique-ftp)
- [Structure du projet](#structure-du-projet)
- [Maintenance dans la durée](#maintenance-dans-la-durée)
- [Aide / contact](#aide--contact)

---

## Aperçu rapide

- **Performance** : bundle JS < 30 ko gzip, score Lighthouse ≥ 95.
- **Accessibilité** : WCAG AA, navigation clavier, `prefers-reduced-motion` respecté.
- **SEO** : balises Open Graph, sitemap, robots.txt, structured data JSON-LD.
- **Vie privée** : zéro cookie, zéro tracker. Polices auto-hébergées via Bunny Fonts.
- **Formulaire de contact** : Web3Forms (gratuit, pas de backend) — fallback `mailto:` automatique si la clé n'est pas configurée.

---

## Stack technique

| Brique | Choix | Pourquoi |
|---|---|---|
| Bundler | **Vite 5** | Build instantané, sortie ultra-légère |
| Langage | **TypeScript** strict | Sécurité de typage sans framework lourd |
| UI | **Vanilla TS + Tailwind 3** | Pas de runtime React/Vue, zéro dette |
| Styles | **Tailwind + design system** custom | Cohérent, simple à étendre |
| Animations | CSS + IntersectionObserver | Aucune dépendance lourde |
| Formulaire | **Web3Forms** (HTTPS, JSON) | Gratuit, pas de backend, RGPD-friendly |
| Hébergement | **FTP statique** | 1 Go largement suffisant |
| CI/CD | GitHub Actions + `SamKirkland/FTP-Deploy-Action` | Push → site en ligne |

---

## Démarrage local (5 minutes)

**Pré-requis :** [Node.js 20+](https://nodejs.org/) installé.

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier d'environnement
cp .env.example .env
# (puis ouvrir .env et coller votre clé Web3Forms)

# 3. Lancer en mode développement
npm run dev
```

→ Site accessible sur <http://localhost:5173>

### Scripts disponibles

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de dev (hot reload) |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Sert le build local (port 4173) |
| `npm run typecheck` | Vérifie les types TS |
| `npm run format` | Formate tous les fichiers (Prettier) |

### Démarrage en un double-clic (Windows)

- `start.ps1` — lance le serveur de dev (installe les deps si besoin)
- `stop.ps1` — arrête proprement le serveur

---

## Modifier le contenu (non-tech friendly)

**Tout le contenu éditable se trouve dans le dossier [`content/`](content/).**

Pas besoin d'éditeur de code lourd : un simple Notepad++, VS Code ou même le Bloc-notes Windows suffit. Tous les fichiers sont au format **JSON** (texte structuré).

| Fichier | Contient |
|---|---|
| [`content/site.json`](content/site.json) | Textes généraux : titres, baseline, email de contact, navigation, SEO… |
| [`content/services.json`](content/services.json) | La liste des expertises (AMOA, pilotage, etc.) |
| [`content/team.json`](content/team.json) | Les membres de l'équipe |
| [`content/faq.json`](content/faq.json) | Les questions/réponses fréquentes |

➡️ **Guide pas à pas illustré** : [docs/CONTENT-EDITING.md](docs/CONTENT-EDITING.md)

Après modification : commitez (ou utilisez l'interface GitHub directement dans le navigateur), poussez sur `main`, le site se met à jour seul **en moins de 2 minutes**.

---

## Déploiement automatique (FTP)

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) gère tout. Vous n'avez qu'à configurer **5 secrets GitHub une seule fois**.

➡️ **Guide pas à pas (avec captures)** : [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

Résumé :

1. Allez dans **Settings → Secrets and variables → Actions** sur le repo GitHub
2. Ajoutez :
   - `FTP_SERVER`
   - `FTP_USERNAME`
   - `FTP_PASSWORD`
   - `FTP_SERVER_DIR` (ex: `/www/`)
   - `WEB3FORMS_KEY`
3. Faites un push sur `main` → c'est en ligne.

---

## Structure du projet

```
fl2s/
├── content/              ← TEXTES À MODIFIER (JSON éditables par tous)
│   ├── site.json
│   ├── services.json
│   ├── team.json
│   └── faq.json
├── public/               ← Fichiers servis tels quels (logo, robots, légal)
│   ├── logo.png
│   ├── mentions-legales.html
│   ├── confidentialite.html
│   ├── robots.txt
│   └── sitemap.xml
├── src/                  ← Code source
│   ├── main.ts
│   ├── style.css         ← Design system (Tailwind + tokens)
│   ├── components/       ← Sections du site
│   └── lib/              ← Form, animations
├── docs/                 ← DOC POUR HUMAINS
│   ├── CONTENT-EDITING.md
│   ├── DEPLOYMENT.md
│   └── MAINTENANCE.md
├── .github/workflows/    ← CI + déploiement FTP
├── spec/                 ← Spec, plaquette, logo
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── start.ps1             ← Lancement local (Windows)
└── stop.ps1              ← Arrêt local (Windows)
```

---

## Maintenance dans la durée

- **Mise à jour des dépendances** : `npm outdated` puis `npm update` une fois par trimestre.
- **Sécurité** : Dependabot est activable en 1 clic (Settings → Security → Dependabot alerts).
- **Sauvegardes** : tout est dans Git → l'historique est la sauvegarde.
- **Aucun secret dans le repo** : tout passe par GitHub Secrets.

➡️ Guide complet : [docs/MAINTENANCE.md](docs/MAINTENANCE.md)

---

## Aide / contact

- Question technique : [docs/MAINTENANCE.md](docs/MAINTENANCE.md) → section "FAQ tech"
- Bug visuel ou contenu : ouvrir une **Issue** sur ce repo
- Demande urgente : voir le contact mainteneur dans `docs/MAINTENANCE.md`

---

© FL2S Conseil. Site construit dans une logique sobre : pas de bullshit, pas de bloat, du code qui dure.
