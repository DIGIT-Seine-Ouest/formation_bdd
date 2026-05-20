# Livret Formateur — Chaos Engineering DIRMOB
**8–9 participants · 3 équipes · 1h15**

---

## Vue d'ensemble

```
Équipe A (3p)          Équipe B (3p)          Équipe C (2-3p)
prestataires    ──FK──▶ lignes_bus     ──FK──▶ reclamations
                                                    │
                                              ref_motifs (fournie)
```

La dépendance entre équipes EST le jeu. L'Équipe C ne peut pas avancer sans B, et B ne peut pas avancer sans A. La communication entre équipes simule exactement comment fonctionne une vraie base relationnelle.

---

## Fichiers à distribuer

| Équipe | Fichier à donner |
|---|---|
| A — Prestataires | `equipe_A_prestataires.xlsx` |
| B — Lignes de bus | `equipe_B_lignes_bus.xlsx` |
| C — Réclamations | `equipe_C_reclamations.xlsx` (contient déjà `ref_motifs`) |
| Formateur uniquement | `LIVRET_FORMATEUR.md` + `reclamations_complet.xlsx` |

---

## Déroulé minute par minute

### ① Lancement — 5 min

Distribuez les fichiers. Lisez à voix haute :

> *"Vous êtes trois équipes au sein du service données de la DIRMOB. Chaque équipe gère une table. Votre objectif commun : à la fin de la session, le directeur demande un bilan des réclamations par opérateur pour le trimestre. Si vos tables ne se parlent pas, vous ne pourrez pas répondre."*

Laissez chaque équipe lire ses consignes (feuille `📋 Consignes` dans leur fichier).

---

### ② Cadrage — 10 min

Chaque équipe répond par écrit à ces 3 questions avant de saisir quoi que ce soit :

1. Qu'est-ce qu'on enregistre dans notre table ?
2. Quelles questions devra-t-on pouvoir répondre depuis cette table ?
3. Quels champs viennent d'une autre table (FK) ?

**Passez dans les groupes.** Les blocages fréquents :
- Équipe B : "on met le nom du prestataire ou son ID ?" → c'est le moment de leur expliquer pourquoi on met l'ID (FK)
- Équipe C : "on met le numéro de ligne ou l'ID ?" → même chose

---

### ③ Saisie — Étape 1 : Équipe A démarre seule (10 min)

**Équipe A saisit ses prestataires.** Données à leur donner (distribuez ce carton) :

```
┌─────────────────────────────────────────────────────────────────┐
│  CARTON DONNÉES — ÉQUIPE A                                      │
│                                                                 │
│  id_prestataire  nom_prestataire          type_contrat          │
│  P001            Keolis Île-de-France     DSP                   │
│  P002            RATP Dev                 DSP                   │
│  P003            Transdev Île-de-France   DSP                   │
│  P004            ATM Croix du Sud         Convention            │
│                                                                 │
│  date_debut_contrat  date_fin_contrat                           │
│  P001 : 2022-01-01   2026-12-31                                 │
│  P002 : 2020-06-01   2025-05-31                                 │
│  P003 : 2021-03-01   2026-02-28                                 │
│  P004 : 2023-01-01   2027-12-31                                 │
└─────────────────────────────────────────────────────────────────┘
```

Pendant ce temps, **Équipe B et C** : finalisent leur cadrage écrit.

Quand Équipe A a fini → elle annonce à voix haute ses IDs à Équipe B.

---

### ④ Saisie — Étape 2 : Équipe B démarre (12 min)

**Équipe B saisit ses lignes de bus.** Données à leur donner :

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CARTON DONNÉES — ÉQUIPE B                                                  │
│                                                                             │
│  id_ligne  numero  id_prestataire  communes_desservies              actif   │
│  L389      389     P004            Boulogne-Billancourt/Issy/Meudon    1    │
│  L169      169     P003            Clamart/Châtillon/Vanves             1    │
│  L323      323     P003            Meudon/Issy-les-Moulineaux           1    │
│  L191      191     P003            Meudon/Clamart                       1    │
│  L289      289     P001            Vanves/Châtillon                     1    │
│  L058      58      P002            Meudon/Issy/Boulogne-Billancourt     1    │
│  L160      160     P002            Montrouge/Malakoff/Châtillon         1    │
│                                                                             │
│  type_service : toutes "local" sauf à préciser                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

