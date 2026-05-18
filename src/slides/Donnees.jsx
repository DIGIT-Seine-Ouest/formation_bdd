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

const autourDeNous = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 6px; font-weight:700;">Le même principe partout</p>
<h2 style="margin-top:0;">Les bases de données autour de vous</h2>
<p style="font-size:0.74rem; color:#888; margin-top:-16px; margin-bottom:16px;">Chaque service numérique repose sur des données organisées en tables.</p>

<div class="row" style="align-items:flex-start; gap:14px; margin-bottom:16px;">

    <div style="flex:1;">
        <p style="font-size:0.54rem; background:#1877f2; color:white; display:inline-block; padding:3px 10px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 6px;">Facebook · utilisateurs</p>
        <table class="mockup-table">
            <tr>
                <th style="background:#1877f2; color:white;">id</th>
                <th>nom</th><th>email</th><th>ville</th>
            </tr>
            <tr><td style="background:#e8f0fe; color:#1877f2; font-weight:700;">1</td><td>Martin</td><td>j.martin@…</td><td>Paris</td></tr>
            <tr><td style="background:#e8f0fe; color:#1877f2; font-weight:700;">2</td><td>Dupont</td><td>a.dupont@…</td><td>Lyon</td></tr>
            <tr><td style="background:#e8f0fe; color:#1877f2; font-weight:700;">3</td><td>Nguyen</td><td>n.nguyen@…</td><td>Nantes</td></tr>
        </table>
        <p style="font-size:0.58rem; color:#888; margin:5px 0 0; line-height:1.5;">3 milliards de lignes dans cette table.<br>Même structure, à l'échelle.</p>
    </div>

    <div style="flex:1;" class="fragment">
        <p style="font-size:0.54rem; background:#e50914; color:white; display:inline-block; padding:3px 10px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 6px;">Netflix · series</p>
        <table class="mockup-table">
            <tr><th style="background:#e50914; color:white;">id</th><th>titre</th><th>genre</th></tr>
            <tr><td style="background:#fde8e8; color:#e50914; font-weight:700;">S01</td><td>Squid Game</td><td>thriller</td></tr>
            <tr><td style="background:#fde8e8; color:#e50914; font-weight:700;">S02</td><td>Wednesday</td><td>fantastique</td></tr>
            <tr><td style="background:#fde8e8; color:#e50914; font-weight:700;">S03</td><td>Dark</td><td>sci-fi</td></tr>
        </table>
        <p style="font-size:0.58rem; color:#888; margin:5px 0 0; line-height:1.5;">Une table parmi d'autres —<br>on va disséquer tout ça. ↓</p>
    </div>

    <div style="flex:1;" class="fragment">
        <p style="font-size:0.54rem; background:#009fe3; color:white; display:inline-block; padding:3px 10px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 6px;">DIRMOB · réclamations</p>
        <table class="mockup-table">
            <tr><th style="background:#1e40af; color:white;">id</th><th style="color:#a16207;">id_ligne</th><th>motif</th><th>statut</th></tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R001</td><td style="color:#a16207;">L1</td><td>retard</td><td>ouverte</td></tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R002</td><td style="color:#a16207;">L2</td><td>avance</td><td>cloture</td></tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R003</td><td style="color:#a16207;">L1</td><td>retard</td><td>ouverte</td></tr>
        </table>
        <p style="font-size:0.58rem; color:#888; margin:5px 0 0; line-height:1.5;">Même logique que Netflix —<br>on y reviendra.</p>
    </div>

</div>

<div class="fragment" style="background:#f8fafc; border-radius:8px; padding:12px 20px; border-left:4px solid var(--blue-dirmob);">
    <p style="font-size:0.76rem; color:#444; margin:0; line-height:1.65;">
        <strong>La même logique partout :</strong> une information par cellule, une ligne par fait réel, une colonne par catégorie d'information.
    </p>
