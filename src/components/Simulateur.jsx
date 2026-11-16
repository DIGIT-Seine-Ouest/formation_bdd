// Usage interne : le fichier « pensé machine » répond tout seul.
// Bascule « pensé humain » / « pensé machine » : avec le premier, chaque usage
// échoue et dit pourquoi (renvoi aux astuces) ; avec le second, tout s'allume.
import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GPSO, countBy, loadLibrairies } from '../data';

const TABS = [
  ['kpi', '📋 Les 5 questions'],
  ['tdb', '📈 Tableau de bord'],
  ['carte', '🗺️ Carte'],
  ['portail', '🔎 Recherche'],
];

const ECHECS = {
  kpi: [
    'Labellisées : il faut compter les cases vertes à la main (astuce 2).',
    'BD : « BD / Mangas », « bd », « BD-Manga » ne se regroupent pas (astuce 4).',
    'La ligne TOTAL est comptée comme une librairie (astuce 1).',
  ],
  tdb: [
    'Un onglet par année : impossible de comparer 2026 et 2027 (astuce 6).',
    'Aucun chiffre ne se recalcule : tout est tapé à la main.',
  ],
  carte: [
    '« Boulogne-Billancourt (6) » n’est pas une commune (astuce 3).',
    'Aucun code INSEE pour placer les points (astuce 5).',
    '10 lignes sans ville à cause des cellules fusionnées (astuce 1).',
  ],
  portail: [
    'Le label était une couleur : il disparaît à l’export (astuce 2).',
    '7 libellés différents pour 3 spécialités : filtre impossible (astuce 4).',
  ],
};

const pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);
const estLab = (r) => r.label !== 'aucun';

function Carte({ rows, active, zone }) {
  const el = useRef(null);
  const map = useRef(null);
  const layer = useRef(null);

  useEffect(() => {
    map.current = L.map(el.current, { preferCanvas: true });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap · © CARTO', maxZoom: 18,
    }).addTo(map.current);
    layer.current = L.layerGroup().addTo(map.current);
    return () => map.current.remove();
  }, []);

  useEffect(() => {
    layer.current.clearLayers();
    const parCommune = new Map();
    rows.forEach((r) => {
      if (r.lat == null) return;
      if (!parCommune.has(r.code)) parCommune.set(r.code, []);
      parCommune.get(r.code).push(r);
    });
    parCommune.forEach((libs) => {
      const { lat, lon, commune } = libs[0];
      const liste = libs.slice(0, 12).map((l) => `${l.nom}${estLab(l) ? ' 🏅' : ''}`).join('<br>');
      L.circleMarker([lat, lon], {
        radius: 5 + Math.sqrt(libs.length) * (zone === 'gpso' ? 6 : 2.2),
        color: '#0f4c75', weight: 1, fillColor: libs.some(estLab) ? '#95c11f' : '#009fe3', fillOpacity: 0.75,
      })
        .bindPopup(`<b>${commune}</b> — ${libs.length} librairie(s)<br>${liste}${libs.length > 12 ? '<br>…' : ''}`)
        .addTo(layer.current);
    });
    if (zone === 'gpso') map.current.setView([48.82, 2.235], 13);
    else map.current.setView([46.6, 2.4], 6);
  }, [rows, zone]);

  useEffect(() => {
    if (active) setTimeout(() => map.current.invalidateSize(), 80);
  }, [active]);

  return (
    <>
      <div ref={el} className="sim-map" />
      <div style={{ position: 'absolute', left: 10, bottom: 10, zIndex: 500, background: 'rgba(255,255,255,.94)', borderRadius: 6, padding: '6px 10px', fontSize: 12.5 }}>
        Placé grâce à <code>code_commune</code> · <span style={{ color: '#95c11f' }}>●</span> au moins une librairie labellisée
        <br /><span className="muted">Pas d’adresse dans le fichier : chaque point est au centre de sa commune.</span>
      </div>
    </>
  );
}

function Recherche({ rows }) {
  const [q, setQ] = useState('');
  const [assort, setAssort] = useState(null);
  const [label, setLabel] = useState(null);
  const base = rows.filter((r) => !q || `${r.nom} ${r.commune}`.toLowerCase().includes(q.toLowerCase()));
  const res = base.filter((r) => (!assort || r.assortiment === assort) && (!label || r.label === label));
  const facette = (key, cur, set, autre) =>
    countBy(base.filter(autre), key).slice(0, 8).map(([v, n]) => (
      <label key={v} className={cur === v ? 'on' : ''} onClick={() => set(cur === v ? null : v)}>
        <span>{v}</span><span className="muted">{n}</span>
      </label>
    ));
  const params = [q && `q=${q}`, assort && `refine=assortiment:${assort}`, label && `refine=label:${label}`].filter(Boolean).join('&');
  return (
    <div className="portal">
      <div className="facets">
        <input type="search" placeholder="Nom ou commune…" value={q} onChange={(e) => setQ(e.target.value)} />
        <h4>Spécialité</h4>{facette('assortiment', assort, setAssort, (r) => !label || r.label === label)}
        <h4>Label</h4>{facette('label', label, setLabel, (r) => !assort || r.assortiment === assort)}
      </div>
      <div className="results">
        <div className="api">GET /api/records?{params || 'limit=20'} → {res.length} résultat(s)</div>
        <table>
          <thead><tr><th>Librairie</th><th>Spécialité</th><th>Label</th><th>Commune</th></tr></thead>
          <tbody>
            {res.slice(0, 40).map((r) => (
              <tr key={r.id}><td>{r.nom}</td><td>{r.assortiment}</td><td>{estLab(r) ? `🏅 ${r.label}` : ''}</td><td>{r.commune}</td></tr>
            ))}
          </tbody>
        </table>
        {res.length > 40 && <p className="muted tiny" style={{ marginTop: 6 }}>… et {res.length - 40} autres</p>}
      </div>
    </div>
  );
}

