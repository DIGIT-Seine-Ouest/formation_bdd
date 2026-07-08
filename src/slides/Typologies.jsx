// ─── Partie 2 : les deux typologies de BDD à l'ère de l'analytics ─────────────
// OLTP (opérationnel) vs OLAP (analyse) — définitions canoniques, exemples
// concrets (Wrapped, Strava, Yego), et quand l'OLTP suffit.

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

const wrapped = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:#a855f7; margin:0 0 4px; font-weight:700;">Exemple détaillé 1/2 — vous le vivez chaque décembre</p>
<h2 style="margin-top:0;">🎧 Le « Wrapped » musique de fin d'année</h2>

<div style="display:flex; gap:14px; align-items:stretch; max-width:960px; margin:10px auto 0;">

    <!-- OLTP : la table des écoutes -->
    <div style="flex:1.25;">
        <div style="background:#2563eb; border-radius:9px 9px 0 0; padding:7px 14px;">
            <p style="font-size:0.56rem; font-weight:700; color:white; margin:0; font-family:monospace;">OLTP · ecoutes — toute l'année, en continu</p>
        </div>
        <div style="background:#eff6ff; border:2px solid #2563eb; border-top:none; border-radius:0 0 9px 9px; padding:10px 13px;">
            <table class="mockup-table" style="font-size:0.44em;">
                <tr><th>timestamp</th><th>titre</th><th>artiste</th><th>duree_s</th></tr>
                <tr><td>2026-01-03 07:12</td><td>Flowers</td><td>M. Cyrus</td><td>200</td></tr>
                <tr><td>2026-01-03 07:16</td><td>Houdini</td><td>Dua Lipa</td><td>185</td></tr>
                <tr><td>2026-01-03 08:02</td><td>Flowers</td><td>M. Cyrus</td><td>200</td></tr>
                <tr><td style="color:#94a3b8;" colspan="4">… 8 742 écoutes de janvier à décembre …</td></tr>
                <tr><td>2026-11-30 22:47</td><td>Feather</td><td>S. Carpenter</td><td>187</td></tr>
            </table>
            <p style="font-size:0.5rem; color:#2563eb; font-weight:700; margin:7px 0 0;">1 écoute = 1 ligne, horodatée. L'appli écrit — elle n'analyse rien.</p>
        </div>
    </div>

    <!-- Transformation -->
    <div class="fragment" style="display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0; gap:4px; padding:0 4px;">
        <p style="font-size:0.44rem; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin:0; text-align:center; line-height:1.8;">le 1ᵉʳ décembre :<br>une requête<br>d'agrégation</p>
        <div style="font-size:1.7rem; color:#a855f7; line-height:1;">→</div>
        <p style="font-size:0.42rem; color:#cbd5e1; font-family:monospace; margin:0;">GROUP BY artiste</p>
    </div>

    <!-- OLAP : le wrapped -->
    <div class="fragment" style="flex:1; background:linear-gradient(160deg,#7c3aed 0%,#a855f7 55%,#ec4899 100%); border-radius:12px; padding:16px 18px; display:flex; flex-direction:column; justify-content:center; box-shadow:0 10px 30px rgba(124,58,237,0.35);">
        <p style="font-size:0.5rem; color:rgba(255,255,255,0.75); text-transform:uppercase; letter-spacing:3px; margin:0 0 10px; font-weight:700;">OLAP · Votre année 2026</p>
        <p style="font-size:1.35rem; color:white; font-weight:700; margin:0 0 2px; font-family:'IBM Plex Serif',serif;">29 140 min</p>
        <p style="font-size:0.52rem; color:rgba(255,255,255,0.75); margin:0 0 12px;">de musique écoutée</p>
        <div style="border-top:1px solid rgba(255,255,255,0.25); padding-top:10px; display:flex; flex-direction:column; gap:7px;">
            <p style="font-size:0.6rem; color:white; margin:0;">🥇 Top artiste : <strong>M. Cyrus</strong> <span style="opacity:0.7;">· 312 écoutes</span></p>
            <p style="font-size:0.6rem; color:white; margin:0;">🎵 Top titre : <strong>Flowers</strong> <span style="opacity:0.7;">· 98 écoutes</span></p>
            <p style="font-size:0.6rem; color:white; margin:0;">📈 Top 5 % des auditeurs de cet artiste</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#f8fafc; border-radius:8px; padding:11px 20px; border-left:4px solid #a855f7; margin:13px auto 0; max-width:960px;">
    <p style="font-size:0.72rem; color:#333; margin:0; line-height:1.7;">
        <strong style="color:#7c3aed;">Le Wrapped n'existe nulle part pendant l'année.</strong>
        Il est <strong>calculé en décembre</strong> depuis la table des écoutes : COUNT par artiste, SUM des durées, un tri.
        OLTP toute l'année → OLAP une fois par an.
    </p>
