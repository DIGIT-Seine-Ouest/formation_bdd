// Page autonome « usagers » : l’annuaire des librairies (annuaire.html).
import { createRoot } from 'react-dom/client';
import { Annuaire } from './components/Annuaire';

createRoot(document.getElementById('root')).render(<Annuaire pleinePage />);
