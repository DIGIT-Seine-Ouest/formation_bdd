// ─── Ouverture : couverture + casting + la promesse ─────────────────────────
import { Perso } from '../components/Personnages';
import { Case, Narrateur } from '../components/BD';

const CASTING = [
  ['remi', 'content', 'Rémi', 'DSI de GPSO. On vient de lui confier le suivi des librairies du territoire.'],
  ['claire', 'neutre', 'Claire', 'Au cabinet. Toujours une note à rendre. Toujours pour hier.'],
  ['machine', 'neutre', 'La Machine', 'Excel, un portail, une carte… Elle lit tout, case par case, au pied de la lettre.'],
  ['digit', 'content', 'La DIGIT', 'Transforme les fichiers bien construits en services.'],
];

export function Ouverture() {
  return (
    <>
      <section data-background-gradient="linear-gradient(135deg, #009fe3 0%, #95c11f 100%)">
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <p style={{ fontSize: 16, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', opacity: .9 }}>DIGIT Formation · 1 h · Débutant · Pratique</p>
          <h1 style={{ fontFamily: '"IBM Plex Serif", serif', fontSize: 56, lineHeight: 1.05, margin: '14px 0 22px', textShadow: '0 3px 0 rgba(0,0,0,.15)' }}>
            Valoriser le potentiel<br />des données
          </h1>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18, background: '#fff', color: 'var(--ink)', border: '4px solid var(--ink)', borderRadius: 8, boxShadow: '7px 7px 0 var(--ink)', padding: '14px 26px 14px 16px' }}>
            <Perso qui="remi" humeur="content" size={96} />
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontFamily: 'Bangers, cursive', fontSize: 40, letterSpacing: 2, lineHeight: 1 }}>Les aventures de Rémi</p>
              <p style={{ fontFamily: '"Comic Neue", cursive', fontWeight: 700, fontSize: 22, marginTop: 6 }}>ou comment un fichier Excel devient un service</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <p style={{ fontFamily: 'Bangers, cursive', fontSize: 34, letterSpacing: 2, marginBottom: 18 }}>Les personnages</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {CASTING.map(([qui, h, nom, desc]) => (
            <Case key={qui} className="fragment" style={{ textAlign: 'center' }}>
              <Perso qui={qui} humeur={h} size={120} />
              <p style={{ fontFamily: 'Bangers, cursive', fontSize: 28, letterSpacing: 1, marginTop: 8 }}>{nom}</p>
              <p className="small" style={{ marginTop: 4 }}>{desc}</p>
            </Case>
          ))}
        </div>
        <Narrateur className="fragment" style={{ marginTop: 26 }}>
          Ce que vous allez voir : un fichier Excel qui dort sur un poste peut devenir un <u>tableau de bord</u> pour l'équipe… ou un <u>annuaire</u> pour les habitants.
          À une condition : <span style={{ background: '#fff', padding: '0 6px' }}>penser machine, pas humain.</span>
        </Narrateur>
      </section>
    </>
  );
}
