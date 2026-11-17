// Les personnages de la BD, dessinés en SVG (pas de photo : le site est public).
// <Perso qui="remi|nanny|delos|digit" humeur="neutre|content|stress|surpris" size={72} />
import { useId } from 'react';

export const NOMS = { remi: 'Rémi', nanny: 'Super Nanny', delos: 'Delos', digit: 'La DIGIT' };
const FOND = { remi: '#cfeefe', nanny: '#fde2e4', delos: '#d7f3f1', digit: '#e3f5c8' };

function Bouche({ h, x = 60, y = 68, couleur = '#7a3b2e' }) {
  if (h === 'content') return <path d={`M${x - 8} ${y - 2} Q${x} ${y + 7} ${x + 8} ${y - 2}`} stroke={couleur} strokeWidth="2.4" fill="none" strokeLinecap="round" />;
  if (h === 'stress') return <path d={`M${x - 8} ${y + 1} q4 -4 8 0 q4 4 8 0`} stroke={couleur} strokeWidth="2.2" fill="none" strokeLinecap="round" />;
  if (h === 'surpris') return <ellipse cx={x} cy={y} rx="3.5" ry="4.5" fill={couleur} />;
  return <path d={`M${x - 6} ${y} L${x + 6} ${y}`} stroke={couleur} strokeWidth="2.2" strokeLinecap="round" />;
}

function Sourcils({ h, y = 37, g = 52, d = 68, c = '#2d1c11' }) {
  const s = h === 'stress' ? 3 : h === 'surpris' ? -2 : 0;
  const up = h === 'surpris' ? -3 : 0;
  return (
    <g stroke={c} strokeWidth="2.4" strokeLinecap="round">
      <path d={`M${g - 6} ${y + up + s} L${g + 5} ${y + up - s}`} />
      <path d={`M${d - 5} ${y + up - s} L${d + 6} ${y + up + s}`} />
    </g>
  );
}

function Goutte({ x = 84, y = 34 }) {
  return <path d={`M${x} ${y} q-5 8 0 11 q5 -3 0 -11z`} fill="#38bdf8" stroke="#0369a1" strokeWidth="1" />;
}

