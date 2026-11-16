import sys; sys.path.insert(0, 'scripts')
import build_ressources as B
from openpyxl import load_workbook
S = sys.argv[1]
for n in range(1, 10):
    B.classeur_tuto(n).save(f"{S}/xl/etape-{n}.xlsx")
for nom, cel, zoom in [("vue", "A5", 110), ("titre", "A1", 150), ("fusion", "A6", 150), ("couleur", "B7", 150),
                       ("deux_infos", "C7", 150), ("valeurs", "D7", 150), ("anagramme", "B17", 150)]:
    wb = load_workbook("public/ressources/exercice_aide_memoire.xlsx")
    ws = wb["Librairies"]; B._vue(ws, cel, zoom)
    if nom == "anagramme": ws.sheet_view.topLeftCell = "A16"
    wb.save(f"{S}/xl/vendredi_{nom}.xlsx")
wb = load_workbook("public/ressources/exercice_aide_memoire.xlsx")
wb.active = 1; B._vue(wb["Récap (2)"], "B4"); wb["Librairies"].sheet_view.tabSelected = False
wb.save(f"{S}/xl/vendredi_recap.xlsx")
