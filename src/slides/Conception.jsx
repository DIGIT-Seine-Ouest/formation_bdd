// ─── Partie 3 : le pont OLTP → OLAP ──────────────────────────────────────────
// Quand le métier demande un tableau de bord. Le point d'arrivée (le TDB),
// la demande floue, la maïeutique, le cadrage, puis la structure OLTP qui
// en découle. Enchaîne sur Module2 (règles de construction).

const intro = `
<div style="text-align:left; max-width:720px; margin:0 auto; color:white;">
    <p class="section-intro-label" style="color:white;">Partie 3</p>
    <p class="section-intro-title">Le pont :<br>de l'OLTP au<br>tableau de bord</p>
    <p class="section-intro-sub">Le métier demande un tableau de bord. Comment passer des données opérationnelles à la vue qui pilote.</p>
</div>
`;

const pointArrivee = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:#9333ea; margin:0 0 4px; font-weight:700;">Le point d'arrivée</p>
<h2 style="margin-top:0;">Voilà ce que le métier veut, au fond</h2>
<p style="font-size:0.72rem; color:#888; margin-top:-14px; margin-bottom:14px;">Un écran qui répond tout seul aux questions de pilotage. Toute la formation tient dans : <em>comment on arrive là ?</em></p>

<div style="background:#0f172a; border-radius:12px; padding:16px 18px; max-width:940px; margin:0 auto;">
    <p style="font-size:0.5rem; color:#64748b; font-family:monospace; margin:0 0 10px;">📊 reclamations_dashboard · T1 2026 · mis à jour automatiquement</p>

    <div style="display:flex; gap:10px; margin-bottom:12px;">
        <div style="flex:1; background:#1e293b; border-radius:8px; padding:10px 14px; border-top:3px solid #009fe3;">
            <p style="font-size:0.44rem; color:#94a3b8; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Réclamations reçues</p>
            <p style="font-size:1.2rem; color:white; font-weight:700; margin:0; font-family:'IBM Plex Serif',serif;">128</p>
        </div>
        <div style="flex:1; background:#1e293b; border-radius:8px; padding:10px 14px; border-top:3px solid #e53e3e;">
            <p style="font-size:0.44rem; color:#94a3b8; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">% non traitées</p>
            <p style="font-size:1.2rem; color:#f87171; font-weight:700; margin:0; font-family:'IBM Plex Serif',serif;">22 %</p>
        </div>
        <div style="flex:1; background:#1e293b; border-radius:8px; padding:10px 14px; border-top:3px solid #95c11f;">
            <p style="font-size:0.44rem; color:#94a3b8; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Délai moyen de traitement</p>
            <p style="font-size:1.2rem; color:white; font-weight:700; margin:0; font-family:'IBM Plex Serif',serif;">6,2 j</p>
        </div>
        <div style="flex:1; background:#1e293b; border-radius:8px; padding:10px 14px; border-top:3px solid #f59e0b;">
            <p style="font-size:0.44rem; color:#94a3b8; margin:0 0 3px; text-transform:uppercase; letter-spacing:1px;">Prestataire le + concerné</p>
            <p style="font-size:1.2rem; color:#fcd34d; font-weight:700; margin:0; font-family:'IBM Plex Serif',serif;">Keolis</p>
        </div>
    </div>

    <div style="display:flex; gap:10px;">
        <div style="flex:1; background:#1e293b; border-radius:8px; padding:10px 12px;">
            <p style="font-size:0.46rem; color:#94a3b8; margin:0 0 6px; text-transform:uppercase; letter-spacing:1px;">Par motif</p>
            <table class="mockup-table" style="font-size:0.44em; background:transparent;">
                <tr><th style="background:#334155; color:#cbd5e1; border-color:#475569;">motif</th><th style="background:#334155; color:#cbd5e1; border-color:#475569;">nb</th></tr>
                <tr><td style="background:#0f172a; color:#e2e8f0; border-color:#334155;">retard</td><td style="background:#0f172a; color:#4ade80; border-color:#334155; font-weight:700;">61</td></tr>
                <tr><td style="background:#0f172a; color:#e2e8f0; border-color:#334155;">propreté</td><td style="background:#0f172a; color:#4ade80; border-color:#334155; font-weight:700;">34</td></tr>
                <tr><td style="background:#0f172a; color:#e2e8f0; border-color:#334155;">attitude</td><td style="background:#0f172a; color:#4ade80; border-color:#334155; font-weight:700;">33</td></tr>
            </table>
        </div>
        <div style="flex:1; background:#1e293b; border-radius:8px; padding:10px 12px;">
            <p style="font-size:0.46rem; color:#94a3b8; margin:0 0 6px; text-transform:uppercase; letter-spacing:1px;">Par prestataire · non traitées</p>
            <table class="mockup-table" style="font-size:0.44em; background:transparent;">
                <tr><th style="background:#334155; color:#cbd5e1; border-color:#475569;">prestataire</th><th style="background:#334155; color:#cbd5e1; border-color:#475569;">non traitées</th></tr>
                <tr><td style="background:#0f172a; color:#e2e8f0; border-color:#334155;">Keolis</td><td style="background:#0f172a; color:#f87171; border-color:#334155; font-weight:700;">19</td></tr>
                <tr><td style="background:#0f172a; color:#e2e8f0; border-color:#334155;">RATP</td><td style="background:#0f172a; color:#f87171; border-color:#334155; font-weight:700;">6</td></tr>
                <tr><td style="background:#0f172a; color:#e2e8f0; border-color:#334155;">Transdev</td><td style="background:#0f172a; color:#f87171; border-color:#334155; font-weight:700;">3</td></tr>
            </table>
        </div>
        <div style="flex:1.1; background:#1e293b; border-radius:8px; padding:10px 12px; display:flex; flex-direction:column; justify-content:center;">
            <p style="font-size:0.46rem; color:#94a3b8; margin:0 0 6px; text-transform:uppercase; letter-spacing:1px;">Évolution mensuelle</p>
            <div style="display:flex; align-items:flex-end; gap:6px; height:52px; padding:0 4px;">
                <div style="flex:1; background:#009fe3; height:38%; border-radius:3px 3px 0 0;"></div>
                <div style="flex:1; background:#009fe3; height:55%; border-radius:3px 3px 0 0;"></div>
                <div style="flex:1; background:#009fe3; height:47%; border-radius:3px 3px 0 0;"></div>
                <div style="flex:1; background:#f59e0b; height:78%; border-radius:3px 3px 0 0;"></div>
                <div style="flex:1; background:#009fe3; height:63%; border-radius:3px 3px 0 0;"></div>
                <div style="flex:1; background:#009fe3; height:70%; border-radius:3px 3px 0 0;"></div>
            </div>
            <p style="font-size:0.4rem; color:#64748b; margin:4px 0 0; text-align:center;">jan · fév · mar · avr · mai · juin</p>
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
    <p style="font-size:0.4rem !important; opacity:0.65; margin:0 0 6px; text-transform:uppercase; letter-spacing:2px; font-family:monospace !important; line-height:1 !important;">✉️ Mail de la directrice · lundi 9h04</p>
    <p style="font-size:1.05rem !important; line-height:1.5 !important; margin:0;">« Il me faudrait un suivi des réclamations. Vous pouvez me faire ça ? »</p>
