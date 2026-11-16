// ─── Épisode 2 : Rémi structure son fichier ─────────────────────────────────
// Du plus évident au plus subtil, chaque erreur est corrigée en BD.
import { ExcelVue, ExcelDonnee } from '../components/Fichiers';
import { SOURCE_URL } from '../data';

const PIEGES = [
  { do: 'Fusionner des cellules', xl: '✅ OK', db: '❌ Refusé — chaque ligne doit être complète', lvl: 'easy' },
  { do: 'Écrire « env. 30 » dans un nombre', xl: '✅ OK', db: '❌ Refusé — un nombre est un nombre', lvl: 'easy' },
  { do: 'Mettre du sens dans une couleur', xl: '✅ OK', db: `❌ Refusé — une couleur n'est pas une valeur`, lvl: 'medium' },
  { do: '« bd », « BD-Manga », « Géné. »', xl: '✅ OK', db: '❌ Refusé — une seule valeur autorisée', lvl: 'medium' },
  { do: 'Glisser un TOTAL dans les données', xl: '✅ OK', db: '❌ Refusé — un total se calcule', lvl: 'hard' },
  { do: `Créer un onglet par année`, xl: '✅ OK', db: `❌ Refusé — l'année est une colonne`, lvl: 'hard' },
];

const LVL = { easy: ['🟢', 'Évident', 'level--easy'], medium: ['🟡', 'Moins évident', 'level--medium'], hard: ['🔴', 'Subtil', 'level--hard'] };

