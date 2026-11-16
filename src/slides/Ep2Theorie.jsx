// ─── Épisode 2 : « Delos, c’est quoi une base de données ? » → BIM, la théorie ──
// Rémi pose les questions naïves, Delos fait le cours (un peu à ses dépens).
// Contenu (cheat sheet mobilité) : §1 définition + du réel à la table,
// §2 vocabulaire + test de la phrase, la chose à retenir + §3 deux logiques,
// §4 cadrage en 3 questions.
import { Bulle, Case, Mini, Narrateur, Planche } from '../components/BD';

export function Ep2Theorie() {
  return (
    <>
      <section data-background-color="#009a93">
        <div className="chapitre">
          <div className="ep">Épisode 2</div>
          <div className="titre" style={{ fontSize: 64 }}>« Delos, c’est quoi<br />une base de données ? »</div>
          <div className="bim fragment">BIM !</div>
          <div className="sous fragment" style={{ marginTop: 10 }}>La théorie. Version courte. Promis.</div>
        </div>
      </section>

      {/* 2.1 Définition + du réel à la table */}
      <section>
        <Planche ep="Ép. 2" titre="Du réel à la table">
          <div className="row" style={{ marginBottom: 16 }}>
            <Bulle qui="remi" humeur="neutre" size={54} className="col">C’est un très gros Excel, c’est ça ?</Bulle>
            <Bulle qui="delos" humeur="content" size={54} droite className="col fragment">Ce sont des informations sur une <b>chose</b> (l’entité) et ses <b>caractéristiques</b> (les attributs), rangées pour être retrouvées, comptées et mises à jour. Prenons ta liste de courses.</Bulle>
          </div>
          <div className="row fragment" style={{ alignItems: 'center' }}>
            <Case recit="Voici des données" className="col">
              <div style={{ fontFamily: '"Comic Neue", cursive', fontSize: 19, lineHeight: 1.6 }}>
                <p>☐ Pain</p><p>☑ <s>Lait</s> ×2</p><p>☐ Café ×3 (URGENT)</p><p>☑ <s>Fromage</s></p>
              </div>
              <p className="tiny muted">la liste de courses de Rémi</p>
            </Case>
            <span style={{ fontSize: 34 }}>➜</span>
            <Case recit="L’entité : quoi ?" ton="blue" className="col center">
              <p style={{ fontFamily: '"IBM Plex Serif", serif', fontSize: 30, fontWeight: 700, color: 'var(--blue)' }}>ARTICLE</p>
              <p className="small muted" style={{ margin: '6px 0' }}>ses attributs :</p>
              <p><code>id</code> <code>nom</code> <code>quantite</code> <code>achete</code></p>
            </Case>
            <span style={{ fontSize: 34 }}>➜</span>
            <Case recit="La table : articles" ton="good" style={{ flex: 1.2 }}>
              <Mini cols={['id', 'nom', 'quantite', 'achete']} rows={[[1, 'pain', 1, 'non'], [2, 'lait', 2, 'oui'], [3, 'café', 3, 'non'], [4, 'fromage', 1, 'oui']]} />
            </Case>
          </div>
          <div className="row fragment" style={{ marginTop: 18, alignItems: 'center' }}>
            <Bulle qui="remi" humeur="surpris" size={50} className="col">Et le « (URGENT) », il va où ?</Bulle>
            <Bulle qui="delos" humeur="content" size={50} droite className="col">Dans une colonne <b>priorite</b>. Pas dans la case du nom. On en reparlera.</Bulle>
          </div>
        </Planche>
      </section>

      {/* 2.2 Vocabulaire + test de la phrase */}
      <section>
        <Planche ep="Ép. 2" titre="Le vocabulaire, appliqué aux librairies">
          <div className="row">
            <div style={{ flex: 1.5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                <span style={{ color: 'var(--blue)' }}>↓ identifiant (clé primaire)</span>
                <span style={{ color: 'var(--green-dark)' }}>↓ champs = attributs = colonnes</span>
              </div>
              <Mini
                cols={['id', 'librairie', 'assortiment', 'label', 'code_commune']}
                rows={[
                  [{ v: 'LIB003', c: 'hl-good' }, 'LES MOTS ET LES CHOSES', 'Généraliste', 'LIR', '92012'],
                  ['LIB008', 'CHANTELIVRE', 'Généraliste', 'aucun', '92040'],
                  ['LIB016', 'LE CHEVAL-VAPEUR', 'Généraliste', 'aucun', '92075'],
                ]}
              />
              <p className="small" style={{ marginTop: 6 }}>← une ligne = un <b>enregistrement</b> · une case = une <b>valeur</b> · le tout = la <b>table</b> <code>librairies</code></p>
              <Case recit="🧪 Le test de la phrase" ton="good" className="fragment" style={{ marginTop: 22 }}>
                <p style={{ fontFamily: '"Comic Neue", cursive', fontWeight: 700, fontSize: 19 }}>« La librairie LIB003, Les Mots et les Choses, généraliste, labellisée LIR, est à Boulogne-Billancourt (92012). »</p>
                <p className="small" style={{ marginTop: 6 }}>Si la ligne se lit en une phrase claire, la table est bien construite.</p>
              </Case>
            </div>
            <div className="col stack">
              <Bulle qui="remi" humeur="neutre" size={50}>Pourquoi un id ? Le nom suffit, non ?</Bulle>
              <Bulle qui="delos" humeur="surpris" size={50} className="fragment">On en reparle quand j’aurai vu ton fichier.</Bulle>
              <Bulle qui="remi" humeur="stress" size={50} className="fragment">…Quel fichier ?</Bulle>
              <Narrateur className="fragment" style={{ fontSize: 17 }}>
                L’identifiant est unique, stable et sans signification : LIB013, jamais « Anagramme-Meudon ».
              </Narrateur>
            </div>
          </div>
        </Planche>
      </section>

      {/* 2.3 La chose à retenir : deux logiques */}
      <section>
        <Planche ep="Ép. 2" titre="La chose à retenir : j’écris ≠ je fais la synthèse">
          <div className="row" style={{ marginBottom: 14 }}>
            <Bulle qui="remi" humeur="neutre" size={50} className="col">Écrire, faire la synthèse… c’est pas la même chose ?</Bulle>
            <Bulle qui="delos" humeur="content" size={50} droite className="col fragment">Ton relevé de compte, c’est « j’écris ». Ton bilan du mois, c’est « je fais la synthèse ». Personne ne tape son bilan à la main. Enfin… presque personne.</Bulle>
          </div>
          <Case className="fragment">
            <table className="logiques">
              <thead><tr><th /><th style={{ color: 'var(--blue)' }}>✍️ J’écris</th><th style={{ color: 'var(--green-dark)' }}>📊 Je fais la synthèse</th></tr></thead>
              <tbody>
                <tr><td>Principe</td><td>1 fait = 1 ligne, brute</td><td>une vue consolidée, calculée</td></tr>
                <tr><td>Rythme</td><td>au fil de l’eau</td><td>à la demande</td></tr>
                <tr><td>Objectif</td><td>ne rien perdre</td><td>comprendre et piloter</td></tr>
                <tr><td>Pour qui ?</td><td>la machine : pas de couleur, pas de total</td><td>l’œil : couleurs, totaux, graphiques</td></tr>
              </tbody>
            </table>
          </Case>
          <div className="fragment" style={{ marginTop: 18, textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'var(--ink)', color: '#fff', borderRadius: 8, padding: '12px 24px', fontFamily: '"IBM Plex Serif", serif', fontSize: 24, boxShadow: '6px 6px 0 var(--yellow)' }}>
              Soignez l’écriture, la synthèse suit toute seule.
            </div>
          </div>
          <p className="tiny muted fragment" style={{ marginTop: 10 }}>Pour les curieux, les vrais noms : OLTP (écriture) et OLAP (analyse).</p>
        </Planche>
      </section>

      {/* 2.4 Le cadrage */}
      <section>
        <Planche ep="Ép. 2" titre="Avant la première colonne : 3 questions">
          <div className="row" style={{ marginBottom: 16 }}>
            <Bulle qui="remi" humeur="stress" size={50} className="col">Mais on ne m’a posé aucune question précise !</Bulle>
            <Bulle qui="delos" humeur="content" size={50} droite className="col fragment">Raison de plus. Une base propre répond aussi aux questions qu’on ne t’a pas encore posées. Pose-toi juste ces trois-là.</Bulle>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <Case recit="① J’enregistre quoi ?" ton="blue" className="fragment">
              <p>Une <b>librairie</b>. Une ligne par librairie.</p>
              <p className="small muted" style={{ marginTop: 6 }}>→ <code>id</code>, <code>librairie</code></p>
            </Case>
            <Case recit="② Pour quel usage ?" ton="good" className="fragment">
              <p>Un suivi annuel. On voudra sûrement savoir <b>combien, où, lesquelles</b>.</p>
              <p className="small muted" style={{ marginTop: 6 }}>→ <code>code_commune</code>, <code>label</code>, <code>assortiment</code>, <code>annee_suivi</code></p>
            </Case>
            <Case recit="③ Je l’ai déjà ailleurs ?" className="fragment">
              <p>Le nom des communes, leur population ? Les collègues les tiennent déjà.</p>
              <p className="small muted" style={{ marginTop: 6 }}>→ on ne les recopie pas : <b>jointure</b></p>
            </Case>
          </div>
          <Narrateur className="fragment" style={{ marginTop: 18 }}>
            Une colonne qui ne répond à aucune question est inutile. Une question sans colonne est impossible.
          </Narrateur>
        </Planche>
      </section>
    </>
  );
}
