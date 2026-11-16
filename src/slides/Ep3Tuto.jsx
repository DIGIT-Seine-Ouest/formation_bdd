// ─── Épisode 3 : le tuto de Delos, étape par étape ─────────────────────────
// Chaque étape : question de Rémi → théorie courte de Delos → ⚠️ piège (une
// erreur du « fichier de vendredi ») → 💡 geste Excel, sur la vraie base.
// Visuel : Excel pour Windows reconstruit en HTML (onglet du ruban, bouton à
// cliquer entouré, boîtes de dialogue en fragments). Libellés : Excel Windows
// en français (support.microsoft.com/fr-fr). Puis le TCD, puis Claire.
import { Bulle, Case, Chapitre, Narrateur, Planche } from '../components/BD';
import {
  Dialogue, Excel, PanneauTCD, XBoutons, XCase, XChamp, XLabel, XListe, XOnglets, XRadio,
} from '../components/Excel';
import { COMMUNES, LIBRAIRIES, NB_LAB, QUESTIONS, SYNTHESE, etapeSaisie } from '../remi';

const FICHIER = 'correction_suivi_librairies.xlsx';
const dec = (x) => x.toFixed(2).replace('.', ',');
const Q1 = SYNTHESE.reduce((a, b) => (b.n > a.n ? b : a));
const Q3 = SYNTHESE.reduce((a, b) => (b.densite > a.densite ? b : a));
const ASSORTIMENTS = ['Généraliste', 'BD et Mangas', 'Jeunesse', 'Religion', 'Arts - Musées et Monuments', 'Mieux-être et spiritualité', 'VO', 'Imaginaire - Policier'];

// L’onglet synthese (identique à public/ressources/correction_suivi_librairies.xlsx)
const SYNTH = [
  [{ v: 'TABLEAU DE SUIVI — LIBRAIRIES GPSO', c: 'titre', cs: 5 }, null, null, null, null],
  [{ v: 'Librairies suivies', c: 'gras' }, { v: LIBRAIRIES.length, c: 'res' }, '', '', ''],
  [{ v: 'Labellisées (LIR + LR)', c: 'gras' }, { v: NB_LAB, c: 'res' }, '', '', ''],
  [{ v: 'code', c: 'h' }, { v: 'commune', c: 'h' }, { v: 'librairies', c: 'h' }, { v: 'population', c: 'h' }, { v: 'pour 10 000 hab.', c: 'h' }],
  ...SYNTHESE.map((s) => [s.code, { v: s.nom, c: 'calc' }, { v: s.n, c: 'calc' }, { v: s.pop, c: 'calc' }, { v: dec(s.densite), c: 'calc num' }]),
  [{ v: 'Q1 · le plus de librairies', c: 'gras' }, { v: Q1.nom, c: 'res' }, { v: Q1.n, c: 'res' }, '', ''],
  [{ v: 'Q2 · labellisées', c: 'gras' }, { v: NB_LAB, c: 'res' }, '', '', ''],
  [{ v: 'Q3 · pour 10 000 hab.', c: 'gras' }, { v: Q3.nom, c: 'res' }, { v: dec(Q3.densite), c: 'res num' }, '', ''],
];

// Entoure la cellule sélectionnée (ex. « D3 ») ; extra = propriétés ajoutées à la cellule (liste déroulante…)
function selection(rows, ref, extra = {}) {
  const col = ref.charCodeAt(0) - 65;
  const lig = Number(ref.slice(1)) - 1;
  return rows.map((r, i) => (i !== lig ? r : r.map((cell, j) => {
    if (j !== col || cell === null) return cell;
    const o = typeof cell === 'object' ? { ...cell } : { v: cell };
    return { ...o, ...extra, c: `${o.c || ''} sel` };
  })));
}

const ONGLETS = (n) => ['saisie', ...(n >= 5 ? ['listes'] : []), ...(n >= 7 ? ['communes'] : []), ...(n >= 9 ? ['synthese'] : [])];