export function Structurer() {
  return (
    <>
      {/* ── Transition ── */}
      <section data-background-color="#0f4c75">
        <div className="bd-transition" style={{ color: '#fff' }}>
          <div className="ep">Épisode 2</div>
          <div className="title">Rémi structure son fichier</div>
          <div className="sub">Du « plus évident » au « plus subtil » : corriger une erreur à la fois.</div>
        </div>
      </section>

      {/* ── Le déclic : vue ≠ information ── */}
      <section>
        <div className="bd bd-2" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="panel panel--action">
            <div className="caption">🧪 Le test du CSV — Rémi fait « Enregistrer sous → CSV ».</div>
            <div className="csv" style={{ fontSize: 13 }}>
{`Ville;Librairie;Spécialité;Remarques
Boulogne-B. (6);Le Comptoir De La Bd;BD / Mangas;
`}<span className="lost">{`;Les Curieux;Religieux;        ← ville ?
;Les Mots Et Les Choses;Géné.; ← label ?
`}</span>{`…
`}<span className="lost">{`TOTAL;17 librairies;;          ← une librairie ?`}</span>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <span className="pill pill--bad">Perdu</span><span className="small">le vert, les fusions, la mise en page</span>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              <span className="pill pill--good">Survit</span><span className="small">ce qui est écrit, une valeur par case</span>
            </div>
          </div>
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="callout" style={{ fontSize: 22 }}>
              Ce qui survit au CSV, c'est <b>l'information</b>.<br />Le reste, c'était <b>la vue</b>.
            </div>
            <div className="caption fragment" style={{ marginTop: 14, marginBottom: 0, fontSize: 16 }}>
              <b>L'idée clé de la séance :</b>
            </div>
            <div className="flow fragment" style={{ marginTop: 10 }}>
              <div className="src" style={{ padding: 14 }}>
                <p style={{ fontSize: 18, fontWeight: 700 }}>📊 L'information</p>
                <p className="small" style={{ opacity: .85 }}>saisie une fois, alimentée chaque année</p>
              </div>
              <div className="arrow">➜</div>
              <div className="views" style={{ gap: 8 }}>
                <div className="view" style={{ fontSize: 14, padding: '6px 10px' }}>📄 Mon tableau coloré</div>
                <div className="view" style={{ fontSize: 14, padding: '6px 10px' }}>🗺️ Une carte</div>
                <div className="view" style={{ fontSize: 14, padding: '6px 10px' }}>📈 Un TDB</div>
                <div className="view" style={{ fontSize: 14, padding: '6px 10px' }}>🌐 Un annuaire</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Excel est piégeux ── */}
      <section>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
            <span className="avatar avatar-sm">🧑‍💻</span>
            <div className="bubble" style={{ fontSize: 18 }}>Mais… c'est Excel qui m'a laissé faire tout ça !</div>
          </div>
          <div className="caption">💬 Exactement. <b>Excel accepte tout. Sans rien dire.</b> Du plus évident au plus subtil :</div>
          <table className="rules" style={{ fontSize: 15 }}>
            <tbody>
              {PIEGES.map((p) => {
                const [ico, lab, cls] = LVL[p.lvl];
                return (
                  <tr key={p.do} className="fragment">
                    <td><span className={'level ${cls}'}>{ico} {lab}</span></td>
                    <td>{p.do}</td>
                    <td><span className="pill pill--good" style={{ fontSize: 11 }}>Excel : {p.xl}</span></td>
                    <td><span className="pill pill--bad" style={{ fontSize: 11 }}>{p.db}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="callout fragment" style={{ marginTop: 10, fontSize: 20 }}>
            Excel nous laisse <b>trop libres</b>. La discipline, c'est à nous de l'avoir.
          </div>
        </div>
      </section>

      {/* ── L'entité et les attributs ── */}
      <section>
        <div className="bd bd-2" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="panel panel--action">
            <div className="caption">🧑‍💻 Rémi reprend de zéro. Première question :</div>
            <div className="bubble" style={{ fontSize: 20, marginBottom: 14 }}>
              <b>Qu'est-ce que je suis ?</b><br />
              → Une <b>librairie</b>. Chaque librairie, c'est une chose que je veux décrire.
            </div>
            <div className="card card--blue" style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--blue)', fontWeight: 700 }}>L'entité</p>
              <p style={{ fontSize: 17 }}>C'est la « chose » que vous suivez. Chaque entité = <b>une ligne</b> de votre fichier.</p>
            </div>
            <div className="caption" style={{ marginBottom: 0 }}>💬 Trouvez votre entité : une association ? un commerce ? un arbre ? un équipement ?</div>
          </div>
          <div className="panel panel--action">
            <div className="caption">Deuxième question :</div>
            <div className="bubble" style={{ fontSize: 20, marginBottom: 14 }}>
              <b>Qu'est-ce que j'ai besoin de savoir sur elle ?</b><br />
              → Son nom, sa spécialité, si elle est labellisée, dans quelle commune.
            </div>
            <div className="card card--green" style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--green)', fontWeight: 700 }}>Les attributs</p>
              <p style={{ fontSize: 17 }}>Ce sont les informations sur votre entité. Chaque attribut = <b>une colonne</b>.</p>
            </div>
            <p className="small">Rémi construit ses colonnes :</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
              {['id', 'librairie', 'assortiment', 'label', 'commune', 'code_commune', 'annee_suivi'].map((c) => (
                <code key={c} style={{ padding: '3px 8px', fontSize: 14 }}>{c}</code>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Les règles : du plus évident au plus subtil ── */}
      <section>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p className="kicker">Les bonnes pratiques — du plus évident au plus subtil</p>
          <h2 style={{ fontSize: 28, marginBottom: 10 }}>Rémi corrige son fichier, erreur par erreur</h2>
          <div className="bd bd-2" style={{ gap: 12 }}>
            {/* Évident */}
            <div className="panel fragment">
              <span className="level level--easy">🟢 Évident</span>
              <p style={{ fontWeight: 700, fontSize: 18, margin: '8px 0 4px' }}>① Une ligne = une librairie</p>
              <div className="row" style={{ gap: 10, fontSize: 14, marginTop: 6 }}>
                <div style={{ flex: 1 }}><span className="pill pill--bad" style={{ fontSize: 11 }}>Avant</span><p>Villes fusionnées sur 6 lignes, ligne TOTAL</p></div>
                <div style={{ flex: 1 }}><span className="pill pill--good" style={{ fontSize: 11 }}>Après</span><p>Chaque ligne est complète, pas de total (il se calcule)</p></div>
              </div>
              <div className="tip fragment" style={{ marginTop: 8, fontSize: 14 }}>
                <div>Si j'ajoute une librairie l'an prochain, j'ajoute <b>une ligne</b>. Je ne touche à rien d'autre.</div>
              </div>
            </div>
            <div className="panel fragment">
              <span className="level level--easy">🟢 Évident</span>
              <p style={{ fontWeight: 700, fontSize: 18, margin: '8px 0 4px' }}>② Rien dans la couleur</p>
              <div className="row" style={{ gap: 10, fontSize: 14, marginTop: 6 }}>
                <div style={{ flex: 1 }}><span className="pill pill--bad" style={{ fontSize: 11 }}>Avant</span><p>🟩 Vert = labellisée</p></div>
                <div style={{ flex: 1 }}><span className="pill pill--good" style={{ fontSize: 11 }}>Après</span><p>Colonne <code>label</code> = LIR · LR · aucun</p></div>
              </div>
              <div className="tip fragment" style={{ marginTop: 8, fontSize: 14 }}>
                <div>Si c'est une information, c'est <b>une colonne</b>. La couleur, c'est de la vue — vous la remettrez après avec une mise en forme conditionnelle.</div>
              </div>
            </div>
            {/* Moins évident */}
            <div className="panel fragment">
              <span className="level level--medium">🟡 Moins évident</span>
              <p style={{ fontWeight: 700, fontSize: 18, margin: '8px 0 4px' }}>③ Une valeur par case, normalisée</p>
              <div className="row" style={{ gap: 10, fontSize: 14, marginTop: 6 }}>
                <div style={{ flex: 1 }}><span className="pill pill--bad" style={{ fontSize: 11 }}>Avant</span><p>« Géné. », « généraliste », « bd », « BD-Manga »</p></div>
                <div style={{ flex: 1 }}><span className="pill pill--good" style={{ fontSize: 11 }}>Après</span><p>Liste déroulante : Généraliste, BD et Mangas, Religion…</p></div>
              </div>
              <div className="tip fragment" style={{ marginTop: 8, fontSize: 14 }}>
                <div>Une liste déroulante dans Excel = <b>30 secondes</b>. Ça évite 30 minutes de nettoyage l'an prochain.</div>
              </div>
            </div>
            <div className="panel fragment">
              <span className="level level--medium">🟡 Moins évident</span>
              <p style={{ fontWeight: 700, fontSize: 18, margin: '8px 0 4px' }}>④ Des codes officiels</p>
              <div className="row" style={{ gap: 10, fontSize: 14, marginTop: 6 }}>
                <div style={{ flex: 1 }}><span className="pill pill--bad" style={{ fontSize: 11 }}>Avant</span><p>Juste « Boulogne-Billancourt »</p></div>
                <div style={{ flex: 1 }}><span className="pill pill--good" style={{ fontSize: 11 }}>Après</span><p><code>code_commune</code> = 92012 (INSEE)</p></div>
              </div>
              <div className="tip fragment" style={{ marginTop: 8, fontSize: 14 }}>
                <div>Le code INSEE = <b>la clé universelle</b>. 5 caractères qui ouvrent la carte, le croisement, le national. Pensez aussi au SIRET, au RNA…</div>
              </div>
            </div>
            {/* Subtil */}
            <div className="panel panel--wide fragment">
              <span className="level level--hard">🔴 Subtil</span>
              <p style={{ fontWeight: 700, fontSize: 18, margin: '8px 0 4px' }}>⑤ Une structure stable, qu'on alimente chaque année</p>
              <div className="row" style={{ gap: 14, fontSize: 14, marginTop: 6 }}>
                <div style={{ flex: 1 }}><span className="pill pill--bad" style={{ fontSize: 11 }}>Avant</span><p>Un onglet « Suivi 2026 », puis un onglet « Suivi 2027 »…</p></div>
                <div style={{ flex: 1 }}><span className="pill pill--good" style={{ fontSize: 11 }}>Après</span><p>Colonne <code>annee_suivi</code>. L'an prochain, j'ajoute des lignes <b>en dessous</b>. Et un onglet « dictionnaire » dit ce que chaque colonne contient.</p></div>
                <div style={{ flex: 1 }}>
                  <div className="tip" style={{ fontSize: 14 }}>
                    <div><b>Le test ultime :</b> un collègue peut-il ajouter l'année prochaine <b>sans vous parler</b> ? Si oui, c'est gagné.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Le fichier structuré + la surprise ── */}
      <section>
        <div className="bd bd-21" style={{ maxWidth: 1050, margin: '0 auto' }}>
          <div className="panel panel--win">
            <div className="caption">✅ Le fichier de Rémi, après restructuration.</div>
            <ExcelDonnee />
          </div>
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span className="avatar avatar-sm">🧑‍💻</span>
              <div className="bubble" style={{ fontSize: 16 }}>
                C'est moins joli. Mais maintenant les 3 questions de ma collègue… <b>un filtre, 2 secondes.</b>
              </div>
            </div>
            <div className="card card--green fragment" style={{ padding: 14 }}>
              <p style={{ fontWeight: 700, fontSize: 18, color: 'var(--navy)', margin: '0 0 6px' }}>🎉 La surprise</p>
              <p style={{ fontSize: 15 }}>Le fichier de Rémi a <b>exactement la même structure</b> que la :</p>
              <p style={{ fontWeight: 700, fontSize: 20, color: 'var(--navy)', margin: '8px 0' }}>Base des librairies en France</p>
              <p className="small muted">Ministère de la Culture · data.gouv.fr · 3 237 librairies · Licence Ouverte</p>
              <p className="tiny" style={{ marginTop: 6 }}><a href={SOURCE_URL} target="_blank" rel="noreferrer">voir le jeu de données ↗</a></p>
            </div>
            <div className="caption fragment" style={{ marginBottom: 0, fontSize: 15 }}>
              💬 Son petit fichier « isolé » parle <b>la même langue</b> qu'une base nationale. Ce n'est pas un hasard : c'est la structuration qui le permet.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
