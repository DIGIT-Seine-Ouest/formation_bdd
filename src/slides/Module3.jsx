const intro = `
<div style="text-align:left; max-width:680px; margin:0 auto; color:white;">
    <p class="section-intro-label" style="color:white;">Module 3 · 5 min</p>
    <p class="section-intro-title">3 symptômes,<br>1 seul problème<br>de fond</p>
    <p class="section-intro-sub">Ces trois frictions sont présentes dans votre fichier fil rouge.</p>
</div>
`;

const vueEnsemble = `
<h2>Les 3 frictions identifiées à la DIRMOB</h2>
<div class="row" style="margin-top:8px;">
    <div class="offbeat-card fragment card--red" style="flex:1; text-align:center; padding:22px 14px;">
        <div class="friction-number">1</div>
        <h3 style="color:var(--grey-dirmob); font-size:0.9rem; margin:8px 0 6px;">Éclatement<br>des données</h3>
        <p style="font-size:0.68rem; color:#666; margin:0;">Un onglet par ligne de bus → bilans transverses impossibles</p>
    </div>
    <div class="offbeat-card fragment card--red" style="flex:1; text-align:center; padding:22px 14px;">
        <div class="friction-number">2</div>
        <h3 style="color:var(--grey-dirmob); font-size:0.9rem; margin:8px 0 6px;">Encodage<br>par la couleur</h3>
        <p style="font-size:0.68rem; color:#666; margin:0;">Le statut est une couleur → invisible pour la machine</p>
    </div>
    <div class="offbeat-card fragment card--red" style="flex:1; text-align:center; padding:22px 14px;">
        <div class="friction-number">3</div>
        <h3 style="color:var(--grey-dirmob); font-size:0.9rem; margin:8px 0 6px;">Listes dans<br>une cellule</h3>
        <p style="font-size:0.68rem; color:#666; margin:0;">"retard + propreté" → filtre et comptage bloqués</p>
    </div>
</div>
<div class="separator fragment"></div>
<p class="fragment" style="font-size:0.82rem; font-style:italic; margin:0; color:#555;">
    Racine commune : confusion entre <strong>tableau aide-mémoire</strong> (fait pour l'œil) et <strong>base de données</strong> (faite pour la machine).
</p>
`;

const eclatement = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--red-alert); margin:0 0 4px; font-weight:700;">Friction 1</p>
<h2 style="margin-top:0;">Éclatement des données</h2>
<div class="row">
    <div style="flex:1;">
        <div class="label--bad">3 onglets séparés</div>
        <div class="offbeat-card card--red" style="padding:12px;">
            <p style="font-size:0.58rem; color:#aaa; margin:0 0 7px; font-family:monospace;">[ Ligne 389 ] &nbsp;[ Ligne 160 ] &nbsp;[ Ligne 91 ]</p>
            <table class="mockup-table">
                <tr><th colspan="3" style="background:#ffcdd2;">Onglet : Ligne 389</th></tr>
                <tr><th>date</th><th>statut</th><th>motif</th></tr>
                <tr><td>05/03</td><td style="background:#ffcdd2;">Urgent</td><td>Retard</td></tr>
                <tr><td>10/03</td><td style="background:#ffe082;">Attente</td><td>Retard</td></tr>
            </table>
            <p style="font-size:0.58rem; color:var(--red-alert); margin:6px 0 0;">
                → Combien de réclamations "retard" sur toutes les lignes confondues ?
            </p>
        </div>
    </div>
    <div style="flex:1;">
        <div class="label--good">1 table unique + colonne id_ligne</div>
        <div class="offbeat-card card--green" style="padding:12px;">
            <table class="mockup-table">
                <tr><th>id</th><th style="color:#a16207;">id_ligne</th><th>date</th><th>motif</th></tr>
                <tr><td>R001</td><td style="color:#a16207;">L1</td><td>05/03/2026</td><td>retard</td></tr>
                <tr><td>R002</td><td style="color:#a16207;">L2</td><td>07/03/2026</td><td>avance</td></tr>
                <tr><td>R003</td><td style="color:#a16207;">L1</td><td>10/03/2026</td><td>retard</td></tr>
            </table>
            <p style="font-size:0.58rem; color:#2e7d32; margin:6px 0 0;">
                → COUNTIF(motif, "retard") = 2 · filtrer par ligne : 1 clic
            </p>
        </div>
    </div>
