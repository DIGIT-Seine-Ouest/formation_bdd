// ─── Épisode 2 : « Delos, c’est quoi une base de données ? » → BIM ─────────
// 1. Du réel à la table : la liste de courses devient la table ARTICLE.
// 2. Rebond : l’entité LIBRAIRIE, construite élément par élément (entité,
//    attributs, enregistrement, valeur, identifiant).
// 3. La jointure : la population n’est pas dans la table de Rémi, elle est dans
//    COMMUNE (la table des collègues) ; le code commune relie les deux.
// 4. Une info, une seule fois : ce qu’on évite (tout recopier), clé primaire,
//    clé étrangère, relation 1 à N. Puis : on construit tout ça dans Excel (Ép. 3).
// « J’enregistre ≠ je présente » vient plus tard (Ép. 3, partie « je présente »),
// quand Rémi en a besoin ; ici, Delos ne fait que l’annoncer.
import { Bulle, Case, Mini, Narrateur, Planche } from '../components/BD';
import { COMMUNES, LIBRAIRIES, nomCommune } from '../remi';

// La table LIBRAIRIE, construite élément par élément (index de fragment = ordre des clics)
const COLS = ['librairie', 'assortiment', 'label', 'commune'];
const LIGNES = [
  ['LIB002', 'LES CURIEUX', 'Religion', 'aucun', 'Boulogne-Billancourt'],
  ['LIB003', 'LES MOTS ET LES CHOSES', 'Généraliste', 'LIR', 'Boulogne-Billancourt'],
  ['LIB004', 'LES MOTS ET LES CHOSES NORD', 'Généraliste', 'aucun', 'Boulogne-Billancourt'],
];
const ELEMENTS = [
  [1, 'Entité', 'la chose qu’on décrit → une table (un onglet)', 'courses : ARTICLE'],
  [2, 'Attribut (champ)', 'une caractéristique → une colonne. Ici, tirées des 4 objectifs du mail', 'courses : nom, quantite'],
  [3, 'Enregistrement', 'une chose → une ligne : une librairie', 'courses : « café, ×3 »'],
  [4, 'Valeur', 'le contenu d’une case : une seule information', 'courses : 3'],
  [5, 'Identifiant (clé)', 'la colonne qui distingue chaque ligne : unique, stable', 'courses : id = 3'],
];
const F = (i) => ({ className: 'fragment', 'data-fragment-index': i });

// La jointure : 4 librairies de 3 communes, et la table COMMUNE des collègues
const JOINT_LIBS = ['LIB002', 'LIB003', 'LIB007', 'LIB008'].map((id) => LIBRAIRIES.find((l) => l[0] === id));
const JOINT_COMMUNES = COMMUNES.filter(([code]) => ['92012', '92022', '92040'].includes(code));
const POP = (code) => COMMUNES.find((c) => c[0] === code)[2].toLocaleString('fr-FR');
const BOULOGNE = LIBRAIRIES.filter((l) => l[4] === '92012');

