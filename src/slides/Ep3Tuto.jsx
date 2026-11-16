// ─── Épisode 3 : le tuto de Delos, étape par étape ─────────────────────────
// Chaque étape : question de Rémi → théorie courte de Delos → ⚠️ piège (une
// erreur du « fichier de vendredi ») → 💡 geste Excel, sur la vraie base.
// Visuel : la vraie capture Excel (public/captures/etape-n.png) si elle existe,
// sinon la maquette etapeSaisie(n). Puis Claire obtient ses réponses en 10 s.
import { Bulle, Case, Chapitre, Narrateur, Planche } from '../components/BD';
import { Capture } from '../components/Capture';
import { Excel } from '../components/Excel';
import { COMMUNES, LIBRAIRIES, NB_LAB, QUESTIONS, SYNTHESE, etapeSaisie } from '../remi';

const FICHIER = 'correction_suivi_librairies.xlsx';
const dec = (x) => x.toFixed(2).replace('.', ',');
const Q1 = SYNTHESE.reduce((a, b) => (b.n > a.n ? b : a));
const Q3 = SYNTHESE.reduce((a, b) => (b.densite > a.densite ? b : a));

// L’onglet synthese (identique à public/ressources/correction_suivi_librairies.xlsx)
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

// Entoure la cellule sélectionnée (ex. « D3 ») dans la maquette
function selection(rows, ref) {
  const col = ref.charCodeAt(0) - 65;
  const lig = Number(ref.slice(1)) - 1;
  return rows.map((r, i) => (i !== lig ? r : r.map((cell, j) => {
    if (j !== col || cell === null) return cell;
    const o = typeof cell === 'object' ? { ...cell } : { v: cell };
    o.c = `${o.c || ''} sel`;
    return o;
  })));
}

const ONGLETS = (n) => ['saisie', ...(n >= 5 ? ['listes'] : []), ...(n >= 7 ? ['communes'] : []), ...(n >= 9 ? ['synthese'] : [])];

