# Valoriser le potentiel des données

Support de la formation **« Valoriser le potentiel des données »** (DIGIT, 1 h, niveau débutant, pratique) : une présentation en bande dessinée où Rémi construit, avec l’aide de Delos, une base de données des librairies du territoire dans Excel, puis la valorise avec la DIGIT (annuaire, tableau de bord).

- **En ligne** : https://digit-seine-ouest.github.io/formation_bdd/
- **Page usagers (annuaire)** : https://digit-seine-ouest.github.io/formation_bdd/annuaire.html

## Lancer en local

Prérequis : [Node.js](https://nodejs.org/) 22 ou plus récent (npm est fourni avec).

```bash
git clone https://github.com/DIGIT-Seine-Ouest/formation_bdd.git
cd formation_bdd
npm install        # une seule fois (ou après un changement de dépendances)
npm run dev        # lance la présentation
```

Ouvrir ensuite **http://localhost:5173/** (l’annuaire : http://localhost:5173/annuaire.html).
Les modifications du code s’affichent aussitôt dans le navigateur. `Ctrl + C` dans le terminal pour arrêter.

Pour vérifier la version exactement comme elle sera publiée :

```bash
npm run build      # compile dans dist/
npm run preview    # puis ouvrir http://localhost:4173/formation_bdd/
```

> Une connexion internet est nécessaire pendant la séance : polices Google Fonts et pages des villes affichées en direct (épisode 5).

## Pendant la présentation

| Touche | Action |
|---|---|
| `→` ou `Espace` | étape suivante (les bulles et cases apparaissent une par une) |
| `←` | étape précédente |
| `Échap` | vue d’ensemble de toutes les slides |
| `F` | plein écran |

L’adresse change à chaque slide (`#/12` …) : on peut ouvrir directement une slide précise.

## Publier

Chaque `git push` sur `main` redéploie automatiquement le site sur GitHub Pages (workflow `.github/workflows/deploy.yml`, environ 1 minute).

## Le kit téléchargeable

Les fichiers de `public/ressources/` (gabarit Excel, correction, cheat sheet, guide de construction) sont générés par un script Python :

```bash
pip install openpyxl python-docx
python3 scripts/build_ressources.py
```

⚠️ Le classeur `correction_suivi_librairies.xlsx` a été retouché dans le vrai Excel (tableau croisé dynamique, listes déroulantes) : le script ne l’écrase que si on ajoute `--correction`, et il perdrait alors ces retouches.

## Où modifier quoi

| Dossier / fichier | Contenu |
|---|---|
| `src/slides/` | un fichier par épisode : `Ouverture`, `Ep1Mission`, `Ep2Theorie`, `Ep3Tuto`, `Ep4Pratique`, `Ep5Valoriser`, `Final` |
| `src/components/` | les briques : bulles et cases de BD, personnages, écrans Excel, annuaire, tableau de bord, vitrine des villes |
| `src/remi.js` | les données : les 17 librairies de GPSO et la population des communes |
| `src/styles.css` | le style de la présentation |
| `CLAUDE.md` | la trame détaillée et les conventions du projet |

Données : *Base des librairies en France* (ministère de la Culture, data.gouv.fr, Licence Ouverte 2.0) et populations légales INSEE (geo.api.gouv.fr).

---

Reprendre la session Claude Code : `claude --resume f58caebf-abd8-4194-9217-c8c36666c7ed`
