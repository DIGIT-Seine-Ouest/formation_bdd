-- ═══════════════════════════════════════════════════════════════════════════
-- Formation « Vers des données robustes » — démos SQL live sur les données Yego
-- Moteur conseillé : DuckDB (https://duckdb.org — un exécutable, zéro install)
--   $ duckdb              puis copier-coller les requêtes
-- Mock data, structure réelle de l'API MDS Yego (/events, /trips, /vehicles).
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 0 · Charger les CSV (le « E-L » du ELT : on charge le brut, tel quel) ──
CREATE TABLE events   AS SELECT * FROM read_csv_auto('yego_events.csv');
CREATE TABLE trips    AS SELECT * FROM read_csv_auto('yego_trips.csv');
CREATE TABLE vehicles AS SELECT * FROM read_csv_auto('yego_vehicles.csv');
CREATE TABLE communes AS SELECT * FROM read_csv_auto('ref_communes_gpso.csv');

SELECT * FROM events LIMIT 5;   -- observer le brut : epoch ms, listes, GeoJSON…


-- ─── 1 · Le « T » du ELT : typer ce que l'API livre brut ────────────────────
-- L'API livre les temps en epoch MILLISECONDES → invisible à l'œil, il faut typer.
CREATE VIEW events_t AS
SELECT vehicle_id, device_id,
       to_timestamp(event_time / 1000)              AS event_ts,     -- ms → timestamp
       vehicle_state,
       trim(both '[]' from event_types)             AS event_type,   -- liste → valeur
       battery_pct,
       trip_id
FROM events;

CREATE VIEW trips_t AS
SELECT vehicle_id, device_id, trip_id,
       trip_duration, trip_distance,
       to_timestamp(start_time / 1000) AS start_ts,
       to_timestamp(end_time   / 1000) AS end_ts
FROM trips;

SELECT * FROM events_t LIMIT 5;    -- lisible. C'est ça, le bronze → silver.


-- ─── 2 · La slide du cours : reconstruire /trips depuis /events ─────────────
-- Filtrer + agréger + calculer = le pont OLTP → OLAP.
SELECT vehicle_id,
       trip_id,
       MIN(event_ts)                                   AS start_ts,
       MAX(event_ts)                                   AS end_ts,
       date_diff('second', MIN(event_ts), MAX(event_ts)) AS trip_duration_s
FROM events_t
WHERE event_type IN ('trip_start', 'trip_end')
GROUP BY vehicle_id, trip_id
ORDER BY start_ts
LIMIT 10;
-- Comparer avec : SELECT vehicle_id, trip_id, trip_duration FROM trips_t LIMIT 10;


-- ─── 3 · Le tableau de bord (les KPI de la partie 3) ────────────────────────
-- 3a. Trajets par jour
SELECT date_trunc('day', start_ts) AS jour,
       COUNT(*)                    AS nb_trajets,
       round(AVG(trip_duration) / 60, 1) AS duree_moy_min,
       round(SUM(trip_distance) / 1000.0, 1) AS km_total
FROM trips_t
GROUP BY 1 ORDER BY 1 DESC LIMIT 14;

-- 3b. Top 10 scooters les plus utilisés (juin)
SELECT vehicle_id, COUNT(*) AS nb_trajets,
       round(SUM(trip_distance) / 1000.0, 1) AS km
FROM trips_t
WHERE start_ts >= DATE '2026-06-01'
GROUP BY vehicle_id ORDER BY nb_trajets DESC LIMIT 10;

-- 3c. État de la flotte MAINTENANT (dernier événement de chaque scooter)
SELECT vehicle_state, COUNT(*) AS nb_scooters
FROM (
    SELECT vehicle_id, vehicle_state,
           row_number() OVER (PARTITION BY vehicle_id ORDER BY event_ts DESC) AS rn
    FROM events_t
) WHERE rn = 1
GROUP BY vehicle_state;

-- 3d. Scooters en batterie faible (< 20 %) au dernier pointage
SELECT vehicle_id, battery_pct, event_ts
FROM (
    SELECT vehicle_id, battery_pct, event_ts,
           row_number() OVER (PARTITION BY vehicle_id ORDER BY event_ts DESC) AS rn
    FROM events_t
) WHERE rn = 1 AND battery_pct < 0.20
ORDER BY battery_pct;


-- ─── 4 · Les jointures (partie 1 du cours, en vrai) ─────────────────────────
-- 4a. INNER JOIN : la batterie au départ de chaque trajet
SELECT t.vehicle_id, t.start_ts, t.trip_duration, e.battery_pct AS batterie_depart
FROM trips_t t
JOIN events_t e ON e.trip_id = t.trip_id AND e.event_type = 'trip_start'
LIMIT 10;

-- 4b. ANTI-JOINTURE : trajets SANS événements… pourquoi ?
SELECT count(*) AS trajets_sans_events,
       MIN(t.start_ts) AS du, MAX(t.start_ts) AS au
FROM trips_t t
LEFT JOIN events_t e ON e.trip_id = t.trip_id
WHERE e.trip_id IS NULL;
-- Réponse : tous AVANT le 1er juin. /events ne garde qu'une FENÊTRE de 30 jours.
-- ↑ C'est la gestion big data : le flux brut n'est pas conservé en base chaude.

-- 4c. FULL OUTER : rapprocher /vehicles (référentiel) et l'activité de juin
SELECT COALESCE(v.vehicle_id, a.vehicle_id) AS vehicle_id,
       v.battery_pct,
       a.nb_trajets,
       CASE WHEN a.vehicle_id IS NULL THEN '⚠ jamais roulé en juin'
            WHEN v.vehicle_id IS NULL THEN '⚠ absent du référentiel'
            ELSE 'ok' END AS diagnostic
FROM vehicles v
FULL OUTER JOIN (
    SELECT vehicle_id, COUNT(*) AS nb_trajets
    FROM trips_t WHERE start_ts >= DATE '2026-06-01'
    GROUP BY vehicle_id
) a ON a.vehicle_id = v.vehicle_id
ORDER BY diagnostic DESC, nb_trajets;


-- ─── 5 · Bonus : rattacher chaque trajet à sa commune (jointure spatiale) ───
-- Le vrai SIG ferait un ST_Contains sur les polygones ; ici : centre le + proche.
SELECT c.nom AS commune, COUNT(*) AS nb_trajets
FROM (
    SELECT trip_id,
           CAST(json_extract(e.event_location, '$.coordinates[1]') AS DOUBLE) AS lat,
           CAST(json_extract(e.event_location, '$.coordinates[0]') AS DOUBLE) AS lon
    FROM events e
    WHERE trim(both '[]' from e.event_types) = 'trip_start'
) d
JOIN LATERAL (
    SELECT nom FROM communes
    ORDER BY (communes.lat - d.lat)^2 + (communes.lon - d.lon)^2
    LIMIT 1
) c ON true
GROUP BY c.nom ORDER BY nb_trajets DESC;
