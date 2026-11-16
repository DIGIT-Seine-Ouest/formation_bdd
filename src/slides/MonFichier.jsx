// ─── Temps 1 : « J'ai un fichier de suivi » ─────────────────────────────────
// Le fichier Excel que tout le monde a : lisible… mais c'est une VUE.
import { ExcelVue } from '../components/Fichiers';

const BG = '#009fe3';

export function MonFichier() {
  return (
    <>
      <section data-background-color={BG}>
        <div className="section-intro">
          <div className="num">1</div>
          <div className="title">J'ai un fichier de suivi</div>
          <div className="sub">Je suis les librairies indépendantes de mon territoire. Comme tout le monde : dans Excel.</div>
        </div>
      </section>

      <section>
        <p className="kicker">Mon fichier</p>
        <h2>Le suivi des librairies de GPSO</h2>
        <div className="row">
          <div style={{ flex: 1.7 }}><ExcelVue /></div>
          <div className="col stack" style={{ paddingTop: 10 }}>
            <p>Un titre, des couleurs, des villes regroupées, un total.</p>
            <p className="fragment" style={{ fontFamily: '"IBM Plex Serif", serif', fontSize: 26, color: 'var(--navy)' }}>Il est bien, ce fichier ?</p>
            <p className="fragment small muted">Oui : il est <b>lisible</b>. Pour un humain, aujourd'hui.</p>
            <p className="fragment tiny muted" style={{ marginTop: 26 }}>Les 17 librairies sont réelles : elles viennent de la Base nationale des librairies (on y reviendra).</p>
          </div>
        </div>
      </section>

      <section>
        <p className="kicker">⏱ Gagner du temps ?</p>
        <h2>La cheffe pose trois questions</h2>
        <div className="row">
          <div style={{ flex: 1.2 }}><ExcelVue rows={13} /></div>
          <div className="col stack">
            <div className="card card--red fragment">
              <p><b>« Combien de librairies labellisées ? »</b></p>
              <p className="small muted">Je compte les cases vertes… et si quelqu'un imprime en noir et blanc ?</p>
            </div>
            <div className="card card--red fragment">
              <p><b>« Combien de librairies BD ? »</b></p>
              <p className="small muted">« BD / Mangas », « bd », « BD-Manga »… je relis tout.</p>
            </div>
            <div className="card card--red fragment">
              <p><b>« Tu peux me faire une carte ? »</b></p>
              <p className="small muted">Ni adresse, ni code commune. « Boulogne-Billancourt (6) » n'est pas un lieu.</p>
            </div>
          </div>
        </div>
        <div className="callout fragment" style={{ marginTop: 16 }}>Mon fichier est <b>lisible</b>… mais il n'est pas <b>exploitable</b>.</div>
      </section>

      <section>
        <p className="kicker">🖐 Le geste à faire chez soi</p>
        <h2>Le test du CSV : « Enregistrer sous… → CSV »</h2>
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div className="col">
            <p className="small muted" style={{ marginBottom: 8 }}>Ce qu'Excel garde quand on enlève la mise en forme :</p>
            <div className="csv">
{`;📚 SUIVI DES LIBRAIRIES DU TERRITOIRE — 2026;;
;en vert = librairie labellisée · données…;;
Ville;Librairie;Spécialité;Remarques
Boulogne-Billancourt (6);Le Comptoir De La Bd;BD / Mangas;
`}<span className="lost">{`;Les Curieux;Religieux;                  ← ville ?
;Les Mots Et Les Choses;Géné.;           ← label ?
`}</span>{`;Les Mots Et Les Choses Nord;Généraliste;2e boutique
`}<span className="lost">{`;Les Mots Et Les Images;bd;              ← label ?
`}</span>{`…
`}<span className="lost">{`TOTAL;17 librairies;;                   ← une librairie ?`}</span>
            </div>
          </div>
          <div className="col stack">
            <div className="card card--red fragment"><span className="pill pill--bad">perdu</span><p className="small" style={{ marginTop: 6 }}>Le vert (le label), les fusions (la ville), la mise en page.</p></div>
            <div className="card card--amber fragment"><span className="pill pill--bad">piège</span><p className="small" style={{ marginTop: 6 }}>Le titre, la note et le TOTAL deviennent… des lignes de données.</p></div>
            <div className="card card--green fragment"><span className="pill pill--good">survit</span><p className="small" style={{ marginTop: 6 }}>Ce qui est écrit, une valeur par case. <b>Ça, c'est l'information.</b></p></div>
          </div>
        </div>
        <div className="callout fragment" style={{ marginTop: 14 }}>Ce qui survit au CSV, c'est <b>l'information</b>. Le reste, c'était <b>la vue</b>.</div>
      </section>
    </>
  );
}
