// ─── Partie 3 : le pont OLTP → OLAP — fil rouge Yego ─────────────────────────
// Le point d'arrivée (le TDB flotte Yego, en prod sur data.seineouest.fr),
// la demande floue, la maïeutique, puis le décorticage du vrai code de la
// page bloc par bloc : chaque élément = une question métier = une requête
// ODSQL. Enchaîne sur Module2 (cadrage des données).

const intro = `
<div style="text-align:left; max-width:720px; margin:0 auto; color:white;">
    <p class="section-intro-label" style="color:white;">Partie 3</p>
    <p class="section-intro-title">Le pont :<br>de l'OLTP au<br>tableau de bord</p>
    <p class="section-intro-sub">La direction demande un suivi des scooters Yego. Comment passer du flux brut à la vue qui pilote.</p>
</div>
`;

const pointArrivee = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:#9333ea; margin:0 0 4px; font-weight:700;">Le point d'arrivée</p>
<h2 style="margin-top:0;">Voilà ce que le métier veut, au fond</h2>
<p style="font-size:0.72rem; color:#888; margin-top:-14px; margin-bottom:14px;">Un écran qui répond tout seul aux questions de pilotage — et il existe : il tourne sur <strong>data.seineouest.fr</strong>. Toute la partie tient dans : <em>comment on arrive là ?</em></p>

<div style="background:#0f172a; border-radius:12px; padding:16px 18px; max-width:940px; margin:0 auto;">
    <p style="font-size:0.5rem; color:#64748b; font-family:monospace; margin:0 0 10px;">🛵 yego_dashboard · data.seineouest.fr · mis à jour automatiquement depuis l'API MDS</p>

    <div style="display:flex; gap:10px; margin-bottom:12px;">
        <div style="flex:1; background:#1e293b; border-radius:8px; padding:10px 14px; border-top:3px solid #009fe3;">
            <p style="font-size:0.44rem; color:#94a3b8; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Trajets</p>
            <p style="font-size:1.2rem; color:white; font-weight:700; margin:0; font-family:'IBM Plex Serif',serif;">11 553</p>
        </div>
        <div style="flex:1; background:#1e293b; border-radius:8px; padding:10px 14px; border-top:3px solid #95c11f;">
            <p style="font-size:0.44rem; color:#94a3b8; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Durée moyenne</p>
            <p style="font-size:1.2rem; color:white; font-weight:700; margin:0; font-family:'IBM Plex Serif',serif;">22,0 min</p>
        </div>
        <div style="flex:1; background:#1e293b; border-radius:8px; padding:10px 14px; border-top:3px solid #f59e0b;">
            <p style="font-size:0.44rem; color:#94a3b8; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Flotte disponible</p>
            <p style="font-size:1.2rem; color:#fcd34d; font-weight:700; margin:0; font-family:'IBM Plex Serif',serif;">55 / 60</p>
        </div>
        <div style="flex:1; background:#1e293b; border-radius:8px; padding:10px 14px; border-top:3px solid #e53e3e;">
            <p style="font-size:0.44rem; color:#94a3b8; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Batterie &lt; 20 %</p>
            <p style="font-size:1.2rem; color:#f87171; font-weight:700; margin:0; font-family:'IBM Plex Serif',serif;">7 scooters</p>
        </div>
    </div>

    <div style="display:flex; gap:10px;">
        <div style="flex:1; background:#1e293b; border-radius:8px; padding:10px 12px;">
            <p style="font-size:0.46rem; color:#94a3b8; margin:0 0 6px; text-transform:uppercase; letter-spacing:1px;">Trajets par commune</p>
            <table class="mockup-table" style="font-size:0.44em; background:transparent;">
                <tr><th style="background:#334155; color:#cbd5e1; border-color:#475569;">commune</th><th style="background:#334155; color:#cbd5e1; border-color:#475569;">nb</th></tr>
                <tr><td style="background:#0f172a; color:#e2e8f0; border-color:#334155;">Boulogne-Bill.</td><td style="background:#0f172a; color:#4ade80; border-color:#334155; font-weight:700;">3 887</td></tr>
                <tr><td style="background:#0f172a; color:#e2e8f0; border-color:#334155;">Issy-les-Mx</td><td style="background:#0f172a; color:#4ade80; border-color:#334155; font-weight:700;">2 982</td></tr>
                <tr><td style="background:#0f172a; color:#e2e8f0; border-color:#334155;">Meudon</td><td style="background:#0f172a; color:#4ade80; border-color:#334155; font-weight:700;">1 419</td></tr>
            </table>
        </div>
        <div style="flex:1; background:#1e293b; border-radius:8px; padding:10px 12px;">
            <p style="font-size:0.46rem; color:#94a3b8; margin:0 0 6px; text-transform:uppercase; letter-spacing:1px;">État de la flotte · maintenant</p>
            <table class="mockup-table" style="font-size:0.44em; background:transparent;">
                <tr><th style="background:#334155; color:#cbd5e1; border-color:#475569;">vehicle_state</th><th style="background:#334155; color:#cbd5e1; border-color:#475569;">nb</th></tr>
                <tr><td style="background:#0f172a; color:#4ade80; border-color:#334155;">available</td><td style="background:#0f172a; color:#e2e8f0; border-color:#334155; font-weight:700;">41</td></tr>
                <tr><td style="background:#0f172a; color:#facc15; border-color:#334155;">on_trip · reserved</td><td style="background:#0f172a; color:#e2e8f0; border-color:#334155; font-weight:700;">14</td></tr>
                <tr><td style="background:#0f172a; color:#f87171; border-color:#334155;">non_operational</td><td style="background:#0f172a; color:#e2e8f0; border-color:#334155; font-weight:700;">5</td></tr>
            </table>
        </div>
        <div style="flex:1.1; background:#1e293b; border-radius:8px; padding:10px 12px; display:flex; flex-direction:column; justify-content:center;">
            <p style="font-size:0.46rem; color:#94a3b8; margin:0 0 6px; text-transform:uppercase; letter-spacing:1px;">Trajets par jour · derniers jours</p>
            <div style="display:flex; align-items:flex-end; gap:6px; height:52px; padding:0 4px;">
                <div style="flex:1; background:#f59e0b; height:98%; border-radius:3px 3px 0 0;"></div>
                <div style="flex:1; background:#009fe3; height:93%; border-radius:3px 3px 0 0;"></div>
                <div style="flex:1; background:#009fe3; height:85%; border-radius:3px 3px 0 0;"></div>
                <div style="flex:1; background:#009fe3; height:84%; border-radius:3px 3px 0 0;"></div>
                <div style="flex:1; background:#009fe3; height:81%; border-radius:3px 3px 0 0;"></div>
            </div>
            <p style="font-size:0.4rem; color:#64748b; margin:4px 0 0; text-align:center;">26 · 27 · 28 · 29 · 30 juin</p>
        </div>
    </div>
