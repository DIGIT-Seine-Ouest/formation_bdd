// ─── Épisode 3 : le tuto de Delos — J’ENREGISTRE, puis JE PRÉSENTE ─────────
// Partie 1 « J’enregistre » : on part de la structure posée à l’Ép. 2 (id,
// librairie, assortiment, label, commune) et on avance ensemble, étape par
// étape : question de Rémi → théorie de Delos → 📏 la règle → 💡 le geste Excel.
// Partie 2 « Je présente » : la table n’est pas présentable → j’enregistre ≠ je
// présente → l’onglet synthese → le TCD → la mise à jour se fait toute seule →
// Super Nanny a ses réponses en 10 s.
// Visuels : Excel pour Windows reconstruit en HTML, libellés Microsoft fr-FR.
import { Bulle, Case, Chapitre, Narrateur, Planche } from '../components/BD';
import {
  Dialogue, Excel, PanneauTCD, XBoutons, XCase, XChamp, XLabel, XListe, XOnglets, XRadio,
} from '../components/Excel';
import { COMMUNES, LIBRAIRIES, chiffresCles, etapeSaisie, nomCommune } from '../remi';

const FICHIER = 'correction_suivi_librairies.xlsx';
const ASSORTIMENTS = ['Généraliste', 'BD et Mangas', 'Jeunesse', 'Religion', 'Arts - Musées et Monuments', 'Mieux-être et spiritualité', 'VO', 'Imaginaire - Policier'];

// Un TCD : nombre de librairies par valeur d’une colonne, du plus grand au plus petit
const compte = (libs, cle) => {
  const m = new Map();
  libs.forEach((l) => m.set(cle(l), (m.get(cle(l)) || 0) + 1));
  return [...m.entries()].sort((x, y) => y[1] - x[1]);
};
const parCommune = (libs) => compte(libs, (l) => nomCommune(l[4]));
const LABELLISEES = LIBRAIRIES.filter((l) => l[3] === 'LIR');

// Les 3 TCD de l’onglet synthese, chacun titré par la question qu’il règle, en-têtes renommés
const TCDS = [
  { q: '① Où sont les librairies ?', cols: ['Commune', 'Nombre de librairies'], lignes: parCommune(LIBRAIRIES), total: LIBRAIRIES.length },
  { q: '② Quelles spécialités ?', cols: ['Spécialité', 'Nombre de librairies'], lignes: compte(LIBRAIRIES, (l) => l[2]), total: LIBRAIRIES.length },
  { q: '③ Où sont les labellisées ?', cols: ['Commune', 'Labellisées (LIR)'], lignes: parCommune(LABELLISEES), total: LABELLISEES.length },
];
// Les 3 chiffres clés, un au-dessus de chaque TCD (Généralistes se lit dans le TCD ②)
const KPI3 = chiffresCles().filter(([t]) => t !== 'Généralistes');

// L’onglet synthese : 3 chiffres clés en gros, puis 3 TCD côte à côte (A6, C6, E6)
function synthese() {
  const hauteur = Math.max(...TCDS.map((t) => t.lignes.length)) + 1;
  const corps = Array.from({ length: hauteur }, (_, i) => TCDS.flatMap((t) => {
    if (i < t.lignes.length) return [t.lignes[i][0], t.lignes[i][1]];
    if (i === t.lignes.length) return [{ v: 'Total', c: 'pivt' }, { v: t.total, c: 'pivt' }];
    return ['', ''];
  }));
  return [
    [{ v: 'TABLEAU DE SUIVI — LIBRAIRIES GPSO', c: 'titre', cs: 6 }, null, null, null, null, null],
    KPI3.flatMap(([t]) => [{ v: t, c: 'kpi-l', cs: 2 }, null]),
    KPI3.flatMap(([, , v]) => [{ v, c: 'kpi-v', cs: 2 }, null]),
    ['', '', '', '', '', ''],
    TCDS.flatMap((t) => [{ v: t.q, c: 'tcd-q', cs: 2 }, null]),
    TCDS.flatMap((t) => [{ v: `${t.cols[0]} ▾`, c: 'pivh' }, { v: t.cols[1], c: 'pivh' }]),
    ...corps,
  ];
}
const LARG_SYNTH = [168, 132, 118, 132, 168, 124];

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
  recherche: [{ groupe: 'Bibliothèque de fonctions', items: [['fx', 'Insérer une fonction'], ['Σ', 'Somme automatique'], ['?', 'Logique'], ['A', 'Texte'], ['🔎', 'Recherche et référence', true], ['…', 'Plus de fonctions']] }],
};

