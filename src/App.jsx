import { useEffect } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
import './styles.css';
import { Accueil } from './slides/Accueil';
import { Donnees } from './slides/Donnees';
import { Module1 } from './slides/Module1';
import { Module2 } from './slides/Module2';
import { Module3 } from './slides/Module3';

export function App() {
  useEffect(() => {
    const deck = new Reveal({
      hash: true,
      slideNumber: 'c/t',
      transition: 'slide',
      center: true,
      width: 1100,
      height: 700,
    });
    deck.initialize().catch(console.error);
    return () => deck.destroy();
  }, []);

  return (
    <div className="reveal">
      <div className="slides">
        <Accueil />
        <Donnees />
        <Module1 />
        <Module2 />
        <Module3 />
      </div>
    </div>
  );
}