</div>

<div class="fragment" style="background:#fefce8; border-radius:8px; padding:11px 20px; border-left:4px solid #ca8a04; margin-top:12px; max-width:940px; margin-left:auto; margin-right:auto;">
    <p style="font-size:0.74rem; color:#333; margin:0; line-height:1.7;">
        <strong style="color:#92400e;">Personne ne demande jamais ça comme ça.</strong>
        Ce que vous recevez, c'est une phrase — floue. Tout notre métier se joue entre cette phrase et cet écran.
    </p>
</div>
`;

const demandeFloue = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--red-alert); margin:0 0 4px; font-weight:700;">Le point de départ réel</p>
<h2 style="margin-top:0;">La demande métier arrive toujours floue</h2>

<div class="citation" style="margin:12px auto 16px; max-width:680px; padding:18px 26px !important;">
    <p style="font-size:0.4rem !important; opacity:0.65; margin:0 0 6px; text-transform:uppercase; letter-spacing:2px; font-family:monospace !important; line-height:1 !important;">✉️ Mail de la directrice mobilités · lundi 9h04</p>
    <p style="font-size:1.05rem !important; line-height:1.5 !important; margin:0;">« Il me faudrait un suivi des scooters Yego. Vous pouvez me faire ça ? »</p>
</div>

<p style="font-size:0.7rem; color:#888; margin:0 0 10px; text-align:center;">Une même phrase, trois lectures — trois tableaux de bord <strong>incompatibles</strong> :</p>

<div class="row" style="gap:12px; align-items:stretch;">
    <div class="offbeat-card fragment" style="flex:1; padding:13px 15px;">
        <p style="font-size:0.62rem; font-weight:700; color:var(--blue-dirmob); margin:0 0 6px;">Lecture A — l'usage</p>
        <p style="font-size:0.58rem; color:#333; margin:0 0 8px; line-height:1.6;">« Elle veut voir si le service décolle : les trajets augmentent-ils, et où ? »</p>
        <p style="font-size:0.52rem; color:#888; margin:0; font-family:monospace;">→ trajets/semaine, par commune (trips)</p>
    </div>
    <div class="offbeat-card fragment card--green" style="flex:1; padding:13px 15px;">
        <p style="font-size:0.62rem; font-weight:700; color:#2e7d32; margin:0 0 6px;">Lecture B — la flotte</p>
        <p style="font-size:0.58rem; color:#333; margin:0 0 8px; line-height:1.6;">« Elle veut savoir si le service tient : scooters en panne, batteries à plat ? »</p>
        <p style="font-size:0.52rem; color:#888; margin:0; font-family:monospace;">→ vehicle_state, battery_pct (events)</p>
    </div>
    <div class="offbeat-card fragment card--grey" style="flex:1; padding:13px 15px;">
        <p style="font-size:0.62rem; font-weight:700; color:var(--grey-dirmob); margin:0 0 6px;">Lecture C — le contrat</p>
        <p style="font-size:0.58rem; color:#333; margin:0 0 8px; line-height:1.6;">« Elle prépare le comité de suivi : Yego couvre-t-il bien les 8 communes ? »</p>
        <p style="font-size:0.52rem; color:#888; margin:0; font-family:monospace;">→ couverture territoriale vs engagements</p>
    </div>
</div>

<div class="separator fragment"></div>
<p class="fragment" style="font-size:0.8rem; color:#333; margin:0; text-align:center; line-height:1.7;">
    Foncer construire = choisir une lecture <strong>au hasard</strong>.<br>
    <span style="font-size:0.68rem; color:#888; font-style:italic;">La demande n'est pas le besoin. Elle est le symptôme du besoin.</span>
</p>
`;