</div>

<p style="font-size:0.7rem; color:#888; margin:0 0 10px; text-align:center;">Une même phrase, trois lectures — trois tableaux de bord <strong>incompatibles</strong> :</p>

<div class="row" style="gap:12px; align-items:stretch;">
    <div class="offbeat-card fragment" style="flex:1; padding:13px 15px;">
        <p style="font-size:0.62rem; font-weight:700; color:var(--blue-dirmob); margin:0 0 6px;">Lecture A — le volume</p>
        <p style="font-size:0.58rem; color:#333; margin:0 0 8px; line-height:1.6;">« Elle veut voir si les réclamations augmentent. »</p>
        <p style="font-size:0.52rem; color:#888; margin:0; font-family:monospace;">→ courbe mensuelle, par commune</p>
    </div>
    <div class="offbeat-card fragment card--green" style="flex:1; padding:13px 15px;">
        <p style="font-size:0.62rem; font-weight:700; color:#2e7d32; margin:0 0 6px;">Lecture B — le stock</p>
        <p style="font-size:0.58rem; color:#333; margin:0 0 8px; line-height:1.6;">« Elle veut savoir ce qui traîne sans réponse. »</p>
        <p style="font-size:0.52rem; color:#888; margin:0; font-family:monospace;">→ non traitées, délai moyen, retards</p>
    </div>
    <div class="offbeat-card fragment card--grey" style="flex:1; padding:13px 15px;">
        <p style="font-size:0.62rem; font-weight:700; color:var(--grey-dirmob); margin:0 0 6px;">Lecture C — la responsabilité</p>
        <p style="font-size:0.58rem; color:#333; margin:0 0 8px; line-height:1.6;">« Elle prépare la renégociation des contrats prestataires. »</p>
        <p style="font-size:0.52rem; color:#888; margin:0; font-family:monospace;">→ réclamations par prestataire, par ligne</p>
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
            <p style="font-size:0.55rem; color:#555; margin:0; line-height:1.6; font-style:italic;">« Si le chiffre est mauvais, vous faites quoi ? » — un KPI sans décision derrière est un chiffre décoratif.</p>
        </div>
        <div class="fragment" style="background:#f0f9e8; border-radius:8px; padding:10px 15px; border-left:4px solid #95c11f;">
            <p style="font-size:0.62rem; font-weight:700; color:#2e7d32; margin:0 0 3px;">2 · Quelle est la question, en une phrase mesurable ?</p>
            <p style="font-size:0.55rem; color:#555; margin:0; line-height:1.6; font-style:italic;">« Suivre les réclamations » → « quel prestataire concentre les réclamations non traitées ? »</p>
        </div>
        <div class="fragment" style="background:#fff8e1; border-radius:8px; padding:10px 15px; border-left:4px solid #f59e0b;">
            <p style="font-size:0.62rem; font-weight:700; color:#b45309; margin:0 0 3px;">3 · Par quoi voulez-vous découper ?</p>
            <p style="font-size:0.55rem; color:#555; margin:0; line-height:1.6; font-style:italic;">Par prestataire ? par commune ? par motif ? par mois ? — ce sont les <strong>dimensions</strong> du futur KPI.</p>
        </div>
        <div class="fragment" style="background:#faf5ff; border-radius:8px; padding:10px 15px; border-left:4px solid #9333ea;">
            <p style="font-size:0.62rem; font-weight:700; color:#7c3aed; margin:0 0 3px;">4 · À quelle fréquence, sur quelle profondeur ?</p>
            <p style="font-size:0.55rem; color:#555; margin:0; line-height:1.6; font-style:italic;">Un point mensuel en comité ? un suivi quotidien ? comparer à l'an dernier ? — fréquence &amp; historique.</p>
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
                Reformule, challenge, désambiguïse — <strong>avant</strong> d'ouvrir Excel.
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

