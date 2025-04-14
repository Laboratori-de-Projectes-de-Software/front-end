import React, { useState, useEffect } from "react";
import ParticipantCard from '@components/ParticipantCard';
import { getAllBots, getBot } from '@use-cases/UseCases';
import { BotSummaryResponseDTO, BotResponseDTO } from '@DTOClasses/BotDTO';

const ParticipantsPage: React.FC = () => {
  const [bots, setBots] = useState<BotResponseDTO[]>([]); // Estat per emmagatzemar els bots
    
  useEffect(() => {
    const fetchB = async () => {
      const fetchedBots = await getAllBots();
      fetchedBots.forEach(async (bot: BotSummaryResponseDTO) =>  {
        const botDetails = await getBot(bot.id);
        if (botDetails) {
          setBots([...bots, botDetails]);
        }
      });
    };

    fetchB();
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
              key={bot.botId}
              name={bot.name}
              wins={bot.nWins}
              draws={bot.nDraws}
              losses={bot.nLosses}
            />
          ))}
        </div>
        <a href="/add-bot">
          <button className="mt-8 bg-(--btn-bkg) text-black font-bold p-2 rounded hover:cursor-pointer">Add</button>
        </a>
      </main>
    </div>
  );
};

export default ParticipantsPage;