const maieutique = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Notre vrai rôle</p>
<h2 style="margin-top:0;">Interprète, accoucheur d'idées</h2>
<p style="font-size:0.72rem; color:#888; margin-top:-14px; margin-bottom:14px;">La maïeutique de Socrate : le métier <em>sait</em> ce qu'il veut — mais ne l'a jamais formulé. Notre travail : le faire accoucher, par les questions.</p>

<div style="display:flex; gap:16px; align-items:stretch;">

    <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
        <div class="fragment" style="background:#f0f8ff; border-radius:8px; padding:10px 15px; border-left:4px solid #009fe3;">
            <p style="font-size:0.62rem; font-weight:700; color:#1e40af; margin:0 0 3px;">1 · Quelle décision allez-vous prendre avec ?</p>
            <p style="font-size:0.55rem; color:#555; margin:0; line-height:1.6; font-style:italic;">« Si la flotte est à plat, vous faites quoi ? » — relancer Yego ? renégocier ? Un KPI sans décision derrière est un chiffre décoratif.</p>
        </div>
        <div class="fragment" style="background:#f0f9e8; border-radius:8px; padding:10px 15px; border-left:4px solid #95c11f;">
            <p style="font-size:0.62rem; font-weight:700; color:#2e7d32; margin:0 0 3px;">2 · Quelle est la question, en une phrase mesurable ?</p>
            <p style="font-size:0.55rem; color:#555; margin:0; line-height:1.6; font-style:italic;">« Suivre les scooters » → « la flotte est-elle disponible, et où les trajets se concentrent-ils ? »</p>
        </div>
        <div class="fragment" style="background:#fff8e1; border-radius:8px; padding:10px 15px; border-left:4px solid #f59e0b;">
            <p style="font-size:0.62rem; font-weight:700; color:#b45309; margin:0 0 3px;">3 · Par quoi voulez-vous découper ?</p>
            <p style="font-size:0.55rem; color:#555; margin:0; line-height:1.6; font-style:italic;">Par commune ? par semaine ? par état du scooter ? — ce sont les <strong>dimensions</strong> du futur KPI.</p>
        </div>
        <div class="fragment" style="background:#faf5ff; border-radius:8px; padding:10px 15px; border-left:4px solid #9333ea;">
            <p style="font-size:0.62rem; font-weight:700; color:#7c3aed; margin:0 0 3px;">4 · À quelle fréquence, sur quelle profondeur ?</p>
            <p style="font-size:0.55rem; color:#555; margin:0; line-height:1.6; font-style:italic;">Le comité de suivi Yego est mensuel ; l'exploitation veut du quotidien. Deux besoins, deux fréquences — à trancher maintenant.</p>
        </div>
    </div>

    <div style="flex:1; display:flex; flex-direction:column; gap:10px; justify-content:center;">
        <div style="background:#fff5f5; border:2px solid #dc2626; border-radius:10px; padding:12px 16px;">
            <p style="font-size:0.54rem; font-weight:700; color:#dc2626; text-transform:uppercase; letter-spacing:1px; margin:0 0 6px;">❌ L'exécutant</p>
            <p style="font-size:0.62rem; color:#7f1d1d; margin:0; line-height:1.7;">
                Prend la demande au mot. Construit vite. Livre un tableau… qui ne répond pas à la vraie question.
                <strong>Trois allers-retours plus tard, tout est à refaire.</strong>
            </p>
        </div>
        <div class="fragment" style="background:#f0fdf4; border:2px solid #15803d; border-radius:10px; padding:12px 16px;">
            <p style="font-size:0.54rem; font-weight:700; color:#15803d; text-transform:uppercase; letter-spacing:1px; margin:0 0 6px;">✔ L'interprète</p>
            <p style="font-size:0.62rem; color:#14532d; margin:0; line-height:1.7;">
                Reformule, challenge, désambiguïse — <strong>avant</strong> d'ouvrir quoi que ce soit.
                Fait valider la question reformulée par le métier. Puis construit <strong>une seule fois</strong>.
            </p>
        </div>
        <div class="fragment" style="background:#1e293b; border-radius:10px; padding:12px 18px; text-align:center;">
            <p style="font-size:0.72rem; color:white; font-weight:700; margin:0; font-family:'IBM Plex Serif',serif; line-height:1.5;">
                La compétence data n° 1 n'est pas technique.<br>
                <span style="color:#fcd34d;">C'est l'art de poser des questions.</span>
            </p>
        </div>
    </div>

