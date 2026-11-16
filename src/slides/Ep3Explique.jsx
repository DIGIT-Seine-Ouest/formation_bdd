// ─── Épisode 3 : Rémi explique sa base (il a compris… en théorie) ──────────
import { Bulle, Chapitre, Narrateur } from '../components/BD';
import { Perso } from '../components/Personnages';

const ATTRIBUTS = [
  ['🔑 id', 'LIB001, LIB002… (clé primaire)', true],
  ['librairie', 'texte'],
  ['assortiment', 'liste : Généraliste, BD et Mangas…'],
  ['label', 'liste : aucun · LIR · LR'],
  ['code_commune', 'code INSEE, en texte'],
  ['annee_suivi', 'nombre : 2026'],
];

export function Ep3Explique() {
  return (
    <>
      <Chapitre fond="#0f4c75" ep="Épisode 3" titre="Rémi explique" sous="Rémi a tout compris. Il tient à le faire savoir." />

      <section>
        <div className="row" style={{ alignItems: 'flex-end' }}>
          <div style={{ width: 230, textAlign: 'center' }}>
            <Perso qui="remi" humeur="content" size={230} nu />
          </div>
          <div className="col">
            <div className="tableau-blanc">
              <div className="row" style={{ alignItems: 'flex-start' }}>
                <div className="entite" style={{ width: 420 }}>
                  <div className="nom">LIBRAIRIE</div>
                  {ATTRIBUTS.map(([a, t, pk]) => (
                    <div key={a} className="att fragment"><span className={pk ? 'pk' : ''}>{a}</span><span>{t}</span></div>
                  ))}
                </div>
                <div className="col marqueur stack" style={{ fontSize: 20 }}>
                  <p className="fragment">→ 1 librairie = <u>1 ligne</u></p>
                  <p className="fragment">→ 1 attribut = <u>1 colonne</u></p>
                  <p className="fragment">→ 1 case = <u>1 valeur</u></p>
                  <p className="fragment">→ l’an prochain : <u>des lignes en plus</u>, pas un onglet</p>
                </div>
              </div>
              <p className="marqueur fragment" style={{ marginTop: 16, fontSize: 18 }}>
                Test : « La librairie LIB013, Anagramme, généraliste, sans label, est à Meudon (92048), relevé 2026. » ✔
              </p>
            </div>
          </div>
        </div>
        <div className="row fragment" style={{ marginTop: 18, alignItems: 'center' }}>
          <Bulle qui="delos" humeur="content" size={52} className="col">Parfait. Et le fichier que tu as fait vendredi, il ressemble à ça ?</Bulle>
          <Bulle qui="remi" humeur="stress" size={52} droite className="col">Euh… à peu près. Tu veux le voir ?</Bulle>
        </div>
        <Narrateur className="fragment" style={{ marginTop: 12, fontSize: 18 }}>Spoiler : non, il ne ressemble pas à ça.</Narrateur>
      </section>
    </>
  );
}
