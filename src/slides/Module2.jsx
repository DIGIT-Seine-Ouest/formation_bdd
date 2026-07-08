// ─── Partie 3 (suite) : les règles de construction — fil rouge Yego ──────────
// Traduire le cadrage en tables robustes : questions de conception, unicité
// de l'info, atomicité, types, identifiants — sur les données MDS Yego.

const cadrage = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--grey-dirmob); margin:0 0 4px; font-weight:700;">Avant de créer la première colonne</p>
<h2 style="margin-top:0;">Concevoir, c'est d'abord se poser les bonnes questions</h2>

<div class="row" style="margin-top:14px; align-items:stretch; gap:12px;">

    <div class="offbeat-card" style="flex:1; padding:16px; border-left:4px solid #009fe3; background:#f0f8ff;">
        <div style="width:28px; height:28px; background:#009fe3; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:10px; flex-shrink:0;">
            <span style="color:white; font-size:0.7rem; font-weight:700;">1</span>
        </div>
        <p style="font-size:0.66rem; font-weight:700; color:#1e40af; margin:0 0 6px;">J'enregistre quoi ?</p>
        <p style="font-size:0.6rem; color:#333; line-height:1.6; margin:0 0 8px;">Identifier l'<strong>entité</strong> centrale et ses <strong>attributs</strong> — ce qu'on veut savoir sur elle.</p>
        <div style="background:white; border-radius:5px; padding:6px 10px; font-size:0.54rem; color:#555; font-style:italic; line-height:1.5;">
            Ex. : entité "scooter" → immatriculation, type, batterie, état
        </div>
    </div>

    <div style="display:flex; align-items:center; flex-shrink:0; font-size:1.1rem; color:#ccc;">→</div>

    <div class="offbeat-card" style="flex:1; padding:16px; border-left:4px solid #95c11f; background:#f0f9e8;">
        <div style="width:28px; height:28px; background:#95c11f; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:10px; flex-shrink:0;">
            <span style="color:white; font-size:0.7rem; font-weight:700;">2</span>
        </div>
        <p style="font-size:0.66rem; font-weight:700; color:#2e7d32; margin:0 0 6px;">Pour quel usage ?</p>
        <p style="font-size:0.6rem; color:#333; line-height:1.6; margin:0 0 8px;">Quelles <strong>questions dois-je pouvoir répondre</strong> depuis cette table ?</p>
        <div style="background:white; border-radius:5px; padding:6px 10px; font-size:0.54rem; color:#555; font-style:italic; line-height:1.5;">
            Ex. : "Quels scooters disponibles, batterie &gt; 50 %, à Meudon ?"
        </div>
    </div>

    <div style="display:flex; align-items:center; flex-shrink:0; font-size:1.1rem; color:#ccc;">→</div>

    <div class="offbeat-card" style="flex:1; padding:16px; border-left:4px solid #f59e0b; background:#fff8e1;">
        <div style="width:28px; height:28px; background:#f59e0b; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:10px; flex-shrink:0;">
            <span style="color:white; font-size:0.7rem; font-weight:700;">3</span>
        </div>
        <p style="font-size:0.66rem; font-weight:700; color:#b45309; margin:0 0 6px;">J'ai déjà ces infos ailleurs ?</p>
        <p style="font-size:0.6rem; color:#333; line-height:1.6; margin:0 0 8px;">Si oui → <strong>jointure</strong> vers la table existante. Si non → nouvelle colonne.</p>
        <div style="background:white; border-radius:5px; padding:6px 10px; font-size:0.54rem; color:#555; font-style:italic; line-height:1.5;">
            Ex. : les communes sont déjà dans <code>ref_communes</code> → FK, pas de texte libre
        </div>
    </div>

</div>