</div>
`;

const anatomie = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:#9333ea; margin:0 0 4px; font-weight:700;">Le vrai code, décortiqué · 1/5 — l'architecture</p>
<h2 style="margin-top:0;">Sous le capot : deux tables, zéro chiffre</h2>
<p style="font-size:0.7rem; color:#888; margin-top:-14px; margin-bottom:12px;">Voici le squelette de la page en production. Cherchez bien : il n'y a <strong>aucune donnée</strong> dedans — seulement des questions.</p>

<div style="display:flex; gap:16px; align-items:stretch; max-width:960px; margin:0 auto;">

    <div style="flex:1.2; background:#0f172a; border-radius:10px; padding:15px 18px; display:flex; flex-direction:column; justify-content:center;">
        <p style="font-size:0.52rem; font-family:monospace; color:#e2e8f0; margin:0; line-height:2.05;">
<span style="color:#64748b;">&lt;</span><span style="color:#60a5fa;">ods-dataset-context</span> <span style="color:#f472b6;">context</span>=<span style="color:#86efac;">"trips, vehicles"</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#f472b6;">trips-dataset</span>=<span style="color:#86efac;">"yego_trips_ods"</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#f472b6;">vehicles-dataset</span>=<span style="color:#86efac;">"yego_vehicles_ods"</span><span style="color:#64748b;">&gt;</span><br>
<br>
&nbsp;&nbsp;<span style="color:#64748b;">&lt;!-- chaque bloc de l'écran = une requête --&gt;</span><br>
&nbsp;&nbsp;<span style="color:#64748b;">&lt;</span><span style="color:#60a5fa;">div</span> <span style="color:#f472b6;">ods-adv-analysis</span>=<span style="color:#86efac;">"kTrajets"</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#f472b6;">ods-adv-analysis-context</span>=<span style="color:#86efac;">"trips"</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#f472b6;">ods-adv-analysis-select</span>=<span style="color:#86efac;">"count(*) as nb"</span><span style="color:#64748b;">&gt;</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#fcd34d; font-weight:700;">{{ kTrajets[0].nb }}</span><br>
&nbsp;&nbsp;<span style="color:#64748b;">&lt;/</span><span style="color:#60a5fa;">div</span><span style="color:#64748b;">&gt;</span><br>
<br>
<span style="color:#64748b;">&lt;/</span><span style="color:#60a5fa;">ods-dataset-context</span><span style="color:#64748b;">&gt;</span></p>
    </div>

    <div style="flex:1; display:flex; flex-direction:column; gap:9px; justify-content:center;">
        <div class="fragment" style="background:#eff6ff; border-radius:8px; padding:10px 15px; border-left:4px solid #2563eb;">
            <p style="font-size:0.6rem; margin:0; line-height:1.65; color:#333;"><strong>Le contexte = les deux tables publiées.</strong> On les branche une fois — la page ne fait que <strong>lire</strong>, elle n'y écrira jamais.</p>
        </div>
        <div class="fragment" style="background:#faf5ff; border-radius:8px; padding:10px 15px; border-left:4px solid #9333ea;">
            <p style="font-size:0.6rem; margin:0; line-height:1.65; color:#333;"><strong>Chaque bloc porte sa requête ODSQL.</strong> <code style="font-size:0.85em;">select</code> · <code style="font-size:0.85em;">where</code> · <code style="font-size:0.85em;">group_by</code> — une question enregistrée par élément d'écran.</p>
        </div>
        <div class="fragment" style="background:#f0f9e8; border-radius:8px; padding:10px 15px; border-left:4px solid #95c11f;">
            <p style="font-size:0.6rem; margin:0; line-height:1.65; color:#333;"><strong>L'affichage injecte le résultat.</strong> <code style="font-size:0.85em;">{{ kTrajets[0].nb }}</code> → <strong>11 553</strong>. La table bouge → le chiffre bouge. Zéro ressaisie.</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#1e293b; border-radius:8px; padding:11px 20px; margin:12px auto 0; max-width:960px;">
    <p style="font-size:0.72rem; color:white; margin:0; line-height:1.6; text-align:center;"><strong style="color:#fcd34d;">L'OLAP est une vue de l'OLTP.</strong> <span style="font-size:0.62rem; color:rgba(255,255,255,0.7);">Cette page en est la preuve en production — décortiquons-la bloc par bloc, question métier par question métier.</span></p>
</div>
`;