</div>
`;

// ─── Dissection Netflix : slides verticales ───────────────────────────────────

const netflixHook = `
<div style="max-width:760px; margin:0 auto; text-align:center;">
    <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:5px; color:#e50914; margin:0 0 28px; font-weight:700;">Cas pratique</p>
    <h2 style="font-size:1.9rem; color:white; line-height:1.4; margin:0 0 20px; font-weight:700;">
        Ce soir, vous ouvrez Netflix.
    </h2>
    <div style="width:44px; height:2px; background:#e50914; margin:0 auto 28px;"></div>

    <div style="display:flex; justify-content:center; gap:14px; margin-bottom:32px; flex-wrap:wrap;">
        <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:8px; padding:12px 18px; text-align:left;">
            <p style="font-size:0.72rem; color:white; font-weight:700; margin:0 0 2px;">❤️ Ma liste</p>
            <p style="font-size:0.58rem; color:rgba(255,255,255,0.45); margin:0;">vos séries enregistrées</p>
        </div>
        <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:8px; padding:12px 18px; text-align:left;">
            <p style="font-size:0.72rem; color:white; font-weight:700; margin:0 0 2px;">🏆 Top 10 en France</p>
            <p style="font-size:0.58rem; color:rgba(255,255,255,0.45); margin:0;">les plus regardées aujourd'hui</p>
        </div>
        <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:8px; padding:12px 18px; text-align:left;">
            <p style="font-size:0.72rem; color:white; font-weight:700; margin:0 0 2px;">🔄 Reprendre</p>
            <p style="font-size:0.58rem; color:rgba(255,255,255,0.45); margin:0;">là où vous vous êtes arrêté</p>
        </div>
    </div>

    <div class="fragment">
        <p style="font-size:0.88rem; color:rgba(255,255,255,0.6); margin:0 0 16px; line-height:1.7;">
            Pas de magie. Pas d'intelligence artificielle cachée.<br>
            <strong style="color:white;">Des tables. Des lignes. Des colonnes bien nommées.</strong>
        </p>
        <p style="font-size:0.7rem; color:#e50914; font-weight:700; text-transform:uppercase; letter-spacing:3px; margin:0;">On ouvre le capot. ↓</p>
    </div>
</div>
`;

const netflixSchema = `
<p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:3px; color:#e50914; margin:0 0 5px; font-weight:700;">La BDD Netflix — vue d'ensemble</p>
<h2 style="margin:0 0 5px;">4 tables. Tout s'y passe.</h2>
<p style="font-size:0.66rem; color:#888; margin:0 0 14px;">Les colonnes en <span style="color:#2563eb; font-weight:700;">bleu →</span> pointent vers <code>utilisateurs</code>. Les colonnes en <span style="color:#e50914; font-weight:700;">rouge →</span> pointent vers <code>series</code>.</p>

