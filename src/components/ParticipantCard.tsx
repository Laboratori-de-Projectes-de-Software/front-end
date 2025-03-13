import React from 'react';

interface ParticipantCardProps {
  name: string;
  team: string;
  wins: number;
  draws: number;
  losses: number;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ name, team, wins, draws, losses }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md w-64">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-sm text-gray-400">Equipo: {team}</p>
      <div className="flex justify-between mt-4">
        <span className="text-green-400">{wins}V</span>
        <span className="text-yellow-400">{draws}E</span>
        <span className="text-red-400">{losses}D</span>
      </div>
    </div>
  );
};

export default ParticipantCard;
