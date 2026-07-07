// ─── Partie 2 : les deux typologies de BDD à l'ère de l'analytics ─────────────
// OLTP (opérationnel) vs OLAP (analyse) — définitions canoniques, exemples
// concrets, et la question du contenu (structuré / non structuré).

const intro = `
<div style="text-align:left; max-width:720px; margin:0 auto; color:white;">
    <p class="section-intro-label" style="color:white;">Partie 2</p>
    <p class="section-intro-title">Deux typologies<br>de bases de données</p>
    <p class="section-intro-sub">OLTP · OLAP — la séparation fondatrice à l'ère de l'analytics, de la BI et de l'économétrie.</p>
</div>
`;

const oltpOlap = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Les deux mondes — les vraies définitions</p>
<h2 style="margin-top:0;">OLTP &nbsp;·&nbsp; OLAP : deux bases, deux moteurs</h2>

<div style="display:flex; gap:14px; align-items:stretch; margin-bottom:12px;">

    <div style="flex:1; border-radius:10px; overflow:hidden; border:2px solid #2563eb;">
        <div style="background:#2563eb; padding:9px 16px;">
            <p style="font-size:0.66rem; font-weight:700; color:white; margin:0;">OLTP · <span style="opacity:0.85; font-weight:400;">online transaction processing</span></p>
        </div>
        <div style="background:#eff6ff; padding:13px 16px;">
            <p style="font-size:0.62rem; color:#1e3a5f; margin:0 0 10px; line-height:1.65;">
                Assiste les usagers à <strong>tenir l'état des activités quotidiennes</strong>. Stocke sur le champ chaque opération.
            </p>
            <div style="display:flex; flex-wrap:wrap; gap:5px; margin-bottom:10px;">
                <span style="font-size:0.5rem; background:#dbeafe; color:#1e40af; padding:2px 8px; border-radius:10px;">achats</span>
                <span style="font-size:0.5rem; background:#dbeafe; color:#1e40af; padding:2px 8px; border-radius:10px;">ventes</span>
                <span style="font-size:0.5rem; background:#dbeafe; color:#1e40af; padding:2px 8px; border-radius:10px;">réservations</span>
                <span style="font-size:0.5rem; background:#dbeafe; color:#1e40af; padding:2px 8px; border-radius:10px;">paiements</span>
            </div>
            <p style="font-size:0.56rem; color:#2563eb; font-weight:700; margin:0 0 4px;">Accent : vitesse de réponse · concurrence</p>
            <p style="font-size:0.55rem; color:#555; margin:0; line-height:1.6;">Des milliers d'opérations simultanées, écrites en temps réel.</p>
            <p style="font-size:0.5rem; color:#94a3b8; margin:8px 0 0; font-style:italic;">Ex. : PostgreSQL, Oracle · billettique · Arcopole (saisie SIG)</p>
        </div>
    </div>

    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0; gap:5px;">
        <p style="font-size:0.44rem; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin:0; text-align:center; line-height:1.7;">copie<br>quotidienne</p>
        <div style="font-size:1.8rem; color:#7c3aed; line-height:1;">→</div>
    </div>

    <div style="flex:1; border-radius:10px; overflow:hidden; border:2px solid #9333ea;">
        <div style="background:#9333ea; padding:9px 16px;">
            <p style="font-size:0.66rem; font-weight:700; color:white; margin:0;">OLAP · <span style="opacity:0.85; font-weight:400;">online analytical processing</span></p>
        </div>
        <div style="background:#faf5ff; padding:13px 16px;">
            <p style="font-size:0.62rem; color:#4c1d95; margin:0 0 10px; line-height:1.65;">
                Composée d'<strong>informations historiques</strong> (des mesures) sur lesquelles on lance des <strong>opérations massives</strong> → statistiques &amp; prévisions.
            </p>
            <div style="background:white; border-radius:6px; padding:7px 11px; border-left:3px solid #9333ea; margin-bottom:10px;">
                <p style="font-size:0.55rem; color:#6b21a8; margin:0; line-height:1.55;">Souvent un <strong>entrepôt de données</strong> (datawarehouse) : collecte quotidienne d'énormes volumes historiques depuis l'OLTP.</p>
            </div>
            <p style="font-size:0.56rem; color:#7c3aed; font-weight:700; margin:0 0 4px;">Accent : traitements très complexes</p>
            <p style="font-size:0.55rem; color:#555; margin:0; line-height:1.6;">Le SGBD est essentiellement un <strong>moteur d'analyse</strong> — évolution temporelle, management.</p>
            <p style="font-size:0.5rem; color:#94a3b8; margin:8px 0 0; font-style:italic;">Ex. : BigQuery, Snowflake · tableaux de bord des élus</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#fefce8; border-radius:8px; padding:11px 20px; border-left:4px solid #ca8a04;">
    <p style="font-size:0.74rem; color:#333; margin:0; line-height:1.7;">
        <strong style="color:#92400e;">La bascule clé :</strong> l'OLAP n'écrit jamais dans l'OLTP — il en <strong>copie l'historique</strong>, à intervalle régulier.
        Faire les deux dans la même base (ou le même Excel) les fait se gêner : c'est tout le problème.
    </p>
