// Nos réalisations avec les villes, en direct (iframes chargées seulement
// quand la slide est affichée). Structures relevées via l'API Explore v2.1.
import { useEffect, useRef, useState } from 'react';

export const REALISATIONS = [
  {
    ville: 'Meudon', titre: 'Annuaire des associations', astuce: 'Règle : 1 ligne = 1 fait (un lieu d’activité)',
    url: 'https://data.meudon.fr/pages/annuaire-des-asso-2025/',
    detail: '112 lignes. Une association active dans deux lieux = deux lignes, chacune avec son adresse et son point GPS.',
  },
  {
    ville: 'Sèvres', titre: 'Annuaire des commerces', astuce: 'Règle : atomicité (adresse découpée)',
    url: 'https://data.sevres.fr/pages/annuairecommerce/',
    detail: '209 commerces. Adresse découpée (numéro, répétition, voie) + code INSEE : chaque commerce se place sur la carte.',
  },
  {
    ville: 'Boulogne-Billancourt', titre: 'Équipements sportifs', astuce: 'Règle : identifiant officiel + jointure',
    url: 'https://boulognebillancourt-seineouest.opendatasoft.com/pages/equipements-sportifs/',
    detail: '178 équipements repris de la base nationale Data ES grâce à leurs identifiants : rien n’a été ressaisi.',
  },
];

export function Vitrine() {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onChange = (e) => setVisible(e.detail?.currentSlide === ref.current?.closest('section'));
    window.addEventListener('reveal:slidechanged', onChange);
    return () => window.removeEventListener('reveal:slidechanged', onChange);
  }, []);
  const r = REALISATIONS[i];
  return (
    <div className="vitrine" ref={ref}>
      <div className="choix">
        {REALISATIONS.map((x, k) => (
          <button key={x.ville} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
            <div className="v">{x.ville}</div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{x.titre}</div>
            <div className="r">{x.astuce}</div>
          </button>
        ))}
        <p className="small" style={{ marginTop: 4 }}>{r.detail}</p>
        <a className="btn" href={r.url} target="_blank" rel="noreferrer" style={{ alignSelf: 'flex-start' }}>Ouvrir la page ↗</a>
      </div>
      {visible ? <iframe key={r.url} src={r.url} title={r.titre} /> : <iframe title="chargement" />}
    </div>
  );
}
