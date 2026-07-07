// ─── Plot twist : Modern Data Stack ───────────────────────────────────────────
// Public averti (direction Data / SIG). La révélation finale : la logique de
// conception vue en Partie 3 est une industrie — ETL vs ELT, medallion, MDS.

const twist = `
<div style="position:relative; max-width:820px; margin:0 auto;">
    <div aria-hidden="true" style="
        position:absolute; right:-60px; top:50%; transform:translateY(-52%);
        font-family:'IBM Plex Serif',serif; font-size:16rem; font-weight:700;
        color:white; opacity:0.05; line-height:1; pointer-events:none; user-select:none;">↯</div>
    <div style="position:relative; z-index:1; text-align:left; color:white;">
        <p style="font-size:0.68rem; text-transform:uppercase; letter-spacing:5px; color:#f59e0b; margin:0 0 18px; font-weight:700;">Plot twist</p>
        <p style="font-family:'IBM Plex Serif',serif; font-size:2.5rem; font-weight:700; line-height:1.15; margin:0 0 18px;">
            Ce que vous venez de faire<br>à la main… est une industrie.
        </p>
        <div style="width:44px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 18px;"></div>
        <p style="font-size:0.92rem; color:rgba(255,255,255,0.72); margin:0 0 24px; line-height:1.7; max-width:640px;">
            Séparer la <strong style="color:white;">saisie</strong> de l'<strong style="color:white;">analyse</strong>, nettoyer les tables, agréger vers un tableau de bord :
            vous venez de reconstruire, dans Excel, les <strong style="color:white;">principes fondateurs du Modern Data Stack</strong>.
        </p>
        <span class="fragment" style="display:inline-block; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.25); color:white; font-size:0.72rem; font-weight:700; padding:9px 20px; border-radius:24px; letter-spacing:1px;">
            Voyons à quoi ça ressemble à l'échelle. ↓
        </span>
    </div>
</div>
`;

const etlElt = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Le déplacement des données</p>
<h2 style="margin-top:0;">ETL vs ELT — l'ordre des lettres change tout</h2>

