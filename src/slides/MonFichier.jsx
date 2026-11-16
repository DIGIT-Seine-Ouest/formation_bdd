// ─── Épisode 1 : Rémi constitue sa base ─────────────────────────────────────
// Il fait ce que tout le monde fait : il ouvre Excel, il tape, il met en forme.
// Puis un collègue lui demande un chiffre et ça coince.
import { ExcelVue } from '../components/Fichiers';

export function MonFichier() {
  return (
    <>
      {/* ── Transition épisode ── */}
      <section data-background-color="#009fe3">
        <div className="bd-transition" style={{ color: '#fff' }}>
          <div className="ep">Épisode 1</div>
          <div className="title">Rémi constitue sa base</div>
          <div className="sub">« Ma direction me demande un suivi des librairies du territoire. »</div>
        </div>
      </section>

      {/* ── Case 1 : la mission ── */}
      <section>
        <div className="bd bd-2" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="panel">
            <div className="caption">📧 Lundi matin, boîte mail.</div>
            <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 14, border: '1px solid var(--line)', fontSize: 16, lineHeight: 1.6 }}>
              <p><b>De :</b> Direction Générale</p>
              <p><b>Objet :</b> Suivi des librairies indépendantes</p>
              <div style={{ borderTop: '1px solid var(--line)', margin: '8px 0', paddingTop: 8 }}>
                <p>Rémi,</p>
                <p style={{ marginTop: 6 }}>Le ministère de la Culture publie une base nationale des librairies.
                  On a besoin d'un <b>suivi local</b> : combien on en a sur le territoire, lesquelles sont labellisées, quelle spécialité.</p>
                <p style={{ marginTop: 6 }}><b>L'étude est annuelle</b> — les élus la veulent chaque année au budget.</p>
              </div>
            </div>
          </div>
          <div className="panel">
            <div className="caption">💬 Narrateur</div>
            <p style={{ fontSize: 17 }}>Ce scénario, vous le vivez chaque semaine. Pas forcément les librairies :</p>
            <div className="stack" style={{ marginTop: 10 }}>
              {[
                ['🌳', 'Les arbres', '32 684 sur data.seineouest.fr'],
                ['🏪', 'Les commerces', '209 sur data.sevres.fr'],
                ['🤝', 'Les associations', '112 sur data.meudon.fr'],
                ['⚽', 'Les équipements sportifs', '178 sur Boulogne'],
                ['🩺', 'Les pros de santé', '2 604 sur le territoire'],
              ].map(([e, t, d]) => (
                <div key={t} className="fragment" style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 15 }}>
                  <span style={{ fontSize: 22 }}>{e}</span> <b>{t}</b> <span className="muted">— {d}</span>
                </div>
              ))}
            </div>
            <p className="fragment small" style={{ marginTop: 14, fontWeight: 700, color: 'var(--navy)' }}>Le mécanisme est toujours le même.</p>
          </div>
        </div>
      </section>

      {/* ── Case 2 : Rémi ouvre Excel ── */}
      <section>
        <div className="bd bd-21" style={{ maxWidth: 1050, margin: '0 auto' }}>
          <div className="panel">
            <div className="caption">Rémi fait ce que tout le monde fait.</div>
            <ExcelVue />
          </div>
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span className="avatar avatar-sm">🧑‍💻</span>
              <div className="bubble" style={{ fontSize: 16 }}>
                J'ouvre Excel. Je tape le nom des librairies. Je mets un titre, des couleurs, je fusionne les villes, j'ajoute un total. <b>Voilà.</b>
              </div>
            </div>
            <div className="caption">💬 Narrateur</div>
            <p style={{ fontSize: 16 }}>Ce fichier est <b>lisible</b>. Il est même joli.</p>
            <p style={{ fontSize: 16 }}>Mais c'est un <b>produit fini</b> : une note, un rapport. Ce n'est pas une <b>base de travail</b> qu'on alimente chaque année.</p>
            <p className="fragment muted small" style={{ marginTop: 6 }}>Les 17 librairies sont réelles — elles viennent de la Base nationale des librairies (on y reviendra).</p>
          </div>
        </div>
      </section>

      {/* ── Case 3 : Le collègue demande un chiffre ── */}
      <section>
        <div className="bd bd-2" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="panel">
            <div className="caption">⏱ Mardi 14h — un collègue débarque.</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
              <span className="avatar avatar-sm">👩‍💼</span>
              <div className="bubble" style={{ fontSize: 18 }}>
                Rémi, j'ai besoin <b>rapidement</b> de 3 chiffres pour ma note au DG :<br />
                <span className="fragment">① Combien de librairies <b>labellisées</b> ?</span><br />
                <span className="fragment">② Combien de librairies <b>BD</b> ?</span><br />
                <span className="fragment">③ Tu peux me faire <b>une carte</b> ?</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span className="avatar avatar-sm">🧑‍💻</span>
              <div className="bubble bubble--thought" style={{ fontSize: 16 }}>
                <span className="fragment">① Labellisées ? Je compte les cases vertes… 🟩🟩🟩… et si elle imprime en N&B ?</span><br />
                <span className="fragment">② BD ? Je lis « BD / Mangas », « bd », « BD-Manga »… ça fait combien ?</span><br />
                <span className="fragment">③ Carte ? J'ai pas de code commune. « Boulogne-Billancourt (6) » c'est pas un lieu…</span>
              </div>
            </div>
          </div>
          <div className="panel fragment" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="timer">⏱ 25 min</div>
            <p className="center muted" style={{ marginTop: 6, fontSize: 15 }}>pour répondre à 3 questions simples</p>
            <div className="callout fragment" style={{ marginTop: 20, fontSize: 20 }}>
              Le fichier répond à <b>une seule question</b> :<br />
              « à quoi ça ressemble ». Pas « combien », « lesquelles », « où ».
            </div>
            <div className="tip fragment" style={{ marginTop: 14, fontSize: 15 }}>
              <div>Et si Rémi avait structuré autrement… il aurait répondu en <b>10 secondes</b>. On va voir comment.</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
