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


<!-- 2 · CERCLE VERTUEUX -->
<section>
    <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 6px; font-weight:700;">À la fin de cette formation, vos données vous donneront :</p>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:10px;">

        <div style="background:var(--blue-dirmob); border-radius:12px; padding:26px 24px; color:white;">
            <p style="font-family:'IBM Plex Serif', serif; font-size:1.9rem; font-weight:700; margin:0 0 10px; line-height:1;">EFFICIENCE</p>
            <div style="height:2px; background:rgba(255,255,255,0.3); margin-bottom:12px;"></div>
            <p style="font-size:0.75rem; margin:0; opacity:0.92; line-height:1.5;">Bilan mensuel en 30 secondes<br>au lieu de 45 minutes</p>
        </div>

        <div style="background:var(--green-dirmob); border-radius:12px; padding:26px 24px; color:white;">
            <p style="font-family:'IBM Plex Serif', serif; font-size:1.9rem; font-weight:700; margin:0 0 10px; line-height:1;">VISIBILITÉ</p>
            <div style="height:2px; background:rgba(255,255,255,0.3); margin-bottom:12px;"></div>
            <p style="font-size:0.75rem; margin:0; opacity:0.92; line-height:1.5;">Réclamations par ligne, par motif,<br>par prestataire — en 2 clics</p>
        </div>

        <div style="background:var(--grey-dirmob); border-radius:12px; padding:26px 24px; color:white;">
            <p style="font-family:'IBM Plex Serif', serif; font-size:1.9rem; font-weight:700; margin:0 0 10px; line-height:1;">COMPRÉHENSION</p>
            <div style="height:2px; background:rgba(255,255,255,0.3); margin-bottom:12px;"></div>
            <p style="font-size:0.75rem; margin:0; opacity:0.92; line-height:1.5;">Tendances sur 12 mois,<br>pas seulement le mois courant</p>
        </div>

        <div style="background:#2d6a4f; border-radius:12px; padding:26px 24px; color:white;">
            <p style="font-family:'IBM Plex Serif', serif; font-size:1.9rem; font-weight:700; margin:0 0 10px; line-height:1;">AUTONOMIE</p>
            <div style="height:2px; background:rgba(255,255,255,0.3); margin-bottom:12px;"></div>
            <p style="font-size:0.75rem; margin:0; opacity:0.92; line-height:1.5;">Répondre soi-même aux questions<br>sans attendre le service IT</p>
        </div>

    </div>
    <p style="font-family:'IBM Plex Serif', serif; font-size:0.9rem; font-style:italic; color:#888; margin:16px 0 0; text-align:right;">
        Ce n'est pas de l'informatique. C'est de la rigueur.
    </p>
</section>


<!-- 3 · AVANT / APRÈS -->
<section>
    <div class="row" style="align-items:stretch; height:100%;">

        <div style="flex:1; display:flex; flex-direction:column; gap:10px;">
            <div class="label--bad" style="font-size:0.65rem;">✖ &nbsp;Fait pour l'œil</div>
            <div class="offbeat-card card--red" style="flex:1; padding:16px;">
                <p style="font-size:0.55rem; color:#aaa; margin:0 0 8px; font-family:monospace;">[ Ligne 389 ] &nbsp;[ Ligne 160 ] &nbsp;[ Ligne 91 ]</p>
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
            </div>
        </div>

        <div style="display:flex; align-items:center; padding:0 14px; font-size:1.6rem; color:#ccc;">→</div>

        <div class="fragment" style="flex:1; display:flex; flex-direction:column; gap:10px;">
            <div class="label--good" style="font-size:0.65rem;">✔ &nbsp;Fait pour la machine</div>
            <div class="offbeat-card card--green" style="flex:1; padding:16px;">
                <p style="font-size:0.55rem; color:#1e3a5f; background:#dbe4ff; margin:0 0 8px; padding:3px 8px; border-radius:4px; font-weight:700; font-family:monospace; display:inline-block;">reclamations</p>
                <table class="mockup-table">
                    <tr>
                        <th style="background:#1e40af; color:white;">id</th>
                        <th>date</th>
                        <th style="background:#fef3c7; color:#a16207;">reclamant_id</th>
                        <th style="background:#fef3c7; color:#a16207;">id_ligne</th>
                        <th>motif</th>
                        <th>statut</th>
                    </tr>
                    <tr>
                        <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R001</td>
                        <td>05/03/2026</td>
                        <td style="color:#a16207; font-weight:700;">1</td>
                        <td style="color:#a16207; font-weight:700;">L1</td>
                        <td>retard</td><td>ouverte</td>
                    </tr>
                    <tr>
                        <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R002</td>
                        <td>07/03/2026</td>
                        <td style="color:#a16207; font-weight:700;">2</td>
                        <td style="color:#a16207; font-weight:700;">L2</td>
                        <td>avance</td><td>cloture</td>
                    </tr>
                    <tr>
                        <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R003</td>
                        <td>10/03/2026</td>
                        <td style="color:#a16207; font-weight:700;">1</td>
                        <td style="color:#a16207; font-weight:700;">L1</td>
                        <td>retard</td><td>ouverte</td>
                    </tr>
                </table>
            </div>
        </div>

    </div>
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
