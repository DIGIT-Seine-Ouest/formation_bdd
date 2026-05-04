window.SLIDES = window.SLIDES || {};

window.SLIDES.module2 = `

<!-- ════════════════════════════════════════════════
     MODULE 2 — Règles fondatrices
════════════════════════════════════════════════ -->

<!-- 9 · SECTION MODULE 2 -->
<section data-background-color="#333333">
    <div style="text-align:left; max-width:680px; margin:0 auto; color:white;">
        <p class="section-intro-label" style="color:white;">Module 2 · 15 min</p>
        <p class="section-intro-title">Les règles<br>qui changent tout</p>
        <p class="section-intro-sub">Atomicité, types, identifiants — les 3 piliers d'une donnée exploitable.</p>
    </div>
</section>


<!-- 10 · LA RÈGLE FONDATRICE -->
<section>
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
</section>


<!-- 11 · ATOMICITÉ -->
<section>
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
            <strong>Test de la phrase :</strong> "La réclamation <em>R001</em> a été déposée le <em>05/03/2026</em> par le réclamant <em>1</em>, concerne la ligne <em>L1</em>, motif <em>retard</em>, statut <em>ouverte</em>."<br>
            <span style="font-size:0.9em; color:#15803d;">→ Phrase cohérente : chaque mot a sa place. C'est le signe d'une ligne robuste.</span>
        </p>
    </div>
</section>


<!-- 12 · TYPES DE DONNÉES -->
<section>
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
            <div class="type-example">statut : "ouverte" | "en_cours" | "cloture"</div>
        </div>
        <div class="type-card fragment" style="border-left-color:#aaa;">
            <div class="type-name" style="color:#888;">NULL</div>
            <div class="type-desc">Valeur manquante — ≠ zéro, ≠ vide</div>
            <div class="type-example">date_cloture : NULL (pas encore traitée)</div>
        </div>
    </div>
</section>


<!-- 13 · L'IDENTIFIANT UNIQUE -->
<section>
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
                        <td style="color:#a16207;">1</td><td style="color:#a16207;">L1</td><td>ouverte</td>
                    </tr>
                    <tr>
                        <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R002</td>
                        <td style="color:#a16207;">2</td><td style="color:#a16207;">L2</td><td>cloture</td>
                    </tr>
                    <tr>
                        <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">R003</td>
                        <td style="color:#a16207;">1</td><td style="color:#a16207;">L1</td><td>ouverte</td>
                    </tr>
                </table>
                <p style="font-size:0.58rem; color:var(--blue-dirmob); margin:7px 0 0; font-weight:700;">
                    ↑ PK + FK : les 2 clés qui relient les tables entre elles
                </p>
            </div>
        </div>
    </div>
</section>

`;