</div>
`;

const exemples1 = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">OLTP vs OLAP — des exemples concrets</p>
<h2 style="margin-top:0;">Base de données vs tableau de suivi (1/2)</h2>

<div class="row" style="margin-top:10px; align-items:stretch; gap:16px;">

    <div class="offbeat-card" style="flex:1; padding:14px 16px;">
        <p style="font-size:0.64rem; font-weight:700; color:#333; margin:0 0 10px;">🏃 Strava — course à pied</p>

        <p style="font-size:0.5rem; font-weight:700; color:#009fe3; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 5px;">Base de données · OLTP</p>
        <table class="mockup-table" style="font-size:0.48em; margin-bottom:6px;">
            <tr><th>date</th><th>km</th><th>durée</th><th>allure</th></tr>
            <tr><td>03/01</td><td>8,2</td><td>42:15</td><td>5'09"/km</td></tr>
            <tr><td>05/01</td><td>12,0</td><td>1:01:30</td><td>5'07"/km</td></tr>
            <tr><td>08/01</td><td>5,5</td><td>28:00</td><td>5'05"/km</td></tr>
        </table>

        <p style="font-size:0.58rem; text-align:center; color:#ccc; margin:5px 0;">↓ &nbsp;TCD / agrégation</p>

        <p style="font-size:0.5rem; font-weight:700; color:#95c11f; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 5px;">Tableau de suivi · OLAP</p>
        <table class="mockup-table" style="font-size:0.48em;">
            <tr><th>Mois</th><th style="background:#dcfce7; color:#15803d;">Total km</th><th>Sorties</th><th>Meilleure allure</th></tr>
            <tr><td>Janvier</td><td style="color:#15803d; font-weight:700;">25,7 km</td><td>3</td><td>5'05"/km</td></tr>
        </table>
    </div>

    <div class="offbeat-card" style="flex:1; padding:14px 16px;">
        <p style="font-size:0.64rem; font-weight:700; color:#333; margin:0 0 10px;">🧸 Magasin de jouets</p>

        <p style="font-size:0.5rem; font-weight:700; color:#009fe3; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 5px;">Base de données · OLTP</p>
        <table class="mockup-table" style="font-size:0.48em; margin-bottom:6px;">
            <tr><th>date</th><th>article</th><th>qté</th><th>prix unit.</th></tr>
            <tr><td>01/12</td><td>Lego City</td><td>2</td><td>39,90 €</td></tr>
            <tr><td>01/12</td><td>Poupée</td><td>1</td><td>24,50 €</td></tr>
            <tr><td>02/12</td><td>Lego City</td><td>3</td><td>39,90 €</td></tr>
        </table>

        <p style="font-size:0.58rem; text-align:center; color:#ccc; margin:5px 0;">↓ &nbsp;TCD / agrégation</p>

        <p style="font-size:0.5rem; font-weight:700; color:#95c11f; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 5px;">Tableau de suivi · OLAP</p>
        <table class="mockup-table" style="font-size:0.48em;">
            <tr><th>Article</th><th style="background:#dcfce7; color:#15803d;">Ventes déc.</th><th>CA déc.</th></tr>
            <tr><td>Lego City</td><td style="color:#15803d; font-weight:700;">5</td><td>199,50 €</td></tr>
            <tr><td>Poupée</td><td style="color:#15803d; font-weight:700;">1</td><td>24,50 €</td></tr>
        </table>
    </div>

</div>
`;

