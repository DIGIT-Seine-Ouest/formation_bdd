# Du besoin métier au tableau de suivi : construire le fichier pas à pas

### Formation « Vers des données robustes »

Ce guide accompagne le fichier de correction. Il ne répète pas la théorie : il montre **comment le fichier a été construit**, pour que vous sachiez le **refaire vous-même**. On part toujours d'un besoin réel, on identifie l'**entité** (le « quoi ? »), on liste ses **attributs** (les colonnes), on en fait une **table**, et on vérifie avec le **test de la phrase** (une ligne doit se lire comme une phrase claire).

> Les formules sont données telles que vous les verrez dans Excel en français (séparateur `;`).

---

## Le scénario : 3 questions métier

Tout part de trois questions auxquelles on doit répondre régulièrement, vite, et sans recompter à la main :

1. **Quelle ligne pose le plus de problèmes ?**
2. **Quelle commune est la plus touchée ?**
3. **Quel prestataire génère le plus de réclamations ?**

Tout l'atelier sert à une seule chose : pouvoir répondre à ces trois questions **automatiquement**, à chaque nouvelle saisie. Gardez-les en tête, on y revient à la fin.

## La démarche en deux temps

Pour répondre, il nous faut trois entités : **PRESTATAIRE**, **LIGNE DE BUS** et **RÉCLAMATION**. On les aborde en deux temps.

**Temps 1 : on construit la structure (pour valider la compétence).**
Les tables des prestataires et des lignes sont en général **déjà saisies par les collègues**. On les recrée quand même ensemble, parce que l'objectif ici est de **valider qu'on sait concevoir une structure propre** : besoin, entité, attributs, table, test de la phrase.

**Temps 2 : le vif du sujet, on récupère et on enrichit.**
Dans la vraie vie, ces données sont **maintenues par les collègues, qui en sont responsables**. Moi, en charge du suivi des réclamations, je ne les ressaisis pas : je les **récupère** (par jointure) pour **alimenter ma propre table** et produire le tableau de suivi qui répond aux 3 questions.

---

# TEMPS 1 : construire une structure propre

## Entité 1 : PRESTATAIRE

### L'entité et le besoin

