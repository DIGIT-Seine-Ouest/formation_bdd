# -*- coding: utf-8 -*-
"""Génère les données mock Yego pour la formation « Vers des données robustes ».

Mock data — mais structure STRICTEMENT calquée sur la vraie API MDS Yego
(https://services.rideyego.com/mds/paris : /trips, /vehicles, /events),
telle qu'inspectée dans gpso_yego_api.html (non versionné).

Choix pédagogiques volontaires, hérités du réel :
- event_time / start_time / end_time en EPOCH MILLISECONDES (comme l'API) →
  le « T » du ELT consiste à les convertir en timestamps.
- event_types est une LISTE dans une cellule ("[trip_start]") → à éclater.
- /events ne couvre qu'une FENÊTRE de 30 jours ; /trips couvre 90 jours →
  l'anti-jointure révèle la fenêtre (gestion big data).
- device_id (uuid, stable, non signifiant) vs vehicle_id (plaque lisible) →
  discussion clé primaire.

Sorties : yego_events.csv · yego_trips.csv · yego_vehicles.csv ·
ref_communes_gpso.csv (+ zip pour la page Ressources).
"""
import csv
import random
import uuid
from datetime import datetime, timedelta
from pathlib import Path

random.seed(42)
HERE = Path(__file__).parent

PROVIDER_NAME = "YEGO"
PROVIDER_ID = "da99028e-28b7-4dd3-ad23-41b7a045db8a"  # vrai provider_id public MDS

# Fenêtres temporelles (le cœur de la leçon big data)
TRIPS_START = datetime(2026, 4, 1)      # /trips : 90 jours d'historique
EVENTS_START = datetime(2026, 6, 1)     # /events : fenêtre de 30 jours seulement
PERIOD_END = datetime(2026, 6, 30, 23, 59)

# Communes GPSO (centres approximatifs)
COMMUNES = [
    ("C01", "Boulogne-Billancourt", 48.8352, 2.2409),
    ("C02", "Issy-les-Moulineaux", 48.8245, 2.2696),
    ("C03", "Meudon", 48.8079, 2.2318),
    ("C04", "Sèvres", 48.8222, 2.2109),
    ("C05", "Chaville", 48.8092, 2.1889),
    ("C06", "Ville-d'Avray", 48.8228, 2.1751),
    ("C07", "Vanves", 48.8206, 2.2895),
    ("C08", "Marnes-la-Coquette", 48.8283, 2.1651),
]
# Pondération réaliste : Boulogne/Issy concentrent l'usage
COMMUNE_WEIGHTS = [0.34, 0.26, 0.12, 0.09, 0.06, 0.05, 0.06, 0.02]

FLEET_SIZE = 60


def ms(dt):
    return int(dt.timestamp() * 1000)


def plate():
    letters = "ABDEGSWX"
    return (random.choice("GE") + random.choice(letters)
            + f"{random.randint(0, 999):03d}"
            + random.choice("FJLMPRTVY") + random.choice("BELMPR"))


def near(lat, lon, spread=0.008):
    return (round(lat + random.uniform(-spread, spread), 5),
            round(lon + random.uniform(-spread, spread), 5))


def geojson_point(lat, lon):
    return '{"type":"Point","coordinates":[%s,%s]}' % (lon, lat)


# ── Flotte ────────────────────────────────────────────────────────────────────
fleet = []
for _ in range(FLEET_SIZE):
    fleet.append({
        "device_id": str(uuid.UUID(int=random.getrandbits(128))),
        "vehicle_id": plate(),
        "battery": random.uniform(0.55, 1.0),
        "home": random.choices(COMMUNES, weights=COMMUNE_WEIGHTS)[0],
    })

# ── Trajets (90 jours) + événements (fenêtre 30 jours) ───────────────────────
trips, events = [], []

