"""Génère le kit de la formation « Valoriser le potentiel des données » (fil rouge : Rémi et les librairies).

public/ressources/
  gabarit_base.xlsx                  le classeur vierge pour démarrer sa propre base (saisie · listes · synthese · dictionnaire)
  correction_suivi_librairies.xlsx   saisie · synthese · communes · listes · dictionnaire (vraies formules)
  cheat_sheet_librairies.docx        les notions en 2 pages
  guide_construction_librairies.docx le pas-à-pas, formule par formule, avec les prompts Delos

Sources : Base des librairies en France (Ministère de la Culture, data.gouv.fr, Licence Ouverte 2.0)
          + populations légales (geo.api.gouv.fr).
Usage : python3 scripts/build_ressources.py   (nécessite openpyxl et python-docx)
"""
import csv
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.formatting.rule import FormulaRule
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.worksheet.table import Table, TableStyleInfo

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public/data/base-librairies-2026-03.csv"
OUT = ROOT / "public/ressources"
OUT.mkdir(parents=True, exist_ok=True)

COMMUNES = [  # code INSEE, nom, population légale
    ("92012", "Boulogne-Billancourt", 119019), ("92022", "Chaville", 20594),
    ("92040", "Issy-les-Moulineaux", 67669), ("92047", "Marnes-la-Coquette", 1752),
    ("92048", "Meudon", 46334), ("92072", "Sèvres", 22303),
    ("92075", "Vanves", 28622), ("92077", "Ville-d'Avray", 11089),
]
NOM = {c: n for c, n, _ in COMMUNES}
ASSORTIMENTS = ["Généraliste", "BD et Mangas", "Jeunesse", "Religion", "Arts - Musées et Monuments",
                "Mieux-être et spiritualité", "VO", "Imaginaire - Policier", "SHS", "Voyage", "Autres"]
LABELS = ["aucun", "LIR", "LR"]

with SRC.open(encoding="utf-8-sig") as f:
    brut = [{k.strip(): v.strip() for k, v in r.items()} for r in csv.DictReader(f, delimiter=";")]
LIBS = sorted((r for r in brut if r["code_commune"] in NOM), key=lambda r: (r["code_commune"], r["librairie"]))
LIBS = [dict(id=f"LIB{i:03d}", nom=r["librairie"], assort=r["assortiment"], label=r["label"] or "aucun",
             code=r["code_commune"]) for i, r in enumerate(LIBS, 1)]

thin = Side(style="thin", color="BBBBBB")
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
VERT = PatternFill("solid", fgColor="C6EFCE")
GRIS = PatternFill("solid", fgColor="F2F2F2")
BLEU = PatternFill("solid", fgColor="1F4E79")
VERT_EXCEL = PatternFill("solid", fgColor="E2F0D9")


def largeurs(ws, w):
    for col, x in zip("ABCDEFGHIJ", w):
        ws.column_dimensions[col].width = x


# ── 1. Le gabarit vierge (Ép. 4 « À vous ! ») ───────────────────────────────
def gabarit():
    """Un classeur prêt à remplir : saisie (id + vos attributs) · listes · synthese · dictionnaire."""
    wb = Workbook()
    ws = wb.active
    ws.title = "saisie"
    ws.append(["id", "attribut_1", "attribut_2", "attribut_3", "attribut_4", "annee_suivi"])
    ws.append(["XXX-001", "", "", "", "", 2026])
    tab = Table(displayName="T_saisie", ref="A1:F2")
    tab.tableStyleInfo = TableStyleInfo(name="TableStyleMedium4", showRowStripes=False)
    ws.add_table(tab)
    largeurs(ws, (12, 22, 22, 22, 22, 14))
    ws["H1"] = "Remplacez attribut_1… par vos en-têtes (courts, minuscules, sans espace). Une ligne = une chose."
    ws["H1"].font = Font(italic=True, color="888888")
    wl = wb.create_sheet("listes")
    wl.append(["liste_1", "liste_2"])
    wl["D1"] = "Une colonne par liste de valeurs autorisées (Données › Validation des données › Liste)."
    wl["D1"].font = Font(italic=True, color="888888")
    wsy = wb.create_sheet("synthese")
    wsy["A1"] = "JE PRÉSENTE — ici, tout est calculé à partir de l'onglet saisie (NB.SI, RECHERCHEV, TCD…). Rien n'est tapé."
    wsy["A1"].font = Font(bold=True, color="FFFFFF")
    wsy["A1"].fill = BLEU
    wsy["A3"], wsy["B3"] = "Nombre de lignes", "=NBVAL(saisie!A:A)-1"
    largeurs(wsy, (40, 14))
    wd = wb.create_sheet("dictionnaire")
    wd.append(["colonne", "signification", "format / valeurs autorisées", "exemple"])
    wd.append(["id", "identifiant unique, ne change jamais", "XXX + 3 chiffres", "XXX-001"])
    for c in wd[1]:
        c.font = Font(bold=True)
    largeurs(wd, (16, 50, 40, 14))
    wb.save(OUT / "gabarit_base.xlsx")


