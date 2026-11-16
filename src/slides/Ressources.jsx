// ─── Clôture : à retenir + à vous + ressources ─────────────────────────────
import { SOURCE_URL } from '../data';

const BASE = import.meta.env.BASE_URL;

const CHECK = [
  'Une ligne = une chose (une librairie, une association, un commerce)',
  'Une colonne = une information, une valeur par case',
  'Rien dans la couleur : si c’est une info, c’est une colonne',
  'Des listes de valeurs et des codes officiels (INSEE, SIRET…)',
  'Une structure stable, qu’on alimente chaque année',
];

export function Ressources() {
  return (
    <>
      <section>
        <p className="kicker">À retenir</p>
        <h2>Séparer l'information de sa vue</h2>
        <div className="row">
          <div className="col">
            {CHECK.map((c) => (
              <p key={c} className="fragment" style={{ margin: '0 0 12px', fontSize: 19 }}>
                <span style={{ color: 'var(--green)', fontWeight: 900, marginRight: 8 }}>☑</span>{c}
              </p>
            ))}
          </div>
          <div className="col stack">
            <div className="card card--blue"><p>⏱ <b>Gagner du temps</b></p><p className="small muted">On filtre au lieu de compter. On ajoute des lignes au lieu de refaire le fichier.</p></div>
            <div className="card card--blue"><p>👁 <b>Rendre l'information lisible</b></p><p className="small muted">Carte, tableau de bord, page web : des vues générées, toujours à jour.</p></div>
            <div className="card card--blue"><p>🚀 <b>Faciliter l'exploitation</b></p><p className="small muted">Un fichier bien structuré n'est jamais isolé : il rejoint les autres.</p></div>
          </div>
        </div>
        <div className="callout fragment" style={{ marginTop: 16 }}>La vue se <b>recalcule</b>. L'information se <b>conserve</b>.</div>
      </section>

      <section>
        <p className="kicker">À vous</p>
        <h2>Quel fichier de suivi avez-vous… qui pourrait devenir l'une de ces pages ?</h2>
        <div className="bar" />
        <div className="dl">
          <a href={`${BASE}ressources/mon_suivi_librairies_VUE.xlsx`} download>
            <div className="card card--red"><span className="pill pill--bad">Avant · XLSX</span><p style={{ fontWeight: 700, margin: '8px 0 4px' }}>Le fichier « vue »</p><p className="small muted">Pour s'exercer : retrouvez les pièges et structurez-le.</p><p className="small" style={{ marginTop: 8, color: 'var(--blue)', fontWeight: 700 }}>Télécharger ↓</p></div>
          </a>
          <a href={`${BASE}ressources/mon_suivi_librairies_DONNEE.xlsx`} download>
            <div className="card card--green"><span className="pill pill--good">Après · XLSX</span><p style={{ fontWeight: 700, margin: '8px 0 4px' }}>Le fichier « donnée »</p><p className="small muted">La correction, avec son onglet dictionnaire et sa liste déroulante.</p><p className="small" style={{ marginTop: 8, color: 'var(--blue)', fontWeight: 700 }}>Télécharger ↓</p></div>
          </a>
          <a href={SOURCE_URL} target="_blank" rel="noreferrer">
            <div className="card card--blue"><span className="pill pill--blue">Source · data.gouv.fr</span><p style={{ fontWeight: 700, margin: '8px 0 4px' }}>Base des librairies en France</p><p className="small muted">Ministère de la Culture · Licence Ouverte 2.0.</p><p className="small" style={{ marginTop: 8, color: 'var(--blue)', fontWeight: 700 }}>Ouvrir ↗</p></div>
          </a>
        </div>
        <p className="center small muted" style={{ marginTop: 26 }}>Venez nous voir avec votre fichier : on regarde ensemble ce qu'il peut devenir.</p>
      </section>
    </>
  );
}
