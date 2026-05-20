const intro = `
<div style="text-align:left; max-width:680px; margin:0 auto; color:white;">
    <p class="section-intro-label" style="color:white;">Module 2 · 15 min</p>
    <p class="section-intro-title">Les règles<br>qui changent tout</p>
    <p class="section-intro-sub">Atomicité, types, identifiants — les 3 piliers d'une donnée exploitable.</p>
</div>
`;

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
            Ex. : entité "restaurant" → nom, ville, type de cuisine, horaires d'ouverture
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
            Ex. : "Quels restaurants végétariens sont ouverts le dimanche à Lyon ?"
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
            Ex. : la ville est-elle déjà dans une table "villes" ? → FK ou champ libre ?
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
<h2 style="margin-top:0;">Exemple : concevoir la table "restaurants"</h2>

<div class="row" style="margin-top:10px; align-items:flex-start; gap:20px;">

    <div style="flex:1.1; display:flex; flex-direction:column; gap:9px;">

        <div style="background:#f0f8ff; border-radius:7px; padding:11px 14px; border-left:4px solid #009fe3;">
            <p style="font-size:0.56rem; font-weight:700; color:#009fe3; text-transform:uppercase; letter-spacing:1px; margin:0 0 4px;">① J'enregistre quoi ?</p>
            <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.6;">
                Entité : un <strong>restaurant physique</strong> — une enseigne, une adresse, un type de cuisine, des horaires.
            </p>
        </div>

        <div style="background:#f0f9e8; border-radius:7px; padding:11px 14px; border-left:4px solid #95c11f;">
            <p style="font-size:0.56rem; font-weight:700; color:#2e7d32; text-transform:uppercase; letter-spacing:1px; margin:0 0 4px;">② Pour quel usage ?</p>
            <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.6;">
                "Quels restaurants <strong>végétariens</strong> sont ouverts <strong>après 20h</strong> à <strong>Lyon</strong> ?"<br>
                → il me faut : <code>type_cuisine</code>, <code>horaire_fermeture</code>, <code>ville</code>
            </p>
        </div>

        <div style="background:#fff8e1; border-radius:7px; padding:11px 14px; border-left:4px solid #f59e0b;">
            <p style="font-size:0.56rem; font-weight:700; color:#b45309; text-transform:uppercase; letter-spacing:1px; margin:0 0 4px;">③ Déjà ailleurs ?</p>
            <p style="font-size:0.62rem; color:#333; margin:0; line-height:1.6;">
                Pas de table "villes" existante → <code>ville</code> reste un champ simple.<br>
                Table autonome, pas de FK nécessaire ici.
            </p>
        </div>

    </div>

    <div style="flex:1; display:flex; flex-direction:column; gap:10px;">

        <div class="offbeat-card card--green" style="padding:13px;">
            <p style="font-size:0.54rem; color:#1e3a5f; background:#dbe4ff; display:inline-block; padding:3px 10px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 8px;">RESTAURANT</p>
            <table class="mockup-table" style="font-size:0.5em;">
                <tr>
                    <th style="background:#1e40af; color:white;">id (PK)</th>
                    <th>nom</th>
                    <th>ville</th>
                    <th>type_cuisine</th>
                    <th>horaire_ouverture</th>
                    <th>horaire_fermeture</th>
                </tr>
                <tr>
                    <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R01</td>
                    <td>Le Potager</td><td>Lyon</td><td>végétarien</td><td>12:00</td><td>22:00</td>
                </tr>
                <tr>
                    <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R02</td>
                    <td>Chez Marco</td><td>Paris</td><td>italien</td><td>11:30</td><td>23:00</td>
                </tr>
            </table>
        </div>

        <div class="fragment" style="background:#ede9fe; border-radius:7px; padding:10px 14px; border-left:4px solid #6b21a8;">
            <p style="font-size:0.56rem; font-weight:700; color:#4c1d95; margin:0 0 5px;">🔍 Test maïeutique</p>
            <p style="font-size:0.56rem; color:#333; margin:0; line-height:1.7;">
                <code>type_cuisine</code> → filtrer par régime alimentaire ✔<br>
                <code>horaire_fermeture</code> → trouver les restaurants ouverts après 20h ✔<br>
                <code>ville</code> → restreindre à une zone géographique ✔
            </p>
        </div>

        <div class="fragment" style="background:#dcfce7; border-radius:7px; padding:10px 14px; border-left:4px solid #15803d;">
            <p style="font-size:0.56rem; font-weight:700; color:#15803d; margin:0 0 6px;">✅ Test de la phrase</p>
            <p style="font-size:0.58rem; color:#1e3a5f; margin:0 0 5px; font-style:italic; line-height:1.6;">
                "Le restaurant <strong>R01</strong> « Le Potager » est un établissement <strong>végétarien</strong> situé à <strong>Lyon</strong>, ouvert de <strong>12h00</strong> à <strong>22h00</strong>."
            </p>
            <p style="font-size:0.54rem; color:#15803d; margin:0; font-weight:600;">→ Phrase cohérente : chaque colonne a sa place. L'enregistrement est robuste.</p>
        </div>

    </div>

