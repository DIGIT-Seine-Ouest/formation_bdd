import { useEffect } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
import './styles.css';
import { Ouverture } from './slides/Ouverture';
import { Ep1Mission } from './slides/Ep1Mission';
import { Ep2Urgence } from './slides/Ep2Urgence';
import { Ep3Astuces } from './slides/Ep3Astuces';
import { Ep4Interne } from './slides/Ep4Interne';
import { Ep5Externe } from './slides/Ep5Externe';
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
    // La carte et les iframes doivent savoir quand leur slide devient visible
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
        <Ep2Urgence />
        <Ep3Astuces />
        <Ep4Interne />
        <Ep5Externe />
        <Final />
      </div>
    </div>
  );
}