<div style="display:flex; flex-direction:column; gap:12px;">

    <div style="border-radius:10px; overflow:hidden; border:2px solid #94a3b8;">
        <div style="background:#64748b; padding:6px 16px; display:flex; justify-content:space-between; align-items:center;">
            <p style="font-size:0.64rem; font-weight:700; color:white; margin:0;">ETL — l'approche historique</p>
            <p style="font-size:0.5rem; color:rgba(255,255,255,0.8); margin:0; font-style:italic;">stockage & calcul chers → on transforme AVANT</p>
        </div>
        <div style="background:#f8fafc; padding:12px 16px; display:flex; align-items:center; gap:8px;">
            <div style="flex:1; background:white; border:1px solid #cbd5e1; border-radius:7px; padding:8px 12px; text-align:center;">
                <p style="font-size:0.5rem; font-weight:700; color:#64748b; margin:0;">EXTRACT</p>
                <p style="font-size:0.48rem; color:#888; margin:2px 0 0;">depuis l'OLTP</p>
            </div>
            <span style="color:#94a3b8; font-size:1.1rem;">→</span>
            <div style="flex:1; background:#fef3c7; border:1px solid #d97706; border-radius:7px; padding:8px 12px; text-align:center;">
                <p style="font-size:0.5rem; font-weight:700; color:#b45309; margin:0;">TRANSFORM</p>
                <p style="font-size:0.48rem; color:#92400e; margin:2px 0 0;">serveur intermédiaire · nettoie & structure</p>
            </div>
            <span style="color:#94a3b8; font-size:1.1rem;">→</span>
            <div style="flex:1; background:white; border:1px solid #cbd5e1; border-radius:7px; padding:8px 12px; text-align:center;">
                <p style="font-size:0.5rem; font-weight:700; color:#64748b; margin:0;">LOAD</p>
                <p style="font-size:0.48rem; color:#888; margin:2px 0 0;">entrepôt (déjà propre)</p>
            </div>
            <div style="flex:0.9; padding-left:6px;">
                <p style="font-size:0.5rem; color:#dc2626; margin:0; line-height:1.55;">Schéma rigide fixé d'avance · le brut est jeté · changer une règle = tout recharger.</p>
            </div>
        </div>
    </div>

    <div class="fragment" style="border-radius:10px; overflow:hidden; border:2px solid #15803d;">
        <div style="background:#15803d; padding:6px 16px; display:flex; justify-content:space-between; align-items:center;">
            <p style="font-size:0.64rem; font-weight:700; color:white; margin:0;">ELT — l'approche moderne (cloud)</p>
            <p style="font-size:0.5rem; color:rgba(255,255,255,0.85); margin:0; font-style:italic;">stockage & calcul quasi gratuits → on transforme APRÈS</p>
        </div>
        <div style="background:#f0fdf4; padding:12px 16px; display:flex; align-items:center; gap:8px;">
            <div style="flex:1; background:white; border:1px solid #86efac; border-radius:7px; padding:8px 12px; text-align:center;">
                <p style="font-size:0.5rem; font-weight:700; color:#15803d; margin:0;">EXTRACT</p>
                <p style="font-size:0.48rem; color:#888; margin:2px 0 0;">depuis l'OLTP</p>
            </div>
            <span style="color:#22c55e; font-size:1.1rem;">→</span>
            <div style="flex:1; background:white; border:1px solid #86efac; border-radius:7px; padding:8px 12px; text-align:center;">
                <p style="font-size:0.5rem; font-weight:700; color:#15803d; margin:0;">LOAD</p>
                <p style="font-size:0.48rem; color:#888; margin:2px 0 0;">le BRUT, direct dans l'entrepôt</p>
            </div>
            <span style="color:#22c55e; font-size:1.1rem;">→</span>
            <div style="flex:1; background:#dcfce7; border:1px solid #15803d; border-radius:7px; padding:8px 12px; text-align:center;">
                <p style="font-size:0.5rem; font-weight:700; color:#15803d; margin:0;">TRANSFORM</p>
                <p style="font-size:0.48rem; color:#166534; margin:2px 0 0;">dans l'entrepôt · à la demande</p>
            </div>
            <div style="flex:0.9; padding-left:6px;">
                <p style="font-size:0.5rem; color:#15803d; margin:0; line-height:1.55;">On garde le brut · on transforme avec la puissance de l'entrepôt · on rejoue à volonté.</p>
            </div>
        </div>
    </div>

</div>

<div class="fragment" style="background:#1e293b; border-radius:8px; padding:11px 20px; margin-top:12px;">
    <p style="font-size:0.72rem; color:white; margin:0; line-height:1.65;">
        <strong style="color:#fcd34d;">Le pivot, c'est le cloud.</strong>
        Stockage quasi gratuit + calcul élastique → inutile de transformer avant de charger. Ce simple <strong>« L avant T »</strong> a fait naître le Modern Data Stack.
    </p>
