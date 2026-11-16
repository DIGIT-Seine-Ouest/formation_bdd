// ─── Temps 3 : « Voilà ce que je peux déjà en faire » ──────────────────────
import { Simulateur } from '../components/Simulateur';

const BG = '#95c11f';

export function Valoriser() {
  return (
    <>
      <section data-background-color={BG}>
        <div className="section-intro">
          <div className="num">3</div>
          <div className="title">Voilà ce que je peux déjà en faire</div>
          <div className="sub">Le même fichier, branché sur une carte, un portail, un tableau de bord.</div>
          <div className="promise">⏱ Gagner du temps · 👁 Rendre l'information lisible</div>
        </div>
      </section>

      <section style={{ padding: 0 }}>
        <Simulateur />
      </section>

      <section>
        <p className="kicker">Honnêtement</p>
        <h2>Ce que mon fichier ne permet pas (encore)</h2>
        <div className="row">
          <div className="card card--amber col fragment">
            <p><b>📍 Pas d'adresse, pas de coordonnées</b></p>
            <p className="small muted">Chaque librairie est posée au centre de sa commune. Pas d'itinéraire possible.</p>
          </div>
          <div className="card card--amber col fragment">
            <p><b>🔑 Pas d'identifiant officiel (SIRET)</b></p>
            <p className="small muted">« Anagramme » à Meudon et à Sèvres : une enseigne, deux boutiques ? Impossible à dire.</p>
          </div>
          <div className="card card--amber col fragment">
            <p><b>🕳 Un espace caché</b></p>
            <p className="small muted">Dans le fichier national, l'en-tête est <code>code_commune␣</code>. Invisible à l'œil, il casse un traitement automatique.</p>
          </div>
        </div>
        <div className="callout fragment" style={{ marginTop: 22 }}>
          Chaque colonne manquante, c'est <b>une valorisation en moins</b>.
        </div>
        <p className="fragment" style={{ marginTop: 18, fontSize: 22, fontFamily: '"IBM Plex Serif", serif', color: 'var(--navy)' }}>
          Alors, que se passe-t-il quand on va jusqu'au bout ? →
        </p>
      </section>
    </>
  );
}