const blocUsage = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Le vrai code, décortiqué · 2/5 — l'usage</p>
<h2 style="margin-top:0;">« Le service décolle-t-il ? » — trois agrégats</h2>
<p style="font-size:0.7rem; color:#888; margin-top:-14px; margin-bottom:12px;">La <strong>lecture A</strong> de la demande, validée avec la directrice. Trois tuiles, trois requêtes — toutes sur le contexte <code>trips</code>.</p>

<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; max-width:960px; margin:0 auto;">

    <div class="fragment" style="background:#0f172a; border-radius:10px; padding:13px 15px; border-top:3px solid #009fe3;">
        <p style="font-size:0.46rem; color:#94a3b8; margin:0 0 2px; text-transform:uppercase; letter-spacing:1px;">Trajets</p>
        <p style="font-size:1.05rem; color:white; font-weight:700; margin:0 0 8px; font-family:'IBM Plex Serif',serif;">11 553</p>
        <p style="font-size:0.48rem; font-family:monospace; color:#93c5fd; margin:0; line-height:1.9; border-top:1px solid #334155; padding-top:7px;"><span style="color:#f472b6;">select=</span><span style="color:#fcd34d;">count</span>(*) as nb</p>
        <p style="font-size:0.5rem; color:#64748b; margin:7px 0 0; line-height:1.55;">On <strong style="color:#94a3b8;">compte des lignes</strong> — juste, uniquement parce que le grain est propre : 1 ligne = 1 trajet.</p>
    </div>

    <div class="fragment" style="background:#0f172a; border-radius:10px; padding:13px 15px; border-top:3px solid #95c11f;">
        <p style="font-size:0.46rem; color:#94a3b8; margin:0 0 2px; text-transform:uppercase; letter-spacing:1px;">Durée moyenne</p>
        <p style="font-size:1.05rem; color:white; font-weight:700; margin:0 0 8px; font-family:'IBM Plex Serif',serif;">22,0 <span style="font-size:0.6em;">min</span></p>
        <p style="font-size:0.48rem; font-family:monospace; color:#93c5fd; margin:0; line-height:1.9; border-top:1px solid #334155; padding-top:7px;"><span style="color:#f472b6;">select=</span><span style="color:#fcd34d;">avg</span>(duree_min) as duree</p>
        <p style="font-size:0.5rem; color:#64748b; margin:7px 0 0; line-height:1.55;">Une moyenne n'est possible que sur une colonne <strong style="color:#94a3b8;">typée nombre</strong> — le « T » du silver.</p>
    </div>

    <div class="fragment" style="background:#0f172a; border-radius:10px; padding:13px 15px; border-top:3px solid #0369a1;">
        <p style="font-size:0.46rem; color:#94a3b8; margin:0 0 2px; text-transform:uppercase; letter-spacing:1px;">Distance parcourue</p>
        <p style="font-size:1.05rem; color:white; font-weight:700; margin:0 0 8px; font-family:'IBM Plex Serif',serif;">50 254 <span style="font-size:0.6em;">km</span></p>
        <p style="font-size:0.48rem; font-family:monospace; color:#93c5fd; margin:0; line-height:1.9; border-top:1px solid #334155; padding-top:7px;"><span style="color:#f472b6;">select=</span><span style="color:#fcd34d;">sum</span>(distance_m) / 1000 as km</p>
        <p style="font-size:0.5rem; color:#64748b; margin:7px 0 0; line-height:1.55;">On peut même <strong style="color:#94a3b8;">calculer dans le select</strong> : la conversion m → km se fait dans la requête.</p>
    </div>

</div>

<div class="fragment" style="background:#fefce8; border-radius:8px; padding:12px 20px; border-left:4px solid #ca8a04; margin:14px auto 0; max-width:960px;">
    <p style="font-size:0.72rem; color:#333; margin:0; line-height:1.7;">
        <strong style="color:#92400e;">Aucune colonne « nombre de trajets » n'existe nulle part.</strong>
        Ces trois chiffres naissent de la requête, à chaque affichage — filtrer, agréger, calculer : le geste OLAP de la partie 2, en production.
    </p>
