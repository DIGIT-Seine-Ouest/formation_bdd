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
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R001</td><td style="color:#a16207;">L1</td><td>retard</td><td>non_traite</td></tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R002</td><td style="color:#a16207;">L2</td><td>avance</td><td>traite</td></tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R003</td><td style="color:#a16207;">L1</td><td>retard</td><td>non_traite</td></tr>
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
                <th>episode</th>
                <th>position</th>
                <th>date</th>
            </tr>
            <tr><td style="color:#2563eb; font-weight:700;">U1</td><td style="color:#e50914; font-weight:700;">S01</td><td>S02E03</td><td>00:24:00</td><td>2026-05-17</td></tr>
            <tr><td style="color:#2563eb; font-weight:700;">U1</td><td style="color:#e50914; font-weight:700;">S03</td><td>S01E01</td><td>00:00:00</td><td>2026-05-12</td></tr>
            <tr><td style="color:#2563eb; font-weight:700;">U2</td><td style="color:#e50914; font-weight:700;">S02</td><td>S01E05</td><td>00:38:00</td><td>2026-05-13</td></tr>
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
            <tr><td style="color:#2563eb; font-weight:700;">U1</td><td style="color:#e50914; font-weight:700;">S03</td><td>2026-05-16</td></tr>
            <tr><td style="color:#2563eb; font-weight:700;">U1</td><td style="color:#e50914; font-weight:700;">S02</td><td>2026-05-13</td></tr>
            <tr><td style="color:#2563eb; font-weight:700;">U2</td><td style="color:#e50914; font-weight:700;">S01</td><td>2026-05-17</td></tr>
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
                    <td>2026-05-16</td>
                </tr>
                <tr style="background:#bbf7d0;">
                    <td style="color:#2563eb; font-weight:700;">U1</td>
                    <td style="background:#fca5a5; color:#b91c1c; font-weight:700; outline:2px solid #e50914; outline-offset:-1px;">S02 →</td>
                    <td>2026-05-13</td>
                </tr>
                <tr style="opacity:0.3;"><td>U2</td><td>S01</td><td>2026-05-17</td></tr>
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
                    <th style="background:#16a34a; color:white;">date_ajout</th>
                </tr>
                <tr><td style="background:#14532d; color:#bbf7d0; font-weight:700;">Dark</td><td style="background:#14532d; color:#86efac;">sci-fi</td><td style="background:#14532d; color:#86efac;">2026-05-16</td></tr>
                <tr><td style="background:#14532d; color:#bbf7d0; font-weight:700;">Wednesday</td><td style="background:#14532d; color:#86efac;">fantastique</td><td style="background:#14532d; color:#86efac;">2026-05-13</td></tr>
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
                <tr style="background:#fef9c3; outline:2px solid #d97706; outline-offset:-1px;"><td style="color:#2563eb;">U1</td><td style="color:#e50914; font-weight:700;">S01</td><td>🇫🇷</td><td>2026-05-18</td></tr>
                <tr style="background:#fef9c3; outline:2px solid #d97706; outline-offset:-1px;"><td style="color:#2563eb;">U2</td><td style="color:#e50914; font-weight:700;">S01</td><td>🇫🇷</td><td>2026-05-18</td></tr>
                <tr style="background:#fef9c3; outline:2px solid #d97706; outline-offset:-1px;"><td style="color:#2563eb;">U3</td><td style="color:#e50914; font-weight:700;">S02</td><td>🇫🇷</td><td>2026-05-18</td></tr>
                <tr style="opacity:0.35;"><td style="color:#2563eb;">U4</td><td style="color:#e50914;">S01</td><td>🇧🇪</td><td>2026-05-18</td></tr>
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
                    <th>episode</th>
                    <th style="background:#fef9c3; color:#d97706;">position</th>
                    <th>date</th>
                </tr>
                <tr style="background:#fef9c3; outline:2px solid #d97706; outline-offset:-1px;">
                    <td style="color:#2563eb; font-weight:700;">U1</td>
                    <td style="color:#e50914; font-weight:700;">S01</td>
                    <td>S02E03</td>
                    <td style="color:#d97706; font-weight:700;">00:24:00 ✓</td>
                    <td>2026-05-17</td>
                </tr>
                <tr style="opacity:0.4;"><td style="color:#2563eb;">U1</td><td style="color:#e50914;">S03</td><td>S01E01</td><td>00:00:00</td><td>2026-05-12</td></tr>
                <tr style="opacity:0.4;"><td style="color:#2563eb;">U2</td><td style="color:#e50914;">S02</td><td>S01E05</td><td>00:38:00</td><td>2026-05-13</td></tr>
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

const olapIntro = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 6px; font-weight:700;">Deux rôles, une logique</p>
<h2 style="margin-top:0;">OLTP → OLAP</h2>
<p style="font-size:0.74rem; color:#888; margin-top:-16px; margin-bottom:16px;">Toute donnée terrain passe par ces deux étapes — souvent sans qu'on s'en rende compte.</p>

<div style="display:flex; gap:0; align-items:stretch; margin:0 0 16px;">

    <div style="flex:1; background:#eff6ff; border-radius:8px 0 0 8px; padding:18px 20px; border:2px solid #2563eb; border-right:none;">
        <p style="font-size:0.54rem; text-transform:uppercase; letter-spacing:2px; color:#2563eb; font-weight:700; margin:0 0 6px;">OLTP</p>
        <p style="font-size:0.88rem; font-weight:700; color:#1e40af; margin:0 0 12px; font-family:'IBM Plex Serif',serif;">Écriture terrain</p>
        <div style="display:flex; flex-direction:column; gap:7px;">
            <div style="background:white; border-radius:5px; padding:7px 11px; border-left:3px solid #2563eb;">
                <p style="font-size:0.62rem; color:#333; margin:0;">1 événement = 1 ligne</p>
            </div>
            <div style="background:white; border-radius:5px; padding:7px 11px; border-left:3px solid #2563eb;">
                <p style="font-size:0.62rem; color:#333; margin:0;">Temps réel, continu</p>
            </div>
            <div style="background:white; border-radius:5px; padding:7px 11px; border-left:3px solid #2563eb;">
                <p style="font-size:0.62rem; color:#333; margin:0;">Objectif : ne rien perdre</p>
            </div>
        </div>
        <p style="font-size:0.54rem; color:#555; margin:12px 0 0; font-style:italic; line-height:1.7;">Réclamation reçue, scooter qui démarre,<br>ticket vendu, colis expédié…</p>
    </div>

    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:#f8fafc; padding:0 20px; gap:4px; flex-shrink:0; border-top:2px solid #e2e8f0; border-bottom:2px solid #e2e8f0;">
        <p style="font-size:0.44rem; color:#aaa; text-transform:uppercase; letter-spacing:1px; margin:0; text-align:center; line-height:1.9;">filtre<br>agrégation</p>
        <div style="font-size:2rem; color:var(--blue-dirmob); line-height:1;">→</div>
    </div>

    <div style="flex:1; background:#fdf4ff; border-radius:0 8px 8px 0; padding:18px 20px; border:2px solid #9333ea; border-left:none;">
        <p style="font-size:0.54rem; text-transform:uppercase; letter-spacing:2px; color:#9333ea; font-weight:700; margin:0 0 6px;">OLAP</p>
        <p style="font-size:0.88rem; font-weight:700; color:#7c3aed; margin:0 0 12px; font-family:'IBM Plex Serif',serif;">Lecture & analyse</p>
        <div style="display:flex; flex-direction:column; gap:7px;">
            <div style="background:white; border-radius:5px; padding:7px 11px; border-left:3px solid #9333ea;">
                <p style="font-size:0.62rem; color:#333; margin:0;">Vue consolidée, agrégée</p>
            </div>
            <div style="background:white; border-radius:5px; padding:7px 11px; border-left:3px solid #9333ea;">
                <p style="font-size:0.62rem; color:#333; margin:0;">Combien ? Quand ? Par qui ?</p>
            </div>
            <div style="background:white; border-radius:5px; padding:7px 11px; border-left:3px solid #9333ea;">
                <p style="font-size:0.62rem; color:#333; margin:0;">Objectif : comprendre et piloter</p>
            </div>
        </div>
        <p style="font-size:0.54rem; color:#555; margin:12px 0 0; font-style:italic; line-height:1.7;">Bilan mensuel, TCD, indicateurs,<br><strong style="color:#7c3aed;">tableau de suivi</strong>…</p>
    </div>