<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px 20px; max-width:920px; margin:0 auto;">

    <div style="background:#eff6ff; border-radius:8px; padding:12px 14px; border:2px solid #2563eb;">
        <p style="font-size:0.56rem; font-weight:700; color:#2563eb; font-family:monospace; margin:0 0 7px;">👤 utilisateurs</p>
        <table class="mockup-table" style="font-size:0.5em;">
            <tr><th style="background:#2563eb; color:white;">id</th><th>nom</th><th>pays</th></tr>
            <tr><td style="color:#2563eb; font-weight:700;">U1</td><td>Martin</td><td>🇫🇷 FR</td></tr>
            <tr><td style="color:#2563eb; font-weight:700;">U2</td><td>Dupont</td><td>🇫🇷 FR</td></tr>
            <tr><td style="color:#2563eb; font-weight:700;">U3</td><td>Sophie</td><td>🇧🇪 BE</td></tr>
        </table>
        <p style="font-size:0.5rem; color:#666; margin:6px 0 0; font-style:italic;">Qui êtes-vous ?</p>
    </div>

    <div style="background:#fff5f5; border-radius:8px; padding:12px 14px; border:2px solid #e50914;">
        <p style="font-size:0.56rem; font-weight:700; color:#e50914; font-family:monospace; margin:0 0 7px;">🎬 series</p>
        <table class="mockup-table" style="font-size:0.5em;">
            <tr><th style="background:#e50914; color:white;">id</th><th>titre</th><th>genre</th></tr>
            <tr><td style="color:#e50914; font-weight:700;">S01</td><td>Squid Game</td><td>thriller</td></tr>
            <tr><td style="color:#e50914; font-weight:700;">S02</td><td>Wednesday</td><td>fantastique</td></tr>
            <tr><td style="color:#e50914; font-weight:700;">S03</td><td>Dark</td><td>sci-fi</td></tr>
        </table>
        <p style="font-size:0.5rem; color:#666; margin:6px 0 0; font-style:italic;">Qu'est-ce qui existe dans le catalogue ?</p>
    </div>

    <div style="background:#fffbeb; border-radius:8px; padding:12px 14px; border:2px solid #d97706;">
        <p style="font-size:0.56rem; font-weight:700; color:#d97706; font-family:monospace; margin:0 0 7px;">📺 vues</p>
        <table class="mockup-table" style="font-size:0.5em;">
            <tr>
                <th style="background:#dbeafe; color:#2563eb;">id_user →</th>
                <th style="background:#fde8e8; color:#e50914;">id_serie →</th>
                <th>position</th>
                <th>date</th>
            </tr>
            <tr><td style="color:#2563eb; font-weight:700;">U1</td><td style="color:#e50914; font-weight:700;">S01</td><td>S02E03 · 24min</td><td>hier</td></tr>
            <tr><td style="color:#2563eb; font-weight:700;">U1</td><td style="color:#e50914; font-weight:700;">S03</td><td>S01E01 · 0min</td><td>lundi</td></tr>
            <tr><td style="color:#2563eb; font-weight:700;">U2</td><td style="color:#e50914; font-weight:700;">S02</td><td>S01E05 · 38min</td><td>mardi</td></tr>
        </table>
        <p style="font-size:0.5rem; color:#666; margin:6px 0 0; font-style:italic;">Qui a regardé quoi, et jusqu'où ?</p>
    </div>

    <div style="background:#f0fdf4; border-radius:8px; padding:12px 14px; border:2px solid #16a34a;">
        <p style="font-size:0.56rem; font-weight:700; color:#16a34a; font-family:monospace; margin:0 0 7px;">❤️ ma_liste</p>
        <table class="mockup-table" style="font-size:0.5em;">
            <tr>
                <th style="background:#dbeafe; color:#2563eb;">id_user →</th>
                <th style="background:#fde8e8; color:#e50914;">id_serie →</th>
                <th>date_ajout</th>
            </tr>
            <tr><td style="color:#2563eb; font-weight:700;">U1</td><td style="color:#e50914; font-weight:700;">S03</td><td>il y a 2j</td></tr>
            <tr><td style="color:#2563eb; font-weight:700;">U1</td><td style="color:#e50914; font-weight:700;">S02</td><td>il y a 5j</td></tr>
            <tr><td style="color:#2563eb; font-weight:700;">U2</td><td style="color:#e50914; font-weight:700;">S01</td><td>il y a 1j</td></tr>
        </table>
        <p style="font-size:0.5rem; color:#666; margin:6px 0 0; font-style:italic;">Quelles séries chaque abonné a enregistrées ?</p>
    </div>

