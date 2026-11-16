// ─── Clôture : la check-list, l'appel à l'action, les téléchargements ───────
import { SOURCE_URL } from '../data';

const BASE = import.meta.env.BASE_URL;

const CHECK = [
  ['🟢', 'Une ligne = une chose (une librairie, une association, un commerce)'],
  ['🟢', 'Une colonne = une information — pas de fusion'],
  ['🟢', `Rien dans la couleur : si c'est une info, c'est une colonne`],
  ['🟡', 'Des valeurs normalisées et des codes officiels (INSEE, SIRET, RNA…)'],
  ['🔴', 'Une structure stable, un dictionnaire, alimentée chaque année'],
];

export function Ressources() {
  return (
    <>
      {/* ── Check-list ── */}
      <section>
        <div className="bd bd-2" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="panel">
            <p className="kicker">La check-list de Rémi</p>
            <h2 style={{ fontSize: 26 }}>Avant de fermer mon fichier</h2>
            <div className="stack">
              {CHECK.map(([lvl, txt]) => (
                <p key={txt} className="fragment" style={{ fontSize: 17, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 20 }}>{lvl}</span>
                  <span>{txt}</span>
                </p>
              ))}
            </div>
            <div className="tip fragment" style={{ marginTop: 14, fontSize: 15 }}>
              <div><b>Le test :</b> un collègue peut-il ajouter l'année prochaine <b>sans vous parler</b> ?</div>
            </div>
          </div>
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
            <div className="card card--blue" style={{ padding: 12 }}>
              <p><b>⏱ Gagner du temps</b></p>
              <p className="small muted">On filtre au lieu de compter. On ajoute des lignes au lieu de refaire le fichier.</p>
            </div>
            <div className="card card--blue" style={{ padding: 12 }}>
              <p><b>👁 Lisibilité</b></p>
              <p className="small muted">Carte, TDB, annuaire : des vues générées, toujours à jour.</p>
            </div>
            <div className="card card--blue" style={{ padding: 12 }}>
              <p><b>🚀 Exploitation</b></p>
              <p className="small muted">En interne (TDB élus) et en externe (annuaire habitants). La même donnée, deux usages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Phrase finale + appel à l'action ── */}
      <section>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="callout" style={{ fontSize: 28, padding: 28, marginBottom: 28 }}>
            La vue se <b>recalcule</b>. L'information se <b>conserve</b>.
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', justifyContent: 'center', marginBottom: 28 }}>
            <span className="avatar">🧑‍💻</span>
            <div className="bubble" style={{ fontSize: 20, textAlign: 'left' }}>
              <b>Quel fichier de suivi avez-vous aujourd'hui…<br />qui pourrait devenir l'une de ces pages ?</b>
            </div>
          </div>

          <div className="dl" style={{ textAlign: 'left' }}>
            <a href={'${BASE}ressources/mon_suivi_librairies_VUE.xlsx'} download>
              <div className="card card--red" style={{ padding: 14 }}>
                <span className="pill pill--bad">Avant · XLSX</span>
                <p style={{ fontWeight: 700, margin: '8px 0 4px' }}>Le fichier « vue »</p>
                <p className="small muted">Pour s'exercer : retrouvez les pièges.</p>
                <p className="small" style={{ marginTop: 8, color: 'var(--blue)', fontWeight: 700 }}>Télécharger ↓</p>
              </div>
            </a>
            <a href={'${BASE}ressources/mon_suivi_librairies_DONNEE.xlsx'} download>
              <div className="card card--green" style={{ padding: 14 }}>
                <span className="pill pill--good">Après · XLSX</span>
                <p style={{ fontWeight: 700, margin: '8px 0 4px' }}>Le fichier « donnée »</p>
                <p className="small muted">La correction, avec dictionnaire et liste déroulante.</p>
                <p className="small" style={{ marginTop: 8, color: 'var(--blue)', fontWeight: 700 }}>Télécharger ↓</p>
              </div>
            </a>
            <a href={SOURCE_URL} target="_blank" rel="noreferrer">
              <div className="card card--blue" style={{ padding: 14 }}>
                <span className="pill pill--blue">Source · data.gouv.fr</span>
                <p style={{ fontWeight: 700, margin: '8px 0 4px' }}>Base des librairies en France</p>
                <p className="small muted">Ministère de la Culture · Licence Ouverte 2.0</p>
                <p className="small" style={{ marginTop: 8, color: 'var(--blue)', fontWeight: 700 }}>Ouvrir ↗</p>
              </div>
            </a>
          </div>

          <p className="small muted" style={{ marginTop: 22 }}>Venez nous voir avec votre fichier : on regarde ensemble ce qu'il peut devenir.</p>
        </div>
      </section>
    </>
  );
}