</div>
`;

const cadrageDejaAilleurs = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--grey-dirmob); margin:0 0 4px; font-weight:700;">Question ③ — appliquée</p>
<h2 style="margin-top:0;">J'ai déjà ces infos ailleurs ? → Jointure</h2>

<div class="row" style="margin-top:10px; align-items:flex-start; gap:16px;">

    <div style="flex:1;">
        <div class="label--bad">Sans jointure — données dupliquées</div>
        <div class="offbeat-card card--red" style="padding:13px;">
            <p style="font-size:0.5rem; color:#1e3a5f; background:#fee2e2; display:inline-block; padding:3px 10px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 8px;">reclamations</p>
            <table class="mockup-table" style="font-size:0.48em;">
                <tr><th>id</th><th>date</th><th>motif</th><th style="background:#fecaca;">numero_ligne</th><th style="background:#fecaca;">prestataire</th></tr>
                <tr><td>R001</td><td>05/03</td><td>retard</td><td style="background:#fecaca;">389</td><td style="background:#fecaca;">Keolis</td></tr>
                <tr><td>R002</td><td>07/03</td><td>avance</td><td style="background:#fecaca;">160</td><td style="background:#fecaca;">RATP</td></tr>
                <tr><td>R003</td><td>10/03</td><td>retard</td><td style="background:#fecaca;">389</td><td style="background:#fecaca;">Keolis</td></tr>
                <tr><td>R004</td><td>12/03</td><td>retard</td><td style="background:#fecaca;">389</td><td style="background:#fecaca;">Keolis</td></tr>
            </table>
            <p style="font-size:0.56rem; color:var(--red-alert); margin:7px 0 0; line-height:1.6;">
                ✖ "Keolis" répété sur chaque ligne<br>
                ✖ Si le prestataire change de nom → mettre à jour partout<br>
                ✖ Risque d'incohérence à la première faute de frappe
            </p>
        </div>
    </div>

    <div style="display:flex; align-items:center; flex-shrink:0; padding-top:50px; font-size:1.2rem; color:#009fe3;">→</div>

    <div style="flex:1;">
        <div class="label--good">Avec jointure — chaque info à un seul endroit</div>
        <div class="offbeat-card card--green" style="padding:13px;">
            <div style="display:flex; gap:10px; align-items:flex-start;">
                <div style="flex:1.1;">
                    <p style="font-size:0.5rem; color:#1e3a5f; background:#dbe4ff; display:inline-block; padding:3px 8px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 6px;">reclamations</p>
                    <table class="mockup-table" style="font-size:0.48em;">
                        <tr><th>id</th><th>date</th><th>motif</th><th style="background:#fef3c7; color:#a16207;">id_ligne</th></tr>
                        <tr><td>R001</td><td>05/03</td><td>retard</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">L1</td></tr>
                        <tr><td>R002</td><td>07/03</td><td>avance</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">L2</td></tr>
                        <tr><td>R003</td><td>10/03</td><td>retard</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">L1</td></tr>
                        <tr><td>R004</td><td>12/03</td><td>retard</td><td style="background:#fef3c7; color:#a16207; font-weight:700;">L1</td></tr>
                    </table>
                </div>
                <div style="display:flex; align-items:center; padding-top:22px; font-size:0.8rem; color:#a16207;">⟶ FK</div>
                <div style="flex:1;">
                    <p style="font-size:0.5rem; color:#155724; background:#dcfce7; display:inline-block; padding:3px 8px; border-radius:4px; font-weight:700; font-family:monospace; margin:0 0 6px;">lignes_bus</p>
                    <table class="mockup-table" style="font-size:0.48em;">
                        <tr><th style="background:#15803d; color:white;">id</th><th>numero</th><th>prestataire</th></tr>
                        <tr><td style="background:#dcfce7; color:#15803d; font-weight:700;">L1</td><td>389</td><td>Keolis</td></tr>
                        <tr><td style="background:#dcfce7; color:#15803d; font-weight:700;">L2</td><td>160</td><td>RATP</td></tr>
                    </table>
                </div>
            </div>
            <p style="font-size:0.56rem; color:#2e7d32; margin:8px 0 0; line-height:1.6;">
                ✔ "Keolis" n'existe qu'une seule fois — dans <code>lignes_bus</code><br>
                ✔ Renommer un prestataire = 1 seule mise à jour<br>
                ✔ La jointure reconstitue la vue complète à la demande
            </p>
        </div>
    </div>

</div>

<div class="separator fragment"></div>
<p class="fragment" style="font-size:0.76rem; color:#333; margin:0; text-align:center; line-height:1.7;">
    Règle : <strong>une information = un seul endroit dans la base.</strong><br>
    <span style="font-size:0.64rem; color:#888; font-style:italic;">Si tu te retrouves à recopier la même valeur sur plusieurs lignes → c'est le signal qu'une jointure est nécessaire.</span>
</p>
`;

