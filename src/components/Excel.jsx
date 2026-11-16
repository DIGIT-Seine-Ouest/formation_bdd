// Une fenêtre Excel pour Windows (Microsoft 365), reconstruite en HTML :
// barre de titre, onglets du ruban, commandes du ruban (optionnel), zone de nom,
// barre de formule, grille, onglets de feuilles, barre d’état.
// Libellés : Excel Windows en français (support.microsoft.com/fr-fr).
//
// rows : tableau de lignes ; chaque cellule est
//   - une chaîne / un nombre
//   - un objet { v, c, cs, rs, m, liste } (c = classes : titre, note, h, hh, vert, bleu, gras, calc, res, sel, err, fusion, neuf ;
//     m = numéro de repère rouge ; liste = valeurs de la liste déroulante ouverte sous la cellule)
//   - null : cellule recouverte par une fusion
// commandes : [{ groupe, items: [[icône, libellé, actif?], …] }] → une ligne de ruban, le bouton actif est entouré
// panneau : contenu affiché à droite de la grille (ex. <PanneauTCD />)
// children : boîtes de dialogue posées par-dessus la fenêtre (position absolue)
const LETTRES = 'ABCDEFGHIJKLMNOP';
const ONGLETS_RUBAN = ['Fichier', 'Accueil', 'Insertion', 'Dessin', 'Mise en page', 'Formules', 'Données', 'Révision', 'Affichage', 'Aide'];

