import React from "react";
import "./Modal.css";

interface Bot {
    name: string;
    imageUrl: string;
}

interface MatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    match: {
        fighters: [string, string];
        matchId: number;
        result: number;
        roundNumber: number;
        state: string;
    } | null;
    bots: Bot[];
}

const MatchModal: React.FC<MatchModalProps> = ({ isOpen, onClose, match, bots }) => {
    if (!isOpen || !match) return null;

    // Find the bots for the current match
    const bot1 = bots.find((bot) => bot.name === match.fighters[0]);
    const bot2 = bots.find((bot) => bot.name === match.fighters[1]);

    if (!bot1 || !bot2) {
        return <div className="modal-overlay">Bot data not found</div>;
    }

    // Static messages for demonstration
    const messages = [
        { botName: bot1.name, text: "Hello, I will win this match!" },
        { botName: bot2.name, text: "Not so fast, I am the champion!" },
        { botName: bot1.name, text: "We'll see about that!" },
        { botName: bot2.name, text: "Bring it on!" },
    ];

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button-matchmodal" onClick={onClose}>
                    &times;
                </button>
                {/* Match Info */}
                <div className="match-header-matchmodal">
                    <div className="bot-container-matchmodal">
                        <img
                            src={bot1.imageUrl}
                            alt={bot1.name}
                            className="bot-image-matchmodal"
                        />
                        <p>{bot1.name}</p>
                    </div>
                    <div className="vs-text-matchmodal">VS</div>
                    <div className="bot-container-matchmodal">
                        <img
                            src={bot2.imageUrl}
                            alt={bot2.name}
                            className="bot-image-matchmodal"
                        />
                        <p>{bot2.name}</p>
                    </div>
                </div>
                {/* Chat Conversation */}
                <div className="chat-container-matchmodal">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`chat-message-matchmodal ${
                                message.botName === bot1.name
                                    ? "bot1-message-matchmodal"
                                    : "bot2-message-matchmodal"
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