<div class="separator fragment"></div>
<div class="fragment" style="display:flex; gap:12px; align-items:stretch;">
    <div style="flex:1.4; background:#ede9fe; border-radius:8px; padding:11px 16px; border-left:4px solid #6b21a8;">
        <p style="font-size:0.64rem; color:#4c1d95; margin:0 0 5px; font-weight:700;">🔍 Test maïeutique — pour chaque colonne envisagée :</p>
        <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.8;">
            "Quelle question concrète cette donnée me permet-elle de répondre ?"<br>
            "Puis-je me passer de cette colonne ?"<br>
            "Cette valeur peut-elle changer — et si oui, est-elle dans la bonne table ?"
        </p>
    </div>
    <div style="flex:1; background:#dcfce7; border-radius:8px; padding:11px 16px; border-left:4px solid #15803d;">
        <p style="font-size:0.64rem; color:#15803d; margin:0 0 5px; font-weight:700;">✅ Test de la phrase</p>
        <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.8;">
            Si je lis la ligne à voix haute en <strong>une phrase cohérente</strong>, l'enregistrement est robuste.<br>
            <span style="color:#888; font-style:italic;">Si la phrase "accroche" ou ne veut rien dire → la structure est à revoir.</span>
        </p>
    </div>
</div>
`;

const cadrageExemple = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--grey-dirmob); margin:0 0 4px; font-weight:700;">Cadrage appliqué</p>
<h2 style="margin-top:0;">Exemple : concevoir la table "vehicles"</h2>

<div class="row" style="margin-top:10px; align-items:flex-start; gap:20px;">

    <div style="flex:1.1; display:flex; flex-direction:column; gap:9px;">

        <div style="background:#f0f8ff; border-radius:7px; padding:11px 14px; border-left:4px solid #009fe3;">
            <p style="font-size:0.56rem; font-weight:700; color:#009fe3; text-transform:uppercase; letter-spacing:1px; margin:0 0 4px;">① J'enregistre quoi ?</p>
            <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.6;">
                Entité : un <strong>scooter physique</strong> — une immatriculation, un type, une batterie, un état.
            </p>
        </div>

        <div style="background:#f0f9e8; border-radius:7px; padding:11px 14px; border-left:4px solid #95c11f;">
            <p style="font-size:0.56rem; font-weight:700; color:#2e7d32; text-transform:uppercase; letter-spacing:1px; margin:0 0 4px;">② Pour quel usage ?</p>
            <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.6;">
                "Quels scooters <strong>disponibles</strong> avec batterie <strong>&gt; 50 %</strong> ?"<br>
                → il me faut : <code>vehicle_state</code>, <code>battery_pct</code>
            </p>
        </div>

        <div style="background:#fff8e1; border-radius:7px; padding:11px 14px; border-left:4px solid #f59e0b;">
            <p style="font-size:0.56rem; font-weight:700; color:#b45309; text-transform:uppercase; letter-spacing:1px; margin:0 0 4px;">③ Déjà ailleurs ?</p>
            <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.6;">
                L'historique des positions vit dans <code>events</code> → on ne stocke ici que la <strong>dernière</strong> position. Pas de doublon.
            </p>
        </div>

    </div>

    <div style="flex:1; display:flex; flex-direction:column; gap:10px;">

        <div class="offbeat-card card--green" style="padding:13px;">
            <p style="font-size:0.54rem; color:#1e3a5f; background:#dbe4ff; display:inline-block; padding:3px 10px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 8px;">VEHICLES</p>
            <table class="mockup-table" style="font-size:0.5em;">
                <tr>
                    <th style="background:#1e40af; color:white;">device_id (PK)</th>
                    <th>vehicle_id</th>
                    <th>vehicle_type</th>
                    <th>vehicle_state</th>
                    <th>battery_pct</th>
                </tr>
                <tr>
                    <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">d41d8cd9-…</td>
                    <td>ES024VR</td><td>moped</td><td style="color:#d97706; font-weight:600;">reserved</td><td>1.00</td>
                </tr>
                <tr>
                    <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">2d2c8394-…</td>
                    <td>GB386FP</td><td>moped</td><td style="color:#dc2626; font-weight:600;">non_operational</td><td>0.00</td>
                </tr>
            </table>
        </div>

        <div class="fragment" style="background:#ede9fe; border-radius:7px; padding:10px 14px; border-left:4px solid #6b21a8;">
            <p style="font-size:0.56rem; font-weight:700; color:#4c1d95; margin:0 0 5px;">🔍 Test maïeutique</p>
            <p style="font-size:0.56rem; color:#333; margin:0; line-height:1.7;">
                <code>vehicle_state</code> → filtrer la flotte disponible ✔<br>
                <code>battery_pct</code> → détecter les batteries à plat ✔<br>
                <code>vehicle_type</code> → utile si la flotte se diversifie (vélos ?) ✔
            </p>
        </div>

        <div class="fragment" style="background:#dcfce7; border-radius:7px; padding:10px 14px; border-left:4px solid #15803d;">
            <p style="font-size:0.56rem; font-weight:700; color:#15803d; margin:0 0 6px;">✅ Test de la phrase</p>
            <p style="font-size:0.58rem; color:#1e3a5f; margin:0 0 5px; font-style:italic; line-height:1.6;">
                "Le scooter <strong>d41d8cd9</strong>, immatriculé <strong>ES024VR</strong>, de type <strong>moped</strong>, est <strong>réservé</strong> avec <strong>100 %</strong> de batterie."
            </p>
            <p style="font-size:0.54rem; color:#15803d; margin:0; font-weight:600;">→ Phrase cohérente : chaque colonne a sa place. L'enregistrement est robuste.</p>
        </div>

    </div>

</div>
`;

