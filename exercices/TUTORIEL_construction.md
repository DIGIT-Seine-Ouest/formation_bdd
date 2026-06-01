# Tutoriel pas à pas — Construire le suivi des réclamations

> De zéro jusqu'au tableau de bord automatique.
> Objectif : passer d'un fichier Excel « bloc-notes » à une **base de données** qui répond toute seule aux questions métier.
>
> Fichier cible : `reclamations_complet.xlsx`
> Résultat attendu : un tableau de bord qui dit, sans ressaisie, **quel prestataire pose problème, quelle commune râle le plus, quelle ligne est la plus problématique**.

---

## Sommaire

1. [Le principe : deux mondes, OLTP et OLAP](#1)
2. [Vue d'ensemble des tables](#2)
3. [PARTIE OLTP — construire les tables](#3)
   - 3.1 [`prestataires`](#31)
   - 3.2 [`lignes_bus`](#32)
   - 3.3 [`passe_par` — la table de jonction](#33)
   - 3.4 [`ref_communes`](#34)
   - 3.5 [`ref_motifs`](#35)
   - 3.6 [`reclamations` — la table centrale](#36)
4. [PARTIE OLAP — construire le tableau de bord](#4)
   - 4.1 [Les KPI](#41)
   - 4.2 [Par motif — `COUNTIF`](#42)
   - 4.3 [Par ligne — `COUNTIF` + `COUNTIFS`](#43)
   - 4.4 [Par commune — `COUNTIF`](#44)
   - 4.5 [Par prestataire — la jointure avec `SUMIF`](#45)
   - 4.6 [Par mois — `COUNTIFS` sur des dates](#46)
   - 4.7 [Les 3 réponses automatiques — `INDEX` + `MATCH` + `MAX`](#47)
5. [Le réflexe à retenir](#5)

---

<a name="1"></a>
## 1. Le principe : deux mondes, OLTP et OLAP

| | **OLTP** — *saisir & stocker* | **OLAP** — *lire & analyser* |
|---|---|---|
| But | Enregistrer chaque fait | Répondre à des questions |
| Forme | Des tables plates et atomiques | Des formules de synthèse |
| Règle d'or | 1 ligne = 1 fait · 1 info écrite **une seule fois** | On ne ressaisit rien, on **calcule** |
| Exemple | « Réclamation R001, le 05/01, ligne L169… » | « Combien de retards non clôturés ? » |

**L'idée clé :** on saisit proprement dans la partie OLTP, et la partie OLAP se met à jour **toute seule**. Aucune formule du tableau de bord ne change quand on ajoute une réclamation.

---

<a name="2"></a>
## 2. Vue d'ensemble des tables

On crée **un onglet par table**. Les liens entre tables se font par des **clés étrangères** (FK) : on stocke un identifiant court (`L169`, `P001`…) au lieu de recopier le texte.

```
reclamations ──FK id_ligne──▶ lignes_bus ──FK id_prestataire──▶ prestataires
     │                            │
     ├──FK id_commune──▶ ref_communes ◀──FK── passe_par ──FK──▶ lignes_bus
     │
     └──FK id_motif──▶ ref_motifs
```

- **`reclamations`** : la table centrale, là où on saisit chaque jour.
- **`lignes_bus`, `prestataires`, `ref_communes`, `ref_motifs`** : des référentiels (on les remplit une fois).
- **`passe_par`** : une table spéciale (« de jonction ») qui gère le fait qu'**une ligne dessert plusieurs communes**.

---

<a name="3"></a>
## 3. PARTIE OLTP — construire les tables

> Règle commune à toutes les tables : **la 1re ligne = les en-têtes de colonnes**, une colonne = une information, et la 1re colonne est l'**identifiant** (clé primaire, PK).

<a name="31"></a>
### 3.1 Table `prestataires` (les opérateurs de transport)

Crée un onglet `prestataires`. En-têtes en ligne 1, puis les données :

| id_prestataire | nom_prestataire | type_contrat | date_debut_contrat | date_fin_contrat |
|---|---|---|---|---|
| P001 | Keolis Île-de-France | DSP | 01/01/2022 | 31/12/2026 |
| P002 | RATP Dev | DSP | 01/06/2020 | 31/05/2025 |
| P003 | Transdev Île-de-France | DSP | 01/03/2021 | 28/02/2026 |
| P004 | ATM Croix du Sud | Convention | 01/01/2023 | 31/12/2027 |

**Pourquoi un `id_prestataire` (P001) et pas juste le nom ?**
Si demain « Keolis » est racheté et change de nom, on modifie **une seule cellule** (la colonne `nom_prestataire`). Toutes les lignes qui pointent vers `P001` restent valides. C'est tout l'intérêt de la clé.

> ⚠️ `type_contrat` doit être une **liste fermée** (DSP, Convention…), pas du texte libre. Sinon on se retrouve avec « dsp », « DSP », « D.S.P. » et les comptages deviennent faux.
> 💡 Saisis les dates au format date (01/01/2022), pas en texte, pour pouvoir calculer dessus plus tard.

<a name="32"></a>
### 3.2 Table `lignes_bus` (les lignes)

Onglet `lignes_bus`. Les colonnes A→E se saisissent ; **les colonnes F et G seront des formules** (on y revient en 3.2-bis).

| id_ligne | numero | id_prestataire | type_service | actif |
|---|---|---|---|---|
| L169 | 169 | P003 | local | 1 |
| L323 | 323 | P003 | local | 1 |
| L389 | 389 | P004 | local | 1 |
| L290 | 290 | P004 | local | 0 |
| L058 | 58 | P002 | local | 1 |
| LN118 | N118 | P002 | régional | 1 |
| L291 | 291 | P001 | local | 1 |
| L289 | 289 | P001 | local | 1 |

- `id_prestataire` est une **FK** : on écrit `P003`, **jamais** « Transdev ». Le nom vit dans la table `prestataires`, un seul endroit.
- `actif` (1/0) permet de **suspendre une ligne sans la supprimer** : on garde l'historique des réclamations qui y sont liées. C'est le « soft delete ».

#### 3.2-bis — Les colonnes calculées `nb_reclam` et `nb_non_clot`

Ajoute deux colonnes F et G. Elles comptent, pour chaque ligne, ses réclamations — **par jointure** avec la table `reclamations`. (À saisir après avoir créé `reclamations`, mais on les pose ici.)

**Cellule F2 :**
```excel
=COUNTIF(reclamations!$C:$C, $A2)
```
- `COUNTIF(plage, critère)` = « compte combien de cellules de la plage valent le critère ».
- `reclamations!$C:$C` = toute la colonne C de l'onglet `reclamations` (c'est `id_ligne`).
- `$A2` = l'identifiant de la ligne courante (ici `L169`).
- **Lecture :** « combien de réclamations ont `id_ligne = L169` ? »

**Cellule G2 :**
```excel
=COUNTIFS(reclamations!$C:$C, $A2, reclamations!$H:$H, 0)
```
- `COUNTIFS` = comme `COUNTIF` mais avec **plusieurs critères cumulés** (ET).
- Critère 1 : `id_ligne = L169`. Critère 2 : colonne H (`cloturee`) `= 0` (non clôturée).
- **Lecture :** « combien de réclamations sur L169 sont encore ouvertes ? »

> Le `$` devant la colonne (`$C:$C`, `$A2`) « fige » la référence : on peut recopier la formule vers le bas sans qu'elle se décale de travers. `$A2` fige la colonne A mais laisse la ligne s'incrémenter (A2, A3, A4…).

<a name="33"></a>
### 3.3 Table `passe_par` — la table de jonction ⚡

**Le problème :** une ligne dessert **plusieurs** communes, et une commune est desservie par **plusieurs** lignes. C'est une relation « plusieurs-à-plusieurs » (n–n).

**La mauvaise solution** (à ne jamais faire) : une cellule `communes = "Meudon / Issy / Boulogne"`. → impossible à compter, impossible à filtrer.

**La bonne solution :** une table dédiée où **chaque association = une ligne**.

Onglet `passe_par` :

| id_ligne | id_commune |
|---|---|
| L169 | C004 |
| L169 | C003 |
| L169 | C008 |
| L323 | C002 |
| … | … |

La ligne L169 apparaît 3 fois (une par commune desservie). C'est normal et c'est propre : 1 ligne = 1 fait atomique (« L169 passe par C003 »).

**Colonne « confort » C — afficher le nom de la commune par jointure :**
```excel
=INDEX(ref_communes!$B:$B, MATCH($B3, ref_communes!$A:$A, 0))
```
On détaille `INDEX`/`MATCH` en [4.7](#47), mais l'idée : « va chercher dans `ref_communes` le nom qui correspond à l'`id_commune` de cette ligne ».

**Question test que la table sait résoudre** — « combien de lignes passent par Meudon (C003) ? » :
```excel
=COUNTIF(passe_par!$B:$B, "C003")
```

<a name="34"></a>
### 3.4 Table `ref_communes`

Onglet `ref_communes` — le référentiel des communes :

| id_commune | nom_commune |
|---|---|
| C001 | Boulogne-Billancourt |
| C002 | Issy-les-Moulineaux |
| C003 | Meudon |
| C004 | Clamart |
| C005 | Chaville |
| C006 | Sèvres |
| C007 | Vanves |
| C008 | Ville-d'Avray |

<a name="35"></a>
### 3.5 Table `ref_motifs`

Onglet `ref_motifs` — la **liste fermée** des motifs. On utilise un id numérique simple :

| id_motif | libelle_motif |
|---|---|
| 1 | Retard |
| 2 | Information voyageurs |
| 3 | Suppression de service |
| 4 | Comportement conducteur |
| 5 | Confort / Surcharge |
| 6 | Infrastructure / Arrêt |

> Pourquoi une table à part plutôt qu'écrire « Retard » directement ? Pour garantir qu'il n'existe **que** ces 6 valeurs (pas de « retard », « Retards », « en retard »…). Les comptages restent exacts.

<a name="36"></a>
### 3.6 Table `reclamations` — la table centrale

C'est **ici qu'on saisit chaque jour**. L'ordre des colonnes est important : les formules du tableau de bord s'appuient dessus.

| Col | En-tête | Contenu | Type |
|---|---|---|---|
| **A** | id_reclamation | R001, R002… | PK |
| **B** | date_reclamation | 05/01/2024 | date |
| **C** | id_ligne | L169 | FK → `lignes_bus` |
| **D** | id_motif | 1 | FK → `ref_motifs` |
| **E** | id_commune | C003 | FK → `ref_communes` |
| **F** | objet_libre | « Retard de 20 min… » | texte libre (le **seul**) |
| **G** | date_cloture | 07/01/2024 ou vide | date / vide |
| **H** | cloturee | 1 ou 0 | booléen |
| **I** | delai_traitement | *(formule)* | nombre |

Exemple de lignes :

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| R001 | 05/01/2024 | L169 | 1 | C003 | Retard de 20 min à l'arrêt Meudon | 07/01/2024 | 1 |
| R002 | 09/01/2024 | L169 | 1 | C004 | Retard répété tous les matins | | 0 |
| R003 | 12/01/2024 | L323 | 3 | C003 | Bus supprimé sans annonce | | 0 |

**Pourquoi seulement `objet_libre` en texte libre ?**
Parce que c'est le seul champ qu'on ne pourra jamais compter. Tout le reste est codé (FK ou liste), donc analysable.

**Pourquoi garder `date_cloture` ET `cloturee` ?**
Ce n'est pas redondant : `cloturee` (0/1) sert à compter vite, `date_cloture` sert à calculer le délai de traitement.

**Colonne I — `delai_traitement` :**
```excel
=IF($H2=1, $G2-$B2, "")
```
- `IF(test, valeur_si_vrai, valeur_si_faux)`.
- Test : `H2=1` (la réclamation est-elle clôturée ?).
- Si oui : `G2-B2`, soit `date_cloture − date_reclamation` = un **nombre de jours** (Excel soustrait les dates).
- Si non : `""` (cellule vide, pour ne pas fausser la moyenne plus tard).

---

<a name="4"></a>
## 4. PARTIE OLAP — construire le tableau de bord

Crée un dernier onglet `📊 Tableau de bord`. **On n'y saisit aucune donnée** : que des formules qui lisent les tables OLTP.

<a name="41"></a>
### 4.1 Les KPI (les grands chiffres)

**Total des réclamations :**
```excel
=COUNTA(reclamations!A:A)-1
```
- `COUNTA(plage)` compte les cellules **non vides**.
- On compte la colonne A (les id), puis on retire `1` pour l'en-tête (ligne 1).

**Réclamations clôturées :**
```excel
=COUNTIF(reclamations!H:H, 1)
```
« Combien de cellules de la colonne `cloturee` valent 1 ? »

**Réclamations non clôturées :**
```excel
=COUNTIF(reclamations!H:H, 0)
```

**Taux de clôture** (suppose clôturées en C5, total en B5) :
```excel
=C5/B5
```
→ mets la cellule au format **pourcentage**.

**Délai moyen de traitement :**
```excel
=ROUND(AVERAGE(reclamations!I:I), 1)
```
- `AVERAGE` fait la moyenne de la colonne I (`delai_traitement`). Les cellules vides `""` des réclamations non clôturées sont **automatiquement ignorées**.
- `ROUND(… , 1)` arrondit à 1 décimale.

<a name="42"></a>
### 4.2 Réclamations par motif — `COUNTIF`

Recopie les libellés depuis `ref_motifs`, puis à côté :

```excel
=COUNTIF(reclamations!$D:$D, 1)
```
« Combien de réclamations ont `id_motif = 1` (Retard) ? »
Pour les autres motifs, remplace `1` par `2`, `3`, … `6`.

<a name="43"></a>
### 4.3 Réclamations par ligne — `COUNTIF` + `COUNTIFS`

**Total par ligne** (la ligne `L169` est en `$B22`) :
```excel
=COUNTIF(reclamations!$C:$C, $B22)
```

**Non clôturées par ligne :**
```excel
=COUNTIFS(reclamations!$C:$C, $B22, reclamations!$H:$H, 0)
```
Deux critères : `id_ligne = L169` **ET** `cloturee = 0`.

**Afficher le nom du prestataire de la ligne — double jointure** (`reclamations` ne connaît pas le prestataire, il faut passer par `lignes_bus`) :
```excel
=INDEX(prestataires!$B:$B,
       MATCH(
         INDEX(lignes_bus!$C:$C, MATCH($B22, lignes_bus!$A:$A, 0)),
         prestataires!$A:$A, 0))
```
On lit de l'intérieur vers l'extérieur :
1. `MATCH($B22, lignes_bus!$A:$A, 0)` → trouve la **position** de `L169` dans `lignes_bus`.
2. `INDEX(lignes_bus!$C:$C, …)` → récupère son `id_prestataire` (`P003`).
3. `MATCH(P003, prestataires!$A:$A, 0)` → trouve la position de `P003` dans `prestataires`.
4. `INDEX(prestataires!$B:$B, …)` → renvoie enfin le **nom** (`Transdev`).

> C'est exactement la chaîne `reclamations → lignes_bus → prestataires`. Sans les FK, ce calcul serait impossible.

<a name="44"></a>
### 4.4 Réclamations par commune — `COUNTIF`

```excel
=COUNTIF(reclamations!$E:$E, "C003")
```
« Combien de réclamations ont eu lieu à Meudon (C003) ? » → répond à *« quelle commune râle le plus ? »*.

<a name="45"></a>
### 4.5 Réclamations par prestataire — la jointure avec `SUMIF`

Un prestataire n'apparaît pas dans `reclamations` : il faut **agréger via ses lignes**. C'est là que servent les colonnes calculées `nb_reclam` (F) et `nb_non_clot` (G) de `lignes_bus`.

**Total par prestataire :**
```excel
=SUMIF(lignes_bus!$C:$C, "P003", lignes_bus!$F:$F)
```
- `SUMIF(plage_critère, critère, plage_à_sommer)`.
- « Pour toutes les lignes dont `id_prestataire = P003`, **additionne** leur `nb_reclam`. »

**Non clôturées par prestataire :**
```excel
=SUMIF(lignes_bus!$C:$C, "P003", lignes_bus!$G:$G)
```
On somme cette fois la colonne `nb_non_clot`. → répond à *« quel prestataire est le plus problématique ? »*.

> Différence clé : `COUNTIF` **compte** des lignes, `SUMIF` **additionne** des valeurs. Ici on additionne des sous-totaux déjà calculés par ligne.

<a name="46"></a>
### 4.6 Réclamations par mois — `COUNTIFS` sur des dates

```excel
=COUNTIFS(reclamations!$B:$B, ">="&DATE(2024,1,1),
          reclamations!$B:$B, "<"&DATE(2024,2,1))
```
- On compte les réclamations dont la date est `>= 01/01/2024` **ET** `< 01/02/2024` → tout janvier.
- `DATE(2024,1,1)` construit une vraie date (année, mois, jour).
- `">="&DATE(…)` : le `&` colle l'opérateur `>=` à la date pour former le critère.
- Pour février : `DATE(2024,2,1)` et `DATE(2024,3,1)`. Etc.

> ⚠️ Cette formule ne marche **que** si la colonne B contient de vraies dates, pas du texte. (Voir 3.1.)

<a name="47"></a>
### 4.7 Les 3 réponses automatiques — `INDEX` + `MATCH` + `MAX`

On veut une cellule qui affiche **directement** le nom du « champion », pas juste des chiffres à comparer à l'œil.

Supposons que le tableau « par prestataire » ait les **noms** en `B15:B18` et les **non clôturées** en `D15:D18`.

**Le plus grand nombre de non clôturées :**
```excel
=MAX($D$15:$D$18)
```

**Le nom qui correspond à ce maximum :**
```excel
=INDEX($B$15:$B$18, MATCH(MAX($D$15:$D$18), $D$15:$D$18, 0))
```
Décomposition :
1. `MAX($D$15:$D$18)` → la plus grande valeur (ici `8`).
2. `MATCH(8, $D$15:$D$18, 0)` → **à quelle position** se trouve ce 8 dans la colonne (le `0` = correspondance exacte). Réponse : 3ᵉ.
3. `INDEX($B$15:$B$18, 3)` → le **nom** en 3ᵉ position : `Transdev Île-de-France`.

> `INDEX(plage, n)` = « donne-moi le nᵉ élément ». `MATCH(valeur, plage, 0)` = « à quelle position est cette valeur ». Ensemble = un « recherche le nom associé au plus grand chiffre ».

On reproduit la même formule pour :
- **Commune la plus impactée** : noms de communes + leurs totaux.
- **Ligne la plus problématique** : id de lignes + leurs totaux.

**Bonus — phrase auto avec le chiffre :**
```excel
=TEXT(MAX($D$15:$D$18), "0") & "  réclamations non clôturées"
```
`TEXT(nombre, "0")` transforme le nombre en texte, et `&` le colle au libellé.

---

<a name="5"></a>
## 5. Le réflexe à retenir

Une fois tout en place, **ajoute une nouvelle réclamation** : une seule ligne dans l'onglet `reclamations`.
→ Tous les KPI, tous les comptages, les 3 réponses : **tout se recalcule seul.**

C'est ça, la bascule **OLTP → OLAP** :

> Une base bien structurée n'est pas plus compliquée à tenir.
> Elle est **moins** compliquée — parce que les questions difficiles deviennent des formules simples.

| Question métier | Formule |
|---|---|
| Combien de non clôturées ? | `COUNTIF(…H, 0)` |
| Combien de retards ? | `COUNTIF(…D, 1)` |
| Retards ouverts sur L169 ? | `COUNTIFS(…C,"L169", …D,1, …H,0)` |
| Quel prestataire problématique ? | `SUMIF` + `INDEX/MATCH/MAX` |
| Quelle commune râle le plus ? | `COUNTIF(…E)` + `INDEX/MATCH/MAX` |
| Quelle ligne pose problème ? | `COUNTIF(…C)` + `INDEX/MATCH/MAX` |
| Bilan d'un mois ? | `COUNTIFS` + `DATE` |

**Corrigé complet :** `reclamations_complet.xlsx` (généré par `build_excel.py`).
