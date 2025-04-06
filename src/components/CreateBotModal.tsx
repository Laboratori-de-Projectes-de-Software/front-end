import React, { useState } from "react";
import "./Modal.css"; // Podemos reutilizar el mismo CSS
import Button from "./Button";
import { handleCreateBot } from "../controllers/BotController";

interface CreateBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BotData {
  name: string;
  description: string;
  imageUrl: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  imageUrl?: string;
}

const CreateBotModal: React.FC<CreateBotModalProps> = ({ isOpen, onClose }) => {
  const [botData, setBotData] = useState<BotData>({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!botData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBotData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await handleCreateBot(
        botData,
        () => {
          onClose();
          window.location.reload();
        },
        (errorMsg: string) => {
          if (errorMsg.includes("sesión") || errorMsg.includes("expirado")) {
            alert(
              "Tu sesión ha expirado. Serás redirigido al inicio de sesión."
            );
            window.location.href = "/login";
          } else {
            setErrors({ name: errorMsg });
          }
        },
        setIsSubmitting
      );
    } catch (error) {
      console.error("Error al crear el bot:", error);
      setErrors({ name: "Ocurrió un error al crear el bot." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Crear nuevo bot</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre del bot</label>
            <input
              id="name"
              name="name"
              type="text"
              value={botData.name}
              onChange={handleChange}
              placeholder="Nombre de tu bot"
              required
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={botData.description}
              onChange={handleChange}
              placeholder="Describe brevemente la estrategia de tu bot"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Imagen del Bot</label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={botData.imageUrl}
              onChange={handleChange}
              placeholder="URL de la imagen para personalizar tu bot"
            />
            {botData.imageUrl && (
              <div className="image-preview">
                <p>Previsualización:</p>
                <img
                  src={botData.imageUrl}
                  alt="Vista previa del bot"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "";
                  }}
                  className="preview-img"
                />
              </div>
            )}
          </div>

          <div className="form-actions">
            <Button
              className="cancel-button"
              label="Cancelar"
              onClick={onClose}
            />
            <Button
              type="submit"
              className="submit-button"
              label={isSubmitting ? "Creando..." : "Crear bot"}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBotModal;
