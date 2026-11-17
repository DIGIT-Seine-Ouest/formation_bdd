// ─── Épisode 4 : et si ça servait à tout le monde ? Rémi appelle la DIGIT ─────────────────────
// Rémi demande → la DIGIT : « oui, ensemble : un annuaire et un tableau de bord
// dynamique » → les deux résultats → « on l’a déjà fait avec Meudon, Sèvres,
// Boulogne » → la DIGIT conclut : le cercle vertueux de la data.
import { Annuaire } from '../components/Annuaire';
import { Bulle, Case, Chapitre, Narrateur, Planche } from '../components/BD';
import { TableauDeBord } from '../components/TableauDeBord';
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
const W = 960, H = 460, CX = W / 2, CY = H / 2, RX = 345, RY = 172;

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

export function Ep4Valoriser() {
  return (
    <>
      <Chapitre fond="#4c2a85" ep="Épisode 4" titre="Rémi appelle la DIGIT" sous="La base est prête. Et si elle servait à tout le monde ?" promesse="🚀 Faciliter l’exploitation" />

      {/* 1. Le coup de fil : on le fait ensemble */}
      <section>
        <Planche ep="Ép. 4" titre="Le coup de fil">
          <div className="row" style={{ alignItems: 'flex-start' }}>
            <div className="col stack">
              <Case>
                <Bulle qui="remi" humeur="content">Allô la DIGIT ? Ma base des librairies est prête. On peut en faire quelque chose ?</Bulle>
              </Case>
              <Case className="fragment">
                <Bulle qui="digit" humeur="content" droite>Oui ! Ensemble, on en fait deux choses : un <u>annuaire</u> pour les habitants, et un <u>tableau de bord dynamique</u> pour ton équipe.</Bulle>
              </Case>
              <Case className="fragment">
                <Bulle qui="remi" humeur="surpris">Il faut tout ressaisir ?</Bulle>
              </Case>
              <Case className="fragment">
                <Bulle qui="digit" humeur="content" droite>Rien du tout. Ta base est bien enregistrée : on la branche telle quelle.</Bulle>
              </Case>
            </div>
            <div style={{ width: 300 }}>
              <Narrateur className="fragment">
                C’est là que tout se joue. Une base bien enregistrée se branche telle quelle. Un fichier fait pour l’œil, il faudrait le refaire.
              </Narrateur>
            </div>
          </div>
        </Planche>
      </section>

      {/* 2. Résultat n°1 : l’annuaire */}
      <section>
        <Planche ep="Ép. 4" titre="Résultat n°1 : l’annuaire pour les habitants">
          <div className="row" style={{ marginBottom: 10, alignItems: 'center' }}>
            <Bulle qui="digit" humeur="content" size={44} className="col">La base de Rémi, branchée telle quelle : chacun cherche, filtre, télécharge.</Bulle>
            <a className="btn" href={`${BASE}annuaire.html`} target="_blank" rel="noreferrer" style={{ flexShrink: 0 }}>Ouvrir la page ↗</a>
          </div>
          <Annuaire />
        </Planche>
      </section>

      {/* 3. Résultat n°2 : le tableau de bord dynamique */}
      <section>
        <Planche ep="Ép. 4" titre="Résultat n°2 : le tableau de bord dynamique">
          <div className="row" style={{ marginBottom: 10, alignItems: 'center' }}>
            <Bulle qui="digit" humeur="content" size={44} className="col">La même base, pour l’équipe : cliquez une commune, tout se recalcule. Et chaque ligne ajoutée par Rémi apparaît ici toute seule.</Bulle>
          </div>
          <TableauDeBord />
        </Planche>
      </section>

      {/* 4. Déjà fait avec les villes */}
      <section>
        <Planche ep="Ép. 4" titre="Cette démarche, on l’a déjà faite">
          <div className="row" style={{ marginBottom: 10, alignItems: 'center' }}>
            <Bulle qui="digit" humeur="content" size={44} className="col">Rémi, tu n’es pas le premier : on a déjà fait ce chemin avec des villes du territoire, comme <b>Meudon</b>, <b>Sèvres</b> ou <b>Boulogne-Billancourt</b>.</Bulle>
          </div>
          <Vitrine />
        </Planche>
      </section>

      {/* 5. Conclusion de la DIGIT : le cercle vertueux */}
      <section>
        <Planche ep="Conclusion" titre="Du simple Excel au grand public">
          <div className="row" style={{ marginBottom: 4, alignItems: 'center' }}>
            <Bulle qui="digit" humeur="content" size={44} className="col">Et c’est ça, le <b>cercle vertueux de la data</b> : tout part d’un simple fichier Excel bien construit.</Bulle>
          </div>
          <Cercle />
          <Narrateur className="fragment" style={{ marginTop: 4, fontSize: 16 }}>
            C’est le <b>lignage</b> de la donnée : d’où elle vient, par où elle passe, qui s’en sert. La base nationale des librairies ? Elle est faite <a href={SOURCE_URL} target="_blank" rel="noreferrer">exactement comme ça</a>.
          </Narrateur>
        </Planche>
      </section>
    </>
  );
}