Quand Équipe B a fini → elle annonce à voix haute ses IDs de lignes à Équipe C.

Pendant ce temps, **Équipe C** peut commencer à préparer ses colonnes et vérifier ref_motifs.

---

### ⑤ Saisie — Étape 3 : Équipe C saisit les réclamations (15 min)

**Équipe C saisit les réclamations.** Distribuez le carton progressivement — 5 réclamations d'abord, puis 5 autres, puis le reste.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  CARTON DONNÉES — ÉQUIPE C (lot 1 — premières saisies)                                               │
│                                                                                                      │
│  id  date_recl.   id_ligne  id_motif  commune              objet_libre                               │
│  1   2024-01-03   L389      1         Meudon               Retard important à l'arrêt Meudon-Val     │
│  2   2024-01-05   L323      2         Meudon               Horaires incorrects appli mobile          │
│  3   2024-01-08   L191      4         Clamart              Chauffeur impoli envers passagère          │
│  4   2024-01-09   L389      5         Meudon               Bus bondé, impossible de monter           │
│  5   2024-01-15   L289      6         Vanves               Abribus vandalisé, vitre cassée           │
│                                                                                                      │
│  date_cloture / cloturee :                                                                           │
│  1 → 2024-01-05 / 1   2 → NULL / 0   3 → 2024-01-10 / 1   4 → 2024-01-15 / 1   5 → 2024-01-20 / 1 │
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  CARTON DONNÉES — ÉQUIPE C (lot 2)                                                                   │
│                                                                                                      │
│  id  date_recl.   id_ligne  id_motif  commune              objet_libre                               │
│  6   2024-02-02   L169      1         Clamart              Retard de 20 minutes à Clamart gare        │
│  7   2024-02-07   L058      2         Issy-les-Moulineaux  Mauvais affichage à l'arrêt Michelet       │
│  8   2024-02-14   L389      1         Meudon               Retard récurrent ligne 389 matin           │
│  9   2024-02-21   L323      3         Issy-les-Moulineaux  Suppression sans information voyageurs     │
│  10  2024-02-28   L160      4         Châtillon            Conducteur n'a pas attendu les PMR         │
│                                                                                                      │
│  date_cloture / cloturee :                                                                           │
│  6 → 2024-02-04/1   7 → NULL/0   8 → 2024-02-15/1   9 → 2024-02-28/1   10 → NULL/0                 │
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  CARTON DONNÉES — ÉQUIPE C (lot 3 — données de chaos)                                                │
│                                                                                                      │
│  id  date_recl.   id_ligne  id_motif  commune              objet_libre                               │
│  11  2024-03-04   L389      1         Boulogne-Bill.       Retard 30 min — correspondance ratée      │
│  12  2024-03-07   L191      1         Meudon               Retard série sur ligne 191 semaine 10      │
│  13  2024-03-12   L289      5         Vanves               Bus saturé heure de pointe                 │
│  14  2024-03-15   L058      6         Issy-les-Moulineaux  Abri bus détruit avenue de Verdun          │
│  15  2024-03-20   L323      3         Meudon               Service supprimé sans SMS ni affichage     │
│  16  2024-03-22   L169      4         Clamart              Conducteur a refusé embarquement vélo      │
│  17  2024-03-28   L160      1         Montrouge            Retard 15 min — correspondance T3          │
│  18  2024-04-02   L389      1         Meudon               Nouveau retard ligne 389 — 4e ce mois      │
│                                                                                                      │
│  date_cloture / cloturee :                                                                           │
│  11→NULL/0  12→2024-03-14/1  13→2024-03-18/1  14→NULL/0  15→2024-03-22/1  16→NULL/0  17→NULL/0  18→NULL/0 │
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### ⑥ Chaos Engineering — Questions progressives (15 min)

Posez les questions à voix haute. Les équipes y répondent **ensemble** en interrogeant leurs fichiers.

#### Niveau 1 — Chaque équipe répond depuis sa propre table

> "Équipe A : combien de prestataires avez-vous sous contrat DSP ?"
> → `COUNTIF(type_contrat,"DSP")` = 3

> "Équipe C : combien de réclamations sont encore non clôturées ?"
> → `COUNTIF(cloturee,0)` = 7

> "Équipe C : quel motif est le plus fréquent ?"
> → `COUNTIF(id_motif,1)` = 7 (Retard) — id=1

