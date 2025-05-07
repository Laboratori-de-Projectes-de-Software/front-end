import React, { useState, useEffect } from "react";
import ParticipantCard from '@components/ParticipantCard';
import WhiteButton from '@components/WhiteButton';
import { getAllBots, getBot } from '@use-cases/UseCases';
import { BotDTO } from '@DTOClasses/BotDTO';
import { useNavigate } from "react-router-dom";

const ParticipantsPage: React.FC = () => {
  const [bots, setBots] = useState<BotDTO[]>([]); // Estat per emmagatzemar els bots
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBots = async () => {
      const fetchedBots = await getAllBots();
      fetchedBots.forEach(async (bot: BotDTO) =>  {
        const botDetails = await getBot(bot.id);
        if (botDetails) {
          setBots( b => [...b, botDetails]);
        }
      });
    };

    fetchBots();
  }, []);

  if (!bots) {
    return <div className="min-h-screen"><h1 className="text-3xl font-bold mb-8">Error loading participants</h1></div>;
  }

  return (
    <div className="min-h-screen">
      <main className="p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">Participants</h1>
        <div className="grid grid-cols-3 gap-6">
          {bots.map((bot) => (
            <ParticipantCard
              key={bot.id}
              name={bot.name}
              quality={bot.quality}
              apiUrl={bot.apiUrl}
              imageUrl={bot.imageUrl}
            />
          ))}
        </div>
        <a href="/add-bot">
          <WhiteButton onClick={() => navigate("/add-bot")}>Add</WhiteButton>
        </a>
      </main>
    </div>
  );
};

export default ParticipantsPage;