const regleFondatrice = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 18px; font-weight:700;">La règle fondatrice</p>
<div class="big-rule" style="margin-bottom:24px;">
    <span>1 colonne</span><br>= <span>1 information</span>
</div>
<div class="row">
    <div style="flex:1;">
        <div class="label--bad">Violation</div>
        <div class="offbeat-card card--red" style="padding:12px;">
            <table class="mockup-table">
                <tr><th>motifs</th><th>intervenant</th></tr>
                <tr><td style="background:#fff3cd;">Retard + Propreté + Attitude</td><td>Dupont J. — ligne 389</td></tr>
            </table>
            <p style="font-size:0.58rem; color:var(--red-alert); margin:6px 0 0;">→ Impossible de compter les "retard"</p>
        </div>
    </div>
    <div style="flex:1;">
        <div class="label--good">Conforme</div>
        <div class="offbeat-card card--green" style="padding:12px;">
            <table class="mockup-table">
                <tr><th>motif_principal</th><th>reclamant_id</th><th>id_ligne</th></tr>
                <tr><td>retard</td><td style="color:#a16207;">2</td><td style="color:#a16207;">L1</td></tr>
            </table>
            <p style="font-size:0.58rem; color:#2e7d32; margin:6px 0 0;">→ COUNTIF(motif_principal, "retard") = 1 clic</p>
        </div>
    </div>
</div>
`;

const atomicite = `
<h2>L'atomicité en pratique</h2>
<div class="row" style="margin-bottom:18px;">
    <div style="flex:1;">
        <div class="label--bad">Avant — cellule fourre-tout</div>
        <div class="offbeat-card card--red" style="padding:13px;">
            <table class="mockup-table">
                <tr><th>id</th><th>reclamants</th><th>duree</th></tr>
                <tr><td>R001</td><td style="background:#fff3cd;">Martin, Dupont</td><td style="background:#fff3cd;">environ 12 min</td></tr>
            </table>
            <p style="font-size:0.58rem; color:var(--red-alert); margin:6px 0 0;">
                → filtrer, compter, faire une jointure : impossible.
            </p>
        </div>
    </div>
    <div style="flex:1;">
        <div class="label--good">Après — 1 valeur indivisible par cellule</div>
        <div class="offbeat-card card--green" style="padding:13px;">
            <table class="mockup-table">
                <tr><th>id</th><th>reclamant_id</th><th>duree_min</th></tr>
                <tr><td>R001</td><td style="color:#a16207;">1</td><td>12</td></tr>
                <tr><td>R002</td><td style="color:#a16207;">2</td><td>8</td></tr>
            </table>
            <p style="font-size:0.58rem; color:#2e7d32; margin:6px 0 0;">
                → AVERAGE(duree_min), filtre sur reclamant_id = immédiat.
            </p>
        </div>
    </div>