</div>
`;

const couleur = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--red-alert); margin:0 0 4px; font-weight:700;">Friction 2</p>
<h2 style="margin-top:0;">Encodage par la couleur</h2>
<div class="row">
    <div style="flex:1;">
        <div class="label--bad">Statut = couleur de cellule</div>
        <div class="offbeat-card card--red" style="padding:12px;">
            <table class="mockup-table">
                <tr><th>id</th><th>motif</th></tr>
                <tr style="background:#ffcdd2;"><td>R001</td><td>retard — Martin j.martin@</td></tr>
                <tr style="background:#c8e6c9;"><td>R002</td><td>avance — a.dupont@</td></tr>
                <tr style="background:#ffe082;"><td>R003</td><td>retard — n.nguyen@</td></tr>
            </table>
            <p style="font-size:0.58rem; color:var(--red-alert); margin:6px 0 0;">
                Rouge = urgent ? Vert = clôturé ?<br>La machine ne sait pas — l'info disparaît à l'export.
            </p>
        </div>
    </div>
    <div style="flex:1;">
        <div class="label--good">Statut = valeur dans une colonne</div>
        <div class="offbeat-card card--green" style="padding:12px;">
            <table class="mockup-table">
                <tr><th>id</th><th>motif</th><th>statut</th></tr>
                <tr><td>R001</td><td>retard</td><td>ouverte</td></tr>
                <tr><td>R002</td><td>avance</td><td>cloture</td></tr>
                <tr><td>R003</td><td>retard</td><td>en_cours</td></tr>
            </table>
            <p style="font-size:0.58rem; color:#2e7d32; margin:6px 0 0;">
                → COUNTIF(statut, "ouverte") = 2 — comptable, filtrable, exportable
            </p>
        </div>
    </div>
</div>
`;

const listes = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--red-alert); margin:0 0 4px; font-weight:700;">Friction 3</p>
<h2 style="margin-top:0;">Listes dans une cellule</h2>
<div class="row">
    <div style="flex:1;">
        <div class="label--bad">Plusieurs valeurs concaténées</div>
        <div class="offbeat-card card--red" style="padding:12px;">
            <table class="mockup-table">
                <tr><th>id</th><th>motifs</th></tr>
                <tr><td>R001</td><td style="background:#fff3cd;">retard + propreté</td></tr>
                <tr><td>R002</td><td style="background:#fff3cd;">attitude + retard + bruit</td></tr>
            </table>
            <p style="font-size:0.58rem; color:var(--red-alert); margin:6px 0 0;">
                → filtrer, compter, faire une jointure : impossible.
            </p>
        </div>
    </div>
    <div style="flex:1;">
        <div class="label--good">Motif principal + commentaire libre</div>
        <div class="offbeat-card card--green" style="padding:12px;">
            <table class="mockup-table">
                <tr><th>id</th><th>motif_principal</th><th>commentaire</th></tr>
                <tr><td>R001</td><td>retard</td><td>aussi propreté</td></tr>
                <tr><td>R002</td><td>attitude</td><td>retard + bruit signalés</td></tr>
            </table>
            <p style="font-size:0.58rem; color:#2e7d32; margin:6px 0 0;">
                → COUNTIF(motif_principal, "retard") = 1 · TCD par motif en 1 clic
            </p>
        </div>
    </div>
</div>
`;

export function Module3() {
  return (
    <>
      <section
        data-background-gradient="linear-gradient(135deg, #e53e3e 0%, #b71c1c 100%)"
        dangerouslySetInnerHTML={{ __html: intro }}
      />
      <section dangerouslySetInnerHTML={{ __html: vueEnsemble }} />
      <section dangerouslySetInnerHTML={{ __html: eclatement }} />
      <section dangerouslySetInnerHTML={{ __html: couleur }} />
      <section dangerouslySetInnerHTML={{ __html: listes }} />
    </>
  );
}
