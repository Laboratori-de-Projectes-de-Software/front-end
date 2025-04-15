import React from 'react';

interface ParticipantCardProps {
  name: string;
  quality: string;
  imageUrl: string | null;
  apiUrl: string;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ name, imageUrl, quality, apiUrl }) => {
  return (
    <div className="flex justify-between content-center bg-(--secondary) p-4 rounded-lg shadow-md w-64">
      {
        imageUrl && 
        <img src={imageUrl} alt="Bot Image" />
      }
      <div className="flex flex-col items-end">
        <h2 className="text-2xl font-bold">{name}</h2>
        <h2 className="text-2xl font-bold">{quality}</h2>
        <p>{apiUrl}</p>
      </div>
    </div>
  );
};

export default ParticipantCard;
