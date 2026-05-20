const titre = `
<div style="max-width:820px; margin:0 auto;">
    <div style="
        background:rgba(255,255,255,0.96);
        padding:50px 60px 44px;
        border-radius:4px 4px 16px 16px;
        box-shadow:0 28px 70px rgba(0,0,0,0.25);
        border-top:5px solid #009fe3;
        position:relative; overflow:hidden;">

        <div aria-hidden="true" style="
            position:absolute; top:0; right:0;
            width:0; height:0; border-style:solid;
            border-width:0 110px 110px 0;
            border-color:transparent rgba(149,193,31,0.08) transparent transparent;
            pointer-events:none;"></div>

        <p style="
            position:relative; z-index:1;
            font-size:0.66rem; text-transform:uppercase;
            letter-spacing:4px; color:#009fe3;
            margin:0 0 12px; font-weight:700;">
            DIRMOB — Formation · 2026</p>

        <h1 style="
            position:relative; z-index:1;
            margin:0; line-height:1.08; font-size:2.8rem;">
            Vers des données<br>robustes</h1>

        <div style="
            position:relative; z-index:1;
            width:56px; height:3px; margin:18px 0 20px;
            background:linear-gradient(90deg, #009fe3, #95c11f);
            border-radius:2px;"></div>

        <p style="
            position:relative; z-index:1;
            font-family:'IBM Plex Serif',serif;
            font-size:1rem; color:#666;
            margin:0 0 20px; line-height:1.6;">
            Structurer ses données pour qu'elles soient exploitables — pas seulement lisibles.
        </p>

        <span style="
            position:relative; z-index:1;
            display:inline-block;
            background:#f0f4f8; color:#888;
            font-size:0.64rem; font-family:monospace;
            padding:5px 14px; border-radius:20px; letter-spacing:1px;">
            2 h · 45 min théorie · 1h15 pratique</span>
    </div>
</div>
`;

