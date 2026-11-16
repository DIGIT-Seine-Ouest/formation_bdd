// ─── Épisode 4 : Rémi appelle la DIGIT + la chaîne nationale ────────────────
// Le coup de fil → les réalisations avec les villes → l'utopie open data.

const REAL = [
  {
    ville: 'Meudon', titre: 'Annuaire des associations',
    url: 'https://data.meudon.fr/pages/annuaire-des-asso-2025/',
    regle: 'Une ligne = un fait',
    pourquoi: `Une association avec deux lieux d'activité = deux lignes, pas « Stade X + Gymnase Y » dans une cellule. C'est ce qui permet de filtrer et de cartographier chaque lieu.`,
    volume: '112 lignes',
    cols: ['categorie', 'sous_categorie', 'nom_de_l_association', 'public', '*lieu_dactivite', '*adresse_du_lieu', '*pointgeo', 'telephone · mail · web'],
  },
  {
    ville: 'Sèvres', titre: 'Annuaire des commerces',
    url: 'https://data.sevres.fr/pages/annuairecommerce/',
    regle: 'Une colonne = une information',
    pourquoi: `L'adresse est découpée : numéro, répétition (bis, ter), voie, code INSEE. Une adresse découpée se géolocalise ; une adresse en vrac, non.`,
    volume: '209 commerces',
    cols: ['categorie', 'org_entreprise', '*num_loc', '*rep_loc', '*localisation', '*code_insee', 'code_postal · commune', 'geo_point_2d', 'horaire · site_web'],
  },
  {
    ville: 'Boulogne-Billancourt', titre: 'Équipements sportifs',
    url: 'https://boulognebillancourt-seineouest.opendatasoft.com/pages/equipements-sportifs/',
    regle: 'Des identifiants officiels',
    pourquoi: `Reprise de la base nationale Data ES (ministère des Sports). Rien n'a été ressaisi : on a filtré la base nationale grâce à ses identifiants. Quand la base évolue, la page suit.`,
    volume: '178 équipements',
    cols: ['*numero_de_l_installation_sportive', '*numero_de_l_equipement_sportif', 'nom_de_l_installation_sportive', 'type_d_equipement_sportif', 'adresse', '*commune_insee', 'coordonnees'],
  },
];