</div>
`;

const medallion = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:#ca8a04; margin:0 0 4px; font-weight:700;">Organiser le « T » du ELT</p>
<h2 style="margin-top:0;">L'architecture Medallion : Bronze → Silver → Gold</h2>
<p style="font-size:0.72rem; color:#888; margin-top:-14px; margin-bottom:14px;">Trois couches de raffinage progressif — la donnée gagne en qualité et en valeur à chaque étape.</p>

<div style="display:flex; gap:12px; align-items:stretch;">

    <div style="flex:1; border-radius:10px; overflow:hidden; border:2px solid #b45309;">
        <div style="background:linear-gradient(135deg,#b45309,#92400e); padding:10px 14px;">
            <p style="font-size:0.9rem; margin:0;">🥉</p>
            <p style="font-size:0.72rem; font-weight:700; color:white; margin:3px 0 0;">Bronze — brut</p>
            <p style="font-size:0.5rem; color:rgba(255,255,255,0.8); margin:2px 0 0; font-style:italic;">raw / ingestion</p>
        </div>
        <div style="background:#fffbeb; padding:12px 14px;">
            <p style="font-size:0.58rem; color:#333; margin:0 0 8px; line-height:1.6;">Ingéré <strong>tel quel</strong> depuis les sources : OLTP, API, fichiers, exports SIG. Immuable, daté, traçable.</p>
            <p style="font-size:0.52rem; color:#92400e; margin:0; font-weight:600;">= la facture bitmap, le CSV brut, les logs.<br>On ne perd rien.</p>
        </div>
    </div>

    <div style="display:flex; align-items:center; flex-shrink:0; font-size:1.2rem; color:#cbd5e1;">→</div>

    <div style="flex:1; border-radius:10px; overflow:hidden; border:2px solid #64748b;">
        <div style="background:linear-gradient(135deg,#94a3b8,#64748b); padding:10px 14px;">
            <p style="font-size:0.9rem; margin:0;">🥈</p>
            <p style="font-size:0.72rem; font-weight:700; color:white; margin:3px 0 0;">Silver — nettoyé</p>
            <p style="font-size:0.5rem; color:rgba(255,255,255,0.85); margin:2px 0 0; font-style:italic;">cleaned / conformed</p>
        </div>
        <div style="background:#f8fafc; padding:12px 14px;">
            <p style="font-size:0.58rem; color:#333; margin:0 0 8px; line-height:1.6;">Dédupliqué, typé, joint, <strong>1 info par colonne</strong>. Structuré et fiable.</p>
            <p style="font-size:0.52rem; color:#475569; margin:0; font-weight:600;">= exactement les tables propres que vous avez appris à construire aujourd'hui.</p>
        </div>
    </div>

    <div style="display:flex; align-items:center; flex-shrink:0; font-size:1.2rem; color:#cbd5e1;">→</div>

    <div style="flex:1; border-radius:10px; overflow:hidden; border:2px solid #ca8a04;">
        <div style="background:linear-gradient(135deg,#eab308,#ca8a04); padding:10px 14px;">
            <p style="font-size:0.9rem; margin:0;">🥇</p>
            <p style="font-size:0.72rem; font-weight:700; color:white; margin:3px 0 0;">Gold — métier</p>
            <p style="font-size:0.5rem; color:rgba(255,255,255,0.85); margin:2px 0 0; font-style:italic;">business / aggregated</p>
        </div>
        <div style="background:#fefce8; padding:12px 14px;">
            <p style="font-size:0.58rem; color:#333; margin:0 0 8px; line-height:1.6;">Agrégats prêts à décider : KPI, dimensions métier, indicateurs.</p>
            <p style="font-size:0.52rem; color:#a16207; margin:0; font-weight:600;">= l'OLAP final. Le tableau de bord des élus, le jeu de données open data.</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#f0f9e8; border-radius:8px; padding:11px 20px; border-left:4px solid var(--green-dirmob); margin-top:13px;">
    <p style="font-size:0.72rem; color:#333; margin:0; line-height:1.65;">
        <strong style="color:#4a7c00;">Vous avez fait du Bronze → Silver → Gold à la main.</strong>
        Le medallion, c'est ce même geste — nettoyer par étapes — mais <strong>industrialisé, versionné et testé</strong> (avec un outil comme dbt).
    </p>
</div>
`;

const stack = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Vue d'ensemble</p>
<h2 style="margin-top:0;">Le Modern Data Stack, de bout en bout</h2>