// ── Le ruban Windows : le bouton à cliquer est entouré ──
const CMD = {
  tableau: [{ groupe: 'Tableaux', items: [['⊞', 'Tableau croisé dynamique'], ['📑', 'Tableaux croisés dynamiques recommandés'], ['▦', 'Tableau', true]] },
    { groupe: 'Illustrations', items: [['🖼', 'Illustrations']] }, { groupe: 'Graphiques', items: [['📊', 'Graphiques recommandés']] }],
  mfc: [{ groupe: 'Nombre', items: [['%', 'Standard']] },
    { groupe: 'Styles', items: [['▤', 'Mise en forme conditionnelle', true], ['▦', 'Mettre sous forme de tableau'], ['▧', 'Styles de cellules']] },
    { groupe: 'Cellules', items: [['⊞', 'Insérer'], ['⊟', 'Supprimer'], ['▭', 'Format']] }],
  validation: [{ groupe: 'Trier et filtrer', items: [['↕', 'Trier'], ['⏷', 'Filtrer']] },
    { groupe: 'Outils de données', items: [['⫼', 'Convertir'], ['⚡', 'Remplissage instantané'], ['⊟', 'Supprimer les doublons'], ['☑', 'Validation des données', true], ['⊕', 'Consolider']] }],
  inserer: [{ groupe: 'Presse-papiers', items: [['📋', 'Coller']] },
    { groupe: 'Cellules', items: [['⊞', 'Insérer', true], ['⊟', 'Supprimer'], ['▭', 'Format']] },
    { groupe: 'Édition', items: [['Σ', 'Somme automatique'], ['⬇', 'Recopier']] }],
  recherche: [{ groupe: 'Bibliothèque de fonctions', items: [['fx', 'Insérer une fonction'], ['Σ', 'Somme automatique'], ['?', 'Logique'], ['A', 'Texte'], ['🔎', 'Recherche et référence', true], ['…', 'Plus de fonctions']] }],
};

// ── Les boîtes de dialogue (libellés Excel Windows) ──
const D_TABLEAU = (
  <Dialogue titre="Créer un tableau" className="fragment" style={{ left: 300, top: 150, width: 300 }}>
    <XLabel>Où se trouvent les données de votre tableau ?</XLabel>
    <XChamp focus>=$A$1:$D$18</XChamp>
    <XCase on>Mon tableau comporte des en-têtes</XCase>
    <XBoutons items={[['OK', true], ['Annuler']]} />
  </Dialogue>
);
const D_MFC = (
  <Dialogue titre="Nouvelle règle de mise en forme" className="fragment fade-in-then-out" style={{ left: 'calc(100% - 140px)', top: 40, width: 470 }}>
    <XLabel>Sélectionnez un type de règle :</XLabel>
    <div className="xd-liste-regles">
      <span>Mettre en forme toutes les cellules d’après leur valeur</span>
      <span>Appliquer une mise en forme uniquement aux cellules qui contiennent</span>
      <span>Appliquer une mise en forme uniquement aux valeurs rangées parmi les premières ou les dernières valeurs</span>
      <span>Appliquer une mise en forme uniquement aux valeurs au-dessus ou en dessous de la moyenne</span>
      <span>Appliquer une mise en forme uniquement aux valeurs uniques ou aux doublons</span>
      <span className="on">Utiliser une formule pour déterminer pour quelles cellules le format sera appliqué</span>
    </div>
    <XLabel>Modifier la description de la règle :</XLabel>
    <div className="xd-cadre">
      <XLabel>Appliquer une mise en forme aux valeurs pour lesquelles cette formule est vraie :</XLabel>
      <XChamp focus>=$C2="LIR"</XChamp>
      <div className="xd-apercu"><span>Aperçu :</span><span className="ap">AaBbCcYyZz</span><span className="xd-boutons" style={{ margin: 0 }}><span className="b">Format...</span></span></div>
    </div>
    <XBoutons items={[['OK', true], ['Annuler']]} />
  </Dialogue>
);
const D_VALIDATION = (
  <Dialogue titre="Validation des données" className="fragment fade-in-then-out" style={{ left: 'calc(100% - 130px)', top: 60, width: 410 }}>
    <XOnglets items={['Options', 'Message de saisie', 'Alerte d’erreur']} />
    <XLabel>Critères de validation</XLabel>
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '5px 16px', alignItems: 'center' }}>
      <XLabel>Autoriser :</XLabel><span />
      <XListe>Liste</XListe><XCase on>Ignorer si vide</XCase>
      <XLabel>Données :</XLabel><span />
      <XListe off>comprise entre</XListe><XCase on>Liste déroulante dans la cellule</XCase>
    </div>
    <XLabel>Source :</XLabel>
    <XChamp focus>=listes!$A$2:$A$12</XChamp>
    <XCase>Appliquer ces modifications aux cellules de paramètres identiques</XCase>
    <XBoutons gauche="Effacer tout" items={[['OK', true], ['Annuler']]} />
  </Dialogue>
);
const D_ALERTE = (
  <Dialogue titre="Valeur non autorisée" className="fragment" style={{ left: 150, top: 175, width: 400 }}>
    <div className="xd-alerte"><span className="ic">✕</span><span>Choisissez une valeur de la liste (onglet listes).<br /><i style={{ color: '#666' }}>Rémi vient de taper « géné. » en B3.</i></span></div>
    <XBoutons items={[['Réessayer', true], ['Annuler'], ['Aide']]} />
  </Dialogue>
);
const D_COMMUNES = (
  <div className="fragment" style={{ position: 'absolute', zIndex: 10, left: 'calc(100% - 170px)', bottom: 20, width: 340 }}>
    <Excel compact fichier={FICHIER} onglets={['saisie', 'listes', 'communes']} actif={2} cellule="A2" formule="92012" largeurs={[100, 150, 84]}
      rows={[
        ['code_commune', 'commune', 'population'].map((v) => ({ v, c: 'gras' })),
        ...COMMUNES.map(([c, n, p], i) => [{ v: c, c: i === 0 ? 'sel' : '' }, n, p]),
      ]} />
  </div>
);

