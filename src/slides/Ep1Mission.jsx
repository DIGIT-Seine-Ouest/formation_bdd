// ─── Épisode 1 : la mission. Rémi constitue sa base… en pensant « humain ». ──
import { Bulle, Case, Chapitre, Narrateur, Planche } from '../components/BD';
import { ExcelVue } from '../components/Fichiers';

export const KPI = [
  ['📍', 'Combien de librairies, par commune ?'],
  ['🏅', 'Combien sont labellisées par le ministère ?'],
  ['📚', 'Quelles spécialités (généraliste, BD, jeunesse…) ?'],
  ['🔄', 'Combien ont ouvert ou fermé dans l’année ?'],
  ['🗺️', 'Une carte pour le rapport annuel.'],
];

export function Ep1Mission() {
  return (
    <>
      <Chapitre fond="#009fe3" ep="Épisode 1" titre="La mission" sous="« Rémi, tu peux suivre les librairies du territoire ? »" />

      {/* Planche 1 : le mail + les KPI annuels */}
      <section>
        <Planche ep="Ép. 1" titre="Lundi, 9 h : la commande">
          <div className="row">
            <Case recit="📧 Le mail de la direction" style={{ flex: 1.25 }}>
              <p className="small muted">Objet : <b style={{ color: 'var(--ink)' }}>Étude annuelle — librairies indépendantes</b></p>
              <p style={{ margin: '10px 0 8px', fontSize: 18 }}>Rémi, chaque année au moment du budget, les élus veulent savoir :</p>
              <div className="stack" style={{ fontSize: 18 }}>
                {KPI.map(([e, q]) => (
                  <p key={q} className="fragment"><span style={{ marginRight: 8 }}>{e}</span>{q}</p>
                ))}
              </div>
            </Case>
            <div className="col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
              <Case>
                <Bulle qui="remi" humeur="content">Facile. J’ouvre Excel et je fais un joli tableau.</Bulle>
              </Case>
              <Narrateur className="fragment">
                Retenez ces 5 questions. Elles reviennent <u>chaque année</u>, et ce sont elles qui vont décider de la forme du fichier.
              </Narrateur>
            </div>
          </div>
        </Planche>
      </section>

      {/* Planche 2 : Rémi constitue sa base, en pensant humain */}
      <section>
        <Planche ep="Ép. 1" titre="Rémi constitue sa base">
          <div className="row">
            <div style={{ flex: 1.55 }}><ExcelVue /></div>
            <div className="col stack">
              <Case recit="Rémi soigne la présentation">
                <div className="stack small">
                  <p className="fragment">📌 Un <b>titre</b>, pour savoir de quoi on parle</p>
                  <p className="fragment">🧩 Les villes <b>regroupées</b>, pour aérer</p>
                  <p className="fragment">🟩 Du <b>vert</b> pour repérer les labellisées</p>
                  <p className="fragment">➕ Un <b>total</b> en bas</p>
                </div>
              </Case>
              <Narrateur className="fragment">
                Rien d’absurde : c’est propre et lisible. C’est un tableau pensé pour des <u>yeux humains</u>.
              </Narrateur>
            </div>
          </div>
        </Planche>
      </section>
    </>
  );
}
