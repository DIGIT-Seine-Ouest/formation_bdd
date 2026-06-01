const intro = `
<div style="text-align:left; max-width:700px; margin:0 auto; color:white;">
    <p class="section-intro-label" style="color:rgba(255,255,255,0.7);">Serious Game · 1h15</p>
    <p class="section-intro-title">Chaos<br>Engineering</p>
    <p class="section-intro-sub" style="color:rgba(255,255,255,0.85);">Construire une base de données sous contrainte — et la tester jusqu'à ce qu'elle tienne ou cède.</p>
    <p style="font-size:0.68rem; color:rgba(255,255,255,0.45); margin-top:18px; font-style:italic;">Inspiré de la pratique Netflix : injecter des perturbations pour révéler les failles d'architecture.</p>
</div>
`;

const deroulement = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0 0 4px; font-weight:700;">Le scénario</p>
<h2 style="margin-top:0;">Trois phases, deux équipes, un seul objectif</h2>

<div style="display:flex; gap:0; margin:14px 0 18px; align-items:stretch;">

    <div style="flex:1; background:#f0f8ff; border-radius:10px 0 0 10px; padding:18px 20px; border:2px solid #009fe3; border-right:none;">
        <p style="font-size:0.52rem; font-weight:700; color:#009fe3; text-transform:uppercase; letter-spacing:2px; margin:0 0 8px;">Phase 1 · 25 min</p>
        <p style="font-size:0.7rem; font-weight:700; color:#1e40af; margin:0 0 8px;">Construction des tables</p>
        <div style="display:flex; gap:8px; margin-bottom:8px;">
            <div style="flex:1; background:white; border-radius:6px; padding:8px 10px; border-left:3px solid #009fe3;">
                <p style="font-size:0.54rem; font-weight:700; color:#009fe3; margin:0 0 3px;">📇 Équipe A · Référentiels</p>
                <p style="font-size:0.52rem; color:#333; margin:0;"><strong>prestataires</strong> + <strong>ref_motifs</strong></p>
            </div>
            <div style="flex:1; background:white; border-radius:6px; padding:8px 10px; border-left:3px solid #95c11f;">
                <p style="font-size:0.54rem; font-weight:700; color:#2e7d32; margin:0 0 3px;">🚍 Équipe B · Réseau bus</p>
                <p style="font-size:0.52rem; color:#333; margin:0;"><strong>lignes_bus</strong> + <strong>communes</strong></p>
            </div>
        </div>
        <p style="font-size:0.52rem; color:#555; margin:0; font-style:italic;">Les deux équipes travaillent en parallèle — et doivent se parler.</p>
    </div>

    <div style="background:#009fe3; padding:14px 10px; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:3px; flex-shrink:0;">
        <div style="font-size:1.2rem; color:white;">→</div>
    </div>

    <div style="flex:1; background:#f0f9e8; padding:18px 20px; border:2px solid #95c11f; border-left:none; border-right:none;">
        <p style="font-size:0.52rem; font-weight:700; color:#95c11f; text-transform:uppercase; letter-spacing:2px; margin:0 0 8px;">Phase 2 · 20 min</p>
        <p style="font-size:0.7rem; font-weight:700; color:#2e7d32; margin:0 0 8px;">Saisie collective</p>
        <div style="background:white; border-radius:6px; padding:8px 10px; border-left:3px solid #95c11f; margin-bottom:8px;">
            <p style="font-size:0.54rem; font-weight:700; color:#333; margin:0 0 3px;">Équipes A + B ensemble</p>
            <p style="font-size:0.52rem; color:#333; margin:0;">Table <strong>reclamations</strong> — la table centrale</p>
        </div>
        <p style="font-size:0.52rem; color:#555; margin:0; font-style:italic;">Les FK des deux premières tables sont maintenant utilisées.</p>
    </div>

    <div style="background:#95c11f; padding:14px 10px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
        <div style="font-size:1.2rem; color:white;">→</div>
    </div>

    <div style="flex:1; background:#fff8e1; border-radius:0 10px 10px 0; padding:18px 20px; border:2px solid #f59e0b; border-left:none;">
        <p style="font-size:0.52rem; font-weight:700; color:#f59e0b; text-transform:uppercase; letter-spacing:2px; margin:0 0 8px;">Phase 3 · 25 min</p>
        <p style="font-size:0.7rem; font-weight:700; color:#b45309; margin:0 0 8px;">Chaos Engineering</p>
        <div style="background:white; border-radius:6px; padding:8px 10px; border-left:3px solid #f59e0b; margin-bottom:8px;">
            <p style="font-size:0.52rem; color:#333; margin:0;">Questions de plus en plus complexes — jusqu'au <strong>tableau de bord</strong> : quel prestataire ? quelle commune ? quelle ligne ?</p>
        </div>
        <p style="font-size:0.52rem; color:#555; margin:0; font-style:italic;">La bascule OLTP → OLAP : on saisit, ça se calcule seul.</p>
    </div>

</div>

<div style="background:#1e293b; border-radius:8px; padding:12px 20px;">
    <p style="font-size:0.7rem; color:white; margin:0; text-align:center; line-height:1.7;">
        Règle du jeu : <strong style="color:#009fe3;">Équipe B ne peut pas avancer sans les IDs d'Équipe A.</strong>
        La communication inter-équipes <em>est</em> le jeu — elle simule exactement comment fonctionne une clé étrangère.
    </p>
</div>
`;

const briefA = `
<div style="display:flex; gap:6px; align-items:center; margin-bottom:12px;">
    <div style="background:#009fe3; color:white; font-size:0.6rem; font-weight:700; padding:4px 12px; border-radius:20px; text-transform:uppercase; letter-spacing:1px;">Équipe A</div>
    <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0; font-weight:700;">Phase 1 · Construction</p>
