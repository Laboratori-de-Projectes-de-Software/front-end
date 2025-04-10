import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NeuralBackground from "../components/NeuralBackground";
import Button from "../components/Button";
import CreateBotModal from "../components/CreateBotModal";
import { fetchUserBots } from "../controllers/BotController";
import "./BotsPage.css";

const BotsPage: React.FC = () => {
  const [bots, setBots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBotModalOpen, setIsBotModalOpen] = useState(false);

  useEffect(() => {
    fetchUserBots(setBots, (error) => {
      console.error("Error fetching bots:", error);
    }).finally(() => setLoading(false));
  }, []);

  const handleCreateBot = () => {
    setIsBotModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBotModalOpen(false);
  };

  return (
    <div className="bots-page">
      <NeuralBackground />
      <Navbar />

      <div className="bots-content">
        <h1>Mis Bots</h1>

        {loading ? (
          <div className="loading">Cargando datos...</div>
        ) : (
          <div className="bots-grid">
            {bots.map((bot) => (
              <div className="bot-card" key={bot.id}>
                <div className="bot-name">{bot.name}</div>
                <img
                  className="bot-image"
                  src={bot.urlImagen || "default-bot-image.jpg"}
                  alt={`Imagen de ${bot.name}`}
                />
                <div className="bot-stats">
                  <span className="wins">{bot.wins || 0}V</span> /{" "}
                  <span className="losses">{bot.losses || 0}D</span>
                </div>
                <div className="bot-status">
                  Estado: {bot.state || "Inactivo"}
                </div>
              </div>
            ))}
          </div>
        )}
        <Button
          isTransparent={false}
          className={"create-bot-button"}
          label="Crear Bot"
          onClick={handleCreateBot}
        />
      </div>

      <CreateBotModal isOpen={isBotModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default BotsPage;