const ETAPES = [
  {
    titre: 'Partir des objectifs : les en-têtes', cel: 'A1', formule: 'librairie',
    remi: 'Je commence par un joli titre en haut ?',
    delos: <>Non : tu pars des <b>4 objectifs</b> du mail. Par commune → <b>commune</b> ; labellisées → <b>label</b> ; spécialités → <b>assortiment</b> ; et la <b>librairie</b> elle-même. La population ? On ira la chercher (étape 7).</>,
    piege: <>Un <b>titre et une note au-dessus du tableau</b> : je lis la ligne 1 comme une librairie nommée « 📚 SUIVI DES… », et la ligne 3 comme une librairie sans nom.</>,
    vendredi: 'vendredi_titre',
    geste: <>Ligne 1 = les en-têtes, et rien d’autre : courts, en minuscules, sans espace. Le titre va dans le nom de l’onglet (<code>saisie</code>) ou du fichier.</>,
  },
  {
    titre: 'Une ligne = une librairie', cel: 'D3', formule: 'Boulogne-Billancourt',
    remi: 'Six librairies à Boulogne : je fusionne la ville, c’est plus aéré ?',
    delos: <>Chaque ligne doit se lire <b>toute seule</b>. On répète la commune sur chaque ligne : ça ne coûte rien, et je peux trier, filtrer, compter.</>,
    piege: <>Les <b>cellules fusionnées</b> : pour moi, seule la 1re ligne est à Boulogne, les cinq autres n’ont pas de ville. Et Excel refuse de trier.</>,
    vendredi: 'vendredi_fusion',
    geste: <><span className="raccourci">⌘ T</span> (Ctrl+T sur PC) : la plage devient un <b>tableau</b>, avec filtres. Il s’agrandit tout seul à chaque nouvelle ligne.</>,
  },
  {
    titre: 'Une case = une information', cel: 'C4', formule: 'LIR',
    remi: '« Généraliste (LIR) », c’est complet, non ?',
    delos: <>C’est <b>deux réponses à deux questions</b>. Le label a sa propre colonne. Recoller deux colonnes, Excel le fait en une formule ; redécouper un texte libre, presque jamais.</>,
    piege: <><b>Deux infos dans une case</b> : « Généraliste (LIR) », « Boulogne-Billancourt (6) »… et un comptage tapé à la main, faux dès la prochaine ligne.</>,
    vendredi: 'vendredi_deux_infos',
    geste: <>Le test : si tu écris « et », une virgule ou des parenthèses dans une case, il te manque une colonne.</>,
  },
  {
    titre: 'Rien dans la couleur', cel: 'C4', formule: 'LIR', extra: 'etape-4-regle',
    remi: 'Je peux quand même mettre en vert les labellisées ?',
    delos: <>Oui, si c’est la <b>colonne label</b> qui décide. Moi, je ne vois pas les couleurs. Le CSV et l’imprimante noir et blanc non plus.</>,
    piege: <>Le <b>vert mis à la main</b> : l’information n’existe que pour l’œil. Impossible de compter les labellisées.</>,
    vendredi: 'vendredi_couleur',
    geste: <>Accueil › <b>Mise en forme conditionnelle</b> › Nouvelle règle › formule <code>=$C2="LIR"</code> › vert. La couleur suit la donnée.</>,
  },
  {
    titre: 'Des valeurs contrôlées', cel: 'B2', formule: 'BD et Mangas', extra: 'etape-5-validation',
    remi: '« géné. », « Généraliste »… tout le monde comprend, non ?',
    delos: <>Pas moi : « bd », « BD + mangas » et « BD-Manga », ça me fait <b>trois spécialités</b>. Ce qui se répète se <b>choisit</b> dans une liste, ça ne se tape pas.</>,
    piege: <><b>Des valeurs écrites à la main</b> : trois orthographes pour la BD, et une colonne Visite qui mélange dates, « oui » et « à faire ».</>,
    vendredi: 'vendredi_valeurs',
    geste: <>Un onglet <code>listes</code>, puis Données › <b>Validation des données</b> › Liste › <code>=listes!$A$2:$A$12</code>. Pareil pour label.</>,
  },
  {
    titre: 'Un identifiant', cel: 'A2', formule: 'LIB001',
    remi: 'Le nom de la librairie, ça suffit pour la retrouver ?',
    delos: <>Tu as <b>deux « Anagramme »</b>, une à Meudon, une à Sèvres. Il faut une clé <b>unique, stable, sans signification</b> : LIB013 et LIB015.</>,
    piege: <><b>Pas d’identifiant</b> : Rémi a lui-même noté « même que Sèvres ? » dans ses remarques.</>,
    vendredi: 'vendredi_anagramme',
    geste: <>Insérer une colonne A <code>id</code>, taper LIB001, LIB002, puis tirer la poignée de recopie. Jamais « Anagramme-Meudon » : si elle déménage, l’identifiant ment.</>,
  },
  {
    titre: 'Ne pas recopier : la jointure', cel: 'F2', formule: '=RECHERCHEV(E2;communes!$A:$B;2;0)', extra: 'etape-7-communes',
    remi: 'Et la population, pour les 10 000 habitants, je la recopie ?',
    delos: <>Surtout pas. Les collègues tiennent la table <b>communes</b> à jour. Tu saisis le <b>code commune</b>, et tu <b>récupères</b> le reste.</>,
    piege: <><b>Retaper ce qui existe ailleurs</b> : une faute de frappe, une population périmée… et deux versions qui finissent par se contredire.</>,
    geste: <><code>=RECHERCHEV(E2;communes!$A:$B;2;0)</code> : quoi je cherche ; où ; quelle colonne je renvoie ; 0 = exactement. code_commune au format <b>Texte</b>.</>,
  },
  {
    titre: 'Le temps est une colonne', cel: 'G2', formule: '2026',
    remi: 'Et l’an prochain, je crée un onglet « 2027 » ?',
    delos: <>Non : des <b>lignes en plus</b>, avec une colonne <b>annee_suivi</b>. Un seul tableau, et la synthèse compare les années toute seule.</>,
    piege: <><b>Un onglet par année</b> : impossible de comparer, et chaque onglet finit par raconter autre chose.</>,
    geste: <>Une colonne <code>annee_suivi</code> = 2026. En 2027, on colle les nouvelles lignes sous le tableau : il s’agrandit tout seul.</>,
  },
  {
    titre: 'Je fais la synthèse', cel: 'B13', formule: '=INDEX(B5:B12;EQUIV(MAX(C5:C12);C5:C12;0))',
    vue: { rows: SYNTH, largeurs: [190, 170, 86, 90, 120] },
    remi: 'Et les totaux, je les tape où ?',
    delos: <>Nulle part. L’onglet <b>synthese</b> ne contient que des formules : il <b>lit</b> l’onglet saisie. Une ligne de plus ? Tout se recalcule.</>,
    piege: <>Le <b>TOTAL tapé à la main</b> et le « Récap (2) » recopié : il dit 4 librairies à Issy. Il y en a 5.</>,
    vendredi: 'vendredi_recap',
    geste: <>Quatre formules à connaître : <code>NBVAL</code>, <code>NB.SI</code>, <code>RECHERCHEV</code>, <code>INDEX/EQUIV</code>. Et sans formule ? Le TCD, juste après.</>,
  },
];

function Etape({ e, n }) {
  const maquette = e.vue || etapeSaisie(n);
  const onglets = ONGLETS(n);
  return (
    <section>
      <div className="planche-head">
        <span className="ep">Étape {n}/{ETAPES.length}</span>
        <h2>{e.titre}</h2>
      </div>
      <div className="row" style={{ marginBottom: 8 }}>
        <Bulle qui="remi" humeur="neutre" size={44} className="col">{e.remi}</Bulle>
        <Bulle qui="delos" humeur="content" size={44} droite className="col fragment">{e.delos}</Bulle>
      </div>
      <div className="row" style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
        <div style={{ flex: 1, minWidth: 0, maxWidth: maquette.largeurs.reduce((a, b) => a + b, 32) }}>
          <Capture nom={`etape-${n}`} alt={`Excel, étape ${n} : ${e.titre}`} maxH={n === 9 ? 310 : 290}>
            <Excel fichier={FICHIER} onglets={onglets} actif={n === 9 ? onglets.length - 1 : 0} cellule={e.cel} formule={e.formule}
              largeurs={maquette.largeurs} rows={selection(maquette.rows, e.cel)} compact />
          </Capture>
        </div>
        {e.extra && <div style={{ flex: '0 1 38%', minWidth: 0 }}><Capture nom={e.extra} alt="" maxH={n === 9 ? 310 : 290} /></div>}
      </div>
      <div className="row" style={{ marginTop: 8, alignItems: 'stretch' }}>
        <div className="etape-piege col fragment" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>⚠️ <b>Le piège du fichier de vendredi.</b> {e.piege}</div>
          {e.vendredi && <div style={{ flex: '0 1 46%', minWidth: 0 }}><Capture nom={e.vendredi} alt="Le fichier de vendredi" maxH={92} /></div>}
        </div>
        <div className="etape-tip col fragment"><div>{e.geste}</div></div>
      </div>
    </section>
  );
}

