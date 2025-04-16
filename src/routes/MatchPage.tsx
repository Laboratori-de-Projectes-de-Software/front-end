import BotSidebar from "@components/BotSidebar";
import { LeagueDTO } from "@DTOClasses/LeagueDTO";
import { MatchDTO } from "@DTOClasses/MatchDTO";
import { MessageDTO } from "@DTOClasses/MessageDTO";
import { getBot, getMatchesFromLeague, getMessagesFromMatch } from "@use-cases/UseCases";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const MatchPage: React.FC = () => {
  const params = useParams<{ leagueId: string; matchId: string }>();
  const leagueId = parseInt(params.leagueId!);
  const matchId = parseInt(params.matchId!);
  const [league, setLeague] = useState<LeagueDTO>({} as LeagueDTO);
  const [match, setMatch] = useState<MatchDTO>({} as MatchDTO);
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [timeLeft, setTimeLeft] = useState(180);
  const bots: BotDTO[] = [{
    id: 1,
    name: "One",
    quality: "X",
    imageUrl: "",
    apiUrl: "",
    nWins: 0,
    nDraws: 0,
    nLosses: 0
  }, {
    id: 2,
    name: "Two",
    quality: "Y",
    imageUrl: "",
    apiUrl: "",
    nWins: 0,
    nDraws: 0,
    nLosses: 0
  }]
  // Simula una petició POST
  const sendMessage = async (sender: string, text: string) => {
    const newMessage: MessageDTO = {
      botId: parseInt(sender),
      text,
      timeStamp: messages.length.toString() + 1
    };
  
    if (timeLeft > 0){
      setMessages(prev => [...prev, newMessage]);
    }else{
      console.error("Temps acabat:");
    }
    
  };

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

  useEffect(() => {
    async function getMatches() {
      const matches = await getMatchesFromLeague(leagueId);

      if(matches) {
        setMatch(matches.filter((matchEl) => matchEl.id === matchId)[0]);
      } else {
        alert("Error while fetching the match information");
      }
    }
  }, []);

  useEffect(() => {
    async function getMessages() {
      const messagesFetch = await getMessagesFromMatch(matchId);

      if(messagesFetch) {
        setMessages(messagesFetch);
      }
    }

    async function getFigthers() {
      const bot1 = await getBot(match.fighters[0]);
      const bot2 = await getBot(match.fighters[1]);

      if(bot1 && bot2) {
        setFigthers([...fighters, bot1, bot2]);
      } else {
        alert("Error while fething bots information");
      }
    }



  }, [timeLeft])

  const TimeToString = (t: number): string => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-[--secondary] text-white">
      {/* Columna esquerra */}
      <BotSidebar bot={bots[0]} onSendMessage={sendMessage} />

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
                msg.sender === bots[0].name ? 
                "self-start bg-[--chat1-bkg]" : "self-end bg-[--chat2-bkg]"
              }`}
            >
              <div className="flex justify-between text-sm mb-1 font-bold">
                <span>{msg.sender === bots[0].name ? bots[0].name : bots[1].name}</span>
                <span className="italic font-normal">{msg.sender === bots[0].name ? bots[1].topic : bots[1].topic}</span>
              </div>

              <div>{msg.text}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Columna dreta */}
      <BotSidebar bot={bots[1]} onSendMessage={sendMessage} />
    </div>
  );
};

export default MatchPage;