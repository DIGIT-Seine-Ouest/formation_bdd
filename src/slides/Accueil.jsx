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
            DIGIT Formation · 2026</p>

        <h1 style="
            position:relative; z-index:1;
            margin:0; line-height:1.08; font-size:2.8rem;">
            Valoriser le potentiel des données
        </h1>

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
            1 h mixte (théorie/pratique)</span>
    </div>
</div>
`;

const histoire = `
<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60vh; text-align:center;">
    <p style="font-size:0.8rem; text-transform:uppercase; letter-spacing:5px; color:#f59e0b; margin:0 0 18px; font-weight:700;">Intro</p>
    <h1 style="font-family:'IBM Plex Serif',serif; font-size:3.4rem; line-height:1.1; margin:0; color:#0f4c75; font-style:italic;">Pour commencer</h1>
    <div style="width:80px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:22px 0 0;"></div>
</div>
`;

const programme = `
<h2>Ce que vous allez apprendre</h2>
<div style="width:48px; height:3px; background:linear-gradient(90deg,#009fe3,#95c11f); border-radius:2px; margin:0 0 22px;"></div>

<div style="display:flex; flex-direction:column; gap:10px; max-width:720px; margin:0 auto;">

    <div class="offbeat-card fragment" style="padding:12px 18px;">
        <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:38px; height:38px; background:#009fe3; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:0.9rem; flex-shrink:0;">1</div>
            <div>
                <p style="margin:0; font-weight:700; font-size:0.84rem;">Le socle — qu'est-ce qu'une base de données ?</p>
                <p style="margin:3px 0 0; font-size:0.66rem; color:#666;">Entités, vocabulaire, modèle relationnel</p>
            </div>
        </div>
    </div>

    <div class="offbeat-card fragment" style="padding:12px 18px;">
        <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:38px; height:38px; background:#009fe3; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:0.9rem; flex-shrink:0;">2</div>
            <div>
                <p style="margin:0; font-weight:700; font-size:0.84rem;">Les deux typologies — OLTP · OLAP</p>
                <p style="margin:3px 0 0; font-size:0.66rem; color:#666;">Opérationnel vs analyse — et quand l'OLTP suffit (annuaire, référentiel)</p>
            </div>
        </div>
    </div>

    <div class="offbeat-card fragment card--green" style="padding:12px 18px;">
        <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:38px; height:38px; background:var(--green-dirmob); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:0.9rem; flex-shrink:0;">3</div>
            <div>
                <p style="margin:0; font-weight:700; font-size:0.84rem;">Le pont OLTP → OLAP</p>
                <p style="margin:3px 0 0; font-size:0.66rem; color:#666;">Quand le métier veut un tableau de bord : cadrer le besoin, puis construire</p>
            </div>
        </div>
    </div>

    <div class="offbeat-card fragment card--grey" style="padding:12px 18px;">
        <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:38px; height:38px; background:#333; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:0.9rem; flex-shrink:0;">4</div>
            <div>
                <p style="margin:0; font-weight:700; font-size:0.84rem;">Plot twist — le Modern Data Stack</p>
                <p style="margin:3px 0 0; font-size:0.66rem; color:#666;">ETL vs ELT · architecture medallion · la même logique, industrialisée</p>
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
      <section dangerouslySetInnerHTML={{ __html: histoire }} />
      <section dangerouslySetInnerHTML={{ __html: programme }} />
    </>
  );
}