day = TRIPS_START
while day <= PERIOD_END:
    in_events_window = day >= EVENTS_START
    for v in fleet:
        # recharge nocturne
        v["battery"] = min(1.0, v["battery"] + random.uniform(0.25, 0.45))
        n_trips = random.choices([0, 1, 2, 3, 4, 5], weights=[12, 22, 28, 22, 11, 5])[0]
        t = day.replace(hour=6) + timedelta(minutes=random.randint(0, 120))
        for _ in range(n_trips):
            if t.hour >= 23 or v["battery"] < 0.08:
                break
            commune = random.choices(COMMUNES, weights=COMMUNE_WEIGHTS)[0]
            slat, slon = near(commune[2], commune[3])
            duration = random.randint(240, 2400)            # 4 à 40 min
            distance = int(duration * random.uniform(2.4, 4.2))  # ~10-15 km/h
            start, end = t, t + timedelta(seconds=duration)
            elat, elon = near(slat, slon, spread=0.02)
            trip_id = str(uuid.UUID(int=random.getrandbits(128)))
            drain = duration / 3600 * random.uniform(0.10, 0.16)

            trips.append({
                "provider_name": PROVIDER_NAME, "provider_id": PROVIDER_ID,
                "device_id": v["device_id"], "vehicle_id": v["vehicle_id"],
                "vehicle_type": "moped", "propulsion_types": "[electric]",
                "trip_id": trip_id, "trip_duration": duration,
                "trip_distance": distance, "accuracy": 15,
                "start_time": ms(start), "end_time": ms(end),
                "_commune": commune[1], "_lat": slat, "_lon": slon,
                "_start": start, "_end": end,
            })

            if in_events_window:
                base = {
                    "provider_name": PROVIDER_NAME, "provider_id": PROVIDER_ID,
                    "device_id": v["device_id"], "vehicle_id": v["vehicle_id"],
                    "vehicle_type": "moped", "propulsion_types": "[electric]",
                }
                # réservation ~70 % des trajets
                if random.random() < 0.7:
                    r = start - timedelta(minutes=random.randint(2, 12))
                    events.append({**base, "event_time": ms(r),
                                   "event_location": geojson_point(*near(slat, slon, 0.001)),
                                   "vehicle_state": "reserved",
                                   "event_types": "[reservation_start]",
                                   "battery_pct": round(v["battery"], 2), "trip_id": ""})
                events.append({**base, "event_time": ms(start),
                               "event_location": geojson_point(slat, slon),
                               "vehicle_state": "on_trip",
                               "event_types": "[trip_start]",
                               "battery_pct": round(v["battery"], 2), "trip_id": trip_id})
                v["battery"] = max(0.0, v["battery"] - drain)
                end_types = "[trip_end]"
                end_state = "available"
                if v["battery"] < 0.15:   # la vraie API concatène parfois les types
                    end_types = "[trip_end, battery_low]"
                    end_state = "non_operational"
                events.append({**base, "event_time": ms(end),
                               "event_location": geojson_point(elat, elon),
                               "vehicle_state": end_state, "event_types": end_types,
                               "battery_pct": round(v["battery"], 2), "trip_id": trip_id})
            else:
                v["battery"] = max(0.0, v["battery"] - drain)

            t = end + timedelta(minutes=random.randint(10, 150))

        # incidents réseau ~2 % des jours/scooter (dans la fenêtre)
        if in_events_window and random.random() < 0.02:
            lat, lon = near(v["home"][2], v["home"][3])
            events.append({
                "provider_name": PROVIDER_NAME, "provider_id": PROVIDER_ID,
                "device_id": v["device_id"], "vehicle_id": v["vehicle_id"],
                "vehicle_type": "moped", "propulsion_types": "[electric]",
                "event_time": ms(day.replace(hour=random.randint(0, 23))),
                "event_location": geojson_point(lat, lon),
                "vehicle_state": "non_operational", "event_types": "[comms_lost]",
                "battery_pct": round(v["battery"], 2), "trip_id": "",
            })
    day += timedelta(days=1)