const cadrage = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Formaliser l'accouchement</p>
<h2 style="margin-top:0;">Le cadrage : de la phrase floue au KPI spécifié</h2>

<div style="display:flex; flex-direction:column; gap:0; max-width:920px; margin:12px auto 0;">

    <div style="background:#fff5f5; border:2px solid #dc2626; border-radius:10px 10px 0 0; padding:10px 18px;">
        <p style="font-size:0.5rem; font-weight:700; color:#dc2626; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 4px;">Demande brute</p>
        <p style="font-size:0.74rem; color:#7f1d1d; margin:0; font-style:italic;">« Il me faudrait un suivi des réclamations. »</p>
    </div>

    <div class="fragment" style="background:#fefce8; border:2px solid #d97706; border-top:none; padding:10px 18px;">
        <p style="font-size:0.5rem; font-weight:700; color:#b45309; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 4px;">Après maïeutique — la question analytique validée</p>
        <p style="font-size:0.74rem; color:#78350f; margin:0; font-weight:600;">« Quel prestataire concentre les réclamations <u>non traitées</u>, par mois, sur l'année glissante ? »</p>
    </div>

    <div class="fragment" style="background:#f0fdf4; border:2px solid #15803d; border-top:none; border-radius:0 0 10px 10px; padding:12px 18px;">
        <p style="font-size:0.5rem; font-weight:700; color:#15803d; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 8px;">La spécification du KPI</p>
        <div style="display:flex; gap:10px;">
            <div style="flex:1; background:white; border-radius:7px; padding:9px 12px; border-left:3px solid #009fe3;">
                <p style="font-size:0.5rem; font-weight:700; color:#009fe3; text-transform:uppercase; letter-spacing:1px; margin:0 0 3px;">Indicateur (la mesure)</p>
                <p style="font-size:0.58rem; color:#333; margin:0; line-height:1.55; font-family:monospace;">nb de réclamations<br>où statut = non_traite</p>
            </div>
            <div style="flex:1; background:white; border-radius:7px; padding:9px 12px; border-left:3px solid #95c11f;">
                <p style="font-size:0.5rem; font-weight:700; color:#4a7c00; text-transform:uppercase; letter-spacing:1px; margin:0 0 3px;">Dimensions (les découpes)</p>
                <p style="font-size:0.58rem; color:#333; margin:0; line-height:1.55; font-family:monospace;">prestataire · mois</p>
            </div>
            <div style="flex:1; background:white; border-radius:7px; padding:9px 12px; border-left:3px solid #9333ea;">
                <p style="font-size:0.5rem; font-weight:700; color:#7c3aed; text-transform:uppercase; letter-spacing:1px; margin:0 0 3px;">Granularité (le grain)</p>
                <p style="font-size:0.58rem; color:#333; margin:0; line-height:1.55; font-family:monospace;">1 ligne = 1 réclamation</p>
            </div>
            <div style="flex:1; background:white; border-radius:7px; padding:9px 12px; border-left:3px solid #f59e0b;">
                <p style="font-size:0.5rem; font-weight:700; color:#b45309; text-transform:uppercase; letter-spacing:1px; margin:0 0 3px;">Fréquence · Historique</p>
                <p style="font-size:0.58rem; color:#333; margin:0; line-height:1.55; font-family:monospace;">mensuelle · 12 mois glissants</p>
            </div>
        </div>
    </div>

