"""Génère les deux fichiers Excel de la démo « librairies GPSO ».

- mon_suivi_librairies_VUE.xlsx    : le fichier de suivi « joli » (une VUE)
- mon_suivi_librairies_DONNEE.xlsx : la même information, structurée (une DONNÉE)

Source : Base des librairies en France — Ministère de la Culture,
data.gouv.fr, Licence Ouverte 2.0 (public/data/base-librairies-2026-03.csv).

Usage : python3 scripts/build_ressources.py
"""
import csv
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public/data/base-librairies-2026-03.csv"
OUT = ROOT / "public/ressources"

GPSO = {  # code INSEE -> nom d'usage
    "92012": "Boulogne-Billancourt", "92022": "Chaville", "92040": "Issy-les-Moulineaux",
    "92047": "Marnes-la-Coquette", "92048": "Meudon", "92072": "Sèvres",
    "92075": "Vanves", "92077": "Ville-d'Avray",
}

with SRC.open(encoding="utf-8-sig") as f:
    rows = [
        {k.strip(): v.strip() for k, v in r.items()}
        for r in csv.DictReader(f, delimiter=";")
    ]
rows = [r for r in rows if r["code_commune"] in GPSO]
rows.sort(key=lambda r: (GPSO[r["code_commune"]], r["librairie"]))

thin = Side(style="thin", color="BBBBBB")
box = Border(left=thin, right=thin, top=thin, bottom=thin)

# ── 1. LA VUE : ce que tout le monde fait ─────────────────────────────────
wb = Workbook()
ws = wb.active
ws.title = "Suivi 2026"
ws.merge_cells("A1:D1")
ws["A1"] = "📚 SUIVI DES LIBRAIRIES DU TERRITOIRE — 2026"
ws["A1"].font = Font(bold=True, size=14, color="FFFFFF")
ws["A1"].fill = PatternFill("solid", fgColor="0F4C75")
ws["A1"].alignment = Alignment(horizontal="center")
ws["A2"] = "en vert = librairie labellisée  ·  données provisoires, à vérifier avec Paul"
ws["A2"].font = Font(italic=True, size=9, color="888888")
ws.append([])
ws.append(["Ville", "Librairie", "Spécialité", "Remarques"])
for c in ws[4]:
    c.font = Font(bold=True)
    c.fill = PatternFill("solid", fgColor="DDDDDD")
    c.border = box

# Spécialités écrites « à la main », comme dans la vraie vie
SAISIE = {"Généraliste": ["Généraliste", "généraliste", "Géné."], "BD et Mangas": ["BD / Mangas", "bd", "BD-Manga"],
          "Religion": ["Religieux"]}
green = PatternFill("solid", fgColor="C6EFCE")
r0 = 5
for code in sorted(GPSO, key=GPSO.get):
    libs = [r for r in rows if r["code_commune"] == code]
    if not libs:
        continue
    start = r0
    for i, r in enumerate(libs):
        variants = SAISIE.get(r["assortiment"], [r["assortiment"]])
        spe = variants[i % len(variants)]
        rem = ""
        if r["librairie"] == "ANAGRAMME":
            rem = "même enseigne Meudon + Sèvres ?"
        if r["librairie"] == "LES MOTS ET LES CHOSES NORD":
            rem = "2e boutique"
        ws.append(["", r["librairie"].title(), spe, rem])
        for c in ws[r0]:
            c.border = box
        if r["label"]:
            for c in ws[r0][1:3]:
                c.fill = green
        r0 += 1
    ws.cell(start, 1, f"{GPSO[code]} ({len(libs)})")
    ws.cell(start, 1).alignment = Alignment(vertical="center")
    ws.cell(start, 1).font = Font(bold=True)
    if r0 - 1 > start:
        ws.merge_cells(start_row=start, end_row=r0 - 1, start_column=1, end_column=1)
ws.append(["TOTAL", f"{len(rows)} librairies", "", ""])
for c in ws[r0]:
    c.font = Font(bold=True)
    c.border = box
for col, w in zip("ABCD", (26, 34, 16, 34)):
    ws.column_dimensions[col].width = w
wb.save(OUT / "mon_suivi_librairies_VUE.xlsx")

# ── 2. LA DONNÉE : la même information, structurée ───────────────────────
wb = Workbook()
ws = wb.active
ws.title = "librairies"
head = ["id", "librairie", "assortiment", "label", "commune", "code_commune", "annee_suivi"]
ws.append(head)
for i, r in enumerate(rows, 1):
    ws.append([f"LIB{i:03d}", r["librairie"], r["assortiment"], r["label"] or "aucun",
               GPSO[r["code_commune"]], r["code_commune"], 2026])
for c in ws[1]:
    c.font = Font(bold=True)
for row in ws.iter_rows(min_row=2, min_col=6, max_col=6):
    for c in row:
        c.number_format = "@"  # texte : on garde les zéros de tête (ex. 01004)
ws.freeze_panes = "A2"
ws.auto_filter.ref = ws.dimensions
for col, w in zip("ABCDEFG", (8, 30, 16, 8, 22, 14, 12)):
    ws.column_dimensions[col].width = w
dv = DataValidation(type="list", formula1='"aucun,LIR,LR"', allow_blank=False)
ws.add_data_validation(dv)
dv.add(f"D2:D{len(rows) + 200}")

dico = wb.create_sheet("dictionnaire")
dico.append(["colonne", "signification", "format / valeurs autorisées"])
for line in [
    ("id", "identifiant unique de la librairie, ne change jamais", "LIB + 3 chiffres"),
    ("librairie", "nom de la librairie", "texte"),
    ("assortiment", "spécialité principale", "liste nationale : Généraliste, BD et Mangas, Jeunesse, Religion…"),
    ("label", "label du ministère de la Culture", "aucun · LIR (indépendante de référence) · LR (de référence)"),
    ("commune", "nom de la commune", "texte"),
    ("code_commune", "code officiel INSEE — la clé pour la carte", "5 caractères, stocké en TEXTE"),
    ("annee_suivi", "année du relevé — l'an prochain on ajoute des lignes, pas un onglet", "AAAA"),
]:
    dico.append(list(line))
for c in dico[1]:
    c.font = Font(bold=True)
for col, w in zip("ABC", (16, 60, 60)):
    dico.column_dimensions[col].width = w
wb.save(OUT / "mon_suivi_librairies_DONNEE.xlsx")

print(f"{len(rows)} librairies GPSO -> {OUT}")
