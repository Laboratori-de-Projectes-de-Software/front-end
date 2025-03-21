import React, { useState } from "react";

const AddParticipantPage: React.FC = () => {
  const [participantName, setParticipantName] = useState("");
  const [team, setTeam] = useState("");
  const [apiLink, setApiLink] = useState("");

  const handleSubmit = () => {
    console.log({ participantName, team, apiLink });
    // Afegir la lògica per enviar-ho al backend
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">Add participant</h1>

      <div className="w-2/3 md:w-1/2 lg:w-1/3 mb-4">
        <label className="block text-left mb-2 font-bold">Name:</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-black text-white"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
        />
      </div>

      <div className="w-2/3 md:w-1/2 lg:w-1/3 mb-4">
        <label className="block text-left mb-2 font-bold">Team:</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-black text-white"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
      </div>

      <div className="w-2/3 md:w-1/2 lg:w-1/3 mb-6">
        <label className="block text-left mb-2 font-bold">Link API REST:</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-black text-white"
          value={apiLink}
          onChange={(e) => setApiLink(e.target.value)}
        />
      </div>

      <button
        className="bg-white text-black px-6 py-2 rounded font-bold"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
};

export default AddParticipantPage;
