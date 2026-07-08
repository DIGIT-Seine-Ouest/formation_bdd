# Données Yego — formation « Vers des données robustes »

**Mock data, structure réelle** : ces fichiers sont générés (`build_yego_data.py`)
mais reproduisent fidèlement la structure de l'API MDS Yego
(`https://services.rideyego.com/mds/paris` : `/events`, `/trips`, `/vehicles`).

| Fichier | Rôle | Particularité pédagogique |
|---|---|---|
| `yego_events.csv` | OLTP — le flux brut (~10 000 lignes) | **Fenêtre de 30 jours seulement** (juin 2026), temps en epoch ms, `event_types` en liste |
| `yego_trips.csv` | OLAP — trajets consolidés (~11 500 lignes) | **90 jours** d'historique (avril→juin) → l'anti-jointure avec events révèle la fenêtre |
| `yego_vehicles.csv` | Référentiel flotte (60 scooters) | `device_id` (uuid, PK) vs `vehicle_id` (plaque, signifiant) |
| `ref_communes_gpso.csv` | Référentiel communes GPSO | pour la jointure spatiale simplifiée |
| `yego_trips_ods.csv` | **Prêt à publier sur Opendatasoft** | le « silver » : dates ISO typées, durée en minutes, commune déjà jointe, `geo_point_2d` |
| `yego_vehicles_ods.csv` | **Prêt à publier sur Opendatasoft** | le « silver » : `etat_libelle` FR déjà joint, batterie en 0–100, `geo_point_2d` |
| `ods_dashboard_yego.html` | Page personnalisée ODS complète | le tableau de bord final — chaque bloc = une requête ODSQL |

## Faire les démos en live

1. Télécharger [DuckDB](https://duckdb.org/#quickinstall) (un seul exécutable).
2. Se placer dans ce dossier, lancer `duckdb`.
3. Dérouler `exemples_yego.sql` section par section : chargement brut (E-L),
   typage (T), reconstruction de `/trips` depuis `/events`, tableau de bord,
   jointures et fenêtre big data.

## Publier sur Opendatasoft (data.seineouest.fr)

1. Publier `yego_trips_ods.csv` → dataset **`yego_trips_ods`** : typer
   `date_debut` / `date_fin` en **datetime** et `geo_point_2d` en **geo_point**.
2. Publier `yego_vehicles_ods.csv` → dataset **`yego_vehicles_ods`** : typer
   `derniere_maj` en **datetime** et `geo_point_2d` en **geo_point**.
3. Créer une page personnalisée et coller le contenu de
   `ods_dashboard_yego.html` (HTML + CSS).

**Pourquoi pas les fichiers bruts ?** ODS ne fait pas de jointure à la
requête : on publie le **silver** — typé, dénormalisé, la commune et les
libellés déjà joints. Les deux datasets dialoguent ensuite dans la page via
les contextes et les interactions (`refine`), pas par JOIN.
Les requêtes ODSQL du cours sont dans `exemples_odsql.md` — dont le bilan
par commune de la slide « Le passage OLTP → OLAP », rejouable tel quel.
