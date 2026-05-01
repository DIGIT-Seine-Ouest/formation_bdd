# Contenu — Formation BDD "Vers des données robustes"
## Partie théorique · 18 slides · 45 min

> **Fil conducteur :** chaque concept arrive comme réponse à une frustration concrète.
> Jamais de règle sans avoir d'abord montré ce qu'elle coûte de ne pas la respecter.

---

## ACCUEIL · 4 slides

---

### Slide 1 — Titre
**Idée clé :** poser le cadre de la journée.

| Élément | Contenu |
|---|---|
| Label | DIRMOB — Formation |
| Titre | Vers des données robustes |
| Sous-titre | Base de données · 2 h · 45 min théorie + 1 h 15 pratique |

---

### Slide 2 — La question à 2 minutes
**Idée clé :** ouvrir sur la douleur, pas sur les concepts.
Le public doit se reconnaître dans la situation avant qu'on lui propose quoi que ce soit.

**Scénario (texte intro, lu à voix haute par le formateur) :**
> Réunion de bilan mensuel. La responsable de secteur pose la question :
> "Quels motifs de réclamations sont en hausse ce mois-ci, toutes lignes confondues ?"

**Colonne gauche — Avec le fichier actuel :**
- Ouvrir les 3 onglets (ligne 389, ligne 160, ligne 91)
- Copier-coller les lignes dans un 4e onglet
- Filtrer à la main, compter, vérifier
- ⏱ 45 minutes · risque d'erreur · réponse partielle

**Colonne droite — Avec une base de données :**
- Un filtre sur la colonne `motif`
- Un tableau croisé dynamique
- ⏱ 30 secondes · réponse exacte · reproductible

**Phrase de conclusion (fragment) :**
> "Même donnée. Pas la même structure. Pas le même résultat."

---

### Slide 3 — Programme
**Idée clé :** rassurer sur le déroulé, ancrer le fil rouge.

**Partie gauche — Timeline :**
- ① Théorie · 45 min · 14h30 → 15h15
  Règles fondatrices, types, les 3 frictions
- ② Serious Game · 1h15 · 15h15 → 16h30
  Diagnostic · Reconstruction · Exploitation

**Partie droite — Fil rouge (card) :**
- Label : Fil rouge
- Titre : Suivi des réclamations DIRMOB
- Sous-texte : Un fichier volontairement dégradé. Votre mission : le rendre exploitable.

---

### Slide 4 — Deux concepts à garder en tête
**Idée clé :** planter deux mots dans la tête du public avant de commencer.
Ils reviendront comme un leitmotiv tout au long de la formation.

**Concept 1 — L'atomicité :**
> "1 colonne = 1 seule information"
> Fini les cellules fourre-tout.

**Concept 2 — L'identité :**
> "Chaque ligne est unique"
> Grâce à l'ID, on ne perd jamais une réclamation.

**Bouton de conclusion :**
> "Prêt à changer de regard sur vos données ?"

---

## MODULE 1 — Tableau vs Base de données · 4 slides

---

### Slide 5 — Section : Tableau de suivi vs Base de données
**Idée clé :** transition visuelle forte. Le public sait qu'un nouveau bloc commence.

- Label : Module 1 · 15 min
- Titre : Tableau de suivi / vs / Base de données
- Sous-titre : La différence fondamentale — et pourquoi elle change tout.

---

### Slide 6 — Pourquoi le fichier actuel résiste
**Idée clé :** montrer les 3 problèmes du fichier brut AVANT de montrer la solution.
Le public doit voir la douleur avant le remède.

**Titre :** Les réclamations DIRMOB — ce que la machine ne peut pas faire

**Mockup du fichier actuel (tableau "sale") :**

| Date | Nom / Email | Ligne / Prestataire | Problème |
|---|---|---|---|
| 05/03 | Martin j.martin@… | 389 - Keolis | retard 10 min |
| 07/03 | a.dupont@… | 160 - RATP | avance |
| 10/03 | n.nguyen@… | 389 - Keolis | retard 10 min |

Les lignes Martin et Nguyen sont colorées en rouge (statut urgent).

