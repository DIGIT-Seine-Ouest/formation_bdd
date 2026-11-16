// ─── Épisode 2 : « J’en ai besoin RAPIDEMENT » ────────────────────────────
// La question pressée → ce que lit la Machine → le déclic humain / machine
// → le vocabulaire : entité, attribut, valeur.
import { Bulle, Case, Chapitre, Mini, Narrateur, Planche } from '../components/BD';
import { KPI } from './Ep1Mission';

const ATTRIBUTS = [
  ['📍', 'par commune', 'commune'],
  ['🏅', 'labellisées', 'label'],
  ['📚', 'spécialités', 'assortiment'],
  ['🔄', 'ouvertures / fermetures', 'annee_suivi + id'],
  ['🗺️', 'carte', 'code_commune'],
];

export function Ep2Urgence() {
  return (
    <>
      <Chapitre fond="#dc2626" ep="Épisode 2" titre="J’en ai besoin RAPIDEMENT" sous="Mardi, 14 h 02. Claire passe la tête par la porte." />

      {/* Planche 1 : la question pressée */}
      <section>
        <Planche ep="Ép. 2" titre="Mardi, 14 h 02">
          <div className="row" style={{ alignItems: 'flex-start' }}>
            <div className="col stack">
              <Case>
                <Bulle qui="claire" humeur="stress">Rémi ! Pour ma note au maire, il me faut <b>tout de suite</b> le nombre de librairies labellisées. Et combien font de la BD.</Bulle>
              </Case>
              <Case className="fragment">
                <Bulle qui="remi" humeur="stress" droite>Euh… oui. Deux minutes.</Bulle>
              </Case>
              <Case className="fragment" recit="Rémi compte les cases vertes, une à une…">
                <Bulle qui="remi" humeur="stress" pense>Une, deux, trois… « bd », « BD-Manga », ça compte pareil ? Et la ligne TOTAL, elle compte ?</Bulle>
              </Case>
            </div>
            <div style={{ width: 300 }} className="stack">
              <Case className="fragment center" ton="bad">
                <p className="sfx" style={{ fontSize: 52 }}>Tic… tac…</p>
                <p style={{ fontFamily: 'Bangers, cursive', fontSize: 64, letterSpacing: 2, color: 'var(--red)', lineHeight: 1 }}>14 h 27</p>
                <p className="small">25 minutes pour deux chiffres.</p>
              </Case>
              <Case className="fragment">
                <Bulle qui="claire" humeur="surpris" size={52}>Et tu peux me faire une carte ?</Bulle>
              </Case>
            </div>
          </div>
        </Planche>
      </section>

      {/* Planche 2 : ce que voit la Machine */}
      <section>
        <Planche ep="Ép. 2" titre="Rémi demande de l’aide à la Machine">
          <div className="row">
            <div className="col stack">
              <Bulle qui="machine" humeur="surpris">Je lis ton fichier case par case. Voilà ce que je vois :</Bulle>
              <Bulle qui="machine" humeur="surpris" className="fragment">Ligne 1 : « 📚 SUIVI DES LIBRAIRIES… ». <b>C’est une librairie ?</b></Bulle>
              <Bulle qui="machine" humeur="surpris" className="fragment">Lignes 5 à 9, colonne Ville : <b>vide</b>. Ces librairies ne sont nulle part.</Bulle>
              <Bulle qui="machine" humeur="surpris" className="fragment">Du vert ? <b>Je ne vois pas les couleurs.</b></Bulle>
              <Bulle qui="machine" humeur="surpris" className="fragment">« bd », « BD / Mangas », « BD-Manga » : pour moi, <b>3 spécialités différentes</b>.</Bulle>
              <Bulle qui="machine" humeur="surpris" className="fragment">Ligne 21 : une librairie qui s’appelle <b>« 17 librairies »</b> ?</Bulle>
            </div>
            <div style={{ width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Narrateur className="fragment">
                Le fichier a été écrit <u>pour un humain</u>. Mais celle qui compte, filtre et cartographie, c’est <u>la Machine</u>.
              </Narrateur>
            </div>
          </div>
        </Planche>
      </section>

      {/* Planche 3 : le déclic */}
      <section>
        <Planche ep="Ép. 2" titre="Le déclic : penser humain ≠ penser machine">
          <div className="duel">
            <Case recit="👀 Un humain…" ton="bad">
              <ul>
                <li>lit le tableau <b>d’un coup d’œil</b></li>
                <li>comprend le <b>contexte</b> (« les cellules du dessous, c’est Boulogne »)</li>
                <li>voit les <b>couleurs</b> et la mise en page</li>
                <li>accepte l’<b>à-peu-près</b> : « env. 30 », « voir Paul »</li>
              </ul>
            </Case>
            <Case recit="🤖 La Machine…" ton="blue" className="fragment">
              <ul>
                <li>lit <b>case par case</b>, ligne par ligne</li>
                <li>ne comprend <b>que ce qui est écrit</b> dans la case</li>
                <li><b>ignore</b> la mise en forme</li>
                <li>ne regroupe que des valeurs <b>strictement identiques</b></li>
              </ul>
            </Case>
          </div>
          <div className="fragment" style={{ marginTop: 26, textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'var(--ink)', color: '#fff', borderRadius: 8, padding: '16px 28px', fontFamily: '"IBM Plex Serif", serif', fontSize: 28, lineHeight: 1.3, boxShadow: '6px 6px 0 var(--yellow)' }}>
              Écrivez pour la Machine.<br />C’est elle qui fabriquera les vues pour les humains.
            </div>
          </div>
        </Planche>
      </section>

      {/* Planche 4 : entité / attribut / valeur, à partir des KPI */}
      <section>
        <Planche ep="Ép. 2" titre="Penser machine, en 3 mots">
          <div className="row" style={{ marginBottom: 20 }}>
            <div className="mot col"><p className="k">Entité</p><p className="eq">Ce que je suis. Ici : <b>une librairie</b>.<br />→ <b>une ligne</b></p></div>
            <div className="mot col fragment"><p className="k">Attribut</p><p className="eq">Ce que je veux savoir sur elle.<br />→ <b>une colonne</b></p></div>
            <div className="mot col fragment"><p className="k">Valeur</p><p className="eq">Une seule information.<br />→ <b>une case</b></p></div>
          </div>
          <div className="row fragment">
            <Case recit="Rémi part des 5 questions de la mission…" style={{ flex: 1.2 }}>
              <div className="stack" style={{ fontSize: 17 }}>
                {ATTRIBUTS.map(([e, q, a]) => (
                  <p key={a}>{e} {q} <span className="muted">→ il me faut la colonne</span> <code>{a}</code></p>
                ))}
              </div>
            </Case>
            <Case recit="…et en tire ses colonnes" ton="good" className="col">
              <Mini cols={['id', 'librairie', 'assortiment', 'label', 'commune', 'code_commune', 'annee_suivi']} rows={[['LIB003', 'LES MOTS ET LES CHOSES', 'Généraliste', 'LIR', 'Boulogne-Billancourt', '92012', '2026']]} />
              <p className="small" style={{ marginTop: 10 }}>Chaque colonne répond à une question. Une colonne qui ne répond à aucune question est inutile.</p>
            </Case>
          </div>
          <p className="tiny muted" style={{ marginTop: 8 }}>{KPI.length} questions → 7 colonnes.</p>
        </Planche>
      </section>
    </>
  );
}
