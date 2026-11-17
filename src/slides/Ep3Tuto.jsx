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
import { COMMUNES, LIBRAIRIES, QUESTIONS, chiffresCles, etapeSaisie, nomCommune } from '../remi';

const FICHIER = 'correction_suivi_librairies.xlsx';
const ASSORTIMENTS = ['Généraliste', 'BD et Mangas', 'Jeunesse', 'Religion', 'Arts - Musées et Monuments', 'Mieux-être et spiritualité', 'VO', 'Imaginaire - Policier'];

// Le TCD : nombre de librairies par commune, du plus grand au plus petit
function pivot(libs) {
  return COMMUNES.map(([code, nom]) => [nom, libs.filter((l) => l[4] === code).length])
    .filter(([, n]) => n > 0)
    .sort((x, y) => y[1] - x[1]);
}

// L’onglet synthese : 4 chiffres clés en gros (formules simples), le TCD en dessous (A5).
// ajout = une librairie de plus dans saisie : ce qui change est marqué « neuf ».
function synthese({ ajout } = {}) {
  const libs = ajout ? [...LIBRAIRIES, ajout] : LIBRAIRIES;
  const avant = chiffresCles();
  const kpi = chiffresCles(libs);
  const avantTcd = Object.fromEntries(pivot(LIBRAIRIES));
  return [
    [{ v: 'TABLEAU DE SUIVI — LIBRAIRIES GPSO', c: 'titre', cs: 4 }, null, null, null],
    kpi.map(([t]) => ({ v: t, c: 'kpi-l' })),
    kpi.map(([, , v], i) => ({ v, c: `kpi-v${v !== avant[i][2] ? ' neuf' : ''}` })),
    ['', '', '', ''],
    [{ v: 'Étiquettes de lignes ▾', c: 'pivh' }, { v: 'Nombre de id', c: 'pivh' }, '', ''],
    ...pivot(libs).map(([nom, n]) => [nom, { v: n, c: n !== avantTcd[nom] ? 'neuf' : '' }, '', '']),
    [{ v: 'Total général', c: 'pivt' }, { v: libs.length, c: 'pivt' }, '', ''],
  ];
}
const LARG_SYNTH = [220, 200, 200, 200];

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
    titre: 'Je présente : l’onglet synthese', cel: 'B3', formule: '=NB.SI(saisie!D:D;"LIR")', compact: true,
    vue: { rows: synthese(), largeurs: LARG_SYNTH },
    remi: 'Ici, j’ai le droit aux couleurs et aux titres ?',
    delos: <>Oui : c’est l’onglet pour <b>l’œil</b>. Quatre chiffres en gros, un TCD en dessous. Tout est <b>calculé</b>, rien n’est tapé.</>,
    regle: <>Présenter, c’est calculer : on lit l’onglet saisie, on ne recopie rien.</>,
    geste: <><code>=NBVAL(saisie!A:A)-1</code> compte les librairies, <code>=NB.SI(saisie!D:D;"LIR")</code> compte les labellisées. C’est tout.</>,
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
  [{ v: 'Étiquettes de lignes ▾', c: 'pivh' }, { v: 'Nombre de id', c: 'pivh' }],
  ...pivot(LIBRAIRIES).map(([nom, n], i) => [nom, { v: n, c: i === 0 ? 'sel' : '' }]),
  [{ v: 'Total général', c: 'pivt' }, { v: LIBRAIRIES.length, c: 'pivt' }],
];

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
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span>Emplacement :</span><div style={{ flex: 1 }}><XChamp>synthese!$A$5</XChamp></div></div>
            <XLabel>Choisissez si vous souhaitez analyser plusieurs tables</XLabel>
            <XCase>Ajouter ces données au modèle de données</XCase>
            <XBoutons items={[['OK', true], ['Annuler']]} />
          </Dialogue>
        </div>
        <div className="fragment" style={{ width: 640, flexShrink: 0 }}>
          <p style={{ fontFamily: 'Bangers, cursive', fontSize: 19, letterSpacing: 1, marginBottom: 4 }}>② commune dans Lignes · ③ id dans Valeurs · ④ trié : Q1 se lit en haut</p>
          <Excel fichier={FICHIER} onglets={['saisie', 'listes', 'communes', 'synthese']} actif={3} cellule="B6" formule="6" debut={5}
            ruban="Analyse du tableau croisé dynamique" contexte={['Analyse du tableau croisé dynamique', 'Création']}
            largeurs={[200, 120]} rows={PIVOT}
            panneau={<PanneauTCD champs={['id', 'librairie', 'assortiment', 'label', 'code_commune', 'commune', 'annee_suivi']} coches={['id', 'commune']} lignes={['commune']} valeurs={['Nombre de id']} />} />
        </div>
      </div>
      <div className="row" style={{ marginTop: 10, alignItems: 'center' }}>
        <Bulle qui="remi" humeur="stress" size={40} className="col">Et pour compter par commune, je fais une formule par commune ?</Bulle>
        <Bulle qui="delos" humeur="content" size={40} droite className="col fragment">Le TCD : quatre clics, et c’est Excel qui compte. On le pose sous les chiffres, dans synthese. Il ne marche que sur une table propre… comme la tienne.</Bulle>
      </div>
    </section>
  );
}

// La démonstration : une ligne de plus dans saisie, la présentation suit toute seule
const AJOUT = ['LIB018', 'NOUVELLE LIBRAIRIE (exemple)', 'Généraliste', 'aucun', '92075'];
const SAISIE_FIN = [
  ...LIBRAIRIES.slice(14).map(([id, nom, a, l, code]) => [id, nom, a, l, { v: code, c: 'bleu' }, { v: nomCommune(code), c: 'calc' }, 2026]),
  [{ v: AJOUT[0], c: 'neuf sel' }, { v: AJOUT[1], c: 'neuf' }, { v: AJOUT[2], c: 'neuf' }, { v: AJOUT[3], c: 'neuf' }, { v: AJOUT[4], c: 'neuf bleu' }, { v: 'Vanves', c: 'neuf calc' }, { v: 2026, c: 'neuf' }],
];

function MiseAJour() {
  return (
    <section>
      <div className="planche-head">
        <span className="ep">Je présente</span>
        <h2>La mise à jour se fait toute seule</h2>
      </div>
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div className="stack" style={{ width: 300, flexShrink: 0, gap: 12 }}>
          <Bulle qui="remi" humeur="stress" size={44}>Une librairie ouvre à Vanves <i>(exemple)</i>. Je refais toute ma présentation ?</Bulle>
          <Bulle qui="delos" humeur="content" size={44} droite className="fragment">Tu ajoutes <b>une ligne</b> dans saisie. C’est tout.</Bulle>
          <Bulle qui="remi" humeur="surpris" size={44} className="fragment">… 17 → 18, Vanves 1 → 2. Tout seul ?!</Bulle>
          <div className="fragment" style={{ background: 'var(--ink)', color: '#fff', borderRadius: 8, padding: '10px 14px', fontFamily: '"IBM Plex Serif", serif', fontSize: 18, boxShadow: '5px 5px 0 var(--yellow)' }}>
            Enregistrer d’un côté, présenter de l’autre : chaque mise à jour se propage toute seule. Le TCD ? Clic droit › Actualiser.
          </div>
        </div>
        <div className="col stack" style={{ gap: 10, minWidth: 0 }}>
          <Excel compact fichier={FICHIER} onglets={['saisie', 'listes', 'communes', 'synthese']} cellule="A19" formule="LIB018"
            entetes={['id', 'librairie', 'assortiment', 'label', 'code_commune', 'commune', 'annee_suivi']}
            largeurs={[60, 200, 92, 46, 92, 112, 76]} debut={16} rows={SAISIE_FIN} />
          <div className="fragment">
            <Excel compact fichier={FICHIER} onglets={['saisie', 'listes', 'communes', 'synthese']} actif={3} cellule="A3" formule="=NBVAL(saisie!A:A)-1"
              largeurs={[170, 150, 150, 160]} rows={synthese({ ajout: AJOUT })} />
          </div>
        </div>
      </div>
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

      <section>
        <Planche ep="Ép. 3" titre="Mardi, 14 h 02 : les questions arrivent">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1.1fr', gap: 18 }}>
            <Case>
              <Bulle qui="nanny" humeur="stress" size={60}>Rémi ! Pour la réunion de 15 h, <b>tout de suite</b> : {QUESTIONS.map(([q, t]) => <span key={q} style={{ display: 'block', fontSize: 15, marginTop: 4 }}>{q} · {t}</span>)}</Bulle>
            </Case>
            <Case className="fragment center">
              <Bulle qui="remi" humeur="content" size={60}>Q1 : {pivot(LIBRAIRIES)[0][0].split('-')[0]}, {pivot(LIBRAIRIES)[0][1]}. Q2 : {chiffresCles()[1][2]}. Q3 : {chiffresCles()[3][2]}.</Bulle>
              <p className="sfx" style={{ fontSize: 46, marginTop: 14 }}>10 secondes !</p>
            </Case>
            <Case className="fragment">
              <Bulle qui="nanny" humeur="surpris" size={60}>Déjà ?!</Bulle>
              <div style={{ height: 12 }} />
              <Bulle qui="delos" humeur="content" size={60} droite>Tout était déjà calculé dans synthese. Rémi n’a eu qu’à lire : en haut les chiffres, en dessous le TCD.</Bulle>
            </Case>
          </div>
          <Narrateur className="fragment" style={{ marginTop: 22 }}>
            Enregistré proprement, présenté à part : 10 secondes pour répondre. Et l’an prochain, Rémi colle ses lignes 2027 sous le tableau : la présentation se met à jour toute seule.
          </Narrateur>
        </Planche>
      </section>
    </>
  );
}