</div>

<div class="fragment" style="background:#fefce8; border-radius:8px; padding:13px 20px; border-left:4px solid #ca8a04;">
    <p style="font-size:0.76rem; color:#333; margin:0; line-height:1.75;">
        <strong style="color:#92400e;">Votre tableau de suivi = OLAP.</strong>
        Il se génère automatiquement si la table source (OLTP) est propre et bien structurée.
        Le problème actuel : vous faites les deux dans le même fichier Excel.
    </p>
</div>
`;

const olapVsOltp = `
<h2>Deux tables. Même système Yego.</h2>
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

const olapRetro = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:#9333ea; margin:0 0 6px; font-weight:700;">Rétro-ingénierie</p>
<h2 style="margin-top:0;">De l'événement au trajet : filtre + agrégation</h2>
<p style="font-size:0.7rem; color:#888; margin-top:-14px; margin-bottom:14px;">3 événements bruts pour GA019TM → 1 ligne consolidée dans /trips.</p>

<div style="display:flex; gap:14px; align-items:flex-start; max-width:960px; margin:0 auto;">

    <!-- OLTP : events -->
    <div style="flex:1.3;">
        <div style="background:#2563eb; border-radius:8px 8px 0 0; padding:7px 13px;">
            <p style="font-size:0.52rem; font-weight:700; color:white; font-family:monospace; margin:0;">OLTP · /events · GA019TM</p>
        </div>
        <div style="background:#eff6ff; padding:10px 12px; border:2px solid #2563eb; border-top:none; border-radius:0 0 8px 8px;">
            <table class="mockup-table" style="font-size:0.46em;">
                <tr>
                    <th style="background:#2563eb; color:white;">vehicle_id</th>
                    <th>event_time</th>
                    <th>vehicle_state</th>
                    <th>event_types</th>
                    <th>battery_pct</th>
                </tr>
                <tr style="background:#dbeafe; outline:2px solid #2563eb; outline-offset:-1px;">
                    <td style="color:#2563eb; font-weight:700;">GA019TM</td>
                    <td style="font-weight:700;">17:45:07</td>
                    <td>on_trip</td>
                    <td style="font-weight:700; color:#2563eb;">[trip_start] ✦</td>
                    <td>74%</td>
                </tr>
                <tr style="opacity:0.45;">
                    <td style="color:#2563eb; opacity:0.7;">GA019TM</td>
                    <td>17:52:14</td>
                    <td>on_trip</td>
                    <td>[location_update]</td>
                    <td>71%</td>
                </tr>
                <tr style="background:#dbeafe; outline:2px solid #2563eb; outline-offset:-1px;">
                    <td style="color:#2563eb; font-weight:700;">GA019TM</td>
                    <td style="font-weight:700;">17:59:59</td>
                    <td>available</td>
                    <td style="font-weight:700; color:#2563eb;">[trip_end] ✦</td>
                    <td>68%</td>
                </tr>
            </table>
            <p style="font-size:0.5rem; color:#2563eb; font-weight:700; margin:6px 0 0;">✦ On retient trip_start + trip_end</p>
        </div>
    </div>

    <!-- Étapes de transformation -->
    <div style="flex:0.85; display:flex; flex-direction:column; gap:7px; padding-top:38px;">

        <div class="fragment" style="background:#f8fafc; border-radius:7px; padding:10px 13px; border:1px solid #cbd5e1; text-align:center;">
            <p style="font-size:0.5rem; color:#555; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin:0 0 4px;">① Filtre</p>
            <p style="font-size:0.44rem; color:#888; margin:0; font-family:monospace; line-height:1.7;">WHERE event_types<br>IN (trip_start, trip_end)</p>
        </div>

        <div class="fragment" style="text-align:center; color:var(--blue-dirmob); font-size:1.1rem; line-height:1;">↓</div>

        <div class="fragment" style="background:#f8fafc; border-radius:7px; padding:10px 13px; border:1px solid #cbd5e1; text-align:center;">
            <p style="font-size:0.5rem; color:#555; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin:0 0 4px;">② Calcul</p>
            <p style="font-size:0.44rem; color:#888; margin:0; font-family:monospace; line-height:1.8;">17:59:59 − 17:45:07<br>= <strong style="color:#333; font-size:1.15em;">892 s</strong></p>
        </div>

        <div class="fragment" style="text-align:center; color:var(--blue-dirmob); font-size:1.1rem; line-height:1;">↓</div>

        <div class="fragment" style="background:#f8fafc; border-radius:7px; padding:10px 13px; border:1px solid #cbd5e1; text-align:center;">
            <p style="font-size:0.5rem; color:#555; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin:0 0 4px;">③ Agrégation</p>
            <p style="font-size:0.44rem; color:#888; margin:0; font-family:monospace; line-height:1.7;">3 événements<br>→ <strong style="color:#333;">1 trajet</strong></p>
        </div>

        <div class="fragment" style="text-align:center; color:var(--blue-dirmob); font-size:1.3rem; line-height:1; padding-top:4px;">→</div>

    </div>

    <!-- OLAP : résultat -->
    <div class="fragment" style="flex:1.3;">
        <div style="background:#9333ea; border-radius:8px 8px 0 0; padding:7px 13px;">
            <p style="font-size:0.52rem; font-weight:700; color:white; font-family:monospace; margin:0;">OLAP · /trips · résultat</p>
        </div>
        <div style="background:#fdf4ff; padding:10px 12px; border:2px solid #9333ea; border-top:none; border-radius:0 0 8px 8px;">
            <table class="mockup-table" style="font-size:0.46em;">
                <tr>
                    <th style="background:#9333ea; color:white;">vehicle_id</th>
                    <th>trip_duration</th>
                    <th>trip_distance</th>
                    <th>start_time</th>
                    <th>end_time</th>
                </tr>
                <tr style="background:#f3e8ff; outline:2px solid #9333ea; outline-offset:-1px;">
                    <td style="color:#9333ea; font-weight:700;">GA019TM</td>
                    <td style="color:#9333ea; font-weight:700;">892 s</td>
                    <td style="color:#9333ea; font-weight:700;">2 406 m</td>
                    <td style="font-weight:700;">17:45:07</td>
                    <td style="font-weight:700;">17:59:59</td>
                </tr>
                <tr style="opacity:0.3;"><td>GW268PE</td><td>488 s</td><td>1 556 m</td><td>17:52:03</td><td>18:00:11</td></tr>
                <tr style="opacity:0.3;"><td>GX148JL</td><td>1 154 s</td><td>3 820 m</td><td>17:41:10</td><td>18:00:24</td></tr>
            </table>
            <p style="font-size:0.5rem; color:#9333ea; font-weight:700; margin:6px 0 0;">3 événements → 1 ligne. Prêt pour l'analyse.</p>
        </div>
    </div>