# ── 2. La correction : la base de données de Rémi ───────────────────────────
def _colonnes(n):
    """Colonnes de l'onglet saisie à l'étape n du tuto de Delos (cf. etapeSaisie dans src/remi.js)."""
    cols = ["id", "librairie", "assortiment", "label"]  # on part de la structure de l'Ép. 2
    cols += (["code_commune"] if n >= 7 else []) + ["commune"] + (["annee_suivi"] if n >= 8 else [])
    return cols


def _vue(ws, cellule, zoom=150):
    ws.sheet_view.zoomScale = zoom
    ws.sheet_view.selection[0].activeCell = cellule
    ws.sheet_view.selection[0].sqref = cellule


SELECTION = {1: "A1", 2: "E3", 3: "D4", 4: "A2", 5: "C2", 6: "A2", 7: "F2", 8: "G2", 9: "B13"}


def classeur_tuto(n):
    """Le classeur de Rémi tel qu'il est à la fin de l'étape n (1 à 9) du tuto de Delos."""
    wb = Workbook()
    ws = wb.active
    ws.title = "saisie"
    cols = _colonnes(n)
    L = {c: "ABCDEFG"[i] for i, c in enumerate(cols)}
    ws.append(cols)
    if n >= 2:
        for i, l in enumerate(LIBS, 2):
            val = dict(id=l["id"], librairie=l["nom"], assortiment=l["assort"], label=l["label"],
                       code_commune=l["code"], commune=NOM[l["code"]], annee_suivi=2026)
            if n >= 7:
                val["commune"] = f"=VLOOKUP({L['code_commune']}{i},communes!$A:$B,2,0)"
            ws.append([val[c] for c in cols])
            if n >= 7:
                ws[f"{L['code_commune']}{i}"].number_format = "@"
                ws[f"{L['commune']}{i}"].fill = GRIS
                ws[f"{L['commune']}{i}"].font = Font(italic=True, color="555555")
        der = len(LIBS) + 1
        fin = L[cols[-1]]
        tab = Table(displayName="T_saisie", ref=f"A1:{fin}{der}")
        tab.tableStyleInfo = TableStyleInfo(name="TableStyleMedium4", showRowStripes=False)
        ws.add_table(tab)
        if n >= 4:  # rien dans la couleur : c'est la colonne label qui décide
            ws.conditional_formatting.add(f"A2:{fin}{der}", FormulaRule(formula=[f'${L["label"]}2="LIR"'], fill=PatternFill("solid", fgColor="C6EFCE", bgColor="C6EFCE")))
    largeurs(ws, [dict(id=9, librairie=32, assortiment=18, label=9, code_commune=17, commune=22, annee_suivi=14)[c] for c in cols])
    _vue(ws, SELECTION[n] if n < 9 else "A2")
    if n >= 5:
        wl = wb.create_sheet("listes")
        wl.append(["assortiment", "label", "code_commune"])
        for i in range(max(len(ASSORTIMENTS), len(COMMUNES))):
            wl.append([ASSORTIMENTS[i] if i < len(ASSORTIMENTS) else None,
                       LABELS[i] if i < len(LABELS) else None,
                       COMMUNES[i][0] if i < len(COMMUNES) and n >= 7 else None])
        if n < 7:
            wl["C1"] = None
        for c in wl[1]:
            c.font = Font(bold=True)
        largeurs(wl, (28, 10, 14))
        _vue(wl, "A2")
        valid = [("assortiment", "$A$2:$A$12"), ("label", "$B$2:$B$4")] + ([("code_commune", "$C$2:$C$9")] if n >= 7 else [])
        for col, ref in valid:
            dv = DataValidation(type="list", formula1=f"=listes!{ref}", allow_blank=False, showErrorMessage=True,
                                errorTitle="Valeur non autorisée",
                                error="Choisissez une valeur de la liste (onglet listes).")
            ws.add_data_validation(dv)
            dv.add(f"{L[col]}2:{L[col]}500")
    if n >= 7:
        _communes(wb)
    if n >= 9:
        _synthese(wb)
        _dictionnaire(wb)
    wb.calculation.fullCalcOnLoad = True
    return wb


