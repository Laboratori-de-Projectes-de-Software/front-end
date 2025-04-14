import React from 'react';

interface ParticipantCardProps {
  name: string;
  wins: number;
  draws: number;
  losses: number;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ name, wins, draws, losses }) => {
  return (
    <div className="flex justify-between content-center bg-(--secondary) p-4 rounded-lg shadow-md w-64">
      <h2 className="text-2xl font-bold">{name}</h2>
      <div className="flex flex-col items-end">
        <span className="text-(--color-green)">{wins}V</span>
        <span className="text-(--color-yellow)">{draws}E</span>
        <span className="text-(--color-red)">{losses}D</span>
      </div>
    </div>
  );
};

export default ParticipantCard;
