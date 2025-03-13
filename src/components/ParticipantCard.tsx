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
    <div className="bg-(--secondary) p-4 rounded-lg shadow-md w-64">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-sm text-(--bot-card-color)">Equipo: {team}</p>
      <div className="flex justify-between mt-4">
        <span className="text-(--color-green)">{wins}V</span>
        <span className="text-(--color-yellow)">{draws}E</span>
        <span className="text-(--color-red)">{losses}D</span>
      </div>
    </div>
  );
};

export default ParticipantCard;
