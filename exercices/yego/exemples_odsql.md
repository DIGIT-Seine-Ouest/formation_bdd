# Rejouer les KPI dans Opendatasoft (ODSQL)

Une fois `yego_vehicles.csv` (et éventuellement `yego_trips.csv`) publiés comme
jeux de données sur **data.seineouest.fr** (Opendatasoft), les blocs du
tableau de bord s'écrivent en **ODSQL** — même logique que le SQL du cours,
autre dialecte. À passer dans l'Explore API v2 :

```
/api/explore/v2.1/catalog/datasets/yego_vehicles/records?...
```

## Les KPI flotte (dataset `yego_vehicles`)

| Bloc du dashboard | Paramètres ODSQL |
|---|---|
| Flotte totale | `select=count(*)` |
| Flotte disponible | `select=count(*)` `&where=last_vehicle_state != "non_operational"` |
| Batterie < 20 % | `select=count(*)` `&where=battery_pct < 0.2` |
| État de la flotte (répartition) | `select=last_vehicle_state, count(*) as nb` `&group_by=last_vehicle_state` |
| Batterie moyenne par état | `select=last_vehicle_state, avg(battery_pct) as batt_moy` `&group_by=last_vehicle_state` |

## Les KPI usage (dataset `yego_trips`)

> Penser à typer `start_time` en date lors de la publication (l'API livre de
> l'epoch ms — c'est le « T » du chargement, ODS le fait dans le processing).

| Bloc du dashboard | Paramètres ODSQL |
|---|---|
| Trajets en juin | `select=count(*)` `&where=start_ts >= date'2026-06-01'` |
| Durée moyenne | `select=avg(trip_duration) as duree_moy` |
| Trajets par semaine | `select=count(*) as nb` `&group_by=date_format(start_ts, 'YYYY-ww')` |
| Top scooters | `select=vehicle_id, count(*) as nb` `&group_by=vehicle_id` `&order_by=nb desc` `&limit=10` |

## L'idée à retenir

Le portail Open Data **est** une couche OLAP : chaque appel `group_by` est une
vue calculée à la demande sur la table publiée. SQL, ODSQL, TCD Excel —
trois dialectes, un seul geste : **filtrer, agréger, calculer**.
