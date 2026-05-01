window.SLIDES = window.SLIDES || {};

window.SLIDES.donnees = `

<!-- ════════════════════════════════════════════════
     LES FONDAMENTAUX — DATA, Donnée, BDD, Terminologies
════════════════════════════════════════════════ -->

<!-- SECTION INTRO — PARTIE 1 -->
<section data-background-color="#009fe3">
    <div style="position:relative; max-width:720px; margin:0 auto;">

        <!-- Ghost number -->
        <div aria-hidden="true" style="
            position:absolute; right:-80px; top:50%; transform:translateY(-52%);
            font-family:'IBM Plex Serif',serif; font-size:18rem; font-weight:700;
            color:white; opacity:0.06; line-height:1;
            pointer-events:none; user-select:none; letter-spacing:-0.05em;">01</div>

        <!-- Left vertical accent bar -->
        <div style="
            position:absolute; left:-28px; top:0; bottom:0;
            width:4px; border-radius:2px;
            background:rgba(255,255,255,0.32);"></div>

        <div style="position:relative; z-index:1; text-align:left; color:white;">
            <p style="
                font-size:0.62rem; text-transform:uppercase;
                letter-spacing:4px; color:rgba(255,255,255,0.55);
                margin:0 0 16px; font-weight:600;">Partie 1</p>

            <p class="section-intro-title">Les fondamentaux<br>de la donnée</p>

            <div style="width:36px; height:2px; background:rgba(255,255,255,0.38); margin:0 0 16px;"></div>

            <p class="section-intro-sub">
                DATA, donnée, base de données — de quoi parle-t-on vraiment ?</p>
        </div>
    </div>
</section>


<!-- QU'EST-CE QUE LA DATA ? -->
<section>
    <h2>Qu'est-ce que la « DATA » ?</h2>
    <div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 20px;"></div>

    <div class="row" style="align-items:stretch;">
        <div class="col-6">
            <div class="offbeat-card" style="height:100%; box-sizing:border-box;">
                <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:3px; color:#009fe3; font-weight:700; margin:0 0 8px;">Définition</p>
                <p style="font-size:0.76rem; margin:0; line-height:1.75; color:#555;">
                    Terme anglais utilisé dans le secteur des télécommunications pour qualifier les <strong>données qui transitent par un réseau informatique</strong>.
                </p>
            </div>
        </div>
        <div class="col-6">
            <div class="offbeat-card card--green" style="height:100%; box-sizing:border-box;">
                <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:3px; color:#95c11f; font-weight:700; margin:0 0 8px;">Sous toutes ses formes</p>
                <ul style="font-size:0.74rem; margin:0; padding:0; list-style:none; color:#555; line-height:1;">
                    <li style="padding:5px 0; border-bottom:1px solid #eee; display:flex; align-items:center; gap:8px;">
                        <span style="color:#009fe3; font-weight:700; font-size:0.8rem;">›</span> Tableau Excel
                    </li>
                    <li style="padding:5px 0; border-bottom:1px solid #eee; display:flex; align-items:center; gap:8px;">
                        <span style="color:#009fe3; font-weight:700; font-size:0.8rem;">›</span> Document Word
                    </li>
                    <li style="padding:5px 0; border-bottom:1px solid #eee; display:flex; align-items:center; gap:8px;">
                        <span style="color:#009fe3; font-weight:700; font-size:0.8rem;">›</span> Donnée cartographique
                    </li>
                    <li style="padding:5px 0; border-bottom:1px solid #eee; display:flex; align-items:center; gap:8px;">
                        <span style="color:#009fe3; font-weight:700; font-size:0.8rem;">›</span> Courriel
                    </li>
                    <li style="padding:5px 0; border-bottom:1px solid #eee; display:flex; align-items:center; gap:8px;">
                        <span style="color:#009fe3; font-weight:700; font-size:0.8rem;">›</span> Flux RSS
                    </li>
                    <li style="padding:5px 0; display:flex; align-items:center; gap:8px;">
                        <span style="color:#ccc; font-size:0.8rem;">›</span> <span style="color:#aaa; font-style:italic;">…</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>


<!-- QU'EST-CE QU'UNE DONNÉE ? -->
<section>
    <h2>Qu'est-ce qu'une « Donnée » ?</h2>
    <div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 20px;"></div>

    <div class="citation" style="margin-bottom:22px;">
        <p>Une donnée est une information qui sert de <strong>point de départ à un raisonnement</strong>. Ce raisonnement a pour but de déterminer un résultat ou de trouver une solution à une problématique en lien avec cette donnée.</p>
    </div>
    <div class="row" style="align-items:stretch;">
        <div class="col-6 fragment">
            <div class="offbeat-card card--red" style="height:100%; box-sizing:border-box;">
                <span class="label--bad">Donnée brute</span>
                <p style="font-size:0.74rem; margin:10px 0 0; line-height:1.75; color:#555;">
                    Dépourvue de toute interprétation. Factuelle — elle peut servir de base à une analyse ou à un traitement.
                </p>
            </div>
        </div>

        <div style="display:flex; align-items:center; padding:0 14px;">
            <div style="text-align:center;">
                <div style="width:36px; height:2px; background:linear-gradient(90deg,#e53e3e,#009fe3); border-radius:2px; margin:0 0 4px;"></div>
                <span style="font-size:1.2rem; color:#ccc; line-height:1;">→</span>
            </div>
        </div>

        <div class="col-6 fragment">
            <div class="offbeat-card card--green" style="height:100%; box-sizing:border-box;">
                <span class="label--good">Donnée exploitable</span>
                <p style="font-size:0.74rem; margin:10px 0 0; line-height:1.75; color:#555;">
                    La donnée brute a été <strong>analysée et nettoyée</strong>. Elle est prête à alimenter des traitements et des prises de décision.
                </p>
            </div>
        </div>
    </div>

    <div class="fragment" style="margin-top:14px; background:#f0f8ff; border-radius:8px; padding:11px 18px; border-left:3px solid #009fe3;">
        <p style="font-size:0.7rem; color:#555; margin:0; line-height:1.6;">
            Grâce à l'informatique, des systèmes peuvent aujourd'hui <strong>produire et traiter la donnée</strong> à notre place — à condition que cette donnée soit bien structurée.
        </p>
    </div>
</section>


<!-- QU'EST-CE QU'UNE BDD ? -->
<section>
    <h2>Qu'est-ce qu'une Base de Données (BDD) ?</h2>
    <div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 20px;"></div>

    <div class="citation" style="margin-bottom:20px;">
        <p>Une base de données permet de <strong>stocker et de retrouver</strong> des tables et des données, généralement en rapport avec un même thème ou une même activité. Ces tables peuvent être de natures différentes et plus ou moins liées entre elles.</p>
    </div>

    <div class="fragment">
        <div class="offbeat-card card--green">
            <div style="display:flex; align-items:flex-start; gap:16px;">
                <div style="
                    width:44px; height:44px; flex-shrink:0;
                    background:#95c11f; border-radius:8px;
                    display:flex; align-items:center; justify-content:center;">
                    <span style="font-size:1.3rem; color:white; line-height:1;">⇄</span>
                </div>
                <div>
                    <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:3px; color:#95c11f; font-weight:700; margin:0 0 5px;">SGBDR — Base de données relationnelle</p>
                    <p style="font-size:0.74rem; margin:0; line-height:1.75; color:#555;">
                        Le type le plus courant. Elle permet de <strong>mettre en relation différentes tables</strong> les unes avec les autres. Une BDD relationnelle n'est donc rien de plus qu'un ensemble de données <em>reliées entre elles</em>.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="fragment" style="margin-top:12px; background:#f0f8ff; border-radius:8px; padding:11px 18px; border-left:3px solid #009fe3;">
        <p style="font-size:0.69rem; color:#555; margin:0; line-height:1.6;">
            <strong>Exemple :</strong> La BDD du standard CNIG PLU v2022-10 modélise plusieurs dizaines de tables reliées entre elles pour décrire les plans locaux d'urbanisme.
        </p>
    </div>
</section>


<!-- TERMINOLOGIES -->
<section>
    <h2>Les terminologies liées à la donnée</h2>
    <div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 20px;"></div>

    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px;">

        <div class="fragment" style="background:#f8fafc; border-radius:10px; padding:16px 18px; border-left:4px solid #009fe3; position:relative; overflow:hidden;">
            <div aria-hidden="true" style="position:absolute; right:8px; top:6px; font-family:'IBM Plex Serif',serif; font-size:2.8rem; font-weight:700; color:#009fe3; opacity:0.08; line-height:1; user-select:none;">T</div>
            <div class="type-name" style="position:relative; z-index:1;">Table</div>
            <div class="type-desc" style="position:relative; z-index:1;">Un ensemble de lignes et de colonnes</div>
        </div>

        <div class="fragment" style="background:#f8fafc; border-radius:10px; padding:16px 18px; border-left:4px solid #009fe3; position:relative; overflow:hidden;">
            <div aria-hidden="true" style="position:absolute; right:8px; top:6px; font-family:'IBM Plex Serif',serif; font-size:2.8rem; font-weight:700; color:#009fe3; opacity:0.08; line-height:1; user-select:none;">E</div>
            <div class="type-name" style="position:relative; z-index:1;">Enregistrement</div>
            <div class="type-desc" style="position:relative; z-index:1;">Une ligne dans la table</div>
        </div>

        <div class="fragment" style="background:#f8fafc; border-radius:10px; padding:16px 18px; border-left:4px solid #009fe3; position:relative; overflow:hidden;">
            <div aria-hidden="true" style="position:absolute; right:8px; top:6px; font-family:'IBM Plex Serif',serif; font-size:2.8rem; font-weight:700; color:#009fe3; opacity:0.08; line-height:1; user-select:none;">C</div>
            <div class="type-name" style="position:relative; z-index:1;">Champ</div>
            <div class="type-desc" style="position:relative; z-index:1;">Une colonne — catégorie d'information</div>
        </div>

        <div class="fragment" style="background:#f8fafc; border-radius:10px; padding:16px 18px; border-left:4px solid #009fe3; position:relative; overflow:hidden;">
            <div aria-hidden="true" style="position:absolute; right:8px; top:6px; font-family:'IBM Plex Serif',serif; font-size:2.8rem; font-weight:700; color:#009fe3; opacity:0.08; line-height:1; user-select:none;">A</div>
            <div class="type-name" style="position:relative; z-index:1;">Attribut</div>
            <div class="type-desc" style="position:relative; z-index:1;">La valeur à l'intersection d'un champ et d'un enregistrement</div>
        </div>

        <div class="fragment" style="background:#f0f9e8; border-radius:10px; padding:16px 18px; border-left:4px solid #95c11f; position:relative; overflow:hidden;">
            <div aria-hidden="true" style="position:absolute; right:8px; top:6px; font-family:'IBM Plex Serif',serif; font-size:2.8rem; font-weight:700; color:#95c11f; opacity:0.12; line-height:1; user-select:none;">ID</div>
            <div class="type-name" style="color:#95c11f; position:relative; z-index:1;">Identifiant unique</div>
            <div class="type-desc" style="position:relative; z-index:1;">Identifie formellement chaque enregistrement</div>
        </div>

        <div class="fragment" style="background:#f5f5f5; border-radius:10px; padding:16px 18px; border-left:4px solid #555; position:relative; overflow:hidden;">
            <div aria-hidden="true" style="position:absolute; right:8px; top:6px; font-family:'IBM Plex Serif',serif; font-size:2.8rem; font-weight:700; color:#555; opacity:0.08; line-height:1; user-select:none;">R</div>
            <div class="type-name" style="color:#555; position:relative; z-index:1;">Relation</div>
            <div class="type-desc" style="position:relative; z-index:1;">Lien hiérarchique ou de réseau entre deux tables</div>
        </div>

    </div>
</section>

`;
