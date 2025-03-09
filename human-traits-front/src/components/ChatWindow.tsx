import React from 'react';
import '../css/ChatWindow.css'; // We'll define this CSS file separately

// Define the message type
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

// Props for the ChatWindow component
interface ChatWindowProps {
  messages: Message[];
  currentUser: string;
  otherUser: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, otherUser }) => {
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
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`message-row ${message.sender === 'user' ? 'user-message-row' : 'other-message-row'}`}
            >
              <div 
                className={`message-bubble ${
                  message.sender === 'user' 
                    ? 'user-message' 
                    : 'other-message'
                }`}
              >
                <p className="message-text">{message.text}</p>
                <p className="message-time">
                  {formatTime(message.timestamp)}
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
          <button className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;