function TableauDeBord({ rows, all, zone }) {
  const lab = rows.filter(estLab).length;
  const labFr = all.filter(estLab).length;
  const cle = zone === 'gpso' ? 'commune' : 'region';
  const groupes = countBy(rows, cle).slice(0, 10);
  const max = groupes[0]?.[1] || 1;
  return (
    <div>
      <div className="kpis">
        <div className="kpi"><div className="v">{rows.length}</div><div className="l">librairies</div></div>
        <div className="kpi"><div className="v">{pct(lab, rows.length)} %</div><div className="l">labellisées (France : {pct(labFr, all.length)} %)</div></div>
        <div className="kpi"><div className="v">{rows.filter((r) => r.assortiment === 'BD et Mangas').length}</div><div className="l">spécialisées BD et mangas</div></div>
        <div className="kpi"><div className="v">{new Set(rows.map((r) => r.code)).size}</div><div className="l">communes couvertes</div></div>
      </div>
      <div className="bars">
        <p className="small muted" style={{ margin: '4px 0 6px' }}>Librairies par {cle === 'commune' ? 'commune' : 'région'} <span className="tiny">(vert = labellisées)</span></p>
        {groupes.map(([k, n]) => {
          const l = rows.filter((r) => r[cle] === k && estLab(r)).length;
          return (
            <div className="b" key={k}>
              <span>{k}</span>
              <div className="track">
                <div className="fill lab" style={{ width: `${(100 * l) / max}%` }} />
                <div className="fill" style={{ width: `${(100 * (n - l)) / max}%` }} />
              </div>
              <b>{n}</b>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CinqQuestions({ rows }) {
  const parCommune = countBy(rows, 'commune').map(([c, n]) => `${c} ${n}`).join(' · ');
  const lab = rows.filter(estLab);
  const specs = countBy(rows, 'assortiment').map(([s, n]) => `${s} ${n}`).join(' · ');
  const Q = [
    ['📍 Combien, par commune ?', parCommune],
    ['🏅 Combien de labellisées ?', `${lab.length} : ${lab.map((r) => r.nom).join(', ')}`],
    ['📚 Quelles spécialités ?', specs],
    ['🔄 Ouvertures / fermetures ?', 'Dès le relevé 2027 : comparaison des id entre deux années.'],
  ];
  return (
    <div>
      <div className="kpi-list">
        {Q.map(([q, a]) => <div key={q}><p className="q">{q}</p><p className="a">{a}</p></div>)}
        <div style={{ gridColumn: '1 / -1' }}><p className="q">🗺️ Une carte ?</p><p className="a">→ onglet Carte</p></div>
      </div>
      <p className="small muted" style={{ marginTop: 12 }}>Rien n’est tapé à la main : chaque réponse est recalculée dès qu’on ajoute une ligne.</p>
    </div>
  );
}

export function Simulateur() {
  const ref = useRef(null);
  const [all, setAll] = useState([]);
  const [fichier, setFichier] = useState('machine');
  const [tab, setTab] = useState('kpi');
  const [zone, setZone] = useState('gpso');
  const [visible, setVisible] = useState(false);

  useEffect(() => { loadLibrairies().then(setAll); }, []);
  useEffect(() => {
    const onChange = (e) => setVisible(e.detail?.currentSlide === ref.current?.closest('section'));
    window.addEventListener('reveal:slidechanged', onChange);
    return () => window.removeEventListener('reveal:slidechanged', onChange);
  }, []);

  const gpso = useMemo(() => all.filter((r) => GPSO[r.code]), [all]);
  const rows = zone === 'gpso' ? gpso : all;
  const humain = fichier === 'humain';

  return (
    <div className="sim" ref={ref}>
      <div className="sim-top">
        <div className="seg">
          {TABS.map(([k, t]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{t}</button>)}
        </div>
        <div className="seg">
          <button className={zone === 'gpso' ? 'on' : ''} onClick={() => setZone('gpso')}>GPSO</button>
          <button className={zone === 'france' ? 'on' : ''} onClick={() => setZone('france')} disabled={humain || tab === 'kpi'}>France</button>
        </div>
      </div>
      <div className="sim-body">
        <div style={{ position: 'absolute', inset: 0, visibility: tab === 'carte' ? 'visible' : 'hidden' }}>
          <Carte rows={humain ? [] : rows} active={visible && tab === 'carte'} zone={zone} />
        </div>
        {tab === 'kpi' && <div className="sim-pane"><CinqQuestions rows={gpso} /></div>}
        {tab === 'tdb' && <div className="sim-pane"><TableauDeBord rows={rows} all={all} zone={zone} /></div>}
        {tab === 'portail' && <div className="sim-pane"><Recherche rows={rows} /></div>}
        {humain && (
          <div className="fail">
            <h3>Le fichier « pensé humain » ne passe pas</h3>
            <ul>{ECHECS[tab].map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        )}
        {!humain && !all.length && <div className="fail"><p>Chargement des données…</p></div>}
      </div>
      <div className="seg" style={{ alignSelf: 'center' }}>
        <button className={humain ? 'on' : ''} onClick={() => setFichier('humain')}>👀 Fichier pensé humain</button>
        <button className={!humain ? 'on' : ''} onClick={() => setFichier('machine')}>🤖 Fichier pensé machine</button>
      </div>
    </div>
  );
}
