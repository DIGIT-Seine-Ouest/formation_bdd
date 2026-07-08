# Rejouer les KPI dans Opendatasoft (ODSQL)

On publie les deux fichiers « silver » sur **data.seineouest.fr** :

| Fichier | Dataset ODS | Typage à vérifier au processing |
|---|---|---|
| `yego_trips_ods.csv` | `yego-trips` | `date_debut` / `date_fin` → **datetime** · `geo_point_2d` → **geo_point** |
| `yego_vehicles_ods.csv` | `yego-vehicles` | `derniere_maj` → **datetime** · `geo_point_2d` → **geo_point** |

Pas de jointure à faire : ODS ne joint pas à la requête, donc la commune est
**déjà dans** `yego-trips` et le libellé d'état déjà dans `yego-vehicles`
(c'est exactement le rôle du « silver »). Les requêtes passent par
l'Explore API v2 :

```
/api/explore/v2.1/catalog/datasets/yego-trips/records?...
```

## La requête de la slide « Le passage OLTP → OLAP » (dataset `yego-trips`)

Le bilan par commune du cours, tel quel :

```
select=commune, count(*) as nb_trajets, avg(duree_min) as duree_moy
&where=date_debut >= date'2026-06-01'
&group_by=commune
&order_by=nb_trajets desc
```

Résultat attendu : 8 lignes — Boulogne-Billancourt 1 252 (21,6 min),
Issy-les-Moulineaux 999 (22,0 min), Meudon 453 (21,8 min)…

## Les KPI usage (dataset `yego-trips`)

| Bloc du dashboard | Paramètres ODSQL |
|---|---|
| Trajets en juin | `select=count(*)` `&where=date_debut >= date'2026-06-01'` |
| Durée moyenne | `select=avg(duree_min) as duree_moy` |
| Km parcourus | `select=sum(distance_m)/1000 as km` |
| Trajets par jour | `select=date_format(date_debut, 'YYYY-MM-dd') as jour, count(*) as nb` `&group_by=jour` `&order_by=jour` |
| Trajets par semaine | `select=count(*) as nb` `&group_by=date_format(date_debut, 'YYYY-ww')` |
| Top scooters | `select=vehicle_id, count(*) as nb` `&group_by=vehicle_id` `&order_by=nb desc` `&limit=10` |

## Les KPI flotte (dataset `yego-vehicles`)

> `battery_pct` est déjà en 0–100 dans le fichier silver (0–1 dans l'API brute
> — la conversion, c'est le « T » du chargement).

| Bloc du dashboard | Paramètres ODSQL |
|---|---|
| Flotte totale | `select=count(*)` |
| Flotte disponible | `select=count(*)` `&where=etat = 'available'` → 41 / 60 |
| Batterie < 20 % | `select=count(*)` `&where=battery_pct < 20` → 7 scooters |
| État de la flotte (répartition) | `select=etat_libelle, count(*) as nb` `&group_by=etat_libelle` `&order_by=nb desc` |
| Batterie moyenne par état | `select=etat_libelle, avg(battery_pct) as batt_moy` `&group_by=etat_libelle` |

## L'idée à retenir

Le portail Open Data **est** une couche OLAP : chaque appel `group_by` est une
vue calculée à la demande sur la table publiée. SQL, ODSQL, TCD Excel —
trois dialectes, un seul geste : **filtrer, agréger, calculer**.