<div style="display:flex; gap:8px; align-items:stretch; margin-bottom:14px;">

    <div style="flex:1; background:#eff6ff; border-radius:8px; padding:11px 12px; border-top:4px solid #2563eb;">
        <p style="font-size:0.58rem; font-weight:700; color:#1e40af; margin:0 0 6px;">① Sources</p>
        <p style="font-size:0.5rem; color:#333; margin:0; line-height:1.6;">OLTP, SIG (Arcopole), API, fichiers, capteurs.</p>
        <p style="font-size:0.44rem; color:#94a3b8; margin:6px 0 0; font-style:italic;">là où la donnée naît</p>
    </div>
    <div style="display:flex; align-items:center; color:#cbd5e1; font-size:1rem;">→</div>

    <div style="flex:1; background:#f0fdf4; border-radius:8px; padding:11px 12px; border-top:4px solid #15803d;">
        <p style="font-size:0.58rem; font-weight:700; color:#15803d; margin:0 0 6px;">② Ingestion · E-L</p>
        <p style="font-size:0.5rem; color:#333; margin:0; line-height:1.6;">Extract + Load du brut, automatisé.</p>
        <p style="font-size:0.44rem; color:#94a3b8; margin:6px 0 0; font-style:italic;">Fivetran · Airbyte</p>
    </div>
    <div style="display:flex; align-items:center; color:#cbd5e1; font-size:1rem;">→</div>

    <div style="flex:1.3; background:#fefce8; border-radius:8px; padding:11px 12px; border-top:4px solid #ca8a04;">
        <p style="font-size:0.58rem; font-weight:700; color:#a16207; margin:0 0 6px;">③ Entrepôt / Lakehouse · T</p>
        <p style="font-size:0.5rem; color:#333; margin:0 0 6px; line-height:1.6;">Bronze → Silver → Gold, transformé sur place.</p>
        <div style="display:flex; gap:3px; flex-wrap:wrap;">
            <span style="font-size:0.42rem; background:#fef3c7; color:#92400e; padding:1px 6px; border-radius:8px;">🥉</span>
            <span style="font-size:0.42rem; background:#e2e8f0; color:#475569; padding:1px 6px; border-radius:8px;">🥈</span>
            <span style="font-size:0.42rem; background:#fef9c3; color:#a16207; padding:1px 6px; border-radius:8px;">🥇</span>
        </div>
        <p style="font-size:0.44rem; color:#94a3b8; margin:6px 0 0; font-style:italic;">BigQuery · Snowflake · Databricks · dbt</p>
    </div>
    <div style="display:flex; align-items:center; color:#cbd5e1; font-size:1rem;">→</div>

    <div style="flex:1; background:#faf5ff; border-radius:8px; padding:11px 12px; border-top:4px solid #9333ea;">
        <p style="font-size:0.58rem; font-weight:700; color:#7c3aed; margin:0 0 6px;">④ Restitution · BI</p>
        <p style="font-size:0.5rem; color:#333; margin:0; line-height:1.6;">Tableaux de bord, open data, prévisions.</p>
        <p style="font-size:0.44rem; color:#94a3b8; margin:6px 0 0; font-style:italic;">Power BI · Looker · Metabase</p>
    </div>

</div>

<div class="fragment" style="background:#f8fafc; border-radius:8px; padding:12px 20px; border-left:4px solid var(--blue-dirmob);">
    <p style="font-size:0.6rem; font-weight:700; color:#0369a1; margin:0 0 5px; text-transform:uppercase; letter-spacing:1px;">Transposé à Seine-Ouest</p>
    <p style="font-size:0.7rem; color:#333; margin:0; line-height:1.7;">
        Exports SIG bruts <strong>(Bronze)</strong> → couches conformées, 1 info par colonne <strong>(Silver)</strong> → tableaux de bord des élus &amp; jeux <strong>data.seineouest.fr (Gold)</strong>.
        C'est déjà votre chaîne — il ne lui manque qu'un nom.
    </p>
