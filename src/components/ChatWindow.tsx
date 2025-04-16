import React, { useState, useEffect } from 'react';
import '../css/ChatWindow.css';
import { useParams } from 'react-router-dom';

// Define the message type
interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

type ChatWindowProps = {
  combatId: string;
}

const ChatWindow: React.FC = () => {
  const combatId = useParams<ChatWindowProps>();
  const [messages, setMessages] = useState<Message[]>([]);
  // Example: other user's name. You could determine it dynamically if needed.
  const [otherUser, setOtherUser] = useState('Bot B');

  // Fetch messages whenever the combatId changes
  useEffect(() => {
    
    console.log(combatId.combatId);
    window.APIConection.getAllMessagesMatch(Number(combatId.combatId)).then((messages) => {
      const meses: Message[] = messages.map((mes):Message => ({ id: mes.botId.toString(), text: mes.text, timestamp: (mes.time), sender: mes.botId.toString() }))
      setMessages(meses);
    }).catch();

  }, [combatId]);

  // Format timestamp to readable time
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-container">
      {/* Chat header */}
      <div className="chat-header">
        <h2 className="header-name">{otherUser}</h2>
        <p className="header-status">Online</p>
      </div>

      {/* Messages container */}
      <div className="messages-container">
        <div className="messages-list">
          {messages
            .sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp))
            .map((message) => (
              <div
                key={message.id}
                className={`message-row ${message.sender === 'A' ? 'user-message-row' : 'other-message-row'
                  }`}
              >
                <div
                  className={`message-bubble ${message.sender === 'A' ? 'user-message' : 'other-message'
                    }`}
                >
                  <p className="message-text">{message.text}</p>
                  <p className="message-time">
                    {formatTime(new Date(message.timestamp))}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Input area - not functional, just for display */}
      <div className="input-container">
        <div className="input-row">
          <input
            type="text"
            placeholder="Type a message..."
            className="message-input"
          />
          <button className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
