import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AddLeagueBar from "../components/AddLeagueBar";

const leagues = ["Liga 1", "Liga 2", "Liga 3"];
const matches = Array(10).fill({ bot1: "Bot 1", bot2: "Bot 2", winner: "Bot 2" });

const LeagueMatches: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState("Liga 2");

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-row items-start gap-8">
        <AddLeagueBar
          leagues={leagues}
          selectedLeague={selectedLeague}
          onSelectLeague={setSelectedLeague}
        />

        <div className="flex-1">
          <h1 className="pt-5 pb-2 text-3xl font-bold text-center mb-4">
            {selectedLeague}
          </h1>

          <div className="pb-12 flex justify-center mb-4">
            <button className="bg-black text-white px-4 py-2 rounded-l">
              Clasificación
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-r">
              Enfrentamientos
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {matches.map((match, index) => (
              <div
                key={index}
                className="bg-black text-white text-lg p-4 rounded-lg text-center h-28"
              >
                <p className="font-bold text-gray-400">{match.bot1} vs {match.bot2}</p>
                {index < 7 ? (
                  <p className="mt-4 text-white font-bold">Victoria {match.winner}</p>
                ) : (
                  <button className="mt-2 bg-gray-200 text-black px-4 py-2 rounded-md">
                    Empezar ▶
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeagueMatches;