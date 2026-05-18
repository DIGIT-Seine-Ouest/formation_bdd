const intro = `
<div style="position:relative; max-width:720px; margin:0 auto;">
    <div aria-hidden="true" style="
        position:absolute; right:-80px; top:50%; transform:translateY(-52%);
        font-family:'IBM Plex Serif',serif; font-size:18rem; font-weight:700;
        color:white; opacity:0.06; line-height:1;
        pointer-events:none; user-select:none; letter-spacing:-0.05em;">01</div>
    <div style="position:absolute; left:-28px; top:0; bottom:0; width:4px; border-radius:2px; background:rgba(255,255,255,0.32);"></div>
    <div style="position:relative; z-index:1; text-align:left; color:white;">
        <p style="font-size:0.62rem; text-transform:uppercase; letter-spacing:4px; color:rgba(255,255,255,0.55); margin:0 0 16px; font-weight:600;">Partie 1</p>
        <p class="section-intro-title">Qu'est-ce qu'une<br>base de données ?</p>
        <div style="width:36px; height:2px; background:rgba(255,255,255,0.38); margin:0 0 16px;"></div>
        <p class="section-intro-sub">Structure, terminologie, et liens avec le monde réel.</p>
    </div>
</div>
`;

// ─── Le cas Netflix : 4 slides verticales ────────────────────────────────────

