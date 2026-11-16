// « Voilà ce que je peux déjà en faire » — un fichier, plusieurs valorisations.
// Bascule VUE / DONNÉE : avec la vue, chaque usage échoue et dit pourquoi ;
// avec la donnée (structure de la Base nationale des librairies), tout s'allume.
import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GPSO, countBy, loadLibrairies } from '../data';

const TABS = [
  ['reponses', '⏱ Les questions de la cheffe'],
  ['carte', '🗺️ Carte'],
  ['portail', '🔎 Portail open data'],
  ['tdb', '📈 Tableau de bord'],
];

const ECHECS = {
  reponses: [
    'Combien de labellisées ? → il faut compter les cases vertes à la main.',
    'Combien de librairies BD ? → « BD / Mangas », « bd », « BD-Manga » : trois façons d’écrire la même chose.',
    'Le total « 17 » est tapé à la main : il sera faux dès la prochaine ouverture.',
  ],
  carte: [
    'Aucune colonne ne contient un code commune.',
    '« Boulogne-Billancourt (6) » n’est pas un nom de commune : c’est un nom + un comptage.',
    'Les cellules fusionnées laissent 10 lignes sans ville.',
  ],
  portail: [
    'Le label était une couleur verte : il disparaît à l’export.',
    'Impossible de filtrer par spécialité : 7 libellés différents pour 3 spécialités.',
    'La ligne « TOTAL » serait publiée comme une librairie.',
  ],
  tdb: [
    'Un onglet par année : impossible de comparer 2026 et 2027.',
    'Pas d’identifiant : « Anagramme » à Meudon et à Sèvres, une ou deux librairies ?',
    'Aucune valeur n’est calculable sans tout ressaisir.',
  ],
};

function Echec({ tab }) {
  return (
    <div className="fail">
      <div className="big">📄❌</div>
      <h3>Mon fichier « vue » ne passe pas</h3>
      <ul>{ECHECS[tab].map((e) => <li key={e}>{e}</li>)}</ul>
    </div>
  );
}

function Carte({ rows, active, zone }) {
  const el = useRef(null);
  const map = useRef(null);
  const layer = useRef(null);

  useEffect(() => {
    map.current = L.map(el.current, { zoomControl: true, attributionControl: true, preferCanvas: true });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap · © CARTO', maxZoom: 18,
    }).addTo(map.current);
    layer.current = L.layerGroup().addTo(map.current);
    return () => map.current.remove();
  }, []);

  useEffect(() => {
    if (!map.current) return;
    layer.current.clearLayers();
    const parCommune = new Map();
    rows.forEach((r) => {
      if (r.lat == null) return;
      if (!parCommune.has(r.code)) parCommune.set(r.code, []);
      parCommune.get(r.code).push(r);
    });
    parCommune.forEach((libs) => {
      const { lat, lon, commune } = libs[0];
      const lab = libs.some((l) => l.label !== 'aucun');
      L.circleMarker([lat, lon], {
        radius: 5 + Math.sqrt(libs.length) * (zone === 'gpso' ? 6 : 2.2),
        color: '#0f4c75', weight: 1, fillColor: lab ? '#95c11f' : '#009fe3', fillOpacity: 0.75,
      })
        .bindPopup(`<b>${commune}</b> — ${libs.length} librairie(s)<br>${libs.slice(0, 12).map((l) => `${l.nom}${l.label !== 'aucun' ? ' 🏅' : ''}`).join('<br>')}${libs.length > 12 ? '<br>…' : ''}`)
        .addTo(layer.current);
    });
    if (zone === 'gpso') map.current.setView([48.82, 2.235], 13);
    else map.current.setView([46.6, 2.4], 6);
  }, [rows, zone]);

  useEffect(() => {
    if (active && map.current) setTimeout(() => map.current.invalidateSize(), 60);
  }, [active]);

  return (
    <>
      <div ref={el} className="sim-map" />
      <div style={{ position: 'absolute', left: 12, bottom: 12, zIndex: 500, background: 'rgba(255,255,255,.92)', borderRadius: 8, padding: '6px 10px', fontSize: 12 }}>
        Placé grâce à <code>code_commune</code> (INSEE) · <span style={{ color: '#95c11f' }}>●</span> avec librairie labellisée
        <br /><span className="muted">Sans adresse, chaque librairie est posée au centre de sa commune.</span>
      </div>
    </>
  );
}

