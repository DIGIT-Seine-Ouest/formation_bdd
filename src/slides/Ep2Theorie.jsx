// ─── Épisode 2 : « Delos, c’est quoi une base de données ? » → BIM, 2 slides ──
// Cheat sheet mobilité : §1 définition + du réel à la table + vocabulaire,
// la chose à retenir (j’écris ≠ je fais la synthèse).
import { Bulle, Case, Mini, Planche } from '../components/BD';

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
            <Bulle qui="delos" humeur="content" size={54} droite className="col fragment">Ce sont des informations sur une <b>chose</b> (l’entité) et ses <b>caractéristiques</b> (les attributs), rangées pour être retrouvées, comptées, mises à jour. Prenons ta liste de courses.</Bulle>
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
          <div className="row fragment" style={{ marginTop: 18 }}>
            <Case recit="Le vocabulaire" className="col">
              <p style={{ fontSize: 17 }}>une ligne = un <b>enregistrement</b> · une colonne = un <b>attribut</b> (ou champ) · une case = une <b>valeur</b> · la colonne qui identifie chaque ligne = l’<b>identifiant</b> (clé)</p>
            </Case>
            <Bulle qui="delos" humeur="content" size={50} droite className="col">Pour toi : entité <b>LIBRAIRIE</b>. On la construit ensemble, étape par étape.</Bulle>
          </div>
        </Planche>
      </section>

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
                <tr><td>Pour qui ?</td><td>la machine : pas de couleur, pas de total</td><td>l’œil : couleurs, totaux, graphiques</td></tr>
                <tr><td>Chez Rémi</td><td>l’onglet <code>saisie</code></td><td>l’onglet <code>synthese</code></td></tr>
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
    </>
  );
}
