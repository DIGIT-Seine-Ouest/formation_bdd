// Briques de mise en page « bande dessinée ».
import { NOMS, Perso } from './Personnages';

// Une bulle de dialogue avec le personnage qui parle
export function Bulle({ qui, humeur, droite = false, pense = false, size = 64, className = '', children }) {
  const style = qui === 'delos' ? 'machine' : pense ? 'pense' : '';
  return (
    <div className={`bulle-row ${droite ? 'right' : ''} ${className}`}>
      <div className="who"><Perso qui={qui} humeur={humeur} size={size} /><span>{NOMS[qui]}</span></div>
      <div className={`bulle ${style}`}>{children}</div>
    </div>
  );
}

// Une case de BD, avec son récitatif (encadré jaune) en haut à gauche
export function Case({ recit, ton = '', className = '', style, children }) {
  return (
    <div className={`case ${ton} ${recit ? '' : 'flat'} ${className}`} style={style}>
      {recit && <div className="recit">{recit}</div>}
      {children}
    </div>
  );
}

export function Narrateur({ className = '', style, children }) {
  return <div className={`narrateur ${className}`} style={style}>{children}</div>;
}

// En-tête de planche : « ÉPISODE 2 » + titre
export function Planche({ ep, titre, children }) {
  return (
    <>
      <div className="planche-head">
        <span className="ep">{ep}</span>
        <h2>{titre}</h2>
      </div>
      {children}
    </>
  );
}

// Page de titre d'un épisode
export function Chapitre({ fond, ep, titre, sous, promesse }) {
  return (
    <section data-background-color={fond}>
      <div className="chapitre">
        <div className="ep">{ep}</div>
        <div className="titre">{titre}</div>
        {sous && <div className="sous">{sous}</div>}
        {promesse && <div className="promesse">{promesse}</div>}
      </div>
    </section>
  );
}

// Petit tableau « façon Excel ». cells : chaîne, ou { v, c } avec c = hl-bad | hl-good | vert | vide
export function Mini({ cols, rows }) {
  return (
    <table className="mini">
      <thead><tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((cell, j) => {
              const { v, c } = typeof cell === 'object' && cell !== null ? cell : { v: cell, c: '' };
              return <td key={j} className={c}>{v}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
