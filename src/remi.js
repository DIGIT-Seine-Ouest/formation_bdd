// Les données du fil rouge.
// Librairies : Base des librairies en France (Ministère de la Culture, data.gouv.fr, LO 2.0), extrait GPSO.
// Communes : population légale (geo.api.gouv.fr), la table « des collègues ».
export const SOURCE_URL = 'https://www.data.gouv.fr/datasets/base-des-librairies-en-france';

// id, librairie, assortiment, label, code_commune
export const LIBRAIRIES = [
  ['LIB001', 'LE COMPTOIR DE LA BD', 'BD et Mangas', 'aucun', '92012'],
  ['LIB002', 'LES CURIEUX', 'Religion', 'aucun', '92012'],
  ['LIB003', 'LES MOTS ET LES CHOSES', 'Généraliste', 'LIR', '92012'],
  ['LIB004', 'LES MOTS ET LES CHOSES NORD', 'Généraliste', 'aucun', '92012'],
  ['LIB005', 'LES MOTS ET LES IMAGES', 'BD et Mangas', 'LIR', '92012'],
  ['LIB006', 'PERIPLES 2', 'Généraliste', 'aucun', '92012'],
  ['LIB007', 'LIBRAIRIE DE LA POINTE', 'Généraliste', 'aucun', '92022'],
  ['LIB008', 'CHANTELIVRE', 'Généraliste', 'aucun', '92040'],
  ['LIB009', 'GUTENBERG', 'Généraliste', 'aucun', '92040'],
  ['LIB010', "L'ECHAPPEE BULLE", 'BD et Mangas', 'aucun', '92040'],
  ['LIB011', 'LE LIVRE ET LA TORTUE', 'Généraliste', 'LIR', '92040'],
  ['LIB012', 'NATI', 'Généraliste', 'aucun', '92040'],
  ['LIB013', 'ANAGRAMME', 'Généraliste', 'aucun', '92048'],
  ['LIB014', 'LE MEANDRE', 'Généraliste', 'aucun', '92048'],
  ['LIB015', 'ANAGRAMME', 'Généraliste', 'aucun', '92072'],
  ['LIB016', 'LE CHEVAL-VAPEUR', 'Généraliste', 'aucun', '92075'],
  ['LIB017', 'VERT PARADIS', 'Généraliste', 'aucun', '92077'],
];

// code_commune, commune, population
export const COMMUNES = [
  ['92012', 'Boulogne-Billancourt', 119019],
  ['92022', 'Chaville', 20594],
  ['92040', 'Issy-les-Moulineaux', 67669],
  ['92047', 'Marnes-la-Coquette', 1752],
  ['92048', 'Meudon', 46334],
  ['92072', 'Sèvres', 22303],
  ['92075', 'Vanves', 28622],
  ['92077', "Ville-d'Avray", 11089],
];

export const nomCommune = (code) => COMMUNES.find((c) => c[0] === code)[1];

// La synthèse, calculée comme le ferait l'onglet « synthese » d'Excel
export const SYNTHESE = COMMUNES.map(([code, nom, pop]) => {
  const n = LIBRAIRIES.filter((l) => l[4] === code).length;
  return { code, nom, pop, n, densite: Math.round((n / pop) * 10000 * 100) / 100 };
});
export const NB_LAB = LIBRAIRIES.filter((l) => l[3] !== 'aucun').length;
export const fr = (x) => x.toLocaleString('fr-FR');

// Les questions qui arriveront plus tard (Claire) : la mission, elle, n’en pose aucune.
export const QUESTIONS = [
  ['Q1', 'Quelle commune compte le plus de librairies ?'],
  ['Q2', 'Combien sont labellisées par le ministère ?'],
  ['Q3', 'Quelle commune est la mieux dotée pour 10 000 habitants ?'],
];

// ── Le fichier de Rémi, fait vendredi à 17 h 45, « vite fait » ──────────────
// [ville fusionnée (ou null), nom, spécialité, visite, remarques, en vert ?]
// Identique à public/ressources/exercice_aide_memoire.xlsx
export const VA_VITE = [
  ['Boulogne-Billancourt (6)', 'Le Comptoir De La Bd', 'BD + mangas', 'faite (mars ?)', '', false],
  [null, 'Les Curieux', 'Religion', 'à faire', '', false],
  [null, 'Les Mots Et Les Choses', 'Généraliste (LIR)', '12/03', '', true],
  [null, 'Les Mots Et Les Choses Nord', 'géné.', '', '2e boutique', false],
  [null, 'Les Mots Et Les Images', 'bd', 'oui', '', true],
  [null, 'Periples 2', 'Généraliste', 'rappeler', '', false],
  ['Chaville (1)', 'Librairie De La Pointe', 'Généraliste', 'à faire', '', false],
  ['Issy-les-Moulineaux (5)', 'Chantelivre', 'Généraliste', 'faite', '', false],
  [null, 'Gutenberg', 'généraliste', '', '', false],
  [null, "L'Echappee Bulle", 'BD-Manga', 'à faire', '', false],
  [null, 'Le Livre Et La Tortue', 'Généraliste', '2026-03-20', '', true],
  [null, 'Nati', 'géné.', '', '', false],
  ['Meudon (2)', 'Anagramme', 'Généraliste', 'faite (avril)', 'même que Sèvres ?', false],
  [null, 'Le Meandre', 'Généraliste', '', '', false],
  ['Sèvres (1)', 'Anagramme', 'Généraliste', '', 'cf. Meudon', false],
  ['Vanves (1)', 'Le Cheval-Vapeur', 'Généraliste', 'à faire', '', false],
  ["Ville-d'Avray (1)", 'Vert Paradis', 'Généraliste', '', '', false],
];
export const VA_VITE_ONGLETS = ['Librairies', 'Récap (2)', 'Feuil1'];
const PREMIERE = 5; // les données commencent ligne 5
export const DERNIERE = PREMIERE + VA_VITE.length + 1; // ligne du TOTAL