// ── Les boîtes de dialogue (libellés Excel Windows) ──
const D_TABLEAU = (
  <Dialogue titre="Créer un tableau" className="fragment" style={{ left: 330, top: 150, width: 300 }}>
    <XLabel>Où se trouvent les données de votre tableau ?</XLabel>
    <XChamp focus>=$A$1:$E$18</XChamp>
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
      <XChamp focus>=$D2="LIR"</XChamp>
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
  <Dialogue titre="Valeur non autorisée" className="fragment" style={{ left: 200, top: 175, width: 400 }}>
    <div className="xd-alerte"><span className="ic">✕</span><span>Choisissez une valeur de la liste (onglet listes).<br /><i style={{ color: '#666' }}>Rémi vient de taper « géné. » en C3.</i></span></div>
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

// ── Partie 1 : J’ENREGISTRE (étapes 1 à 8) ; l’étape 9 ouvre « je présente » ──
const ETAPES = [
  {
    titre: 'On part de la structure : les en-têtes', cel: 'A1', formule: 'id',
    remi: 'Je commence par un joli titre en haut ?',
    delos: <>Non : on part de la structure qu’on vient de poser. <b>id</b>, <b>librairie</b>, <b>assortiment</b>, <b>label</b>, <b>commune</b> : cinq en-têtes en ligne 1, et c’est tout. La population ? On ira la chercher (étape 7).</>,
    regle: <>La ligne 1 contient les en-têtes, et rien d’autre : pas de titre au-dessus, pas de ligne vide.</>,
    geste: <>Taper les 5 en-têtes en A1:E1 : courts, en minuscules, sans espace. Le titre va dans le nom de l’onglet : double-clic sur « Feuil1 » › <code>saisie</code>.</>,
  },
  {
    titre: 'Une ligne = une librairie', cel: 'E3', formule: 'Boulogne-Billancourt', ruban: 'Insertion', commandes: CMD.tableau, dialogue: D_TABLEAU,
    remi: 'Six librairies à Boulogne : je fusionne la ville, c’est plus aéré ?',
    delos: <>Chaque ligne doit se lire <b>toute seule</b>. On répète la commune sur chaque ligne : ça ne coûte rien, et je peux trier, filtrer, compter.</>,
    regle: <>Un enregistrement = une ligne complète. Jamais de cellules fusionnées : la commune est répétée.</>,
    geste: <><span className="raccourci">Ctrl + T</span> (ou Insertion › <b>Tableau</b>) › « Mon tableau comporte des en-têtes » › OK. Filtres inclus, et le tableau s’agrandit tout seul.</>,
  },
  {
    titre: 'Une case = une information', cel: 'D3', formule: 'LIR',
    remi: 'Et si j’écris « Généraliste (LIR) », c’est plus complet, non ?',
    delos: <>C’est <b>deux réponses à deux questions</b>. Le label a sa propre colonne. Recoller deux colonnes, Excel le fait en une formule ; redécouper un texte libre, presque jamais.</>,
    regle: <>Une valeur par case. Si on a envie d’écrire « et », une virgule ou des parenthèses, il manque une colonne.</>,
    geste: <>Chaque information dans sa colonne : « Généraliste » en <code>assortiment</code>, « LIR » en <code>label</code>. Pour les recoller à l’affichage : <code>=C3&amp;" ("&amp;D3&amp;")"</code>.</>,
  },
  {
    titre: 'Rien dans la couleur', cel: 'A2', formule: 'LIB002', ruban: 'Accueil', commandes: CMD.mfc, dialogue: D_MFC, dialogueLarge: 330,
    remi: 'Je peux quand même mettre en vert les labellisées ?',
    delos: <>Oui, si c’est la <b>colonne label</b> qui décide. Moi, je ne vois pas les couleurs. Le CSV et l’imprimante noir et blanc non plus.</>,
    regle: <>Une information ne vit jamais dans une couleur : la couleur se calcule à partir d’une colonne.</>,
    geste: <>Sélectionner A2:E18 › Accueil › <b>Mise en forme conditionnelle</b> › Nouvelle règle › « Utiliser une formule… » › <code>=$D2="LIR"</code> › Format… › Remplissage vert.</>,
  },
  {
    titre: 'Des valeurs contrôlées', cel: 'C2', formule: 'Religion', ruban: 'Données', commandes: CMD.validation, dialogue: <>{D_VALIDATION}{D_ALERTE}</>, dialogueLarge: 280,
    liste: ASSORTIMENTS,
    remi: '« géné. », « Généraliste »… tout le monde comprend, non ?',
    delos: <>Pas moi : « bd », « BD + mangas » et « BD-Manga », ça me fait <b>trois spécialités</b>. Ce qui se répète se <b>choisit</b> dans une liste, ça ne se tape pas.</>,
    regle: <>Ce qui se répète se choisit dans une liste fermée : une seule orthographe, et des comptages justes.</>,
    geste: <>Un onglet <code>listes</code>, puis Données › <b>Validation des données</b> › Autoriser : Liste › Source <code>=listes!$A$2:$A$12</code>. Onglet « Alerte d’erreur » : le message affiché en cas de faute.</>,
  },
  {
    titre: 'Un identifiant vraiment unique', cel: 'A2', formule: 'LIB002', ruban: 'Accueil', commandes: CMD.mfc,
    remi: 'Les id, c’est vraiment utile ? Le nom suffit, non ?',
    delos: <>Tu as <b>deux « Anagramme »</b>, une à Meudon, une à Sèvres. Sans clé, je ne sais pas laquelle tu modifies. LIB013 et LIB015 : <b>unique, stable, sans signification</b>.</>,
    regle: <>Un identifiant par ligne, qui ne change jamais. Jamais « Anagramme-Meudon » : si elle déménage, l’identifiant ment.</>,
    geste: <>Vérifier : sélectionner la colonne A › Accueil › Mise en forme conditionnelle › Règles de mise en surbrillance des cellules › <b>Valeurs en double</b>. Rien ne s’allume ? Chaque id est unique.</>,
  },
  {
    titre: 'Ne pas recopier : la jointure', cel: 'F2', formule: '=RECHERCHEV(E2;communes!$A:$B;2;0)', ruban: 'Formules', commandes: CMD.recherche, dialogue: D_COMMUNES, dialogueLarge: 170,
    aide: 'RECHERCHEV(valeur_cherchée; table_matrice; no_index_col; [valeur_proche])',
    remi: 'Et la population, pour les 10 000 habitants, je la recopie ?',
    delos: <>Surtout pas. Les collègues tiennent la table <b>communes</b> à jour. Tu saisis le <b>code commune</b>, tu <b>récupères</b> le nom ; la synthèse ira y lire la population.</>,
    regle: <>Ce qui existe ailleurs se récupère, ne se recopie pas : on saisit le code, Excel va chercher le reste.</>,
    geste: <><code>=RECHERCHEV(E2;communes!$A:$B;2;0)</code> : quoi je cherche ; où ; quelle colonne je renvoie ; 0 = exactement. code_commune au format <b>Texte</b>.</>,
  },
  {
    titre: 'Le temps est une colonne', cel: 'G2', formule: '2026',
    remi: 'Et l’an prochain, je crée un onglet « 2027 » ?',
    delos: <>Non : des <b>lignes en plus</b>, avec une colonne <b>annee_suivi</b>. Un seul tableau, et la présentation compare les années toute seule.</>,
    regle: <>Le temps est une colonne : des lignes en plus chaque année, jamais un onglet par année.</>,
    geste: <>Une colonne <code>annee_suivi</code> = 2026. En 2027, on colle les nouvelles lignes sous le tableau : il s’agrandit tout seul.</>,
  },
  {
    titre: 'Je présente : l’onglet synthese', cel: 'C3', formule: '=NB.SI(saisie!D:D;"LIR")', compact: true,
    vue: { rows: synthese(), largeurs: LARG_SYNTH },
    remi: 'Ici, j’ai le droit aux couleurs et aux titres ?',
    delos: <>Oui : c’est l’onglet pour <b>l’œil</b>. Trois chiffres en gros, et trois TCD qui répondent chacun à <b>une question</b>. Tout est calculé, rien n’est tapé.</>,
    regle: <>Présenter, c’est calculer… et parler la langue de ceux qui lisent : « Nombre de librairies », jamais « Nombre de id ».</>,
    geste: <>Les chiffres : <code>=NBVAL(saisie!A:A)-1</code> et <code>=NB.SI(saisie!D:D;"LIR")</code>. Les TCD : un titre en forme de question au-dessus, des en-têtes renommés.</>,
  },
];

function Etape({ e, n }) {
  const maquette = e.vue || etapeSaisie(n);
  const onglets = ONGLETS(n);
  const largeur = maquette.largeurs.reduce((a, b) => a + b, 36);
  return (
    <section>
      <div className="planche-head">
        <span className="ep">{n <= 8 ? `J’enregistre · ${n}/8` : 'Je présente'}</span>
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
        <div className="etape-regle col fragment">📏 <b>La règle.</b> {e.regle}</div>
        <div className="etape-tip col fragment"><div>{e.geste}</div></div>
      </div>
    </section>
  );
}

// ── Partie 2 : JE PRÉSENTE ──
function PasPresentable() {
  const brut = etapeSaisie(8);
  return (
    <section>
      <div className="planche-head">
        <span className="ep">Je présente</span>
        <h2>J’ai enregistré. Maintenant, je présente… ça ?</h2>
      </div>
      <div className="row" style={{ marginBottom: 10 }}>
        <Bulle qui="remi" humeur="content" size={46} className="col">Tout est enregistré ! Pour la Direction de la Culture, j’envoie l’onglet saisie ?</Bulle>
        <Bulle qui="delos" humeur="surpris" size={46} droite className="col fragment">Tel quel ? Des codes, des majuscules, pas un total, pas un graphique. C’est parfait pour <b>enregistrer</b>. Pas pour <b>présenter</b>.</Bulle>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: brut.largeurs.reduce((a, b) => a + b, 36), maxWidth: '100%', position: 'relative' }}>
          <Excel fichier={FICHIER} onglets={['saisie', 'listes', 'communes']} cellule="A1" formule="id" largeurs={brut.largeurs}
            rows={brut.rows.map((r) => r.map((c) => (typeof c === 'object' && c !== null ? { ...c, c: (c.c || '').replace('neuf', '') } : c)))} />
          <div className="tampon fragment">Pas présentable</div>
        </div>
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <Bulle qui="remi" humeur="stress" size={44} className="col fragment">Alors j’ajoute des couleurs, un titre et un total en bas ?</Bulle>
        <Bulle qui="delos" humeur="content" size={44} droite className="col fragment">Surtout pas ici : tu casserais tout ce qu’on vient de construire. On présente <b>à part</b>, dans un autre onglet.</Bulle>
      </div>
    </section>
  );
}

