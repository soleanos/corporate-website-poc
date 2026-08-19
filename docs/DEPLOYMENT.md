# Guide : déployer le site sur le FTP

> Public visé : la personne qui a accès au compte d'hébergement FTP.
> À faire **une seule fois** au lancement. Ensuite, tout est automatique.

---

## Pré-requis

- Un compte GitHub avec accès **administrateur** au repository.
- Les informations de connexion **FTP** fournies par l'hébergeur (généralement par email après l'achat) :
  - Adresse du serveur (ex: `ftp.votre-hebergeur.com`)
  - Login FTP
  - Mot de passe FTP
  - Chemin du dossier web (souvent `/www/`, `/htdocs/` ou `/public_html/`)
- Une clé **Web3Forms** (gratuite) pour le formulaire de contact.

---

## Étape 1 — Obtenir une clé Web3Forms

1. Aller sur <https://web3forms.com>
2. Renseigner l'email destinataire (celui qui recevra les messages du formulaire)
3. Récupérer la **Access Key** envoyée par email (chaîne de caractères type `b1234567-abcd-...`)
4. La conserver — on l'utilise à l'étape 3.

> 💡 Web3Forms est gratuit jusqu'à 250 envois/mois. Au-delà : 8 €/mois.

---

## Étape 2 — Connecter le repo à GitHub

Si ce n'est pas déjà fait :

1. Créer un nouveau repository sur <https://github.com/new> (privé ou public)
2. Depuis le dossier du projet, en ligne de commande :

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<votre-orga>/fl2s-site.git
git push -u origin main
```

---

## Étape 3 — Configurer les secrets GitHub

> ⚠️ Ne **JAMAIS** coller les identifiants FTP en clair dans le code. On les met dans les **Secrets**, qui sont chiffrés.

1. Sur GitHub, ouvrir le repository.
2. **Settings** (en haut à droite) → **Secrets and variables** → **Actions**
3. Cliquer **New repository secret** et créer les 5 secrets suivants :

| Nom du secret | Valeur | Exemple |
|---|---|---|
| `FTP_SERVER` | Adresse du serveur FTP (sans `ftp://`) | `ftp.ovh.com` |
| `FTP_USERNAME` | Identifiant FTP | `fl2sconseil-www` |
| `FTP_PASSWORD` | Mot de passe FTP | `********` |
| `FTP_SERVER_DIR` | Dossier racine du site sur le FTP (terminer par `/`) | `/www/` |
| `WEB3FORMS_KEY` | Access Key Web3Forms | `b1234567-abcd-...` |

> 🔒 Une fois enregistrés, **vous ne pourrez plus les lire**. C'est normal. Si vous les perdez, vous pouvez les remplacer.

### Astuce — Identifier `FTP_SERVER_DIR`

Connectez-vous au FTP avec **FileZilla** (gratuit) une fois pour voir la structure :
- OVH mutualisé : `/www/`
- O2switch : `/`
- LWS : `/htdocs/`
- IONOS : `/`
- En cas de doute : demander à l'hébergeur "Quel est le chemin racine du site sur le FTP ?"

---

## Étape 4 — Premier déploiement

1. Sur le repo GitHub, onglet **Actions**
2. Sélectionner le workflow **"Deploy FL2S to FTP"** dans la liste de gauche
3. Cliquer **Run workflow** → branche `main` → **Run workflow** (bouton vert)
4. Attendre ~2 minutes. Une coche verte = c'est en ligne ✅

> 🌐 Tester ensuite l'URL du site (donnée par l'hébergeur). Si une page blanche s'affiche, vérifier que `FTP_SERVER_DIR` pointe bien sur le bon dossier.

---

## Étape 5 — Déploiements suivants

À partir de maintenant : **chaque `git push` sur `main` redéploie le site automatiquement.**

Vous pouvez aussi déclencher manuellement depuis l'onglet **Actions** à tout moment.

---

## Dépannage rapide

| Symptôme | Cause probable | Solution |
|---|---|---|
| ❌ "Authentication failed" | Mauvais user/password FTP | Vérifier les secrets, tester avec FileZilla |
| ❌ "ENOTFOUND" / serveur introuvable | `FTP_SERVER` incorrect | Pas de `ftp://` ni `https://` devant |
| ⚠️ Page blanche en ligne | Mauvais `FTP_SERVER_DIR` | Vérifier avec FileZilla le dossier qui sert le site |
| ⚠️ Formulaire ne s'envoie pas | `WEB3FORMS_KEY` manquant | Refaire l'étape 1 + 3 |
| ❌ "FTPS handshake failed" | L'hébergeur n'accepte pas FTPS | Changer `protocol: ftps` en `protocol: ftp` dans `.github/workflows/deploy.yml` (moins sécurisé) |

---

## Pour les paranos (recommandé en prod)

- Créer un **compte FTP dédié au déploiement** chez l'hébergeur, restreint au seul dossier `/www/`. Ne donner ses droits qu'à ce déploiement.
- Activer la **2FA** sur le compte GitHub.
- Activer **Branch protection** sur `main` (Settings → Branches) pour exiger une PR avant merge.