const netflixV1 = `
<div style="max-width:870px; margin:0 auto;">

    <div style="display:flex; align-items:center; gap:14px; margin-bottom:18px;">
        <span style="font-size:1.6rem; font-weight:900; color:#e50914; font-family:'IBM Plex Serif',serif; letter-spacing:-1px; line-height:1;">N</span>
        <div style="height:1px; flex:1; background:rgba(255,255,255,0.08);"></div>
        <span style="font-size:0.58rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:3px;">Ce que vous voyez chaque soir</span>
    </div>

    <!-- Reprendre -->
    <div style="background:rgba(255,255,255,0.03); border-radius:6px; padding:9px 12px; margin-bottom:7px;">
        <p style="font-size:0.6rem; color:rgba(255,255,255,0.7); margin:0 0 6px; font-weight:600;">🔄 Reprendre la lecture</p>
        <div style="display:flex; gap:5px;">
            <div style="flex:1; height:44px; border-radius:3px; background:#1a3a4a; border:2px solid #e50914; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Squid Game</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#1e2a3a; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Wednesday</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#2a1e3a; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Adolescence</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#1a3a2a; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Élite</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#3a2a1a; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Lupin</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#1e1e3a; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">The Crown</span></div>
        </div>
    </div>

    <!-- Ma liste -->
    <div style="background:rgba(255,255,255,0.03); border-radius:6px; padding:9px 12px; margin-bottom:7px;">
        <p style="font-size:0.6rem; color:rgba(255,255,255,0.7); margin:0 0 6px; font-weight:600;">❤️ Ma liste</p>
        <div style="display:flex; gap:5px;">
            <div style="flex:1; height:44px; border-radius:3px; background:#2a1e3a; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">The Diplomat</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#1a3a2a; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Stranger Things</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#3a1e1e; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Narcos</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#1e2a3a; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Dark</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#2a2a1e; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">House of Cards</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#1a3a4a; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Ozark</span></div>
        </div>
    </div>

    <!-- Top 10 -->
    <div style="background:rgba(255,255,255,0.03); border-radius:6px; padding:9px 12px; margin-bottom:7px;">
        <p style="font-size:0.6rem; color:rgba(255,255,255,0.7); margin:0 0 6px; font-weight:600;">🏆 Top 10 des séries en France aujourd'hui</p>
        <div style="display:flex; gap:5px;">
            <div style="flex:1; height:44px; border-radius:3px; background:#3a1e1e; position:relative; display:flex; align-items:flex-end; padding:3px 5px;">
                <span style="position:absolute; top:3px; left:5px; font-size:0.6rem; font-weight:900; color:rgba(255,255,255,0.6);">1</span>
                <span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Squid Game</span>
            </div>
            <div style="flex:1; height:44px; border-radius:3px; background:#1a3a4a; position:relative; display:flex; align-items:flex-end; padding:3px 5px;">
                <span style="position:absolute; top:3px; left:5px; font-size:0.6rem; font-weight:900; color:rgba(255,255,255,0.6);">2</span>
                <span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Wednesday</span>
            </div>
            <div style="flex:1; height:44px; border-radius:3px; background:#2a1e3a; position:relative; display:flex; align-items:flex-end; padding:3px 5px;">
                <span style="position:absolute; top:3px; left:5px; font-size:0.6rem; font-weight:900; color:rgba(255,255,255,0.6);">3</span>
                <span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Adolescence</span>
            </div>
            <div style="flex:1; height:44px; border-radius:3px; background:#1a3a2a; position:relative; display:flex; align-items:flex-end; padding:3px 5px;">
                <span style="position:absolute; top:3px; left:5px; font-size:0.6rem; font-weight:900; color:rgba(255,255,255,0.6);">4</span>
                <span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">The Diplomat</span>
            </div>
            <div style="flex:1; height:44px; border-radius:3px; background:#2a2a1e; position:relative; display:flex; align-items:flex-end; padding:3px 5px;">
                <span style="position:absolute; top:3px; left:5px; font-size:0.6rem; font-weight:900; color:rgba(255,255,255,0.6);">5</span>
                <span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Dark</span>
            </div>
            <div style="flex:1; height:44px; border-radius:3px; background:#1e2a3a; position:relative; display:flex; align-items:flex-end; padding:3px 5px;">
                <span style="position:absolute; top:3px; left:5px; font-size:0.6rem; font-weight:900; color:rgba(255,255,255,0.6);">6</span>
                <span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Lupin</span>
            </div>
        </div>
    </div>

    <!-- Nouveautés -->
    <div style="background:rgba(255,255,255,0.03); border-radius:6px; padding:9px 12px; margin-bottom:14px;">
        <p style="font-size:0.6rem; color:rgba(255,255,255,0.7); margin:0 0 6px; font-weight:600;">✨ Nouveautés les plus regardées</p>
        <div style="display:flex; gap:5px;">
            <div style="flex:1; height:44px; border-radius:3px; background:#1e2a3a; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Black Mirror S7</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#3a1e1e; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">The Residence</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#2a1e3a; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Adolescence</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#1a3a2a; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Nobody Wants This</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#1a3a4a; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Zero Day</span></div>
            <div style="flex:1; height:44px; border-radius:3px; background:#2a2a1e; display:flex; align-items:flex-end; padding:3px 5px;"><span style="font-size:0.38rem; color:rgba(255,255,255,0.5); font-weight:600;">Ransom Canyon</span></div>
        </div>
    </div>

    <div class="fragment" style="text-align:center;">
        <p style="font-size:0.75rem; color:#e50914; font-weight:700; text-transform:uppercase; letter-spacing:3px; margin:0;">
            Comment Netflix génère tout ça ? &nbsp;↓
        </p>
    </div>

</div>
`;

const netflixV2 = `
<p style="font-size:0.62rem; text-transform:uppercase; letter-spacing:3px; color:#e50914; margin:0 0 5px; font-weight:700;">Derrière la magie — 1/2</p>
<h2 style="margin:0 0 16px;">"Ma liste" et "Reprendre" — comment ça marche ?</h2>

<div style="display:flex; gap:16px; align-items:flex-start; margin-bottom:14px;">

    <div style="flex:1; background:#fff5f5; border-radius:10px; padding:14px; border-top:3px solid #e50914;">
        <p style="font-size:0.66rem; font-weight:700; color:#e50914; margin:0 0 4px;">❤️ Ma liste</p>
        <p style="font-size:0.58rem; color:#888; margin:0 0 10px; line-height:1.5;">
            Chaque fois que vous cliquez sur ❤️,<br>Netflix écrit <strong>une ligne</strong> dans cette table :
        </p>
        <table class="mockup-table" style="font-size:0.53em; margin-bottom:8px;">
            <tr>
                <th style="background:#e50914; color:white;">user_id</th>
                <th style="background:#e50914; color:white;">serie_id</th>
                <th>date_ajout</th>
            </tr>
            <tr><td style="color:#e50914; font-weight:700;">U1 (vous)</td><td>S42 — The Diplomat</td><td>hier</td></tr>
            <tr><td style="color:#e50914; font-weight:700;">U1 (vous)</td><td>S07 — Dark</td><td>lundi</td></tr>
            <tr><td style="color:#888;">U2</td><td>S12 — Narcos</td><td>mardi</td></tr>
        </table>
        <div style="background:#fde8e8; border-radius:5px; padding:7px 10px;">
            <p style="font-size:0.56rem; color:#555; margin:0; line-height:1.5;">
                Afficher "Ma liste" = lire toutes les lignes<br>où <code style="color:#e50914;">user_id = vous</code>. C'est tout.
            </p>
        </div>
    </div>

    <div style="flex:1; background:#fffbeb; border-radius:10px; padding:14px; border-top:3px solid #d97706;">
        <p style="font-size:0.66rem; font-weight:700; color:#d97706; margin:0 0 4px;">🔄 Reprendre la lecture</p>
        <p style="font-size:0.58rem; color:#888; margin:0 0 10px; line-height:1.5;">
            Chaque fois que vous mettez pause,<br>Netflix <strong>met à jour</strong> une valeur :
        </p>
        <table class="mockup-table" style="font-size:0.53em; margin-bottom:8px;">
            <tr>
                <th style="background:#d97706; color:white;">user_id</th>
                <th style="background:#d97706; color:white;">serie_id</th>
                <th>position</th>
            </tr>
            <tr><td style="color:#d97706; font-weight:700;">U1 (vous)</td><td>S01 — Squid Game</td><td style="color:#d97706; font-weight:700;">▶ S02 E03 — 24min</td></tr>
            <tr><td style="color:#d97706; font-weight:700;">U1 (vous)</td><td>S42 — The Diplomat</td><td>S01 E01 — 0min</td></tr>
            <tr><td style="color:#888;">U2</td><td>S07 — Dark</td><td>S01 E05 — 38min</td></tr>
        </table>
        <div style="background:#fef3c7; border-radius:5px; padding:7px 10px;">
            <p style="font-size:0.56rem; color:#555; margin:0; line-height:1.5;">
                "Reprendre à S02 E03" = lire la colonne<br><code style="color:#d97706;">position</code> pour cet utilisateur.
            </p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#111; border-radius:8px; padding:10px 18px; text-align:center;">
    <p style="font-size:0.7rem; color:white; margin:0; line-height:1.6;">
        Pas de magie. <strong style="color:#e50914;">Deux tables. Des lignes bien remplies. Des colonnes bien nommées.</strong>
    </p>
</div>
`;

const netflixV3 = `
<p style="font-size:0.62rem; text-transform:uppercase; letter-spacing:3px; color:#e50914; margin:0 0 5px; font-weight:700;">Derrière la magie — 2/2</p>
<h2 style="margin:0 0 16px;">"Top 10" et "Nouveautés" — comment c'est calculé ?</h2>

<div style="display:flex; gap:16px; align-items:flex-start; margin-bottom:14px;">

    <div style="flex:1; background:#eff6ff; border-radius:10px; padding:14px; border-top:3px solid #0284c7;">
        <p style="font-size:0.66rem; font-weight:700; color:#0284c7; margin:0 0 4px;">🏆 Top 10 des séries en France</p>
        <p style="font-size:0.58rem; color:#888; margin:0 0 10px; line-height:1.5;">
            Netflix <strong>compte</strong> combien de fois<br>chaque série a été vue en France cette semaine :
        </p>
        <table class="mockup-table" style="font-size:0.53em; margin-bottom:8px;">
            <tr>
                <th>série</th>
                <th>pays</th>
                <th style="background:#0284c7; color:white;">vues (7 jours)</th>
            </tr>
            <tr><td>Squid Game S3</td><td>🇫🇷</td><td style="color:#0284c7; font-weight:700;">2 841 042</td></tr>
            <tr><td>Wednesday S2</td><td>🇫🇷</td><td style="color:#0284c7; font-weight:700;">1 203 887</td></tr>
            <tr><td>Adolescence</td><td>🇫🇷</td><td style="color:#0284c7; font-weight:700;">987 441</td></tr>
        </table>
        <div style="background:#dbeafe; border-radius:5px; padding:7px 10px;">
            <p style="font-size:0.56rem; color:#555; margin:0; line-height:1.5;">
                Un simple <strong>comptage par série</strong>,<br>trié du plus grand au plus petit.
            </p>
        </div>
    </div>

    <div style="flex:1; background:#f0fdf4; border-radius:10px; padding:14px; border-top:3px solid #16a34a;">
        <p style="font-size:0.66rem; font-weight:700; color:#16a34a; margin:0 0 4px;">✨ Nouveautés les plus regardées</p>
        <p style="font-size:0.58rem; color:#888; margin:0 0 10px; line-height:1.5;">
            <strong>Même table</strong> — mais filtrée sur<br>les séries ajoutées il y a moins de 30 jours :
        </p>
        <table class="mockup-table" style="font-size:0.53em; margin-bottom:8px;">
            <tr>
                <th>série</th>
                <th style="background:#16a34a; color:white;">ajoutée</th>
                <th>vues</th>
            </tr>
            <tr><td>Adolescence</td><td style="color:#16a34a; font-weight:700;">il y a 3 j</td><td>987 441</td></tr>
            <tr><td>The Residence</td><td style="color:#16a34a; font-weight:700;">il y a 8 j</td><td>654 200</td></tr>
            <tr><td>Black Mirror S7</td><td style="color:#16a34a; font-weight:700;">il y a 15 j</td><td>430 880</td></tr>
        </table>
        <div style="background:#dcfce7; border-radius:5px; padding:7px 10px;">
            <p style="font-size:0.56rem; color:#555; margin:0; line-height:1.5;">
                Même comptage — avec un <strong>filtre</strong><br>sur la date d'ajout récente.
            </p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#111; border-radius:8px; padding:10px 18px; text-align:center;">
    <p style="font-size:0.7rem; color:white; margin:0; line-height:1.6;">
        4 rubriques. <strong style="color:#e50914;">2 tables seulement.</strong>
        Des données bien organisées répondent à des dizaines de questions différentes.
    </p>
</div>
`;

