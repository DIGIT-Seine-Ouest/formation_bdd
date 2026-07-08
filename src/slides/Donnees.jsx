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


const jointures = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Assembler deux tables</p>
<h2 style="margin-top:0;">INNER · LEFT · FULL — les types de jointures</h2>

<div style="display:flex; gap:10px; align-items:flex-start; margin-bottom:10px; max-width:940px; margin-left:auto; margin-right:auto;">
    <div style="flex:1;">
        <p style="font-size:0.46rem; font-weight:700; color:#a16207; font-family:monospace; margin:0 0 3px;">lignes_bus <span style="color:#94a3b8; font-weight:400;">(gauche)</span></p>
        <table class="mockup-table" style="font-size:0.44em;">
            <tr><th style="background:#a16207; color:white;">id</th><th>numero</th></tr>
            <tr><td style="color:#a16207; font-weight:700;">L1</td><td>389</td></tr>
            <tr><td style="color:#a16207; font-weight:700;">L2</td><td>160</td></tr>
            <tr><td style="color:#a16207; font-weight:700;">L3</td><td>91</td></tr>
        </table>
    </div>
    <div style="padding-top:22px; font-size:0.72rem; color:#94a3b8; flex-shrink:0; font-family:monospace;">ON lignes_bus.id = reclamations.id_ligne</div>
    <div style="flex:1;">
        <p style="font-size:0.46rem; font-weight:700; color:#1e40af; font-family:monospace; margin:0 0 3px;">reclamations <span style="color:#94a3b8; font-weight:400;">(droite)</span></p>
        <table class="mockup-table" style="font-size:0.44em;">
            <tr><th style="background:#1e40af; color:white;">id</th><th style="color:#a16207;">id_ligne</th><th>motif</th></tr>
            <tr><td style="color:#1e40af; font-weight:700;">R001</td><td style="color:#a16207; font-weight:700;">L1</td><td>retard</td></tr>
            <tr><td style="color:#1e40af; font-weight:700;">R002</td><td style="color:#a16207; font-weight:700;">L1</td><td>proprete</td></tr>
            <tr><td style="color:#1e40af; font-weight:700;">R003</td><td style="color:#dc2626; font-weight:700;">L9 ⚠</td><td>retard</td></tr>
        </table>
    </div>
</div>

<div style="display:flex; gap:10px; align-items:stretch; max-width:940px; margin:0 auto;">

    <div class="fragment" style="flex:1; border-radius:9px; overflow:hidden; border:2px solid #2563eb;">
        <div style="background:#2563eb; padding:6px 12px;"><p style="font-size:0.56rem; font-weight:700; color:white; margin:0; font-family:monospace;">INNER JOIN</p></div>
        <div style="background:#eff6ff; padding:9px 11px;">
            <p style="font-size:0.52rem; color:#1e3a5f; margin:0 0 6px; line-height:1.5;">L'<strong>intersection</strong> : seules les lignes qui matchent des deux côtés.</p>
            <table class="mockup-table" style="font-size:0.4em;">
                <tr><th>numero</th><th>motif</th></tr>
                <tr><td>389</td><td>retard</td></tr>
                <tr><td>389</td><td>proprete</td></tr>
            </table>
            <p style="font-size:0.46rem; color:#64748b; margin:6px 0 0; line-height:1.5;">L2, L3 (sans réclamation) et R003 (ligne inconnue) <strong>disparaissent</strong>.</p>
        </div>
    </div>

    <div class="fragment" style="flex:1; border-radius:9px; overflow:hidden; border:2px solid #15803d;">
        <div style="background:#15803d; padding:6px 12px;"><p style="font-size:0.56rem; font-weight:700; color:white; margin:0; font-family:monospace;">LEFT JOIN</p></div>
        <div style="background:#f0fdf4; padding:9px 11px;">
            <p style="font-size:0.52rem; color:#14532d; margin:0 0 6px; line-height:1.5;"><strong>Tout le côté gauche</strong>, complété si correspondance — sinon <code>NULL</code>.</p>
            <table class="mockup-table" style="font-size:0.4em;">
                <tr><th>numero</th><th>motif</th></tr>
                <tr><td>389</td><td>retard</td></tr>
                <tr><td>389</td><td>proprete</td></tr>
                <tr><td>160</td><td style="color:#94a3b8; font-style:italic;">NULL</td></tr>
                <tr><td>91</td><td style="color:#94a3b8; font-style:italic;">NULL</td></tr>
            </table>
            <p style="font-size:0.46rem; color:#64748b; margin:6px 0 0; line-height:1.5;">Le référentiel reste complet. <strong>RIGHT JOIN</strong> = le miroir exact.</p>
        </div>
    </div>

    <div class="fragment" style="flex:1; border-radius:9px; overflow:hidden; border:2px solid #9333ea;">
        <div style="background:#9333ea; padding:6px 12px;"><p style="font-size:0.56rem; font-weight:700; color:white; margin:0; font-family:monospace;">FULL OUTER JOIN</p></div>
        <div style="background:#faf5ff; padding:9px 11px;">
            <p style="font-size:0.52rem; color:#4c1d95; margin:0 0 6px; line-height:1.5;"><strong>Tout, des deux côtés</strong> — matches et orphelins.</p>
            <table class="mockup-table" style="font-size:0.4em;">
                <tr><th>numero</th><th>motif</th></tr>
                <tr><td>389</td><td>retard · proprete</td></tr>
                <tr><td>160 · 91</td><td style="color:#94a3b8; font-style:italic;">NULL</td></tr>
                <tr><td style="color:#dc2626; font-style:italic;">NULL</td><td style="color:#dc2626; font-weight:700;">retard (L9 ⚠)</td></tr>
            </table>
            <p style="font-size:0.46rem; color:#64748b; margin:6px 0 0; line-height:1.5;">Rien ne disparaît : <strong>les trous deviennent visibles</strong> des deux côtés.</p>
        </div>
    </div>

