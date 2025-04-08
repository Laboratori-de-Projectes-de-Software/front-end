import React, { useState } from "react";
import "./Modal.css";
import Button from "./Button";

interface LeagueDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    league: {
        name: string;
        bots: { id: string; imageUrl: string }[]; // Updated to include bot image URLs
        rounds: { [round: number]: string[] }; // Example: { 1: ["Match 1", "Match 2"] }
    } | null;
}

const LeagueDetailsModal: React.FC<LeagueDetailsModalProps> = ({ isOpen, onClose, league }) => {
    const [currentRound, setCurrentRound] = useState(1);

    if (!isOpen || !league) return null;

    const handleNextRound = () => {
        if (currentRound < Object.keys(league.rounds).length) {
            setCurrentRound(currentRound + 1);
        }
    };

    const handlePreviousRound = () => {
        if (currentRound > 1) {
            setCurrentRound(currentRound - 1);
        }
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
                <Button label={"Inscribir Bot"} />
                <ul>
                    {league.rounds[currentRound]?.map((match, index) => (
                        <li key={index}>{match}</li>
                    ))}
                </ul>
                <div className="round-navigation">
                    <button onClick={handlePreviousRound} disabled={currentRound === 1}>
                        &lt;
                    </button>
                    <span>
                        &nbsp;Jornada {currentRound}&nbsp;
                    </span>
                    <button
                        onClick={handleNextRound}
                        disabled={currentRound === Object.keys(league.rounds).length}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeagueDetailsModal;