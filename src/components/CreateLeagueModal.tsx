import React, { useState, useEffect } from "react";
import "./Modal.css";
import { createNewLeague } from "../controllers/LeaguesController";
import { fetchUserBots } from "../controllers/BotController";
import { Bot } from "../models/BotModel";
import { useNavigate } from "react-router-dom";

interface CreateLeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Para refrescar la lista de ligas después de crear una
}

interface LeagueData {
  name: string;
  imageUrl: string;
  rounds: number;
  matchTime: number;
}

// Interfaz para los errores
interface FormErrors {
  name?: string;
  rounds?: string;
  matchTime?: string;
  bots?: string;
}

const CreateLeagueModal: React.FC<CreateLeagueModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const navigate = useNavigate(); // Para redirigir en caso de token expirado

  const [leagueData, setLeagueData] = useState<LeagueData>({
    name: "",
    imageUrl: "",
    rounds: 3, // Valor predeterminado
    matchTime: 15, // Valor predeterminado en segundos
  });
  const [availableBots, setAvailableBots] = useState<Bot[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingBots, setIsLoadingBots] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Cargar bots disponibles cuando el modal se abra
  useEffect(() => {
    if (isOpen) {
      setIsLoadingBots(true);
      fetchUserBots(
        (bots) => {
          setAvailableBots(bots);
          setIsLoadingBots(false);
        },
        (error) => {
          console.error("Error al cargar los bots:", error);
          setIsLoadingBots(false);

          // Redirigir al login si el error es por autenticación
          if (
            error.includes("Sesión expirada") ||
            error.includes("token válido") ||
            error.includes("Unauthorized")
          ) {
            alert(
              "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
            );
            navigate("/login");
          }
        }
      );
      console.log("LEAGUE MODAL: Available bots:", availableBots);
    }
  }, [isOpen, navigate]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!leagueData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (leagueData.rounds < 1) {
      newErrors.rounds = "Debe haber al menos 1 ronda";
    }

    if (leagueData.matchTime < 5) {
      newErrors.matchTime = "El tiempo mínimo por partida es de 5 segundos";
    }

    // Ya no requerimos bots para crear una liga
    // if (leagueData.bots.length < 2) {
    //   newErrors.bots = "Se requieren al menos 2 bots para crear una liga";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLeagueData((prev) => ({
      ...prev,
      [name]:
        name === "rounds" || name === "matchTime"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await createNewLeague(
          leagueData,
          (createdLeague) => {
            if (onSuccess) onSuccess();
            onClose();
          },
          (error) => {
            console.error("Error al crear la liga:", error);
            // Redirigir al login si el error es por autenticación
            if (
                error.includes("Sesión expirada") ||
                error.includes("token válido") ||
                error.includes("Unauthorized")
            ) {
              alert(
                  "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
              );
              navigate("/login");
            } else {
              alert(`Error al crear la liga: ${error}`);
            }
          },
          navigate // Pasar la función navigate para permitir redirecciones
      );
    } catch (error) {
      console.error("Error en la solicitud:", error);
      const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";

      // Redirigir al login si el error es por autenticación
      if (
          errorMessage.includes("Sesión expirada") ||
          errorMessage.includes("token válido") ||
          errorMessage.includes("Unauthorized")
      ) {
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        navigate("/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Crear nueva liga</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-form-group">
            <label htmlFor="name">Nombre de la liga</label>
            <input
              id="name"
              name="name"
              type="text"
              value={leagueData.name}
              onChange={handleChange}
              placeholder="Nombre de la liga"
              required
            />
            {errors.name && (
              <span className="modal-error-message">{errors.name}</span>
            )}
          </div>

          <div className="modal-form-group">
            <label htmlFor="imageUrl">URL de imagen (opcional)</label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              value={leagueData.imageUrl}
              onChange={handleChange}
              placeholder="URL de imagen para la liga"
            />
          </div>

          <div className="modal-form-group">
            <label htmlFor="rounds">Número de rondas</label>
            <input
              id="rounds"
              name="rounds"
              type="number"
              min="1"
              value={leagueData.rounds}
              onChange={handleChange}
              required
            />
            {errors.rounds && (
              <span className="modal-error-message">{errors.rounds}</span>
            )}
          </div>

          <div className="modal-form-group">
            <label htmlFor="matchTime">Tiempo por partida (segundos)</label>
            <input
              id="matchTime"
              name="matchTime"
              type="number"
              min="5"
              value={leagueData.matchTime}
              onChange={handleChange}
              required
            />
            {errors.matchTime && (
              <span className="modal-error-message">{errors.matchTime}</span>
            )}
          </div>

          <div className="modal-form-actions">
            <button
              type="button"
              className="modal-cancel-button"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="modal-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando..." : "Crear liga"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLeagueModal;
