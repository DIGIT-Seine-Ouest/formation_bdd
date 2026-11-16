// ─── Accueil : titre + le fil de la séance, calé sur les promesses de l'annonce ──

const GRAD = 'linear-gradient(135deg, #009fe3 0%, #95c11f 100%)';

const ETAPES = [
  ['1', "J'ai un fichier de suivi", 'Les librairies de mon territoire, dans Excel', 'var(--blue)'],
  ['2', 'Je le structure', 'Les bonnes pratiques essentielles', 'var(--blue)'],
  ['3', 'Voilà ce que je peux déjà en faire', 'Carte, portail, tableau de bord… en 1 clic', 'var(--green)'],
  ['4', 'Et chez nous ?', 'Meudon, Sèvres, Boulogne : nos réalisations', 'var(--navy)'],
];

export function Accueil() {
  return (
    <>
      <section data-background-gradient={GRAD}>
        <div className="card" style={{ maxWidth: 820, margin: '0 auto', padding: '46px 56px', borderTop: '5px solid var(--blue)', borderRadius: '4px 4px 16px 16px', boxShadow: '0 28px 70px rgba(0,0,0,.25)' }}>
          <p className="kicker">DIGIT Formation · 2026 · Niveau débutant</p>
          <h1 style={{ fontFamily: '"IBM Plex Serif", serif', fontSize: 50, lineHeight: 1.08 }}>Valoriser le potentiel des données</h1>
          <div className="bar" style={{ margin: '18px 0 20px' }} />
          <p style={{ fontFamily: '"IBM Plex Serif", serif', fontSize: 21, color: '#555' }}>
            Des données bien structurées pour gagner du temps et rendre l'information lisible.
          </p>
          <p className="tiny muted" style={{ marginTop: 18, fontFamily: 'monospace', letterSpacing: 1 }}>1 h · pratique</p>
        </div>
      </section>

      <section>
        <p className="kicker">Le fil de l'heure</p>
        <h2>Une histoire simple, en 4 temps</h2>
        <div className="bar" />
        <div className="stack" style={{ maxWidth: 780 }}>
          {ETAPES.map(([n, t, d, c]) => (
            <div key={n} className="card fragment" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 18px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{n}</div>
              <div><p style={{ fontWeight: 700 }}>{t}</p><p className="small muted">{d}</p></div>
            </div>
          ))}
        </div>
        <p className="fragment small" style={{ marginTop: 18 }}>
          🎯 À la fin : <b>gagner du temps</b> · <b>rendre l'information lisible</b> · <b>faciliter son exploitation</b>.
        </p>
      </section>
    </>
  );
}