const enjeu = `
<p style="font-size:0.54rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">L'enjeu</p>
<h2 style="margin:0 0 3px; font-size:1.3rem; line-height:1.25;">Excel est permissif. Une base robuste, elle, répond.</h2>
<p style="font-size:0.65rem; color:#888; margin:0 0 10px;">La base robuste est celle qui tient face aux questions que vous n'aviez pas anticipées au moment de la saisie.</p>

<div class="row" style="align-items:stretch; gap:11px;">

    <!-- LEFT : Excel permissif -->
    <div style="flex:1; display:flex; flex-direction:column; border-radius:8px; overflow:hidden; border:2px solid #dc2626;">
        <div style="background:#dc2626; padding:6px 12px;">
            <p style="font-size:0.63rem; font-weight:700; color:white; margin:0;">❌ Excel permissif — chacun sa convention</p>
        </div>
        <div style="background:#fff5f5; padding:9px 11px; flex:1; display:flex; flex-direction:column; gap:5px;">
            <table class="mockup-table" style="font-size:0.45em;">
                <tr>
                    <th style="background:#fef9c3;">Date</th>
                    <th style="background:#fef9c3;">Voyageur / Contact</th>
                    <th style="background:#fef9c3;">Ligne / Prestataire</th>
                    <th style="background:#fef9c3;">Problème</th>
                </tr>
                <tr style="background:#ffcdd2;">
                    <td>05/03/2026</td>
                    <td>Martin · j.martin@…</td>
                    <td>389 – Keolis</td>
                    <td>retard 10 min</td>
                </tr>
                <tr style="background:#c8e6c9;">
                    <td>07/03/2026</td>
                    <td>a.dupont@…</td>
                    <td>160 – RATP</td>
                    <td>avance</td>
                </tr>
                <tr style="background:#ffcdd2;">
                    <td>10/03/2026</td>
                    <td>Nguyen · 0612 34 56 78</td>
                    <td>389 – Keolis</td>
                    <td>Retard de 10mn</td>
                </tr>
                <tr style="background:#ffcdd2;">
                    <td>03/06/2026</td>
                    <td>n.durand@…</td>
                    <td>389 – Keolis</td>
                    <td>En retard (~10 min)</td>
                </tr>
            </table>
            <p style="font-size:0.41rem; color:#b91c1c; margin:0; font-style:italic; line-height:1.6;">🔴 ligne rouge = non traité &nbsp;·&nbsp; 🟢 verte = traité — statut lisible par l'humain, invisible pour Excel</p>
            <div class="fragment" style="display:flex; flex-direction:column; gap:4px; border-top:1px solid #fca5a5; padding-top:5px;">
                <p style="font-size:0.46rem; font-weight:700; color:#dc2626; margin:0 0 2px;">Test de robustesse — 3 questions imprévues :</p>
                <div style="background:#fee2e2; border-radius:5px; padding:5px 9px;">
                    <p style="font-size:0.43rem; color:#7f1d1d; margin:0; line-height:1.85;"><strong>Traité / non traité :</strong> statut encodé par la couleur de la ligne — combien de réclamations encore en attente ? <em>Excel ne peut pas filtrer une couleur.</em></p>
                </div>
                <div style="background:#fee2e2; border-radius:5px; padding:5px 9px;">
                    <p style="font-size:0.43rem; color:#7f1d1d; margin:0; line-height:1.85;"><strong>Le prestataire de la ligne 389 change le 1<sup>er</sup> juin.</strong> La dernière réclamation (03/06) est arrivée après — qui appeler ?<br>→ "389 – Keolis" figé dans chaque cellule. <em>Aucun contrat centralisé.</em></p>
                </div>
                <div style="background:#fee2e2; border-radius:5px; padding:5px 9px;">
                    <p style="font-size:0.43rem; color:#7f1d1d; margin:0; line-height:1.85;"><strong>Combien de réclamations pour motif 'retard' ?</strong><br>→ "retard 10 min" ≠ "Retard de 10mn" ≠ "En retard (~10 min)". <em>Texte libre, chacun sa saisie — COUNTIF impossible.</em></p>
                </div>
            </div>
        </div>
    </div>

    <div style="display:flex; align-items:center; padding:0 3px; font-size:1.7rem; color:#009fe3; flex-shrink:0;">→</div>

    <!-- RIGHT : Structure robuste -->
    <div class="fragment" style="flex:1.1; display:flex; flex-direction:column; border-radius:8px; overflow:hidden; border:2px solid #15803d;">
        <div style="background:#15803d; padding:6px 12px;">
            <p style="font-size:0.63rem; font-weight:700; color:white; margin:0;">✔ Structure robuste — elle répond à tout</p>
        </div>
        <div style="background:#f0fdf4; padding:9px 11px; flex:1; display:flex; flex-direction:column; gap:5px;">

            <!-- Scénario -->
            <p style="font-size:0.43rem; background:#fef9c3; border-left:3px solid #d97706; padding:4px 9px; border-radius:0 4px 4px 0; margin:0; color:#78350f; font-weight:600;">Scénario : réclamation R005 reçue le <strong>03/06/2026</strong> sur la ligne 389 — qui appeler ?</p>

            <!-- Ligne 1 : reclamations + prestataires -->
            <div style="display:grid; grid-template-columns:1.35fr 1fr; gap:6px;">
                <div>
                    <p style="font-size:0.39rem; font-weight:700; color:#1e40af; font-family:monospace; margin:0 0 2px;">reclamations &nbsp;<span style="font-weight:400; color:#888; font-style:italic;">motif = liste déroulante</span></p>
                    <table class="mockup-table" style="font-size:0.37em;">
                        <tr>
                            <th style="background:#1e40af; color:white;">id</th>
                            <th>date</th>
                            <th style="background:#fef3c7; color:#a16207;">id_ligne</th>
                            <th>motif</th>
                            <th>statut</th>
                        </tr>
                        <tr style="opacity:0.35;"><td>R001</td><td>05/03/2026</td><td>L1</td><td>retard</td><td style="color:#dc2626;">non_traite</td></tr>
                        <tr style="opacity:0.35;"><td>R004</td><td>10/03/2026</td><td>L1</td><td>retard</td><td style="color:#dc2626;">non_traite</td></tr>
                        <tr style="background:#fef9c3; outline:2px solid #d97706; outline-offset:-1px;">
                            <td style="color:#1e40af; font-weight:700;">R005</td>
                            <td style="color:#d97706; font-weight:700;">03/06/2026</td>
                            <td style="background:#fef3c7; color:#a16207; font-weight:700;">L1</td>
                            <td style="color:#15803d; font-weight:700;">retard</td>
                            <td style="color:#dc2626; font-weight:700;">non_traite</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <p style="font-size:0.4rem; font-weight:700; color:#9333ea; font-family:monospace; margin:0 0 2px;">prestataires</p>
                    <table class="mockup-table" style="font-size:0.37em;">
                        <tr>
                            <th style="background:#9333ea; color:white;">id</th>
                            <th>nom</th>
                            <th>telephone</th>
                            <th>debut</th>
                            <th>fin</th>
                        </tr>
                        <tr style="opacity:0.35;">
                            <td style="color:#9333ea;">P1</td><td>RATP Dev</td><td>01 58 78…</td>
                            <td>01/01/20</td><td style="color:#dc2626; font-weight:600;">31/05/26</td>
                        </tr>
                        <tr style="background:#dcfce7; outline:2px solid #15803d; outline-offset:-1px;">
                            <td style="color:#9333ea; font-weight:700;">P2</td>
                            <td style="color:#15803d; font-weight:700;">Keolis</td>
                            <td style="color:#15803d; font-weight:700;">03 20 16…</td>
                            <td style="color:#15803d; font-weight:700;">01/06/26</td>
                            <td style="color:#888;">—</td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- Ligne 2 : lignes_bus + chaîne RECHERCHEV -->
            <div style="display:grid; grid-template-columns:0.65fr 1fr; gap:6px; align-items:start;">
                <div>
                    <p style="font-size:0.4rem; font-weight:700; color:#6b21a8; font-family:monospace; margin:0 0 2px;">lignes_bus</p>
                    <table class="mockup-table" style="font-size:0.37em;">
                        <tr>
                            <th style="background:#6b21a8; color:white;">id</th>
                            <th>num.</th>
                            <th style="color:#9333ea;">id_presta</th>
                        </tr>
                        <tr style="background:#fef9c3; outline:2px solid #d97706; outline-offset:-1px;">
                            <td style="color:#a16207; font-weight:700;">L1</td>
                            <td>389</td>
                            <td style="color:#9333ea; font-weight:700;">P2</td>
                        </tr>
                        <tr style="opacity:0.35;"><td>L2</td><td>160</td><td>P1</td></tr>
                    </table>
                </div>
                <!-- Chaîne RECHERCHEV -->
                <div style="background:#1e3a5f; border-radius:6px; padding:7px 10px;">
                    <p style="font-size:0.38rem; color:#93c5fd; font-weight:700; margin:0 0 4px; text-transform:uppercase; letter-spacing:1px;">Prestataire — jointure du pauvre</p>
                    <p style="font-size:0.37rem; font-family:monospace; color:#dbeafe; margin:0; line-height:2.2;">
                        R005.id_ligne = <span style="background:rgba(252,211,77,0.2); color:#fcd34d; font-weight:700; padding:0 3px; border-radius:2px;">L1</span><br>
                        <span style="color:#64748b;">↳</span> lignes_bus[<span style="color:#fcd34d;">L1</span>].id_presta = <span style="background:rgba(196,181,253,0.15); color:#c4b5fd; font-weight:700; padding:0 3px; border-radius:2px;">P2</span><br>
                        <span style="color:#64748b;">↳</span> prestataires[<span style="color:#c4b5fd;">P2</span>] = <span style="color:#6ee7b7; font-weight:700;">Keolis</span><br>
                        <span style="color:#64748b;">↳</span> telephone = <span style="color:#6ee7b7; font-weight:700;">03 20 16…</span>
                    </p>
                    <p style="font-size:0.39rem; color:#6ee7b7; font-weight:700; margin:4px 0 0; border-top:1px solid rgba(255,255,255,0.1); padding-top:3px;">Contrat Keolis valide depuis 01/06/26. Vous appelez Keolis.</p>
                </div>
            </div>

            <!-- Réponses statut + motif -->
            <div style="display:flex; gap:5px; border-top:1px solid #bbf7d0; padding-top:5px;">
                <div style="flex:1; background:#dcfce7; border-radius:5px; padding:5px 8px;">
                    <p style="font-size:0.4rem; color:#14532d; margin:0; line-height:1.9;"><strong>Traité / non traité :</strong><br><code style="background:#bbf7d0; padding:0 3px; border-radius:2px;">=COUNTIF(statut,"non_traite")</code><br>→ <strong>3 en attente</strong> — colonne texte : filtrable, triable, graphable.</p>
                </div>
                <div style="flex:1; background:#dcfce7; border-radius:5px; padding:5px 8px;">
                    <p style="font-size:0.4rem; color:#14532d; margin:0; line-height:1.9;"><strong>Motif retard :</strong><br><code style="background:#bbf7d0; padding:0 3px; border-radius:2px;">=COUNTIF(motif,"retard")</code> → <strong>3</strong><br>La liste déroulante force le choix parmi <em>retard · avance · suppression</em> : valeur toujours uniforme.</p>
                </div>
            </div>

        </div>
    </div>

</div>
`;

