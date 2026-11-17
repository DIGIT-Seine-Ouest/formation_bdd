import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages sert le site sous /formation_bdd/ : la version compilée (build) et sa
// prévisualisation locale (preview) utilisent ce préfixe ; le serveur de dev reste à la racine.
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  base: command === 'build' || isPreview ? '/formation_bdd/' : '/',
  build: {
    rollupOptions: {
      // la présentation + la page usagers (annuaire des librairies)
      input: { main: resolve(__dirname, 'index.html'), annuaire: resolve(__dirname, 'annuaire.html') },
    },
  },
}));
