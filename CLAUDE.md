# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Support of the 1-hour **beginner, hands-on** session **« Valoriser le potentiel des données »** (DIGIT Formation, GPSO). Event pitch to deliver: *des données bien structurées permettent de gagner du temps et d'améliorer la lisibilité de l'information ; bonnes pratiques essentielles pour faciliter leur exploitation.*

**Content = the earlier "mobility" training (cheat sheet + guide de construction), lighter and told as a comic (BD).** Core message: **j'enregistre ≠ je présente** — a table made for the machine (onglet `saisie`) is not a view made for the eye (onglet `synthese`, TCD). When they are separated, every update propagates by itself. Then the data goes from a simple Excel to the general public: **le cercle vertueux de la data** (lignage).

**No "bad file" anywhere** (the old Friday 17:45 « vite fait » file was removed on 17/11/2026: it could hurt people who recognise their own files). Each step states a positive « règle », never a trap.

**Characters** (SVG, `src/components/Personnages.jsx`): **Rémi** (DSI GPSO, "Data Hero"; drawn, not his photo — the site is public) who asks Delos *everything*; **Delos** (the AI assistant, teal eye — it does the teaching); **Super Nanny** (key `nanny`; invented, deliberately playful nickname so that no real person feels targeted; always has a 15:00 meeting; announces the new bookshop in the update scene); **La DIGIT**.

