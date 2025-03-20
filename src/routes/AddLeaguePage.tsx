import React, { useState } from "react";
import LeagueBar from "@components/LeagueBar";

const leagues = ["League 1", "League 2", "League 3"];
const participants = ["Bot 1", "Bot 2", "Bot 3", "Bot 4", "Bot 5"];

const AddLeaguePage: React.FC = () => {
  const [leagueName, setLeagueName] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [maxRounds, setMaxRounds] = useState("");
  const [maxTime, setMaxTime] = useState("");

  const handleToggleParticipant = (bot: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(bot) ? prev.filter((p) => p !== bot) : [...prev, bot]
    );
  };

  const handleSubmit = () => {
    console.log({ leagueName, selectedParticipants, maxRounds, maxTime });
    // Afegir la lògica per enviar les dades al backend
  };

  return (
    <div className="min-h-screen">
      <main className="flex flex-row items-start gap-8">
        <LeagueBar leagues={leagues} selectedLeague={""} onSelectLeague={() => {}} />
        <div className="flex-1 text-center p-10 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6 font-bold">Añadir liga</h1>

          <div className="mb-4 w-2/3 md:w-1/2 lg:w-2/3">
            <label className="block text-left mb-2 font-bold">Nombre:</label>
            <input
              type="text"
              className="w-full p-2 rounded-lg bg-black text-white"
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
            />
          </div>

          <div className="mb-4 w-2/3 md:w-1/2 lg:w-2/3">
            <label className="block text-left mb-2 font-bold">Participantes:</label>
            <div className="bg-black p-2 rounded-lg">
              {participants.map((bot) => (
                <div key={bot} className="flex items-center justify-between p-1">
                  <span className="font-bold">{bot}</span>
                  <input
                    type="checkbox"
                    checked={selectedParticipants.includes(bot)}
                    onChange={() => handleToggleParticipant(bot)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4 w-2/3 md:w-1/2 lg:w-2/3">
            <label className="block text-left mb-2 font-bold">Rondas Máximas:</label>
            <input
              type="number"
              className="w-full p-2 rounded-lg bg-black text-white"
              value={maxRounds}
              onChange={(e) => setMaxRounds(e.target.value)}
            />
          </div>

          <div className="mb-6 w-2/3 md:w-1/2 lg:w-2/3">
            <label className="block text-left mb-2 font-bold">Tiempo Máximo:</label>
            <input
              type="number"
              className="w-full p-2 rounded-lg bg-black text-white"
              value={maxTime}
              onChange={(e) => setMaxTime(e.target.value)}
            />
          </div>

          <button
            className="bg-white text-black px-6 py-2 rounded font-bold"
            onClick={handleSubmit}
          >
            Añadir
          </button>
        </div>
      </main>
    </div>
  );
};

export default AddLeaguePage;