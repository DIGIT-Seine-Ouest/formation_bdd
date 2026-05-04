window.SLIDES = window.SLIDES || {};

window.SLIDES.avance = `

<!-- ════════════════════════════════════════════════
     AU-DELÀ — Métadonnées, Standardisation, RGPD
════════════════════════════════════════════════ -->

<!-- SECTION INTRO — PARTIE 3 -->
<section data-background-color="#009fe3">
    <div style="position:relative; max-width:720px; margin:0 auto;">

        <!-- Ghost number -->
        <div aria-hidden="true" style="
            position:absolute; right:-80px; top:50%; transform:translateY(-52%);
            font-family:'IBM Plex Serif',serif; font-size:18rem; font-weight:700;
            color:white; opacity:0.06; line-height:1;
            pointer-events:none; user-select:none; letter-spacing:-0.05em;">03</div>

        <!-- Left vertical accent bar -->
        <div style="
            position:absolute; left:-28px; top:0; bottom:0;
            width:4px; border-radius:2px;
            background:rgba(255,255,255,0.32);"></div>

        <div style="position:relative; z-index:1; text-align:left; color:white;">
            <p style="
                font-size:0.62rem; text-transform:uppercase;
                letter-spacing:4px; color:rgba(255,255,255,0.55);
                margin:0 0 16px; font-weight:600;">Partie 3</p>

            <p class="section-intro-title">Au-delà<br>de la donnée</p>

            <div style="width:36px; height:2px; background:rgba(255,255,255,0.38); margin:0 0 16px;"></div>

            <p class="section-intro-sub">
                Métadonnées, standardisation et cadre réglementaire.</p>
        </div>
    </div>
</section>


<!-- MÉTADONNÉES -->
<section>
    <h2>Qu'est-ce qu'une Métadonnée ?</h2>
    <div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 20px;"></div>

    <div class="citation" style="margin-bottom:22px;">
        <p>Une métadonnée est une <strong>donnée servant à caractériser ou décrire une donnée</strong>. Elle donne des détails supplémentaires pour la rendre unique et en comprendre le contenu — quel qu'en soit le support.</p>
    </div>

    <div class="row" style="align-items:stretch;">
        <div class="col-6 fragment">
            <div class="offbeat-card" style="height:100%; box-sizing:border-box;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                    <div style="width:32px; height:32px; background:#009fe3; border-radius:6px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <span style="color:white; font-size:1rem;">◼</span>
                    </div>
                    <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:2px; color:#009fe3; font-weight:700; margin:0;">Exemple : une photo</p>
                </div>
                <ul style="font-size:0.73rem; margin:0; padding:0; list-style:none; color:#555;">
                    <li style="padding:5px 0; border-bottom:1px solid #f0f0f0; display:flex; gap:8px;"><span style="color:#009fe3; font-weight:700;">›</span> Date de production</li>
                    <li style="padding:5px 0; border-bottom:1px solid #f0f0f0; display:flex; gap:8px;"><span style="color:#009fe3; font-weight:700;">›</span> Coordonnées géographiques</li>
                    <li style="padding:5px 0; border-bottom:1px solid #f0f0f0; display:flex; gap:8px;"><span style="color:#009fe3; font-weight:700;">›</span> Appareil utilisé</li>
                    <li style="padding:5px 0; display:flex; gap:8px;"><span style="color:#009fe3; font-weight:700;">›</span> Auteur</li>
                </ul>
            </div>
        </div>
        <div class="col-6 fragment">
            <div class="offbeat-card card--green" style="height:100%; box-sizing:border-box;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                    <div style="width:32px; height:32px; background:#95c11f; border-radius:6px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <span style="color:white; font-size:1rem;">◼</span>
                    </div>
                    <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:2px; color:#95c11f; font-weight:700; margin:0;">Exemple : un fichier</p>
                </div>
                <ul style="font-size:0.73rem; margin:0; padding:0; list-style:none; color:#555;">
                    <li style="padding:5px 0; border-bottom:1px solid #f0f0f0; display:flex; gap:8px;"><span style="color:#95c11f; font-weight:700;">›</span> Date de création / mise à jour</li>
                    <li style="padding:5px 0; border-bottom:1px solid #f0f0f0; display:flex; gap:8px;"><span style="color:#95c11f; font-weight:700;">›</span> Producteur de la donnée</li>
                    <li style="padding:5px 0; border-bottom:1px solid #f0f0f0; display:flex; gap:8px;"><span style="color:#95c11f; font-weight:700;">›</span> Périmètre géographique</li>
                    <li style="padding:5px 0; display:flex; gap:8px;"><span style="color:#95c11f; font-weight:700;">›</span> Licence d'utilisation</li>
                </ul>
            </div>
        </div>
    </div>
</section>


<!-- STANDARDISATION -->
<section>
    <h2>La standardisation des données</h2>
    <div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 16px;"></div>

    <div class="citation" style="margin-bottom:18px;">
        <p>"La standardisation est une base indispensable de l'innovation."</p>
    </div>
    <p style="font-size:0.73rem; color:#555; margin:0 0 16px; line-height:1.65;">
        Des organismes ont pour mission d'identifier les données les plus utilisées et de proposer des <strong>structurations standardisées</strong> afin que partout en France, ces données puissent être comparées et amalgamées.
    </p>

    <div style="display:flex; flex-direction:column; gap:10px;">
        <div class="fragment" style="background:#f8fafc; border-radius:10px; padding:14px 18px; border-left:4px solid #009fe3; display:flex; align-items:center; gap:16px;">
            <div style="width:56px; height:36px; background:#009fe3; border-radius:6px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <span style="font-size:0.58rem; font-weight:700; color:white; letter-spacing:0.5px; text-align:center; line-height:1.2;">CNIG</span>
            </div>
            <div>
                <p style="font-size:0.6rem; font-weight:700; text-transform:uppercase; color:#009fe3; margin:0 0 2px; letter-spacing:1px;">Conseil National de l'Information Géolocalisée</p>
                <p style="font-size:0.7rem; margin:0; color:#555; line-height:1.4;">Rassemble ministères, collectivités et entreprises autour des standards géodonnée en France.</p>
            </div>
        </div>
        <div class="fragment" style="background:#f8fafc; border-radius:10px; padding:14px 18px; border-left:4px solid #009fe3; display:flex; align-items:center; gap:16px;">
            <div style="width:56px; height:36px; background:#009fe3; border-radius:6px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <span style="font-size:0.58rem; font-weight:700; color:white; letter-spacing:0.5px; text-align:center; line-height:1.2;">CEREMA</span>
            </div>
            <div>
                <p style="font-size:0.6rem; font-weight:700; text-transform:uppercase; color:#009fe3; margin:0 0 2px; letter-spacing:1px;">Centre d'Études et d'Expertise</p>
                <p style="font-size:0.7rem; margin:0; color:#555; line-height:1.4;">Risques, environnement, mobilité, aménagement — standards sectoriels.</p>
            </div>
        </div>
        <div class="fragment" style="background:#f0f9e8; border-radius:10px; padding:14px 18px; border-left:4px solid #95c11f; display:flex; align-items:center; gap:16px;">
            <div style="width:56px; height:36px; background:#95c11f; border-radius:6px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <span style="font-size:0.58rem; font-weight:700; color:white; letter-spacing:0.5px; text-align:center; line-height:1.2;">DiNUM</span>
            </div>
            <div>
                <p style="font-size:0.6rem; font-weight:700; text-transform:uppercase; color:#95c11f; margin:0 0 2px; letter-spacing:1px;">schema.data.gouv.fr</p>
                <p style="font-size:0.7rem; margin:0; color:#555; line-height:1.4;">Plateforme nationale de référencement des schémas — accès, validation, API. Ex : Base Adresse Nationale (BAN).</p>
            </div>
        </div>
    </div>
</section>


<!-- RGPD -->
<section>
    <h2>Le RGPD</h2>
    <div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 18px;"></div>

    <div class="row" style="align-items:stretch;">
        <div style="flex:1; display:flex; flex-direction:column; gap:12px;">
            <div class="offbeat-card" style="box-sizing:border-box;">
                <p style="font-size:0.58rem; text-transform:uppercase; letter-spacing:3px; color:#009fe3; font-weight:700; margin:0 0 6px;">Définition</p>
                <p style="font-size:0.73rem; margin:0; line-height:1.65; color:#555;">
                    Règlement européen en vigueur depuis le <strong>25 mai 2018</strong>. Il s'inscrit dans la continuité de la loi française « Informatique et Libertés » de 1978.
                </p>
            </div>
            <div class="fragment offbeat-card" style="border-left-color:#555; box-sizing:border-box;">
                <p style="font-size:0.58rem; text-transform:uppercase; letter-spacing:3px; color:#555; font-weight:700; margin:0 0 6px;">Qui est concerné ?</p>
                <p style="font-size:0.73rem; margin:0; line-height:1.65; color:#555;">
                    Toute structure privée ou publique collectant ou traitant des données — y compris les <strong>sous-traitants</strong> — établie dans l'UE ou ciblant des résidents européens.
                </p>
            </div>
        </div>

        <div class="col-6 fragment">
            <div class="offbeat-card card--green" style="height:100%; box-sizing:border-box;">
                <p style="font-size:0.58rem; text-transform:uppercase; letter-spacing:3px; color:#95c11f; font-weight:700; margin:0 0 14px;">Les 3 objectifs</p>

                <div style="display:flex; align-items:flex-start; gap:12px; margin-bottom:12px;">
                    <div style="width:26px; height:26px; border-radius:50%; background:#95c11f; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <span style="color:white; font-size:0.68rem; font-weight:700; font-family:'IBM Plex Serif',serif;">1</span>
                    </div>
                    <p style="font-size:0.72rem; margin:0; color:#555; line-height:1.5;">Renforcer les <strong>droits des personnes</strong></p>
                </div>
                <div style="display:flex; align-items:flex-start; gap:12px; margin-bottom:12px;">
                    <div style="width:26px; height:26px; border-radius:50%; background:#95c11f; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <span style="color:white; font-size:0.68rem; font-weight:700; font-family:'IBM Plex Serif',serif;">2</span>
                    </div>
                    <p style="font-size:0.72rem; margin:0; color:#555; line-height:1.5;"><strong>Responsabiliser les acteurs</strong> traitant des données</p>
                </div>
                <div style="display:flex; align-items:flex-start; gap:12px;">
                    <div style="width:26px; height:26px; border-radius:50%; background:#95c11f; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <span style="color:white; font-size:0.68rem; font-weight:700; font-family:'IBM Plex Serif',serif;">3</span>
                    </div>
                    <p style="font-size:0.72rem; margin:0; color:#555; line-height:1.5;"><strong>Crédibiliser la régulation</strong> grâce à la coopération des autorités</p>
                </div>
            </div>
        </div>
    </div>
</section>


<!-- DONNÉES PERSONNELLES -->
<section>
    <h2>Données personnelles — de quoi parle-t-on ?</h2>
    <div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 18px;"></div>

    <div class="citation" style="margin-bottom:20px;">
        <p>Selon la CNIL : <strong>"toute information se rapportant à une personne physique identifiée ou identifiable"</strong>.</p>
    </div>

    <div class="row" style="margin-bottom:14px; align-items:stretch;">
        <div class="col-6 fragment">
            <div class="offbeat-card" style="height:100%; box-sizing:border-box;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                    <div style="width:28px; height:28px; border-radius:50%; background:#009fe3; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <span style="color:white; font-size:0.75rem; font-weight:700; font-family:'IBM Plex Serif',serif;">D</span>
                    </div>
                    <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:2px; color:#009fe3; font-weight:700; margin:0;">Identification directe</p>
                </div>
                <p style="font-size:0.73rem; margin:0; color:#555; line-height:1.6;">Nom, prénom, photo…</p>
            </div>
        </div>
        <div class="col-6 fragment">
            <div class="offbeat-card" style="border-left-color:#555; height:100%; box-sizing:border-box;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                    <div style="width:28px; height:28px; border-radius:50%; background:#555; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <span style="color:white; font-size:0.75rem; font-weight:700; font-family:'IBM Plex Serif',serif;">I</span>
                    </div>
                    <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:2px; color:#555; font-weight:700; margin:0;">Identification indirecte</p>
                </div>
                <p style="font-size:0.73rem; margin:0; color:#555; line-height:1.6;">Identifiant, numéro de téléphone, adresse IP…</p>
            </div>
        </div>
    </div>

    <div class="fragment offbeat-card card--green">
        <p style="font-size:0.58rem; text-transform:uppercase; letter-spacing:3px; color:#95c11f; font-weight:700; margin:0 0 10px;">Exemples de traitements</p>
        <ul style="font-size:0.72rem; margin:0; padding:0; list-style:none; color:#555;">
            <li style="padding:5px 0; border-bottom:1px solid #e8f5e9; display:flex; gap:8px;"><span style="color:#95c11f; font-weight:700;">›</span> Tenue d'un fichier d'électeurs, d'enfants scolarisés…</li>
            <li style="padding:5px 0; border-bottom:1px solid #e8f5e9; display:flex; gap:8px;"><span style="color:#95c11f; font-weight:700;">›</span> Collecte de coordonnées pour l'inscription aux conservatoires</li>
            <li style="padding:5px 0; display:flex; gap:8px;"><span style="color:#95c11f; font-weight:700;">›</span> Mise à jour du fichier des enseignants des conservatoires</li>
        </ul>
    </div>
</section>

`;
