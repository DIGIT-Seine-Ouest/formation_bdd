window.SLIDES = window.SLIDES || {};

window.SLIDES.regles = `

<!-- ════════════════════════════════════════════════
     RÈGLES DE CONCEPTION — Bonnes pratiques, ID, Relations, Types
════════════════════════════════════════════════ -->

<!-- SECTION INTRO — PARTIE 2 -->
<section data-background-color="#333333">
    <div style="position:relative; max-width:720px; margin:0 auto;">

        <!-- Ghost number -->
        <div aria-hidden="true" style="
            position:absolute; right:-80px; top:50%; transform:translateY(-52%);
            font-family:'IBM Plex Serif',serif; font-size:18rem; font-weight:700;
            color:white; opacity:0.05; line-height:1;
            pointer-events:none; user-select:none; letter-spacing:-0.05em;">02</div>

        <!-- Left vertical accent bar -->
        <div style="
            position:absolute; left:-28px; top:0; bottom:0;
            width:4px; border-radius:2px;
            background:rgba(255,255,255,0.25);"></div>

        <div style="position:relative; z-index:1; text-align:left; color:white;">
            <p style="
                font-size:0.62rem; text-transform:uppercase;
                letter-spacing:4px; color:rgba(255,255,255,0.45);
                margin:0 0 16px; font-weight:600;">Partie 2</p>

            <p class="section-intro-title">Les règles<br>de conception</p>

            <div style="width:36px; height:2px; background:rgba(255,255,255,0.3); margin:0 0 16px;"></div>

            <p class="section-intro-sub">
                Bonnes pratiques, identifiants, relations et types de champs.</p>
        </div>
    </div>
</section>


<!-- RÈGLES DE CONCEPTION D'UNE TABLE -->
<section>
    <h2>Les règles de conception d'une table</h2>
    <div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 22px;"></div>

    <div class="row" style="align-items:stretch;">
        <div class="col-6 fragment">
            <div class="offbeat-card" style="height:100%; box-sizing:border-box; position:relative; overflow:hidden;">
                <div aria-hidden="true" style="
                    position:absolute; right:-4px; bottom:-10px;
                    font-family:'IBM Plex Serif',serif; font-size:5.5rem; font-weight:700;
                    color:#009fe3; opacity:0.06; line-height:1;
                    pointer-events:none; user-select:none;">01</div>
                <p style="font-size:0.58rem; text-transform:uppercase; letter-spacing:3px; color:#009fe3; font-weight:700; margin:0 0 8px; position:relative; z-index:1;">Principe 1</p>
                <h3 style="margin:0 0 10px; font-size:0.92rem; position:relative; z-index:1;">Informations strictement nécessaires</h3>
                <p style="font-size:0.73rem; margin:0; line-height:1.75; color:#555; position:relative; z-index:1;">
                    Il n'est pas utile de vouloir tout mettre. La table ne doit contenir que les éléments <strong>pertinents pour les traitements souhaités</strong>.
                </p>
            </div>
        </div>
        <div class="col-6 fragment">
            <div class="offbeat-card card--green" style="height:100%; box-sizing:border-box; position:relative; overflow:hidden;">
                <div aria-hidden="true" style="
                    position:absolute; right:-4px; bottom:-10px;
                    font-family:'IBM Plex Serif',serif; font-size:5.5rem; font-weight:700;
                    color:#95c11f; opacity:0.08; line-height:1;
                    pointer-events:none; user-select:none;">02</div>
                <p style="font-size:0.58rem; text-transform:uppercase; letter-spacing:3px; color:#95c11f; font-weight:700; margin:0 0 8px; position:relative; z-index:1;">Principe 2</p>
                <h3 style="margin:0 0 10px; font-size:0.92rem; color:#95c11f; position:relative; z-index:1;">Qualité et intégrité des informations</h3>
                <p style="font-size:0.73rem; margin:0; line-height:1.75; color:#555; position:relative; z-index:1;">
                    Si votre table contient des informations incorrectes ou manquantes, <strong>tous les résultats et décisions</strong> qui en découlent seront mal informés. <em>Garbage in, garbage out.</em>
                </p>
            </div>
        </div>
    </div>

    <div class="fragment" style="margin-top:16px;">
        <div class="offbeat-card" style="border-left-color:#555;">
            <p style="font-size:0.73rem; margin:0; line-height:1.65; color:#444;">
                <strong>Une bonne conception</strong> fournit les informations strictement nécessaires, garantit leur exactitude et leur intégrité, et répond aux besoins de traitement et de rapport.
            </p>
        </div>
    </div>
</section>


<!-- BONNES PRATIQUES : NOMS & ATTRIBUTS -->
<section>
    <h2>Les bonnes pratiques de conception</h2>
    <div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 22px;"></div>

    <div class="row" style="align-items:stretch;">
        <div style="flex:1;">
            <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:3px; color:#009fe3; font-weight:700; margin:0 0 10px;">Noms de table, champ et fichier</p>
            <div class="offbeat-card" style="box-sizing:border-box;">
                <ul style="font-size:0.73rem; margin:0; padding:0; list-style:none; color:#555;">
                    <li style="padding:6px 0; border-bottom:1px solid #f0f0f0; display:flex; align-items:center; gap:10px;">
                        <span style="color:#009fe3; font-weight:700; font-size:0.75rem; flex-shrink:0;">›</span>
                        En <strong>minuscule</strong>
                    </li>
                    <li style="padding:6px 0; border-bottom:1px solid #f0f0f0; display:flex; align-items:center; gap:10px;">
                        <span style="color:#009fe3; font-weight:700; font-size:0.75rem; flex-shrink:0;">›</span>
                        Sans caractères spéciaux, sans accents
                    </li>
                    <li style="padding:6px 0; border-bottom:1px solid #f0f0f0; display:flex; align-items:center; gap:10px;">
                        <span style="color:#009fe3; font-weight:700; font-size:0.75rem; flex-shrink:0;">›</span>
                        Nom court et suffisamment <strong>évocateur</strong>
                    </li>
                    <li style="padding:6px 0; display:flex; align-items:center; gap:10px;">
                        <span style="color:#009fe3; font-weight:700; font-size:0.75rem; flex-shrink:0;">›</span>
                        Underscore pour délimiter — <code style="background:#f0f0f0; padding:1px 6px; border-radius:3px; font-size:0.9em;">code_insee</code>
                    </li>
                </ul>
            </div>
        </div>
        <div style="flex:1;">
            <p style="font-size:0.6rem; text-transform:uppercase; letter-spacing:3px; color:#95c11f; font-weight:700; margin:0 0 10px;">Attributs</p>
            <div class="offbeat-card card--green" style="box-sizing:border-box;">
                <ul style="font-size:0.73rem; margin:0; padding:0; list-style:none; color:#555;">
                    <li style="padding:6px 0; border-bottom:1px solid #f0f0f0; display:flex; align-items:center; gap:10px;">
                        <span style="color:#95c11f; font-weight:700; font-size:0.75rem; flex-shrink:0;">›</span>
                        Juste ceux <strong>nécessaires</strong>
                    </li>
                    <li style="padding:6px 0; border-bottom:1px solid #f0f0f0; display:flex; align-items:center; gap:10px;">
                        <span style="color:#95c11f; font-weight:700; font-size:0.75rem; flex-shrink:0;">›</span>
                        Uniformisation des valeurs
                    </li>
                    <li style="padding:6px 0; border-bottom:1px solid #f0f0f0; display:flex; align-items:center; gap:10px;">
                        <span style="color:#95c11f; font-weight:700; font-size:0.75rem; flex-shrink:0;">›</span>
                        Utilisation de <strong>listes de choix</strong>¹
                    </li>
                    <li style="padding:6px 0; display:flex; align-items:center; gap:10px;">
                        <span style="color:#95c11f; font-weight:700; font-size:0.75rem; flex-shrink:0;">›</span>
                        Codes ou identifiants globaux — ex : <code style="background:#f0f0f0; padding:1px 6px; border-radius:3px; font-size:0.9em;">code_insee</code>
                    </li>
                </ul>
                <p style="font-size:0.58rem; color:#999; margin:10px 0 0; line-height:1.4;">¹ Liste restreignant les valeurs autorisées pour un attribut.</p>
            </div>
        </div>
    </div>

    <div class="fragment" style="margin-top:14px; background:#fff8f0; border-radius:8px; padding:10px 18px; border-left:3px solid #e65100;">
        <p style="font-size:0.7rem; margin:0; color:#555; line-height:1.55;">
            Ces règles restent importantes pour assurer la <strong>meilleure compatibilité</strong> des données entre elles, même si certains logiciels s'en affranchissent.
        </p>
    </div>
</section>


<!-- IDENTIFIANT UNIQUE -->
<section>
    <h2>L'identifiant unique</h2>
    <div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 22px;"></div>

    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-bottom:16px;">
        <div class="fragment" style="background:#f8fafc; border-radius:10px; padding:18px; border-left:4px solid #009fe3;">
            <p style="font-size:0.58rem; text-transform:uppercase; letter-spacing:2px; color:#009fe3; font-weight:700; margin:0 0 6px;">Série incrémentale</p>
            <p style="font-size:0.7rem; color:#666; margin:0 0 10px;">Simple et efficace</p>
            <code style="display:block; background:#e8f5ff; color:#1a6fa8; padding:8px 12px; border-radius:6px; font-size:0.85rem; font-weight:700; letter-spacing:1px;">1 · 2 · 3 · 4…</code>
        </div>
        <div class="fragment" style="background:#f8fafc; border-radius:10px; padding:18px; border-left:4px solid #009fe3;">
            <p style="font-size:0.58rem; text-transform:uppercase; letter-spacing:2px; color:#009fe3; font-weight:700; margin:0 0 6px;">Radical + incrémental</p>
            <p style="font-size:0.7rem; color:#666; margin:0 0 10px;">Lien sémantique</p>
            <code style="display:block; background:#e8f5ff; color:#1a6fa8; padding:8px 12px; border-radius:6px; font-size:0.85rem; font-weight:700; letter-spacing:1px;">EDUC1 · EDUC2…</code>
        </div>
        <div class="fragment" style="background:#f8fafc; border-radius:10px; padding:18px; border-left:4px solid #009fe3;">
            <p style="font-size:0.58rem; text-transform:uppercase; letter-spacing:2px; color:#009fe3; font-weight:700; margin:0 0 6px;">Radical formaté</p>
            <p style="font-size:0.7rem; color:#666; margin:0 0 10px;">Tri naturel garanti</p>
            <code style="display:block; background:#e8f5ff; color:#1a6fa8; padding:8px 12px; border-radius:6px; font-size:0.85rem; font-weight:700; letter-spacing:1px;">EDUC001…</code>
        </div>
    </div>

    <div class="fragment">
        <div class="offbeat-card card--red">
            <p style="font-size:0.58rem; text-transform:uppercase; letter-spacing:2px; color:#e53e3e; font-weight:700; margin:0 0 6px;">⚠ Attention aux faux identifiants</p>
            <p style="font-size:0.73rem; margin:0; line-height:1.7; color:#555;">
                Le <strong>code postal</strong> n'est pas un identifiant unique — une commune peut avoir plusieurs codes postaux, et deux communes peuvent partager le même.
            </p>
        </div>
    </div>
</section>


<!-- RELATIONS ENTRE TABLES -->
<section>
    <h2>Les relations entre tables</h2>
    <div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 14px;"></div>
    <p style="font-size:0.73rem; color:#888; margin:0 0 18px; line-height:1.55;">Une relation doit relier des attributs de <strong>même type</strong> — Texte→Texte, Nombre→Nombre. L'un des deux attributs est généralement un identifiant unique.</p>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">

        <div class="fragment" style="background:#f8fafc; border-radius:10px; padding:16px 18px; border-left:4px solid #009fe3; display:flex; align-items:flex-start; gap:14px;">
            <div style="text-align:center; flex-shrink:0; min-width:52px;">
                <div style="font-family:'IBM Plex Serif',serif; font-size:1.2rem; font-weight:700; color:#009fe3; line-height:1;">1 — 1</div>
                <div style="font-size:0.55rem; color:#999; margin-top:2px; text-transform:uppercase; letter-spacing:1px;">cardinalité</div>
            </div>
            <div>
                <p style="font-size:0.6rem; font-weight:700; text-transform:uppercase; color:#009fe3; margin:0 0 4px; letter-spacing:1px;">Relation 1 à 1</p>
                <p style="font-size:0.72rem; margin:0; color:#555; line-height:1.6;">Chaque enregistrement A correspond à <strong>exactement un</strong> enregistrement B.</p>
            </div>
        </div>

        <div class="fragment" style="background:#f0f9e8; border-radius:10px; padding:16px 18px; border-left:4px solid #95c11f; display:flex; align-items:flex-start; gap:14px;">
            <div style="text-align:center; flex-shrink:0; min-width:52px;">
                <div style="font-family:'IBM Plex Serif',serif; font-size:1.2rem; font-weight:700; color:#95c11f; line-height:1;">1 — ∞</div>
                <div style="font-size:0.55rem; color:#999; margin-top:2px; text-transform:uppercase; letter-spacing:1px;">cardinalité</div>
            </div>
            <div>
                <p style="font-size:0.6rem; font-weight:700; text-transform:uppercase; color:#95c11f; margin:0 0 4px; letter-spacing:1px;">Relation 1 à plusieurs</p>
                <p style="font-size:0.72rem; margin:0; color:#555; line-height:1.6;">Un enregistrement A peut correspondre à <strong>plusieurs</strong> enregistrements B.</p>
            </div>
        </div>

        <div class="fragment" style="background:#f5f5f5; border-radius:10px; padding:16px 18px; border-left:4px solid #555; display:flex; align-items:flex-start; gap:14px;">
            <div style="text-align:center; flex-shrink:0; min-width:52px;">
                <div style="font-family:'IBM Plex Serif',serif; font-size:1.2rem; font-weight:700; color:#555; line-height:1;">∞ — 1</div>
                <div style="font-size:0.55rem; color:#999; margin-top:2px; text-transform:uppercase; letter-spacing:1px;">cardinalité</div>
            </div>
            <div>
                <p style="font-size:0.6rem; font-weight:700; text-transform:uppercase; color:#555; margin:0 0 4px; letter-spacing:1px;">Relation plusieurs à 1</p>
                <p style="font-size:0.72rem; margin:0; color:#555; line-height:1.6;">Plusieurs enregistrements A correspondent à <strong>un seul</strong> enregistrement B.</p>
            </div>
        </div>

        <div class="fragment" style="background:#fff5f5; border-radius:10px; padding:16px 18px; border-left:4px solid #e53e3e; display:flex; align-items:flex-start; gap:14px;">
            <div style="text-align:center; flex-shrink:0; min-width:52px;">
                <div style="font-family:'IBM Plex Serif',serif; font-size:1.2rem; font-weight:700; color:#e53e3e; line-height:1;">∞ — ∞</div>
                <div style="font-size:0.55rem; color:#999; margin-top:2px; text-transform:uppercase; letter-spacing:1px;">cardinalité</div>
            </div>
            <div>
                <p style="font-size:0.6rem; font-weight:700; text-transform:uppercase; color:#e53e3e; margin:0 0 4px; letter-spacing:1px;">Relation plusieurs à plusieurs</p>
                <p style="font-size:0.72rem; margin:0; color:#555; line-height:1.6;">Plusieurs A ↔ plusieurs B — nécessite une <strong>table de liaison</strong>.</p>
            </div>
        </div>
    </div>
</section>


<!-- TYPES DE CHAMPS -->
<section>
    <h2>Bien choisir les types de champs</h2>
    <div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 14px;"></div>
    <p style="font-size:0.73rem; color:#888; margin:0 0 16px; line-height:1.55;">Le type détermine ce qu'on peut faire avec la valeur — calcul, tri, filtre.</p>

    <div class="types-grid">
        <div class="fragment type-card">
            <div class="type-name">Texte</div>
            <div class="type-desc">Description libre, non calculable</div>
            <div class="type-example">commentaire : "conducteur agressif"</div>
        </div>
        <div class="fragment type-card">
            <div class="type-name">Numérique entier</div>
            <div class="type-desc">Nombre sans virgule, calculable</div>
            <div class="type-example">duree_min : 12</div>
        </div>
        <div class="fragment type-card">
            <div class="type-name">Numérique décimal</div>
            <div class="type-desc">Nombre avec virgule (flottant)</div>
            <div class="type-example">distance_km : 3.7</div>
        </div>
        <div class="fragment type-card">
            <div class="type-name">Date</div>
            <div class="type-desc">Triable, calculable, filtrable</div>
            <div class="type-example">date : 2024-03-21</div>
        </div>
        <div class="fragment type-card" style="border-left-color:#e53e3e; background:#fff8f8;">
            <div class="type-name" style="color:#e53e3e;">⚠ Chiffre en Texte</div>
            <div class="type-desc">Quand le chiffre ne sert pas à calculer</div>
            <div class="type-example">code_insee : "01001"</div>
        </div>
    </div>

    <div class="fragment" style="margin-top:14px; background:#fff8f0; border-radius:8px; padding:10px 18px; border-left:3px solid #e65100;">
        <p style="font-size:0.7rem; margin:0; color:#555; line-height:1.55;">
            <strong>Code INSEE :</strong> stocker <code style="background:#f0f0f0; padding:1px 6px; border-radius:3px;">01001</code> dans un champ numérique supprimerait le <code style="background:#f0f0f0; padding:1px 6px; border-radius:3px;">0</code> initial. Les chiffres sans calcul vont dans un champ <strong>Texte</strong>.
        </p>
    </div>
</section>

`;