const ETAPES = [
  {
    titre: 'Partir des objectifs : les en-têtes', cel: 'A1', formule: 'librairie',
    remi: 'Je commence par un joli titre en haut ?',
    delos: <>Non : tu pars des <b>4 objectifs</b> du mail. Par commune → <b>commune</b> ; labellisées → <b>label</b> ; spécialités → <b>assortiment</b> ; et la <b>librairie</b> elle-même. La population ? On ira la chercher (étape 7).</>,
    piege: <>Un <b>titre et une note au-dessus du tableau</b> : je lis la ligne 1 comme une librairie nommée « 📚 SUIVI DES… », et la ligne 3 comme une librairie sans nom.</>,
    geste: <>Ligne 1 = les en-têtes, et rien d’autre : courts, en minuscules, sans espace. Le titre va dans le nom de l’onglet (<code>saisie</code>) ou du fichier.</>,
  },
  {
    titre: 'Une ligne = une librairie', cel: 'D3', formule: 'Boulogne-Billancourt', ruban: 'Insertion', commandes: CMD.tableau, dialogue: D_TABLEAU,
    remi: 'Six librairies à Boulogne : je fusionne la ville, c’est plus aéré ?',
    delos: <>Chaque ligne doit se lire <b>toute seule</b>. On répète la commune sur chaque ligne : ça ne coûte rien, et je peux trier, filtrer, compter.</>,
    piege: <>Les <b>cellules fusionnées</b> : pour moi, seule la 1re ligne est à Boulogne, les cinq autres n’ont pas de ville. Et Excel refuse de trier.</>,
    geste: <><span className="raccourci">Ctrl + T</span> (ou Insertion › <b>Tableau</b>) › « Mon tableau comporte des en-têtes » › OK. Filtres inclus, et le tableau s’agrandit tout seul.</>,
  },
  {
    titre: 'Une case = une information', cel: 'C4', formule: 'LIR',
    remi: '« Généraliste (LIR) », c’est complet, non ?',
    delos: <>C’est <b>deux réponses à deux questions</b>. Le label a sa propre colonne. Recoller deux colonnes, Excel le fait en une formule ; redécouper un texte libre, presque jamais.</>,
    piege: <><b>Deux infos dans une case</b> : « Généraliste (LIR) », « Boulogne-Billancourt (6) »… et un comptage tapé à la main, faux dès la prochaine ligne.</>,
    geste: <>Le test : si tu écris « et », une virgule ou des parenthèses dans une case, il te manque une colonne.</>,
  },
  {
    titre: 'Rien dans la couleur', cel: 'A2', formule: 'LE COMPTOIR DE LA BD', ruban: 'Accueil', commandes: CMD.mfc, dialogue: D_MFC, dialogueLarge: 330,
    remi: 'Je peux quand même mettre en vert les labellisées ?',
    delos: <>Oui, si c’est la <b>colonne label</b> qui décide. Moi, je ne vois pas les couleurs. Le CSV et l’imprimante noir et blanc non plus.</>,
    piege: <>Le <b>vert mis à la main</b> : l’information n’existe que pour l’œil. Impossible de compter les labellisées.</>,
    geste: <>Sélectionner A2:D18 › Accueil › <b>Mise en forme conditionnelle</b> › Nouvelle règle › « Utiliser une formule… » › <code>=$C2="LIR"</code> › Format… › Remplissage vert.</>,
  },
  {
    titre: 'Des valeurs contrôlées', cel: 'B2', formule: 'BD et Mangas', ruban: 'Données', commandes: CMD.validation, dialogue: <>{D_VALIDATION}{D_ALERTE}</>, dialogueLarge: 280,
    liste: ASSORTIMENTS,
    remi: '« géné. », « Généraliste »… tout le monde comprend, non ?',
    delos: <>Pas moi : « bd », « BD + mangas » et « BD-Manga », ça me fait <b>trois spécialités</b>. Ce qui se répète se <b>choisit</b> dans une liste, ça ne se tape pas.</>,
    piege: <><b>Des valeurs écrites à la main</b> : trois orthographes pour la BD, et une colonne Visite qui mélange dates, « oui » et « à faire ».</>,
    geste: <>Un onglet <code>listes</code>, puis Données › <b>Validation des données</b> › Autoriser : Liste › Source <code>=listes!$A$2:$A$12</code>. Onglet « Alerte d’erreur » : le message affiché en cas de faute.</>,
  },
  {
    titre: 'Un identifiant', cel: 'A2', formule: 'LIB001', ruban: 'Accueil', commandes: CMD.inserer,
    remi: 'Le nom de la librairie, ça suffit pour la retrouver ?',
    delos: <>Tu as <b>deux « Anagramme »</b>, une à Meudon, une à Sèvres. Il faut une clé <b>unique, stable, sans signification</b> : LIB013 et LIB015.</>,
    piege: <><b>Pas d’identifiant</b> : Rémi a lui-même noté « même que Sèvres ? » dans ses remarques.</>,
    geste: <>Clic droit sur la colonne A › <b>Insérer</b>. Taper <code>id</code>, LIB001, LIB002, puis tirer la poignée de recopie. Jamais « Anagramme-Meudon » : si elle déménage, l’identifiant ment.</>,
  },
  {
    titre: 'Ne pas recopier : la jointure', cel: 'F2', formule: '=RECHERCHEV(E2;communes!$A:$B;2;0)', ruban: 'Formules', commandes: CMD.recherche, dialogue: D_COMMUNES, dialogueLarge: 170,
    aide: 'RECHERCHEV(valeur_cherchée; table_matrice; no_index_col; [valeur_proche])',
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
    titre: 'Je fais la synthèse', cel: 'B13', formule: '=INDEX(B5:B12;EQUIV(MAX(C5:C12);C5:C12;0))', compact: true,
    vue: { rows: SYNTH, largeurs: [210, 190, 90, 100, 130] },
    remi: 'Et les totaux, je les tape où ?',
    delos: <>Nulle part. L’onglet <b>synthese</b> ne contient que des formules : il <b>lit</b> l’onglet saisie. Une ligne de plus ? Tout se recalcule.</>,
    piege: <>Le <b>TOTAL tapé à la main</b> et le « Récap (2) » recopié : il dit 4 librairies à Issy. Il y en a 5.</>,
    geste: <>Quatre formules à connaître : <code>NBVAL</code>, <code>NB.SI</code>, <code>RECHERCHEV</code>, <code>INDEX/EQUIV</code>. Et sans formule ? Le TCD, juste après.</>,
  },
];

