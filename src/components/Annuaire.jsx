// La page pour les usagers : l’annuaire des librairies de GPSO, construit
// directement à partir de la base de Rémi (src/remi.js), sans rien ressaisir.
// Seules les informations de la source sont affichées (nom, spécialité, label,
// commune, code postal) : Base des librairies en France, ministère de la Culture.
// Utilisé dans la présentation (Ép. 5) et en page autonome (annuaire.html).
import { useMemo, useState } from 'react';
import '../annuaire.css';
import { CODE_POSTAL, COMMUNES, LIBRAIRIES, SOURCE_URL, nomCommune } from '../remi';

const joli = (s) => s.toLowerCase().replace(/(^|[\s'’-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase());
const LABELS = { LIR: 'Librairie indépendante de référence', LR: 'Librairie de référence' };
const stop = (e) => e.stopPropagation(); // la saisie ne doit pas piloter les slides

function telechargerCSV() {
  const lignes = [['id', 'librairie', 'assortiment', 'label', 'code_commune', 'commune', 'code_postal'],
    ...LIBRAIRIES.map(([id, nom, a, l, code]) => [id, nom, a, l, code, nomCommune(code), CODE_POSTAL[code]])];
  const csv = lignes.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n');
  const url = URL.createObjectURL(new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url; a.download = 'librairies_gpso.csv'; a.click();
  URL.revokeObjectURL(url);
}

export function Annuaire({ pleinePage = false }) {
  const [q, setQ] = useState('');
  const [commune, setCommune] = useState('');
  const [spe, setSpe] = useState('');
  const [label, setLabel] = useState(false);

  const specialites = useMemo(() => [...new Set(LIBRAIRIES.map((l) => l[2]))].sort(), []);
  const parCommune = useMemo(() => COMMUNES.map(([c, n]) => [c, n, LIBRAIRIES.filter((l) => l[4] === c).length]).filter((x) => x[2]), []);
  const res = LIBRAIRIES.filter(([, nom, a, l, code]) => (!q || nom.toLowerCase().includes(q.toLowerCase()))
    && (!commune || code === commune) && (!spe || a === spe) && (!label || l !== 'aucun'));

  return (
    <div className={`annuaire ${pleinePage ? 'plein' : ''}`}>
      <header>
        <div className="marque">Grand Paris Seine Ouest · Culture</div>
        <h1>Les librairies près de chez vous</h1>
        <p>{LIBRAIRIES.length} librairies sur le territoire. Trouvez la vôtre.</p>
      </header>
      <div className="filtres">
        <input type="search" placeholder="Rechercher une librairie…" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={stop} aria-label="Rechercher une librairie" />
        <select value={spe} onChange={(e) => setSpe(e.target.value)} onKeyDown={stop} aria-label="Spécialité">
          <option value="">Toutes les spécialités</option>
          {specialites.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <label className="bascule"><input type="checkbox" checked={label} onChange={(e) => setLabel(e.target.checked)} /> Labellisées par le ministère</label>
      </div>
      <div className="communes" role="group" aria-label="Commune">
        <button type="button" className={!commune ? 'on' : ''} onClick={() => setCommune('')}>Toutes</button>
        {parCommune.map(([c, n, k]) => (
          <button type="button" key={c} className={commune === c ? 'on' : ''} onClick={() => setCommune(commune === c ? '' : c)}>{n} <span>{k}</span></button>
        ))}
      </div>
      <p className="compte">{res.length} librairie{res.length > 1 ? 's' : ''}</p>
      <div className="cartes">
        {res.map(([id, nom, a, l, code]) => (
          <article key={id}>
            <h3>{joli(nom)}</h3>
            <p className="tags"><span>{a}</span>{l !== 'aucun' && <span className="lab" title={LABELS[l]}>★ {l}</span>}</p>
            <p className="lieu">📍 {nomCommune(code)} · {CODE_POSTAL[code]}</p>
          </article>
        ))}
        {!res.length && <p className="vide">Aucune librairie ne correspond. Essayez une autre commune.</p>}
      </div>
      <footer>
        <span>Source : <a href={SOURCE_URL} target="_blank" rel="noreferrer">Base des librairies en France</a>, ministère de la Culture · Licence Ouverte 2.0 · mars 2026</span>
        <button type="button" onClick={telechargerCSV}>⬇ Télécharger les données (CSV)</button>
      </footer>
    </div>
  );
}
