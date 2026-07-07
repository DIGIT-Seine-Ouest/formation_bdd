const BASE = import.meta.env.BASE_URL;

const bloc = (accent, label, type, title, desc, href) => `
  <div style="display:flex; flex-direction:column; gap:8px;">
    <p style="font-size:0.58rem; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
        color:${accent}; margin:0; border-bottom:2px solid ${accent}; padding-bottom:6px;">${label}</p>
    <a href="${BASE}${href}" download style="
        display:flex; flex-direction:column; flex:1; text-decoration:none; color:inherit;
        background:#ffffff; border:1px solid #e5e7eb; border-top:4px solid ${accent};
        border-radius:10px; padding:16px 16px; box-shadow:0 6px 18px rgba(0,0,0,0.06);">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
        <span style="font-size:0.8rem; font-weight:700; color:#1e3a5f;">${title}</span>
        <span style="font-size:0.46rem; font-weight:700; color:#94a3b8; border:1px solid #cbd5e1; border-radius:4px; padding:2px 6px;">${type}</span>
      </div>
      <p style="font-size:0.6rem; color:#64748b; margin:0 0 10px; line-height:1.4; flex:1;">${desc}</p>
      <span style="font-size:0.58rem; font-weight:700; color:${accent};">Télécharger &darr;</span>
    </a>
  </div>`;

const ressources = `
<div style="max-width:1020px; margin:0 auto; text-align:left;">
  <p style="font-size:0.64rem; text-transform:uppercase; letter-spacing:4px; color:var(--blue-dirmob, #009fe3); margin:0 0 6px; font-weight:700;">Pour aller plus loin</p>
  <h2 style="margin:0 0 6px;">Les ressources de la formation</h2>
  <p style="font-size:0.78rem; color:#555; margin:0 0 24px;">La théorie, le cas pratique et le résultat, côte à côte.</p>

  <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; align-items:stretch;">
    ${bloc('#009fe3', 'À retenir', 'DOCX', 'Cheat sheet',
        'Les concepts clés de la formation, en quelques pages.',
        'ressources/cheat_sheet.docx')}
    ${bloc('#95c11f', 'Consigne du cas pratique', 'DOCX', 'Guide de construction',
        'Le scénario, les 3 questions métier et le pas-à-pas pour bâtir le fichier.',
        'ressources/guide_construction.docx')}
    ${bloc('#009fe3', 'Le fichier Excel généré', 'ZIP', 'Exercices',
        'reclamations.xlsx (réclamations + tableau de suivi) et les données des collègues.',
        'ressources/exercices.zip')}
    ${bloc('#f59e0b', 'Démos SQL en live', 'ZIP', 'Données Yego',
        'events / trips / vehicles (structure réelle MDS, mock data) + les requêtes DuckDB du cours.',
        'ressources/yego_data.zip')}
  </div>

  <p style="font-size:0.58rem; color:#94a3b8; margin:22px 0 0; text-align:center;">Cliquez sur un bloc pour télécharger.</p>
</div>
`;

export function Ressources() {
  return <section dangerouslySetInnerHTML={{ __html: ressources }} />;
}