</div>
`;

const definition = `
<h2>Qu'est-ce qu'une base de données ?</h2>
<div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 10px;"></div>

<div class="citation" style="margin-bottom:12px; padding:14px 18px !important;">
    <p style="font-size:0.72rem !important; line-height:1.6 !important;">Les données font référence à toutes les informations capturées et stockées sur un seul individu, lieu, élément ou objet — appelé <strong>entité</strong> — ainsi que les <strong>attributs</strong> de cette entité. Elles sont organisées dans une base de données pour être facilement <strong>accessibles</strong>, <strong>gérées</strong> et <strong>mises à jour</strong>.</p>
</div>

<!-- Schéma 1 : liste de courses -->
<div class="row" style="gap:8px; align-items:center; margin-bottom:10px;">

    <div style="flex:0.8;">
        <p style="font-size:0.43rem; font-weight:700; color:var(--grey-dirmob); margin:0 0 5px; text-transform:uppercase; letter-spacing:1px;">Voici des données</p>
        <div style="background:#fffef5; border:1px solid #e2dcc8; border-radius:6px; padding:9px 14px; font-family:'IBM Plex Serif',serif; font-size:0.63rem; line-height:2.3; color:#333;">
            ☐ &nbsp;Pain<br>
            ☑ &nbsp;<span style="text-decoration:line-through; opacity:0.45;">Lait</span><br>
            ☐ &nbsp;Oeufs<br>
            ☑ &nbsp;<span style="text-decoration:line-through; opacity:0.45;">Fromage</span>
        </div>
        <p style="font-size:0.42rem; color:#aaa; margin:5px 0 0; font-style:italic; text-align:center;">liste de courses</p>
    </div>

    <div style="font-size:1.2rem; color:var(--blue-dirmob); flex-shrink:0; text-align:center;">→</div>

    <div class="offbeat-card" style="flex:1; padding:10px 12px;">
        <p style="font-size:0.42rem; color:#aaa; margin:0 0 4px; text-transform:uppercase; letter-spacing:1px;">(Entité) Quoi ?</p>
        <p style="font-size:0.92rem; font-weight:700; color:var(--blue-dirmob); margin:0 0 7px; font-family:'IBM Plex Serif',serif;">ARTICLE</p>
        <div class="separator" style="margin:5px 0;"></div>
        <p style="font-size:0.48rem; font-weight:700; color:#666; margin:0 0 4px; text-transform:uppercase; letter-spacing:1px;">Attributs</p>
        <p style="font-size:0.52rem; color:#333; margin:0; font-family:monospace; line-height:2;">
            <span style="background:#dbe4ff; padding:1px 7px; border-radius:3px; color:#1e40af; font-weight:700;">id</span>&nbsp;
            <span style="background:var(--light-grey); padding:1px 7px; border-radius:3px;">nom</span>&nbsp;
            <span style="background:var(--light-grey); padding:1px 7px; border-radius:3px;">quantite</span>&nbsp;
            <span style="background:var(--light-grey); padding:1px 7px; border-radius:3px;">achete</span>
        </p>
    </div>

    <div style="font-size:1.2rem; color:var(--blue-dirmob); flex-shrink:0; text-align:center;">→</div>

    <div style="flex:1.25;">
        <p style="font-size:0.43rem; font-weight:700; color:var(--grey-dirmob); margin:0 0 5px; font-family:monospace;">TABLE : articles</p>
        <table class="mockup-table" style="font-size:0.46em;">
            <tr>
                <th style="background:#1e40af; color:white; font-family:monospace;">id</th>
                <th style="font-family:monospace;">nom</th>
                <th style="font-family:monospace;">quantite</th>
                <th style="font-family:monospace;">achete</th>
            </tr>
            <tr><td style="color:#1e40af; font-weight:700;">1</td><td>pain</td><td>1</td><td style="color:var(--red-alert);">non</td></tr>
            <tr><td style="color:#1e40af; font-weight:700;">2</td><td>lait</td><td>2</td><td style="color:var(--green-dirmob); font-weight:700;">oui</td></tr>
            <tr><td style="color:#1e40af; font-weight:700;">3</td><td>oeufs</td><td>6</td><td style="color:var(--red-alert);">non</td></tr>
            <tr><td style="color:#1e40af; font-weight:700;">4</td><td>fromage</td><td>1</td><td style="color:var(--green-dirmob); font-weight:700;">oui</td></tr>
        </table>
    </div>

</div>

<!-- Schéma 2 : restaurants (fragment) -->
<div class="fragment">
    <div class="separator"></div>
    <div class="row" style="gap:8px; align-items:center;">

        <div style="flex:0.8;">
            <p style="font-size:0.43rem; font-weight:700; color:var(--grey-dirmob); margin:0 0 5px; text-transform:uppercase; letter-spacing:1px;">Voici des données</p>
            <div style="background:#fff8f0; border:1px solid #e2d0b8; border-radius:6px; padding:9px 14px; font-size:0.6rem; line-height:2.3; color:#333;">
                🍽️&nbsp; Brasserie du Parc<br>
                🍽️&nbsp; Le Bistrot<br>
                🍽️&nbsp; Pizza Roma
            </div>
            <p style="font-size:0.42rem; color:#aaa; margin:5px 0 0; font-style:italic; text-align:center;">restaurants locaux</p>
        </div>

        <div style="font-size:1.2rem; color:var(--blue-dirmob); flex-shrink:0; text-align:center;">→</div>

        <div class="offbeat-card card--green" style="flex:1; padding:10px 12px;">
            <p style="font-size:0.42rem; color:#aaa; margin:0 0 4px; text-transform:uppercase; letter-spacing:1px;">(Entité) Quoi ?</p>
            <p style="font-size:0.92rem; font-weight:700; color:var(--green-dirmob); margin:0 0 7px; font-family:'IBM Plex Serif',serif;">RESTAURANT</p>
            <div class="separator" style="margin:5px 0;"></div>
            <p style="font-size:0.48rem; font-weight:700; color:#666; margin:0 0 4px; text-transform:uppercase; letter-spacing:1px;">Attributs</p>
            <p style="font-size:0.52rem; color:#333; margin:0; font-family:monospace; line-height:2;">
                <span style="background:#dbe4ff; padding:1px 7px; border-radius:3px; color:#1e40af; font-weight:700;">id</span>&nbsp;
                <span style="background:var(--light-grey); padding:1px 7px; border-radius:3px;">nom</span>&nbsp;
                <span style="background:var(--light-grey); padding:1px 7px; border-radius:3px;">adresse</span>&nbsp;
                <span style="background:var(--light-grey); padding:1px 7px; border-radius:3px;">ville</span>&nbsp;
                <span style="background:var(--light-grey); padding:1px 7px; border-radius:3px;">ouverture</span>&nbsp;
                <span style="background:var(--light-grey); padding:1px 7px; border-radius:3px;">fermeture</span>&nbsp;
                <span style="background:var(--light-grey); padding:1px 7px; border-radius:3px;">note</span>
            </p>
        </div>

        <div style="font-size:1.2rem; color:var(--blue-dirmob); flex-shrink:0; text-align:center;">→</div>

        <div style="flex:1.35;">
            <p style="font-size:0.43rem; font-weight:700; color:var(--grey-dirmob); margin:0 0 5px; font-family:monospace;">TABLE : restaurants</p>
            <table class="mockup-table" style="font-size:0.39em;">
                <tr>
                    <th style="background:#1e40af; color:white; font-family:monospace;">id</th>
                    <th style="font-family:monospace;">nom</th>
                    <th style="font-family:monospace;">adresse</th>
                    <th style="font-family:monospace;">ville</th>
                    <th style="font-family:monospace;">ouverture</th>
                    <th style="font-family:monospace;">fermeture</th>
                    <th style="font-family:monospace;">note</th>
                </tr>
                <tr><td style="color:#1e40af; font-weight:700;">1</td><td>Brasserie du Parc</td><td>12 r. de la Paix</td><td>Paris</td><td>08:00</td><td>22:00</td><td>4.5</td></tr>
                <tr><td style="color:#1e40af; font-weight:700;">2</td><td>Le Bistrot</td><td>5 av. Victor Hugo</td><td>Lyon</td><td>12:00</td><td>23:00</td><td>4.2</td></tr>
                <tr><td style="color:#1e40af; font-weight:700;">3</td><td>Pizza Roma</td><td>3 r. Gambetta</td><td>Paris</td><td>11:30</td><td>22:30</td><td>4.7</td></tr>
            </table>
        </div>

    </div>
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
            <td>non_traite</td>
        </tr>
        <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R002</td><td>07/03/2026</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">L2</td><td>avance</td><td>traite</td></tr>
        <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R003</td><td>10/03/2026</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">L1</td><td>retard</td><td>non_traite</td></tr>
    </table>