def correction():
    wb = classeur_tuto(9)
    wb.save(OUT / "correction_suivi_librairies.xlsx")


def _communes(wb):
    # communes (la table des collègues)
    wc = wb.create_sheet("communes")
    wc.append(["code_commune", "commune", "population"])
    for c in COMMUNES:
        wc.append(list(c))
    for r in range(2, len(COMMUNES) + 2):
        wc[f"A{r}"].number_format = "@"
    for c in wc[1]:
        c.font = Font(bold=True)
    wc["E1"] = "Table maintenue par les collègues (populations légales INSEE). On ne la recopie pas : on la récupère par jointure."
    wc["E1"].font = Font(italic=True, color="888888")
    largeurs(wc, (14, 24, 12))
    _vue(wc, "A2")


KPI_SYNTHESE = [
    ("Librairies suivies", "=COUNTA(saisie!A:A)-1"),
    ("Labellisées (LIR)", '=COUNTIF(saisie!D:D,"LIR")'),
    ("Généralistes", '=COUNTIF(saisie!C:C,"Généraliste")'),
    ("Pour 10 000 habitants", "=A3/SUM(communes!C:C)*10000"),
]


def _synthese(wb):
    # synthese (je présente) : 4 chiffres clés, formules simples, et le TCD en dessous (A5).
    # Rien n'est saisi ici : tout est lu dans « saisie » (et « communes » pour la population).
    wsy = wb.create_sheet("synthese")
    wsy.merge_cells("A1:D1")
    wsy["A1"] = "TABLEAU DE SUIVI — LIBRAIRIES GPSO"
    wsy["A1"].font = Font(bold=True, color="FFFFFF", size=13)
    wsy["A1"].fill = BLEU
    wsy["A1"].alignment = Alignment(horizontal="center")
    for col, (titre, formule) in zip("ABCD", KPI_SYNTHESE):
        wsy[f"{col}2"] = titre
        wsy[f"{col}2"].font = Font(color="555555", size=9)
        wsy[f"{col}2"].alignment = Alignment(horizontal="center")
        wsy[f"{col}3"] = formule
        wsy[f"{col}3"].font = Font(bold=True, color="375623", size=24)
        wsy[f"{col}3"].fill = VERT_EXCEL
        wsy[f"{col}3"].alignment = Alignment(horizontal="center", vertical="center")
    wsy.row_dimensions[3].height = 42
    wsy["D3"].number_format = "0.00"
    wsy["A5"] = "↓ ici, le TCD : Insertion › Tableau croisé dynamique › Feuille de calcul existante › synthese!$A$5"
    wsy["A5"].font = Font(italic=True, color="888888")
    largeurs(wsy, (26, 22, 22, 24))
    _vue(wsy, "B3")


