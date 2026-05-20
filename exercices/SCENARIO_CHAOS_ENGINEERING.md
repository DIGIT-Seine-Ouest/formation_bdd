# Chaos Engineering — Serious Game DIRMOB
**Durée totale : 1h15 · Groupes : 2 équipes de 3–4 personnes**

---

## Concept

Inspiré du *Chaos Engineering* pratiqué chez Netflix : on injecte des perturbations progressives pour tester la robustesse d'un système. Ici, la perturbation c'est la **question de gestion**. Si la base de données tient → l'équipe répond en 2 minutes. Si elle est mal construite → l'équipe rame, cherche à la main, et finit par ne pas pouvoir répondre.

> L'objectif n'est pas de gagner. C'est de **vivre** la différence entre une donnée exploitable et une donnée stockée.

---

## Matériaux à préparer

| Fichier | Rôle | Statut |
|---|---|---|
| `fil_rouge_sale.xlsx` | Fichier de départ donné aux équipes — volontairement dégradé | ⚠ À créer (voir spec §4) |
| `ligne_de_bus_simplifie.xlsx` | Référentiel lignes — donné comme source externe | ⚠ À créer (voir spec §5) |
| `reclamations_complet.xlsx` | Modèle de correction — pour le formateur uniquement | ✅ Existant |
| Ce document | Feuille de route formateur | ✅ |

---

## Déroulé — 4 actes

### Acte 0 — Le brief (5 min)

Le formateur lit à voix haute :

> *"Vous venez de rejoindre la DIRMOB. Votre prédécesseur vous laisse un fichier Excel pour gérer les réclamations usagers. Il part demain. Vous héritez de tout. Bonne chance."*

Chaque équipe reçoit `fil_rouge_sale.xlsx`.

**Consigne :** Avant de toucher quoi que ce soit, répondez aux 3 questions de cadrage sur une feuille :
1. Qu'est-ce qu'on enregistre ici ? (entité + attributs)
2. Pour répondre à quelles questions métier ?
3. Avons-nous déjà certaines de ces informations ailleurs ?

*Durée : 5 min · Pas de production Excel, juste réflexion écrite.*

---

### Acte 1 — Construction OLTP (25 min)

**Objectif :** Reconstruire une table `reclamations` propre dans un nouveau fichier Excel.

**Règles imposées :**
- 1 seule feuille nommée `reclamations`
- 1 ligne = 1 réclamation
- Colonne `id_reclamation` obligatoire (clé primaire)
- Aucune couleur ne doit porter d'information
- Aucune cellule ne doit contenir plusieurs valeurs
- Les motifs doivent être une liste fermée (énumération) — créer une feuille `ref_motifs`
- Les lignes de bus doivent pointer vers `ligne_de_bus_simplifie.xlsx` via un identifiant

**Colonnes minimales attendues :**

| Colonne | Type | Contrainte |
|---|---|---|
| `id_reclamation` | Entier | PK, unique, non null |
| `date_reclamation` | Date (YYYY-MM-DD) | Non null |
| `id_motif` | Entier | FK → ref_motifs |
| `id_ligne` | Texte | FK → ligne_de_bus_simplifie |
| `id_commune` | Entier | FK → ref_communes (à créer si voulu) |
| `objet_libre` | Texte | Description libre, seul champ texte libre autorisé |
| `date_cloture` | Date ou NULL | NULL = non clôturée |
| `cloturee` | Booléen (0/1) | |

**Ressource fournie :** `ligne_de_bus_simplifie.xlsx` (voir §5) — les équipes peuvent s'en servir pour peupler `id_ligne`.

*Durée : 25 min · Chaque équipe saisit au moins 15 réclamations fictives.*

---

### Acte 2 — Chaos Engineering (30 min)

Le formateur distribue les questions par **niveaux**, une par une. Chaque équipe répond sur sa propre base.

**Règle de scoring :**
- Réponse correcte en < 3 min : **3 points**
- Réponse correcte en 3–7 min : **1 point**
- Impossible de répondre (structure ne le permet pas) : **0 point + analyse collective**

---

#### Niveau 1 — Warm-up · COUNTIF basique

> Q1 : Combien de réclamations avez-vous saisies au total ?

> Q2 : Combien de réclamations sont encore non clôturées ?

> Q3 : Quel est le motif le plus fréquent ?

*Ce niveau doit être trivial si la structure est propre. Si une équipe rame → c'est révélateur.*

---

#### Niveau 2 — Filtre · Agrégation par catégorie

> Q4 : Combien de réclamations pour motif "Retard" sont encore ouvertes ?

> Q5 : Combien de réclamations par commune ?

> Q6 : Quel mois concentre le plus de réclamations ?

*Nécessite des colonnes atomiques et un type date correct.*

---

#### Niveau 3 — Multi-table · Jointure obligatoire

> Q7 : Quel opérateur cumule le plus de réclamations ?

> Q8 : Sur la ligne 389 uniquement, combien de réclamations retard sont encore ouvertes ?

> Q9 : Quel est le délai moyen de clôture (en jours) toutes lignes confondues ?

