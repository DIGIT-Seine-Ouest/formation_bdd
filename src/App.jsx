import { useEffect } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
import './styles.css';
import { Ouverture } from './slides/Ouverture';
import { Ep1Mission } from './slides/Ep1Mission';
import { Ep2Theorie } from './slides/Ep2Theorie';
import { Ep3Tuto } from './slides/Ep3Tuto';
import { Ep4Pratique } from './slides/Ep4Pratique';
import { Ep5Valoriser } from './slides/Ep5Valoriser';
import { Final } from './slides/Final';

export function App() {
  useEffect(() => {
    const deck = new Reveal({
      hash: true,
      slideNumber: 'c/t',
      transition: 'slide',
      center: true,
      width: 1100,
      height: 700,
      margin: 0.04,
    });
    // Les iframes de la vitrine ne se chargent que quand leur slide est affichée
    const relay = (e) => window.dispatchEvent(new CustomEvent('reveal:slidechanged', { detail: e }));
    deck.on('slidechanged', relay);
    deck.on('ready', relay);
    deck.initialize().catch(console.error);
    return () => deck.destroy();
  }, []);

  return (
    <div className="reveal">
      <div className="slides">
        <Ouverture />
        <Ep1Mission />
        <Ep2Theorie />
        <Ep3Tuto />
        <Ep4Pratique />
        <Ep5Valoriser />
        <Final />
      </div>
    </div>
  );
}