</div>
`;

const blocFlotte = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:#2e7d32; margin:0 0 4px; font-weight:700;">Le vrai code, décortiqué · 3/5 — la flotte</p>
<h2 style="margin-top:0;">« Le service tient-il ? » — l'état de la flotte</h2>
<p style="font-size:0.7rem; color:#888; margin-top:-14px; margin-bottom:12px;">La <strong>lecture B</strong>. Même page, autre contexte : ces blocs interrogent <code>vehicles</code> — la photo de la flotte à l'instant T.</p>

<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; max-width:960px; margin:0 auto;">

    <div class="fragment" style="background:#0f172a; border-radius:10px; padding:13px 15px; border-top:3px solid #f59e0b;">
        <p style="font-size:0.46rem; color:#94a3b8; margin:0 0 2px; text-transform:uppercase; letter-spacing:1px;">Flotte disponible</p>
        <p style="font-size:1.05rem; color:#fcd34d; font-weight:700; margin:0 0 8px; font-family:'IBM Plex Serif',serif;">55 <span style="font-size:0.6em; color:#94a3b8;">/ 60</span></p>
        <p style="font-size:0.48rem; font-family:monospace; color:#93c5fd; margin:0; line-height:1.9; border-top:1px solid #334155; padding-top:7px;"><span style="color:#f472b6;">select=</span><span style="color:#fcd34d;">count</span>(*)<br><span style="color:#f472b6;">where=</span>etat != 'non_operational'</p>
        <p style="font-size:0.5rem; color:#64748b; margin:7px 0 0; line-height:1.55;"><strong style="color:#94a3b8;">Deux requêtes imbriquées</strong> : le 55 (avec where) et le 60 (sans).</p>
    </div>

    <div class="fragment" style="background:#0f172a; border-radius:10px; padding:13px 15px; border-top:3px solid #e53e3e;">
        <p style="font-size:0.46rem; color:#94a3b8; margin:0 0 2px; text-transform:uppercase; letter-spacing:1px;">Batterie &lt; 20 %</p>
        <p style="font-size:1.05rem; color:#f87171; font-weight:700; margin:0 0 8px; font-family:'IBM Plex Serif',serif;">7 <span style="font-size:0.6em; color:#94a3b8;">scooters</span></p>
        <p style="font-size:0.48rem; font-family:monospace; color:#93c5fd; margin:0; line-height:1.9; border-top:1px solid #334155; padding-top:7px;"><span style="color:#f472b6;">select=</span><span style="color:#fcd34d;">count</span>(*)<br><span style="color:#f472b6;">where=</span>battery_pct &lt; 20</p>
        <p style="font-size:0.5rem; color:#64748b; margin:7px 0 0; line-height:1.55;">Un <strong style="color:#94a3b8;">seuil métier</strong> (20 %) devient un simple where.</p>
    </div>

    <div class="fragment" style="background:#0f172a; border-radius:10px; padding:13px 15px; border-top:3px solid #95c11f;">
        <p style="font-size:0.46rem; color:#94a3b8; margin:0 0 2px; text-transform:uppercase; letter-spacing:1px;">État de la flotte</p>
        <p style="font-size:0.6rem; color:white; font-weight:700; margin:0 0 8px; line-height:1.8;">Disponible 41 · En course 8<br>Réservé 6 · Hors service 5</p>
        <p style="font-size:0.48rem; font-family:monospace; color:#93c5fd; margin:0; line-height:1.9; border-top:1px solid #334155; padding-top:7px;"><span style="color:#f472b6;">select=</span>etat_libelle, <span style="color:#fcd34d;">count</span>(*) as nb<br><span style="color:#f472b6;">group_by=</span>etat_libelle</p>
        <p style="font-size:0.5rem; color:#64748b; margin:7px 0 0; line-height:1.55;">Le libellé FR existe car il est <strong style="color:#94a3b8;">déjà joint dans le silver</strong>.</p>
    </div>

</div>

<div class="fragment" style="display:flex; gap:12px; max-width:960px; margin:14px auto 0;">
    <div style="flex:1.1; background:#fff5f5; border:1px solid #fecaca; border-left:4px solid #e53e3e; border-radius:8px; padding:11px 15px;">
        <p style="font-size:0.58rem; color:#333; margin:0; line-height:1.65;">⚡ <strong>Le bandeau d'alerte</strong> : <code style="font-size:0.85em;">ng-if="alerteBatt[0].nb &gt; 0"</code> — il n'apparaît à l'écran <strong>que si la requête renvoie plus de zéro</strong>. La donnée pilote jusqu'à l'affichage.</p>
    </div>
    <div style="flex:1; background:#fefce8; border:1px solid #fde68a; border-left:4px solid #ca8a04; border-radius:8px; padding:11px 15px;">
        <p style="font-size:0.58rem; color:#333; margin:0; line-height:1.65;"><strong style="color:#92400e;">55 ou 41 ?</strong> « Disponible » = pas hors service (55) — ou libre à l'instant T (41) ? La définition d'un indicateur <strong>se cadre avec le métier</strong> : maïeutique, question 2.</p>
    </div>
</div>
`;

