// Le tableau de bord dynamique (usage interne), branché directement sur la base
// de Rémi (src/remi.js) : rien n’est ressaisi. Filtre par commune (boutons ou clic
// sur une barre) → les chiffres clés et les graphiques se recalculent.
// Dataviz : chiffres clés en tuiles ; barres d’une seule teinte (une seule série,
// pas de légende) triées ; survol = détail ; vue « Tableau » pour l’accessibilité.
import { useState } from 'react';
import '../tableau_de_bord.css';
import { COMMUNES, LIBRAIRIES } from '../remi';

const fr2 = (x) => x.toFixed(2).replace('.', ',');

function Barres({ titre, donnees, actif, onClic, onSurvol, surligne }) {
  const max = Math.max(...donnees.map((d) => d.n), 1);
  return (
    <div className="tdb-graphe">
      <h4>{titre}</h4>
      {donnees.map((d) => {
        const eteint = surligne && !surligne(d);
        return (
          <button
            type="button" key={d.cle} className={`tdb-barre ${eteint ? 'eteint' : ''} ${actif && actif(d) ? 'on' : ''}`}
            onClick={onClic ? () => onClic(d) : undefined} onMouseEnter={() => onSurvol(d.detail)} onMouseLeave={() => onSurvol('')}
            style={{ cursor: onClic ? 'pointer' : 'default' }}
          >
            <span className="nom">{d.nom}</span>
            <span className="piste"><span className="val" style={{ width: `${(100 * d.n) / max}%` }} /></span>
            <span className="n">{d.n}</span>
          </button>
        );
      })}
    </div>
  );
}

export function TableauDeBord() {
  const [commune, setCommune] = useState('');
  const [vue, setVue] = useState('graphes');
  const [survol, setSurvol] = useState('');

  const libs = LIBRAIRIES.filter((l) => !commune || l[4] === commune);
  const pop = COMMUNES.filter((c) => !commune || c[0] === commune).reduce((s, c) => s + c[2], 0);
  const kpi = [
    ['Librairies', libs.length],
    ['Labellisées (LIR)', libs.filter((l) => l[3] === 'LIR').length],
    ['Généralistes', libs.filter((l) => l[2] === 'Généraliste').length],
    ['Pour 10 000 habitants', fr2((libs.length / pop) * 10000)],
  ];
  const parCommune = COMMUNES.map(([code, nom, p]) => {
    const n = LIBRAIRIES.filter((l) => l[4] === code).length;
    return { cle: code, nom, n, pop: p, lir: LIBRAIRIES.filter((l) => l[4] === code && l[3] === 'LIR').length,
      detail: `${nom} : ${n} librairie${n > 1 ? 's' : ''} · ${fr2((n / p) * 10000)} pour 10 000 habitants` };
  }).filter((d) => d.n).sort((a, b) => b.n - a.n);
  const specs = [...new Set(LIBRAIRIES.map((l) => l[2]))]
    .map((s) => {
      const n = libs.filter((l) => l[2] === s).length;
      return { cle: s, nom: s, n, detail: `${s} : ${n} librairie${n > 1 ? 's' : ''}${commune ? ` à ${COMMUNES.find((c) => c[0] === commune)[1]}` : ''}` };
    })
    .sort((a, b) => b.n - a.n);
  const nomSel = commune ? COMMUNES.find((c) => c[0] === commune)[1] : 'Tout le territoire';

  return (
    <div className="tdb">
      <header>
        <div>
          <div className="marque">Grand Paris Seine Ouest · Culture · usage interne</div>
          <h1>Tableau de bord des librairies</h1>
        </div>
        <div className="vues">
          <button type="button" className={vue === 'graphes' ? 'on' : ''} onClick={() => setVue('graphes')}>Graphiques</button>
          <button type="button" className={vue === 'tableau' ? 'on' : ''} onClick={() => setVue('tableau')}>Tableau</button>
        </div>
      </header>

      <div className="tdb-filtres">
        <button type="button" className={!commune ? 'on' : ''} onClick={() => setCommune('')}>Tout le territoire</button>
        {parCommune.map((d) => (
          <button type="button" key={d.cle} className={commune === d.cle ? 'on' : ''} onClick={() => setCommune(commune === d.cle ? '' : d.cle)}>{d.nom}</button>
        ))}
      </div>

      <div className="tdb-kpis">
        {kpi.map(([t, v]) => <div key={t}><span className="v">{v}</span><span className="t">{t}</span></div>)}
      </div>

      {vue === 'graphes' ? (
        <>
          <p className="tdb-survol">{survol || `${nomSel} · survolez une barre pour le détail, cliquez une commune pour filtrer`}</p>
          <div className="tdb-graphes">
            <Barres
              titre="Librairies par commune" donnees={parCommune}
              onClic={(d) => setCommune(commune === d.cle ? '' : d.cle)} onSurvol={setSurvol}
              actif={(d) => d.cle === commune} surligne={commune ? (d) => d.cle === commune : null}
            />
            <Barres titre={`Par spécialité · ${nomSel}`} donnees={specs} onSurvol={setSurvol} />
          </div>
        </>
      ) : (
        <div className="tdb-table">
          <table>
            <thead><tr><th>Commune</th><th>Librairies</th><th>dont LIR</th><th>Population</th><th>Pour 10 000 hab.</th></tr></thead>
            <tbody>
              {parCommune.map((d) => (
                <tr key={d.cle} className={commune === d.cle ? 'on' : ''}>
                  <td>{d.nom}</td><td>{d.n}</td><td>{d.lir || ''}</td><td>{d.pop.toLocaleString('fr-FR')}</td><td>{fr2((d.n / d.pop) * 10000)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer>
        Calculé automatiquement depuis la base de Rémi (onglets saisie et communes) · Données : ministère de la Culture, INSEE
      </footer>
    </div>
  );
}