</div>
`;

const comparaison = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Le vrai super-pouvoir</p>
<h2 style="margin-top:0;">La jointure, outil n°1 de comparaison de données</h2>
<p style="font-size:0.7rem; color:#888; margin-top:-14px; margin-bottom:14px;">Comparer deux jeux de données = les joindre, puis <strong>regarder où sont les NULL</strong>.</p>

<div style="display:flex; flex-direction:column; gap:9px; max-width:920px; margin:0 auto;">

    <div class="fragment" style="display:flex; gap:0; border-radius:9px; overflow:hidden; border:1px solid #e2e8f0;">
        <div style="flex:1; background:#f0fdf4; padding:10px 15px;">
            <p style="font-size:0.6rem; font-weight:700; color:#15803d; margin:0 0 3px;">① L'anti-jointure — « qui manque en face ? »</p>
            <p style="font-size:0.54rem; color:#333; margin:0; line-height:1.6;">Lignes de bus sans aucune réclamation · stations du référentiel absentes de l'export terrain.</p>
        </div>
        <div style="flex:1; background:#0f172a; padding:10px 15px; display:flex; align-items:center;">
            <p style="font-size:0.52rem; font-family:monospace; color:#e2e8f0; margin:0; line-height:1.9;"><span style="color:#f472b6;">FROM</span> lignes_bus <span style="color:#f472b6;">LEFT JOIN</span> reclamations <span style="color:#f472b6;">ON</span> …<br><span style="color:#f472b6;">WHERE</span> reclamations.id <span style="color:#f472b6;">IS NULL</span> <span style="color:#64748b;">-- les sans-match</span></p>
        </div>
    </div>

    <div class="fragment" style="display:flex; gap:0; border-radius:9px; overflow:hidden; border:1px solid #e2e8f0;">
        <div style="flex:1; background:#fff5f5; padding:10px 15px;">
            <p style="font-size:0.6rem; font-weight:700; color:#dc2626; margin:0 0 3px;">② Les orphelins — « qui pointe vers du vide ? »</p>
            <p style="font-size:0.54rem; color:#333; margin:0; line-height:1.6;">R003 → L9 : une réclamation sur une ligne <strong>qui n'existe pas</strong>. Erreur de saisie détectée mécaniquement.</p>
        </div>
        <div style="flex:1; background:#0f172a; padding:10px 15px; display:flex; align-items:center;">
            <p style="font-size:0.52rem; font-family:monospace; color:#e2e8f0; margin:0; line-height:1.9;"><span style="color:#f472b6;">FROM</span> reclamations <span style="color:#f472b6;">LEFT JOIN</span> lignes_bus <span style="color:#f472b6;">ON</span> …<br><span style="color:#f472b6;">WHERE</span> lignes_bus.id <span style="color:#f472b6;">IS NULL</span> <span style="color:#64748b;">-- FK cassées</span></p>
        </div>
    </div>

    <div class="fragment" style="display:flex; gap:0; border-radius:9px; overflow:hidden; border:1px solid #e2e8f0;">
        <div style="flex:1; background:#faf5ff; padding:10px 15px;">
            <p style="font-size:0.6rem; font-weight:700; color:#7c3aed; margin:0 0 3px;">③ Le rapprochement complet — « quoi de neuf entre deux versions ? »</p>
            <p style="font-size:0.54rem; color:#333; margin:0; line-height:1.6;">Millésime SIG 2025 vs 2026 · export prestataire vs référentiel interne : présents des deux côtés / seulement à gauche / seulement à droite.</p>
        </div>
        <div style="flex:1; background:#0f172a; padding:10px 15px; display:flex; align-items:center;">
            <p style="font-size:0.52rem; font-family:monospace; color:#e2e8f0; margin:0; line-height:1.9;"><span style="color:#f472b6;">FULL OUTER JOIN</span> <span style="color:#64748b;">-- puis trier :</span><br>match · gauche seule (supprimé) · droite seule (nouveau)</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#fefce8; border-radius:8px; padding:11px 20px; border-left:4px solid #ca8a04; margin:13px auto 0; max-width:920px;">
    <p style="font-size:0.72rem; color:#333; margin:0; line-height:1.7;">
        <strong style="color:#92400e;">C'est la moitié du travail data au quotidien :</strong> contrôler la qualité, rapprocher deux sources, auditer un référentiel — tout passe par une jointure et la lecture de ses NULL.
    </p>
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
        <section dangerouslySetInnerHTML={{ __html: relationSchema }} />
        <section dangerouslySetInnerHTML={{ __html: jointures }} />
        <section dangerouslySetInnerHTML={{ __html: comparaison }} />
      </section>
    </>
  );
}