*Impossible si l'opérateur est copié en dur dans chaque ligne de réclamation (duplication). Nécessite la jointure avec `ligne_de_bus_simplifie`.*

---

#### Niveau 4 — Chaos · Requêtes composées

> Q10 : Bilan mensuel des réclamations par opérateur — uniquement pour les lignes desservant Meudon ou Issy-les-Moulineaux.

> Q11 : Pour chaque ligne ayant plus de 2 réclamations non clôturées, afficher le nombre de jours depuis la première réclamation ouverte.

> Q12 : Comparer les deux équipes — quelle proportion de réclamations "Retard" chacune a-t-elle clôturée en moins de 5 jours ?

*Si la structure n'est pas normalisée, ces questions sont manuellement impossibles à répondre en temps limité. C'est le moment de basculer.*

---

### Acte 3 — OLTP → OLAP (15 min)

**Objectif :** Construire le tableau de bord depuis la base construite en Acte 1.

Chaque équipe crée une nouvelle feuille `tableau_de_bord` dans son fichier, avec :

| Indicateur | Formule attendue |
|---|---|
| Total réclamations | `=COUNTA(reclamations!A:A)-1` |
| Non clôturées | `=COUNTIF(reclamations!cloturee,"0")` |
| Clôturées | `=COUNTIF(reclamations!cloturee,"1")` |
| Par motif | `=COUNTIF(reclamations!id_motif, <id>)` |
| Par commune | `=COUNTIF(reclamations!id_commune, <id>)` |

**Point pédagogique à souligner :** ces formules ne changent jamais. Quand une nouvelle réclamation est saisie, le tableau se met à jour automatiquement. C'est ça, la puissance d'une structure OLTP bien faite.

---

## Debriefing collectif (5 min)

Questions à poser à la salle :

1. Quelles questions du Niveau 3–4 ont été impossibles à répondre, et pourquoi ?
2. Qu'est-ce qui vous a obligé à dupliquer des données ?
3. Si vous refaisiez le cadrage (Acte 0), que changeriez-vous ?
4. Que se passe-t-il si un opérateur change de nom demain dans votre fichier ?

---

## Spec — Fichier `fil_rouge_sale.xlsx` à créer

Le fichier doit reproduire les **3 frictions** du Module 3. Environ 20–25 lignes de données.

### Friction 1 — Onglet par ligne de bus
Créer 3 feuilles séparées : `Ligne 389`, `Ligne 169`, `Ligne 323`.
Chacune a le même format approximatif, sans colonne `id_ligne`.

### Friction 2 — Statut par couleur
Pas de colonne `statut` ni `cloturee`. Les lignes en rouge = urgentes, en vert = clôturées, sans jaune = en attente. Aucun texte ne porte cette info.

### Friction 3 — Valeurs concaténées
Colonne `motifs` avec des valeurs comme `"retard + propreté"`, `"attitude + retard + bruit"`.
Colonne `intervenant` avec `"Dupont Marie — j.dupont@..."` (nom + email collés).

### Colonnes suggérées pour chaque feuille
| date | intervenant | ligne | motifs | commentaire |
|---|---|---|---|---|
| 05/03/2024 | Dupont Marie — j.dupont@... | 389 - Keolis | retard + propreté | conducteur impoli |

---

## Spec — Fichier `ligne_de_bus_simplifie.xlsx` à créer

Extraire depuis `ligne_de_bus.xlsx` uniquement les colonnes utiles, dédupliquées par ligne.

**Colonnes à garder :**

| id_ligne | numero_ligne | operateur | communes_desservies |
|---|---|---|---|
| L389 | 389 | ATM Croix du Sud | Boulogne-Billancourt, Issy-les-Moulineaux, Meudon |
| L169 | 169 | Transdev | Clamart, Châtillon, Vanves |
| L323 | 323 | Transdev | Meudon, Issy-les-Moulineaux |
| L191 | 191 | Transdev | Meudon, Clamart |
| L289 | 289 | Keolis | Vanves, Châtillon |
| L058 | 58 | RATP | Meudon, Issy-les-Moulineaux, Boulogne-Billancourt |

*Source : déduire depuis `ligne_de_bus.xlsx` en filtrant sur `route_long_name` + `operatorname` + `nom_commune`.*

---

## Modèle de correction

`reclamations_complet.xlsx` contient la structure cible :
- `reclamations` — table principale (FK vers tous les référentiels)
- `ref_motifs` — Retard / Information voyageurs / Suppression / Comportement / Confort / Infrastructure
- `ref_canaux` — Téléphone / Email / Téléphone+Email / Téléphone+Courrier
- `ref_communes` — 5 communes avec code postal
- `ref_lignes_locales` — 6 lignes avec opérateur
- `ref_lignes_regionales` — lignes régionales (N118 Transilien)
- `ref_declarants` — déclarants anonymisés
- `📊 Tableau de bord` — COUNTIFS automatiques

Le formateur peut montrer ce fichier en débrief pour comparer avec ce que les équipes ont produit.