const cadrageDejaAilleurs = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--grey-dirmob); margin:0 0 4px; font-weight:700;">Question ③ — appliquée</p>
<h2 style="margin-top:0;">J'ai déjà ces infos ailleurs ? → Jointure</h2>
<p style="font-size:0.68rem; color:#888; margin-top:-14px; margin-bottom:10px;">Regardez le vrai flux <code>/trips</code> : l'API <strong>répète</strong> le descriptif du scooter sur chaque trajet. Normal pour un flux — interdit pour un stockage.</p>

<div class="row" style="margin-top:6px; align-items:flex-start; gap:16px;">

    <div style="flex:1;">
        <div class="label--bad">Stocké tel quel — données dupliquées</div>
        <div class="offbeat-card card--red" style="padding:13px;">
            <p style="font-size:0.5rem; color:#1e3a5f; background:#fee2e2; display:inline-block; padding:3px 10px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 8px;">trips (brut API)</p>
            <table class="mockup-table" style="font-size:0.46em;">
                <tr><th>trip_id</th><th>duration</th><th style="background:#fecaca;">vehicle_id</th><th style="background:#fecaca;">vehicle_type</th><th style="background:#fecaca;">propulsion</th></tr>
                <tr><td>81c6a5ee…</td><td>488</td><td style="background:#fecaca;">GW268PE</td><td style="background:#fecaca;">moped</td><td style="background:#fecaca;">[electric]</td></tr>
                <tr><td>9ef71334…</td><td>1154</td><td style="background:#fecaca;">GX148JL</td><td style="background:#fecaca;">moped</td><td style="background:#fecaca;">[electric]</td></tr>
                <tr><td>0f25477d…</td><td>2188</td><td style="background:#fecaca;">GW268PE</td><td style="background:#fecaca;">moped</td><td style="background:#fecaca;">[electric]</td></tr>
            </table>
            <p style="font-size:0.56rem; color:var(--red-alert); margin:7px 0 0; line-height:1.6;">
                ✖ Le descriptif du scooter recopié sur ses 500 trajets<br>
                ✖ Le scooter change de plaque → 500 lignes à corriger<br>
                ✖ Une incohérence à la première divergence
            </p>
        </div>
    </div>

    <div style="display:flex; align-items:center; flex-shrink:0; padding-top:50px; font-size:1.2rem; color:#009fe3;">→</div>

    <div style="flex:1;">
        <div class="label--good">Normalisé — chaque info à un seul endroit</div>
        <div class="offbeat-card card--green" style="padding:13px;">
            <div style="display:flex; gap:10px; align-items:flex-start;">
                <div style="flex:1.1;">
                    <p style="font-size:0.5rem; color:#1e3a5f; background:#dbe4ff; display:inline-block; padding:3px 8px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 6px;">trips</p>
                    <table class="mockup-table" style="font-size:0.46em;">
                        <tr><th>trip_id</th><th>duration</th><th style="background:#fef3c7; color:#a16207;">device_id</th></tr>
                        <tr><td>81c6a5ee…</td><td>488</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">55563844…</td></tr>
                        <tr><td>9ef71334…</td><td>1154</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">05ee45de…</td></tr>
                        <tr><td>0f25477d…</td><td>2188</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">55563844…</td></tr>
                    </table>
                </div>
                <div style="display:flex; align-items:center; padding-top:22px; font-size:0.8rem; color:#a16207;">⟶ FK</div>
                <div style="flex:1;">
                    <p style="font-size:0.5rem; color:#155724; background:#dcfce7; display:inline-block; padding:3px 8px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 6px;">vehicles</p>
                    <table class="mockup-table" style="font-size:0.46em;">
                        <tr><th style="background:#15803d; color:white;">device_id</th><th>vehicle_id</th><th>type</th></tr>
                        <tr><td style="background:#dcfce7; color:#15803d; font-weight:700;">55563844…</td><td>GW268PE</td><td>moped</td></tr>
                        <tr><td style="background:#dcfce7; color:#15803d; font-weight:700;">05ee45de…</td><td>GX148JL</td><td>moped</td></tr>
                    </table>
                </div>
            </div>
            <p style="font-size:0.56rem; color:#2e7d32; margin:8px 0 0; line-height:1.6;">
                ✔ Le descriptif n'existe qu'une fois — dans <code>vehicles</code><br>
                ✔ Changement de plaque = 1 seule mise à jour<br>
                ✔ La jointure reconstitue la vue complète à la demande
            </p>
        </div>
    </div>

</div>

<div class="separator fragment"></div>
<p class="fragment" style="font-size:0.76rem; color:#333; margin:0; text-align:center; line-height:1.7;">
    Règle : <strong>une information = un seul endroit dans la base.</strong><br>
    <span style="font-size:0.64rem; color:#888; font-style:italic;">Un flux d'API peut dénormaliser (il transporte) — le stockage, lui, normalise. C'est un des « T » du chargement.</span>
</p>
`;

const regleFondatrice = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 18px; font-weight:700;">La règle fondatrice</p>
<div class="big-rule" style="margin-bottom:24px;">
    <span>1 colonne</span><br>= <span>1 information</span>
</div>
<div class="row">
    <div style="flex:1;">
        <div class="label--bad">Violation — et elle vient de la vraie API</div>
        <div class="offbeat-card card--red" style="padding:12px;">
            <table class="mockup-table">
                <tr><th>vehicle_id</th><th>event_types</th></tr>
                <tr><td>GA019TM</td><td style="background:#fff3cd;">[trip_end, battery_low]</td></tr>
            </table>
            <p style="font-size:0.58rem; color:var(--red-alert); margin:6px 0 0;">→ Impossible de compter les "battery_low" : la valeur est noyée dans une liste</p>
        </div>
    </div>
    <div style="flex:1;">
        <div class="label--good">Conforme — éclaté au chargement</div>
        <div class="offbeat-card card--green" style="padding:12px;">
            <table class="mockup-table">
                <tr><th>vehicle_id</th><th>event_type</th></tr>
                <tr><td>GA019TM</td><td>trip_end</td></tr>
                <tr><td>GA019TM</td><td>battery_low</td></tr>
            </table>
            <p style="font-size:0.58rem; color:#2e7d32; margin:6px 0 0;">→ COUNT(event_type = "battery_low") = 1 clic · 1 ligne par fait</p>
        </div>
    </div>
</div>
<div class="fragment" style="background:#fff8e1; border-radius:8px; padding:10px 18px; border-left:4px solid #f59e0b; margin-top:14px;">
    <p style="font-size:0.7rem; color:#444; margin:0; line-height:1.6;">
        Même les API professionnelles charrient des listes dans une cellule — <strong>c'est au chargement qu'on les éclate</strong>, pas au moment de l'analyse.
    </p>
</div>
`;

