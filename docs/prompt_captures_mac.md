# Prompt — construire les fichiers dans Excel (Mac) et faire les captures

> À coller tel quel dans l'assistant qui pilote ton Mac (Claude avec accès à l'ordinateur, Claude Code, etc.).
> Microsoft Excel pour Mac doit être installé. Durée : 30 à 45 min.

---

Tu travailles sur mon Mac, avec Microsoft Excel (interface en **français**, formules avec séparateur `;`).
Objectif : construire **pas à pas** deux classeurs Excel pour une formation, et faire une **capture d'écran PNG à chaque étape**. Ces captures remplaceront des maquettes dans une présentation : elles doivent être propres, lisibles et identiques au contenu décrit ci-dessous (ne rien inventer, ne rien ajouter).

## 0. Préparation

1. Si le dossier `~/formation_bdd` n'existe pas : `git clone https://github.com/DIGIT-Seine-Ouest/formation_bdd.git ~/formation_bdd`. Sinon : `cd ~/formation_bdd && git pull`.
2. Crée le dossier `~/formation_bdd/public/captures/`.
3. Réglages pour **toutes** les captures :
   - fenêtre Excel seule, environ **1440 × 900** points, rien d'autre à l'écran (ferme les panneaux latéraux sauf mention contraire) ;
   - ruban **visible** (onglet Accueil, sauf mention contraire), barre de formule visible, onglets de feuilles visibles en bas ;
   - zoom de la feuille : **150 %** ;
   - capture **de la fenêtre Excel uniquement** (ex. `screencapture -o -l <id fenêtre>` ou Cmd+Maj+4 puis Espace), format PNG, sans ombre ;
   - avant chaque capture, sélectionne la cellule indiquée (elle apparaît dans la zone de nom et sa formule dans la barre de formule).
4. Noms de fichiers : **exactement** ceux indiqués ci-dessous, dans `~/formation_bdd/public/captures/`.

## 1. Classeur A — « le fichier de vendredi » (`exercice_aide_memoire.xlsx`)

Le fichier fait « vite fait » par Rémi. Il est volontairement mal construit : reproduis-le **exactement**, erreurs comprises.