</div>
<h2 style="margin-top:0;">Vous gérez les prestataires de transport</h2>

<div style="background:#f0f8ff; border-radius:8px; padding:14px 18px; border-left:4px solid #009fe3; margin-bottom:18px;">
    <p style="font-size:0.66rem; color:#333; line-height:1.7; margin:0;">
        La DIRMOB travaille avec plusieurs opérateurs de transport. Votre équipe doit concevoir la table qui les recense.
        L'Équipe B en aura besoin pour construire la sienne — <strong>ne leur donnez que vos IDs</strong>, pas toute votre table.
    </p>
</div>

<div style="display:flex; flex-direction:column; gap:10px;">

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.6rem; flex-shrink:0;">🎯</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.6;">
            <strong>Quelle est l'entité ici ?</strong> En une phrase : un enregistrement de cette table, c'est quoi exactement ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.6rem; flex-shrink:0;">🔑</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.6;">
            <strong>Comment identifier chaque prestataire sans ambiguïté ?</strong> Le nom suffit-il — que se passe-t-il s'il change ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.6rem; flex-shrink:0;">📋</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.6;">
            <strong>Quels attributs faut-il absolument connaître ?</strong> Quelles questions devra-t-on pouvoir répondre depuis cette table dans 6 mois ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.6rem; flex-shrink:0;">📝</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.6;">
            <strong>type_contrat</strong> — texte libre ou liste fermée ? Combien de valeurs différentes peut-il prendre ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.6rem; flex-shrink:0;">🏷️</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.6;">
            <strong>Votre équipe possède aussi la liste des motifs de réclamation.</strong> Combien de motifs distincts ? Une liste fermée numérotée, ou un texte ressaisi à la main à chaque réclamation ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#fff8e1; border-radius:8px; padding:12px 18px; border-left:4px solid #f59e0b;">
        <div style="font-size:1.6rem; flex-shrink:0;">⚠</div>
        <p style="font-size:0.68rem; color:#b45309; margin:0; line-height:1.6; font-weight:600;">
            Dès que vous avez défini vos identifiants, communiquez-les à voix haute à l'Équipe B. Ils sont bloqués sans vous.
        </p>
    </div>

</div>
`;

const briefB = `
<div style="display:flex; gap:6px; align-items:center; margin-bottom:12px;">
    <div style="background:#95c11f; color:white; font-size:0.6rem; font-weight:700; padding:4px 12px; border-radius:20px; text-transform:uppercase; letter-spacing:1px;">Équipe B</div>
    <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--green-dirmob); margin:0; font-weight:700;">Phase 1 · Construction</p>
</div>
<h2 style="margin-top:0;">Vous gérez les lignes de bus</h2>

<div style="background:#f0f9e8; border-radius:8px; padding:14px 18px; border-left:4px solid #95c11f; margin-bottom:18px;">
    <p style="font-size:0.66rem; color:#333; line-height:1.7; margin:0;">
        La DIRMOB surveille plusieurs lignes de bus. Votre équipe doit concevoir la table qui les référence.
        Vous aurez besoin des IDs de l'Équipe A — <strong>attendez qu'ils vous les communiquent</strong> avant de renseigner l'opérateur.
    </p>
</div>

<div style="display:flex; flex-direction:column; gap:10px;">

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.6rem; flex-shrink:0;">🎯</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.6;">
            <strong>Quelle est l'entité ici ?</strong> Qu'est-ce qui distingue une ligne d'une autre — uniquement son numéro ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.6rem; flex-shrink:0;">🔗</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.6;">
            <strong>Comment relier une ligne à son opérateur</strong> sans recopier "Keolis" dans chaque cellule ?
            Si Keolis est racheté demain, combien de cellules modifiez-vous ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.6rem; flex-shrink:0;">📍</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.6;">
            <strong>Une ligne dessert plusieurs communes — et une commune est desservie par plusieurs lignes.</strong>
            Comment stocker ça proprement ? Combien de tables faut-il ?
            Que se passe-t-il si demain on ajoute un code postal à chaque commune ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.6rem; flex-shrink:0;">📋</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.6;">
            <strong>Quels attributs permettent de répondre à ces questions</strong> : "Quelles lignes Transdev sont encore actives ?" · "Combien de lignes régionales vs locales ?"
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#fff8e1; border-radius:8px; padding:12px 18px; border-left:4px solid #f59e0b;">
        <div style="font-size:1.6rem; flex-shrink:0;">⚠</div>
        <p style="font-size:0.68rem; color:#b45309; margin:0; line-height:1.6; font-weight:600;">
            Attendez les IDs de l'Équipe A avant de remplir la colonne opérateur.
            Puis communiquez vos IDs de lignes à tout le monde pour la phase collective.
        </p>
    </div>

</div>
`;

const briefReclamations = `
<div style="display:flex; gap:6px; align-items:center; margin-bottom:12px;">
    <div style="background:#64748b; color:white; font-size:0.6rem; font-weight:700; padding:4px 12px; border-radius:20px; text-transform:uppercase; letter-spacing:1px;">Équipes A + B</div>
    <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--grey-dirmob); margin:0; font-weight:700;">Phase 2 · Construction — la table centrale</p>
</div>
<h2 style="margin-top:0;">Ensemble : la table <code>reclamations</code></h2>

<div style="background:#f5f5f5; border-radius:8px; padding:14px 18px; border-left:4px solid #64748b; margin-bottom:16px;">
    <p style="font-size:0.66rem; color:#333; line-height:1.7; margin:0;">
        Vos deux équipes ont leurs référentiels. On enregistre maintenant les <strong>réclamations</strong> qui les relient — c'est là qu'on saisit chaque jour.
        <strong>Ne dessinez pas encore la table : répondez d'abord. La structure viendra à la fin.</strong>
    </p>