const atomicite = `
<h2>L'atomicité en pratique</h2>
<div class="row" style="margin-bottom:18px;">
    <div style="flex:1;">
        <div class="label--bad">Avant — cellule fourre-tout</div>
        <div class="offbeat-card card--red" style="padding:13px;">
            <table class="mockup-table">
                <tr><th>trip</th><th>infos</th></tr>
                <tr><td>81c6a5ee…</td><td style="background:#fff3cd;">GW268PE — Meudon, ~15 min</td></tr>
            </table>
            <p style="font-size:0.58rem; color:var(--red-alert); margin:6px 0 0;">
                → filtrer par commune, moyenner les durées, joindre : impossible.
            </p>
        </div>
    </div>
    <div style="flex:1;">
        <div class="label--good">Après — 1 valeur indivisible par cellule</div>
        <div class="offbeat-card card--green" style="padding:13px;">
            <table class="mockup-table">
                <tr><th>trip_id</th><th>vehicle_id</th><th>commune</th><th>duree_s</th></tr>
                <tr><td>81c6a5ee…</td><td style="color:#a16207;">GW268PE</td><td>Meudon</td><td>892</td></tr>
                <tr><td>9ef71334…</td><td style="color:#a16207;">GX148JL</td><td>Issy</td><td>1154</td></tr>
            </table>
            <p style="font-size:0.58rem; color:#2e7d32; margin:6px 0 0;">
                → AVG(duree_s), GROUP BY commune = immédiat.
            </p>
        </div>
    </div>
</div>
<div class="fragment" style="background:#dbe4ff; border-radius:8px; padding:13px 18px; border-left:4px solid #1e40af;">
    <p style="margin:0; font-size:0.78rem; color:#1e3a5f;">
        <strong>Test de la phrase :</strong> "Le trajet <em>81c6a5ee</em> du scooter <em>GW268PE</em> est parti de <em>Meudon</em> et a duré <em>892 secondes</em>."<br>
        <span style="font-size:0.9em; color:#15803d;">→ Phrase cohérente : chaque mot a sa place. C'est le signe d'une ligne robuste.</span>
    </p>
</div>
`;