function Retenir() {
  return (
    <section>
      <Planche ep="Ép. 3" titre="La chose à retenir : j’enregistre ≠ je présente">
        <div className="row" style={{ marginBottom: 14 }}>
          <Bulle qui="remi" humeur="neutre" size={50} className="col">Deux onglets pour les mêmes données ?</Bulle>
          <Bulle qui="delos" humeur="content" size={50} droite className="col fragment">Deux usages. Ta liste de courses, tu l’<b>enregistres</b>. Le ticket de caisse <b>présente</b> le total. Personne ne recopie son ticket au bas de sa liste.</Bulle>
        </div>
        <Case className="fragment">
          <table className="logiques">
            <thead><tr><th /><th style={{ color: 'var(--blue)' }}>✍️ J’enregistre</th><th style={{ color: 'var(--green-dark)' }}>📊 Je présente</th></tr></thead>
            <tbody>
              <tr><td>Principe</td><td>1 fait = 1 ligne, brute</td><td>une vue calculée, mise en forme</td></tr>
              <tr><td>Pour qui ?</td><td>la machine : pas de couleur, pas de total</td><td>l’œil : titres, couleurs, totaux, graphiques</td></tr>
              <tr><td>Les courses</td><td>la liste</td><td>le ticket de caisse</td></tr>
              <tr><td>Chez Rémi</td><td>l’onglet <code>saisie</code></td><td>l’onglet <code>synthese</code> et le TCD</td></tr>
            </tbody>
          </table>
        </Case>
        <div className="fragment" style={{ marginTop: 18, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'var(--ink)', color: '#fff', borderRadius: 8, padding: '12px 24px', fontFamily: '"IBM Plex Serif", serif', fontSize: 24, boxShadow: '6px 6px 0 var(--yellow)' }}>
            Soignez l’enregistrement, la présentation suit toute seule.
          </div>
        </div>
      </Planche>
    </section>
  );
}