const netflixV4 = `
<p style="font-size:0.62rem; text-transform:uppercase; letter-spacing:3px; color:var(--green-dirmob); margin:0 0 5px; font-weight:700;">Et nous, à la DIRMOB ?</p>
<h2 style="margin:0 0 6px;">Mêmes questions. Même logique.</h2>
<p style="font-size:0.7rem; color:#888; margin:0 0 16px;">Des tables bien structurées répondent à nos questions métier — automatiquement.</p>

<div style="display:grid; grid-template-columns:1fr 50px 1fr; gap:10px; align-items:center;">

    <div>
        <p style="font-size:0.54rem; font-weight:700; color:#e50914; margin:0 0 8px; text-transform:uppercase; letter-spacing:2px; text-align:center;">Netflix</p>
        <div style="display:flex; flex-direction:column; gap:7px;">
            <div style="background:#fff5f5; border-radius:7px; padding:9px 12px; border-left:3px solid #e50914;">
                <p style="font-size:0.62rem; color:#e50914; font-weight:700; margin:0 0 2px;">❤️ Ma liste</p>
                <p style="font-size:0.55rem; color:#777; margin:0;">Les séries que j'ai enregistrées</p>
            </div>
            <div style="background:#fffbeb; border-radius:7px; padding:9px 12px; border-left:3px solid #d97706;">
                <p style="font-size:0.62rem; color:#d97706; font-weight:700; margin:0 0 2px;">🔄 Reprendre la lecture</p>
                <p style="font-size:0.55rem; color:#777; margin:0;">Où j'en suis dans chaque série</p>
            </div>
            <div style="background:#eff6ff; border-radius:7px; padding:9px 12px; border-left:3px solid #0284c7;">
                <p style="font-size:0.62rem; color:#0284c7; font-weight:700; margin:0 0 2px;">🏆 Top 10 en France</p>
                <p style="font-size:0.55rem; color:#777; margin:0;">Ce que tout le monde regarde</p>
            </div>
            <div style="background:#f0fdf4; border-radius:7px; padding:9px 12px; border-left:3px solid #16a34a;">
                <p style="font-size:0.62rem; color:#16a34a; font-weight:700; margin:0 0 2px;">✨ Nouveautés</p>
                <p style="font-size:0.55rem; color:#777; margin:0;">Les ajouts récents les plus vus</p>
            </div>
        </div>
    </div>

    <div style="text-align:center;">
        <p style="font-size:1.6rem; color:#ccc; margin:0; line-height:1;">→</p>
        <p style="font-size:0.44rem; color:#aaa; margin:5px 0 0; text-transform:uppercase; letter-spacing:1px; line-height:1.5;">même<br>logique</p>
    </div>

    <div>
        <p style="font-size:0.54rem; font-weight:700; color:var(--green-dirmob); margin:0 0 8px; text-transform:uppercase; letter-spacing:2px; text-align:center;">DIRMOB</p>
        <div style="display:flex; flex-direction:column; gap:7px;">
            <div style="background:#f0fdf4; border-radius:7px; padding:9px 12px; border-left:3px solid #e50914;">
                <p style="font-size:0.62rem; color:#333; font-weight:700; margin:0 0 2px;">Mes réclamations en cours</p>
                <p style="font-size:0.55rem; color:#777; margin:0;">Filtre sur agent = moi, statut = ouvert</p>
            </div>
            <div style="background:#f0fdf4; border-radius:7px; padding:9px 12px; border-left:3px solid #d97706;">
                <p style="font-size:0.62rem; color:#333; font-weight:700; margin:0 0 2px;">Statut de la réclamation R042</p>
                <p style="font-size:0.55rem; color:#777; margin:0;">Lire la colonne "statut" de cette ligne</p>
            </div>
            <div style="background:#f0fdf4; border-radius:7px; padding:9px 12px; border-left:3px solid #0284c7;">
                <p style="font-size:0.62rem; color:#333; font-weight:700; margin:0 0 2px;">Top 5 des motifs de réclamation</p>
                <p style="font-size:0.55rem; color:#777; margin:0;">Comptage par motif ce mois-ci</p>
            </div>
            <div style="background:#f0fdf4; border-radius:7px; padding:9px 12px; border-left:3px solid #16a34a;">
                <p style="font-size:0.62rem; color:#333; font-weight:700; margin:0 0 2px;">Réclamations de cette semaine</p>
                <p style="font-size:0.55rem; color:#777; margin:0;">Filtre sur date > lundi</p>
            </div>
        </div>
    </div>

</div>

<div class="fragment" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7); border-radius:8px; padding:10px 18px; border-left:4px solid var(--green-dirmob); text-align:center; margin-top:14px;">
    <p style="font-size:0.72rem; color:#333; margin:0; line-height:1.6;">
        Netflix a des milliers d'ingénieurs pour ça. <strong>Nous, on a Excel — et c'est pour ça qu'on est là.</strong>
    </p>
</div>
`;

// ─────────────────────────────────────────────────────────────────────────────

