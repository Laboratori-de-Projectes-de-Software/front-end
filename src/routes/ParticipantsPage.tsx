import React from 'react';
// import ParticipantCard from '@/components/ParticipantCard';
import ParticipantCard from '../components/ParticipantCard';
import Navbar from '../components/Navbar';

const participants = [
  { name: 'Bot 1', team: 'Equipo 1', wins: 4, draws: 2, losses: 1 },
  { name: 'Bot 2', team: 'Equipo 1', wins: 4, draws: 2, losses: 1 },
  { name: 'Bot 3', team: 'Equipo 2', wins: 4, draws: 2, losses: 1 },
  { name: 'Bot 4', team: 'Equipo 2', wins: 4, draws: 2, losses: 1 },
  { name: 'Bot 5', team: 'Equipo 2', wins: 4, draws: 2, losses: 1 },
  { name: 'Bot 6', team: 'Equipo 3', wins: 4, draws: 2, losses: 1 },
];

const ParticipantsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <header>
        <Navbar />
      </header>
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-8">Participantes</h1>
        <div className="grid grid-cols-3 gap-6">
          {participants.map((participant) => (
            <ParticipantCard
              key={participant.name}
              name={participant.name}
              team={participant.team}
              wins={participant.wins}
              draws={participant.draws}
              losses={participant.losses}
            />
          ))}
        </div>
        <button className="mt-8 bg-gray-700 text-white p-2 rounded">Añadir</button>
      </main>
    </div>
  );
};

export default ParticipantsPage;
