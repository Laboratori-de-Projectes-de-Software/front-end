import React from "react";
import "./CreateLeagueModal.css";

interface CreateLeagueModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateLeagueModal: React.FC<CreateLeagueModalProps> = ({
                                                                 isOpen,
                                                                 onClose,
                                                             }) => {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para crear una liga
        console.log("Liga creada");
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Crear nueva liga</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nombre de la liga" required />
                    <input type="number" placeholder="Número de participantes" required />
                    <button type="submit">Crear</button>
                </form>
                <button className="close-button" onClick={onClose}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default CreateLeagueModal;