const blocFiltre = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Le vrai code, décortiqué · 4/5 — le filtre</p>
<h2 style="margin-top:0;">« Et à Meudon ? » — un clic, un WHERE</h2>
<p style="font-size:0.7rem; color:#888; margin-top:-14px; margin-bottom:12px;">La <strong>lecture C</strong> — la couverture des 8 communes. Le filtre n'est pas un menu codé en dur : c'est une requête, plus un <code>refine</code>.</p>

<div style="display:flex; gap:16px; align-items:stretch; max-width:960px; margin:0 auto;">

    <div style="flex:1.2; background:#0f172a; border-radius:10px; padding:15px 18px; display:flex; flex-direction:column; justify-content:center;">
        <p style="font-size:0.52rem; font-family:monospace; color:#e2e8f0; margin:0; line-height:2.05;">
<span style="color:#64748b;">&lt;</span><span style="color:#60a5fa;">ul</span> <span style="color:#f472b6;">ods-adv-analysis</span>=<span style="color:#86efac;">"communes"</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#f472b6;">ods-adv-analysis-select</span>=<span style="color:#86efac;">"commune, count(*) as nb"</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#f472b6;">ods-adv-analysis-group-by</span>=<span style="color:#86efac;">"commune"</span><span style="color:#64748b;">&gt;</span><br>
<br>
&nbsp;&nbsp;<span style="color:#64748b;">&lt;</span><span style="color:#60a5fa;">li</span> <span style="color:#f472b6;">ng-repeat</span>=<span style="color:#86efac;">"c in communes"</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#f472b6;">ng-click</span>=<span style="color:#86efac;">"trips.parameters['refine.commune']</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#86efac;">= c.commune"</span><span style="color:#64748b;">&gt;</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#fcd34d; font-weight:700;">{{ c.commune }} · {{ c.nb }}</span><br>
&nbsp;&nbsp;<span style="color:#64748b;">&lt;/</span><span style="color:#60a5fa;">li</span><span style="color:#64748b;">&gt;</span><br>
<span style="color:#64748b;">&lt;/</span><span style="color:#60a5fa;">ul</span><span style="color:#64748b;">&gt;</span></p>
    </div>

    <div style="flex:1; display:flex; flex-direction:column; gap:9px; justify-content:center;">
        <div class="fragment" style="background:#eff6ff; border-radius:8px; padding:10px 15px; border-left:4px solid #2563eb;">
            <p style="font-size:0.6rem; margin:0; line-height:1.65; color:#333;"><strong>Le menu s'écrit tout seul.</strong> <code style="font-size:0.85em;">group_by=commune</code> → 8 lignes avec leur compte : Boulogne 3 887, Issy 2 982… Une commune apparaît dans les données → elle apparaît dans le menu.</p>
        </div>
        <div class="fragment" style="background:#f0f9e8; border-radius:8px; padding:10px 15px; border-left:4px solid #95c11f;">
            <p style="font-size:0.6rem; margin:0; line-height:1.65; color:#333;"><strong>Le clic injecte un <code style="font-size:0.85em;">refine</code></strong> — c'est-à-dire un <code style="font-size:0.85em;">WHERE commune = 'Meudon'</code> — dans le contexte <code style="font-size:0.85em;">trips</code>.</p>
        </div>
        <div class="fragment" style="background:#faf5ff; border-radius:8px; padding:10px 15px; border-left:4px solid #9333ea;">
            <p style="font-size:0.6rem; margin:0; line-height:1.65; color:#333;"><strong>Toutes les requêtes du contexte se rejouent.</strong> Les 3 tuiles d'usage, les barres, le graphique — tout se recalcule. Un seul écran pour 8 communes.</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#1e293b; border-radius:8px; padding:11px 20px; margin:12px auto 0; max-width:960px;">
    <p style="font-size:0.72rem; color:white; margin:0; line-height:1.6; text-align:center;"><strong style="color:#fcd34d;">On ne précalcule pas 8 tableaux de bord.</strong> <span style="font-size:0.62rem; color:rgba(255,255,255,0.7);">Les questions sont enregistrées — le filtre ne change que le WHERE.</span></p>