function Portail({ rows }) {
  const [q, setQ] = useState('');
  const [assort, setAssort] = useState(null);
  const [label, setLabel] = useState(null);
  const base = rows.filter((r) => !q || `${r.nom} ${r.commune}`.toLowerCase().includes(q.toLowerCase()));
  const res = base.filter((r) => (!assort || r.assortiment === assort) && (!label || r.label === label));
  const facet = (key, cur, set) =>
    countBy(base.filter((r) => key === 'assortiment' ? (!label || r.label === label) : (!assort || r.assortiment === assort)), key)
      .slice(0, 8)
      .map(([v, n]) => (
        <label key={v} className={cur === v ? 'on' : ''} onClick={() => set(cur === v ? null : v)}>
          <span>{v}</span><span className="muted">{n}</span>
        </label>
      ));
  const params = [q && `q=${q}`, assort && `refine=assortiment:${assort}`, label && `refine=label:${label}`].filter(Boolean).join('&');
  return (
    <div className="portal">
      <div className="facets">
        <input type="search" placeholder="Rechercher (nom, commune)…" value={q} onChange={(e) => setQ(e.target.value)} />
        <h4>Assortiment</h4>{facet('assortiment', assort, setAssort)}
        <h4>Label</h4>{facet('label', label, setLabel)}
      </div>
      <div className="results">
        <div className="api">GET /api/records?{params || 'limit=20'} → {res.length} résultat(s)</div>
        <table>
          <thead><tr><th>Librairie</th><th>Assortiment</th><th>Label</th><th>Commune</th></tr></thead>
          <tbody>
            {res.slice(0, 40).map((r) => (
              <tr key={r.id}><td>{r.nom}</td><td>{r.assortiment}</td><td>{r.label === 'aucun' ? '' : `🏅 ${r.label}`}</td><td>{r.commune}</td></tr>
            ))}
          </tbody>
        </table>
        {res.length > 40 && <p className="muted tiny" style={{ marginTop: 6 }}>… et {res.length - 40} autres</p>}
      </div>
    </div>
  );
}

const pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);

function TableauDeBord({ rows, all, zone }) {
  const lab = rows.filter((r) => r.label !== 'aucun').length;
  const labFr = all.filter((r) => r.label !== 'aucun').length;
  const bd = rows.filter((r) => r.assortiment === 'BD et Mangas').length;
  const groupes = countBy(rows, zone === 'gpso' ? 'commune' : 'region').slice(0, 10);
  const max = groupes[0]?.[1] || 1;
  return (
    <div>
      <div className="kpis">
        <div className="kpi"><div className="v">{rows.length}</div><div className="l">librairies</div></div>
        <div className="kpi"><div className="v">{pct(lab, rows.length)} %</div><div className="l">labellisées (France : {pct(labFr, all.length)} %)</div></div>
        <div className="kpi"><div className="v">{bd}</div><div className="l">spécialisées BD & mangas</div></div>
        <div className="kpi"><div className="v">{new Set(rows.map((r) => r.code)).size}</div><div className="l">communes couvertes</div></div>
      </div>
      <div className="bars">
        <p className="small muted" style={{ margin: '4px 0 6px' }}>Librairies par {zone === 'gpso' ? 'commune' : 'région'} <span className="tiny">(vert = labellisées)</span></p>
        {groupes.map(([k, n]) => {
          const l = rows.filter((r) => (zone === 'gpso' ? r.commune : r.region) === k && r.label !== 'aucun').length;
          return (
            <div className="b" key={k}>
              <span>{k}</span>
              <div className="track" style={{ display: 'flex' }}>
                <div className="fill lab" style={{ width: `${(100 * l) / max}%`, borderRadius: 0 }} />
                <div className="fill" style={{ width: `${(100 * (n - l)) / max}%`, borderRadius: 0 }} />
              </div>
              <b>{n}</b>
            </div>
          );
        })}
      </div>
      <p className="tiny muted" style={{ marginTop: 8 }}>Aucun chiffre saisi à la main : tout est recalculé à chaque mise à jour du fichier.</p>
    </div>
  );
}

