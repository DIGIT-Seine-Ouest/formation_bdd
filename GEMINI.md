# Project Overview: Formation BDD (DIRMOB)

This workspace manages the pedagogical resources for the "Vers des données robustes" training. The course is a 2-hour session (45m theory / 1h15 practice) designed for DIRMOB agents to transition from "Human-readable tables" (Excel-as-notepad) to "Machine-exploitable data" (Excel-as-database).

## Pedagogical Pillars

The training is built around the **"Serious Game: Réclamations Dirmob"**, where agents inherit a "dirty" file and must fix three core frictions:
1.  **Friction 1: Eclatement (Data Fragmentation)**: Data split across multiple tabs (e.g., one tab per bus line).
2.  **Friction 2: Encodage par la couleur (Color Encoding)**: Information stored in cell formatting rather than data values.
3.  **Friction 3: Listes dans une cellule (Concatened Lists)**: Multiple values in a single cell (violating atomicity).

## Key Files & Development Status

### Core Supports
- **`index.html`**: [⚠️ INCOMPLETE] Interactive Reveal.js presentation (served via GitHub Pages).
    - ✅ **DONE**: Title, Constat (Human vs Machine), Program Overview, Teaser (Atomicity/Identity).
    - ❌ **TODO**: Module 1 (OLTP/OLAP/CRUD), Module 2 (Detailed Types/Snake_case), Module 3 (The 3 Frictions), Serious Game Instructions (Acts 1-3), Final Impact (Pivot Tables).
- **`Programme_Formation_BDD.docx`**: Full minute-by-minute schedule.
- **`Document cadrage/`**:
    - `Formation BDD - Concepts abordés.docx`: Technical glossary and pedagogical goals.
    - `Formation BDD - Document de cadrage.docx`: Project scoping.

### Practical Material
- **`assets/`**: Excalidraw diagrams (Anatomy, Joins, Golden Rule).
- **`exercice/`**:
    - `bdd_reclamations_dirmob.xlsx`: The "Fil Rouge" dataset containing the 3 frictions and their corrections.

## Roadmap & Usage

1.  **Complete Presentation**: Use `Concepts abordés.docx` to fill the missing slides in `index.html`.
2.  **Prepare Exercise**: Ensure the Excel file in `bdd_correction/` matches the "Acte 1" starting state described in the program.
3.  **Delivery**: Projected presentation for theory, hands-on "Serious Game" for practice.

