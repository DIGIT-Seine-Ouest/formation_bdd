// ─── Épisode 5 : et si ça servait à tout le monde ? Rémi appelle la DIGIT ─────────────────────
// Le coup de fil → nos réalisations → la chaîne : du poste de Rémi au national.
import { Bulle, Case, Chapitre, Narrateur, Planche } from '../components/BD';
import { Vitrine } from '../components/Vitrine';
import { SOURCE_URL } from '../remi';

const CHAINE = [
  ['🧑‍💻', 'Le poste de Rémi', '17 librairies de GPSO, mises à jour chaque année', 'blue'],
  ['🏛️', 'Le portail local', 'Un annuaire pour les habitants, un tableau de bord pour les élus', 'good'],
  ['🇫🇷', 'La base nationale', 'Le ministère de la Culture agrège les fichiers de ses partenaires : 3 237 librairies', ''],
  ['🌍', 'Tout le monde', 'Chercheurs, applis, presse, autres collectivités… et Rémi lui-même', 'good'],
];

export function Ep5Valoriser() {
  return (
    <>
      <Chapitre fond="#4c2a85" ep="Épisode 5" titre="Rémi appelle la DIGIT" sous="Le fichier marche. Et s’il servait à tout le monde ?" promesse="🚀 Faciliter l’exploitation" />

      <section>
        <Planche ep="Ép. 5" titre="Le coup de fil">
          <div className="row" style={{ alignItems: 'flex-start' }}>
            <div className="col stack">
              <Case>
                <Bulle qui="remi" humeur="content">Allô la DIGIT ? J’ai un fichier sur les librairies. Ça peut servir à d’autres ?</Bulle>
              </Case>
              <Case className="fragment">
                <Bulle qui="digit" humeur="neutre" droite>Il est comment, ton fichier ? Une ligne par librairie ? Des codes INSEE ? Un dictionnaire ?</Bulle>
              </Case>
              <Case className="fragment">
                <Bulle qui="remi" humeur="content">Oui, oui et oui. Delos m’a un peu aidé.</Bulle>
              </Case>
              <Case className="fragment">
                <Bulle qui="digit" humeur="content" droite>Alors on le branche sur le portail. Un <u>annuaire</u> pour les habitants, un <u>tableau de bord</u> pour les élus. Sans rien ressaisir.</Bulle>
              </Case>
            </div>
            <div style={{ width: 300 }}>
              <Narrateur className="fragment">
                C’est là que tout se joue. Un aide-mémoire, il faut le refaire avant de le publier. Une base de données, on la branche telle quelle.
              </Narrateur>
            </div>
          </div>
        </Planche>
      </section>

      <section>
        <Planche ep="Ép. 5" titre="Ce qu’on a déjà fait avec les villes">
          <Vitrine />
        </Planche>
      </section>

      <section>
        <Planche ep="Épilogue" titre="Du poste de Rémi… à la base nationale">
          <div className="chaine">
            {CHAINE.map(([e, lieu, txt, ton]) => (
              <div className="maillon fragment" key={lieu}>
                <Case ton={ton}>
                  <p style={{ fontSize: 40 }}>{e}</p>
                  <p className="lieu">{lieu}</p>
                  <p className="small" style={{ marginTop: 6 }}>{txt}</p>
                </Case>
              </div>
            ))}
          </div>
          <div className="row fragment" style={{ marginTop: 24, alignItems: 'center' }}>
            <Narrateur className="col">
              Ce n’est pas une utopie : c’est exactement comme ça que la base nationale des librairies est construite. Et pour y ajouter une librairie, le ministère demande… son SIRET, son nom, sa spécialité. Une ligne, des attributs.
            </Narrateur>
            <a className="btn" href={SOURCE_URL} target="_blank" rel="noreferrer" style={{ flexShrink: 0 }}>La base sur data.gouv.fr ↗</a>
          </div>
        </Planche>
      </section>
    </>
  );
}
