const titre = `
<div style="max-width:820px; margin:0 auto;">
    <div style="
        background:rgba(255,255,255,0.96);
        padding:50px 60px 44px;
        border-radius:4px 4px 16px 16px;
        box-shadow:0 28px 70px rgba(0,0,0,0.25);
        border-top:5px solid #009fe3;
        position:relative; overflow:hidden;">

        <div aria-hidden="true" style="
            position:absolute; top:0; right:0;
            width:0; height:0; border-style:solid;
            border-width:0 110px 110px 0;
            border-color:transparent rgba(149,193,31,0.08) transparent transparent;
            pointer-events:none;"></div>

        <p style="
            position:relative; z-index:1;
            font-size:0.66rem; text-transform:uppercase;
            letter-spacing:4px; color:#009fe3;
            margin:0 0 12px; font-weight:700;">
            DIRMOB — Formation · 2026</p>

        <h1 style="
            position:relative; z-index:1;
            margin:0; line-height:1.08; font-size:2.8rem;">
            Vers des données<br>robustes</h1>

        <div style="
            position:relative; z-index:1;
            width:56px; height:3px; margin:18px 0 20px;
            background:linear-gradient(90deg, #009fe3, #95c11f);
            border-radius:2px;"></div>

        <p style="
            position:relative; z-index:1;
            font-family:'IBM Plex Serif',serif;
            font-size:1rem; color:#666;
            margin:0 0 20px; line-height:1.6;">
            Structurer ses données pour qu'elles soient exploitables — pas seulement lisibles.
        </p>

        <span style="
            position:relative; z-index:1;
            display:inline-block;
            background:#f0f4f8; color:#888;
            font-size:0.64rem; font-family:monospace;
            padding:5px 14px; border-radius:20px; letter-spacing:1px;">
            2 h · 45 min théorie · 1h15 pratique</span>
    </div>
</div>
`;

const enjeu = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 6px; font-weight:700;">L'enjeu</p>
<h2 style="margin-top:0; margin-bottom:16px;">Le même fichier, deux façons de le tenir</h2>

<div class="row" style="align-items:stretch;">
    <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
        <div class="label--bad">✖ &nbsp;Fait pour l'œil</div>
        <div class="offbeat-card card--red" style="flex:1; padding:14px;">
            <p style="font-size:0.54rem; color:#aaa; margin:0 0 7px; font-family:monospace;">[ Ligne 389 ] &nbsp;[ Ligne 160 ] &nbsp;[ Ligne 91 ]</p>
            <table class="mockup-table">
                <tr>
                    <th style="background:#ffe082;">Date</th>
                    <th style="background:#ffe082;">Nom / Email</th>
                    <th style="background:#ffe082;">Ligne / Prestataire</th>
                    <th style="background:#ffe082;">Problème</th>
                </tr>
                <tr style="background:#ffcdd2;">
                    <td>05/03</td><td>Martin j.martin@…</td><td>389 - Keolis</td><td>retard 10 min</td>
                </tr>
                <tr style="background:#c8e6c9;">
                    <td>07/03</td><td>a.dupont@…</td><td>160 - RATP</td><td>avance</td>
                </tr>
                <tr style="background:#ffcdd2;">
                    <td>10/03</td><td>n.nguyen@…</td><td>389 - Keolis</td><td>retard 10 min</td>
                </tr>
            </table>
            <p style="font-size:0.62rem; color:#b91c1c; margin:8px 0 0; line-height:1.6;">
                "Combien de retards sur toutes les lignes ?"<br>
                <strong>→ Manipulation manuelle obligatoire.</strong>
            </p>
        </div>
    </div>

    <div style="display:flex; align-items:center; padding:0 12px; font-size:1.6rem; color:#ccc;">→</div>

    <div class="fragment" style="flex:1; display:flex; flex-direction:column; gap:8px;">
        <div class="label--good">✔ &nbsp;Fait pour la machine</div>
        <div class="offbeat-card card--green" style="flex:1; padding:14px;">
            <p style="font-size:0.54rem; color:#1e3a5f; background:#dbe4ff; margin:0 0 7px; padding:3px 8px; border-radius:4px; font-weight:700; font-family:monospace; display:inline-block;">reclamations</p>
            <table class="mockup-table">
                <tr>
                    <th style="background:#1e40af; color:white;">id</th>
                    <th>date</th>
                    <th style="background:#fef3c7; color:#a16207;">id_ligne</th>
                    <th>motif</th>
                    <th>statut</th>
                </tr>
                <tr>
                    <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R001</td>
                    <td>05/03/2026</td>
                    <td style="color:#a16207; font-weight:700;">L1</td>
                    <td>retard</td><td>ouverte</td>
                </tr>
                <tr>
                    <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R002</td>
                    <td>07/03/2026</td>
                    <td style="color:#a16207; font-weight:700;">L2</td>
                    <td>avance</td><td>cloture</td>
                </tr>
                <tr>
                    <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R003</td>
                    <td>10/03/2026</td>
                    <td style="color:#a16207; font-weight:700;">L1</td>
                    <td>retard</td><td>ouverte</td>
                </tr>
            </table>
            <p style="font-size:0.62rem; color:#15803d; margin:8px 0 0; line-height:1.6;">
                COUNTIF(motif, "retard") = 2 · filtre par ligne : 1 clic<br>
                <strong>→ La structure fait le travail.</strong>
            </p>
        </div>
    </div>
