import React, { useState, useEffect } from "react";
import { createLeague } from "@use-cases/UseCases";  // Importa la funció createLeague
import { getBots, getLeagues } from "@use-cases/UseCases";  // Importa la funció getBots i getLeagues
import LeagueBar from "@components/LeagueBar";
import { LeagueDTO } from "../DTOClasses/LeagueDTO";

const AddLeaguePage: React.FC = () => {
  const [leagues, setLeagues] = useState<LeagueDTO[]>([]); // Afegim estat per a les lligues
  const [leagueName, setLeagueName] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [maxRounds, setMaxRounds] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Per gestionar els missatges d'error
  const bots = getBots() ?? [];  // Si `getBots` retorna null, utilitzem una llista buida

  // Obtenir les lligues existents
  useEffect(() => {
    const fetchedLeagues = getLeagues() ?? [];  // Si no hi ha lligues, utilitzem una llista buida
    setLeagues(fetchedLeagues);
  }, []);

  // Funció per gestionar el canvi de participants seleccionats
  const handleToggleParticipant = (bot: string) => {
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

    if (!maxRounds || isNaN(Number(maxRounds)) || Number(maxRounds) <= 0) {
      setErrorMessage("Les rondes màximes han de ser un número positiu.");
      return;
    }

    if (!maxTime || isNaN(Number(maxTime)) || Number(maxTime) <= 0) {
      setErrorMessage("El temps màxim ha de ser un número positiu.");
      return;
    }

    // Prepara les dades de la lliga
    const newLeague = {
      name: leagueName,
      bots: selectedParticipants,
      maxRounds: parseInt(maxRounds),
      maxTime: parseInt(maxTime),
    };

    try {
      const result = await createLeague(newLeague);  // Utilitzem la funció createLeague

      if (result) {
        // Restableix les dades del formulari
        setLeagueName("");
        setSelectedParticipants([]);
        setMaxRounds("");
        setMaxTime("");
        setErrorMessage(""); // Restableix els errors en cas d'èxit
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
        <LeagueBar
          leagues={leagues.map((league) => league.name)}
          selectedLeague={""}
          onSelectLeague={() => {}}
        />
        <div className="flex-1 text-center p-10 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6">Add League</h1>

          {errorMessage && (
            <div className="bg-red-500 text-white p-3 mb-4 rounded">{errorMessage}</div>
          )}

          <div className="mb-4 w-2/3 md:w-1/2 lg:w-2/3">
            <label className="block text-left mb-2 font-bold">Name:</label>
            <input
              type="text"
              className="w-full p-2 rounded-lg"
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
            />
          </div>

          <div className="mb-4 w-2/3 md:w-1/2 lg:w-2/3">
            <label className="block text-left mb-2 font-bold">Participants:</label>
            <div className="bg-gray-200 p-2 rounded-lg">
              {bots.map((bot) => (
                <div key={bot.name} className="flex items-center justify-between p-1">
                  <span className="font-bold">{bot.name}</span>
                  <input
                    type="checkbox"
                    checked={selectedParticipants.includes(bot.name)}
                    onChange={() => handleToggleParticipant(bot.name)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4 w-2/3 md:w-1/2 lg:w-2/3">
            <label className="block text-left mb-2 font-bold">Maximum Rounds:</label>
            <input
              type="number"
              className="w-full p-2 rounded-lg"
              value={maxRounds}
              onChange={(e) => setMaxRounds(e.target.value)}
            />
          </div>

          <div className="mb-6 w-2/3 md:w-1/2 lg:w-2/3">
            <label className="block text-left mb-2 font-bold">Maximum Time:</label>
            <input
              type="number"
              className="w-full p-2 rounded-lg"
              value={maxTime}
              onChange={(e) => setMaxTime(e.target.value)}
            />
          </div>

          <button
            className="bg-blue-500 text-white px-6 py-2 rounded font-bold"
            onClick={handleSubmit}
          >
            Add League
          </button>
        </div>
      </main>
    </div>
  );
};

export default AddLeaguePage;
