// ─── Épisode 1 : on missionne Rémi, avec de vrais objectifs ────────────────
import { Bulle, Chapitre, Narrateur } from '../components/BD';
import { Bureau } from '../components/Bureau';

export const OBJECTIFS = [
  'combien de librairies dans chaque commune ;',
  'combien sont labellisées par le ministère ;',
  'quelles spécialités (généraliste, BD…) ;',
  'combien pour 10 000 habitants.',
];

export function Ep1Mission() {
  return (
    <>
      <Chapitre fond="#009fe3" ep="Épisode 1" titre="On missionne Rémi" sous="Lundi, 9 h 02. Un mail arrive." />

      <section>
        <Bureau
          humeur="surpris"
          bulle={<Bulle qui="remi" humeur="surpris" size={58}>Une base de données ? Delos… par où je commence ?</Bulle>}
          ecran={(
            <div className="mail">
              <div className="entete">De : <b>Direction de la Culture</b> · Objet : <b>Suivi des librairies</b></div>
              <p>Bonjour Rémi,</p>
              <p style={{ marginTop: 5 }}>Peux-tu constituer une <b>base de données des librairies</b> du territoire, pour un suivi interne ? <b>Chaque année</b>, on veut savoir :</p>
              {OBJECTIFS.map((o) => <p key={o} style={{ marginTop: 3 }}>• {o}</p>)}
              <p style={{ marginTop: 5 }}>Merci ! 🙂</p>
            </div>
          )}
        />
        <Narrateur className="fragment" style={{ marginTop: 14, fontSize: 18 }}>
          Quatre objectifs, « chaque année ». Delos va guider Rémi étape par étape. Rémi, lui, va poser toutes les questions. Toutes.
        </Narrateur>
      </section>
    </>
  );
}