const PIVOT = [
  [{ v: 'Commune ▾', c: 'pivh' }, { v: 'Nombre de librairies', c: 'pivh sel' }],
  ...parCommune(LIBRAIRIES).map(([nom, n]) => [nom, n]),
  [{ v: 'Total', c: 'pivt' }, { v: LIBRAIRIES.length, c: 'pivt' }],
];
const D_RENOMMER = (
  <Dialogue titre="Paramètres des champs de valeurs" className="fragment" style={{ left: 30, top: 70, width: 330 }}>
    <XLabel>Nom de la source : id</XLabel>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span>Nom personnalisé :</span><div style={{ flex: 1 }}><XChamp focus>Nombre de librairies</XChamp></div></div>
    <XOnglets items={['Synthèse des valeurs par', 'Afficher les valeurs']} />
    <XLabel>Résumer le champ de valeur par :</XLabel>
    <XListe>Nombre</XListe>
    <XBoutons items={[['OK', true], ['Annuler']]} />
  </Dialogue>
);

function TCD() {
  return (
    <section>
      <div className="planche-head">
        <span className="ep">Je présente</span>
        <h2>Sans formule : le tableau croisé dynamique</h2>
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', justifyContent: 'center' }}>
        <div className="fragment" style={{ width: 360, flexShrink: 0 }}>
          <p style={{ fontFamily: 'Bangers, cursive', fontSize: 19, letterSpacing: 1, marginBottom: 4 }}>① Insertion › Tableau croisé dynamique</p>
          <Dialogue titre="Tableau croisé dynamique à partir d’un tableau ou d’une plage" style={{ position: 'relative', width: '100%' }}>
            <XLabel>Sélectionnez une table ou une plage</XLabel>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span>Tableau/Plage :</span><div style={{ flex: 1 }}><XChamp focus>T_saisie</XChamp></div></div>
            <XLabel>Choisissez l’emplacement du tableau croisé dynamique</XLabel>
            <XRadio>Nouvelle feuille de calcul</XRadio>
            <XRadio on>Feuille de calcul existante</XRadio>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span>Emplacement :</span><div style={{ flex: 1 }}><XChamp>synthese!$A$6</XChamp></div></div>
            <XLabel>Choisissez si vous souhaitez analyser plusieurs tables</XLabel>
            <XCase>Ajouter ces données au modèle de données</XCase>
            <XBoutons items={[['OK', true], ['Annuler']]} />
          </Dialogue>
        </div>
        <div className="fragment" style={{ width: 640, flexShrink: 0 }}>
          <p style={{ fontFamily: 'Bangers, cursive', fontSize: 19, letterSpacing: 1, marginBottom: 4 }}>② commune dans Lignes · ③ id dans Valeurs · ④ on renomme</p>
          <Excel fichier={FICHIER} onglets={['saisie', 'listes', 'communes', 'synthese']} actif={3} cellule="B6" formule="Nombre de librairies" debut={6}
            ruban="Analyse du tableau croisé dynamique" contexte={['Analyse du tableau croisé dynamique', 'Création']}
            largeurs={[200, 150]} rows={PIVOT}
            panneau={<PanneauTCD champs={['id', 'librairie', 'assortiment', 'label', 'code_commune', 'commune', 'annee_suivi']} coches={['id', 'commune']} lignes={['commune']} valeurs={['Nombre de librairies']} />}>
            {D_RENOMMER}
          </Excel>
        </div>
      </div>
      <div className="row" style={{ marginTop: 10, alignItems: 'center' }}>
        <Bulle qui="remi" humeur="stress" size={40} className="col">Et pour compter par commune, je fais une formule par commune ?</Bulle>
        <Bulle qui="delos" humeur="content" size={40} droite className="col fragment">Le TCD : quatre clics, et c’est Excel qui compte. Puis on renomme : « Nombre de id » ne parle à personne, « Nombre de librairies » à tout le monde.</Bulle>
      </div>
    </section>
  );
}

