import BotSidebar from "@components/BotSidebar";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";


interface Message {
  id: number;
  sender: string;
  text: string;
}

interface BotInfo {
  name: string;
  topic: string;
}

const MatchPage: React.FC = () => {
  
  // Simula una petició POST
  const sendMessage = async (sender: string, text: string) => {
    const newMessage = {
      id: messages.length + 1,
      sender,
      text
    };
  
    if (timeLeft > 0){
      setMessages(prev => [...prev, newMessage]);
    }else{
      console.error("Temps acabat:");
    }
    
  };
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [bot1Info, setBot1Info] = useState<BotInfo>({ name: "Paco Torres", topic: "Racisme" });
  const [bot2Info, setBot2Info] = useState<BotInfo>({ name: "Jaimito", topic: "Spiderman" });
  const [timeLeft, setTimeLeft] = useState(180);

  const { matchId } = useParams();
  //Scroll chat
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const TimeToString = (t: number): string => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-[--secondary] text-white">
      {/* Columna esquerra */}
      <BotSidebar bot={bot1Info} onSendMessage={sendMessage} />

      {/* Zona central */}
      <main className="flex-1 flex flex-col items-center px-4 py-6">
        <div className="text-2xl font-bold mb-4 font-mono">{TimeToString(timeLeft)}</div>
        <div
          ref={scrollRef}
          className="flex flex-col gap-4 w-full max-w-3xl flex-1 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-[--secondary]"
        >
          {messages.map((msg) => (
            <div
              className={`p-3 rounded-xl max-w-[70%] text-white shadow-md ${
                msg.sender === bot1Info.name ? 
                "self-start bg-[--chat1-bkg]" : "self-end bg-[--chat2-bkg]"
              }`}
            >
              <div className="flex justify-between text-sm mb-1 font-bold">
                <span>{msg.sender === bot1Info.name ? bot1Info.name : bot2Info.name}</span>
                <span className="italic font-normal">{msg.sender === bot1Info.name ? bot1Info.topic : bot2Info.topic}</span>
              </div>

              <div>{msg.text}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Columna dreta */}
      <BotSidebar bot={bot2Info} onSendMessage={sendMessage} />
    </div>
  );
};

export default MatchPage;