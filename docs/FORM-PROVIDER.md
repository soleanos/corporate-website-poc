# Choix de la solution formulaire — FL2S

> **TL;DR** : Web3Forms a été retenu parce qu'il coche les 4 contraintes du projet (FTP statique, zero backend, RGPD-acceptable, gratuit pour le volume cible). Cette note explique pourquoi et donne les alternatives si on veut changer.

---

## Le problème à résoudre

| Contrainte | Détail |
|---|---|
| Hébergement | FTP 1 Go, **pas de PHP, pas de SQL, pas de Node serveur** |
| Coût | Idéalement **gratuit** sur petit volume (<100 contacts/mois) |
| RGPD | Données qui transitent en UE, pas de tracking publicitaire |
| Pas-de-vendor-lock | Le formulaire HTML reste standard, on peut changer le destinataire sans refacto |
| Sécurité | HTTPS de bout en bout, anti-spam intégré, pas de clé secrète exposée côté front |

Un site **purement statique ne peut pas envoyer d'email par lui-même** — il faut un service tiers OU le client mail de l'utilisateur (mailto:). Choix possibles :

---

## Comparatif des solutions envisagées

| Solution | Gratuit | RGPD | Sécurité | Anti-spam | Vendor lock | Verdict |
|---|---|---|---|---|---|---|
| **Web3Forms** ✅ retenu | 250 envois/mois, illimité ensuite à 8 €/mois | Serveurs UE (Allemagne) | HTTPS, clé publique (rotable) | hCaptcha intégré, honeypot | Faible (formulaire HTML standard) | Le mieux compromis pour FL2S |
| **Formspree** | 50 envois/mois (très limité) | Serveurs US par défaut, UE en paid | Bon | reCAPTCHA | Faible | Trop limité en gratuit |
| **Getform** | 50 envois/mois | UE optionnelle | Bon | Akismet | Faible | Idem |
| **Netlify Forms** | 100/mois | US | Bon | Honeypot | **Fort** (oblige hébergement Netlify) | Nope, on est sur FTP |
| **EmailJS** | 200/mois | Variable selon SMTP | Moyen (clé privée côté JS = risque) | Limité | Moyen | À éviter : clé exposée |
| **mailto:** | ∞ | OK | OK | Aucun | Aucun | Ouvre le client mail du visiteur → friction UX énorme |
| **SMTP self-host via SendGrid/SES** | 100/jour | US/UE | Excellente | À configurer | Faible | Demande un backend → exclu par FTP |

---

## Pourquoi Web3Forms gagne ici

1. **Vraiment gratuit** : 250 envois/mois suffisent largement pour un cabinet conseil.
2. **Pas de compte sur leur dashboard pour soumettre** — juste une clé publique. Si ils ferment, on change l'endpoint dans `src/lib/form.ts` → 5 minutes.
3. **Serveurs UE** (Hetzner Allemagne) → RGPD-friendly, pas de transfert hors UE.
4. **Anti-spam built-in** : honeypot + hCaptcha sans config.
5. **Clé publique** : pas un secret. Si elle fuite, on régénère gratuitement. C'est uniquement un identifiant de destinataire, pas un token d'auth donnant accès à des données.
6. **Open source** côté reception ([github.com/Surya-S-K/Web3Forms](https://github.com/Surya-S-K/Web3Forms))
7. **Fallback mailto** déjà codé dans [src/lib/form.ts](../src/lib/form.ts) — si la clé est absente, le bouton ouvre le client mail. **Le site ne casse pas.**

---

## Limites connues (à savoir)

- Pas de Service Level Agreement (SLA). Acceptable pour un site vitrine — pas pour transactionnel critique.
- Les emails reçus arrivent depuis `noreply@web3forms.com` — il faut sensibiliser le destinataire au champ "Reply-To".
- Le quota gratuit est par compte (pas par site), donc si plusieurs sites partagent la clé, ça se cumule.

---

## Comment changer plus tard

Si le volume ou les besoins changent, voici la procédure :

### Option A : passer à Formspree
1. Créer un formulaire sur formspree.io, récupérer l'endpoint `https://formspree.io/f/XXXX`
2. Dans [src/lib/form.ts](../src/lib/form.ts), remplacer `WEB3FORMS_ENDPOINT` par l'URL Formspree.
3. Supprimer l'envoi du champ `access_key`, ajouter `_replyto: data.get('email')`.

### Option B : passer à un backend SMTP managé
1. Créer un compte SendGrid / Mailjet / Brevo (ex-Sendinblue).
2. Si on n'a toujours pas de backend : utiliser leur API HTTP avec une **Cloudflare Worker** (gratuit jusqu'à 100 K req/jour) comme proxy pour ne pas exposer la clé API privée.
3. Coût : ~0 € jusqu'à 100/jour chez Brevo.

### Option C : tout passer en mailto: (zéro tiers)
Forcer `VITE_WEB3FORMS_KEY=""` dans `.env`. Le code détecte l'absence de clé et bascule automatiquement sur `mailto:` (déjà testé).

---

## Sécurité — checklist

- [x] Clé Web3Forms stockée en `.env` (jamais commit) + injectée au build via `VITE_WEB3FORMS_KEY`.
- [x] Pas de PII envoyée à des tiers analytics — RGPD safe.
- [x] HTTPS obligatoire (Web3Forms refuse les requêtes HTTP).
- [x] CSP recommandée dans `.htaccess` : `connect-src 'self' https://api.web3forms.com`.
- [x] Validation côté front + rate-limiting natif Web3Forms (5 req/min/IP).

---

*Décision validée par le générateur ui-ux-pro-max (style "Trust & Authority" → minimiser les tiers visibles).*