</div>
`;

const programme = `
<h2>Ce que vous allez apprendre</h2>
<div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 22px;"></div>

<div style="display:flex; flex-direction:column; gap:12px; max-width:720px; margin:0 auto;">

    <div class="offbeat-card fragment" style="padding:14px 18px;">
        <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:40px; height:40px; background:#009fe3; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:0.9rem; flex-shrink:0;">1</div>
            <div>
                <p style="margin:0; font-weight:700; font-size:0.86rem;">Qu'est-ce qu'une base de données ?</p>
                <p style="margin:3px 0 0; font-size:0.68rem; color:#666;">Structure, terminologie, liens entre tables</p>
            </div>
        </div>
    </div>

    <div class="offbeat-card fragment" style="padding:14px 18px;">
        <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:40px; height:40px; background:#009fe3; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:0.9rem; flex-shrink:0;">2</div>
            <div>
                <p style="margin:0; font-weight:700; font-size:0.86rem;">Tableau de suivi vs base de données</p>
                <p style="margin:3px 0 0; font-size:0.68rem; color:#666;">La confusion la plus fréquente — et comment en sortir</p>
            </div>
        </div>
    </div>

    <div class="offbeat-card fragment" style="padding:14px 18px; border-left-color:#333;">
        <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:40px; height:40px; background:#333; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:0.9rem; flex-shrink:0;">3</div>
            <div>
                <p style="margin:0; font-weight:700; font-size:0.86rem;">Les règles fondatrices</p>
                <p style="margin:3px 0 0; font-size:0.68rem; color:#666;">Atomicité · types de données · identifiant unique</p>
            </div>
        </div>
    </div>

    <div class="offbeat-card fragment card--red" style="padding:14px 18px;">
        <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:40px; height:40px; background:var(--red-alert); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:0.9rem; flex-shrink:0;">!</div>
            <div>
                <p style="margin:0; font-weight:700; font-size:0.86rem;">Les 3 erreurs à éviter</p>
                <p style="margin:3px 0 0; font-size:0.68rem; color:#666;">Éclatement · encodage couleur · listes dans une cellule</p>
            </div>
        </div>
    </div>

</div>
`;

export function Accueil() {
  return (
    <>
      <section
        data-background-gradient="linear-gradient(135deg, #009fe3 0%, #95c11f 100%)"
        dangerouslySetInnerHTML={{ __html: titre }}
      />
      <section dangerouslySetInnerHTML={{ __html: enjeu }} />
      <section dangerouslySetInnerHTML={{ __html: programme }} />
    </>
  );
}
