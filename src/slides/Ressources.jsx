const BASE = import.meta.env.BASE_URL;

const card = (accent, tag, type, title, desc, href) => `
  <a href="${BASE}${href}" download style="
      display:block; text-decoration:none; color:inherit;
      background:#ffffff; border:1px solid #e5e7eb; border-left:5px solid ${accent};
      border-radius:10px; padding:16px 18px; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
      <span style="font-size:0.52rem; font-weight:700; letter-spacing:1.5px; color:${accent}; text-transform:uppercase;">${tag}</span>
      <span style="font-size:0.46rem; font-weight:700; color:#94a3b8; border:1px solid #cbd5e1; border-radius:4px; padding:2px 6px;">${type}</span>
    </div>
    <p style="font-size:0.8rem; font-weight:700; color:#1e3a5f; margin:0 0 3px;">${title}</p>
    <p style="font-size:0.6rem; color:#64748b; margin:0; line-height:1.35;">${desc}</p>
  </a>`;

const ressources = `
<div style="max-width:880px; margin:0 auto; text-align:left;">
  <p style="font-size:0.64rem; text-transform:uppercase; letter-spacing:4px; color:var(--blue-dirmob, #009fe3); margin:0 0 6px; font-weight:700;">Pour aller plus loin</p>
  <h2 style="margin:0 0 6px;">Les ressources de la formation</h2>
  <p style="font-size:0.78rem; color:#555; margin:0 0 22px;">Tout pour comprendre le fichier de correction et le refaire vous-même.</p>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
    ${card('#009fe3', 'Cheat sheet', 'DOCX', 'À retenir',
        'Les concepts clés de la formation, en quelques pages.',
        'ressources/cheat_sheet.docx')}
    ${card('#95c11f', 'Documentation', 'DOCX', 'Guide de construction',
        'Le pas-à-pas pour bâtir le fichier : entités, jointure, enrichissement, tableau de suivi.',
        'ressources/guide_construction.docx')}
    ${card('#009fe3', 'Exercice', 'ZIP', 'Les données des collègues',
        'Le point de départ : prestataires et lignes de bus. À vous de bâtir le suivi.',
        'ressources/exercice_donnees_collegues.zip')}
    ${card('#95c11f', 'Correction', 'ZIP', 'Le fichier complet',
        'La table des réclamations enrichie et son tableau de suivi (KPI + TCD).',
        'ressources/correction.zip')}
  </div>

  <p style="font-size:0.58rem; color:#94a3b8; margin:18px 0 0; text-align:center;">Cliquez sur une carte pour télécharger.</p>
</div>
`;

export function Ressources() {
  return <section dangerouslySetInnerHTML={{ __html: ressources }} />;
}