const exemples2 = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">OLTP vs OLAP — des exemples concrets</p>
<h2 style="margin-top:0;">Base de données vs tableau de suivi (2/2)</h2>

<div class="row" style="margin-top:10px; align-items:stretch; gap:16px; margin-bottom:14px;">

    <div class="offbeat-card" style="flex:1; padding:14px 16px;">
        <p style="font-size:0.64rem; font-weight:700; color:#333; margin:0 0 10px;">🛒 Liste de courses</p>

        <p style="font-size:0.5rem; font-weight:700; color:#009fe3; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 5px;">Base de données · OLTP</p>
        <table class="mockup-table" style="font-size:0.48em; margin-bottom:6px;">
            <tr><th>date</th><th>article</th><th>catégorie</th><th>prix</th></tr>
            <tr><td>05/01</td><td>lait</td><td>produits laitiers</td><td>1,20 €</td></tr>
            <tr><td>07/01</td><td>pain</td><td>boulangerie</td><td>2,50 €</td></tr>
            <tr><td>12/01</td><td>lait</td><td>produits laitiers</td><td>1,20 €</td></tr>
        </table>

        <p style="font-size:0.58rem; text-align:center; color:#ccc; margin:5px 0;">↓ &nbsp;TCD / agrégation</p>

        <p style="font-size:0.5rem; font-weight:700; color:#95c11f; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 5px;">Tableau de suivi · OLAP</p>
        <table class="mockup-table" style="font-size:0.48em;">
            <tr><th>Catégorie</th><th style="background:#dcfce7; color:#15803d;">Total jan.</th><th>Nb achats</th></tr>
            <tr><td>Produits laitiers</td><td style="color:#15803d; font-weight:700;">2,40 €</td><td>2</td></tr>
            <tr><td>Boulangerie</td><td style="color:#15803d; font-weight:700;">2,50 €</td><td>1</td></tr>
        </table>
    </div>

    <div class="offbeat-card" style="flex:1; padding:14px 16px; border-left:3px solid #009fe3;">
        <p style="font-size:0.64rem; font-weight:700; color:#009fe3; margin:0 0 10px;">🚌 DIRMOB — réclamations</p>

        <p style="font-size:0.5rem; font-weight:700; color:#009fe3; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 5px;">Base de données · OLTP</p>
        <table class="mockup-table" style="font-size:0.48em; margin-bottom:6px;">
            <tr><th>date</th><th>ligne</th><th>motif</th><th>statut</th></tr>
            <tr><td>05/03</td><td>389</td><td>retard</td><td>non_traite</td></tr>
            <tr><td>07/03</td><td>160</td><td>avance</td><td>traite</td></tr>
            <tr><td>10/03</td><td>389</td><td>retard</td><td>non_traite</td></tr>
        </table>

        <p style="font-size:0.58rem; text-align:center; color:#ccc; margin:5px 0;">↓ &nbsp;TCD / agrégation</p>

        <p style="font-size:0.5rem; font-weight:700; color:#95c11f; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 5px;">Tableau de suivi · OLAP</p>
        <table class="mockup-table" style="font-size:0.48em;">
            <tr><th>Motif</th><th style="background:#dcfce7; color:#15803d;">Mars</th><th>Non traités</th></tr>
            <tr><td>retard</td><td style="color:#15803d; font-weight:700;">2</td><td>2</td></tr>
            <tr><td>avance</td><td style="color:#15803d; font-weight:700;">1</td><td>0</td></tr>
        </table>
    </div>

