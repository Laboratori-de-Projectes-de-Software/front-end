import React, { useState } from "react";
import "./Modal.css";

interface CreateLeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LeagueData {
  name: string;
  participants: number;
  description: string;
  startDate: string;
}

// Nueva interfaz para los errores
interface FormErrors {
  name?: string;
  participants?: string;
  description?: string;
  startDate?: string;
}

const CreateLeagueModal: React.FC<CreateLeagueModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [leagueData, setLeagueData] = useState<LeagueData>({
    name: "",
    participants: 2,
    description: "",
    startDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Usamos la nueva interfaz de errores
  const [errors, setErrors] = useState<FormErrors>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!leagueData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (leagueData.participants < 2) {
      newErrors.participants = "Deben haber al menos 2 participantes";
    } else if (leagueData.participants > 32) {
      newErrors.participants = "El máximo es de 32 participantes";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLeagueData((prev) => ({
      ...prev,
      [name]: name === "participants" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Aquí iría la lógica para crear una liga (llamada API)
      console.log("Creando liga:", leagueData);

      // Simular retraso de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Liga creada exitosamente");
      onClose();
    } catch (error) {
      console.error("Error al crear la liga:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Crear nueva liga</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="participants">Número de participantes</label>
            <input
              id="participants"
              name="participants"
              type="number"
              min="2"
              max="32"
              value={leagueData.participants}
              onChange={handleChange}
              placeholder="Número de participantes"
              required
            />
            {errors.participants && (
              <span className="error-message">{errors.participants}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción (opcional)</label>
            <textarea
              id="description"
              name="description"
              value={leagueData.description}
              onChange={handleChange}
              placeholder="Descripción de la liga"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Fecha de inicio</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={leagueData.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="submit"
              className="submit-button"
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