</div>

<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:12px;">
    <div class="fragment" style="background:#dbe4ff; border-radius:7px; padding:10px 12px; border-left:3px solid #1e40af;">
        <p style="font-size:0.6rem; font-weight:700; color:#1e40af; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Identifiant (PK)</p>
        <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.5;">Désigne la ligne sans ambiguïté. Unique, stable, non signifiant.</p>
    </div>
    <div class="fragment" style="background:#dcfce7; border-radius:7px; padding:10px 12px; border-left:3px solid #15803d;">
        <p style="font-size:0.6rem; font-weight:700; color:#15803d; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Enregistrement</p>
        <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.5;">Une ligne = un fait réel complet. Lisez-la en une phrase — si c'est fluide, la table est bien construite.</p>
    </div>
    <div class="fragment" style="background:#ede9fe; border-radius:7px; padding:10px 12px; border-left:3px solid #6b21a8;">
        <p style="font-size:0.6rem; font-weight:700; color:#6b21a8; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Attribut</p>
        <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.5;">La valeur à l'intersection d'un champ et d'un enregistrement.</p>
    </div>
    <div class="fragment" style="background:#fef3c7; border-radius:7px; padding:10px 12px; border-left:3px solid #a16207;">
        <p style="font-size:0.6rem; font-weight:700; color:#a16207; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Clé étrangère (FK)</p>
        <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.5;">Pointe vers une autre table. C'est le lien entre les données.</p>
    </div>
</div>

<div class="fragment" style="background:#f0fdf4; border-radius:8px; padding:10px 16px; border-left:3px solid #15803d;">
    <p style="font-size:0.52rem; font-weight:700; color:#15803d; margin:0 0 5px; text-transform:uppercase; letter-spacing:1px;">Le test de l'enregistrement</p>
    <p style="font-size:0.66rem; color:#333; margin:0 0 8px; line-height:1.75;">
        « La réclamation <strong>R001</strong>, reçue le <strong>05/03/2026</strong>
        sur la <span style="background:#dcfce7; color:#15803d; font-weight:700; padding:1px 5px; border-radius:3px;">ligne 389 gérée par Keolis</span>,
        signale un <strong>retard</strong> — elle <strong>n'a pas encore été traitée</strong>. »
    </p>
    <div style="display:flex; align-items:center; gap:0; margin-bottom:7px;">
        <p style="font-size:0.5rem; color:#888; font-weight:600; margin:0 10px 0 0; white-space:nowrap; text-transform:uppercase; letter-spacing:1px;">La jointure :</p>
        <div style="background:#fef3c7; border:1px solid #d97706; border-radius:4px 0 0 4px; padding:4px 9px;">
            <p style="font-size:0.48rem; color:#a16207; font-weight:700; margin:0; font-family:monospace;">réclamations.id_ligne = L1</p>
        </div>
        <div style="background:#d97706; padding:4px 7px; display:flex; align-items:center;">
            <span style="color:white; font-weight:700; font-size:0.7rem;">→</span>
        </div>
        <div style="background:#dcfce7; border:1px solid #15803d; padding:4px 9px;">
            <p style="font-size:0.48rem; color:#15803d; font-weight:700; margin:0; font-family:monospace;">lignes_bus</p>
        </div>
        <div style="background:#d97706; padding:4px 7px; display:flex; align-items:center;">
            <span style="color:white; font-weight:700; font-size:0.7rem;">→</span>
        </div>
        <div style="background:#dcfce7; border:1px solid #15803d; border-radius:0 4px 4px 0; padding:4px 9px;">
            <p style="font-size:0.48rem; color:#333; font-weight:600; margin:0;">id : <strong style="color:#15803d;">L1</strong> · numero : <strong>389</strong> · prestataire : <strong>Keolis</strong></p>
        </div>
    </div>
    <p style="font-size:0.6rem; color:#15803d; font-weight:600; margin:0;">Si vous lisez une ligne en une phrase claire et sans ambiguïté, la table est bien construite.</p>