export function Excel({
  fichier, onglets = ['Feuil1'], actif = 0, cellule = 'A1', formule = '', largeurs = [], rows, debut = 1, maxH, compact = false,
  ongletErr, ruban = 'Accueil', contexte = [], commandes, aide, panneau, zoom = 100, children,
}) {
  const nbCol = largeurs.length || Math.max(...rows.map((r) => r.length));
  return (
    <div className={`xlw ${compact ? 'compact' : ''}`}>
      <div className="xlw-titre">
        <span className="xlw-logo">X</span>
        <span className="xlw-auto">Enregistrement automatique <span className="tog">Désactivé</span></span>
        <span className="xlw-ico">💾 ↶ ↷</span>
        <span className="xlw-nomfic">{fichier} - Excel</span>
        <span className="xlw-cherche">🔍 Rechercher</span>
        <span className="xlw-fen"><span>─</span><span>☐</span><span>✕</span></span>
      </div>
      <div className="xlw-ruban">
        {ONGLETS_RUBAN.map((t) => <span key={t} className={t === ruban ? 'on' : ''}>{t}</span>)}
        {contexte.map((t) => <span key={t} className={`ctx ${t === ruban ? 'on' : ''}`}>{t}</span>)}
      </div>
      {commandes && (
        <div className="xlw-cmds">
          {commandes.map(({ groupe, items }) => (
            <div key={groupe} className="grp">
              <div className="its">
                {items.map(([ic, t, on]) => <span key={t} className={`it ${on ? 'on' : ''}`}><b>{ic}</b>{t}</span>)}
              </div>
              <div className="nom">{groupe}</div>
            </div>
          ))}
        </div>
      )}
      <div className="xlw-fbar">
        <span className="xlw-nom">{cellule}<i>▾</i></span>
        <span className="xlw-fx"><span>✕</span><span>✓</span><em>fx</em></span>
        <span className="xlw-f">{formule}</span>
      </div>
      {aide && <div className="xlw-aide">{aide}</div>}
      <div className="xlw-corps">
        <div className="xlw-grille" style={maxH ? { maxHeight: maxH } : undefined}>
          <table>
            <colgroup>
              <col style={{ width: 34 }} />
              {Array.from({ length: nbCol }, (_, i) => <col key={i} style={largeurs[i] ? { width: largeurs[i] } : undefined} />)}
            </colgroup>
            <thead>
              <tr><th className="coin">◢</th>{Array.from({ length: nbCol }, (_, i) => <th key={i}>{LETTRES[i]}</th>)}</tr>
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
                        {o.v}
                        {o.m && <span className={`mk ${o.mf ? 'fragment' : ''}`}>{o.m}</span>}
                        {o.liste && (
                          <>
                            <span className="xlw-ddbtn">▾</span>
                            <span className="xlw-dd">{o.liste.map((x) => <span key={x} className={x === o.v ? 'on' : ''}>{x}</span>)}</span>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {panneau}
      </div>
      <div className="xlw-onglets">
        <span className="nav">◀ ▶</span>
        {onglets.map((o, i) => (
          <span key={o} className={`${i === actif ? 'on' : ''} ${ongletErr && ongletErr.includes(o) ? 'err' : ''}`}>{o}</span>
        ))}
        <span className="plus">⊕</span>
      </div>
      <div className="xlw-etat">
        <span>Prêt</span>
        <span>♿ Accessibilité : vérification terminée</span>
        <span className="d">▦ ▤ ▥ &nbsp;─────●───── + &nbsp;{zoom} %</span>
      </div>
      {children}
    </div>
  );
}

// ── Boîtes de dialogue Windows ──────────────────────────────────────────────
export function Dialogue({ titre, style, className = '', children }) {
  return (
    <div className={`xd ${className}`} style={style}>
      <div className="xd-titre"><span>{titre}</span><span className="xd-ctl">?&nbsp;&nbsp;✕</span></div>
      <div className="xd-corps">{children}</div>
    </div>
  );
}
export const XOnglets = ({ items, actif = 0 }) => (
  <div className="xd-onglets">{items.map((t, i) => <span key={t} className={i === actif ? 'on' : ''}>{t}</span>)}</div>
);
export const XCase = ({ on, children }) => <div className="xd-cb"><span className={`box ${on ? 'on' : ''}`}>{on ? '✓' : ''}</span>{children}</div>;
export const XRadio = ({ on, children }) => <div className="xd-cb"><span className={`rad ${on ? 'on' : ''}`} />{children}</div>;
export const XLabel = ({ children }) => <div className="xd-lab">{children}</div>;
export const XListe = ({ children, off }) => <div className={`xd-liste ${off ? 'off' : ''}`}><span>{children}</span><span>▾</span></div>;
export const XChamp = ({ children, plage = true, focus }) => (
  <div className={`xd-champ ${focus ? 'focus' : ''}`}><span>{children}</span>{plage && <span className="xd-plage">⇱</span>}</div>
);
export const XBoutons = ({ items, gauche }) => (
  <div className="xd-boutons">
    {gauche && <span className="b">{gauche}</span>}
    <span className="sp" />
    {items.map(([t, def]) => <span key={t} className={`b ${def ? 'def' : ''}`}>{t}</span>)}
  </div>
);

// ── Volet « Champs de tableau croisé dynamique » ────────────────────────────
export function PanneauTCD({ champs, coches = [], lignes = [], colonnes = [], valeurs = [], filtres = [] }) {
  const Zone = ({ ic, nom, items }) => (
    <div className="zone">
      <div className="zn"><b>{ic}</b> {nom}</div>
      <div className="zc">{items.map((x) => <span key={x}>{x} <i>▾</i></span>)}</div>
    </div>
  );
  return (
    <div className="xtcd">
      <div className="xtcd-t">Champs de tableau croisé dynamique <span>⌄ ✕</span></div>
      <div className="xtcd-s">Choisissez les champs à inclure dans le rapport : <span>⚙</span></div>
      <div className="xtcd-r">Rechercher <span>🔍</span></div>
      <div className="xtcd-l">{champs.map((c) => <XCase key={c} on={coches.includes(c)}>{c}</XCase>)}</div>
      <div className="xtcd-s">Faites glisser les champs dans les zones voulues ci-dessous :</div>
      <div className="xtcd-z">
        <Zone ic="⏷" nom="Filtres" items={filtres} />
        <Zone ic="⦀" nom="Colonnes" items={colonnes} />
        <Zone ic="≡" nom="Lignes" items={lignes} />
        <Zone ic="Σ" nom="Valeurs" items={valeurs} />
      </div>
      <div className="xtcd-b"><XCase>Différer la mise à jour de la disposition</XCase><span className="b">Mettre à jour</span></div>
    </div>
  );
}
