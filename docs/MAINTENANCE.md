# Maintenance — survie du site sur 5+ ans

> Ce document est le filet de sécurité : si la personne qui a fait le site n'est plus dispo, **tout est ici**.

---

## Versions cibles

| Brique | Version actuelle | Notes |
|---|---|---|
| Node.js | 20 LTS | Mise à jour LTS recommandée tous les 2 ans |
| Vite | 5 | Compatible Node 18+ |
| Tailwind | 3 | Migration 4 = bouger `tailwind.config.js` (cf. doc Tailwind) |
| TypeScript | 5 | Strict mode activé |

> 🗓️ Une fois par trimestre : `npm outdated` puis `npm update` (mineurs). Une fois par an : revoir les majeurs.

---

## Que faire si…

### …il faut modifier un texte ou ajouter un service ?

→ [CONTENT-EDITING.md](CONTENT-EDITING.md). Pas besoin de dev.

### …il faut changer la couleur ou la police ?

→ Éditer `tailwind.config.js` (palette `colors` et `fontFamily`), puis push. C'est tout.
Les couleurs sont nommées `navy.*` et `emerald2.*`.

### …on veut une nouvelle section ?

1. Créer `src/components/ma-section.ts` (s'inspirer d'un fichier existant)
2. Importer + appeler `renderMaSection(...)` dans `src/main.ts`
3. Ajouter le contenu dans un nouveau JSON sous `content/`

### …on veut changer d'hébergeur ?

Le site étant 100% statique, **n'importe quel hébergement FTP fonctionne**.
- Récupérer les nouveaux identifiants FTP
- Mettre à jour les secrets GitHub (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`)
- Push → c'est redéployé.

### …on veut passer à Netlify / Cloudflare Pages / OVH Web Cloud ?

Encore plus simple :
- Netlify : "Add new site" → connecter le repo → c'est en ligne (gratuit jusqu'à 100 Go/mois).
- Cloudflare Pages : idem, gratuit avec quota généreux.
- Dans les deux cas : `npm run build`, output `dist/`.

### …on veut un domaine personnalisé ?

- Au registrar du domaine (Gandi, OVH...) : créer un `CNAME` ou `A` qui pointe vers l'IP/host fourni par l'hébergeur.
- Côté hébergeur : déclarer le domaine dans l'espace client.
- Mettre à jour `index.html` (balise `<link rel="canonical">`) + `public/sitemap.xml` + `public/robots.txt`.

### …le formulaire de contact ne marche plus ?

1. Vérifier que la clé `WEB3FORMS_KEY` est toujours valide sur <https://web3forms.com>.
2. Vérifier `contact.email` dans `content/site.json`.
3. Si Web3Forms ferme un jour : alternatives compatibles à coût similaire (gratuit) :
   - **Formspree** (changer endpoint dans `src/lib/form.ts`)
   - **Getform.io**
   - **Basin**

---

## Audit de sécurité

```powershell
npm audit
npm audit fix
```

- **Dependabot** : activer dans Settings → Security → Code security and analysis.
- **Renovate Bot** : alternative plus fine si on veut.

---

## Sauvegardes

- **Code** : Git = historique complet, rien à faire.
- **Médias dans `public/`** : si un fichier est lourd ou unique, conserver une copie hors GitHub.
- **Contenu** : tout est en JSON dans Git, donc sauvegardé.

---

## FAQ tech

**Q. Pourquoi pas WordPress ?**
R. Surface d'attaque énorme, mises à jour mensuelles obligatoires, BDD MySQL exigée. Le client veut **simple à maintenir** et a **interdit SQL/PHP** : un site statique est l'option la plus saine ici.

**Q. Pourquoi pas Next.js / Astro ?**
R. Overkill pour 1 landing page. Vite + TS vanilla = build < 5 s, bundle < 30 ko, zéro framework à maintenir dans 4 ans.

**Q. Pourquoi pas Google Fonts ?**
R. Bunny Fonts est un drop-in compatible RGPD (pas de tracking IP). Évite la bannière cookies.

**Q. Comment ajouter Plausible / Matomo (analytics RGPD) ?**
R. Ajouter le snippet dans `index.html` juste avant `</body>`. Plausible est gratuit pour un site auto-hébergé, ~9 €/mois en hébergé.

---

## Contacts mainteneurs

> ⚠️ À compléter par l'équipe FL2S.

| Rôle | Nom | Contact |
|---|---|---|
| Référent technique | … | … |
| Référent contenu | … | … |
| Hébergeur (support) | … | … |
| Domaine (registrar) | … | … |