events.sort(key=lambda e: e["event_time"])
trips.sort(key=lambda t: t["start_time"])

# ── Snapshot /vehicles (photo de la flotte à l'instant T) ────────────────────
# États et batteries tirés avec un Random DÉDIÉ (seed à part) : le snapshot est
# une photo de milieu de journée — pas l'état de fin de génération — et surtout
# on ne décale pas la séquence aléatoire de events/trips.
snap = random.Random(7)
snap_states = (["available"] * 41 + ["on_trip"] * 8
               + ["reserved"] * 6 + ["non_operational"] * 5)
snap.shuffle(snap_states)
SNAP_TYPES = {"available": "[trip_end]", "on_trip": "[trip_start]",
              "reserved": "[reservation_start]",
              "non_operational": "[battery_low]"}
low_left = 2  # + les 5 non_operational → 7 scooters sous 20 %

vehicles = []
for v, state in zip(fleet, snap_states):
    last = [e for e in events if e["device_id"] == v["device_id"]]
    lat, lon = near(v["home"][2], v["home"][3])
    v["_lat"], v["_lon"] = lat, lon
    if state == "non_operational":
        batt = snap.uniform(0.02, 0.14)
    elif state == "available" and low_left > 0:
        batt = snap.uniform(0.15, 0.19)
        low_left -= 1
    else:
        batt = snap.uniform(0.22, 1.0)
    vehicles.append({
        "provider_name": PROVIDER_NAME, "provider_id": PROVIDER_ID,
        "device_id": v["device_id"], "vehicle_id": v["vehicle_id"],
        "vehicle_type": "moped", "propulsion_types": "[electric]",
        "last_event_time": last[-1]["event_time"] if last else "",
        "last_vehicle_state": state,
        "last_event_types": SNAP_TYPES[state],
        "current_location": geojson_point(lat, lon),
        "battery_pct": round(batt, 2),
    })


def write(name, rows, fields=None):
    fields = fields or [k for k in rows[0].keys() if not k.startswith("_")]
    with open(HERE / name, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)
    print(f"{name}: {len(rows)} lignes")


write("yego_events.csv", events)
write("yego_trips.csv", trips)
write("yego_vehicles.csv", vehicles)
write("ref_communes_gpso.csv", [
    {"id_commune": c[0], "nom": c[1], "lat": c[2], "lon": c[3]} for c in COMMUNES
])


# ── Fichiers prêts-à-publier Opendatasoft (le « silver » : typé + joint) ─────
def iso(dt):
    return dt.strftime("%Y-%m-%dT%H:%M:%S")


trips_ods = [{
    "trip_id": t["trip_id"],
    "vehicle_id": t["vehicle_id"],
    "device_id": t["device_id"],
    "date_debut": iso(t["_start"]),
    "date_fin": iso(t["_end"]),
    "duree_min": round(t["trip_duration"] / 60, 1),
    "distance_m": t["trip_distance"],
    "commune": t["_commune"],
    "geo_point_2d": f'{t["_lat"]},{t["_lon"]}',
} for t in trips]

STATE_FR = {"available": "Disponible", "reserved": "Réservé",
            "on_trip": "En course", "non_operational": "Hors service"}
vehicles_ods = [{
    "device_id": w["device_id"],
    "vehicle_id": w["vehicle_id"],
    "vehicle_type": w["vehicle_type"],
    "etat": w["last_vehicle_state"],
    "etat_libelle": STATE_FR.get(w["last_vehicle_state"], w["last_vehicle_state"]),
    "battery_pct": round(w["battery_pct"] * 100),
    "derniere_maj": iso(datetime.fromtimestamp(w["last_event_time"] / 1000)) if w["last_event_time"] else "",
    "geo_point_2d": f'{v2["_lat"]},{v2["_lon"]}',
} for w, v2 in zip(vehicles, fleet)]

write("yego_trips_ods.csv", trips_ods)
write("yego_vehicles_ods.csv", vehicles_ods)
