import React, { useState } from "react";
import "./Modal.css";
import Button from "./Button";
import EditLeagueModal from "./EditLeagueModal"; // Import the EditLeagueModal component

interface LeagueDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    league: {
        id: number;
        name: string;
        urlImagen: string; // Agregado
        matchTime: number; // Agregado
        bots: { id: string; imageUrl: string }[];
        rounds: number;
    } | null;
}

const LeagueDetailsModal: React.FC<LeagueDetailsModalProps> = ({ isOpen, onClose, league }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for EditLeagueModal

    if (!isOpen || !league) return null;

    const handleEditClick = () => {
        setIsEditModalOpen(true); // Open the EditLeagueModal
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false); // Close the EditLeagueModal
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>{league.name}</h2>
                <h3>Bots Inscritos:</h3>
                <div className="bot-images-container">
                    {league.bots.map((bot) => (
                        <img
                            key={bot.id}
                            src={bot.imageUrl}
                            alt={`Bot ${bot.id}`}
                            className="bot-image"
                        />
                    ))}
                </div>
                <p>Number of Rounds: {league.rounds}</p>
                <div className="button-group">
                    <Button label={"Inscribir Bot"} />
                    <Button label={"Editar"} onClick={handleEditClick} />
                </div>
            </div>

            {/* Render the EditLeagueModal */}
            <EditLeagueModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                league={league} // Pass the league data to the modal
            />
        </div>
    );
};

export default LeagueDetailsModal;