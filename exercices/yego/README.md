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

## Faire les démos en live

1. Télécharger [DuckDB](https://duckdb.org/#quickinstall) (un seul exécutable).
2. Se placer dans ce dossier, lancer `duckdb`.
3. Dérouler `exemples_yego.sql` section par section : chargement brut (E-L),
   typage (T), reconstruction de `/trips` depuis `/events`, tableau de bord,
   jointures et fenêtre big data.