</div>

<div style="display:flex; flex-direction:column; gap:9px;">

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:11px 18px;">
        <div style="font-size:1.5rem; flex-shrink:0;">🎯</div>
        <p style="font-size:0.66rem; color:#333; margin:0; line-height:1.6;">
            <strong>Quelle est l'entité ?</strong> Une seule ligne de cette table, ça représente quoi exactement — en une phrase ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:11px 18px;">
        <div style="font-size:1.5rem; flex-shrink:0;">🔗</div>
        <p style="font-size:0.66rem; color:#333; margin:0; line-height:1.6;">
            La réclamation concerne une <strong>ligne de bus</strong>. Comment la relier <strong>sans recopier "169 - Transdev"</strong> dans chaque cellule ? Vous utilisez quoi, fourni par quelle équipe ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:11px 18px;">
        <div style="font-size:1.5rem; flex-shrink:0;">📍</div>
        <p style="font-size:0.66rem; color:#333; margin:0; line-height:1.6;">
            Elle vise aussi une <strong>commune</strong> et un <strong>motif</strong>. Texte libre saisi à la main — ou on pointe vers les référentiels <code>ref_communes</code> et <code>ref_motifs</code> ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:11px 18px;">
        <div style="font-size:1.5rem; flex-shrink:0;">🔁</div>
        <p style="font-size:0.66rem; color:#333; margin:0; line-height:1.6;">
            On veut savoir si une réclamation est <strong>traitée</strong>, et en <strong>combien de temps</strong>. Une seule colonne suffit-elle ? Faut-il une date <em>et</em> un indicateur 0/1 ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#f8fafc; border-radius:8px; padding:11px 18px;">
        <div style="font-size:1.5rem; flex-shrink:0;">📝</div>
        <p style="font-size:0.66rem; color:#333; margin:0; line-height:1.6;">
            <strong>Un seul champ mérite le texte libre.</strong> Lequel ? Et pourquoi tous les autres doivent rester codés ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:center; background:#fff8e1; border-radius:8px; padding:11px 18px; border-left:4px solid #f59e0b;">
        <div style="font-size:1.5rem; flex-shrink:0;">⚠</div>
        <p style="font-size:0.66rem; color:#b45309; margin:0; line-height:1.6; font-weight:600;">
            On saisit les <strong>identifiants</strong> des Équipes A et B — jamais les noms. Les noms vivent dans les référentiels, un seul endroit.
        </p>
    </div>

</div>
`;

const debriefReclamations = `
<div style="display:flex; gap:6px; align-items:center; margin-bottom:12px;">
    <div style="background:#64748b; color:white; font-size:0.6rem; font-weight:700; padding:4px 12px; border-radius:20px; text-transform:uppercase; letter-spacing:1px;">Équipes A + B</div>
    <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--grey-dirmob); margin:0; font-weight:700;">Phase 2 · La structure qui en résulte</p>
</div>
<h2 style="margin-top:0;">La table <code>reclamations</code> — le résultat</h2>
<p style="font-size:0.72rem; color:#888; margin-top:-12px; margin-bottom:14px;">Vos réponses dessinent exactement ceci : 3 clés étrangères vers vos référentiels, un seul champ libre.</p>

<div class="fragment offbeat-card card--green" style="padding:13px; margin-bottom:12px;">
    <table class="mockup-table" style="font-size:0.46em;">
        <tr>
            <th style="background:#1e40af; color:white;">id_reclamation</th>
            <th>date_reclamation</th>
            <th style="background:#fef3c7; color:#a16207;">id_ligne</th>
            <th style="background:#fef3c7; color:#a16207;">id_motif</th>
            <th style="background:#fef3c7; color:#a16207;">id_commune</th>
            <th>objet_libre</th>
            <th>date_cloture</th>
            <th>cloturee</th>
        </tr>
        <tr>
            <td style="background:#dbe4ff; color:#1e40af; font-weight:700;">PK</td>
            <td style="font-size:0.9em; color:#888;">Date</td>
            <td style="background:#fef9e7; color:#a16207; font-style:italic;">FK → lignes_bus</td>
            <td style="background:#fef9e7; color:#a16207; font-style:italic;">FK → ref_motifs</td>
            <td style="background:#fef9e7; color:#a16207; font-style:italic;">FK → ref_communes</td>
            <td style="font-size:0.9em; color:#888;">Texte libre</td>
            <td style="font-size:0.9em; color:#888;">Date / vide</td>
            <td style="font-size:0.9em; color:#888;">0 / 1</td>
        </tr>
        <tr><td style="color:#1e40af; font-weight:700;">R001</td><td>05/01/2024</td><td style="color:#a16207; font-weight:700;">L169</td><td>1</td><td style="color:#6b21a8; font-weight:700;">C003</td><td style="color:#666;">Retard de 20 min à Meudon</td><td>07/01/2024</td><td>1</td></tr>
        <tr><td style="color:#1e40af; font-weight:700;">R002</td><td>09/01/2024</td><td style="color:#a16207; font-weight:700;">L169</td><td>1</td><td style="color:#6b21a8; font-weight:700;">C004</td><td style="color:#666;">Retard répété le matin</td><td></td><td>0</td></tr>
        <tr><td style="color:#1e40af; font-weight:700;">R003</td><td>12/01/2024</td><td style="color:#a16207; font-weight:700;">L323</td><td>3</td><td style="color:#6b21a8; font-weight:700;">C003</td><td style="color:#666;">Bus supprimé sans annonce</td><td></td><td>0</td></tr>
    </table>
