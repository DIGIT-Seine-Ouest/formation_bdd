// ─── Épisode 3 : « Voilà ce que je peux déjà en faire » ────────────────────
// Le simulateur + les limites honnêtes
import { Simulateur } from '../components/Simulateur';

export function Valoriser() {
  return (
    <>
      <section data-background-color="#95c11f">
        <div className="bd-transition" style={{ color: '#fff' }}>
          <div className="ep">Épisode 3</div>
          <div className="title">Voilà ce que Rémi<br />peut déjà en faire</div>
          <div className="sub">Usage interne : répondre vite. Usage externe : servir tout le monde.</div>
        </div>
      </section>

      {/* ── Simulateur ── */}
      <section style={{ padding: 0 }}>
        <Simulateur />
      </section>

      {/* ── Limites ── */}
      <section>
        <div className="bd bd-2" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="panel">
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
              <span className="avatar avatar-sm">🧑‍💻</span>
              <div className="bubble" style={{ fontSize: 16 }}>
                OK c'est bien… mais sur la carte, les points sont tous au centre de la commune. Et « Anagramme » apparaît 2 fois.
              </div>
            </div>
            <div className="caption">💬 Honnêtement, le fichier a ses limites :</div>
            <div className="stack">
              <div className="card card--amber" style={{ padding: 10 }}>
                <p style={{ fontSize: 15 }}><b>📍 Pas d'adresse, pas de coordonnées</b></p>
                <p className="small muted">Chaque librairie est posée au centre de sa commune. Pas d'itinéraire.</p>
              </div>
              <div className="card card--amber" style={{ padding: 10 }}>
                <p style={{ fontSize: 15 }}><b>🔑 Pas de SIRET</b></p>
                <p className="small muted">« Anagramme » à Meudon et Sèvres : une enseigne ? Deux boutiques ? Impossible à dire.</p>
              </div>
              <div className="card card--amber" style={{ padding: 10 }}>
                <p style={{ fontSize: 15 }}><b>🕳 Un espace caché dans l'en-tête national</b></p>
                <p className="small muted"><code>code_commune␣</code> — invisible à l'œil, casse un traitement automatique.</p>
              </div>
            </div>
          </div>
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="callout" style={{ fontSize: 20, marginBottom: 14 }}>
              Chaque colonne manquante = <b>une valorisation en moins</b>.<br />
              Chaque colonne ajoutée = <b>un usage en plus</b>.
            </div>
            <div className="tip" style={{ fontSize: 15 }}>
              <div>On ne fait pas tout d'un coup. On <b>construit petit à petit</b>. L'important, c'est que la structure soit là dès le départ.</div>
            </div>
            <p className="fragment" style={{ marginTop: 20, fontSize: 22, fontFamily: '"IBM Plex Serif", serif', color: 'var(--navy)', textAlign: 'center' }}>
              Et si Rémi allait <b>plus loin</b> ? →
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
