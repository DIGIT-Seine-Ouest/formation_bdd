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

// ─── Le cas Netflix : 5 slides verticales ────────────────────────────────────

const netflixV1 = `
<div style="text-align:center; max-width:820px; margin:0 auto;">
    <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:5px; color:#e50914; margin:0 0 30px; font-weight:700;">Le cas Netflix</p>
    <h2 style="font-size:2rem; color:white; line-height:1.4; margin:0 0 20px; font-weight:700;">
        Ce soir, vous ouvrez Netflix.<br>
        <span style="color:#e50914;">Exactement</span> ce que vous vouliez voir apparaît.
    </h2>
    <div style="width:48px; height:2px; background:#e50914; margin:0 auto 28px;"></div>
    <p style="font-size:0.9rem; color:rgba(255,255,255,0.5); margin:0 0 6px; line-height:1.9;">
        220 millions d'abonnés dans 190 pays.<br>
        Des langues, des cultures, des goûts radicalement différents.<br>
        Des recommandations quasi-parfaites pour chacun.
    </p>
    <div class="fragment" style="margin-top:32px;">
        <p style="font-size:0.72rem; color:#e50914; font-weight:700; text-transform:uppercase; letter-spacing:3px; margin:0;">
            Pas de magie — alors comment ?&nbsp;&nbsp;↓
        </p>
    </div>
</div>
`;

const netflixV2 = `
<p style="font-size:0.62rem; text-transform:uppercase; letter-spacing:3px; color:rgba(255,255,255,0.35); margin:0 0 14px; font-weight:600;">La réponse impossible</p>
<h2 style="color:white; margin:0 0 24px;">Imaginez que Netflix emploie des conseillers vidéo.</h2>

<div style="display:flex; align-items:center; justify-content:center; gap:18px; margin-bottom:28px;">
    <div style="text-align:center; background:rgba(255,255,255,0.05); border-radius:12px; padding:18px 22px; border:1px solid rgba(255,255,255,0.1);">
        <p style="font-size:2.2rem; margin:0; line-height:1;">🧑‍💼</p>
        <p style="font-size:0.55rem; color:rgba(255,255,255,0.45); margin:10px 0 2px; text-transform:uppercase; letter-spacing:1px;">1 conseiller</p>
        <p style="font-size:0.65rem; color:white; font-weight:700; margin:0;">pour 10 abonnés</p>
    </div>
    <div style="font-size:2rem; color:rgba(255,255,255,0.25); font-weight:300;">×</div>
    <div style="text-align:center; background:rgba(255,255,255,0.05); border-radius:12px; padding:18px 22px; border:1px solid rgba(255,255,255,0.1);">
        <p style="font-size:2.2rem; margin:0; line-height:1;">👥</p>
        <p style="font-size:0.55rem; color:rgba(255,255,255,0.45); margin:10px 0 2px; text-transform:uppercase; letter-spacing:1px;">220 millions</p>
        <p style="font-size:0.65rem; color:white; font-weight:700; margin:0;">d'abonnés</p>
    </div>
    <div style="font-size:2rem; color:rgba(255,255,255,0.25); font-weight:300;">=</div>
    <div style="text-align:center; background:rgba(229,9,20,0.15); border-radius:12px; padding:18px 22px; border:1px solid #e50914;">
        <p style="font-size:2.2rem; margin:0; line-height:1;">😱</p>
        <p style="font-size:0.55rem; color:#fca5a5; margin:10px 0 2px; text-transform:uppercase; letter-spacing:1px;">22 millions</p>
        <p style="font-size:0.65rem; color:white; font-weight:700; margin:0;">de conseillers</p>
    </div>
</div>

<div class="fragment" style="text-align:center; max-width:680px; margin:0 auto;">
    <p style="font-size:0.85rem; color:rgba(255,255,255,0.65); margin:0 0 12px; line-height:1.7;">
        Évidemment impossible. Netflix n'a pas 22 millions d'employés.
    </p>
    <p style="font-size:0.9rem; color:white; font-weight:700; margin:0; line-height:1.5;">
        La solution : <span style="color:#e50914;">des données bien organisées</span>,<br>traitées automatiquement par une machine.
    </p>
</div>
`;

const netflixV3 = `
<p style="font-size:0.62rem; text-transform:uppercase; letter-spacing:3px; color:#e50914; margin:0 0 5px; font-weight:700;">L'organisation des données</p>
<h2 style="margin:0 0 4px;">Netflix a découpé sa réalité en 3 tables.</h2>
<p style="font-size:0.7rem; color:#888; margin:0 0 16px;">Chaque table représente une entité du monde réel. Rien de plus.</p>

<div style="display:flex; gap:12px; align-items:flex-start; margin-bottom:14px;">

    <div style="flex:1; background:#fff5f5; border-radius:10px; padding:13px; border-top:3px solid #e50914;">
        <p style="font-size:0.56rem; font-weight:700; color:#e50914; margin:0 0 2px; text-transform:uppercase; letter-spacing:1px;">🎬 Les films</p>
        <p style="font-size:0.52rem; color:#999; margin:0 0 9px; font-style:italic;">Ce qui existe dans le catalogue</p>
        <table class="mockup-table" style="font-size:0.52em;">
            <tr><th style="background:#e50914; color:white;">id</th><th>titre</th><th>genre</th></tr>
            <tr><td style="background:#fde8e8; color:#e50914; font-weight:700;">F01</td><td>Inception</td><td>sci-fi</td></tr>
            <tr><td style="background:#fde8e8; color:#e50914; font-weight:700;">F02</td><td>Interstellar</td><td>sci-fi</td></tr>
            <tr><td style="background:#fde8e8; color:#e50914; font-weight:700;">F03</td><td>Amélie</td><td>comédie</td></tr>
        </table>
    </div>

    <div style="flex:1.15; background:#fffbeb; border-radius:10px; padding:13px; border-top:3px solid #d97706;">
        <p style="font-size:0.56rem; font-weight:700; color:#d97706; margin:0 0 2px; text-transform:uppercase; letter-spacing:1px;">📺 L'historique des vues</p>
        <p style="font-size:0.52rem; color:#999; margin:0 0 9px; font-style:italic;">Ce que chaque abonné a regardé</p>
        <table class="mockup-table" style="font-size:0.52em;">
            <tr>
                <th style="background:#fef3c7; color:#a16207;">user_id →</th>
                <th style="background:#fef3c7; color:#a16207;">film_id →</th>
                <th>note</th>
            </tr>
            <tr><td style="color:#a16207; font-weight:700;">U1</td><td style="color:#a16207; font-weight:700;">F01</td><td>⭐⭐⭐⭐⭐</td></tr>
            <tr><td style="color:#a16207; font-weight:700;">U1</td><td style="color:#a16207; font-weight:700;">F02</td><td>⭐⭐⭐⭐⭐</td></tr>
            <tr><td style="color:#a16207; font-weight:700;">U2</td><td style="color:#a16207; font-weight:700;">F03</td><td>⭐⭐⭐</td></tr>
        </table>
        <p style="font-size:0.48rem; color:#d97706; margin:6px 0 0;">→ fait le lien entre abonnés et films</p>
    </div>

    <div style="flex:1; background:#f5f5f5; border-radius:10px; padding:13px; border-top:3px solid #555;">
        <p style="font-size:0.56rem; font-weight:700; color:#555; margin:0 0 2px; text-transform:uppercase; letter-spacing:1px;">👤 Les abonnés</p>
        <p style="font-size:0.52rem; color:#999; margin:0 0 9px; font-style:italic;">Qui sont-ils ?</p>
        <table class="mockup-table" style="font-size:0.52em;">
            <tr><th style="background:#555; color:white;">id</th><th>nom</th><th>pays</th></tr>
            <tr><td style="font-weight:700; color:#555;">U1</td><td>Martin</td><td>🇫🇷</td></tr>
            <tr><td style="font-weight:700; color:#555;">U2</td><td>Dupont</td><td>🇫🇷</td></tr>
            <tr><td style="font-weight:700; color:#555;">U3</td><td>Nguyen</td><td>🇫🇷</td></tr>
        </table>
    </div>

</div>

<div class="fragment" style="background:#fef2f2; border-radius:8px; padding:10px 16px; border-left:3px solid #e50914;">
    <p style="font-size:0.68rem; color:#555; margin:0; line-height:1.65;">
        Chaque table = <strong>une réalité du monde</strong>. Pas de répétition — les tables se <strong>complètent</strong>.
        La table historique fait le pont entre les abonnés et les films grâce aux flèches (→).
    </p>
</div>
`;

const netflixV4 = `
<p style="font-size:0.62rem; text-transform:uppercase; letter-spacing:3px; color:rgba(255,255,255,0.35); margin:0 0 10px; font-weight:600;">La mécanique</p>
<h2 style="color:white; margin:0 0 18px;">Le JOIN : relier les tables pour répondre à une question.</h2>

<div style="display:flex; flex-direction:column; gap:9px; max-width:760px; margin:0 auto;">

    <div style="display:flex; align-items:center; gap:14px; background:rgba(255,255,255,0.04); border-radius:8px; padding:11px 16px; border-left:3px solid rgba(255,255,255,0.15);">
        <span style="font-size:1.1rem; flex-shrink:0;">❓</span>
        <p style="font-size:0.72rem; color:rgba(255,255,255,0.75); margin:0; line-height:1.5;">
            <strong style="color:white;">Question :</strong> Martin a regardé quoi, et dans quel genre de films ?
        </p>
    </div>

    <div class="fragment" style="display:flex; align-items:center; gap:14px; background:rgba(217,119,6,0.12); border-radius:8px; padding:11px 16px; border-left:3px solid #d97706;">
        <span style="font-size:1.1rem; flex-shrink:0;">1️⃣</span>
        <p style="font-size:0.72rem; color:rgba(255,255,255,0.8); margin:0; line-height:1.5;">
            Dans <code style="color:#fde68a; background:rgba(217,119,6,0.25); padding:1px 6px; border-radius:3px;">historique_vues</code> :
            Martin (U1) a regardé <strong style="color:#fde68a;">F01</strong> et <strong style="color:#fde68a;">F02</strong> — 5 étoiles les deux fois.
        </p>
    </div>

    <div class="fragment" style="display:flex; align-items:center; gap:14px; background:rgba(229,9,20,0.12); border-radius:8px; padding:11px 16px; border-left:3px solid #e50914;">
        <span style="font-size:1.1rem; flex-shrink:0;">2️⃣</span>
        <p style="font-size:0.72rem; color:rgba(255,255,255,0.8); margin:0; line-height:1.5;">
            JOIN sur <code style="color:#fca5a5; background:rgba(229,9,20,0.2); padding:1px 6px; border-radius:3px;">film_id</code>
            → dans <code style="color:#fca5a5; background:rgba(229,9,20,0.2); padding:1px 6px; border-radius:3px;">films</code> :
            F01 = Inception <em>(sci-fi)</em>, F02 = Interstellar <em>(sci-fi)</em>.
        </p>
    </div>

    <div class="fragment" style="display:flex; align-items:center; gap:14px; background:rgba(74,222,128,0.08); border-radius:8px; padding:11px 16px; border-left:3px solid #4ade80;">
        <span style="font-size:1.1rem; flex-shrink:0;">3️⃣</span>
        <p style="font-size:0.72rem; color:rgba(255,255,255,0.8); margin:0; line-height:1.5;">
            Genre dominant = <strong style="color:#4ade80;">sci-fi</strong>.
            Netflix cherche les films sci-fi que Martin n'a pas encore vus. Et il les affiche en premier.
        </p>
    </div>

    <div class="fragment" style="background:rgba(229,9,20,0.18); border-radius:8px; padding:14px 18px; border:1px solid #e50914; text-align:center; margin-top:2px;">
        <p style="font-size:0.82rem; color:white; margin:0 0 6px; line-height:1.5;">
            <span style="background:#e50914; padding:2px 10px; border-radius:4px; font-weight:700; font-size:0.78rem;">Netflix</span>
            &nbsp;<em style="color:#fca5a5;">"Parce que vous avez regardé Inception…"</em>
        </p>
        <p style="font-size:0.6rem; color:rgba(255,255,255,0.45); margin:0;">
            Ce n'est pas de l'IA. C'est un COUNTIF sur une table bien structurée.
        </p>
    </div>

</div>
`;

const netflixV5 = `
<p style="font-size:0.62rem; text-transform:uppercase; letter-spacing:3px; color:var(--green-dirmob); margin:0 0 5px; font-weight:700;">Et nous, à la DIRMOB ?</p>
<h2 style="margin:0 0 4px;">Exactement le même principe.</h2>
<p style="font-size:0.7rem; color:#888; margin:0 0 16px;">Des tables. Des liens. Des réponses automatiques à des questions métier.</p>

<div style="display:flex; gap:12px; align-items:flex-start; margin-bottom:14px;">

    <div style="flex:1; background:#eff6ff; border-radius:10px; padding:13px; border-top:3px solid #1e40af;">
        <p style="font-size:0.56rem; font-weight:700; color:#1e40af; margin:0 0 2px; text-transform:uppercase; letter-spacing:1px;">🚍 Les réclamations</p>
        <p style="font-size:0.52rem; color:#999; margin:0 0 9px; font-style:italic;">Un fait = une ligne</p>
        <table class="mockup-table" style="font-size:0.52em;">
            <tr><th style="background:#1e40af; color:white;">id</th><th style="background:#fef3c7; color:#a16207;">id_ligne →</th><th>motif</th></tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R001</td><td style="color:#a16207; font-weight:700;">L1</td><td>retard</td></tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R002</td><td style="color:#a16207; font-weight:700;">L2</td><td>avance</td></tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R003</td><td style="color:#a16207; font-weight:700;">L1</td><td>retard</td></tr>
        </table>
    </div>

    <div style="flex:1; background:#f0fdf4; border-radius:10px; padding:13px; border-top:3px solid #15803d;">
        <p style="font-size:0.56rem; font-weight:700; color:#15803d; margin:0 0 2px; text-transform:uppercase; letter-spacing:1px;">🗺️ Les lignes de bus</p>
        <p style="font-size:0.52rem; color:#999; margin:0 0 9px; font-style:italic;">Une ligne = une entité</p>
        <table class="mockup-table" style="font-size:0.52em;">
            <tr><th style="background:#15803d; color:white;">id</th><th>numéro</th><th style="background:#fef3c7; color:#a16207;">id_presta →</th></tr>
            <tr><td style="background:#dcfce7; color:#15803d; font-weight:700;">L1</td><td>389</td><td style="color:#a16207; font-weight:700;">P1</td></tr>
            <tr><td style="background:#dcfce7; color:#15803d; font-weight:700;">L2</td><td>160</td><td style="color:#a16207; font-weight:700;">P2</td></tr>
        </table>
    </div>

    <div style="flex:1; background:#f5f5f5; border-radius:10px; padding:13px; border-top:3px solid #555;">
        <p style="font-size:0.56rem; font-weight:700; color:#555; margin:0 0 2px; text-transform:uppercase; letter-spacing:1px;">🏢 Les prestataires</p>
        <p style="font-size:0.52rem; color:#999; margin:0 0 9px; font-style:italic;">Qui opère quoi ?</p>
        <table class="mockup-table" style="font-size:0.52em;">
            <tr><th style="background:#555; color:white;">id</th><th>nom</th><th>contrat</th></tr>
            <tr><td style="font-weight:700; color:#555;">P1</td><td>Keolis</td><td>2023–27</td></tr>
            <tr><td style="font-weight:700; color:#555;">P2</td><td>RATP</td><td>2021–25</td></tr>
        </table>
    </div>

</div>

<div class="fragment" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7); border-radius:10px; padding:13px 18px; border-left:4px solid var(--green-dirmob);">
    <p style="font-size:0.7rem; color:#333; margin:0; line-height:1.7;">
        <strong>Question métier :</strong> "Combien de réclamations pour retard sur les lignes Keolis ce mois-ci ?"<br>
        <span style="color:#15803d; font-weight:700;">→ 3 tables. 2 jointures. Une réponse en 30 secondes.</span><br>
        <span style="font-size:0.6rem; color:#888;">Là où aujourd'hui ça prend une heure de copier-coller entre onglets.</span>
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

      {/* Le cas Netflix — 5 slides verticales */}
      <section>
        <section
          data-background-color="#0a0a0a"
          dangerouslySetInnerHTML={{ __html: netflixV1 }}
        />
        <section
          data-background-color="#111111"
          dangerouslySetInnerHTML={{ __html: netflixV2 }}
        />
        <section dangerouslySetInnerHTML={{ __html: netflixV3 }} />
        <section
          data-background-color="#0a0a0a"
          dangerouslySetInnerHTML={{ __html: netflixV4 }}
        />
        <section dangerouslySetInnerHTML={{ __html: netflixV5 }} />
      </section>

      <section dangerouslySetInnerHTML={{ __html: definition }} />
      <section dangerouslySetInnerHTML={{ __html: vocabulaire }} />
    </>
  );
}
