// ─── Épisode 4 : « Delos, mon fichier de vendredi, c’est bon ? » ───────────
// Le fichier fait à la va-vite, en vrai Excel, puis 7 erreurs, de la plus
// évidente à la plus subtile. À chaque erreur, Delos donne la théorie.
import { Bulle, Case, Chapitre, Mini, Narrateur } from '../components/BD';
import { Excel } from '../components/Excel';
import { VA_VITE_ONGLETS, vaVite } from '../remi';

const LARGEURS = [176, 196, 130, 104, 126];
const FICHIER = 'librairies_vite_fait.xlsx';

const ERREURS = [
  {
    titre: 'Un titre dans le tableau', niv: ['n1', '🟢 Évident'], de: 1, a: 6, err: ['A1', 'A2', 'A3'], cel: 'A1',
    remi: 'Le titre, c’est pour savoir de quoi on parle !',
    delos: 'Moi, je lis la ligne 1 comme une librairie qui s’appelle « 📚 SUIVI DES… ». Et la ligne 3 comme une librairie sans nom.',
    regle: 'La ligne 1 contient les en-têtes, et rien d’autre. Pas de titre, pas de note, pas de ligne vide : le titre va dans le nom de l’onglet ou du fichier.',
    apres: { cols: ['id', 'librairie', 'assortiment'], rows: [['LIB001', 'LE COMPTOIR DE LA BD', 'BD et Mangas']] },
  },
  {
    titre: 'Les cellules fusionnées', niv: ['n1', '🟢 Évident'], de: 4, a: 12, err: ['A5', 'A12'], cel: 'A6',
    remi: 'J’ai fusionné les villes, c’est plus aéré.',
    delos: 'Pour toi. Pour moi, seule la ligne 5 est à Boulogne. Les lignes 6 à 10 n’ont <b>pas de ville</b>. Et essaie de trier : Excel refuse.',
    regle: 'Une ligne = un enregistrement complet, lisible tout seul. On répète la commune sur chaque ligne : ça ne coûte rien, et la machine peut trier, filtrer, compter.',
    apres: { cols: ['librairie', 'code_commune'], rows: [['LES CURIEUX', { v: '92012', c: 'hl-good' }], ['LES MOTS ET LES CHOSES', { v: '92012', c: 'hl-good' }], ['PERIPLES 2', { v: '92012', c: 'hl-good' }]] },
  },
  {
    titre: 'L’information dans la couleur', niv: ['n1', '🟢 Évident'], de: 4, a: 10, err: ['B7', 'C7', 'B9', 'C9'], cel: 'B7',
    remi: 'Le vert, ça saute aux yeux, quand même.',
    delos: 'Aux tiens. Moi, je ne vois pas les couleurs. Le CSV non plus. L’imprimante noir et blanc non plus.',
    regle: 'Si c’est une information, c’est une colonne. La couleur reviendra dans la synthèse, calculée à partir de la colonne (mise en forme conditionnelle).',
    apres: { cols: ['librairie', 'label'], rows: [['LES MOTS ET LES CHOSES', { v: 'LIR', c: 'hl-good' }], ['LES MOTS ET LES IMAGES', { v: 'LIR', c: 'hl-good' }], ['LES CURIEUX', 'aucun']] },
  },
  {
    titre: 'Deux informations dans une case', niv: ['n2', '🟡 Moins évident'], de: 4, a: 8, err: ['A5', 'C5', 'C7'], cel: 'C7',
    remi: '« Généraliste (LIR) », c’est complet, au moins.',
    delos: 'C’est deux réponses à deux questions. « Boulogne-Billancourt (6) », pareil : une commune et un comptage, qui sera faux dès que tu ajoutes une ligne.',
    regle: 'Atomicité : une valeur indivisible par case. Recoller deux colonnes, Excel le fait en une formule. Redécouper un texte libre, presque jamais proprement.',
    apres: { cols: ['assortiment', 'label', 'commune'], rows: [['Généraliste', 'LIR', 'Boulogne-Billancourt'], ['BD et Mangas', 'aucun', 'Boulogne-Billancourt']] },
  },
  {
    titre: 'Des valeurs écrites à la main', niv: ['n2', '🟡 Moins évident'], de: 4, a: 16, err: ['C8', 'C9', 'C13', 'C14', 'C16', 'D5', 'D7', 'D9', 'D15'], cel: 'D7',
    remi: '« géné. », « Généraliste »… tout le monde comprend !',
    delos: 'Pas moi : « bd », « BD + mangas » et « BD-Manga », ça fait 3 spécialités. Et dans Visite : « faite (mars ?) », « 12/03 », « oui »… c’est une date, un texte ou un booléen ?',
    regle: 'Le bon type, et des listes fermées. Une date est une date (2026-03-12), un oui/non est un booléen, et ce qui se répète se choisit dans une liste déroulante.',
    apres: { cols: ['assortiment ▼', 'visite_faite', 'date_visite'], rows: [['BD et Mangas', 'VRAI', '2026-03-12'], ['Généraliste', 'FAUX', ''], ['Généraliste', 'VRAI', '2026-03-20']] },
  },
  {
    titre: 'Pas d’identifiant', niv: ['n2', '🟡 Moins évident'], de: 16, a: 21, err: ['B17', 'B19', 'E17', 'E19'], cel: 'B17',
    remi: 'Le nom suffit, non ?',
    delos: 'Tu as deux « Anagramme ». Une à Meudon, une à Sèvres. Toi-même, tu as écrit « même que Sèvres ? ».',
    regle: 'Un identifiant unique, stable, sans signification : LIB013 et LIB015. Jamais « Anagramme-Meudon » : si elle déménage, l’identifiant ment.',
    apres: { cols: ['id', 'librairie', 'code_commune'], rows: [[{ v: 'LIB013', c: 'hl-good' }, 'ANAGRAMME', '92048'], [{ v: 'LIB015', c: 'hl-good' }, 'ANAGRAMME', '92072']] },
  },
  {
    titre: 'La synthèse mélangée à la saisie', niv: ['n3', '🔴 Subtil'], de: 18, a: 23, err: ['A23', 'B23'], cel: 'B23', onglets: ['Récap (2)'],
    remi: 'Le total, c’est pratique. Et le « Récap (2) », c’est pour Claire.',
    delos: 'Le total est une synthèse : il se calcule, il ne se tape pas. Ton « Récap (2) » recopié à la main dit 4 librairies à Issy. Il y en a 5. Et l’an prochain, tu comptais faire quoi ?',
    regle: 'J’écris d’un côté, je fais la synthèse de l’autre : un onglet « saisie » brut, un onglet « synthese » calculé. L’année suivante ? Des lignes en plus, avec une colonne annee_suivi. Jamais un onglet « 2027 ».',
    apres: { cols: ['onglet', 'contenu'], rows: [[{ v: 'saisie', c: 'hl-good' }, 'une ligne par librairie et par année'], [{ v: 'synthese', c: 'hl-good' }, 'les totaux, calculés par formule']] },
  },
];

