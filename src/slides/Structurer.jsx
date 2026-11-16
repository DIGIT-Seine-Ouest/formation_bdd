// ─── Temps 2 : « Je le structure » ─────────────────────────────────────────
// Vue ≠ information · pourquoi Excel est piégeux · les 5 bonnes pratiques.
import { ExcelDonnee } from '../components/Fichiers';
import { SOURCE_URL } from '../data';

const BG = '#0f4c75';

const PIEGES = [
  ['Fusionner des cellules', 'chaque ligne doit être complète'],
  ['Mettre un sens dans une couleur', 'une couleur n’est pas une valeur'],
  ['Écrire « env. 30 » dans un nombre', 'un nombre est un nombre'],
  ['Écrire « bd », « BD / Mangas », « BD-Manga »', 'une seule valeur autorisée'],
  ['Glisser un TOTAL au milieu des données', 'un total se calcule, il ne se stocke pas'],
  ['Créer un onglet par année', 'l’année est une colonne'],
];

const REGLES = [
  ['Une ligne = une librairie', 'Ville fusionnée sur 6 lignes · ligne TOTAL', 'La commune est répétée sur chaque ligne · pas de total'],
  ['Une colonne = une information', '« Boulogne-Billancourt (6) »', 'commune = Boulogne-Billancourt · le 6 se calcule'],
  ['Rien dans la couleur', 'vert = labellisée', 'colonne label = LIR · LR · aucun'],
  ['Des valeurs normalisées et des codes officiels', '« Géné. », « généraliste », « bd »', 'liste déroulante · code_commune INSEE 92012'],
  ['Une structure stable, alimentée chaque année', 'onglet « Suivi 2026 », puis « Suivi 2027 »…', 'un id par librairie · colonne annee_suivi · un dictionnaire'],
];

export function Structurer() {
  return (
    <>
      <section data-background-color={BG}>
        <div className="section-intro">
          <div className="num">2</div>
          <div className="title">Je le structure</div>
          <div className="sub">Séparer ce que je <i>sais</i> de la façon dont je le <i>montre</i>.</div>
          <div className="promise">📐 Les bonnes pratiques essentielles</div>
        </div>
      </section>

      <section>
        <p className="kicker">L'idée clé de la séance</p>
        <h2>La vue n'est pas l'information</h2>
        <div className="bar" />
        <div className="flow">
          <div className="src">
            <p style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, opacity: .7 }}>Saisie une fois</p>
            <p style={{ fontSize: 26, fontWeight: 700, margin: '4px 0' }}>📊 L'information</p>
            <p className="small" style={{ opacity: .85 }}>un tableau sobre,<br />une ligne par librairie</p>
          </div>
          <div className="arrow">➜</div>
          <div className="views">
            <div className="view fragment">📄 Mon tableau coloré</div>
            <div className="view fragment">🗺️ Une carte</div>
            <div className="view fragment">📈 Un tableau de bord</div>
            <div className="view fragment">🌐 Une page grand public</div>
          </div>
        </div>
        <div className="row fragment" style={{ marginTop: 28 }}>
          <div className="card card--blue col"><b>L'information</b><p className="small muted">ce que je sais : se <b>conserve</b>, s'alimente chaque année, se réutilise.</p></div>
          <div className="card card--green col"><b>La vue</b><p className="small muted">la façon de le montrer : couleurs, totaux, mise en page. Se <b>recalcule</b> à la demande.</p></div>
        </div>
      </section>

      <section>
        <p className="kicker">Pourquoi Excel est piégeux</p>
        <h2>Excel accepte tout. Sans rien dire.</h2>
        <table className="rules" style={{ fontSize: 16 }}>
          <tbody>
            {PIEGES.map(([p, r]) => (
              <tr key={p} className="fragment">
                <td>{p}</td>
                <td><span className="pill pill--good">Excel : ✓ OK</span></td>
                <td><span className="pill pill--bad">Une base : ✗ refusé</span> <span className="small muted">— {r}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="callout fragment" style={{ marginTop: 10 }}>Excel nous laisse <b>trop libres</b>. La discipline, c'est à nous de l'avoir.</div>
      </section>

      <section>
        <p className="kicker">📐 Les bonnes pratiques essentielles</p>
        <h2>5 règles, vues sur mon fichier</h2>
        <table className="rules">
          <tbody>
            {REGLES.map(([r, avant, apres], i) => (
              <tr key={r} className="fragment">
                <td><span className="n">{i + 1}</span><b>{r}</b></td>
                <td className="before">✗ {avant}</td>
                <td className="after">✓ {apres}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="fragment small muted" style={{ marginTop: 8 }}>
          🧪 Le test : <i>« Si un collègue doit ajouter les librairies de 2027 sans me parler, est-ce qu'il y arrive ? »</i>
        </p>
      </section>

      <section>
        <p className="kicker">Après</p>
        <h2>Mon fichier, structuré</h2>
        <div className="row">
          <div style={{ flex: 2 }}><ExcelDonnee /></div>
          <div className="col stack" style={{ paddingTop: 6 }}>
            <p>Moins joli. <b>Mais il répond à tout.</b></p>
            <p className="small muted">La couleur ? Je la remettrai… dans une <i>vue</i>.</p>
            <div className="card card--green fragment">
              <p className="small"><b>Surprise :</b> c'est exactement la structure de la</p>
              <p style={{ fontWeight: 700, color: 'var(--navy)', margin: '4px 0' }}>Base des librairies en France</p>
              <p className="small muted">Ministère de la Culture · data.gouv.fr<br />3 237 librairies · mise à jour chaque année · Licence Ouverte</p>
              <p className="tiny" style={{ marginTop: 6 }}><a href={SOURCE_URL} target="_blank" rel="noreferrer">voir le jeu de données ↗</a></p>
            </div>
            <p className="fragment small">Mon petit fichier « isolé » parle <b>la même langue</b> qu'une base nationale.</p>
          </div>
        </div>
      </section>
    </>
  );
}
