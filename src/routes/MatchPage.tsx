import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

//NOTES: al iniciar es necessari info dels dos bots i TIME_MATCH lliga
/**
 * ERROR --> ENVIAR MISSATGE AMB TEMPS ACABAT
{
  "bot_local": { "nom": "Paco", "topic": "Virtut" },
  "bot_visitant": { "nom": "Mateu", "topic": "Defecte" },
  "duracio": 165
}
 * 
 */


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
/*
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8080/match/${matchId}/message`);
        if (!response.ok) throw new Error("Error carregant missatges");
        
        const data: Message[] = await response.json();
        setMessages(data);
      
        } catch (err) {
        console.error("Error carregant missatges:", err);
      }
    };

    const fetchParticipants = async () => {
      try {
        const response = await fetch(`http://localhost:8080/match/${matchId}`); // suposadament retorna info del match
        
        if (!response.ok) throw new Error("Error carregant dades del match");
        
        const data = await response.json();
        setTimeLeft(data.duracio);
        
        setBot1Info({ name: data.bot_local.nom, topic: data.bot_local.topic });
        setBot2Info({ name: data.bot_visitant.nom, topic: data.bot_visitant.topic });
      
        } catch (err) {
        console.error("Error carregant bots del match:", err);
      }
    };

    fetchMessages();
    fetchParticipants();

  }, [matchId]);*/

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
      <aside className="w-1/6 bg-black flex flex-col justify-between items-center py-8">
        <h2 className="font-bold text-xl">{bot1Info.name}</h2>
          <button
            onClick={() => sendMessage(bot1Info.name, "Missatge de prova. A tope amb " + bot1Info.topic)}
          >
            Simula Missatge Bot 1
          </button>
        <p className="text-sm">Tema: {bot1Info.topic}</p>
      </aside>

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
              //XAPUSA A ERRGLAR----------------------------------------------------------------------------------
              style={{
                backgroundColor: msg.sender === bot1Info.name ? "var(--chat1-bkg)" : "var(--chat2-bkg)"
              }}
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
      <aside className="w-1/6 bg-black flex flex-col justify-between items-center py-8">
        <h2 className="font-bold text-xl">{bot2Info.name}</h2>
        <button
            onClick={() => sendMessage(bot2Info.name, "Missatge de prova. A tope amb " + bot2Info.topic)}
          >
              Simula Missatge Bot 2
            </button>
        <p className="text-sm">Tema: {bot2Info.topic}</p>
      </aside>
    </div>
  );
};

export default MatchPage;