export function Ep2Theorie() {
  return (
    <>
      <section data-background-color="#009a93">
        <div className="chapitre">
          <div className="ep">Épisode 2</div>
          <div className="titre" style={{ fontSize: 64 }}>« Delos, c’est quoi<br />une base de données ? »</div>
          <div className="bim fragment">BIM !</div>
          <div className="sous fragment" style={{ marginTop: 10 }}>La théorie. Deux slides. Promis. (Il y en aura quatre.)</div>
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
                <b>Le test de la phrase</b> : « <b>Les Mots et les Choses</b> est une librairie <b>généraliste</b> de <b>Boulogne-Billancourt</b>, labellisée <b>LIR</b> ; son identifiant est <b>LIB003</b>. » Si chaque ligne se lit comme une phrase claire, la table est bien construite.
              </Narrateur>
            </div>
            <div {...F(7)} className="fragment col">
              <Bulle qui="delos" humeur="content" size={44} droite>Il manque la <b>population</b>, pour les 10 000 habitants. Elle n’est pas dans ta table… et elle n’a pas à y être.</Bulle>
            </div>
          </div>
        </Planche>
      </section>

      {/* 3. La jointure : retrouver l’info là où elle est */}
      <section>
        <Planche ep="Ép. 2" titre="La jointure : retrouver l’info là où elle est">
          <div className="row" style={{ marginBottom: 14 }}>
            <Bulle qui="remi" humeur="surpris" size={46} className="col">Tu avais dit deux slides ! Et la population, je la mets où ?</Bulle>
            <Bulle qui="delos" humeur="content" size={46} droite className="col fragment">La population appartient à une autre chose : la <b>commune</b>. Elle a sa propre table, tenue à jour par les collègues. Toi, tu notes juste le <b>code commune</b>… et tu vas chercher le reste.</Bulle>
          </div>
          <div className="row fragment" style={{ alignItems: 'center' }}>
            <Case recit="📚 LIBRAIRIE · ta table" ton="blue" className="col">
              <Mini cols={['id', 'librairie', 'code_commune']} rows={JOINT_LIBS.map(([id, nom, , , code]) => [id, nom, { v: code, c: 'hl-cle' }])} />
            </Case>
            <div className="center" style={{ width: 90, flexShrink: 0 }}>
              <p style={{ fontSize: 34, lineHeight: 1 }}>⟷</p>
              <p className="tiny" style={{ fontWeight: 700 }}>même code<br />= même commune</p>
            </div>
            <Case recit="🏛️ COMMUNE · la table des collègues" className="col">
              <Mini cols={['code_commune 🔑', 'commune', 'population']} rows={JOINT_COMMUNES.map(([code, nom, pop]) => [{ v: code, c: 'hl-cle' }, nom, pop.toLocaleString('fr-FR')])} />
            </Case>
          </div>
          <div className="fragment" style={{ marginTop: 18 }}>
            <Case recit="🔗 La jointure assemble les deux, à la demande" ton="good">
              <Mini cols={['id', 'librairie', 'code_commune', 'commune', 'population']}
                rows={[['LIB003', 'LES MOTS ET LES CHOSES', { v: '92012', c: 'hl-cle' }, { v: nomCommune('92012'), c: 'hl-good' }, { v: POP('92012'), c: 'hl-good' }]]} />
              <p className="small" style={{ marginTop: 8 }}>Les cases en vert ne sont <b>tapées nulle part</b> dans ta table : elles sont <b>récupérées</b> dans COMMUNE grâce au code.</p>
            </Case>
          </div>
        </Planche>
      </section>

      {/* 4. Une info, une seule fois */}
      <section>
        <Planche ep="Ép. 2" titre="Une info, une seule fois">
          <div className="row" style={{ marginBottom: 14 }}>
            <Bulle qui="remi" humeur="neutre" size={46} className="col">Ce serait plus simple de tout mettre dans une seule table, non ?</Bulle>
            <Bulle qui="delos" humeur="content" size={46} droite className="col fragment">Plus simple à écrire, plus dur à tenir. Au prochain recensement, la population change : regarde ce qu’il faut corriger.</Bulle>
          </div>
          <div className="row fragment" style={{ alignItems: 'stretch' }}>
            <Case recit="Tout recopier : ce qu’on évite" ton="bad" className="col">
              <Mini cols={['librairie', 'commune', 'population']}
                rows={BOULOGNE.map(([, nom]) => [nom, 'Boulogne-Billancourt', { v: POP('92012'), c: 'hl-bad' }])} />
              <p className="small" style={{ marginTop: 8 }}>La même population écrite <b>{BOULOGNE.length} fois</b> pour Boulogne : {BOULOGNE.length} cases à corriger, et le jour où l’on en oublie une, deux chiffres se contredisent.</p>
            </Case>
            <Case recit="Une seule fois, puis la jointure" ton="good" className="col">
              <Mini cols={['code_commune 🔑', 'commune', 'population']} rows={[[{ v: '92012', c: 'hl-cle' }, 'Boulogne-Billancourt', { v: POP('92012'), c: 'hl-good' }]]} />
              <p className="small" style={{ marginTop: 8 }}>La population est écrite <b>une seule fois</b>, chez ceux qui en sont responsables. On corrige une case : les {BOULOGNE.length} librairies suivent.</p>
            </Case>
          </div>
          <div className="row fragment" style={{ marginTop: 16, alignItems: 'center' }}>
            <div className="col stack" style={{ fontSize: 15.5, gap: 4 }}>
              <p>🔑 <b>Clé primaire</b> : identifie chaque ligne <i>de sa table</i> (<code>id</code> pour LIBRAIRIE, <code>code_commune</code> pour COMMUNE).</p>
              <p>🔗 <b>Clé étrangère</b> : la clé d’une <i>autre</i> table, rangée dans la tienne (<code>code_commune</code> dans LIBRAIRIE).</p>
              <p>1 → N : <b>une</b> commune, <b>plusieurs</b> librairies.</p>
            </div>
            <div className="col">
              <Bulle qui="delos" humeur="content" size={44} droite>Dans Excel, la jointure s’appelle <b>RECHERCHEV</b> : on la fera à l’étape 7. Allez, on construit tout ça, étape par étape.</Bulle>
            </div>
          </div>
        </Planche>
      </section>
    </>
  );
}