Storyline (one file per episode in `src/slides/`), 29 slides, ~55 min:
0. `Ouverture` — cover + casting.
1. `Ep1Mission` — the mail with 4 real objectives (`OBJECTIFS`).
2. `Ep2Theorie` — « Delos, c'est quoi une base de données ? » → BIM: (1) shopping list → ARTICLE → table; (2) rebound on **entité = LIBRAIRIE**, the table built element by element on click (entité → attributs from the objectives → enregistrement → valeur → identifiant), each with its « courses » equivalent; test de la phrase; Delos: « le total ? on le présentera à part ».
3. `Ep3Tuto` — **J'ENREGISTRE** (8 steps, starting FROM the Ep. 2 structure id · librairie · assortiment · label · commune): en-têtes · une ligne = une librairie + Ctrl+T · une case = une info · rien dans la couleur (MFC `=$D2="LIR"`) · listes déroulantes · identifiant unique · jointure RECHERCHEV + `communes` · `annee_suivi`. Each step: Rémi → Delos → 📏 la règle → 💡 le geste, on a Windows Excel mock-up (`etapeSaisie(n)`) with the ribbon button outlined and the dialog as a fragment. Then **JE PRÉSENTE**: « Maintenant, je présente… ça ? » (raw table, stamp « Pas présentable ») → j'enregistre ≠ je présente (liste / ticket de caisse) → onglet `synthese` = **3 big key figures** (`=NBVAL(saisie!A:A)-1` 17 · `=NB.SI(saisie!D:D;"LIR")` 3 · `=A3/SOMME(communes!C:C)*10000` 0,54) **+ 3 « talking » pivot tables side by side, each titled by the question it answers, headers renamed**: ① Où sont les librairies ? (Commune · Nombre de librairies) ② Quelles spécialités ? (Spécialité · Nombre de librairies) ③ Où sont les labellisées ? (Commune · Labellisées (LIR)) — never « Étiquettes de lignes » / « Nombre de id » / « Total général » on screen → TCD how-to (incl. the « renommer » gesture: Paramètres des champs de valeurs › Nom personnalisé) → **one simple update panel** « Mardi, 14 h 02 : une librairie ouvre » (Super Nanny: a bookshop opens in Vanves (example) → ① j'enregistre: Rémi adds one row LIB018 in saisie (rows 17-19, table headers frozen) → ② je présente: clic droit › Actualiser, 17 → 18 and Vanves 1 → 2 → « Déjà ?! »). The old 3-questions slide was removed (17/11/2026).
4. `NotesRemi` — « Les notes de Rémi » (replaces the old « À vous ! » exercise, removed 17/11/2026 — the audience are adults, no exercise/timer): one notebook slide, **d'une part j'enregistre** (the 8 rules of the tuto) / **d'autre part je présente** (onglet à part, tout calculé, TCD qui répondent à une question, en-têtes parlants, Actualiser) + « Soignez l'enregistrement, la présentation suit toute seule. »
5. `Ep4Valoriser` (Épisode 4) — the DIGIT carries the story: Rémi calls → DIGIT « oui, ensemble : un annuaire pour les habitants et un tableau de bord dynamique pour ton équipe », nothing to retype → **Résultat n°1** the users' page (`Annuaire`, also standalone at `annuaire.html`) → **Résultat n°2** the dynamic dashboard (`TableauDeBord`: commune filter + click on a bar, 4 key figures (same formulas as `synthese` + Généralistes), bars by commune and by speciality, hover detail, « Tableau » view) → DIGIT: « on l'a déjà fait avec Meudon, Sèvres, Boulogne » (`Vitrine` iframes) → DIGIT concludes: **« Le cercle vertueux de la data »**.
6. `Final` — the kit + « Appelez la DIGIT » (what Rémi learned now lives in `NotesRemi`).

Data (`src/remi.js`): 17 GPSO bookshops from *Base des librairies en France* (Ministère de la Culture, data.gouv.fr, LO 2.0; Chaville included, Saint-Cloud is not GPSO) + legal populations (geo.api.gouv.fr). Never invent facts about the real bookshops (Rémi's "Visite" column is his own internal note).

## Kit (`public/ressources/`, generated by `python3 scripts/build_ressources.py`, needs openpyxl + python-docx)
`gabarit_base.xlsx` (blank, to start one's own base: saisie · listes · synthese · dictionnaire), `correction_suivi_librairies.xlsx` (saisie = Excel table `T_saisie` id · librairie · assortiment · label · code_commune · commune (RECHERCHEV) · annee_suivi, dropdowns + MFC · listes · communes · synthese (4 key figures + TCD) · **TCD** added in real Excel, so the script won't overwrite this file unless `--correction` · dictionnaire), `cheat_sheet_librairies.docx`, `guide_construction_librairies.docx` (wording: j'enregistre / je présente). The Excel screens in the slides must match these files.

## Stack

Vite + React + Reveal.js 5 (`npm run dev`, `npm run build`), deployed to GitHub Pages by `.github/workflows/deploy.yml` on push to `main` (base path `/formation_bdd/`). Live iframes → internet needed during the session.

| Path | Role |
|---|---|
| `src/App.jsx` | Reveal init; relays `slidechanged` as a `reveal:slidechanged` window event (iframes load only when visible) |
| `src/components/BD.jsx` | `Bulle`, `Case`, `Narrateur`, `Planche`, `Chapitre`, `Mini` |
| `src/components/Bureau.jsx` | Rémi's office, big, with a screen slot (mail, Delos chat…) |
| `src/components/Excel.jsx` | Realistic Excel window (ribbon, name box, formula bar, grid, sheet tabs) |
| `src/components/Vitrine.jsx` | City pages in iframes |
| `src/components/Annuaire.jsx` + `annuaire.html` | The users' page (2nd Vite entry, see `vite.config.js`) |
| `src/components/TableauDeBord.jsx` + `src/tableau_de_bord.css` | The internal dynamic dashboard (Ep. 5), same look as the annuaire |

Gotchas: JS strings with French apostrophes → use the typographic ’ or template literals; never mass-replace quotes with sed/regex (it broke template literals once). Design tokens: `--blue #009fe3`, `--green #95c11f`, `--navy #0f4c75`, `--yellow #ffe066`; fonts Bangers (BD titles), Comic Neue (bubbles), IBM Plex Serif, Roboto.

## Excel screens = HTML rebuilds of Excel for **Windows** (Microsoft 365, French UI)
No screenshots (they were illegible and Mac-looking; removed 17/11/2026). `src/components/Excel.jsx` draws a Windows window (green title bar with ─ ☐ ✕, ribbon tabs Fichier…Aide, optional ribbon command row with the button to click outlined in red, name box, formula bar with ✕ ✓ fx, grid, sheet tabs) + `Dialogue` and widgets (`XOnglets`, `XCase`, `XRadio`, `XListe`, `XChamp`, `XBoutons`) + `PanneauTCD` (« Champs de tableau croisé dynamique », zones Filtres/Colonnes/Lignes/Valeurs). Labels follow support.microsoft.com/fr-fr (Windows): Données › Outils de données › Validation des données (tabs Options · Message de saisie · Alerte d’erreur), Accueil › Styles › Mise en forme conditionnelle › Nouvelle règle (« Utiliser une formule pour déterminer pour quelles cellules le format sera appliqué »), Insertion › Tableau / Ctrl+T (« Créer un tableau »), Insertion › Tableau croisé dynamique, clic droit › Actualiser. Shortcuts are Windows ones (Ctrl, never ⌘).

## ⏩ État (17/11/2026)
Trame « j'enregistre → je présente → cercle vertueux » en place, 32 slides. À vérifier sur un vrai Excel Windows : l'onglet « Options » de Validation des données (la doc dit « Paramètres ») et l'intitulé « Utiliser une formule pour déterminer… ».

## ⏩ À faire sur le Mac (17/11/2026) — le vrai classeur de correction
Les slides et le script montrent la synthèse « 3 chiffres + 3 TCD parlants », mais `public/ressources/correction_suivi_librairies.xlsx` contient encore l'ancienne (tableau par commune + INDEX/EQUIV, TCD sur son propre onglet `TCD`). Ne pas le régénérer avec openpyxl (il supprime les listes déroulantes faites dans Excel). Dans le vrai Excel :
1. onglet `synthese` : effacer A2:E17 ; A1:F1 fusionnées = titre ; ligne 2 (fusions A:B, C:D, E:F) = `Librairies suivies | Labellisées (LIR) | Pour 10 000 habitants` ; ligne 3 = `=NBVAL(saisie!A:A)-1 | =NB.SI(saisie!D:D;"LIR") | =A3/SOMME(communes!C:C)*10000` (gros, vert, 2 décimales pour la densité) ; ligne 5 = les titres-questions `① Où sont les librairies ?` (A5), `② Quelles spécialités ?` (C5), `③ Où sont les labellisées ?` (E5) ;
2. TCD ① : déplacer le TCD existant (Analyse du tableau croisé dynamique › **Déplacer le tableau croisé dynamique** › `synthese!$A$6`), trié décroissant ; TCD ② en `synthese!$C$6` (Lignes : assortiment, Valeurs : Nombre de id) ; TCD ③ en `synthese!$E$6` (Filtres : label = LIR, Lignes : commune, Valeurs : Nombre de id) ; supprimer l'onglet `TCD` vide ;
3. renommer dans chaque TCD : « Nombre de id » → `Nombre de librairies` (③ : `Labellisées (LIR)`) via clic droit › Paramètres des champs de valeurs › Nom personnalisé ; Création › Disposition du rapport › Afficher sous forme tabulaire (l'en-tête devient « commune » / « assortiment », à retaper `Commune` / `Spécialité`) ; « Total général » → `Total` ;
4. vérifier 17 · 3 · 0,54 ; ① Boulogne-Billancourt 6 en tête ; ② Généraliste 13, BD et Mangas 3, Religion 1 ; ③ Boulogne-Billancourt 2, Issy-les-Moulineaux 1 ; enregistrer, pousser.
