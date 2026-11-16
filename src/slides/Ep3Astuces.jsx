// ─── Épisode 3 : les astuces de Rémi, du plus évident au plus subtil ────────
// Une planche = une galère (question de Claire / lecture de la Machine)
//              + une astuce (avant → après) + un commentaire + le temps gagné.
import { Bulle, Case, Chapitre, Mini, Narrateur, Planche } from '../components/BD';
import { ExcelDonnee } from '../components/Fichiers';
import { SOURCE_URL } from '../data';

const NIVEAU = { 1: ['n1', '🟢 Évident'], 2: ['n2', '🟡 Moins évident'], 3: ['n3', '🔴 Subtil'] };

const ASTUCES = [
  {
    niv: 1, titre: 'Une ligne = une librairie',
    galere: [['claire', 'stress', 'Combien de librairies à Issy ?'],
      ['machine', 'surpris', 'Lignes 12 à 15 : colonne Ville <b>vide</b>. Ligne 21 : <b>TOTAL</b>, c’est une librairie ?']],
    avant: { cols: ['Ville', 'Librairie'], rows: [['Issy-les-M. (5)', 'Chantelivre'], [{ v: '', c: 'vide' }, 'Gutenberg'], [{ v: '', c: 'vide' }, 'Nati'], [{ v: 'TOTAL', c: 'hl-bad' }, { v: '17 librairies', c: 'hl-bad' }]] },
    apres: { cols: ['librairie', 'commune'], rows: [['CHANTELIVRE', 'Issy-les-Moulineaux'], ['GUTENBERG', { v: 'Issy-les-Moulineaux', c: 'hl-good' }], ['NATI', { v: 'Issy-les-Moulineaux', c: 'hl-good' }]] },
    comment: 'Chaque ligne se lit seule, complète. Pas de cellule fusionnée, pas de ligne vide, pas de titre dans le tableau (il va dans le nom de l’onglet), pas de total : le total, la Machine le calcule.',
    gain: 'Filtrer « Issy » : 2 secondes',
  },
  {
    niv: 1, titre: 'Rien dans la couleur',
    galere: [['claire', 'stress', 'Combien de labellisées ?'],
      ['machine', 'surpris', 'Du vert ? <b>Je ne lis pas les couleurs.</b> Et à l’export CSV, elles disparaissent.']],
    avant: { cols: ['Librairie'], rows: [[{ v: 'Les Mots Et Les Choses', c: 'vert' }], ['Les Curieux'], [{ v: 'Le Livre Et La Tortue', c: 'vert' }]] },
    apres: { cols: ['librairie', 'label'], rows: [['LES MOTS ET LES CHOSES', { v: 'LIR', c: 'hl-good' }], ['LES CURIEUX', 'aucun'], ['LE LIVRE ET LA TORTUE', { v: 'LIR', c: 'hl-good' }]] },
    comment: 'Si c’est une information, c’est une colonne. La couleur pourra revenir ensuite, calculée par Excel à partir de cette colonne (mise en forme conditionnelle) : elle redevient ce qu’elle est, une vue.',
    gain: 'Compter les labellisées : 1 filtre',
  },
  {
    niv: 2, titre: 'Une case = une seule information',
    galere: [['claire', 'surpris', 'Et la carte, alors ?'],
      ['machine', 'surpris', '« Boulogne-Billancourt (6) » : ni une commune, ni un nombre. <b>Les deux collés.</b>']],
    avant: { cols: ['Ville', 'Adresse (exemple)'], rows: [[{ v: 'Boulogne-B. (6)', c: 'hl-bad' }, { v: '12 bis Grande Rue 92310 Sèvres', c: 'hl-bad' }]] },
    apres: { cols: ['num', 'rep', 'voie', 'code_postal', 'commune'], rows: [['12', 'bis', 'Grande Rue', '92310', 'Sèvres']] },
    comment: 'C’est l’atomicité : on découpe jusqu’à la plus petite information utile. Recoller des colonnes, Excel le fait en une formule (=CONCAT). Redécouper un texte libre, presque jamais proprement.',
    gain: 'Une adresse découpée se géolocalise toute seule',
  },
  {
    niv: 2, titre: 'Des valeurs contrôlées',
    galere: [['claire', 'stress', 'Et les librairies BD ?'],
      ['machine', 'surpris', '« BD / Mangas » : 1. « bd » : 1. « BD-Manga » : 1. Pour moi, <b>3 choses différentes</b>.']],
    avant: { cols: ['Spécialité'], rows: [[{ v: 'BD / Mangas', c: 'hl-bad' }], [{ v: 'bd', c: 'hl-bad' }], [{ v: 'BD-Manga', c: 'hl-bad' }], ['Géné.'], ['généraliste']] },
    apres: { cols: ['assortiment ▼'], rows: [[{ v: 'BD et Mangas', c: 'hl-good' }], [{ v: 'BD et Mangas', c: 'hl-good' }], [{ v: 'BD et Mangas', c: 'hl-good' }], ['Généraliste'], ['Généraliste']] },
    comment: 'Pour la Machine, « bd » et « BD » ne sont pas la même chose. Une liste déroulante impose la même orthographe à tous. Même logique pour les types : une date est une date, un nombre est un nombre. Jamais « env. 30 » ni « voir Paul ».',
    gain: '30 s pour créer la liste, 30 min de nettoyage évitées par an',
  },
  {
    niv: 2, titre: 'Des codes officiels',
    galere: [['machine', 'surpris', '« Boulogne », « Boulogne Billancourt », « BOULOGNE-BILLANCOURT »… <b>Même ville ?</b>'],
      ['remi', 'stress', 'Et pour croiser avec les chiffres de l’INSEE, je fais comment ?']],
    avant: { cols: ['commune'], rows: [[{ v: 'Boulogne', c: 'hl-bad' }], [{ v: 'Boulogne Billancourt', c: 'hl-bad' }], [{ v: 'BOULOGNE-BILLANCOURT', c: 'hl-bad' }]] },
    apres: { cols: ['commune', 'code_commune'], rows: [['Boulogne-Billancourt', { v: '92012', c: 'hl-good' }], ['Boulogne-Billancourt', { v: '92012', c: 'hl-good' }], ['Boulogne-Billancourt', { v: '92012', c: 'hl-good' }]] },
    comment: 'Un nom s’écrit de dix façons, un code d’une seule. Code INSEE pour une commune, SIRET pour un établissement, RNA pour une association : ce sont les clés pour croiser et cartographier. ⚠️ Excel change 01004 en 1004 : mettez la colonne au format Texte.',
    gain: 'La carte se dessine à partir du code',
  },
  {
    niv: 3, titre: 'Le temps est une colonne',
    galere: [['claire', 'stress', 'Un an plus tard : « Combien d’ouvertures et de fermetures depuis l’an dernier ? »'],
      ['machine', 'surpris', 'Onglet « Suivi 2026 », onglet « Suivi 2027 », colonnes différentes… <b>Je ne sais pas comparer.</b>']],
    avant: { cols: ['Onglets du fichier'], rows: [[{ v: 'Suivi 2026', c: 'hl-bad' }], [{ v: 'Suivi 2027', c: 'hl-bad' }], [{ v: 'Suivi 2027 (2) - copie', c: 'hl-bad' }]] },
    apres: { cols: ['id', 'librairie', 'annee_suivi'], rows: [['LIB007', 'LIBRAIRIE DE LA POINTE', '2026'], [{ v: 'LIB007', c: 'hl-good' }, 'LIBRAIRIE DE LA POINTE', { v: '2027', c: 'hl-good' }], [{ v: 'LIB018', c: 'hl-good' }, '(nouvelle librairie)', { v: '2027', c: 'hl-good' }]] },
    comment: 'L’année suivante, on ajoute des lignes en dessous. Jamais un onglet, jamais une colonne. Et chaque librairie garde son identifiant d’une année sur l’autre : c’est lui qui dit qui a ouvert, qui a fermé.',
    gain: 'Ouvertures / fermetures : on compare les id',
  },
  {
    niv: 3, titre: 'Un dictionnaire des données',
    galere: [['claire', 'surpris', 'Rémi est en congés… « LR », c’est quoi ? Et « annee_suivi », c’est l’année de quoi ?'],
      ['machine', 'neutre', 'Je lis les valeurs. <b>Mais qui dit ce qu’elles veulent dire ?</b>']],
    avant: { cols: ['Documentation'], rows: [[{ v: '(tout est dans la tête de Rémi)', c: 'hl-bad' }]] },
    apres: { cols: ['colonne', 'signification', 'valeurs'], rows: [['label', 'label du ministère', 'LIR · LR · aucun'], ['code_commune', 'code INSEE', '5 caractères, texte'], ['annee_suivi', 'année du relevé', 'AAAA']] },
    comment: 'Un onglet « dictionnaire » : une ligne par colonne, ce qu’elle contient, les valeurs permises. Le test : un collègue peut-il alimenter le fichier l’an prochain sans vous appeler ? C’est aussi la première chose que la DIGIT demande pour publier.',
    gain: 'Le fichier survit à votre absence',
  },
];