function Remi({ h }) {
  return (
    <>
      {/* col roulé beige + badge Data Hero */}
      <path d="M12 122 C14 95 34 86 60 86 C86 86 106 95 108 122 Z" fill="#d6b08a" stroke="#1f1f1f" strokeWidth="2" />
      <rect x="46" y="72" width="28" height="18" rx="7" fill="#c79d74" stroke="#1f1f1f" strokeWidth="2" />
      <g transform="rotate(-10 86 102)">
        <rect x="74" y="95" width="25" height="13" rx="2.5" fill="#4c2a85" stroke="#1f1f1f" strokeWidth="1.2" />
        <text x="86.5" y="101.2" fontSize="4.4" fontWeight="700" fill="#ffe066" textAnchor="middle" fontFamily="Arial">DATA</text>
        <text x="86.5" y="106" fontSize="4.4" fontWeight="700" fill="#ffe066" textAnchor="middle" fontFamily="Arial">HERO</text>
      </g>
      {/* tête */}
      <ellipse cx="60" cy="50" rx="19" ry="23" fill="#eac39f" stroke="#1f1f1f" strokeWidth="2" />
      {/* cheveux bouclés */}
      <g fill="#3a2618" stroke="#1f1f1f" strokeWidth="1.2">
        {[[40, 44, 8], [38, 55, 6.5], [80, 44, 8], [82, 55, 6.5], [43, 33, 9], [51, 26, 9.5], [61, 23, 10], [71, 26, 9.5], [78, 33, 9], [46, 40, 6], [74, 40, 6]].map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
      </g>
      {/* barbe + moustache */}
      <path d="M41 50 C40 72 50 81 60 81 C70 81 80 72 79 50 C76 59 71 61 60 61 C49 61 44 59 41 50 Z" fill="#3a2618" stroke="#1f1f1f" strokeWidth="1.5" />
      <path d="M49 61 Q60 55 71 61 Q60 59 49 61 Z" fill="#24160d" />
      <Bouche h={h} y={68} couleur="#f3d7c0" />
      {/* yeux + lunettes rondes */}
      {h === 'content'
        ? <g stroke="#1f1f1f" strokeWidth="2" fill="none" strokeLinecap="round"><path d="M49 48 Q52 45 55 48" /><path d="M65 48 Q68 45 71 48" /></g>
        : <g fill="#1f1f1f"><circle cx="52" cy="47.5" r={h === 'surpris' ? 2.4 : 1.8} /><circle cx="68" cy="47.5" r={h === 'surpris' ? 2.4 : 1.8} /></g>}
      <g fill="rgba(255,255,255,.25)" stroke="#5b4a3a" strokeWidth="1.8">
        <circle cx="52" cy="47.5" r="7" /><circle cx="68" cy="47.5" r="7" />
      </g>
      <path d="M59 47 Q60 45.5 61 47" stroke="#5b4a3a" strokeWidth="1.8" fill="none" />
      <Sourcils h={h} y={36} />
      {h === 'stress' && <Goutte x={86} y={30} />}
    </>
  );
}

function Nanny({ h }) {
  return (
    <>
      <path d="M12 122 C14 95 34 86 60 86 C86 86 106 95 108 122 Z" fill="#1e3a5f" stroke="#1f1f1f" strokeWidth="2" />
      <path d="M50 86 L60 104 L70 86 Z" fill="#fff" stroke="#1f1f1f" strokeWidth="1.5" />
      <rect x="53" y="70" width="14" height="18" fill="#f1c9a5" stroke="#1f1f1f" strokeWidth="1.5" />
      {/* carré blond */}
      <path d="M36 52 C34 24 50 18 60 18 C72 18 87 24 84 52 L86 78 L73 78 L73 44 L47 44 L47 78 L34 78 Z" fill="#e8b84a" stroke="#1f1f1f" strokeWidth="2" />
      <ellipse cx="60" cy="52" rx="16" ry="20" fill="#f1c9a5" stroke="#1f1f1f" strokeWidth="2" />
      <path d="M44 42 C48 30 72 30 76 42 C68 36 52 36 44 42 Z" fill="#e8b84a" stroke="#1f1f1f" strokeWidth="1.5" />
      <g fill="#1f1f1f"><circle cx="53" cy="52" r="2" /><circle cx="67" cy="52" r="2" /></g>
      <Sourcils h={h} y={45} g={53} d={67} c="#8a6420" />
      <Bouche h={h} y={63} couleur="#b4413c" />
      {h === 'stress' && <Goutte x={84} y={28} />}
    </>
  );
}

function Delos({ h }) {
  // Assistant IA : un soleil noir à rayons, un œil turquoise (clin d'œil au logo)
  const rayons = Array.from({ length: 11 }, (_, i) => -100 + i * 20);
  return (
    <>
      <g transform="translate(60 62)">
        {rayons.map((a) => (
          <rect key={a} x="-4.5" y="-50" width="9" height="20" rx="1.5" fill="#111" transform={`rotate(${a})`} />
        ))}
        <circle r="30" fill="#111" />
        <circle r="23" fill="#fff" />
        {h === 'content'
          ? <path d="M-13 2 Q0 -12 13 2" stroke="#009a93" strokeWidth="6" fill="none" strokeLinecap="round" />
          : <path d="M-14 -4 A14 14 0 0 0 14 -4 Z" fill="#009a93" transform={h === 'surpris' ? 'scale(1.15)' : ''} />}
        <path d="M-28 -16 L26 18" stroke="#111" strokeWidth="7" strokeLinecap="round" />
      </g>
      {h === 'surpris' && <text x="98" y="30" fontSize="22" fontWeight="900" fill="#009a93" fontFamily="Arial">!</text>}
    </>
  );
}

function Digit({ h }) {
  return (
    <>
      <path d="M12 122 C14 95 34 86 60 86 C86 86 106 95 108 122 Z" fill="#95c11f" stroke="#1f1f1f" strokeWidth="2" />
      <rect x="53" y="70" width="14" height="18" fill="#c68b5e" stroke="#1f1f1f" strokeWidth="1.5" />
      <ellipse cx="60" cy="50" rx="18" ry="22" fill="#c68b5e" stroke="#1f1f1f" strokeWidth="2" />
      <path d="M41 46 C40 26 80 26 79 46 C74 36 46 36 41 46 Z" fill="#1f1f1f" />
      {/* casque micro */}
      <path d="M38 52 C36 20 84 20 82 52" stroke="#1f1f1f" strokeWidth="4" fill="none" />
      <rect x="33" y="46" width="9" height="14" rx="3" fill="#009fe3" stroke="#1f1f1f" strokeWidth="1.5" />
      <rect x="78" y="46" width="9" height="14" rx="3" fill="#009fe3" stroke="#1f1f1f" strokeWidth="1.5" />
      <path d="M38 58 Q42 72 54 70" stroke="#1f1f1f" strokeWidth="2.5" fill="none" />
      <circle cx="55" cy="70" r="2.5" fill="#1f1f1f" />
      <g fill="#1f1f1f"><circle cx="53" cy="50" r="2" /><circle cx="67" cy="50" r="2" /></g>
      <Sourcils h={h} y={42} g={53} d={67} c="#1f1f1f" />
      <Bouche h={h} x={62} y={62} couleur="#5b2a1a" />
    </>
  );
}

const DESSIN = { remi: Remi, nanny: Nanny, delos: Delos, digit: Digit };

export function Perso({ qui, humeur = 'neutre', size = 72, nu = false }) {
  const id = useId().replace(/:/g, '');
  const D = DESSIN[qui];
  if (nu) {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={NOMS[qui]} style={{ overflow: 'visible' }}>
        <D h={humeur} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={NOMS[qui]}>
      <defs><clipPath id={`c${id}`}><circle cx="60" cy="60" r="57" /></clipPath></defs>
      <circle cx="60" cy="60" r="57" fill={FOND[qui]} />
      <g clipPath={`url(#c${id})`}><D h={humeur} /></g>
      <circle cx="60" cy="60" r="57" fill="none" stroke="#1f1f1f" strokeWidth="3.5" />
    </svg>
  );
}