// Grille complète (ligne 1 → TOTAL) au format du composant <Excel />
function grille() {
  const g = [
    [{ v: '📚 SUIVI DES LIBRAIRIES DU TERRITOIRE — 2026', c: 'titre', cs: 5 }, null, null, null, null],
    [{ v: 'en vert = labellisée · MAJ mars 2026 (à revoir avec Paul)', c: 'note', cs: 5 }, null, null, null, null],
    ['', '', '', '', ''],
    ['Ville', 'Nom', 'Spécialité', 'Visite', 'Remarques'].map((v) => ({ v, c: 'hh' })),
  ];
  VA_VITE.forEach(([ville, nom, spe, visite, rem, vert], i) => {
    let span = 1;
    while (VA_VITE[i + span] && VA_VITE[i + span][0] === null) span++;
    g.push([
      ville === null ? null : { v: ville, c: 'fusion', rs: span, grp: span },
      { v: nom, c: vert ? 'vert' : '' }, { v: spe, c: vert ? 'vert' : '' }, visite, rem,
    ]);
  });
  g.push(['', '', '', '', '']);
  g.push([{ v: 'TOTAL', c: 'gras' }, { v: '17 librairies', c: 'gras' }, '', '', '']);
  return g;
}

// Extrait de la grille (lignes de → a), avec cases en erreur et repères numérotés.
// marques : { A5: 2, … } · err : ['A5', 'B7', …]
export function vaVite({ de = 1, a = DERNIERE, marques = {}, err = [], marquesFragment = false } = {}) {
  const g = grille();
  // début de groupe fusionné pour chaque ligne
  const tete = {};
  g.forEach((row, i) => {
    if (row[0] && row[0].grp) for (let k = 0; k < row[0].grp; k++) tete[i + 1 + k] = i + 1;
  });
  const rows = [];
  for (let r = de; r <= a; r++) {
    const row = g[r - 1].map((cell, j) => {
      let c = cell;
      if (j === 0 && cell === null && tete[r] && r === de) c = { ...g[tete[r] - 1][0] }; // fusion coupée par l’extrait
      if (c === null) return null;
      const o = typeof c === 'object' ? { ...c } : { v: c };
      if (o.grp) o.rs = Math.min(tete[r] + o.grp - 1, a) - r + 1;
      const cle = 'ABCDE'[j] + r;
      if (err.includes(cle)) o.c = `${o.c || ''} err`;
      if (marques[cle]) { o.m = marques[cle]; o.mf = marquesFragment; }
      return o;
    });
    rows.push(row);
  }
  return rows;
}

// ── Le tuto de Delos : l’onglet « saisie », construit étape par étape ────────
// Ce qui vient d’être ajouté à l’étape n est entouré en vert (classe « neuf »).
const TUTO_LIBS = LIBRAIRIES.slice(0, 6);
const LARG = { id: 74, librairie: 232, assortiment: 128, label: 66, code_commune: 128, commune: 178, annee_suivi: 112 };
const NEUF = { 1: 'tout', 2: ['commune'], 3: ['assortiment', 'label'], 4: ['label'], 5: ['assortiment'], 6: ['id'], 7: ['code_commune', 'commune'], 8: ['annee_suivi'] };

export function etapeSaisie(n) {
  const cols = [];
  if (n >= 6) cols.push('id');
  cols.push('librairie', 'assortiment', 'label');
  if (n >= 7) cols.push('code_commune');
  cols.push('commune');
  if (n >= 8) cols.push('annee_suivi');
  const neuf = NEUF[n] === 'tout' ? cols : NEUF[n] || [];
  const rows = [cols.map((v) => ({ v, c: `${n === 1 ? 'hh' : 'h'}${neuf.includes(v) ? ' neuf' : ''}` }))];
  const ligne = (val, forceNeuf) => cols.map((c) => {
    const cls = [];
    if (forceNeuf || (n > 1 && neuf.includes(c))) cls.push('neuf');
    if (n >= 4 && val.label !== 'aucun') cls.push('vert');
    if (c === 'code_commune') cls.push('bleu');
    if (c === 'commune' && n >= 7) cls.push('calc');
    return { v: val[c], c: cls.join(' ') };
  });
  if (n === 1) {
    rows.push(cols.map(() => ''), cols.map(() => ''), cols.map(() => ''));
  } else {
    TUTO_LIBS.forEach(([id, librairie, assortiment, label, code]) => {
      rows.push(ligne({ id, librairie, assortiment, label, code_commune: code, commune: nomCommune(code), annee_suivi: 2026 }));
    });
    if (n === 8) {
      rows.push(ligne({ id: 'LIB001', librairie: 'LE COMPTOIR DE LA BD', assortiment: 'BD et Mangas', label: 'aucun', code_commune: '92012', commune: 'Boulogne-Billancourt', annee_suivi: 2027 }, true));
    }
  }
  return { rows, largeurs: cols.map((c) => LARG[c]), cols };
}