function Etape({ e, n }) {
  const maquette = e.vue || etapeSaisie(n);
  const onglets = ONGLETS(n);
  const largeur = maquette.largeurs.reduce((a, b) => a + b, 36);
  return (
    <section>
      <div className="planche-head">
        <span className="ep">Étape {n}/{ETAPES.length}</span>
        <h2>{e.titre}</h2>
      </div>
      <div className="row" style={{ marginBottom: 10 }}>
        <Bulle qui="remi" humeur="neutre" size={44} className="col">{e.remi}</Bulle>
        <Bulle qui="delos" humeur="content" size={44} droite className="col fragment">{e.delos}</Bulle>
      </div>
      <div style={{ display: 'flex', justifyContent: e.dialogueLarge ? 'flex-start' : 'center', paddingRight: e.dialogueLarge || 0 }}>
        <div style={{ width: largeur, maxWidth: '100%' }}>
          <Excel fichier={FICHIER} onglets={onglets} actif={n === 9 ? onglets.length - 1 : 0} cellule={e.cel} formule={e.formule}
            ruban={e.ruban || (n === 9 ? 'Formules' : 'Accueil')} commandes={e.commandes} aide={e.aide} compact={e.compact}
            largeurs={maquette.largeurs} rows={selection(maquette.rows, e.cel, e.liste ? { liste: e.liste } : {})}>
            {e.dialogue}
          </Excel>
        </div>
      </div>
      <div className="row" style={{ marginTop: 10, alignItems: 'stretch' }}>
        <div className="etape-piege col fragment">⚠️ <b>Le piège du fichier de vendredi.</b> {e.piege}</div>
        <div className="etape-tip col fragment"><div>{e.geste}</div></div>
      </div>
    </section>
  );
}