</div>
`;

const relationnel = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 6px; font-weight:700;">Modèle relationnel</p>
<h2 style="margin-top:0;">La base de données : un commun numérique</h2>
<p style="font-size:0.74rem; color:#888; margin-top:-16px; margin-bottom:16px;">Chaque information est saisie une seule fois. Ce qui appartient à une autre table, on ne le ressaisit pas — on le récupère.</p>

<div class="row" style="gap:16px; align-items:flex-start;">

    <div style="flex:1;">
        <div class="label--bad">Tout dans une seule table</div>
        <div class="offbeat-card card--red" style="padding:12px;">
            <table class="mockup-table" style="font-size:0.43em;">
                <tr>
                    <th>id</th><th>date</th><th>motif</th>
                    <th style="background:#ffcdd2; color:#b71c1c;">numero_ligne</th>
                    <th style="background:#ffcdd2; color:#b71c1c;">prestataire</th>
                    <th style="background:#ffcdd2; color:#b71c1c;">depot</th>
                </tr>
                <tr><td>R001</td><td>05/03</td><td>retard</td><td style="background:#ffcdd2;">389</td><td style="background:#ffcdd2;">Keolis</td><td style="background:#ffcdd2;">Bordeaux</td></tr>
                <tr><td>R002</td><td>07/03</td><td>avance</td><td style="background:#ffcdd2;">389</td><td style="background:#ffcdd2;">Keolis</td><td style="background:#ffcdd2;">Bordeaux</td></tr>
                <tr><td>R003</td><td>10/03</td><td>retard</td><td style="background:#ffcdd2;">389</td><td style="background:#ffcdd2;">Keolis</td><td style="background:#ffcdd2;">Bordeaux</td></tr>
            </table>
            <p style="font-size:0.56rem; color:var(--red-alert); margin:7px 0 0; line-height:1.6;">Double-saisie : prestataire et dépôt ressaisis à chaque nouvelle réclamation. Une correction = à propager manuellement partout.</p>
        </div>
    </div>

    <div class="fragment" style="flex:1;">
        <div class="label--good">Deux entités séparées, liées par un identifiant</div>
        <div style="display:flex; flex-direction:column; gap:8px;">
            <div class="offbeat-card card--green" style="padding:10px 12px;">
                <p style="font-size:0.44rem; color:#555; font-family:monospace; margin:0 0 5px; font-weight:700; text-transform:uppercase; letter-spacing:1px;">reclamations</p>
                <table class="mockup-table" style="font-size:0.43em;">
                    <tr>
                        <th style="background:#1e40af; color:white;">id</th>
                        <th>date</th><th>motif</th>
                        <th style="background:#fef3c7; color:#a16207;">id_ligne →</th>
                    </tr>
                    <tr><td style="color:#1e40af; font-weight:700;">R001</td><td>05/03</td><td>retard</td><td style="color:#a16207; font-weight:700; background:#fef9e7;">ligne_389</td></tr>
                    <tr><td style="color:#1e40af; font-weight:700;">R002</td><td>07/03</td><td>avance</td><td style="color:#a16207; font-weight:700; background:#fef9e7;">ligne_389</td></tr>
                    <tr><td style="color:#1e40af; font-weight:700;">R003</td><td>10/03</td><td>retard</td><td style="color:#a16207; font-weight:700; background:#fef9e7;">ligne_160</td></tr>
                </table>
            </div>
            <div class="offbeat-card" style="padding:10px 12px;">
                <p style="font-size:0.44rem; color:#555; font-family:monospace; margin:0 0 5px; font-weight:700; text-transform:uppercase; letter-spacing:1px;">lignes_bus</p>
                <table class="mockup-table" style="font-size:0.43em;">
                    <tr>
                        <th style="background:#a16207; color:white;">id</th>
                        <th>numero</th><th>prestataire</th><th>depot</th>
                    </tr>
                    <tr><td style="color:#a16207; font-weight:700;">ligne_389</td><td>389</td><td>Keolis</td><td>Bordeaux</td></tr>
                    <tr><td style="color:#a16207; font-weight:700;">ligne_160</td><td>160</td><td>RATP</td><td>Paris</td></tr>
                </table>
            </div>
        </div>
        <p style="font-size:0.56rem; color:#2e7d32; margin:7px 0 0; line-height:1.6;">L'info vit dans lignes_bus. On ne la ressaisit pas — on la récupère par jointure quand on a besoin d'une vue.</p>
    </div>

</div>

<div class="fragment" style="background:#fefce8; border-radius:8px; padding:13px 20px; border-left:4px solid #ca8a04; margin-top:14px;">
    <p style="font-size:0.76rem; color:#333; margin:0; line-height:1.8;">
        <strong style="color:#92400e;">La BDD est un commun numérique.</strong>
        Ce qui appartient à la table de l'autre, on ne le ressaisit pas — on le récupère par <strong>jointure</strong>, à la demande.
        C'est ainsi qu'on produit une vue OLAP sans double-saisie.
    </p>
</div>
`;

const relationHub = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 6px; font-weight:700;">Commun numérique</p>
<h2 style="margin-top:0;">Une réclamation peut concerner n'importe quelle entité</h2>
<p style="font-size:0.74rem; color:#888; margin-top:-16px; margin-bottom:14px;">À la DIRMOB, les réclamations ne portent pas que sur les bus. Chaque équipe gère sa table — les réclamations s'y branchent.</p>

<div style="display:flex; gap:14px; align-items:center; margin-bottom:14px;">

    <!-- Entités gérées par chaque équipe -->
    <div style="flex:1; display:flex; flex-direction:column; gap:7px;">

        <div style="background:#fff8e1; border-radius:7px; padding:9px 13px; border-left:3px solid #f59e0b;">
            <p style="font-size:0.5rem; font-weight:700; color:#b45309; font-family:monospace; margin:0 0 2px;">lignes_bus</p>
            <p style="font-size:0.44rem; color:#777; margin:0;">ligne_389 · ligne_160 · prestataire · depot</p>
            <p style="font-size:0.38rem; color:#aaa; margin:3px 0 0; font-style:italic;">géré par l'équipe transport</p>
        </div>

        <div class="fragment" style="background:#e8f5e9; border-radius:7px; padding:9px 13px; border-left:3px solid #16a34a;">
            <p style="font-size:0.5rem; font-weight:700; color:#15803d; font-family:monospace; margin:0 0 2px;">parkings</p>
            <p style="font-size:0.44rem; color:#777; margin:0;">parking_P42 · adresse · capacite · tarif</p>
            <p style="font-size:0.38rem; color:#aaa; margin:3px 0 0; font-style:italic;">géré par l'équipe stationnement</p>
        </div>

        <div class="fragment" style="background:#f0fdf4; border-radius:7px; padding:9px 13px; border-left:3px solid #22c55e;">
            <p style="font-size:0.5rem; font-weight:700; color:#15803d; font-family:monospace; margin:0 0 2px;">pistes_cyclables</p>
            <p style="font-size:0.44rem; color:#777; margin:0;">piste_PC07 · longueur · etat · commune</p>
            <p style="font-size:0.38rem; color:#aaa; margin:3px 0 0; font-style:italic;">géré par l'équipe mobilité douce</p>
        </div>

    </div>

    <!-- Flèche -->
    <div style="font-size:1.6rem; color:#a16207; flex-shrink:0; text-align:center;">←</div>

    <!-- Reclamations : entité centrale qui se branche -->
    <div style="flex:1.1; flex-shrink:0;">
        <div style="background:#eff6ff; border:2px solid #2563eb; border-radius:10px; padding:14px 16px;">
            <p style="font-size:0.44rem; text-transform:uppercase; letter-spacing:2px; color:#2563eb; font-weight:700; margin:0 0 4px;">Entité centrale</p>
            <p style="font-size:1rem; font-weight:700; color:#1e40af; font-family:'IBM Plex Serif',serif; margin:0 0 10px;">reclamations</p>
            <table class="mockup-table" style="font-size:0.38em;">
                <tr>
                    <th style="background:#1e40af; color:white;">id</th>
                    <th>motif</th>
                    <th style="background:#fef3c7; color:#a16207;">id_sujet →</th>
                    <th style="background:#fef3c7; color:#a16207;">type</th>
                </tr>
                <tr>
                    <td style="color:#1e40af; font-weight:700;">R001</td>
                    <td>retard</td>
                    <td style="color:#b45309; font-weight:700;">ligne_389</td>
                    <td style="color:#b45309;">bus</td>
                </tr>
                <tr class="fragment">
                    <td style="color:#1e40af; font-weight:700;">R002</td>
                    <td>complet</td>
                    <td style="color:#15803d; font-weight:700;">parking_P42</td>
                    <td style="color:#15803d;">parking</td>
                </tr>
                <tr class="fragment">
                    <td style="color:#1e40af; font-weight:700;">R003</td>
                    <td>obstacle</td>
                    <td style="color:#15803d; font-weight:700;">piste_PC07</td>
                    <td style="color:#15803d;">velo</td>
                </tr>
            </table>
            <p style="font-size:0.42rem; color:#2563eb; margin:8px 0 0; font-style:italic;">Pointe vers l'entité concernée — sans ressaisir ses données.</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#fefce8; border-radius:8px; padding:12px 20px; border-left:4px solid #ca8a04;">
    <p style="font-size:0.74rem; color:#333; margin:0; line-height:1.8;">
        <strong style="color:#92400e;">Chaque équipe maintient sa table, une seule fois.</strong><br>
        <span style="font-size:0.68rem; color:#555;">Les réclamations se branchent dessus par jointure — sans ressaisir. C'est ça le commun numérique : discuter de la structure ensemble, pour que tout le monde puisse s'en servir.</span>
    </p>