const workflow = `
<p style="font-size:0.54rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Travail d'équipe</p>
<h2 style="margin:0 0 3px; font-size:1.25rem; line-height:1.25;">Chacun alimente sa table — RECHERCHEV fait le lien</h2>
<p style="font-size:0.62rem; color:#888; margin:0 0 9px;">Comme chez Adam Smith : chaque spécialiste enrichit sa partie, l'ensemble est plus fort.</p>

<div class="row" style="gap:14px; align-items:flex-start;">

    <!-- GAUCHE : 3 tables simples -->
    <div style="flex:1; display:flex; flex-direction:column; gap:7px;">

        <div class="offbeat-card card--green" style="padding:8px 12px;">
            <p style="font-size:0.43rem; font-weight:700; color:var(--green-dirmob); margin:0 0 5px; text-transform:uppercase; letter-spacing:1px;">👩‍💼 Sophie — prestataires</p>
            <table class="mockup-table" style="font-size:0.38em;">
                <tr><th>id</th><th>nom</th><th>téléphone</th></tr>
                <tr style="background:#e8f5e9;">
                    <td style="font-weight:700;">P3</td>
                    <td style="font-weight:700;">Transdev</td>
                    <td style="font-weight:700;">04 76 48 00 00</td>
                </tr>
            </table>
        </div>

        <div class="offbeat-card" style="padding:8px 12px;">
            <p style="font-size:0.43rem; font-weight:700; color:var(--blue-dirmob); margin:0 0 5px; text-transform:uppercase; letter-spacing:1px;">👨‍💻 Thomas — lignes_bus</p>
            <table class="mockup-table" style="font-size:0.38em;">
                <tr><th>id</th><th>numero</th><th>id_presta</th></tr>
                <tr style="background:#e3f2fd;">
                    <td style="font-weight:700;">bus_123</td>
                    <td>123</td>
                    <td style="font-weight:700; color:var(--green-dirmob);">P3</td>
                </tr>
            </table>
        </div>

        <div class="offbeat-card card--grey" style="padding:8px 12px;">
            <p style="font-size:0.43rem; font-weight:700; color:var(--grey-dirmob); margin:0 0 5px; text-transform:uppercase; letter-spacing:1px;">🧑‍💼 Vous — reclamations</p>
            <table class="mockup-table" style="font-size:0.38em;">
                <tr><th>id</th><th>date</th><th>id_ligne</th><th>nom</th><th>telephone</th><th>statut</th></tr>
                <tr style="background:#e3f2fd;">
                    <td style="font-weight:700;">R156</td>
                    <td>10/01/2030</td>
                    <td style="font-weight:700; color:var(--blue-dirmob);">bus_123</td>
                    <td>Marc Dubois</td>
                    <td>06 12 34 56 78</td>
                    <td style="color:var(--red-alert); font-weight:700;">non_traite</td>
                </tr>
            </table>
        </div>

    </div>

    <!-- DROITE : Scénario -->
    <div style="flex:1.1; display:flex; flex-direction:column; gap:8px;">

        <div class="citation" style="padding:12px 16px !important; margin:0;">
            <p style="font-size:0.37rem !important; opacity:0.65; margin:0 0 5px; text-transform:uppercase; letter-spacing:2px; font-family:monospace !important; line-height:1 !important;">📞 10 janvier 2030 · 14h32 — appel entrant</p>
            <p style="font-size:0.64rem !important; line-height:1.5 !important; margin:0 0 4px;">"J'ai oublié ma bague de fiançailles dans le bus 123… Ma copine va m'allumer !"</p>
            <p style="font-size:0.39rem !important; opacity:0.65; margin:0; font-family:monospace !important; line-height:1 !important;">— Marc Dubois · 06 12 34 56 78</p>
        </div>

        <!-- Vue jointe -->
        <div class="fragment offbeat-card" style="padding:9px 12px; background:var(--light-grey); box-shadow:none;">
            <p style="font-size:0.42rem; font-weight:700; color:var(--grey-dirmob); margin:0 0 6px; text-transform:uppercase; letter-spacing:1px;">RECHERCHEV — toutes les infos en une ligne</p>
            <table class="mockup-table" style="font-size:0.37em;">
                <tr>
                    <th>id</th>
                    <th>date</th>
                    <th>nom voyageur</th>
                    <th>tel. voyageur</th>
                    <th style="color:var(--green-dirmob);">prestataire</th>
                    <th style="color:var(--green-dirmob);">tel. presta</th>
                    <th>statut</th>
                </tr>
                <tr style="background:#e8f5e9;">
                    <td style="font-weight:700;">R156</td>
                    <td>10/01/2030</td>
                    <td style="font-weight:700;">Marc Dubois</td>
                    <td>06 12 34 56 78</td>
                    <td style="font-weight:700; color:var(--green-dirmob);">Transdev</td>
                    <td style="font-weight:700; color:var(--green-dirmob);">04 76 48 00 00</td>
                    <td style="color:var(--red-alert); font-weight:700;">non_traite</td>
                </tr>
            </table>
        </div>

        <!-- Résolution -->
        <div class="fragment offbeat-card card--green" style="padding:10px 14px;">
            <span class="label--good">Résolu</span>
            <div style="display:flex; gap:8px; margin-top:6px;">
                <div style="flex:1; background:#e8f5e9; border-radius:6px; padding:7px 10px;">
                    <p style="font-size:0.43rem; font-weight:700; color:var(--green-dirmob); margin:0 0 2px;">04 76 48 00 00</p>
                    <p style="font-size:0.39rem; color:#555; margin:0;">→ Transdev prévenu, bague localisée</p>
                </div>
                <div style="flex:1; background:#e3f2fd; border-radius:6px; padding:7px 10px;">
                    <p style="font-size:0.43rem; font-weight:700; color:var(--blue-dirmob); margin:0 0 2px;">06 12 34 56 78</p>
                    <p style="font-size:0.39rem; color:#555; margin:0;">→ Marc rappelé : "Bonne nouvelle !" ✅</p>
                </div>
            </div>
            <p style="font-size:0.38rem; color:#666; margin:6px 0 0; border-top:1px solid #c8e6c9; padding-top:5px;">Statut mis à jour → <strong>traite</strong> — l'historique est complet.</p>
        </div>

    </div>
</div>
`;

