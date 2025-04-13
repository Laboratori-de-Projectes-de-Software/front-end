import React from "react";
import "./Modal.css";

interface MatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    match: {
        bot1: { id: number; imageUrl: string; name: string };
        bot2: { id: number; imageUrl: string; name: string };
        messages: { botId: number; text: string }[];
    } | null;
}

const MatchModal: React.FC<MatchModalProps> = ({ isOpen, onClose, match }) => {
    if (!isOpen || !match) return null;

    const { bot1, bot2, messages } = match;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <div className="match-header">
                    <div className="bot-container">
                        <img src={bot1.imageUrl} alt={bot1.name} className="bot-image" />
                        <p>{bot1.name}</p>
                    </div>
                    <div className="bot-container">
                        <img src={bot2.imageUrl} alt={bot2.name} className="bot-image" />
                        <p>{bot2.name}</p>
                    </div>
                </div>
                <div className="chat-container">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`chat-message ${
                                message.botId === bot1.id ? "bot1-message" : "bot2-message"
                            }`}
                        >
                            <p>{message.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MatchModal;