</div>

<div class="row" style="gap:12px; align-items:stretch;">
    <div class="fragment" style="flex:1; background:#f0fdf4; border-radius:8px; padding:11px 16px; border-left:4px solid #15803d;">
        <p style="font-size:0.6rem; font-weight:700; color:#15803d; margin:0 0 5px;">Le test de la phrase</p>
        <p style="font-size:0.58rem; color:#333; margin:0; line-height:1.6;">« R001, le 05/01, sur la ligne <strong>L169</strong>, à <strong>Meudon</strong>, motif <strong>Retard</strong> — clôturée le 07/01. » 1 ligne = 1 fait. ✓</p>
    </div>
    <div class="fragment" style="flex:1; background:#1e293b; border-radius:8px; padding:11px 16px;">
        <p style="font-size:0.6rem; font-weight:700; color:white; margin:0 0 5px;">La règle d'or</p>
        <p style="font-size:0.58rem; color:#94a3b8; margin:0; line-height:1.6;">Tout est <strong style="color:#009fe3;">codé</strong> sauf <code style="color:#95c11f;">objet_libre</code>. Donc tout est <strong style="color:white;">comptable, filtrable, analysable</strong> — c'est ce qui rend le tableau de bord possible.</p>
    </div>
</div>
`;

const debriefA = `
<div style="display:flex; gap:6px; align-items:center; margin-bottom:12px;">
    <div style="background:#009fe3; color:white; font-size:0.6rem; font-weight:700; padding:4px 12px; border-radius:20px; text-transform:uppercase; letter-spacing:1px;">Équipe A</div>
    <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--blue-dirmob); margin:0; font-weight:700;">Phase 1 · On teste ce que vous avez construit</p>
</div>
<h2 style="margin-top:0;">La structure tient-elle ? — <code>prestataires</code></h2>

<div style="display:flex; flex-direction:column; gap:10px; margin-bottom:14px;">

    <div class="fragment" style="display:flex; gap:14px; align-items:flex-start; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.4rem; flex-shrink:0; padding-top:2px;">💥</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.7;">
            <strong>Votre identifiant peut-il changer un jour ?</strong><br>
            Si Keolis est racheté par Transdev et change de nom — que se passe-t-il dans votre table ? Et dans la table de l'Équipe B qui pointe vers vous ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:flex-start; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.4rem; flex-shrink:0; padding-top:2px;">📅</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.7;">
            <strong>Pouvez-vous me dire quels contrats expirent en 2025 ?</strong><br>
            Vos dates sont-elles dans un format qu'Excel peut calculer — ou en texte libre ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:flex-start; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.4rem; flex-shrink:0; padding-top:2px;">📝</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.7;">
            <strong>Combien de valeurs distinctes avez-vous dans type_contrat ?</strong><br>
            Est-ce que "dsp", "DSP" et "D.S.P." sont dans votre table ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:flex-start; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.4rem; flex-shrink:0; padding-top:2px;">🗣</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.7;">
            <strong>Test de la phrase</strong> — lisez votre première ligne à voix haute en une phrase.<br>
            <span style="color:#888; font-style:italic;">Si la phrase est cohérente → l'enregistrement est robuste. Si elle "accroche" → quelque chose est à revoir.</span>
        </p>
    </div>

</div>

<div class="fragment" style="border-top:2px dashed #009fe3; padding-top:14px;">
    <p style="font-size:0.54rem; text-transform:uppercase; letter-spacing:2px; color:#009fe3; font-weight:700; margin:0 0 8px;">→ Structure attendue — vos deux référentiels</p>
    <div style="display:flex; gap:10px; align-items:flex-start;">
    <div class="offbeat-card card--green" style="padding:11px; flex:2.2;">
        <p style="font-size:0.45rem; font-weight:700; color:#1e40af; font-family:monospace; margin:0 0 4px;">prestataires</p>
        <table class="mockup-table" style="font-size:0.44em;">
            <tr>
                <th style="background:#1e40af; color:white;">id_prestataire</th>
                <th>nom_prestataire</th>
                <th>type_contrat</th>
                <th>date_debut_contrat</th>
                <th>date_fin_contrat</th>
            </tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">P001</td><td>Keolis Île-de-France</td><td>DSP</td><td>2022-01-01</td><td>2026-12-31</td></tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">P002</td><td>RATP Dev</td><td>DSP</td><td>2020-06-01</td><td>2025-05-31</td></tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">P003</td><td>Transdev Île-de-France</td><td>DSP</td><td>2021-03-01</td><td>2026-02-28</td></tr>
            <tr><td style="background:#dbe4ff; color:#1e40af; font-weight:700;">P004</td><td>ATM Croix du Sud</td><td>Convention</td><td>2023-01-01</td><td>2027-12-31</td></tr>
        </table>
        <p style="font-size:0.5rem; color:#2e7d32; margin:6px 0 0; font-weight:600;">PK non-signifiante · type_contrat énuméré · dates ISO calculables</p>
    </div>
    <div class="offbeat-card" style="padding:11px; flex:1;">
        <p style="font-size:0.45rem; font-weight:700; color:#15803d; font-family:monospace; margin:0 0 4px;">ref_motifs</p>
        <table class="mockup-table" style="font-size:0.42em;">
            <tr><th style="background:#15803d; color:white;">id_motif</th><th>libelle_motif</th></tr>
            <tr><td style="color:#15803d; font-weight:700;">1</td><td>Retard</td></tr>
            <tr><td style="color:#15803d; font-weight:700;">2</td><td>Information voyageurs</td></tr>
            <tr><td style="color:#15803d; font-weight:700;">3</td><td>Suppression de service</td></tr>
            <tr><td style="color:#15803d; font-weight:700;">4</td><td>Comportement conducteur</td></tr>
            <tr><td style="color:#15803d; font-weight:700;">5</td><td>Confort / Surcharge</td></tr>
            <tr><td style="color:#15803d; font-weight:700;">6</td><td>Infrastructure / Arrêt</td></tr>
        </table>
        <p style="font-size:0.48rem; color:#2e7d32; margin:5px 0 0; font-weight:600;">Liste fermée → comptages fiables</p>
    </div>
    </div>