function ErreurSlide({ e, n }) {
  return (
    <section>
      <div className="planche-head">
        <span className="ep">Erreur {n}/{ERREURS.length}</span>
        <span className={`niveau ${e.niv[0]}`}>{e.niv[1]}</span>
        <h2>{e.titre}</h2>
      </div>
      <div className="row">
        <div style={{ flex: 1.15 }}>
          <Excel fichier={FICHIER} onglets={VA_VITE_ONGLETS} ongletErr={e.onglets} cellule={e.cel} formule=""
            largeurs={LARGEURS} rows={vaVite({ de: e.de, a: e.a, err: e.err })} debut={e.de} compact />
        </div>
        <div className="col stack">
          <Bulle qui="remi" humeur="neutre" size={48}>{e.remi}</Bulle>
          <Bulle qui="delos" humeur="surpris" size={48} droite className="fragment"><span dangerouslySetInnerHTML={{ __html: e.delos }} /></Bulle>
        </div>
      </div>
      <div className="row fragment" style={{ marginTop: 16, alignItems: 'stretch' }}>
        <div className="col" style={{ background: 'var(--ink)', color: '#fff', borderRadius: 8, padding: '12px 18px', boxShadow: '5px 5px 0 #009a93' }}>
          <p style={{ fontFamily: 'Bangers, cursive', fontSize: 20, letterSpacing: 1, color: '#5eead4' }}>La théorie de Delos</p>
          <p style={{ fontSize: 17, marginTop: 4 }}>{e.regle}</p>
        </div>
        <Case recit="Corrigé" ton="good" style={{ width: 360 }}>
          <Mini {...e.apres} />
        </Case>
      </div>
    </section>
  );
}

// Repères de la vue d’ensemble : une erreur = un numéro
const MARQUES = { A1: 1, A5: 2, B7: 3, C7: 4, D9: 5, B17: 6, A23: 7 };

export function Ep4CestBon() {
  return (
    <>
      <Chapitre fond="#dc2626" ep="Épisode 4" titre="« Delos, c’est bon ? »" sous="Le fichier de vendredi, 17 h 45. Fait « vite fait »." promesse="📐 Les bonnes pratiques essentielles" />

      <section>
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div style={{ flex: 1.55 }}>
            <Excel fichier={FICHIER} onglets={VA_VITE_ONGLETS} cellule="A5" formule="Boulogne-Billancourt (6)"
              largeurs={LARGEURS} rows={vaVite({ marques: MARQUES, marquesFragment: true })} compact />
          </div>
          <div className="col stack">
            <Bulle qui="remi" humeur="content" size={50}>Voilà ! Joli, non ?</Bulle>
            <Bulle qui="delos" humeur="surpris" size={50} className="fragment">Très joli. Pour un humain.</Bulle>
            <Bulle qui="delos" humeur="neutre" size={50} className="fragment">Pour moi, il y a <b>7 problèmes</b>. On les prend dans l’ordre ?</Bulle>
            <Bulle qui="remi" humeur="stress" size={50} className="fragment">…Sept ?</Bulle>
          </div>
        </div>
      </section>

      {ERREURS.map((e, i) => <ErreurSlide key={e.titre} e={e} n={i + 1} />)}

      <section>
        <div className="row" style={{ alignItems: 'center' }}>
          <div className="col">
            <Narrateur>
              Ce fichier n’est pas « mauvais » : c’est un <u>aide-mémoire</u>, fait pour l’œil. Une base de données est faite pour la machine. Le problème, c’est de confondre les deux.
            </Narrateur>
            <div className="row" style={{ marginTop: 18 }}>
              <Bulle qui="remi" humeur="stress" size={54} className="col">Je recommence tout ?</Bulle>
              <Bulle qui="delos" humeur="content" size={54} droite className="col fragment">Non. Tu ranges. Les données sont bonnes, c’est la forme qui ne va pas.</Bulle>
            </div>
          </div>
          <Case recit="Les 7 erreurs, en résumé" style={{ width: 380 }}>
            <div className="stack" style={{ fontSize: 16 }}>
              {ERREURS.map((e, i) => <p key={e.titre}>{e.niv[1].slice(0, 2)} {i + 1}. {e.titre}</p>)}
            </div>
          </Case>
        </div>
      </section>
    </>
  );
}
