// Les deux fichiers de la démo, rendus « façon Excel ».
// Mêmes contenus que public/ressources/mon_suivi_librairies_{VUE,DONNEE}.xlsx

// [ville fusionnée, librairie, spécialité saisie à la main, labellisée (vert), remarque]
export const VUE = [
  ['Boulogne-Billancourt (6)', 'Le Comptoir De La Bd', 'BD / Mangas', false, ''],
  [null, 'Les Curieux', 'Religieux', false, ''],
  [null, 'Les Mots Et Les Choses', 'Géné.', true, ''],
  [null, 'Les Mots Et Les Choses Nord', 'Généraliste', false, '2e boutique'],
  [null, 'Les Mots Et Les Images', 'bd', true, ''],
  [null, 'Periples 2', 'Géné.', false, ''],
  ['Chaville (1)', 'Librairie De La Pointe', 'Généraliste', false, ''],
  ['Issy-les-Moulineaux (5)', 'Chantelivre', 'Généraliste', false, ''],
  [null, 'Gutenberg', 'généraliste', false, ''],
  [null, "L'Echappee Bulle", 'BD-Manga', false, ''],
  [null, 'Le Livre Et La Tortue', 'Généraliste', true, ''],
  [null, 'Nati', 'généraliste', false, ''],
  ['Meudon (2)', 'Anagramme', 'Généraliste', false, `même enseigne qu'à Sèvres ?`],
  [null, 'Le Meandre', 'généraliste', false, ''],
  ['Sèvres (1)', 'Anagramme', 'Généraliste', false, `même enseigne qu'à Meudon ?`],
  ['Vanves (1)', 'Le Cheval-Vapeur', 'Généraliste', false, ''],
  ["Ville-d'Avray (1)", 'Vert Paradis', 'Généraliste', false, ''],
];

const span = (i) => {
  let n = 1;
  while (VUE[i + n] && VUE[i + n][0] === null) n++;
  return n;
};

export function ExcelVue({ rows = VUE.length }) {
  const data = VUE.slice(0, rows);
  return (
    <div className="xl">
      <div className="xl-bar"><span>mon_suivi_librairies.xlsx</span><span>Onglet : Suivi 2026</span></div>
      <table>
        <tbody>
          <tr><td className="rh">1</td><td colSpan={4} className="title-cell">📚 SUIVI DES LIBRAIRIES DU TERRITOIRE — 2026</td></tr>
          <tr><td className="rh">2</td><td colSpan={4} className="note">en vert = librairie labellisée · données provisoires, à vérifier avec Paul</td></tr>
          <tr><td className="rh">3</td><th>Ville</th><th>Librairie</th><th>Spécialité</th><th>Remarques</th></tr>
          {data.map((r, i) => (
            <tr key={i}>
              <td className="rh">{i + 4}</td>
              {r[0] !== null && <td className="merged" rowSpan={Math.min(span(i), rows - i)}>{r[0]}</td>}
              <td className={r[3] ? 'lab' : ''}>{r[1]}</td>
              <td className={r[3] ? 'lab' : ''}>{r[2]}</td>
              <td className="note">{r[4]}</td>
            </tr>
          ))}
          {rows === VUE.length && (
            <tr className="total"><td className="rh">21</td><td>TOTAL</td><td>17 librairies</td><td></td><td></td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// La même information, structurée
export const DONNEE = [
  ['LIB001', 'LE COMPTOIR DE LA BD', 'BD et Mangas', 'aucun', 'Boulogne-Billancourt', '92012'],
  ['LIB002', 'LES CURIEUX', 'Religion', 'aucun', 'Boulogne-Billancourt', '92012'],
  ['LIB003', 'LES MOTS ET LES CHOSES', 'Généraliste', 'LIR', 'Boulogne-Billancourt', '92012'],
  ['LIB004', 'LES MOTS ET LES CHOSES NORD', 'Généraliste', 'aucun', 'Boulogne-Billancourt', '92012'],
  ['LIB005', 'LES MOTS ET LES IMAGES', 'BD et Mangas', 'LIR', 'Boulogne-Billancourt', '92012'],
  ['LIB006', 'PERIPLES 2', 'Généraliste', 'aucun', 'Boulogne-Billancourt', '92012'],
  ['LIB007', 'LIBRAIRIE DE LA POINTE', 'Généraliste', 'aucun', 'Chaville', '92022'],
  ['LIB008', 'CHANTELIVRE', 'Généraliste', 'aucun', 'Issy-les-Moulineaux', '92040'],
  ['LIB009', 'GUTENBERG', 'Généraliste', 'aucun', 'Issy-les-Moulineaux', '92040'],
  ['LIB010', "L'ECHAPPEE BULLE", 'BD et Mangas', 'aucun', 'Issy-les-Moulineaux', '92040'],
  ['LIB011', 'LE LIVRE ET LA TORTUE', 'Généraliste', 'LIR', 'Issy-les-Moulineaux', '92040'],
  ['LIB012', 'NATI', 'Généraliste', 'aucun', 'Issy-les-Moulineaux', '92040'],
  ['LIB013', 'ANAGRAMME', 'Généraliste', 'aucun', 'Meudon', '92048'],
  ['LIB014', 'LE MEANDRE', 'Généraliste', 'aucun', 'Meudon', '92048'],
  ['LIB015', 'ANAGRAMME', 'Généraliste', 'aucun', 'Sèvres', '92072'],
  ['LIB016', 'LE CHEVAL-VAPEUR', 'Généraliste', 'aucun', 'Vanves', '92075'],
  ['LIB017', 'VERT PARADIS', 'Généraliste', 'aucun', "Ville-d'Avray", '92077'],
];

export function ExcelDonnee({ rows = DONNEE.length }) {
  return (
    <div className="xl">
      <div className="xl-bar"><span>mon_suivi_librairies.xlsx</span><span>Onglet : librairies</span></div>
      <table>
        <tbody>
          <tr>
            <td className="rh">1</td>
            <th>id</th><th>librairie</th><th>assortiment</th><th>label</th><th>commune</th>
            <th className="key">code_commune</th><th>annee_suivi</th>
          </tr>
          {DONNEE.slice(0, rows).map((r, i) => (
            <tr key={r[0]}>
              <td className="rh">{i + 2}</td>
              {r.map((v, j) => <td key={j} className={j === 5 ? 'key' : ''}>{v}</td>)}
              <td>2026</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