</div>
`;

const strava = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:#f97316; margin:0 0 4px; font-weight:700;">Exemple détaillé 2/2 — la montre au poignet</p>
<h2 style="margin-top:0;">🏃 Strava — chaque course, puis le bilan</h2>

<div style="display:flex; gap:14px; align-items:stretch; max-width:960px; margin:10px auto 0;">

    <!-- OLTP -->
    <div style="flex:1.25;">
        <div style="background:#2563eb; border-radius:9px 9px 0 0; padding:7px 14px;">
            <p style="font-size:0.56rem; font-weight:700; color:white; margin:0; font-family:monospace;">OLTP · sorties — écrite par la montre, en direct</p>
        </div>
        <div style="background:#eff6ff; border:2px solid #2563eb; border-top:none; border-radius:0 0 9px 9px; padding:10px 13px;">
            <table class="mockup-table" style="font-size:0.44em;">
                <tr><th>date</th><th>km</th><th>duree</th><th>allure</th><th>fc_moy</th></tr>
                <tr><td>03/01</td><td>8,2</td><td>42:15</td><td>5'09"/km</td><td>152</td></tr>
                <tr><td>05/01</td><td>12,0</td><td>1:01:30</td><td>5'07"/km</td><td>149</td></tr>
                <tr><td>08/01</td><td>5,5</td><td>28:00</td><td>5'05"/km</td><td>155</td></tr>
                <tr><td style="color:#94a3b8;" colspan="5">… chaque sortie de l'année, au fil de l'eau …</td></tr>
            </table>
            <p style="font-size:0.5rem; color:#2563eb; font-weight:700; margin:7px 0 0;">1 sortie = 1 ligne. La montre capture — vous courez.</p>
        </div>
    </div>

    <!-- Transformation -->
    <div class="fragment" style="display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0; gap:4px; padding:0 4px;">
        <p style="font-size:0.44rem; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin:0; text-align:center; line-height:1.8;">à l'ouverture<br>de l'appli :<br>agrégation</p>
        <div style="font-size:1.7rem; color:#f97316; line-height:1;">→</div>
        <p style="font-size:0.42rem; color:#cbd5e1; font-family:monospace; margin:0;">GROUP BY mois</p>
    </div>

    <!-- OLAP -->
    <div class="fragment" style="flex:1; background:#0f172a; border-radius:12px; padding:16px 18px; display:flex; flex-direction:column; justify-content:center; border:1px solid #f97316;">
        <p style="font-size:0.5rem; color:#f97316; text-transform:uppercase; letter-spacing:3px; margin:0 0 10px; font-weight:700;">OLAP · Votre mois de janvier</p>
        <div style="display:flex; gap:14px; margin-bottom:12px;">
            <div>
                <p style="font-size:1.2rem; color:white; font-weight:700; margin:0; font-family:'IBM Plex Serif',serif;">25,7 km</p>
                <p style="font-size:0.48rem; color:#94a3b8; margin:0;">distance totale</p>
            </div>
            <div>
                <p style="font-size:1.2rem; color:white; font-weight:700; margin:0; font-family:'IBM Plex Serif',serif;">3</p>
                <p style="font-size:0.48rem; color:#94a3b8; margin:0;">sorties</p>
            </div>
        </div>
        <div style="border-top:1px solid #334155; padding-top:10px; display:flex; flex-direction:column; gap:6px;">
            <p style="font-size:0.58rem; color:white; margin:0;">⚡ Meilleure allure : <strong>5'05"/km</strong> <span style="color:#4ade80;">· record</span></p>
            <p style="font-size:0.58rem; color:white; margin:0;">📈 +12 % vs décembre — <span style="color:#94a3b8;">calculé, jamais saisi</span></p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#f8fafc; border-radius:8px; padding:11px 20px; border-left:4px solid #f97316; margin:13px auto 0; max-width:960px;">
    <p style="font-size:0.72rem; color:#333; margin:0; line-height:1.7;">
        <strong style="color:#c2410c;">Même mécanique que le Wrapped, autre échelle de temps.</strong>
        Le bilan mensuel est recalculé à chaque ouverture — parce que la table des sorties est propre : 1 ligne par course, des types cohérents.
        <span style="color:#888;">Maintenant, un cas réel de la maison →</span>
    </p>
</div>
`;

const yegoTables = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Cas réel — les scooters Yego (GPSO)</p>
<h2 style="margin-top:0;">Deux tables. Même système.</h2>
<p style="font-size:0.74rem; color:#888; margin-top:-16px; margin-bottom:16px;">Structure réelle de l'API MDS Yego (GPSO) — données mockées pour la formation. Observez bien les deux tables.</p>

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
<p style="font-size:0.7rem; color:#888; margin-top:-14px; margin-bottom:12px;">« Combien de trajets par commune en juin ? » — ce tableau n'existe dans aucune table : on le <strong>calcule</strong> depuis <code>/trips</code>. Quatre clauses, chacune un rôle.</p>

