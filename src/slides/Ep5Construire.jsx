// ─── Épisode 5 : Rémi construit son fichier (avec Delos) ───────────────────
// Le guide de construction, en BD : onglet saisie (j’écris), onglet synthese
// (je fais la synthèse), le TCD, le retour de Claire, les prompts de Rémi.
import { Bulle, Case, Chapitre, Narrateur, Planche } from '../components/BD';
import { Excel } from '../components/Excel';
import { COMMUNES, LIBRAIRIES, NB_LAB, QUESTIONS, SYNTHESE, nomCommune } from '../remi';

const dec = (x) => x.toFixed(2).replace('.', ',');
const Q1 = SYNTHESE.reduce((a, b) => (b.n > a.n ? b : a));
const Q3 = SYNTHESE.reduce((a, b) => (b.densite > a.densite ? b : a));

const SAISIE = [
  ['id', 'librairie', 'assortiment', 'label', 'code_commune', 'annee_suivi', 'commune'].map((v) => ({ v, c: 'h' })),
  ...LIBRAIRIES.map(([id, nom, assort, label, code], i) => [
    id, nom, assort, label, { v: code, c: 'bleu' }, { v: 2026 }, { v: nomCommune(code), c: i === 0 ? 'calc sel' : 'calc' },
  ]),
];

const SYNTH = [
  [{ v: 'TABLEAU DE SUIVI — LIBRAIRIES GPSO', c: 'titre', cs: 5 }, null, null, null, null],
  [{ v: 'Librairies suivies', c: 'gras' }, { v: LIBRAIRIES.length, c: 'res' }, '', '', ''],
  [{ v: 'Labellisées (LIR + LR)', c: 'gras' }, { v: NB_LAB, c: 'res' }, '', '', ''],
  [{ v: 'code', c: 'h' }, { v: 'commune', c: 'h' }, { v: 'librairies', c: 'h' }, { v: 'population', c: 'h' }, { v: 'pour 10 000 hab.', c: 'h' }],
  ...SYNTHESE.map((s) => [s.code, { v: s.nom, c: 'calc' }, { v: s.n, c: 'calc' }, { v: s.pop, c: 'calc' }, { v: dec(s.densite), c: 'calc num' }]),
  [{ v: 'Q1 · le plus de librairies', c: 'gras' }, { v: Q1.nom, c: 'res sel' }, { v: Q1.n, c: 'res' }, '', ''],
  [{ v: 'Q2 · labellisées', c: 'gras' }, { v: NB_LAB, c: 'res' }, '', '', ''],
  [{ v: 'Q3 · pour 10 000 hab.', c: 'gras' }, { v: Q3.nom, c: 'res' }, { v: dec(Q3.densite), c: 'res num' }, '', ''],
];

const PROMPTS = [
  ['Cadrer', 'Je dois suivre les librairies de mon territoire et répondre chaque année à ces 3 questions : […]. Propose-moi une table : l’entité, les colonnes, le type de chaque colonne et les valeurs autorisées.'],
  ['Diagnostiquer', 'Voici les en-têtes et 5 lignes de mon fichier : […]. Liste les problèmes de structure (cellules fusionnées, plusieurs infos par case, couleurs, types, onglets éclatés) et propose la correction.'],
  ['Formuler', 'Écris la formule Excel en français (séparateur ;) qui renvoie la commune ayant le plus de librairies, à partir des colonnes B (commune) et C (nombre). Explique-la en une phrase.'],
  ['Documenter', 'À partir de ces colonnes : […], rédige le dictionnaire des données : colonne, définition, format, valeurs autorisées, exemple.'],
];