</div>
<div class="separator"></div>
<p class="fragment" style="font-size:0.78rem; color:#333; margin:0; line-height:1.7; text-align:center;">
    Dans chaque cas : la <strong>base de données (OLTP)</strong> enregistre les faits bruts · le <strong>tableau de suivi (OLAP)</strong> en extrait le sens.<br>
    <span style="font-size:0.66rem; color:#888; font-style:italic;">Le TCD est le <em>résultat</em> d'une requête sur la base — pas la base elle-même.</span>
</p>
`;

const yegoTables = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Cas réel — les scooters Yego (GPSO)</p>
<h2 style="margin-top:0;">Deux tables. Même système.</h2>
<p style="font-size:0.74rem; color:#888; margin-top:-16px; margin-bottom:16px;">Ces données sont réelles — collectées sur les scooters GPSO. Observez bien les deux tables.</p>

<div style="display:flex; gap:14px; align-items:stretch; margin-bottom:18px;">

    <div style="flex:1.15; border-radius:8px; overflow:hidden; border:2px solid #2563eb;">
        <div style="background:#2563eb; padding:7px 13px;">
            <p style="font-size:0.68rem; font-weight:700; color:white; margin:0; font-family:monospace;">MDS /events</p>
        </div>
        <div style="background:#eff6ff; padding:9px 13px;">
            <table class="mockup-table" style="font-size:0.43em;">
                <tr>
                    <th style="background:#2563eb; color:white;">vehicle_id</th>
                    <th>event_time</th>
                    <th>vehicle_state</th>
                    <th>event_types</th>
                    <th>battery_pct</th>
                </tr>
                <tr><td style="color:#2563eb; font-weight:700;">GX395LR</td><td>2025-10-29 00:00:02</td><td style="color:#15803d; font-weight:700;">on_trip</td><td>[trip_start]</td><td>81%</td></tr>
                <tr><td style="color:#2563eb; font-weight:700;">GB386FP</td><td>2025-10-29 00:00:08</td><td style="color:#dc2626; font-weight:700;">non_operational</td><td>[comms_lost]</td><td>0%</td></tr>
                <tr><td style="color:#2563eb; font-weight:700;">GA717YB</td><td>2025-10-29 00:00:10</td><td style="color:#d97706; font-weight:700;">reserved</td><td>[reservation_start]</td><td>97%</td></tr>
            </table>
        </div>
    </div>

    <div style="flex:1.25; border-radius:8px; overflow:hidden; border:2px solid #9333ea;">
        <div style="background:#9333ea; padding:7px 13px;">
            <p style="font-size:0.68rem; font-weight:700; color:white; margin:0; font-family:monospace;">MDS /trips</p>
        </div>
        <div style="background:#fdf4ff; padding:9px 13px;">
            <table class="mockup-table" style="font-size:0.43em;">
                <tr>
                    <th style="background:#9333ea; color:white;">vehicle_id</th>
                    <th>trip_duration</th>
                    <th>trip_distance</th>
                    <th>start_time</th>
                    <th>end_time</th>
                </tr>
                <tr><td style="color:#9333ea; font-weight:700;">GA019TM</td><td>892 s</td><td>2 406 m</td><td>2025-11-04 17:45:07</td><td>2025-11-04 17:59:59</td></tr>
                <tr><td style="color:#9333ea; font-weight:700;">GW268PE</td><td>488 s</td><td>1 556 m</td><td>2025-11-04 17:52:03</td><td>2025-11-04 18:00:11</td></tr>
                <tr><td style="color:#9333ea; font-weight:700;">GX148JL</td><td>1 154 s</td><td>3 820 m</td><td>2025-11-04 17:41:10</td><td>2025-11-04 18:00:24</td></tr>
            </table>
        </div>
    </div>

</div>

<div style="background:#f8fafc; border-radius:8px; padding:13px 22px; border-left:4px solid #64748b;">
    <p style="font-size:0.82rem; color:#333; margin:0; line-height:1.7;">
        Une de ces tables <strong>enregistre</strong>, l'autre <strong>analyse</strong>. Laquelle est laquelle — et pourquoi ?
    </p>
</div>

<div class="fragment" style="display:flex; gap:10px; margin-top:12px;">
    <div style="flex:1; background:#eff6ff; border-radius:8px; padding:11px 14px; border-left:4px solid #2563eb;">
        <p style="font-size:0.58rem; font-weight:700; color:#2563eb; margin:0 0 4px; text-transform:uppercase; letter-spacing:1px;">OLTP — /events</p>
        <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.6;">Écriture terrain en temps réel. Chaque état du scooter génère une ligne brute instantanément.</p>
    </div>
    <div style="flex:1; background:#fdf4ff; border-radius:8px; padding:11px 14px; border-left:4px solid #9333ea;">
        <p style="font-size:0.58rem; font-weight:700; color:#9333ea; margin:0 0 4px; text-transform:uppercase; letter-spacing:1px;">OLAP — /trips</p>
        <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.6;">Lecture et analyse. Les événements sont consolidés en trajets complets pour le pilotage GPSO.</p>
    </div>
</div>
`;

