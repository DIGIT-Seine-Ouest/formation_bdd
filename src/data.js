// Données de la démo : Base des librairies en France
// Ministère de la Culture — data.gouv.fr — Licence Ouverte 2.0
// https://www.data.gouv.fr/datasets/base-des-librairies-en-france
const BASE = import.meta.env.BASE_URL;

export const SOURCE_URL = 'https://www.data.gouv.fr/datasets/base-des-librairies-en-france';

export const GPSO = {
  '92012': 'Boulogne-Billancourt', '92022': 'Chaville', '92040': 'Issy-les-Moulineaux',
  '92047': 'Marnes-la-Coquette', '92048': 'Meudon', '92072': 'Sèvres',
  '92075': 'Vanves', '92077': "Ville-d'Avray",
};

let cache;
export function loadLibrairies() {
  if (!cache) {
    cache = Promise.all([
      fetch(`${BASE}data/base-librairies-2026-03.csv`).then((r) => r.text()),
      fetch(`${BASE}data/centres_communes.json`).then((r) => r.json()),
    ]).then(([csv, centres]) => {
      const lines = csv.replace(/^﻿/, '').split(/\r?\n/).filter(Boolean);
      // .trim() sur les en-têtes : le fichier national contient « code_commune  » avec une espace cachée
      const head = lines[0].split(';').map((h) => h.trim());
      return lines.slice(1).map((line, i) => {
        const v = Object.fromEntries(line.split(';').map((x, j) => [head[j], x.trim()]));
        const [lat, lon] = centres[v.code_commune] || [];
        return {
          id: i + 1,
          nom: v.librairie,
          assortiment: v.assortiment,
          label: v.label || 'aucun',
          commune: GPSO[v.code_commune] || v.Commune,
          code: v.code_commune,
          departement: v.Departement,
          region: v.Region,
          lat, lon,
        };
      });
    });
  }
  return cache;
}

export const countBy = (rows, key) => {
  const m = new Map();
  rows.forEach((r) => m.set(r[key], (m.get(r[key]) || 0) + 1));
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};
