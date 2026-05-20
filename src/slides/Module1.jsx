const intro = `
<div style="text-align:left; max-width:680px; margin:0 auto; color:white;">
    <p class="section-intro-label" style="color:white;">Module 1 · 15 min</p>
    <p class="section-intro-title">Tableau de suivi<br>vs<br>Base de données</p>
    <p class="section-intro-sub">La différence fondamentale — et pourquoi elle change tout.</p>
</div>
`;

const definitions = `
<h2 style="margin-top:0;">Deux outils, deux buts</h2>

<div class="row" style="margin-top:12px; align-items:stretch; gap:0;">

    <div style="flex:1; background:#f0f8ff; border-radius:10px 0 0 10px; padding:20px 22px; border:2px solid #009fe3; border-right:none;">
        <p style="font-size:0.54rem; text-transform:uppercase; letter-spacing:2px; color:#009fe3; font-weight:700; margin:0 0 10px;">Base de données (OLTP)</p>
        <p style="font-size:0.58rem; font-weight:700; color:#1e40af; margin:0 0 10px; line-height:1.5;">But : capturer et stocker</p>
        <p style="font-size:0.62rem; color:#333; line-height:1.7; margin:0 0 14px;">
            Les données font référence à toutes les informations capturées et stockées sur un seul individu, lieu, élément ou objet — appelé <strong>entité</strong> — ainsi que les <strong>attributs</strong> de cette entité.
            Elles sont organisées dans une base de données pour être facilement <strong>accessibles, gérées et mises à jour</strong>.
        </p>
        <div style="background:white; border-radius:6px; padding:8px 12px; border-left:3px solid #009fe3;">
            <p style="font-size:0.56rem; color:#009fe3; margin:0; font-weight:600;">1 ligne = 1 fait · enregistré au fil de l'eau</p>
        </div>
    </div>

    <div style="background:#009fe3; padding:16px 14px; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:6px; min-width:96px; flex-shrink:0;">
        <p style="font-size:0.46rem; font-weight:700; color:white; text-transform:uppercase; letter-spacing:1.5px; margin:0; text-align:center;">Transformation</p>
        <div style="display:flex; flex-direction:column; gap:4px; align-items:center;">
            <span style="font-size:0.5rem; background:rgba(255,255,255,0.2); color:white; padding:2px 8px; border-radius:10px;">TCD</span>
            <span style="font-size:0.5rem; background:rgba(255,255,255,0.2); color:white; padding:2px 8px; border-radius:10px;">Agrégation</span>
            <span style="font-size:0.5rem; background:rgba(255,255,255,0.2); color:white; padding:2px 8px; border-radius:10px;">Filtre</span>
        </div>
        <div style="font-size:1.3rem; color:rgba(255,255,255,0.8); margin-top:4px;">→</div>
    </div>

    <div style="flex:1; background:#f0f9e8; border-radius:0 10px 10px 0; padding:20px 22px; border:2px solid #95c11f; border-left:none;">
        <p style="font-size:0.54rem; text-transform:uppercase; letter-spacing:2px; color:#95c11f; font-weight:700; margin:0 0 10px;">Tableau de suivi (OLAP)</p>
        <p style="font-size:0.58rem; font-weight:700; color:#2e7d32; margin:0 0 10px; line-height:1.5;">But : suivre et analyser</p>
        <p style="font-size:0.62rem; color:#333; line-height:1.7; margin:0 0 14px;">
            À un moment donné, on a besoin de <strong>lire</strong> les données accumulées, de les <strong>agréger</strong> et de les <strong>filtrer</strong> pour en extraire des chiffres clés — et prendre des décisions.
        </p>
        <div style="background:white; border-radius:6px; padding:8px 12px; border-left:3px solid #95c11f;">
            <p style="font-size:0.56rem; color:#2e7d32; margin:0; font-weight:600;">1 vue = 1 question posée à la base</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#fff8e1; border-radius:8px; padding:10px 18px; border-left:4px solid #f59e0b; margin-top:14px;">
    <p style="font-size:0.72rem; color:#444; margin:0; line-height:1.6;">
        Le tableau de suivi n'<em>est pas</em> la base de données — c'est ce qu'on <strong>construit depuis elle</strong>, au moment où on en a besoin.
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

export function Module1() {
  return (
    <>
      <section
        data-background-color="#009fe3"
        dangerouslySetInnerHTML={{ __html: intro }}
      />
      <section dangerouslySetInnerHTML={{ __html: definitions }} />
      <section dangerouslySetInnerHTML={{ __html: exemples1 }} />
      <section dangerouslySetInnerHTML={{ __html: exemples2 }} />
    </>
  );
}