</div>
`;

const bigData = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:#e53e3e; margin:0 0 4px; font-weight:700;">Et quand le flux devient énorme ?</p>
<h2 style="margin-top:0;">Big data : la fenêtre, l'objet, l'entrepôt</h2>
<p style="font-size:0.7rem; color:#888; margin-top:-14px; margin-bottom:12px;">Un scooter émet un événement toutes les ~30 s en course. Une flotte entière → <strong>des millions de lignes par an</strong>. On ne peut pas tout garder au même endroit.</p>

<div style="display:flex; gap:8px; align-items:stretch; max-width:980px; margin:0 auto 12px;">

    <div style="flex:1; border-radius:10px; overflow:hidden; border:2px solid #2563eb;">
        <div style="background:#2563eb; padding:8px 14px;">
            <p style="font-size:0.6rem; font-weight:700; color:white; margin:0;">🔥 Base chaude · OLTP</p>
        </div>
        <div style="background:#eff6ff; padding:11px 14px;">
            <p style="font-size:0.58rem; color:#1e3a5f; margin:0 0 8px; line-height:1.65;">Ne garde qu'une <strong>fenêtre glissante</strong> du flux — l'API MDS elle-même ne sert que les événements récents.</p>
            <div style="background:white; border-radius:6px; padding:7px 11px; border-left:3px solid #2563eb; margin-bottom:8px;">
                <p style="font-size:0.52rem; color:#2563eb; margin:0; font-family:monospace;">events : 30 jours · ~10 000 lignes</p>
            </div>
            <p style="font-size:0.52rem; color:#555; margin:0; line-height:1.6;">Rapide, chère, <strong>petite</strong> — dimensionnée pour l'opérationnel, pas pour l'historique.</p>
        </div>
    </div>

    <div class="fragment" style="display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0; gap:3px;">
        <p style="font-size:0.42rem; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin:0; text-align:center; line-height:1.7;">archivage<br>continu</p>
        <div style="font-size:1.4rem; color:#0284c7;">→</div>
    </div>

    <div class="fragment" style="flex:1; border-radius:10px; overflow:hidden; border:2px solid #0284c7;">
        <div style="background:#0284c7; padding:8px 14px;">
            <p style="font-size:0.6rem; font-weight:700; color:white; margin:0;">🗄️ Stockage objet · data lake</p>
        </div>
        <div style="background:#f0f9ff; padding:11px 14px;">
            <p style="font-size:0.58rem; color:#0c4a6e; margin:0 0 8px; line-height:1.65;">L'historique <strong>complet</strong> dort en fichiers (Parquet) sur S3 / GCS / MinIO — la couche <strong>bronze</strong> du medallion.</p>
            <div style="background:white; border-radius:6px; padding:7px 11px; border-left:3px solid #0284c7; margin-bottom:8px;">
                <p style="font-size:0.52rem; color:#0284c7; margin:0; font-family:monospace;">events/year=2026/month=06/*.parquet</p>
            </div>
            <p style="font-size:0.52rem; color:#555; margin:0; line-height:1.6;">Quasi gratuit, illimité, immuable. <strong>On ne jette rien — on déplace.</strong></p>
        </div>
    </div>

    <div class="fragment" style="display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0; gap:3px;">
        <p style="font-size:0.42rem; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin:0; text-align:center; line-height:1.7;">à la<br>demande</p>
        <div style="font-size:1.4rem; color:#9333ea;">→</div>
    </div>

    <div class="fragment" style="flex:1; border-radius:10px; overflow:hidden; border:2px solid #9333ea;">
        <div style="background:#9333ea; padding:8px 14px;">
            <p style="font-size:0.6rem; font-weight:700; color:white; margin:0;">🏛️ Data warehouse · OLAP</p>
        </div>
        <div style="background:#faf5ff; padding:11px 14px;">
            <p style="font-size:0.58rem; color:#4c1d95; margin:0 0 8px; line-height:1.65;">La <strong>transformation</strong> se fait ici (le T du ELT) : l'entrepôt lit le lake, agrège, produit silver puis gold.</p>
            <div style="background:white; border-radius:6px; padding:7px 11px; border-left:3px solid #9333ea; margin-bottom:8px;">
                <p style="font-size:0.52rem; color:#7c3aed; margin:0; font-family:monospace;">events (5 ans) → trips → dashboard</p>
            </div>
            <p style="font-size:0.52rem; color:#555; margin:0; line-height:1.6;">L'historique <strong>se réveille</strong> quand une question arrive — jamais avant.</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#1e293b; border-radius:8px; padding:11px 20px; max-width:980px; margin:0 auto;">
    <p style="font-size:0.7rem; color:white; margin:0; line-height:1.7;">
        <strong style="color:#fcd34d;">Vous l'avez vécu dans l'exercice :</strong> l'anti-jointure a trouvé des trajets d'avril–mai <em>sans aucun événement</em> —
        ils sont sortis de la fenêtre de 30 jours. <code style="color:#93c5fd;">trips</code> (petit, agrégé) garde la mémoire longue ;
        <code style="color:#93c5fd;">events</code> (énorme, brut) ne vit qu'en fenêtre, puis part en stockage objet.
    </p>
</div>
`;