function Reponses({ rows }) {
  const lab = rows.filter((r) => r.label !== 'aucun');
  const bd = rows.filter((r) => r.assortiment === 'BD et Mangas');
  const QA = [
    ['Combien de librairies labellisées sur le territoire ?', lab.length, lab.map((r) => r.nom).join(', ')],
    ['Combien de librairies spécialisées BD ?', bd.length, bd.map((r) => `${r.nom} (${r.commune})`).join(', ')],
    ['Combien de communes ont au moins une librairie ?', new Set(rows.map((r) => r.code)).size, `sur ${Object.keys(GPSO).length} communes de GPSO`],
  ];
  return (
    <div className="answers">
      {QA.map(([q, n, d]) => (
        <div className="q" key={q}>
          <div className="ask">❓ {q}</div>
          <div className="res"><b>{n}</b> <span className="small">— 1 filtre, 2 secondes</span><br /><span className="tiny muted">{d}</span></div>
        </div>
      ))}
      <p className="small muted">Et quand l’an prochain on ajoute les lignes 2027, ces réponses se mettent à jour toutes seules.</p>
    </div>
  );
}

export function Simulateur() {
  const ref = useRef(null);
  const [all, setAll] = useState([]);
  const [fichier, setFichier] = useState('vue');
  const [tab, setTab] = useState('reponses');
  const [zone, setZone] = useState('gpso');
  const [visible, setVisible] = useState(false);

  useEffect(() => { loadLibrairies().then(setAll); }, []);
  useEffect(() => {
    const onChange = (e) => {
      const sec = ref.current?.closest('section');
      setVisible(e.detail?.currentSlide === sec);
    };
    window.addEventListener('reveal:slidechanged', onChange);
    return () => window.removeEventListener('reveal:slidechanged', onChange);
  }, []);

  const rows = useMemo(() => (zone === 'gpso' ? all.filter((r) => GPSO[r.code]) : all), [all, zone]);
  const vue = fichier === 'vue';

  return (
    <div className="sim" ref={ref}>
      <div className="sim-top">
        <div className="seg file">
          <button className={`vue ${vue ? 'on' : ''}`} onClick={() => setFichier('vue')}>📄 Mon fichier « vue »</button>
          <button className={`donnee ${!vue ? 'on' : ''}`} onClick={() => setFichier('donnee')}>📊 Mon fichier « donnée »</button>
        </div>
        <div className="seg">
          <button className={zone === 'gpso' ? 'on' : ''} onClick={() => setZone('gpso')}>GPSO</button>
          <button className={zone === 'france' ? 'on' : ''} onClick={() => setZone('france')} disabled={vue}>France entière</button>
        </div>
      </div>
      <div className="seg" style={{ alignSelf: 'flex-start' }}>
        {TABS.map(([k, t]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{t}</button>)}
      </div>
      <div className="sim-body">
        <div style={{ position: 'absolute', inset: 0, visibility: tab === 'carte' ? 'visible' : 'hidden' }}>
          <Carte rows={vue ? [] : rows} active={visible && tab === 'carte'} zone={zone} />
        </div>
        {tab === 'reponses' && <div className="sim-pane"><Reponses rows={all.filter((r) => GPSO[r.code])} /></div>}
        {tab === 'portail' && <div className="sim-pane"><Portail rows={rows} /></div>}
        {tab === 'tdb' && <div className="sim-pane"><TableauDeBord rows={rows} all={all} zone={zone} /></div>}
        {vue && <Echec tab={tab} />}
        {!all.length && !vue && <div className="fail"><p>Chargement des données…</p></div>}
      </div>
    </div>
  );
}
