window.SLIDES = window.SLIDES || {};

window.SLIDES.accueil = `

<!-- ════════════════════════════════════════════════
     ACCUEIL
════════════════════════════════════════════════ -->

<!-- 1 · TITRE -->
<section data-background-gradient="linear-gradient(135deg, #009fe3 0%, #95c11f 100%)">
    <div style="background:rgba(255,255,255,0.93); padding:50px 60px; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.2);">
        <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 10px; font-weight:700;">DIRMOB — Formation</p>
        <h1 style="margin:0; line-height:1.1;">Vers des données<br>robustes</h1>
        <div class="separator"></div>
        <p style="font-family:'IBM Plex Serif'; font-size:1.05rem; color:#555; margin:0;">
            Base de données · 2 h &nbsp;|&nbsp; 45 min théorie &nbsp;+&nbsp; 1h15 pratique
        </p>
    </div>
</section>


<!-- 2 · LE CONSTAT -->
<section>
    <h2>Le constat : nos tableaux actuels</h2>
    <div class="row">
        <div class="offbeat-card fragment card--red" style="flex:1;">
            <div class="label--bad">Tableau "aide-mémoire"</div>
            <table class="mockup-table">
                <tr><th>Ligne</th><th>Statut</th><th>Détails</th></tr>
                <tr><td style="background:#fff9c4">Bus 21</td><td style="background:#ffcdd2">Urgent</td><td>Retard + Propreté</td></tr>
                <tr><td>Bus 64</td><td style="background:#c8e6c9">OK</td><td>R.A.S.</td></tr>
                <tr><td style="background:#fff9c4">Bus 21</td><td style="background:#ffe082">Attente</td><td>Attitude + Retard</td></tr>
            </table>
            <p style="font-size:0.6rem; color:var(--red-alert); margin:8px 0 0;">
                ✖ Statut stocké dans une couleur<br>
                ✖ Plusieurs motifs dans une cellule<br>
                ✖ Un onglet par ligne de bus
            </p>
        </div>
        <div style="display:flex; align-items:center; font-size:1.4rem; color:#ccc; padding:0 4px;">→</div>
        <div class="offbeat-card fragment card--green" style="flex:1;">
            <div class="label--good">Base de données</div>
            <table class="mockup-table">
                <tr><th>id</th><th>date</th><th>reclamant_id</th><th>motif</th><th>statut</th></tr>
                <tr><td style="color:#1e40af; font-weight:700;">R001</td><td>05/03/2026</td><td style="color:#a16207;">1</td><td>retard</td><td>ouverte</td></tr>
                <tr><td style="color:#1e40af; font-weight:700;">R002</td><td>07/03/2026</td><td style="color:#a16207;">2</td><td>avance</td><td>cloture</td></tr>
                <tr><td style="color:#1e40af; font-weight:700;">R003</td><td>10/03/2026</td><td style="color:#a16207;">1</td><td>retard</td><td>ouverte</td></tr>
            </table>
            <p style="font-size:0.6rem; color:#2e7d32; margin:8px 0 0;">
                ✔ Filtrable, triable, comptable<br>
                ✔ TCD en 2 clics<br>
                ✔ Repris par n'importe qui
            </p>
        </div>
    </div>
    <div class="separator fragment"></div>
    <p class="fragment" style="font-family:'IBM Plex Serif'; font-style:italic; font-size:1rem; margin:0;">
        "Passer d'un tableau qu'on <strong>lit</strong> à une donnée qu'on <strong>exploite</strong>."
    </p>
</section>


<!-- 3 · PROGRAMME -->
<section>
    <h2>Ce qui vous attend aujourd'hui</h2>
    <div class="row" style="margin-top:20px; align-items:center;">
        <div style="flex:1; display:flex; flex-direction:column; gap:14px;">
            <div class="offbeat-card">
                <div style="display:flex; align-items:center; gap:14px;">
                    <div style="width:44px; height:44px; background:var(--blue-dirmob); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:1rem; flex-shrink:0;">1</div>
                    <div style="flex:1;">
                        <p style="margin:0; font-weight:700; font-size:0.88rem;">Théorie — 45 min</p>
                        <p style="margin:0; font-size:0.68rem; color:#666;">Les règles fondatrices, les types, les 3 frictions</p>
                    </div>
                    <span style="font-size:0.65rem; color:var(--blue-dirmob); font-weight:700; white-space:nowrap;">14h30 → 15h15</span>
                </div>
            </div>
            <div class="offbeat-card card--green">
                <div style="display:flex; align-items:center; gap:14px;">
                    <div style="width:44px; height:44px; background:var(--green-dirmob); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:1rem; flex-shrink:0;">2</div>
                    <div style="flex:1;">
                        <p style="margin:0; font-weight:700; font-size:0.88rem;">Serious Game — 1h15</p>
                        <p style="margin:0; font-size:0.68rem; color:#666;">Diagnostic · Reconstruction · Exploitation</p>
                    </div>
                    <span style="font-size:0.65rem; color:var(--green-dirmob); font-weight:700; white-space:nowrap;">15h15 → 16h30</span>
                </div>
            </div>
        </div>
        <div class="fragment" style="flex:0 0 38%; text-align:center;">
            <div style="background:var(--light-grey); border-radius:12px; padding:24px;">
                <p style="font-size:0.65rem; text-transform:uppercase; letter-spacing:2px; color:#999; margin:0 0 6px;">Fil rouge</p>
                <p style="font-family:'IBM Plex Serif'; font-size:1.15rem; font-weight:600; margin:0; color:var(--grey-dirmob);">Suivi des<br>réclamations DIRMOB</p>
                <div class="separator" style="margin:14px 0;"></div>
                <p style="font-size:0.62rem; color:#666; margin:0;">Un fichier volontairement dégradé.<br>Votre mission : le rendre exploitable.</p>
            </div>
        </div>
    </div>
</section>


<!-- 4 · TEASER CONCEPTS -->
<section>
    <h2>Deux concepts à garder en tête</h2>
    <div class="row">
        <div class="col-6 fragment">
            <div class="citation" style="padding:22px !important;">
                <p style="font-size:1.1rem !important; margin:0 0 8px; font-weight:700;">L'ATOMICITÉ</p>
                <div style="height:1px; background:rgba(255,255,255,0.3); margin:8px 0;"></div>
                <p style="font-size:0.8rem !important; font-family:'Roboto'; margin:0;">
                    "1 colonne = 1 seule information"<br>
                    Fini les cellules fourre-tout.
                </p>
            </div>
        </div>
        <div class="col-6 fragment">
            <div class="citation" style="background:var(--grey-dirmob); padding:22px !important;">
                <p style="font-size:1.1rem !important; margin:0 0 8px; font-weight:700;">L'IDENTITÉ</p>
                <div style="height:1px; background:rgba(255,255,255,0.3); margin:8px 0;"></div>
                <p style="font-size:0.8rem !important; font-family:'Roboto'; margin:0;">
                    "Chaque ligne est unique"<br>
                    Grâce à l'ID, on ne perd jamais une réclamation.
                </p>
            </div>
        </div>
    </div>
    <div class="fragment" style="margin-top:26px;">
        <span class="button--green">Prêt à changer de regard sur vos données ?</span>
    </div>
</section>

`;