</div>
`;

const netflixMaListe = `
<div style="display:flex; gap:18px; align-items:flex-start; max-width:980px; margin:0 auto;">

    <!-- Explication gauche -->
    <div style="flex:0.9;">
        <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:3px; color:#16a34a; margin:0 0 6px; font-weight:700;">Fonctionnalité 1 / 3</p>
        <h2 style="margin:0 0 12px; line-height:1.3;">❤️ Ma liste —<br>la jointure en action</h2>

        <div style="background:#f0fdf4; border-radius:8px; padding:11px 14px; border-left:4px solid #16a34a; margin-bottom:8px;">
            <p style="font-size:0.65rem; color:#333; margin:0; line-height:1.8;">
                <strong>Étape 1 :</strong> dans <code style="color:#16a34a;">ma_liste</code>, filtrer<br>
                les lignes de Martin <code style="color:#2563eb; font-weight:700;">(U1)</code>.<br>
                → On récupère : <code style="color:#e50914; font-weight:700;">S03</code> et <code style="color:#e50914; font-weight:700;">S02</code>.
            </p>
        </div>

        <div class="fragment" style="background:#fff5f5; border-radius:8px; padding:11px 14px; border-left:4px solid #e50914; margin-bottom:8px;">
            <p style="font-size:0.65rem; color:#333; margin:0; line-height:1.8;">
                <strong>Étape 2 — la jointure :</strong><br>
                Pour chaque <code style="color:#e50914; font-weight:700;">id_serie</code>, Netflix<br>
                cherche le titre dans <code style="color:#e50914;">series</code>.<br>
                <span style="color:#555;">S03 → <strong>Dark</strong> &nbsp;·&nbsp; S02 → <strong>Wednesday</strong></span>
            </p>
        </div>

        <div class="fragment" style="background:#111; border-radius:8px; padding:11px 14px; border-left:4px solid #4ade80;">
            <p style="font-size:0.65rem; color:rgba(255,255,255,0.8); margin:0; line-height:1.7;">
                <strong style="color:#4ade80;">C'est ça, une jointure :</strong><br>
                relier deux tables par un identifiant commun pour assembler les informations.
            </p>
        </div>
    </div>

    <!-- Visuel JOIN droite -->
    <div style="flex:1.4; display:flex; flex-direction:column; gap:0;">

        <!-- Table ma_liste -->
        <div style="background:#f0fdf4; border-radius:8px 8px 0 0; padding:10px 12px; border:2px solid #16a34a; border-bottom:none;">
            <p style="font-size:0.52rem; font-weight:700; color:#16a34a; font-family:monospace; margin:0 0 6px;">❤️ ma_liste</p>
            <table class="mockup-table" style="font-size:0.5em;">
                <tr>
                    <th style="background:#dbeafe; color:#2563eb;">id_user</th>
                    <th style="background:#fde8e8; color:#e50914;">id_serie</th>
                    <th>date_ajout</th>
                </tr>
                <tr style="background:#bbf7d0;">
                    <td style="color:#2563eb; font-weight:700;">U1</td>
                    <td style="background:#fca5a5; color:#b91c1c; font-weight:700; outline:2px solid #e50914; outline-offset:-1px;">S03 →</td>
                    <td>il y a 2j</td>
                </tr>
                <tr style="background:#bbf7d0;">
                    <td style="color:#2563eb; font-weight:700;">U1</td>
                    <td style="background:#fca5a5; color:#b91c1c; font-weight:700; outline:2px solid #e50914; outline-offset:-1px;">S02 →</td>
                    <td>il y a 5j</td>
                </tr>
                <tr style="opacity:0.3;"><td>U2</td><td>S01</td><td>il y a 1j</td></tr>
            </table>
        </div>

        <!-- Connecteur JOIN -->
        <div class="fragment" style="background:#e50914; padding:6px 14px; display:flex; align-items:center; gap:10px;">
            <div style="height:1px; flex:1; background:rgba(255,255,255,0.4);"></div>
            <p style="font-size:0.54rem; color:white; font-weight:700; margin:0; white-space:nowrap; text-transform:uppercase; letter-spacing:1px;">
                JOIN sur id_serie
            </p>
            <div style="font-size:1rem; color:white;">↓</div>
            <div style="height:1px; flex:1; background:rgba(255,255,255,0.4);"></div>
        </div>

        <!-- Table series -->
        <div class="fragment" style="background:#fff5f5; border-radius:0; padding:10px 12px; border:2px solid #e50914; border-top:none; border-bottom:none;">
            <p style="font-size:0.52rem; font-weight:700; color:#e50914; font-family:monospace; margin:0 0 6px;">🎬 series</p>
            <table class="mockup-table" style="font-size:0.5em;">
                <tr><th style="background:#e50914; color:white;">id</th><th>titre</th><th>genre</th></tr>
                <tr style="opacity:0.25;"><td>S01</td><td>Squid Game</td><td>thriller</td></tr>
                <tr style="background:#fecaca; outline:2px solid #e50914; outline-offset:-1px;">
                    <td style="background:#e50914; color:white; font-weight:700;">S02</td>
                    <td><strong>Wednesday</strong></td><td>fantastique</td>
                </tr>
                <tr style="background:#fecaca; outline:2px solid #e50914; outline-offset:-1px;">
                    <td style="background:#e50914; color:white; font-weight:700;">S03</td>
                    <td><strong>Dark</strong></td><td>sci-fi</td>
                </tr>
            </table>
        </div>

        <!-- Résultat fusionné -->
        <div class="fragment" style="background:#14532d; border-radius:0 0 8px 8px; padding:10px 12px; border:2px solid #16a34a; border-top:none;">
            <p style="font-size:0.52rem; font-weight:700; color:#4ade80; margin:0 0 6px; text-transform:uppercase; letter-spacing:2px;">→ Résultat · Ma liste ❤️</p>
            <table class="mockup-table" style="font-size:0.5em;">
                <tr>
                    <th style="background:#16a34a; color:white;">titre</th>
                    <th style="background:#16a34a; color:white;">genre</th>
                    <th style="background:#16a34a; color:white;">ajoutée</th>
                </tr>
                <tr><td style="color:white; font-weight:700;">Dark</td><td style="color:#86efac;">sci-fi</td><td style="color:#86efac;">il y a 2j</td></tr>
                <tr><td style="color:white; font-weight:700;">Wednesday</td><td style="color:#86efac;">fantastique</td><td style="color:#86efac;">il y a 5j</td></tr>
            </table>
        </div>

    </div>