</div>

<div class="fragment" style="background:#f8fafc; border-radius:8px; padding:11px 20px; border-left:4px solid var(--blue-dirmob); margin:14px auto 0; max-width:920px;">
    <p style="font-size:0.72rem; color:#333; margin:0; line-height:1.7;">
        <strong>Indicateur + dimensions + granularité + fréquence : le contrat.</strong>
        C'est ce qu'on fait signer (au sens propre ou figuré) au métier avant de construire quoi que ce soit.
        La vue OLAP finale n'est que la mise en tableau de ce contrat.
    </p>
</div>
`;

const remonter = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:#9333ea; margin:0 0 4px; font-weight:700;">La remontée — OLAP → OLTP</p>
<h2 style="margin-top:0;">Le KPI dicte la structure de la table</h2>
<p style="font-size:0.72rem; color:#888; margin-top:-14px; margin-bottom:12px;">On lit la spécification, et chaque élément <strong>impose</strong> une exigence sur les données brutes à capter :</p>

<div style="display:flex; flex-direction:column; gap:7px; max-width:900px; margin:0 auto;">

    <div class="fragment" style="display:flex; gap:0; align-items:stretch; border-radius:8px; overflow:hidden; border:1px solid #e2e8f0;">
        <div style="flex:1; background:#faf5ff; padding:9px 15px; display:flex; align-items:center;">
            <p style="font-size:0.6rem; color:#6b21a8; margin:0; line-height:1.5;"><strong>« compter les réclamations »</strong></p>
        </div>
        <div style="background:#9333ea; padding:0 12px; display:flex; align-items:center;"><span style="color:white; font-size:0.8rem;">→</span></div>
        <div style="flex:1.6; background:white; padding:9px 15px; display:flex; align-items:center;">
            <p style="font-size:0.6rem; color:#333; margin:0; line-height:1.5;">le grain doit être <strong>1 ligne = 1 réclamation</strong> — pas un onglet par ligne de bus, pas un résumé</p>
        </div>
    </div>

    <div class="fragment" style="display:flex; gap:0; align-items:stretch; border-radius:8px; overflow:hidden; border:1px solid #e2e8f0;">
        <div style="flex:1; background:#faf5ff; padding:9px 15px; display:flex; align-items:center;">
            <p style="font-size:0.6rem; color:#6b21a8; margin:0; line-height:1.5;"><strong>« non traitées »</strong></p>
        </div>
        <div style="background:#9333ea; padding:0 12px; display:flex; align-items:center;"><span style="color:white; font-size:0.8rem;">→</span></div>
        <div style="flex:1.6; background:white; padding:9px 15px; display:flex; align-items:center;">
            <p style="font-size:0.6rem; color:#333; margin:0; line-height:1.5;">colonne <code>statut</code> en <strong>énumération fermée</strong> — pas une couleur de cellule, pas du texte libre</p>
        </div>
    </div>

    <div class="fragment" style="display:flex; gap:0; align-items:stretch; border-radius:8px; overflow:hidden; border:1px solid #e2e8f0;">
        <div style="flex:1; background:#faf5ff; padding:9px 15px; display:flex; align-items:center;">
            <p style="font-size:0.6rem; color:#6b21a8; margin:0; line-height:1.5;"><strong>« par prestataire »</strong></p>
        </div>
        <div style="background:#9333ea; padding:0 12px; display:flex; align-items:center;"><span style="color:white; font-size:0.8rem;">→</span></div>
        <div style="flex:1.6; background:white; padding:9px 15px; display:flex; align-items:center;">
            <p style="font-size:0.6rem; color:#333; margin:0; line-height:1.5;">FK <code>id_ligne</code> → table <code>lignes_bus</code> → <code>prestataires</code> — une <strong>jointure</strong>, pas une ressaisie</p>
        </div>
    </div>

    <div class="fragment" style="display:flex; gap:0; align-items:stretch; border-radius:8px; overflow:hidden; border:1px solid #e2e8f0;">
        <div style="flex:1; background:#faf5ff; padding:9px 15px; display:flex; align-items:center;">
            <p style="font-size:0.6rem; color:#6b21a8; margin:0; line-height:1.5;"><strong>« par mois, 12 mois glissants »</strong></p>
        </div>
        <div style="background:#9333ea; padding:0 12px; display:flex; align-items:center;"><span style="color:white; font-size:0.8rem;">→</span></div>
        <div style="flex:1.6; background:white; padding:9px 15px; display:flex; align-items:center;">
            <p style="font-size:0.6rem; color:#333; margin:0; line-height:1.5;">colonne <code>date</code> en <strong>type date</strong> (jamais « mars » en texte) — et on n'écrase <strong>jamais</strong> l'historique</p>
        </div>
    </div>

</div>

<div class="fragment" style="background:linear-gradient(135deg,#009fe3 0%,#0369a1 100%); border-radius:10px; padding:14px 24px; text-align:center; margin:14px auto 0; max-width:900px;">
    <p style="font-size:0.86rem; color:white; font-weight:700; margin:0 0 4px; font-family:'IBM Plex Serif',serif; line-height:1.4;">
        La table OLTP se déduit du KPI — jamais l'inverse.
    </p>
    <p style="font-size:0.64rem; color:rgba(255,255,255,0.85); margin:0;">
        C'est pour ça qu'on cadre d'abord. Reste à connaître les règles de construction — c'est la suite.
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
      <section dangerouslySetInnerHTML={{ __html: cadrage }} />
      <section dangerouslySetInnerHTML={{ __html: remonter }} />
    </>
  );
}