const types = `
<h2>Choisir le bon type de données</h2>
<p style="font-size:0.74rem; color:#888; margin-top:-16px; margin-bottom:12px;">Le type détermine ce qu'on peut faire avec la valeur — sur les tables Yego :</p>
<div class="types-grid">
    <div class="type-card fragment">
        <div class="type-name">Texte</div>
        <div class="type-desc">Description libre</div>
        <div class="type-example">note_maintenance : "rétroviseur cassé"</div>
    </div>
    <div class="type-card fragment">
        <div class="type-name">Nombre</div>
        <div class="type-desc">Entier ou décimal, calculable</div>
        <div class="type-example">trip_distance : 2406 &nbsp;·&nbsp; battery_pct : 0.68</div>
    </div>
    <div class="type-card fragment">
        <div class="type-name">Date / Heure</div>
        <div class="type-desc">Triable, calculable — ⚠ l'API livre de l'epoch ms</div>
        <div class="type-example">1762278723000 → 2026-06-14 17:52:03</div>
    </div>
    <div class="type-card fragment">
        <div class="type-name">Booléen</div>
        <div class="type-desc">Oui / Non — pas de nuance</div>
        <div class="type-example">electrique : VRAI</div>
    </div>
    <div class="type-card fragment" style="border-left-color:var(--green-dirmob);">
        <div class="type-name" style="color:var(--green-dirmob);">Énumération</div>
        <div class="type-desc">Liste fermée de valeurs autorisées</div>
        <div class="type-example">vehicle_state : available | reserved | on_trip | non_operational</div>
    </div>
    <div class="type-card fragment" style="border-left-color:#aaa;">
        <div class="type-name" style="color:#888;">NULL</div>
        <div class="type-desc">Valeur manquante — ≠ zéro, ≠ vide</div>
        <div class="type-example">end_time : NULL (trajet en cours) · trip_id : NULL (hors course)</div>
    </div>
</div>

<div class="separator fragment"></div>
<div class="fragment" style="display:flex; gap:12px; align-items:stretch;">

    <div style="flex:1; background:#fff8e1; border-radius:8px; padding:11px 16px; border-left:4px solid #f59e0b;">
        <p style="font-size:0.64rem; font-weight:700; color:#b45309; margin:0 0 6px;">⚠ Texte libre — à utiliser en dernier recours</p>
        <p style="font-size:0.6rem; color:#333; margin:0 0 8px; line-height:1.7;">
            Dès qu'une valeur se <strong>répète</strong> (état, type, motif…) → passer à l'<strong>énumération</strong>.<br>
            Le texte libre ne se filtre pas proprement et accumule les variantes.
        </p>
        <div style="background:#fee2e2; border-radius:5px; padding:6px 10px; font-size:0.5rem; color:#b91c1c; font-family:monospace; line-height:1.8;">
            "dispo" · "Disponible" · "available" · "OK"<br>
            <span style="color:#888;">→ 4 valeurs distinctes pour la machine</span>
        </div>
    </div>

    <div style="flex:1.3; background:#f0f9e8; border-radius:8px; padding:11px 16px; border-left:4px solid #95c11f;">
        <p style="font-size:0.64rem; font-weight:700; color:#2e7d32; margin:0 0 6px;">💡 Énumération → table de référence</p>
        <p style="font-size:0.58rem; color:#333; margin:0 0 8px; line-height:1.6;">
            La liste fermée vit dans une <strong>table de référence</strong> — chargée une fois, réutilisée partout via une FK.
        </p>
        <div style="display:flex; gap:8px; align-items:flex-start;">
            <div>
                <p style="font-size:0.46rem; color:#2e7d32; background:#dcfce7; display:inline-block; padding:2px 8px; border-radius:3px; font-weight:700; font-family:monospace; margin:0 0 5px;">ref_etats (référentiel)</p>
                <table class="mockup-table" style="font-size:0.44em;">
                    <tr><th>code</th><th>libelle</th></tr>
                    <tr><td>available</td><td>Disponible</td></tr>
                    <tr><td>reserved</td><td>Réservé</td></tr>
                    <tr><td>on_trip</td><td>En course</td></tr>
                    <tr><td>non_operational</td><td>Hors service</td></tr>
                </table>
            </div>
            <div style="padding-top:20px; font-size:0.72rem; color:#95c11f; flex-shrink:0;">⟵ FK</div>
            <div>
                <p style="font-size:0.46rem; color:#1e3a5f; background:#dbe4ff; display:inline-block; padding:2px 8px; border-radius:3px; font-weight:700; font-family:monospace; margin:0 0 5px;">events</p>
                <table class="mockup-table" style="font-size:0.44em;">
                    <tr><th>vehicle_id</th><th style="background:#fef3c7; color:#a16207;">vehicle_state</th></tr>
                    <tr><td>ES024VR</td><td style="color:#a16207; font-weight:700;">reserved</td></tr>
                    <tr><td>GB386FP</td><td style="color:#a16207; font-weight:700;">non_operational</td></tr>
                    <tr><td>GA019TM</td><td style="color:#a16207; font-weight:700;">on_trip</td></tr>
                </table>
                <p style="font-size:0.46rem; color:#2e7d32; margin:5px 0 0; font-weight:600;">Nouvel état = 1 ligne dans le référentiel</p>
            </div>
        </div>
    </div>

</div>
`;

