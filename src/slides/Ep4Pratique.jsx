// ─── Épisode 4 : « À vous ! » ───────────────────────────────────────────────
// Le fichier de vendredi (public/ressources/exercice_aide_memoire.xlsx) :
// 7 erreurs à trouver en 8 minutes, repères en fragments, puis la correction
// qui renvoie à l’étape du tuto de Delos.
import { useEffect, useState } from 'react';
import { Bulle, Case, Chapitre, Narrateur, Planche } from '../components/BD';
import { Excel } from '../components/Excel';
import { VA_VITE_ONGLETS, vaVite } from '../remi';

const BASE = import.meta.env.BASE_URL;
const DUREE = 8 * 60;

// Repères de la vue d’ensemble : une erreur = un numéro
const MARQUES = { A1: 1, A5: 2, B7: 3, C7: 4, D9: 5, B17: 6, A23: 7 };

const ERREURS = [
  ['🟢', 'Un titre dans le tableau', 'A1', 1],
  ['🟢', 'Des cellules fusionnées', 'A5', 2],
  ['🟢', 'L’information dans la couleur', 'B7', 4],
  ['🟡', 'Deux informations dans une case', 'C7', 3],
  ['🟡', 'Des valeurs écrites à la main', 'D9', 5],
  ['🟡', 'Pas d’identifiant (deux « Anagramme »)', 'B17', 6],
  ['🔴', 'La synthèse mélangée à la saisie (TOTAL, « Récap (2) »)', 'A23', 9],
];

function Minuteur() {
  const [reste, setReste] = useState(DUREE);
  const [actif, setActif] = useState(false);
  useEffect(() => {
    if (!actif) return undefined;
    const t = setInterval(() => setReste((r) => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [actif]);
  const mm = String(Math.floor(reste / 60)).padStart(2, '0');
  const ss = String(reste % 60).padStart(2, '0');
  return (
    <div className="minuteur">
      <span className={reste === 0 ? 'fini' : ''}>⏱ {mm}:{ss}</span>
      <button type="button" onClick={() => setActif((a) => !a)}>{actif ? 'Pause' : 'Go'}</button>
      <button type="button" onClick={() => { setActif(false); setReste(DUREE); }}>↺</button>
    </div>
  );
}

export function Ep4Pratique() {
  return (
    <>
      <Chapitre fond="#dc2626" ep="Épisode 4" titre="À vous !" sous="Le fichier de vendredi, 17 h 45. Sept erreurs. Huit minutes." promesse="📐 Les bonnes pratiques essentielles" />

      <section>
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Excel fichier="exercice_aide_memoire.xlsx" onglets={VA_VITE_ONGLETS} cellule="A5" formule="Boulogne-Billancourt (6)"
                largeurs={[176, 196, 130, 104, 126]} rows={vaVite({ marques: MARQUES, marquesFragment: true })} compact />
          </div>
          <div className="stack" style={{ width: 320, flexShrink: 0 }}>
            <Bulle qui="remi" humeur="content" size={48}>Mon fichier de vendredi. Joli, non ?</Bulle>
            <Bulle qui="delos" humeur="surpris" size={48}>Pour un humain. Pour moi, il y a <b>7 problèmes</b>. À vous de les trouver.</Bulle>
            <Case recit="La consigne" style={{ padding: '22px 12px 10px' }}>
              <div className="small stack" style={{ fontSize: 15 }}>
                <p>① Ouvrez <a href={`${BASE}ressources/exercice_aide_memoire.xlsx`} download>exercice_aide_memoire.xlsx</a>.</p>
                <p>② Trouvez les 7 erreurs, de la plus évidente à la plus subtile.</p>
                <p>③ Bonus : reconstruisez l’onglet <code>saisie</code> avec les gestes de Delos.</p>
              </div>
            </Case>
            <Minuteur />
          </div>
        </div>
      </section>

      <section>
        <Planche ep="Ép. 4" titre="La correction">
          <div className="row" style={{ alignItems: 'stretch' }}>
            <Case recit="Les 7 erreurs, de l’évident au subtil" className="col">
              <table className="logiques" style={{ fontSize: 16 }}>
                <tbody>
                  {ERREURS.map(([niv, t, cel, etape], i) => (
                    <tr key={t} className="fragment">
                      <td style={{ width: 40 }}>{niv} {i + 1}</td>
                      <td>{t} <span className="muted">({cel})</span></td>
                      <td style={{ width: 90, color: 'var(--green-dark)', fontWeight: 700 }}>→ étape {etape}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Case>
            <div style={{ width: 340 }} className="stack">
              <Narrateur className="fragment">
                Ce fichier n’est pas « mauvais » : c’est un <u>aide-mémoire</u>, fait pour l’œil. Une base de données est faite pour la machine. Le problème, c’est de confondre les deux.
              </Narrateur>
              <Bulle qui="remi" humeur="stress" size={48} className="fragment">Je recommence tout ?</Bulle>
              <Bulle qui="delos" humeur="content" size={48} droite className="fragment">Non. Tu ranges. Les données sont bonnes, c’est la forme qui ne va pas.</Bulle>
            </div>
          </div>
        </Planche>
      </section>
    </>
  );
}
