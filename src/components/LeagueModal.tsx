import React, { useState, useEffect } from "react";
import "./Modal.css";
import Button from "./Button";
import EditLeagueModal from "./EditLeagueModal";
import AddBotsModal from "./AddBotsModal";
import { fetchLeagueById } from "../controllers/LeaguesController";

interface LeagueModalProps {
    isOpen: boolean;
    onClose: () => void;
    league: {
        id: number;
        name: string;
        urlImagen: string;
        matchTime: number;
        bots: { id: number; imageUrl: string }[];
        rounds: number;
    } | null;
}

const LeagueModal: React.FC<LeagueModalProps> = ({ isOpen, onClose, league }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddBotsModalOpen, setIsAddBotsModalOpen] = useState(false);
    const [currentLeague, setCurrentLeague] = useState(league);

    // Sincronizar currentLeague con league cuando esta cambie
    useEffect(() => {
        setCurrentLeague(league);
    }, [league]);

    console.log("LeagueModal props:", { isOpen, league });
    if (!isOpen || !currentLeague) return null;

    const reloadLeagueData = () => {
        if (currentLeague) {
            fetchLeagueById(currentLeague.id)
                .then((updatedLeague) => setCurrentLeague(updatedLeague))
                .catch((error) => console.error("Error fetching league data:", error));
        }
    };

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        reloadLeagueData();
    };

    const handleAddBotClick = () => {
        setIsAddBotsModalOpen(true);
    };

    const handleCloseAddBotModal = () => {
        setIsAddBotsModalOpen(false);
        reloadLeagueData();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>{currentLeague.name}</h2>
                <h3>Bots Inscritos:</h3>
                <div className="bot-images-container">
                    {currentLeague.bots.map((bot) => (
                        <img
                            key={bot.id}
                            src={bot.imageUrl}
                            alt={`Bot ${bot.id}`}
                            className="bot-image"
                        />
                    ))}
                </div>
                <p>Number of Rounds: {currentLeague.rounds}</p>
                <div className="button-group">
                    <Button label={"Inscribir Bot"} onClick={handleAddBotClick} />
                    <Button label={"Editar"} onClick={handleEditClick} />
                </div>
            </div>

            <AddBotsModal
                isOpen={isAddBotsModalOpen}
                onClose={handleCloseAddBotModal}
                leagueId={currentLeague.id}
                currentBots={currentLeague.bots}
            />

            <EditLeagueModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                league={currentLeague}
            />
        </div>
    );
};

export default LeagueModal;