</div>
`;

const relationSchema = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 6px; font-weight:700;">Schéma relationnel</p>
<h2 style="margin-top:0;">Le lien entre les entités</h2>
<p style="font-size:0.74rem; color:#888; margin-top:-16px; margin-bottom:14px;">La clé étrangère <code>id_ligne</code> dans <em>reclamations</em> pointe vers la clé primaire <code>id</code> dans <em>lignes_bus</em>.</p>

<div style="display:flex; gap:0; align-items:center; justify-content:center; margin:0 0 18px;">

    <div class="offbeat-card" style="flex:0 0 auto; width:210px; padding:12px 16px;">
        <p style="font-size:0.42rem; color:#aaa; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Entité</p>
        <p style="font-size:0.88rem; font-weight:700; color:var(--blue-dirmob); margin:0 0 8px; font-family:'IBM Plex Serif',serif;">RECLAMATION</p>
        <div class="separator" style="margin:4px 0 7px;"></div>
        <p style="font-size:0.48rem; font-family:monospace; color:#333; margin:0; line-height:2.1;">
            <span style="background:#dbe4ff; padding:1px 7px; border-radius:3px; color:#1e40af; font-weight:700;">id</span><br>
            date<br>
            motif<br>
            statut<br>
            <span style="background:#fef3c7; padding:1px 7px; border-radius:3px; color:#a16207; font-weight:700;">id_ligne →</span>
        </p>
        <p style="font-size:0.38rem; color:#999; margin:7px 0 0; font-style:italic;">N réclamations pour 1 ligne</p>
    </div>

    <div style="display:flex; flex-direction:column; align-items:center; padding:0 14px; gap:5px; flex-shrink:0;">
        <p style="font-size:0.44rem; color:#a16207; font-weight:700; margin:0; font-family:monospace; background:#fef3c7; padding:3px 10px; border-radius:3px;">id_ligne = id</p>
        <div style="font-size:1.8rem; color:#a16207; line-height:1;">⟷</div>
        <p style="font-size:0.4rem; color:#aaa; margin:0; text-align:center; line-height:1.7; text-transform:uppercase; letter-spacing:1px;">clé<br>étrangère</p>
    </div>

    <div class="offbeat-card card--grey" style="flex:0 0 auto; width:210px; padding:12px 16px;">
        <p style="font-size:0.42rem; color:#aaa; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Entité</p>
        <p style="font-size:0.88rem; font-weight:700; color:var(--grey-dirmob); margin:0 0 8px; font-family:'IBM Plex Serif',serif;">LIGNE_BUS</p>
        <div class="separator" style="margin:4px 0 7px;"></div>
        <p style="font-size:0.48rem; font-family:monospace; color:#333; margin:0; line-height:2.1;">
            <span style="background:#fef3c7; padding:1px 7px; border-radius:3px; color:#a16207; font-weight:700;">id</span><br>
            numero<br>
            prestataire<br>
            depot
        </p>
        <p style="font-size:0.38rem; color:#999; margin:7px 0 0; font-style:italic;">1 ligne = source de vérité</p>
    </div>

</div>

<div class="fragment">
    <div class="separator"></div>
    <p style="font-size:0.62rem; color:#555; margin:10px 0 8px; font-weight:600;">La jointure assemble les deux entités à la demande — sans duplication dans les tables sources :</p>
    <table class="mockup-table" style="font-size:0.5em;">
        <tr>
            <th style="background:#1e40af; color:white;">id</th>
            <th>date</th><th>motif</th>
            <th style="background:#fef3c7; color:#a16207;">numero_ligne</th>
            <th style="background:#fef3c7; color:#a16207;">prestataire</th>
            <th style="background:#fef3c7; color:#a16207;">depot</th>
            <th>statut</th>
        </tr>
        <tr>
            <td style="color:#1e40af; font-weight:700;">R001</td><td>05/03/2026</td><td>retard</td>
            <td style="color:#a16207; font-weight:700;">389</td><td style="color:#a16207; font-weight:700;">Keolis</td><td style="color:#a16207; font-weight:700;">Bordeaux</td>
            <td>non_traite</td>
        </tr>
        <tr>
            <td style="color:#1e40af; font-weight:700;">R002</td><td>07/03/2026</td><td>avance</td>
            <td style="color:#a16207; font-weight:700;">389</td><td style="color:#a16207; font-weight:700;">Keolis</td><td style="color:#a16207; font-weight:700;">Bordeaux</td>
            <td>traite</td>
        </tr>
        <tr>
            <td style="color:#1e40af; font-weight:700;">R003</td><td>10/03/2026</td><td>retard</td>
            <td style="color:#a16207; font-weight:700;">160</td><td style="color:#a16207; font-weight:700;">RATP</td><td style="color:#a16207; font-weight:700;">Paris</td>
            <td>non_traite</td>
        </tr>
    </table>
</div>
`;


