// ─── Fin : le kit (ce qu’on vous laisse) + « Appelez la DIGIT » ─────────────
import { Bulle, Case, Narrateur } from '../components/BD';
import { Perso } from '../components/Personnages';
import { SOURCE_URL } from '../remi';

const BASE = import.meta.env.BASE_URL;


const KIT = [
  ['ressources/cheat_sheet_librairies.docx', '📄 À retenir', 'Cheat sheet', 'Les notions de la séance en 2 pages.', 'blue'],
  ['ressources/guide_construction_librairies.docx', '📘 Pas à pas', 'Guide de construction', 'Comment Rémi a construit son fichier, formule par formule, avec ses prompts.', 'blue'],
  ['ressources/gabarit_base.xlsx', '✏️ Pour démarrer', 'Le gabarit', 'Un classeur vierge : saisie · listes · synthese · dictionnaire, pour votre propre base.', 'bad'],
  ['ressources/correction_suivi_librairies.xlsx', '🤖 Après', 'La correction', 'saisie · synthese · communes · listes · dictionnaire, formules incluses.', 'good'],
];

export function Final() {
  return (
    <>
      <section>
        <Bulle qui="remi" humeur="content" size={78}>
          Et vous ? Quel fichier sur votre poste pourrait devenir un <u>tableau de bord</u> ou un <u>annuaire</u> ?
        </Bulle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 30 }} className="dl">
          {KIT.map(([href, recit, titre, desc, ton]) => (
            <a key={href} href={`${BASE}${href}`} download>
              <Case recit={recit} ton={ton}>
                <p style={{ fontWeight: 700 }}>{titre}</p>
                <p className="small muted" style={{ marginTop: 4 }}>{desc}</p>
                <p className="small" style={{ marginTop: 8, fontWeight: 700 }}>Télécharger ↓</p>
              </Case>
            </a>
          ))}
        </div>
        <div className="row" style={{ marginTop: 26, alignItems: 'center' }}>
          <Narrateur className="col" style={{ fontSize: 17 }}>
            Données réelles : <a href={SOURCE_URL} target="_blank" rel="noreferrer">Base des librairies en France</a> (ministère de la Culture, Licence Ouverte) et populations légales INSEE.
          </Narrateur>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Perso qui="digit" humeur="content" size={56} />
            <p style={{ fontFamily: '"Comic Neue", cursive', fontWeight: 700, fontSize: 20 }}>Un fichier à valoriser ?<br />Appelez la DIGIT.</p>
          </div>
        </div>
      </section>
    </>
  );
}