const programme = `
<h2>Ce que vous allez apprendre</h2>
<div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 22px;"></div>

<div style="display:flex; flex-direction:column; gap:12px; max-width:720px; margin:0 auto;">

    <div class="offbeat-card fragment" style="padding:14px 18px;">
        <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:40px; height:40px; background:#009fe3; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:0.9rem; flex-shrink:0;">1</div>
            <div>
                <p style="margin:0; font-weight:700; font-size:0.86rem;">Qu'est-ce qu'une base de données ?</p>
                <p style="margin:3px 0 0; font-size:0.68rem; color:#666;">Structure, terminologie, liens entre tables</p>
            </div>
        </div>
    </div>

    <div class="offbeat-card fragment" style="padding:14px 18px;">
        <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:40px; height:40px; background:#009fe3; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:0.9rem; flex-shrink:0;">2</div>
            <div>
                <p style="margin:0; font-weight:700; font-size:0.86rem;">Tableau de suivi vs base de données</p>
                <p style="margin:3px 0 0; font-size:0.68rem; color:#666;">La confusion la plus fréquente — et comment en sortir</p>
            </div>
        </div>
    </div>

    <div class="offbeat-card fragment" style="padding:14px 18px; border-left-color:#333;">
        <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:40px; height:40px; background:#333; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:0.9rem; flex-shrink:0;">3</div>
            <div>
                <p style="margin:0; font-weight:700; font-size:0.86rem;">Les règles fondatrices</p>
                <p style="margin:3px 0 0; font-size:0.68rem; color:#666;">Atomicité · types de données · identifiant unique</p>
            </div>
        </div>
    </div>

    <div class="offbeat-card fragment card--red" style="padding:14px 18px;">
        <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:40px; height:40px; background:var(--red-alert); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:0.9rem; flex-shrink:0;">!</div>
            <div>
                <p style="margin:0; font-weight:700; font-size:0.86rem;">Les 3 erreurs à éviter</p>
                <p style="margin:3px 0 0; font-size:0.68rem; color:#666;">Éclatement · encodage couleur · listes dans une cellule</p>
            </div>
        </div>
    </div>

</div>
`;

export function Accueil() {
  return (
    <>
      <section
        data-background-gradient="linear-gradient(135deg, #009fe3 0%, #95c11f 100%)"
        dangerouslySetInnerHTML={{ __html: titre }}
      />
      <section>
        <section dangerouslySetInnerHTML={{ __html: enjeu }} />
        <section dangerouslySetInnerHTML={{ __html: workflow }} />
      </section>
      <section dangerouslySetInnerHTML={{ __html: programme }} />
    </>
  );
}