function AstuceSlide({ a, n }) {
  const [cls, lib] = NIVEAU[a.niv];
  return (
    <section>
      <div className="planche-head">
        <span className="ep">Astuce {n}/{ASTUCES.length}</span>
        <span className={`niveau ${cls}`}>{lib}</span>
        <h2>{a.titre}</h2>
      </div>
      <div className="row">
        <Case recit="La galère" ton="bad" className="col">
          {a.galere.map(([qui, h, txt], i) => (
            <Bulle key={i} qui={qui} humeur={h} size={54} droite={i % 2 === 1}><span dangerouslySetInnerHTML={{ __html: txt }} /></Bulle>
          ))}
        </Case>
        <Case recit="💡 L’astuce" ton="good" className="col fragment">
          <span className="tag-avant">Avant</span>
          <Mini {...a.avant} />
          <div className="fleche">⬇</div>
          <span className="tag-apres">Après</span>
          <Mini {...a.apres} />
        </Case>
      </div>
      <div className="row fragment" style={{ marginTop: 18, alignItems: 'center' }}>
        <Narrateur className="col">{a.comment}</Narrateur>
        <span className="gain" style={{ flexShrink: 0, maxWidth: 230 }}>{a.gain}</span>
      </div>
    </section>
  );
}

export function Ep3Astuces() {
  return (
    <>
      <Chapitre fond="#0f4c75" ep="Épisode 3" titre="Les astuces de Rémi" sous="Du plus évident au plus subtil, une galère à la fois." promesse="📐 Les bonnes pratiques essentielles" />

      {ASTUCES.map((a, i) => <AstuceSlide key={a.titre} a={a} n={i + 1} />)}

      {/* Résultat : la base pensée machine */}
      <section>
        <Planche ep="Ép. 3" titre="La base de Rémi, pensée machine">
          <div className="row">
            <div style={{ flex: 1.9 }}><ExcelDonnee /></div>
            <div className="col stack">
              <Bulle qui="machine" humeur="content" size={58}>Ça, je sais le lire.</Bulle>
              <Bulle qui="remi" humeur="content" size={58} className="fragment">Moins joli, c’est vrai. Mais il répond aux 5 questions.</Bulle>
              <Case recit="🎁 Surprise" ton="blue" className="fragment">
                <p className="small">Ce sont les mêmes colonnes que la</p>
                <p style={{ fontWeight: 700, fontSize: 19, color: 'var(--navy)' }}>Base des librairies en France</p>
                <p className="tiny muted">Ministère de la Culture · data.gouv.fr · 3 237 librairies · <a href={SOURCE_URL} target="_blank" rel="noreferrer">voir ↗</a></p>
              </Case>
            </div>
          </div>
        </Planche>
      </section>
    </>
  );
}
