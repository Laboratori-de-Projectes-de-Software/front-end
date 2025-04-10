import { FC, useState } from "react"
import "./league.scss"
import { appApi } from "../../features/shared/client"
import LoadingScreen from "../../modules/shared/loading-screen/loading-screen"
import ErrorPage from "../../modules/shared/error-page/error-page"

export type Props = {
  leagueId: number
}

const League : FC<Props> = ({ leagueId }) => {
  const [activeTab, setActiveTab] = useState("clasificacion")

  const queryLeague = appApi.useGetLeagueLeagueIdQuery(leagueId, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })
  const queryMatches = appApi.useGetLeagueLeagueIdMatchQuery(leagueId, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })
  const queryLeaderboard = appApi.useGetLeagueLeagueIdLeaderboardQuery(leagueId, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  if (queryLeague.isLoading || queryMatches.isLoading || queryLeaderboard.isLoading) {
    return <LoadingScreen message="Cargando liga..." />
  }

  if (queryLeague.isError || queryMatches.isError || queryLeaderboard.isError) {
    return <ErrorPage message="Error al cargar la liga" />
  }

  const leagueInfo = queryLeague.data!;
  const matches = queryMatches.data!;
  const leaderboard = queryLeaderboard.data!;

  return (
    <div className="dark-theme">
      <div className="league-container">
        <div className="league-content">
          {/* Cabecera de la liga */}
          <div className="league-header">
            <div className="league-header-content">
              <div className="league-image-container">
                <img src={leagueInfo.urlImagen} alt={leagueInfo.name} className="league-image" />
              </div>
              <div className="league-info">
                <h1 className="league-title">{leagueInfo.name}</h1>
                <div className="league-stats">
                  <div className="league-stat">
                    <span className="stat-label">Estado</span>
                    <span className="stat-value status-active">{leagueInfo.state}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pestañas de navegación */}
          <div className="tabs-container">
            <div className="tabs-list">
              <button
                className={`tab-button ${activeTab === "clasificacion" ? "active" : ""}`}
                onClick={() => setActiveTab("clasificacion")}
              >
                Clasificación
              </button>
              <button
                className={`tab-button ${activeTab === "partidos" ? "active" : ""}`}
                onClick={() => setActiveTab("partidos")}
              >
                Partidos
              </button>
            </div>

            {/* Contenido de la pestaña de clasificación */}
            {activeTab === "clasificacion" && (
              <div className="tab-content">
                <div className="standings-card">
                  <h2 className="section-title">Tabla de clasificación</h2>
                  <div className="standings-table-container">
                    <table className="standings-table">
                      <thead>
                        <tr>
                          <th className="pos-column">Pos</th>
                          <th className="team-column">Bot</th>
                          <th className="record-column">Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboard.map((team) => (
                          <tr key={team.position} className={team.position <= 3 ? "top-position" : ""}>
                            <td className="pos-column">{team.position}</td>
                            <td className="team-column">{team.name}</td>
                            <td className="record-column">{team.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Contenido de la pestaña de partidos */}
            {activeTab === "partidos" && (
              <div className="tab-content">
                <div className="matches-card">
                  <h2 className="section-title">Partidos recientes y próximos</h2>
                  <div className="matches-list">
                    {matches.map((match) => (
                      <div key={match.matchId} className={`match-item ${match.state === "finalizado" ? "completed" : ""}`}>
                        <div className="match-header">
                          <span className={`match-status ${match.state === "finalizado" ? "completed" : "upcoming"}`}>
                            {match.state}
                          </span>
                        </div>
                        <div className="match-content">
                          <div className="match-team home-team">
                            <span className="team-name">{match.fighters[0]}</span>
                          </div>
                          <div className="match-vs">VS</div>
                          <div className="match-team away-team">
                            <span className="team-name">{match.fighters[1]}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default League;