Feuille **`Librairies`** :
- A1:E1 **fusionnées** : `📚 SUIVI DES LIBRAIRIES DU TERRITOIRE — 2026` (gras, blanc sur bleu foncé #1F4E79, centré)
- A2:E2 **fusionnées** : `en vert = labellisée · MAJ mars 2026 (à revoir avec Paul)` (italique, gris, petit)
- ligne 3 vide
- ligne 4, en-têtes (gras, fond gris clair) : `Ville | Nom | Spécialité | Visite | Remarques`
- lignes 5 à 21 (la colonne Ville est **fusionnée verticalement** par commune ; les lignes marquées 🟩 ont **B et C remplies en vert clair** #C6EFCE) :

| ligne | Ville (fusion) | Nom | Spécialité | Visite | Remarques |
|---|---|---|---|---|---|
| 5 | Boulogne-Billancourt (6) — fusion A5:A10 | Le Comptoir De La Bd | BD + mangas | faite (mars ?) | |
| 6 | | Les Curieux | Religion | à faire | |
| 7 🟩 | | Les Mots Et Les Choses | Généraliste (LIR) | 12/03 | |
| 8 | | Les Mots Et Les Choses Nord | géné. | | 2e boutique |
| 9 🟩 | | Les Mots Et Les Images | bd | oui | |
| 10 | | Periples 2 | Généraliste | rappeler | |
| 11 | Chaville (1) | Librairie De La Pointe | Généraliste | à faire | |
| 12 | Issy-les-Moulineaux (5) — fusion A12:A16 | Chantelivre | Généraliste | faite | |
| 13 | | Gutenberg | généraliste | | |
| 14 | | L'Echappee Bulle | BD-Manga | à faire | |
| 15 🟩 | | Le Livre Et La Tortue | Généraliste | 2026-03-20 | |
| 16 | | Nati | géné. | | |
| 17 | Meudon (2) — fusion A17:A18 | Anagramme | Généraliste | faite (avril) | même que Sèvres ? |
| 18 | | Le Meandre | Généraliste | | |
| 19 | Sèvres (1) | Anagramme | Généraliste | | cf. Meudon |
| 20 | Vanves (1) | Le Cheval-Vapeur | Généraliste | à faire | |
| 21 | Ville-d'Avray (1) | Vert Paradis | Généraliste | | |

- ligne 22 vide ; ligne 23 : `TOTAL` | `17 librairies` (gras)
- Saisis `12/03` et `faite (mars ?)` **comme du texte** (préfixe `'` si Excel convertit).

Feuille **`Récap (2)`** (recopiée à la main, **pas à jour** : Issy dit 4 au lieu de 5) :
`Commune | Nb | Labellisées` puis Boulogne-Billancourt 6 2 · Chaville 1 · Issy-les-Moulineaux **4** 1 · Marnes-la-Coquette 0 · Meudon 2 · Sèvres 1 · Vanves 1 · Ville-d'Avray 1 · ligne 11 `TOTAL` `=SOMME(B2:B9)` · A12 en rouge italique : `copié depuis l'ancienne version, à vérifier`.

Feuille **`Feuil1`** : vide.

Captures (feuille `Librairies`, zoom 150 %) :
- `vendredi_vue.png` — lignes 1 à 23 entières visibles (baisse le zoom à 120 % si nécessaire), cellule **A5** sélectionnée.
- `vendredi_titre.png` — lignes 1 à 6, cellule **A1** sélectionnée.
- `vendredi_fusion.png` — lignes 4 à 12, cellule **A6** sélectionnée (on voit qu'elle est vide).
- `vendredi_couleur.png` — lignes 4 à 10, cellule **B7** sélectionnée.
- `vendredi_deux_infos.png` — lignes 4 à 8, cellule **C7** sélectionnée.
- `vendredi_valeurs.png` — lignes 4 à 16, cellule **D7** sélectionnée.
- `vendredi_anagramme.png` — lignes 16 à 21, cellule **B17** sélectionnée.
- `vendredi_recap.png` — feuille `Récap (2)`, cellule **B4** sélectionnée.

Enregistre sous `~/formation_bdd/public/ressources/exercice_aide_memoire.xlsx` (remplace l'existant).

## 2. Classeur B — le tuto de Delos (`correction_suivi_librairies.xlsx`)

Nouveau classeur. On le construit **dans l'ordre** ; une capture à la fin de chaque étape.

Les 17 librairies (source : Base des librairies en France, ministère de la Culture) :

| id | librairie | assortiment | label | code_commune | commune |
|---|---|---|---|---|---|
| LIB001 | LE COMPTOIR DE LA BD | BD et Mangas | aucun | 92012 | Boulogne-Billancourt |
| LIB002 | LES CURIEUX | Religion | aucun | 92012 | Boulogne-Billancourt |
| LIB003 | LES MOTS ET LES CHOSES | Généraliste | LIR | 92012 | Boulogne-Billancourt |
| LIB004 | LES MOTS ET LES CHOSES NORD | Généraliste | aucun | 92012 | Boulogne-Billancourt |
| LIB005 | LES MOTS ET LES IMAGES | BD et Mangas | LIR | 92012 | Boulogne-Billancourt |
| LIB006 | PERIPLES 2 | Généraliste | aucun | 92012 | Boulogne-Billancourt |
| LIB007 | LIBRAIRIE DE LA POINTE | Généraliste | aucun | 92022 | Chaville |
| LIB008 | CHANTELIVRE | Généraliste | aucun | 92040 | Issy-les-Moulineaux |
| LIB009 | GUTENBERG | Généraliste | aucun | 92040 | Issy-les-Moulineaux |
| LIB010 | L'ECHAPPEE BULLE | BD et Mangas | aucun | 92040 | Issy-les-Moulineaux |
| LIB011 | LE LIVRE ET LA TORTUE | Généraliste | LIR | 92040 | Issy-les-Moulineaux |
| LIB012 | NATI | Généraliste | aucun | 92040 | Issy-les-Moulineaux |
| LIB013 | ANAGRAMME | Généraliste | aucun | 92048 | Meudon |
| LIB014 | LE MEANDRE | Généraliste | aucun | 92048 | Meudon |
| LIB015 | ANAGRAMME | Généraliste | aucun | 92072 | Sèvres |
| LIB016 | LE CHEVAL-VAPEUR | Généraliste | aucun | 92075 | Vanves |
| LIB017 | VERT PARADIS | Généraliste | aucun | 92077 | Ville-d'Avray |

**Étape 1 — les en-têtes.** Feuille renommée `saisie`. Tape en A1:D1 : `librairie | assortiment | label | commune`. Rien au-dessus, aucune mise en forme. Sélectionne **A1**. → `etape-1.png`

**Étape 2 — une ligne = une librairie.** Saisis les 17 lignes (colonnes librairie, assortiment, label, commune ; la commune est **répétée** sur chaque ligne). Puis Accueil › **Mettre sous forme de tableau** (ou Cmd+T), « Mon tableau comporte des en-têtes », style vert moyen ; nomme le tableau `T_saisie`. Sélectionne **D3**. → `etape-2.png`

**Étape 3 — une case = une information.** Rien à changer : sélectionne **C4** (`LIR`) pour montrer que le label a sa propre colonne, séparée de l'assortiment. → `etape-3.png`

**Étape 4 — rien dans la couleur.** Sélectionne A2:D18 › Accueil › **Mise en forme conditionnelle** › Nouvelle règle › « Utiliser une formule… » › `=$C2="LIR"` › remplissage vert clair. → capture **avec la boîte de dialogue de la règle ouverte** : `etape-4-regle.png` ; puis valide, sélectionne **C4** → `etape-4.png`

**Étape 5 — des valeurs contrôlées.** Crée une feuille `listes` : A1 `assortiment` puis A2:A12 `Généraliste, BD et Mangas, Jeunesse, Religion, Arts - Musées et Monuments, Mieux-être et spiritualité, VO, Imaginaire - Policier, SHS, Voyage, Autres` ; B1 `label` puis `aucun, LIR, LR`. Dans `saisie`, sélectionne la colonne assortiment (B2:B500) › Données › **Validation des données** › Autoriser : Liste › Source `=listes!$A$2:$A$12`. Même chose pour label avec `=listes!$B$2:$B$4`. → capture **de la boîte Validation des données ouverte** : `etape-5-validation.png` ; puis clique sur **B2** et **ouvre la liste déroulante** → `etape-5.png`

**Étape 6 — un identifiant.** Insère une colonne avant A, en-tête `id`, valeurs `LIB001` à `LIB017`. Sélectionne **A2**. → `etape-6.png`

**Étape 7 — ne pas recopier : la jointure.** Crée une feuille `communes` : `code_commune | commune | population` puis
92012 Boulogne-Billancourt 119019 · 92022 Chaville 20594 · 92040 Issy-les-Moulineaux 67669 · 92047 Marnes-la-Coquette 1752 · 92048 Meudon 46334 · 92072 Sèvres 22303 · 92075 Vanves 28622 · 92077 Ville-d'Avray 11089
(colonne A au **format Texte** avant la saisie). → `etape-7-communes.png` (cellule **A2**).
Dans `saisie` : insère une colonne `code_commune` **avant** `commune` (format Texte), remplis les codes. Remplace les valeurs de `commune` par la formule `=RECHERCHEV(E2;communes!$A:$B;2;0)` (recopiée sur toute la colonne ; Excel peut l'écrire avec des références structurées, c'est OK). Ajoute la validation `=communes!$A$2:$A$9` sur code_commune. Sélectionne **F2**. → `etape-7.png`

**Étape 8 — le temps est une colonne.** Ajoute la colonne `annee_suivi` = `2026` pour les 17 lignes. Sélectionne **G2**. → `etape-8.png`

**Étape 9 — je fais la synthèse.** Nouvelle feuille `synthese` (rien n'y est saisi, tout est calculé) :
- A1:E1 fusionnées : `TABLEAU DE SUIVI — LIBRAIRIES GPSO` (blanc sur bleu foncé)
- A2 `Librairies suivies` · B2 `=NBVAL(saisie!A:A)-1`
- A3 `Labellisées (LIR + LR)` · B3 `=NB.SI(saisie!D:D;"LIR")+NB.SI(saisie!D:D;"LR")`
- ligne 4 (en-têtes) : `code | commune | librairies | population | pour 10 000 hab.`
- lignes 5 à 12 : A = les 8 codes (format Texte) ; B `=RECHERCHEV(A5;communes!$A:$C;2;0)` ; C `=NB.SI(saisie!E:E;A5)` ; D `=RECHERCHEV(A5;communes!$A:$C;3;0)` ; E `=ARRONDI(C5/D5*10000;2)`
- A13 `Q1 · le plus de librairies` · B13 `=INDEX(B5:B12;EQUIV(MAX(C5:C12);C5:C12;0))` · C13 `=MAX(C5:C12)`
- A14 `Q2 · labellisées` · B14 `=B3`
- A15 `Q3 · pour 10 000 hab.` · B15 `=INDEX(B5:B12;EQUIV(MAX(E5:E12);E5:E12;0))` · C15 `=MAX(E5:E12)`
- cellules de résultat (B2, B3, B13:C15) sur fond vert clair, en gras.
Résultats attendus : 17 · 3 · Q1 Boulogne-Billancourt 6 · Q3 Ville-d'Avray 0,9. **Si un résultat diffère, corrige avant de capturer.** Sélectionne **B13**. → `etape-9.png`

**Bonus — le TCD.** Clique dans `saisie` › Insertion › **Tableau croisé dynamique** › nouvelle feuille `TCD` ; glisse `commune` dans Lignes et `id` dans Valeurs (« Nombre de id »). Capture **avec le panneau des champs ouvert** → `tcd.png`

**Bonus — le dictionnaire.** Feuille `dictionnaire` : `colonne | signification | format / valeurs | exemple`, une ligne par colonne de `saisie` (id, librairie, assortiment, label, code_commune, commune, annee_suivi). → `dictionnaire.png`

Enregistre sous `~/formation_bdd/public/ressources/correction_suivi_librairies.xlsx` (remplace l'existant).

## 3. Vérification et envoi

1. Vérifie que ces 22 fichiers existent dans `public/captures/` :
   `vendredi_vue, vendredi_titre, vendredi_fusion, vendredi_couleur, vendredi_deux_infos, vendredi_valeurs, vendredi_anagramme, vendredi_recap, etape-1, etape-2, etape-3, etape-4-regle, etape-4, etape-5-validation, etape-5, etape-6, etape-7-communes, etape-7, etape-8, etape-9, tcd, dictionnaire` (`.png`).
2. Ouvre chaque capture : texte lisible, bonne cellule sélectionnée, aucune autre fenêtre ni donnée personnelle visible (pas de nom de compte, notifications, autres fichiers).
3. Si une image dépasse 2400 px de large, réduis-la : `sips -Z 2400 public/captures/*.png`.
4. `cd ~/formation_bdd && git add public/captures public/ressources && git commit -m "feat: vraies captures Excel du tuto (Mac)" && git push`
5. Donne-moi la liste des captures faites et signale toute étape qui n'a pas pu être réalisée exactement comme décrit.
