import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/formation_bdd/' : '/',
  build: {
    rollupOptions: {
      // la présentation + la page usagers (annuaire des librairies)
      input: { main: resolve(__dirname, 'index.html'), annuaire: resolve(__dirname, 'annuaire.html') },
    },
  },
}));
