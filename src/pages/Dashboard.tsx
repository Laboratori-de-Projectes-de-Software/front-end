import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NeuralBackground from "../components/NeuralBackground";
import "./Dashboard.css";
import Button from "../components/Button";
import CreateLeagueModal from "../components/CreateLeagueModal";


const Dashboard: React.FC = () => {
  // Estados para almacenar datos del dashboard
  const [myBots, setMyBots] = useState<any[]>([]);
  const [activeLeagues, setActiveLeagues] = useState<any[]>([]);
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Simular carga de datos (esto se reemplazaría con llamadas API reales)
  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setMyBots([
        { id: 1, name: "ArgumentBot", wins: 5, losses: 2 },
        { id: 2, name: "DebateKing", wins: 3, losses: 1 },
      ]);

      setActiveLeagues([
        {
          id: 1,
          name: "Liga Profesional",
          participants: 8,
          status: "En curso",
          progress: 75,
        },
        {
          id: 2,
          name: "Torneo Novatos",
          participants: 6,
          status: "Inscripción",
          progress: 0,
        },
      ]);

      setRecentMatches([
        {
          id: 1,
          date: "2025-03-25",
          bot1: "ArgumentBot",
          bot2: "SmartDebater",
          result: "Victoria",
        },
        {
          id: 2,
          date: "2025-03-24",
          bot1: "DebateKing",
          bot2: "LogicMaster",
          result: "Derrota",
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="dashboard">
      <NeuralBackground />
      <Navbar />

      <div className="dashboard-content">
        <h1>Panel de Control</h1>

        {loading ? (
          <div className="loading">Cargando datos...</div>
        ) : (
          <>
            <div className="dashboard-summary">
              <div className="summary-card">
                <h3>Mis Bots</h3>
                <div className="summary-value">{myBots.length}</div>
              </div>
              <div className="summary-card">
                <h3>Ligas activas</h3>
                <div className="summary-value">{activeLeagues.length}</div>
              </div>
              <div className="summary-card">
                <h3>Enfrentamientos</h3>
                <div className="summary-value">{recentMatches.length}</div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-section">
                <div className="section-header">
                  <h2>Mis Bots</h2>
                  <button
                    className="action-button"
                    onClick={() => (window.location.href = "/mybots")}
                  >
                    Ver todos
                  </button>
                </div>
                <div className="section-content">
                  {myBots.map((bot) => (
                    <div className="bot-card" key={bot.id}>
                      <div className="bot-name">{bot.name}</div>
                      <div className="bot-stats">
                        <span className="wins">{bot.wins}V</span> /{" "}
                        <span className="losses">{bot.losses}D</span>
                      </div>
                    </div>
                  ))}
                  <div className="create-new">
                    <Button
                        className={"create-new-button"}
                        label="Crear bot"
                        onClick={() => (window.location.href = "/bots/new")}
                    />
                  </div>
                </div>
              </div>

              <div className="dashboard-section">
                <div className="section-header">
                  <h2>Ligas Activas</h2>
                  <button
                    className="action-button"
                    onClick={() => (window.location.href = "/leagues")}
                  >
                    Ver todas
                  </button>
                </div>
                <div className="section-content">
                  {activeLeagues.map((league) => (
                      <div className="league-card" key={league.id}>
                        <div className="league-name">{league.name}</div>
                        <div className="league-status">
                          Estado: {league.status}
                        </div>
                        <div className="progress-bar">
                          <div
                              className="progress-fill"
                              style={{width: `${league.progress}%`}}
                          ></div>
                        </div>
                        <div className="league-participants">
                          {league.participants} participantes
                        </div>
                      </div>
                  ))}
                  <div className="create-new">
                    <Button
                        className={"create-new-button"}
                        label="Crear liga"
                        onClick={openModal}
                    />
                  </div>
                </div>
              </div>

              <div className="dashboard-section">
                <div className="section-header">
                  <h2>Enfrentamientos Recientes</h2>
                  <button
                      className="action-button"
                      onClick={() => (window.location.href = "/matches")}
                  >
                    Ver todos
                  </button>
                </div>
                <div className="section-content">
                  {recentMatches.map((match) => (
                    <div className="match-card" key={match.id}>
                      <div className="match-date">{match.date}</div>
                      <div className="match-bots">
                        {match.bot1} vs {match.bot2}
                      </div>
                      <div
                        className={`match-result ${match.result.toLowerCase()}`}
                      >
                        {match.result}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <CreateLeagueModal isOpen={isModalOpen} onClose={closeModal} />
    </div>

  );
};

export default Dashboard;