</div>
<div class="fragment" style="background:#dbe4ff; border-radius:8px; padding:13px 18px; border-left:4px solid #1e40af;">
    <p style="margin:0; font-size:0.78rem; color:#1e3a5f;">
        <strong>Test de la phrase :</strong> "La réclamation <em>R001</em> a été déposée le <em>05/03/2026</em> par le réclamant <em>1</em>, concerne la ligne <em>L1</em>, motif <em>retard</em>, statut <em>non_traite</em>."<br>
        <span style="font-size:0.9em; color:#15803d;">→ Phrase cohérente : chaque mot a sa place. C'est le signe d'une ligne robuste.</span>
    </p>
</div>
`;

const types = `
<h2>Choisir le bon type de données</h2>
<p style="font-size:0.74rem; color:#888; margin-top:-16px; margin-bottom:12px;">Le type détermine ce qu'on peut faire avec la valeur — sur la table réclamations :</p>
<div class="types-grid">
    <div class="type-card fragment">
        <div class="type-name">Texte</div>
        <div class="type-desc">Description libre</div>
        <div class="type-example">commentaire : "conducteur agressif"</div>
    </div>
    <div class="type-card fragment">
        <div class="type-name">Nombre</div>
        <div class="type-desc">Entier ou décimal, calculable</div>
        <div class="type-example">duree_min : 12</div>
    </div>
    <div class="type-card fragment">
        <div class="type-name">Date / Heure</div>
        <div class="type-desc">Triable, calculable, filtrable</div>
        <div class="type-example">date : 2026-06-01</div>
    </div>
    <div class="type-card fragment">
        <div class="type-name">Booléen</div>
        <div class="type-desc">Oui / Non — pas de nuance</div>
        <div class="type-example">sous_garantie : VRAI</div>
    </div>
    <div class="type-card fragment" style="border-left-color:var(--green-dirmob);">
        <div class="type-name" style="color:var(--green-dirmob);">Énumération</div>
        <div class="type-desc">Liste fermée de valeurs autorisées</div>
        <div class="type-example">statut : "non_traite" | "en_cours" | "traite"</div>
    </div>
    <div class="type-card fragment" style="border-left-color:#aaa;">
        <div class="type-name" style="color:#888;">NULL</div>
        <div class="type-desc">Valeur manquante — ≠ zéro, ≠ vide</div>
        <div class="type-example">date_cloture : NULL (pas encore traitée)</div>
    </div>
</div>

<div class="separator fragment"></div>
<div class="fragment" style="display:flex; gap:12px; align-items:stretch;">

    <div style="flex:1; background:#fff8e1; border-radius:8px; padding:11px 16px; border-left:4px solid #f59e0b;">
        <p style="font-size:0.64rem; font-weight:700; color:#b45309; margin:0 0 6px;">⚠ Texte libre — à utiliser en dernier recours</p>
        <p style="font-size:0.6rem; color:#333; margin:0 0 8px; line-height:1.7;">
            Dès qu'une valeur se <strong>répète</strong> (motif, statut, catégorie…) → passer à l'<strong>énumération</strong>.<br>
            Le texte libre ne se filtre pas proprement et accumule les variantes.
        </p>
        <div style="background:#fee2e2; border-radius:5px; padding:6px 10px; font-size:0.5rem; color:#b91c1c; font-family:monospace; line-height:1.8;">
            "Retard" · "retard" · "RETARD" · "retards"<br>
            <span style="color:#888;">→ 4 valeurs distinctes pour la machine</span>
        </div>
    </div>

    <div style="flex:1.3; background:#f0f9e8; border-radius:8px; padding:11px 16px; border-left:4px solid #95c11f;">
        <p style="font-size:0.64rem; font-weight:700; color:#2e7d32; margin:0 0 6px;">💡 Énumération → table de référence</p>
        <p style="font-size:0.58rem; color:#333; margin:0 0 8px; line-height:1.6;">
            Une liste fermée peut vivre dans une <strong>table de référence</strong> dédiée — chargée une fois, réutilisée partout via une FK.
        </p>
        <div style="display:flex; gap:8px; align-items:flex-start;">
            <div>
                <p style="font-size:0.46rem; color:#2e7d32; background:#dcfce7; display:inline-block; padding:2px 8px; border-radius:3px; font-weight:700; font-family:monospace; margin:0 0 5px;">motifs (référentiel)</p>
                <table class="mockup-table" style="font-size:0.44em;">
                    <tr><th>code</th><th>libelle</th></tr>
                    <tr><td>retard</td><td>Retard au départ</td></tr>
                    <tr><td>avance</td><td>Départ en avance</td></tr>
                    <tr><td>proprete</td><td>Propreté du véhicule</td></tr>
                    <tr><td>attitude</td><td>Comportement conducteur</td></tr>
                </table>
            </div>
            <div style="padding-top:20px; font-size:0.72rem; color:#95c11f; flex-shrink:0;">⟵ FK</div>
            <div>
                <p style="font-size:0.46rem; color:#1e3a5f; background:#dbe4ff; display:inline-block; padding:2px 8px; border-radius:3px; font-weight:700; font-family:monospace; margin:0 0 5px;">reclamations</p>
                <table class="mockup-table" style="font-size:0.44em;">
                    <tr><th>id</th><th style="background:#fef3c7; color:#a16207;">motif</th></tr>
                    <tr><td>R001</td><td style="color:#a16207; font-weight:700;">retard</td></tr>
                    <tr><td>R002</td><td style="color:#a16207; font-weight:700;">avance</td></tr>
                    <tr><td>R003</td><td style="color:#a16207; font-weight:700;">proprete</td></tr>
                </table>
                <p style="font-size:0.46rem; color:#2e7d32; margin:5px 0 0; font-weight:600;">Nouveau motif = 1 ligne dans le référentiel</p>
            </div>
        </div>
    </div>

</div>
`;

const identifiant = `
<h2>L'identifiant unique (clé primaire)</h2>
<div class="row">
    <div style="flex:1;">
        <p style="font-size:0.78rem; color:#666; margin-bottom:14px;">Chaque ligne doit être <strong>irréfutablement unique</strong></p>
        <div class="id-prop fragment">
            <div class="id-prop-dot"></div>
            <div>
                <strong style="font-size:0.82rem;">Unique</strong>
                <p style="margin:0; font-size:0.68rem; color:#666;">Aucune réclamation ne partage le même ID</p>
            </div>
        </div>
        <div class="id-prop fragment">
            <div class="id-prop-dot"></div>
            <div>
                <strong style="font-size:0.82rem;">Stable</strong>
                <p style="margin:0; font-size:0.68rem; color:#666;">Ne change jamais, même si la réclamation évolue</p>
            </div>
        </div>
        <div class="id-prop fragment">
            <div class="id-prop-dot" style="background:var(--green-dirmob);"></div>
            <div>
                <strong style="font-size:0.82rem;">Non signifiant</strong>
                <p style="margin:0; font-size:0.68rem; color:#666;">N'encode pas d'info → <code>R001</code>, jamais <code>Paris-389-Urgent-2026</code></p>
            </div>
        </div>
    </div>
    <div class="fragment" style="flex:1;">
        <div class="offbeat-card card--green" style="padding:14px;">
            <p style="font-size:0.58rem; color:#1e3a5f; background:#dbe4ff; margin:0 0 8px; padding:4px 8px; border-radius:4px; font-weight:700; font-family:monospace;">reclamations</p>
            <table class="mockup-table">
                <tr>
                    <th style="background:#1e40af; color:white;">id (PK)</th>
                    <th style="background:#fef3c7; color:#a16207;">reclamant_id (FK)</th>
                    <th style="background:#fef3c7; color:#a16207;">id_ligne (FK)</th>
                    <th>statut</th>
                </tr>
                <tr>
                    <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R001</td>
                    <td style="color:#a16207;">1</td><td style="color:#a16207;">L1</td><td>non_traite</td>
                </tr>
                <tr>
                    <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R002</td>
                    <td style="color:#a16207;">2</td><td style="color:#a16207;">L2</td><td>traite</td>
                </tr>
                <tr>
                    <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R003</td>
                    <td style="color:#a16207;">1</td><td style="color:#a16207;">L1</td><td>non_traite</td>
                </tr>
            </table>
            <p style="font-size:0.58rem; color:var(--blue-dirmob); margin:7px 0 0; font-weight:700;">
                ↑ PK + FK : les 2 clés qui relient les tables entre elles
            </p>
        </div>
    </div>
</div>
`;

export function Module2() {
  return (
    <>
      <section
        data-background-color="#333333"
        dangerouslySetInnerHTML={{ __html: intro }}
      />
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
