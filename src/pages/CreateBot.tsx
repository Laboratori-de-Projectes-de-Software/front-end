import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NeuralBackground from "../components/NeuralBackground";
import Button from "../components/Button";
import "./CreateBot.css";

const CreateBotPage: React.FC = () => {
  const navigate = useNavigate();
  const [botName, setBotName] = useState("");
  const [botDescription, setBotDescription] = useState("");
  const [botImageUrl, setBotImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!botName.trim()) {
      setError("El nombre del bot es obligatorio");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Aquí iría la llamada a la API (cuando esté implementada)
      // await api.post("/bots", { name: botName, description: botDescription, imageUrl: botImageUrl });

      // Simulación de tiempo de espera para la demo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirigir al usuario a la página de sus bots
      navigate("/mybots");
    } catch (err) {
      setError("Error al crear el bot. Inténtalo de nuevo más tarde.");
      console.error("Error al crear bot:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-bot-page">
      <NeuralBackground />
      <Navbar username="Usuario" />

      <div className="create-bot-content">
        <h1>Crear Nuevo Bot</h1>

        <div className="create-bot-form-container">
          <form onSubmit={handleSubmit} className="create-bot-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="botName">Nombre del Bot:</label>
              <input
                type="text"
                id="botName"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                placeholder="Nombre de tu bot"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="botDescription">Descripción:</label>
              <textarea
                id="botDescription"
                value={botDescription}
                onChange={(e) => setBotDescription(e.target.value)}
                placeholder="Describe brevemente la estrategia de tu bot"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="botImageUrl">Imagen del Bot:</label>
              <input
                type="url"
                id="botImageUrl"
                value={botImageUrl}
                onChange={(e) => setBotImageUrl(e.target.value)}
                placeholder="URL de la imagen para personalizar tu bot"
                className="image-url-input"
              />

              {botImageUrl && (
                <div className="image-preview">
                  <p>Previsualización:</p>
                  <img
                    src={botImageUrl}
                    alt="Vista previa del bot"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = ""; // puedes reemplazar por una imagen por defecto si prefieres
                    }}
                    className="preview-img"
                  />
                </div>
              )}
            </div>

            <div className="bot-form-actions">
              <Button
                onClick={() => navigate("/Dashboard")}
                label="Cancelar"
                className="cancel-button"
              />
              <Button
                onClick={() => {}} // No es necesario ya que lo maneja el submit del form
                label={isSubmitting ? "Creando..." : "Crear Bot"}
                className="submit-button"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBotPage;
