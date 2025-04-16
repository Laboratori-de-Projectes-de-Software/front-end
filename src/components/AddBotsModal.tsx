import React, { useState, useEffect } from "react";
import "./Modal.css";
import { fetchUserBots, addBotsToLeague } from "../controllers/BotController";

interface AddBotsModalProps {
    isOpen: boolean;
    onClose: () => void;
    leagueId: number;
    currentBots: number[];
    onSuccess?: () => void; // Callback to refresh the league's bot list
}

const AddBotsModal: React.FC<AddBotsModalProps> = ({
                                                       isOpen,
                                                       onClose,
                                                       leagueId,
                                                       currentBots,
                                                       onSuccess,
                                                   }) => {
    const [allBots, setAllBots] = useState<{ id: number; name: string }[]>([]);
    const [selectedBots, setSelectedBots] = useState<number[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Fetch all bots for the user
            fetchUserBots(
                (bots) => {
                    // Filter out bots already in the league
                    const filteredBots = bots
                        .filter((bot) => !currentBots.some((current) => current === bot.botId))
                        .map((bot) => ({ id: bot.botId!, name: bot.name || "Unnamed Bot" }));
                    setAllBots(filteredBots);
                },
                (error) => console.error("Error fetching bots:", error)
            );
        }
    }, [isOpen, currentBots]);

    const handleBotSelection = (botId: number) => {
        setSelectedBots((prev) =>
            prev.includes(botId) ? prev.filter((id) => id !== botId) : [...prev, botId]
        );
    };

    const handleSubmit = async () => {
        if (selectedBots.length === 0) return;

        setIsSubmitting(true);
        try {
            await addBotsToLeague(leagueId, selectedBots);
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            console.error("Error adding bots to league:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Inscribir Bots</h2>
                <div className="bot-list">
                    {allBots.length > 0 ? (
                        allBots.map((bot) => (
                            <div key={bot.id} className="bot-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        value={bot.id}
                                        checked={selectedBots.includes(bot.id)}
                                        onChange={() => handleBotSelection(bot.id)}
                                    />
                                    {bot.name}
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>No hay bots disponibles para inscribir.</p>
                    )}
                </div>
                <div className="modal-form">
                    <div className="modal-form-actions">
                        <button
                            type="button"
                            className="modal-cancel-button"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="modal-submit-button"
                            onClick={handleSubmit}
                            disabled={isSubmitting || selectedBots.length === 0}
                        >
                            {isSubmitting ? "Inscribiendo..." : "Inscribir"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBotsModal;