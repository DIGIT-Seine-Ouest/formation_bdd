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
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:#e50914; margin:0 0 4px; font-weight:700;">Le cas Netflix</p>
<h2 style="margin-top:0; margin-bottom:4px;">Comment Netflix sait ce que vous voulez regarder ce soir ?</h2>
<p style="font-size:0.74rem; color:#888; margin:0 0 14px;">220 millions d'abonnés. Des recommandations quasi-parfaites. Pas de magie — juste 3 tables et une jointure.</p>

<div style="display:flex; align-items:center; gap:0; margin-bottom:12px;">

    <div style="flex:1;">
        <p style="font-size:0.52rem; background:#e50914; color:white; display:inline-block; padding:3px 10px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 5px;">films</p>
        <table class="mockup-table" style="font-size:0.55em;">
            <tr>
                <th style="background:#e50914; color:white;">id</th>
                <th>titre</th><th>genre</th>
            </tr>
            <tr><td style="background:#fde8e8; color:#e50914; font-weight:700;">F01</td><td>Inception</td><td>sci-fi</td></tr>
            <tr><td style="background:#fde8e8; color:#e50914; font-weight:700;">F02</td><td>Interstellar</td><td>sci-fi</td></tr>
            <tr><td style="background:#fde8e8; color:#e50914; font-weight:700;">F03</td><td>Amélie</td><td>comédie</td></tr>
        </table>
    </div>

    <div style="flex:1; margin:0 8px;">
        <p style="font-size:0.52rem; background:#831010; color:white; display:inline-block; padding:3px 10px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 5px;">historique_vues</p>
        <table class="mockup-table" style="font-size:0.55em;">
            <tr>
                <th style="background:#fef3c7; color:#a16207;">user_id</th>
                <th style="background:#fef3c7; color:#a16207;">film_id</th>
                <th>note</th>
            </tr>
            <tr><td style="color:#a16207; font-weight:700;">U1</td><td style="color:#a16207; font-weight:700;">F01</td><td>⭐⭐⭐⭐⭐</td></tr>
            <tr><td style="color:#a16207; font-weight:700;">U1</td><td style="color:#a16207; font-weight:700;">F02</td><td>⭐⭐⭐⭐⭐</td></tr>
            <tr><td style="color:#a16207; font-weight:700;">U2</td><td style="color:#a16207; font-weight:700;">F03</td><td>⭐⭐⭐</td></tr>
        </table>
    </div>

    <div style="flex:1;">
        <p style="font-size:0.52rem; background:#555; color:white; display:inline-block; padding:3px 10px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 5px;">utilisateurs</p>
        <table class="mockup-table" style="font-size:0.55em;">
            <tr>
                <th style="background:#555; color:white;">id</th>
                <th>nom</th><th>pays</th>
            </tr>
            <tr><td style="font-weight:700; color:#555;">U1</td><td>Martin</td><td>FR</td></tr>
            <tr><td style="font-weight:700; color:#555;">U2</td><td>Dupont</td><td>FR</td></tr>
            <tr><td style="font-weight:700; color:#555;">U3</td><td>Nguyen</td><td>FR</td></tr>
        </table>
    </div>

</div>

<div class="fragment" style="background:#111; border-radius:8px; padding:11px 18px; border-left:4px solid #e50914; margin-bottom:12px;">
    <p style="font-size:0.7rem; color:#eee; margin:0; line-height:1.7;">
        <strong style="color:#e50914;">La jointure Netflix :</strong>
        Martin a adoré <em>Inception</em> (sci-fi) et <em>Interstellar</em> (sci-fi).
        → JOIN sur <code style="color:#fca5a5;">film_id</code> → genre = sci-fi dominant.
        → <strong style="color:#4ade80;">"Parce que vous avez regardé Inception…"</strong> c'est juste un COUNTIF sur une table bien structurée.
    </p>
</div>

<div class="fragment" style="display:flex; gap:10px; align-items:stretch;">

    <div style="flex:1; background:#f0f7ff; border-radius:8px; padding:12px 14px; border-left:3px solid #1877f2;">
        <p style="font-size:0.58rem; font-weight:700; color:#1877f2; margin:0 0 5px; text-transform:uppercase; letter-spacing:1px;">Instagram — même logique</p>
        <p style="font-size:0.62rem; color:#444; margin:0; line-height:1.6;">
            <code style="background:#e8f0fe; padding:1px 5px; border-radius:3px; font-size:0.9em;">posts</code> +
            <code style="background:#e8f0fe; padding:1px 5px; border-radius:3px; font-size:0.9em;">commentaires</code> +
            <code style="background:#e8f0fe; padding:1px 5px; border-radius:3px; font-size:0.9em;">utilisateurs</code><br>
            → JOIN → votre fil d'actualité.<br>
            3 tables séparées. Résultat : l'expérience complète.
        </p>
    </div>

    <div style="flex:1.3; background:#e8f5e9; border-radius:8px; padding:12px 14px; border-left:3px solid var(--green-dirmob);">
        <p style="font-size:0.58rem; font-weight:700; color:#2e7d32; margin:0 0 5px; text-transform:uppercase; letter-spacing:1px;">Et nous, à la DIRMOB ?</p>
        <p style="font-size:0.62rem; color:#444; margin:0; line-height:1.6;">
            <code style="background:#dcfce7; padding:1px 5px; border-radius:3px; font-size:0.9em;">réclamations</code> +
            <code style="background:#dcfce7; padding:1px 5px; border-radius:3px; font-size:0.9em;">lignes_bus</code> +
            <code style="background:#dcfce7; padding:1px 5px; border-radius:3px; font-size:0.9em;">prestataires</code><br>
            → JOIN → bilan mensuel automatique.<br>
            <strong>Exactement le même principe — à notre échelle.</strong>
        </p>
    </div>

</div>
`;

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
      <section dangerouslySetInnerHTML={{ __html: autourDeNous }} />
      <section dangerouslySetInnerHTML={{ __html: definition }} />
      <section dangerouslySetInnerHTML={{ __html: vocabulaire }} />
    </>
  );
}
