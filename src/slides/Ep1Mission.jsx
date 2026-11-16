// ─── Épisode 1 : on missionne Rémi (sans question : « une base, pour un suivi ») ──
import { Bulle, Chapitre, Narrateur } from '../components/BD';
import { Bureau } from '../components/Bureau';

export function Ep1Mission() {
  return (
    <>
      <Chapitre fond="#009fe3" ep="Épisode 1" titre="On missionne Rémi" sous="Lundi, 9 h 02. Un mail arrive." />

      <section>
        <Bureau
          humeur="surpris"
          bulle={<Bulle qui="remi" humeur="surpris" size={58}>Une base de données… C’est quoi, exactement, une base de données ?</Bulle>}
          ecran={(
            <div className="mail">
              <div className="entete">De : <b>Direction de la Culture</b> · Objet : <b>Librairies du territoire</b></div>
              <p>Bonjour Rémi,</p>
              <p style={{ marginTop: 6 }}>Pourrais-tu nous constituer une <b>base de données des librairies</b> du territoire ? C’est pour un <b>suivi en interne</b>, mis à jour chaque année.</p>
              <p style={{ marginTop: 6 }}>On ne sait pas encore exactement ce qu’on en fera. Mais ce sera utile, c’est sûr.</p>
              <p style={{ marginTop: 6 }}>Merci ! 🙂</p>
            </div>
          )}
        />
        <div className="row" style={{ marginTop: 14 }}>
          <Narrateur className="col fragment" style={{ fontSize: 18 }}>
            Aucune question précise, juste « une base ». Rémi a pourtant déjà fait quelque chose : vendredi, à 17 h 45, « vite fait ». On y reviendra.
          </Narrateur>
          <Narrateur className="col fragment" style={{ fontSize: 18 }}>
            En attendant, il fait ce que fait tout le monde en 2026 : il demande à Delos.
          </Narrateur>
        </div>
      </section>
    </>
  );
}
