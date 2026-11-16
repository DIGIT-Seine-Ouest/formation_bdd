// ─── Fin : la morale, la check-list, à vous ─────────────────────────────────
import { Bulle, Case, Narrateur } from '../components/BD';
import { Perso } from '../components/Personnages';
import { SOURCE_URL } from '../data';

const BASE = import.meta.env.BASE_URL;

const CHECK = [
  ['🟢', 'Une ligne = une chose, complète. Pas de fusion, pas de total.'],
  ['🟢', 'Rien dans la couleur : une information, c’est une colonne.'],
  ['🟡', 'Une case = une seule information.'],
  ['🟡', 'Des valeurs contrôlées : listes déroulantes, vraies dates, vrais nombres.'],
  ['🟡', 'Des codes officiels : INSEE, SIRET, RNA.'],
  ['🔴', 'Le temps est une colonne, et chaque ligne a un identifiant stable.'],
  ['🔴', 'Un dictionnaire des données.'],
];

export function Final() {
  return (
    <>
      <section>
        <div className="row" style={{ alignItems: 'stretch' }}>
          <Case recit="La check-list de Rémi" className="col check">
            {CHECK.map(([n, t]) => <p key={t} className="fragment">{n} {t}</p>)}
          </Case>
          <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}><Perso qui="remi" humeur="content" size={120} /></div>
            <div style={{ background: 'var(--ink)', color: '#fff', borderRadius: 8, padding: '16px 20px', fontFamily: '"IBM Plex Serif", serif', fontSize: 26, lineHeight: 1.3, textAlign: 'center', boxShadow: '6px 6px 0 var(--yellow)' }}>
              Penser machine,<br />pas humain.
            </div>
            <Narrateur style={{ fontSize: 17 }}>La vue se recalcule. L’information, elle, se conserve et se réutilise.</Narrateur>
          </div>
        </div>
      </section>

      <section>
        <Bulle qui="remi" humeur="content" size={84}>
          Et vous ? Quel fichier sur votre poste pourrait devenir un <u>annuaire</u> ou un <u>tableau de bord</u> ?
        </Bulle>
        <div className="dl" style={{ marginTop: 34 }}>
          <a href={`${BASE}ressources/mon_suivi_librairies_VUE.xlsx`} download>
            <Case recit="👀 Avant" ton="bad">
              <p style={{ fontWeight: 700 }}>Le fichier « pensé humain »</p>
              <p className="small muted">Pour s’exercer : retrouvez les 7 pièges.</p>
              <p className="small" style={{ marginTop: 8, fontWeight: 700 }}>Télécharger (.xlsx) ↓</p>
            </Case>
          </a>
          <a href={`${BASE}ressources/mon_suivi_librairies_DONNEE.xlsx`} download>
            <Case recit="🤖 Après" ton="good">
              <p style={{ fontWeight: 700 }}>Le fichier « pensé machine »</p>
              <p className="small muted">La correction, avec liste déroulante et dictionnaire.</p>
              <p className="small" style={{ marginTop: 8, fontWeight: 700 }}>Télécharger (.xlsx) ↓</p>
            </Case>
          </a>
          <a href={SOURCE_URL} target="_blank" rel="noreferrer">
            <Case recit="🇫🇷 La source" ton="blue">
              <p style={{ fontWeight: 700 }}>Base des librairies en France</p>
              <p className="small muted">Ministère de la Culture · Licence Ouverte 2.0</p>
              <p className="small" style={{ marginTop: 8, fontWeight: 700 }}>Ouvrir sur data.gouv.fr ↗</p>
            </Case>
          </a>
        </div>
        <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center' }}>
          <Perso qui="digit" humeur="content" size={56} />
          <p style={{ fontFamily: '"Comic Neue", cursive', fontWeight: 700, fontSize: 21 }}>Un fichier à valoriser ? Appelez la DIGIT.</p>
        </div>
      </section>
    </>
  );
}