const PIVOT = [
  ['', ''],
  ['', ''],
  [{ v: 'Étiquettes de lignes ▾', c: 'pivh' }, { v: 'Nombre de id', c: 'pivh' }],
  ...SYNTHESE.filter((s) => s.n).map((s) => [s.nom, { v: s.n, c: s.nom === 'Boulogne-Billancourt' ? 'sel' : '' }]),
  [{ v: 'Total général', c: 'pivt' }, { v: LIBRAIRIES.length, c: 'pivt' }],
];

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
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', justifyContent: 'center' }}>
          <div className="fragment" style={{ width: 360, flexShrink: 0 }}>
            <p style={{ fontFamily: 'Bangers, cursive', fontSize: 19, letterSpacing: 1, marginBottom: 4 }}>① Insertion › Tableau croisé dynamique</p>
            <Dialogue titre="Tableau croisé dynamique à partir d’un tableau ou d’une plage" style={{ position: 'relative', width: '100%' }}>
              <XLabel>Sélectionnez une table ou une plage</XLabel>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span>Tableau/Plage :</span><div style={{ flex: 1 }}><XChamp focus>T_saisie</XChamp></div></div>
              <XLabel>Choisissez l’emplacement du tableau croisé dynamique</XLabel>
              <XRadio on>Nouvelle feuille de calcul</XRadio>
              <XRadio>Feuille de calcul existante</XRadio>
              <XLabel>Choisissez si vous souhaitez analyser plusieurs tables</XLabel>
              <XCase>Ajouter ces données au modèle de données</XCase>
              <XBoutons items={[['OK', true], ['Annuler']]} />
            </Dialogue>
          </div>
          <div className="fragment" style={{ width: 640, flexShrink: 0 }}>
            <p style={{ fontFamily: 'Bangers, cursive', fontSize: 19, letterSpacing: 1, marginBottom: 4 }}>② commune dans Lignes · ③ id dans Valeurs · ④ c’est compté</p>
            <Excel fichier={FICHIER} onglets={['TCD', 'saisie', 'listes', 'communes', 'synthese']} cellule="B4" formule="6"
              ruban="Analyse du tableau croisé dynamique" contexte={['Analyse du tableau croisé dynamique', 'Création']}
              largeurs={[200, 120]} rows={PIVOT}
              panneau={<PanneauTCD champs={['id', 'librairie', 'assortiment', 'label', 'code_commune', 'commune', 'annee_suivi']} coches={['id', 'commune']} lignes={['commune']} valeurs={['Nombre de id']} />} />
          </div>
        </div>
        <div className="row" style={{ marginTop: 10, alignItems: 'center' }}>
          <Bulle qui="remi" humeur="stress" size={40} className="col">INDEX, EQUIV… Il n’y a pas plus simple ?</Bulle>
          <Bulle qui="delos" humeur="content" size={40} droite className="col fragment">Le TCD : quatre clics, et c’est Excel qui compte. <code>T_saisie</code> est reconnu tout seul. Nouvelle librairie ? Clic droit › <b>Actualiser</b>.</Bulle>
        </div>
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