Une **entité** est un « quoi » que l'on veut décrire. Ici : l'entreprise qui exploite des lignes de bus. On a besoin de savoir **qui** c'est, **sous quel contrat** elle opère et **jusqu'à quand**. C'est l'entité la plus autonome (elle ne dépend d'aucune autre), on commence donc par elle.

### La table `prestataires`

| id_prestataire | raison_sociale | nom_commercial | type_contrat | date_debut | date_fin | telephone | email | commune_siege | statut |
|---|---|---|---|---|---|---|---|---|---|
| P001 | Keolis Île-de-France SA | Keolis IDF | Marché public | 01/01/2022 | 31/12/2027 | 01 41 00 10 10 | contact@keolis-idf.fr | Boulogne-Billancourt | Actif |
| P003 | Transdev Île-de-France SA | Transdev IDF | DSP | 01/01/2021 | 31/12/2028 | 01 55 00 30 00 | contact@transdev-idf.fr | Meudon | Actif |

### Les attributs, un par un

- **`id_prestataire`** : l'**identifiant unique** (clé primaire, PK). Unique, stable, non signifiant : `P003`, jamais `Transdev-DSP`. C'est lui qui permettra aux autres tables de pointer vers ce prestataire sans recopier son nom.
- **`raison_sociale`** / **`nom_commercial`** : texte. La dénomination légale et le nom d'usage.
- **`type_contrat`** : une **énumération** (liste fermée : `DSP` ou `Marché public`). Une valeur qui se répète, donc une liste de choix, pas du texte libre.
- **`date_debut`** / **`date_fin`** : type **date** (et non du texte). On pourra calculer dessus (durée, échéance) ; ce sera décisif pour la réclamation.
- **`telephone`**, **`email`**, **`commune_siege`** : texte de contact.
- **`statut`** : énumération (`Actif`, …).

### Le test de la phrase

> « Le prestataire **P003** (*Transdev Île-de-France SA*) opère en **DSP**, du **01/01/2021** au **31/12/2028**. »

La ligne se lit en une phrase claire et sans ambiguïté : la table est bien construite.

---

## Entité 2 : LIGNE DE BUS

### L'entité et le besoin

Deuxième entité : la ligne de bus. On veut son **code**, son **parcours**, et surtout **qui l'exploite**. Cette dernière information fait apparaître la **jointure**.

### La table `lignes_bus`

| id_ligne | code_ligne | libelle | type_ligne | id_prestataire | date_mise_en_service | accessibilite_pmr | statut |
|---|---|---|---|---|---|---|---|
| L169 | 169 | Pont de Sèvres - Champ de Mars | Régulière | **P003** | 01/09/2012 | Oui | Active |
| L389 | 389 | Boulogne - Chaville Rive Droite | Régulière | **P004** | 12/04/2010 | Oui | Active |

- **`id_ligne`** : clé primaire (PK) de la ligne (`L169`).
- **`code_ligne`** : le numéro public (`169`). On le distingue de la PK : la PK sert à la machine, le code sert aux voyageurs.
- **`id_prestataire`** : **clé étrangère (FK)**, voir ci-dessous.

### La notion de jointure (le point clé de cette table)

La colonne **`id_prestataire`** ne contient pas « Transdev », mais `P003`. C'est une **clé étrangère** : elle **pointe vers la clé primaire** de la table `prestataires`.

Pourquoi ? Parce qu'on ne **réécrit jamais** une information qui appartient à une autre table. Si on recopiait « Transdev Île-de-France SA » sur chaque ligne, le moindre changement (rachat, renommage) obligerait à corriger partout. Avec la FK, l'info est saisie **une seule fois** chez le prestataire et **récupérée par jointure** quand on en a besoin. Une ligne a un seul prestataire, mais un prestataire a plusieurs lignes (relation **1 à N**).

### Les communes et `passe_par` : une relation N à N

Une ligne traverse **plusieurs communes**, et une commune est traversée par **plusieurs lignes**. On crée donc :

- une table **`communes`** (`id_commune`, `nom_commune`, `code_postal`) ;
- une **table de liaison `passe_par`** (`id_ligne`, `id_commune`, `ordre`) qui relie les deux.

| id_ligne | id_commune | ordre |
|---|---|---|
| L169 | C003 (Meudon) | 1 |
| L169 | C002 (Issy-les-Moulineaux) | 2 |
| L169 | C004 (Marne-la-Coquette) | 3 |

C'est le motif classique d'une **relation N à N** : deux clés étrangères dans une table dédiée.

### Le test de la phrase

> « La ligne **L169** (*code 169, Pont de Sèvres - Champ de Mars*), de type *Régulière*, est exploitée par le prestataire **P003** et dessert les communes Meudon, Issy-les-Moulineaux, Marne-la-Coquette… »

---

# TEMPS 2 : récupérer les données des collègues et répondre aux questions

Les deux tables précédentes **appartiennent aux collègues**, qui les saisissent et les maintiennent. Moi, en charge du suivi des réclamations, je n'ai pas à les ressaisir : je vais les **récupérer** pour **enrichir ma table** et répondre à mes 3 questions. C'est ici que tout converge.

## Entité 3 : RÉCLAMATION

### L'entité et le besoin

La **réclamation** est la **table des faits** : on la remplit au fil de l'eau, **une ligne par réclamation**. C'est l'écriture terrain (**OLTP**). Tout le reste existe pour la décrire et l'analyser.

### La structure de saisie (colonnes A à I)

| Colonne | Type / choix | Rôle |
|---|---|---|
| `id_reclamation` | PK (`R001`) | identifiant unique, stable, non signifiant |
| `date_reception` | date | quand la réclamation arrive |
| `canal` | **liste déroulante** | `Téléphone`, `Email`, `Guichet`… |
| `numero_ligne` | **liste déroulante (FK)** | le code de la ligne concernée |
| `commune` | liste / texte | où se situe le problème |
| `motif` | **liste déroulante** | `Retard`, `Confort / Surcharge`… (1 info, pas « retard + propreté ») |
| `objet` | texte libre | la description en clair |
| `cloturee` | 0 / 1 | traitée ou non |
| `date_cloture` | date | quand elle a été traitée |

**Choix de construction :**

- `canal`, `motif`, `numero_ligne` sont des **listes déroulantes** (feuille `listes` + plages nommées `L_CANAL`, `L_MOTIF`, `L_NUM`). On évite que la machine voie `Retard`, `retard` et `RETARD` comme trois valeurs différentes.
- La liste des numéros de ligne est **reliée en direct à la table des collègues**. La cellule `listes!C2` contient :

  ```
  =SI([1]lignes_bus!B2=0;"";[1]lignes_bus!B2)
  ```

  `[1]` désigne le fichier `lignes_bus.xlsx` des collègues. Si une ligne est ajoutée chez eux, le choix apparaît automatiquement dans le menu. Je récupère leur travail, je ne le recopie pas.

### Le test de la phrase

> « La réclamation **R001**, reçue le **05/02/2024** par **téléphone**, concerne la ligne **169** à **Meudon**, pour un motif de **retard** ; elle a été **clôturée** le 08/02/2024. »

### Enrichir : récupérer les données des collègues (colonnes J, K, L)

Pour répondre aux questions, ma table a besoin d'informations qui vivent chez les collègues (le prestataire, son type de marché, sa date de fin de contrat). Je vais les **récupérer par jointure**, sans les ressaisir :

```
J  prestataire        =RECHERCHEV(RECHERCHEV($D2;[1]lignes_bus!$B$1:$E$200;4;0);[2]prestataires!$A$1:$F$50;2;0)
K  type_marche        =RECHERCHEV(RECHERCHEV($D2;[1]lignes_bus!$B$1:$E$200;4;0);[2]prestataires!$A$1:$F$50;4;0)
L  date_fin_contrat   =RECHERCHEV(RECHERCHEV($D2;[1]lignes_bus!$B$1:$E$200;4;0);[2]prestataires!$A$1:$F$50;6;0)
```

C'est une **RECHERCHEV imbriquée**, qui suit le chemin relationnel en **deux sauts** :

1. **RECHERCHEV intérieure** : `RECHERCHEV($D2; [1]lignes_bus!$B$1:$E$200; 4; 0)` cherche le numéro de ligne (`$D2`, par exemple `169`) dans le fichier des lignes et renvoie la **4ᵉ colonne** de la plage B:E, soit **`id_prestataire`**. Résultat : `169` devient `P003`.
2. **RECHERCHEV extérieure** : on prend ce `P003` et on le cherche dans le fichier des prestataires (`$A$1:$F$50`) pour renvoyer la `raison_sociale` (colonne **2**), le `type_contrat` (colonne **4**) ou la `date_fin` (colonne **6**). Résultat : `P003` devient `Transdev Île-de-France SA`.

`[1]` = `lignes_bus.xlsx`, `[2]` = `prestataires.xlsx` : la jointure va chercher **directement dans les fichiers des collègues**. Le `0` final impose une correspondance **exacte**.

### Enrichir : les colonnes calculées (M, N)

```
M  ecart_fin_contrat_j   =$L2-$B2
N  alerte_fin_contrat    =SI($M2<0;"Contrat expiré";SI($M2<=548;"Échéance proche";"Suivi normal"))
```

- **`M`** soustrait deux dates (`date_fin_contrat` moins `date_reception`) et donne un **nombre de jours**. Possible uniquement parce que les dates sont de vrai type date.
- **`N`** traduit ce nombre en alerte lisible : négatif = contrat déjà terminé, moins de 548 jours (~18 mois) = échéance proche, sinon suivi normal.

### Enrichir : les colonnes de temps (O, P)

```
O  annee       =SI($B2="";"";ANNEE($B2))
P  trimestre   =SI($B2="";"";"T"&ARRONDI.SUP(MOIS($B2)/3;0))
```

On **extrait** l'année et le trimestre de la date de réception, pour filtrer et regrouper dans le bilan.

---

## Le tableau de suivi : répondre aux 3 questions

Une fois la table propre et enrichie, le bilan (**OLAP**) se calcule tout seul.

### L'état du traitement (3 indicateurs)

```
Réclamations reçues   =NBVAL(reclamations!$A$2:$A$27)
Taux de clôture       =SIERREUR(NB.SI(reclamations!$H$2:$H$27;1)/NBVAL(reclamations!$A$2:$A$27);0)
En cours              =NB.SI(reclamations!$H$2:$H$27;0)
```

`NBVAL` compte les lignes, `NB.SI` compte celles qui remplissent une condition (`1` = clôturée, `0` = en cours). On obtient : **26 reçues, 54 % clôturées, 12 en cours**.

### Les 4 tableaux croisés dynamiques

Le **tableau croisé dynamique (TCD)** est l'outil qui compte et regroupe à notre place. À partir de la table propre, on en fait un par **prestataire**, par **commune**, par **ligne** et par **motif**.

**Comment construire le TCD par prestataire :**

1. Cliquer dans la table `reclamations` (une cellule suffit).
2. Menu **Insertion → Tableau croisé dynamique**, puis valider (Excel détecte la plage `A1:P27` tout seul).
3. Dans le volet de droite, glisser le champ **`prestataire`** dans la zone **Lignes**.
4. Glisser le champ **`id_reclamation`** dans la zone **Valeurs**. Comme c'est du texte, Excel choisit automatiquement **Nombre de** (un comptage, pas une somme). On obtient le nombre de réclamations par prestataire.

On répète l'opération en mettant `commune`, puis `numero_ligne`, puis `motif` en **Lignes**. Quand de nouvelles réclamations sont saisies, un **clic droit → Actualiser** met le TCD à jour. Exemple, le TCD par prestataire :

| Étiquettes de lignes | Nombre de réclamations |
|---|---|
| ATM Croix du Sud SARL | 5 |
| Keolis Île-de-France SA | 2 |
| RATP Dev SACS | 5 |
| Transdev Île-de-France SA | **14** |
| Total général | 26 |

### Les 3 réponses : on lit le champion dans le TCD

Chaque réponse va chercher, dans le TCD correspondant, **la ligne qui a le plus de réclamations**. Pour le prestataire (le TCD occupe `A17:A20` pour les noms et `B17:B20` pour les nombres) :

```
Q1 - Prestataire   =INDEX(A17:A20;EQUIV(MAX(B17:B20);B17:B20;0))
                   =MAX(B17:B20)&" réclamations"
```

`MAX` trouve le plus grand nombre de réclamations, `EQUIV` repère **à quelle position** il se trouve, `INDEX` renvoie **le nom** à cette position. Même principe pour la commune (`A27:A34` / `B27:B34`) et pour la ligne (`D27:D34` / `E27:E34`).

Résultat, les 3 questions du départ trouvent leur réponse, automatiquement :

| Question | Formule | Réponse |
|---|---|---|
| **Q1** Quel prestataire génère le plus de réclamations ? | `=INDEX(A17:A20;EQUIV(MAX(B17:B20);B17:B20;0))` | **Transdev (14)** |
| **Q2** Quelle commune est la plus touchée ? | `=INDEX(A27:A34;EQUIV(MAX(B27:B34);B27:B34;0))` | **Meudon (7)** |
| **Q3** Quelle ligne pose le plus de problèmes ? | `=INDEX(D27:D34;EQUIV(MAX(E27:E34);E27:E34;0))` | **169 (10)** |

---

## La récompense

On a soigné l'**écriture terrain** (saisie OLTP : une ligne par réclamation, une info par cellule, des listes fermées, des identifiants propres) et **récupéré** ce que les collègues maintiennent déjà (jointure, sans double-saisie). En échange, le **bilan suit tout seul** (lecture OLAP : indicateurs, TCD et réponses aux 3 questions), mis à jour à chaque nouvelle saisie. C'est exactement ce que fait ce fichier de correction.

---

# Annexe : documentation des formules Excel

Toutes les fonctions utilisées dans le fichier, avec leur syntaxe (en français, séparateur `;`), leur rôle et l'usage qu'on en fait ici.

### Recherche et jointure

**`RECHERCHEV(valeur_cherchée ; plage ; n°_colonne ; FAUX)`**
Cherche une valeur dans la **première colonne** d'une plage et renvoie ce qui se trouve sur la même ligne, dans la colonne demandée. Le `0` (ou `FAUX`) impose une correspondance **exacte**.
*Dans le fichier :* `RECHERCHEV($D2;[1]lignes_bus!$B$1:$E$200;4;0)` transforme le numéro de ligne en `id_prestataire`. Imbriquée, elle réalise la jointure ligne → prestataire.

### Conditions

**`SI(test ; valeur_si_vrai ; valeur_si_faux)`**
Renvoie une valeur ou une autre selon qu'une condition est vraie ou fausse. On peut l'**imbriquer** pour enchaîner plusieurs cas.
*Dans le fichier :* `SI($M2<0;"Contrat expiré";SI($M2<=548;"Échéance proche";"Suivi normal"))` classe l'alerte de fin de contrat.

**`SIERREUR(valeur ; valeur_si_erreur)`**
Renvoie la valeur, sauf si elle produit une erreur (par exemple une division par zéro), auquel cas elle renvoie la valeur de repli.
*Dans le fichier :* `SIERREUR( … /NBVAL(…) ; 0)` évite l'erreur quand il n'y a aucune réclamation.

### Comptage

**`NBVAL(plage)`**
Compte le nombre de cellules **non vides**.
*Dans le fichier :* `NBVAL(reclamations!$A$2:$A$27)` = le nombre total de réclamations.

**`NB.SI(plage ; critère)`**
Compte les cellules qui remplissent **une condition**.
*Dans le fichier :* `NB.SI(reclamations!$H$2:$H$27;1)` = le nombre de réclamations clôturées ; `NB.SI(…;0)` = celles en cours.

### Trouver le champion

**`MAX(plage)`**
Renvoie le plus grand nombre d'une plage.

**`EQUIV(valeur ; plage ; 0)`**
Renvoie la **position** (le rang) d'une valeur dans une plage. Le `0` impose une correspondance exacte.

**`INDEX(plage ; n°_position)`**
Renvoie la valeur située à une **position** donnée dans une plage.
*Dans le fichier, les trois ensemble :* `INDEX(A17:A20;EQUIV(MAX(B17:B20);B17:B20;0))` lit le plus grand nombre de réclamations (`MAX`), trouve sa position (`EQUIV`) et renvoie le nom correspondant (`INDEX`). C'est la réponse automatique à une question métier.

### Dates et temps

**`ANNEE(date)`** / **`MOIS(date)`**
Extraient l'année (ou le mois, de 1 à 12) d'une date.

**`ARRONDI.SUP(nombre ; n_décimales)`**
Arrondit à l'entier (ou à la décimale) **supérieur**.
*Dans le fichier :* `"T"&ARRONDI.SUP(MOIS($B2)/3;0)` calcule le trimestre (`T1` à `T4`) à partir du mois.

### Opérateurs utiles

- **`&`** : colle deux textes bout à bout (concaténation). *Exemple :* `MAX(B17:B20)&" réclamations"` donne `14 réclamations`.
- **`-`** entre deux dates : renvoie un **nombre de jours**. *Exemple :* `$L2-$B2` = jours entre la fin de contrat et la réception.
- **`$`** (références absolues) : `$A$2:$A$27` reste figé quand on recopie la formule vers le bas ; `$D2` fige la colonne D mais laisse la ligne s'adapter.
- **`[1]` / `[2]`** : renvoient à un **autre fichier** (lien externe), ici `lignes_bus.xlsx` et `prestataires.xlsx` des collègues.
