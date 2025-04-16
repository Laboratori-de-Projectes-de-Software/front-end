import React, { useState, useEffect } from 'react';
import '../css/ChatWindow.css';
import { useParams } from 'react-router-dom';
import SideBar from './SideBar';
import Footer from './Footer';
// Define the message type
interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  side: string;
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
      const mainUserId = messages[0].botId;
      const meses: Message[] = messages.map((mes): Message => (
        {
          id: mes.botId.toString(),
          text: mes.text,
          timestamp: (mes.time),
          sender: mes.botId.toString(),
          side: mes.botId == mainUserId ? "A" : "B"
        }))
      setMessages(meses);
    }).catch();

  }, [combatId]);

  // Format timestamp to readable time
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div>
        <div className="page_container">
          <SideBar />
          <div className="content_container">
            <div className="chat-container">


              {/* Messages container */}
              <div className="messages-container">
                <div className="messages-list">
                  {messages
                    .sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp))
                    .map((message) => (
                      <div
                        key={message.id}
                        className={`message-row ${message.side === 'A' ? 'ai-a-message-row' : 'ai-b-message-row'
                          }`}
                      >
                        <div
                          className={`message-bubble ${message.side === 'A' ? 'ai-a-message' : 'ai-b-message'
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
            </div>
          </div>
        </div>
        <Footer />
      </div></>
  );
};

export default ChatWindow;