const dataLineage = `
<p style="font-size:0.7rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 2px; font-weight:700;">Commun numérique — au-delà de votre service</p>
<h2 style="margin:0 0 6px; line-height:1.1;">Vos données voyagent loin — elles doivent être propres</h2>

<svg viewBox="0 0 1060 430" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block;">
  <defs>
    <marker id="dl-pub" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0,10 3.5,0 7" fill="#0f766e"/>
    </marker>
    <marker id="dl-pub2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0,10 3.5,0 7" fill="#15803d"/>
    </marker>
    <marker id="dl-int" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0,10 3.5,0 7" fill="#1e3a5f"/>
    </marker>
    <marker id="dl-tdb" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0,10 3.5,0 7" fill="#7c3aed"/>
    </marker>
    <linearGradient id="dl-src" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#009fe3"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
  </defs>

  <!-- ═══════ SWIM LANE BACKGROUNDS ═══════ -->
  <rect x="0" y="0" width="1060" height="205" rx="0" fill="#f0fdf4" opacity="0.7"/>
  <rect x="0" y="211" width="1060" height="219" rx="0" fill="#eff6ff" opacity="0.7"/>

  <!-- Lane labels -->
  <text x="182" y="16" fill="#15803d" font-size="10" font-weight="700" font-family="Roboto,system-ui" letter-spacing="1.5">🌍  OPEN DATA · PUBLIC</text>
  <text x="182" y="227" fill="#1e3a5f" font-size="10" font-weight="700" font-family="Roboto,system-ui" letter-spacing="1.5">🔒  USAGE INTERNE</text>

  <!-- Divider -->
  <line x1="182" y1="207" x2="1052" y2="207" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="6,4"/>

  <!-- ═══════ ARROWS ═══════ -->

  <!-- Source → data.seineouest.fr -->
  <path d="M 169 80 L 244 80" fill="none" stroke="#0f766e" stroke-width="2.5" marker-end="url(#dl-pub)"/>
  <!-- data.SO → 7 villes -->
  <path d="M 459 80 L 540 80" fill="none" stroke="#0f766e" stroke-width="2.5" marker-end="url(#dl-pub)"/>
  <!-- 7 villes → Sites internet -->
  <path d="M 715 65 L 800 65" fill="none" stroke="#15803d" stroke-width="2.5" marker-end="url(#dl-pub2)"/>
  <!-- 7 villes → Apps mobiles -->
  <path d="M 715 105 C 755 105,755 148,800 148" fill="none" stroke="#15803d" stroke-width="2.5" marker-end="url(#dl-pub2)"/>

  <!-- Source → Arcopole (dashed interne) -->
  <path d="M 169 312 L 244 312" fill="none" stroke="#1e3a5f" stroke-width="2.5" stroke-dasharray="6,3" marker-end="url(#dl-int)"/>
  <!-- Arcopole → Tableaux de bord -->
  <path d="M 459 312 L 540 312" fill="none" stroke="#7c3aed" stroke-width="2.5" marker-end="url(#dl-tdb)"/>

  <!-- ═══════ SOURCE NODE ═══════ -->
  <rect x="14" y="22" width="155" height="386" rx="12" fill="url(#dl-src)" style="filter:drop-shadow(0 4px 14px rgba(0,159,227,0.35))"/>
  <text x="91" y="130" text-anchor="middle" font-size="34" font-family="system-ui">📋</text>
  <text x="91" y="164" text-anchor="middle" fill="white" font-size="13.5" font-weight="700" font-family="Roboto,system-ui">Données terrain</text>
  <text x="91" y="182" text-anchor="middle" fill="rgba(255,255,255,0.62)" font-size="9.5" font-style="italic" font-family="Roboto,system-ui">saisies au fil de l'eau</text>
  <line x1="28" y1="196" x2="157" y2="196" stroke="rgba(255,255,255,0.22)" stroke-width="1"/>
  <text x="91" y="220" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-size="10.5" font-weight="600" font-family="Roboto,system-ui">propre et à jour</text>

  <!-- ═══════ PUBLIC NODES ═══════ -->

  <!-- data.seineouest.fr -->
  <rect x="244" y="40" width="215" height="80" rx="10" fill="#0f766e"/>
  <rect x="253" y="47" width="66" height="18" rx="9" fill="rgba(255,255,255,0.14)"/>
  <text x="286" y="60" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="9.5" font-family="system-ui">🌍 Public</text>
  <text x="351" y="88" text-anchor="middle" fill="white" font-size="13.5" font-weight="700" font-family="Roboto,system-ui">🌐 data.seineouest.fr</text>
  <text x="351" y="107" text-anchor="middle" fill="rgba(255,255,255,0.82)" font-size="11" font-family="Roboto,system-ui">Open Data Seine-Ouest</text>

  <!-- 7 villes -->
  <rect x="540" y="30" width="175" height="110" rx="10" fill="#0d6657"/>
  <text x="627" y="72" text-anchor="middle" font-size="24" font-family="system-ui">🏙️</text>
  <text x="627" y="105" text-anchor="middle" fill="white" font-size="13.5" font-weight="700" font-family="Roboto,system-ui">Villes</text>

  <!-- Sites internet -->
  <rect x="800" y="26" width="246" height="78" rx="10" fill="#15803d"/>
  <rect x="809" y="33" width="66" height="18" rx="9" fill="rgba(255,255,255,0.14)"/>
  <text x="842" y="46" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="9.5" font-family="system-ui">🌍 Public</text>
  <text x="923" y="70" text-anchor="middle" fill="white" font-size="13" font-weight="700" font-family="Roboto,system-ui">🌍 Sites internet</text>
  <text x="923" y="89" text-anchor="middle" fill="rgba(255,255,255,0.78)" font-size="11" font-family="Roboto,system-ui">Portails municipaux</text>

  <!-- Apps mobiles -->
  <rect x="800" y="118" width="246" height="78" rx="10" fill="#15803d"/>
  <rect x="809" y="125" width="66" height="18" rx="9" fill="rgba(255,255,255,0.14)"/>
  <text x="842" y="138" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="9.5" font-family="system-ui">🌍 Public</text>
  <text x="923" y="162" text-anchor="middle" fill="white" font-size="13" font-weight="700" font-family="Roboto,system-ui">📱 Applications mobiles</text>
  <text x="923" y="181" text-anchor="middle" fill="rgba(255,255,255,0.78)" font-size="11" font-family="Roboto,system-ui">Transport · Services publics</text>

  <!-- ═══════ INTERNAL NODES ═══════ -->

  <!-- Arcopole Pro -->
  <rect x="244" y="256" width="215" height="112" rx="10" fill="#1e3a5f"/>
  <rect x="253" y="263" width="66" height="18" rx="9" fill="rgba(255,255,255,0.14)"/>
  <text x="286" y="276" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="9.5" font-family="system-ui">🔒 Interne</text>
  <text x="351" y="308" text-anchor="middle" fill="white" font-size="13.5" font-weight="700" font-family="Roboto,system-ui">🏢 Arcopole Pro</text>
  <text x="351" y="324" text-anchor="middle" fill="rgba(255,255,255,0.58)" font-size="10" font-style="italic" font-family="Roboto,system-ui">consultation et saisie</text>
  <text x="351" y="341" text-anchor="middle" fill="rgba(255,255,255,0.78)" font-size="11" font-family="Roboto,system-ui">Services techniques</text>
  <text x="351" y="357" text-anchor="middle" fill="rgba(255,255,255,0.78)" font-size="11" font-family="Roboto,system-ui">Directions territoriales</text>

  <!-- Tableaux de bord -->
  <rect x="540" y="248" width="506" height="124" rx="10" fill="#7c3aed" style="filter:drop-shadow(0 4px 12px rgba(124,58,237,0.3))"/>
  <rect x="550" y="256" width="60" height="18" rx="9" fill="rgba(255,255,255,0.14)"/>
  <text x="580" y="269" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="9.5" font-family="system-ui">🔒 Privé</text>
  <text x="793" y="305" text-anchor="middle" fill="white" font-size="13.5" font-weight="700" font-family="Roboto,system-ui">📊 Tableaux de bord</text>
  <text x="793" y="324" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="11.5" font-family="Roboto,system-ui">Décisions politiques · Budget · Nouvelles stations</text>
  <text x="793" y="343" text-anchor="middle" fill="rgba(255,255,255,0.72)" font-size="10.5" font-style="italic" font-family="Roboto,system-ui">Maillage du territoire · Investissements · Politiques mobilité</text>

  <!-- FOOTER -->
  <line x1="10" y1="412" x2="1050" y2="412" stroke="#e2e8f0" stroke-width="1"/>
  <text x="530" y="426" text-anchor="middle" fill="#64748b" font-size="11" font-family="Roboto,system-ui">💡  Donnée mal saisie → carte erronée · appli défaillante · élu qui décide sur de mauvaises bases</text>
</svg>
`;

const donneesEnJeu = `
<p style="font-size:0.7rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 3px; font-weight:700;">Les données que vous gérez — usages réels</p>
<h2 style="margin:0 0 10px; line-height:1.1;">Votre mise à jour compte — d'autres équipes en dépendent</h2>

<div style="display:flex; gap:16px; align-items:flex-start;">

    <!-- TABLE -->
    <div style="flex:1.7;">
        <p style="font-size:0.44rem; color:#999; margin:0 0 5px; font-family:monospace; letter-spacing:0.5px;">MAJ depuis le 01/01/2025 au 22/05/2026 · SOET SIG</p>
        <table class="mockup-table" style="font-size:0.52em; width:100%;">
            <thead>
                <tr>
                    <th style="text-align:left;">Couche SIG</th>
                    <th style="text-align:center; width:50px;">MAJ</th>
                    <th style="background:#1e3a5f; color:white; text-align:center; width:52px;">DTE</th>
                    <th style="background:#1e3a5f; color:white; text-align:center; width:52px;">DTO</th>
                    <th style="background:#1e3a5f; color:white; text-align:center; width:52px;">DTN</th>
                    <th style="background:#009fe3; color:white; text-align:center; width:64px;">DirMob</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Aires trottinettes</td>
                    <td style="text-align:center; color:#94a3b8;">9</td>
                    <td style="text-align:center; color:#334155; font-weight:700;">100%</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#cbd5e1; background:#f0f9ff;">—</td>
                </tr>
                <tr style="background:#fefce8;">
                    <td style="font-weight:700; color:#92400e;">⚠ Arrêts minutes</td>
                    <td style="text-align:center; color:#94a3b8;">81</td>
                    <td style="text-align:center; color:#334155; font-weight:700;">33%</td>
                    <td style="text-align:center; color:#334155; font-weight:700;">66%</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#cbd5e1; background:#fef9c3;">—</td>
                </tr>
                <tr style="background:#eff6ff;">
                    <td style="font-weight:700; color:#0369a1; border-left:3px solid #009fe3;">Autopartage</td>
                    <td style="text-align:center; color:#94a3b8;">74</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#009fe3; font-weight:700; background:#dbeafe;">100%</td>
                </tr>
                <tr>
                    <td>Circulation apaisée</td>
                    <td style="text-align:center; color:#94a3b8;">24</td>
                    <td style="text-align:center; color:#334155; font-weight:700;">50%</td>
                    <td style="text-align:center; color:#334155; font-weight:700;">50%</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#cbd5e1; background:#f0f9ff;">—</td>
                </tr>
                <tr style="background:#eff6ff;">
                    <td style="font-weight:700; color:#0369a1; border-left:3px solid #009fe3;">IRVE</td>
                    <td style="text-align:center; color:#94a3b8;">106</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#009fe3; font-weight:700; background:#dbeafe;">100%</td>
                </tr>
                <tr>
                    <td>Places LOM</td>
                    <td style="text-align:center; color:#94a3b8;">150</td>
                    <td style="text-align:center; color:#334155; font-weight:700;">17%</td>
                    <td style="text-align:center; color:#334155; font-weight:700;">17%</td>
                    <td style="text-align:center; color:#334155; font-weight:700;">66%</td>
                    <td style="text-align:center; color:#cbd5e1; background:#f0f9ff;">—</td>
                </tr>
                <tr>
                    <td>Places taxis</td>
                    <td style="text-align:center; color:#94a3b8;">11</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#334155; font-weight:700;">100%</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#cbd5e1; background:#f0f9ff;">—</td>
                </tr>
                <tr>
                    <td>Stationnement 2R</td>
                    <td style="text-align:center; color:#94a3b8;">195</td>
                    <td style="text-align:center; color:#334155; font-weight:700;">33%</td>
                    <td style="text-align:center; color:#334155; font-weight:700;">33%</td>
                    <td style="text-align:center; color:#334155; font-weight:700;">33%</td>
                    <td style="text-align:center; color:#cbd5e1; background:#f0f9ff;">—</td>
                </tr>
                <tr style="background:#eff6ff;">
                    <td style="font-weight:700; color:#0369a1; border-left:3px solid #009fe3;">Stations Vélib'</td>
                    <td style="text-align:center; color:#94a3b8;">7</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#cbd5e1;">—</td>
                    <td style="text-align:center; color:#009fe3; font-weight:700; background:#dbeafe;">100%</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- CALLOUTS -->
    <div style="flex:1; display:flex; flex-direction:column; gap:10px;">

        <div style="background:#fefce8; border-left:4px solid #d97706; border-radius:0 8px 8px 0; padding:12px 15px;">
            <p style="font-size:0.58rem; font-weight:700; color:#92400e; margin:0 0 6px;">⚠ Arrêts minutes → Commission Communale d'Accessibilité</p>
            <p style="font-size:0.5rem; color:#78350f; margin:0; line-height:1.65;">
                Ces données sont utilisées par les <strong>Directions Territoriales</strong> dans les <strong>Commissions Communales d'Accessibilité (CCA)</strong> — elles orientent les décisions pour les personnes à mobilité réduite.
                DTE et DTO les alimentent : si une mise à jour est manquante, c'est la Commission qui travaille sur des données fausses.
            </p>
        </div>

        <div style="background:#eff6ff; border-left:4px solid #009fe3; border-radius:0 8px 8px 0; padding:12px 15px;">
            <p style="font-size:0.58rem; font-weight:700; color:#0369a1; margin:0 0 6px;">🔵 Vélib · IRVE · Autopartage — DirMob seul mainteneur</p>
            <p style="font-size:0.5rem; color:#1e3a5f; margin:0; line-height:1.65;">
                Ces trois couches n'ont qu'un seul responsable : <strong>vous</strong>.
                Elles alimentent l'Open Data Seine-Ouest, les sites des 7 villes, les applications mobiles, et les tableaux de bord des élus.
                Une donnée non mise à jour, c'est toute la chaîne qui part sur une base fausse.
            </p>
        </div>

        <div style="background:#1e293b; border-radius:8px; padding:11px 15px;">
            <p style="font-size:0.58rem; color:white; font-weight:700; margin:0 0 3px;">💡 Mettre à jour, c'est servir une chaîne.</p>
            <p style="font-size:0.46rem; color:rgba(255,255,255,0.62); margin:0; line-height:1.6;">Votre saisie se retrouve dans les bilans des élus et sur les apps de milliers d'usagers. D'autres reposent sur vous.</p>
        </div>

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

      <section dangerouslySetInnerHTML={{ __html: definition }} />

      <section dangerouslySetInnerHTML={{ __html: vocabulaire }} />

      {/* Modèle relationnel */}
      <section>
        <section dangerouslySetInnerHTML={{ __html: relationnel }} />
        <section dangerouslySetInnerHTML={{ __html: relationSchema }} />
        <section dangerouslySetInnerHTML={{ __html: relationHub }} />
        <section dangerouslySetInnerHTML={{ __html: dataLineage }} />
        <section dangerouslySetInnerHTML={{ __html: donneesEnJeu }} />
      </section>

      {/* OLTP / OLAP — intro + Yego + rétro-ingénierie */}
      <section>
        <section dangerouslySetInnerHTML={{ __html: olapIntro }} />
        <section dangerouslySetInnerHTML={{ __html: olapVsOltp }} />
        <section dangerouslySetInnerHTML={{ __html: olapRetro }} />
      </section>

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
    </>
  );
}
