// ─── Temps 4 : « Et chez nous ? » — nos réalisations avec les villes ────────
// Chaque page illustre une des règles vues sur le fichier des librairies.
// Structures relevées via l'API Explore v2.1 des portails (novembre 2026).

const BG = '#0f4c75';

const REAL = [
  {
    ville: 'Meudon',
    titre: 'Annuaire des associations',
    url: 'https://data.meudon.fr/pages/annuaire-des-asso-2025/',
    regle: 'Une ligne = un fait',
    pourquoi: 'Une association qui a deux lieux d’activité = deux lignes. Pas « Stade X + Gymnase Y » dans une même cellule. C’est ce qui permet de filtrer et de cartographier chaque lieu.',
    volume: '112 lignes',
    cols: ['categorie', 'sous_categorie', 'nom_de_l_association', 'public', '*lieu_dactivite', '*adresse_du_lieu', '*pointgeo', 'telephone · mail · web'],
  },
  {
    ville: 'Sèvres',
    titre: 'Annuaire des commerces',
    url: 'https://data.sevres.fr/pages/annuairecommerce/',
    regle: 'Une colonne = une information',
    pourquoi: 'L’adresse est découpée : numéro, répétition (bis, ter), voie, code INSEE. Une adresse découpée se géolocalise ; une adresse en vrac, non.',
    volume: '209 commerces',
    cols: ['categorie', 'org_entreprise', '*num_loc', '*rep_loc', '*localisation', '*code_insee', 'code_postal · commune', 'geo_point_2d', 'horaire · site_web'],
  },
  {
    ville: 'Boulogne-Billancourt',
    titre: 'Équipements sportifs',
    url: 'https://boulognebillancourt-seineouest.opendatasoft.com/pages/equipements-sportifs/',
    regle: 'Des identifiants officiels',
    pourquoi: 'Rien n’a été ressaisi : on a repris la base nationale Data ES (ministère des Sports) grâce à ses identifiants. Quand la base nationale évolue, la page suit.',
    volume: '178 équipements',
    cols: ['*numero_de_l_installation_sportive', '*numero_de_l_equipement_sportif', 'nom_de_l_installation_sportive', 'type_d_equipement_sportif', 'adresse', '*commune_insee', 'coordonnees'],
  },
];

export function ChezNous() {
  return (
    <>
      <section data-background-color={BG}>
        <div className="section-intro">
          <div className="num">4</div>
          <div className="title">Et chez nous ?</div>
          <div className="sub">Des données propres et bien structurées, jusqu'au bout. Voilà ce que ça donne pour les habitants.</div>
          <div className="promise">🚀 Faciliter l'exploitation</div>
        </div>
      </section>

      <section>
        <p className="kicker">Nos réalisations avec les villes</p>
        <h2>Trois pages, trois règles</h2>
        <div className="row">
          {REAL.map((r) => (
            <div key={r.ville} className="card card--green col fragment">
              <p className="kicker" style={{ color: 'var(--green)' }}>{r.ville}</p>
              <p style={{ fontWeight: 700, fontSize: 22 }}>{r.titre}</p>
              <p className="pill pill--blue" style={{ margin: '10px 0' }}>{r.regle}</p>
              <p className="small muted">{r.volume}</p>
            </div>
          ))}
        </div>
        <p className="fragment small" style={{ marginTop: 22 }}>Ce sont exactement les règles appliquées à mon fichier des librairies. <b>Juste poussées jusqu'au bout.</b></p>
      </section>

      {REAL.map((r) => (
        <section key={r.ville}>
          <p className="kicker">{r.ville} · {r.regle}</p>
          <h2 style={{ fontSize: 28, marginBottom: 12 }}>{r.titre}</h2>
          <div className="real">
            <div className="stack">
              <div className="card card--blue">
                <p className="tiny muted" style={{ marginBottom: 6 }}>Ce qu'il y a derrière ({r.volume})</p>
                <div className="cols">
                  {r.cols.map((c) => (
                    <div key={c}>{c.startsWith('*') ? <span className="hl">{c.slice(1)}</span> : c}</div>
                  ))}
                </div>
              </div>
              <p className="small">{r.pourquoi}</p>
              <a className="btn" href={r.url} target="_blank" rel="noreferrer">Ouvrir la page ↗</a>
            </div>
            <iframe data-src={r.url} title={r.titre} loading="lazy" />
          </div>
        </section>
      ))}
    </>
  );
}