</div>
`;

const blocTempsCarte = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:#9333ea; margin:0 0 4px; font-weight:700;">Le vrai code, décortiqué · 5/5 — le temps et la carte</p>
<h2 style="margin-top:0;">« Ça progresse ? » · « Où est la flotte ? »</h2>

<div style="display:flex; gap:14px; align-items:stretch; max-width:960px; margin:10px auto 0;">

    <div style="flex:1;">
        <div style="background:#9333ea; border-radius:9px 9px 0 0; padding:7px 14px;">
            <p style="font-size:0.56rem; font-weight:700; color:white; margin:0;">📈 Trajets par jour · 14 derniers jours</p>
        </div>
        <div style="background:#0f172a; border:2px solid #9333ea; border-top:none; border-radius:0 0 9px 9px; padding:12px 15px;">
            <p style="font-size:0.48rem; font-family:monospace; color:#93c5fd; margin:0 0 9px; line-height:2;"><span style="color:#f472b6;">select=</span><span style="color:#fcd34d;">date_format</span>(date_debut, 'YYYY-MM-dd') as jour,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#fcd34d;">count</span>(*) as nb<br><span style="color:#f472b6;">group_by=</span>jour&nbsp; <span style="color:#f472b6;">order_by=</span>jour desc&nbsp; <span style="color:#f472b6;">limit=</span>14</p>
            <p class="fragment" style="font-size:0.54rem; color:#94a3b8; margin:0; line-height:1.7; border-top:1px solid #334155; padding-top:8px;">L'astuce du dénominateur : une <strong style="color:#e2e8f0;">2ᵉ requête</strong> (<span style="font-family:monospace; color:#93c5fd;">order_by=nb desc, limit=1</span>) donne le jour record — <strong style="color:#fcd34d;">144 trajets le 23 juin</strong> — et sert d'échelle aux barres. Même la hauteur des barres est une requête.</p>
        </div>
    </div>

    <div class="fragment" style="flex:1;">
        <div style="background:#95c11f; border-radius:9px 9px 0 0; padding:7px 14px;">
            <p style="font-size:0.56rem; font-weight:700; color:white; margin:0;">🗺️ Position de la flotte — le contre-exemple</p>
        </div>
        <div style="background:#f0f9e8; border:2px solid #95c11f; border-top:none; border-radius:0 0 9px 9px; padding:12px 15px;">
            <p style="font-size:0.48rem; font-family:monospace; color:#4a7c00; margin:0 0 9px; line-height:2;">&lt;<span style="color:#2e7d32; font-weight:700;">ods-map-layer</span> context=<span style="color:#15803d;">"vehicles"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;color-by-field=<span style="color:#15803d;">"etat"</span>&gt;</p>
            <p style="font-size:0.56rem; color:#333; margin:0; line-height:1.7; border-top:1px solid #d9e8c4; padding-top:8px;">Aucun <code style="font-size:0.85em;">select</code>, aucun <code style="font-size:0.85em;">group_by</code> : la table s'affiche <strong>telle quelle</strong>, un point par scooter, coloré par état. C'est le cas <strong>« l'OLTP suffit »</strong> de la partie 2 — la carte Vélib' — en plein cœur du dashboard OLAP.</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:#1e293b; border-radius:8px; padding:12px 20px; margin:14px auto 0; max-width:960px;">
    <p style="font-size:0.72rem; color:white; margin:0; line-height:1.7; text-align:center;">
        <strong style="color:#fcd34d;">Une page, deux tables, une dizaine de questions enregistrées — pas un chiffre saisi à la main.</strong><br>
        <span style="font-size:0.62rem; color:rgba(255,255,255,0.7);">Reste à concevoir des tables qui encaissent ces requêtes : le cadrage des données, maintenant.</span>
    </p>
</div>
`;
export function Conception() {
  return (
    <>
      <section
        data-background-gradient="linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)"
        dangerouslySetInnerHTML={{ __html: intro }}
      />
      <section dangerouslySetInnerHTML={{ __html: pointArrivee }} />
      <section dangerouslySetInnerHTML={{ __html: demandeFloue }} />
      <section dangerouslySetInnerHTML={{ __html: maieutique }} />
      <section dangerouslySetInnerHTML={{ __html: anatomie }} />
      <section dangerouslySetInnerHTML={{ __html: blocUsage }} />
      <section dangerouslySetInnerHTML={{ __html: blocFlotte }} />
      <section dangerouslySetInnerHTML={{ __html: blocFiltre }} />
      <section dangerouslySetInnerHTML={{ __html: blocTempsCarte }} />
    </>
  );
}