// La mise à jour, en une planche : une librairie ouvre → une ligne → Actualiser → c’est à jour.
const AJOUT = ['LIB018', 'NOUVELLE LIBRAIRIE (exemple)', 'Généraliste', 'aucun', '92075'];
const LIGNES_FIN = [
  ...LIBRAIRIES.slice(15).map(([id, nom, a, l, code]) => [id, nom, a, l, { v: code, c: 'bleu' }, { v: nomCommune(code), c: 'calc' }]),
  [...AJOUT.map((v, i) => ({ v, c: `neuf${i === 0 ? ' sel' : ''}${i === 4 ? ' bleu' : ''}` })), { v: 'Vanves', c: 'neuf calc' }],
];

function Avant({ de, a }) {
  return (
    <span style={{ fontFamily: 'Bangers, cursive', letterSpacing: 1 }}>
      <span style={{ color: 'var(--muted)', textDecoration: 'line-through' }}>{de}</span> → <span style={{ color: 'var(--green-dark)' }}>{a}</span>
    </span>
  );
}

function MiseAJour() {
  const vanves = (libs) => libs.filter((l) => l[4] === '92075').length;
  return (
    <section>
      <Planche ep="Ép. 3" titre="Mardi, 14 h 02 : une librairie ouvre">
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.35fr 0.9fr', gap: 16, alignItems: 'stretch' }}>
          <Case recit="14 h 02">
            <Bulle qui="nanny" humeur="stress" size={58}>Rémi ! Une librairie vient d’ouvrir à Vanves <i>(exemple)</i>. Il faut tout refaire pour la réunion de 15 h ?</Bulle>
          </Case>
          <Case recit="① J’enregistre" ton="blue" className="fragment">
            <Bulle qui="remi" humeur="content" size={46}>Non : j’ajoute <b>une ligne</b> dans saisie.</Bulle>
            <div style={{ marginTop: 12 }}>
              <Excel compact fichier={FICHIER} onglets={['saisie', 'listes', 'communes', 'synthese']} cellule="A19" formule="LIB018"
                entetes={['id', 'librairie', 'assortiment', 'label', 'code_commune', 'commune']}
                largeurs={[56, 196, 86, 44, 92, 84]} debut={17} rows={LIGNES_FIN} />
            </div>
          </Case>
          <Case recit="② Je présente" ton="good" className="fragment">
            <Bulle qui="remi" humeur="content" size={46}>Clic droit › <b>Actualiser</b>.</Bulle>
            <div style={{ textAlign: 'center', marginTop: 14 }}>
              <p className="small muted">Librairies suivies</p>
              <p style={{ fontSize: 46, lineHeight: 1.1 }}><Avant de={LIBRAIRIES.length} a={LIBRAIRIES.length + 1} /></p>
              <p className="small muted" style={{ marginTop: 6 }}>Vanves dans le TCD</p>
              <p style={{ fontSize: 34, lineHeight: 1.1 }}><Avant de={vanves(LIBRAIRIES)} a={vanves([...LIBRAIRIES, AJOUT])} /></p>
              <p className="sfx" style={{ fontSize: 34, marginTop: 10 }}>14 h 03 !</p>
            </div>
          </Case>
        </div>
        <div className="row fragment" style={{ marginTop: 18, alignItems: 'center' }}>
          <Bulle qui="nanny" humeur="surpris" size={52} className="col">Déjà ?!</Bulle>
          <Narrateur className="col" style={{ flex: 2.4 }}>
            J’enregistre une ligne, la présentation suit toute seule. Et l’an prochain ? Les lignes 2027 sous le tableau, et c’est tout.
          </Narrateur>
        </div>
      </Planche>
    </section>
  );
}

export function Ep3Tuto() {
  return (
    <>
      <Chapitre fond="#0f4c75" ep="Épisode 3" titre="Le tuto de Delos" sous="On part de la structure, et on avance ensemble : d’abord j’enregistre, ensuite je présente." promesse="⏱ Gagner du temps" />

      {ETAPES.slice(0, 8).map((e, i) => <Etape key={e.titre} e={e} n={i + 1} />)}

      <PasPresentable />
      <Retenir />
      <Etape e={ETAPES[8]} n={9} />
      <TCD />
      <MiseAJour />
    </>
  );
}
