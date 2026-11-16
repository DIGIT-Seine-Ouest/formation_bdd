// ─── Accueil : titre + présentation du format BD ────────────────────────────

const GRAD = 'linear-gradient(135deg, #009fe3 0%, #95c11f 100%)';
const BASE = import.meta.env.BASE_URL;

export function Accueil() {
  return (
    <>
      {/* ── Couverture ── */}
      <section data-background-gradient={GRAD}>
        <div className="card" style={{ maxWidth: 820, margin: '0 auto', padding: '46px 56px', borderTop: '5px solid var(--blue)', borderRadius: '4px 4px 16px 16px', boxShadow: '0 28px 70px rgba(0,0,0,.25)' }}>
          <p className="kicker">DIGIT Formation · Mardi 17 novembre 2026</p>
          <h1 style={{ fontFamily: '"IBM Plex Serif", serif', fontSize: 48, lineHeight: 1.08 }}>Valoriser le potentiel des données</h1>
          <div className="bar" style={{ margin: '18px 0 20px' }} />
          <p style={{ fontFamily: '"IBM Plex Serif", serif', fontSize: 20, color: '#555' }}>
            Des données bien structurées pour <b>gagner du temps</b> et améliorer la <b>lisibilité</b> de l'information.<br />
            Découvrez les <b>bonnes pratiques essentielles</b> pour faciliter leur exploitation.
          </p>
          <p className="tiny muted" style={{ marginTop: 18, fontFamily: 'monospace', letterSpacing: 1 }}>1 h · niveau débutant · [Pratique]</p>
        </div>
      </section>

      {/* ── Présentation du personnage ── */}
      <section>
        <div className="bd bd-12" style={{ maxWidth: 960, margin: '0 auto', alignItems: 'center' }}>
          <div className="panel" style={{ textAlign: 'center', padding: 24 }}>
            <div className="avatar" style={{ fontSize: 90 }}>🧑‍💻</div>
            <p style={{ fontWeight: 700, fontSize: 22, margin: '10px 0 4px' }}>Rémi</p>
            <p className="small muted">DSI · GPSO</p>
            <img src={`${BASE}data/remi.png`} alt="" style={{ width: 100, borderRadius: 999, marginTop: 8, border: '3px solid var(--blue)', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
          <div className="stack">
            <div className="bubble" style={{ fontSize: 22 }}>
              <b>Aujourd'hui, je vais vous raconter une histoire.</b><br />
              L'histoire d'un fichier qui part de mon bureau… et qui finit par servir à tout le monde.
            </div>
            <div className="caption" style={{ marginTop: 10, marginBottom: 0 }}>
              <b>Le fil de l'heure :</b> de la donnée brute sur mon poste → au service rendu aux habitants.
              <br />En passant par les bonnes pratiques qui font toute la différence.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
