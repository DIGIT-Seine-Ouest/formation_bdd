// ─── Épisode 2 : « Delos, c’est quoi une base de données ? » → BIM, 2 slides ──
// 1. Du réel à la table : la liste de courses devient la table ARTICLE.
// 2. Rebond : l’entité LIBRAIRIE, construite élément par élément (entité,
//    attributs, enregistrement, valeur, identifiant) : la suite directe, c’est le tuto.
// « J’enregistre ≠ je présente » vient plus tard (Ép. 3, partie « je présente »),
// quand Rémi en a besoin ; ici, Delos ne fait que l’annoncer.
import { Bulle, Case, Mini, Narrateur, Planche } from '../components/BD';

// La table LIBRAIRIE, construite élément par élément (index de fragment = ordre des clics)
const COLS = ['librairie', 'assortiment', 'label', 'commune'];
const LIGNES = [
  ['LIB001', 'LE COMPTOIR DE LA BD', 'BD et Mangas', 'aucun', 'Boulogne-Billancourt'],
  ['LIB002', 'LES CURIEUX', 'Religion', 'aucun', 'Boulogne-Billancourt'],
  ['LIB003', 'LES MOTS ET LES CHOSES', 'Généraliste', 'LIR', 'Boulogne-Billancourt'],
];
const ELEMENTS = [
  [1, 'Entité', 'la chose qu’on décrit → une table (un onglet)', 'courses : ARTICLE'],
  [2, 'Attribut (champ)', 'une caractéristique → une colonne. Ici, tirées des 4 objectifs du mail', 'courses : nom, quantite'],
  [3, 'Enregistrement', 'une chose → une ligne : une librairie', 'courses : « café, ×3 »'],
  [4, 'Valeur', 'le contenu d’une case : une seule information', 'courses : 3'],
  [5, 'Identifiant (clé)', 'la colonne qui distingue chaque ligne : unique, stable', 'courses : id = 3'],
];
const F = (i) => ({ className: 'fragment', 'data-fragment-index': i });

export function Ep2Theorie() {
  return (
    <>
      <section data-background-color="#009a93">
        <div className="chapitre">
          <div className="ep">Épisode 2</div>
          <div className="titre" style={{ fontSize: 64 }}>« Delos, c’est quoi<br />une base de données ? »</div>
          <div className="bim fragment">BIM !</div>
          <div className="sous fragment" style={{ marginTop: 10 }}>La théorie. Deux slides. Promis.</div>
        </div>
      </section>

      <section>
        <Planche ep="Ép. 2" titre="Du réel à la table">
          <div className="row" style={{ marginBottom: 16 }}>
            <Bulle qui="remi" humeur="neutre" size={54} className="col">C’est un très gros Excel, c’est ça ?</Bulle>
            <Bulle qui="delos" humeur="content" size={54} droite className="col fragment">Ce sont des informations sur une <b>chose</b> et ses <b>caractéristiques</b>, rangées pour être retrouvées, comptées, mises à jour. Prenons ta liste de courses.</Bulle>
          </div>
          <div className="row fragment" style={{ alignItems: 'center' }}>
            <Case recit="Voici des données" className="col">
              <div style={{ fontFamily: '"Comic Neue", cursive', fontSize: 21, lineHeight: 1.6 }}>
                <p>☐ Pain</p><p>☑ <s>Lait</s> ×2</p><p>☐ Café ×3 (URGENT)</p><p>☑ <s>Fromage</s></p>
              </div>
              <p className="tiny muted">la liste de courses de Rémi</p>
            </Case>
            <span style={{ fontSize: 34 }}>➜</span>
            <Case recit="La chose : quoi ?" ton="blue" className="col center">
              <p style={{ fontFamily: '"IBM Plex Serif", serif', fontSize: 30, fontWeight: 700, color: 'var(--blue)' }}>ARTICLE</p>
              <p className="small muted" style={{ margin: '6px 0' }}>ses caractéristiques :</p>
              <p><code>id</code> <code>nom</code> <code>quantite</code> <code>achete</code></p>
            </Case>
            <span style={{ fontSize: 34 }}>➜</span>
            <Case recit="La table : articles" ton="good" style={{ flex: 1.2 }}>
              <Mini cols={['id', 'nom', 'quantite', 'achete']} rows={[[1, 'pain', 1, 'non'], [2, 'lait', 2, 'oui'], [3, 'café', 3, 'non'], [4, 'fromage', 1, 'oui']]} />
            </Case>
          </div>
          <Narrateur className="fragment" style={{ marginTop: 18, fontSize: 18 }}>
            Le « URGENT » a disparu ? Non : il n’avait pas sa colonne. Une table ne garde que ce qu’on a prévu de ranger.
          </Narrateur>
        </Planche>
      </section>

      <section>
        <Planche ep="Ép. 2" titre="Ta base, élément par élément : l’entité LIBRAIRIE">
          <div className="row" style={{ marginBottom: 12 }}>
            <Bulle qui="remi" humeur="neutre" size={46} className="col">Et pour mes librairies, ça donne quoi ?</Bulle>
            <div {...F(0)} style={{ flex: 1 }}>
              <Bulle qui="delos" humeur="content" size={46} droite>Même chose que tes courses. On part du concept, et on pose chaque élément, un par un. Cinq mots, pas un de plus.</Bulle>
            </div>
          </div>
          <div className="row" style={{ alignItems: 'flex-start' }}>
            <div style={{ flex: 1.35 }}>
              <div {...F(1)} className="fragment entite-nom">📚 LIBRAIRIE <span>— l’onglet <code>saisie</code></span></div>
              <table className="mini construit">
                <thead>
                  <tr>
                    <th {...F(5)} className="fragment cle">id 🔑</th>
                    {COLS.map((c) => <th key={c} {...F(2)}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {LIGNES.map((l) => (
                    <tr key={l[0]} {...F(3)} className={`fragment ${l[0] === 'LIB003' ? 'ligne-on' : ''}`}>
                      <td {...F(5)} className="fragment cle">{l[0]}</td>
                      {l.slice(1).map((v, j) => (
                        <td key={j} className={l[0] === 'LIB003' && v === 'LIR' ? 'val' : ''}>
                          {v}{l[0] === 'LIB003' && v === 'LIR' && <span {...F(4)} className="fragment pastille">valeur</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p {...F(3)} className="fragment tiny muted" style={{ marginTop: 4 }}>… et 14 autres lignes : une par librairie du territoire.</p>
            </div>
            <div className="col stack" style={{ gap: 7 }}>
              {ELEMENTS.map(([i, mot, def, courses]) => (
                <div key={mot} {...F(i)} className="fragment element">
                  <b>{i}. {mot}</b> : {def}<span>{courses}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="row" style={{ marginTop: 12, alignItems: 'center' }}>
            <div {...F(6)} className="fragment col">
              <Narrateur style={{ fontSize: 16 }}>
                <b>Le test de la phrase</b> : « La librairie <b>LIB003</b>, Les Mots et les Choses, généraliste, labellisée LIR, est à Boulogne-Billancourt. » Une ligne = une phrase : la table est bien construite.
              </Narrateur>
            </div>
            <div {...F(7)} className="fragment col">
              <Bulle qui="delos" humeur="content" size={44} droite>Maintenant, on la construit dans Excel, étape par étape. Et le total ? Pas dans la table : on le <b>présentera à part</b>.</Bulle>
            </div>
          </div>
        </Planche>
      </section>
    </>
  );
}