**3 annotations sur le tableau (fragments, apparaissent une par une) :**
1. ❶ Les couleurs portent le statut → la machine ne voit que des couleurs, pas des valeurs
2. ❷ Nom + email collés dans une cellule → impossible de filtrer par email
3. ❸ Ligne + prestataire collés → impossible d'agréger par prestataire

**Conclusion (fragment) :**
> Ces 3 problèmes ont un nom. Ils bloquent toute exploitation automatique.

---

### Slide 7 — La table : vocabulaire fondamental
**Idée clé :** montrer la version propre et introduire le vocabulaire en 3 temps (fragments),
pas en une grille de 5 définitions d'un coup.

**Titre :** Anatomie d'une table

**Table propre (table : reclamations) :**

| id (PK) | date | reclamant_id (FK) | id_ligne (FK) | motif | statut |
|---|---|---|---|---|---|
| R001 | 05/03/2026 | 1 | L1 | retard | ouverte |
| R002 | 07/03/2026 | 2 | L2 | avance | cloture |
| R003 | 10/03/2026 | 1 | L1 | retard | ouverte |

**Fragments (apparaissent dans cet ordre, en surlignant la zone concernée) :**

- **Fragment 1 — CHAMP** (colonne `motif` surlignée en violet)
  > Champ = une catégorie d'information. Chaque colonne est un champ.

- **Fragment 2 — ENREGISTREMENT** (ligne R001 surlignée en vert)
  > Enregistrement = une réclamation complète. Chaque ligne est un enregistrement.

