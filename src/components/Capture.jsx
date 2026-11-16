// Affiche la vraie capture Excel (public/captures/<nom>.png, faite sur Mac avec
// docs/prompt_captures_mac.md) ; si elle n’existe pas encore, affiche la maquette.
import { useState } from 'react';

const BASE = import.meta.env.BASE_URL;

export function Capture({ nom, alt = '', maxH, children }) {
  const [ok, setOk] = useState(true);
  if (!nom || !ok) return children || null;
  return (
    <img
      className="capture"
      src={`${BASE}captures/${nom}.png`}
      alt={alt}
      style={maxH ? { maxHeight: maxH } : undefined}
      onError={() => setOk(false)}
    />
  );
}