const retenir = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--green-dirmob); margin:0 0 6px; font-weight:700;">À retenir</p>
<h2 style="margin-top:0;">Le fil, du bloc-notes au Modern Data Stack</h2>

<div style="display:flex; flex-direction:column; gap:10px; max-width:860px; margin:0 auto;">

    <div class="offbeat-card" style="padding:12px 18px; display:flex; gap:14px; align-items:flex-start;">
        <span style="font-size:1rem;">①</span>
        <p style="font-size:0.7rem; color:#333; margin:0; line-height:1.6;"><strong>OLTP ≠ OLAP.</strong> Saisir vite (transactions) et analyser en masse (historique) sont deux métiers, deux bases, deux moteurs. On ne les mélange pas dans le même fichier.</p>
    </div>

    <div class="offbeat-card card--green" style="padding:12px 18px; display:flex; gap:14px; align-items:flex-start;">
        <span style="font-size:1rem;">②</span>
        <p style="font-size:0.7rem; color:#333; margin:0; line-height:1.6;"><strong>ELT a remplacé ETL.</strong> Grâce au cloud, on charge le brut d'abord et on transforme après, dans l'entrepôt — on garde tout, on rejoue à volonté.</p>
    </div>

    <div class="offbeat-card card--grey" style="padding:12px 18px; display:flex; gap:14px; align-items:flex-start;">
        <span style="font-size:1rem;">③</span>
        <p style="font-size:0.7rem; color:#333; margin:0; line-height:1.6;"><strong>Medallion Bronze → Silver → Gold.</strong> La qualité se construit par étapes : brut tracé, nettoyé conformé, agrégé métier. Traçabilité + fiabilité.</p>
    </div>

    <div style="background:linear-gradient(135deg,#009fe3 0%,#0369a1 50%,#95c11f 100%); border-radius:10px; padding:15px 24px; text-align:center;">
        <p style="font-size:0.92rem; color:white; font-weight:700; margin:0 0 5px; font-family:'IBM Plex Serif',serif; line-height:1.4;">
            Nettoyer et structurer dans Excel, c'est le « T » du ELT — en miniature.
        </p>
        <p style="font-size:0.66rem; color:rgba(255,255,255,0.88); margin:0;">
            Le Modern Data Stack, c'est ce même geste, à l'échelle — et versionné.
        </p>
    </div>

</div>
`;

export function ModernDataStack() {
  return (
    <>
      <section
        data-background-color="#0a0f1e"
        dangerouslySetInnerHTML={{ __html: twist }}
      />
      <section dangerouslySetInnerHTML={{ __html: etlElt }} />
      <section dangerouslySetInnerHTML={{ __html: medallion }} />
      <section dangerouslySetInnerHTML={{ __html: stack }} />
      <section dangerouslySetInnerHTML={{ __html: bigData }} />
      <section dangerouslySetInnerHTML={{ __html: retenir }} />
    </>
  );
}