- **Fragment 3 — ATTRIBUT** (cellule `retard` à l'intersection surlignée)
  > Attribut = la valeur à l'intersection d'un champ et d'un enregistrement.

- **Fragment 4 — PK / FK** (colonnes id, reclamant_id, id_ligne colorées)
  > PK (clé primaire) = désigne la ligne sans ambiguïté.
  > FK (clé étrangère) = pointe vers une autre table.

---

### Slide 8 — Les 4 opérations CRUD
**Idée clé :** montrer que toute base de données repose sur 4 actions simples.
Le public comprend que leur fichier coloré ne les permet pas toutes proprement.

**Titre :** Les 4 opérations d'une base

**Sous-titre :**
> Une base robuste doit permettre ces 4 actions sur n'importe quelle ligne, sans manipulation manuelle.

**4 cards CRUD :**

| Lettre | Opération | Exemple DIRMOB |
|---|---|---|
| C | Create | Nouvelle réclamation R004 — Martin, ligne 389, motif : retard |
| R | Read | Toutes les réclamations statut = "ouverte" de la ligne L1 |
| U | Update | R001 → statut passe de "ouverte" à "cloture" |
| D | Delete | Supprimer R002 : doublon identifié lors du diagnostic |

**Alerte de conclusion (fragment) :**
> Sur un tableau coloré : le R passe par un filtre manuel fragile · le U = changer une couleur à la main · le résultat est introuvable pour une machine.

---

## MODULE 2 — Les règles qui changent tout · 5 slides

---

### Slide 9 — Section : Les règles qui changent tout
**Idée clé :** transition visuelle. Annonce les 3 piliers (atomicité, types, identifiant).

- Label : Module 2 · 15 min
- Titre : Les règles / qui changent tout
- Sous-titre : Atomicité, types, identifiants — les 3 piliers d'une donnée exploitable.

---

### Slide 10 — La règle fondatrice
**Idée clé :** la règle n'est pas une convention arbitraire — elle répond à une vraie frustration.
Montrer la frustration D'ABORD, la règle ENSUITE.

**Déclencheur (texte intro) :**
> Question : combien de réclamations "retard" ce mois-ci ?
> Réponse impossible → la cellule dit "retard + propreté". La machine ne sait pas séparer.

**Visuel gauche — Ce qui bloque :**
```
motifs                    intervenant
──────────────────────    ──────────────────────
Retard + Propreté + …     Dupont J. — ligne 389
```
> → COUNTIF("retard") ne trouve rien. Deux informations dans une cellule = zéro automatisation.

**Visuel droite — Ce qui marche :**
```
motif_principal    reclamant_id    id_ligne
───────────────    ────────────    ────────
retard             2               L1
```
> → COUNTIF(motif_principal, "retard") = 1 clic.

**La règle (fragment, encadré visuel fort) :**
> **1 colonne = 1 information**
> C'est la règle fondatrice. Tout le reste en découle.

---

### Slide 11 — L'atomicité en pratique
**Idée clé :** appliquer la règle à chaque champ du fichier DIRMOB réel.
Le "test de la phrase" est le moment pédagogique le plus fort du module — il doit être le hero.

**Titre :** L'atomicité en pratique

**Avant — cellule fourre-tout :**

| id | reclamants | duree |
|---|---|---|
| R001 | Martin, Dupont | environ 12 min |

> → Filtrer, compter, calculer une durée moyenne : impossible.

**Après — 1 valeur indivisible par cellule :**

| id | reclamant_id | duree_min |
|---|---|---|
| R001 | 1 | 12 |
| R002 | 2 | 8 |

> → AVERAGE(duree_min), filtre sur reclamant_id = immédiat.

**LE MOMENT-CLÉ — Le test de la phrase (encadré bleu bien visible, fragment) :**
> "La réclamation *R001* a été déposée le *05/03/2026* par le réclamant *1*,
> concerne la ligne *L1*, motif *retard*, statut *ouverte*."
>
> → Phrase cohérente : chaque mot a sa colonne. C'est le signe d'une ligne robuste.

---

### Slide 12 — Les types de données
**Idée clé :** le type détermine ce qu'on peut faire avec la valeur.
Chaque type illustré avec un champ réel de la table réclamations DIRMOB.

**Titre :** Choisir le bon type de données

**Sous-titre :**
> Le type détermine ce qu'on peut faire avec la valeur — sur la table réclamations :

**6 cards (grille 3×2) :**

| Type | Description | Exemple DIRMOB |
|---|---|---|
| Texte | Description libre | commentaire : "conducteur agressif" |
| Nombre | Entier ou décimal, calculable | duree_min : 12 |
| Date / Heure | Triable, calculable, filtrable | date : 2026-06-01 |
| Booléen | Oui / Non — pas de nuance | traite_en_urgence : VRAI |
| Énumération ✦ | Liste fermée de valeurs autorisées | statut : "ouverte" \| "en_cours" \| "cloture" |
| NULL | Valeur manquante — ≠ zéro, ≠ vide | date_cloture : NULL (pas encore traitée) |

✦ L'énumération est mis en évidence (couleur verte) — c'est la réponse directe à la friction "statut stocké en couleur".

---

### Slide 13 — L'identifiant unique + pourquoi plusieurs tables
**Idée clé :** le moment "cheveux rouges" (cf. script SNT).
Montrer d'abord POURQUOI tout mettre dans une seule table coûte cher,
puis montrer la solution : PK + FK + tables séparées.

**Titre :** L'identifiant unique et les relations

**Déclencheur — le piège de la table unique :**
> Si on met le nom du prestataire dans chaque réclamation...
> Keolis change de nom → il faut corriger sur chaque ligne manuellement.
> Et si on en oublie une ?

**Visuel gauche — Problème :**

| id | motif | prestataire_nom | prestataire_ville |
|---|---|---|---|
| R001 | retard | Keolis | Lyon |
| R003 | retard | Keolis | Lyon |

> → Changer "Keolis" = modifier N lignes. Risque d'incohérence.

**Visuel droite — Solution PK / FK :**

Table `reclamations` :

| id (PK) | motif | id_ligne (FK) |
|---|---|---|
| R001 | retard | L1 |
| R003 | retard | L1 |

Table `lignes` :

| id_ligne (PK) | numero | prestataire |
|---|---|---|
| L1 | 389 | Keolis |

> → Changer le prestataire = modifier 1 ligne dans la table `lignes`. Partout à jour.

**3 propriétés de l'identifiant (fragments) :**
- **Unique** — aucune réclamation ne partage le même ID
- **Stable** — ne change jamais, même si la réclamation évolue
- **Non signifiant** — n'encode pas d'info → `R001`, jamais `Paris-389-Urgent-2026`

---

## MODULE 3 — Les 3 frictions · 5 slides

---

### Slide 14 — Section : 3 symptômes, 1 seul problème de fond
**Idée clé :** transition. Les 3 frictions du fichier DIRMOB sont identifiées nommées.

- Label : Module 3 · 5 min
- Titre : 3 symptômes, / 1 seul problème / de fond
- Sous-titre : Ces trois frictions sont présentes dans votre fichier fil rouge.

---

### Slide 15 — Vue d'ensemble des 3 frictions
**Idée clé :** nommer les 3 ennemis avant de les combattre un par un.

**Titre :** Les 3 frictions identifiées à la DIRMOB

**3 cards (fragments) :**

| # | Nom | Description |
|---|---|---|
| 1 | Éclatement des données | Un onglet par ligne de bus → bilans transverses impossibles |
| 2 | Encodage par la couleur | Le statut est une couleur → invisible pour la machine |
| 3 | Listes dans une cellule | "retard + propreté" → filtre et comptage bloqués |

**Phrase de fond commun (fragment) :**
> Racine commune : confusion entre **tableau aide-mémoire** (fait pour l'œil)
> et **base de données** (faite pour la machine).

---

### Slide 16 — Friction 1 : Éclatement des données
**Idée clé :** un onglet par ligne de bus = pas de question transverse possible.

**Label :** Friction 1

**Titre :** Éclatement des données

**Gauche — 3 onglets séparés :**
- Onglets : `[ Ligne 389 ]  [ Ligne 160 ]  [ Ligne 91 ]`
- Tableau dans l'onglet 389 : date / statut (coloré) / motif
- Question impossible : "Combien de réclamations 'retard' sur toutes les lignes confondues ?"

**Droite — 1 table unique :**

| id | id_ligne (FK) | date | motif |
|---|---|---|---|
| R001 | L1 | 05/03/2026 | retard |
| R002 | L2 | 07/03/2026 | avance |
| R003 | L1 | 10/03/2026 | retard |

> → COUNTIF(motif, "retard") = 2 · filtrer par ligne : 1 clic

---

### Slide 17 — Friction 2 : Encodage par la couleur
**Idée clé :** l'info dans la couleur disparaît à l'export et est invisible pour la machine.

**Label :** Friction 2

**Titre :** Encodage par la couleur

**Gauche — statut = couleur :**

| id | motif |
|---|---|
| R001 | retard — Martin j.martin@ | ← fond rouge |
| R002 | avance — a.dupont@ | ← fond vert |
| R003 | retard — n.nguyen@ | ← fond orange |

> Rouge = urgent ? Vert = clôturé ?
> La machine ne sait pas — l'info disparaît à l'export CSV.

**Droite — statut = valeur :**

| id | motif | statut |
|---|---|---|
| R001 | retard | ouverte |
| R002 | avance | cloture |
| R003 | retard | en_cours |

> → COUNTIF(statut, "ouverte") = 2 — comptable, filtrable, exportable

---

### Slide 18 — Friction 3 : Listes dans une cellule
**Idée clé :** plusieurs valeurs dans une cellule = atomicité violée = comptage impossible.

**Label :** Friction 3

**Titre :** Listes dans une cellule

**Gauche — valeurs concaténées :**

| id | motifs |
|---|---|
| R001 | retard + propreté |
| R002 | attitude + retard + bruit |

> → filtrer, compter, faire une jointure : impossible.

**Droite — motif principal + commentaire libre :**

| id | motif_principal | commentaire |
|---|---|---|
| R001 | retard | aussi propreté |
| R002 | attitude | retard + bruit signalés |

> → COUNTIF(motif_principal, "retard") = 1 · TCD par motif en 1 clic

---

## Notes de mise en scène (pour le formateur)

- **Slide 2** : poser la question à voix haute avant d'afficher la slide. Laisser 3 secondes de silence.
- **Slide 6** : faire identifier les 3 problèmes par les participants AVANT d'afficher les annotations.
- **Slide 11** : lire la "phrase test" à voix haute. C'est le moment le plus fort du module 2.
- **Slide 13** : l'analogie "si Keolis change de nom" doit être dite, pas lue sur la slide.
- **Module 3** : enchaîner vite (5 min). Ce sont des illustrations du module 2, pas de nouveaux concepts.
