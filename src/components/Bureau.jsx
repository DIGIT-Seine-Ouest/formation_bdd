// Le bureau de Rémi, en grand : étagère de livres, fenêtre, bureau, écran.
// Le contenu de l'écran (mail, Excel, Delos…) est passé en enfant.
import { Perso } from './Personnages';

export function Bureau({ humeur = 'neutre', ecran, bulle, invite, inviteHumeur = 'stress' }) {
  return (
    <div className="bureau">
      <svg className="bureau-decor" viewBox="0 0 1040 470" preserveAspectRatio="none" aria-hidden="true">
        {/* mur + plinthe */}
        <rect width="1040" height="470" fill="#e8f3fa" />
        <rect y="352" width="1040" height="6" fill="#c9dbe6" />
        {/* fenêtre */}
        <rect x="820" y="40" width="190" height="170" rx="6" fill="#bfe6fb" stroke="#1f1f1f" strokeWidth="4" />
        <path d="M830 200 L830 140 L860 140 L860 120 L890 120 L890 150 L930 150 L930 100 L960 100 L960 160 L1000 160 L1000 200 Z" fill="#7fb6d4" />
        <line x1="915" y1="40" x2="915" y2="210" stroke="#1f1f1f" strokeWidth="4" />
        <line x1="820" y1="125" x2="1010" y2="125" stroke="#1f1f1f" strokeWidth="4" />
        {/* étagère de livres */}
        <rect x="30" y="70" width="200" height="10" fill="#8b5e3c" stroke="#1f1f1f" strokeWidth="2" />
        <rect x="30" y="160" width="200" height="10" fill="#8b5e3c" stroke="#1f1f1f" strokeWidth="2" />
        {[['#009fe3', 40, 22, 54], ['#95c11f', 64, 18, 48], ['#f59e0b', 84, 24, 56], ['#4c2a85', 110, 16, 44], ['#dc2626', 128, 22, 52], ['#0f4c75', 152, 20, 58], ['#ffe066', 174, 18, 46], ['#009a93', 194, 26, 50]].map(([c, x, w, h]) => (
          <rect key={x} x={x} y={70 - h} width={w} height={h} fill={c} stroke="#1f1f1f" strokeWidth="2" />
        ))}
        {[['#95c11f', 40, 30, 50], ['#009fe3', 74, 20, 58], ['#dc2626', 96, 24, 46], ['#ffe066', 122, 18, 54], ['#4c2a85', 142, 26, 50]].map(([c, x, w, h]) => (
          <rect key={x} x={x} y={160 - h} width={w} height={h} fill={c} stroke="#1f1f1f" strokeWidth="2" />
        ))}
        <path d="M180 160 L200 112 L220 160 Z" fill="#6aa84f" stroke="#1f1f1f" strokeWidth="2" />
        {/* affiche */}
        <rect x="270" y="50" width="96" height="120" fill="#fff" stroke="#1f1f1f" strokeWidth="3" transform="rotate(-3 318 110)" />
        <text x="318" y="100" fontFamily="Bangers, cursive" fontSize="26" textAnchor="middle" fill="#4c2a85" transform="rotate(-3 318 110)">DATA</text>
        <text x="318" y="130" fontFamily="Bangers, cursive" fontSize="26" textAnchor="middle" fill="#4c2a85" transform="rotate(-3 318 110)">HERO</text>
        {/* bureau */}
        <rect x="0" y="378" width="1040" height="92" fill="#a9744f" />
        <rect x="0" y="370" width="1040" height="16" fill="#c08a5e" stroke="#1f1f1f" strokeWidth="3" />
        {/* pied d'écran */}
        <rect x="660" y="330" width="40" height="44" fill="#4b5563" stroke="#1f1f1f" strokeWidth="3" />
        <rect x="620" y="366" width="120" height="10" rx="3" fill="#4b5563" stroke="#1f1f1f" strokeWidth="3" />
        {/* mug */}
        <rect x="880" y="320" width="44" height="52" rx="6" fill="#fff" stroke="#1f1f1f" strokeWidth="3" />
        <path d="M924 332 q18 4 0 26" stroke="#1f1f1f" strokeWidth="3" fill="none" />
        <text x="902" y="352" fontSize="12" fontFamily="Bangers, cursive" textAnchor="middle" fill="#4c2a85">DATA</text>
        <path d="M892 312 q6 -10 0 -20 M908 312 q6 -10 0 -20" stroke="#9ca3af" strokeWidth="2.5" fill="none" />
        {/* post-it */}
        <rect x="430" y="384" width="62" height="56" fill="#ffe066" stroke="#1f1f1f" strokeWidth="2" transform="rotate(-6 461 412)" />
        <text x="461" y="410" fontSize="12" fontFamily="'Comic Neue', cursive" fontWeight="700" textAnchor="middle" transform="rotate(-6 461 412)">étude</text>
        <text x="461" y="425" fontSize="12" fontFamily="'Comic Neue', cursive" fontWeight="700" textAnchor="middle" transform="rotate(-6 461 412)">librairies !</text>
      </svg>

      {/* Rémi, en grand, derrière le bureau */}
      <div className="bureau-remi"><Perso qui="remi" humeur={humeur} size={330} nu /></div>
      {invite && <div className="bureau-invite"><Perso qui={invite} humeur={inviteHumeur} size={250} nu /></div>}

      {/* l'écran */}
      <div className="bureau-ecran"><div className="bureau-ecran-in">{ecran}</div></div>

      {bulle && <div className="bureau-bulle">{bulle}</div>}
    </div>
  );
}