export function Ep5Construire() {
  return (
    <>
      <Chapitre fond="#95c11f" ep="Épisode 5" titre="Rémi construit son fichier" sous="Il ne recommence pas : il range. Delos à côté. Claire, quelque part, prépare ses questions." promesse="⏱ Gagner du temps" />

      {/* La jointure : récupérer la table des collègues */}
      <section>
        <Planche ep="Ép. 5" titre="La jointure : ne jamais recopier ce qui existe ailleurs">
          <div className="row" style={{ marginBottom: 14 }}>
            <Bulle qui="remi" humeur="content" size={50} className="col">Le nom des communes et leur population, je les recopie dans ma table ?</Bulle>
            <Bulle qui="delos" humeur="surpris" size={50} droite className="col fragment">Surtout pas. Les collègues la tiennent à jour dans la table <b>communes</b>. Tu la <b>récupères</b> grâce au code commune.</Bulle>
          </div>
          <div className="row fragment" style={{ alignItems: 'center' }}>
            <div className="col">
              <Excel fichier="suivi_librairies.xlsx" onglets={['saisie', 'communes', 'synthese']} actif={0} cellule="H2"
                formule="=RECHERCHEV(E2;communes!$A:$C;3;0)" largeurs={[64, 190, 70, 72]}
                rows={[
                  [{ v: 'id', c: 'h' }, { v: 'librairie', c: 'h' }, { v: 'code_commune', c: 'h' }, { v: 'population', c: 'h' }],
                  ['LIB001', 'LE COMPTOIR DE LA BD', { v: '92012', c: 'bleu' }, { v: 119019, c: 'calc sel' }],
                  ['LIB007', 'LIBRAIRIE DE LA POINTE', { v: '92022', c: 'bleu' }, { v: 20594, c: 'calc' }],
                ]}
              />
              <p className="tiny muted" style={{ marginTop: 4 }}>Colonnes simplifiées pour l’exemple.</p>
            </div>
            <span style={{ fontSize: 30 }}>⟵</span>
            <div style={{ width: 330 }}>
              <Excel fichier="communes (collègues)" onglets={['communes']} cellule="A1" formule="code_commune" largeurs={[70, 160, 80]}
                rows={[
                  [{ v: 'code', c: 'h' }, { v: 'commune', c: 'h' }, { v: 'population', c: 'h' }],
                  [{ v: '92012', c: 'bleu' }, 'Boulogne-Billancourt', 119019],
                  [{ v: '92022', c: 'bleu' }, 'Chaville', 20594],
                  ['92040', 'Issy-les-Moulineaux', 67669],
                ]}
              />
            </div>
          </div>
          <Narrateur className="fragment" style={{ marginTop: 16, fontSize: 18 }}>
            RECHERCHEV(<b>quoi</b> je cherche ; <b>où</b> ; <b>quelle colonne</b> je renvoie ; 0 = exactement). L’information est saisie une seule fois, chez ceux qui en sont responsables.
          </Narrateur>
        </Planche>
      </section>
      {/* Onglet saisie */}
      <section>
        <Planche ep="Ép. 5" titre="Onglet « saisie » : j’écris">
          <div className="row">
            <div style={{ flex: 2.7 }}>
              <Excel fichier="suivi_librairies.xlsx" onglets={['saisie', 'synthese', 'communes', 'listes', 'dictionnaire']} actif={0}
                cellule="G2" formule="=RECHERCHEV(E2;communes!$A:$B;2;0)" largeurs={[58, 190, 96, 52, 92, 78, 140]} rows={SAISIE} />
            </div>
            <div className="col stack">
              <Bulle qui="remi" humeur="surpris" size={46}>C’est… moche.</Bulle>
              <Bulle qui="delos" humeur="content" size={46} className="fragment">C’est fait pour moi. Le joli, c’est dans l’onglet d’à côté.</Bulle>
              <Case recit="Comment Rémi l’a construit" className="fragment" style={{ padding: '22px 12px 10px' }}>
                <div className="small stack" style={{ fontSize: 14 }}>
                  <p><b>Ctrl+T</b> : la plage devient un tableau, avec filtres.</p>
                  <p><b>Données › Validation › Liste</b> : assortiment, label et code_commune se choisissent dans l’onglet <code>listes</code>.</p>
                  <p><b>code_commune</b> au format Texte (sinon 01004 devient 1004).</p>
                  <p>La colonne <b>commune</b> (grisée) est calculée par jointure, jamais saisie.</p>
                </div>
              </Case>
            </div>
          </div>
        </Planche>
      </section>

      {/* Onglet synthese */}
      <section>
        <Planche ep="Ép. 5" titre="Onglet « synthese » : je fais la synthèse">
          <div className="row">
            <div style={{ flex: 1.75 }}>
              <Excel fichier="suivi_librairies.xlsx" onglets={['saisie', 'synthese', 'communes', 'listes', 'dictionnaire']} actif={1}
                cellule="B13" formule="=INDEX(B5:B12;EQUIV(MAX(C5:C12);C5:C12;0))" largeurs={[170, 160, 80, 86, 104]} rows={SYNTH} />
            </div>
            <div className="col stack">
              <Bulle qui="remi" humeur="neutre" size={46}>Et je tape les chiffres où ?</Bulle>
              <Bulle qui="delos" humeur="surpris" size={46} className="fragment">Nulle part. Ici, rien n’est saisi : tout est <b>lu</b> dans l’onglet saisie.</Bulle>
              <Case recit="Les 4 formules à connaître" className="fragment" style={{ padding: '22px 12px 10px' }}>
                <div className="stack" style={{ fontSize: 14 }}>
                  <p><code>=NBVAL(saisie!A:A)-1</code> compte les librairies</p>
                  <p><code>=NB.SI(saisie!E:E;A5)</code> compte celles d’une commune</p>
                  <p><code>=C5/D5*10000</code> pour 10 000 habitants</p>
                  <p><code>=INDEX(…;EQUIV(MAX(…);…;0))</code> trouve la championne</p>
                </div>
              </Case>
            </div>
          </div>
        </Planche>
      </section>

      {/* Le TCD */}
      <section>
        <Planche ep="Ép. 5" titre="Sans formule : le tableau croisé dynamique">
          <div className="row" style={{ marginBottom: 14 }}>
            <Bulle qui="remi" humeur="stress" size={50} className="col">INDEX, EQUIV… Il n’y a pas plus simple ?</Bulle>
            <Bulle qui="delos" humeur="content" size={50} droite className="col fragment">Si. Le TCD. Quatre clics, et c’est lui qui compte. Il ne marche que sur une table propre.</Bulle>
          </div>
          <div className="row fragment">
            <Case recit="Les 4 clics" className="col">
              <div className="stack" style={{ fontSize: 17 }}>
                <p>① Cliquer dans l’onglet <code>saisie</code> (une cellule suffit)</p>
                <p>② <span className="raccourci">Insertion</span> › <span className="raccourci">Tableau croisé dynamique</span> › OK</p>
                <p>③ Glisser <code>commune</code> dans <b>Lignes</b></p>
                <p>④ Glisser <code>id</code> dans <b>Valeurs</b> : Excel compte tout seul</p>
                <p className="small muted">Nouvelle librairie ? Clic droit › Actualiser.</p>
              </div>
            </Case>
            <div style={{ width: 380 }}>
              <Excel fichier="suivi_librairies.xlsx" onglets={['saisie', 'TCD', 'synthese']} actif={1} cellule="A3" formule="Étiquettes de lignes" largeurs={[220, 130]}
                rows={[
                  [{ v: 'Étiquettes de lignes', c: 'bleu gras' }, { v: 'Nombre de id', c: 'bleu gras' }],
                  ...SYNTHESE.filter((s) => s.n).sort((a, b) => b.n - a.n).map((s) => [s.nom, s.n]),
                  [{ v: 'Total général', c: 'gras' }, { v: LIBRAIRIES.length, c: 'gras' }],
                ]}
              />
            </div>
          </div>
        </Planche>
      </section>

      {/* Claire revient */}
      <section>
        <Planche ep="Ép. 5" titre="Mardi, 14 h 02 : les questions arrivent">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1.1fr', gap: 18 }}>
            <Case>
              <Bulle qui="claire" humeur="stress" size={60}>Rémi ! Pour le maire, <b>tout de suite</b> : {QUESTIONS.map(([q, t]) => <span key={q} style={{ display: 'block', fontSize: 15, marginTop: 4 }}>{q} · {t}</span>)}</Bulle>
            </Case>
            <Case className="fragment center">
              <Bulle qui="remi" humeur="content" size={60}>Q1 : Boulogne, 6. Q2 : {NB_LAB}. Q3 : Ville-d’Avray.</Bulle>
              <p className="sfx" style={{ fontSize: 46, marginTop: 14 }}>10 secondes !</p>
            </Case>
            <Case className="fragment">
              <Bulle qui="claire" humeur="surpris" size={60}>Ville-d’Avray ?!</Bulle>
              <div style={{ height: 12 }} />
              <Bulle qui="delos" humeur="content" size={60} droite>Une librairie pour {COMMUNES.find((c) => c[0] === '92077')[2].toLocaleString('fr-FR')} habitants. Les chiffres ne mentent pas. Les cellules fusionnées, si.</Bulle>
            </Case>
          </div>
          <Narrateur className="fragment" style={{ marginTop: 22 }}>
            Avec le fichier de vendredi, il aurait fallu 35 minutes (on a essayé). Avec la base, 10 secondes. Et l’an prochain, Rémi ajoute ses lignes 2027 en dessous : la synthèse se met à jour toute seule.
          </Narrateur>
        </Planche>
      </section>

      {/* Les prompts */}
      <section>
        <Planche ep="Ép. 5" titre="Les 4 prompts de Rémi">
          <div className="row" style={{ marginBottom: 14 }}>
            <Bulle qui="remi" humeur="content" size={50} className="col">Au fait Delos, j’aurais dû te demander quoi, dès le début ?</Bulle>
            <Bulle qui="delos" humeur="content" size={50} droite className="col fragment">Ça. À copier, à adapter. Et toujours vérifier ce que je propose.</Bulle>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {PROMPTS.map(([t, p]) => (
              <Case key={t} recit={t} className="fragment" style={{ padding: '22px 12px 12px' }}>
                <div className="prompt">{p}</div>
              </Case>
            ))}
          </div>
          <p className="small fragment" style={{ marginTop: 14 }}>⚠️ Jamais de données personnelles ou sensibles dans un prompt : des en-têtes et quelques lignes d’exemple suffisent.</p>
        </Planche>
      </section>
    </>
  );
}