export function ChezNous() {
  return (
    <>
      <section data-background-color="#0f4c75">
        <div className="bd-transition" style={{ color: '#fff' }}>
          <div className="ep">Épisode 4</div>
          <div className="title">Rémi appelle la DIGIT</div>
          <div className="sub">« J'ai un fichier propre. On peut en faire quelque chose pour tout le monde ? »</div>
        </div>
      </section>

      {/* ── Le coup de fil ── */}
      <section>
        <div className="bd bd-2" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="caption">📞 Rémi décroche son téléphone.</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span className="avatar avatar-sm">🧑‍💻</span>
              <div className="bubble" style={{ fontSize: 17 }}>
                J'ai structuré mes données sur les librairies. C'est propre : une ligne par librairie, des codes INSEE, un dictionnaire.<br />
                <b>Est-ce qu'on peut en faire quelque chose de plus ?</b>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexDirection: 'row-reverse', textAlign: 'right' }}>
              <span className="avatar avatar-sm">🏢</span>
              <div className="bubble bubble--right" style={{ fontSize: 17 }}>
                Avec un fichier comme ça, <b>oui</b>. On peut :<br />
                📈 En interne → un <b>tableau de bord</b> pour les élus<br />
                🌐 En externe → un <b>annuaire</b> pour les habitants<br />
                🗺️ Et bonus → une <b>carte</b> si tu ajoutes les adresses
              </div>
            </div>
            <div className="caption" style={{ marginBottom: 0 }}>
              💬 C'est exactement ce qu'on a fait avec les villes. Et voici le résultat :
            </div>
          </div>

          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="caption">Deux usages, une seule source :</div>
            <div className="card card--blue" style={{ padding: 12 }}>
              <p style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--blue)', fontWeight: 700 }}>Usage interne</p>
              <p style={{ fontSize: 16 }}>📈 <b>Tableau de bord</b> — pour répondre aux questions récurrentes des élus et de la direction, sans ressaisir.</p>
              <p className="small muted" style={{ marginTop: 4 }}>« Combien ? Lesquelles ? Ça évolue ? » → 1 clic.</p>
            </div>
            <div className="card card--green" style={{ padding: 12 }}>
              <p style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--green)', fontWeight: 700 }}>Usage externe</p>
              <p style={{ fontSize: 16 }}>🌐 <b>Annuaire / Carte</b> — un service grand public, sur le portail de la ville.</p>
              <p className="small muted" style={{ marginTop: 4 }}>Les habitants cherchent, filtrent, trouvent. Zéro développement : la page est générée par la donnée.</p>
            </div>
            <div className="tip fragment" style={{ fontSize: 14 }}>
              <div>La même donnée sert les deux usages. C'est la structuration qui rend ça possible.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Les 3 réalisations ── */}
      <section>
        <p className="kicker">Les preuves vivantes</p>
        <h2 style={{ fontSize: 28, marginBottom: 10 }}>Trois pages, trois règles — en production</h2>
        <div className="bd bd-3" style={{ maxWidth: 1050, margin: '0 auto' }}>
          {REAL.map((r) => (
            <div key={r.ville} className="panel panel--win fragment">
              <p className="kicker" style={{ color: 'var(--green)' }}>{r.ville}</p>
              <p style={{ fontWeight: 700, fontSize: 20 }}>{r.titre}</p>
              <p className="pill pill--blue" style={{ margin: '10px 0' }}>{r.regle}</p>
              <p className="small muted">{r.volume}</p>
            </div>
          ))}
        </div>
        <p className="fragment small center" style={{ marginTop: 14 }}>Les mêmes règles que celles appliquées par Rémi. Juste <b>poussées jusqu'au bout</b>.</p>
      </section>

      {/* ── Détail de chaque réalisation ── */}
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

      {/* ── La chaîne nationale : l'utopie open data ── */}
      <section>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p className="kicker">L'utopie (qui existe déjà)</p>
          <h2 style={{ fontSize: 28, marginBottom: 6 }}>De mon bureau… au service national</h2>
          <div className="caption" style={{ marginBottom: 16 }}>
            💬 Le fichier de Rémi ne reste pas dans un tiroir. Voici la chaîne complète :
          </div>
          <div className="chain">
            <div className="chain-step fragment" style={{ background: 'var(--blue-soft)', color: 'var(--navy)' }}>
              <span style={{ fontSize: 28 }}>🧑‍💻</span><br />
              <b>Rémi</b><br />
              <span className="small">saisit les librairies<br />de GPSO (17)</span>
            </div>
            <div className="chain-arrow fragment">→</div>
            <div className="chain-step fragment" style={{ background: 'var(--green-soft)', color: '#3f6212' }}>
              <span style={{ fontSize: 28 }}>🏢</span><br />
              <b>DIGIT</b><br />
              <span className="small">ouvre les données<br />portail local</span>
            </div>
            <div className="chain-arrow fragment">→</div>
            <div className="chain-step fragment" style={{ background: '#ede9fe', color: '#6b21a8' }}>
              <span style={{ fontSize: 28 }}>📈🗺️🌐</span><br />
              <b>Valorisation locale</b><br />
              <span className="small">TDB élus · annuaire<br />habitants · carte</span>
            </div>
            <div className="chain-arrow fragment">→</div>
            <div className="chain-step fragment" style={{ background: '#fef3c7', color: '#92400e' }}>
              <span style={{ fontSize: 28 }}>🏛️</span><br />
              <b>Agrégation nationale</b><br />
              <span className="small">Ministère de la Culture<br />data.gouv.fr (3 237)</span>
            </div>
            <div className="chain-arrow fragment">→</div>
            <div className="chain-step fragment" style={{ background: 'var(--navy)', color: '#fff' }}>
              <span style={{ fontSize: 28 }}>🌍</span><br />
              <b>Réutilisation</b><br />
              <span className="small">chercheurs · startups<br />citoyens · presse</span>
            </div>
          </div>
          <div className="callout fragment" style={{ marginTop: 20, fontSize: 20, textAlign: 'center' }}>
            Tout commence par <b>un fichier bien structuré</b> sur le poste de Rémi.
          </div>
        </div>
      </section>
    </>
  );
}