#### Niveau 2 — Croisement inter-équipes (communication orale)

> "Combien de réclamations concernent des lignes Transdev ?"
> → Équipe B identifie les lignes Transdev (L169, L323, L191) · Équipe C compte les réclamations sur ces lignes

> "Quelle commune cumule le plus de réclamations ?"
> → `COUNTIF(commune,"Meudon")` etc.

#### Niveau 3 — Jointure réelle en Excel

> "Bilan réclamations non clôturées par opérateur ?"
> → Nécessite : Équipe C (id_ligne) → Équipe B (id_prestataire) → Équipe A (nom_prestataire)
> → Si chaque équipe a ses données propres : COUNTIFS croisés possibles
> → Si une équipe a tout copié en dur : laborieux et risqué d'erreur

**Réponse attendue :**
| Opérateur | Réclamations non clôturées |
|---|---|
| ATM Croix du Sud | 3 (L389 : r1-non, r11, r18) |
| Transdev | 2 (L323:r2, L169:r16) |
| RATP Dev | 3 (L058:r7, L160:r10, L160:r17) |
| Keolis | 1 (L289:r14) |

#### Niveau 4 — CHAOS

> "Le directeur veut : pour chaque ligne ayant plus de 2 réclamations sur mars 2024, le nom de l'opérateur et le nombre de réclamations encore ouvertes."
> → L389 : 2 réclamations mars (r11+r18→ toutes 2 ouvertes) · opérateur ATM Croix du Sud
> → Réponse possible en < 5 min si la structure est propre · impossible à la main sinon.

---

### ⑦ Bascule OLTP → OLAP — 10 min

Chaque équipe crée une feuille `tableau_de_bord` dans le fichier Équipe C et remplit :

| Indicateur | Formule |
|---|---|
| Total réclamations | `=COUNTA(reclamations!A3:A100)-1` |
| Non clôturées | `=COUNTIF(reclamations!H3:H100,0)` |
| Clôturées | `=COUNTIF(reclamations!H3:H100,1)` |
| Réclamations Retard | `=COUNTIF(reclamations!D3:D100,1)` |
| Réclamations Suppression | `=COUNTIF(reclamations!D3:D100,3)` |
| Réclamations sur Meudon | `=COUNTIF(reclamations!E3:E100,"Meudon")` |

**Point pédagogique clé à dire à voix haute :**
> *"Ces formules ne changent jamais. Si on saisit une 19e réclamation, le tableau se met à jour seul. C'est ça la puissance du OLTP : vous saisissez des faits, et l'OLAP se construit automatiquement dessus."*

---

### ⑧ Débrief — 5 min

1. **Qu'est-ce qui vous a bloqué au Niveau 3 ?** → Réponse attendue : la jointure entre tables
2. **Pourquoi l'Équipe B a-t-elle attendu l'Équipe A ?** → Les FK créent une dépendance réelle — c'est voulu
3. **Que se passe-t-il si ATM change de nom ?** → 1 cellule à modifier dans `prestataires` · les réclamations ne bougent pas · c'est la puissance de la normalisation
4. **Quelle différence entre votre feuille `ref_motifs` et un champ texte libre ?** → Homogénéité garantie · ajout de motif = 1 ligne, pas une convention à communiquer à tout le monde

---

## Correction de référence

`reclamations_complet.xlsx` contient le modèle complet :
- 7 tables normalisées avec FK
- Tableau de bord avec COUNTIFS automatiques
- Structure proche de ce que les équipes auraient dû produire

Montrer en débrief pour comparer avec la production des équipes.

---

## Timing résumé

| Phase | Durée | Qui travaille |
|---|---|---|
| Lancement + lecture consignes | 5 min | Tout le monde |
| Cadrage (3 questions) | 10 min | Tout le monde |
| Saisie A (prestataires) | 10 min | Équipe A · B+C finalisent cadrage |
| Saisie B (lignes_bus) | 12 min | Équipe B · C prépare colonnes |
| Saisie C lot 1+2 (réclamations) | 10 min | Équipe C · A+B en relecture |
| Saisie C lot 3 + finalisation | 5 min | Équipe C |
| Chaos Engineering (questions) | 15 min | Tout le monde |
| OLAP — tableau de bord | 10 min | Tout le monde sur fichier C |
| Débrief | 5 min | Formateur + salle |
| **Total** | **1h22** | |