<div style="display:flex; gap:16px; align-items:stretch; max-width:960px; margin:0 auto;">

    <!-- La requête -->
    <div style="flex:1.15; background:#0f172a; border-radius:10px; padding:16px 18px; display:flex; flex-direction:column; justify-content:center;">
        <p style="font-size:0.46rem; color:#64748b; font-family:monospace; margin:0 0 10px;">-- le bilan par commune, calculé à la demande</p>
        <p style="font-size:0.6rem; font-family:monospace; color:#e2e8f0; margin:0; line-height:2.2;">
            <span style="color:#f472b6; font-weight:700;">SELECT</span>&nbsp; commune,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#fcd34d;">COUNT</span>(*) <span style="color:#f472b6;">AS</span> nb_trajets,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#fcd34d;">AVG</span>(duree_min) <span style="color:#f472b6;">AS</span> duree_moy<br>
            <span style="color:#f472b6; font-weight:700;">FROM</span>&nbsp;&nbsp; <span style="color:#60a5fa; font-weight:700;">trips</span><br>
            <span style="color:#f472b6; font-weight:700;">WHERE</span>&nbsp; date_debut >= <span style="color:#86efac;">'2026-06-01'</span><br>
            <span style="color:#f472b6; font-weight:700;">GROUP BY</span> commune<br>
            <span style="color:#f472b6; font-weight:700;">ORDER BY</span> nb_trajets <span style="color:#f472b6;">DESC</span>
        </p>
        <div class="fragment" style="border-top:1px solid #334155; margin-top:12px; padding-top:10px;">
            <p style="font-size:0.48rem; color:#94a3b8; margin:0 0 5px; text-transform:uppercase; letter-spacing:1px;">→ Résultat : 8 lignes, une par commune</p>
            <table class="mockup-table" style="font-size:0.42em; background:transparent;">
                <tr><th style="background:#334155; color:#cbd5e1; border-color:#475569;">commune</th><th style="background:#334155; color:#cbd5e1; border-color:#475569;">nb_trajets</th><th style="background:#334155; color:#cbd5e1; border-color:#475569;">duree_moy</th></tr>
                <tr><td style="background:#0f172a; color:#c4b5fd; border-color:#334155; font-weight:700;">Boulogne-Billancourt</td><td style="background:#0f172a; color:#4ade80; border-color:#334155; font-weight:700;">1 252</td><td style="background:#0f172a; color:#e2e8f0; border-color:#334155;">21,6 min</td></tr>
                <tr><td style="background:#0f172a; color:#c4b5fd; border-color:#334155; font-weight:700;">Issy-les-Moulineaux</td><td style="background:#0f172a; color:#4ade80; border-color:#334155; font-weight:700;">999</td><td style="background:#0f172a; color:#e2e8f0; border-color:#334155;">22,0 min</td></tr>
                <tr><td style="background:#0f172a; color:#c4b5fd; border-color:#334155; font-weight:700;">Meudon</td><td style="background:#0f172a; color:#4ade80; border-color:#334155; font-weight:700;">453</td><td style="background:#0f172a; color:#64748b; border-color:#334155;">21,8 min …</td></tr>
            </table>
        </div>
    </div>

    <!-- Décodage clause par clause -->
    <div style="flex:1; display:flex; flex-direction:column; gap:8px; justify-content:center;">
        <div class="fragment" style="background:#eff6ff; border-radius:8px; padding:9px 14px; border-left:4px solid #60a5fa;">
            <p style="font-size:0.58rem; margin:0; line-height:1.6; color:#333;"><code style="color:#2563eb; font-weight:700;">FROM trips</code> — on lit la table <strong>brute côté usage</strong> : 1 ligne = 1 trajet, telle qu'elle est enregistrée.</p>
        </div>
        <div class="fragment" style="background:#f0fdf4; border-radius:8px; padding:9px 14px; border-left:4px solid #22c55e;">
            <p style="font-size:0.58rem; margin:0; line-height:1.6; color:#333;"><code style="color:#15803d; font-weight:700;">WHERE date_debut >= …</code> — le <strong>filtre</strong> : on ne garde que les trajets de juin — 3 746 lignes sur 11 553.</p>
        </div>
        <div class="fragment" style="background:#faf5ff; border-radius:8px; padding:9px 14px; border-left:4px solid #9333ea;">
            <p style="font-size:0.58rem; margin:0; line-height:1.6; color:#333;"><code style="color:#7c3aed; font-weight:700;">GROUP BY commune</code> — l'<strong>agrégation</strong> : on replie 3 746 trajets en <strong>8 lignes</strong>, une par commune. C'est la maille du bilan.</p>
        </div>
        <div class="fragment" style="background:#fffbeb; border-radius:8px; padding:9px 14px; border-left:4px solid #f59e0b;">
            <p style="font-size:0.58rem; margin:0; line-height:1.6; color:#333;"><code style="color:#b45309; font-weight:700;">SELECT COUNT / AVG</code> — les <strong>calculs</strong> : combien de trajets, quelle durée moyenne — des chiffres qui n'existent nulle part avant la requête.</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#1e293b; border-radius:8px; padding:11px 20px; margin:13px auto 0; max-width:960px;">
    <p style="font-size:0.72rem; color:white; margin:0 0 6px; line-height:1.6; text-align:center;">
        <strong style="color:#fcd34d;">Filtrer + agréger + calculer : c'est ça, le pont OLTP → OLAP.</strong>
        <span style="font-size:0.62rem; color:rgba(255,255,255,0.65);">&nbsp;· SQL, ODSQL, TCD Excel — le geste est le même.</span>
    </p>
    <p style="font-size:0.5rem; font-family:monospace; color:#7dd3fc; margin:0; text-align:center; line-height:1.7;">▶ à rejouer en live sur le dataset <strong style="color:#bae6fd;">yego_trips_ods</strong> (Opendatasoft) :&nbsp;
        <span style="color:#94a3b8;">select=</span>commune, count(*) as nb_trajets, avg(duree_min) as duree_moy&nbsp;<span style="color:#94a3b8;">&amp;where=</span>date_debut >= date'2026-06-01'&nbsp;<span style="color:#94a3b8;">&amp;group_by=</span>commune</p>
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
                    <p style="font-size:0.58rem; color:#333; margin:0;"><strong>Annuaire des élus</strong> — « le mail de l'adjointe aux mobilités ? » : une fiche, un contact</p>
                </div>
                <div style="background:white; border-radius:6px; padding:7px 12px; border-left:3px solid #2563eb;">
                    <p style="font-size:0.58rem; color:#333; margin:0;"><strong>Annuaire des associations</strong> — nom, adresse, horaires, contact — on affiche la fiche telle quelle</p>
                </div>
                <div style="background:white; border-radius:6px; padding:7px 12px; border-left:3px solid #2563eb;">
                    <p style="font-size:0.58rem; color:#333; margin:0;"><strong>Carte des stations Vélib'</strong> — des points sur une carte : la table, affichée, sans calcul</p>
                </div>
            </div>
            <p style="font-size:0.56rem; color:#1e40af; margin:0; line-height:1.6;">On cherche <strong>une fiche</strong>, on l'affiche, on la met à jour. La table <em>est</em> le produit fini. Pas d'agrégat, pas d'entrepôt : rien à construire de plus.</p>
        </div>
    </div>

    <div class="fragment" style="flex:1; border-radius:10px; overflow:hidden; border:2px solid #9333ea;">
        <div style="background:#9333ea; padding:8px 16px;">
            <p style="font-size:0.64rem; font-weight:700; color:white; margin:0;">📊 Les résultats des élections → il faut l'OLAP</p>
        </div>
        <div style="background:#faf5ff; padding:12px 16px;">
            <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:10px;">
                <div style="background:white; border-radius:6px; padding:7px 12px; border-left:3px solid #9333ea;">
                    <p style="font-size:0.58rem; color:#333; margin:0;">« <strong>% par nuance</strong> et par commune ? » — on <strong>agrège</strong> les bureaux de vote</p>
                </div>
                <div style="background:white; border-radius:6px; padding:7px 12px; border-left:3px solid #9333ea;">
                    <p style="font-size:0.58rem; color:#333; margin:0;">« Participation <strong>en hausse</strong> par rapport au scrutin précédent ? » — on <strong>compare</strong></p>
                </div>
                <div style="background:white; border-radius:6px; padding:7px 12px; border-left:3px solid #9333ea;">
                    <p style="font-size:0.58rem; color:#333; margin:0;">« Le bureau le plus <strong>abstentionniste</strong> ? » — on <strong>classe</strong></p>
                </div>
            </div>
            <p style="font-size:0.56rem; color:#6b21a8; margin:0; line-height:1.6;">Aucun de ces chiffres n'existe dans la table de départ : ils sont <strong>calculés</strong> — les données sont transformées. C'est de l'OLAP, et c'est exactement ce qu'on publie sur le portail Open Data.</p>
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
      <section dangerouslySetInnerHTML={{ __html: wrapped }} />
      <section dangerouslySetInnerHTML={{ __html: strava }} />
      <section dangerouslySetInnerHTML={{ __html: yegoTables }} />
      <section dangerouslySetInnerHTML={{ __html: yegoSql }} />
      <section dangerouslySetInnerHTML={{ __html: oltpSuffit }} />
    </>
  );
}