</div>
`;

const debriefB = `
<div style="display:flex; gap:6px; align-items:center; margin-bottom:12px;">
    <div style="background:#95c11f; color:white; font-size:0.6rem; font-weight:700; padding:4px 12px; border-radius:20px; text-transform:uppercase; letter-spacing:1px;">Équipe B</div>
    <p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--green-dirmob); margin:0; font-weight:700;">Phase 1 · On teste ce que vous avez construit</p>
</div>
<h2 style="margin-top:0;">La structure tient-elle ? — <code>lignes_bus</code></h2>

<div style="display:flex; flex-direction:column; gap:10px; margin-bottom:14px;">

    <div class="fragment" style="display:flex; gap:14px; align-items:flex-start; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.4rem; flex-shrink:0; padding-top:2px;">💥</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.7;">
            <strong>Avez-vous écrit "Keolis" ou "P001" dans la colonne opérateur ?</strong><br>
            Si vous avez écrit le nom — combien de cellules modifiez-vous si Keolis change de nom ?
            Si vous avez mis l'ID — 0 modification. Pourquoi ?
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:flex-start; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.4rem; flex-shrink:0; padding-top:2px;">🔍</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.7;">
            <strong>Pouvez-vous me lister toutes les lignes qui passent par Meudon ?</strong><br>
            Si communes_desservies contient "Meudon/Issy/Boulogne" dans une cellule → <code>COUNTIF</code> ne peut pas répondre.
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:flex-start; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.4rem; flex-shrink:0; padding-top:2px;">🚌</div>
        <p style="font-size:0.68rem; color:#333; margin:0; line-height:1.7;">
            <strong>Comment désactiver une ligne sans la supprimer ?</strong><br>
            Si une ligne est temporairement suspendue — vous supprimez la ligne ? Vous perdez alors l'historique des réclamations qui y sont liées.
        </p>
    </div>

    <div class="fragment" style="display:flex; gap:14px; align-items:flex-start; background:#f8fafc; border-radius:8px; padding:12px 18px;">
        <div style="font-size:1.4rem; flex-shrink:0; padding-top:2px;">🗣</div>
        <div style="font-size:0.68rem; color:#333; margin:0; line-height:1.7;">
            <strong>Test de la phrase</strong> — lisez une ligne de <code>passe_par</code> à voix haute.<br>
            <span style="color:#2e7d32; font-style:italic;">"La ligne L389 passe par Meudon (C003)."</span> — 1 ligne, 1 fait. ✓<br>
            <span style="color:#888; font-size:0.9em;">Trois communes = trois lignes dans <code>passe_par</code>. La relation many-to-many est normalisée.</span>
        </div>
    </div>

</div>