</div>
`;

const netflixTop10 = `
<div style="display:flex; gap:20px; align-items:flex-start; max-width:960px; margin:0 auto;">

    <div style="flex:1.1;">
        <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:3px; color:#0284c7; margin:0 0 6px; font-weight:700;">Fonctionnalité 2 / 3</p>
        <h2 style="margin:0 0 14px; line-height:1.3;">🏆 Top 10 en France —<br>comment c'est calculé ?</h2>
        <div style="background:#eff6ff; border-radius:8px; padding:13px 16px; border-left:4px solid #0284c7; margin-bottom:12px;">
            <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.8;">
                <strong>Question :</strong> quelles séries sont les plus vues en France aujourd'hui ?<br>
                <strong>Réponse :</strong> dans <code style="background:#dbeafe; padding:1px 5px; border-radius:3px; color:#0284c7;">vues</code>,
                <strong>compter</strong> les lignes par série où pays = 🇫🇷.
            </p>
        </div>
        <div class="fragment" style="background:#fff5f5; border-radius:8px; padding:13px 16px; border-left:4px solid #e50914;">
            <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.8;">
                <strong>Et pour avoir le titre ?</strong><br>
                Même chose : suivre <code style="color:#e50914; font-weight:700;">id_serie →</code> table <code style="color:#e50914;">series</code>.
            </p>
            <p style="font-size:0.62rem; color:#555; margin:6px 0 0; line-height:1.7;">
                C'est un simple <strong>comptage</strong>, trié du plus grand au plus petit.<br>
                Aucune magie. Juste des données bien organisées.
            </p>
        </div>
    </div>

    <div style="flex:1.2; display:flex; flex-direction:column; gap:10px;">
        <div style="background:#fffbeb; border-radius:8px; padding:12px 14px; border:2px solid #d97706;">
            <p style="font-size:0.54rem; font-weight:700; color:#d97706; font-family:monospace; margin:0 0 7px;">📺 vues — France, aujourd'hui</p>
            <table class="mockup-table" style="font-size:0.52em;">
                <tr>
                    <th style="background:#dbeafe; color:#2563eb;">id_user →</th>
                    <th style="background:#fde8e8; color:#e50914;">id_serie →</th>
                    <th>pays</th>
                    <th>date</th>
                </tr>
                <tr style="background:#fef9c3; outline:2px solid #d97706; outline-offset:-1px;"><td style="color:#2563eb;">U1</td><td style="color:#e50914; font-weight:700;">S01</td><td>🇫🇷</td><td>auj.</td></tr>
                <tr style="background:#fef9c3; outline:2px solid #d97706; outline-offset:-1px;"><td style="color:#2563eb;">U2</td><td style="color:#e50914; font-weight:700;">S01</td><td>🇫🇷</td><td>auj.</td></tr>
                <tr style="background:#fef9c3; outline:2px solid #d97706; outline-offset:-1px;"><td style="color:#2563eb;">U3</td><td style="color:#e50914; font-weight:700;">S02</td><td>🇫🇷</td><td>auj.</td></tr>
                <tr style="opacity:0.35;"><td style="color:#2563eb;">U4</td><td style="color:#e50914;">S01</td><td>🇧🇪</td><td>auj.</td></tr>
            </table>
            <p style="font-size:0.5rem; color:#d97706; font-weight:700; margin:6px 0 0;">↑ On compte par serie_id, pays = 🇫🇷 uniquement</p>
        </div>
        <div class="fragment" style="background:#eff6ff; border-radius:8px; padding:11px 14px; border:2px solid #0284c7;">
            <p style="font-size:0.54rem; font-weight:700; color:#0284c7; margin:0 0 7px; text-transform:uppercase; letter-spacing:1px;">→ Résultat : Top 10 🇫🇷</p>
            <table class="mockup-table" style="font-size:0.52em;">
                <tr><th>#</th><th style="background:#fde8e8; color:#e50914;">id_serie</th><th>titre</th><th style="background:#dbeafe; color:#0284c7;">vues 🇫🇷</th></tr>
                <tr><td style="font-weight:900; font-size:1.1em;">🥇</td><td style="color:#e50914; font-weight:700;">S01</td><td>Squid Game</td><td style="color:#0284c7; font-weight:700;">2</td></tr>
                <tr><td style="font-weight:900; font-size:1.1em;">🥈</td><td style="color:#e50914; font-weight:700;">S02</td><td>Wednesday</td><td style="color:#0284c7; font-weight:700;">1</td></tr>
            </table>
        </div>
    </div>

