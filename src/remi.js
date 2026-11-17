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
// Codes postaux (colonne Code_postal de la source), pour la page usagers
export const CODE_POSTAL = { 92012: '92100', 92022: '92370', 92040: '92130', 92047: '92430', 92048: '92190', 92072: '92310', 92075: '92170', 92077: '92410' };

// La synthèse, calculée comme le ferait l'onglet « synthese » d'Excel
export const SYNTHESE = COMMUNES.map(([code, nom, pop]) => {
  const n = LIBRAIRIES.filter((l) => l[4] === code).length;
  return { code, nom, pop, n, densite: Math.round((n / pop) * 10000 * 100) / 100 };
});
export const NB_LAB = LIBRAIRIES.filter((l) => l[3] !== 'aucun').length;
export const POP_TOTALE = COMMUNES.reduce((s, c) => s + c[2], 0);
// Les 4 chiffres clés de l’onglet synthese : [titre, formule Excel FR, valeur]
export function chiffresCles(libs = LIBRAIRIES) {
  const fr2 = (x) => x.toFixed(2).replace('.', ',');
  return [
    ['Librairies suivies', '=NBVAL(saisie!A:A)-1', libs.length],
    ['Labellisées (LIR)', '=NB.SI(saisie!D:D;"LIR")', libs.filter((l) => l[3] === 'LIR').length],
    ['Généralistes', '=NB.SI(saisie!C:C;"Généraliste")', libs.filter((l) => l[2] === 'Généraliste').length],
    ['Pour 10 000 habitants', '=A3/SOMME(communes!C:C)*10000', fr2((libs.length / POP_TOTALE) * 10000)],
  ];
}
export const fr = (x) => x.toLocaleString('fr-FR');


// ── Le tuto de Delos : l’onglet « saisie », construit étape par étape ────────
// Étapes 1 à 8 = « j’enregistre ». L’étape 9 (synthese) = « je présente ».
// Ce qui vient d’être ajouté à l’étape n est entouré en vert (classe « neuf »).
// Extrait affiché : uniquement des libellés sans « et » (pas « BD et Mangas »), pour ne pas
// brouiller la règle « une case = une information ». LIB003 (LIR) est en ligne 3.
const TUTO_LIBS = ['LIB002', 'LIB003', 'LIB004', 'LIB006', 'LIB007', 'LIB008'].map((id) => LIBRAIRIES.find((l) => l[0] === id));
const LARG = { id: 74, librairie: 232, assortiment: 128, label: 66, code_commune: 128, commune: 178, annee_suivi: 112 };
const NEUF = { 1: 'tout', 2: ['commune'], 3: ['assortiment', 'label'], 4: ['label'], 5: ['assortiment'], 6: ['id'], 7: ['code_commune', 'commune'], 8: ['annee_suivi'] };

export function etapeSaisie(n) {
  // On part de la structure posée à l’Ép. 2 : id, librairie, assortiment, label, commune
  const cols = ['id', 'librairie', 'assortiment', 'label'];
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
      rows.push(ligne({ id: 'LIB002', librairie: 'LES CURIEUX', assortiment: 'Religion', label: 'aucun', code_commune: '92012', commune: 'Boulogne-Billancourt', annee_suivi: 2027 }, true));
    }
  }
  return { rows, largeurs: cols.map((c) => LARG[c]), cols };
}
