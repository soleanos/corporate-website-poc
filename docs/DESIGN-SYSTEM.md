# Design system FL2S — généré par `ui-ux-pro-max`

> Source : prompt local [`.github/prompts/ui-ux-pro-max/PROMPT.md`](../.github/prompts/ui-ux-pro-max/PROMPT.md) + script Python [`scripts/search.py`](../.github/prompts/ui-ux-pro-max/scripts/search.py).
>
> Commande exécutée :
>
> ```powershell
> python .github/prompts/ui-ux-pro-max/scripts/search.py "service B2B consulting professional trust elegant" --design-system -p "FL2S Conseil"
> ```

## Résultat appliqué au site

| Domaine | Recommandation `ui-ux-pro-max` | Implémenté dans FL2S |
|---|---|---|
| **Pattern** | Hero + Testimonials + CTA — social proof avant CTA | `src/components/{hero,approach,expertises,team,faq,contact}.ts` — pattern respecté |
| **Style** | Trust & Authority (certificats, métriques, badges) | Palette + typographie + ton éditorial alignés |
| **Couleur primaire** | `#0F172A` (slate-900 / navy) | `tailwind.config.js → navy.DEFAULT` |
| **Couleur secondaire** | `#334155` (slate-600) | `navy-600` |
| **CTA** | `#0369A1` (sky-700) | `cta.DEFAULT` + alias `emerald2` (rétro-compat) |
| **Background** | `#F8FAFC` (slate-50) | `src/style.css → body` |
| **Texte** | `#020617` (slate-950) | `body color` |
| **Typographie** | Lexend + Source Sans 3 | `index.html` (Bunny Fonts), `tailwind.config.js → fontFamily.sans` |
| **Effets clés** | Badge hover, metric pulse, stat reveal, smooth transitions | `style.css → .card`, `[data-reveal]`, `prefers-reduced-motion` |
| **À éviter** | Contenu générique, gradients AI purple/pink | OK : zéro gradient flashy, contenu sectoriel B2B |

## Checklist livraison (extraite du PROMPT.md)

- [x] Pas d'emoji comme icône (on utilise des SVG inline)
- [x] `cursor: pointer` sur tous les éléments cliquables (`a, button, [role="button"]` via `style.css`)
- [x] Transitions hover smooth (150-300 ms)
- [x] Light mode : contraste texte ≥ 4.5:1 (navy `#020617` sur `#F8FAFC` = 18.4:1)
- [x] Focus visible pour navigation clavier (`:focus-visible { outline: 2px solid #0369A1 }`)
- [x] `prefers-reduced-motion` respecté (CSS media query)
- [x] Responsive testé 375 / 768 / 1024 / 1440 px (Tailwind breakpoints sm/md/lg/xl)

## Pour itérer / explorer

```powershell
# Plus d'options de style
python .github/prompts/ui-ux-pro-max/scripts/search.py "trust authority B2B" --domain style

# Conseils UX accessibilité
python .github/prompts/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux

# Charts (si on ajoute un dashboard)
python .github/prompts/ui-ux-pro-max/scripts/search.py "kpi metrics dashboard" --domain chart

# Best practices Tailwind
python .github/prompts/ui-ux-pro-max/scripts/search.py "responsive form layout" --stack html-tailwind

# Persister le design system (Master + overrides par page)
python .github/prompts/ui-ux-pro-max/scripts/search.py "service B2B consulting" --design-system --persist -p "FL2S Conseil"
```

## Anti-patterns évités (consigne du prompt)

- Pas d'emoji UI
- Pas de bouton `bg-white/10` invisible en light mode → on utilise `bg-white` opaque
- Pas de bordure `border-white/10` invisible → `border-navy/15`
- Pas de navbar collée bord-à-bord en haut → spacing géré
- Pas de `scale` au hover (cause des shifts) → on utilise `translate-y` et `color`