const yegoSql = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:#9333ea; margin:0 0 4px; font-weight:700;">Cas réel Yego — côté SQL</p>
<h2 style="margin-top:0;">Le passage OLTP → OLAP : une requête</h2>
<p style="font-size:0.7rem; color:#888; margin-top:-14px; margin-bottom:12px;">Comment <code>/trips</code> est fabriquée depuis <code>/events</code> ? Quatre clauses SQL — chacune a un rôle précis.</p>

<div style="display:flex; gap:16px; align-items:stretch; max-width:960px; margin:0 auto;">

    <!-- La requête -->
    <div style="flex:1.15; background:#0f172a; border-radius:10px; padding:16px 18px; display:flex; flex-direction:column; justify-content:center;">
        <p style="font-size:0.46rem; color:#64748b; font-family:monospace; margin:0 0 10px;">-- construire /trips depuis /events</p>
        <p style="font-size:0.6rem; font-family:monospace; color:#e2e8f0; margin:0; line-height:2.2;">
            <span style="color:#f472b6; font-weight:700;">SELECT</span>&nbsp; vehicle_id,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#fcd34d;">MIN</span>(event_time) <span style="color:#f472b6;">AS</span> start_time,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#fcd34d;">MAX</span>(event_time) <span style="color:#f472b6;">AS</span> end_time,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#fcd34d;">MAX</span>(event_time) − <span style="color:#fcd34d;">MIN</span>(event_time) <span style="color:#f472b6;">AS</span> trip_duration<br>
            <span style="color:#f472b6; font-weight:700;">FROM</span>&nbsp;&nbsp; <span style="color:#60a5fa; font-weight:700;">events</span><br>
            <span style="color:#f472b6; font-weight:700;">WHERE</span>&nbsp; event_types <span style="color:#f472b6;">IN</span> (<span style="color:#86efac;">'trip_start'</span>, <span style="color:#86efac;">'trip_end'</span>)<br>
            <span style="color:#f472b6; font-weight:700;">GROUP BY</span> vehicle_id, trip_id
        </p>
        <div class="fragment" style="border-top:1px solid #334155; margin-top:12px; padding-top:10px;">
            <p style="font-size:0.48rem; color:#94a3b8; margin:0 0 5px; text-transform:uppercase; letter-spacing:1px;">→ Résultat : une ligne de /trips</p>
            <table class="mockup-table" style="font-size:0.42em; background:transparent;">
                <tr><th style="background:#334155; color:#cbd5e1; border-color:#475569;">vehicle_id</th><th style="background:#334155; color:#cbd5e1; border-color:#475569;">start_time</th><th style="background:#334155; color:#cbd5e1; border-color:#475569;">end_time</th><th style="background:#334155; color:#cbd5e1; border-color:#475569;">trip_duration</th></tr>
                <tr><td style="background:#0f172a; color:#c4b5fd; border-color:#334155; font-weight:700;">GA019TM</td><td style="background:#0f172a; color:#e2e8f0; border-color:#334155;">17:45:07</td><td style="background:#0f172a; color:#e2e8f0; border-color:#334155;">17:59:59</td><td style="background:#0f172a; color:#4ade80; border-color:#334155; font-weight:700;">892 s</td></tr>
            </table>
        </div>
    </div>

    <!-- Décodage clause par clause -->
    <div style="flex:1; display:flex; flex-direction:column; gap:8px; justify-content:center;">
        <div class="fragment" style="background:#eff6ff; border-radius:8px; padding:9px 14px; border-left:4px solid #60a5fa;">
            <p style="font-size:0.58rem; margin:0; line-height:1.6; color:#333;"><code style="color:#2563eb; font-weight:700;">FROM events</code> — on lit la table <strong>OLTP brute</strong> : chaque événement de chaque scooter, au fil de l'eau.</p>
        </div>
        <div class="fragment" style="background:#f0fdf4; border-radius:8px; padding:9px 14px; border-left:4px solid #22c55e;">
            <p style="font-size:0.58rem; margin:0; line-height:1.6; color:#333;"><code style="color:#15803d; font-weight:700;">WHERE … IN (…)</code> — le <strong>filtre</strong> : on ne garde que les débuts et fins de trajet, on ignore le bruit (location_update…).</p>
        </div>
        <div class="fragment" style="background:#faf5ff; border-radius:8px; padding:9px 14px; border-left:4px solid #9333ea;">
            <p style="font-size:0.58rem; margin:0; line-height:1.6; color:#333;"><code style="color:#7c3aed; font-weight:700;">GROUP BY vehicle_id, trip_id</code> — l'<strong>agrégation</strong> : on replie N événements en <strong>1 ligne par trajet</strong>. C'est la maille de la table d'arrivée.</p>
        </div>
        <div class="fragment" style="background:#fffbeb; border-radius:8px; padding:9px 14px; border-left:4px solid #f59e0b;">
            <p style="font-size:0.58rem; margin:0; line-height:1.6; color:#333;"><code style="color:#b45309; font-weight:700;">SELECT MIN / MAX</code> — les <strong>calculs</strong> : premier événement = départ, dernier = arrivée, la différence = durée du trajet.</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#1e293b; border-radius:8px; padding:11px 20px; margin:13px auto 0; max-width:960px;">
    <p style="font-size:0.72rem; color:white; margin:0; line-height:1.7; text-align:center;">
        <strong style="color:#fcd34d;">Filtrer + agréger + calculer : c'est ça, le pont OLTP → OLAP.</strong><br>
        <span style="font-size:0.62rem; color:rgba(255,255,255,0.65);">En SQL dans un entrepôt · en TCD/COUNTIFS dans Excel — le geste est exactement le même.</span>
    </p>
