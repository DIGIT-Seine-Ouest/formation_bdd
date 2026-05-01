window.SLIDES = window.SLIDES || {};

window.SLIDES.module1 = `

<!-- ════════════════════════════════════════════════
     MODULE 1 — Tableau vs BDD
════════════════════════════════════════════════ -->

<!-- 5 · SECTION MODULE 1 -->
<section data-background-color="#009fe3">
    <div style="text-align:left; max-width:680px; margin:0 auto; color:white;">
        <p class="section-intro-label" style="color:white;">Module 1 · 15 min</p>
        <p class="section-intro-title">Tableau de suivi<br>vs<br>Base de données</p>
        <p class="section-intro-sub">La différence fondamentale — et pourquoi elle change tout.</p>
    </div>
</section>


<!-- 6 · LE MÊME FICHIER, DEUX RÉALITÉS -->
<section>
    <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 14px; font-weight:700;">Les réclamations DIRMOB — le même fichier</p>
    <div class="row">
        <div style="flex:1;">
            <div class="label--bad">Version actuelle — fait pour l'œil</div>
            <div class="offbeat-card card--red" style="padding:12px;">
                <table class="mockup-table">
                    <tr>
                        <th style="background:#ffe082;">Date</th>
                        <th style="background:#ffe082;">Nom/Email</th>
                        <th style="background:#ffe082;">Ligne/Prestataire</th>
                        <th style="background:#ffe082;">Problème</th>
                    </tr>
                    <tr style="background:#ffcdd2;">
                        <td>05/03</td><td>Martin j.martin@...</td><td>389 - Keolis</td><td>retard 10 min</td>
                    </tr>
                    <tr style="background:#c8e6c9;">
                        <td>07/03</td><td>a.dupont@...</td><td>160 - RATP</td><td>avance</td>
                    </tr>
                    <tr style="background:#ffcdd2;">
                        <td>10/03</td><td>n.nguyen@...</td><td>389 - Keolis</td><td>retard 10 min</td>
                    </tr>
                </table>
                <p style="font-size:0.58rem; color:#b91c1c; margin:6px 0 0; line-height:1.5;">
                    ✖ Couleurs portent le statut<br>
                    ✖ Nom + email collés dans une cellule<br>
                    ✖ Ligne + prestataire collés
                </p>
            </div>
        </div>
        <div style="display:flex; align-items:center; font-size:1.4rem; color:#ccc; padding:0 6px; flex-direction:column; justify-content:center; gap:8px;">
            <span>→</span>
        </div>
        <div style="flex:1;">
            <div class="label--good">Version cible — fait pour la machine</div>
            <div class="offbeat-card card--green" style="padding:12px;">
                <p style="font-size:0.58rem; color:#1e3a5f; background:#dbe4ff; margin:0 0 6px; padding:4px 8px; border-radius:4px; font-weight:700; font-family:monospace;">reclamations</p>
                <table class="mockup-table">
                    <tr>
                        <th style="background:#1e40af; color:white;">id</th>
                        <th>date</th>
                        <th style="background:#fffbeb; color:#a16207;">reclamant_id</th>
                        <th style="background:#fffbeb; color:#a16207;">id_ligne</th>
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
                <p style="font-size:0.58rem; color:#15803d; margin:6px 0 0; line-height:1.5;">
                    ✔ Filtrable, comptable, joinable<br>
                    ✔ Logique OLAP : répond aux questions non anticipées<br>
                    ✔ Repris par n'importe qui, n'importe quand
                </p>
            </div>
        </div>
    </div>
</section>


<!-- 7 · ANATOMIE D'UNE TABLE -->
<section>
    <h2>Anatomie d'une table — le vocabulaire</h2>
    <p style="font-size:0.72rem; color:#888; margin-top:-16px; margin-bottom:12px;">
        Une base de données = un ensemble de tables reliées · À la DIRMOB : réclamations, lignes de bus, prestataires…
    </p>
    <div style="margin-bottom:14px;">
        <p style="font-size:0.6rem; color:#1e3a5f; background:#dbe4ff; display:inline-block; padding:4px 12px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 6px;">Table : reclamations</p>
        <table class="mockup-table" style="font-size:0.58em;">
            <tr>
                <th style="background:#1e40af; color:white;">id <span style="display:block; font-size:0.7em; font-weight:400; opacity:0.8;">PK</span></th>
                <th>date</th>
                <th style="background:#fef3c7; color:#a16207;">reclamant_id <span style="display:block; font-size:0.7em; font-weight:400;">FK</span></th>
                <th style="background:#fef3c7; color:#a16207;">id_ligne <span style="display:block; font-size:0.7em; font-weight:400;">FK</span></th>
                <th>motif</th>
                <th>statut</th>
            </tr>
            <tr style="background:#dcfce7;">
                <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R001</td>
                <td>05/03/2026</td>
                <td style="background:#fef3c7; color:#a16207; font-weight:700;">1</td>
                <td style="background:#fef3c7; color:#a16207; font-weight:700;">L1</td>
                <td style="background:#ede9fe; color:#6b21a8; font-weight:700;">retard</td>
                <td>ouverte</td>
            </tr>
            <tr>
                <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R002</td>
                <td>07/03/2026</td>
                <td style="background:#fef3c7; color:#a16207; font-weight:700;">2</td>
                <td style="background:#fef3c7; color:#a16207; font-weight:700;">L2</td>
                <td>avance</td><td>cloture</td>
            </tr>
            <tr>
                <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R003</td>
                <td>10/03/2026</td>
                <td style="background:#fef3c7; color:#a16207; font-weight:700;">1</td>
                <td style="background:#fef3c7; color:#a16207; font-weight:700;">L1</td>
                <td>panne</td><td>ouverte</td>
            </tr>
        </table>
    </div>
    <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:8px;">
        <div class="fragment" style="background:#dbe4ff; border-radius:6px; padding:8px 10px; border-left:3px solid #1e40af;">
            <p style="font-size:0.6rem; font-weight:700; color:#1e40af; margin:0 0 2px;">IDENTIFIANT (PK)</p>
            <p style="font-size:0.58rem; color:#333; margin:0;">Désigne la ligne sans ambiguïté</p>
        </div>
        <div class="fragment" style="background:#fef3c7; border-radius:6px; padding:8px 10px; border-left:3px solid #a16207;">
            <p style="font-size:0.6rem; font-weight:700; color:#a16207; margin:0 0 2px;">RELATION (FK)</p>
            <p style="font-size:0.58rem; color:#333; margin:0;">Pointe vers une autre table</p>
        </div>
        <div class="fragment" style="background:#dcfce7; border-radius:6px; padding:8px 10px; border-left:3px solid #15803d;">
            <p style="font-size:0.6rem; font-weight:700; color:#15803d; margin:0 0 2px;">ENREGISTREMENT</p>
            <p style="font-size:0.58rem; color:#333; margin:0;">Une réclamation complète (ligne)</p>
        </div>
        <div class="fragment" style="background:#f0f0f0; border-radius:6px; padding:8px 10px; border-left:3px solid #555;">
            <p style="font-size:0.6rem; font-weight:700; color:#555; margin:0 0 2px;">CHAMP</p>
            <p style="font-size:0.58rem; color:#333; margin:0;">Catégorie d'information (colonne)</p>
        </div>
        <div class="fragment" style="background:#ede9fe; border-radius:6px; padding:8px 10px; border-left:3px solid #6b21a8;">
            <p style="font-size:0.6rem; font-weight:700; color:#6b21a8; margin:0 0 2px;">ATTRIBUT</p>
            <p style="font-size:0.58rem; color:#333; margin:0;">Valeur à l'intersection ligne/colonne</p>
        </div>
    </div>
</section>


<!-- 8 · CRUD -->
<section>
    <h2>Les 4 opérations d'une base</h2>
    <p style="font-size:0.76rem; color:#888; margin-top:-16px; margin-bottom:16px;">
        Une base robuste doit permettre ces 4 actions sur <strong>n'importe quelle ligne</strong>, sans manipulation manuelle
    </p>
    <div class="crud-grid">
        <div class="crud-box fragment" style="background:#1e40af;">
            <div class="crud-letter">C</div>
            <div class="crud-name">Create</div>
            <div class="crud-example">Nouvelle réclamation R004 — Martin, ligne 389, motif : retard</div>
        </div>
        <div class="crud-box fragment" style="background:#15803d;">
            <div class="crud-letter">R</div>
            <div class="crud-name">Read</div>
            <div class="crud-example">Toutes les réclamations statut = "ouverte" de la ligne L1</div>
        </div>
        <div class="crud-box fragment" style="background:var(--grey-dirmob);">
            <div class="crud-letter">U</div>
            <div class="crud-name">Update</div>
            <div class="crud-example">R001 → statut passe de "ouverte" à "cloture"</div>
        </div>
        <div class="crud-box fragment" style="background:var(--red-alert);">
            <div class="crud-letter">D</div>
            <div class="crud-name">Delete</div>
            <div class="crud-example">Supprimer R002 : doublon identifié lors du diagnostic</div>
        </div>
    </div>
    <div class="fragment" style="margin-top:16px; background:#fde8e8; border-radius:8px; padding:12px 18px; border-left:4px solid var(--red-alert);">
        <p style="margin:0; font-size:0.76rem; color:#b91c1c;">
            Sur un tableau coloré : le <strong>R</strong> passe par un filtre manuel fragile · le <strong>U</strong> = changer une couleur à la main · le résultat est introuvable pour une machine.
        </p>
    </div>
</section>

`;
