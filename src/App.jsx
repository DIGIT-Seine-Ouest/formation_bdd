import { useEffect } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
import './styles.css';
import { Accueil } from './slides/Accueil';
import { MonFichier } from './slides/MonFichier';
import { Structurer } from './slides/Structurer';
import { Valoriser } from './slides/Valoriser';
import { ChezNous } from './slides/ChezNous';
import { Ressources } from './slides/Ressources';

export function App() {
  useEffect(() => {
    const deck = new Reveal({
      hash: true,
      slideNumber: 'c/t',
      transition: 'slide',
      center: true,
      width: 1100,
      height: 700,
      margin: 0.05,
      preloadIframes: false,
    });
    // Le simulateur (carte Leaflet) a besoin de savoir quand sa slide devient visible
    const relay = (e) => window.dispatchEvent(new CustomEvent('reveal:slidechanged', { detail: e }));
    deck.on('slidechanged', relay);
    deck.on('ready', relay);
    deck.initialize().catch(console.error);
    return () => deck.destroy();
  }, []);

  return (
    <div className="reveal">
      <div className="slides">
        <Accueil />
        <MonFichier />
        <Structurer />
        <Valoriser />
        <ChezNous />
        <Ressources />
      </div>
    </div>
  );
}