export function Ep3Tuto() {
  return (
    <>
      <Chapitre fond="#0f4c75" ep="Épisode 3" titre="Le tuto de Delos" sous="Neuf étapes. Rémi pose la question, Delos explique, le fichier de vendredi montre le piège." promesse="⏱ Gagner du temps" />

      {ETAPES.map((e, i) => <Etape key={e.titre} e={e} n={i + 1} />)}

      <section>
        <div className="planche-head">
          <span className="ep">Bonus</span>
          <h2>Sans formule : le tableau croisé dynamique</h2>
        </div>
        <div className="row" style={{ marginBottom: 10 }}>
          <Bulle qui="remi" humeur="stress" size={44} className="col">INDEX, EQUIV… Il n’y a pas plus simple ?</Bulle>
          <Bulle qui="delos" humeur="content" size={44} droite className="col fragment">Si : le TCD. Quatre clics, et c’est Excel qui compte. Il ne marche que sur une table propre… comme la tienne, maintenant.</Bulle>
        </div>
        <div className="row" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div className="fragment" style={{ flex: '0 1 auto', minWidth: 0 }}>
            <Capture nom="tcd-creer" alt="Créer un tableau croisé dynamique sur T_saisie" maxH={300}>
              <Case recit="Les 4 clics" style={{ padding: '22px 14px 12px' }}>
                <div className="stack" style={{ fontSize: 17 }}>
                  <p>① Cliquer dans l’onglet <code>saisie</code></p>
                  <p>② <span className="raccourci">Insertion</span> › <span className="raccourci">Tableau croisé dynamique</span> › OK</p>
                  <p>③ Glisser <code>commune</code> dans <b>Lignes</b></p>
                  <p>④ Glisser <code>id</code> dans <b>Valeurs</b></p>
                </div>
              </Case>
            </Capture>
          </div>
          <span className="fragment" style={{ fontSize: 30 }}>➜</span>
          <div className="fragment" style={{ flex: '0 1 auto', minWidth: 0 }}>
            <Capture nom="tcd" alt="Le TCD : nombre de librairies par commune" maxH={380}>
              <Excel fichier={FICHIER} onglets={['TCD', 'saisie', 'synthese']} cellule="B4" formule="6" largeurs={[220, 130]}
                rows={[
                  [{ v: 'Étiquettes de lignes', c: 'bleu gras' }, { v: 'Nombre de id', c: 'bleu gras' }],
                  ...SYNTHESE.filter((s) => s.n).map((s) => [s.nom, s.n]),
                  [{ v: 'Total général', c: 'gras' }, { v: LIBRAIRIES.length, c: 'gras' }],
                ]} />
            </Capture>
          </div>
        </div>
        <div className="etape-tip fragment" style={{ marginTop: 10 }}><div>Le tableau <code>T_saisie</code> est reconnu tout seul. Nouvelle librairie ? Clic droit › <b>Actualiser</b>.</div></div>
      </section>

      <section>
        <Planche ep="Ép. 3" titre="Mardi, 14 h 02 : les questions arrivent">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1.1fr', gap: 18 }}>
            <Case>
              <Bulle qui="claire" humeur="stress" size={60}>Rémi ! Pour le maire, <b>tout de suite</b> : {QUESTIONS.map(([q, t]) => <span key={q} style={{ display: 'block', fontSize: 15, marginTop: 4 }}>{q} · {t}</span>)}</Bulle>
            </Case>
            <Case className="fragment center">
              <Bulle qui="remi" humeur="content" size={60}>Q1 : {Q1.nom.split('-')[0]}, {Q1.n}. Q2 : {NB_LAB}. Q3 : {Q3.nom}.</Bulle>
              <p className="sfx" style={{ fontSize: 46, marginTop: 14 }}>10 secondes !</p>
            </Case>
            <Case className="fragment">
              <Bulle qui="claire" humeur="surpris" size={60}>{Q3.nom} ?!</Bulle>
              <div style={{ height: 12 }} />
              <Bulle qui="delos" humeur="content" size={60} droite>Une librairie pour {COMMUNES.find((c) => c[0] === Q3.code)[2].toLocaleString('fr-FR')} habitants. Les chiffres ne mentent pas. Les cellules fusionnées, si.</Bulle>
            </Case>
          </div>
          <Narrateur className="fragment" style={{ marginTop: 22 }}>
            Avec le fichier de vendredi, il aurait fallu tout recompter à la main. Avec la base, 10 secondes. Et l’an prochain, Rémi colle ses lignes 2027 sous le tableau : la synthèse se met à jour toute seule.
          </Narrateur>
        </Planche>
      </section>
    </>
  );
}