</div>
`;

const entrepot = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Le contenu — brut vs formaté</p>
<h2 style="margin-top:0;">Données non structurées → structurées</h2>
<p style="font-size:0.72rem; color:#888; margin-top:-14px; margin-bottom:14px;">La même facture, selon comment elle est stockée, est exploitable… ou pas.</p>

<div style="display:flex; gap:16px; align-items:stretch; margin-bottom:14px;">

    <div style="flex:1;">
        <div class="label--bad">Non structuré — brut</div>
        <div class="offbeat-card card--red" style="padding:13px;">
            <div style="background:#f1f5f9; border:1px dashed #94a3b8; border-radius:6px; padding:14px; text-align:center; margin-bottom:9px;">
                <p style="font-size:1.6rem; margin:0;">🧾🖼️</p>
                <p style="font-size:0.5rem; color:#64748b; margin:4px 0 0; font-family:monospace;">facture_2026_04.png · image bitmap</p>
            </div>
            <p style="font-size:0.58rem; color:var(--red-alert); margin:0; line-height:1.6;">
                → Stockée à l'état brut. Impossible de calculer un total ou une moyenne : il faut d'abord la <strong>retraiter</strong>.
            </p>
        </div>
    </div>

    <div style="display:flex; align-items:center; flex-shrink:0; font-size:1.4rem; color:var(--blue-dirmob);">→</div>

    <div style="flex:1;">
        <div class="label--good">Structuré — formaté pour l'usage</div>
        <div class="offbeat-card card--green" style="padding:13px;">
            <table class="mockup-table" style="font-size:0.5em; margin-bottom:9px;">
                <tr><th>ligne</th><th>article</th><th>qté</th><th>prix_ht</th><th>tva</th></tr>
                <tr><td>1</td><td>Capteur</td><td>4</td><td>120,00</td><td>20%</td></tr>
                <tr><td>2</td><td>Boîtier</td><td>4</td><td>35,00</td><td>20%</td></tr>
            </table>
            <p style="font-size:0.58rem; color:#2e7d32; margin:0; line-height:1.6;">
                → Décomposée en tableau de chiffres. <strong>SOMME</strong>, <strong>MOYENNE</strong>, agrégats : immédiats.
            </p>
        </div>
    </div>

</div>

<div class="fragment" style="display:flex; gap:12px;">
    <div style="flex:1; background:#eff6ff; border-radius:8px; padding:10px 15px; border-left:4px solid #0284c7;">
        <p style="font-size:0.6rem; font-weight:700; color:#0369a1; margin:0 0 3px;">🌊 Data Lake — on stocke le brut</p>
        <p style="font-size:0.56rem; color:#333; margin:0; line-height:1.55;">Non structuré / semi-structuré, tel quel, pas cher. On verra plus tard comment l'exploiter.</p>
    </div>
    <div style="flex:1; background:#f0fdf4; border-radius:8px; padding:10px 15px; border-left:4px solid #15803d;">
        <p style="font-size:0.6rem; font-weight:700; color:#15803d; margin:0 0 3px;">🏛️ Data Warehouse — on stocke le formaté</p>
        <p style="font-size:0.56rem; color:#333; margin:0; line-height:1.55;">Structuré pour l'analyse. C'est le foyer naturel de l'OLAP.</p>
    </div>
    <div style="flex:1; background:#1e293b; border-radius:8px; padding:10px 15px;">
        <p style="font-size:0.6rem; font-weight:700; color:#fcd34d; margin:0 0 3px;">🏠 Lakehouse — les deux</p>
        <p style="font-size:0.56rem; color:rgba(255,255,255,0.75); margin:0; line-height:1.55;">L'approche moderne : le brut ET le formaté dans un seul système (Databricks, BigQuery…).</p>
    </div>
</div>
`;

