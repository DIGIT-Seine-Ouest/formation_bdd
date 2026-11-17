// ─── À retenir : les notes de Rémi (remplace l’ancien « À vous ! ») ─────────
// D’une part j’enregistre (l’onglet saisie), d’autre part je présente (l’onglet
// synthese). Reprend, dans l’ordre, les règles du tuto de Delos (Ép. 3).
import { Bulle, Planche } from '../components/BD';

const ENREGISTRE = [
  'Ligne 1 : les en-têtes, et rien d’autre',
  'Une ligne = une librairie, jamais de fusion',
  'Une case = une information',
  'Rien dans la couleur : une info, c’est une colonne',
  'Ce qui se répète se choisit dans une liste',
  'Un identifiant unique, qui ne change jamais',
  'Ce qui existe ailleurs se récupère (RECHERCHEV)',
  'Le temps est une colonne : des lignes en plus',
];
const PRESENTE = [
  'Un onglet à part, rien que pour l’œil',
  'Tout y est calculé, rien n’est tapé',
  'Des TCD qui répondent à une question',
  'Des en-têtes qui parlent : « Nombre de librairies »',
  'Une ligne ajoutée ? Clic droit › Actualiser',
];

export function NotesRemi() {
  return (
    <section>
      <Planche ep="À retenir" titre="Les notes de Rémi">
        <div className="row" style={{ marginBottom: 12, alignItems: 'center' }}>
          <Bulle qui="remi" humeur="content" size={48} className="col">Je note tout, pour la prochaine fois. Au fond, il n’y a que deux idées.</Bulle>
        </div>
        <div className="carnet">
          <div className="fragment">
            <p className="carnet-titre">✍️ D’une part, <u>j’enregistre</u> <span>l’onglet saisie</span></p>
            {ENREGISTRE.map((t) => <p key={t}>☑ {t}</p>)}
          </div>
          <div className="fragment">
            <p className="carnet-titre">📊 D’autre part, <u>je présente</u> <span>l’onglet synthese</span></p>
            {PRESENTE.map((t) => <p key={t}>☑ {t}</p>)}
          </div>
        </div>
        <div className="fragment" style={{ marginTop: 16, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'var(--ink)', color: '#fff', borderRadius: 8, padding: '12px 26px', fontFamily: '"IBM Plex Serif", serif', fontSize: 24, boxShadow: '6px 6px 0 var(--yellow)' }}>
            Soignez l’enregistrement, la présentation suit toute seule.
          </div>
        </div>
      </Planche>
    </section>
  );
}