<div class="fragment" style="border-top:2px dashed #95c11f; padding-top:12px;">
    <p style="font-size:0.54rem; text-transform:uppercase; letter-spacing:2px; color:#95c11f; font-weight:700; margin:0 0 10px;">→ Structure attendue : trois tables</p>

    <div style="display:flex; gap:8px; align-items:flex-start; margin-bottom:10px;">

        <!-- lignes_bus -->
        <div style="flex:1.4;">
            <p style="font-size:0.45rem; font-weight:700; color:#15803d; font-family:monospace; margin:0 0 3px;">lignes_bus</p>
            <table class="mockup-table" style="font-size:0.4em;">
                <tr>
                    <th style="background:#15803d; color:white;">id_ligne</th>
                    <th>numero</th>
                    <th style="background:#fef3c7; color:#a16207;">id_prestataire</th>
                    <th>type_service</th>
                    <th>actif</th>
                </tr>
                <tr><td style="background:#dcfce7; color:#15803d; font-weight:700;">L389</td><td>389</td><td style="color:#a16207; font-weight:700;">P004</td><td>local</td><td>1</td></tr>
                <tr><td style="background:#dcfce7; color:#15803d; font-weight:700;">L169</td><td>169</td><td style="color:#a16207; font-weight:700;">P003</td><td>local</td><td>1</td></tr>
                <tr><td style="background:#dcfce7; color:#15803d; font-weight:700;">L058</td><td>58</td><td style="color:#a16207; font-weight:700;">P002</td><td>local</td><td>1</td></tr>
            </table>
        </div>

        <!-- FK arrow right -->
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding-top:22px; flex-shrink:0; gap:2px;">
            <span style="font-size:0.55rem; color:#a16207; font-family:monospace; font-weight:700;">FK id_ligne</span>
            <span style="font-size:1rem; color:#a16207;">⟶</span>
        </div>

        <!-- passe_par (junction) -->
        <div style="flex:0.9;">
            <p style="font-size:0.45rem; font-weight:700; color:#a16207; font-family:monospace; margin:0 0 3px;">passe_par <span style="color:#888; font-weight:400; font-size:0.9em;">(table de liaison)</span></p>
            <table class="mockup-table" style="font-size:0.4em;">
                <tr>
                    <th style="background:#fef3c7; color:#a16207;">id_ligne</th>
                    <th style="background:#fef3c7; color:#a16207;">id_commune</th>
                </tr>
                <tr><td style="color:#a16207; font-weight:700;">L389</td><td style="color:#a16207; font-weight:700;">C003</td></tr>
                <tr><td style="color:#a16207; font-weight:700;">L389</td><td style="color:#a16207; font-weight:700;">C002</td></tr>
                <tr><td style="color:#a16207; font-weight:700;">L389</td><td style="color:#a16207; font-weight:700;">C001</td></tr>
                <tr><td style="color:#a16207; font-weight:700;">L169</td><td style="color:#a16207; font-weight:700;">C004</td></tr>
                <tr><td colspan="2" style="color:#888; font-style:italic; font-size:0.85em;">… 18 lignes au total</td></tr>
            </table>
        </div>

        <!-- FK arrow right -->
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding-top:22px; flex-shrink:0; gap:2px;">
            <span style="font-size:0.55rem; color:#a16207; font-family:monospace; font-weight:700;">FK id_commune</span>
            <span style="font-size:1rem; color:#a16207;">⟶</span>
        </div>

        <!-- ref_communes -->
        <div style="flex:1;">
            <p style="font-size:0.45rem; font-weight:700; color:#6b21a8; font-family:monospace; margin:0 0 3px;">ref_communes</p>
            <table class="mockup-table" style="font-size:0.4em;">
                <tr>
                    <th style="background:#6b21a8; color:white;">id_commune</th>
                    <th>nom_commune</th>
                </tr>
                <tr><td style="background:#f3e8ff; color:#6b21a8; font-weight:700;">C001</td><td>Boulogne-Billancourt</td></tr>
                <tr><td style="background:#f3e8ff; color:#6b21a8; font-weight:700;">C002</td><td>Issy-les-Moulineaux</td></tr>
                <tr><td style="background:#f3e8ff; color:#6b21a8; font-weight:700;">C003</td><td>Meudon</td></tr>
                <tr><td style="background:#f3e8ff; color:#6b21a8; font-weight:700;">C004</td><td>Clamart</td></tr>
                <tr><td colspan="2" style="color:#888; font-style:italic; font-size:0.85em;">… 8 communes</td></tr>
            </table>
            <div style="background:#dcfce7; border-radius:5px; padding:5px 8px; margin-top:5px; border-left:3px solid #15803d;">
                <p style="font-size:0.4rem; font-family:monospace; color:#15803d; font-weight:700; margin:0;">=COUNTIF(passe_par!B:B, "C003")</p>
                <p style="font-size:0.38rem; color:#555; margin:2px 0 0;">→ toutes les lignes passant par Meudon ✓</p>
            </div>
        </div>

    </div>

    <div style="background:#1e293b; border-radius:7px; padding:9px 16px;">
        <p style="font-size:0.55rem; color:white; margin:0; font-family:monospace; text-align:center; letter-spacing:0.3px; line-height:1.8;">
            reclamations <span style="color:#f59e0b;">─FK id_ligne→</span> lignes_bus <span style="color:#a16207;">←FK─ passe_par ─FK→</span> ref_communes
            &nbsp;&nbsp;|&nbsp;&nbsp;
            lignes_bus <span style="color:#f59e0b;">─FK id_prestataire→</span> prestataires
        </p>
    </div>
</div>
`;

const chaos1 = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--red-alert); margin:0 0 4px; font-weight:700;">Phase 3 — Chaos Engineering</p>
<h2 style="margin-top:0;">Niveau 1 · Questions simples</h2>
<p style="font-size:0.72rem; color:#888; margin-top:-14px; margin-bottom:14px;">Si votre structure est propre, ces questions prennent moins de 2 minutes.</p>

<div style="display:flex; flex-direction:column; gap:12px;">

    <div style="display:flex; gap:14px; align-items:stretch;">
        <div style="flex:1; background:#f5f5f5; border-radius:8px; padding:14px 16px; border-left:4px solid #555;">
            <p style="font-size:0.7rem; font-weight:700; color:#333; margin:0 0 8px;">Q1 — Combien de réclamations non clôturées ?</p>
            <div class="fragment" style="background:#dcfce7; border-radius:6px; padding:8px 12px; border-left:3px solid #15803d;">
                <p style="font-size:0.62rem; font-family:monospace; color:#15803d; font-weight:700; margin:0;">=COUNTIF(reclamations!H:H, 0)</p>
                <p style="font-size:0.54rem; color:#555; margin:4px 0 0;">colonne <code>cloturee</code> = 0</p>
            </div>
        </div>
        <div style="flex:1; background:#f5f5f5; border-radius:8px; padding:14px 16px; border-left:4px solid #555;">
            <p style="font-size:0.7rem; font-weight:700; color:#333; margin:0 0 8px;">Q2 — Combien de réclamations pour motif "Retard" ?</p>
            <div class="fragment" style="background:#dcfce7; border-radius:6px; padding:8px 12px; border-left:3px solid #15803d;">
                <p style="font-size:0.62rem; font-family:monospace; color:#15803d; font-weight:700; margin:0;">=COUNTIF(reclamations!D:D, 1)</p>
                <p style="font-size:0.54rem; color:#555; margin:4px 0 0;"><code>id_motif</code> = 1 (Retard dans ref_motifs)</p>
            </div>
        </div>
    </div>

    <div style="display:flex; gap:14px; align-items:stretch;">
        <div style="flex:1; background:#f5f5f5; border-radius:8px; padding:14px 16px; border-left:4px solid #555;">
            <p style="font-size:0.7rem; font-weight:700; color:#333; margin:0 0 8px;">Q3 — Combien de réclamations sur la ligne 169 ?</p>
            <div class="fragment" style="background:#dcfce7; border-radius:6px; padding:8px 12px; border-left:3px solid #15803d;">
                <p style="font-size:0.62rem; font-family:monospace; color:#15803d; font-weight:700; margin:0;">=COUNTIF(reclamations!C:C, "L169")</p>
                <p style="font-size:0.54rem; color:#555; margin:4px 0 0;"><code>id_ligne</code> = "L169" — FK vers lignes_bus</p>
            </div>
        </div>
        <div style="flex:1; background:#f5f5f5; border-radius:8px; padding:14px 16px; border-left:4px solid #555;">
            <p style="font-size:0.7rem; font-weight:700; color:#333; margin:0 0 8px;">Q4 — Retards non clôturés sur la ligne 169 ?</p>
            <div class="fragment" style="background:#dcfce7; border-radius:6px; padding:8px 12px; border-left:3px solid #15803d;">
                <p style="font-size:0.62rem; font-family:monospace; color:#15803d; font-weight:700; margin:0;">=COUNTIFS(C:C,"L169", D:D,1, H:H,0)</p>
                <p style="font-size:0.54rem; color:#555; margin:4px 0 0;">3 critères simultanés — possible grâce aux 3 colonnes distinctes</p>
            </div>
        </div>
    </div>

</div>
`;