const identifiant = `
<h2>L'identifiant unique (clé primaire)</h2>
<div class="row">
    <div style="flex:1;">
        <p style="font-size:0.78rem; color:#666; margin-bottom:14px;">Yego fournit <strong>deux</strong> identifiants — un seul est une bonne PK :</p>
        <div class="id-prop fragment">
            <div class="id-prop-dot"></div>
            <div>
                <strong style="font-size:0.82rem;">Unique</strong>
                <p style="margin:0; font-size:0.68rem; color:#666;">Aucun scooter ne partage le même <code>device_id</code></p>
            </div>
        </div>
        <div class="id-prop fragment">
            <div class="id-prop-dot"></div>
            <div>
                <strong style="font-size:0.82rem;">Stable</strong>
                <p style="margin:0; font-size:0.68rem; color:#666;">Le <code>device_id</code> ne change jamais — la plaque <code>vehicle_id</code>, si (réimmatriculation)</p>
            </div>
        </div>
        <div class="id-prop fragment">
            <div class="id-prop-dot" style="background:var(--green-dirmob);"></div>
            <div>
                <strong style="font-size:0.82rem;">Non signifiant</strong>
                <p style="margin:0; font-size:0.68rem; color:#666;">Un uuid n'encode rien → <code>d41d8cd9-…</code>, jamais <code>MEUDON-MOPED-01</code></p>
            </div>
        </div>
    </div>
    <div class="fragment" style="flex:1;">
        <div class="offbeat-card card--green" style="padding:14px;">
            <p style="font-size:0.58rem; color:#1e3a5f; background:#dbe4ff; margin:0 0 8px; padding:4px 8px; border-radius:4px; font-weight:700; font-family:monospace;">trips</p>
            <table class="mockup-table">
                <tr>
                    <th style="background:#1e40af; color:white;">trip_id (PK)</th>
                    <th style="background:#fef3c7; color:#a16207;">device_id (FK)</th>
                    <th>duration</th>
                    <th>distance</th>
                </tr>
                <tr>
                    <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">81c6a5ee-…</td>
                    <td style="color:#a16207;">55563844-…</td><td>488</td><td>1556</td>
                </tr>
                <tr>
                    <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">9ef71334-…</td>
                    <td style="color:#a16207;">05ee45de-…</td><td>1154</td><td>3820</td>
                </tr>
            </table>
            <p style="font-size:0.58rem; color:var(--blue-dirmob); margin:7px 0 0; font-weight:700;">
                ↑ PK + FK : les 2 clés qui relient les tables — exactement ce que fait l'API MDS
            </p>
        </div>
    </div>
</div>
`;

export function Module2() {
  return (
    <>
      <section dangerouslySetInnerHTML={{ __html: cadrage }} />
      <section dangerouslySetInnerHTML={{ __html: cadrageExemple }} />
      <section dangerouslySetInnerHTML={{ __html: cadrageDejaAilleurs }} />
      <section dangerouslySetInnerHTML={{ __html: regleFondatrice }} />
      <section dangerouslySetInnerHTML={{ __html: atomicite }} />
      <section dangerouslySetInnerHTML={{ __html: types }} />
      <section dangerouslySetInnerHTML={{ __html: identifiant }} />
    </>
  );
}