def _dictionnaire(wb):
    # dictionnaire
    wd = wb.create_sheet("dictionnaire")
    wd.append(["colonne", "signification", "format / valeurs autorisées", "exemple"])
    for line in [
        ("id", "identifiant unique de la librairie, ne change jamais", "LIB + 3 chiffres", "LIB013"),
        ("librairie", "nom de la librairie", "texte", "ANAGRAMME"),
        ("assortiment", "spécialité principale", "liste (onglet listes)", "Généraliste"),
        ("label", "label du ministère de la Culture", "aucun · LIR (indépendante de référence) · LR (de référence)", "LIR"),
        ("code_commune", "code officiel INSEE de la commune : la clé de la jointure", "5 caractères, format Texte", "92048"),
        ("commune", "nom de la commune, CALCULÉ par jointure avec l'onglet communes (ne pas saisir)", "formule RECHERCHEV", "Meudon"),
        ("annee_suivi", "année du relevé : l'an prochain on ajoute des lignes, pas un onglet", "AAAA", "2026"),
    ]:
        wd.append(list(line))
    for c in wd[1]:
        c.font = Font(bold=True)
    largeurs(wd, (16, 62, 52, 14))

    _vue(wd, "A1")


# ── 3. Les documents Word ───────────────────────────────────────────────────
BLEU_D = RGBColor(0x0F, 0x4C, 0x75)


def doc_base(titre, sous_titre):
    d = Document()
    st = d.styles["Normal"]
    st.font.name = "Calibri"
    st.font.size = Pt(10.5)
    t = d.add_heading(titre, 0)
    t.runs[0].font.color.rgb = BLEU_D
    p = d.add_paragraph(sous_titre)
    p.runs[0].italic = True
    return d


def encadre(d, texte, couleur="E6F5FC"):
    t = d.add_table(rows=1, cols=1)
    cell = t.rows[0].cells[0]
    cell.text = texte
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:fill"), couleur)
    cell._tc.get_or_add_tcPr().append(shd)
    d.add_paragraph()


def tableau(d, entetes, lignes):
    t = d.add_table(rows=1, cols=len(entetes))
    t.style = "Light Grid Accent 1"
    for c, h in zip(t.rows[0].cells, entetes):
        c.text = h
    for l in lignes:
        for c, v in zip(t.add_row().cells, l):
            c.text = str(v)
    d.add_paragraph()


def code(d, texte):
    p = d.add_paragraph()
    r = p.add_run(texte)
    r.font.name = "Consolas"
    r.font.size = Pt(9.5)
    r.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)


def puces(d, items):
    for i in items:
        d.add_paragraph(i, style="List Bullet")


PROMPTS = [
    ("Cadrer", "Je dois suivre les librairies de mon territoire et répondre chaque année à ces 3 questions : [vos questions]. "
               "Propose-moi une table : l'entité, les colonnes, le type de chaque colonne et les valeurs autorisées."),
    ("Diagnostiquer", "Voici les en-têtes et 5 lignes de mon fichier : [coller]. Liste les problèmes de structure "
                      "(cellules fusionnées, plusieurs infos par case, couleurs, types, onglets éclatés) et propose la correction."),
    ("Formuler", "Écris la formule Excel en français (séparateur ;) qui renvoie la commune ayant le plus de librairies, "
                 "à partir des colonnes B (commune) et C (nombre). Explique-la en une phrase."),
    ("Documenter", "À partir de ces colonnes : [coller], rédige le dictionnaire des données : colonne, définition, "
                   "format, valeurs autorisées, exemple."),
]


