window.SLIDES = window.SLIDES || {};

window.SLIDES.intro = `

<!-- ════════════════════════════════════════════════
     INTRO — Couverture & Contexte
════════════════════════════════════════════════ -->

<!-- 1 · COUVERTURE -->
<section data-background-gradient="linear-gradient(135deg, #009fe3 0%, #95c11f 100%)">
    <div style="max-width:820px; margin:0 auto; position:relative;">
        <div style="
            background:rgba(255,255,255,0.96);
            padding:54px 64px 48px;
            border-radius:4px 4px 16px 16px;
            box-shadow:0 28px 70px rgba(0,0,0,0.28);
            border-top:5px solid #009fe3;
            position:relative;
            overflow:hidden;">

            <!-- Triangle corner accent top-right -->
            <div aria-hidden="true" style="
                position:absolute; top:0; right:0;
                width:0; height:0;
                border-style:solid;
                border-width:0 110px 110px 0;
                border-color:transparent rgba(149,193,31,0.08) transparent transparent;
                pointer-events:none;"></div>

            <!-- Radial glow bottom-right -->
            <div aria-hidden="true" style="
                position:absolute; bottom:-40px; right:-40px;
                width:200px; height:200px; border-radius:50%;
                background:radial-gradient(circle, rgba(0,159,227,0.07) 0%, transparent 70%);
                pointer-events:none;"></div>

            <p style="
                position:relative; z-index:1;
                font-size:0.66rem; text-transform:uppercase;
                letter-spacing:4px; color:#009fe3;
                margin:0 0 14px; font-weight:700;">
                Les Ateliers de la DIGIT — GPSO</p>

            <h1 style="
                position:relative; z-index:1;
                margin:0; line-height:1.08; font-size:2.9rem;">
                Exploiter le plein<br>potentiel des données</h1>

            <div style="
                position:relative; z-index:1;
                width:56px; height:3px; margin:20px 0 22px;
                background:linear-gradient(90deg, #009fe3, #95c11f);
                border-radius:2px;"></div>

            <p style="
                position:relative; z-index:1;
                font-family:'IBM Plex Serif',serif;
                font-size:0.95rem; color:#666;
                margin:0 0 26px; line-height:1.68;">
                La plupart des agents des collectivités territoriales doivent créer ou exploiter de la donnée.<br>
                Ce support est là pour les accompagner.</p>

            <span style="
                position:relative; z-index:1;
                display:inline-block;
                background:#f0f4f8; color:#999;
                font-size:0.64rem; font-family:monospace;
                padding:5px 14px; border-radius:20px; letter-spacing:1px;">
                21 mars 2024</span>
        </div>
    </div>
</section>


<!-- 2 · CONTEXTE -->
<section>
    <div style="position:relative; max-width:960px; margin:0 auto;">

        <!-- Decorative opening quote -->
        <div aria-hidden="true" style="
            position:absolute; top:-18px; left:-12px;
            font-family:'IBM Plex Serif',serif;
            font-size:11rem; font-weight:700; line-height:1;
            color:#009fe3; opacity:0.08;
            pointer-events:none; user-select:none;">"</div>

        <div style="position:relative; z-index:1;">
            <div class="citation" style="margin-bottom:24px;">
                <p>"Quotidiennement, de nombreux agents de GPSO ou des villes mutualisées créent, exploitent et traitent de la Donnée <strong>sans même en avoir conscience.</strong>"</p>
            </div>

            <div class="row">
                <div class="col-6 fragment">
                    <div class="offbeat-card">
                        <p style="
                            font-size:0.58rem; text-transform:uppercase;
                            letter-spacing:3px; color:#009fe3;
                            font-weight:700; margin:0 0 8px;">Le constat</p>
                        <p style="font-size:0.76rem; margin:0; line-height:1.7; color:#555;">
                            Cette donnée, quel que soit son support ou son format, nécessite d'être traitée avec un <strong>minimum de rigueur</strong> pour en exploiter tout le potentiel.
                        </p>
                    </div>
                </div>
                <div class="col-6 fragment">
                    <div class="offbeat-card card--green">
                        <p style="
                            font-size:0.58rem; text-transform:uppercase;
                            letter-spacing:3px; color:#95c11f;
                            font-weight:700; margin:0 0 8px;">L'objectif</p>
                        <p style="font-size:0.76rem; margin:0; line-height:1.7; color:#555;">
                            Connaître les quelques <strong>règles essentielles</strong> pour que vos données soient les plus faciles à exploiter et les plus efficientes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

`;
