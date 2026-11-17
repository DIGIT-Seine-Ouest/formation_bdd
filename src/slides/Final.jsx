// ─── Fin : à retenir + le kit de Rémi (ce qu’on vous laisse) ───────────────
import { Bulle, Case, Narrateur } from '../components/BD';
import { Perso } from '../components/Personnages';
import { SOURCE_URL } from '../remi';

const BASE = import.meta.env.BASE_URL;

const RETENIR = [
  ['✍️', 'Séparer : j’enregistre (une table brute) / je présente (un onglet calculé).'],
  ['❓', 'Avant la 1re colonne : j’enregistre quoi ? pour quel usage ? je l’ai déjà ailleurs ?'],
  ['1️⃣', '1 ligne = 1 chose · 1 colonne = 1 information · 1 case = 1 valeur.'],
  ['🔤', 'Le bon type, des listes fermées, des codes officiels (INSEE, SIRET…).'],
  ['🔑', 'Un identifiant unique, stable, sans signification.'],
  ['🚫', 'Ni onglets éclatés, ni couleur porteuse de sens, ni listes dans une cellule.'],
  ['🔗', 'Ce qui existe ailleurs, on le récupère (jointure), on ne le recopie pas.'],
];

const KIT = [
  ['ressources/cheat_sheet_librairies.docx', '📄 À retenir', 'Cheat sheet', 'Les notions de la séance en 2 pages.', 'blue'],
  ['ressources/guide_construction_librairies.docx', '📘 Pas à pas', 'Guide de construction', 'Comment Rémi a construit son fichier, formule par formule, avec ses prompts.', 'blue'],
  ['ressources/gabarit_base.xlsx', '✏️ À vous', 'Le gabarit', 'Un classeur vierge : saisie · listes · synthese · dictionnaire, prêt à remplir.', 'bad'],
  ['ressources/correction_suivi_librairies.xlsx', '🤖 Après', 'La correction', 'saisie · synthese · communes · listes · dictionnaire, formules incluses.', 'good'],
];

export function Final() {
  return (
    <>
      <section>
        <div className="row" style={{ alignItems: 'stretch' }}>
          <Case recit="Ce que Rémi a appris (à ses dépens)" className="col">
            {RETENIR.map(([e, t]) => <p key={t} className="fragment" style={{ fontSize: 18, margin: '0 0 9px' }}>{e} {t}</p>)}
          </Case>
          <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
              <Perso qui="remi" humeur="content" size={110} />
              <Perso qui="delos" humeur="content" size={110} />
            </div>
            <div style={{ background: 'var(--ink)', color: '#fff', borderRadius: 8, padding: '16px 20px', fontFamily: '"IBM Plex Serif", serif', fontSize: 24, lineHeight: 1.3, textAlign: 'center', boxShadow: '6px 6px 0 var(--yellow)' }}>
              Soignez l’enregistrement,<br />la présentation suit toute seule.
            </div>
          </div>
        </div>
      </section>

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