const oltpSuffit = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">La nuance qui évite de sur-construire</p>
<h2 style="margin-top:0;">Parfois… on s'arrête à l'OLTP</h2>
<p style="font-size:0.72rem; color:#888; margin-top:-14px; margin-bottom:14px;">Tous les usages n'ont pas besoin d'analyse. Beaucoup de bases servent juste à <strong>retrouver et afficher</strong> une information.</p>

<div style="display:flex; gap:14px; align-items:stretch; margin-bottom:14px;">

    <div style="flex:1; border-radius:10px; overflow:hidden; border:2px solid #2563eb;">
        <div style="background:#2563eb; padding:8px 16px;">
            <p style="font-size:0.64rem; font-weight:700; color:white; margin:0;">📖 Je veux retrouver / afficher → l'OLTP suffit</p>
        </div>
        <div style="background:#eff6ff; padding:12px 16px;">
            <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:10px;">
                <div style="background:white; border-radius:6px; padding:7px 12px; border-left:3px solid #2563eb;">
                    <p style="font-size:0.58rem; color:#333; margin:0;"><strong>Annuaire des prestataires</strong> — « le téléphone de Keolis ? »</p>
                </div>
                <div style="background:white; border-radius:6px; padding:7px 12px; border-left:3px solid #2563eb;">
                    <p style="font-size:0.58rem; color:#333; margin:0;"><strong>Catalogue / référentiel</strong> — la liste des lignes de bus, des communes</p>
                </div>
                <div style="background:white; border-radius:6px; padding:7px 12px; border-left:3px solid #2563eb;">
                    <p style="font-size:0.58rem; color:#333; margin:0;"><strong>Consultation SIG</strong> — afficher les stations Vélib' sur la carte</p>
                </div>
            </div>
            <p style="font-size:0.56rem; color:#1e40af; margin:0; line-height:1.6;">On cherche <strong>une fiche</strong>, on l'affiche, on la met à jour. La base opérationnelle <em>est</em> le produit fini. Pas d'agrégat, pas d'entrepôt : rien à construire de plus.</p>
        </div>
    </div>

    <div class="fragment" style="flex:1; border-radius:10px; overflow:hidden; border:2px solid #9333ea;">
        <div style="background:#9333ea; padding:8px 16px;">
            <p style="font-size:0.64rem; font-weight:700; color:white; margin:0;">📊 Je veux mesurer / piloter → il faut l'OLAP</p>
        </div>
        <div style="background:#faf5ff; padding:12px 16px;">
            <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:10px;">
                <div style="background:white; border-radius:6px; padding:7px 12px; border-left:3px solid #9333ea;">
                    <p style="font-size:0.58rem; color:#333; margin:0;">« <strong>Combien</strong> de réclamations non traitées ce mois ? »</p>
                </div>
                <div style="background:white; border-radius:6px; padding:7px 12px; border-left:3px solid #9333ea;">
                    <p style="font-size:0.58rem; color:#333; margin:0;">« C'est <strong>en hausse ou en baisse</strong> par rapport à l'an dernier ? »</p>
                </div>
                <div style="background:white; border-radius:6px; padding:7px 12px; border-left:3px solid #9333ea;">
                    <p style="font-size:0.58rem; color:#333; margin:0;">« <strong>Quel prestataire</strong> pose problème ? »</p>
                </div>
            </div>
            <p style="font-size:0.56rem; color:#6b21a8; margin:0; line-height:1.6;">Là, une fiche ne répond plus : il faut <strong>agréger l'historique</strong> — un tableau de bord. Et donc construire un <strong>pont</strong> de l'OLTP vers l'OLAP.</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#fefce8; border-radius:8px; padding:12px 20px; border-left:4px solid #ca8a04;">
    <p style="font-size:0.76rem; color:#333; margin:0; line-height:1.7;">
        <strong style="color:#92400e;">Le test :</strong> je cherche <strong>une fiche</strong> → l'OLTP suffit, on s'arrête là.
        Je veux <strong>un chiffre agrégé</strong> → direction le pont OLTP → OLAP. <span style="color:#888;">C'est tout l'objet de la partie 3.</span>
    </p>
</div>
`;

export function Typologies() {
  return (
    <>
      <section
        data-background-color="#1e3a5f"
        dangerouslySetInnerHTML={{ __html: intro }}
      />
      <section dangerouslySetInnerHTML={{ __html: oltpOlap }} />
      <section dangerouslySetInnerHTML={{ __html: exemples1 }} />
      <section dangerouslySetInnerHTML={{ __html: exemples2 }} />
      <section dangerouslySetInnerHTML={{ __html: yegoTables }} />
      <section dangerouslySetInnerHTML={{ __html: yegoSql }} />
      <section dangerouslySetInnerHTML={{ __html: entrepot }} />
      <section dangerouslySetInnerHTML={{ __html: oltpSuffit }} />
    </>
  );
}
