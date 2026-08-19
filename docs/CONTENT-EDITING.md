# Guide : modifier le contenu du site

> Public visé : **toute personne**, même non-développeuse.
> Pré-requis : un compte GitHub avec accès au repository.

Tout le contenu textuel et visuel modifiable se trouve dans le dossier **`content/`**. Les fichiers sont au format **JSON** : c'est juste du texte, avec une structure simple à respecter.

---

## 1. Modifier directement sur GitHub (le plus simple)

1. Ouvrir le repository sur **github.com**
2. Aller dans le dossier `content/`
3. Cliquer sur le fichier à modifier (ex : `site.json`)
4. Cliquer sur l'icône **crayon** ✏️ en haut à droite
5. Modifier le texte
6. En bas de la page, mettre un titre court (ex : "MAJ baseline")
7. Cliquer sur **Commit changes** → choisir "Commit directly to the `main` branch"
8. **C'est en ligne sous 2 minutes** ⏱️ (le déploiement automatique se déclenche)

> 💡 Pour suivre le déploiement : onglet **Actions** du repo. Une coche verte = c'est en ligne.

---

## 2. Règles de syntaxe à respecter (JSON)

Le format JSON est très simple, mais quelques règles strictes :

### ✅ Bon

```json
{
  "title": "Mon titre",
  "items": ["un", "deux", "trois"]
}
```

### ❌ Erreurs fréquentes à éviter

| Erreur | Mauvais | Bon |
|---|---|---|
| Virgule en trop à la fin | `"a", "b",` | `"a", "b"` |
| Guillemets simples | `'titre'` | `"titre"` |
| Sauts de ligne dans une chaîne | `"ligne1\nligne2"` | OK (`\n` est explicite) |
| Apostrophe non échappée | `"l'équipe"` | `"l'équipe"` (OK, mais attention aux guillemets droits `"`) |

🛟 **En cas de doute, validez votre fichier ici** : <https://jsonlint.com>

---

## 3. Que peut-on modifier dans chaque fichier ?

### `content/site.json`

| Champ | Description |
|---|---|
| `brand.name` | Nom court (ex: "FL2S") |
| `brand.tagline` | Petite phrase sous le logo (ex: "AMOA & Projets") |
| `brand.baseline` | Phrase d'accroche du footer |
| `seo.title` | Titre dans l'onglet du navigateur (≤ 60 caractères) |
| `seo.description` | Description Google (≤ 160 caractères) |
| `contact.email` | **L'email qui reçoit les messages du formulaire** |
| `contact.phone` | Numéro affiché (laisser `""` pour cacher) |
| `nav` | Liens du menu en haut |
| `hero.title` | Grand titre d'accueil (utiliser `\n` pour un retour à la ligne) |
| `hero.subtitle` | Sous-titre |
| `hero.stats` | Les 3 chiffres mis en avant |
| `approach.pillars` | Les 4 "valeurs" / piliers |

### `content/services.json`

Liste des expertises. Champs par service :

- `title` : nom de l'expertise (ex: "AMOA")
- `summary` : résumé en 1-2 phrases
- `items` : liste des sous-prestations
- `icon` : icône (choisir parmi : `compass`, `target`, `trending-up`, `search`)

### `content/team.json`

Liste des membres. Champs :

- `name`, `role`, `bio`
- `linkedin` : URL complète ou `""` pour cacher
- `photo` : chemin vers une photo dans `/public/team/` (optionnel)

### `content/faq.json`

Liste questions/réponses. Champs : `question`, `answer`.

---

## 4. Ajouter une photo

1. Mettre l'image (format `.jpg`, `.webp` ou `.png`, **moins de 500 ko**) dans `public/team/`
2. Dans `team.json`, mettre `"photo": "/team/nom-prenom.jpg"`

> 🖼️ Conseil : recadrer en carré 600×600 px. Outils gratuits : [squoosh.app](https://squoosh.app) pour compresser.

---

## 5. En cas de problème

- **Le site ne se met pas à jour ?** → onglet **Actions** : si une croix rouge, cliquer pour voir l'erreur. C'est souvent un JSON mal fermé.
- **Annuler une modification ?** → onglet **Commits** → cliquer sur le commit problématique → bouton "Revert".
- **Vous avez cassé quelque chose ?** → tout est versionné, on revient toujours en arrière sans perte.

🆘 Contact technique : voir [MAINTENANCE.md](MAINTENANCE.md).