def cheat_sheet():
    d = doc_base("À retenir", "Formation « Valoriser le potentiel des données » — Rémi et les librairies")
    d.add_heading("La chose à retenir", 1)
    encadre(d, "On sépare « j'enregistre » (la base : une table brute, une ligne par fait) de « je présente » "
               "(la synthèse : elle lit, filtre et compte la base, elle ne réécrit rien). Soignez l'enregistrement, la présentation suit toute seule.")
    d.add_heading("1. Qu'est-ce qu'une base de données ?", 1)
    d.add_paragraph("Des informations sur une chose (l'entité : une librairie, un article, une association) et ses "
                    "caractéristiques (les attributs), rangées pour être retrouvées, comptées et mises à jour. "
                    "On part du réel : une liste de faits → l'entité (le « quoi ? ») → ses attributs (les colonnes) → la table.")
    d.add_heading("2. Le vocabulaire", 1)
    tableau(d, ["mot", "c'est…", "chez Rémi"], [
        ("table", "l'ensemble des lignes d'une même entité", "librairies"),
        ("enregistrement", "une ligne = une chose", "la librairie LIB003"),
        ("attribut / champ", "une colonne = une caractéristique", "label"),
        ("valeur", "le contenu d'une case", "LIR"),
        ("identifiant (clé primaire)", "unique, stable, sans signification", "LIB013 (jamais « Anagramme-Meudon »)"),
        ("clé étrangère", "un identifiant qui pointe vers une autre table", "code_commune → communes"),
    ])
    d.add_paragraph("Le test de la phrase : « Les Mots et les Choses est une librairie généraliste de Boulogne-Billancourt, "
                    "labellisée LIR ; son identifiant est LIB003. » Si chaque ligne se lit comme une phrase claire, "
                    "la table est bien construite.")
    d.add_heading("3. Deux logiques : j'enregistre / je présente", 1)
    tableau(d, ["", "J'enregistre (OLTP)", "Je présente (OLAP)"], [
        ("Principe", "1 fait = 1 ligne", "vue consolidée, agrégée"),
        ("Rythme", "au fil de l'eau", "à la demande"),
        ("Objectif", "ne rien perdre", "comprendre et piloter"),
        ("Exemples", "relevé de compte, onglet saisie", "bilan du mois, TCD, tableau de suivi"),
    ])
    d.add_heading("4. Avant la première colonne : 3 questions", 1)
    puces(d, ["J'enregistre quoi ? → l'entité (une librairie) et ses attributs.",
              "Pour quel usage ? → les questions auxquelles la table doit répondre chaque année.",
              "J'ai déjà cette info ailleurs ? → si oui, jointure ; sinon, nouvelle colonne."])
    d.add_heading("5. Les 4 règles fondatrices", 1)
    puces(d, ["1 colonne = 1 information : « Généraliste (LIR) » → assortiment + label.",
              "Atomicité : une valeur indivisible par case : « faite (mars ?) » → date_visite = 2026-03-12.",
              "Le bon type : texte, nombre, date, booléen, énumération (liste fermée). Vide ≠ 0.",
              "L'identifiant unique : unique, stable, sans signification."])
    d.add_paragraph("Dès qu'une valeur se répète, c'est une liste fermée (liste déroulante) : « bd », « BD » et « Bd » font 3 valeurs pour la machine.")
    d.add_heading("6. Les 3 erreurs du fichier de Rémi", 1)
    tableau(d, ["erreur", "symptôme", "correction"], [
        ("Éclatement", "un onglet par commune : aucun total transverse", "une seule table + colonne code_commune"),
        ("Encodage par la couleur", "le label est du vert : invisible pour la machine, perdu à l'export", "colonne label = LIR · LR · aucun"),
        ("Listes dans une cellule", "« BD + mangas », « Généraliste (LIR) » : comptage impossible", "une information par colonne"),
    ])
    d.add_paragraph("Racine commune : confondre le fichier fait pour l'œil (présenter) et la base faite pour la machine (enregistrer).")
    d.add_heading("7. La récompense", 1)
    d.add_paragraph("Une table propre → TCD en 4 clics, filtres instantanés, formules qui se mettent à jour à chaque saisie :")
    code(d, "=NBVAL(saisie!A:A)-1      =NB.SI(saisie!D:D;\"LIR\")      =A3/SOMME(communes!C:C)*10000")
    d.add_heading("8. Avec Delos (ou tout assistant IA)", 1)
    puces(d, ["Il propose, vous vérifiez.", "Jamais de données personnelles ou sensibles : des en-têtes et quelques lignes d'exemple suffisent."])
    d.save(OUT / "cheat_sheet_librairies.docx")


