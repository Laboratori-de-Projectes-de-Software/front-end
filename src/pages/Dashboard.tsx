import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NeuralBackground from "../components/NeuralBackground";
import "./Dashboard.css";
import Button from "../components/Button";
import CreateLeagueModal from "../components/CreateLeagueModal";
import CreateBotModal from "../components/CreateBotModal";
import { fetchUserBots } from "../controllers/BotController";
import ButtonCreate from "../components/ButtonCreate";
import {fetchUserLeagues} from "../controllers/LeaguesController";

const Dashboard: React.FC = () => {
  // Estados para almacenar datos del dashboard
  const [myBots, setMyBots] = useState<any[]>([]);
  const [activeLeagues, setActiveLeagues] = useState<any[]>([]);
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para los modales
  const [isLeagueModalOpen, setIsLeagueModalOpen] = useState(false);
  const [isBotModalOpen, setIsBotModalOpen] = useState(false);

  // Funciones para controlar modales
  const openLeagueModal = () => setIsLeagueModalOpen(true);
  const openBotModal = () => setIsBotModalOpen(true);
  const closeLeagueModal = () => {
    setIsLeagueModalOpen(false);
    // Recargar las ligas desde la base de datos
    setLoading(true);
    fetchUserLeagues(
        (leagueData) => setActiveLeagues(leagueData),
        (error) => console.error("Error fetching leagues:", error)
    ).finally(() => setLoading(false));
  };

  const closeBotModal = () => {
    setIsBotModalOpen(false);
    // Recargar los bots desde la base de datos
    setLoading(true);
    fetchUserBots(
        (botData) => setMyBots(botData),
        (error) => console.error("Error fetching bots:", error)
    ).finally(() => setLoading(false));
  };

  // Cargar datos del usuario
  useEffect(() => {
    // Cargar bots del usuario usando el controlador
    fetchUserBots(
      (botData) => setMyBots(botData),
      (error) => console.error("Error fetching bots:", error)
    );

    fetchUserLeagues(
        (leagueData) => setActiveLeagues(leagueData),
        (error) => console.error("Error fetching leagues:", error)
    )

    // Simulación de carga para otros datos
    setTimeout(() => {

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
          <div className="loading-dashboard">Cargando datos...</div>
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
                    onClick={() => (window.location.href = "/bots")}
                  >
                    Ver todos
                  </button>
                </div>
                <div className="section-content">
                  {myBots.slice(0,3).map((bot) => (
                      <div className="cards" key={bot.id}>
                        <div className="bots-info">
                          <div className="bots-name">{bot.name}</div>
                        </div>
                        <div className="bot-stats">
                          <span className="wins">{bot.wins || 0}W</span>
                          <span className="stats-divider">/</span>
                          <span className="losses">{bot.losses || 0}L</span>
                        </div>
                      </div>
                    )
                  )
                  }
                  <div className="create-new">
                    <ButtonCreate
                      label="Crear bot"
                      onClick={openBotModal}
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
                  {activeLeagues.slice(0,3).map((league) => (
                    <div className="league-card" key={league.id}>
                      <div className="league-name">{league.name}</div>
                      <div className="league-status">
                        Estado: {league.status}
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${league.progress}%` }}
                        ></div>
                      </div>
                      <div className="league-participants">
                        {league.participants} participantes
                      </div>
                    </div>
                  ))}
                  <div className="create-new">
                    <ButtonCreate
                      label="Crear liga"
                      onClick={openLeagueModal}
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
      {/* Componentes de Modal */}
      <CreateLeagueModal
        isOpen={isLeagueModalOpen}
        onClose={closeLeagueModal}
      />
      <CreateBotModal isOpen={isBotModalOpen} onClose={closeBotModal} />
    </div>
  );
};

export default Dashboard;
