// ─── Ouverture : couverture + casting ───────────────────────────────────────
import { Perso } from '../components/Personnages';
import { Case, Narrateur } from '../components/BD';

const CASTING = [
  ['remi', 'content', 'Rémi', 'DSI de GPSO, badge « Data Hero ». Vient d’être missionné. Ne le sait pas encore.'],
  ['claire', 'stress', 'Claire', 'Au cabinet. Ses notes sont toujours « pour hier ».'],
  ['delos', 'content', 'Delos', 'L’assistant IA de Rémi. Patient. Lit tout comme une machine : case par case.'],
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
              <p style={{ fontFamily: 'Bangers, cursive', fontSize: 40, letterSpacing: 2, lineHeight: 1 }}>Rémi et les librairies</p>
              <p style={{ fontFamily: '"Comic Neue", cursive', fontWeight: 700, fontSize: 22, marginTop: 6 }}>ou comment un fichier Excel devient une base de données</p>
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
          Toute ressemblance avec votre propre fichier Excel serait purement… fréquente.
        </Narrateur>
      </section>
    </>
  );
}
