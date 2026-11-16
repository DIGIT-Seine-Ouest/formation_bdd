// Une fenêtre Excel réaliste : ruban, zone de nom, barre de formule,
// en-têtes de colonnes/lignes, onglets en bas.
//
// rows : tableau de lignes ; chaque cellule est
//   - une chaîne / un nombre
//   - un objet { v, c, cs, rs, m } (c = classes : titre, note, h, hh, vert, bleu, gras, calc, res, sel, err, fusion ;
//     m = numéro de repère rouge affiché dans la case)
//   - null : cellule recouverte par une fusion
const LETTRES = 'ABCDEFGHIJKLMNOP';

export function Excel({ fichier, onglets = ['Feuil1'], actif = 0, cellule = 'A1', formule = '', largeurs = [], rows, debut = 1, maxH, compact = false, ongletErr }) {
  const nbCol = largeurs.length || Math.max(...rows.map((r) => r.length));
  return (
    <div className={`xlw ${compact ? 'compact' : ''}`}>
      <div className="xlw-titre">
        <span className="xlw-logo">X</span>
        <span>{fichier} — Excel</span>
      </div>
      <div className="xlw-ruban">
        {['Fichier', 'Accueil', 'Insertion', 'Mise en page', 'Formules', 'Données', 'Révision', 'Affichage'].map((t, i) => (
          <span key={t} className={i === 1 ? 'on' : ''}>{t}</span>
        ))}
      </div>
      <div className="xlw-fbar">
        <span className="xlw-nom">{cellule}</span>
        <span className="xlw-fx">fx</span>
        <span className="xlw-f">{formule}</span>
      </div>
      <div className="xlw-grille" style={maxH ? { maxHeight: maxH } : undefined}>
        <table>
          <colgroup>
            <col style={{ width: 30 }} />
            {Array.from({ length: nbCol }, (_, i) => <col key={i} style={largeurs[i] ? { width: largeurs[i] } : undefined} />)}
          </colgroup>
          <thead>
            <tr><th className="coin" />{Array.from({ length: nbCol }, (_, i) => <th key={i}>{LETTRES[i]}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <th>{debut + i}</th>
                {r.map((cell, j) => {
                  if (cell === null) return null;
                  const o = typeof cell === 'object' ? cell : { v: cell };
                  const num = typeof o.v === 'number' ? ' num' : '';
                  return (
                    <td key={j} colSpan={o.cs} rowSpan={o.rs} className={`${o.c || ''}${num}`}>
                      {o.v}{o.m && <span className={`mk ${o.mf ? 'fragment' : ''}`}>{o.m}</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="xlw-onglets">
        <span className="nav">◀ ▶</span>
        {onglets.map((o, i) => (
          <span key={o} className={`${i === actif ? 'on' : ''} ${ongletErr && ongletErr.includes(o) ? 'err' : ''}`}>{o}</span>
        ))}
        <span className="plus">⊕</span>
      </div>
    </div>
  );
}
