import { useEffect } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
import './styles.css';
import { Accueil } from './slides/Accueil';
import { Donnees } from './slides/Donnees';
import { Typologies } from './slides/Typologies';
import { Conception } from './slides/Conception';
import { Module2 } from './slides/Module2';
import { ModernDataStack } from './slides/ModernDataStack';
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
    });
    deck.initialize().catch(console.error);
    return () => deck.destroy();
  }, []);

  return (
    <div className="reveal">
      <div className="slides">
        <Accueil />
        <Donnees />
        <Typologies />
        <Conception />
        <Module2 />
        <ModernDataStack />
        <Ressources />
      </div>
    </div>
  );
}
