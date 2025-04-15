import React, { useEffect, useState } from "react";
import LeagueBar from "@components/LeagueBar";
import { useNavigate, useParams } from "react-router-dom";
import { LeagueResponseDTO } from "@DTOClasses/LeagueDTO";
import { getAllLeagues } from "@use-cases/UseCases";

const leagues: LeagueResponseDTO[] = [{leagueId: 1, state: "PENDIND", name: "League 1", urlImage: "", user: 1, rounds: 3, matchTime: 2, bots: []},
                                      {leagueId: 1, state: "", name: "League 2", urlImage: "", user: 1, rounds: 3, matchTime: 2, bots: []},
                                      {leagueId: 1, state: "", name: "League 3", urlImage: "", user: 1, rounds: 3, matchTime: 2, bots: []} ];

const matches = Array(10).fill({ bot1: "Bot 1", bot2: "Bot 2", winner: "Bot 2" });

type componentShow = "Classification" | "Confrontations"

const LeagueMatches: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<LeagueResponseDTO | null>(null);
  const [leagues, setLeagues] = useState<LeagueResponseDTO[]>([]);
  const [showComponentm setShowComponent] = useState<componentShow>("Classification");

  useEffect(() => {
    const leagues = getAllLeagues();
  });

  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <main className="flex flex-row items-start gap-8">
        <LeagueBar
          leagues={leagues}
          selectedLeagueId={selectedLeague?.leagueId}
          onSelectLeague={() => navigate(`/leagues/${leagueId}`)}
        />

        <div className="flex-1">
          <h1 className="pt-5 pb-2 text-3xl font-bold text-center mb-4">
            {selectedLeague?.name}
          </h1>

          <div className="pb-12 flex justify-center mb-4">
            <button className="bg-black text-white px-4 py-2 rounded-l">
              Classification
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-r">
              Confrontations
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
                    Start ▶
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