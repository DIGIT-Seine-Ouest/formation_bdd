# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository manages pedagogical resources for **"Vers des données robustes"**, a 2-hour training session (45 min theory / 1h15 practice) for DIRMOB agents. The goal is to shift participants from treating Excel as a notepad ("Human-readable tables") to treating it as a database ("Machine-exploitable data").

The training is structured around a **Serious Game: Réclamations Dirmob**, where participants inherit a "dirty" Excel file and must fix three core data quality issues:
1. **Eclatement** — data fragmented across multiple tabs (one tab per bus line)
2. **Encodage par la couleur** — information stored in cell formatting rather than values
3. **Listes dans une cellule** — multiple values crammed into a single cell (atomicity violation)

## Key Files

| File | Role |
|---|---|
| `index.html` | Reveal.js interactive presentation — the main deliverable, served via GitHub Pages |
| `Programme_Formation_BDD.docx` | Minute-by-minute training schedule |
| `document_cadrage/Formation BDD - Concepts abordés.docx` | Technical glossary and pedagogical goals — **source of truth for slide content** (local only, not committed) |
| `document_cadrage/Formation BDD - Document de cadrage.docx` | Project scoping document (local only, not committed) |
| `exercice/bdd_reclamations_dirmob.xlsx` | "Fil Rouge" dataset — the dirty file used in the Serious Game |
| `assets/*.excalidraw` | Diagrams: anatomy of a DB, joins, founding rule |

## Presentation Status (`index.html`)

Built with **Reveal.js 4.5.0** (loaded from CDN). Corporate design uses:
- Colors: `--blue-dirmob: #009fe3`, `--green-dirmob: #95c11f`
- Fonts: IBM Plex Serif (headings), Roboto (body)

**Completed slides (20 total):**
- Slides 1–4: Accueil (Titre, Constat, Programme, Teaser)
- Slides 5–8: Module 1 — Tableau vs BDD (question fondamentale, philosophies, CRUD)
- Slides 9–13: Module 2 — Règles fondatrices (règle 1col=1info, atomicité, types, identifiant)
- Slides 14–18: Module 3 — Les 3 frictions (overview, éclatement, couleur, listes)
- Slides 19–20: Serious Game (brief, les 3 actes)

**Missing slides (TODO):**
- Final Impact: démonstration TCD sur table propre vs brute (post-Acte 3)

## Previewing the Presentation

Open `index.html` directly in a browser — no build step required. Reveal.js and fonts load from CDN, so an internet connection is needed.

**GitHub Pages URL** (once enabled in repo settings): `https://<org>.github.io/<repo>/`

## Branch Structure

- `main` — stable baseline
- `v1`, `v2` — iteration branches for the presentation