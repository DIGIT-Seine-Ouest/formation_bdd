// ─── Épisode 4 : usage interne — le tableau de bord (gagner du temps) ───────
// Claire revient → réponse immédiate (simulateur) → les gestes Excel de Rémi.
import { Bulle, Case, Chapitre, Narrateur, Planche } from '../components/BD';
import { DONNEE } from '../components/Fichiers';
import { Simulateur } from '../components/Simulateur';

// Mini tableau croisé dynamique calculé à partir de la base de Rémi
function MiniTCD() {
  const communes = [...new Set(DONNEE.map((r) => r[4]))];
  const n = (c, lab) => DONNEE.filter((r) => r[4] === c && (lab ? r[3] !== 'aucun' : r[3] === 'aucun')).length;
  return (
    <table className="mini" style={{ fontSize: 13.5 }}>
      <thead><tr><th>commune</th><th>labellisées</th><th>autres</th><th>total</th></tr></thead>
      <tbody>
        {communes.map((c) => (
          <tr key={c}><td>{c}</td><td>{n(c, true) || ''}</td><td>{n(c, false) || ''}</td><td><b>{n(c, true) + n(c, false)}</b></td></tr>
        ))}
        <tr><td><b>Total</b></td><td><b>{DONNEE.filter((r) => r[3] !== 'aucun').length}</b></td><td><b>{DONNEE.filter((r) => r[3] === 'aucun').length}</b></td><td><b>{DONNEE.length}</b></td></tr>
      </tbody>
    </table>
  );
}

const GESTES = [
  ['Ctrl', 'T', 'Mettre sous forme de tableau', 'Filtres automatiques, et les formules suivent les nouvelles lignes.'],
  ['Données', 'Validation', 'Créer une liste déroulante', 'Tout le monde écrit « BD et Mangas » de la même façon (astuce 4).'],
  ['Insertion', 'TCD', 'Tableau croisé dynamique', 'Les 5 questions de la mission en 3 clics, sans formule.'],
  ['Accueil', 'MFC', 'Mise en forme conditionnelle', 'La couleur revient… mais c’est la colonne label qui la commande.'],
];

export function Ep4Interne() {
  return (
    <>
      <Chapitre fond="#95c11f" ep="Épisode 4" titre="Le tableau de bord" sous="Usage interne : répondre aux questions qui reviennent." promesse="⏱ Gagner du temps" />

      <section>
        <div className="row" style={{ marginBottom: 12, alignItems: 'center' }}>
          <Bulle qui="claire" humeur="stress" size={52} className="col">Rémi, les chiffres pour le rapport annuel ?</Bulle>
          <Bulle qui="remi" humeur="content" size={52} droite className="col fragment">C’est déjà calculé. Regarde.</Bulle>
        </div>
        <Simulateur />
      </section>

      <section>
        <Planche ep="Ép. 4" titre="Les 4 gestes Excel de Rémi">
          <div className="row">
            <div className="geste" style={{ flex: 1.5 }}>
              {GESTES.map(([a, b, t, d]) => (
                <Case key={t} recit={t} className="fragment">
                  <p style={{ marginBottom: 6 }}><span className="raccourci">{a}</span> › <span className="raccourci">{b}</span></p>
                  <p className="small">{d}</p>
                </Case>
              ))}
            </div>
            <div className="col stack">
              <Case recit="Le TCD de Rémi (Insertion › TCD)" ton="good">
                <MiniTCD />
              </Case>
              <Narrateur className="fragment" style={{ fontSize: 17 }}>
                La couleur est revenue. La différence : cette fois, c’est la donnée qui la commande.
              </Narrateur>
            </div>
          </div>
        </Planche>
      </section>
    </>
  );
}
