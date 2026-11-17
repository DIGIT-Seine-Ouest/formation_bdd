// ─── Épisode 5 : et si ça servait à tout le monde ? Rémi appelle la DIGIT ─────────────────────
// Le coup de fil → nos réalisations → la page pour les usagers (vraie, construite
// sur la base de Rémi) → conclusion : le lignage de la donnée, le cercle vertueux.
import { Annuaire } from '../components/Annuaire';
import { Bulle, Case, Chapitre, Narrateur, Planche } from '../components/BD';
import { Vitrine } from '../components/Vitrine';
import { SOURCE_URL } from '../remi';

const BASE = import.meta.env.BASE_URL;

// Le cercle vertueux : du simple Excel au grand public, et retour
const CERCLE = [
  ['✍️', 'J’enregistre', 'le simple Excel de Rémi : une ligne par librairie'],
  ['📊', 'Je présente', 'synthèse et TCD : le tableau de bord interne'],
  ['🏛️', 'Je publie', 'le portail : l’annuaire pour les habitants'],
  ['🇫🇷', 'On agrège', 'la base nationale du ministère : 3 237 librairies'],
  ['🌍', 'On réutilise', 'habitants, applis, presse, chercheurs, collectivités'],
  ['🔁', 'On améliore', 'un usager signale une ouverture : Rémi ajoute une ligne'],
];
const W = 960, H = 520, CX = W / 2, CY = H / 2, RX = 345, RY = 200;

function Cercle() {
  const pos = CERCLE.map((_, i) => {
    const t = (-90 + i * 60) * (Math.PI / 180);
    return [CX + RX * Math.cos(t), CY + RY * Math.sin(t)];
  });
  const fleches = CERCLE.map((_, i) => {
    const t = (-60 + i * 60) * (Math.PI / 180);
    const x = CX + RX * Math.cos(t), y = CY + RY * Math.sin(t);
    const a = (Math.atan2(RY * Math.cos(t), -RX * Math.sin(t)) * 180) / Math.PI;
    return [x, y, a];
  });
  return (
    <div className="cercle" style={{ width: W, height: H }}>
      <svg width={W} height={H} aria-hidden="true">
        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="#95c11f" strokeWidth="6" strokeDasharray="14 10" />
        {fleches.map(([x, y, a], i) => <path key={i} d="M -11 -10 L 11 0 L -11 10 Z" fill="#0f4c75" transform={`translate(${x} ${y}) rotate(${a})`} />)}
      </svg>
      <div className="centre">
        <p className="t">Le cercle vertueux<br />de la data</p>
        <p className="fragment s">Plus la donnée sert, plus elle s’améliore.</p>
      </div>
      {CERCLE.map(([e, t, d], i) => (
        <div key={t} className={`noeud fragment ${i === 0 ? 'depart' : ''}`} style={{ left: pos[i][0], top: pos[i][1] }}>
          <b>{e} {t}</b><span>{d}</span>
        </div>
      ))}
    </div>
  );
}

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
                C’est là que tout se joue. Un fichier fait pour l’œil, il faut le refaire avant de le publier. Une base bien enregistrée, on la branche telle quelle.
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
        <Planche ep="Ép. 5" titre="Pour les usagers : la page « Les librairies près de chez vous »">
          <div className="row" style={{ marginBottom: 10, alignItems: 'center' }}>
            <Bulle qui="digit" humeur="content" size={44} className="col">La même base, branchée telle quelle : une page pour les habitants. Cherchez, filtrez, téléchargez.</Bulle>
            <a className="btn" href={`${BASE}annuaire.html`} target="_blank" rel="noreferrer" style={{ flexShrink: 0 }}>Ouvrir la page ↗</a>
          </div>
          <Annuaire />
        </Planche>
      </section>

      <section>
        <Planche ep="Conclusion" titre="Du simple Excel au grand public">
          <Cercle />
          <Narrateur className="fragment" style={{ marginTop: 6, fontSize: 17 }}>
            C’est le <b>lignage</b> de la donnée : d’où elle vient, par où elle passe, qui s’en sert. Tout part d’un simple fichier Excel bien construit. La base nationale ? Elle est faite <a href={SOURCE_URL} target="_blank" rel="noreferrer">exactement comme ça</a>.
          </Narrateur>
        </Planche>
      </section>
    </>
  );
}