</div>
`;

const netflixReprendre = `
<div style="display:flex; gap:20px; align-items:flex-start; max-width:960px; margin:0 auto;">

    <div style="flex:1.1;">
        <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:3px; color:#d97706; margin:0 0 6px; font-weight:700;">Fonctionnalité 3 / 3</p>
        <h2 style="margin:0 0 14px; line-height:1.3;">🔄 Reprendre la lecture —<br>comment Netflix sait où vous en êtes ?</h2>
        <div style="background:#fffbeb; border-radius:8px; padding:13px 16px; border-left:4px solid #d97706; margin-bottom:12px;">
            <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.8;">
                <strong>Question :</strong> où Martin s'est-il arrêté sur Squid Game ?<br>
                <strong>Réponse :</strong> dans <code style="background:#fef3c7; padding:1px 5px; border-radius:3px; color:#d97706;">vues</code>,
                lire la colonne <code style="color:#d97706; font-weight:700;">position</code>
                pour <code style="color:#2563eb; font-weight:700;">U1</code> + <code style="color:#e50914; font-weight:700;">S01</code>.
            </p>
        </div>
        <div class="fragment" style="background:#f0fdf4; border-radius:8px; padding:13px 16px; border-left:4px solid #16a34a;">
            <p style="font-size:0.68rem; color:#333; margin:0 0 8px; line-height:1.6;"><strong>La boucle :</strong></p>
            <p style="font-size:0.64rem; color:#555; margin:0; line-height:1.9;">
                Vous regardez → Netflix <strong>écrit</strong> votre position en direct.<br>
                Vous revenez → Netflix <strong>lit</strong> votre dernière position.<br>
                <strong style="color:#16a34a;">Une table. Deux opérations. Voilà tout.</strong>
            </p>
        </div>
    </div>

    <div style="flex:1.2; display:flex; flex-direction:column; gap:10px;">
        <div style="background:#fffbeb; border-radius:8px; padding:12px 14px; border:2px solid #d97706;">
            <p style="font-size:0.54rem; font-weight:700; color:#d97706; font-family:monospace; margin:0 0 7px;">📺 vues — Martin (U1)</p>
            <table class="mockup-table" style="font-size:0.52em;">
                <tr>
                    <th style="background:#dbeafe; color:#2563eb;">id_user →</th>
                    <th style="background:#fde8e8; color:#e50914;">id_serie →</th>
                    <th style="background:#fef9c3; color:#d97706;">position</th>
                    <th>date</th>
                </tr>
                <tr style="background:#fef9c3; outline:2px solid #d97706; outline-offset:-1px;">
                    <td style="color:#2563eb; font-weight:700;">U1</td>
                    <td style="color:#e50914; font-weight:700;">S01</td>
                    <td style="color:#d97706; font-weight:700;">S02E03 · 24min ✓</td>
                    <td>hier</td>
                </tr>
                <tr style="opacity:0.4;"><td style="color:#2563eb;">U1</td><td style="color:#e50914;">S03</td><td>S01E01 · 0min</td><td>lundi</td></tr>
                <tr style="opacity:0.4;"><td style="color:#2563eb;">U2</td><td style="color:#e50914;">S02</td><td>S01E05 · 38min</td><td>mardi</td></tr>
            </table>
        </div>
        <div class="fragment" style="background:linear-gradient(135deg,#111,#1a1a1a); border-radius:8px; padding:14px 16px; border:1px solid #e50914; text-align:center;">
            <p style="font-size:0.64rem; color:rgba(255,255,255,0.5); margin:0 0 4px; text-transform:uppercase; letter-spacing:2px; font-size:0.52rem;">Netflix affiche :</p>
            <p style="font-size:0.82rem; color:white; font-weight:700; margin:0; line-height:1.5;">
                🔄 Reprendre Squid Game<br>
                <span style="font-size:0.65rem; color:#e50914; font-weight:400;">Saison 2 · Épisode 3 · à partir de 24 min</span>
            </p>
        </div>
    </div>

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
            <tr><th style="background:#1e40af; color:white;">id</th><th style="background:#fef3c7; color:#a16207;">id_ligne</th><th>motif</th></tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R001</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">L1</td><td>retard</td></tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R002</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">L2</td><td>avance</td></tr>
        </table>
    </div>

    <div style="padding:0 12px; text-align:center; flex-shrink:0;">
        <div style="font-size:1.3rem; color:#a16207;">⇌</div>
        <p style="font-size:0.48rem; color:#a16207; font-weight:700; margin:2px 0 0; text-transform:uppercase; letter-spacing:1px;">id_ligne</p>
    </div>

    <div style="flex:1; background:#f8fafc; border-radius:8px; padding:13px 14px; border:2px solid #15803d;">
        <p style="font-size:0.54rem; color:#15803d; font-weight:700; font-family:monospace; margin:0 0 7px;">lignes_bus</p>
        <table class="mockup-table" style="font-size:0.47em;">
            <tr><th style="background:#15803d; color:white;">id</th><th>numéro</th><th style="background:#fef3c7; color:#a16207;">id_presta</th></tr>
            <tr><td style="background:#dcfce7; color:#15803d; font-weight:700;">L1</td><td>389</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">P1</td></tr>
            <tr><td style="background:#dcfce7; color:#15803d; font-weight:700;">L2</td><td>160</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">P2</td></tr>
        </table>
    </div>

    <div style="padding:0 12px; text-align:center; flex-shrink:0;">
        <div style="font-size:1.3rem; color:#555;">⇌</div>
        <p style="font-size:0.48rem; color:#555; font-weight:700; margin:2px 0 0; text-transform:uppercase; letter-spacing:1px;">id_presta</p>
    </div>

    <div style="flex:1; background:#f8fafc; border-radius:8px; padding:13px 14px; border:2px solid #555;">
        <p style="font-size:0.54rem; color:#555; font-weight:700; font-family:monospace; margin:0 0 7px;">prestataires</p>
        <table class="mockup-table" style="font-size:0.47em;">
            <tr><th style="background:#555; color:white;">id</th><th>nom</th><th>contrat</th></tr>
            <tr><td style="font-weight:700; color:#555;">P1</td><td>Keolis</td><td>2023–2027</td></tr>
            <tr><td style="font-weight:700; color:#555;">P2</td><td>RATP</td><td>2021–2025</td></tr>
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
            <th style="background:#1e40af; color:white;">id<span style="display:block; font-size:0.7em; font-weight:400; opacity:0.75; font-family:'Roboto',sans-serif;">IDENTIFIANT</span></th>
            <th>date <span style="display:block; font-size:0.7em; font-weight:400; color:#888; font-family:'Roboto',sans-serif;">CHAMP</span></th>
            <th style="background:#fef3c7; color:#a16207;">id_ligne<span style="display:block; font-size:0.7em; font-weight:400; opacity:0.75; font-family:'Roboto',sans-serif;">CHAMP (FK)</span></th>
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
        <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R002</td><td>07/03/2026</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">L2</td><td>avance</td><td>cloture</td></tr>
        <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R003</td><td>10/03/2026</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">L1</td><td>retard</td><td>ouverte</td></tr>
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

      {/* autourDeNous + dissection Netflix en vertical */}
      <section>
        <section dangerouslySetInnerHTML={{ __html: autourDeNous }} />
        <section
          data-background-color="#0a0a0a"
          dangerouslySetInnerHTML={{ __html: netflixHook }}
        />
        <section dangerouslySetInnerHTML={{ __html: netflixSchema }} />
        <section dangerouslySetInnerHTML={{ __html: netflixMaListe }} />
        <section dangerouslySetInnerHTML={{ __html: netflixTop10 }} />
        <section dangerouslySetInnerHTML={{ __html: netflixReprendre }} />
      </section>

      <section dangerouslySetInnerHTML={{ __html: definition }} />
      <section dangerouslySetInnerHTML={{ __html: vocabulaire }} />
    </>
  );
}