const definition = `
<h2>Qu'est-ce qu'une base de données ?</h2>
<div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 16px;"></div>

<div class="citation" style="margin-bottom:18px;">
    <p>Un ensemble de <strong>tables liées entre elles</strong>, organisées autour d'un même sujet ou d'une même activité.</p>
</div>

<div class="fragment" style="display:flex; align-items:center; gap:0; margin-bottom:14px;">

    <div style="flex:1; background:#f8fafc; border-radius:8px; padding:13px 14px; border:2px solid #1e40af;">
        <p style="font-size:0.54rem; color:#1e40af; font-weight:700; font-family:monospace; margin:0 0 7px;">réclamations</p>
        <table class="mockup-table" style="font-size:0.47em;">
            <tr>
                <th style="background:#1e40af; color:white;">id</th>
                <th style="background:#fef3c7; color:#a16207;">id_ligne</th>
                <th>motif</th>
            </tr>
            <tr>
                <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R001</td>
                <td style="background:#fef3c7; color:#a16207; font-weight:700;">L1</td>
                <td>retard</td>
            </tr>
            <tr>
                <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R002</td>
                <td style="background:#fef3c7; color:#a16207; font-weight:700;">L2</td>
                <td>avance</td>
            </tr>
        </table>
    </div>

    <div style="padding:0 12px; text-align:center; flex-shrink:0;">
        <div style="font-size:1.3rem; color:#a16207;">⇌</div>
        <p style="font-size:0.48rem; color:#a16207; font-weight:700; margin:2px 0 0; text-transform:uppercase; letter-spacing:1px;">id_ligne</p>
    </div>

    <div style="flex:1; background:#f8fafc; border-radius:8px; padding:13px 14px; border:2px solid #15803d;">
        <p style="font-size:0.54rem; color:#15803d; font-weight:700; font-family:monospace; margin:0 0 7px;">lignes_bus</p>
        <table class="mockup-table" style="font-size:0.47em;">
            <tr>
                <th style="background:#15803d; color:white;">id</th>
                <th>numéro</th>
                <th style="background:#fef3c7; color:#a16207;">id_presta</th>
            </tr>
            <tr>
                <td style="background:#dcfce7; color:#15803d; font-weight:700;">L1</td>
                <td>389</td>
                <td style="background:#fef3c7; color:#a16207; font-weight:700;">P1</td>
            </tr>
            <tr>
                <td style="background:#dcfce7; color:#15803d; font-weight:700;">L2</td>
                <td>160</td>
                <td style="background:#fef3c7; color:#a16207; font-weight:700;">P2</td>
            </tr>
        </table>
    </div>

    <div style="padding:0 12px; text-align:center; flex-shrink:0;">
        <div style="font-size:1.3rem; color:#555;">⇌</div>
        <p style="font-size:0.48rem; color:#555; font-weight:700; margin:2px 0 0; text-transform:uppercase; letter-spacing:1px;">id_presta</p>
    </div>

    <div style="flex:1; background:#f8fafc; border-radius:8px; padding:13px 14px; border:2px solid #555;">
        <p style="font-size:0.54rem; color:#555; font-weight:700; font-family:monospace; margin:0 0 7px;">prestataires</p>
        <table class="mockup-table" style="font-size:0.47em;">
            <tr>
                <th style="background:#555; color:white;">id</th>
                <th>nom</th><th>contrat</th>
            </tr>
            <tr>
                <td style="font-weight:700; color:#555;">P1</td>
                <td>Keolis</td><td>2023–2027</td>
            </tr>
            <tr>
                <td style="font-weight:700; color:#555;">P2</td>
                <td>RATP</td><td>2021–2025</td>
            </tr>
        </table>
    </div>

</div>

<div class="fragment" style="background:#f0f9e8; border-radius:8px; padding:11px 18px; border-left:3px solid #95c11f;">
    <p style="font-size:0.72rem; color:#444; margin:0; line-height:1.65;">
        <strong>Base relationnelle :</strong> les tables sont liées par des identifiants communs — on peut croiser les données sans les dupliquer.
    </p>
</div>
`;

const vocabulaire = `
<h2>Le vocabulaire de la base de données</h2>
<p style="font-size:0.74rem; color:#888; margin-top:-16px; margin-bottom:14px;">Illustré sur la table réclamations DIRMOB</p>

<div style="margin-bottom:16px;">
    <p style="font-size:0.56rem; color:#1e3a5f; background:#dbe4ff; display:inline-block; padding:4px 12px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 6px;">
        TABLE : réclamations &nbsp;←&nbsp; <em style="font-weight:400; color:#3b5998;">l'ensemble lignes + colonnes</em>
    </p>
    <table class="mockup-table" style="font-size:0.56em;">
        <tr>
            <th style="background:#1e40af; color:white;">
                id
                <span style="display:block; font-size:0.7em; font-weight:400; opacity:0.75; font-family:'Roboto',sans-serif;">IDENTIFIANT</span>
            </th>
            <th>date <span style="display:block; font-size:0.7em; font-weight:400; color:#888; font-family:'Roboto',sans-serif;">CHAMP</span></th>
            <th style="background:#fef3c7; color:#a16207;">
                id_ligne
                <span style="display:block; font-size:0.7em; font-weight:400; opacity:0.75; font-family:'Roboto',sans-serif;">CHAMP (FK)</span>
            </th>
            <th>motif <span style="display:block; font-size:0.7em; font-weight:400; color:#888; font-family:'Roboto',sans-serif;">CHAMP</span></th>
            <th>statut <span style="display:block; font-size:0.7em; font-weight:400; color:#888; font-family:'Roboto',sans-serif;">CHAMP</span></th>
        </tr>
        <tr style="background:#dcfce7; outline:2px solid #15803d; outline-offset:-1px;">
            <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R001</td>
            <td>05/03/2026</td>
            <td style="background:#fef3c7; color:#a16207; font-weight:700;">L1</td>
            <td style="background:#ede9fe; color:#6b21a8; font-weight:700;">retard</td>
            <td>ouverte</td>
        </tr>
        <tr>
            <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R002</td>
            <td>07/03/2026</td>
            <td style="background:#fef3c7; color:#a16207; font-weight:700;">L2</td>
            <td>avance</td><td>cloture</td>
        </tr>
        <tr>
            <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R003</td>
            <td>10/03/2026</td>
            <td style="background:#fef3c7; color:#a16207; font-weight:700;">L1</td>
            <td>retard</td><td>ouverte</td>
        </tr>
    </table>
</div>

<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:10px;">
    <div class="fragment" style="background:#dbe4ff; border-radius:7px; padding:10px 12px; border-left:3px solid #1e40af;">
        <p style="font-size:0.6rem; font-weight:700; color:#1e40af; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Identifiant (PK)</p>
        <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.5;">Désigne la ligne sans ambiguïté. Unique, stable, non signifiant.</p>
    </div>
    <div class="fragment" style="background:#fef3c7; border-radius:7px; padding:10px 12px; border-left:3px solid #a16207;">
        <p style="font-size:0.6rem; font-weight:700; color:#a16207; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Clé étrangère (FK)</p>
        <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.5;">Pointe vers une autre table. C'est le lien entre les données.</p>
    </div>
    <div class="fragment" style="background:#dcfce7; border-radius:7px; padding:10px 12px; border-left:3px solid #15803d;">
        <p style="font-size:0.6rem; font-weight:700; color:#15803d; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Enregistrement</p>
        <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.5;">Une ligne = un fait réel complet. Ici : une réclamation.</p>
    </div>
    <div class="fragment" style="background:#ede9fe; border-radius:7px; padding:10px 12px; border-left:3px solid #6b21a8;">
        <p style="font-size:0.6rem; font-weight:700; color:#6b21a8; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Attribut</p>
        <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.5;">La valeur à l'intersection d'un champ et d'un enregistrement.</p>
    </div>
</div>
`;

export function Donnees() {
  return (
    <>
      <section
        data-background-color="#009fe3"
        dangerouslySetInnerHTML={{ __html: intro }}
      />

      {/* Le cas Netflix — 4 slides verticales */}
      <section>
        <section
          data-background-color="#0a0a0a"
          dangerouslySetInnerHTML={{ __html: netflixV1 }}
        />
        <section dangerouslySetInnerHTML={{ __html: netflixV2 }} />
        <section dangerouslySetInnerHTML={{ __html: netflixV3 }} />
        <section dangerouslySetInnerHTML={{ __html: netflixV4 }} />
      </section>

      <section dangerouslySetInnerHTML={{ __html: definition }} />
      <section dangerouslySetInnerHTML={{ __html: vocabulaire }} />
    </>
  );
}