const chaos2 = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--red-alert); margin:0 0 4px; font-weight:700;">Phase 3 — Chaos Engineering</p>
<h2 style="margin-top:0;">Niveau 2 · Jointure obligatoire</h2>
<p style="font-size:0.72rem; color:#888; margin-top:-14px; margin-bottom:14px;">Ces questions traversent plusieurs tables — impossibles si les données sont dupliquées.</p>

<div style="display:flex; flex-direction:column; gap:12px;">

    <div style="background:#f5f5f5; border-radius:8px; padding:14px 16px; border-left:4px solid #e53e3e;">
        <p style="font-size:0.7rem; font-weight:700; color:#333; margin:0 0 8px;">Q5 — Quel opérateur cumule le plus de réclamations non clôturées ?</p>
        <div class="fragment" style="background:#dbe4ff; border-radius:6px; padding:10px 14px; border-left:3px solid #1e40af;">
            <p style="font-size:0.58rem; color:#1e40af; font-weight:700; margin:0 0 6px;">Traversée : reclamations → lignes_bus → prestataires</p>
            <p style="font-size:0.56rem; font-family:monospace; color:#333; margin:0 0 4px; line-height:1.8;">
                1. Dans lignes_bus : trouver toutes les lignes Transdev (id_prestataire = P003)<br>
                2. Dans reclamations : COUNTIFS(id_ligne, &lt;lignes P003&gt;, cloturee, 0)<br>
                3. Répéter pour chaque opérateur → comparer
            </p>
            <p style="font-size:0.54rem; color:#888; margin:6px 0 0;">→ Avec duplication du nom d'opérateur : laborieux et risqué d'incohérence · Avec FK : mécanique et fiable</p>
        </div>
    </div>

    <div style="background:#f5f5f5; border-radius:8px; padding:14px 16px; border-left:4px solid #e53e3e;">
        <p style="font-size:0.7rem; font-weight:700; color:#333; margin:0 0 8px;">Q6 — Bilan mensuel des réclamations par motif (mars 2024)</p>
        <div class="fragment" style="background:#dcfce7; border-radius:6px; padding:10px 14px; border-left:3px solid #15803d;">
            <p style="font-size:0.62rem; font-family:monospace; color:#15803d; font-weight:700; margin:0 0 4px;">=COUNTIFS(D:D, 1, B:B, ">="&DATE(2024,3,1), B:B, "<"&DATE(2024,4,1))</p>
            <p style="font-size:0.54rem; color:#555; margin:0;">motif = 1 (Retard) ET date entre 01/03 et 31/03 · Remplacer 1 par 2, 3… pour chaque motif</p>
        </div>
    </div>

    <div class="fragment" style="background:#1e293b; border-radius:8px; padding:12px 18px;">
        <p style="font-size:0.7rem; color:white; margin:0; text-align:center; line-height:1.7;">
            Si votre colonne <code style="color:#009fe3;">id_motif</code> contient "retard + propreté" →
            <strong style="color:#ef4444;">ces formules sont impossibles.</strong><br>
            C'est le Chaos Engineering : la question révèle la fragilité de l'architecture.
        </p>
    </div>

</div>
`;

const olapFinal = `
<p style="font-size:0.72rem; text-transform:uppercase; letter-spacing:3px; color:var(--green-dirmob); margin:0 0 4px; font-weight:700;">Phase 3 — Bascule OLAP · la table finale</p>
<h2 style="margin-top:0;">Le tableau de bord qui répond tout seul</h2>
<p style="font-size:0.72rem; color:#888; margin-top:-14px; margin-bottom:12px;">Une feuille <code>tableau_de_bord</code> — aucune saisie, que des formules. On a posé 3 questions métier : voici les réponses.</p>

