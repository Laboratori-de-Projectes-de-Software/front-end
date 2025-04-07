import React from 'react';
import ParticipantCard from '@components/ParticipantCard';
import { getBots } from '@use-cases/UseCases';
// import BotDTO from '@DTOClasses/BotDTO';

/*
const participants = [
  { name: 'Bot 1', team: 'Team 1', wins: 4, draws: 2, losses: 1 },
  { name: 'Bot 2', team: 'Team 1', wins: 4, draws: 2, losses: 1 },
  { name: 'Bot 3', team: 'Team 2', wins: 4, draws: 2, losses: 1 },
  { name: 'Bot 4', team: 'Team 2', wins: 4, draws: 2, losses: 1 },
  { name: 'Bot 5', team: 'Team 2', wins: 4, draws: 2, losses: 1 },
  { name: 'Bot 6', team: 'Team 3', wins: 4, draws: 2, losses: 1 },
];
*/

let participants; 

const ParticipantsPage: React.FC = () => {
  participants = getBots();
  if (!participants) {
    return <div className="min-h-screen"><h1 className="text-3xl font-bold mb-8">Error loading participants</h1></div>;
  }

  return (
    <div className="min-h-screen">
      <main className="p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">Participants</h1>
        <div className="grid grid-cols-3 gap-6">
          {participants.map((participant) => (
            <ParticipantCard
              key={participant.botId}
              name={participant.name}
              team={participant.team}
              wins={participant.wins}
              draws={participant.draws}
              losses={participant.losses}
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
