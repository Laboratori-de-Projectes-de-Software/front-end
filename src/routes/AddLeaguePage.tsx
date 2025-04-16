import React, { useState, useEffect } from "react";
import { addBotToLeague, createLeague } from "@use-cases/UseCases";  // Importa la funció createLeague
import { getAllBots } from "@use-cases/UseCases";  // Importa la funció getBots i getAllLeagues
import WhiteButton from "@components/WhiteButton";
import { CreateLeagueDTO } from "@DTOClasses/LeagueDTO";
import { BotDTO } from "@DTOClasses/BotDTO";

const AddLeaguePage: React.FC = () => {
  const [leagueName, setLeagueName] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [rounds, setRounds] = useState("");
  const [matchTime, setMatchTime] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Per gestionar els missatges d'error
  const [bots, setBots] = useState<BotDTO[]>([]); // Estat per emmagatzemar els bots
  
  useEffect(() => {
    const fetchBots = async () => {
      const fetchedBots = await getAllBots();
      setBots(fetchedBots);
    };
    fetchBots();
  }, []);

  // Funció per gestionar el canvi de participants seleccionats
  const handleToggleParticipant = (bot: number) => {
    setSelectedParticipants((prev) =>
      prev.includes(bot) ? prev.filter((p) => p !== bot) : [...prev, bot]
    );
  };

  // Funció per gestionar el submit de la lliga
  const handleSubmit = async () => {
    if (!leagueName) {
      setErrorMessage("El nom de la lliga és obligatori.");
      return;
    }

    if (selectedParticipants.length === 0) {
      setErrorMessage("Cal seleccionar almenys un participant.");
      return;
    }

    if (!rounds || isNaN(Number(rounds)) || Number(rounds) <= 0) {
      setErrorMessage("Les rondes màximes han de ser un número positiu.");
      return;
    }

    if (!matchTime || isNaN(Number(matchTime)) || Number(matchTime) <= 0) {
      setErrorMessage("El temps màxim ha de ser un número positiu.");
      return;
    }

    // Prepara les dades de la lliga
    const newLeague: CreateLeagueDTO = {
      name: leagueName,
      rounds: parseInt(rounds),
      matchTime: parseInt(matchTime),
    };

    try {
      const result = await createLeague(newLeague);  // Utilitzem la funció createLeague

      if (result) {
        // Restableix les dades del formulari
        setLeagueName("");
        setSelectedParticipants([]);
        setRounds("");
        setMatchTime("");
        setErrorMessage(""); // Restableix els errors en cas d'èxit
        selectedParticipants.forEach((botId) => addBotToLeague(result.id, botId));
      } else {
        setErrorMessage("Error al crear la lliga.");
      }
    } catch (error) {
      setErrorMessage("Error al crear la lliga: " + error);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="flex flex-row items-start gap-8">
        <div className="flex-1 text-center p-10 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6">Add League</h1>

          {errorMessage && (
            <div className="bg-red-500 text-white p-3 mb-4 rounded">{errorMessage}</div>
          )}

          <div className="mb-4 w-2/3 md:w-1/2 lg:w-2/3">
            <label className="block text-left mb-2 font-bold">Name:</label>
            <input
              type="text"
              className="w-full bg-(--input-bkg) p-2 rounded-lg"
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
            />
          </div>

          <div className="mb-4 w-2/3 md:w-1/2 lg:w-2/3">
            <label className="block text-left mb-2 font-bold">Participants:</label>
            <div className="bg-(--input-bkg) p-2 rounded-lg">
                {bots.map((bot) => (
                  <div key={bot.id} className="flex items-center justify-between p-1">
                    <span className="font-bold">{bot.name}</span>
                    <input
                    type="checkbox"
                    checked={selectedParticipants.includes(bot.id)}
                    onChange={() => handleToggleParticipant(bot.id)}
                    />
                  </div>
                ))}
            </div>
        </div>

          <div className="mb-4 w-2/3 md:w-1/2 lg:w-2/3">
            <label className="block text-left mb-2 font-bold">Maximum Rounds:</label>
            <input
              type="number"
              className="w-full bg-(--input-bkg) p-2 rounded-lg"
              value={rounds}
              onChange={(e) => setRounds(e.target.value)}
            />
          </div>

          <div className="mb-6 w-2/3 md:w-1/2 lg:w-2/3">
            <label className="block text-left mb-2 font-bold">Maximum Time:</label>
            <input
              type="number"
              className="w-full bg-(--input-bkg) p-2 rounded-lg"
              value={matchTime}
              onChange={(e) => setMatchTime(e.target.value)}
            />
          </div>

          <WhiteButton onClick={handleSubmit}>Add League</WhiteButton>
        </div>
      </main>
    </div>
  );
};

export default AddLeaguePage;