def guide():
    d = doc_base("Du besoin à la base de données : construire le fichier pas à pas",
                 "Formation « Valoriser le potentiel des données » — comment Rémi a construit suivi_librairies.xlsx")
    d.add_paragraph("Ce guide accompagne le fichier de correction. Il montre comment le fichier a été construit, pour que vous "
                    "sachiez le refaire. Les formules sont écrites comme dans Excel en français (séparateur ;).")
    d.add_heading("Le scénario", 1)
    d.add_paragraph("On demande à Rémi de constituer une base de données des librairies du territoire, pour un suivi interne "
                    "mis à jour chaque année. Aucune question précise : c'est justement pour ça qu'il faut une base propre, "
                    "qui saura répondre aux questions qu'on ne lui a pas encore posées. Elles arrivent un mardi, à 14 h 02 :")
    puces(d, ["Q1 — Quelle commune compte le plus de librairies ?", "Q2 — Combien sont labellisées par le ministère ?",
              "Q3 — Quelle commune est la mieux dotée pour 10 000 habitants ?"])
    d.add_heading("La démarche en deux temps", 1)
    puces(d, ["Temps 1 — J'enregistre : on construit une table propre, une ligne par librairie (onglet saisie).",
              "Temps 2 — Je présente : on récupère ce que les collègues maintiennent déjà (la population, onglet communes) "
              "et on calcule les réponses (onglet synthese)."])

    d.add_heading("TEMPS 1 — J'enregistre : l'onglet saisie", 1)
    d.add_heading("L'entité et ses attributs", 2)
    tableau(d, ["colonne", "type / choix", "rôle"], [
        ("id", "identifiant (LIB001)", "unique, stable, sans signification : deux « ANAGRAMME » existent (Meudon, Sèvres)"),
        ("librairie", "texte", "le nom"),
        ("assortiment", "liste déroulante", "Généraliste, BD et Mangas… (une seule spécialité)"),
        ("label", "liste déroulante", "aucun · LIR · LR (remplace le vert)"),
        ("code_commune", "liste déroulante, format Texte", "code INSEE : la clé de la jointure"),
        ("commune", "CALCULÉE (grisée)", "récupérée par jointure, jamais saisie"),
        ("annee_suivi", "nombre (AAAA)", "l'an prochain, on ajoute des lignes 2027 en dessous"),
    ])
    d.add_heading("Construire la table", 2)
    puces(d, ["Saisir les en-têtes en ligne 1, sans titre au-dessus, sans cellule fusionnée.",
              "Ctrl+T (Mettre sous forme de tableau) : filtres automatiques, et les formules suivent les nouvelles lignes.",
              "Onglet listes : une colonne par liste de valeurs autorisées.",
              "Données › Validation des données › Autoriser : Liste › Source : =listes!$A$2:$A$12 (assortiment), "
              "=listes!$B$2:$B$4 (label), =listes!$C$2:$C$9 (code_commune).",
              "Sélectionner la colonne code_commune › format Texte (sinon 01004 devient 1004)."])
    d.add_heading("Le test de la phrase", 2)
    encadre(d, "« Les Mots et les Choses est une librairie généraliste de Boulogne-Billancourt (92012), labellisée LIR ; "
               "son identifiant est LIB003, relevé 2026. »")

    d.add_heading("TEMPS 2 — Récupérer, puis présenter", 1)
    d.add_heading("La table des collègues : communes", 2)
    d.add_paragraph("La population n'appartient pas à Rémi : les collègues la tiennent à jour dans la table communes "
                    "(code_commune, commune, population). On ne la recopie pas, on la récupère grâce au code commune.")
    d.add_heading("La jointure : RECHERCHEV", 2)
    code(d, "saisie!F2   =RECHERCHEV(E2;communes!$A:$B;2;0)")
    d.add_paragraph("RECHERCHEV(quoi je cherche ; où je cherche ; quelle colonne je renvoie ; 0 = correspondance exacte). "
                    "Ici : on cherche le code de la ligne (E2) dans la table communes et on renvoie la 2e colonne, le nom. "
                    "Avec 3 au lieu de 2, on renvoie la population.")
    d.add_heading("L'onglet synthese : 4 chiffres en gros, rien n'est saisi", 2)
    tableau(d, ["cellule", "formule", "résultat"], [
        ("A3 librairies suivies", "=NBVAL(saisie!A:A)-1", "17"),
        ("B3 labellisées", "=NB.SI(saisie!D:D;\"LIR\")", "3"),
        ("C3 généralistes", "=NB.SI(saisie!C:C;\"Généraliste\")", "13"),
        ("D3 pour 10 000 habitants", "=A3/SOMME(communes!C:C)*10000", "0,54"),
    ])
    d.add_paragraph("NBVAL compte les lignes remplies (moins l'en-tête), NB.SI compte celles qui correspondent à un critère, "
                    "SOMME additionne la population de la table des collègues.")
    d.add_heading("Le tableau croisé dynamique, sous les chiffres", 2)
    puces(d, ["Cliquer dans l'onglet saisie (une cellule suffit).",
              "Insertion › Tableau croisé dynamique › Feuille de calcul existante › Emplacement : synthese!$A$5 › OK.",
              "Glisser commune dans Lignes, id dans Valeurs : Excel compte tout seul (« Nombre de id »).",
              "Trier du plus grand au plus petit : la première ligne répond à Q1.",
              "Nouvelle librairie saisie ? Clic droit sur le TCD › Actualiser."])
    d.add_heading("Les 3 questions de la réunion de 15 h", 2)
    tableau(d, ["question", "où lire la réponse", "réponse"], [
        ("Q1 — Quelle commune compte le plus de librairies ?", "1re ligne du TCD", "Boulogne-Billancourt (6)"),
        ("Q2 — Combien sont labellisées ?", "synthese!B3", "3"),
        ("Q3 — Combien de librairies pour 10 000 habitants ?", "synthese!D3", "0,54"),
    ])
    d.add_heading("L'année prochaine", 2)
    d.add_paragraph("On ajoute les lignes 2027 sous les lignes 2026, avec annee_suivi = 2027 (les librairies gardent leur id). "
                    "Pour compter une seule année, on ajoute un critère :")
    code(d, "=NB.SI.ENS(saisie!E:E;A5;saisie!F:F;2027)")

    d.add_heading("Les prompts de Rémi (Delos ou tout assistant IA)", 1)
    for titre, p in PROMPTS:
        para = d.add_paragraph()
        para.add_run(titre + " — ").bold = True
        para.add_run(p)
    d.add_paragraph("Règles : l'assistant propose, vous vérifiez ; jamais de données personnelles ou sensibles dans un prompt.")

    d.add_heading("Annexe : les formules utilisées", 1)
    tableau(d, ["formule", "rôle"], [
        ("NBVAL(plage)", "compte les cellules non vides"),
        ("NB.SI(plage ; critère)", "compte les cellules qui remplissent une condition"),
        ("NB.SI.ENS(plage1 ; crit1 ; plage2 ; crit2)", "idem, avec plusieurs conditions"),
        ("RECHERCHEV(valeur ; plage ; n° colonne ; 0)", "jointure : renvoie une info d'une autre table"),
        ("SOMME(plage)", "additionne les nombres d'une plage"),
        ("$A$2", "référence figée quand on recopie la formule"),
    ])
    d.add_paragraph("Données : Base des librairies en France (Ministère de la Culture, data.gouv.fr, Licence Ouverte 2.0) ; "
                    "populations légales INSEE (geo.api.gouv.fr).").runs[0].italic = True
    d.save(OUT / "guide_construction_librairies.docx")


if __name__ == "__main__":
    import sys
    gabarit()
    # La correction livrée contient un onglet TCD ajouté dans le vrai Excel (openpyxl ne sait pas
    # créer de tableau croisé dynamique) : on ne l'écrase que sur demande explicite.
    if "--correction" in sys.argv or not (OUT / "correction_suivi_librairies.xlsx").exists():
        correction()
    cheat_sheet()
    guide()
    print(f"{len(LIBS)} librairies GPSO → {sorted(p.name for p in OUT.iterdir())}")
