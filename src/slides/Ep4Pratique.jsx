// ─── Épisode 4 : « À vous ! » ───────────────────────────────────────────────
// Chacun pose SA base en 5 éléments (entité, attributs, test de la phrase,
// listes, identifiant) + ses 3 questions « je présente », en 8 minutes, à
// partir du gabarit (public/ressources/gabarit_base.xlsx). Puis la check-list
// de Super Nanny. Aucun fichier « mauvais » n’est montré.
import { useEffect, useState } from 'react';
import { Bulle, Case, Chapitre, Planche } from '../components/BD';

const BASE = import.meta.env.BASE_URL;
const DUREE = 8 * 60;

const CANEVAS = [
  ['1', 'Mon entité', 'Une ligne = un(e) …………………………'],
  ['2', 'Mes attributs', '3 à 6 colonnes, tirées de mes objectifs : ……………'],
  ['3', 'Le test de la phrase', '« Le/la ……… n° ……, ………, ………, est à ……… »'],
  ['4', 'Mes listes', 'Ce qui se répète se choisit : ………………………'],
  ['5', 'Mon identifiant', 'Unique, stable : ……-001, ……-002…'],
  ['📊', 'Je présente', 'Les 3 questions qu’on me posera : ……………'],
];
const IDEES = ['les salles à réserver', 'les équipements sportifs', 'les demandes d’intervention', 'les prêts de matériel', 'les associations partenaires'];

const CHECK_ENREG = [
  'Ligne 1 = les en-têtes, rien au-dessus',
  'Une ligne = une chose (pas de fusion)',
  'Une case = une information',
  'Aucune information dans la couleur',
  'Des listes pour ce qui se répète',
  'Un identifiant unique et stable',
  'Ce qui existe ailleurs : jointure',
  'Le temps est une colonne',
];
const CHECK_PRES = [
  'Un onglet à part pour présenter',
  'Tout y est calculé, rien n’y est tapé',
  'TCD : clic droit › Actualiser',
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
      <Chapitre fond="#dc2626" ep="Épisode 4" titre="À vous !" sous="Votre fichier, votre base. Huit minutes." promesse="📐 Les bonnes pratiques essentielles" />

      <section>
        <Planche ep="Ép. 4" titre="Votre base en 5 éléments">
          <div className="row" style={{ marginBottom: 12 }}>
            <Bulle qui="remi" humeur="content" size={48} className="col">Et vous ? Quel fichier de votre service pourrait devenir une base ?</Bulle>
            <Bulle qui="delos" humeur="content" size={48} droite className="col fragment">Même méthode que Rémi : on part du concept, on pose chaque élément, un par un.</Bulle>
          </div>
          <div className="row" style={{ alignItems: 'stretch' }}>
            <Case recit="Le canevas" className="col fragment">
              <div className="canevas">
                {CANEVAS.map(([n, t, aide]) => (
                  <div key={t}><b>{n}</b><span><strong>{t}</strong><i>{aide}</i></span></div>
                ))}
              </div>
            </Case>
            <div className="stack fragment" style={{ width: 320, flexShrink: 0, gap: 12 }}>
              <Case recit="Pas d’idée ?" style={{ padding: '22px 12px 10px' }}>
                <div className="small stack" style={{ fontSize: 15, gap: 3 }}>
                  {IDEES.map((i) => <p key={i}>• {i}</p>)}
                </div>
              </Case>
              <Minuteur />
              <a className="btn" href={`${BASE}ressources/gabarit_base.xlsx`} download style={{ textAlign: 'center' }}>Le gabarit Excel ↓</a>
            </div>
          </div>
        </Planche>
      </section>

      <section>
        <Planche ep="Ép. 4" titre="La check-list de Super Nanny">
          <div className="row" style={{ alignItems: 'flex-start' }}>
            <div style={{ width: 250, flexShrink: 0 }}>
              <Bulle qui="nanny" humeur="content" size={70}>Chez moi, on range ! Cochez ce que votre fichier respecte déjà.</Bulle>
            </div>
            <Case recit="✍️ J’enregistre" ton="blue" className="col">
              <div className="check">{CHECK_ENREG.map((c) => <p key={c} className="fragment">☐ {c}</p>)}</div>
            </Case>
            <Case recit="📊 Je présente" ton="good" style={{ width: 300 }}>
              <div className="check">{CHECK_PRES.map((c) => <p key={c} className="fragment">☐ {c}</p>)}</div>
            </Case>
          </div>
        </Planche>
      </section>
    </>
  );
}