<!-- KPI band -->
<div style="display:flex; gap:8px; margin-bottom:12px;">
    <div style="flex:1; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:8px 6px; text-align:center;">
        <p style="font-size:0.46rem; color:#64748b; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin:0;">Total</p>
        <p style="font-size:1.2rem; color:#1e3a5f; font-weight:700; margin:2px 0 0;">22</p>
    </div>
    <div style="flex:1; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:8px 6px; text-align:center;">
        <p style="font-size:0.46rem; color:#15803d; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin:0;">Clôturées</p>
        <p style="font-size:1.2rem; color:#15803d; font-weight:700; margin:2px 0 0;">12</p>
    </div>
    <div style="flex:1; background:#fff0f0; border:1px solid #fecaca; border-radius:8px; padding:8px 6px; text-align:center;">
        <p style="font-size:0.46rem; color:#c0392b; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin:0;">Non clôt.</p>
        <p style="font-size:1.2rem; color:#c0392b; font-weight:700; margin:2px 0 0;">10</p>
    </div>
    <div style="flex:1; background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:8px 6px; text-align:center;">
        <p style="font-size:0.46rem; color:#009fe3; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin:0;">Taux clôture</p>
        <p style="font-size:1.2rem; color:#009fe3; font-weight:700; margin:2px 0 0;">55%</p>
    </div>
    <div style="flex:1; background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:8px 6px; text-align:center;">
        <p style="font-size:0.46rem; color:#d97706; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin:0;">Délai moyen</p>
        <p style="font-size:1.2rem; color:#d97706; font-weight:700; margin:2px 0 0;">2,8 j</p>
    </div>
</div>

<!-- 3 questions métier → réponses (fragments) -->
<div style="display:flex; gap:10px; align-items:stretch;">

    <div class="fragment" style="flex:1; background:#fff0f0; border-radius:8px; padding:11px 13px; border-top:4px solid #c0392b;">
        <p style="font-size:0.52rem; color:#c0392b; font-weight:700; margin:0 0 4px;">🔴 Prestataire le plus problématique ?</p>
        <p style="font-size:0.92rem; color:#c0392b; font-weight:700; margin:0;">Transdev</p>
        <p style="font-size:0.5rem; color:#888; margin:1px 0 7px;">8 réclamations non clôturées</p>
        <p style="font-size:0.42rem; font-family:monospace; color:#555; margin:0; line-height:1.6; background:white; border-radius:4px; padding:5px 7px;">=INDEX(noms;MATCH(MAX(non_clot);non_clot;0))<br><span style="color:#999;">via</span> SUMIF(lignes_bus → prestataires)</p>
    </div>

    <div class="fragment" style="flex:1; background:#f5f0ff; border-radius:8px; padding:11px 13px; border-top:4px solid #7c3aed;">
        <p style="font-size:0.52rem; color:#7c3aed; font-weight:700; margin:0 0 4px;">🟣 Commune la plus impactée ?</p>
        <p style="font-size:0.92rem; color:#7c3aed; font-weight:700; margin:0;">Meudon</p>
        <p style="font-size:0.5rem; color:#888; margin:1px 0 7px;">7 réclamations au total</p>
        <p style="font-size:0.42rem; font-family:monospace; color:#555; margin:0; line-height:1.6; background:white; border-radius:4px; padding:5px 7px;">=COUNTIF(reclamations!E:E;"C003")<br><span style="color:#999;">E = id_commune (FK)</span></p>
    </div>

    <div class="fragment" style="flex:1; background:#f0fdf4; border-radius:8px; padding:11px 13px; border-top:4px solid #15803d;">
        <p style="font-size:0.52rem; color:#15803d; font-weight:700; margin:0 0 4px;">🟢 Ligne la plus problématique ?</p>
        <p style="font-size:0.92rem; color:#15803d; font-weight:700; margin:0;">L169</p>
        <p style="font-size:0.5rem; color:#888; margin:1px 0 7px;">7 réclamations · 6 ouvertes</p>
        <p style="font-size:0.42rem; font-family:monospace; color:#555; margin:0; line-height:1.6; background:white; border-radius:4px; padding:5px 7px;">=COUNTIF(reclamations!C:C;"L169")<br><span style="color:#999;">C = id_ligne (FK)</span></p>
    </div>

</div>

<div class="fragment" style="background:#1e293b; border-radius:8px; padding:11px 18px; margin-top:12px;">
    <p style="font-size:0.66rem; color:white; margin:0; text-align:center; line-height:1.6;">
        Une nouvelle réclamation = <strong style="color:#95c11f;">1 ligne saisie</strong> = tout se recalcule.
        Les questions difficiles sont devenues des <strong style="color:#009fe3;">formules simples</strong> — c'est ça, la bascule OLTP → OLAP.
    </p>
</div>

<p style="font-size:0.5rem; color:#b45309; margin:8px 0 0; text-align:center;">📁 Corrigé : <code>exercices/reclamations_complet.xlsx</code> &nbsp;·&nbsp; 📖 Pas à pas : <code>exercices/TUTORIEL_construction.md</code></p>
`;

export function SeriousGame() {
  return (
    <>
      <section
        data-background-gradient="linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f4c75 100%)"
        dangerouslySetInnerHTML={{ __html: intro }}
      />
      <section dangerouslySetInnerHTML={{ __html: deroulement }} />
      {/* Équipe A — construction ↕ test+révélation */}
      <section>
        <section dangerouslySetInnerHTML={{ __html: briefA }} />
        <section dangerouslySetInnerHTML={{ __html: debriefA }} />
      </section>
      {/* Équipe B — construction ↕ test+révélation */}
      <section>
        <section dangerouslySetInnerHTML={{ __html: briefB }} />
        <section dangerouslySetInnerHTML={{ __html: debriefB }} />
      </section>
      {/* Phase 2 — Ensemble : reclamations · questions ↕ structure révélée */}
      <section>
        <section dangerouslySetInnerHTML={{ __html: briefReclamations }} />
        <section dangerouslySetInnerHTML={{ __html: debriefReclamations }} />
      </section>
      <section>
        <section dangerouslySetInnerHTML={{ __html: chaos1 }} />
        <section dangerouslySetInnerHTML={{ __html: chaos2 }} />
        <section dangerouslySetInnerHTML={{ __html: olapFinal }} />
      </section>
    </>
  );
}
